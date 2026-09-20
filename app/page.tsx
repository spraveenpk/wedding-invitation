"use client";

import { useEffect } from "react";
import Preloader from "@/components/Preloader";
import ParticleCanvas from "@/components/ParticleCanvas";
import Header from "@/components/Header";
import MusicToggle from "@/components/MusicToggle";
import ShareButton from "@/components/ShareButton";
import CinematicScrollStory from "@/components/CinematicScrollStory";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

export default function Home() {
  // Resilient multi-layer reveal for .io-reveal elements
  useEffect(() => {
    document.body.classList.add("js-io");

    const revealElement = (el: Element) => {
      el.classList.add("revealed");
    };

    const checkVisibleElements = () => {
      const elements = document.querySelectorAll(".io-reveal:not(.revealed)");
      const viewportHeight = window.innerHeight;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Reveal if within 250px of viewport top or bottom
        if (rect.top < viewportHeight + 250 && rect.bottom > -100) {
          revealElement(el);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "250px 0px 250px 0px" }
    );

    const elements = document.querySelectorAll(".io-reveal");
    elements.forEach((el) => observer.observe(el));

    // Immediate check
    checkVisibleElements();

    // Check on scroll, resize, and hashchange
    const onScroll = () => checkVisibleElements();
    const onHashChange = () => {
      setTimeout(checkVisibleElements, 100);
      setTimeout(checkVisibleElements, 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    // Safety fallback: after 1.8 seconds, ensure any remaining elements are revealed
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll(".io-reveal:not(.revealed)").forEach(revealElement);
    }, 1800);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-gold/30 selection:text-ivory">
      {/* 1. Luxury Initial Preloader */}
      <Preloader />

      {/* 2. Floating Golden Ambient Particles */}
      <ParticleCanvas />

      {/* 3. Sliding Glassmorphic Top Navigation Header (Phone Optimized) */}
      <Header />

      {/* 4. Ambient Indian Classical Tanpura Player */}
      <MusicToggle />

      {/* 5. Floating WhatsApp Share Button */}
      <ShareButton />

      <main className="relative z-10">
        {/* ═══════════════ HERO — the temple doorway ═══════════════ */}
        <section
          id="hero"
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center px-4"
        >
          <img
            src={WEDDING_CONFIG.images.heroTempleDoorway}
            alt="A grand South Indian temple doorway glowing with golden oil lamps at night"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.78) 70%, #050505 100%)",
            }}
          />

          <div className="relative z-10 px-2 sm:px-6 max-w-4xl mx-auto">
            <p className="text-[11px] sm:text-xs uppercase tracking-luxe text-gold/80 md:text-sm">
              Together with their families
            </p>

            <h1 className="mt-5 sm:mt-8 font-display text-3xl sm:text-5xl md:text-7xl leading-tight text-ivory">
              {WEDDING_CONFIG.groom.fullName}
            </h1>

            <p className="my-2 sm:my-4 font-display text-2xl sm:text-4xl italic text-gold md:text-5xl">
              &amp;
            </p>

            <h1 className="font-display text-3xl sm:text-5xl md:text-7xl leading-tight text-ivory">
              {WEDDING_CONFIG.bride.fullName}
            </h1>

            <div className="gold-divider mx-auto mt-6 sm:mt-10 w-36 sm:w-48" />

            <p className="mt-6 sm:mt-8 font-display text-base sm:text-xl italic text-body-soft md:text-2xl">
              A beautiful journey.
              <br />
              A lifetime together.
            </p>

            <a
              href="#our-story"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("play-wedding-music"));
                document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gold mt-8 sm:mt-12 inline-flex cursor-pointer text-[10px] sm:text-xs py-2.5 px-6 sm:py-3 sm:px-8"
            >
              Enter Our Story
            </a>
          </div>

          <div
            className="absolute bottom-6 sm:bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold/60"
            aria-hidden="true"
          >
            <div className="scroll-hint flex h-9 w-5 sm:h-10 sm:w-6 items-start justify-center rounded-full border border-gold/40 p-1">
              <div className="h-2 w-px bg-gold/70" />
            </div>
          </div>
        </section>

        {/* ═══════════════ THE CINEMATIC SCROLL STORY ═══════════════ */}
        <CinematicScrollStory />

        {/* ═══════════════ THE INVITATION + COUNTDOWN ═══════════════ */}
        <section
          id="wedding-invitation"
          className="relative overflow-hidden py-20 sm:py-28 md:py-40"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(58,13,24,0.4), transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <div className="io-reveal">
              <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold">The Invitation</p>
              <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-6xl text-ivory">
                You Are Cordially Invited
              </h2>
              <div className="gold-divider mx-auto mt-6 sm:mt-8 w-32 sm:w-40" />
              <p className="mt-6 sm:mt-8 font-display text-xl sm:text-3xl md:text-4xl text-ivory">
                {WEDDING_CONFIG.groom.fullName}
              </p>
              <p className="my-2 sm:my-3 font-display text-lg sm:text-xl italic text-gold md:text-3xl">
                &amp;
              </p>
              <p className="font-display text-xl sm:text-3xl md:text-4xl text-ivory">
                {WEDDING_CONFIG.bride.fullName}
              </p>
            </div>

            <div className="io-reveal mt-10 sm:mt-14 grid gap-5 sm:gap-6 md:grid-cols-2">
              {/* Reception Panel */}
              <div className="detail-panel p-6 text-left sm:p-8 md:p-10 rounded-sm">
                <div className="flex items-center gap-2.5 text-gold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  <p className="text-[11px] sm:text-xs uppercase tracking-luxe">Reception</p>
                </div>
                <p className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl text-ivory">
                  {WEDDING_CONFIG.reception.day}, {WEDDING_CONFIG.reception.date}
                </p>
                <p className="mt-1 flex items-center gap-2 text-champagne text-sm sm:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {WEDDING_CONFIG.reception.time}
                </p>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-body-soft">
                  {WEDDING_CONFIG.reception.venue}
                  <br />
                  {WEDDING_CONFIG.reception.fullAddress}
                </p>
              </div>

              {/* Muhurtham Panel */}
              <div className="detail-panel p-6 text-left sm:p-8 md:p-10 rounded-sm">
                <div className="flex items-center gap-2.5 text-gold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  <p className="text-[11px] sm:text-xs uppercase tracking-luxe">Muhurtham</p>
                </div>
                <p className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl text-ivory">
                  {WEDDING_CONFIG.muhurtham.day}, {WEDDING_CONFIG.muhurtham.date}
                </p>
                <p className="mt-1 flex items-center gap-2 text-champagne text-sm sm:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {WEDDING_CONFIG.muhurtham.time}
                </p>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-body-soft">
                  {WEDDING_CONFIG.muhurtham.venue}
                  <br />
                  {WEDDING_CONFIG.muhurtham.fullAddress}
                </p>
              </div>
            </div>

            <div className="io-reveal mt-12 sm:mt-16">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-gold">
                The Countdown to Forever
              </h3>
              <div className="mt-4 sm:mt-6">
                <Countdown />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ VENUE ═══════════════ */}
        <section id="venue" className="relative py-20 sm:py-28 md:py-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="io-reveal text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold">The Venue</p>
              <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-6xl text-ivory">
                {WEDDING_CONFIG.venue.name}
              </h2>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-luxe text-body-soft">
                {WEDDING_CONFIG.venue.city}
              </p>
            </div>

            <div className="io-reveal mt-10 sm:mt-14 grid items-stretch gap-6 sm:gap-8 lg:grid-cols-5">
              <div className="detail-panel flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:col-span-2 rounded-sm">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span
                    className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold"
                    style={{ boxShadow: "0 0 30px rgba(201,164,92,0.25)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <address className="not-italic">
                    <p className="font-display text-xl sm:text-2xl text-ivory">
                      {WEDDING_CONFIG.venue.name}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-body-soft md:text-base">
                      {WEDDING_CONFIG.venue.addressLines.map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </address>
                </div>

                <p className="mt-6 text-xs sm:text-sm leading-relaxed text-body-soft">
                  {WEDDING_CONFIG.venue.description}
                </p>

                <a
                  href={WEDDING_CONFIG.venue.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-6 sm:mt-10 inline-flex w-fit cursor-pointer text-[10px] sm:text-xs py-2 px-5 sm:py-3 sm:px-8"
                >
                  Get Directions
                </a>
              </div>

              <div className="overflow-hidden rounded-sm border border-border lg:col-span-3 min-h-[260px]">
                <iframe
                  title={`Map showing location of ${WEDDING_CONFIG.venue.name}`}
                  src={WEDDING_CONFIG.venue.googleMapsEmbedUrl}
                  className="map-dark h-64 sm:h-80 w-full border-0 md:h-full md:min-h-[400px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ PHOTO STORY ═══════════════ */}
        <section id="gallery" className="relative py-20 sm:py-28 md:py-40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="io-reveal text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold">Moments</p>
              <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-6xl text-ivory">
                Moments Along The Way
              </h2>
              <div className="gold-divider mx-auto mt-6 sm:mt-8 w-32 sm:w-40" />
            </div>

            <div className="mt-12 sm:mt-20 space-y-16 sm:space-y-24 md:space-y-36">
              {/* Moment 1 */}
              <figure className="io-reveal mx-auto w-[88%] sm:w-[78%] max-w-md md:mr-[12%] md:ml-auto photo-frame tilt-left">
                <img
                  src={WEDDING_CONFIG.moments[0].image}
                  alt={WEDDING_CONFIG.moments[0].alt}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs uppercase tracking-luxe text-body-soft">
                  {WEDDING_CONFIG.moments[0].title}
                </figcaption>
              </figure>

              {/* Moment 2 */}
              <figure className="io-reveal mx-auto w-[88%] sm:w-[78%] max-w-md md:ml-[12%] photo-frame tilt-right">
                <img
                  src={WEDDING_CONFIG.moments[1].image}
                  alt={WEDDING_CONFIG.moments[1].alt}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs uppercase tracking-luxe text-body-soft">
                  {WEDDING_CONFIG.moments[1].title}
                </figcaption>
              </figure>

              {/* Moment 3 */}
              <figure className="io-reveal mx-auto w-[92%] sm:w-[86%] max-w-2xl photo-frame">
                <img
                  src={WEDDING_CONFIG.moments[2].image}
                  alt={WEDDING_CONFIG.moments[2].alt}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs uppercase tracking-luxe text-body-soft">
                  {WEDDING_CONFIG.moments[2].title}
                </figcaption>
              </figure>

              {/* Moment 4 */}
              <figure className="io-reveal mx-auto w-[92%] sm:w-[86%] max-w-2xl photo-frame tilt-right">
                <img
                  src={WEDDING_CONFIG.moments[3].image}
                  alt={WEDDING_CONFIG.moments[3].alt}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs uppercase tracking-luxe text-body-soft">
                  {WEDDING_CONFIG.moments[3].title}
                </figcaption>
              </figure>

              {/* Moment 5 */}
              <figure className="io-reveal mx-auto w-[92%] sm:w-[86%] max-w-2xl photo-frame tilt-left">
                <img
                  src={WEDDING_CONFIG.moments[4].image}
                  alt={WEDDING_CONFIG.moments[4].alt}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs uppercase tracking-luxe text-body-soft">
                  {WEDDING_CONFIG.moments[4].title}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ═══════════════ FULL-SCREEN PHOTO MOMENT ═══════════════ */}
        <section
          id="full-screen-moments"
          className="relative flex min-h-[70vh] sm:min-h-[85vh] md:min-h-[90vh] items-center justify-center overflow-hidden"
        >
          <img
            src={WEDDING_CONFIG.images.rosePetalsWalk}
            alt="The couple walking hand in hand through a shower of rose petals"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(5,5,5,0.1) 0%, rgba(5,5,5,0.85) 90%)",
            }}
            aria-hidden="true"
          />
          <p className="io-reveal relative z-10 px-4 sm:px-6 text-center font-display text-xl sm:text-2xl italic text-ivory md:text-4xl">
            A moment we&apos;ll always remember.
          </p>
        </section>

        {/* ═══════════════ FAMILY INVITATION ═══════════════ */}
        <section id="family" className="relative overflow-hidden py-20 sm:py-28 md:py-40">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #050505 0%, #24070F 45%, #3A0D18 60%, #24070F 80%, #050505 100%)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl px-4 sm:px-6 text-center">
            <div className="io-reveal">
              <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold">With Our Families</p>
              <div className="ornament mx-auto mt-6 sm:mt-8" aria-hidden="true">
                ❈
              </div>
              <p className="mt-6 sm:mt-8 font-display text-xl sm:text-2xl leading-relaxed text-ivory md:text-4xl">
                With the blessings of our families,
                <br />
                we invite you to share our happiness
                <br />
                and celebrate this beautiful beginning with us.
              </p>
              <div className="ornament mx-auto mt-8 sm:mt-10" aria-hidden="true">
                ❈
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ RSVP ═══════════════ */}
        <section id="rsvp" className="relative py-20 sm:py-28 md:py-40">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
            <div className="io-reveal">
              <p className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold">RSVP</p>
              <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-6xl text-ivory">
                Will You Join Us?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-body-soft md:text-lg">
                Your presence will make our celebration even more special.
              </p>
            </div>

            <div className="io-reveal mt-10 sm:mt-14">
              <RSVPForm />
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14 text-center">
          <p className="font-display text-xl sm:text-2xl text-gold">
            {WEDDING_CONFIG.monogramHeart}
          </p>
          <p className="mt-2 text-xs sm:text-sm uppercase tracking-luxe text-body-soft">
            {WEDDING_CONFIG.weddingDateFormatted}
          </p>
          <div className="gold-divider mx-auto mt-6 sm:mt-8 w-32 sm:w-40" />
          <p className="mt-6 sm:mt-8 font-display text-base sm:text-lg italic text-body-soft">
            {WEDDING_CONFIG.story.closingNote}
          </p>
          <p className="mt-5 text-[10px] sm:text-xs uppercase tracking-luxe text-muted-foreground">
            © 2026 {WEDDING_CONFIG.groom.fullName} &amp; {WEDDING_CONFIG.bride.fullName} · {WEDDING_CONFIG.venue.city}
          </p>
        </div>
      </footer>
    </div>
  );
}
