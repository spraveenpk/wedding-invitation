"use client";
import { motion } from "framer-motion";

export default function MuhurthamSection() {
  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#fffcf4]/95 via-[#fff7e8]/90 to-[#fdf1db]/90 backdrop-blur-md border-2 border-[#d9a441] shadow-2xl relative overflow-hidden"
      >
        {/* Glow Halo */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f1ce72]/30 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[#a90b52] text-xs font-semibold tracking-widest uppercase">
            SACRED WEDDING RITUAL
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#b72d3a] mt-1">
            MUHURTHAM
          </h2>
          <div className="w-16 h-[2px] bg-[#d9a441] mx-auto mt-2" />
        </div>

        {/* Muhurtham Details Box */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-[#b72d3a]/10 via-[#d9a441]/15 to-[#a90b52]/10 border-2 border-[#d9a441] text-center relative">
          
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#b72d3a] mb-1">
            🪔 AUSPICIOUS CEREMONY 🪔
          </div>

          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#4a2923] my-2">
            MONDAY, 16 NOVEMBER 2026
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#a90b52] to-[#b72d3a] text-[#fffcf4] text-sm font-bold shadow-md my-2">
            <span>☀️</span>
            <span>6:00 AM – 7:00 AM</span>
          </div>

          <p className="text-xs sm:text-sm text-[#70452c] mt-4 leading-relaxed font-light">
            As the sacred mantras resonate, the Mangala Vadhyam echoes, and the sacred Thali is tied,
            your presence and blessings will forever grace our new beginning.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
