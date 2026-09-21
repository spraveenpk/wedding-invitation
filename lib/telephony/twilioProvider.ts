import {
  ITelephonyProvider,
  MakeCallParams,
  MakeCallResult,
  CallStatus,
  TelephonyWebhookResult,
} from "./types";
import { ANU_VOICE_PROFILE } from "./scriptGenerator";

/**
 * TwilioProvider
 * Production & Free Trial Telephony Provider using Twilio Voice REST API.
 * Uses Amazon Polly Neural / Standard Indian English female voices to speak as "Anu".
 * All credentials are strictly read from environment variables.
 */
export class TwilioProvider implements ITelephonyProvider {
  readonly name = "Twilio Voice API";
  readonly isSimulation = false;

  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    this.authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.fromNumber = process.env.TWILIO_FROM_NUMBER || "";

    if (!this.accountSid || !this.authToken || !this.fromNumber) {
      console.warn(
        "[TwilioProvider] Missing Twilio environment credentials. Ensure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER are set in .env.local"
      );
    }
  }

  /**
   * Generates inline TwiML XML instructions for Anu's voice announcement.
   */
  private generateTwiml(message: string): string {
    // Clean special XML characters
    const escapedMessage = message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

    return (
      `<Response>` +
      `<Pause length="1"/>` +
      `<Say voice="${ANU_VOICE_PROFILE.twilioVoice}" language="${ANU_VOICE_PROFILE.twilioLanguage}">` +
      escapedMessage +
      `</Say>` +
      `<Pause length="1"/>` +
      `</Response>`
    );
  }

  async makeCall(params: MakeCallParams): Promise<MakeCallResult> {
    if (!this.accountSid || !this.authToken || !this.fromNumber) {
      throw new Error(
        "Twilio credentials not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER in your .env.local file."
      );
    }

    const twiml = this.generateTwiml(params.personalizedMessage);

    const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Calls.json`;
    const authHeader = `Basic ${Buffer.from(
      `${this.accountSid}:${this.authToken}`
    ).toString("base64")}`;

    const formBody = new URLSearchParams();
    formBody.append("To", params.to);
    formBody.append("From", this.fromNumber);
    formBody.append("Twiml", twiml);

    // Optional status callback webhook
    if (params.statusCallbackUrl) {
      formBody.append("StatusCallback", params.statusCallbackUrl);
      formBody.append(
        "StatusCallbackEvent",
        "initiated,ringing,answered,completed"
      );
      formBody.append("StatusCallbackMethod", "POST");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[TwilioProvider] API Error:", data);
      throw new Error(
        `Twilio API error (${response.status}): ${data.message || data.error_message || "Failed to initiate call"}`
      );
    }

    return {
      success: true,
      callSid: data.sid,
      status: "Called",
      provider: this.name,
      message: `Outbound call to ${params.to} initiated via Twilio (Call SID: ${data.sid}).`,
    };
  }

  async getCallStatus(callSid: string): Promise<CallStatus> {
    if (!this.accountSid || !this.authToken) {
      return "Pending";
    }

    const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Calls/${callSid}.json`;
    const authHeader = `Basic ${Buffer.from(
      `${this.accountSid}:${this.authToken}`
    ).toString("base64")}`;

    const response = await fetch(endpoint, {
      headers: { Authorization: authHeader },
    });

    if (!response.ok) {
      return "Failed";
    }

    const data = await response.json();
    return this.mapTwilioStatus(data.status);
  }

  async handleWebhook(
    payload: Record<string, unknown>
  ): Promise<TelephonyWebhookResult> {
    const callSid = String(payload.CallSid || "");
    const rawStatus = String(payload.CallStatus || "");
    const durationSeconds = payload.CallDuration
      ? parseInt(String(payload.CallDuration), 10)
      : undefined;

    const status = this.mapTwilioStatus(rawStatus);

    return {
      callSid,
      status,
      durationSeconds,
      rawStatus,
    };
  }

  /**
   * Maps Twilio CallStatus values to our unified application CallStatus
   */
  private mapTwilioStatus(twilioStatus: string): CallStatus {
    switch (twilioStatus?.toLowerCase()) {
      case "in-progress":
      case "completed":
        return "Answered";
      case "busy":
        return "Busy";
      case "no-answer":
        return "No Answer";
      case "failed":
      case "canceled":
        return "Failed";
      case "ringing":
      case "initiated":
      case "queued":
        return "Called";
      default:
        return "Pending";
    }
  }
}
