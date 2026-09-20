"use client";

import { useState } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickChoice = (choice: string) => {
    setAttending(choice);
    const nameInput = document.getElementById("rsvp-name");
    nameInput?.focus({ preventScroll: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attending) return;

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      attending,
      guests,
      message: message.trim(),
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    // 1. Store in localStorage for user session retention
    try {
      localStorage.setItem("wedding_rsvp", JSON.stringify(payload));
    } catch {}

    // 2. Post to /api/rsvp (which sends directly to your Google Sheet)
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("Could not post to /api/rsvp:", err);
    }

    // 3. Fallback direct client post to Google Sheet if configured
    if (WEDDING_CONFIG.rsvp?.googleSheetUrl) {
      try {
        await fetch(WEDDING_CONFIG.rsvp.googleSheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {}
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleWhatsAppNotify = () => {
    const text = encodeURIComponent(
      `Hi Praveen & Priya! 🎉\n\nRSVP from *${name}*:\nAttending: ${attending}\nGuests: ${guests}\nMessage: "${message || "Heartiest congratulations!"}"\n\nCan't wait to celebrate with you!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="w-full">
      {/* Quick Response Buttons */}
      {!isSubmitted && (
        <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => handleQuickChoice("Yes, I'll be there")}
            className={`rsvp-choice btn-gold inline-flex min-h-12 justify-center cursor-pointer ${
              attending === "Yes, I'll be there" ? "chosen" : ""
            }`}
          >
            Yes, I&apos;ll Be There ❤️
          </button>
          <button
            type="button"
            onClick={() => handleQuickChoice("I'll miss it")}
            className={`rsvp-choice btn-ghost inline-flex min-h-12 justify-center cursor-pointer ${
              attending === "I'll miss it" ? "chosen" : ""
            }`}
          >
            I&apos;ll Miss It
          </button>
        </div>
      )}

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6 text-left" aria-label="RSVP Form">
          <div>
            <label htmlFor="rsvp-name" className="form-label">
              Your Name <span className="text-gold">*</span>{" "}
              <span className="sr-only">(required)</span>
            </label>
            <input
              id="rsvp-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="form-field"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="rsvp-attending" className="form-label">
              Will you join us? <span className="text-gold">*</span>{" "}
              <span className="sr-only">(required)</span>
            </label>
            <select
              id="rsvp-attending"
              required
              value={attending}
              onChange={(e) => setAttending(e.target.value)}
              className="form-field cursor-pointer"
            >
              <option value="" disabled>
                Select your response
              </option>
              <option value="Yes, I'll be there">Yes, I&apos;ll be there</option>
              <option value="I'll miss it">I&apos;ll miss it</option>
            </select>
          </div>

          <div>
            <label htmlFor="rsvp-guests" className="form-label">
              Number of Guests
            </label>
            <select
              id="rsvp-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="form-field cursor-pointer"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6+">6+</option>
            </select>
          </div>

          <div>
            <label htmlFor="rsvp-message" className="form-label">
              Message for the Couple (optional)
            </label>
            <textarea
              id="rsvp-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A blessing, a wish, a memory..."
              className="form-field resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold mt-10 inline-flex w-full justify-center cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send RSVP"}
          </button>
        </form>
      ) : (
        <div className="detail-panel mt-10 p-8 text-center animate-in fade-in duration-700">
          <p className="font-display text-3xl text-gold">Thank you, {name}!</p>
          <p className="mt-3 text-body-soft">
            {attending === "Yes, I'll be there"
              ? "Your response has reached us. We can't wait to celebrate with you!"
              : "Thank you for letting us know. You will be missed in our celebration!"}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleWhatsAppNotify}
              className="btn-gold text-[11px] py-2.5 px-6 cursor-pointer"
            >
              Confirm via WhatsApp 💬
            </button>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="btn-ghost text-[11px] py-2.5 px-6 cursor-pointer"
            >
              Edit Response
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
