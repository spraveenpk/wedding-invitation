"use client";
import { useState, useEffect } from "react";
import { startSciFiSynthwave, stopSciFiSynthwave, isSynthwaveActive } from "./SciFiAudio";

export default function SciFiMusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(isSynthwaveActive());
  }, []);

  const toggle = () => {
    if (isPlaying) {
      stopSciFiSynthwave();
      setIsPlaying(false);
    } else {
      startSciFiSynthwave();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggle}
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#00f0ff] via-[#b026ff] to-[#ffd000] shadow-[0_0_25px_rgba(0,240,255,0.6)] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
        aria-label="Toggle Cyberpunk Audio"
        title={isPlaying ? "Mute Cyberpunk Audio" : "Engage Cyberpunk Audio"}
      >
        {/* Animated Beacon Ring when active */}
        {isPlaying && (
          <div className="absolute -inset-1.5 rounded-full border-2 border-[#00f0ff] animate-ping pointer-events-none" />
        )}

        <div className="w-full h-full rounded-full bg-[#050b1a] flex items-center justify-center text-lg border border-[#00f0ff]/50 shadow-inner">
          {isPlaying ? (
            <span className="text-[#00f0ff] animate-pulse">⚡</span>
          ) : (
            <span className="text-[#a0b3d6]/60">🔇</span>
          )}
        </div>
      </button>
    </div>
  );
}
