"use client";
import { motion } from "framer-motion";

export default function VenueSection() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Kettimelam+Mahal+Coimbatore";

  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#fffdf9]/95 via-[#fbf6ee]/95 to-[#f7eee1]/95 border-2 border-[#d4af37] shadow-[0_15px_40px_rgba(0,0,0,0.45)] text-center relative overflow-hidden"
      >
        {/* Section Subheading */}
        <span className="text-[#670a1a] text-xs font-serif tracking-[0.25em] uppercase font-bold">
          CEREMONIAL DESTINATION
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#4a0404] tracking-wide mt-1 mb-4">
          The Venue
        </h2>
        <div className="w-16 h-[1.5px] bg-[#d4af37] mx-auto mb-6" />

        {/* Palace / Mandapam Architectural Card */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#670a1a]/10 via-[#d4af37]/10 to-[#800d20]/5 border border-[#d4af37]/50 shadow-inner">
          
          {/* Architectural Emblem */}
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#800d20] mx-auto mb-4 shadow">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#670a1a] to-[#4a0404] flex items-center justify-center text-3xl">
              🏛️
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#670a1a] tracking-wide mb-2">
            Kettimelam Mahal
          </h3>

          <p className="text-sm sm:text-base font-serif text-[#4a0404] max-w-md mx-auto leading-relaxed font-medium">
            Airport to Kalapatti Main Road, (NGP College Opp),<br className="hidden sm:inline" /> Coimbatore – 641048
          </p>

          <p className="text-xs font-serif text-[#8a5a3c] mt-2 italic">
            Coimbatore, Tamil Nadu, India
          </p>

          {/* Action Buttons: OPEN IN GOOGLE MAPS & GET DIRECTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#670a1a] via-[#800d20] to-[#4a0404] text-[#fffdf9] border border-[#d4af37] text-xs font-serif tracking-[0.2em] uppercase font-bold shadow-lg hover:brightness-125 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>🗺️</span>
              <span>OPEN IN GOOGLE MAPS</span>
            </a>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27] text-[#4a0404] border border-[#947124] text-xs font-serif tracking-[0.2em] uppercase font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>📍</span>
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
