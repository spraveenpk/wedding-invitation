import { NextResponse } from "next/server";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attending, guests, message } = body;

    if (!name || !attending) {
      return NextResponse.json(
        { error: "Name and attendance response are required." },
        { status: 400 }
      );
    }

    const webhookUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      WEDDING_CONFIG.rsvp?.googleSheetUrl;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            attending,
            guests: guests || "1",
            message: message || "",
            timestamp: new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
          }),
        });
      } catch (err) {
        console.error("Failed to forward to Google Sheets webhook:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "RSVP received successfully.",
    });
  } catch (error) {
    console.error("RSVP route error:", error);
    return NextResponse.json(
      { error: "Failed to process RSVP." },
      { status: 500 }
    );
  }
}
