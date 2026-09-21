import { ITelephonyProvider, MakeCallParams, MakeCallResult } from "./types";
import { MockTelephonyProvider } from "./mockProvider";
import { TwilioProvider } from "./twilioProvider";
import { callsDb } from "@/lib/db/callsStore";

/**
 * Normalizes phone numbers for safety comparison (removes spaces, hyphens, parentheses).
 */
export function normalizePhoneNumber(phone: string): string {
  return phone ? phone.replace(/[\s\-()]/g, "").trim() : "";
}

/**
 * Factory that instantiates the active telephony provider based on environment variables.
 */
export function getTelephonyProvider(): ITelephonyProvider {
  const providerKey = (
    process.env.TELEPHONY_PROVIDER || "mock"
  ).toLowerCase().trim();

  switch (providerKey) {
    case "twilio":
      return new TwilioProvider();
    case "mock":
    default:
      return new MockTelephonyProvider();
  }
}

/**
 * Central Dispatcher with Hard-Enforced TEST MODE Safety Gate.
 * Guarantees that no unauthorized or accidental calls are placed.
 */
export async function dispatchCall(params: MakeCallParams): Promise<MakeCallResult> {
  const settings = callsDb.getSettings();
  const isTestMode =
    process.env.TEST_MODE === "true" ||
    process.env.TEST_MODE === undefined ||
    settings.testMode === true;

  const rawConfiguredTestNumber =
    process.env.TEST_PHONE_NUMBER || settings.testPhoneNumber;
  const configuredTestNumber = normalizePhoneNumber(rawConfiguredTestNumber);
  const targetNumber = normalizePhoneNumber(params.to);

  // CRITICAL SAFETY CHECK: In Test Mode, forbid calling any other number!
  if (isTestMode) {
    if (!configuredTestNumber) {
      throw new Error(
        "SAFETY BLOCK: TEST MODE is active, but no TEST_PHONE_NUMBER is configured. " +
          "Please set your phone number in Settings or in your .env.local file first."
      );
    }

    if (targetNumber !== configuredTestNumber) {
      throw new Error(
        `SAFETY BLOCK: Application is locked in TEST MODE.\n` +
          `Calls can ONLY be made to your verified test number (${rawConfiguredTestNumber}).\n` +
          `Attempted call to ${params.to} was blocked automatically.`
      );
    }
  }

  // Get active provider
  const provider = getTelephonyProvider();

  // Execute call via provider
  const result = await provider.makeCall(params);

  // If a contact ID was provided, record the initial call SID and status
  if (params.contactId) {
    callsDb.updateContact(params.contactId, {
      status: "Called",
      callSid: result.callSid,
      lastCalledAt: new Date().toISOString(),
      notes: `Initiated via ${provider.name} (${result.callSid})`,
    });
  }

  return result;
}

export * from "./types";
export * from "./scriptGenerator";
