"use client";

import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onFinish?: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    // Check if already dismissed in session
    try {
      if (sessionStorage.getItem("wedding_v2_intro_seen") === "true") {
        setIsDone(true);
        onFinish?.();
        return;
      }
    } catch {}

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 300 : 1200;
    const startTime = performance.now();
    let animationFrame = 0;

    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      try {
        sessionStorage.setItem("wedding_v2_intro_seen", "true");
      } catch {}
      cancelAnimationFrame(animationFrame);
      setIsFadingOut(true);
      setTimeout(() => {
        setIsDone(true);
        onFinish?.();
      }, 600);
    };

    const tick = (now: number) => {
      if (dismissedRef.current) return;
      const elapsed = Math.min(1, (now - startTime) / duration);
      // Smooth cubic-out easing for progress bar
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(eased);

      if (elapsed < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        dismiss();
      }
    };

    animationFrame = requestAnimationFrame(tick);

    // Also dismiss smoothly on user interaction
    const onUserInteraction = () => dismiss();
    window.addEventListener("wheel", onUserInteraction, { passive: true, once: true });
    window.addEventListener("touchmove", onUserInteraction, { passive: true, once: true });

    (window as unknown as { __finishIntro?: () => void }).__finishIntro = dismiss;

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("wheel", onUserInteraction);
      window.removeEventListener("touchmove", onUserInteraction);
    };
  }, [onFinish]);

  if (isDone) {
    return <div id="preloader-root" data-preloader-active="false" className="hidden" />;
  }

  return (
    <div
      id="preloader-root"
      data-preloader-active={isFadingOut ? "false" : "true"}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-all duration-700 ease-out ${
        isFadingOut
          ? "pointer-events-none opacity-0 scale-[1.03] blur-sm"
          : "opacity-100 scale-100 blur-0"
      }`}
      role="status"
      aria-label="Loading the wedding invitation"
    >
      <div
        className="mb-8 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-gold/60"
        style={{
          boxShadow: "0 0 40px rgba(201,164,92,0.25), inset 0 0 20px rgba(201,164,92,0.12)",
        }}
      >
        <span className="font-display text-xl sm:text-2xl text-gold">❈</span>
      </div>

      <p className="font-display text-3xl sm:text-5xl tracking-wide text-gold">
        P &amp; A
      </p>

      <p className="mt-3 text-[11px] sm:text-xs uppercase tracking-luxe text-body-soft">
        Our story begins...
      </p>

      <div className="mt-10 h-[1.5px] w-48 sm:w-72 bg-gold/15 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-gold/70 via-gold to-champagne transition-[width] duration-75 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          if (typeof (window as unknown as { __finishIntro?: () => void }).__finishIntro === "function") {
            (window as unknown as { __finishIntro: () => void }).__finishIntro();
          }
        }}
        className="mt-10 min-h-10 text-[10px] sm:text-[11px] uppercase tracking-luxe text-muted-foreground transition-colors duration-300 hover:text-gold cursor-pointer"
      >
        Skip Intro
      </button>
    </div>
  );
}
