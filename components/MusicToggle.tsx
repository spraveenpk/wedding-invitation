"use client";

import { useRef, useEffect } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

/**
 * Continuous Background Music Component
 * - No mute button on the UI (per user request).
 * - Plays continuously in a loop with rich sound.
 * - Activates on first touch, click, scroll, preloader entry, or immediate autoplay.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.loop = true;

    const playAudio = () => {
      if (!audio) return;
      audio.volume = 0.5;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio is now playing continuously
          })
          .catch(() => {
            // Waiting for user gesture
          });
      }
    };

    // Expose globally for preloader and buttons to trigger synchronously on user tap
    (window as unknown as { __playWeddingMusic?: () => void }).__playWeddingMusic = playAudio;

    // Try immediately on load (in case browser permits autoplay)
    playAudio();

    // Attach to first user interaction on the window
    const onFirstInteract = () => {
      playAudio();
    };

    const events = ["click", "touchstart", "touchend", "scroll", "pointerdown", "keydown"];
    events.forEach((evt) => {
      window.addEventListener(evt, onFirstInteract, { passive: true });
    });

    window.addEventListener("play-wedding-music", playAudio);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, onFirstInteract);
      });
      window.removeEventListener("play-wedding-music", playAudio);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      id="wedding-bgm"
      src={WEDDING_CONFIG.audio?.src || "/audio/wedding_music.mp3"}
      loop
      preload="auto"
      playsInline
      aria-hidden="true"
    />
  );
}
