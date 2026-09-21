import { NextResponse } from "next/server";
import { getTelephonyProvider } from "@/lib/telephony";
import { callsDb } from "@/lib/db/callsStore";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const payload: Record<string, unknown> = {};

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        payload[key] = value.toString();
      });
    } else {
      const json = await request.json();
      Object.assign(payload, json);
    }

    const provider = getTelephonyProvider();
    const result = await provider.handleWebhook(payload);

    if (result.callSid) {
      callsDb.updateByCallSid(result.callSid, {
        status: result.status,
        durationSeconds: result.durationSeconds,
        updatedAt: new Date().toISOString(),
      });
    }

    // Return 200 OK or TwiML empty response
    return new NextResponse(
      provider.name.includes("Twilio")
        ? "<Response></Response>"
        : JSON.stringify({ success: true, updated: result }),
      {
        status: 200,
        headers: {
          "Content-Type": provider.name.includes("Twilio")
            ? "text/xml"
            : "application/json",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
