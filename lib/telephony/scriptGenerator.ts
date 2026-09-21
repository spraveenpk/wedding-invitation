import { WEDDING_CONFIG } from "@/config/weddingConfig";

export interface VoiceProfile {
  name: string;
  gender: "female" | "male";
  accent: string;
  twilioVoice: string; // Amazon Polly voice in Twilio: Polly.Kajal-Neural or Polly.Aditi
  twilioLanguage: string;
  description: string;
  greetingTamil: string;
}

export const ANU_VOICE_PROFILE: VoiceProfile = {
  name: "Anu",
  gender: "female",
  accent: "Indian English (warm, respectful, pleasant tone)",
  twilioVoice: "Polly.Kajal-Neural", // High-fidelity conversational Indian English female voice in Twilio/Amazon Polly
  twilioLanguage: "en-IN",
  description: "AI-generated conversational Indian female voice with a warm, respectful and festive tone.",
  greetingTamil: "Vanakkam",
};

export interface WeddingScriptVariables {
  name: string;
  groom?: string;
  bride?: string;
  receptionDate?: string;
  receptionTime?: string;
  muhurthamDate?: string;
  muhurthamTime?: string;
  venue?: string;
  location?: string;
}

export const DEFAULT_SCRIPT_TEMPLATE =
  `Vanakkam {name}! This is Anu calling with joyous tidings on behalf of {groom} and {bride}. ` +
  `We cordially invite you and your family to celebrate their wedding ceremonies. ` +
  `The Reception will take place on {receptionDate} from {receptionTime}, and the auspicious Muhurtham on {muhurthamDate} between {muhurthamTime}, at {venue}, {location}. ` +
  `Your gracious presence and blessings mean the world to our families. We eagerly look forward to welcoming you! Have a wonderful day ahead.`;

/**
 * Generates the personalized invitation script for a guest.
 */
export function generatePersonalizedScript(
  contactName: string,
  customTemplate?: string
): string {
  const cleanName = contactName ? contactName.trim() : "Dear Guest";
  const template = customTemplate?.trim() || DEFAULT_SCRIPT_TEMPLATE;

  const vars: WeddingScriptVariables = {
    name: cleanName,
    groom: WEDDING_CONFIG.groom.fullName,
    bride: WEDDING_CONFIG.bride.fullName,
    receptionDate: WEDDING_CONFIG.reception.date,
    receptionTime: WEDDING_CONFIG.reception.time,
    muhurthamDate: WEDDING_CONFIG.muhurtham.date,
    muhurthamTime: WEDDING_CONFIG.muhurtham.time,
    venue: WEDDING_CONFIG.venue.name,
    location: WEDDING_CONFIG.venue.city,
  };

  return template
    .replace(/{name}/g, vars.name)
    .replace(/{groom}/g, vars.groom || "Praveen Kumar S")
    .replace(/{bride}/g, vars.bride || "Sri Arunachala Priya S")
    .replace(/{receptionDate}/g, vars.receptionDate || "15 November 2026")
    .replace(/{receptionTime}/g, vars.receptionTime || "6:00 PM – 9:00 PM")
    .replace(/{muhurthamDate}/g, vars.muhurthamDate || "16 November 2026")
    .replace(/{muhurthamTime}/g, vars.muhurthamTime || "6:00 AM – 7:00 AM")
    .replace(/{venue}/g, vars.venue || "Kettimelam Mahal")
    .replace(/{location}/g, vars.location || "Coimbatore");
}
