export type CallStatus =
  | "Pending"
  | "Called"
  | "Answered"
  | "Busy"
  | "No Answer"
  | "Failed";

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  status: CallStatus;
  lastCalledAt?: string;
  callSid?: string;
  durationSeconds?: number;
  notes?: string;
  personalizedScript?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MakeCallParams {
  contactId?: string;
  to: string;
  name: string;
  personalizedMessage: string;
  voice?: string;
  statusCallbackUrl?: string;
}

export interface MakeCallResult {
  success: boolean;
  callSid: string;
  status: CallStatus;
  provider: string;
  message: string;
  simulatedTranscript?: string;
}

export interface TelephonyWebhookResult {
  callSid: string;
  status: CallStatus;
  durationSeconds?: number;
  rawStatus?: string;
}

export interface ITelephonyProvider {
  readonly name: string;
  readonly isSimulation: boolean;

  /**
   * Dispatches an outbound telephone call with the personalized reminder.
   */
  makeCall(params: MakeCallParams): Promise<MakeCallResult>;

  /**
   * Queries provider for current call status.
   */
  getCallStatus(callSid: string): Promise<CallStatus>;

  /**
   * Processes an incoming webhook callback from the telephony network.
   */
  handleWebhook(payload: Record<string, unknown>): Promise<TelephonyWebhookResult>;
}

export interface TelephonyConfig {
  provider: "mock" | "twilio" | string;
  testMode: boolean;
  testPhoneNumber: string;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  twilioFromNumber?: string;
  appBaseUrl?: string;
}
