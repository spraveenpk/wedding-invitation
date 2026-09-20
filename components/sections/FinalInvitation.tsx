"use client";
import { motion } from "framer-motion";

export default function FinalInvitation() {
  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 py-6 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="rounded-3xl p-6 sm:p-12 bg-gradient-to-b from-[#670a1a] via-[#4a0404] to-[#2e0105] text-[#fffdf9] border-4 border-[#d4af37] shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-center relative overflow-hidden"
      >
        {/* Ornate Gold Filigree Inner Frame */}
        <div className="absolute inset-2.5 border border-[#d4af37]/40 rounded-2xl pointer-events-none" />
        <div className="absolute top-3 left-3 text-[#d4af37] text-lg select-none">⚜</div>
        <div className="absolute top-3 right-3 text-[#d4af37] text-lg select-none">⚜</div>
        <div className="absolute bottom-3 left-3 text-[#d4af37] text-lg select-none">⚜</div>
        <div className="absolute bottom-3 right-3 text-[#d4af37] text-lg select-none">⚜</div>

        {/* Auspicious Ganesha Inscription */}
        <div className="text-xs font-serif tracking-[0.25em] uppercase text-[#f3e5ab] mb-2 drop-shadow">
          ॥ शुभ विवाह ॥
        </div>

        {/* Sacred Union Emblem */}
        <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#c59b27] mx-auto mb-4 shadow-lg">
          <div className="w-full h-full rounded-full bg-[#4a0404] flex items-center justify-center text-3xl">
            🙏
          </div>
        </div>

        {/* Clean Couple Names - NO DEGREES */}
        <div className="my-5">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fffdf9] via-[#f3e5ab] to-[#d4af37] tracking-wide drop-shadow-md">
            Praveen Kumar S
          </h1>
          <div className="text-2xl sm:text-3xl font-serif text-[#d4af37] my-1 font-bold italic">
            &amp;
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fffdf9] via-[#f3e5ab] to-[#d4af37] tracking-wide drop-shadow-md">
            Sri Arunachala Priya S
          </h1>
        </div>

        <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-5" />

        {/* Ceremonies Summary Card */}
        <div className="space-y-3 max-w-md mx-auto my-6 text-xs sm:text-sm font-serif">
          <div className="p-3.5 rounded-2xl bg-[#fffdf9]/5 border border-[#d4af37]/30 backdrop-blur-sm">
            <span className="font-bold text-[#f3e5ab] uppercase tracking-[0.2em] block text-[11px] mb-1">
              RECEPTION
            </span>
            <span className="text-[#fffdf9] font-medium tracking-wide">
              15 NOVEMBER 2026
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#fffdf9]/5 border border-[#d4af37]/30 backdrop-blur-sm">
            <span className="font-bold text-[#f3e5ab] uppercase tracking-[0.2em] block text-[11px] mb-1">
              MUHURTHAM
            </span>
            <span className="text-[#fffdf9] font-medium tracking-wide">
              16 NOVEMBER 2026
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#fffdf9]/5 border border-[#d4af37]/30 backdrop-blur-sm">
            <span className="font-bold text-[#f3e5ab] uppercase tracking-[0.2em] block text-[11px] mb-1">
              VENUE
            </span>
            <span className="text-[#fffdf9] font-medium tracking-wide">
              Kettimelam Mahal
            </span>
          </div>
        </div>

        {/* Closing Invitation Message */}
        <p className="text-sm sm:text-base font-serif italic text-[#f3e5ab] max-w-md mx-auto leading-relaxed my-6 px-2">
          &ldquo;We warmly invite you and your family to bless us on our special day.&rdquo;
        </p>

        {/* Final Signature */}
        <div className="mt-8 pt-6 border-t border-[#d4af37]/30">
          <p className="text-xs font-serif tracking-[0.2em] text-[#d4af37] uppercase mb-1">
            With love,
          </p>
          <p className="text-lg sm:text-xl font-serif font-bold text-[#fffdf9] tracking-wide">
            Praveen &amp; Arunachala Priya S
          </p>
        </div>

        {/* Final Royal Golden Seal "P & S" */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#947124] shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#4a0404] flex items-center justify-center border border-[#d4af37]/60">
              <span className="text-xs font-serif font-bold text-[#f3e5ab] tracking-wider">
                P &amp; S
              </span>
            </div>
          </div>
          <p className="text-[10px] font-serif tracking-[0.25em] text-[#d4af37] uppercase mt-2">
            TWO HEARTS • ONE JOURNEY • FOREVER
          </p>
        </div>
      </motion.div>
    </section>
  );
}
