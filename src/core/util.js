/* Fonctions utilitaires pures (aucun accès au DOM) : texte, nombres, dates. */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Échappe un texte avant insertion dans du HTML (contenu ou attribut). */
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/** Nombre saisi par l'utilisateur (« 12,5 » accepté). Renvoie 0 si illisible ou négatif. */
export const num = (v) => {
  const x = parseFloat(String(v ?? '').replace(',', '.'));
  return Number.isFinite(x) && x > 0 ? x : 0;
};

/** Affiche un nombre sans décimales inutiles (12 → « 12 », 12.5 → « 12,5 »). */
export const fmtNum = (x) => String(Math.round(x * 10) / 10).replace('.', ',');

/** Entier avec séparateur de milliers (15336 → « 15 336 »). */
export const fmtInt = (x) => Math.round(x).toLocaleString('fr-FR');

export const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const plural = (n, one, many) => (n > 1 ? many : one);

/* ---------- Dates : toujours des jours locaux « AAAA-MM-JJ » ---------- */

const DAY_RE = /^\d{4}-\d\d-\d\d$/;
const pad = (n) => String(n).padStart(2, '0');

export const ymd = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
export const today = () => ymd(new Date());
/** Midi local : évite les décalages de jour aux changements d'heure. */
export const dayDate = (s) => new Date(s + 'T12:00:00');

/** Vrai si s est un jour réel au format AAAA-MM-JJ (« 2024-02-31 » est refusé). */
export const isDay = (s) => {
  if (typeof s !== 'string' || !DAY_RE.test(s)) return false;
  const d = dayDate(s);
  return !Number.isNaN(d.getTime()) && ymd(d) === s;
};

export const addDays = (s, n) => {
  const d = dayDate(s);
  d.setDate(d.getDate() + n);
  return ymd(d);
};

/** Lundi de la semaine du jour s. */
export const weekStart = (s) => {
  const d = dayDate(s);
  return addDays(s, -((d.getDay() + 6) % 7));
};

export const daysBetween = (a, b) => Math.round((dayDate(b) - dayDate(a)) / 864e5);

export const fmtDay = (s, opts = { weekday: 'short', day: 'numeric', month: 'short' }) =>
  dayDate(s).toLocaleDateString('fr-FR', opts);

/** 95 → « 1:35 » */
export const mmss = (sec) => {
  const s = Math.max(0, Math.floor(sec));
  return Math.floor(s / 60) + ':' + pad(s % 60);
};

/** 105 → « 1 min 45 », 45 → « 45 s » */
export const restText = (n) => (n >= 60 ? Math.floor(n / 60) + ' min' + (n % 60 ? ' ' + pad(n % 60) : '') : n + ' s');

/** Identifiant court, unique en pratique (horodatage + aléa). */
export const uid = (now = Date.now()) => now.toString(36) + Math.random().toString(36).slice(2, 6);
