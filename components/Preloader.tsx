"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

interface PreloaderProps {
  onFinish?: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [readyToOpen, setReadyToOpen] = useState(false);
  const dismissedRef = useRef(false);

  const startMusicAndOpen = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    // 1. Play audio synchronously within user gesture callstack
    try {
      const audioEl = document.getElementById("wedding-bgm") as HTMLAudioElement | null;
      if (audioEl) {
        audioEl.volume = 0.5;
        audioEl.play().catch(() => {});
      }
    } catch {}

    try {
      if (typeof (window as unknown as { __playWeddingMusic?: () => void }).__playWeddingMusic === "function") {
        (window as unknown as { __playWeddingMusic: () => void }).__playWeddingMusic();
      }
    } catch {}

    window.dispatchEvent(new CustomEvent("play-wedding-music"));

    // 2. Remember intro was seen in this session
    try {
      sessionStorage.setItem("wedding_v2_intro_seen", "true");
    } catch {}

    // 3. Smooth fadeout into temple doorway
    setIsFadingOut(true);
    setTimeout(() => {
      setIsDone(true);
      onFinish?.();
    }, 700);
  }, [onFinish]);

  useEffect(() => {
    // If already seen in this session, skip immediately
    try {
      if (sessionStorage.getItem("wedding_v2_intro_seen") === "true") {
        setIsDone(true);
        onFinish?.();
        return;
      }
    } catch {}

    // Mark ready to open after 400ms
    const timer = setTimeout(() => {
      setReadyToOpen(true);
    }, 400);

    // Attempt direct audio play on mount in case browser policy permits
    try {
      const audioEl = document.getElementById("wedding-bgm") as HTMLAudioElement | null;
      audioEl?.play().catch(() => {});
    } catch {}

    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);

  if (isDone) {
    return <div id="preloader-root" data-preloader-active="false" className="hidden" />;
  }

  return (
    <div
      id="preloader-root"
      data-preloader-active={isFadingOut ? "false" : "true"}
      onClick={startMusicAndOpen}
      onTouchStart={startMusicAndOpen}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] px-4 text-center cursor-pointer transition-all duration-700 ease-out select-none ${
        isFadingOut
          ? "pointer-events-none opacity-0 scale-[1.03] blur-sm"
          : "opacity-100 scale-100 blur-0"
      }`}
      role="dialog"
      aria-label="Welcome to our wedding invitation"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(58,13,24,0.45) 0%, rgba(5,5,5,0.95) 75%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        {/* Auspicious golden emblem */}
        <div
          className="mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-gold/70 bg-black/60 shadow-[0_0_40px_rgba(201,164,92,0.3)] animate-pulse"
        >
          <span className="font-display text-2xl sm:text-3xl text-gold">❈</span>
        </div>

        <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold/80">
          Together with their families
        </p>

        <h1 className="mt-3 font-display text-2xl sm:text-4xl text-ivory leading-tight">
          {WEDDING_CONFIG.groom.fullName}
        </h1>

        <p className="my-1 font-display text-xl sm:text-2xl italic text-gold">
          &amp;
        </p>

        <h1 className="font-display text-2xl sm:text-4xl text-ivory leading-tight">
          {WEDDING_CONFIG.bride.fullName}
        </h1>

        <div className="gold-divider mx-auto my-5 sm:my-6 w-28 sm:w-36" />

        <p className="font-display text-sm sm:text-base italic text-body-soft">
          {WEDDING_CONFIG.tagline}
        </p>

        {/* Prominent Open Invitation Button */}
        <div className="mt-8 sm:mt-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              startMusicAndOpen();
            }}
            className={`btn-gold relative inline-flex items-center gap-2 rounded-full py-3 px-8 text-xs uppercase tracking-luxe shadow-[0_0_35px_rgba(201,164,92,0.45)] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
              readyToOpen ? "animate-bounce" : "opacity-90"
            }`}
          >
            <span>Open Invitation</span>
            <span className="text-sm">✨</span>
          </button>
        </div>

        <p className="mt-4 text-[10px] sm:text-[11px] uppercase tracking-wider text-gold/60">
          Tap anywhere to enter with music 🎵
        </p>
      </div>
    </div>
  );
}
