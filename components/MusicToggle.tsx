"use client";

import { useRef, useEffect } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

/**
 * Continuous Background Music Component
 * - No mute button displayed on the website as requested.
 * - Plays continuously in a loop.
 * - Activates seamlessly on first user interaction (touch, click, scroll) or mount.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;

    let hasStarted = false;

    const startAudio = () => {
      if (!audio || hasStarted) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStarted = true;
            removeListeners();
          })
          .catch(() => {
            // Browser blocked unmuted autoplay; wait for next user touch/click/scroll
          });
      }
    };

    const removeListeners = () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("keydown", startAudio);
      window.removeEventListener("play-wedding-music", startAudio);
    };

    // Try immediately (in case browser allows autoplay)
    startAudio();

    // Listen for any first user action on the page
    window.addEventListener("click", startAudio, { passive: true });
    window.addEventListener("touchstart", startAudio, { passive: true });
    window.addEventListener("scroll", startAudio, { passive: true });
    window.addEventListener("pointerdown", startAudio, { passive: true });
    window.addEventListener("keydown", startAudio, { passive: true });
    window.addEventListener("play-wedding-music", startAudio);

    return () => {
      removeListeners();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={WEDDING_CONFIG.audio?.src || "/audio/wedding_music.mp3"}
      loop
      preload="auto"
      playsInline
      aria-hidden="true"
    />
  );
}
