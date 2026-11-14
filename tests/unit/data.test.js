import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { PROGRAMS } from '../../src/data/programs/index.js';
import { EXERCISES, GROUPS, EQUIP, TYPES, WARM_KEYS, WARM_DEFAULTS, addable } from '../../src/data/exercises.js';
import { FIGURES } from '../../src/data/figures.js';
import { validateProgram, allExercises, sheetOf, estimateMinutes, goalOf, topReps, partsOf, exerciseIndex } from '../../src/core/program.js';
import { pose, figureSVG, cueLayout, LIMB, GROUND, animState, frontArms } from '../../src/ui/figure.js';

test('les deux programmes se chargent et sont cohérents', () => {
  assert.deepEqual(Object.keys(PROGRAMS).sort(), ['axel', 'coralie']);
  for (const p of Object.values(PROGRAMS)) assert.deepEqual(validateProgram(p), [], 'programme ' + p.key);
});

test('validateProgram détecte une référence d’exercice cassée', () => {
  const p = structuredClone(PROGRAMS.axel);
  p.seances[0].exos[0].k = 'inconnu';
  p.seances[0].warm.steps[0].k = 'fantome';
  const errs = validateProgram(p);
  assert.ok(errs.some((e) => e.includes('figure inconnue « inconnu »')));
  assert.ok(errs.some((e) => e.includes('fantome')));
});

test('contenu attendu des programmes (aucune séance ni exercice perdu pendant la refonte)', () => {
  const a = PROGRAMS.axel;
  assert.equal(a.mode, 'sets');
  assert.equal(a.goal, 2);
  assert.deepEqual(a.seances.map((s) => s.id), ['s1', 's2']);
  assert.deepEqual(a.seances[0].exos.map((e) => e.id), ['bulg', 'rdl', 'bench', 'row', 'calf', 'plank']);
  assert.deepEqual(a.seances[1].exos.map((e) => e.id), ['incl', 'rowb', 'ohp', 'step', 'hip', 'curl', 'dead']);
  assert.equal(a.seances[0].exos.reduce((n, e) => n + e.sets, 0), 22);
  assert.equal(a.seances[0].warm.steps.length, 7);
  const c = PROGRAMS.coralie;
  assert.equal(c.mode, 'circuit');
  assert.deepEqual(c.params, { work: 40, rest: 20, restTour: 90, tours: 2 });
  assert.deepEqual(c.seances[0].exos.map((e) => e.id), ['squat', 'step', 'row', 'rdl', 'push', 'hip', 'plank']);
  assert.equal(c.look, 'f');
});

test('chaque exercice a une fiche complète et un groupe musculaire connu', () => {
  for (const p of Object.values(PROGRAMS)) {
    for (const ex of allExercises(p)) {
      const sh = sheetOf(ex);
      assert.ok(sh.steps.length >= 2, ex.id + ' : consignes');
      assert.ok(sh.tip, ex.id + ' : conseil');
      assert.ok(GROUPS[sh.group], ex.id + ' : groupe');
    }
  }
  for (const [k, e] of Object.entries(EXERCISES)) {
    assert.ok(FIGURES[k], 'figure manquante pour la fiche ' + k);
    assert.ok(GROUPS[e.group], 'groupe inconnu pour ' + k);
    assert.ok(Array.isArray(e.equip) && e.equip.every((q) => EQUIP[q]), k + ' : matériel');
    assert.ok(TYPES[e.type], k + ' : type de mouvement');
    assert.ok(e.steps && e.steps.length >= 1, k + ' : étapes');
    for (const v of e.variants || []) {
      assert.ok(EXERCISES[v] && v !== k, k + ' : variante inconnue ' + v);
    }
  }
});

test('bibliothèque : chaque exercice ajoutable est documenté entièrement et a une prescription valide', () => {
  for (const k of addable()) {
    const e = EXERCISES[k];
    assert.ok(e.start && e.steps.length >= 3 && e.tip && e.errors.length >= 2, k + ' : fiche incomplète');
    assert.ok(e.def && e.def.sets > 0 && e.def.restS > 0 && e.def.reps, k + ' : prescription');
    if (e.def.hold) assert.ok(e.def.hold[0] < e.def.hold[1] && e.def.noLoad, k + ' : gainage');
    if (e.def.sides) assert.ok(e.def.sides.length === 2 && e.def.sideRest > 0, k + ' : côtés');
    // les variantes vont dans les deux sens quand c'est possible : au moins une variante pointe vers l'exercice
    if (e.variants.length) assert.ok(e.variants.some((v) => (EXERCISES[v].variants || []).includes(k)), k + ' : variantes à sens unique');
  }
  for (const k of WARM_KEYS) assert.ok(EXERCISES[k] && WARM_DEFAULTS[k] && FIGURES[k], 'échauffement ' + k);
});

test('le texte de repos correspond à la durée réellement chronométrée', () => {
  for (const ex of allExercises(PROGRAMS.axel)) {
    const nums = ex.rest.match(/\d+/g).map(Number);
    assert.ok(ex.restS >= Math.min(...nums) && ex.restS <= Math.max(...nums), ex.id + ' : ' + ex.rest + ' / ' + ex.restS);
    if (ex.hold) assert.equal(ex.reps, ex.hold[0] + '-' + ex.hold[1] + ' s');
  }
});

test('aides de lecture du programme', () => {
  const a = PROGRAMS.axel;
  const bulg = a.seances[0].exos[0];
  assert.deepEqual(goalOf(bulg), { big: '6–10', small: 'reps par jambe' });
  assert.equal(topReps(bulg), 10);
  assert.equal(topReps(a.seances[0].exos[5]), 0, 'la planche est en durée');
  assert.equal(partsOf(bulg, 0)[0].n, 'Jambe gauche devant');
  assert.equal(partsOf(bulg, 1)[0].n, 'Jambe droite devant', 'le côté de départ alterne à chaque série');
  assert.equal(partsOf(a.seances[1].exos[5], 1).length, 3, 'superset : toujours le même ordre');
  assert.equal(estimateMinutes(PROGRAMS.coralie, PROGRAMS.coralie.seances[0], 2), 21);
  const idx = exerciseIndex(a);
  assert.equal(idx.of({ ex: 'Soulevé de terre roumain aux haltères' }).id, 'rdl', 'ancien historique retrouvé par le nom');
  assert.equal(idx.of({ xid: 'rdl', ex: 'nom modifié' }).id, 'rdl');
  assert.equal(idx.of({ ex: 'inconnu' }), null);
});

/* ---------- Figures ---------- */

const usedFigures = () => {
  const keys = new Set([...addable(), ...WARM_KEYS]);
  for (const p of Object.values(PROGRAMS))
    for (const se of p.seances) {
      se.warm.steps.forEach((w) => keys.add(w.k));
      se.exos.forEach((e) => {
        keys.add(e.k);
        (e.parts || []).forEach((x) => x.k && keys.add(x.k));
      });
    }
  return keys;
};

test('toutes les figures utilisées existent et toutes les figures définies sont utilisées', () => {
  const used = usedFigures();
  for (const k of used) assert.ok(FIGURES[k], 'figure absente : ' + k);
  for (const k of Object.keys(FIGURES)) assert.ok(used.has(k), 'figure inutilisée : ' + k);
});

test('aucune propriété dupliquée dans les fichiers de données', () => {
  // Un littéral objet avec deux fois la même clé garde silencieusement la dernière : on le détecte sur le texte source.
  const dupes = (src) => {
    const out = [];
    const stack = [];
    let i = 0;
    let expectKey = false;
    const skipStr = (q) => {
      i++;
      while (i < src.length && src[i] !== q) i += src[i] === '\\' ? 2 : 1;
      i++;
    };
    while (i < src.length) {
      const c = src[i];
      if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i) + 2; continue; }
      if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i < 0) break; continue; }
      if (c === '{') { stack.push(new Set()); expectKey = true; i++; continue; }
      if (c === '[') { stack.push(null); expectKey = false; i++; continue; }
      if (c === '}' || c === ']') { stack.pop(); expectKey = false; i++; continue; }
      if (c === ',') { expectKey = !!stack[stack.length - 1]; i++; continue; }
      if (/\s/.test(c)) { i++; continue; }
      if (expectKey) {
        const st = i;
        let key = null;
        if (c === '"' || c === "'") { skipStr(c); key = src.slice(st + 1, i - 1); }
        else { const m = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, i + 60)); if (m) { key = m[0]; i += m[0].length; } }
        let j = i;
        while (/\s/.test(src[j])) j++;
        if (key != null && src[j] === ':') {
          const top = stack[stack.length - 1];
          if (top.has(key)) out.push(key + ' (ligne ' + src.slice(0, st).split('\n').length + ')');
          top.add(key);
          i = j + 1;
        }
        expectKey = false;
        continue;
      }
      if (c === '"' || c === "'" || c === '`') { skipStr(c); continue; }
      i++;
    }
    return out;
  };
  assert.deepEqual(dupes('x={a:1,b:{a:2,c:1,"c":2},a:3}'), ['c (ligne 1)', 'a (ligne 1)'], 'le détecteur fonctionne');
  const files = ['src/data/figures.js', 'src/data/exercises.js', ...readdirSync('src/data/programs').map((f) => 'src/data/programs/' + f)];
  for (const f of files) assert.deepEqual(dupes(readFileSync(f, 'utf8')), [], f);
});

test('figures : mêmes clés dans les deux poses, cibles atteignables, rien sous le sol', () => {
  for (const [k, E] of Object.entries(FIGURES)) {
    assert.deepEqual(Object.keys(E.a).sort(), Object.keys(E.b).sort(), k + ' : les poses a et b doivent définir les mêmes propriétés');
    assert.equal(E.ph.length, 2, k + ' : deux libellés de phase');
    if (E.front) continue;
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      const P = {};
      for (const key of Object.keys(E.a)) P[key] = Array.isArray(E.a[key]) ? E.a[key].map((v, i) => v + (E.b[key][i] - v) * t) : E.a[key] + (E.b[key] - E.a[key]) * t;
      const q = pose(E, t);
      const R = E.rel || [];
      const limbs = [['f1', 'l1', q.hip, LIMB.leg], ['f2', 'l2', q.hip, LIMB.leg], ['h1', 'a1', q.nk, LIMB.arm], ['h2', 'a2', q.nk, LIMB.arm]];
      for (const [tg, ang, origin, [l1, l2]] of limbs) {
        assert.ok(P[ang] || P[tg], `${k} : ni angle (${ang}) ni cible (${tg})`);
        if (P[ang]) continue;
        const T = R.includes(tg) ? [origin[0] + P[tg][0], origin[1] + P[tg][1]] : P[tg];
        const d = Math.hypot(T[0] - origin[0], T[1] - origin[1]);
        assert.ok(d <= l1 + l2 + 0.6, `${k} t=${t} : cible ${tg} hors de portée (${d.toFixed(1)} > ${l1 + l2})`);
      }
      for (const j of ['f1', 'f2', 'k1', 'k2', 'h1', 'h2', 'hip']) assert.ok(q[j][1] <= GROUND + 0.5, `${k} t=${t} : ${j} sous le sol`);
      for (const j of Object.keys(q)) if (Array.isArray(q[j])) assert.ok(q[j].every(Number.isFinite), `${k} t=${t} : ${j} invalide`);
    }
    for (const m of E.mus || []) {
      assert.match(m[0], /^(torso|thigh[12]|shin[12]|uarm[12]|farm[12])$/, k + ' : segment de muscle');
      assert.ok(['front', 'back'].includes(m[1]) && m[2] < m[3], k + ' : muscle');
    }
    if (E.trk) assert.ok(pose(E, 0)[E.trk], k + ' : point suivi inconnu ' + E.trk);
    assert.ok(!('hl' in E), k + ' : propriété hl obsolète');
  }
});

test('figure rdl : les haltères restent près des jambes en bas du mouvement', () => {
  const q = pose(FIGURES.rdl, 1);
  // tibia : segment genou → cheville ; on mesure l'écart horizontal de la main par rapport au tibia à la même hauteur
  const k = (q.h1[1] - q.k1[1]) / (q.f1[1] - q.k1[1]);
  const shinX = q.k1[0] + (q.f1[0] - q.k1[0]) * Math.max(0, Math.min(1, k));
  assert.ok(Math.abs(q.h1[0] - shinX) <= 7, 'main à ' + (q.h1[0] - shinX).toFixed(1) + ' unités du tibia');
  assert.ok(q.h1[1] > q.k1[1], 'les haltères descendent sous le genou');
  const top = pose(FIGURES.rdl, 0);
  assert.ok(Math.abs(top.h1[1] - top.hip[1]) < 6, 'départ : haltères devant les cuisses');
});

test('figure step : le pied arrière bascule bien (propriété ft2 prise en compte)', () => {
  const a = pose(FIGURES.step, 0);
  const b = pose(FIGURES.step, 1);
  const ang = (q) => Math.atan2(q.t2[1] - q.f2[1], q.t2[0] - q.f2[0]) * 180 / Math.PI;
  assert.ok(Math.abs(ang(a)) < 1 && Math.abs(ang(b) - 40) < 1);
});

test('figures : les libellés des repères tiennent dans le cadre', () => {
  const W = 5 * 0.5; // largeur moyenne d'un caractère à la taille 5 (mesurée sur le rendu réel)
  for (const [k, E] of Object.entries(FIGURES)) {
    if (E.front || !E.cues) continue;
    const z = E.z || 1;
    for (const c of cueLayout(pose(E, 1), E.cues)) {
      const w = c.text.length * W;
      let x0 = c.anchor === 'end' ? c.at[0] - w : c.anchor === 'start' ? c.at[0] : c.at[0] - w / 2;
      let x1 = x0 + w;
      x0 = 50 + (x0 - 50) * z;
      x1 = 50 + (x1 - 50) * z;
      assert.ok(x0 >= -1 && x1 <= 101, `${k} : « ${c.text} » déborde (${x0.toFixed(0)} → ${x1.toFixed(0)})`);
    }
  }
});

test('toutes les figures se dessinent pour les deux personnages', () => {
  for (const k of Object.keys(FIGURES)) {
    for (const look of ['m', 'f']) {
      for (const t of [0, 0.5, 1]) {
        const svg = figureSVG(k, t, { look, cues: true, label: 'Test', dir: 1 });
        assert.ok(svg.length > 200, k);
        assert.doesNotMatch(svg, /NaN|undefined|Infinity/, k + ' ' + look + ' t=' + t);
      }
    }
  }
  assert.equal(figureSVG('inexistante', 0), '');
});

test('animation : phases départ → aller → pause → retour', () => {
  const E = FIGURES.squat;
  assert.deepEqual(animState(E, 0.05), { t: 0, label: 'Départ', dir: 0 });
  assert.equal(animState(E, 0.3).dir, 1);
  assert.deepEqual(animState(E, 0.55), { t: 1, label: 'Pause', dir: 0 });
  assert.equal(animState(E, 0.8).label, E.ph[1]);
  assert.equal(animState(E, 0.7, true).t, 1, 'mouvement réduit : deux poses fixes, sans interpolation');
  assert.equal(animState(FIGURES.plank, 0.2).label, 'Gaine, respire');
});

/* ---------- Biomécanique des figures corrigées ---------- */

const T = Array.from({ length: 21 }, (_, i) => i / 20);
const deg = (a, b) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
/** Distance signée d'un point à la droite a→b (positive à droite du sens de parcours, axe y vers le bas). */
const side = (p, a, b) => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / dist(a, b);

test('animations en boucle (rotations) : la fin rejoint exactement le début, sans saut', () => {
  for (const [k, E] of Object.entries(FIGURES)) {
    if (!E.loop) continue;
    const a = E.front ? frontArms(E, pose(E, 0)) : null;
    const b = E.front ? frontArms(E, pose(E, 1)) : null;
    if (E.front) a.forEach((arm, i) => assert.ok(dist(arm.Hd, b[i].Hd) < 0.01, k));
    else for (const j of ['e1', 'h1', 'e2', 'h2']) assert.ok(dist(pose(E, 0)[j], pose(E, 1)[j]) < 0.01, k + ' ' + j);
    if (E.rev) {
      // un tour dans un sens, puis le même cercle parcouru à l'envers, sans saut au changement de sens
      assert.deepEqual(animState(E, 0.2), { t: 0.4, label: E.ph[0], dir: 1 }, k);
      assert.deepEqual(animState(E, 0.7), { t: 0.6000000000000001, label: E.ph[1], dir: -1 }, k);
      assert.ok(Math.abs(animState(E, 0.4999).t - animState(E, 0.5).t) < 0.01, k + ' : continuité au changement de sens');
    } else assert.deepEqual(animState(E, 0.3), { t: 0.3, label: E.ph[0], dir: 0 }, k + ' : vitesse constante, sans aller-retour');
  }
});

test('rotations d’épaules : mains posées sur les épaules, le coude fait un tour complet', () => {
  const E = FIGURES.shoulder;
  assert.ok(E.loop && !E.front, 'vue de profil, en boucle');
  const quadrants = new Set();
  for (const t of T) {
    const q = pose(E, t);
    assert.ok(dist(q.h1, q.nk) < 2.5, `main sur l’épaule (t=${t})`);
    const a = ((deg(q.nk, q.e1) % 360) + 360) % 360;
    quadrants.add(Math.floor(((a + 45) % 360) / 90)); // 0 avant, 1 bas, 2 arrière, 3 haut
  }
  assert.equal(quadrants.size, 4, 'le coude passe devant, en haut, derrière et en bas');
});

test('cercles de bras : bras tendus sur les côtés, chaque main décrit un cercle', () => {
  const E = FIGURES.armcirc;
  for (const t of T) {
    for (const arm of frontArms(E, pose(E, t))) {
      assert.ok(Math.abs(side(arm.El, arm.S, arm.Hd)) < 0.01, 'coude dans l’axe : bras tendu');
      assert.ok(Math.abs(arm.Hd[1] - arm.S[1]) <= E.circ.r + 0.01, 'mains à hauteur d’épaules');
    }
  }
  const xs = T.map((t) => frontArms(E, pose(E, t))[1].Hd[0]);
  const ys = T.map((t) => frontArms(E, pose(E, t))[1].Hd[1]);
  assert.ok(Math.max(...xs) - Math.min(...xs) > 5 && Math.max(...ys) - Math.min(...ys) > 5, 'trajectoire circulaire, pas un simple va-et-vient vertical');
});

test('pont fessier : bras tendus au sol, immobiles pendant le mouvement', () => {
  const E = FIGURES.bridge;
  const h0 = pose(E, 0).h1;
  for (const t of T) {
    const q = pose(E, t);
    for (const j of ['e1', 'h1', 'e2', 'h2']) assert.ok(q[j][1] > 84 && q[j][1] < 89.5, `${j} au sol (t=${t}, y=${q[j][1].toFixed(1)})`);
    assert.ok(dist(q.h1, h0) < 0.01, 'les mains ne bougent pas');
  }
});

test('positions assises (développé épaules, extension triceps) : cuisses horizontales, pieds à plat, bassin sur le siège', () => {
  for (const k of ['ohp', 'tri']) {
    const E = FIGURES[k];
    const seat = E.props.find((p) => p.t === 'bench');
    for (const t of T) {
      const q = pose(E, t);
      assert.ok(Math.abs(deg(q.hip, q.k1)) < 5, k + ' : cuisse horizontale, genou devant');
      assert.ok(Math.abs(deg(q.k1, q.f1) - 90) < 5, k + ' : tibia vertical');
      assert.ok(Math.abs(q.f1[1] - 88) < 0.6 && Math.abs(q.f2[1] - 88) < 1, k + ' : pieds au sol');
      assert.ok(q.hip[0] > seat.x1 && q.hip[0] < seat.x2, k + ' : bassin au-dessus du siège');
      const gap = seat.y - 2.7 - q.hip[1]; // dessus du coussin – hanche
      assert.ok(gap > -1 && gap < 3.5, k + ' : assis sur le coussin, ni enfoncé ni en lévitation (' + gap.toFixed(1) + ')');
    }
  }
  const back = FIGURES.ohp.props.find((p) => p.t === 'back');
  assert.ok(Math.abs(back.x + 2.7 - (FIGURES.ohp.a.hip[0] - 4.7)) < 1.5, 'développé épaules : dos contre le dossier');
});

test('développés (incliné, épaules) : avant-bras vertical pendant tout le mouvement, coude sous les haltères', () => {
  for (const k of ['incl', 'ohp']) {
    for (const t of T) {
      const q = pose(FIGURES[k], t);
      assert.ok(Math.abs(deg(q.e1, q.h1) + 90) < 4, `${k} t=${t} : avant-bras vertical (${deg(q.e1, q.h1).toFixed(0)}°)`);
    }
  }
  const top = pose(FIGURES.incl, 0);
  assert.ok(Math.abs(deg(top.nk, top.h1) + 90) < 6, 'incliné : en haut, haltères à la verticale des épaules');
  const bottom = pose(FIGURES.incl, 1);
  assert.ok(side(bottom.e1, bottom.hip, bottom.nk) > -3, 'incliné : en bas, le coude descend au niveau du buste (pas au-dessus de la tête)');
  assert.ok(bottom.h1[1] < bottom.e1[1], 'incliné : haltères au-dessus des coudes');
  const ohp0 = pose(FIGURES.ohp, 0);
  assert.ok(ohp0.h1[0] - 2 > ohp0.hd[0] + 4, 'développé épaules : au départ, haltères devant le visage, pas dessus');
});

test('extension triceps : coudes vers le haut, avant-bras qui se déplie derrière la tête (jamais devant le visage)', () => {
  const E = FIGURES.tri;
  for (const t of T) {
    const q = pose(E, t);
    assert.ok(q.e1[1] < q.nk[1] - 10, 'coude au-dessus de l’épaule');
    assert.ok(q.h1[0] <= q.e1[0] + 1.5, `t=${t} : main derrière la ligne du coude (x ${q.h1[0].toFixed(1)} > ${q.e1[0].toFixed(1)})`);
  }
});

test('hip thrust : bras le long du buste jusqu’à l’haltère, coude jamais au-dessus du corps', () => {
  const E = FIGURES.hip;
  for (const t of T) {
    const q = pose(E, t);
    assert.ok(dist(q.h1, q.hip) < 6, 'mains sur l’haltère, posée sur les hanches');
    // côté « ventre » du buste = côté plafond quand on est allongé : le coude ne doit pas s'y dresser
    assert.ok(side(q.e1, q.nk, q.hip) > -1.5, `t=${t} : coude le long du corps`);
  }
});

test('rowing (buste penché et à vide) : bras tendus en bas, coude tiré vers l’arrière et le haut, avant-bras vertical', () => {
  assert.equal(FIGURES.rowv.db, 0, 'rowing à vide : sans haltères');
  for (const k of ['rowb', 'rowv']) {
    const E = FIGURES[k];
    const low = pose(E, 0);
    assert.ok(dist(low.nk, low.h1) > 24, k + ' : bras tendus en bas');
    assert.ok(Math.abs(deg(low.nk, low.h1) - 90) < 6, k + ' : mains sous les épaules');
    const top = pose(E, 1);
    assert.ok(top.e1[0] < top.nk[0] - 6, k + ' : coude tiré vers l’arrière');
    assert.ok(top.e1[1] < top.h1[1] - 8, k + ' : coude au-dessus des mains');
    assert.ok(Math.abs(deg(top.e1, top.h1) - 90) < 15, k + ' : avant-bras proche de la verticale');
    for (const t of T) assert.ok(pose(E, t).e1[0] <= pose(E, t).nk[0] + 1, `${k} t=${t} : le coude ne part jamais vers l’avant`);
  }
});

test('genoux et coudes : aucune articulation pliée à l’envers dans les figures debout ou assises', () => {
  // pour un personnage tourné vers la droite, un genou plié se trouve devant (à droite) de la ligne hanche → cheville
  const upright = Object.entries(FIGURES).filter(([k, E]) => !E.front && !['legswing', 'knee', 'bulg', 'step', 'calf'].includes(k) && pose(E, 0).f1[1] > pose(E, 0).hip[1] + 15);
  assert.ok(upright.length >= 10);
  for (const [k, E] of upright) {
    for (const t of T) {
      const q = pose(E, t);
      assert.ok(side(q.k1, q.hip, q.f1) <= 0.6, `${k} t=${t} : genou plié vers l’arrière`);
    }
  }
});
