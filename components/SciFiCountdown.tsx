"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ChronometerTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEngaged: boolean;
}

export default function SciFiCountdown() {
  const [timeLeft, setTimeLeft] = useState<ChronometerTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEngaged: false,
  });

  useEffect(() => {
    const target = new Date("2026-11-16T06:00:00+05:30").getTime();

    const tick = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEngaged: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isEngaged: false,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "DAYS", val: timeLeft.days },
    { label: "HOURS", val: timeLeft.hours },
    { label: "MINS", val: timeLeft.minutes },
    { label: "SECS", val: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-6 sm:p-8 bg-[#060c1d]/90 backdrop-blur-xl border border-[#ffd000]/60 shadow-[0_0_35px_rgba(255,208,0,0.2)] text-center relative overflow-hidden"
      >
        <span className="text-[#ffd000] text-xs font-mono tracking-[0.3em] uppercase font-bold">
          WARP LAUNCH CHRONOMETER
        </span>
        <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wide mt-1 mb-6">
          T-Minus To Sacred Union
        </h3>

        {timeLeft.isEngaged ? (
          <div className="py-6 px-4 rounded-2xl bg-gradient-to-r from-[#00f0ff] to-[#b026ff] text-[#02050e] text-xl sm:text-2xl font-mono font-bold tracking-widest uppercase">
            SACRED QUANTUM BONDING COMPLETED
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {units.map((u, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#09142c] border-2 border-[#ffd000]/70 shadow-[0_0_15px_rgba(255,208,0,0.25)] text-white"
              >
                <span className="text-2xl sm:text-4xl font-mono font-bold text-[#ffd000] tracking-wider">
                  {String(u.val).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#a0b3d6] uppercase mt-1">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs font-mono text-[#a0b3d6] mt-5">
          16 November 2026 • 06:00 HRS • Kettimelam Mahal, Coimbatore
        </p>
      </motion.div>
    </section>
  );
}
