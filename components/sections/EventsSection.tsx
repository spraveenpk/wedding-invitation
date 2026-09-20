"use client";
import { motion } from "framer-motion";

export default function EventsSection() {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-4">
      {/* Section Subheading */}
      <div className="text-center mb-6">
        <span className="text-[#f3e5ab] text-xs font-serif tracking-[0.25em] uppercase font-semibold drop-shadow">
          AUSPICIOUS CEREMONIES
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fffdf9] drop-shadow-md mt-1">
          Wedding Events
        </h2>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-2" />
      </div>

      {/* Side-by-side on desktop, vertical stack on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. RECEPTION PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#fffdf9]/95 via-[#fbf6ee]/95 to-[#f7eee1]/95 border-2 border-[#d4af37] shadow-[0_15px_40px_rgba(0,0,0,0.45)] text-center relative overflow-hidden flex flex-col justify-between"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-[#d4af37] text-sm">❖</div>
          <div className="absolute top-2 right-2 text-[#d4af37] text-sm">❖</div>
          <div className="absolute inset-2 border border-[#d4af37]/25 rounded-2xl pointer-events-none" />

          <div>
            {/* Stage / Mandapam Icon */}
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] to-[#800d20] mx-auto mb-3 shadow">
              <div className="w-full h-full rounded-full bg-[#670a1a] flex items-center justify-center text-2xl">
                🎭
              </div>
            </div>

            <div className="text-xs font-serif tracking-[0.25em] text-[#670a1a] font-bold uppercase mb-1">
              CELEBRATION &amp; FEAST
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a0404] tracking-wide mb-3">
              RECEPTION
            </h3>

            <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mb-4" />

            {/* Date Card */}
            <div className="py-3 px-4 rounded-xl bg-[#670a1a]/10 border border-[#d4af37]/40 mb-3">
              <div className="flex items-center justify-center gap-2 text-xs font-serif tracking-widest text-[#670a1a] uppercase font-semibold mb-1">
                <span>📅</span>
                <span>DATE</span>
              </div>
              <p className="text-lg sm:text-xl font-serif font-bold text-[#4a0404]">
                Sunday, 15 November 2026
              </p>
            </div>

            {/* Time Card */}
            <div className="py-2.5 px-4 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40">
              <div className="flex items-center justify-center gap-2 text-xs font-serif tracking-widest text-[#670a1a] uppercase font-semibold mb-0.5">
                <span>⏰</span>
                <span>TIMING</span>
              </div>
              <p className="text-base sm:text-lg font-serif font-bold text-[#670a1a]">
                6:00 PM – 9:00 PM
              </p>
            </div>
          </div>

          <p className="text-xs font-serif italic text-[#70452c] mt-4 pt-3 border-t border-[#d4af37]/30">
            Join us for an enchanting musical evening, celebration, and wedding banquet dinner.
          </p>
        </motion.div>

        {/* 2. MUHURTHAM PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#fffdf9]/95 via-[#fbf6ee]/95 to-[#f7eee1]/95 border-2 border-[#d4af37] shadow-[0_15px_40px_rgba(0,0,0,0.45)] text-center relative overflow-hidden flex flex-col justify-between"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-[#d4af37] text-sm">❖</div>
          <div className="absolute top-2 right-2 text-[#d4af37] text-sm">❖</div>
          <div className="absolute inset-2 border border-[#d4af37]/25 rounded-2xl pointer-events-none" />

          <div>
            {/* Gopuram / Temple Icon */}
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] to-[#800d20] mx-auto mb-3 shadow">
              <div className="w-full h-full rounded-full bg-[#670a1a] flex items-center justify-center text-2xl">
                🛕
              </div>
            </div>

            <div className="text-xs font-serif tracking-[0.25em] text-[#670a1a] font-bold uppercase mb-1">
              SACRED VEDIC RITUAL
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a0404] tracking-wide mb-3">
              MUHURTHAM
            </h3>

            <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mb-4" />

            {/* Date Card */}
            <div className="py-3 px-4 rounded-xl bg-[#670a1a]/10 border border-[#d4af37]/40 mb-3">
              <div className="flex items-center justify-center gap-2 text-xs font-serif tracking-widest text-[#670a1a] uppercase font-semibold mb-1">
                <span>📅</span>
                <span>DATE</span>
              </div>
              <p className="text-lg sm:text-xl font-serif font-bold text-[#4a0404]">
                Monday, 16 November 2026
              </p>
            </div>

            {/* Time Card */}
            <div className="py-2.5 px-4 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40">
              <div className="flex items-center justify-center gap-2 text-xs font-serif tracking-widest text-[#670a1a] uppercase font-semibold mb-0.5">
                <span>🌅</span>
                <span>TIMING</span>
              </div>
              <p className="text-base sm:text-lg font-serif font-bold text-[#670a1a]">
                6:00 AM – 7:00 AM
              </p>
            </div>
          </div>

          <p className="text-xs font-serif italic text-[#70452c] mt-4 pt-3 border-t border-[#d4af37]/30">
            As the Mangala Vadhyam resonates and the sacred Thali is tied, bless our new beginning.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
