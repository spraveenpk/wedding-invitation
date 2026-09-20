"use client";
import { motion } from "framer-motion";

export default function FinalMissionCard() {
  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 py-6 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="rounded-3xl p-6 sm:p-12 bg-gradient-to-b from-[#09142c] via-[#050b1a] to-[#02050e] text-white border-2 border-[#00f0ff] shadow-[0_0_50px_rgba(0,240,255,0.4)] text-center relative overflow-hidden"
      >
        {/* Holographic Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] [background-size:100%_4px] pointer-events-none" />

        {/* Tech Corner Details */}
        <div className="absolute top-3 left-3 text-[#00f0ff] font-mono text-xs select-none">SYS://END</div>
        <div className="absolute top-3 right-3 text-[#00f0ff] font-mono text-xs select-none">VER://2026</div>

        <div className="text-xs font-mono tracking-[0.3em] uppercase text-[#ffd000] mb-2 drop-shadow">
          MISSION STATUS: ETERNAL ALLIANCE APPROVED
        </div>

        {/* Commander Names (CLEAN - NO DEGREES) */}
        <div className="my-6">
          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#00f0ff] to-[#70e0ff] tracking-wider drop-shadow-[0_0_20px_rgba(0,240,255,0.7)]">
            Praveen Kumar S
          </h1>
          <div className="text-2xl sm:text-3xl font-mono text-[#ffd000] my-2 font-bold">
            &amp;
          </div>
          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ff70ba] to-[#b026ff] tracking-wider drop-shadow-[0_0_20px_rgba(176,38,255,0.7)]">
            Sri Arunachala Priya
          </h1>
        </div>

        <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent mx-auto my-5" />

        {/* Operations Summary */}
        <div className="space-y-3 max-w-md mx-auto my-6 text-xs sm:text-sm font-mono">
          <div className="p-3.5 rounded-2xl bg-[#0e1c38]/70 border border-[#00f0ff]/40">
            <span className="font-bold text-[#00f0ff] uppercase tracking-widest block text-[11px] mb-1">
              RECEPTION
            </span>
            <span className="text-white font-medium">15 NOVEMBER 2026 • 6:00 PM – 9:00 PM</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1a0e33]/70 border border-[#b026ff]/40">
            <span className="font-bold text-[#ff70ba] uppercase tracking-widest block text-[11px] mb-1">
              MUHURTHAM
            </span>
            <span className="text-white font-medium">16 NOVEMBER 2026 • 6:00 AM – 7:00 AM</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0e1c38]/70 border border-[#ffd000]/40">
            <span className="font-bold text-[#ffd000] uppercase tracking-widest block text-[11px] mb-1">
              VENUE
            </span>
            <span className="text-white font-medium">Kettimelam Mahal, Coimbatore</span>
          </div>
        </div>

        {/* Closing Invitation Message */}
        <p className="text-sm sm:text-base font-mono text-[#a0b3d6] max-w-md mx-auto leading-relaxed my-6 px-2">
          &ldquo;We warmly invite you and your family to bless us on our special day.&rdquo;
        </p>

        {/* Final Signatures */}
        <div className="mt-8 pt-6 border-t border-[#00f0ff]/30">
          <p className="text-xs font-mono tracking-widest text-[#a0b3d6] uppercase mb-1">
            With love,
          </p>
          <p className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
            Praveen &amp; Sri Arunachala Priya
          </p>
        </div>

        {/* Holographic Seal Logo */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#00f0ff] via-[#b026ff] to-[#ffd000] shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#050a18] flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-[#00f0ff] tracking-widest">
                P &amp; S
              </span>
            </div>
          </div>
          <p className="text-[10px] font-mono tracking-[0.25em] text-[#ffd000] uppercase mt-2 font-bold">
            TWO HEARTS • ONE TIMELINE • FOREVER
          </p>
        </div>
      </motion.div>
    </section>
  );
}
