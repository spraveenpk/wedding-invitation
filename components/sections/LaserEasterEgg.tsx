"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playLaserBlaster } from "../SciFiAudio";

interface LaserEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LaserEasterEgg({ isOpen, onClose }: LaserEasterEggProps) {
  const [lasersFired, setLasersFired] = useState(0);

  const fireAgain = () => {
    playLaserBlaster();
    setLasersFired((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#060c1d] border-2 border-[#00f0ff] shadow-[0_0_50px_rgba(0,240,255,0.5)] text-center relative overflow-hidden"
          >
            {/* Plasma Glow Behind */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00f0ff]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Fired Laser Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#00f0ff] to-[#b026ff] shadow-[0_0_25px_rgba(0,240,255,0.7)] mx-auto mb-4 flex items-center justify-center cursor-pointer"
              onClick={fireAgain}
              title="Fire Photon Cannon Again!"
            >
              <div className="w-full h-full rounded-full bg-[#050b1a] flex items-center justify-center text-3xl">
                ⚡
              </div>
            </motion.div>

            <span className="text-[11px] font-mono tracking-[0.3em] text-[#00f0ff] uppercase font-bold">
              CLASSIFIED INTERSTELLAR TRANSMISSION
            </span>

            <h3 className="text-xl sm:text-2xl font-mono font-bold text-white my-2">
              Quantum Resonance
            </h3>

            <div className="w-16 h-[2px] bg-[#00f0ff] mx-auto my-3" />

            {/* Secret Message */}
            <p className="text-sm sm:text-base font-mono text-[#ffd000] leading-relaxed my-4 px-2">
              &ldquo;Love is the ultimate force that transcends space, time, gravity, and all dimensions.&rdquo;
            </p>

            <p className="text-xs font-mono text-[#a0b3d6] mb-4">
              Transmitted from Timeline: 2026 // Praveen &amp; Priya
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={fireAgain}
                className="px-5 py-2 rounded-full bg-[#00f0ff] text-[#02050e] font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:brightness-125 active:scale-95 transition-all cursor-pointer"
              >
                FIRE LASER 💥 ({lasersFired})
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#0e1933] border border-[#00f0ff]/50 text-[#00f0ff] font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#00f0ff]/10 active:scale-95 transition-all cursor-pointer"
              >
                DISMISS
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
