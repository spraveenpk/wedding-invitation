"use client";
import { motion } from "framer-motion";

export default function GaneshaBlessing() {
  return (
    <section className="relative w-full max-w-xl mx-auto px-4 pt-6 pb-2 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="flex flex-col items-center"
      >
        {/* Sacred Ganesha Silhouette / Motif */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#947124] shadow-lg mb-3">
          <div className="w-full h-full rounded-full bg-[#4a0404] flex items-center justify-center border border-[#d4af37]/60">
            <span className="text-2xl sm:text-3xl filter drop-shadow">🕉️</span>
          </div>
        </div>

        {/* Sanskrit Inscription */}
        <p className="text-sm sm:text-base font-serif text-[#d4af37] tracking-[0.25em] font-medium drop-shadow-sm mb-1">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <p className="text-[11px] sm:text-xs text-[#f3e5ab]/80 font-serif italic tracking-widest uppercase">
          With the divine grace of the Almighty and the blessings of our elders
        </p>

        {/* Filigree Line */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-3" />
      </motion.div>
    </section>
  );
}
