"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

interface StorySectionsProps {
  progress: number; // 0 to 1
  onOpenRSVP: () => void;
}

export default function StorySections({ progress, onOpenRSVP }: StorySectionsProps) {
  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(WEDDING_CONFIG.muhurtham.countdownTarget).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper for smooth section opacity window: (fade in, stay, fade out)
  const getSectionOpacity = (start: number, peak1: number, peak2: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress < peak1) return (progress - start) / (peak1 - start);
    if (progress <= peak2) return 1;
    return 1 - (progress - peak2) / (end - peak2);
  };

  const opEntrance = getSectionOpacity(0.00, 0.03, 0.11, 0.15);
  const opCoupleStory = getSectionOpacity(0.16, 0.20, 0.26, 0.30);
  const opEngagement = getSectionOpacity(0.31, 0.34, 0.37, 0.40);
  const opWeddingReveal = getSectionOpacity(0.41, 0.46, 0.52, 0.56);
  const opReception = getSectionOpacity(0.57, 0.60, 0.63, 0.66);
  const opMuhurtham = getSectionOpacity(0.67, 0.70, 0.73, 0.76);
  const opCountdown = getSectionOpacity(0.77, 0.79, 0.81, 0.83);
  const opVenue = getSectionOpacity(0.84, 0.86, 0.88, 0.90);
  const opMoments = getSectionOpacity(0.905, 0.92, 0.935, 0.95);
  const opFamilyRSVP = getSectionOpacity(0.952, 0.962, 0.972, 0.98);
  const opEnding = getSectionOpacity(0.982, 0.99, 1.0, 1.0);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-center items-center p-4 sm:p-8 select-none">
      
      {/* 1. ENTRANCE & COUPLE REVEAL (0.00 - 0.15) */}
      {opEntrance > 0.01 && (
        <div
          style={{ opacity: opEntrance }}
          className="max-w-2xl text-center text-[#f7f0e2] transition-opacity duration-300"
        >
          <p className="text-xs sm:text-sm font-serif italic text-[#c9a45c] tracking-[0.3em] uppercase mb-3">
            Two hearts • One beautiful journey • One forever
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7f0e2] to-[#c9a45c] tracking-wide mb-2">
            {WEDDING_CONFIG.groom.fullName}
          </h1>

          <div className="text-xl sm:text-2xl font-serif text-[#c9a45c] italic my-1">
            &amp;
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7f0e2] to-[#c9a45c] tracking-wide mb-6">
            {WEDDING_CONFIG.bride.fullName}
          </h1>

          <p className="text-xs sm:text-sm font-sans tracking-widest uppercase text-white/60 max-w-md mx-auto leading-relaxed">
            Together with their families, we invite you to celebrate the beginning of forever.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-sans tracking-[0.25em] text-[#e8d19a]/75 uppercase animate-pulse">
            <span>↓</span>
            <span>SCROLL TO ENTER OUR STORY</span>
            <span>↓</span>
          </div>
        </div>
      )}

      {/* 2. THE COUPLE REVEAL / STORY (0.16 - 0.30) */}
      {opCoupleStory > 0.01 && (
        <div
          style={{ opacity: opCoupleStory }}
          className="max-w-xl text-center text-[#f7f0e2] transition-opacity duration-300 p-6 rounded-3xl bg-[#050505]/60 backdrop-blur-sm border border-[#c9a45c]/20"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c]">
            CHAPTER I
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#e8d19a] tracking-wide my-3">
            {WEDDING_CONFIG.story.chapter1.title}
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a45c] mx-auto mb-5" />
          <p className="text-base sm:text-lg font-serif italic text-white/90 leading-relaxed">
            &ldquo;{WEDDING_CONFIG.story.chapter1.quote}&rdquo;
          </p>
        </div>
      )}

      {/* 3. ENGAGEMENT STORY (0.31 - 0.40) */}
      {opEngagement > 0.01 && (
        <div
          style={{ opacity: opEngagement }}
          className="max-w-xl text-center text-[#f7f0e2] transition-opacity duration-300 p-6 rounded-3xl bg-[#050505]/60 backdrop-blur-sm border border-[#c9a45c]/20"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c]">
            CHAPTER II
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#e8d19a] tracking-wide my-3">
            {WEDDING_CONFIG.story.chapter2.title}
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a45c] mx-auto mb-5" />
          <p className="text-base sm:text-lg font-serif italic text-white/90 leading-relaxed">
            &ldquo;{WEDDING_CONFIG.story.chapter2.quote}&rdquo;
          </p>
        </div>
      )}

      {/* 4. WEDDING INVITATION REVEAL (0.41 - 0.56) */}
      {opWeddingReveal > 0.01 && (
        <div
          style={{ opacity: opWeddingReveal }}
          className="max-w-xl text-center text-[#f7f0e2] transition-opacity duration-300 mt-52 sm:mt-64"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c] font-semibold">
            YOU ARE CORDIALLY INVITED
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-white/80 my-2 uppercase tracking-widest">
            To The Wedding Celebration Of
          </h3>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#e8d19a] tracking-wide">
            {WEDDING_CONFIG.groom.fullName} &amp; {WEDDING_CONFIG.bride.fullName}
          </p>
        </div>
      )}

      {/* 5. RECEPTION CEREMONY (0.57 - 0.66) */}
      {opReception > 0.01 && (
        <div
          style={{ opacity: opReception }}
          className="max-w-lg text-center text-[#f7f0e2] p-8 rounded-3xl bg-[#0b0807]/85 backdrop-blur-md border border-[#c9a45c]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c] font-bold">
            CEREMONY I
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#e8d19a] tracking-wide my-2">
            {WEDDING_CONFIG.reception.title}
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a45c] mx-auto mb-4" />

          <p className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
            {WEDDING_CONFIG.reception.day}, {WEDDING_CONFIG.reception.date}
          </p>
          <p className="text-sm font-sans tracking-widest text-[#c9a45c] uppercase font-semibold mb-3">
            {WEDDING_CONFIG.reception.time}
          </p>
          <p className="text-xs sm:text-sm font-sans text-white/70 max-w-sm mx-auto mb-6">
            {WEDDING_CONFIG.reception.description}
          </p>

          <a
            href={WEDDING_CONFIG.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#c9a45c] via-[#e8d19a] to-[#c9a45c] text-[#050505] text-xs font-serif tracking-[0.2em] font-bold uppercase hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            VIEW LOCATION 📍
          </a>
        </div>
      )}

      {/* 6. MUHURTHAM CEREMONY (0.67 - 0.76) */}
      {opMuhurtham > 0.01 && (
        <div
          style={{ opacity: opMuhurtham }}
          className="max-w-lg text-center text-[#f7f0e2] p-8 rounded-3xl bg-[#0b0807]/85 backdrop-blur-md border border-[#c9a45c]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c] font-bold">
            SACRED UNION
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#e8d19a] tracking-wide my-2">
            {WEDDING_CONFIG.muhurtham.title}
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a45c] mx-auto mb-4" />

          <p className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
            {WEDDING_CONFIG.muhurtham.day}, {WEDDING_CONFIG.muhurtham.date}
          </p>
          <p className="text-sm font-sans tracking-widest text-[#c9a45c] uppercase font-semibold mb-3">
            {WEDDING_CONFIG.muhurtham.time}
          </p>
          <p className="text-xs sm:text-sm font-sans text-white/70 max-w-sm mx-auto mb-4">
            {WEDDING_CONFIG.muhurtham.description}
          </p>
          <p className="text-xs font-serif italic text-[#e8d19a]">
            &ldquo;The moment two lives become one.&rdquo;
          </p>
        </div>
      )}

      {/* 7. WEDDING COUNTDOWN (0.77 - 0.83) */}
      {opCountdown > 0.01 && (
        <div
          style={{ opacity: opCountdown }}
          className="max-w-xl text-center text-[#f7f0e2] p-8 rounded-3xl bg-[#0b0807]/80 backdrop-blur-md border border-[#c9a45c]/30 shadow-2xl"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c]">
            AWAITING THE SACRED HOUR
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white my-2">
            The Countdown to Forever
          </h3>
          <div className="w-16 h-[1px] bg-[#c9a45c] mx-auto mb-6" />

          <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
            {[
              { label: "DAYS", val: timeLeft.days },
              { label: "HOURS", val: timeLeft.hours },
              { label: "MINUTES", val: timeLeft.minutes },
              { label: "SECONDS", val: timeLeft.seconds },
            ].map((u, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-[#c9a45c]/40">
                <span className="text-2xl sm:text-4xl font-serif font-bold text-[#e8d19a]">
                  {String(u.val).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans tracking-widest text-white/60 uppercase mt-1">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs font-serif italic text-[#c9a45c] mt-4">
            16 November 2026 • 6:00 AM • Kettimelam Mahal
          </p>
        </div>
      )}

      {/* 8. VENUE EXPERIENCE (0.84 - 0.90) */}
      {opVenue > 0.01 && (
        <div
          style={{ opacity: opVenue }}
          className="max-w-lg text-center text-[#f7f0e2] p-8 rounded-3xl bg-[#0b0807]/85 backdrop-blur-md border border-[#c9a45c]/40 shadow-2xl pointer-events-auto"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c] font-bold">
            CEREMONIAL VENUE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#e8d19a] tracking-wide my-2">
            {WEDDING_CONFIG.venue.name}
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a45c] mx-auto mb-4" />

          <p className="text-sm sm:text-base font-sans text-white/90 max-w-sm mx-auto leading-relaxed mb-1">
            {WEDDING_CONFIG.venue.address}
          </p>
          <p className="text-xs font-serif text-[#c9a45c] mb-6">
            {WEDDING_CONFIG.venue.city}
          </p>

          <a
            href={WEDDING_CONFIG.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-[#c9a45c] via-[#e8d19a] to-[#c9a45c] text-[#050505] text-xs font-serif tracking-[0.2em] font-bold uppercase hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            GET DIRECTIONS 📍
          </a>
        </div>
      )}

      {/* 9. PHOTO STORY MOMENTS (0.905 - 0.95) */}
      {opMoments > 0.01 && (
        <div
          style={{ opacity: opMoments }}
          className="max-w-md text-center text-[#f7f0e2] p-6 rounded-3xl bg-[#050505]/75 backdrop-blur-md border border-[#c9a45c]/30"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c]">
            MEMORIES
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#e8d19a] tracking-wide my-2">
            Moments Along The Way
          </h3>
          <p className="text-sm sm:text-base font-serif italic text-white/80 mt-3 leading-relaxed">
            &ldquo;A moment we&apos;ll always remember.&rdquo;
          </p>
        </div>
      )}

      {/* 10. FAMILY BLESSING & RSVP (0.952 - 0.98) */}
      {opFamilyRSVP > 0.01 && (
        <div
          style={{ opacity: opFamilyRSVP }}
          className="max-w-xl text-center text-[#f7f0e2] p-8 rounded-3xl bg-[#0b0807]/90 backdrop-blur-md border border-[#c9a45c]/40 shadow-2xl pointer-events-auto"
        >
          <span className="text-xs font-serif tracking-[0.3em] uppercase text-[#c9a45c] font-bold">
            WITH OUR FAMILIES
          </span>
          <p className="text-base sm:text-lg font-serif italic text-[#e8d19a] max-w-md mx-auto leading-relaxed my-4">
            &ldquo;{WEDDING_CONFIG.story.familyBlessing}&rdquo;
          </p>

          <div className="w-16 h-[1px] bg-[#c9a45c] mx-auto my-6" />

          <button
            onClick={onOpenRSVP}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c9a45c] via-[#e8d19a] to-[#c9a45c] text-[#050505] text-xs font-serif tracking-[0.25em] font-bold uppercase hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
          >
            WILL YOU JOIN US? (RSVP)
          </button>
        </div>
      )}

      {/* 11. FINAL REASSEMBLY & ENDING (0.982 - 1.00) */}
      {opEnding > 0.01 && (
        <div
          style={{ opacity: opEnding }}
          className="max-w-2xl text-center text-[#f7f0e2] transition-opacity duration-500"
        >
          <div className="text-3xl sm:text-5xl font-serif font-bold text-[#e8d19a] tracking-widest mb-3">
            P ♥ A
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide mb-1">
            {WEDDING_CONFIG.groom.fullName} &amp; {WEDDING_CONFIG.bride.fullName}
          </h1>

          <p className="text-sm font-sans tracking-[0.3em] text-[#c9a45c] uppercase font-semibold mb-6">
            16 • 11 • 2026
          </p>

          <p className="text-base sm:text-lg font-serif italic text-[#f7f0e2]/90 mb-2">
            Two hearts. One journey. Forever together.
          </p>

          <p className="text-xs font-sans tracking-widest text-white/50 uppercase mt-8">
            Thank you for being a part of our story.
          </p>
        </div>
      )}
    </div>
  );
}
