import { NextResponse } from "next/server";
import { dispatchCall } from "@/lib/telephony";
import { callsDb } from "@/lib/db/callsStore";
import { generatePersonalizedScript } from "@/lib/telephony/scriptGenerator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contactId, phoneNumber, name, customScript } = body;

    let targetPhone = phoneNumber;
    let recipientName = name || "Test Guest";
    let messageText = customScript;

    // If contactId is supplied, retrieve from database
    if (contactId) {
      const contact = callsDb.getContactById(contactId);
      if (!contact) {
        return NextResponse.json(
          { success: false, error: "Contact not found." },
          { status: 404 }
        );
      }
      targetPhone = contact.phoneNumber;
      recipientName = contact.name;
      messageText =
        customScript ||
        contact.personalizedScript ||
        generatePersonalizedScript(contact.name);
    } else {
      if (!targetPhone) {
        // Fallback to configured test phone number
        const settings = callsDb.getSettings();
        targetPhone = settings.testPhoneNumber;
      }
      if (!messageText) {
        messageText = generatePersonalizedScript(recipientName);
      }
    }

    if (!targetPhone) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No recipient phone number provided and no test phone number configured.",
        },
        { status: 400 }
      );
    }

    // Dispatch the call (Safety guard inside will enforce TEST MODE limits)
    const result = await dispatchCall({
      contactId,
      to: targetPhone,
      name: recipientName,
      personalizedMessage: messageText,
    });

    return NextResponse.json({
      success: true,
      result,
      message: `Call to ${recipientName} (${targetPhone}) initiated successfully!`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to trigger call.";
    console.error("Call trigger error:", error);
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 }
    );
  }
}
