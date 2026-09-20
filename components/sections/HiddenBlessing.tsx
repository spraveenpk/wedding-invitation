"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTempleBell } from "../AudioSystem";

interface HiddenBlessingProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HiddenBlessing({ isOpen, onClose }: HiddenBlessingProps) {
  useEffect(() => {
    if (isOpen) {
      playTempleBell();
    }
  }, [isOpen]);

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
            {/* Top Glowing Halo */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#d4af37]/25 rounded-full blur-2xl pointer-events-none" />

            {/* Swinging Temple Bell Animation */}
            <motion.div
              animate={{ rotate: [-15, 15, -10, 10, -5, 5, 0] }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#800d20] shadow-xl mx-auto mb-4 flex items-center justify-center cursor-pointer"
              onClick={() => playTempleBell()}
              title="Ring Temple Bell Again"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#670a1a] to-[#4a0404] flex items-center justify-center text-4xl shadow-inner border border-[#d4af37]/60">
                🔔
              </div>
            </motion.div>

            <span className="text-xs font-serif tracking-[0.25em] text-[#670a1a] uppercase font-bold">
              DIVINE TEMPLE BLESSING
            </span>

            <h3 className="text-2xl font-serif font-bold text-[#4a0404] my-2">
              Sacred Grace
            </h3>

            <div className="w-16 h-[1.5px] bg-[#d4af37] mx-auto my-3" />

            {/* Sacred Inscription */}
            <p className="text-base sm:text-lg font-serif italic text-[#4a0404] leading-relaxed my-4 px-2">
              &ldquo;May your journey together be filled with love, happiness, harmony and endless blessings.&rdquo;
            </p>

            <p className="text-xs font-serif text-[#8a5a3c] mb-6">
              ॥ दीर्घायुष्मान् भव • शुभमस्तु ॥
            </p>

            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#670a1a] via-[#800d20] to-[#4a0404] text-[#fffdf9] border border-[#d4af37] text-xs font-serif tracking-[0.2em] uppercase font-bold shadow-lg hover:brightness-125 active:scale-95 transition-all cursor-pointer"
            >
              RECEIVE BLESSING 🙏
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
