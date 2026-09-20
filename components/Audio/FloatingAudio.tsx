"use client";
import { useState, useEffect } from "react";
import { startWeddingAmbience, stopWeddingAmbience, isAmbienceActive } from "./IndianWeddingAudio";

export default function FloatingAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(isAmbienceActive());
  }, []);

  const toggle = () => {
    if (isPlaying) {
      stopWeddingAmbience();
      setIsPlaying(false);
    } else {
      startWeddingAmbience();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggle}
        className="group relative w-12 h-12 rounded-full p-[1px] bg-gradient-to-tr from-[#c9a45c] via-[#e8d19a] to-[#24070f] shadow-[0_8px_25px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
        aria-label="Toggle Wedding Music"
        title={isPlaying ? "Mute Music" : "Play Classical Veena & Flute Music"}
      >
        {/* Soft Golden Halo when active */}
        {isPlaying && (
          <div className="absolute -inset-1 rounded-full border border-[#c9a45c]/50 animate-ping pointer-events-none" />
        )}

        <div className="w-full h-full rounded-full bg-[#0b0807] flex items-center justify-center text-sm border border-[#c9a45c]/30 shadow-inner">
          {isPlaying ? (
            <span className="text-[#e8d19a] animate-pulse">♪</span>
          ) : (
            <span className="text-white/40">🔇</span>
          )}
        </div>
      </button>
    </div>
  );
}
