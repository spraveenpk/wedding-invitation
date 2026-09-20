"use client";
import { motion } from "framer-motion";

export default function MissionPhases() {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-4">
      {/* Section Subheading */}
      <div className="text-center mb-6">
        <span className="text-[#00f0ff] text-xs font-mono tracking-[0.3em] uppercase font-bold">
          MISSION SCHEDULE // DUAL PHASES
        </span>
        <h2 className="text-2xl sm:text-4xl font-mono font-bold text-white mt-1 drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          Ceremonial Operations
        </h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent mx-auto mt-2" />
      </div>

      {/* Dual Cyber Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PHASE 01 — RECEPTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-6 sm:p-8 bg-[#060c1d]/90 backdrop-blur-xl border border-[#b026ff]/60 shadow-[0_0_30px_rgba(176,38,255,0.25)] text-center relative overflow-hidden flex flex-col justify-between"
        >
          {/* Scanline Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.03)_1px,transparent_1px)] [background-size:100%_4px] pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b026ff]/15 border border-[#b026ff] text-[#ff70ba] text-[11px] font-mono tracking-widest uppercase mb-3">
              <span>🚀</span>
              <span>PHASE 01 OPERATION</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wide mb-3">
              RECEPTION
            </h3>

            <div className="w-12 h-[2px] bg-[#b026ff] mx-auto mb-5" />

            {/* Date Block */}
            <div className="py-3 px-4 rounded-xl bg-[#130b26]/70 border border-[#b026ff]/40 mb-3 text-center">
              <div className="text-[11px] font-mono text-[#ff70ba] tracking-widest uppercase mb-0.5">
                MISSION DATE
              </div>
              <p className="text-lg sm:text-xl font-mono font-bold text-white">
                Sunday, 15 November 2026
              </p>
            </div>

            {/* Time Block */}
            <div className="py-2.5 px-4 rounded-xl bg-[#09142c]/70 border border-[#00f0ff]/40 text-center">
              <div className="text-[11px] font-mono text-[#00f0ff] tracking-widest uppercase mb-0.5">
                WARP WINDOW / TIMING
              </div>
              <p className="text-base sm:text-lg font-mono font-bold text-[#ffd000]">
                6:00 PM – 9:00 PM (18:00 – 21:00 HRS)
              </p>
            </div>
          </div>

          <p className="text-xs font-mono text-[#a0b3d6] mt-5 pt-3 border-t border-[#b026ff]/30 leading-relaxed">
            Join the commanders for high-energy cosmic celebration, feast, and musical gala banquet.
          </p>
        </motion.div>

        {/* PHASE 02 — MUHURTHAM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-3xl p-6 sm:p-8 bg-[#060c1d]/90 backdrop-blur-xl border border-[#00f0ff]/60 shadow-[0_0_30px_rgba(0,240,255,0.25)] text-center relative overflow-hidden flex flex-col justify-between"
        >
          {/* Scanline Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] [background-size:100%_4px] pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff] text-[#00f0ff] text-[11px] font-mono tracking-widest uppercase mb-3">
              <span>☀️</span>
              <span>PHASE 02 OPERATION</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wide mb-3">
              MUHURTHAM
            </h3>

            <div className="w-12 h-[2px] bg-[#00f0ff] mx-auto mb-5" />

            {/* Date Block */}
            <div className="py-3 px-4 rounded-xl bg-[#07172e]/70 border border-[#00f0ff]/40 mb-3 text-center">
              <div className="text-[11px] font-mono text-[#00f0ff] tracking-widest uppercase mb-0.5">
                SACRED LAUNCH DATE
              </div>
              <p className="text-lg sm:text-xl font-mono font-bold text-white">
                Monday, 16 November 2026
              </p>
            </div>

            {/* Time Block */}
            <div className="py-2.5 px-4 rounded-xl bg-[#130b26]/70 border border-[#b026ff]/40 text-center">
              <div className="text-[11px] font-mono text-[#ff70ba] tracking-widest uppercase mb-0.5">
                DAWN ALIGNMENT / TIMING
              </div>
              <p className="text-base sm:text-lg font-mono font-bold text-[#ffd000]">
                6:00 AM – 7:00 AM (06:00 – 07:00 HRS)
              </p>
            </div>
          </div>

          <p className="text-xs font-mono text-[#a0b3d6] mt-5 pt-3 border-t border-[#00f0ff]/30 leading-relaxed">
            Witness the quantum bonding ceremony and sacred union at dawn across the primary timeline.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
