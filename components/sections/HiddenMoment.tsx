"use client";
import { motion, AnimatePresence } from "framer-motion";

interface HiddenMomentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HiddenMoment({ isOpen, onClose }: HiddenMomentProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#fffdf9] via-[#fbf6ee] to-[#f7eee1] border-2 border-[#d4af37] shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-center relative overflow-hidden"
          >
            {/* Soft Pink & Gold Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#d41468]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Blooming Jasmine & Rose Medallion */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#800d20] shadow-xl mx-auto mb-4 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#800d20] to-[#4a0404] flex items-center justify-center text-4xl shadow-inner border border-[#d4af37]/60">
                🌸
              </div>
            </motion.div>

            <span className="text-xs font-serif tracking-[0.25em] text-[#800d20] uppercase font-bold">
              SECRET MOMENT
            </span>

            <h3 className="text-2xl font-serif font-bold text-[#4a0404] my-2">
              Eternal Promise
            </h3>

            <div className="w-16 h-[1.5px] bg-[#d4af37] mx-auto my-3" />

            {/* Romantic Inscription */}
            <p className="text-lg sm:text-xl font-serif italic text-[#670a1a] leading-relaxed my-4 px-2 font-medium">
              &ldquo;Two hearts, one beautiful forever.&rdquo;
            </p>

            <p className="text-xs font-serif text-[#70452c] mb-6">
              Praveen &amp; Arunachala Priya S
            </p>

            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#800d20] to-[#670a1a] text-[#fffdf9] border border-[#d4af37] text-xs font-serif tracking-[0.2em] uppercase font-bold shadow-lg hover:brightness-125 active:scale-95 transition-all cursor-pointer"
            >
              CHERISH MOMENT ✨
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
