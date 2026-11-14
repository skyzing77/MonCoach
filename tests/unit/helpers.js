/* Outils communs aux tests unitaires. */
export class FakeStorage {
  constructor(init = {}) {
    this.map = new Map(Object.entries(init));
    this.failWrites = false;
    this.quota = Infinity;
  }
  getItem(k) {
    return this.map.has(k) ? this.map.get(k) : null;
  }
  setItem(k, v) {
    if (this.failWrites) throw new Error('QuotaExceededError');
    let size = String(v).length;
    for (const [key, val] of this.map) if (key !== k) size += val.length;
    if (size > this.quota) throw new Error('QuotaExceededError');
    this.map.set(k, String(v));
  }
  removeItem(k) {
    this.map.delete(k);
  }
}

/** Horloge manuelle pour piloter les chronos sans attendre. */
export function clock(start = 1_700_000_000_000) {
  let t = start;
  const now = () => t;
  now.advance = (ms) => (t += ms);
  now.set = (v) => (t = v);
  return now;
}

/** Données au format v1 (application d'origine), telles qu'on les trouve chez un utilisateur existant. */
export const legacyAxel = () => ({
  history: [
    {
      id: 'lq1a2b3c',
      date: '2026-10-05',
      short: 'Séance 1 · jambes et dos',
      title: 'Séance 1 – accent jambes et dos',
      tours: 0,
      rows: [
        { ex: 'Fentes bulgares (pied arrière sur le banc)', sets: [{ r: '8', k: '12' }, { r: '8', k: '12' }, { r: '7', k: '12' }, { r: '6', k: '12' }] },
        { ex: 'Soulevé de terre roumain aux haltères', sets: [{ r: '10', k: '16' }, { r: '10', k: '16' }, { r: '10', k: '16' }, { r: '10', k: '16' }] },
        { ex: 'Planche (gainage sur les avant-bras)', sets: [{ r: '40', k: '' }, { r: '35', k: '' }, { r: '30', k: '' }] },
      ],
      note: 'RAS',
      vol: 1976,
      dur: 51,
    },
    {
      id: 'lq9z8y7x',
      date: '2026-10-08',
      short: 'Séance 2 · haut du corps',
      title: 'Séance 2 – accent haut du corps',
      tours: 0,
      rows: [
        { ex: 'Développé incliné aux haltères', sets: [{ r: '8', k: '14' }, { r: '8', k: '14' }, { r: '7', k: '14' }, { r: '6', k: '14' }] },
        { ex: 'Superset : élévations latérales, curl marteau, extensions triceps', sets: [{ r: '12', k: '6' }, { r: '12', k: '6' }, { r: '10', k: '6' }] },
      ],
      note: '',
      vol: 588,
      dur: 48,
    },
    {
      id: 'lr1c2d3e',
      date: '2026-10-12',
      short: 'Séance 1 · jambes et dos',
      title: 'Séance 1 – accent jambes et dos',
      tours: 0,
      rows: [
        { ex: 'Fentes bulgares (pied arrière sur le banc)', sets: [{ r: '10', k: '12' }, { r: '10', k: '12' }, { r: '10', k: '12' }, { r: '10', k: '12' }] },
        { ex: 'Soulevé de terre roumain aux haltères', sets: [{ r: '10', k: '18' }, { r: '9', k: '18' }, { r: '8', k: '18' }, { r: '8', k: '18' }] },
      ],
      note: '',
      vol: 1830,
      dur: 0,
    },
  ],
  drafts: { s1: { date: '2026-10-19', tours: 0, sets: { 0: [{ r: '8', k: '14', d: true }] }, note: 'en cours', t0: 1 } },
  rides: ['2026-10-10', '2026-10-11'],
  cur: 's2',
  mute: true,
  exp: '2026-10-06',
  expN: 1,
  uns: 2,
});
