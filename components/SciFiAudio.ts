// Web Audio API Sound Engine for Sci-Fi Action Wedding Experience
// Features: Warp Jump SFX, Laser Blaster, Quantum HUD beeps, and driving Cyberpunk Synthwave music

let audioCtx: AudioContext | null = null;
let synthTimer: NodeJS.Timeout | null = null;
let bassOsc: OscillatorNode | null = null;
let isSynthwaveRunning = false;

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

// 1. Sci-Fi Warp Jump & Sonic Boom SFX
export function playWarpSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pitch sweep upward then deep sonic sub-bass
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.5);
    osc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.linearRampToValueAtTime(3500, now + 0.5);
    filter.frequency.exponentialRampToValueAtTime(200, now + 1.2);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.4);
  } catch {}
}

// 2. Sci-Fi Laser Blaster / Photon Cannon Zap
export function playLaserBlaster() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch {}
}

// 3. High-Tech Holographic HUD Chirp
export function playQuantumBeep(frequency = 1200) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {}
}

// 4. Energetic Driving Cyberpunk / Synthwave Background Music
export function startSciFiSynthwave() {
  if (isSynthwaveRunning) return;
  isSynthwaveRunning = true;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Driving Cyberpunk Bassline notes (F2, G#2, D#2, C2)
    const bassline = [87.31, 87.31, 103.83, 103.83, 77.78, 77.78, 65.41, 77.78];
    // High-tech arpeggiator lead notes
    const arpNotes = [349.23, 415.3, 523.25, 698.46, 523.25, 415.3, 349.23, 261.63];

    let step = 0;

    const playStep = () => {
      if (!isSynthwaveRunning) return;
      const t = ctx.currentTime;

      // 1. Synthwave Punchy Bass
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();
      const bFilter = ctx.createBiquadFilter();

      bOsc.type = "sawtooth";
      bOsc.frequency.setValueAtTime(bassline[step % bassline.length], t);

      bFilter.type = "lowpass";
      bFilter.frequency.setValueAtTime(450, t);

      bGain.gain.setValueAtTime(0.001, t);
      bGain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      bGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      bOsc.connect(bFilter);
      bFilter.connect(bGain);
      bGain.connect(ctx.destination);

      bOsc.start(t);
      bOsc.stop(t + 0.25);

      // 2. Cosmic Arp Lead
      if (step % 2 === 0) {
        const aOsc = ctx.createOscillator();
        const aGain = ctx.createGain();
        aOsc.type = "sine";
        aOsc.frequency.setValueAtTime(arpNotes[(step / 2) % arpNotes.length], t);

        aGain.gain.setValueAtTime(0.001, t);
        aGain.gain.linearRampToValueAtTime(0.03, t + 0.03);
        aGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        aOsc.connect(aGain);
        aGain.connect(ctx.destination);

        aOsc.start(t);
        aOsc.stop(t + 0.4);
      }

      step++;
    };

    synthTimer = setInterval(playStep, 220); // ~136 BPM driving tempo
  } catch {}
}

export function stopSciFiSynthwave() {
  isSynthwaveRunning = false;
  if (synthTimer) {
    clearInterval(synthTimer);
    synthTimer = null;
  }
}

export function isSynthwaveActive(): boolean {
  return isSynthwaveRunning;
}
