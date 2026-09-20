"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTempleBell, startWeddingMusic } from "./AudioSystem";

interface WeddingSealProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function WeddingSeal({ isOpen, onOpen }: WeddingSealProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleTap = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Play auspicious temple bell
    playTempleBell();

    // Start harmonious ambient wedding music
    startWeddingMusic();

    // Smooth opening transition
    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 1100);
  };

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#2a0307]/80 via-[#180104]/85 to-[#0b0102]/90 backdrop-blur-md">
        
        {/* Soft atmospheric guide text */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[#f3e5ab] text-xs sm:text-sm font-serif italic tracking-widest uppercase mb-6 text-center drop-shadow"
        >
          A beautiful journey begins…
        </motion.p>

        {/* The Luxury Royal Golden Seal */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={
            isOpening
              ? { scale: [1, 1.15, 0], opacity: [1, 1, 0], rotate: [0, 5, -10] }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: isOpening ? 1.0 : 0.8, ease: "easeInOut" }}
          className="relative flex flex-col items-center"
        >
          {/* Glowing Golden Aura & Rotating Halo */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#d4af37]/30 via-[#ffdd80]/20 to-[#800d20]/40 blur-2xl animate-pulse pointer-events-none" />

          {/* Golden Seal Button */}
          <button
            onClick={handleTap}
            disabled={isOpening}
            className="group relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2.5 bg-gradient-to-tr from-[#8a681c] via-[#f3e5ab] to-[#c59b27] shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Tap to open wedding invitation"
          >
            {/* Fine Carved Filigree Outer Golden Ring */}
            <div className="w-full h-full rounded-full p-2 bg-gradient-to-b from-[#d4af37] via-[#947124] to-[#f3e5ab] flex items-center justify-center shadow-inner border border-[#ffd700]/70">
              
              {/* Deep Royal Maroon Embossed Wax Center */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#670a1a] via-[#4a0404] to-[#2e0105] flex flex-col items-center justify-center text-center p-4 border-2 border-[#f3e5ab]/60 shadow-[inset_0_8px_20px_rgba(0,0,0,0.8)] relative overflow-hidden">
                
                {/* Subtle Auspicious Ganesha / Vedic Motif */}
                <div className="text-[#f3e5ab] text-[10px] tracking-[0.25em] font-serif uppercase mb-1 opacity-90">
                  ॥ श्री गणेशाय नमः ॥
                </div>

                {/* Monogram P & S in Royal Antique Gold Calligraphy */}
                <div className="text-5xl sm:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fffdf9] via-[#f3e5ab] to-[#c59b27] tracking-wider drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)] py-1">
                  P &amp; S
                </div>

                {/* Auspicious Lotus Divider Line */}
                <div className="flex items-center justify-center gap-2 my-1.5 w-full">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]" />
                  <span className="text-[#f3e5ab] text-xs">🪷</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]" />
                </div>

                {/* Couple First Names */}
                <p className="text-xs text-[#fffdf9] tracking-[0.2em] uppercase font-serif font-light">
                  Praveen &amp; Priya
                </p>

                {/* Year */}
                <p className="text-[10px] text-[#f3e5ab]/80 font-mono tracking-widest mt-1">
                  NOVEMBER 2026
                </p>
              </div>
            </div>
          </button>

          {/* TAP TO OPEN Interactive Badge */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-6 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#670a1a] via-[#800d20] to-[#4a0404] border-2 border-[#d4af37] shadow-[0_6px_20px_rgba(212,175,55,0.4)] text-[#fffdf9] text-xs sm:text-sm font-serif tracking-[0.25em] uppercase flex items-center gap-2 pointer-events-none group-hover:brightness-125"
          >
            <span className="text-[#f3e5ab]">✨</span>
            <span className="font-semibold text-[#f3e5ab]">TAP TO OPEN</span>
            <span className="text-[#f3e5ab]">✨</span>
          </motion.div>
        </motion.div>

        {/* Bursting particles when opening */}
        {isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-96 h-96 rounded-full bg-radial from-[#ffd700]/50 via-[#f3e5ab]/20 to-transparent blur-xl" />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
