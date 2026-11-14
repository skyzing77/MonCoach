/* Écran de séance guidée : affiche l'état du moteur (src/core/workout.js) et lui transmet les gestes de l'utilisateur. */
import { esc, mmss, restText, fmtNum, fmtInt, today, weekStart, isDay, plural, fmtDay } from '../core/util.js';
import { displayName, sessionById, setsCount, partsOf, goalOf, isCircuit } from '../core/program.js';
import { Workout, defaultValue, rowsOf, durationMin } from '../core/workout.js';
import { lastRow, suggestion, sessionSummary, weekStats } from '../core/stats.js';
import { figAnimTag, figTag, paintFigures } from './figure.js';
import { icon } from './icons.js';
import { $, openOverlay, closeOverlay, dialog, confirm, toast, stepper, bindSteppers } from './dom.js';
import { signal, keepAwake, unlockAudio, tap } from './audio.js';
import { currentDraft, saveSession, rowSummary } from './views/today.js';

const RING = 339.3;
const el = () => $('#workout');
let app = null;
let W = null;
let entry = null;
let interval = 0;
let autoPaused = false;
let bound = false;

const ring = (w, lab = '') =>
  `<div class="ring" style="width:${w}"><svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle class="rb" cx="60" cy="60" r="54"/><circle class="rf" id="w-ring" cx="60" cy="60" r="54" stroke-dasharray="${RING}" stroke-dashoffset="0"/></svg><div class="rn"><div><b id="w-sec" role="timer"></b><span id="w-lab">${esc(lab)}</span></div></div></div>`;

const last = (ex) => lastRow(app.store.state.history, app.program, ex);

/* ---------- Écrans ---------- */

function restScreen(s) {
  const se = W.session;
  const d = W.draft;
  const circuit = isCircuit(app.program);
  const nx = W.nextWork();
  const ne = se.exos[nx.x];
  const P = partsOf(ne, nx.i);
  const pv = W.prevWork();
  const title = s.after === 'warm' ? 'Récupère avant la 1ʳᵉ série' : s.after === 'tour' ? 'Repos entre les séries' : 'Repos';
  let prep = '';
  if (!circuit && !ne.noLoad && !ne.hold) {
    const kg = defaultValue(d, nx.x, nx.i, 'k', last(ne), ne.parts ? 0 : null);
    const same = pv && pv.x === nx.x && String(W.set(pv.x, pv.i).k) === String(kg);
    if (kg !== '' && parseFloat(String(kg).replace(',', '.')) > 0) prep = `<div class="prep${same ? '' : ' chg'}"><span>${same ? 'Même charge' : 'Charge à préparer'}</span><b>${esc(kg)} kg</b></div>`;
  }
  const body = `<div class="k">${title}</div><h2 class="sr" tabindex="-1">${title}</h2>${ring('min(56vw,220px)')}` +
    (circuit && pv ? circuitEntry(pv) : '') +
    `<div class="k" style="margin-top:10px">Ensuite</div><div class="card nx"><div class="th">${figTag(ne.k)}</div><div><b>${esc(displayName(ne))}</b><div class="mute">Série ${nx.i + 1} sur ${setsCount(app.program, ne, d.tours)}${P && ne.sides ? ' · commence : ' + esc(P[0].n.toLowerCase()) : ''}</div></div></div>${prep}`;
  const act = `<div class="btns"><button class="btn ghost" data-w="add" aria-label="Ajouter 15 secondes">+15 s</button><button class="btn ghost" data-w="pause" id="w-pause">Pause</button></div><button class="btn" data-w="skip">Passer le repos</button>`;
  return { body, act };
}

/** Circuit : saisie facultative de ce qui vient d'être fait (rien n'est enregistré si l'utilisateur ne saisit rien). */
function circuitEntry(pv) {
  const ex = W.session.exos[pv.x];
  const cur = W.set(pv.x, pv.i);
  const l = last(ex);
  const hint = (f) => {
    if (pv.i > 0) {
      const prev = (W.draft.sets[pv.x] || [])[pv.i - 1];
      if (prev && prev[f] !== '') return prev[f];
    }
    return l && l.row.sets[pv.i] ? l.row.sets[pv.i][f] || '' : '';
  };
  return `<div class="card" data-entry="${pv.x},${pv.i}"><div class="row between"><b>${esc(displayName(ex))}</b><span class="mute small">série ${pv.i + 1} · facultatif</span></div>` +
    `<div class="gin">${stepper('w-pr', 'Reps ou secondes', cur.r, { hint: hint('r') })}${stepper('w-pk', 'Charge (kg)', cur.k, { hint: hint('k'), step: app.store.state.opt.kgStep || 1 })}</div></div>`;
}

function warmScreen(s) {
  const Wm = W.session.warm;
  const w = Wm.steps[s.w];
  const lastStep = s.w + 1 >= Wm.steps.length;
  let body = `<div class="k">Échauffement · ${s.w + 1} / ${Wm.steps.length}</div><h2 class="gt" tabindex="-1">${esc(w.n)}</h2><div class="hero-fig">${figAnimTag(w.k)}</div><div class="dose">${esc(w.dose)}</div><p class="how">${esc(w.how)}</p>`;
  let act;
  if (w.s) {
    body += ring('min(44vw,170px)', W.ph === 'wait' ? 'prêt quand tu veux' : W.ph === 'prep' ? 'mets-toi en place' : '');
    act = W.ph === 'wait'
      ? `<button class="btn" data-w="launch">${icon('play')} Lancer le chrono (${w.s} s)</button><button class="btn ghost" data-w="skip">Passer cet exercice</button>`
      : `<div class="btns"><button class="btn ghost" data-w="pause" id="w-pause"${W.ph === 'prep' ? ' disabled' : ''}>Pause</button><button class="btn ghost" data-w="skip">${lastStep ? 'Terminer' : 'Suivant'}</button></div>`;
  } else act = `<button class="btn" data-w="done">${lastStep ? 'Terminer l’échauffement' : 'Suivant'}</button>`;
  return { body, act };
}

function readyScreen() {
  const se = W.session;
  const P = app.program.params;
  const x0 = se.exos[0];
  const body = `<div class="k">Premier exercice</div><h2 class="gt" tabindex="-1">${esc(displayName(x0))}</h2><div class="mute">${esc(x0.note || '')}</div><button class="hero-fig" data-w="how" data-x="0" aria-label="Comment faire cet exercice">${figAnimTag(x0.k)}</button>` +
    `<div class="duo"><div><span>Travail</span><b>${P.work} s</b><small>par exercice</small></div><div><span>Repos</span><b>${P.rest} s</b><small>entre les exercices</small></div></div>` +
    `<p class="how">Le chrono démarre dès que tu appuies. Enchaîne les ${se.exos.length} exercices, puis ${restText(P.restTour)} de repos entre les séries.</p><button class="btn quiet" data-w="how" data-x="0">${icon('info')} Comment faire cet exercice</button>`;
  return { body, act: `<button class="btn" data-w="done">${icon('play')} Lancer le circuit</button>` };
}

function workScreen(s) {
  const se = W.session;
  const ex = se.exos[s.x];
  const n = W.draft.tours;
  const L = se.exos.length;
  const nxt = W.steps[W.i + 1];
  const end = nxt.k === 'end';
  const dots = Array.from({ length: n }, (_, j) => `<i class="${j < s.i ? 'on' : j === s.i ? 'cur' : ''}"></i>`).join('');
  const body = `<div class="k">Exercice ${s.x + 1} / ${L}</div><h2 class="gt" tabindex="-1">${esc(displayName(ex))}</h2>${ex.note ? `<div class="mute">${esc(ex.note)}</div>` : ''}<button class="hero-fig" data-w="how" aria-label="Comment faire cet exercice">${figAnimTag(ex.k)}</button>` +
    `<div class="setl"><b>Série ${s.i + 1}</b><span>/ ${n}</span><div class="dots" aria-hidden="true">${dots}</div></div>` +
    `<div class="duo"><div><span>Travail</span><b>${s.s} s</b><small>à ton rythme</small></div><div><span>${end ? 'Ensuite' : 'Repos ensuite'}</span><b>${end ? 'Fin' : restText(nxt.s)}</b><small>${end ? 'de la séance' : nxt.after === 'tour' ? 'fin de la série' : 'puis exercice suivant'}</small></div></div>` +
    ring('min(36vw,140px)') + `<button class="btn quiet" data-w="how">${icon('info')} Comment faire cet exercice</button>`;
  return { body, act: `<div class="btns"><button class="btn ghost" data-w="pause" id="w-pause">Pause</button><button class="btn ghost" data-w="skip">Passer</button></div>` };
}

function setScreen(s) {
  const se = W.session;
  const d = W.draft;
  const ex = se.exos[s.x];
  const L = se.exos.length;
  const n = ex.sets;
  const P = partsOf(ex, s.i);
  const pt = P ? Math.min(W.pt, P.length - 1) : 0;
  const cp = P && P[pt];
  const head = `<div class="k">Exercice ${s.x + 1} / ${L}${W.ph === 'side' ? ` · série ${s.i + 1} / ${n}` : ''}</div>`;

  if (W.ph === 'side') {
    const body = head + `<h2 class="gt" tabindex="-1">Change de côté</h2><div class="mute">Récupère, puis enchaîne</div>${ring('min(52vw,200px)')}<div class="card nx"><div class="th">${figTag(ex.k)}</div><div><b>${esc(cp.n)}</b><div class="mute">${esc(cp.d || '')}</div></div></div>`;
    const act = `<div class="btns"><button class="btn ghost" data-w="add" aria-label="Ajouter 15 secondes">+15 s</button><button class="btn ghost" data-w="pause" id="w-pause">Pause</button></div><button class="btn" data-w="sideready">Je suis prêt</button>`;
    return { body, act };
  }

  const g = goalOf(ex);
  const H = ex.hold;
  const lastS = s.x === L - 1 && s.i === n - 1;
  const sub = ex.n.split(' (')[1];
  const l = last(ex);
  const sug = s.i === 0 ? suggestion(app.program, ex, l) : null;
  const dots = Array.from({ length: n }, (_, j) => `<i class="${j < s.i ? 'on' : j === s.i ? 'cur' : ''}"></i>`).join('');
  let body = head + `<h2 class="gt" tabindex="-1">${esc(displayName(ex))}</h2>${sub && !ex.s ? `<div class="mute">${esc(sub.replace(/\)$/, ''))}</div>` : ''}` +
    `<button class="hero-fig" data-w="how" aria-label="Comment faire cet exercice">${figAnimTag((cp && cp.k) || ex.k)}</button>` +
    `<div class="setl"><b>Série ${s.i + 1}</b><span>/ ${n}</span><div class="dots" aria-hidden="true">${dots}</div></div>` +
    `<div class="duo"><div><span>Objectif</span><b>${esc(g.big)}</b><small>${esc(g.small)}</small></div><div><span>${lastS ? 'Ensuite' : 'Repos ensuite'}</span><b>${lastS ? 'Fin' : restText(ex.restS)}</b><small>${lastS ? 'de la séance' : s.i === n - 1 ? 'puis exercice suivant' : 'puis série ' + (s.i + 2)}</small></div></div>`;
  if (l) {
    // valeur de la même série la dernière fois (charge précédente), puis la séance entière
    const ls = l.row.sets[s.i];
    const lv = ls && (ex.parts && ls.p ? ls.p[Math.min(pt, ls.p.length - 1)] : ls);
    const one = lv && lv.r !== '' ? `Série ${s.i + 1} la dernière fois : <b>${esc(lv.r)}${ex.hold ? ' s' : ' reps'}${lv.k !== '' && lv.k != null ? ' × ' + esc(lv.k) + ' kg' : ''}</b><br>` : '';
    body += `<p class="lastline">${one}<span>${esc(fmtDay(l.date, { day: 'numeric', month: 'short' }))} : ${esc(rowSummary(l.row))}</span></p>`;
  }
  if (sug) body += `<p class="hint">${icon('trophy')} ${esc(sug)}</p>`;
  if (P) {
    body += `<ol class="parts">${P.map((p, j) => `<li class="${j < pt ? 'ok' : j === pt ? 'on' : ''}"${j === pt ? ' aria-current="step"' : ''}><i>${j < pt ? '✓' : j + 1}</i><div><b>${esc(p.n)}</b>${p.d ? `<span>${esc(p.d)}</span>` : ''}</div></li>`).join('')}</ol>` +
      (ex.sides ? `<p class="mute" style="margin-top:8px">${ex.sideRest ? restText(ex.sideRest) + ' pour changer de côté, puis repos.' : 'Enchaîne les deux côtés, puis repos.'}</p>` : '');
  }
  let act;
  if (H) {
    body += ring('min(46vw,170px)', W.ph === 'wait' ? 'objectif ' + H[0] + '–' + H[1] + ' s' : W.ph === 'prep' ? 'mets-toi en place' : '');
    act = W.ph === 'wait'
      ? `<button class="btn" data-w="launch">${icon('play')} Lancer le chrono</button><button class="btn ghost" data-w="skip">Passer cette série</button>`
      : `<button class="btn" data-w="done"${W.ph === 'prep' ? ' disabled' : ''}>■ Arrêter et valider</button>`;
  } else {
    const part = ex.parts ? pt : null;
    body += `<div class="gin">${stepper('w-r', ex.parts ? 'Reps · ' + cp.n.toLowerCase() : ex.sides ? 'Reps par côté' : 'Reps faites', defaultValue(d, s.x, s.i, 'r', l, part))}` +
      (ex.noLoad ? '' : stepper('w-k', ex.parts ? 'Charge (kg)' : 'Kg par haltère', defaultValue(d, s.x, s.i, 'k', l, part), { step: app.store.state.opt.kgStep || 1 })) + '</div>';
    const more = P && pt < P.length - 1;
    act = more ? `<button class="btn" data-w="part">${esc(P[pt].n)} : fait ${icon('check')}</button>` : `<button class="btn" data-w="done">Série terminée ${icon('check')}</button>`;
  }
  body += `<button class="btn quiet" data-w="how">${icon('info')} Comment faire cet exercice</button>`;
  return { body, act };
}

function endScreen() {
  const se = W.session;
  const d = W.draft;
  const S = app.store.state;
  const circuit = isCircuit(app.program);
  const rows = rowsOf(app.program, se, d);
  const pv = W.prevWork();
  if (!rows.length) {
    return {
      body: `<div class="big" style="margin-top:40px" tabindex="-1">Séance terminée</div><p class="mute">Aucune série n’a été validée : il n’y a rien à enregistrer.</p>` + (circuit && pv ? circuitEntry(pv) : ''),
      act: `<button class="btn" data-w="save">Enregistrer la séance</button><button class="btn ghost" data-w="list">Revenir à la saisie</button>`,
    };
  }
  const sum = sessionSummary(S.history, app.program, se, rows);
  const min = durationMin(d, Date.now());
  const goal = app.store.goal;
  const st = weekStats(S.history, goal);
  const n1 = st.n + (weekStart(isDay(d.date) ? d.date : today()) === weekStart(today()) ? 1 : 0);
  const body = `<div class="medal" aria-hidden="true">🏅</div><h2 class="big" tabindex="-1">Séance terminée</h2><p class="mute">Bravo ! Enregistre-la pour l’ajouter à ton historique.</p>` +
    `<div class="hsum"><div><b>${min || '–'}</b><span>minutes</span></div><div><b>${W.doneCount}/${W.count}</b><span>${circuit ? 'passages' : 'séries'}</span></div><div><b>${sum.vol ? fmtInt(sum.vol) : '–'}</b><span>kg × reps</span></div></div>` +
    (sum.delta != null ? `<p class="delta ${sum.delta >= 0 ? 'up' : 'down'}">${sum.delta >= 0 ? '▲ +' : '▼ −'}${fmtNum(Math.abs(sum.delta))} kg × reps par rapport à la séance précédente</p>` : '') +
    (sum.recs.length ? `<div class="card note"><b>${icon('trophy')} ${plural(sum.recs.length, 'Nouveau record', 'Nouveaux records')}</b><ul>${sum.recs.map((r) => `<li><b>${esc(displayName(r.ex))}</b> : ${fmtNum(r.v)} ${r.u} <span class="mute">(avant : ${fmtNum(r.old)})</span></li>`).join('')}</ul></div>` : '') +
    `<div class="card"><b>Cette semaine</b><p>${n1} / ${goal} ${plural(goal, 'séance', 'séances')}${n1 >= goal ? ' · objectif atteint 🎉' : ''}${st.streak ? ' · ' + st.streak + ' sem. de suite' : ''}</p></div>` +
    (circuit && pv ? circuitEntry(pv) : '') +
    `<label class="f" style="text-align:left;margin-top:12px">Notes<textarea id="w-note" rows="2" maxlength="2000" placeholder="Sensations, douleurs, ajustements…">${esc(d.note)}</textarea></label>`;
  return { body, act: `<button class="btn" data-w="save">Enregistrer la séance</button><button class="btn ghost" data-w="list">Revenir à la saisie</button>` };
}

/* ---------- Affichage ---------- */

function draw() {
  if (!W) return;
  const s = W.step;
  const root = el();
  const scr = s.k === 'rest' ? restScreen(s) : s.k === 'warm' ? warmScreen(s) : s.k === 'ready' ? readyScreen() : s.k === 'work' ? workScreen(s) : s.k === 'end' ? endScreen() : setScreen(s);
  const bodyEl = $('.w-body', root);
  bodyEl.innerHTML = scr.body;
  bodyEl.classList.toggle('compact', !!$('.parts', bodyEl)); // série en plusieurs parties : figure réduite pour tout voir sans défiler
  $('.w-act', root).innerHTML = scr.act;
  $('.w-prog i', root).style.width = Math.round(100 * W.progress) + '%';
  $('#w-count', root).textContent = W.doneCount + '/' + W.count + ' ' + (isCircuit(app.program) ? 'passages' : 'séries');
  $('#w-back', root).disabled = W.i === 0 && W.pt === 0;
  root.scrollTop = 0;
  paintFigures(root);
  update();
  if (s.k === 'end') setTimeout(confetti, 150);
  const hd = $('.w-body [tabindex="-1"]', root);
  if (hd) hd.focus({ preventScroll: true });
}

/** Rafraîchit ce qui change à chaque instant (chiffres du chrono, anneau, horloge de séance). */
function update() {
  if (!W) return;
  const root = el();
  const now = Date.now();
  $('#w-clock', root).textContent = W.session.short.split(' · ')[0] + ' · ' + mmss(W.elapsedSec(now));
  const sec = $('#w-sec', root);
  const rg = $('#w-ring', root);
  const lab = $('#w-lab', root);
  if (!sec) return;
  const ex = W.exOf();
  let text;
  let offset = 0;
  if (W.ph === 'wait') {
    text = ex && ex.hold ? 0 : W.step.s;
    offset = ex && ex.hold ? RING : 0;
  } else if (W.ph === 'prep') {
    text = W.secondsLeft(now);
  } else if (W.ph === 'hold') {
    const elapsed = W.holdElapsed(now);
    const H = ex.hold;
    text = elapsed;
    offset = RING * (1 - W.fraction(now));
    if (lab) lab.textContent = elapsed < H[0] ? 'tiens jusqu’à ' + H[0] + ' s' : elapsed < H[1] ? 'objectif atteint ! jusqu’à ' + H[1] + ' s si tu peux' : 'bravo';
  } else {
    text = W.secondsLeft(now);
    offset = RING * W.fraction(now);
  }
  if (sec.textContent !== String(text)) sec.textContent = text;
  if (rg) rg.style.strokeDashoffset = offset;
  const ringEl = sec.closest('.ring');
  if (ringEl) ringEl.classList.toggle('paused', W.paused);
  const pb = $('#w-pause', root);
  if (pb && !pb.disabled) pb.textContent = W.paused ? 'Reprendre' : 'Pause';
}

function tickUI() {
  if (!W) return;
  W.tick();
  update();
}

function confetti() {
  const root = el();
  if (!W || root.hidden || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  const w = document.createElement('div');
  const col = ['var(--acc)', '#7dffb0', '#ffd23f', '#ff6a55', '#ffffff', '#5d9bff'];
  w.className = 'confetti';
  w.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('i');
    const r = Math.random;
    c.style.cssText = `left:${r() * 100}%;background:${col[i % col.length]};width:${6 + r() * 6}px;height:${8 + r() * 8}px;animation-delay:${r() * 0.7}s;animation-duration:${2 + r() * 1.4}s;--x:${(r() - 0.5) * 160}px;--r:${(r() - 0.5) * 1080}deg;border-radius:${r() < 0.3 ? '50%' : '2px'}`;
    w.appendChild(c);
  }
  root.appendChild(w);
  setTimeout(() => w.remove(), 4500);
}

/* ---------- Gestes ---------- */

const values = () => {
  const r = $('#w-r', el());
  const k = $('#w-k', el());
  return { r: r ? r.value.trim().slice(0, 24) : undefined, k: k ? k.value.trim().slice(0, 24) : undefined };
};

function openHow(x) {
  const ex = x != null ? W.session.exos[x] : W.exOf();
  if (!ex) return;
  if ((W.ph === 'run' || W.ph === 'side') && !W.paused) {
    W.pause();
    autoPaused = true;
  }
  app.openExercise(ex, {
    onClose: () => {
      if (autoPaused && W && W.paused) W.togglePause();
      autoPaused = false;
    },
  });
}

/** Aperçu de la séance : avancement de chaque exercice, et accès direct à l'un d'eux. */
async function overview() {
  if (!W) return;
  const circuit = isCircuit(app.program);
  const ov = W.overview();
  const v = await dialog({
    title: 'Aperçu de la séance',
    text: 'Touche un exercice pour y aller directement. Les séries non faites restent à faire.',
    actions: [
      ...ov.map((o) => ({ label: (o.done >= o.total ? '✓ ' : '') + displayName(o.ex) + ' · ' + o.done + '/' + o.total + (o.current ? ' (en cours)' : ''), value: 'x' + o.x, kind: o.current ? '' : 'ghost' })),
      { label: 'Fermer', value: null, kind: 'quiet' },
    ],
  });
  if (!W || !v) return;
  const x = +v.slice(1);
  if (W.step.x === x && W.step.k !== 'rest') return;
  W.goToExercise(x);
  if (circuit) toast('Circuit : le chrono de ce passage démarre.');
}

async function askQuit() {
  if (!W) return;
  if (W.step.k === 'end') return close();
  const any = rowsOf(app.program, W.session, W.draft).length > 0;
  const v = await dialog({
    title: 'Quitter la séance ?',
    text: 'Ta progression est gardée : tu pourras reprendre exactement où tu en es.',
    actions: [
      { label: 'Continuer la séance', value: 'stay' },
      { label: 'Quitter et reprendre plus tard', value: 'later', kind: 'ghost' },
      ...(any ? [{ label: 'Terminer la séance maintenant', value: 'end', kind: 'ghost' }] : []),
      { label: 'Abandonner la séance', value: 'drop', kind: 'danger' },
    ],
  });
  if (!W) return;
  if (v === 'later') close();
  else if (v === 'end') W.enter(W.steps.length - 1);
  else if (v === 'drop') {
    const ok = !any || (await confirm('Abandonner cette séance ?', 'Les séries déjà saisies pour cette séance seront effacées.', 'Abandonner'));
    if (!ok || !W) return;
    const sid = W.session.id;
    close();
    app.store.clearDraft(sid);
    app.render();
    toast('Séance abandonnée.');
  }
}

const actions = {
  done: () => W.done(values()),
  part: () => W.partDone(values()),
  launch: () => W.launch(),
  skip: () => W.skip(),
  pause: () => W.togglePause(),
  add: () => W.add(15),
  sideready: () => W.sideReady(),
  how: (b) => openHow(b.dataset.x != null ? +b.dataset.x : null),
  back: () => W.back(),
  quit: () => askQuit(),
  plan: () => overview(),
  list: () => close(),
  save: () => {
    const a = app;
    close();
    saveSession(a);
  },
};

function bind(root) {
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-w]');
    if (!b || !W || b.disabled) return;
    unlockAudio();
    actions[b.dataset.w] && actions[b.dataset.w](b);
  });
  bindSteppers(root, (id, value) => {
    tap();
    if (!W || (id !== 'w-pr' && id !== 'w-pk')) return;
    const card = $('[data-entry]', root);
    if (!card) return;
    const [x, i] = card.dataset.entry.split(',').map(Number);
    W.setValues(x, i, id === 'w-pr' ? { r: value.trim().slice(0, 24) } : { k: value.trim().slice(0, 24) });
  });
  root.addEventListener('input', (e) => {
    if (e.target.id === 'w-note' && W) {
      W.draft.note = e.target.value;
      app.store.touch('draft:' + W.session.id);
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (!W) return;
    if (document.hidden) {
      W.interrupt();
      app.store.flushIfDirty();
    } else {
      tickUI();
      if (W && W.interrupted) {
        W.interrupted = false;
        toast('Chrono interrompu par la mise en veille : relance-le quand tu es prêt.');
      }
    }
  });
}

/* ---------- Ouverture / fermeture ---------- */

export function workoutOpen() {
  return !!W;
}

export function startWorkout(a) {
  if (W) return;
  app = a;
  const root = el();
  const se = sessionById(app.program, app.store.state.cur);
  const d = currentDraft(app);
  app.stopMini();
  app.store.pin(se.id);
  root.innerHTML = `<div class="w-top"><div class="w-bar"><button class="icon-btn" id="w-back" data-w="back" aria-label="Revenir à l’étape précédente">${icon('undo')}</button><div class="w-prog" role="progressbar" aria-label="Avancement de la séance"><i></i></div><button class="icon-btn" data-w="plan" aria-label="Aperçu de la séance">${icon('list')}</button><button class="icon-btn" data-w="quit" aria-label="Quitter la séance">${icon('close')}</button></div><div class="w-meta"><span id="w-clock"></span><span id="w-count" aria-live="polite"></span></div></div><div class="w-body"></div><div class="w-act"></div>`;
  if (!bound) {
    bind(root);
    bound = true;
  }
  W = new Workout({
    program: app.program,
    session: se,
    draft: d,
    cue: signal,
    onChange: (kind) => {
      if (kind === 'data') {
        // écrit tout de suite : sur téléphone, l'appli peut être fermée par le système à tout moment
        app.store.dirty.add('draft:' + se.id);
        app.store.flush();
      } else if (kind === 'step') draw();
      else update();
    },
  });
  app.store.touch('draft:' + se.id);
  entry = openOverlay(root, {
    canClose: () => {
      askQuit(); // bouton « retour » : on demande confirmation au lieu de fermer brutalement
      return false;
    },
    onClose: () => {
      clearInterval(interval);
      keepAwake(false);
      document.body.classList.remove('in-workout');
      app.store.pin(null);
      app.store.flushIfDirty();
      W = null;
      entry = null;
      root.innerHTML = '';
      app.render();
    },
  });
  document.body.classList.add('in-workout');
  keepAwake(true);
  draw();
  interval = setInterval(tickUI, 250);
}

function close() {
  if (entry) closeOverlay(entry);
}
