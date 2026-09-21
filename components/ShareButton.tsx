"use client";

import { useState } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

export default function ShareButton() {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const message = WEDDING_CONFIG.whatsapp.message.trim();

    // 1. Try native Web Share API with the image file (supported on mobile Chrome / Safari)
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        const imgUrl = WEDDING_CONFIG.images.invitationCard || "/images/wedding_invitation_card.jpg";
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        const file = new File([blob], "Praveen_Priya_Wedding_Invitation.jpg", {
          type: "image/jpeg",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "Praveen & Priya Wedding Invitation",
            text: message,
            files: [file],
          });
          setIsSharing(false);
          return;
        }
      } catch (err: unknown) {
        // If user cancelled share sheet (AbortError), don't trigger fallback
        if (err instanceof Error && err.name === "AbortError") {
          setIsSharing(false);
          return;
        }
        console.warn("Native file share fallback:", err);
      }
    }

    // 2. Direct WhatsApp Web / App link fallback
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank", "noopener,noreferrer");
    setIsSharing(false);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={isSharing}
      aria-label="Share our invitation on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex min-h-10 sm:min-h-12 items-center gap-1.5 sm:gap-2 rounded-full border border-gold/60 bg-black/80 px-4 py-2.5 sm:px-5 sm:py-3 text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-luxe text-gold backdrop-blur-md transition-all duration-500 hover:border-gold hover:text-champagne hover:scale-105 active:scale-95 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current text-gold">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
      </svg>
      <span>{isSharing ? "Sharing..." : "Share Invitation"}</span>
    </button>
  );
}
