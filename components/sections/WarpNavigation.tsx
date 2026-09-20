"use client";
import { motion } from "framer-motion";

export default function WarpNavigation() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Kettimelam+Mahal+Coimbatore";

  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-6 sm:p-10 bg-[#060c1d]/90 backdrop-blur-xl border border-[#00f0ff]/50 shadow-[0_0_40px_rgba(0,240,255,0.25)] text-center relative overflow-hidden"
      >
        <span className="text-[#00f0ff] text-xs font-mono tracking-[0.3em] uppercase font-bold">
          TERRESTRIAL LANDING ZONE // COORDINATES
        </span>
        <h2 className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-wide mt-1 mb-4">
          The Venue
        </h2>
        <div className="w-20 h-[2px] bg-[#00f0ff] mx-auto mb-6" />

        {/* High-Tech Radar / Nav Target Box */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#09142c]/70 border border-[#00f0ff]/40 shadow-inner">
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#00f0ff] to-[#b026ff] mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)]">
            <div className="w-full h-full rounded-full bg-[#050b1a] flex items-center justify-center text-3xl">
              🛰️
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ffffff] to-[#b026ff] tracking-wider mb-2">
            Kettimelam Mahal
          </h3>

          <p className="text-sm sm:text-base font-mono text-[#a0b3d6] max-w-md mx-auto leading-relaxed">
            Airport to Kalapatti Main Road, (NGP College Opp),<br className="hidden sm:inline" /> Coimbatore – 641048
          </p>

          <p className="text-xs font-mono text-[#ffd000] mt-2">
            Sector: Coimbatore, Tamil Nadu, Earth (Sol System)
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-[#02050e] font-mono font-bold text-xs tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:brightness-125 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>🗺️</span>
              <span>LAUNCH GOOGLE MAPS</span>
            </a>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0a152e] text-[#00f0ff] border border-[#00f0ff] font-mono font-bold text-xs tracking-[0.2em] uppercase shadow-md hover:bg-[#00f0ff]/10 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>🧭</span>
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
