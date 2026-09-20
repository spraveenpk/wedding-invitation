"use client";

import { useState, useEffect } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getInitialCountdown(): TimeUnits {
  const target = new Date(WEDDING_CONFIG.muhurtham.countdownTarget).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeUnits>(getInitialCountdown);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(WEDDING_CONFIG.muhurtham.countdownTarget).getTime();

    const calculateTime = () => {
      const diff = Math.max(0, target - Date.now());
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { label: "Days", value: String(timeLeft.days) },
    { label: "Hours", value: pad(timeLeft.hours) },
    { label: "Minutes", value: pad(timeLeft.minutes) },
    { label: "Seconds", value: pad(timeLeft.seconds) },
  ];

  return (
    <div
      className="flex items-stretch justify-center gap-2 sm:gap-3 md:gap-5 max-w-lg mx-auto"
      role="timer"
      aria-label={`Countdown to the Muhurtham on ${WEDDING_CONFIG.muhurtham.day}, ${WEDDING_CONFIG.muhurtham.date}`}
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-1 min-w-[64px] max-w-[96px] flex-col items-center rounded-sm border border-border bg-card/75 px-2.5 py-3 sm:px-3.5 sm:py-4 md:px-4 md:py-5 backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:border-gold/60"
          style={{
            boxShadow:
              "0 12px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,164,92,0.18)",
          }}
        >
          <span
            suppressHydrationWarning
            className="font-display text-2xl sm:text-3xl md:text-4xl font-medium leading-none text-gold"
            style={{
              textShadow:
                "0 2px 12px rgba(201,164,92,0.35), 0 1px 0 rgba(0,0,0,0.6)",
            }}
          >
            {unit.value}
          </span>
          <span className="mt-1.5 sm:mt-2 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider sm:tracking-luxe text-body-soft">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
