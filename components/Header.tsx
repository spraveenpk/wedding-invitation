"use client";

import { useEffect, useState } from "react";
import { WEDDING_CONFIG } from "@/config/weddingConfig";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const preloaderActive =
        document.getElementById("preloader-root")?.getAttribute("data-preloader-active") === "true";
      if (window.scrollY > window.innerHeight * 0.45 && !preloaderActive) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const text = encodeURIComponent(WEDDING_CONFIG.whatsapp.message + origin);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-2 sm:px-4 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-[120%] opacity-0 pointer-events-none"
      }`}
    >
      <nav
        className="mx-auto mt-2 sm:mt-4 flex max-w-3xl items-center justify-between gap-1 sm:gap-2 rounded-full border border-border bg-black/80 px-3 py-1.5 sm:px-8 sm:py-2.5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="font-display text-sm sm:text-lg text-gold tracking-wide hover:text-champagne transition-colors shrink-0"
        >
          {WEDDING_CONFIG.monogram}
        </a>

        <ul className="flex items-center gap-1.5 sm:gap-5 list-none m-0 p-0">
          <li>
            <a
              href="#our-story"
              className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-luxe text-body-soft transition-colors duration-300 hover:text-gold"
            >
              Story
            </a>
          </li>
          <li>
            <a
              href="#wedding-invitation"
              className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-luxe text-body-soft transition-colors duration-300 hover:text-gold"
            >
              Wedding
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-luxe text-body-soft transition-colors duration-300 hover:text-gold"
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#venue"
              className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-luxe text-body-soft transition-colors duration-300 hover:text-gold"
            >
              Venue
            </a>
          </li>
          <li>
            <a
              href="#rsvp"
              className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-luxe text-body-soft transition-colors duration-300 hover:text-gold"
            >
              RSVP
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={handleShare}
              className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-luxe text-gold transition-colors duration-300 hover:text-champagne bg-transparent border-none p-0 cursor-pointer font-medium"
            >
              Share
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
