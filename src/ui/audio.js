/* Signaux de la séance : bips (Web Audio), vibrations, écran maintenu allumé.
   Tout est facultatif : chaque API absente ou refusée est ignorée sans bloquer la séance. */

let ctx = null;
let wakeLock = null;
let opts = { sound: true, vib: true };
let wantAwake = false;

export function setSignalOptions(o) {
  opts = { sound: o.sound !== false, vib: o.vib !== false };
}

/** À appeler lors d'un geste de l'utilisateur (obligatoire pour autoriser le son sur mobile). */
export function unlockAudio() {
  try {
    // « ambient » : les bips se mélangent à la musique en cours (iOS 17+) au lieu de la couper
    if (navigator.audioSession && navigator.audioSession.type !== 'ambient') navigator.audioSession.type = 'ambient';
  } catch (e) {
    /* API absente */
  }
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = ctx || new AC();
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
  } catch (e) {
    ctx = null;
  }
}

function beep(freq, dur, delay = 0) {
  if (!ctx || !opts.sound) return;
  const play = () => {
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const t = ctx.currentTime + delay;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.05);
    } catch (e) {
      /* contexte audio fermé */
    }
  };
  if (ctx.state === 'running') play();
  else ctx.resume().then(play).catch(() => {});
}

const PATTERNS = {
  go: () => { beep(660, 0.2); beep(880, 0.3, 0.13); },
  rest: () => { beep(587, 0.25); beep(440, 0.4, 0.15); },
  end: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.7, i * 0.16)),
  tick: () => beep(880, 0.12),
  ok: () => beep(880, 0.12),
};
const VIBES = { go: [60, 50, 120], rest: [120], end: [80, 60, 80, 60, 200], tick: 25, ok: 40 };

/** Joue un signal : 'tick' | 'go' | 'rest' | 'ok' | 'end'. */
export function signal(name) {
  (PATTERNS[name] || PATTERNS.ok)();
  if (opts.vib) {
    try {
      navigator.vibrate && navigator.vibrate(VIBES[name] || 40);
    } catch (e) {
      /* vibration indisponible (iOS) */
    }
  }
}

export function tap() {
  if (!opts.vib) return;
  try {
    navigator.vibrate && navigator.vibrate(10);
  } catch (e) {
    /* indisponible */
  }
}

/* ----- écran allumé pendant la séance ----- */

function requestWake() {
  try {
    if (!wantAwake || document.hidden || !navigator.wakeLock || (wakeLock && !wakeLock.released)) return;
    navigator.wakeLock.request('screen').then((l) => (wakeLock = l)).catch(() => {});
  } catch (e) {
    /* API absente */
  }
}

export function keepAwake(on) {
  wantAwake = on;
  if (on) return requestWake();
  try {
    wakeLock && wakeLock.release();
  } catch (e) {
    /* déjà libéré */
  }
  wakeLock = null;
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // en arrière-plan, on rend la main à la musique ; le contexte est réveillé au prochain bip
      try {
        ctx && ctx.state === 'running' && ctx.suspend();
      } catch (e) {
        /* contexte fermé */
      }
    } else requestWake(); // le verrou d'écran est libéré par le système à chaque mise en arrière-plan
  });
}
