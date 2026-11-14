/* Figures illustrées : poses interpolées + cinématique inverse, rendu SVG (corps en volume, matériel,
   muscles travaillés, repères de technique, flèche de mouvement).
   pose() et figureSVG() sont pures (testables sans navigateur) ; paintFigures() et l'animation touchent au DOM. */
import { FIGURES } from '../data/figures.js';
import { esc } from '../core/util.js';

const DG = Math.PI / 180;
export const GROUND = 91;
const CYCLE_MS = 4600;

const f1 = (n) => n.toFixed(1);
const pt = (q) => f1(q[0]) + ',' + f1(q[1]);
const polar = (o, a, l) => [o[0] + Math.cos(a * DG) * l, o[1] + Math.sin(a * DG) * l];
const ease = (x) => (1 - Math.cos(Math.PI * x)) / 2;
const V = (a, b) => [b[0] - a[0], b[1] - a[1]];
const U = (v) => {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
};
const NR = (u) => [-u[1], u[0]];
const AD = (p, v, k) => [p[0] + v[0] * k, p[1] + v[1] * k];
const LP = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Interpole deux valeurs de pose ; une valeur absente d'un côté reprend celle de l'autre. */
function lerp(a, b, t) {
  if (a == null) return b;
  if (b == null) return a;
  if (Array.isArray(a)) return a.map((v, i) => v + (b[i] - v) * t);
  return typeof a === 'number' ? a + (b - a) * t : a;
}

/** Cinématique inverse à deux segments. reach = distance réellement atteinte / demandée (diagnostic). */
export function ik(o, tg, l1, l2, s) {
  const dx = tg[0] - o[0];
  const dy = tg[1] - o[1];
  const b = Math.atan2(dy, dx);
  const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(l1 - l2) + 0.01), l1 + l2 - 0.01);
  const a = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d));
  const j = [o[0] + Math.cos(b - s * a) * l1, o[1] + Math.sin(b - s * a) * l1];
  const c = Math.atan2(tg[1] - j[1], tg[0] - j[0]);
  return [j, [j[0] + Math.cos(c) * l2, j[1] + Math.sin(c) * l2]];
}

export const LIMB = { leg: [20, 20], arm: [13, 12], torso: 26 };

/** Vue de face : épaule, coude et main de chaque bras (sg = -1 bras gauche de l'image, 1 bras droit).
    Deux modes : angles (ar = écart du bras, el = flexion du coude), ou cercle (circ) où la main, bras tendu, décrit un
    cercle de rayon circ.r dans le plan de l'image autour d'un point situé à circ.d de l'épaule (phase q.ph, en degrés). */
export function frontArms(E, q, fem = false) {
  const sh = 25;
  return [-1, 1].map((sg) => {
    const S = [50 + sg * (fem ? 8.8 : 10.5), sh + 1.5];
    if (E.circ) {
      const c = E.circ, ph = (q.ph || 0) * DG;
      const T = [S[0] + sg * (c.d + c.r * Math.cos(ph)), S[1] + (c.y || 0) + c.r * Math.sin(ph)];
      // bras tendu : la main parcourt le cercle, le coude reste aligné (la légère variation de longueur se lit comme de la perspective)
      return { sg, S, El: LP(S, T, LIMB.arm[0] / (LIMB.arm[0] + LIMB.arm[1])), Hd: T };
    }
    const a = q.ar * DG, b = (q.ar + q.el) * DG;
    const El = [S[0] + sg * Math.sin(a) * 13, S[1] + Math.cos(a) * 13];
    return { sg, S, El, Hd: [El[0] + sg * Math.sin(b) * 12, El[1] + Math.cos(b) * 12] };
  });
}

/** Calcule les articulations d'une figure à l'instant t (0 = pose a, 1 = pose b). */
export function pose(E, t) {
  const P = {};
  for (const k of new Set([...Object.keys(E.a), ...Object.keys(E.b)])) P[k] = lerp(E.a[k], E.b[k], t);
  if (E.front) return P;
  const s = { k1: 1, k2: 1, e1: -1, e2: -1, ...E.s };
  const R = E.rel || [];
  // pivot : les épaules restent fixes (appuyées au sol ou sur le banc) et le bassin tourne autour d'elles
  const hip = E.pivot ? polar(E.pivot, P.tor + 180, LIMB.torso) : P.hip;
  const nk = polar(hip, P.tor, LIMB.torso);
  const q = { hip, nk, hd: polar(nk, P.tor, 9) };
  const limb = (o, l1, l2, ang, tg, sg, rel) => {
    if (ang) {
      const j = polar(o, ang[0], l1);
      return [j, polar(j, ang[1], l2)];
    }
    return ik(o, rel ? [rel[0] + tg[0], rel[1] + tg[1]] : tg, l1, l2, sg);
  };
  for (const n of ['1', '2']) {
    [q['k' + n], q['f' + n]] = limb(hip, ...LIMB.leg, P['l' + n], P['f' + n], s['k' + n], R.includes('f' + n) ? hip : null);
    q['t' + n] = polar(q['f' + n], P['ft' + n] == null ? 0 : P['ft' + n], 6);
    [q['e' + n], q['h' + n]] = limb(nk, ...LIMB.arm, P['a' + n], P['h' + n], s['e' + n], R.includes('h' + n) ? nk : null);
  }
  q.cv = P.cv || 0;
  q.ha = P.ha;
  q.tor = P.tor;
  return q;
}

/* ---------- Rendu ---------- */

const palette = (fem) => ({
  skin: '#e7b28c', skinF: '#b78061',
  shirt: fem ? '#25b3a6' : '#5d6fe0', shirtF: fem ? '#1b7f76' : '#3d4ca6',
  short: fem ? '#3b2f4d' : '#2a2f45', shortF: fem ? '#2a2238' : '#1c2031',
  shoe: '#eef0f8', shoeF: '#9ea5c2', sole: '#4a5070',
  hair: fem ? '#5b3420' : '#3b2a1f',
  mus: fem ? '#ffd23f' : '#ff6a55',
  cue: '#7dffb0', pad: '#454d6c', padTop: '#6a7396', metal: '#9aa3c2', plate: '#2b3045',
});

function taper(a, b, wa, wb, fill, x) {
  const n = NR(U(V(a, b)));
  const p1 = AD(a, n, wa / 2), p2 = AD(b, n, wb / 2), p3 = AD(b, n, -wb / 2), p4 = AD(a, n, -wa / 2);
  return `<path d="M${pt(p1)}L${pt(p2)}A${f1(wb / 2)} ${f1(wb / 2)} 0 0 0 ${pt(p3)}L${pt(p4)}A${f1(wa / 2)} ${f1(wa / 2)} 0 0 0 ${pt(p1)}Z" fill="${fill}"${x ? ' ' + x : ''}/>`;
}
const circle = (c, r, fill, x) => `<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(r)}" fill="${fill}"${x ? ' ' + x : ''}/>`;

function makeRenderer(fem) {
  const SK = palette(fem);

  function torso(q) {
    const u = U(V(q.hip, q.nk)), n = NR(u);
    const P = (t, o) => AD(AD(q.hip, u, LIMB.torso * t), n, o + (q.cv || 0) * 1.5 * Math.sin(Math.PI * Math.max(0, Math.min(1, t))));
    const pts = fem
      ? [P(-0.02, -5), P(0.4, -3.3), P(0.72, -3.9), P(0.97, -2.6), P(1, 2.1), P(0.8, 5.4), P(0.66, 4.4), P(0.48, 3.2), P(0.22, 3.9), P(0.03, 5.1)]
      : [P(-0.02, -4.7), P(0.35, -3.9), P(0.7, -4.5), P(0.97, -3), P(1, 2.4), P(0.8, 5.3), P(0.6, 4.4), P(0.35, 4.1), P(0.05, 4.9)];
    return `<path d="M${pts.map(pt).join('L')}Z" fill="${SK.shirt}" stroke="${SK.shirt}" stroke-width="2.4" stroke-linejoin="round"/>`;
  }

  function shoe(f, t, far) {
    const d = U(V(f, t)), dn = NR(d), h = AD(f, d, -2), toe = AD(f, d, 6.6);
    return taper(AD(h, dn, 0.7), AD(toe, dn, 0.9), 4.2, 2.8, far ? SK.shoeF : SK.shoe) + taper(AD(h, dn, 2.2), AD(toe, dn, 2), 1.4, 1.2, SK.sole);
  }

  function leg(q, i, far) {
    const H = q.hip, K = q['k' + i], F = q['f' + i];
    const sk = far ? SK.skinF : SK.skin, pa = far ? SK.shortF : SK.short;
    if (fem) return taper(K, F, 4.8, 3.2, sk) + taper(K, LP(K, F, 0.86), 5.2, 3.7, pa) + taper(LP(K, F, 0.12), LP(K, F, 0.55), 5.4, 4.4, pa) + taper(H, K, 8, 5.4, pa) + shoe(F, q['t' + i], far);
    return taper(K, F, 5.2, 3.4, sk) + taper(LP(K, F, 0.12), LP(K, F, 0.55), 5.6, 4.6, sk) + taper(H, K, 7.6, 5.2, sk) + taper(H, LP(H, K, 0.5), 9.2, 7.8, pa) + shoe(F, q['t' + i], far);
  }

  function arm(q, i, far) {
    const S = q.nk, E = q['e' + i], Hd = q['h' + i], sk = far ? SK.skinF : SK.skin;
    return taper(S, E, fem ? 4.2 : 4.6, 3.4, sk) + taper(E, Hd, fem ? 3.3 : 3.6, 2.6, sk) + circle(Hd, 2.1, sk) +
      (fem ? circle(S, 2.9, far ? SK.shirtF : SK.shirt) : taper(S, LP(S, E, 0.5), 5.8, 5, far ? SK.shirtF : SK.shirt));
  }

  function head(q) {
    const u = q.ha != null ? [Math.cos(q.ha * DG), Math.sin(q.ha * DG)] : U(V(q.hip, q.nk));
    const n = NR(u), c = AD(q.nk, u, 8);
    return taper(q.nk, AD(q.nk, u, 4.5), 3.8, 3.6, SK.skin) +
      (fem ? taper(AD(AD(c, n, -4.6), u, 1.6), AD(AD(c, n, -8.6), u, -5), 3.8, 2, SK.hair) + circle(AD(AD(c, n, -4.4), u, 1.8), 1.6, SK.shirt) : '') +
      circle(AD(AD(c, n, -0.9), u, 0.7), fem ? 6.3 : 6, SK.hair) + circle(AD(AD(c, n, 0.7), u, -0.5), 5.3, SK.skin) +
      `<path d="M${pt(AD(AD(c, n, 5.6), u, 0.6))}L${pt(AD(AD(c, n, 7.1), u, -0.6))}L${pt(AD(AD(c, n, 5.6), u, -1.4))}Z" fill="${SK.skin}"/>` +
      circle(AD(c, n, -0.4), 1.3, SK.skinF) + circle(AD(AD(c, n, 3.3), u, 1.4), 0.65, '#1d1a22');
  }

  function dumbbell(h, e, op) {
    const d = U(V(e, h)), p = NR(d);
    const plate = (c) => taper(AD(c, d, -1.3), AD(c, d, 1.3), 6.2, 6.2, SK.plate, `stroke="${SK.metal}" stroke-width=".6"`);
    return `<g opacity="${op}">${taper(AD(h, p, -4.4), AD(h, p, 4.4), 1.5, 1.5, SK.metal)}${plate(AD(h, p, -3.6))}${plate(AD(h, p, 3.6))}</g>`;
  }

  function props(L) {
    const legOf = (x, y) => `<rect x="${x - 1}" y="${y}" width="2" height="${GROUND - y}" fill="${SK.metal}"/><rect x="${x - 4}" y="${GROUND - 1.6}" width="8" height="1.6" rx=".8" fill="${SK.metal}"/>`;
    const pad = (a, b) => {
      const n = NR(U(V(a, b)));
      return taper(a, b, 5.4, 5.4, SK.pad) + taper(AD(a, n, -1.9), AD(b, n, -1.9), 1.2, 1.2, SK.padTop);
    };
    return (L || []).map((p) =>
      p.t === 'bench' ? (p.legs || []).map((x) => legOf(x, p.y)).join('') + pad([p.x1 + 2.4, p.y], [p.x2 - 2.4, p.y])
      : p.t === 'incl' ? (p.legs || []).map((x) => legOf(x, p.p[1][1])).join('') + pad(p.p[0], p.p[1]) + pad(p.p[1], p.p[2])
      : p.t === 'back' ? pad([p.x, p.y1 + 2], [p.x, p.y2 - 2])
      : p.t === 'pole' ? `<rect x="${p.x - 2}" y="${p.y1}" width="4" height="${GROUND - p.y1}" fill="#20242f" stroke="#3a4056" stroke-width=".6"/>`
      : p.t === 'mat' ? `<rect x="${p.x1}" y="${GROUND - 1.8}" width="${p.x2 - p.x1}" height="1.8" rx=".9" fill="#3d6b5a"/>`
      : '').join('');
  }

  /* muscles : [segment, face, début, fin] ; segments thigh/shin/uarm/farm + 1|2, ou torso ; face front|back */
  function muscles(q, M) {
    return (M || []).map(([seg, side, a, b]) => {
      const i = seg.slice(-1);
      const P = seg === 'torso' ? [q.hip, q.nk] : seg.startsWith('thigh') ? [q.hip, q['k' + i]] : seg.startsWith('shin') ? [q['k' + i], q['f' + i]] : seg.startsWith('uarm') ? [q.nk, q['e' + i]] : [q['e' + i], q['h' + i]];
      const n = NR(U(V(P[0], P[1])));
      const sg = (side === 'front' ? -1 : 1) * (seg === 'torso' ? -1 : 1);
      const w = seg === 'torso' ? [5, 4, 3.4] : seg.startsWith('thigh') ? [4, 2.6, 1.6] : seg.startsWith('shin') ? [3, 2, 1.4] : [2.6, 2, 0.9];
      return taper(AD(LP(P[0], P[1], a), n, sg * w[2]), AD(LP(P[0], P[1], b), n, sg * w[2]), w[0], w[1], SK.mus, 'opacity=".85"');
    }).join('');
  }

  /* vue de face : ar = écart des bras, el = flexion du coude, lg = écart des jambes */
  function front(E, q) {
    const sh = 25, hy = 50, lg = (q.lg || 3) * DG, out = [];
    for (const sg of [-1, 1]) {
      const H = [50 + sg * 4.5, hy], F = [H[0] + sg * Math.sin(lg) * 38, hy + Math.cos(lg) * 38], K = LP(H, F, 0.5);
      const foot = `<ellipse cx="${f1(F[0] + sg * 1.2)}" cy="${f1(F[1] + 1.4)}" rx="3.6" ry="2.1" fill="${SK.shoe}"/>`;
      out.push(fem
        ? taper(K, F, 5.2, 3.4, SK.skin) + taper(K, LP(K, F, 0.86), 5.4, 3.8, SK.short) + taper(H, K, 8.4, 5.6, SK.short) + foot
        : taper(K, F, 5.6, 3.6, SK.skin) + taper(H, K, 8, 5.8, SK.skin) + taper(H, LP(H, K, 0.45), 10, 9, SK.short) + foot);
    }
    let h = (fem ? `<rect x="43" y="${sh - 16}" width="14" height="17" rx="6" fill="${SK.hair}"/>` : '') + out.join('') +
      `<path d="${fem ? `M41,${sh - 1}L59,${sh - 1}L58.5,${sh + 9}L56,${sh + 15}L57.5,${hy + 1}L42.5,${hy + 1}L44,${sh + 15}L41.5,${sh + 9}Z` : `M39,${sh - 1}L61,${sh - 1}L60.5,${sh + 8}L57,${hy + 1}L43,${hy + 1}L39.5,${sh + 8}Z`}" fill="${SK.shirt}" stroke="${SK.shirt}" stroke-width="2.4" stroke-linejoin="round"/>` +
      `<rect x="47.6" y="${sh - 6}" width="4.8" height="6" fill="${SK.skin}"/>` + circle([44.5, sh - 11.5], 1.3, SK.skinF) + circle([55.5, sh - 11.5], 1.3, SK.skinF) +
      circle([50, sh - 12.6], 6.3, SK.hair) + circle([50, sh - 11.4], 5.5, SK.skin) + circle([47.9, sh - 11.8], 0.65, '#1d1a22') + circle([52.1, sh - 11.8], 0.65, '#1d1a22');
    for (const { S, El, Hd } of frontArms(E, q, fem)) {
      h += taper(S, El, fem ? 4.3 : 4.8, 3.5, SK.skin) + taper(El, Hd, fem ? 3.4 : 3.8, 2.7, SK.skin) + circle(Hd, 2.1, SK.skin) +
        (fem ? '' : taper(S, LP(S, El, 0.45), 6, 5.4, SK.shirt)) + (E.delt ? circle(S, 3.2, SK.mus, 'opacity=".85"') : '') + (E.db ? dumbbell(Hd, El, 1) : '');
    }
    return h;
  }

  return { SK, torso, leg, arm, head, dumbbell, props, muscles, front };
}

const RENDERERS = { m: makeRenderer(false), f: makeRenderer(true) };

/** Position et texte des repères de technique (exporté pour les tests de cohérence). */
export function cueLayout(q, cues) {
  return (cues || []).map((c) => {
    if (c.t === 'vert') {
      const k = q[c.p];
      return { from: k, to: [k[0], GROUND], at: [k[0] + (c.dx == null ? -2.5 : c.dx), (k[1] + GROUND) / 2 + 1.5 + (c.dy || 0)], text: c.l, anchor: c.an || 'end' };
    }
    const u = U(V(q[c.a], q[c.b])), o = NR(u);
    const a = AD(q[c.a], o, c.off || 0), b = AD(q[c.b], o, c.off || 0), e = AD(b, u, c.ext == null ? 4 : c.ext);
    return { from: AD(a, u, -(c.pre || 0)), to: e, at: [e[0] + (c.dx || 0), e[1] + (c.dy == null ? -2 : c.dy)], text: c.l, anchor: c.an || 'middle' };
  });
}

function cuesSVG(q, cues, opacity, color) {
  if (!cues || opacity <= 0) return '';
  return `<g opacity="${opacity.toFixed(2)}">` + cueLayout(q, cues).map((c) =>
    `<line x1="${f1(c.from[0])}" y1="${f1(c.from[1])}" x2="${f1(c.to[0])}" y2="${f1(c.to[1])}" stroke="${color}" stroke-width=".9" stroke-dasharray="2 1.6"/>` +
    `<text x="${f1(c.at[0])}" y="${f1(c.at[1])}" font-size="5" font-weight="700" fill="#fff" text-anchor="${c.anchor}" paint-order="stroke" stroke="#0d1020" stroke-width="1.6">${esc(c.text)}</text>`).join('') + '</g>';
}

/** Points suivis par le guide d'un mouvement en boucle, à l'instant t. */
function loopPoints(E, t, fem) {
  const q = pose(E, t);
  if (E.front) return frontArms(E, q, fem).map((a) => a.Hd);
  return [].concat(E.trk).map((k) => q[k]);
}

/** Mouvement en boucle (rotations) : trajectoire complète en pointillés et flèche à la position courante. */
function loopGuideSVG(E, t, fem, dir = 1) {
  const N = 48;
  const paths = [];
  const pts = Array.from({ length: N + 1 }, (_, i) => loopPoints(E, i / N, fem));
  // flèche placée un peu en avant de la main (elle ne la masque pas) et proportionnée à la taille du cercle
  // dir = -1 : le cercle est parcouru à l'envers (rotation dans l'autre sens)
  const at = loopPoints(E, (t + 1 + 0.12 * dir) % 1, fem);
  const next = loopPoints(E, (t + 1 + 0.15 * dir) % 1, fem);
  pts[0].forEach((_, j) => {
    paths.push(`<polyline points="${pts.map((p) => pt(p[j])).join(' ')}" stroke-dasharray="2.2 2.2"/>`);
    let per = 0;
    for (let i = 1; i < pts.length; i++) per += Math.hypot(pts[i][j][0] - pts[i - 1][j][0], pts[i][j][1] - pts[i - 1][j][1]);
    const k = Math.min(1, Math.max(0.75, per / (2 * Math.PI) / 6));
    const p = at[j], d = U(V(p, next[j])), n = NR(d);
    const tip = AD(p, d, 2.4 * k), w1 = AD(AD(p, d, -1.4 * k), n, 2.2 * k), w2 = AD(AD(p, d, -1.4 * k), n, -2.2 * k);
    paths.push(`<polyline points="${pt(w1)} ${pt(tip)} ${pt(w2)}" stroke-width="${f1(1.2 + 0.8 * k)}"/>`);
  });
  return `<g stroke="var(--acc)" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".9">${paths.join('')}</g>`;
}

function arrowSVG(E, dir) {
  if (!E.trk || E.static || E.front) return '';
  const A = pose(E, 0)[E.trk], B = pose(E, 1)[E.trk];
  if (!A || !B) return '';
  const [p, r] = dir > 0 ? [A, B] : [B, A];
  const dx = r[0] - p[0], dy = r[1] - p[1], L = Math.hypot(dx, dy);
  if (L < 4) return '';
  const u = [dx / L, dy / L], o = E.ao || [u[1] * -8, u[0] * 8];
  const s = [p[0] + o[0] + u[0] * 2, p[1] + o[1] + u[1] * 2], e = [r[0] + o[0] - u[0] * 2, r[1] + o[1] - u[1] * 2];
  const w = [e[0] - u[0] * 4.5 - u[1] * 3, e[1] - u[1] * 4.5 + u[0] * 3], w2 = [e[0] - u[0] * 4.5 + u[1] * 3, e[1] - u[1] * 4.5 - u[0] * 3];
  return `<g stroke="var(--acc)" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85"><line x1="${f1(s[0])}" y1="${f1(s[1])}" x2="${f1(e[0])}" y2="${f1(e[1])}" stroke-dasharray="2.5 2.5"/><polyline points="${pt(w)} ${pt(e)} ${pt(w2)}"/></g>`;
}

/**
 * Contenu SVG (viewBox 0 0 100 100) d'une figure.
 * @param {string} key   clé de FIGURES
 * @param {number} t     0 = pose de départ, 1 = pose d'arrivée
 * @param {object} [o]   look 'm'|'f' · cues : afficher les repères · label : texte sous la figure · dir : flèche (1, -1, 0)
 */
export function figureSVG(key, t, { look = 'm', cues = false, label = '', dir = 0 } = {}) {
  const E = FIGURES[key];
  if (!E) return '';
  const R = RENDERERS[look === 'f' ? 'f' : 'm'];
  const q = pose(E, t);
  let sc;
  const guide = cues && E.loop ? loopGuideSVG(E, t, look === 'f', dir < 0 ? -1 : 1) : '';
  if (E.front) sc = R.front(E, q) + guide;
  else {
    const fx = (q.f1[0] + q.f2[0]) / 2;
    sc = `<ellipse cx="${f1(fx)}" cy="${GROUND + 0.6}" rx="18" ry="1.6" fill="#000" opacity=".3"/>` + R.props(E.props) +
      R.leg(q, 2, 1) + R.arm(q, 2, 1) + (E.db > 1 ? R.dumbbell(q.h2, q.e2, 0.85) : '') + R.torso(q) + R.leg(q, 1, 0) + R.muscles(q, E.mus) + R.head(q) + R.arm(q, 1, 0) + (E.db ? R.dumbbell(q.h1, q.e1, 1) : '') +
      (cues ? cuesSVG(q, E.cues, E.static || E.loop ? 1 : Math.max(0, (t - 0.7) / 0.3), R.SK.cue) : '') + (dir ? arrowSVG(E, dir) : '') + guide;
  }
  return `<rect x="0" y="${GROUND}" width="100" height="9" fill="var(--fig-ground)"/><line x1="0" y1="${GROUND}" x2="100" y2="${GROUND}" stroke="var(--line)" stroke-width=".8"/>` +
    (E.z ? `<g transform="translate(50 ${GROUND}) scale(${E.z}) translate(-50 -${GROUND})">${sc}</g>` : sc) +
    (label ? `<text x="50" y="98.3" text-anchor="middle" font-size="5.6" font-weight="700" fill="var(--acc-text)">${esc(label)}</text>` : '');
}

/** État de l'animation à la phase c (0 → 1) : départ, aller, pause, retour. stepped = sans interpolation (mouvement réduit). */
export function animState(E, c, stepped = false) {
  // rotation : la pose b est la pose a après un tour complet ; on avance sans retour en arrière ni pause
  // rev : un tour dans un sens, puis un tour dans l'autre (« 10 vers l'avant, 10 vers l'arrière »)
  if (E.loop && E.rev) return c < 0.5 ? { t: stepped ? 0.25 : 2 * c, label: E.ph[0], dir: 1 } : { t: stepped ? 0.25 : 2 - 2 * c, label: E.ph[1], dir: -1 };
  if (E.loop) return { t: stepped ? 0.25 : c, label: E.ph[0], dir: 0 };
  if (E.static) return { t: stepped ? 0.5 : 0.5 + 0.5 * Math.sin(c * 2 * Math.PI), label: E.ph[0], dir: 0 };
  if (stepped) return c < 0.5 ? { t: 0, label: 'Départ', dir: 0 } : { t: 1, label: E.ph[0], dir: 0 };
  if (c < 0.12) return { t: 0, label: 'Départ', dir: 0 };
  if (c < 0.5) return { t: ease((c - 0.12) / 0.38), label: E.ph[0], dir: 1 };
  if (c < 0.62) return { t: 1, label: 'Pause', dir: 0 };
  return { t: 1 - ease((c - 0.62) / 0.38), label: E.ph[1], dir: -1 };
}

/* ---------- DOM ---------- */

/** Balise d'une vignette statique (t = pose affichée). */
export const figTag = (key, { t = 1, cues = false, cls = '' } = {}) =>
  `<svg class="fig ${cls}" viewBox="0 0 100 100" data-k="${esc(key)}" data-t="${t}"${cues ? ' data-cues="1"' : ''} aria-hidden="true" focusable="false"></svg>`;

/** Balise d'une figure animée (avec libellé de phase et repères). */
export const figAnimTag = (key) =>
  `<svg class="fig" viewBox="0 0 100 100" data-k="${esc(key)}" data-anim="1" role="img" aria-label="Illustration animée du mouvement"></svg>`;

let look = 'm';
let raf = 0;
let lastFrame = 0;
let lastStep = -1;
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function setLook(l) {
  look = l === 'f' ? 'f' : 'm';
}

function drawAnimated(svg, phase, stepped) {
  const E = FIGURES[svg.dataset.k];
  if (!E) return;
  const st = animState(E, phase, stepped);
  svg.innerHTML = figureSVG(svg.dataset.k, st.t, { look, cues: true, label: st.label, dir: st.dir });
}

function frame(ts) {
  raf = 0;
  const figs = document.querySelectorAll('.fig[data-anim]');
  if (!figs.length || document.hidden) return; // plus rien à animer : la boucle s'arrête (elle repart au prochain paintFigures)
  const stepped = reduced();
  const phase = (ts % CYCLE_MS) / CYCLE_MS;
  const stepKey = phase < 0.5 ? 0 : 1;
  if (stepped ? stepKey !== lastStep : ts - lastFrame > 33) {
    lastFrame = ts;
    lastStep = stepKey;
    for (const s of figs) {
      try {
        drawAnimated(s, phase, stepped);
      } catch (e) {
        /* une figure en erreur ne doit pas figer les autres */
      }
    }
  }
  raf = requestAnimationFrame(frame);
}

/** Dessine les figures présentes dans root et (re)lance l'animation si nécessaire. */
export function paintFigures(root = document) {
  for (const s of root.querySelectorAll('.fig:not([data-anim])')) {
    if (s.dataset.done === s.dataset.k + '|' + s.dataset.t) continue;
    try {
      s.innerHTML = figureSVG(s.dataset.k, +s.dataset.t || 0, { look, cues: s.dataset.cues === '1' });
      s.dataset.done = s.dataset.k + '|' + s.dataset.t;
    } catch (e) {
      /* figure inconnue : la vignette reste vide */
    }
  }
  const anim = root.querySelectorAll('.fig[data-anim]');
  if (anim.length) {
    lastStep = -1;
    for (const s of anim) if (!s.firstChild) drawAnimated(s, 0, reduced());
    if (!raf) raf = requestAnimationFrame(frame);
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !raf && document.querySelector('.fig[data-anim]')) raf = requestAnimationFrame(frame);
  });
}
