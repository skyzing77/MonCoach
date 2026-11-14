/* Outils d'interface : sélection, annonces, messages, boîtes de dialogue, écrans superposés (avec bouton « retour »). */
import { esc } from '../core/util.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Annonce un message aux lecteurs d'écran. */
export function announce(text) {
  const el = $('#sr');
  if (!el) return;
  el.textContent = '';
  setTimeout(() => (el.textContent = text), 50);
}

let toastTimer = 0;
/** Message bref en bas d'écran, avec une action facultative (« Annuler »). */
export function toast(text, { action = '', onAction = null, ms = 3200 } = {}) {
  const el = $('#toast');
  if (!el) return;
  clearTimeout(toastTimer);
  el.innerHTML = `<span>${esc(text)}</span>` + (action ? `<button type="button">${esc(action)}</button>` : '');
  el.hidden = false;
  announce(text);
  const hide = () => (el.hidden = true);
  if (action) {
    $('button', el).onclick = () => {
      hide();
      onAction && onAction();
    };
  }
  toastTimer = setTimeout(hide, action ? Math.max(ms, 6000) : ms);
}

/* ---------- Écrans superposés ----------
   Chaque écran ouvert (séance guidée, fiche, dialogue) correspond à une entrée dans l'historique du navigateur :
   le bouton « retour » d'Android ou le geste de retour ferme l'écran au lieu de quitter l'application.

   L'historique est tenu synchronisé avec la pile d'écrans par sync() : on compare le nombre d'entrées posées
   (depth) au nombre d'écrans ouverts, puis on ajoute les entrées manquantes ou on recule d'un seul coup du bon
   nombre de pas. Une seule navigation à la fois : enchaîner plusieurs history.back() sans attendre fait
   reculer trop loin dans certains navigateurs (et quitter la page). */
const stack = [];
let depth = 0; // entrées d'historique posées par l'appli et encore sous la position courante
let traversing = false; // un retour demandé par l'appli est en cours : on attend son évènement popstate

const stateDepth = () => {
  try {
    return (history.state && history.state.ov) || 0;
  } catch (e) {
    return 0;
  }
};

function sync() {
  if (traversing) return;
  const want = stack.length;
  try {
    if (depth > want) {
      traversing = true;
      history.go(want - depth);
    } else {
      while (depth < want) history.pushState({ ov: ++depth }, '');
    }
  } catch (e) {
    traversing = false; // historique indisponible : la fermeture par les boutons de l'interface reste possible
    depth = want;
  }
}

function setInert() {
  const top = stack[stack.length - 1];
  for (const el of $$('#shell, .tabs, #minibar, .skip')) el.inert = stack.length > 0;
  for (const o of stack) o.el.inert = o !== top;
  document.body.classList.toggle('locked', stack.length > 0);
}

/**
 * Ouvre un écran superposé.
 * @param {HTMLElement} el
 * @param {object} o
 * @param {()=>void} o.onClose      appelé quand l'écran est réellement fermé
 * @param {()=>boolean} [o.canClose]  renvoyer false pour refuser la fermeture par « retour » (ex. séance en cours)
 */
export function openOverlay(el, { onClose, canClose = () => true }) {
  const entry = { el, onClose, canClose, opener: document.activeElement };
  stack.push(entry);
  el.hidden = false;
  setInert();
  sync();
  return entry;
}

function finishClose(entry) {
  const i = stack.indexOf(entry);
  if (i < 0) return;
  stack.splice(i, 1);
  entry.el.hidden = true;
  setInert();
  entry.onClose && entry.onClose();
  const f = entry.opener && entry.opener.isConnected ? entry.opener : $('#main');
  try {
    f && f.focus({ preventScroll: true });
  } catch (e) {
    /* élément non focalisable */
  }
}

/** Ferme un écran (par un bouton de l'interface). */
export function closeOverlay(entry) {
  if (!entry || !stack.includes(entry)) return;
  finishClose(entry);
  sync();
}

export const overlayOpen = () => stack.length > 0;

if (typeof window !== 'undefined') {
  // Page rechargée alors qu'un écran était ouvert : l'entrée d'historique existe encore, mais plus l'écran.
  depth = stateDepth();
  if (depth) sync();

  window.addEventListener('popstate', () => {
    const now = stateDepth();
    if (traversing) {
      traversing = false; // retour demandé par l'appli : rien à fermer, on vérifie seulement qu'on est à jour
      depth = now;
      return sync();
    }
    depth = now;
    // retour demandé par l'utilisateur : on ferme les écrans du dessus, sauf refus (séance en cours)
    while (stack.length > depth) {
      const top = stack[stack.length - 1];
      if (!top.canClose()) break;
      finishClose(top);
    }
    sync(); // rétablit l'entrée consommée si la fermeture a été refusée, ou recule si l'on a avancé dans le vide
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const top = stack[stack.length - 1];
    if (top && top.canClose()) closeOverlay(top);
  });
}

/**
 * Boîte de dialogue à choix. Renvoie une promesse résolue avec la valeur du bouton choisi (null si fermée).
 * actions : [{ label, value, kind: '' | 'ghost' | 'danger' | 'quiet' }]
 * read : fonction appelée au clic sur un bouton pour lire les champs de la boîte ; la promesse renvoie alors { value, read }.
 */
export function dialog({ title, text = '', html = '', actions, read = null }) {
  return new Promise((resolve) => {
    const el = $('#dialog');
    let result = null;
    el.innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlg-t"><h2 id="dlg-t" tabindex="-1">${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ''}${html}` +
      actions.map((a, i) => `<button type="button" class="btn ${a.kind || ''}" data-i="${i}">${esc(a.label)}</button>`).join('') + '</div>';
    const entry = openOverlay(el, { onClose: () => resolve(result) });
    el.onclick = (e) => {
      const b = e.target.closest('[data-i]');
      // read : lit les champs de la boîte avant sa fermeture → { value, read }
      if (b) result = read ? { value: actions[+b.dataset.i].value, read: read() } : actions[+b.dataset.i].value;
      if (b || e.target === el) closeOverlay(entry);
    };
    $('#dlg-t', el).focus({ preventScroll: true });
  });
}

/** Confirmation simple. */
export const confirm = (title, text, yes, kind = 'danger') =>
  dialog({ title, text, actions: [{ label: yes, value: true, kind }, { label: 'Annuler', value: false, kind: 'quiet' }] }).then((v) => v === true);

/** Champ − / + pour saisir un nombre au pouce. hint = valeur proposée (adoptée au premier appui si le champ est vide). */
export const stepper = (id, label, value, { hint = '', step = 1 } = {}) =>
  `<div class="stl"><span id="${id}-l">${esc(label)}</span><div class="stp" data-step="${step}"><button type="button" data-st="${id}" data-d="-1" aria-label="${esc(label)} : moins">−</button>` +
  `<input id="${id}" inputmode="decimal" autocomplete="off" enterkeyhint="done" aria-labelledby="${id}-l" value="${esc(value)}" placeholder="${esc(hint || '–')}" data-hint="${esc(hint)}">` +
  `<button type="button" data-st="${id}" data-d="1" aria-label="${esc(label)} : plus">+</button></div></div>`;

/** Branche les boutons − / + présents dans root. onInput(id, valeur) est appelé à chaque changement. */
export function bindSteppers(root, onInput = () => {}) {
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-st]');
    if (!b) return;
    const input = $('#' + b.dataset.st, root);
    const step = +b.parentElement.dataset.step || 1;
    const cur = parseFloat(String(input.value).replace(',', '.'));
    const hint = parseFloat(String(input.dataset.hint).replace(',', '.'));
    let v;
    if (Number.isNaN(cur)) v = Number.isNaN(hint) ? (+b.dataset.d > 0 ? step : 0) : hint; // champ vide : on adopte la valeur proposée
    else v = Math.max(0, Math.round((cur + +b.dataset.d * step) * 10) / 10);
    input.value = String(v).replace('.', ',');
    onInput(input.id, input.value);
  });
  root.addEventListener('input', (e) => {
    if (e.target.matches('.stp input')) onInput(e.target.id, e.target.value);
  });
}

/** Téléchargement d'un fichier généré dans le navigateur. */
export function download(filename, text, type) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(new Blob([text], { type }));
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
