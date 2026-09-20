"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { startWeddingAmbience } from "../Audio/IndianWeddingAudio";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsVisible(false);
    startWeddingAmbience();
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#f7f0e2] select-none p-6"
      >
        {/* Soft Golden Ambient Glow */}
        <div className="absolute w-72 h-72 rounded-full bg-[#c9a45c]/10 blur-3xl pointer-events-none" />

        {/* Small Traditional Gold Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex flex-col items-center mb-6"
        >
          <div className="w-16 h-16 rounded-full p-[1.5px] bg-gradient-to-tr from-[#c9a45c] via-[#e8d19a] to-[#24070f] shadow-2xl flex items-center justify-center mb-3">
            <div className="w-full h-full rounded-full bg-[#0b0807] flex items-center justify-center border border-[#c9a45c]/40">
              <span className="text-xl font-serif font-bold text-[#e8d19a] tracking-wider">
                P &amp; A
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-serif italic text-[#c9a45c] tracking-[0.25em] uppercase drop-shadow-sm">
            Our story begins...
          </p>
        </motion.div>

        {/* Thin Gold Loading Line */}
        <div className="w-48 sm:w-64 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-[#c9a45c] via-[#e8d19a] to-[#c9a45c] shadow-[0_0_8px_#e8d19a]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* SKIP INTRO Button */}
        <button
          onClick={handleSkip}
          className="px-5 py-2 rounded-full bg-white/5 border border-[#c9a45c]/30 text-[#e8d19a] text-[11px] font-sans tracking-[0.25em] uppercase hover:bg-white/10 hover:border-[#c9a45c]/60 active:scale-95 transition-all cursor-pointer"
        >
          SKIP INTRO
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
