"use client";
import { motion } from "framer-motion";

export default function MissionBriefing() {
  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-6 sm:p-10 bg-[#060c1d]/90 backdrop-blur-xl border border-[#00f0ff]/50 shadow-[0_0_40px_rgba(0,240,255,0.2)] text-center relative overflow-hidden"
      >
        {/* Holographic Scanline Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] [background-size:100%_4px] pointer-events-none" />

        {/* Tech Corner Brackets */}
        <div className="absolute top-2 left-2 text-[#00f0ff] font-mono text-xs select-none">[+]</div>
        <div className="absolute top-2 right-2 text-[#00f0ff] font-mono text-xs select-none">[+]</div>
        <div className="absolute bottom-2 left-2 text-[#00f0ff] font-mono text-xs select-none">[+]</div>
        <div className="absolute bottom-2 right-2 text-[#00f0ff] font-mono text-xs select-none">[+]</div>

        {/* Mission Directive Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/60 text-[#00f0ff] text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <span>⚡ MISSION DIRECTIVE: ETERNAL UNION</span>
        </div>

        <p className="text-xs font-mono text-[#a0b3d6] tracking-widest uppercase mb-6">
          TRANSMITTING WEDDING INVITATION PROTOCOL ACROSS ALL FREQUENCIES
        </p>

        {/* Commander 01: Praveen Kumar S (CLEAN - NO QUALIFICATIONS) */}
        <div className="my-5 p-4 rounded-2xl bg-[#09142c]/60 border border-[#00f0ff]/30">
          <div className="text-[11px] font-mono text-[#00f0ff] tracking-[0.25em] uppercase mb-1">
            COMMANDER 01
          </div>
          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#00f0ff] to-[#70e0ff] tracking-wider drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
            Praveen Kumar S
          </h1>
        </div>

        {/* Quantum Fusion Divider */}
        <div className="flex items-center justify-center gap-4 my-3">
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#b026ff]" />
          <span className="text-2xl sm:text-3xl font-mono font-bold text-[#ffd000] drop-shadow-[0_0_10px_rgba(255,208,0,0.8)]">
            &amp;
          </span>
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#b026ff]" />
        </div>

        {/* Commander 02: Sri Arunachala Priya (CLEAN - NO QUALIFICATIONS) */}
        <div className="my-5 p-4 rounded-2xl bg-[#09142c]/60 border border-[#b026ff]/30">
          <div className="text-[11px] font-mono text-[#b026ff] tracking-[0.25em] uppercase mb-1">
            COMMANDER 02
          </div>
          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ff70ba] to-[#b026ff] tracking-wider drop-shadow-[0_0_15px_rgba(176,38,255,0.6)]">
            Sri Arunachala Priya
          </h1>
        </div>

        {/* Mission Motto */}
        <div className="mt-8 pt-6 border-t border-[#00f0ff]/25">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#ffd000] font-bold">
            TWO HEARTS • ONE TIMELINE • FOREVER
          </p>
          <p className="text-xs font-mono text-[#a0b3d6] mt-2 leading-relaxed">
            Together with our families, we initiate the greatest adventure of our lives. Join our cosmic celebration.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
