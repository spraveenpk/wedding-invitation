"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {}
      });
      audioCtxRef.current?.close();
    };
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 900;
      filter.Q.value = 0.4;

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Indian classical Tanpura harmonic drone frequencies in A / E
      const freqs = [110, 164.81, 220, 220.7];
      const gains = [0.5, 0.28, 0.34, 0.16];

      const oscs = freqs.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 3 ? "triangle" : "sine";
        osc.frequency.value = freq;

        const gainNode = ctx.createGain();
        gainNode.gain.value = gains[i];

        // LFO for slow breathing amplitude modulation
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.05 + i * 0.017;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = gains[i] * 0.35;

        lfo.connect(lfoGain);
        lfoGain.connect(gainNode.gain);
        lfo.start();

        osc.connect(gainNode);
        gainNode.connect(filter);
        osc.start();

        return osc;
      });

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
      oscillatorsRef.current = oscs;
    }
  };

  const toggleMusic = async () => {
    initAudio();
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const now = ctx.currentTime;

    if (!isPlaying) {
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.2, now + 1.5);
      setIsPlaying(true);
    } else {
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        setIsPlaying(false);
      }, 800);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
      aria-pressed={isPlaying}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gold/50 bg-black/75 text-base sm:text-lg text-gold backdrop-blur-md transition-all duration-500 hover:border-gold hover:text-champagne cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
    >
      {isPlaying ? "🔊" : "🔇"}
    </button>
  );
}
