# Wedding Reminder Calling Application — Telephony Guide

This document explains the architecture of the wedding reminder calling application and outlines each step required to connect a real telephony provider for free when you are ready.

---

## 1. Current Application Structure

The application is structured using the **Strategy Pattern (Provider Abstraction)**:

```
wedding-invitation/
├── app/
│   ├── calls/
│   │   └── page.tsx              # Web Dashboard (Contacts, Audio Audition, Test Call)
│   └── api/
│       └── calls/
│           ├── contacts/route.ts # Contact pagination, search & CSV import (800+ contacts)
│           ├── trigger/route.ts  # Outbound call dispatcher with strict TEST MODE safety gate
│           ├── webhook/route.ts  # Webhook status callback listener (Twilio / Provider)
│           ├── simulate-update/  # Status progression simulator for mock testing
│           └── settings/route.ts # Telephony & Test Mode settings API
├── lib/
│   ├── telephony/
│   │   ├── types.ts              # Unified ITelephonyProvider interface & types
│   │   ├── mockProvider.ts       # 100% Free, zero-cost development simulator
│   │   ├── twilioProvider.ts     # Twilio Voice API implementation using Amazon Polly
│   │   ├── scriptGenerator.ts    # Personalized Tamil/English invitation generator & Anu voice
│   │   └── index.ts              # Provider factory & hard safety lock
│   └── db/
│       └── callsStore.ts         # Persistent JSON store for contacts & call logs
├── data/
│   └── calls_data.json           # Contact database (stores 800+ records)
├── .env.example                  # Environment variable reference
└── .env.local                    # Secret credentials (ignored by Git)
```

---

## 2. Default Free Simulation Mode (Active Now)

Right now, the application is set to:
```env
TELEPHONY_PROVIDER=mock
TEST_MODE=true
```

In this mode:
- **Cost**: $0.00 / ₹0.00 (Completely free, no payment info needed).
- **Safety**: No phone networks are dialed. All outbound calls generate simulated transcripts and update call statuses (`Called` ➔ `Answered` / `Busy` / `No Answer`).
- **Audio Preview**: You can click **"🔊 Listen to Anu Speak"** on any contact to hear the personalized invitation spoken directly by your browser's speech synthesis engine.
- **Capacity**: You can upload CSV files with 800+ contacts to test search, pagination, and bulk status management.

---

## 3. Step-by-Step: Connecting a Free Telephony Provider (Twilio Trial)

When you are ready to place real phone calls to your own test number without paying, follow these steps to use the **Twilio Free Trial**:

### Step 3.1: Create a Free Twilio Account
1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio).
2. Sign up with your email. Twilio provides **~$15 USD in free trial credit**.
3. During signup, Twilio asks you to verify your personal mobile phone number (`+91...`) with an SMS OTP.
   - *Note:* In a Twilio trial account, you can only make outbound calls to numbers you have personally verified in the Twilio Console (which perfectly matches our Test Mode requirement!).

### Step 3.2: Get a Free Twilio Virtual Phone Number
1. Once logged in to the Twilio Console dashboard, click **"Get a Trial Number"**.
2. Twilio will assign you a phone number for free using your trial credits.
3. Note down this phone number (e.g., `+1205...` or `+44...`).

### Step 3.3: Retrieve Your API Credentials
From the main Twilio Console dashboard:
1. Find your **Account SID** (starts with `AC...`).
2. Find your **Auth Token** (click "Show" to copy it).

### Step 3.4: Add Credentials to `.env.local`
Open your `wedding-invitation/.env.local` file and paste the values:

```env
TELEPHONY_PROVIDER=twilio
TEST_MODE=true
TEST_PHONE_NUMBER=+919876543210 # Your verified personal phone number
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_FROM_NUMBER=+12055550199   # Your Twilio trial phone number
```

Restart your dev server:
```bash
npm run dev
```

### Step 3.5: (Optional) Enabling Webhooks for Live Status Updates
Twilio sends HTTP webhooks when a call is answered, busy, or completed.
To receive these on your local computer for free:
1. Download [ngrok](https://ngrok.com/) (free).
2. Run: `ngrok http 3000`
3. Copy the forwarding URL (e.g. `https://abcd-123.ngrok-free.app`).
4. In `wedding-invitation/.env.local`, set:
   ```env
   APP_BASE_URL=https://abcd-123.ngrok-free.app
   ```
5. In your Twilio Console under Phone Numbers ➔ Active Numbers ➔ Voice Configuration:
   Set the Status Callback URL to:
   `https://abcd-123.ngrok-free.app/api/calls/webhook`

---

## 4. How the AI Voice "Anu" Works

In outbound calls, Twilio uses Amazon Polly Neural voices.
The application automatically configures TwiML:
```xml
<Response>
  <Say voice="Polly.Kajal-Neural" language="en-IN">
    Vanakkam Karthik! This is Anu calling on behalf of Praveen Kumar and Sri Arunachala Priya...
  </Say>
</Response>
```
- `Polly.Kajal-Neural` is an Indian English female voice designed for natural conversational cadence.
- For local browser testing, the dashboard includes a 1-click **Web Speech synthesis engine** that speaks using your device's installed female Indian / English voices at zero cost.

---

## 5. How to Change or Add New Providers

If you ever wish to switch to **Plivo**, **Exotel**, **Vonage**, or **AWS Connect**:

1. Open `lib/telephony/types.ts` and review `ITelephonyProvider`:
   ```ts
   export interface ITelephonyProvider {
     readonly name: string;
     readonly isSimulation: boolean;
     makeCall(params: MakeCallParams): Promise<MakeCallResult>;
     getCallStatus(callSid: string): Promise<CallStatus>;
     handleWebhook(payload: Record<string, any>): Promise<TelephonyWebhookResult>;
   }
   ```
2. Create a new provider file (e.g., `lib/telephony/plivoProvider.ts`) implementing `ITelephonyProvider`.
3. Register the new provider in `lib/telephony/index.ts`.
4. Update `TELEPHONY_PROVIDER=plivo` in your `.env.local`.

No frontend code or database schema changes are ever needed.
