/* Onglet « Progrès » : bilan par période, calendrier, progression par exercice et records, historique filtrable.
   Tout est calculé à partir des séances enregistrées : aucune valeur estimée ou inventée. */
import { esc, today, fmtDay, dayDate, num, fmtNum, fmtInt, plural, cap1, weekStart } from '../../core/util.js';
import { displayName, exerciseIndex, unitOf, trackedExercises } from '../../core/program.js';
import { GROUPS } from '../../data/exercises.js';
import {
  sorted, weekStats, weeklySeries, monthlySeries, monthGrid, seriesOf, records, trackables, backupDue, daysSinceExport,
  periodStats, periodBounds, groupSets, weekCounts,
} from '../../core/stats.js';
import { volumeOf } from '../../core/store.js';
import { figTag } from '../figure.js';
import { icon } from '../icons.js';
import { sparkline, barChart, lineChart, hbars, deltaTag } from '../charts.js';
import { toast, confirm, dialog } from '../dom.js';
import { rowSummary } from './today.js';

const SUBS = [['bilan', 'Bilan'], ['cal', 'Calendrier'], ['perf', 'Exercices'], ['hist', 'Historique']];
const PERIODS = [[28, '4 semaines'], [91, '3 mois'], [365, '12 mois']];
const local = { sub: 'bilan', period: 28, month: null, openId: null, fSe: '', fEx: '', fNote: false, limit: 20 };

/** Détail d'une séance : chiffres mesurés, une pastille par série, et la séance précédente du même exercice. */
export function entryDetail(app, h) {
  const idx = exerciseIndex(app.program);
  const H = app.store.state.history;
  const ns = h.rows.reduce((a, r) => a + r.sets.length, 0);
  const vol = volumeOf(h.rows);
  let out = `<div class="hsum"><div><b>${ns}</b><span>séries</span></div><div><b>${h.dur ? Math.round(h.dur) : '–'}</b><span>minutes</span></div><div><b>${vol ? fmtInt(vol) : '–'}</b><span>kg × reps</span></div></div>`;
  out += h.rows.map((r) => {
    const e = idx.of(r);
    const unit = unitOf(e, r.ex);
    const score = (z) => num(z.r) * (num(z.k) || 1);
    const best = Math.max(0, ...r.sets.map(score));
    const cells = r.sets.map((z, i) => {
      if (z.p && z.p.length) {
        return `<div class="sc wide"><i>S${i + 1}</i>${z.p.map((p, j) => `<small><b style="font-size:14px">${esc(p.r || '–')}</b>${p.k !== '' ? ' × ' + esc(p.k) + ' kg' : ''} · ${esc(e && e.parts && e.parts[j] ? e.parts[j].n : 'partie ' + (j + 1))}</small>`).join('')}</div>`;
      }
      const has = z.r !== '';
      const kg = z.k !== '' && num(z.k) > 0;
      const top = has && best > 0 && score(z) === best && r.sets.some((o) => score(o) < best);
      return `<div class="sc${has ? '' : ' em'}${top ? ' top' : ''}"><i>S${i + 1}</i><b>${has ? esc(z.r) : '✓'}</b><small>${has ? unit : 'fait'}</small>${kg ? `<em>${esc(z.k)} kg</em>` : ''}</div>`;
    }).join('');
    // même exercice lors de la séance précédente (comparaison immédiate)
    let prev = null;
    if (e) for (const o of sorted(H)) if (o.date < h.date || (o.date === h.date && (o.at || 0) < (h.at || 0))) {
      const row = o.rows.find((x) => idx.of(x) === e);
      if (row) {
        prev = { date: o.date, row };
        break;
      }
    }
    return `<div class="hx"><div class="hxh">${e ? `<div class="th sm">${figTag(e.k)}</div>` : ''}<div><b>${esc(e ? displayName(e) : r.ex.split(' (')[0])}</b>${e && (e.hold || e.reps) ? `<div class="mute small">objectif ${esc(e.hold ? e.hold[0] + '–' + e.hold[1] + ' s' : e.reps)}</div>` : ''}</div></div><div class="hxs">${cells}</div>` +
      (prev ? `<p class="mute small" style="margin-top:6px">Fois précédente (${esc(fmtDay(prev.date, { day: 'numeric', month: 'short' }))}) : ${esc(rowSummary(prev.row))}</p>` : '') + '</div>';
  }).join('');
  if (h.note) out += `<p class="mute" style="margin-top:8px">Note : ${esc(h.note)}</p>`;
  return out;
}

/* ---------- Bilan ---------- */

function bilan(app) {
  const S = app.store.state;
  const goal = app.store.goal;
  const t = today();
  const days = local.period;
  const b = periodBounds(days, t);
  const cur = periodStats(S.history, b.from, b.to);
  const prev = periodStats(S.history, b.prevFrom, b.prevTo);
  const label = PERIODS.find((p) => p[0] === days)[1];
  let h = `<div class="pick wide" role="group" aria-label="Période">${PERIODS.map(([v, l]) => `<button data-a="period" data-v="${v}" aria-pressed="${v === days}">${l}</button>`).join('')}</div>`;
  const tile = (v, unit, lab, dv) => `<div class="tile"><b>${v}</b><span>${lab}</span>${dv}</div>`;
  h += `<div class="tiles t4">` +
    tile(cur.n, '', plural(cur.n, 'séance', 'séances'), deltaTag(cur.n, prev.n)) +
    tile(cur.avgDur ? cur.avgDur + '<small> min</small>' : '–', '', 'durée moyenne', cur.avgDur && prev.avgDur ? deltaTag(cur.avgDur, prev.avgDur, { unit: 'min' }) : '') +
    tile(cur.sets, '', 'séries', deltaTag(cur.sets, prev.sets)) +
    tile(cur.vol ? fmtInt(cur.vol) : '–', '', 'kg × reps', cur.vol && prev.vol ? deltaTag(Math.round(cur.vol), Math.round(prev.vol)) : '') +
    `</div><p class="mute small">Comparé aux ${esc(label)} précédentes (${esc(fmtDay(b.prevFrom, { day: 'numeric', month: 'short' }))} – ${esc(fmtDay(b.prevTo, { day: 'numeric', month: 'short' }))}). La durée ne compte que les séances chronométrées.</p>`;

  // fréquence : par semaine (4 sem. et 3 mois) ou par mois (12 mois)
  if (days <= 91) {
    const n = days === 28 ? 8 : 13;
    const weeks = weeklySeries(S.history, n, t);
    const bars = weeks.map((w, i) => ({
      v: w.n,
      hit: w.n >= goal,
      label: i % (n > 8 ? 3 : 2) === (n - 1) % (n > 8 ? 3 : 2) ? dayDate(w.week).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric' }) : '',
      tip: 'Semaine du ' + fmtDay(w.week, { day: 'numeric', month: 'long' }) + ' : ' + w.n + ' ' + plural(w.n, 'séance', 'séances') + (w.n >= goal ? ' (objectif atteint)' : ''),
    }));
    const hit = weeks.filter((w) => w.n >= goal).length;
    h += `<section class="card"><div class="row between"><h3>Séances par semaine</h3><span class="mute small">objectif ${goal}</span></div><p class="mute small" style="margin:4px 0 10px">Objectif atteint ${hit} ${plural(hit, 'semaine', 'semaines')} sur ${n} · pointillés : objectif</p>${barChart(bars, { goal, title: 'Séances par semaine sur les ' + n + ' dernières semaines' })}</section>`;
  } else {
    const months = monthlySeries(S.history, 12, t);
    const bars = months.map((m, i) => ({
      v: m.n,
      hit: false,
      label: i % 2 === 1 ? new Date(m.month + '-15T12:00:00').toLocaleDateString('fr-FR', { month: 'narrow' }) : '',
      tip: cap1(new Date(m.month + '-15T12:00:00').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })) + ' : ' + m.n + ' ' + plural(m.n, 'séance', 'séances') + (m.avgDur ? ', ' + m.avgDur + ' min en moyenne' : ''),
    }));
    h += `<section class="card"><h3>Séances par mois</h3><p class="mute small" style="margin:4px 0 10px">12 derniers mois · touche une barre pour le détail</p>${barChart(bars, { title: 'Séances par mois sur 12 mois' })}</section>`;
  }

  // durée réelle des séances
  const timed = sorted(S.history).reverse().filter((x) => x.date >= b.from && x.dur > 0);
  if (timed.length >= 2) {
    h += `<section class="card"><div class="row between"><h3>Durée des séances</h3><span class="mute small">${timed.length} chronométrées</span></div>${lineChart(timed.slice(-30).map((x) => ({ label: fmtDay(x.date, { day: 'numeric', month: 'short' }), v: Math.round(x.dur), tip: fmtDay(x.date, { day: 'numeric', month: 'short' }) + ' : ' + Math.round(x.dur) + ' min · ' + (x.short || '') })), { unit: 'min', title: 'Durée des séances en minutes' })}</section>`;
  }

  // répartition par groupe musculaire
  const groups = groupSets(S.history, app.program, b.from, b.to);
  if (groups.length) {
    h += `<section class="card"><h3>Séries par groupe musculaire</h3><p class="mute small" style="margin:4px 0 10px">Séries enregistrées sur la période, selon le muscle principal de chaque exercice.</p>${hbars(groups.map((g) => ({ label: GROUPS[g.group] || g.group, v: g.sets })))}</section>`;
  }
  if (!cur.n) h += `<div class="card flat"><p class="mute">Aucune séance sur cette période.</p></div>`;
  return h;
}

/* ---------- Calendrier ---------- */

function calendar(app) {
  const S = app.store.state;
  const goal = app.store.goal;
  const t = today();
  if (!local.month) local.month = t.slice(0, 7);
  const [y, m] = local.month.split('-').map(Number);
  const cells = monthGrid(y, m - 1);
  const title = new Date(y, m - 1, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const sessions = new Set(S.history.map((h) => h.date));
  const rides = new Set(S.rides);
  const wc = weekCounts(S.history);
  const isCurrent = local.month === t.slice(0, 7);
  const first = S.history.map((h) => h.date).sort()[0];
  const canBack = first ? local.month > first.slice(0, 7) : false;
  const inMonth = sorted(S.history).filter((h) => h.date.startsWith(local.month));
  let grid = '';
  for (let r = 0; r < cells.length / 7; r++) {
    const row = cells.slice(r * 7, r * 7 + 7);
    grid += row.map((d) => {
      if (!d) return '<span class="c"></span>';
      const s = sessions.has(d), rd = rides.has(d), fut = d > t;
      const label = fmtDay(d, { weekday: 'long', day: 'numeric', month: 'long' }) + (s ? ', séance' : '') + (rd ? ', sortie VTT' : '');
      return fut ? `<span class="c fut">${dayDate(d).getDate()}</span>` : `<button data-a="day" data-v="${d}" class="${s ? 's ' : ''}${rd ? 'r ' : ''}${d === t ? 't' : ''}" aria-label="${esc(label)}">${dayDate(d).getDate()}</button>`;
    }).join('');
    const ref = row.find(Boolean);
    const n = ref ? wc[weekStart(ref)] || 0 : 0;
    const ws = ref ? weekStart(ref) : '';
    const past = ws && ws <= t;
    grid += `<span class="wkg${n >= goal ? ' ok' : ''}" role="img" aria-label="${past ? 'Semaine : ' + n + ' sur ' + goal + (n >= goal ? ', objectif atteint' : '') : ''}">${past ? (n >= goal ? icon('check') : n ? n + '/' + goal : '') : ''}</span>`;
  }
  let h = `<section class="card" aria-label="Calendrier">
    <div class="cal-head"><button class="icon-btn" data-a="month" data-v="-1" aria-label="Mois précédent"${canBack ? '' : ' disabled'}>${icon('back')}</button><b>${esc(title)}</b><button class="icon-btn" data-a="month" data-v="1" aria-label="Mois suivant"${isCurrent ? ' disabled' : ''}>${icon('chev')}</button></div>
    <div class="cal">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => `<span class="dow" aria-hidden="true">${d}</span>`).join('')}<span class="dow" aria-hidden="true">${icon('target')}</span>${grid}</div>
    <div class="legend"><span><i class="ls"></i>Séance</span><span><i class="lr"></i>Sortie VTT</span><span>${icon('check')} objectif de la semaine atteint</span></div>
  </section>`;
  h += `<div class="sec"><h3>${esc(cap1(new Date(y, m - 1, 1).toLocaleDateString('fr-FR', { month: 'long' })))}</h3><span class="mute small">${inMonth.length} ${plural(inMonth.length, 'séance', 'séances')}</span></div>`;
  h += inMonth.length ? '<div class="card">' + inMonth.map((x) => `<button class="li" data-a="open" data-v="${esc(x.id)}"><span class="dbadge"><b>${dayDate(x.date).getDate()}</b>${esc(fmtDay(x.date, { weekday: 'short' }))}</span><span class="grow"><b>${esc(x.short || x.title || 'Séance')}</b><span class="mute small" style="display:block">${x.dur ? Math.round(x.dur) + ' min · ' : ''}${x.rows.reduce((a, r) => a + r.sets.length, 0)} séries</span></span>${icon('chev', 'mute')}</button>`).join('') + '</div>' : '<div class="card flat"><p class="mute">Aucune séance ce mois-ci.</p></div>';
  // régularité
  const weeks = weeklySeries(S.history, 12, t);
  const hit = weeks.filter((w) => w.n >= goal).length;
  h += `<section class="card"><div class="row between"><h3>Régularité</h3><span class="mute small">12 semaines</span></div><p class="mute small" style="margin:4px 0 10px">Objectif atteint ${hit} ${plural(hit, 'semaine', 'semaines')} sur 12 · série en cours : ${weekStats(S.history, goal, t).streak} sem.</p>${barChart(weeks.map((w, i) => ({ v: w.n, hit: w.n >= goal, label: i % 3 === 2 || i === 11 ? dayDate(w.week).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric' }) : '', tip: 'Semaine du ' + fmtDay(w.week, { day: 'numeric', month: 'long' }) + ' : ' + w.n + ' ' + plural(w.n, 'séance', 'séances') })), { goal, title: 'Séances par semaine sur 12 semaines' })}</section>`;
  return h;
}

/* ---------- Exercices : progression et records ---------- */

function perf(app) {
  const S = app.store.state;
  const rec = records(S.history, app.program);
  const rows = [];
  for (const tr of trackables(app.program)) {
    const pts = seriesOf(S.history, app.program, tr.ex, tr.part).filter((p) => p.best.v > 0);
    if (pts.length < 2) continue;
    const u = pts[pts.length - 1].best.u;
    const P = pts.filter((p) => p.best.u === u).slice(-12);
    if (P.length < 2) continue;
    const v = P.map((p) => p.best.v);
    const d = Math.round((v[v.length - 1] - v[0]) * 10) / 10;
    rows.push(`<button class="li" data-a="ex" data-v="${esc(tr.ex.id)}"><div class="th sm">${figTag(tr.k)}</div><div class="grow"><b>${esc(tr.name)}</b>
      <div class="mute small">${fmtNum(v[0])} → <b>${fmtNum(v[v.length - 1])} ${u}</b> <span class="${d > 0 ? 'up' : d < 0 ? 'down' : ''}">${d > 0 ? '▲ +' + fmtNum(d) : d < 0 ? '▼ −' + fmtNum(-d) : '='}</span> · ${P.length} séances</div></div>${sparkline(v)}</button>`);
  }
  let h = '<p class="mute" style="margin:4px 0 8px">Meilleure valeur de chaque séance (charge maximale, sinon reps ou secondes). Les parties d’un superset sont suivies séparément. Touche un exercice pour ses courbes détaillées.</p>';
  h += rows.length ? `<div class="card">${rows.join('')}</div>` : '<div class="card flat"><p class="mute">Les courbes apparaîtront dès qu’un exercice aura été enregistré dans 2 séances.</p></div>';
  if (rec.length) {
    h += `<div class="sec"><h3>${icon('trophy')} Records personnels</h3><span class="mute small">${rec.length}</span></div><div class="card">` + rec.map((r) =>
      `<button class="li" data-a="ex" data-v="${esc(r.ex.id)}"><span class="grow">${esc(r.name)}</span><span class="v">${fmtNum(r.v)} ${r.u}${r.u === 'kg' && r.reps ? ' × ' + fmtNum(r.reps) : ''}<small>${esc(fmtDay(r.date, { day: 'numeric', month: 'short', year: 'numeric' }))}</small></span></button>`).join('') + '</div>';
  }
  return h;
}

/* ---------- Historique ---------- */

function historyList(app) {
  const S = app.store.state;
  const t = today();
  const idx = exerciseIndex(app.program);
  const all = sorted(S.history);
  const shorts = [...new Set(all.map((x) => x.short || x.title).filter(Boolean))];
  const exIds = new Map();
  for (const x of all) for (const r of x.rows) {
    const e = idx.of(r);
    if (e && !exIds.has(e.id)) exIds.set(e.id, displayName(e));
  }
  if (local.fSe && !shorts.includes(local.fSe)) local.fSe = '';
  if (local.fEx && !exIds.has(local.fEx)) local.fEx = '';
  const list = all.filter((x) => (!local.fSe || (x.short || x.title) === local.fSe) && (!local.fEx || x.rows.some((r) => { const e = idx.of(r); return e && e.id === local.fEx; })) && (!local.fNote || x.note));
  let h = `<div class="filters-box"><label class="f">Séance<select data-c="fse"><option value="">Toutes</option>${shorts.map((s) => `<option${s === local.fSe ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></label>
    <label class="f">Exercice<select data-c="fex"><option value="">Tous</option>${[...exIds].sort((a, b) => a[1].localeCompare(b[1], 'fr')).map(([id, n]) => `<option value="${esc(id)}"${id === local.fEx ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
    <label class="chkl"><input type="checkbox" data-c="fnote"${local.fNote ? ' checked' : ''}> Avec une note</label></div>`;
  h += `<p class="mute small" style="margin:6px 2px">${list.length} ${plural(list.length, 'séance', 'séances')}${list.length !== all.length ? ' sur ' + all.length : ''}</p>`;
  if (!list.length) return h + '<div class="card flat"><p class="mute">Aucune séance ne correspond à ces filtres.</p></div>';
  let month = '';
  const open = local.openId;
  // la séance demandée est toujours affichée, même au-delà de la limite
  const lim = Math.max(local.limit, open ? list.findIndex((x) => x.id === open) + 1 : 0);
  for (const x of list.slice(0, lim)) {
    const mk = x.date.slice(0, 7);
    if (mk !== month) {
      month = mk;
      h += `<h4 class="month">${esc(cap1(dayDate(x.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })))}</h4>`;
    }
    const ns = x.rows.reduce((a, r) => a + r.sets.length, 0);
    h += `<details class="card hist" ${x.id === open ? 'open' : ''} data-h="${esc(x.id)}"><summary><span class="dbadge"><b>${dayDate(x.date).getDate()}</b>${esc(fmtDay(x.date, { weekday: 'short' }))}</span><div class="grow"><b>${esc(x.short || x.title || 'Séance')}</b><div class="mute small">${x.dur ? Math.round(x.dur) + ' min · ' : ''}${ns} séries${x.tours ? ' · ' + x.tours + ' tours' : ''}${x.note ? ' · ' + icon('edit') : ''}</div></div>${icon('chev', 'chev')}</summary>${entryDetail(app, x)}<button class="btn danger" data-a="del" data-v="${esc(x.id)}">${icon('trash')} Supprimer cette séance</button></details>`;
  }
  if (list.length > lim) h += `<button class="btn ghost" data-a="more">Afficher ${Math.min(20, list.length - lim)} séances de plus</button>`;
  return h;
}

export function renderProgress(app, opts = {}) {
  const S = app.store.state;
  if (opts.open) {
    local.openId = opts.open;
    local.sub = 'hist';
    local.fSe = local.fEx = '';
    local.fNote = false;
  }
  if (opts.sub) local.sub = opts.sub;
  const H = S.history;
  if (!H.length) {
    return `<div class="empty"><div class="em" aria-hidden="true">${icon('chart')}</div><h2>Ton historique commence ici</h2><p style="margin-top:8px">Termine une première séance : elle apparaîtra ici avec tes charges, tes records, ta régularité et ta progression.</p><button class="btn" data-a="goto" data-v="seance" style="max-width:320px;margin:20px auto 0">Voir la séance du jour</button></div>`;
  }
  const t = today();
  let h = '';
  if (backupDue(S, t)) {
    const days = daysSinceExport(S, t);
    h += `<div class="card note"><b>Pense à sauvegarder</b><p class="mute">${S.uns} ${plural(S.uns, 'séance n’est', 'séances ne sont')} pas encore dans un fichier${S.exp ? ' (dernière sauvegarde il y a ' + days + ' ' + plural(days, 'jour', 'jours') + ')' : ''}. Sans sauvegarde, l’historique peut être perdu si le navigateur efface ses données.</p><button class="btn ghost" data-a="goto" data-v="plus">Ouvrir la sauvegarde</button></div>`;
  }
  h += `<div class="seg sub" role="tablist" aria-label="Rubriques">${SUBS.map(([id, l]) => `<button role="tab" data-a="sub" data-v="${id}" class="${local.sub === id ? 'on' : ''}" aria-selected="${local.sub === id}">${l}</button>`).join('')}</div>`;
  h += local.sub === 'cal' ? calendar(app) : local.sub === 'perf' ? perf(app) : local.sub === 'hist' ? historyList(app) : bilan(app);
  return h;
}

function openEntry(app, id) {
  local.sub = 'hist';
  local.openId = id;
  local.fSe = local.fEx = '';
  local.fNote = false;
  app.render({ keepScroll: true });
  const el = document.querySelector(`[data-h="${CSS.escape(id)}"]`);
  if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

export const progressActions = {
  sub(app, b) {
    local.sub = b.dataset.v;
    app.render({ keepScroll: true });
  },
  period(app, b) {
    local.period = +b.dataset.v;
    app.render({ keepScroll: true });
  },
  month(app, b) {
    const [y, m] = local.month.split('-').map(Number);
    const d = new Date(y, m - 1 + +b.dataset.v, 1, 12);
    local.month = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    app.render({ keepScroll: true });
  },
  open(app, b) {
    openEntry(app, b.dataset.v);
  },
  more(app) {
    local.limit += 20;
    app.render({ keepScroll: true });
  },
  fse(app, el) {
    local.fSe = el.value;
    local.limit = 20;
    app.render({ keepScroll: true });
  },
  fex(app, el) {
    local.fEx = el.value;
    local.limit = 20;
    app.render({ keepScroll: true });
  },
  fnote(app, el) {
    local.fNote = el.checked;
    app.render({ keepScroll: true });
  },
  async day(app, b) {
    const d = b.dataset.v;
    const S = app.store.state;
    const list = S.history.filter((h) => h.date === d);
    const ride = S.rides.includes(d);
    const html = list.length ? '<ul>' + list.map((h) => `<li>${esc(h.short || h.title)}${h.dur ? ' · ' + Math.round(h.dur) + ' min' : ''}</li>`).join('') + '</ul>' : '<p>Aucune séance enregistrée ce jour-là.</p>';
    const v = await dialog({
      title: cap1(fmtDay(d, { weekday: 'long', day: 'numeric', month: 'long' })),
      html,
      actions: [
        ...list.map((h, i) => ({ label: list.length > 1 ? 'Détail : ' + (h.short || 'séance ' + (i + 1)) : 'Voir le détail', value: 'see:' + h.id, kind: '' })),
        { label: ride ? 'Retirer la sortie VTT' : 'Noter une sortie VTT', value: 'ride', kind: 'ghost' },
        { label: 'Fermer', value: null, kind: 'quiet' },
      ],
    });
    if (v === 'ride') {
      app.store.toggleRide(d);
      app.render({ keepScroll: true });
    } else if (v && v.startsWith('see:')) openEntry(app, v.slice(4));
  },
  ex(app, b) {
    const ex = trackedExercises(app.program).find((e) => e.id === b.dataset.v);
    if (ex) app.openExercise(ex, { focus: 'stats' });
  },
  goto(app, b) {
    app.go(b.dataset.v);
  },
  async del(app, b) {
    const ok = await confirm('Supprimer cette séance ?', 'Elle sera retirée de l’historique et des statistiques.', 'Supprimer');
    if (!ok) return;
    const removed = app.store.removeEntry(b.dataset.v);
    app.render({ keepScroll: true });
    if (removed) {
      toast('Séance supprimée.', {
        action: 'Annuler',
        onAction: () => {
          app.store.addEntry(removed);
          app.render({ keepScroll: true });
        },
      });
    }
  },
};

