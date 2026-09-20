// Web Audio API Sound Engine for Luxury Indian Wedding Experience
// Features: Classical Veena, Flute, Tanpura Drone, and Temple Bell acoustics

let audioCtx: AudioContext | null = null;
let melodyTimer: NodeJS.Timeout | null = null;
let tanpuraOscs: OscillatorNode[] = [];
let masterGain: GainNode | null = null;
let isActive = false;

function getContext(): AudioContext {
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

// 1. Temple Bell Strike with authentic exponential bronze decay
export function playTempleBell() {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    const partials = [
      { freq: 587.33, gain: 0.35, decay: 3.8 },
      { freq: 1174.66, gain: 0.25, decay: 3.0 },
      { freq: 1761.99, gain: 0.18, decay: 2.2 },
      { freq: 2349.32, gain: 0.12, decay: 1.5 },
      { freq: 3520.0, gain: 0.08, decay: 1.0 },
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(9, now);

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
  } catch {}
}

// 2. Continuous Classical Veena & Flute Ambient Wedding Music
export function startWeddingAmbience() {
  if (isActive) return;
  isActive = true;

  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(0.045, now + 2.5); // Soft, refined background volume
    masterGain.connect(ctx.destination);

    // Warm Tanpura Drone in D
    const droneFreqs = [146.83, 220.0, 293.66]; // D3, A3, D4
    tanpuraOscs = droneFreqs.map((f) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, now);
      osc.connect(masterGain!);
      osc.start(now);
      return osc;
    });

    // Auspicious classical Raga Mohanam / Hamsadhwani notes (Sa, Ri, Ga, Pa, Ni, Sa')
    const ragaNotes = [
      293.66, // D4
      329.63, // E4
      369.99, // F#4
      440.0,  // A4
      554.37, // C#5
      587.33, // D5
      554.37,
      440.0,
      369.99,
      329.63,
      293.66,
      369.99,
      440.0,
      587.33,
    ];

    let noteIdx = 0;

    const playMelodyPhrase = () => {
      if (!isActive) return;
      try {
        const t = ctx.currentTime;
        const freq = ragaNotes[noteIdx % ragaNotes.length];

        // Veena string plucking simulation (warm sine + slight triangle attack)
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        // Subtle gamaka vibrato
        const vibrato = ctx.createOscillator();
        const vGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(5.0, t);
        vGain.gain.setValueAtTime(2.5, t);
        vibrato.connect(osc.frequency);
        vibrato.start(t);
        vibrato.stop(t + 0.9);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, t);

        noteGain.gain.setValueAtTime(0.0001, t);
        noteGain.gain.linearRampToValueAtTime(0.03, t + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain!);

        osc.start(t);
        osc.stop(t + 0.9);

        noteIdx++;
      } catch {}
    };

    playMelodyPhrase();
    melodyTimer = setInterval(playMelodyPhrase, 820);
  } catch {}
}

export function stopWeddingAmbience() {
  isActive = false;
  if (melodyTimer) {
    clearInterval(melodyTimer);
    melodyTimer = null;
  }
  if (masterGain && audioCtx) {
    try {
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        tanpuraOscs.forEach((o) => {
          try {
            o.stop();
          } catch {}
        });
        tanpuraOscs = [];
      }, 900);
    } catch {
      tanpuraOscs = [];
    }
  }
}

export function isAmbienceActive(): boolean {
  return isActive;
}
