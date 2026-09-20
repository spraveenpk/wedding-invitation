"use client";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

export default function WhatsAppShare() {
  const handleShare = () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(WEDDING_CONFIG.whatsapp.message + currentUrl);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={handleShare}
        className="group px-4 py-2.5 rounded-full bg-[#0b0807]/90 backdrop-blur-md border border-[#c9a45c]/40 text-[#e8d19a] text-xs font-serif tracking-widest uppercase shadow-[0_8px_25px_rgba(0,0,0,0.8)] flex items-center gap-2 hover:bg-[#24070f] hover:border-[#c9a45c] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="Share our invitation via WhatsApp"
      >
        <span className="text-sm">💬</span>
        <span className="hidden sm:inline">SHARE OUR INVITATION</span>
      </button>
    </div>
  );
}
