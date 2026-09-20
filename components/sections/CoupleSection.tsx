"use client";
import { motion } from "framer-motion";

export default function CoupleSection() {
  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#fffdf9]/95 via-[#fbf6ee]/95 to-[#f7eee1]/95 backdrop-blur-md border-2 border-[#d4af37] shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
      >
        {/* Ornate Gold Filigree Corner Accents */}
        <div className="absolute top-3 left-3 text-[#d4af37] text-lg select-none">⚜</div>
        <div className="absolute top-3 right-3 text-[#d4af37] text-lg select-none">⚜</div>
        <div className="absolute bottom-3 left-3 text-[#d4af37] text-lg select-none">⚜</div>
        <div className="absolute bottom-3 right-3 text-[#d4af37] text-lg select-none">⚜</div>

        {/* Inner Delicate Gold Border */}
        <div className="absolute inset-2 border border-[#d4af37]/30 rounded-2xl pointer-events-none" />

        {/* Header Invocation */}
        <div className="inline-block px-5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/50 text-[#670a1a] text-xs sm:text-sm font-serif tracking-[0.2em] uppercase font-semibold mb-3">
          TOGETHER WITH OUR FAMILIES
        </div>

        <p className="text-xs sm:text-sm font-serif tracking-[0.18em] uppercase text-[#4a0404] font-medium mb-6">
          We cordially invite you to our wedding celebration
        </p>

        {/* Illustrated Royal Couple Silhouette / Medallion */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto my-3 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#800d20] shadow-md flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#670a1a] to-[#380208] flex items-center justify-center border border-[#d4af37]/60 text-4xl sm:text-5xl shadow-inner">
            👰🏽🤵🏽
          </div>
        </div>

        {/* Groom: Praveen Kumar S (CLEAN - NO QUALIFICATIONS) */}
        <div className="my-5">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#670a1a] tracking-wide drop-shadow-sm">
            Praveen Kumar S
          </h1>
          <p className="text-xs sm:text-sm font-serif italic text-[#70452c] mt-1 font-light">
            Son of S. Shanmugam &amp; S. Kavitha
          </p>
        </div>

        {/* Elegant Ampersand Divider */}
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#d4af37] italic">
            &amp;
          </span>
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Bride: Sri Arunachala Priya S (CLEAN - NO QUALIFICATIONS) */}
        <div className="my-5">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#670a1a] tracking-wide drop-shadow-sm">
            Sri Arunachala Priya S
          </h1>
          <p className="text-xs sm:text-sm font-serif italic text-[#70452c] mt-1 font-light">
            Daughter of A. Soundararajan &amp; S. Bhuvaneswari
          </p>
        </div>

        {/* Sacred Union Motto */}
        <div className="mt-8 pt-5 border-t border-[#d4af37]/40">
          <p className="text-xs sm:text-sm font-serif tracking-[0.25em] uppercase text-[#670a1a] font-semibold">
            TWO HEARTS • ONE JOURNEY • FOREVER
          </p>
          <p className="text-xs font-serif italic text-[#8a5a3c] mt-2">
            As two souls unite in timeless love and devotion, grace us with your warm presence and blessings.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
