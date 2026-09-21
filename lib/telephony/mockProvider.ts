import {
  ITelephonyProvider,
  MakeCallParams,
  MakeCallResult,
  CallStatus,
  TelephonyWebhookResult,
} from "./types";
import { ANU_VOICE_PROFILE } from "./scriptGenerator";

/**
 * MockTelephonyProvider
 * Zero-cost simulation provider for developing and testing call workflows safely.
 * Does not contact any carrier or incur any charges.
 */
export class MockTelephonyProvider implements ITelephonyProvider {
  readonly name = "Mock Simulator (Free / Safe)";
  readonly isSimulation = true;

  async makeCall(params: MakeCallParams): Promise<MakeCallResult> {
    const callSid = `MOCK_CA_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Simulate speech script synthesis with Anu
    const simulatedTranscript = `[AI Voice: Anu (${ANU_VOICE_PROFILE.accent})]\n"${params.personalizedMessage}"`;

    console.log(
      `\n[MOCK TELEPHONY] Outbound call initiated to: ${params.to} (${params.name})`
    );
    console.log(`[MOCK TELEPHONY] Call SID: ${callSid}`);
    console.log(`[MOCK TELEPHONY] Script:\n${simulatedTranscript}\n`);

    // In simulation mode, initial call trigger marks the status as "Called"
    return {
      success: true,
      callSid,
      status: "Called",
      provider: this.name,
      message: `Simulated call triggered successfully to ${params.to}. No real network charges incurred.`,
      simulatedTranscript,
    };
  }

  async getCallStatus(callSid: string): Promise<CallStatus> {
    void callSid;
    // For simulation, we can resolve to Answered
    return "Answered";
  }

  async handleWebhook(
    payload: Record<string, unknown>
  ): Promise<TelephonyWebhookResult> {
    const callSid = String(payload.callSid || payload.CallSid || "MOCK_CA_UNKNOWN");
    const status = (payload.status || "Answered") as CallStatus;
    const durationSeconds = Number(payload.durationSeconds) || 45;

    return {
      callSid,
      status,
      durationSeconds,
      rawStatus: String(payload.CallStatus || "completed"),
    };
  }
}
