/* Onglet « Plus » : guide du programme, réglages, sauvegarde des données, informations sur l'application. */
import { esc, today, fmtDay, plural } from '../../core/util.js';
import { exportPayload, toCSV, KG_STEPS } from '../../core/store.js';
import { cleanPlan, planErrors } from '../../core/plans.js';
import { icon } from '../icons.js';
import { toast, download, confirm } from '../dom.js';
import { setSignalOptions, signal, unlockAudio } from '../audio.js';
import { pwa } from '../pwa.js';

const fold = (title, body, open = false) => `<details class="card" data-keep="${esc(title)}"${open ? ' open' : ''}><summary><span class="grow"><b>${esc(title)}</b></span>${icon('chev', 'chev')}</summary>${body}</details>`;

export function renderMore(app) {
  const { program, store } = app;
  const S = store.state;
  const n = S.history.length;
  const snap = store.readSnapshot();
  const sw = (id, label, sub, on) => `<div class="setting"><div><b id="l-${id}">${label}</b><span class="mute small">${sub}</span></div><button class="switch" role="switch" aria-checked="${on}" aria-labelledby="l-${id}" data-a="toggle" data-v="${id}"></button></div>`;

  let h = `<div class="sec" style="margin-top:4px"><h3>Réglages</h3></div><div class="card">
    ${sw('sound', 'Sons', 'Bips de fin de repos et de chrono', S.opt.sound)}
    ${sw('vib', 'Vibrations', 'Si le téléphone le permet (pas sur iPhone)', S.opt.vib)}
    <div class="setting"><div><b>Objectif hebdomadaire</b><span class="mute small">Séances par semaine (programme : ${program.goal})</span></div>
      <div class="pick" role="group" aria-label="Objectif hebdomadaire">${[1, 2, 3, 4, 5].map((k) => `<button data-a="goal" data-v="${k}" aria-pressed="${store.goal === k}">${k}</button>`).join('')}</div></div>
    <div class="setting"><div><b>Pas des boutons − / + (charge)</b><span class="mute small">Écart entre deux haltères disponibles</span></div>
      <div class="pick" role="group" aria-label="Pas de la charge">${KG_STEPS.map((k) => `<button data-a="kgstep" data-v="${k}" aria-pressed="${S.opt.kgStep === k}">${String(k).replace('.', ',')} kg</button>`).join('')}</div></div>
    <div class="setting"><div><b>Apparence</b><span class="mute small">Clair : plus lisible en plein jour</span></div>
      <div class="pick" role="group" aria-label="Apparence">${[['dark', 'Sombre'], ['light', 'Clair'], ['auto', 'Auto']].map(([v, l]) => `<button data-a="theme" data-v="${v}" aria-pressed="${S.opt.theme === v}">${l}</button>`).join('')}</div></div>
  </div>`;

  h += `<div class="sec"><h3>Tes données</h3></div>
  <div class="card">
    <p><b>${n} ${plural(n, 'séance enregistrée', 'séances enregistrées')}</b> sur cet appareil.</p>
    <p class="mute">Dernière sauvegarde dans un fichier : ${S.exp ? esc(fmtDay(S.exp, { day: 'numeric', month: 'long', year: 'numeric' })) : 'jamais'}${S.uns ? ' · ' + S.uns + ' ' + plural(S.uns, 'séance non sauvegardée', 'séances non sauvegardées') : ''}.</p>
    <p class="mute">Rien n’est envoyé sur Internet : l’historique vit dans ce navigateur. Exporte-le de temps en temps pour ne pas le perdre (changement de téléphone, données du navigateur effacées).${app.plans.plans.length ? ' Le fichier contient aussi tes ' + app.plans.plans.length + ' ' + plural(app.plans.plans.length, 'programme personnalisé', 'programmes personnalisés') + '.' : ''}</p>
    <button class="btn" data-a="exp">${icon('down')} Exporter une sauvegarde</button>
    <div class="btns"><button class="btn ghost" data-a="copy">Copier</button><button class="btn ghost" data-a="csv">Export CSV</button></div>
  </div>` +
  fold('Importer une sauvegarde', `<p class="mute">Les séances du fichier sont <b>ajoutées</b> à l’historique : rien n’est supprimé ni remplacé, les doublons sont ignorés.</p>
    <label class="chkl"><input type="checkbox" id="restore-config"> Restaurer aussi les réglages, le programme actif et les brouillons</label>
    <p class="mute small">Les brouillons déjà saisis sur cet appareil sont conservés en cas de conflit.</p>
    <label class="f" style="margin-top:10px">Fichier de sauvegarde (.json)<input type="file" id="imp" accept=".json,application/json,text/plain"></label>
    <label class="f" style="margin-top:12px">… ou colle ici les données copiées<textarea id="impt" rows="3" spellcheck="false"></textarea></label>
    <button class="btn ghost" data-a="imptxt">Importer le texte collé</button>` +
    (snap ? `<p class="mute" style="margin-top:14px">Copie de sécurité automatique du ${esc(fmtDay(snap.day, { day: 'numeric', month: 'long' }))} conservée sur cet appareil.</p><button class="btn ghost" data-a="snap">Récupérer les séances de cette copie</button>` : ''));

  const st = pwa.state;
  h += `<div class="sec"><h3>Application</h3></div><div class="card">
    <div class="setting"><div><b>Version ${esc(st.version || '—')}</b><span class="mute small">${st.offlineReady ? 'Disponible hors ligne' : st.supported ? 'Préparation du mode hors ligne…' : location.protocol === 'file:' ? 'Ouvert depuis un fichier : installation et mises à jour automatiques disponibles une fois le site publié' : 'Mode hors ligne indisponible dans ce navigateur'}</span></div>
      ${st.waiting ? '<button class="btn sm" data-a="update">Mettre à jour</button>' : st.supported ? '<button class="btn ghost sm" data-a="check">Vérifier</button>' : ''}</div>
    <div class="setting"><div><b>Stockage protégé</b><span class="mute small">${st.persisted == null ? 'Information indisponible' : st.persisted ? 'Le navigateur ne videra pas l’historique de lui-même' : 'Le navigateur peut effacer les données d’un site peu utilisé : pense à exporter'}</span></div></div>
  </div>` +
  fold('Installer sur le téléphone', `<ul><li><b>iPhone (Safari)</b> : bouton Partager, puis « Sur l’écran d’accueil ».</li><li><b>Android (Chrome)</b> : menu ⋮, puis « Installer l’application ».</li></ul><p class="mute">Installe la page de ton programme : l’appli s’ouvrira directement dessus, même sans réseau.</p>`);

  h += `<p class="foot">Mon coach · ${new Date().getFullYear()} · données stockées uniquement sur cet appareil</p>`;
  return h;
}

export function downloadBackup(app) {
  const payload = exportPayload(app.store.state, app.program, app.plans.state);
  download('moncoach-' + app.program.key + '-' + today() + '.json', JSON.stringify(payload), 'application/json');
}

function restoreConfiguration(app, configuration, plans, bits) {
  const allowedSessions = new Set(app.base.seances.map((se) => se.id));
  const compatiblePlans = new Set();
  for (const raw of plans) {
    const imported = cleanPlan(raw);
    const local = imported && app.plans.get(imported.id);
    if (!local || JSON.stringify([local.mode, local.params, local.seances]) !== JSON.stringify([imported.mode, imported.params, imported.seances])) continue;
    for (const se of local.seances) allowedSessions.add(se.id);
    if (!planErrors(app.base, local).length) compatiblePlans.add(local.id);
  }

  const active = configuration.active;
  if (active && !compatiblePlans.has(active)) bits.push('programme actif de la sauvegarde indisponible ou différent');
  else if (active !== undefined && active !== app.plans.active) {
    if (app.plans.setActive(active)) app.refreshProgram();
    else bits.push('programme actif non enregistré');
  }

  const result = app.store.restoreConfiguration(configuration, allowedSessions);
  if (!result.saved) return bits.push('réglages et brouillons non enregistrés');
  app.applyTheme();
  setSignalOptions(app.store.state.opt);
  if (result.hasOptions) bits.push('réglages restaurés');
  if (result.restored) bits.push(result.restored + ' ' + plural(result.restored, 'brouillon restauré', 'brouillons restaurés'));
  if (result.conflicts.length) bits.push(result.conflicts.length + ' ' + plural(result.conflicts.length, 'brouillon non importé (saisie locale ou programme différent)', 'brouillons non importés (saisie locale ou programme différent)'));
}

function report(app, res) {
  if (!res.ok) return toast(res.error);
  const np = res.plans && res.plans.length ? app.plans.importPlans(res.plans) : 0;
  if (np) app.refreshProgram();
  const bits = [res.added + ' ' + plural(res.added, 'séance ajoutée', 'séances ajoutées')];
  if (np) bits.push(np + ' ' + plural(np, 'programme ajouté', 'programmes ajoutés'));
  if (np === null) bits.push('programmes non enregistrés');
  if (res.dup) bits.push(res.dup + ' déjà ' + plural(res.dup, 'présente', 'présentes'));
  if (res.invalid) bits.push(res.invalid + ' ' + plural(res.invalid, 'illisible ignorée', 'illisibles ignorées'));
  if (res.configuration) restoreConfiguration(app, res.configuration, res.plans, bits);
  app.render({ keepScroll: true });
  toast(bits.join(' · ') + '.', { ms: 5000 });
}

export const moreActions = {
  toggle(app, b) {
    const o = app.store.state.opt;
    const k = b.dataset.v;
    o[k] = !o[k];
    app.store.touch('opt');
    setSignalOptions(o);
    b.setAttribute('aria-checked', o[k]);
    if (o[k]) {
      unlockAudio();
      signal('ok');
    }
  },
  goal(app, b) {
    const v = +b.dataset.v;
    app.store.state.opt.goal = v === app.program.goal ? 0 : v;
    app.store.touch('opt');
    app.render({ keepScroll: true });
  },
  kgstep(app, b) {
    app.store.state.opt.kgStep = +b.dataset.v;
    app.store.touch('opt');
    app.render({ keepScroll: true });
  },
  theme(app, b) {
    app.store.state.opt.theme = b.dataset.v;
    app.store.touch('opt');
    app.applyTheme();
    app.render({ keepScroll: true });
  },
  exp(app) {
    try {
      downloadBackup(app);
      app.store.markExported();
      app.render({ keepScroll: true });
      toast('Sauvegarde exportée.');
    } catch (e) {
      toast('Export impossible ici : utilise « Copier les données ».');
    }
  },
  csv(app) {
    try {
      download('moncoach-' + app.program.key + '-' + today() + '.csv', toCSV(app.store.state), 'text/csv;charset=utf-8');
      toast('Fichier tableur exporté.');
    } catch (e) {
      toast('Export impossible sur cet appareil.');
    }
  },
  async copy(app) {
    try {
      await navigator.clipboard.writeText(JSON.stringify(exportPayload(app.store.state, app.program, app.plans.state)));
      app.store.markExported();
      app.render({ keepScroll: true });
      toast('Données copiées : colle-les dans une note ou un message.');
    } catch (e) {
      toast('Copie impossible ici : utilise l’export en fichier.');
    }
  },
  imptxt(app) {
    const el = document.getElementById('impt');
    if (!el.value.trim()) return toast('Colle d’abord les données dans le champ.');
    report(app, app.store.import(el.value, { restore: document.getElementById('restore-config').checked }));
  },
  async snap(app) {
    const ok = await confirm('Récupérer la copie de sécurité ?', 'Les séances présentes dans la copie et absentes de l’historique seront ajoutées. Rien n’est supprimé.', 'Récupérer', '');
    if (ok) report(app, app.store.restoreSnapshot());
  },
  update() {
    pwa.applyUpdate();
  },
  async check(app) {
    const r = await pwa.check();
    toast(r === 'update' ? 'Nouvelle version trouvée.' : r === 'offline' ? 'Pas de réseau : vérification impossible.' : 'L’application est à jour.');
    app.render({ keepScroll: true });
  },
};

/** Import d'un fichier choisi dans l'onglet. */
export function moreChange(app, t) {
  if (t.id !== 'imp') return;
  const f = t.files && t.files[0];
  if (!f) return;
  if (f.size > 5e6) return toast('Fichier trop volumineux pour être une sauvegarde.');
  const restore = document.getElementById('restore-config').checked;
  f.text().then((text) => report(app, app.store.import(text, { restore })), () => toast('Lecture du fichier impossible.'));
  t.value = '';
}
