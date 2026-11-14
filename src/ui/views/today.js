/* Onglet « Séance » : semaine en cours, séance du jour, saisie libre des séries. */
import { esc, today, addDays, weekStart, fmtDay, dayDate, daysBetween, plural, restText, fmtNum, fmtInt } from '../../core/util.js';
import { displayName, sessionById, setsCount, estimateMinutes, isCircuit } from '../../core/program.js';
import { weekStats, nextSession, lastRow, suggestion, defaultTours, insights } from '../../core/stats.js';
import { ringMeter, deltaTag } from '../charts.js';
import { draftSet, buildEntry } from '../../core/workout.js';
import { figTag } from '../figure.js';
import { icon } from '../icons.js';
import { toast, confirm, announce } from '../dom.js';
import { unlockAudio } from '../audio.js';

const DOW = 'LMMJVSD';

/** Brouillon de la séance affichée (créé au besoin, avec le bon nombre de séries pour un circuit). */
export function currentDraft(app) {
  const se = sessionById(app.program, app.store.state.cur);
  const d = app.store.draft(se.id, { tours: defaultTours(app.program, app.store.state.history) });
  if (isCircuit(app.program) && !d.tours) d.tours = defaultTours(app.program, app.store.state.history);
  return d;
}

const countDone = (d, x, n) => (d.sets[x] || []).slice(0, n).filter((s) => s && s.d).length;

export function weekCard(app) {
  const S = app.store.state;
  const goal = app.store.goal;
  const t = today();
  const ws = weekStart(t);
  const st = weekStats(S.history, goal, t);
  const rides = S.rides;
  const lastRide = rides[rides.length - 1];
  const gap = lastRide ? daysBetween(lastRide, t) : null;
  const cells = [...Array(7)].map((_, i) => {
    const d = addDays(ws, i);
    const s = S.history.some((h) => h.date === d);
    const r = rides.includes(d);
    const label = fmtDay(d, { weekday: 'long', day: 'numeric', month: 'long' }) + ' : ' + (s ? 'séance faite' : r ? 'sortie VTT' : 'rien') + (d === t ? ' (aujourd’hui)' : '');
    return `<div role="img" aria-label="${esc(label)}" class="${s ? 's' : r ? 'r' : ''}${d === t ? ' t' : ''}${d > t ? ' f' : ''}">${DOW[i]}<b>${dayDate(d).getDate()}</b></div>`;
  }).join('');
  const done = st.n >= goal;
  const left = Math.max(0, goal - st.n);
  const lead = done ? 'Objectif atteint' : st.n ? 'Encore ' + left + ' ' + plural(left, 'séance', 'séances') : 'Aucune séance pour l’instant';
  return `<section class="card week" aria-label="Semaine en cours">
    <div class="week-top">${ringMeter(st.n / goal, { big: st.n + '/' + goal, small: 'séances', title: st.n + ' séance' + (st.n > 1 ? 's' : '') + ' sur ' + goal + ' cette semaine' })}
      <div class="grow"><div class="kicker">Cette semaine</div><h3>${done ? icon('check') + ' ' : ''}${esc(lead)}</h3>
      <p class="mute small">${st.streak ? icon('flame') + ' ' + st.streak + ' ' + plural(st.streak, 'semaine', 'semaines') + ' d’affilée à l’objectif' : 'Objectif : ' + goal + ' ' + plural(goal, 'séance', 'séances') + ' par semaine'}</p></div></div>
    <div class="wk" role="group" aria-label="Jours de la semaine">${cells}</div>
    <div class="row between" style="margin-top:12px">
      <span class="legend-mini"><i class="ls"></i>séance <i class="lr"></i>VTT</span>
      <button class="btn ghost sm" data-a="ride" aria-pressed="${rides.includes(t)}">${icon('bike')} ${rides.includes(t) ? 'VTT noté' : 'VTT aujourd’hui'}</button>
    </div>
    ${gap != null && gap < 2 ? '<p class="hint">Sortie VTT récente : si les jambes sont lourdes, baisse la charge d’un cran.</p>' : ''}
  </section>`;
}

/** Ce qui s'est passé récemment : dernière séance, tendance sur 4 semaines, records. Rien n'est affiché sans données. */
function insightsCards(app) {
  const ins = insights(app.store.state.history, app.program);
  if (!ins) {
    return `<section class="card empty-card"><div class="em" aria-hidden="true">${icon('chart')}</div><div><b>Ton tableau de bord se remplira ici</b><p class="mute">Après ta première séance enregistrée : durée, records, régularité et progression, calculés uniquement à partir de ce que tu notes.</p></div></section>`;
  }
  const L = ins.last;
  const ago = ins.daysSince === 0 ? 'aujourd’hui' : ins.daysSince === 1 ? 'hier' : 'il y a ' + ins.daysSince + ' jours';
  let h = `<div class="sec"><h3>En bref</h3></div><div class="grid2">`;
  h += `<button class="card tap" data-a="hist" data-v="${esc(L.id)}"><div class="kicker">Dernière séance · ${esc(ago)}</div><b class="lg">${esc(L.short || L.title || 'Séance')}</b>
    <div class="kv"><span><b>${L.dur ? Math.round(L.dur) : '–'}</b> min</span><span><b>${ins.lastSets}</b> séries</span>${ins.lastVol ? `<span><b>${fmtInt(ins.lastVol)}</b> kg×reps</span>` : ''}</div>
    ${ins.lastDelta != null ? `<p class="small mute">${deltaTag(ins.lastVol, ins.lastVol - ins.lastDelta, { unit: 'kg×reps' })} par rapport à la fois précédente</p>` : ''}</button>`;
  const c = ins.cur, p = ins.prev;
  h += `<div class="card"><div class="kicker">4 dernières semaines</div>
    <div class="kv big"><span><b>${c.n}</b> ${plural(c.n, 'séance', 'séances')} ${deltaTag(c.n, p.n)}</span></div>
    <p class="small mute">${c.avgDur ? 'Durée moyenne ' + c.avgDur + ' min' + (p.avgDur ? ' (' + p.avgDur + ' min avant)' : '') + ' · ' : ''}${p.n ? p.n + ' ' + plural(p.n, 'séance', 'séances') + ' les 4 semaines d’avant' : 'pas de séance les 4 semaines d’avant'}</p></div>`;
  h += '</div>';
  if (ins.records.length) {
    h += `<section class="card"><div class="row between"><div class="kicker">${icon('trophy')} Records des 30 derniers jours</div><button class="btn quiet sm" data-a="goto" data-v="progres">Tout voir</button></div>` +
      ins.records.slice(0, 4).map((r) => `<div class="li"><div class="th sm">${figTag(r.k)}</div><div class="grow"><b>${esc(r.name)}</b><div class="mute small">${esc(fmtDay(r.date, { day: 'numeric', month: 'short' }))} · avant ${fmtNum(r.old)} ${r.u}</div></div><span class="v">${fmtNum(r.v)} ${r.u}${r.u === 'kg' && r.reps ? '<small>× ' + fmtNum(r.reps) + ' reps</small>' : ''}</span></div>`).join('') + '</section>';
  } else if (ins.lastRecord) {
    const r = ins.lastRecord;
    h += `<p class="mute small" style="margin:4px 4px 0">${icon('trophy')} Dernier record : ${esc(r.name)}, ${fmtNum(r.v)} ${r.u} (${esc(fmtDay(r.date, { day: 'numeric', month: 'long' }))}).</p>`;
  }
  return h;
}

/** Dernière fois que cette séance a été faite (ou null). */
function lastOfSession(history, se) {
  let best = null;
  for (const h of history) if ((h.sid === se.id || (!h.sid && h.short === se.short)) && (!best || h.date > best.date)) best = h;
  return best;
}

function setRows(app, ex, x, d, n) {
  const circuit = isCircuit(app.program);
  const noLoad = !!ex.noLoad;
  const unit = circuit ? 'reps / s' : ex.hold ? 'durée (s)' : 'reps';
  const name = esc(displayName(ex));
  if (ex.parts) {
    let h = '';
    for (let i = 0; i < n; i++) {
      const s = (d.sets[x] || [])[i] || { r: '', k: '', d: false };
      h += `<div class="pset"><div class="set-head"><span></span><span>reps</span><span>kg</span><span></span></div>` +
        ex.parts.map((p, j) => {
          const v = s.p && s.p[j] ? s.p[j] : j === 0 ? s : { r: '', k: '' };
          return `<div class="pn">${esc(p.n)}</div><div class="set${s.d ? ' done' : ''}"><span class="no">${j === 0 ? i + 1 : ''}</span>` +
            `<input inputmode="decimal" autocomplete="off" aria-label="${name}, ${esc(p.n)} · reps, série ${i + 1}" data-x="${x}" data-i="${i}" data-p="${j}" data-f="r" value="${esc(v.r)}">` +
            `<input inputmode="decimal" autocomplete="off" aria-label="${name}, ${esc(p.n)} · charge en kg, série ${i + 1}" data-x="${x}" data-i="${i}" data-p="${j}" data-f="k" value="${esc(v.k)}">` +
            (j === ex.parts.length - 1 ? `<button class="chk" data-a="chk" data-x="${x}" data-i="${i}" aria-label="${name} · valider la série ${i + 1}" aria-pressed="${!!s.d}">${icon('check')}</button>` : '<span></span>') + '</div>';
        }).join('') + '</div>';
    }
    return h;
  }
  let h = `<div class="set-head${noLoad ? ' nok' : ''}"><span></span><span>${unit}</span>${noLoad ? '' : '<span>kg</span>'}<span></span></div>`;
  for (let i = 0; i < n; i++) {
    const s = (d.sets[x] || [])[i] || { r: '', k: '', d: false };
    h += `<div class="set${noLoad ? ' nok' : ''}${s.d ? ' done' : ''}"><span class="no">${i + 1}</span>` +
      `<input inputmode="decimal" autocomplete="off" aria-label="${name} · ${unit}, série ${i + 1}" data-x="${x}" data-i="${i}" data-f="r" value="${esc(s.r)}">` +
      (noLoad ? '' : `<input inputmode="decimal" autocomplete="off" aria-label="${name} · charge en kg, série ${i + 1}" data-x="${x}" data-i="${i}" data-f="k" value="${esc(s.k)}">`) +
      `<button class="chk" data-a="chk" data-x="${x}" data-i="${i}" aria-label="${name} · valider la série ${i + 1}" aria-pressed="${!!s.d}">${icon('check')}</button></div>`;
  }
  return h;
}

/** « 12 kg · 10 / 10 / 9 » : résumé d'une ligne d'historique. */
export function rowSummary(row) {
  const ks = row.sets.map((s) => s.k).filter((k) => k !== '');
  const sameK = ks.length && ks.every((k) => k === ks[0]);
  if (sameK) return ks[0] + ' kg · ' + row.sets.map((s) => s.r || '–').join(' / ');
  return row.sets.map((s) => (s.r || '–') + (s.k !== '' ? ' × ' + s.k + ' kg' : '')).join(' · ');
}

export function renderToday(app) {
  const { program, store } = app;
  const S = store.state;
  const circuit = isCircuit(program);
  const se = sessionById(program, S.cur);
  const d = currentDraft(app);
  const inProgress = store.hasDraft(se.id);
  if (!inProgress) d.date = today();
  const n = se.exos.length;
  const total = se.exos.reduce((a, e) => a + setsCount(program, e, d.tours), 0);
  const done = se.exos.reduce((a, e, x) => a + countDone(d, x, setsCount(program, e, d.tours)), 0);
  const est = estimateMinutes(program, se, d.tours);
  const next = nextSession(program, S.history);

  const lastSe = lastOfSession(S.history, se);
  let h = '';
  if (program.seances.length > 1) {
    h += '<div class="seg" role="group" aria-label="Choisir la séance">' + program.seances.map((s) =>
      `<button data-a="sid" data-v="${esc(s.id)}" class="${s.id === S.cur ? 'on' : ''}" aria-pressed="${s.id === S.cur}">${esc(s.tab || s.short)}${s.id === next.id && S.history.length ? '<i class="dot" title="Séance conseillée"></i><span class="sr"> (conseillée)</span>' : ''}</button>`).join('') + '</div>';
  }

  h += `<section class="hero">
    <span class="initial" aria-hidden="true">${esc(program.name[0])}</span>
    <div class="kicker">${inProgress ? 'Séance en cours' : se.id === next.id && S.history.length && program.seances.length > 1 ? 'Séance conseillée' : 'Séance du jour'}</div>
    <h2>${esc(se.title)}</h2><p class="mute">${esc(se.sub)}</p>
    <div class="chips"><span class="chip"><b>${n}</b> exercices</span><span class="chip"><b>${total}</b> ${circuit ? 'passages' : 'séries'}</span>${est ? `<span class="chip">≈ <b>${est}</b> min</span>` : ''}</div>
    <p class="mute small" style="margin-top:8px">${program.plan ? icon('list') + ' ' + esc(program.planName) + ' · ' : ''}${lastSe ? 'Faite la dernière fois ' + esc(fmtDay(lastSe.date, { weekday: 'long', day: 'numeric', month: 'long' })) : 'Jamais faite pour l’instant'}</p>
    ${circuit ? `<div class="row between" style="margin-top:14px"><span class="mute">Nombre de séries</span><div class="pick" role="group" aria-label="Nombre de séries">${[1, 2, 3, 4].map((k) => `<button data-a="tours" data-v="${k}" aria-pressed="${k === d.tours}">${k}</button>`).join('')}</div></div>` : ''}
    ${inProgress ? `<div class="meter" role="img" aria-label="${done} sur ${total}"><i style="width:${Math.round((100 * done) / total)}%"></i></div>` : ''}
    <button class="btn" data-a="run">${icon('play')} ${inProgress ? `Reprendre la séance · ${done}/${total}` : 'Commencer la séance guidée'}</button>
  </section>`;

  h += weekCard(app) + insightsCards(app);

  const W = se.warm;
  h += `<details class="card warm" data-keep="warm"><summary><span class="grow"><b>Échauffement</b> <span class="mute">· ${W.min} min · ${W.steps.length} exercices</span></span>${icon('chev', 'chev')}</summary>` +
    W.steps.map((w) => `<div class="nx"><div class="th sm">${figTag(w.k, { t: 0.5 })}</div><div><b>${esc(w.n)}</b> · ${esc(w.dose)}<div class="mute">${esc(w.how)}</div></div></div>`).join('') + '</details>';

  h += `<div class="sec"><h3>Exercices de la séance</h3></div><p class="mute" style="margin:-4px 0 8px">${circuit ? 'Ouvre un exercice pour noter tes passages à la main, sans la séance guidée.' : 'Ouvre un exercice pour saisir tes séries à la main, sans la séance guidée : le repos démarre quand tu coches.'}</p>`;
  h += se.exos.map((ex, x) => {
    const k = setsCount(program, ex, d.tours);
    const c = countDone(d, x, k);
    const last = lastRow(S.history, program, ex);
    const sug = suggestion(program, ex, last);
    const meta = circuit ? esc(ex.note || '') : k + ' × ' + esc(ex.hold ? ex.hold[0] + '–' + ex.hold[1] + ' s' : ex.reps) + ' · repos ' + esc(restText(ex.restS));
    return `<details class="card ex" data-ex="${x}"><summary><div class="th">${figTag(ex.k)}</div><div class="grow"><h3>${esc(displayName(ex))}</h3><div class="mute">${meta}</div>` +
      (last ? `<div class="last">Dernière fois (${esc(fmtDay(last.date, { day: 'numeric', month: 'short' }))}) : ${esc(rowSummary(last.row))}</div>` : '') +
      `</div><span class="pill${c >= k ? ' full' : ''}" data-p="${x}">${c}/${k}</span></summary>` +
      (sug ? `<p class="hint">${icon('trophy')} ${esc(sug)}</p>` : '') +
      setRows(app, ex, x, d, k) +
      `<button class="btn ghost" data-a="info" data-x="${x}">${icon('info')} Fiche technique et progression</button></details>`;
  }).join('');

  if (program.finisher) h += `<details class="card" data-keep="finisher"><summary><span class="grow"><b>Finisher</b> <span class="mute">· optionnel</span></span>${icon('chev', 'chev')}</summary><p>${esc(program.finisher)}</p></details>`;

  h += `<section class="card" aria-label="Enregistrer la séance">
    <div class="fields"><label class="f">Date de la séance<input type="date" data-f="date" max="${today()}" value="${esc(d.date)}"></label><span></span></div>
    <label class="f" style="margin-top:12px">Notes<textarea rows="2" data-f="note" maxlength="2000" placeholder="Sensations, douleurs, ajustements…">${esc(d.note)}</textarea></label>
    <button class="btn" data-a="finish">Terminer et enregistrer la séance</button>
    ${inProgress ? '<button class="btn quiet" data-a="reset">Vider la saisie en cours</button>' : ''}
  </section>`;
  return h;
}

/** Enregistre la séance en cours dans l'historique. Renvoie true si c'est fait. */
export function saveSession(app) {
  const se = sessionById(app.program, app.store.state.cur);
  const d = currentDraft(app);
  const entry = buildEntry(app.program, se, d);
  if (!entry) {
    toast('Rien à enregistrer : renseigne au moins une série.');
    return false;
  }
  app.store.addEntry(entry);
  app.store.clearDraft(se.id);
  app.stopMini();
  app.go('progres', { open: entry.id });
  toast('Séance enregistrée.');
  return true;
}

export const todayActions = {
  hist(app, b) {
    app.go('progres', { open: b.dataset.v, sub: 'hist' });
  },
  goto(app, b) {
    app.go(b.dataset.v);
  },
  sid(app, b) {
    app.store.state.cur = b.dataset.v;
    app.store.touch('cur');
    app.render();
  },
  tours(app, b) {
    const d = currentDraft(app);
    d.tours = +b.dataset.v;
    delete d.run; // le plan change : la position enregistrée n'a plus de sens
    app.store.touch('draft:' + app.store.state.cur);
    app.render();
  },
  ride(app) {
    app.store.toggleRide(today());
    app.render();
  },
  run(app) {
    unlockAudio();
    app.startWorkout();
  },
  info(app, b) {
    const se = sessionById(app.program, app.store.state.cur);
    app.openExercise(se.exos[+b.dataset.x]);
  },
  chk(app, b) {
    const se = sessionById(app.program, app.store.state.cur);
    const d = currentDraft(app);
    const x = +b.dataset.x;
    const i = +b.dataset.i;
    const ex = se.exos[x];
    const s = draftSet(d, x, i);
    s.d = !s.d;
    if (!d.t0) d.t0 = Date.now();
    for (const row of b.closest('details').querySelectorAll(`.set`)) {
      const inp = row.querySelector(`[data-i="${i}"]`);
      if (inp) row.classList.toggle('done', s.d);
    }
    b.setAttribute('aria-pressed', s.d);
    announce('Série ' + (i + 1) + (s.d ? ' validée' : ' retirée'));
    const k = setsCount(app.program, ex, d.tours);
    const c = countDone(d, x, k);
    const pill = document.querySelector(`[data-p="${x}"]`);
    if (pill) {
      pill.textContent = c + '/' + k;
      pill.classList.toggle('full', c >= k);
    }
    app.store.touch('draft:' + se.id);
    if (s.d && !isCircuit(app.program) && ex.restS) {
      unlockAudio();
      app.startMini(ex.restS, 'Repos · ' + displayName(ex));
    }
  },
  finish(app) {
    saveSession(app);
  },
  async reset(app) {
    const ok = await confirm('Vider la saisie en cours ?', 'Les séries saisies pour cette séance seront effacées. L’historique n’est pas touché.', 'Vider la saisie');
    if (!ok) return;
    app.store.clearDraft(app.store.state.cur);
    app.stopMini();
    app.render();
    toast('Saisie vidée.');
  },
};

/** Saisie dans les champs de l'onglet (séries, date, notes). */
export function todayInput(app, t) {
  const f = t.dataset.f;
  if (!f) return;
  const sid = app.store.state.cur;
  const d = currentDraft(app);
  if (t.dataset.x !== undefined) {
    const s = draftSet(d, +t.dataset.x, +t.dataset.i);
    if (t.dataset.p !== undefined) {
      const se = sessionById(app.program, sid);
      const parts = se.exos[+t.dataset.x].parts;
      s.p = s.p || parts.map((_, j) => (j === 0 ? { r: s.r, k: s.k } : { r: '', k: '' }));
      s.p[+t.dataset.p][f] = t.value.slice(0, 24);
      s.r = s.p[0].r;
      s.k = s.p[0].k;
    } else s[f] = t.value.slice(0, 24);
  } else if (f === 'date') {
    d.date = t.value;
  } else if (f === 'note') {
    d.note = t.value;
  }
  app.store.touch('draft:' + sid);
}
