import { NextResponse } from "next/server";
import { callsDb } from "@/lib/db/callsStore";
import { ANU_VOICE_PROFILE, DEFAULT_SCRIPT_TEMPLATE } from "@/lib/telephony/scriptGenerator";

export async function GET() {
  try {
    const settings = callsDb.getSettings();
    return NextResponse.json({
      success: true,
      settings,
      voiceProfile: ANU_VOICE_PROFILE,
      defaultTemplate: DEFAULT_SCRIPT_TEMPLATE,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load settings";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { testMode, testPhoneNumber, scriptTemplate, activeProvider } = body;

    const updated = callsDb.updateSettings({
      ...(typeof testMode === "boolean" ? { testMode } : {}),
      ...(testPhoneNumber !== undefined ? { testPhoneNumber: testPhoneNumber.trim() } : {}),
      ...(scriptTemplate !== undefined ? { scriptTemplate } : {}),
      ...(activeProvider ? { activeProvider } : {}),
    });

    return NextResponse.json({
      success: true,
      settings: updated,
      message: "Settings saved successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save settings";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
