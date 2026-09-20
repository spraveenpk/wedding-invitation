"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playWarpSound, playQuantumBeep, startSciFiSynthwave } from "./SciFiAudio";

interface QuantumLockProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function QuantumLock({ isOpen, onOpen }: QuantumLockProps) {
  const [isWarping, setIsWarping] = useState(false);

  const handleEngage = () => {
    if (isWarping || isOpen) return;
    setIsWarping(true);

    // Audio SFX
    playQuantumBeep(1800);
    setTimeout(() => playWarpSound(), 150);

    // Start background driving synthwave music
    startSciFiSynthwave();

    // Trigger warp explosion transition
    setTimeout(() => {
      onOpen();
      setIsWarping(false);
    }, 1200);
  };

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-[#030611]/85 backdrop-blur-md">
        
        {/* Top Status Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>SECURITY PROTOCOL: WEDDING 2026</span>
          </div>
          <p className="text-[#a0b3d6] text-xs font-mono mt-2 tracking-wider">
            INITIALIZING QUANTUM ENCRYPTION KEY...
          </p>
        </motion.div>

        {/* Central Holographic Quantum Core */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={
            isWarping
              ? { scale: [1, 1.25, 0], opacity: [1, 1, 0], rotate: [0, 90, 180] }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: isWarping ? 1.1 : 0.8, ease: "easeInOut" }}
          className="relative flex flex-col items-center"
        >
          {/* Glowing Plasma Flare Behind */}
          <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-[#00f0ff]/30 via-[#b026ff]/30 to-[#ffd000]/20 blur-2xl animate-pulse pointer-events-none" />

          {/* Interactive Holographic Reactor Seal Button */}
          <button
            onClick={handleEngage}
            disabled={isWarping}
            className="group relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-[#00f0ff] via-[#b026ff] to-[#ffd000] shadow-[0_0_50px_rgba(0,240,255,0.5)] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Engage Wedding Mission"
          >
            {/* Outer Rotating Hex Tech Ring */}
            <div className="w-full h-full rounded-full p-2.5 bg-[#050b1a] flex items-center justify-center border-2 border-[#00f0ff]/80 relative overflow-hidden">
              
              {/* Scanline Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />

              {/* Central Core Chamber */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0a142e] via-[#050b1a] to-[#02050e] flex flex-col items-center justify-center border border-[#00f0ff]/40 shadow-inner text-center p-4 relative z-10">
                
                {/* Protocol Code */}
                <div className="text-[10px] font-mono text-[#00f0ff] tracking-[0.3em] uppercase mb-1">
                  SYS://QUANTUM-LOCK
                </div>

                {/* Monogram P & S in Neon Cyan & Amber Gold */}
                <div className="text-5xl sm:text-6xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#00f0ff] to-[#b026ff] tracking-widest drop-shadow-[0_0_20px_rgba(0,240,255,0.8)] py-1">
                  P &amp; S
                </div>

                {/* Cyber Divider */}
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent my-1.5" />

                {/* Names */}
                <p className="text-xs font-mono text-[#ffffff] tracking-widest uppercase font-semibold">
                  Praveen &amp; Priya
                </p>

                {/* Year */}
                <p className="text-[10px] font-mono text-[#ffd000] tracking-widest mt-1">
                  T-MINUS 2026
                </p>
              </div>
            </div>
          </button>

          {/* INITIATE MISSION / ENGAGE Button */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="mt-7 px-8 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#00f0ff] text-[#02050e] font-mono font-bold text-xs sm:text-sm tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(0,240,255,0.7)] flex items-center gap-2 group-hover:brightness-125 pointer-events-none"
          >
            <span>⚡</span>
            <span>ENGAGE / INITIATE</span>
            <span>⚡</span>
          </motion.div>
        </motion.div>

        {/* Warp speed explosion overlay */}
        {isWarping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 3 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-full bg-radial from-[#00f0ff] via-[#b026ff]/60 to-transparent blur-3xl" />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
