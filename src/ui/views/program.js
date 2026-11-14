/* Onglet « Programme » : programme actif (séances et exercices), liste des programmes (base et personnalisés),
   création, copie, suppression, guide du programme. La modification se fait dans l'éditeur (ui/editor.js). */
import { esc, plural, restText, fmtDay } from '../../core/util.js';
import { displayName, isCircuit, estimateMinutes } from '../../core/program.js';
import { duplicatePlan, newPlan, planErrors, MAX_PLANS } from '../../core/plans.js';
import { figTag } from '../figure.js';
import { icon } from '../icons.js';
import { toast, confirm, dialog } from '../dom.js';
import { openEditor } from '../editor.js';

const fold = (title, body, open = false) => `<details class="card" data-keep="${esc(title)}"${open ? ' open' : ''}><summary><span class="grow"><b>${esc(title)}</b></span>${icon('chev', 'chev')}</summary>${body}</details>`;

const modeText = (p) => (p.mode === 'circuit' ? 'circuit' : 'séries');

function sessionCard(program, se) {
  const circuit = isCircuit(program);
  const est = estimateMinutes(program, se, circuit ? program.params.tours : 0);
  const rows = se.exos.map((ex) => {
    const plan = circuit ? (ex.note ? esc(ex.note) : program.params.work + ' s') : ex.sets + ' × ' + esc(ex.hold ? ex.hold[0] + '–' + ex.hold[1] + ' s' : ex.reps) + ' · repos ' + esc(restText(ex.restS));
    return `<div class="li"><div class="th sm">${figTag(ex.k)}</div><div class="grow"><b>${esc(displayName(ex))}</b><div class="mute small">${plan}</div></div></div>`;
  }).join('');
  return `<details class="card" data-keep="se-${esc(se.id)}"><summary><span class="grow"><b>${esc(se.title)}</b><span class="mute small" style="display:block">${se.exos.length} exercices${est ? ' · ≈ ' + est + ' min' : ''} · échauffement ${se.warm.steps.length} mouvements</span></span>${icon('chev', 'chev')}</summary>${rows}</details>`;
}

export function renderProgram(app) {
  const { base, plans, program } = app;
  const custom = !!program.plan;
  let h = `<section class="hero slim"><span class="initial" aria-hidden="true">${esc(base.name[0])}</span>
    <div class="kicker">Programme actif</div><h2>${esc(program.planName)}</h2>
    <p class="mute">${custom ? 'Programme personnalisé' : 'Programme de base'} · ${program.seances.length} ${plural(program.seances.length, 'séance', 'séances')} · en ${modeText(program)} · objectif ${program.goal} ${plural(program.goal, 'séance', 'séances')} par semaine</p>
    ${custom ? `<button class="btn" data-a="edit" data-v="${esc(program.plan)}">${icon('edit')} Modifier ce programme</button>` : `<button class="btn" data-a="dup" data-v="">${icon('copy')} Personnaliser une copie</button><p class="mute small" style="margin-top:8px">Le programme de base n’est jamais modifié : tu travailles sur une copie, et tu peux y revenir à tout moment.</p>`}
  </section>`;
  h += `<div class="sec"><h3>Séances</h3></div>` + program.seances.map((se) => sessionCard(program, se)).join('');

  h += `<div class="sec"><h3>Mes programmes</h3><span class="mute small">${plans.plans.length + 1}</span></div><div class="card">`;
  const row = (id, name, sub, active, isBase) => `<button class="li" data-a="menu" data-v="${esc(id)}"><span class="pg${active ? ' on' : ''}">${active ? icon('check') : icon('list')}</span><span class="grow"><b>${esc(name)}</b>${active ? ' <span class="badge">actif</span>' : ''}<span class="mute small" style="display:block">${esc(sub)}</span></span>${icon('more', 'mute')}</button>`;
  h += row('', base.planName || 'Programme de ' + base.name, 'Programme de base · ' + base.seances.length + ' ' + plural(base.seances.length, 'séance', 'séances'), !custom, true);
  for (const p of plans.plans) {
    const errs = planErrors(base, p);
    h += row(p.id, p.name, (errs.length ? 'À compléter · ' : '') + p.seances.length + ' ' + plural(p.seances.length, 'séance', 'séances') + ' · ' + modeText(p) + (p.mt ? ' · modifié le ' + fmtDay(new Date(p.mt).toISOString().slice(0, 10), { day: 'numeric', month: 'short' }) : ''), p.id === program.plan, false);
  }
  h += `</div><button class="btn ghost" data-a="new">${icon('plus')} Créer un programme</button>`;
  h += `<p class="mute small" style="margin-top:10px">L’historique est commun à tous tes programmes : un exercice garde ses records et ses courbes quel que soit le programme dans lequel tu le fais.</p>`;

  if (program.info && program.info.length) {
    h += `<div class="sec"><h3>Guide du programme</h3></div><p class="mute">${esc(base.sub)}</p>` + program.info.map((b) => fold(b.h, `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`)).join('');
  }
  return h;
}

async function askName(title, value) {
  const v = await dialog({
    title,
    html: `<label class="f" style="margin-top:12px">Nom du programme<input id="dlg-name" maxlength="60" value="${esc(value)}" autocomplete="off"></label>`,
    actions: [{ label: 'Continuer', value: 'ok' }, { label: 'Annuler', value: null, kind: 'quiet' }],
    read: () => (document.getElementById('dlg-name').value || '').trim(),
  });
  return v && v.value === 'ok' ? v.read || value : null;
}

export const programActions = {
  edit(app, b) {
    const p = app.plans.get(b.dataset.v);
    if (p) openEditor(app, p);
  },
  async dup(app, b) {
    if (app.plans.plans.length >= MAX_PLANS) return toast('Nombre maximal de programmes atteint (' + MAX_PLANS + ').');
    const src = b.dataset.v ? app.plans.get(b.dataset.v) : app.base;
    if (!src) return;
    const srcName = b.dataset.v ? src.name : app.base.planName || 'Programme de ' + app.base.name;
    const name = await askName('Copier le programme', ('Copie de ' + srcName).slice(0, 60));
    if (!name) return;
    const prog = b.dataset.v ? { ...src, planName: src.name, plan: src.id } : app.base;
    const plan = duplicatePlan(prog, { name });
    if (!plan || !app.plans.put(plan)) return toast('Copie impossible.');
    app.render({ keepScroll: true });
    openEditor(app, app.plans.get(plan.id));
  },
  async new(app) {
    if (app.plans.plans.length >= MAX_PLANS) return toast('Nombre maximal de programmes atteint (' + MAX_PLANS + ').');
    const v = await dialog({
      title: 'Nouveau programme',
      html: `<label class="f" style="margin-top:12px">Nom du programme<input id="dlg-name" maxlength="60" value="Mon programme" autocomplete="off"></label><p class="mute small" style="margin-top:12px">Choisis l’organisation des séances :</p>`,
      actions: [
        { label: 'En séries (séries, reps, charges, repos)', value: 'sets' },
        { label: 'En circuit (travail / repos chronométrés)', value: 'circuit', kind: 'ghost' },
        { label: 'Annuler', value: null, kind: 'quiet' },
      ],
      read: () => (document.getElementById('dlg-name').value || '').trim(),
    });
    if (!v || !v.value) return;
    const plan = newPlan(app.base, { name: v.read || 'Mon programme', mode: v.value });
    if (!app.plans.put(plan)) return toast('Création impossible.');
    app.render({ keepScroll: true });
    openEditor(app, app.plans.get(plan.id));
  },
  async menu(app, b) {
    const id = b.dataset.v;
    const p = id ? app.plans.get(id) : null;
    const active = (app.program.plan || '') === id;
    const errs = p ? planErrors(app.base, p) : [];
    const v = await dialog({
      title: p ? p.name : app.base.planName || 'Programme de ' + app.base.name,
      text: errs.length ? 'Ce programme est à compléter avant de pouvoir l’utiliser : ' + errs[0] : active ? 'C’est le programme utilisé actuellement.' : '',
      actions: [
        ...(!active && !errs.length ? [{ label: 'Utiliser ce programme', value: 'use' }] : []),
        ...(p ? [{ label: 'Modifier', value: 'edit', kind: active || errs.length ? '' : 'ghost' }] : []),
        { label: p ? 'Dupliquer' : 'Personnaliser une copie', value: 'dup', kind: 'ghost' },
        ...(p ? [{ label: 'Supprimer', value: 'del', kind: 'danger' }] : []),
        { label: 'Fermer', value: null, kind: 'quiet' },
      ],
    });
    if (v === 'use') {
      app.usePlan(id);
      app.render();
      toast('Programme « ' + app.program.planName + ' » activé.');
    } else if (v === 'edit') openEditor(app, p);
    else if (v === 'dup') programActions.dup(app, { dataset: { v: id } });
    else if (v === 'del') {
      const ok = await confirm('Supprimer « ' + p.name + ' » ?', 'Le programme est supprimé. Les séances déjà enregistrées restent dans l’historique' + (active ? ' et le programme de base redevient actif.' : '.'), 'Supprimer');
      if (!ok) return;
      const copy = JSON.parse(JSON.stringify(p));
      app.plans.remove(id);
      app.refreshProgram();
      app.render();
      toast('Programme supprimé.', {
        action: 'Annuler',
        onAction: () => {
          app.plans.put(copy, copy.mt);
          if (active) app.usePlan(copy.id);
          else app.refreshProgram();
          app.render();
        },
      });
    }
  },
};
