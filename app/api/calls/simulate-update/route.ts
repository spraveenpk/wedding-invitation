import { NextResponse } from "next/server";
import { callsDb } from "@/lib/db/callsStore";
import { CallStatus } from "@/lib/telephony/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contactId, status, durationSeconds } = body;

    if (!contactId || !status) {
      return NextResponse.json(
        { success: false, error: "contactId and status are required." },
        { status: 400 }
      );
    }

    const updated = callsDb.updateContact(contactId, {
      status: status as CallStatus,
      durationSeconds: durationSeconds || (status === "Answered" ? 48 : 15),
      lastCalledAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      contact: updated,
      message: `Status updated to ${status}.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Simulation update failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
