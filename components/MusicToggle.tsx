"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    audio.volume = 0.05;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          // Smooth volume ramp to 0.45
          const targetVolume = 0.45;
          const step = 0.04;
          fadeIntervalRef.current = setInterval(() => {
            if (!audio) return clearFade();
            if (audio.volume + step < targetVolume) {
              audio.volume = Math.min(targetVolume, audio.volume + step);
            } else {
              audio.volume = targetVolume;
              clearFade();
            }
          }, 60);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until next interaction
          setIsPlaying(false);
        });
    }
  }, []);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    const step = 0.06;
    fadeIntervalRef.current = setInterval(() => {
      if (!audio) return clearFade();
      if (audio.volume - step > 0.05) {
        audio.volume = Math.max(0, audio.volume - step);
      } else {
        audio.volume = 0;
        audio.pause();
        setIsPlaying(false);
        clearFade();
      }
    }, 50);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  useEffect(() => {
    // Listen for custom trigger from "Enter Our Story" button
    const handleTrigger = () => {
      if (!isPlaying) {
        playMusic();
      }
    };

    window.addEventListener("play-wedding-music", handleTrigger);

    return () => {
      window.removeEventListener("play-wedding-music", handleTrigger);
      clearFade();
    };
  }, [isPlaying, playMusic]);

  return (
    <>
      <audio
        ref={audioRef}
        src={WEDDING_CONFIG.audio?.src || "/audio/wedding_music.mp3"}
        loop
        preload="auto"
        onCanPlay={() => setIsLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause wedding music" : "Play celebratory wedding music"}
          aria-pressed={isPlaying}
          title={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
          className={`group relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border transition-all duration-500 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.7)] ${
            isPlaying
              ? "border-gold bg-black/85 text-champagne shadow-[0_0_25px_rgba(201,164,92,0.4)]"
              : "border-gold/40 bg-black/75 text-gold/70 hover:border-gold hover:text-champagne"
          }`}
        >
          {/* Animated Gold Ring when music is playing */}
          {isPlaying && (
            <span
              className="absolute -inset-1 rounded-full border border-gold/40 animate-ping pointer-events-none opacity-60"
              aria-hidden="true"
            />
          )}

          {isPlaying ? (
            /* Equalizer animation in gold */
            <div className="flex items-end gap-[3px] h-4 sm:h-5" aria-hidden="true">
              <span className="w-[3px] bg-gold rounded-full animate-[musicBar_0.8s_ease-in-out_infinite_alternate]" style={{ height: "60%" }} />
              <span className="w-[3px] bg-champagne rounded-full animate-[musicBar_1.1s_ease-in-out_infinite_alternate_0.2s]" style={{ height: "100%" }} />
              <span className="w-[3px] bg-gold rounded-full animate-[musicBar_0.7s_ease-in-out_infinite_alternate_0.4s]" style={{ height: "45%" }} />
              <span className="w-[3px] bg-champagne rounded-full animate-[musicBar_0.95s_ease-in-out_infinite_alternate_0.1s]" style={{ height: "80%" }} />
            </div>
          ) : (
            /* Muted music note */
            <div className="relative flex items-center justify-center" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-gold/70 group-hover:text-gold transition-colors"
              >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
                <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" className="text-gold/80" />
              </svg>
            </div>
          )}
        </button>

        {/* Small subtle label that appears on hover or mobile initial prompt */}
        <span
          onClick={toggleMusic}
          className={`hidden sm:inline-flex items-center text-[10px] uppercase tracking-luxe px-3 py-1.5 rounded-full border backdrop-blur-md cursor-pointer select-none transition-all duration-300 ${
            isPlaying
              ? "bg-black/60 border-gold/30 text-champagne"
              : "bg-black/50 border-white/10 text-muted-foreground hover:border-gold/40 hover:text-gold"
          }`}
        >
          {isPlaying ? "Music On" : "Play Music"}
        </span>
      </div>
    </>
  );
}
