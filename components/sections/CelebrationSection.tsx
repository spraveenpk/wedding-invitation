"use client";
import { motion } from "framer-motion";

export default function CelebrationSection() {
  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#fffcf4]/95 to-[#fff7e8]/90 backdrop-blur-md border-2 border-[#d9a441]/50 shadow-2xl relative overflow-hidden"
      >
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[#a90b52] text-xs font-semibold tracking-widest uppercase">
            MUSICAL EVENING &amp; DINNER
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#4a2923] mt-1">
            THE CELEBRATION
          </h2>
          <div className="w-16 h-[2px] bg-[#d9a441] mx-auto mt-2" />
        </div>

        {/* Reception Card */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-[#a90b52]/10 via-[#d41468]/5 to-[#f1ce72]/15 border border-[#d9a441]/40 text-center">
          <div className="text-sm font-semibold tracking-widest uppercase text-[#a90b52] mb-1">
            ✨ RECEPTION ✨
          </div>

          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#b72d3a] my-2">
            SUNDAY, 15 NOVEMBER 2026
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f1ce72]/30 border border-[#d9a441] text-[#4a2923] text-sm font-medium mt-2">
            <span>⏰</span>
            <span>6:00 PM – 9:00 PM</span>
          </div>

          <p className="text-xs sm:text-sm text-[#70452c] mt-4 font-light">
            Join us for an auspicious evening of music, joyous moments, and a grand wedding feast.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
