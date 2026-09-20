"use client";
import { useState, useEffect } from "react";
import { startWeddingMusic, stopWeddingMusic, isWeddingMusicPlaying } from "./AudioSystem";

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(isWeddingMusicPlaying());
  }, []);

  const toggle = () => {
    if (isPlaying) {
      stopWeddingMusic();
      setIsPlaying(false);
    } else {
      startWeddingMusic();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggle}
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#800d20] shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
        aria-label="Toggle Wedding Music"
        title={isPlaying ? "Mute Music" : "Play Kalyana Nadaswaram Music"}
      >
        {/* Animated Golden Pulse Ring when playing */}
        {isPlaying && (
          <div className="absolute -inset-1.5 rounded-full border-2 border-[#d4af37]/60 animate-ping pointer-events-none" />
        )}

        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#670a1a] to-[#380208] flex items-center justify-center text-xl shadow-inner border border-[#d4af37]/60">
          {isPlaying ? (
            <span className="text-[#f3e5ab] animate-spin text-base">🎶</span>
          ) : (
            <span className="text-[#f3e5ab]/70 text-base">🔇</span>
          )}
        </div>
      </button>
    </div>
  );
}
