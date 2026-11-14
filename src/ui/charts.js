/* Graphiques SVG sans dépendance. Une seule série par graphique (couleur d'accent), valeurs lisibles au toucher :
   chaque point ou barre porte data-tip, affiché sous le graphique par bindCharts(). */
import { esc, fmtNum } from '../core/util.js';

const f1 = (n) => n.toFixed(1);

/** Mini-courbe sans axes (liste de progression). */
export function sparkline(values) {
  if (values.length < 2) return '';
  const lo = Math.min(...values);
  const sp = Math.max(...values) - lo || 1;
  const X = (i) => 4 + (i * 76) / (values.length - 1);
  const Y = (v) => 26 - ((v - lo) / sp) * 22;
  const last = values.length - 1;
  return `<svg viewBox="0 0 84 30" class="spark" aria-hidden="true" focusable="false"><polyline points="${values.map((v, i) => f1(X(i)) + ',' + f1(Y(v))).join(' ')}"/><circle cx="${f1(X(last))}" cy="${f1(Y(values[last]))}" r="3"/></svg>`;
}

/** Échelle « ronde » : bornes et graduations lisibles autour des valeurs. */
function niceScale(lo, hi, ticks = 3) {
  if (lo === hi) {
    lo = Math.max(0, lo - 1);
    hi += 1;
  }
  const raw = (hi - lo) / ticks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) || raw;
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  const out = [];
  for (let v = min; v <= max + step / 1000; v += step) out.push(Math.round(v * 100) / 100);
  return { min, max, ticks: out };
}

/**
 * Courbe d'évolution. points : [{ label, v, tip }]
 * @param {string} title  description pour les lecteurs d'écran
 */
export function lineChart(points, { unit = '', title = '' } = {}) {
  const W = 320, H = 150, L = 34, R = 10, T = 10, B = 24;
  const vs = points.map((p) => p.v);
  const sc = niceScale(Math.min(...vs), Math.max(...vs));
  const X = (i) => (points.length === 1 ? (L + W - R) / 2 : L + (i * (W - L - R)) / (points.length - 1));
  const Y = (v) => T + (1 - (v - sc.min) / (sc.max - sc.min)) * (H - T - B);
  const grid = sc.ticks.map((t) => `<line class="grid" x1="${L}" x2="${W - R}" y1="${f1(Y(t))}" y2="${f1(Y(t))}"/><text x="${L - 6}" y="${f1(Y(t) + 4)}" text-anchor="end">${esc(fmtNum(t))}</text>`).join('');
  const first = points[0], last = points[points.length - 1];
  const xl = `<text x="${L}" y="${H - 6}">${esc(first.label)}</text>` + (points.length > 1 ? `<text x="${W - R}" y="${H - 6}" text-anchor="end">${esc(last.label)}</text>` : '');
  const line = points.length > 1 ? `<polyline class="line" points="${points.map((p, i) => f1(X(i)) + ',' + f1(Y(p.v))).join(' ')}"/>` : '';
  const band = (W - L - R) / Math.max(1, points.length - 1);
  const dots = points.map((p, i) =>
    `<circle class="dot" cx="${f1(X(i))}" cy="${f1(Y(p.v))}" r="${points.length > 16 ? 3 : 4.5}" data-i="${i}"/>` +
    `<rect class="hit-area" x="${f1(X(i) - Math.max(band, 24) / 2)}" y="0" width="${f1(Math.max(band, 24))}" height="${H}" data-i="${i}" data-tip="${esc(p.tip)}"/>`).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">${grid}${xl}${line}${dots}</svg>` +
    `<p class="chart-tip" aria-live="polite">${esc(unit ? 'Touche un point pour voir le détail.' : '')}</p>`;
}

/**
 * Barres verticales. bars : [{ label, v, tip, hit }] ; goal : ligne d'objectif (facultative).
 */
export function barChart(bars, { goal = 0, title = '' } = {}) {
  const W = 320, H = 130, L = 22, R = 6, T = 10, B = 22;
  const max = Math.max(goal, ...bars.map((b) => b.v), 1);
  const top = Math.max(2, Math.ceil(max));
  const Y = (v) => T + (1 - v / top) * (H - T - B);
  const bw = (W - L - R) / bars.length;
  const w = Math.min(18, bw - 4);
  const grid = [0, top].map((t) => `<line class="grid" x1="${L}" x2="${W - R}" y1="${f1(Y(t))}" y2="${f1(Y(t))}"/><text x="${L - 6}" y="${f1(Y(t) + 4)}" text-anchor="end">${t}</text>`).join('');
  const rects = bars.map((b, i) => {
    const x = L + i * bw + (bw - w) / 2;
    const h = Math.max(0, Y(0) - Y(b.v));
    const r = Math.min(4, h);
    // extrémité arrondie côté valeur, base carrée posée sur l'axe
    const shape = h > 0 ? `<path class="bar${b.hit ? ' hit' : ''}" data-i="${i}" d="M${f1(x)},${f1(Y(0))}V${f1(Y(b.v) + r)}Q${f1(x)},${f1(Y(b.v))} ${f1(x + r)},${f1(Y(b.v))}H${f1(x + w - r)}Q${f1(x + w)},${f1(Y(b.v))} ${f1(x + w)},${f1(Y(b.v) + r)}V${f1(Y(0))}Z"/>` : '';
    const lab = b.label ? `<text x="${f1(x + w / 2)}" y="${H - 6}" text-anchor="middle">${esc(b.label)}</text>` : '';
    return shape + lab + `<rect class="hit-area" x="${f1(L + i * bw)}" y="0" width="${f1(bw)}" height="${H}" data-i="${i}" data-tip="${esc(b.tip)}"/>`;
  }).join('');
  const goalLine = goal ? `<line class="goal" x1="${L}" x2="${W - R}" y1="${f1(Y(goal))}" y2="${f1(Y(goal))}"/>` : '';
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">${grid}${rects}${goalLine}</svg><p class="chart-tip" aria-live="polite"></p>`;
}

/** Affiche le détail d'un point ou d'une barre touché(e) ou survolé(e). */
export function bindCharts(root) {
  const show = (e) => {
    const hit = e.target.closest && e.target.closest('.hit-area');
    if (!hit) return;
    const svg = hit.closest('svg');
    const tip = svg.nextElementSibling;
    for (const m of svg.querySelectorAll('.sel')) m.classList.remove('sel');
    const mark = svg.querySelector(`.dot[data-i="${hit.dataset.i}"], .bar[data-i="${hit.dataset.i}"]`);
    if (mark) mark.classList.add('sel');
    if (!tip || !tip.classList.contains('chart-tip')) return;
    // textContent uniquement : le détail peut contenir des valeurs saisies par l'utilisateur
    const text = hit.dataset.tip || '';
    const cut = text.indexOf(' : ');
    tip.textContent = '';
    if (cut > 0) {
      const b = document.createElement('b');
      b.textContent = text.slice(0, cut);
      tip.append(b, text.slice(cut));
    } else tip.textContent = text;
  };
  root.addEventListener('click', show);
  root.addEventListener('pointermove', (e) => e.pointerType === 'mouse' && show(e));
}

/** Anneau de progression (0 → 1) avec un texte au centre. */
export function ringMeter(frac, { big = '', small = '', title = '', size = 92 } = {}) {
  const r = 40, C = 2 * Math.PI * r, f = Math.max(0, Math.min(1, frac));
  return `<div class="meter-ring" style="width:${size}px;height:${size}px" role="img" aria-label="${esc(title)}"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle class="rb" cx="50" cy="50" r="${r}"/><circle class="rf${f >= 1 ? ' full' : ''}" cx="50" cy="50" r="${r}" stroke-dasharray="${f1(C)}" stroke-dashoffset="${f1(C * (1 - f))}"/></svg><div><b>${esc(big)}</b>${small ? `<span>${esc(small)}</span>` : ''}</div></div>`;
}

/** Barres horizontales (répartition) : items [{ label, v, tip }]. */
export function hbars(items, { unit = '' } = {}) {
  const max = Math.max(1, ...items.map((i) => i.v));
  return `<div class="hbars">${items.map((i) => `<div class="hb"><span class="hl">${esc(i.label)}</span><span class="ht"><i style="width:${Math.max(3, Math.round((100 * i.v) / max))}%"></i></span><b>${esc(fmtNum(i.v))}${unit ? ' ' + esc(unit) : ''}</b></div>`).join('')}</div>`;
}

/** Variation entre deux valeurs : « ▲ +3 », « ▼ −2 », « = ». */
export function deltaTag(cur, prev, { unit = '', invert = false } = {}) {
  if (prev == null) return '';
  const d = Math.round((cur - prev) * 10) / 10;
  if (!d) return '<span class="dl">=</span>';
  const up = d > 0;
  return `<span class="dl ${up !== invert ? 'up' : 'down'}">${up ? '▲ +' : '▼ −'}${esc(fmtNum(Math.abs(d)))}${unit ? ' ' + esc(unit) : ''}</span>`;
}
