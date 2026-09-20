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
      className="flex flex-wrap items-stretch justify-center gap-4 md:gap-8"
      role="timer"
      aria-label={`Countdown to the Muhurtham on ${WEDDING_CONFIG.muhurtham.day}, ${WEDDING_CONFIG.muhurtham.date}`}
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex min-w-[84px] flex-col items-center rounded-sm border border-border bg-card/70 px-5 py-6 backdrop-blur-sm md:min-w-[130px] md:px-8 md:py-8"
          style={{
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(201,164,92,0.18)",
          }}
        >
          <span
            suppressHydrationWarning
            className="font-display text-4xl leading-none text-gold md:text-6xl"
            style={{
              textShadow:
                "0 4px 18px rgba(201,164,92,0.35), 0 1px 0 rgba(0,0,0,0.6)",
            }}
          >
            {unit.value}
          </span>
          <span className="mt-3 text-[10px] uppercase tracking-luxe text-body-soft md:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
