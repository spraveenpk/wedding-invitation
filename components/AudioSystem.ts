// Web Audio API Sound Engine for Royal South Indian Wedding
// Generates authentic acoustic temple bells, Kalyana Nadaswaram melodies, and Tanpura drone

let audioCtx: AudioContext | null = null;
let musicTimer: NodeJS.Timeout | null = null;
let tanpuraOscs: OscillatorNode[] = [];
let tanpuraGain: GainNode | null = null;
let isMusicActive = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Authentic Sacred Temple Bell with physical harmonic decay
export function playTempleBell() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Harmonic frequencies typical of South Indian bronze temple bells (Gopuram Ghanta)
    const partials = [
      { freq: 587.33, gain: 0.45, decay: 4.2 }, // D5 Fundamental
      { freq: 1174.66, gain: 0.35, decay: 3.5 }, // D6 Octave
      { freq: 1761.99, gain: 0.25, decay: 2.8 }, // Minor third overtone
      { freq: 2349.32, gain: 0.18, decay: 2.1 }, // Metallic shimmer
      { freq: 3520.0, gain: 0.12, decay: 1.4 },  // High bronze strike
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(8, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(gain, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch {
    // Audio context not allowed before user gesture
  }
}

// 2. Continuous Kalyana Nadaswaram & Tanpura Wedding Music
export function startWeddingMusic() {
  if (isMusicActive) return;
  isMusicActive = true;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Tanpura Drone in D (Panchama & Shadja: A3 & D3)
    tanpuraGain = ctx.createGain();
    tanpuraGain.gain.setValueAtTime(0.0001, now);
    tanpuraGain.gain.linearRampToValueAtTime(0.04, now + 2); // Soft ambient background
    tanpuraGain.connect(ctx.destination);

    const droneNotes = [146.83, 220.0, 293.66]; // D3, A3, D4
    tanpuraOscs = droneNotes.map((freq) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(tanpuraGain!);
      osc.start(now);
      return osc;
    });

    // Traditional auspicious Kalyani / Mohanam melodic phrasing (Sa, Ri, Ga, Pa, Dha, Sa')
    const ragaNotes = [
      293.66, // D4 (Sa)
      329.63, // E4 (Ri)
      369.99, // F#4 (Ga)
      440.0,  // A4 (Pa)
      493.88, // B4 (Dha)
      587.33, // D5 (Sa')
      493.88,
      440.0,
      369.99,
      329.63,
      293.66,
      369.99,
      440.0,
      587.33,
    ];

    let noteIdx = 0;

    const playNadaswaramPhrase = () => {
      if (!isMusicActive) return;
      try {
        const t = ctx.currentTime;
        const freq = ragaNotes[noteIdx % ragaNotes.length];

        // Dual oscillators for rich reed/woodwind nadaswaram harmonic body
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const nGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = "sawtooth";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(freq, t);
        osc2.frequency.setValueAtTime(freq * 2, t);

        // Expressive vibrato (gamaka)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(5.5, t); // 5.5 Hz vibrato
        lfoGain.gain.setValueAtTime(3.5, t);
        lfo.connect(osc1.frequency);
        lfo.start(t);
        lfo.stop(t + 0.85);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, t);

        nGain.gain.setValueAtTime(0.0001, t);
        nGain.gain.linearRampToValueAtTime(0.035, t + 0.08);
        nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(nGain);
        nGain.connect(ctx.destination);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.85);
        osc2.stop(t + 0.85);

        noteIdx++;
      } catch {
        // Safe catch
      }
    };

    // First note immediately
    playNadaswaramPhrase();
    musicTimer = setInterval(playNadaswaramPhrase, 750);
  } catch {
    // Audio context error
  }
}

export function stopWeddingMusic() {
  isMusicActive = false;
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  if (tanpuraGain && audioCtx) {
    try {
      tanpuraGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        tanpuraOscs.forEach((osc) => {
          try {
            osc.stop();
          } catch {}
        });
        tanpuraOscs = [];
      }, 600);
    } catch {
      tanpuraOscs = [];
    }
  }
}

export function isWeddingMusicPlaying(): boolean {
  return isMusicActive;
}
