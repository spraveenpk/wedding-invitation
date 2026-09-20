"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setAttending(null);
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#0b0807] border border-[#c9a45c]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center relative overflow-hidden text-[#f7f0e2]"
          >
            {/* Soft Ambient Halo */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#c9a45c]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="text-xs font-serif tracking-[0.25em] text-[#c9a45c] uppercase mb-1">
              CELEBRATION ATTENDANCE
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#e8d19a] tracking-wide mb-2">
              Will You Join Us?
            </h3>

            <p className="text-xs sm:text-sm font-sans text-white/65 max-w-xs mx-auto mb-6 leading-relaxed">
              Your presence will make our celebration even more special.
            </p>

            {submitted ? (
              <div className="py-8 px-4 rounded-2xl bg-[#24070f]/60 border border-[#c9a45c]/40 text-center">
                <div className="text-3xl mb-2">✨</div>
                <p className="text-base font-serif text-[#e8d19a] font-bold">
                  Thank You for Responding!
                </p>
                <p className="text-xs text-white/70 mt-1">
                  Your blessings and wishes have been warmly received.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Decision Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-serif tracking-wider uppercase transition-all cursor-pointer ${
                      attending === true
                        ? "bg-[#c9a45c] text-[#050505] border-[#e8d19a] font-bold shadow-[0_0_15px_rgba(201,164,92,0.4)]"
                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    YES, I&apos;LL BE THERE ❤️
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-serif tracking-wider uppercase transition-all cursor-pointer ${
                      attending === false
                        ? "bg-[#3a0d18] text-[#f7f0e2] border-[#c9a45c] font-bold"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    I&apos;LL MISS IT
                  </button>
                </div>

                {attending !== null && (
                  <>
                    <div>
                      <label className="block text-[11px] font-sans tracking-widest text-[#c9a45c] uppercase mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh & Family"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a45c]"
                      />
                    </div>

                    {attending && (
                      <div>
                        <label className="block text-[11px] font-sans tracking-widest text-[#c9a45c] uppercase mb-1">
                          Number of Guests
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#0b0807] border border-white/15 text-sm text-white focus:outline-none focus:border-[#c9a45c]"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4+ Family</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-sans tracking-widest text-[#c9a45c] uppercase mb-1">
                        A Warm Blessing / Message
                      </label>
                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share your warm wishes..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a45c] resize-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#c9a45c] via-[#e8d19a] to-[#c9a45c] text-[#050505] text-xs font-serif tracking-[0.2em] font-bold uppercase shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                      >
                        CONFIRM RSVP
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs text-white/60 hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
