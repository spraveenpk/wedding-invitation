"use client";

import { useEffect, useRef } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

export default function CinematicScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const reveals = Array.from(stage.querySelectorAll<HTMLElement>("[data-reveal]")).map(
      (el) => ({
        el,
        fadeIn: parseFloat(el.dataset.in || "0"),
        fadeOut: parseFloat(el.dataset.out || "1"),
      })
    );

    const clamp = (val: number, min: number, max: number) =>
      Math.min(1, Math.max(0, (val - min) / (max - min)));

    let isTicking = false;

    const onScroll = () => {
      isTicking = false;
      const rect = container.getBoundingClientRect();
      const scrollableDist = container.offsetHeight - window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, scrollableDist))
      );

      const fadeWindow = 0.035;
      for (let i = 0; i < reveals.length; i++) {
        const { el, fadeIn, fadeOut } = reveals[i];
        const inFactor = fadeIn === 0 ? 1 : clamp(progress, fadeIn, fadeIn + fadeWindow);
        const outFactor = 1 - clamp(progress, fadeOut - fadeWindow, fadeOut);
        const opacity = inFactor * outFactor;
        el.style.opacity = opacity.toFixed(3);
      }

      stage.style.setProperty("--p", progress.toFixed(4));
      stage.style.setProperty("--door", clamp(progress, 0.02, 0.14).toFixed(4));
      stage.style.setProperty("--zoom", clamp(progress, 0, 0.16).toFixed(4));
      stage.style.setProperty("--card", clamp(progress, 0.40, 0.52).toFixed(4));
      stage.style.setProperty("--recep", clamp(progress, 0.55, 0.62).toFixed(4));
      stage.style.setProperty("--muhurtham", clamp(progress, 0.65, 0.72).toFixed(4));
      stage.style.setProperty("--fade", clamp(progress, 0.955, 1.0).toFixed(4));
      stage.style.setProperty("--p-offset-left", `${((progress - 0.22) * -120).toFixed(1)}px`);
      stage.style.setProperty("--p-offset-right", `${((progress - 0.22) * -180).toFixed(1)}px`);
      stage.style.setProperty("--p-scale-rings", `${(0.85 + progress * 0.25).toFixed(3)}`);
    };

    const handleScroll = () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="our-story"
      className="story-container relative h-[500vh] w-full"
    >
      <div
        ref={stageRef}
        id="story-stage"
        className="sticky top-0 h-screen w-full overflow-hidden bg-background z-20"
        style={{
          position: "sticky",
          top: 0,
        }}
      >
        {/* ═══════════════ Scene A · 0–17.5% — Temple entrance, doors opening ═══════════════ */}
        <div className="story-scene">
          <div className="absolute inset-0" data-reveal data-in="0" data-out="0.175">
            <img
              src={WEDDING_CONFIG.images.heroTempleDoorway}
              alt="The temple doorway as the golden doors slowly open"
              className="temple-zoom h-full w-full object-cover opacity-60"
              loading="lazy"
            />
          </div>

          {/* Glow & Golden Doors */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            data-reveal
            data-in="0"
            data-out="0.175"
            aria-hidden="true"
          >
            <div className="door-glow absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="door door-left" />
            <div className="door door-right" />
          </div>

          {/* Caption 1: Two hearts */}
          <div className="story-caption" data-reveal data-in="0.025" data-out="0.065">
            <p className="font-display text-4xl sm:text-6xl md:text-8xl text-ivory">
              Two hearts.
            </p>
          </div>

          {/* Caption 2: One beautiful journey */}
          <div className="story-caption" data-reveal data-in="0.065" data-out="0.105">
            <p className="font-display text-3xl sm:text-6xl md:text-8xl text-ivory">
              One beautiful journey.
            </p>
          </div>

          {/* Caption 3: Forever together */}
          <div className="story-caption" data-reveal data-in="0.105" data-out="0.15">
            <p className="font-display text-4xl sm:text-6xl md:text-8xl text-gold">
              Forever together.
            </p>
          </div>
        </div>

        {/* ═══════════════ Scene B · 14.5–31.5% — The couple reveal ═══════════════ */}
        <div className="story-scene">
          <div
            className="absolute left-[3%] sm:left-[6%] top-1/2 w-[36%] sm:w-[34%] max-w-xs -translate-y-1/2 md:left-[14%]"
            data-reveal
            data-in="0.145"
            data-out="0.315"
            style={{
              transform:
                "translateY(calc(-50% + var(--p-offset-left, 0px))) rotate(-3deg)",
            }}
          >
            <figure className="photo-frame">
              <img
                src={WEDDING_CONFIG.images.coupleGoldenLight}
                alt="Praveen and Priya together in traditional South Indian wedding attire"
                className="w-full object-cover"
                loading="lazy"
              />
            </figure>
          </div>

          <div
            className="absolute right-[3%] sm:right-[6%] top-1/2 w-[36%] sm:w-[34%] max-w-xs -translate-y-1/2 md:right-[14%]"
            data-reveal
            data-in="0.145"
            data-out="0.315"
            style={{
              transform:
                "translateY(calc(-50% + var(--p-offset-right, 0px))) rotate(3deg)",
            }}
          >
            <figure className="photo-frame">
              <img
                src={WEDDING_CONFIG.images.garlandExchange}
                alt="The couple exchanging flower garlands in a golden glow"
                className="w-full object-cover"
                loading="lazy"
              />
            </figure>
          </div>

          <div className="story-caption" data-reveal data-in="0.15" data-out="0.20">
            <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold">Our Story</p>
          </div>

          <div className="story-caption" data-reveal data-in="0.20" data-out="0.31">
            <p className="max-w-xl font-display text-lg sm:text-2xl md:text-4xl leading-relaxed text-ivory mx-auto px-4">
              Some journeys are written by destiny.
              <br className="hidden md:block" />
              Ours begins with two hearts finding their way to each other.
            </p>
          </div>
        </div>

        {/* ═══════════════ Scene C · 29.5–42% — Engagement ═══════════════ */}
        <div className="story-scene">
          <div
            className="absolute inset-0"
            data-reveal
            data-in="0.295"
            data-out="0.42"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(58,13,24,0.4), rgba(5,5,5,0.92))",
            }}
          />

          <figure
            className="photo-frame absolute left-1/2 top-1/2 w-[82%] sm:w-[72%] max-w-lg"
            data-reveal
            data-in="0.295"
            data-out="0.42"
            style={{
              transform:
                "translate(-50%, -50%) scale(var(--p-scale-rings, 1)) rotate(-1.5deg)",
            }}
          >
            <img
              src={WEDDING_CONFIG.images.weddingRings}
              alt="Two gold wedding rings on maroon silk surrounded by jasmine and rose petals"
              className="w-full object-cover"
              loading="lazy"
            />
          </figure>

          <div
            className="story-caption"
            style={{ top: "12%" }}
            data-reveal
            data-in="0.30"
            data-out="0.36"
          >
            <p className="font-display text-2xl sm:text-4xl md:text-6xl text-gold">
              A Promise Before Forever
            </p>
          </div>

          <div
            className="story-caption"
            style={{ bottom: "12%", top: "auto" }}
            data-reveal
            data-in="0.36"
            data-out="0.415"
          >
            <p className="font-display text-base sm:text-xl md:text-2xl italic text-body-soft">
              The beginning of a beautiful promise.
            </p>
          </div>
        </div>

        {/* ═══════════════ Scene D · 39.5–57.5% — 3D Wedding Invitation Card ═══════════════ */}
        <div className="story-scene">
          <div
            className="absolute inset-0"
            data-reveal
            data-in="0.395"
            data-out="0.575"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(36,7,15,0.55), rgba(5,5,5,0.96))",
            }}
          />

          <div
            className="card-perspective absolute inset-0 flex items-center justify-center px-4 sm:px-6"
            data-reveal
            data-in="0.40"
            data-out="0.57"
          >
            <div className="invite-card w-full max-w-md md:max-w-xl">
              <div className="invite-card-inner py-8 px-5 sm:py-12 sm:px-10 md:py-16 md:px-14">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-luxe text-gold md:text-xs">
                  You are cordially invited
                </p>
                <p className="mt-2 text-[9px] sm:text-[10px] uppercase tracking-luxe text-body-soft md:text-xs">
                  To the wedding of
                </p>
                <div className="gold-divider mx-auto my-3 sm:my-5 w-20 sm:w-24" />
                <p className="font-display text-2xl sm:text-4xl leading-tight text-ivory md:text-5xl">
                  {WEDDING_CONFIG.groom.fullName}
                </p>
                <p className="my-1.5 sm:my-2 font-display text-xl sm:text-2xl italic text-gold md:text-3xl">
                  &amp;
                </p>
                <p className="font-display text-2xl sm:text-4xl leading-tight text-ivory md:text-5xl">
                  {WEDDING_CONFIG.bride.fullName}
                </p>
                <div className="gold-divider mx-auto my-3 sm:my-5 w-20 sm:w-24" />
                <p className="text-[11px] sm:text-xs text-body-soft md:text-sm">
                  {WEDDING_CONFIG.reception.day}, {WEDDING_CONFIG.reception.date} ·{" "}
                  {WEDDING_CONFIG.muhurtham.day}, {WEDDING_CONFIG.muhurtham.date}
                </p>
                <p className="mt-1 text-[11px] sm:text-xs text-body-soft md:text-sm">
                  {WEDDING_CONFIG.venue.name}, {WEDDING_CONFIG.venue.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ Scene E · 54.5–67.5% — Reception ═══════════════ */}
        <div className="story-scene">
          <div className="absolute inset-0" data-reveal data-in="0.545" data-out="0.675">
            <img
              src={WEDDING_CONFIG.images.receptionHall}
              alt="The reception hall glowing with golden chandeliers and floral décor"
              className="h-full w-full object-cover opacity-45 sm:opacity-50"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.65) 55%, rgba(5,5,5,0.3) 100%)",
              }}
            />
          </div>

          <div
            className="absolute left-0 top-0 flex h-full w-full items-center px-6 sm:px-10 md:px-[10%]"
            data-reveal
            data-in="0.55"
            data-out="0.67"
            style={{
              transform: "translateX(calc((1 - var(--recep, 1)) * -80px))",
            }}
          >
            <div className="max-w-md text-left">
              <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold">Reception</p>
              <div className="gold-divider my-3 sm:my-5 w-20 sm:w-24 origin-left" />
              <p className="font-display text-2xl sm:text-3xl md:text-5xl text-ivory">
                {WEDDING_CONFIG.reception.day}, {WEDDING_CONFIG.reception.date}
              </p>
              <p className="mt-2 text-base sm:text-lg md:text-xl text-champagne font-medium">
                {WEDDING_CONFIG.reception.time}
              </p>
              <p className="mt-3 sm:mt-5 font-display text-xl sm:text-2xl md:text-3xl text-gold">
                {WEDDING_CONFIG.reception.venue}
              </p>
              <address className="mt-1.5 not-italic text-xs sm:text-sm leading-relaxed text-body-soft md:text-base">
                {WEDDING_CONFIG.reception.addressLines.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>
              <a
                href={WEDDING_CONFIG.venue.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-5 sm:mt-7 inline-flex cursor-pointer text-[10px] sm:text-xs py-2 px-5 sm:py-3 sm:px-8"
              >
                View Location
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════ Scene F · 64.5–78.5% — Muhurtham (Timing & Venue alongside Pic on Right) ═══════════════ */}
        <div className="story-scene">
          {/* Atmospheric background with subtle Mandapam imagery & deep vignette */}
          <div
            className="absolute inset-0"
            data-reveal
            data-in="0.645"
            data-out="0.785"
          >
            <img
              src={WEDDING_CONFIG.images.mandapamFire}
              alt="Sacred mandapam ambient lighting"
              className="h-full w-full object-cover opacity-25 md:opacity-35"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(36,7,15,0.75) 0%, rgba(5,5,5,0.95) 85%)",
              }}
            />
          </div>

          {/* Side-by-Side: Left: Timing & Venue; Right: Picture */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-12 pointer-events-none"
            data-reveal
            data-in="0.65"
            data-out="0.78"
          >
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 items-center pointer-events-auto">
              
              {/* Left Column: Ceremony Details, Timing & Venue */}
              <div className="text-left order-2 md:order-1">
                <div className="flex items-center gap-2 text-gold">
                  <span className="text-[10px] sm:text-xs uppercase tracking-luxe font-medium">Sacred Union</span>
                </div>

                <div className="gold-divider my-2 sm:my-4 w-20 sm:w-24 origin-left" />

                <h2 className="font-display text-2xl sm:text-4xl md:text-6xl text-gold leading-tight">
                  Muhurtham
                </h2>

                <p className="mt-1 sm:mt-2 font-display text-lg sm:text-2xl md:text-3xl text-ivory">
                  {WEDDING_CONFIG.muhurtham.day}, {WEDDING_CONFIG.muhurtham.date}
                </p>

                <div className="mt-1 sm:mt-2 flex items-center gap-2 text-champagne text-sm sm:text-lg md:text-xl font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-gold w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                  >
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span>{WEDDING_CONFIG.muhurtham.time}</span>
                </div>

                <p className="mt-2.5 sm:mt-4 font-display text-base sm:text-xl md:text-2xl text-gold">
                  {WEDDING_CONFIG.muhurtham.venue}
                </p>

                <address className="mt-0.5 sm:mt-1 not-italic text-[11px] sm:text-sm leading-relaxed text-body-soft">
                  {WEDDING_CONFIG.muhurtham.addressLines.map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </address>

                <p className="mt-2 sm:mt-3 font-display italic text-champagne text-xs sm:text-base md:text-lg">
                  &ldquo;{WEDDING_CONFIG.story.mandapamQuote}&rdquo;
                </p>

                <a
                  href={WEDDING_CONFIG.venue.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-3 sm:mt-5 inline-flex cursor-pointer text-[9px] sm:text-xs py-1.5 px-4 sm:py-2.5 sm:px-7"
                >
                  View Location
                </a>
              </div>

              {/* Right Column: Picture of Mandapam */}
              <div className="order-1 md:order-2 flex justify-center md:justify-end">
                <figure
                  className="photo-frame w-full max-w-[200px] sm:max-w-xs md:max-w-md tilt-right overflow-hidden"
                  style={{
                    boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(201,164,92,0.15)",
                  }}
                >
                  <img
                    src={WEDDING_CONFIG.images.mandapamFire}
                    alt="The wedding mandapam with brass lamps, jasmine garlands and sacred fire"
                    className="w-full max-h-[140px] sm:max-h-[240px] md:max-h-[380px] object-cover"
                    loading="lazy"
                  />
                  <figcaption className="mt-1 sm:mt-2 text-center text-[8px] sm:text-[10px] uppercase tracking-luxe text-body-soft">
                    The Sacred Mandapam
                  </figcaption>
                </figure>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════════════ Scene G · 76–98% — Final reassembly / ending ═══════════════ */}
        <div className="story-scene">
          <div
            className="story-caption"
            style={{ top: "16%" }}
            data-reveal
            data-in="0.76"
            data-out="0.85"
          >
            <p className="font-display text-5xl sm:text-7xl md:text-8xl text-gold">
              {WEDDING_CONFIG.monogramHeart}
            </p>
          </div>

          <div className="story-caption" data-reveal data-in="0.79" data-out="0.88">
            <div className="text-center px-4">
              <p className="font-display text-2xl sm:text-4xl md:text-5xl text-ivory">
                {WEDDING_CONFIG.groom.fullName}
              </p>
              <p className="my-1 sm:my-2 font-display text-xl sm:text-2xl italic text-gold md:text-3xl">
                &amp;
              </p>
              <p className="font-display text-2xl sm:text-4xl md:text-5xl text-ivory">
                {WEDDING_CONFIG.bride.fullName}
              </p>
            </div>
          </div>

          <div
            className="story-caption"
            style={{ top: "62%" }}
            data-reveal
            data-in="0.83"
            data-out="0.91"
          >
            <p className="text-xs sm:text-sm uppercase tracking-luxe text-gold md:text-base">
              {WEDDING_CONFIG.weddingDateFormatted}
            </p>
          </div>

          <div
            className="story-caption"
            style={{ top: "72%" }}
            data-reveal
            data-in="0.86"
            data-out="0.94"
          >
            <p className="font-display text-base sm:text-2xl md:text-3xl italic text-body-soft px-4">
              {WEDDING_CONFIG.tagline}
            </p>
          </div>

          <div
            className="story-caption"
            style={{ top: "84%" }}
            data-reveal
            data-in="0.90"
            data-out="0.98"
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-muted-foreground md:text-sm px-4">
              {WEDDING_CONFIG.story.closingNote}
            </p>
          </div>

          {/* Slow fade into black */}
          <div
            className="fade-to-black absolute inset-0 bg-background pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Screen-reader / accessibility summary */}
      <div className="sr-only">
        <p>
          A cinematic journey: two hearts, one beautiful journey, forever together. Our story —
          some journeys are written by destiny. A promise before forever. You are cordially
          invited to the wedding of {WEDDING_CONFIG.groom.fullName} and{" "}
          {WEDDING_CONFIG.bride.fullName}.
        </p>
      </div>
    </section>
  );
}
