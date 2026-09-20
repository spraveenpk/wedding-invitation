"use client";
import { motion } from "framer-motion";

interface MinimalNavProps {
  progress: number;
  onNavigate: (percentage: number) => void;
  onOpenRSVP: () => void;
  onShare: () => void;
}

export default function MinimalNav({ progress, onNavigate, onOpenRSVP, onShare }: MinimalNavProps) {
  // Gently appears only after scrolling past 0.05
  const isVisible = progress > 0.04;

  const navItems = [
    { label: "Our Story", target: 0.18 },
    { label: "Wedding", target: 0.44 },
    { label: "Ceremonies", target: 0.60 },
    { label: "Venue", target: 0.83 },
    { label: "Gallery", target: 0.89 },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-[#050505]/70 backdrop-blur-md border border-[#c9a45c]/30 shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex items-center gap-2 sm:gap-4 pointer-events-auto select-none"
    >
      {/* Monogram */}
      <span className="text-xs font-serif font-bold text-[#e8d19a] tracking-wider pr-1 border-r border-[#c9a45c]/30">
        P &amp; A
      </span>

      {/* Nav Links */}
      <div className="flex items-center gap-2 sm:gap-4">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(item.target)}
            className="text-[10px] sm:text-[11px] font-sans tracking-widest text-[#f7f0e2]/75 hover:text-[#e8d19a] transition-colors uppercase cursor-pointer"
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={onOpenRSVP}
          className="px-2.5 py-0.5 rounded-full bg-[#c9a45c]/20 border border-[#c9a45c]/50 text-[10px] sm:text-[11px] font-sans tracking-widest text-[#e8d19a] hover:bg-[#c9a45c]/30 transition-colors uppercase cursor-pointer"
        >
          RSVP
        </button>

        <button
          onClick={onShare}
          className="text-[10px] sm:text-[11px] font-sans tracking-widest text-[#f7f0e2]/75 hover:text-[#e8d19a] transition-colors uppercase cursor-pointer"
          title="Share via WhatsApp"
        >
          Share
        </button>
      </div>
    </motion.nav>
  );
}
