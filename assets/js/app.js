/* Fichier généré par « npm run build » à partir de src/main.js : ne pas modifier à la main.
   Modules : data/programs/axel.js, data/programs/coralie.js, data/programs/index.js, core/util.js, data/exercises.js, data/figures.js, core/program.js, core/store.js, core/plans.js, ui/dom.js, ui/figure.js, ui/audio.js, ui/charts.js, ui/icons.js, core/stats.js, core/workout.js, ui/pwa.js, ui/views/more.js, ui/views/today.js, ui/views/progress.js, ui/views/library.js, ui/editor.js, ui/views/program.js, ui/workout.js, ui/sheet.js, main.js */
(function () {
'use strict';
const __m = Object.create(null);
__m["src/data/programs/axel.js"] = (function () {

/* Programme « axel » : données uniquement (le moteur est dans src/core et src/ui).
   Chaque exercice a un identifiant stable (id) : c'est lui qui relie l'historique à l'exercice,
   même si son nom affiché change. La clé k désigne la figure et la fiche de src/data/exercises.js. */
const __default = {
  key: 'axel',
  name: 'Axel',
  planName: 'Programme d’Axel',
  mode: 'sets',
  goal: 2,
  look: 'm',
  title: 'Programme sportif – Axel',
  sub: '2 séances par semaine, complémentaires du VTT. Charges proches de l’échec : arrêter 1 à 2 reps avant la limite.',
  seances: [
    {
      id: 's1',
      short: 'Séance 1 · jambes et dos',
      tab: 'S1 · Jambes & dos',
      title: 'Séance 1 – accent jambes et dos',
      sub: 'Full body avec accent jambes et dos.',
      dur: 52,
      warm: {
        min: 5,
        steps: [
          {
            k: 'knee',
            n: 'Montées de genoux sur place',
            dose: '30 secondes',
            how: 'Monte les genoux à hauteur de hanche en balançant les bras. Le but est de te réchauffer, pas de te fatiguer.',
            s: 30,
          },
          {
            k: 'legswing',
            n: 'Balancés de jambe',
            dose: '10 par jambe',
            how: 'Appuie une main au mur et balance la jambe d’avant en arrière, en augmentant l’amplitude à chaque répétition.',
          },
          {
            k: 'bsquat',
            n: 'Squats au poids du corps',
            dose: '12 répétitions',
            how: 'Pieds écartés de la largeur des épaules, descends cuisses parallèles au sol en 2 s, dos droit, talons collés au sol.',
          },
          {
            k: 'bridge',
            n: 'Pont fessier',
            dose: '12 répétitions',
            how: 'Sur le dos, pieds à plat, monte les hanches et serre les fessiers 1 s en haut, puis redescends.',
          },
          {
            k: 'hinge',
            n: 'Bonjour sans charge',
            dose: '10 répétitions',
            how: 'Jambes presque tendues, mains derrière la tête, recule les hanches en gardant le dos plat, puis remonte. Prépare le soulevé de terre roumain.',
          },
          {
            k: 'catcow',
            n: 'Cat-cow sur le tapis',
            dose: '8 répétitions lentes',
            how: 'À quatre pattes, creuse puis arrondis le dos en alternant, en expirant quand tu arrondis.',
          },
          {
            k: 'bulg',
            n: 'Série d’approche : fentes bulgares',
            dose: '6 reps par jambe',
            how: 'Haltères légères (environ la moitié de ta charge de travail). Jambe gauche devant puis jambe droite devant, sans pause entre les deux et sans forcer. Ensuite, 1 min 15 de récupération avant la première vraie série.',
            rest: 75,
          },
        ],
      },
      exos: [
        {
          id: 'bulg',
          k: 'bulg',
          n: 'Fentes bulgares (pied arrière sur le banc)',
          sets: 4,
          reps: '6-10 par jambe',
          rest: '90-120 s',
          restS: 105,
          sides: [
            { n: 'Jambe gauche devant', d: 'pied droit posé sur le banc' },
            { n: 'Jambe droite devant', d: 'pied gauche posé sur le banc' },
          ],
          sideRest: 30,
          sideNote: 'Une série = 6 à 10 reps jambe gauche devant, puis 6 à 10 reps jambe droite devant, avec 30 s de récupération pour changer de côté (chrono automatique, tu peux le passer). C’est la jambe de devant qui travaille : le pied posé sur le banc sert seulement d’équilibre. L’appli fait commencer par une jambe différente à chaque série, pour que les deux soient aussi fraîches.',
          yt: 'fentes bulgares haltères technique',
        },
        {
          id: 'rdl',
          k: 'rdl',
          n: 'Soulevé de terre roumain aux haltères',
          s: 'Soulevé de terre roumain',
          sets: 4,
          reps: '8-10',
          rest: '90-120 s',
          restS: 105,
        },
        {
          id: 'bench',
          k: 'bench',
          n: 'Développé couché aux haltères',
          s: 'Développé couché',
          sets: 4,
          reps: '6-10',
          rest: '90 s',
          restS: 90,
        },
        {
          id: 'row',
          k: 'row',
          n: 'Rowing un bras sur le banc',
          sets: 4,
          reps: '8-10 par côté',
          rest: '75 s',
          restS: 75,
          sides: [
            { n: 'Bras droit tire', d: 'main et genou gauches sur le banc' },
            { n: 'Bras gauche tire', d: 'main et genou droits sur le banc' },
          ],
          sideRest: 20,
          sideNote: 'Une série = toutes les reps avec un bras, puis toutes les reps avec l’autre, avec 20 s de récupération pour changer de côté (chrono automatique, tu peux le passer). La main et le genou posés sur le banc sont ceux du côté opposé au bras qui tire. L’appli fait commencer par un bras différent à chaque série.',
          steps: [
            'Pour tirer avec le bras droit : main gauche et genou gauche sur le banc, pied droit au sol un peu en arrière et écarté. Dos plat, presque parallèle au sol.',
            'Haltère dans la main droite, bras tendu sous l’épaule.',
            'Tire le coude vers la hanche (pas vers l’épaule) en serrant l’omoplate, puis redescends lentement jusqu’au bras tendu.',
            'Toutes les reps faites : inverse (main et genou droits sur le banc, bras gauche qui tire).',
          ],
          yt: 'rowing un bras haltère banc technique',
        },
        {
          id: 'calf',
          k: 'calf',
          n: 'Montées sur la pointe des pieds, une jambe',
          s: 'Mollets, une jambe',
          sets: 3,
          reps: '12-15 par jambe',
          rest: '60 s',
          restS: 60,
          sides: [
            { n: 'Pied gauche', d: 'haltère main gauche, main droite au support' },
            { n: 'Pied droit', d: 'haltère main droite, main gauche au support' },
          ],
          sideRest: 20,
          sideNote: 'Une série = 12 à 15 reps sur le pied gauche, puis 12 à 15 sur le pied droit, avec 20 s de récupération pour changer de côté (chrono automatique, tu peux le passer). 3 séries = 3 séries pour chaque pied : les deux travaillent autant. 3 séries suffisent : les mollets sont un petit muscle et travaillent déjà beaucoup en VTT.',
          steps: [
            'Debout au sol, pieds nus ou en chaussures plates, face à un mur ou un poteau. Pose la main du côté opposé au pied qui travaille dessus, juste pour l’équilibre.',
            'Tiens-toi sur le pied qui travaille et plie l’autre jambe derrière toi, pied décollé du sol.',
            'Prends l’haltère dans la main du même côté que le pied qui travaille, bras tendu le long du corps.',
            'Monte le plus haut possible sur la pointe, tiens 2 s en haut, puis redescends en 3 s jusqu’à poser tout le talon. Repars sans rebondir.',
          ],
          tip: 'Au sol, l’amplitude est plus courte qu’avec une marche : compense avec la pause de 2 s en haut et la descente lente. Jambe d’appui tendue sans verrouiller le genou, la main ne pousse pas sur le support.',
          load: 'Une seule haltère, côté pied qui travaille (main gauche pour le pied gauche). Commence vers 10-12 kg ; quand 15 reps propres passent avec la pause de 2 s, augmente de 2 kg.',
          yt: 'mollets debout une jambe haltère technique',
        },
        {
          id: 'plank',
          k: 'plank',
          n: 'Planche (gainage sur les avant-bras)',
          s: 'Planche',
          sets: 3,
          reps: '30-45 s',
          rest: '45 s',
          restS: 45,
          hold: [30, 45],
          noLoad: true,
          steps: [
            'Avant-bras au sol, coudes sous les épaules, pieds écartés de la largeur des hanches.',
            'Décolle les hanches pour aligner tête, épaules, hanches et talons.',
            'Serre fessiers et abdos, bas du dos plat (pas creusé), et respire calmement.',
            'Lance le chrono une fois en place ; arrête-le dès que la position se dégrade.',
          ],
          tip: 'Mieux vaut 30 s parfaites que 45 s avec le dos creusé ou les fesses en l’air.',
          load: 'Pas de lest avec ton matériel : seul, une haltère ne tient pas en place sur le dos. Pour progresser quand 3 × 45 s deviennent faciles : 1) pieds surélevés sur le banc ; 2) planche « RKC » : serre fessiers, abdos et cuisses au maximum en tirant les coudes vers les pieds (20-30 s suffisent) ; 3) gainage latéral 30-45 s par côté, une haltère de 5 à 10 kg posée sur la hanche du dessus.',
          yt: 'planche gainage avant-bras technique',
        },
      ],
    },
    {
      id: 's2',
      short: 'Séance 2 · haut du corps',
      tab: 'S2 · Haut du corps',
      title: 'Séance 2 – accent haut du corps',
      sub: 'Full body avec accent haut du corps, plus le hip thrust pour l’arrière des cuisses et les fessiers.',
      dur: 52,
      warm: {
        min: 5,
        steps: [
          {
            k: 'jack',
            n: 'Jumping jacks ou corde à sauter',
            dose: '40 secondes',
            how: 'Rythme régulier et léger pour faire monter la chaleur et le pouls.',
            s: 40,
          },
          {
            k: 'armcirc',
            n: 'Cercles de bras',
            dose: '10 vers l’avant, 10 vers l’arrière',
            how: 'Bras tendus sur les côtés, petits cercles qui s’agrandissent peu à peu.',
          },
          {
            k: 'shoulder',
            n: 'Rotations d’épaules',
            dose: '10 répétitions',
            how: 'Mains posées sur les épaules, fais de larges cercles avec les coudes.',
          },
          {
            k: 'push',
            n: 'Pompes inclinées, mains sur le banc',
            dose: '10 répétitions',
            how: 'Corps aligné, descends la poitrine vers le banc. Si c’est trop facile, tu peux choisir un support plus bas.',
          },
          {
            k: 'rowv',
            n: 'Rowing à vide',
            dose: '12 répétitions',
            how: 'Buste penché, dos plat, avec des haltères très légères (ou sans rien) : tire les coudes vers l’arrière en serrant les omoplates.',
          },
          {
            k: 'catcow',
            n: 'Cat-cow sur le tapis',
            dose: '8 répétitions lentes',
            how: 'À quatre pattes, creuse puis arrondis le dos en alternant pour assouplir le haut du dos.',
          },
          {
            k: 'incl',
            n: 'Série d’approche : développé incliné',
            dose: '8 reps',
            how: 'Haltères légères (environ la moitié de ta charge de travail), sans aller vers l’échec. Ensuite, 1 min 15 de récupération avant la première vraie série.',
            rest: 75,
          },
        ],
      },
      exos: [
        {
          id: 'incl',
          k: 'incl',
          n: 'Développé incliné aux haltères',
          s: 'Développé incliné',
          sets: 4,
          reps: '6-10',
          rest: '90 s',
          restS: 90,
        },
        {
          id: 'rowb',
          k: 'rowb',
          n: 'Rowing buste penché (ou poitrine appuyée sur le banc incliné)',
          s: 'Rowing buste penché',
          sets: 4,
          reps: '8-12',
          rest: '75 s',
          restS: 75,
        },
        { id: 'ohp', k: 'ohp', n: 'Développé épaules assis', sets: 3, reps: '8-10', rest: '90 s', restS: 90 },
        {
          id: 'step',
          k: 'step',
          n: 'Step-up sur le banc (haltères aux mains)',
          sets: 3,
          reps: '8-10 par jambe',
          rest: '75 s',
          restS: 75,
          sides: [
            { n: 'Jambe gauche', d: 'pied gauche posé sur le banc' },
            { n: 'Jambe droite', d: 'pied droit posé sur le banc' },
          ],
          sideRest: 30,
          sideNote: 'Une série = toutes les reps avec le pied gauche sur le banc, puis toutes avec le pied droit, avec 30 s de récupération pour changer de côté (chrono automatique, tu peux le passer). L’appli fait commencer par une jambe différente à chaque série.',
          steps: [
            'Face au banc, haltères le long du corps, pose tout le pied qui travaille sur le banc.',
            'Monte en poussant dans le talon de ce pied jusqu’à être debout sur le banc, sans t’élancer avec la jambe restée au sol.',
            'Redescends en contrôle en reposant d’abord l’autre pied au sol. Fais toutes les reps de ce côté, puis change.',
          ],
        },
        {
          id: 'hip',
          k: 'hip',
          n: 'Hip thrust au banc (haltère sur les hanches)',
          s: 'Hip thrust',
          sets: 3,
          reps: '10-12',
          rest: '75 s',
          restS: 75,
          steps: [
            'Assis au sol, le bas des omoplates contre le bord long du banc, pieds à plat écartés largeur de hanches.',
            'Pose une haltère en travers des hanches (sur une serviette pliée pour le confort) et tiens-la à deux mains.',
            'Pousse dans les talons pour monter les hanches jusqu’à aligner épaules, hanches et genoux (tibias verticaux en haut).',
            'Serre fort les fessiers 1 s en haut, puis redescends en contrôle sans poser les fesses.',
          ],
          tip: 'Menton rentré et regard vers les genoux : en haut, c’est le bassin qui bascule, pas le bas du dos qui se creuse.',
          load: 'Une haltère posée en travers des hanches. Commence vers 16-20 kg ; à 24 kg × 12 reps faciles, marque 2 s en haut ou passe en version une jambe.',
          yt: 'hip thrust banc haltère technique',
        },
        {
          id: 'curl',
          k: 'curl',
          n: 'Superset : élévations latérales, curl marteau, extensions triceps',
          s: 'Superset bras',
          sets: 3,
          reps: '10-15 de chaque',
          rest: '60 s entre les tours',
          restS: 60,
          parts: [
            {
              n: 'Élévations latérales',
              d: '10-15 reps',
              k: 'lat',
              how: [
                'Debout, haltères légères le long du corps, coudes très légèrement fléchis.',
                'Monte les bras sur les côtés jusqu’à hauteur d’épaules, pas plus haut.',
                'Redescends lentement.',
              ],
            },
            {
              n: 'Curl marteau',
              d: '10-15 reps',
              k: 'hcurl',
              how: [
                'Debout, paumes face à face, coudes collés au corps.',
                'Monte les haltères vers les épaules sans bouger les coudes.',
                'Redescends lentement jusqu’aux bras tendus.',
              ],
            },
            {
              n: 'Extensions triceps',
              d: '10-15 reps',
              k: 'tri',
              how: [
                'Assis sur le banc, une haltère tenue à deux mains derrière la tête, coudes pointés vers le plafond.',
                'Tends les bras au-dessus de la tête sans écarter les coudes.',
                'Redescends lentement derrière la tête.',
              ],
            },
          ],
          steps: [
            'Enchaîne les trois exercices sans pause : élévations latérales, puis curl marteau, puis extensions triceps.',
            'Récupère ensuite 1 minute, puis recommence pour la série suivante.',
          ],
          tip: 'Charges légères et mouvements contrôlés. Une charge différente par exercice est normale (les élévations latérales sont les plus légères).',
        },
        {
          id: 'dead',
          k: 'dead',
          n: 'Dead bug et rotations contrôlées',
          s: 'Dead bug',
          sets: 3,
          reps: '10',
          rest: '45 s',
          restS: 45,
          noLoad: true,
        },
      ],
    },
  ],
  info: [
    {
      h: 'Consignes',
      items: [
        'Charges proches de l’échec : arrêter 1 à 2 reps avant la limite.',
        'Exercices sur un côté (fentes bulgares, rowing un bras, mollets, step-up) : une série = les deux côtés, l’un après l’autre, avec 20 à 30 s de récupération pour changer de côté (chrono automatique). L’appli indique par quel côté commencer et alterne à chaque série. Note les reps par côté et la charge d’une haltère.',
        'Planche : le chrono se lance quand tu es en place et s’arrête quand tu appuies (ou à 45 s). Pas de charge à noter.',
      ],
    },
    {
      h: 'Progression',
      items: [
        'Double progression : quand toutes les séries atteignent le haut de la fourchette de reps, passer à la charge supérieure.',
        'Les haltères limitent la charge : jouer sur le tempo (descente en 3 s), les pauses d’1 s en bas et les exercices unilatéraux.',
      ],
    },
    {
      h: 'Compatibilité VTT',
      items: [
        'Séance 1 (jambes) : au moins 48 h avant une grosse sortie, à éviter la veille.',
        'Séance 2 (haut du corps) : passe bien le lendemain d’une sortie, elle fatigue peu les jambes.',
        'Rowings, curls marteau et gainage renforcent le haut du dos, la prise et le tronc, utiles pour tenir le guidon.',
        'Hip thrust en séance 2 : il complète le soulevé de terre roumain de la séance 1 (fessiers et arrière des cuisses, utiles pour la puissance de pédalage et le bas du dos).',
        'Sans VTT, le programme tient tel quel ; une 3ᵉ séance (full body léger ou bras/épaules) peut s’ajouter plus tard.',
      ],
    },
  ],
};
return { default: __default };
})();

__m["src/data/programs/coralie.js"] = (function () {

/* Programme « coralie » : données uniquement (le moteur est dans src/core et src/ui).
   Chaque exercice a un identifiant stable (id) : c'est lui qui relie l'historique à l'exercice,
   même si son nom affiché change. La clé k désigne la figure et la fiche de src/data/exercises.js. */
const __default = {
  key: 'coralie',
  name: 'Coralie',
  planName: 'Programme de Coralie',
  mode: 'circuit',
  goal: 1,
  look: 'f',
  title: 'Programme sportif – Coralie',
  sub: '1 séance par semaine. Objectif : remise en forme et perte de poids. Avec ou sans sortie VTT.',
  params: { work: 40, rest: 20, restTour: 90, tours: 2 },
  seances: [
    {
      id: 'c1',
      short: 'Circuit',
      tab: 'Circuit',
      title: 'Circuit full body',
      sub: 'Une série = les 7 exercices enchaînés : 40 s de travail, 20 s de repos, 90 s entre deux séries.',
      warm: {
        min: 5,
        steps: [
          {
            k: 'knee',
            n: 'Marche rapide ou montées de genoux',
            dose: '1 minute',
            how: 'Sur place, bras actifs, pour faire monter doucement le pouls.',
            s: 60,
          },
          {
            k: 'armcirc',
            n: 'Cercles de bras',
            dose: '10 vers l’avant, 10 vers l’arrière',
            how: 'Bras tendus sur les côtés, petits cercles qui s’agrandissent peu à peu.',
          },
          {
            k: 'bsquat',
            n: 'Squats au poids du corps',
            dose: '10 répétitions',
            how: 'Pieds écartés de la largeur des épaules, descends en reculant les hanches, dos droit, talons au sol.',
          },
          {
            k: 'push',
            n: 'Pompes inclinées, mains sur le banc',
            dose: '10 répétitions',
            how: 'Corps aligné, descends la poitrine vers le banc. Si c’est trop dur, monte les mains plus haut.',
          },
          {
            k: 'catcow',
            n: 'Cat-cow sur le tapis',
            dose: '8 répétitions lentes',
            how: 'À quatre pattes, creuse puis arrondis le dos en alternant, en expirant quand tu arrondis.',
          },
        ],
      },
      exos: [
        {
          id: 'squat',
          k: 'squat',
          n: 'Squat goblet jusqu’au banc',
          s: 'Squat goblet',
          note: 'Force des jambes pour la pédalée. Haltère légère.',
        },
        {
          id: 'step',
          k: 'step',
          n: 'Step-up sur le banc (alterner les jambes)',
          s: 'Step-up sur le banc',
          note: 'Reproduit l’effort de pédalage, une jambe à la fois.',
        },
        {
          id: 'row',
          k: 'row',
          n: 'Rowing un bras, genou et main sur le banc',
          s: 'Rowing un bras',
          note: 'Dos et prise pour tenir le guidon. 20 s par côté, en enchaînant sans pause.',
        },
        {
          id: 'rdl',
          k: 'rdl',
          n: 'Soulevé de terre roumain, haltères légères',
          s: 'Soulevé de terre roumain',
          note: 'Chaîne postérieure, aide à tenir la position sur le vélo.',
        },
        {
          id: 'push',
          k: 'push',
          n: 'Pompes inclinées, mains sur le banc',
          s: 'Pompes inclinées',
          note: 'Stabilité des épaules et des bras en descente.',
        },
        {
          id: 'hip',
          k: 'hip',
          n: 'Hip thrust, haut du dos sur le banc',
          s: 'Hip thrust',
          note: 'Fessiers. Sans charge, puis haltère sur les hanches.',
        },
        {
          id: 'plank',
          k: 'plank',
          n: 'Planche ou dead bug sur le tapis',
          s: 'Planche ou dead bug',
          note: 'Gainage du tronc.',
          timed: true,
        },
      ],
    },
  ],
  finisher: '5 minutes de cardio léger (montées de genoux, jumping jacks). À supprimer les semaines où tu roules beaucoup, le VTT faisant déjà office de cardio.',
  info: [
    {
      h: 'Paramètres du circuit',
      items: [
        'Travail par exercice : 40 s · repos entre exercices : 20 s · repos entre les séries : 90 s.',
        'Nombre de séries : 2 les deux premières semaines, puis 3 (proposé automatiquement, modifiable). Une série correspond aux 7 exercices enchaînés.',
        'Pour un exercice en durée (planche), laisser la charge vide.',
      ],
    },
    {
      h: 'Placement dans la semaine',
      items: [
        'Faire la séance au moins 48 h avant une grosse sortie, et éviter la veille (jambes fatiguées).',
        'Le lendemain d’une sortie ou un jour de repos convient bien.',
        'Sans VTT, le programme se suffit à lui-même. Après 4 à 6 semaines, possibilité de passer à 2 séances en alternant avec une variante (fentes, développé couché léger, rowing buste penché).',
      ],
    },
  ],
};
return { default: __default };
})();

__m["src/data/programs/index.js"] = (function () {
const axel = __m["src/data/programs/axel.js"].default;
const coralie = __m["src/data/programs/coralie.js"].default;
/* Registre des programmes disponibles. Pour en ajouter un : voir README (« Ajouter un programme »). */



const PROGRAMS = { axel, coralie };
return { PROGRAMS };
})();

__m["src/core/util.js"] = (function () {

/* Fonctions utilitaires pures (aucun accès au DOM) : texte, nombres, dates. */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Échappe un texte avant insertion dans du HTML (contenu ou attribut). */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/** Nombre saisi par l'utilisateur (« 12,5 » accepté). Renvoie 0 si illisible ou négatif. */
const num = (v) => {
  const x = parseFloat(String(v ?? '').replace(',', '.'));
  return Number.isFinite(x) && x > 0 ? x : 0;
};

/** Affiche un nombre sans décimales inutiles (12 → « 12 », 12.5 → « 12,5 »). */
const fmtNum = (x) => String(Math.round(x * 10) / 10).replace('.', ',');

/** Entier avec séparateur de milliers (15336 → « 15 336 »). */
const fmtInt = (x) => Math.round(x).toLocaleString('fr-FR');

const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const plural = (n, one, many) => (n > 1 ? many : one);

/* ---------- Dates : toujours des jours locaux « AAAA-MM-JJ » ---------- */

const DAY_RE = /^\d{4}-\d\d-\d\d$/;
const pad = (n) => String(n).padStart(2, '0');

const ymd = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => ymd(new Date());
/** Midi local : évite les décalages de jour aux changements d'heure. */
const dayDate = (s) => new Date(s + 'T12:00:00');

/** Vrai si s est un jour réel au format AAAA-MM-JJ (« 2024-02-31 » est refusé). */
const isDay = (s) => {
  if (typeof s !== 'string' || !DAY_RE.test(s)) return false;
  const d = dayDate(s);
  return !Number.isNaN(d.getTime()) && ymd(d) === s;
};

const addDays = (s, n) => {
  const d = dayDate(s);
  d.setDate(d.getDate() + n);
  return ymd(d);
};

/** Lundi de la semaine du jour s. */
const weekStart = (s) => {
  const d = dayDate(s);
  return addDays(s, -((d.getDay() + 6) % 7));
};

const daysBetween = (a, b) => Math.round((dayDate(b) - dayDate(a)) / 864e5);

const fmtDay = (s, opts = { weekday: 'short', day: 'numeric', month: 'short' }) =>
  dayDate(s).toLocaleDateString('fr-FR', opts);

/** 95 → « 1:35 » */
const mmss = (sec) => {
  const s = Math.max(0, Math.floor(sec));
  return Math.floor(s / 60) + ':' + pad(s % 60);
};

/** 105 → « 1 min 45 », 45 → « 45 s » */
const restText = (n) => (n >= 60 ? Math.floor(n / 60) + ' min' + (n % 60 ? ' ' + pad(n % 60) : '') : n + ' s');

/** Identifiant court, unique en pratique (horodatage + aléa). */
const uid = (now = Date.now()) => now.toString(36) + Math.random().toString(36).slice(2, 6);
return { esc, num, fmtNum, fmtInt, cap1, plural, ymd, today, dayDate, isDay, addDays, weekStart, daysBetween, fmtDay, mmss, restText, uid };
})();

__m["src/data/exercises.js"] = (function () {

/* Bibliothèque d'exercices partagée par les programmes (données pures).
   La clé est aussi celle de la figure illustrée (src/data/figures.js) et l'identifiant d'un exercice ajouté
   depuis la bibliothèque dans un programme personnalisé : elle ne doit jamais changer.

   Champs d'une fiche :
     name, group (groupe principal), muscles (muscles sollicités)
     equip    matériel nécessaire (clés de EQUIP) ; [] = poids du corps
     type     type de mouvement (clé de TYPES)
     start    position de départ · steps : étapes d'exécution · tip : conseil · errors : erreurs fréquentes
     variants clés d'exercices proches (plus facile, plus difficile, autre matériel) : ce sont des exercices
              distincts, avec leur propre historique
     def      prescription proposée quand on l'ajoute à un programme personnalisé
              (sets, reps, restS ; hold pour un gainage ; sides + sideRest pour un exercice unilatéral ; noLoad)
     only     'part' : n'existe que comme partie d'un superset de programme (pas ajoutable seul)
   Un programme peut préciser ou remplacer name/steps/tip/muscles pour son propre usage. */

const GROUPS = {
  legs: 'Jambes',
  back: 'Dos',
  chest: 'Pectoraux',
  shoulders: 'Épaules',
  arms: 'Bras',
  core: 'Tronc',
  warm: 'Échauffement',
};

const EQUIP = {
  db: 'Haltères',
  bench: 'Banc',
  mat: 'Tapis',
  wall: 'Mur ou support',
};

const TYPES = {
  push: 'Poussée',
  pull: 'Tirage',
  squat: 'Flexion des jambes',
  lunge: 'Une jambe',
  hinge: 'Charnière de hanche',
  iso: 'Isolation',
  core: 'Gainage',
  mob: 'Mobilité et cardio',
};

const BOTH_LEGS = (rest = 30) => ({ sides: [{ n: 'Jambe gauche', d: '' }, { n: 'Jambe droite', d: '' }], sideRest: rest });

const EXERCISES = {
  bulg: {
    name: 'Fentes bulgares',
    group: 'legs',
    muscles: 'Quadriceps, fessiers, adducteurs',
    equip: ['db', 'bench'],
    type: 'lunge',
    start: 'Dos au banc, un pied posé dessus par le dessus des orteils, l’autre pied environ un grand pas devant. Haltères le long du corps.',
    steps: [
      'Place le pied arrière sur le banc, l’autre pied à environ un grand pas devant.',
      'Descends en fléchissant la jambe avant, buste droit, genou aligné sur le pied.',
      'Pousse dans le talon avant pour remonter, sans verrouiller le genou.',
    ],
    tip: 'Fais toutes les reps d’un côté, puis change de jambe. Une haltère dans chaque main.',
    errors: [
      'Pied avant trop près du banc : le genou part loin devant et le talon décolle.',
      'Pousser avec la jambe arrière : elle ne sert qu’à l’équilibre.',
      'Genou avant qui rentre vers l’intérieur.',
    ],
    variants: ['lunge', 'step'],
    def: { sets: 3, reps: '8-10 par jambe', restS: 90, ...BOTH_LEGS(30) },
  },
  lunge: {
    name: 'Fentes statiques',
    group: 'legs',
    muscles: 'Quadriceps, fessiers',
    equip: ['db'],
    type: 'lunge',
    start: 'Debout, un pied devant et l’autre un grand pas derrière, talon arrière décollé. Haltères le long du corps.',
    steps: [
      'Garde le buste droit et le poids sur la jambe avant.',
      'Descends verticalement jusqu’à ce que le genou arrière frôle le sol.',
      'Remonte en poussant dans le talon avant, sans bouger les pieds. Fais toutes les reps, puis change de côté.',
    ],
    tip: 'Plus accessible que les fentes bulgares : c’est la version à choisir pour débuter ou sans banc.',
    errors: ['Pieds sur une même ligne : écarte-les de la largeur des hanches pour l’équilibre.', 'Buste penché en avant.', 'Genou arrière qui tape le sol.'],
    variants: ['bulg', 'step', 'bsquat'],
    def: { sets: 3, reps: '10-12 par jambe', restS: 75, ...BOTH_LEGS(20) },
  },
  rdl: {
    name: 'Soulevé de terre roumain',
    group: 'legs',
    muscles: 'Ischio-jambiers, fessiers, bas du dos',
    equip: ['db'],
    type: 'hinge',
    start: 'Debout, pieds écartés de la largeur des hanches, haltères devant les cuisses, genoux à peine fléchis.',
    steps: [
      'Debout, haltères devant les cuisses, genoux à peine fléchis.',
      'Recule les hanches en gardant le dos plat : les haltères glissent le long des jambes.',
      'Descends jusqu’à sentir l’étirement derrière les cuisses, puis remonte en serrant les fessiers.',
    ],
    tip: 'Le mouvement vient des hanches, pas du dos. Regarde un point au sol à 1 ou 2 m devant toi.',
    errors: ['Dos qui s’arrondit en bas du mouvement.', 'Haltères qui s’éloignent des jambes.', 'Fléchir les genoux comme pour un squat.'],
    variants: ['hinge', 'hip'],
    def: { sets: 3, reps: '8-10', restS: 105 },
  },
  bench: {
    name: 'Développé couché',
    group: 'chest',
    muscles: 'Pectoraux, épaules (avant), triceps',
    equip: ['db', 'bench'],
    type: 'push',
    start: 'Allongé sur le banc, pieds à plat au sol, omoplates serrées. Haltères au-dessus de la poitrine, bras tendus.',
    steps: [
      'Allongé sur le banc, pieds au sol, haltères au-dessus de la poitrine.',
      'Descends en contrôlant (environ 3 s), coudes à 45° du buste.',
      'Pousse jusqu’à avoir les bras presque tendus, sans claquer les haltères.',
    ],
    tip: 'Omoplates serrées et plaquées sur le banc, poignets alignés sur les coudes.',
    errors: ['Coudes écartés à 90° du buste : épaules exposées.', 'Fesses qui décollent du banc.', 'Descente trop rapide, rebond en bas.'],
    variants: ['incl', 'push', 'pushf'],
    def: { sets: 3, reps: '8-10', restS: 90 },
  },
  incl: {
    name: 'Développé incliné',
    group: 'chest',
    muscles: 'Haut des pectoraux, épaules (avant), triceps',
    equip: ['db', 'bench'],
    type: 'push',
    start: 'Dos sur le banc incliné à 30-45°, pieds au sol, haltères à hauteur de poitrine, avant-bras verticaux.',
    steps: [
      'Banc incliné (30 à 45°), haltères au niveau de la poitrine.',
      'Pousse vers le haut en rapprochant légèrement les haltères.',
      'Redescends en 2 ou 3 s jusqu’à sentir l’étirement des pectoraux.',
    ],
    tip: 'Garde le dos plaqué et ne remonte pas les épaules vers les oreilles.',
    errors: ['Banc trop redressé : ce sont les épaules qui travaillent.', 'Bas du dos très cambré.', 'Haltères qui partent vers le visage.'],
    variants: ['bench', 'ohp', 'push'],
    def: { sets: 3, reps: '8-10', restS: 90 },
  },
  push: {
    name: 'Pompes inclinées',
    group: 'chest',
    muscles: 'Pectoraux, épaules (avant), triceps, gainage',
    equip: ['bench'],
    type: 'push',
    start: 'Mains sur le bord du banc, un peu plus écartées que les épaules, corps aligné des talons à la tête.',
    steps: [
      'Mains sur le banc, un peu plus écartées que les épaules, corps aligné.',
      'Fléchis les coudes pour amener la poitrine vers le banc.',
      'Repousse jusqu’à avoir les bras tendus.',
    ],
    tip: 'Plus le support est haut, plus c’est facile. Pour progresser, prends un support plus bas.',
    errors: ['Hanches qui s’affaissent ou fesses en l’air.', 'Coudes écartés à angle droit.', 'Amplitude partielle.'],
    variants: ['pushf', 'bench'],
    def: { sets: 3, reps: '10-15', restS: 60, noLoad: true },
  },
  pushf: {
    name: 'Pompes au sol',
    group: 'chest',
    muscles: 'Pectoraux, épaules (avant), triceps, gainage',
    equip: [],
    type: 'push',
    start: 'Mains au sol sous les épaules, un peu plus écartées, pieds joints sur la pointe, corps aligné.',
    steps: [
      'Serre fessiers et abdos pour garder le corps gainé comme une planche.',
      'Fléchis les coudes, à environ 45° du buste, jusqu’à ce que la poitrine frôle le sol.',
      'Repousse le sol jusqu’aux bras tendus, sans casser l’alignement.',
    ],
    tip: 'Trop difficile ? Reviens aux pompes inclinées, mains sur le banc, plutôt que de poser les genoux.',
    errors: ['Bassin qui s’affaisse.', 'Tête qui plonge vers le sol avant la poitrine.', 'Descente incomplète.'],
    variants: ['push', 'bench'],
    def: { sets: 3, reps: '6-12', restS: 75, noLoad: true },
  },
  row: {
    name: 'Rowing un bras',
    group: 'back',
    muscles: 'Grand dorsal, haut du dos, biceps, avant-bras',
    equip: ['db', 'bench'],
    type: 'pull',
    start: 'Une main et le genou du même côté sur le banc, dos plat presque parallèle au sol, haltère dans l’autre main, bras tendu.',
    steps: [
      'Une main et un genou sur le banc, dos plat, haltère dans l’autre main, bras tendu.',
      'Tire le coude vers la hanche en serrant l’omoplate.',
      'Redescends lentement jusqu’au bras tendu.',
    ],
    tip: 'Garde les épaules parallèles au sol : pas de rotation du buste.',
    errors: ['Tourner le buste pour monter la charge.', 'Tirer vers l’épaule au lieu de la hanche.', 'Dos rond.'],
    variants: ['rowb'],
    def: { sets: 3, reps: '8-12 par côté', restS: 75, sides: [{ n: 'Bras droit tire', d: 'main et genou gauches sur le banc' }, { n: 'Bras gauche tire', d: 'main et genou droits sur le banc' }], sideRest: 20 },
  },
  rowb: {
    name: 'Rowing buste penché',
    group: 'back',
    muscles: 'Haut du dos, grand dorsal, biceps',
    equip: ['db'],
    type: 'pull',
    start: 'Debout, genoux fléchis, buste penché vers l’avant dos plat, haltères bras tendus sous les épaules.',
    steps: [
      'Penche le buste, dos plat, haltères bras tendus sous les épaules (ou poitrine appuyée sur le banc incliné).',
      'Tire les coudes vers l’arrière en serrant les omoplates.',
      'Redescends en contrôlant.',
    ],
    tip: 'Si le bas du dos tire, appuie la poitrine sur le banc incliné.',
    errors: ['Buste qui se redresse à chaque rep.', 'Épaules qui montent vers les oreilles.', 'Élan donné avec les jambes.'],
    variants: ['row'],
    def: { sets: 3, reps: '8-12', restS: 75 },
  },
  ohp: {
    name: 'Développé épaules assis',
    group: 'shoulders',
    muscles: 'Épaules (deltoïdes), triceps',
    equip: ['db', 'bench'],
    type: 'push',
    start: 'Assis, dos calé contre le dossier, pieds à plat, haltères à hauteur d’épaules, avant-bras verticaux.',
    steps: [
      'Assis dos calé, haltères à hauteur d’épaules, avant-bras à la verticale.',
      'Pousse au-dessus de la tête sans cambrer.',
      'Redescends jusqu’à hauteur des oreilles, de façon contrôlée.',
    ],
    tip: 'Serre les abdos pour éviter de creuser le dos.',
    errors: ['Dos qui se creuse pour finir la poussée.', 'Haltères qui partent loin devant.', 'Descente trop courte.'],
    variants: ['lat', 'incl'],
    def: { sets: 3, reps: '8-10', restS: 90 },
  },
  lat: {
    name: 'Élévations latérales',
    group: 'shoulders',
    muscles: 'Épaules (deltoïdes moyens)',
    equip: ['db'],
    type: 'iso',
    start: 'Debout, pieds écartés de la largeur des hanches, haltères légères le long du corps, coudes très légèrement fléchis.',
    steps: [
      'Debout, haltères légères le long du corps, coudes très légèrement fléchis.',
      'Monte les bras sur les côtés jusqu’à hauteur d’épaules, pas plus haut.',
      'Redescends lentement.',
    ],
    tip: 'Charge légère : si tu dois t’élancer, c’est trop lourd.',
    errors: ['Élan du buste ou des jambes.', 'Épaules haussées vers les oreilles.', 'Bras montés au-dessus des épaules.'],
    variants: ['ohp'],
    def: { sets: 3, reps: '12-15', restS: 60 },
  },
  hcurl: {
    name: 'Curl marteau',
    group: 'arms',
    muscles: 'Biceps, brachial, avant-bras',
    equip: ['db'],
    type: 'iso',
    start: 'Debout, haltères le long du corps, paumes face à face, coudes collés au buste.',
    steps: [
      'Debout, paumes face à face, coudes collés au corps.',
      'Monte les haltères vers les épaules sans bouger les coudes.',
      'Redescends lentement jusqu’aux bras tendus.',
    ],
    tip: 'Les coudes restent collés au corps du début à la fin.',
    errors: ['Coudes qui avancent en montant.', 'Balancer le buste.', 'Descente rapide et incomplète.'],
    variants: ['tri'],
    def: { sets: 3, reps: '10-12', restS: 60 },
  },
  tri: {
    name: 'Extensions triceps',
    group: 'arms',
    muscles: 'Triceps',
    equip: ['db', 'bench'],
    type: 'iso',
    start: 'Assis sur le banc, dos droit, une haltère tenue à deux mains derrière la tête, coudes pointés vers le plafond.',
    steps: [
      'Assis sur le banc, une haltère tenue à deux mains derrière la tête, coudes pointés vers le plafond.',
      'Tends les bras au-dessus de la tête sans écarter les coudes.',
      'Redescends lentement derrière la tête.',
    ],
    tip: 'Garde les coudes serrés, pointés vers le plafond.',
    errors: ['Coudes qui s’écartent.', 'Dos qui se creuse.', 'Descente brusque derrière la tête.'],
    variants: ['hcurl', 'push'],
    def: { sets: 3, reps: '10-12', restS: 60 },
  },
  curl: {
    name: 'Superset bras',
    group: 'arms',
    muscles: 'Épaules, biceps, triceps',
    equip: ['db', 'bench'],
    type: 'iso',
    only: 'part',
    start: 'Debout, haltères légères en main ; le banc sert pour les extensions triceps.',
    steps: [
      'Élévations latérales : bras presque tendus, monte les haltères à hauteur d’épaules.',
      'Curl marteau : coudes collés au corps, monte les haltères paumes face à face.',
      'Extensions triceps : tends les bras au-dessus de la tête. Enchaîne les trois, puis récupère.',
    ],
    tip: 'Charges légères et mouvements contrôlés.',
    errors: ['Charges trop lourdes : la technique se dégrade dès le deuxième exercice.'],
    variants: ['lat', 'hcurl', 'tri'],
  },
  step: {
    name: 'Step-up sur le banc',
    group: 'legs',
    muscles: 'Quadriceps, fessiers',
    equip: ['db', 'bench'],
    type: 'lunge',
    start: 'Face au banc, haltères le long du corps, un pied posé entièrement sur le banc.',
    steps: [
      'Face au banc, pose un pied entièrement dessus (haltères le long du corps).',
      'Monte en poussant dans le talon du pied posé sur le banc, jusqu’à être debout.',
      'Redescends en contrôle, puis alterne les jambes.',
    ],
    tip: 'L’effort doit venir de la jambe sur le banc : ne te pousse pas avec l’autre jambe.',
    errors: ['Impulsion avec la jambe restée au sol.', 'Genou qui rentre vers l’intérieur.', 'Redescente en se laissant tomber.'],
    variants: ['bulg', 'lunge'],
    def: { sets: 3, reps: '8-10 par jambe', restS: 75, ...BOTH_LEGS(30) },
  },
  squat: {
    name: 'Squat goblet',
    group: 'legs',
    muscles: 'Quadriceps, fessiers, adducteurs',
    equip: ['db', 'bench'],
    type: 'squat',
    start: 'Debout dos au banc, pieds écartés de la largeur des épaules, une haltère tenue verticalement contre la poitrine.',
    steps: [
      'Debout, haltère tenue contre la poitrine à deux mains, pieds écartés de la largeur des épaules.',
      'Descends en reculant les hanches jusqu’à effleurer le banc.',
      'Remonte en poussant dans les talons.',
    ],
    tip: 'Genoux dans l’axe des pieds, dos droit, regard devant.',
    errors: ['S’asseoir et se relâcher sur le banc.', 'Talons qui décollent.', 'Genoux qui rentrent vers l’intérieur.'],
    variants: ['bsquat', 'bulg'],
    def: { sets: 3, reps: '10-12', restS: 75 },
  },
  bsquat: {
    name: 'Squat au poids du corps',
    group: 'legs',
    muscles: 'Quadriceps, fessiers',
    equip: [],
    type: 'squat',
    start: 'Debout, pieds écartés de la largeur des épaules, pointes légèrement ouvertes.',
    steps: [
      'Pieds écartés de la largeur des épaules, bras tendus devant pour l’équilibre.',
      'Descends en 2 s en reculant les hanches, jusqu’aux cuisses parallèles au sol.',
      'Remonte en poussant dans les talons, dos droit.',
    ],
    tip: 'Utile en échauffement ou pour débuter ; passe au squat goblet quand 20 reps deviennent faciles.',
    errors: ['Talons qui décollent.', 'Dos qui s’arrondit en bas.', 'Genoux qui rentrent vers l’intérieur.'],
    variants: ['squat', 'lunge'],
    def: { sets: 3, reps: '15-20', restS: 60, noLoad: true },
  },
  hip: {
    name: 'Hip thrust',
    group: 'legs',
    muscles: 'Fessiers, ischio-jambiers',
    equip: ['db', 'bench'],
    type: 'hinge',
    start: 'Assis au sol, bas des omoplates contre le bord du banc, pieds à plat, haltère en travers des hanches.',
    steps: [
      'Haut du dos appuyé sur le banc, pieds à plat, genoux fléchis (haltère sur les hanches si besoin).',
      'Pousse dans les talons pour monter les hanches jusqu’à aligner épaules, hanches et genoux.',
      'Serre les fessiers 1 s en haut, puis redescends.',
    ],
    tip: 'Menton rentré, sans cambrer le bas du dos en haut du mouvement.',
    errors: ['Bas du dos qui se creuse en haut.', 'Pieds trop loin : ce sont les ischios qui prennent le relais.', 'Poser les fesses entre les reps.'],
    variants: ['bridge', 'rdl'],
    def: { sets: 3, reps: '10-12', restS: 75 },
  },
  bridge: {
    name: 'Pont fessier',
    group: 'legs',
    muscles: 'Fessiers, ischio-jambiers',
    equip: ['mat'],
    type: 'hinge',
    start: 'Allongé sur le dos, genoux fléchis, pieds à plat écartés de la largeur des hanches, bras le long du corps.',
    steps: [
      'Sur le dos, pieds à plat près des fesses, bras tendus au sol le long du corps.',
      'Pousse dans les talons pour monter les hanches jusqu’à aligner épaules, hanches et genoux.',
      'Serre les fessiers 1 s en haut, puis redescends sans poser complètement.',
    ],
    tip: 'Version sans banc du hip thrust : idéale en échauffement ou pour débuter.',
    errors: ['Pousser avec les bras.', 'Bas du dos creusé en haut.', 'Genoux qui s’écartent.'],
    variants: ['hip'],
    def: { sets: 3, reps: '12-15', restS: 60, noLoad: true },
  },
  calf: {
    name: 'Mollets, une jambe',
    group: 'legs',
    muscles: 'Mollets',
    equip: ['db', 'wall'],
    type: 'iso',
    start: 'Debout sur une jambe face à un mur ou un poteau, une main posée dessus pour l’équilibre.',
    steps: [
      'Debout sur une jambe, une main sur un support pour l’équilibre.',
      'Monte sur la pointe du pied aussi haut que possible et marque 1 s en haut.',
      'Redescends lentement, talon le plus bas possible.',
    ],
    tip: 'Amplitude complète : talon bas, puis le plus haut possible.',
    errors: ['Rebondir en bas.', 'Pousser avec la main sur le support.', 'Genou d’appui qui se fléchit.'],
    variants: [],
    def: { sets: 3, reps: '12-15 par jambe', restS: 60, sides: [{ n: 'Pied gauche', d: '' }, { n: 'Pied droit', d: '' }], sideRest: 20 },
  },
  plank: {
    name: 'Planche',
    group: 'core',
    muscles: 'Abdominaux, gainage du tronc, fessiers',
    equip: ['mat'],
    type: 'core',
    start: 'Avant-bras au sol, coudes sous les épaules, pieds écartés de la largeur des hanches.',
    steps: [
      'Appuie-toi sur les avant-bras, coudes sous les épaules.',
      'Aligne tête, hanches et talons, serre abdos et fessiers.',
      'Tiens la durée prévue en respirant normalement.',
    ],
    tip: 'Ne creuse pas le bas du dos : mieux vaut s’arrêter que tenir une position dégradée. Alternative : dead bug.',
    errors: ['Bassin qui s’affaisse.', 'Fesses en l’air.', 'Retenir sa respiration.'],
    variants: ['dead'],
    def: { sets: 3, reps: '30-45 s', restS: 45, hold: [30, 45], noLoad: true },
  },
  dead: {
    name: 'Dead bug',
    group: 'core',
    muscles: 'Abdominaux profonds',
    equip: ['mat'],
    type: 'core',
    start: 'Sur le dos, bras tendus vers le plafond, hanches et genoux pliés à 90°, bas du dos plaqué au sol.',
    steps: [
      'Sur le dos, bras tendus vers le plafond, hanches et genoux à 90°.',
      'Étends un bras vers l’arrière et la jambe opposée, bas du dos collé au sol.',
      'Reviens et alterne. Ajoute ensuite des rotations de buste contrôlées.',
    ],
    tip: 'Si le bas du dos décolle, réduis l’amplitude.',
    errors: ['Bas du dos qui décolle du sol.', 'Mouvements rapides et saccadés.', 'Bloquer sa respiration.'],
    variants: ['plank'],
    def: { sets: 3, reps: '10', restS: 45, noLoad: true },
  },

  /* Mouvements d'échauffement (utilisés dans les échauffements des séances) */
  knee: { name: 'Montées de genoux', group: 'warm', muscles: 'Cardio, hanches', equip: [], type: 'mob', steps: ['Sur place, monte les genoux à hauteur de hanche en balançant les bras.'] },
  legswing: { name: 'Balancés de jambe', group: 'warm', muscles: 'Hanches, ischio-jambiers', equip: ['wall'], type: 'mob', steps: ['Une main au mur, balance une jambe d’avant en arrière en augmentant l’amplitude.'] },
  hinge: { name: 'Bonjour sans charge', group: 'warm', muscles: 'Ischio-jambiers, bas du dos', equip: [], type: 'mob', steps: ['Mains derrière la tête, jambes presque tendues : recule les hanches dos plat, puis remonte.'] },
  catcow: { name: 'Cat-cow', group: 'warm', muscles: 'Mobilité du dos', equip: ['mat'], type: 'mob', steps: ['À quatre pattes, creuse puis arrondis le dos lentement.'] },
  jack: { name: 'Jumping jacks', group: 'warm', muscles: 'Cardio', equip: [], type: 'mob', steps: ['Saute en écartant bras et jambes, puis reviens, à un rythme régulier.'] },
  armcirc: { name: 'Cercles de bras', group: 'warm', muscles: 'Épaules', equip: [], type: 'mob', steps: ['Bras tendus sur les côtés, petits cercles qui s’agrandissent, dans un sens puis dans l’autre.'] },
  shoulder: { name: 'Rotations d’épaules', group: 'warm', muscles: 'Épaules', equip: [], type: 'mob', steps: ['Mains posées sur les épaules, fais de larges cercles avec les coudes.'] },
  rowv: { name: 'Rowing à vide', group: 'warm', muscles: 'Haut du dos', equip: [], type: 'mob', steps: ['Buste penché, dos plat, tire les coudes vers l’arrière en serrant les omoplates.'] },
};

/** Mouvements d'échauffement proposés quand on compose un échauffement (programme personnalisé). */
const WARM_KEYS = ['knee', 'jack', 'armcirc', 'shoulder', 'legswing', 'bsquat', 'bridge', 'hinge', 'catcow', 'rowv'];

/** Étape d'échauffement par défaut pour une clé. */
const WARM_DEFAULTS = {
  knee: { n: 'Montées de genoux sur place', dose: '45 secondes', how: 'Monte les genoux à hauteur de hanche en balançant les bras, sans te fatiguer.', s: 45 },
  jack: { n: 'Jumping jacks', dose: '40 secondes', how: 'Rythme régulier et léger pour faire monter la chaleur et le pouls.', s: 40 },
  armcirc: { n: 'Cercles de bras', dose: '10 vers l’avant, 10 vers l’arrière', how: 'Bras tendus sur les côtés, petits cercles qui s’agrandissent peu à peu.' },
  shoulder: { n: 'Rotations d’épaules', dose: '10 répétitions', how: 'Mains posées sur les épaules, fais de larges cercles avec les coudes.' },
  legswing: { n: 'Balancés de jambe', dose: '10 par jambe', how: 'Une main au mur, balance la jambe d’avant en arrière en augmentant l’amplitude.' },
  bsquat: { n: 'Squats au poids du corps', dose: '12 répétitions', how: 'Pieds largeur d’épaules, descends en reculant les hanches, dos droit, talons au sol.' },
  bridge: { n: 'Pont fessier', dose: '12 répétitions', how: 'Sur le dos, pieds à plat, monte les hanches et serre les fessiers 1 s en haut.' },
  hinge: { n: 'Bonjour sans charge', dose: '10 répétitions', how: 'Mains derrière la tête, recule les hanches en gardant le dos plat, puis remonte.' },
  catcow: { n: 'Cat-cow sur le tapis', dose: '8 répétitions lentes', how: 'À quatre pattes, creuse puis arrondis le dos en alternant.' },
  rowv: { n: 'Rowing à vide', dose: '12 répétitions', how: 'Buste penché, dos plat, tire les coudes vers l’arrière en serrant les omoplates.' },
};

/** Exercices proposés à l'ajout dans un programme personnalisé (hors échauffement et parties de superset). */
const addable = () => Object.keys(EXERCISES).filter((k) => EXERCISES[k].group !== 'warm' && !EXERCISES[k].only);
return { GROUPS, EQUIP, TYPES, EXERCISES, WARM_KEYS, WARM_DEFAULTS, addable };
})();

__m["src/data/figures.js"] = (function () {

/* Poses des figures illustrées (données pures).
   Vue de profil, personnage tourné vers la droite. Repère : x 0→100, y 0→100, sol à y = 91, chevilles à y = 88.
   Chaque figure donne deux poses (a = départ, b = arrivée) interpolées par le rendu (src/ui/figure.js) :
     hip [x,y] · tor (angle du buste, -90 = vertical) · cv (courbure du dos) · ha (angle de la tête)
     f1/f2 : cibles des chevilles, h1/h2 : cibles des mains (résolues par cinématique inverse)
     l1/l2/a1/a2 : [angle segment 1, angle segment 2] pour imposer les angles au lieu d'une cible
     ft1/ft2 : angle des pieds
   Autres propriétés :
     rel   cibles exprimées par rapport au cou (mains) ou à la hanche (pieds)
     s     sens de flexion des genoux (k1,k2) et des coudes (e1,e2)
     db    haltères : 1 = main proche, 2 = deux mains
     mus   muscles travaillés : [segment, face, début, fin]
     cues  repères de technique (vert = verticale jusqu'au sol, line = ligne entre deux points)
     trk   point suivi par la flèche de mouvement · ao : décalage de la flèche
     props matériel (bench, incl, back, pole, mat) · z : zoom · static : pose tenue (gainage)
     pivot [x,y] : position fixe des épaules (pont, hip thrust) ; le bassin tourne autour au lieu de glisser
     loop  rotation continue (pose b = pose a + un tour) · rev : un tour dans chaque sens
     front vue de face (ar = écart des bras, el = flexion du coude, lg = écart des jambes)
     ph    libellés des deux phases du mouvement
   Les tests (tests/unit/data.test.js) vérifient que chaque cible est atteignable et que a et b ont les mêmes clés. */
const FIGURES = {
  bulg: {
    mus: [["thigh1","front",0.1,0.85],["thigh1","back",0,0.35]],
    cues: [{t:"vert",p:"k1",l:"genou au-dessus du pied"},{t:"line",a:"hip",b:"nk",off:-7,l:"buste droit"}],
    db: 2,
    trk: "hip",
    ph: ["Descends","Remonte"],
    rel: ["h1","h2"],
    s: {e1:-1,e2:-1},
    props: [{t:"bench",x1:6,x2:34,y:67,legs:[10,30]}],
    a: {hip:[57,49],tor:-88,f1:[66,88],f2:[24,64],ft2:200,h1:[0,24],h2:[-2,24]},
    b: {hip:[50,64],tor:-80,f1:[66,88],f2:[24,64],ft2:200,h1:[2,24],h2:[0,24]},
  },
  lunge: {
    mus: [["thigh1","front",0.1,0.85],["thigh1","back",0,0.35]],
    cues: [{t:"vert",p:"k1",l:"genou au-dessus du pied"},{t:"line",a:"hip",b:"nk",off:-7,l:"buste droit"}],
    db: 2,
    trk: "hip",
    ph: ["Descends","Remonte"],
    rel: ["h1","h2"],
    s: {e1:-1,e2:-1},
    a: {hip:[47,53.5],tor:-88,f1:[66,88],f2:[26,85],ft2:32,h1:[0,24],h2:[-2,24]},
    b: {hip:[46,65.5],tor:-86,f1:[66,88],f2:[26,85],ft2:32,h1:[1,24],h2:[-1,24]},
  },
  rdl: {
    mus: [["thigh1","back",0.05,0.9],["thigh2","back",0.05,0.9],["torso","back",0.05,0.35]],
    cues: [{t:"line",a:"hip",b:"nk",off:-6,l:"dos plat"},{t:"vert",p:"h1",l:"près des jambes",dx:3,an:"start"}],
    db: 2,
    trk: "hip",
    ph: ["Recule les hanches","Redresse-toi"],
    rel: ["h1","h2"],
    s: {e1:-1,e2:-1},
    a: {hip:[50,49],tor:-88,f1:[52,88],f2:[50,88],h1:[1,24],h2:[-1,24]},
    b: {hip:[38,53],tor:-12,f1:[52,88],f2:[50,88],h1:[-9,23],h2:[-11,23]},
  },
  bench: {
    mus: [["torso","front",0.62,0.95],["uarm1","back",0.15,0.85]],
    cues: [{t:"line",a:"e1",b:"h1",off:3,ext:3,l:"poignet au-dessus du coude",dy:-3}],
    db: 1,
    trk: "h1",
    ph: ["Descends les haltères","Pousse"],
    s: {e1:1,e2:1},
    props: [{t:"bench",x1:14,x2:68,y:71,legs:[18,64]}],
    a: {hip:[60,65],tor:180,l1:[12,95],ft1:0,l2:[14,97],ft2:0,a1:[-87,-90],a2:[-89,-92]},
    b: {hip:[60,65],tor:180,l1:[12,95],ft1:0,l2:[14,97],ft2:0,a1:[52,-90],a2:[50,-92]},
  },
  row: {
    mus: [["torso","back",0.35,0.95],["uarm1","front",0.2,0.85]],
    cues: [{t:"line",a:"hip",b:"nk",off:-6,l:"dos plat",dy:-3}],
    db: 1,
    trk: "h1",
    ph: ["Tire le coude vers la hanche","Redescends"],
    s: {k1:1,k2:1,e1:-1,e2:-1},
    props: [{t:"bench",x1:10,x2:66,y:68,legs:[14,62]}],
    ao: [0,9],
    a: {hip:[30,48.6],tor:-6,f1:[36,88],ft1:0,f2:[12,64],ft2:180,h1:[57,70.5],h2:[58,64]},
    b: {hip:[30,48.6],tor:-6,f1:[36,88],ft1:0,f2:[12,64],ft2:180,h1:[46,52],h2:[58,64]},
  },
  calf: {
    mus: [["shin1","back",0.1,0.6]],
    cues: [{t:"line",a:"f1",b:"nk",off:-9,ext:2,l:"corps bien droit",an:"end",dx:-1}],
    db: 1,
    trk: "hip",
    ph: ["Monte sur la pointe","Redescends lentement"],
    rel: ["h1","f2"],
    s: {k2:1,e1:-1,e2:-1},
    props: [{t:"pole",x:76,y1:6}],
    a: {hip:[51.6,48],tor:-90,l1:[90,90],ft1:0,f2:[-10,30],ft2:60,h1:[0,24],h2:[73,30]},
    b: {hip:[53.7,43.4],tor:-90,l1:[90,90],ft1:50,f2:[-10,30],ft2:60,h1:[0,24],h2:[73,26]},
  },
  plank: {
    mus: [["torso","front",0.1,0.7]],
    cues: [{t:"line",a:"f1",b:"nk",off:-6,ext:3,l:"ligne droite talons-tête",an:"end"}],
    trk: "",
    ph: ["Gaine, respire","Gaine, respire"],
    s: {e1:-1,e2:-1,k1:1,k2:1},
    static: 1,
    props: [{t:"mat",x1:2,x2:96}],
    a: {hip:[45.3,76.5],tor:-10.5,cv:0,l1:[169.5,169.5],ft1:80,l2:[169.5,169.5],ft2:80,h1:[83,86],h2:[81,86]},
    b: {hip:[45.3,76],tor:-10.5,cv:0,l1:[169.5,169.5],ft1:80,l2:[169.5,169.5],ft2:80,h1:[83,86],h2:[81,86]},
  },
  incl: {
    mus: [["torso","front",0.65,0.95],["uarm1","back",0.15,0.85]],
    cues: [{t:"line",a:"e1",b:"h1",off:3,ext:3,l:"avant-bras vertical",dy:-3,an:"start",dx:4}],
    db: 1,
    trk: "h1",
    ph: ["Descends","Pousse"],
    s: {k1:1,k2:1,e1:1,e2:1},
    props: [{t:"incl",p:[[28,50],[52,68],[74,68]],legs:[34,52,70]}],
    a: {hip:[56.5,62.5],tor:-143,f1:[82,88],f2:[78,88],a1:[-86,-89],a2:[-88,-91]},
    b: {hip:[56.5,62.5],tor:-143,f1:[82,88],f2:[78,88],a1:[50,-90],a2:[48,-92]},
  },
  rowb: {
    mus: [["torso","back",0.4,0.95],["uarm1","front",0.2,0.85]],
    cues: [{t:"line",a:"hip",b:"nk",off:-6,l:"dos plat",an:"end"}],
    db: 2,
    trk: "h1",
    ph: ["Tire les coudes","Redescends"],
    rel: ["h1","h2"],
    s: {e1:-1,e2:-1},
    a: {hip:[42,52],tor:-28,f1:[52,88],f2:[50,88],h1:[0,25],h2:[-2,25]},
    b: {hip:[42,52],tor:-28,f1:[52,88],f2:[50,88],h1:[-13,14],h2:[-15,14]},
  },
  ohp: {
    mus: [["uarm1","front",0,0.45],["uarm1","back",0.3,0.9]],
    cues: [{t:"line",a:"hip",b:"nk",off:-6,ext:2,l:"dos calé, sans cambrer",an:"start",dx:-12,dy:-3}],
    db: 1,
    trk: "h1",
    ph: ["Pousse","Redescends"],
    s: {e1:-1,e2:-1},
    props: [{t:"bench",x1:36,x2:64,y:71,legs:[40,60]},{t:"back",x:38.5,y1:34,y2:71}],
    a: {hip:[46,68],tor:-90,l1:[0,90],ft1:0,l2:[2,88],ft2:0,a1:[12,-90],a2:[10,-92]},
    b: {hip:[46,68],tor:-90,l1:[0,90],ft1:0,l2:[2,88],ft2:0,a1:[-84,-88],a2:[-86,-90]},
  },
  step: {
    mus: [["thigh1","front",0.1,0.85],["thigh1","back",0,0.35]],
    cues: [{t:"line",a:"f1",b:"nk",off:-6,ext:2,l:"jambe du banc tendue",an:"end",dx:-3,dy:8}],
    db: 2,
    trk: "hip",
    ph: ["Monte sur le banc","Redescends"],
    rel: ["h1","h2"],
    s: {e1:-1,e2:-1},
    z: 0.8,
    props: [{t:"bench",x1:58,x2:96,y:68,legs:[62,92]}],
    a: {hip:[46,48],tor:-88,f1:[68,66],f2:[45,88],h1:[1,24],h2:[-1,24],ft2:0},
    b: {hip:[66,28],tor:-88,f1:[68,66],f2:[54,58],ft2:40,h1:[1,24],h2:[-1,24]},
  },
  dead: {
    mus: [["torso","front",0.15,0.7]],
    cues: [{t:"line",a:"hip",b:"nk",off:-5,ext:0,l:"bas du dos collé au sol",dy:-1}],
    trk: "h1",
    ph: ["Étends bras et jambe opposés","Reviens"],
    s: {e1:1,e2:1},
    props: [{t:"mat",x1:4,x2:96}],
    a: {hip:[56,84],tor:180,l1:[-90,0],l2:[-92,0],ft1:-90,ft2:-90,a1:[-90,-90],a2:[-92,-92]},
    b: {hip:[56,84],tor:180,l1:[-92,0],l2:[-12,-6],ft1:-90,ft2:-30,a1:[-165,-170],a2:[-92,-92]},
  },
  lat: {
    front: 1,
    db: 1,
    delt: 1,
    ph: ["Monte les bras sur les côtés","Redescends"],
    a: {ar:10,el:8},
    b: {ar:85,el:12},
  },
  hcurl: {
    mus: [["uarm1","front",0.2,0.9]],
    cues: [{t:"line",a:"nk",b:"e1",off:-5,ext:2,l:"coude collé au corps",an:"end"}],
    db: 1,
    trk: "h1",
    ph: ["Monte l’haltère","Redescends"],
    s: {e1:-1,e2:-1},
    rel: ["h2"],
    a: {hip:[50,48],tor:-90,f1:[52,88],f2:[50,88],a1:[92,88],h2:[-1,24]},
    b: {hip:[50,48],tor:-90,f1:[52,88],f2:[50,88],a1:[95,-60],h2:[-1,24]},
  },
  tri: {
    /* avant-bras : 110° (derrière la tête) → 268° (= -92°, vers le haut) en passant par l'arrière, jamais devant le visage */
    mus: [["uarm1","back",0.2,0.9]],
    cues: [{t:"line",a:"nk",b:"e1",off:5,ext:2,l:"coudes au plafond",an:"start",dx:1}],
    db: 1,
    trk: "h1",
    ph: ["Tends les bras","Redescends derrière la tête"],
    props: [{t:"bench",x1:28,x2:62,y:71,legs:[32,58]}],
    a: {hip:[44,68],tor:-90,l1:[0,90],ft1:0,l2:[2,88],ft2:0,a1:[-100,110],a2:[-102,108]},
    b: {hip:[44,68],tor:-90,l1:[0,90],ft1:0,l2:[2,88],ft2:0,a1:[-95,268],a2:[-97,266]},
  },
  hip: {
    mus: [["thigh1","back",0,0.45],["thigh1","back",0.45,0.9]],
    cues: [{t:"line",a:"nk",b:"k1",off:-6,ext:3,l:"épaules-hanches-genoux alignés",dy:-9,dx:-24}],
    db: 1,
    trk: "hip",
    ph: ["Monte les hanches","Redescends"],
    s: {k1:1,k2:1,e1:-1,e2:-1},
    pivot: [29.5,62.5],
    props: [{t:"bench",x1:6,x2:32,y:66,legs:[10,28]}],
    a: {hip:[50,80],tor:-141,f1:[72,88],f2:[70,88],h1:[51,76],h2:[49,76]},
    b: {hip:[55,62],tor:-178,f1:[72,88],f2:[70,88],h1:[53,59],h2:[51,59]},
  },
  squat: {
    db: 1,
    trk: "hip",
    ph: ["Descends jusqu’au banc","Remonte"],
    rel: ["h1","h2"],
    s: {e1:-1,e2:-1},
    mus: [["thigh1","front",0.1,0.85],["thigh1","back",0,0.35]],
    cues: [{t:"vert",p:"f1",l:"talons au sol",dx:2,an:"start"}],
    props: [{t:"bench",x1:10,x2:36,y:68,legs:[14,32]}],
    a: {hip:[50,49],tor:-90,f1:[54,88],f2:[52,88],h1:[7,9],h2:[5,9]},
    b: {hip:[36,63],tor:-60,f1:[54,88],f2:[52,88],h1:[8,8],h2:[6,8]},
  },
  bsquat: {
    mus: [["thigh1","front",0.1,0.85],["thigh1","back",0,0.35]],
    cues: [{t:"vert",p:"f1",l:"talons au sol",dx:2,an:"start"}],
    trk: "hip",
    ph: ["Descends","Remonte"],
    rel: ["h1","h2"],
    s: {e1:1,e2:1},
    a: {hip:[50,49],tor:-90,f1:[52,88],f2:[50,88],a1:[0,0],a2:[2,2]},
    b: {hip:[38,66],tor:-55,f1:[52,88],f2:[50,88],a1:[0,0],a2:[2,2]},
  },
  hinge: {
    mus: [["thigh1","back",0.05,0.9],["thigh2","back",0.05,0.9]],
    cues: [{t:"line",a:"hip",b:"nk",off:-6,l:"dos plat"}],
    trk: "hip",
    ph: ["Recule les hanches","Redresse-toi"],
    s: {e1:1,e2:1},
    a: {hip:[50,49],tor:-88,f1:[52,88],f2:[50,88],a1:[-60,170],a2:[-62,168]},
    b: {hip:[38,53],tor:-15,f1:[52,88],f2:[50,88],a1:[13,243],a2:[11,241]},
  },
  bridge: {
    mus: [["thigh1","back",0,0.45]],
    cues: [{t:"line",a:"nk",b:"k1",off:-6,ext:3,l:"hanches hautes",dy:-3}],
    trk: "hip",
    ph: ["Monte les hanches","Redescends"],
    s: {k1:1,k2:1},
    pivot: [28,85],
    props: [{t:"mat",x1:4,x2:96}],
    a: {hip:[54,84],tor:177.8,ha:180,f1:[74,88],f2:[72,88],a1:[6,0],a2:[5,-1]},
    b: {hip:[49.2,70],tor:144.7,ha:178,f1:[74,88],f2:[72,88],a1:[6,0],a2:[5,-1]},
  },
  push: {
    mus: [["torso","front",0.62,0.95],["uarm1","back",0.15,0.85]],
    cues: [{t:"line",a:"f1",b:"nk",off:-6,ext:2,l:"corps gainé, aligné",an:"end"}],
    trk: "nk",
    ph: ["Descends la poitrine","Repousse"],
    s: {e1:-1,e2:-1},
    props: [{t:"bench",x1:58,x2:96,y:68,legs:[62,92]}],
    a: {hip:[49.6,60.6],tor:-40.7,l1:[139.3,139.3],ft1:60,l2:[140.3,140.3],ft2:60,h1:[70,66],h2:[68,66]},
    b: {hip:[55.2,69.2],tor:-25.5,l1:[154.5,154.5],ft1:60,l2:[155.5,155.5],ft2:60,h1:[70,66],h2:[68,66]},
  },
  catcow: {
    trk: "",
    ph: ["Arrondis le dos","Creuse le dos"],
    s: {e1:1,e2:1},
    mus: [["torso","back",0.15,0.85]],
    props: [{t:"mat",x1:4,x2:96}],
    a: {hip:[34,66],tor:-6,cv:5,l1:[90,180],ft1:180,l2:[92,180],ft2:180,a1:[88,90],a2:[90,92]},
    b: {hip:[34,66],tor:-6,cv:-6,l1:[90,180],ft1:180,l2:[92,180],ft2:180,a1:[88,90],a2:[90,92]},
  },
  jack: {
    front: 1,
    ph: ["Écarte bras et jambes","Reviens"],
    a: {ar:8,el:4,lg:3},
    b: {ar:160,el:10,lg:17},
  },
  pushf: {
    mus: [["torso","front",0.62,0.95],["uarm1","back",0.15,0.85]],
    cues: [{t:"line",a:"f1",b:"nk",off:-6,ext:2,l:"corps gainé, aligné",an:"end"}],
    trk: "nk",
    ph: ["Descends la poitrine","Repousse le sol"],
    s: {e1:-1,e2:-1},
    a: {hip:[54,72.5],tor:-18,l1:[162,162],ft1:76,l2:[163,163],ft2:76,h1:[77,89],h2:[75,89]},
    b: {hip:[55.9,81.9],tor:-4.5,l1:[175.5,175.5],ft1:80,l2:[176.5,176.5],ft2:80,h1:[77,89],h2:[75,89]},
  },
  armcirc: {
    front: 1,
    loop: 1,
    rev: 1,
    circ: {d:22,r:3.2},
    ph: ["Cercles dans un sens","Puis dans l’autre"],
    a: {lg:6,ph:0},
    b: {lg:6,ph:360},
  },
  shoulder: {
    loop: 1,
    trk: ["e1"],
    ph: ["Grands cercles avec les coudes","Grands cercles avec les coudes"],
    mus: [["uarm1","front",0,0.6]],
    a: {hip:[50,49],tor:-90,f1:[52,88],f2:[50,88],a1:[90,-96],a2:[95,-91]},
    b: {hip:[50,49],tor:-90,f1:[52,88],f2:[50,88],a1:[-270,-456],a2:[-265,-451]},
  },
  knee: {
    mus: [["thigh1","front",0.1,0.8],["thigh2","front",0.1,0.8]],
    trk: "",
    ph: ["Genou gauche","Genou droit"],
    s: {e1:-1,e2:-1},
    a: {hip:[50,49],tor:-90,l1:[0,90],ft1:0,l2:[90,90],a1:[110,-40],a2:[60,10],ft2:0},
    b: {hip:[50,49],tor:-90,l1:[90,90],l2:[0,90],ft2:0,a1:[60,10],a2:[110,-40],ft1:0},
  },
  legswing: {
    mus: [["thigh1","front",0.05,0.6]],
    trk: "f1",
    ph: ["Jambe vers l’arrière","Jambe vers l’avant"],
    s: {e1:1},
    props: [{t:"pole",x:79,y1:6}],
    a: {hip:[52,49],tor:-90,l1:[125,125],l2:[90,90],a1:[30,0],h2:[76,29]},
    b: {hip:[52,49],tor:-90,l1:[45,45],l2:[90,90],a1:[30,0],h2:[76,29]},
  },
};

/* Vignette du superset d'Axel : même figure que le curl marteau. */
FIGURES.curl = FIGURES.hcurl;

/* Rowing à vide (échauffement) : même mouvement que le rowing buste penché, sans haltères. */
FIGURES.rowv = { ...FIGURES.rowb, db: 0 };
return { FIGURES };
})();

__m["src/core/program.js"] = (function () {
const { EXERCISES } = __m["src/data/exercises.js"];
const { FIGURES } = __m["src/data/figures.js"];
/* Lecture des données d'un programme : fonctions pures partagées par le moteur, les statistiques et l'interface. */



const isCircuit = (program) => program.mode === 'circuit';

/** Nom affiché : nom court du programme, sinon le nom sans sa précision entre parenthèses. */
const displayName = (ex) => ex.s || ex.n.split(' (')[0];

/** Fiche de la bibliothèque complétée par les précisions du programme. */
const sheetOf = (ex) => {
  const lib = EXERCISES[ex.k] || {};
  return {
    name: ex.n || lib.name || ex.k,
    muscles: ex.mus || lib.muscles || '',
    group: lib.group || 'warm',
    steps: ex.steps || lib.steps || (ex.how ? [ex.how] : []),
    tip: ex.tip || lib.tip || '',
    start: lib.start || '',
    errors: lib.errors || [],
    equip: lib.equip || [],
    type: lib.type || '',
    variants: (lib.variants || []).filter((k) => EXERCISES[k]),
  };
};

const sessionById = (program, id) => program.seances.find((s) => s.id === id) || program.seances[0];

/** Tous les exercices du programme, sans doublon d'identifiant. */
function allExercises(program) {
  const seen = new Map();
  for (const se of program.seances) for (const ex of se.exos) if (!seen.has(ex.id)) seen.set(ex.id, ex);
  return [...seen.values()];
}

/** Exercices du programme, puis ceux des autres programmes du profil (program.known) : l'historique d'un exercice
    qui n'est plus dans le programme actif reste lisible (records, courbes, détail des séances). */
const trackedExercises = (program) => allExercises(program).concat(program.known || []);

/** Retrouve un exercice par identifiant stable ou, pour l'ancien historique, par nom. */
function exerciseIndex(program) {
  const byId = new Map();
  const byName = new Map();
  for (const ex of trackedExercises(program)) {
    if (byId.has(ex.id)) continue;
    byId.set(ex.id, ex);
    for (const name of [ex.n, ...(ex.aka || [])]) if (!byName.has(name)) byName.set(name, ex);
  }
  return {
    byId,
    byName,
    /** row = ligne d'historique { xid?, ex } */
    of: (row) => (row.xid && byId.get(row.xid)) || byName.get(row.ex) || null,
  };
}

/** Unité de la valeur « r » d'une série : secondes pour le gainage, sinon répétitions. */
const unitOf = (ex, rowName = '') =>
  (ex && (ex.hold || ex.timed)) || (!ex && /planche|gainage/i.test(rowName)) ? 's' : 'reps';

/** Nombre de séries prévues pour un exercice (tours du circuit ou séries du programme). */
const setsCount = (program, ex, tours) => (isCircuit(program) ? tours : ex.sets);

/** Étapes d'une série : parties d'un superset, ou les deux côtés (ordre alterné à chaque série). */
function partsOf(ex, setIndex) {
  if (ex.parts) return ex.parts;
  if (!ex.sides) return null;
  return setIndex % 2 ? ex.sides.slice().reverse() : ex.sides;
}

/** Objectif affiché en grand : « 6–10 » + « reps par jambe ». */
function goalOf(ex) {
  if (ex.hold) return { big: ex.hold[0] + '–' + ex.hold[1], small: 'secondes de gainage' };
  const m = String(ex.reps || '').match(/^([\d\s\-–]+)(.*)$/);
  if (!m) return { big: String(ex.reps || ''), small: '' };
  return { big: m[1].trim().replace('-', '–'), small: ('reps ' + m[2].trim()).trim() };
}

/** Haut de la fourchette de répétitions (« 6-10 par jambe » → 10), 0 si l'exercice est en durée. */
function topReps(ex) {
  if (!ex.reps || ex.hold || /\d\s*s\b/.test(ex.reps)) return 0;
  const m = ex.reps.match(/\d+/g);
  return m ? +(m[1] || m[0]) : 0;
}

/** Durée indicative en minutes, échauffement compris (c'est une estimation, affichée avec « ≈ »). */
function estimateMinutes(program, session, tours) {
  if (!isCircuit(program)) {
    if (session.dur) return session.dur;
    // séance personnalisée : environ 40 s d'effort par série (par côté pour un exercice unilatéral) + les repos
    const sec = session.exos.reduce((a, ex) => a + ex.sets * ((ex.sides ? 2 : 1) * (ex.hold ? ex.hold[1] : 40) + (ex.sides ? ex.sideRest || 0 : 0) + (ex.restS || 0)), 0);
    return session.exos.length ? Math.round(sec / 60 + (session.warm ? session.warm.min : 0)) : 0;
  }
  const P = program.params;
  const n = session.exos.length;
  const sec = tours * n * (P.work + P.rest) + (tours - 1) * P.restTour;
  return Math.round(sec / 60 + (session.warm ? session.warm.min : 0));
}

/** Vérifie la cohérence des données d'un programme. Renvoie la liste des problèmes (vide = tout va bien). */
function validateProgram(program) {
  const errs = [];
  const need = (ok, msg) => ok || errs.push(program.key + ' : ' + msg);
  need(['sets', 'circuit'].includes(program.mode), 'mode inconnu ' + program.mode);
  need(Number.isInteger(program.goal) && program.goal > 0, 'objectif hebdomadaire invalide');
  need(Array.isArray(program.seances) && program.seances.length > 0, 'aucune séance');
  if (isCircuit(program)) {
    const P = program.params || {};
    for (const f of ['work', 'rest', 'restTour', 'tours']) need(P[f] > 0, 'params.' + f + ' manquant');
  }
  const ids = new Map();
  const sids = new Set();
  for (const se of program.seances || []) {
    need(se.id && !sids.has(se.id), 'identifiant de séance manquant ou en double : ' + se.id);
    sids.add(se.id);
    for (const f of ['short', 'title', 'sub']) need(typeof se[f] === 'string' && se[f], se.id + ' : ' + f + ' manquant');
    need(se.warm && Array.isArray(se.warm.steps), se.id + ' : échauffement manquant');
    for (const w of (se.warm && se.warm.steps) || []) {
      need(FIGURES[w.k], se.id + ' : figure inconnue « ' + w.k + ' » (échauffement)');
      need(w.n && w.dose && w.how, se.id + ' : étape d’échauffement incomplète (' + w.k + ')');
      need(w.s == null || w.s > 0, se.id + ' : durée d’échauffement invalide (' + w.k + ')');
    }
    need(Array.isArray(se.exos) && se.exos.length > 0, se.id + ' : aucun exercice');
    for (const ex of se.exos || []) {
      const at = se.id + '/' + ex.id;
      need(ex.id, se.id + ' : exercice sans identifiant');
      const other = ids.get(ex.id);
      need(!other || other === ex.n, at + ' : identifiant réutilisé pour un autre exercice');
      ids.set(ex.id, ex.n);
      need(FIGURES[ex.k], at + ' : figure inconnue « ' + ex.k + ' »');
      need(EXERCISES[ex.k], at + ' : fiche d’exercice inconnue « ' + ex.k + ' »');
      const sh = sheetOf(ex);
      need(sh.steps.length > 0 && sh.muscles, at + ' : consignes ou muscles manquants');
      if (!isCircuit(program)) {
        need(Number.isInteger(ex.sets) && ex.sets > 0, at + ' : nombre de séries invalide');
        need(ex.restS > 0, at + ' : repos (restS) manquant');
        need(ex.hold || ex.reps, at + ' : objectif (reps ou hold) manquant');
        if (ex.hold) need(ex.hold.length === 2 && ex.hold[0] > 0 && ex.hold[0] < ex.hold[1], at + ' : hold invalide');
        if (ex.sides) need(ex.sides.length === 2 && ex.sides.every((p) => p.n), at + ' : côtés invalides');
        if (ex.sideRest != null) need(ex.sides && ex.sideRest > 0, at + ' : sideRest sans côtés');
        for (const p of ex.parts || []) {
          need(p.n, at + ' : partie de superset sans nom');
          need(!p.k || FIGURES[p.k], at + ' : figure inconnue « ' + p.k + ' » (superset)');
        }
      }
    }
  }
  return errs;
}
return { isCircuit, displayName, sheetOf, sessionById, allExercises, trackedExercises, exerciseIndex, unitOf, setsCount, partsOf, goalOf, topReps, estimateMinutes, validateProgram };
})();

__m["src/core/store.js"] = (function () {
const { isDay, today, num, uid } = __m["src/core/util.js"];
const { exerciseIndex, isCircuit } = __m["src/core/program.js"];
/* Données de l'utilisateur : validation, migration, sauvegarde locale, fusion entre onglets, import / export.

   Tout reste dans le navigateur (localStorage). Clés utilisées pour un programme « axel » :
     sport:axel             état courant (format v3 : sur-ensemble compatible des formats v2 et v1, relisible par
                            les versions précédentes de l'appli)
     sport:axel:backup-v1   copie brute des données d'origine (format v1), écrite une seule fois avant leur migration
     sport:axel:backup-v2   copie brute des données de la version 2, écrite une seule fois avant leur passage en v3
     sport:axel:plans       programmes personnalisés (voir core/plans.js)
     sport:axel:snap        copie de sécurité automatique (au plus une par jour) : { day, raw }
     sport:axel:illisible   données brutes qu'on n'a pas su relire (jamais effacées automatiquement)

   Règle d'or : aucune donnée existante n'est écrasée sans qu'une copie relisible ait été conservée. */



const SCHEMA = 3;
const KG_STEPS = [0.5, 1, 2, 2.5];
const MAX_TXT = 24;
const MAX_NOTE = 2000;
const THEMES = ['auto', 'dark', 'light'];

const txt = (v, max = MAX_TXT) => (['string', 'number', 'boolean'].includes(typeof v) ? String(v).slice(0, max) : '');
const posNum = (v) => {
  const n = typeof v === 'number' || typeof v === 'string' ? Number(v) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const isObj = (o) => !!o && typeof o === 'object' && !Array.isArray(o);
const hasSeries = (draft) => Object.values(draft.sets).some((sets) => sets.some((s) => s && (s.d || s.r !== '' || s.k !== '')));
const hasProgress = (draft) => !!draft && !!(draft.note || draft.t0 || draft.run || hasSeries(draft));

/** État vide pour un programme. */
function blank(program) {
  return {
    v: SCHEMA,
    history: [],
    drafts: {},
    rides: [],
    cur: program.seances[0].id,
    opt: { sound: true, vib: true, theme: 'dark', goal: 0, kgStep: 1 },
    exp: '',
    expN: 0,
    uns: 0,
    mt: 0,
  };
}

const cleanSet = (s) => {
  const o = { r: txt(s.r), k: txt(s.k) };
  if (Array.isArray(s.p)) o.p = s.p.slice(0, 6).map((z) => ({ r: txt(z && z.r), k: txt(z && z.k) }));
  return o;
};

/** Volume d'une liste de lignes : somme des reps × charge saisies (les parties d'un superset comptent chacune). */
const volumeOf = (rows) =>
  rows.reduce(
    (a, r) => a + r.sets.reduce((b, s) => b + (s.p ? s.p.reduce((c, z) => c + num(z.r) * num(z.k), 0) : num(s.r) * num(s.k)), 0),
    0,
  );

/** Valide et répare une séance d'historique. Renvoie null si elle est inexploitable. */
function cleanEntry(h, i, program) {
  if (!isObj(h) || !isDay(h.date) || !Array.isArray(h.rows) || (h.id == null && i == null)) return null;
  const idx = exerciseIndex(program);
  const rows = h.rows
    .filter((r) => isObj(r) && typeof r.ex === 'string' && Array.isArray(r.sets))
    .map((r) => {
      const row = { ex: txt(r.ex, 120), sets: r.sets.filter(isObj).slice(0, 30).map(cleanSet) };
      const ex = idx.of({ xid: typeof r.xid === 'string' ? r.xid : '', ex: row.ex });
      if (ex) row.xid = ex.id;
      else if (typeof r.xid === 'string' && r.xid) row.xid = txt(r.xid, 40);
      return row;
    });
  const short = txt(h.short, 120);
  // séance d'origine : identifiant enregistré (même s'il appartient à un autre programme du profil), sinon, pour
  // l'ancien format sans identifiant, retrouvée par son nom parmi les séances du programme de base
  const sid = typeof h.sid === 'string' && /^[\w-]{1,60}$/.test(h.sid) ? h.sid : '';
  const se = sid ? null : (program.legacy || program.seances).find((s) => s.short === short);
  const out = {
    id: h.id != null ? txt(h.id, 40) : 'old' + i,
    date: String(h.date),
    sid: sid || (se ? se.id : ''),
    short,
    title: txt(h.title, 160),
    tours: posNum(h.tours),
    rows,
    note: txt(h.note, MAX_NOTE),
    vol: posNum(h.vol) || volumeOf(rows),
    dur: Math.min(600, posNum(h.dur)),
    at: posNum(h.at),
  };
  if (typeof h.pid === 'string' && /^p[\w-]{2,40}$/.test(h.pid)) out.pid = h.pid;
  return out;
}

/** se = séance du programme actif, ou null pour le brouillon d'une séance d'un autre programme du profil (gardé tel
    quel, borné, pour le retrouver quand on revient à ce programme). */
function cleanDraft(d, program, se) {
  if (!isObj(d) || !isObj(d.sets)) return null;
  const tours = posNum(d.tours);
  const circuit = se ? isCircuit(program) : tours > 0;
  const sets = {};
  for (const x of Object.keys(d.sets)) {
    const a = d.sets[x];
    if (!/^\d+$/.test(x) || +x >= (se ? se.exos.length : 20) || !Array.isArray(a)) continue;
    sets[x] = a.slice(0, 30).map((z) => (isObj(z) ? { ...cleanSet(z), d: !!z.d } : { r: '', k: '', d: false }));
  }
  const out = {
    date: isDay(d.date) ? d.date : today(),
    tours: circuit ? (Number.isInteger(tours) && tours >= 1 && tours <= 5 ? tours : se ? program.params.tours : 2) : 0,
    sets,
    note: txt(d.note, MAX_NOTE),
    t0: posNum(d.t0),
    t1: posNum(d.t1),
  };
  if (isObj(d.run) && Number.isInteger(d.run.i) && d.run.i >= 0) {
    const t = d.run.timer;
    out.run = {
      i: d.run.i,
      pt: Number.isInteger(d.run.pt) && d.run.pt >= 0 ? d.run.pt : 0,
      timer: isObj(t) ? { end: posNum(t.end), left: posNum(t.left), total: posNum(t.total), side: !!t.side } : null,
      at: posNum(d.run.at),
    };
  }
  return out;
}

/** Transforme n'importe quelle valeur relue (ancien format, fichier modifié, stockage abîmé) en état valide. */
function normalize(o, program) {
  const src = isObj(o) ? o : {};
  const s = blank(program);

  const seen = new Set();
  s.history = (Array.isArray(src.history) ? src.history : [])
    .map((h, i) => cleanEntry(h, i, program))
    .filter((h) => h && !seen.has(h.id) && seen.add(h.id));

  s.rides = [...new Set((Array.isArray(src.rides) ? src.rides : []).map(String).filter(isDay))].sort();

  const drafts = isObj(src.drafts) ? src.drafts : {};
  for (const sid of Object.keys(drafts).slice(0, 40)) {
    if (!/^[\w-]{1,60}$/.test(sid) || sid === '__proto__') continue;
    const se = program.seances.find((x) => x.id === sid) || null;
    const d = cleanDraft(drafts[sid], program, se);
    // brouillon d'une séance inconnue du programme actif : gardé seulement s'il contient une saisie
    if (d && (se || hasProgress(d))) s.drafts[sid] = d;
  }

  if (program.seances.some((x) => x.id === src.cur)) s.cur = src.cur;

  const opt = isObj(src.opt) ? src.opt : {};
  const legacyMute = !!src.mute && !isObj(src.opt); // format v1 : un seul réglage « son et vibrations »
  s.opt = {
    sound: legacyMute ? false : opt.sound !== false,
    vib: legacyMute ? false : opt.vib !== false,
    theme: THEMES.includes(opt.theme) ? opt.theme : 'dark',
    goal: Number.isInteger(opt.goal) && opt.goal >= 1 && opt.goal <= 7 ? opt.goal : 0,
    kgStep: KG_STEPS.includes(opt.kgStep) ? opt.kgStep : 1,
  };

  s.exp = isDay(String(src.exp)) ? String(src.exp) : '';
  s.expN = posNum(src.expN);
  // séances pas encore exportées (compteur ; à défaut, ancien calcul par différence)
  const uns = src.uns != null ? Math.round(+src.uns) || 0 : s.history.length - s.expN;
  s.uns = Math.max(0, Math.min(s.history.length, uns));
  s.mt = posNum(src.mt);
  return s;
}

/** Relit un texte JSON. Renvoie null s'il est illisible. */
function parseState(raw, program) {
  try {
    const o = JSON.parse(raw);
    return isObj(o) ? normalize(o, program) : null;
  } catch (e) {
    return null;
  }
}

/** Référence de synchronisation : ce que contenait le stockage la dernière fois qu'on l'a lu ou écrit. */
const baseOf = (state) => ({ ids: new Set(state.history.map((h) => h.id)), rides: new Set(state.rides) });

/** Fusion à trois voies entre l'état local et celui d'un autre onglet (remote).
    - historique et sorties : on part du distant, on ajoute ce qui a été créé ici, on retire ce qui a été supprimé ici ;
    - brouillons et réglages : la version locale ne gagne que si elle a été modifiée ici depuis la dernière synchronisation. */
function mergeStates(local, remote, base, dirty) {
  const out = { ...remote };

  const localIds = new Set(local.history.map((h) => h.id));
  const byId = new Map(remote.history.map((h) => [h.id, h]));
  let added = 0;
  for (const h of local.history) {
    if (!base.ids.has(h.id) && !byId.has(h.id)) {
      byId.set(h.id, h);
      added++;
    }
  }
  let removed = 0;
  for (const id of base.ids) if (!localIds.has(id) && byId.delete(id)) removed++;
  out.history = [...byId.values()];

  const rides = new Set(remote.rides);
  const localRides = new Set(local.rides);
  for (const d of local.rides) if (!base.rides.has(d)) rides.add(d);
  for (const d of base.rides) if (!localRides.has(d)) rides.delete(d);
  out.rides = [...rides].sort();

  out.drafts = { ...remote.drafts };
  for (const scope of dirty) {
    if (!scope.startsWith('draft:')) continue;
    const sid = scope.slice(6);
    if (local.drafts[sid]) out.drafts[sid] = local.drafts[sid];
    else delete out.drafts[sid];
  }
  if (dirty.has('cur')) out.cur = local.cur;
  if (dirty.has('opt')) out.opt = local.opt;
  if (dirty.has('exp')) {
    out.exp = local.exp;
    out.expN = local.expN;
    out.uns = local.uns;
  } else {
    out.uns = remote.uns + added - removed;
  }
  out.uns = Math.max(0, Math.min(out.history.length, out.uns));
  out.mt = Math.max(local.mt, remote.mt);
  return out;
}

/* ---------- Import / export ---------- */

/** Fichier de sauvegarde : état complet, plus les programmes personnalisés s'il y en a. */
const exportPayload = (state, program, plans = null) => {
  const o = { app: program.key, v: SCHEMA, at: today(), data: state };
  if (plans && plans.plans && plans.plans.length) o.plans = { plans: plans.plans, active: plans.active || '' };
  return o;
};

const signature = (h) => JSON.stringify([
  h.date, h.rows.map((r) => [r.ex, r.sets.map((s) => [s.r, s.k, s.p?.map((p) => [p.r, p.k])])]),
]);
const generatedLegacyId = (id) => /^(?:old\d+|imp[\da-z]+)$/.test(id);

/** Fusionne l'historique des sauvegardes v1 à v3 et lit la configuration si demandée. */
function importInto(state, text, program, { restore = false } = {}) {
  let j;
  if (typeof text !== 'string' || text.length > 5e6) return { ok: false, error: 'Données non reconnues.' };
  try {
    j = JSON.parse(text);
  } catch (e) {
    return { ok: false, error: 'Données non reconnues : ce n’est pas un fichier de sauvegarde valide.' };
  }
  if (!isObj(j)) return { ok: false, error: 'Données non reconnues.' };
  if (j.app && j.app !== program.key) return { ok: false, error: 'Ces données appartiennent à un autre programme.' };
  const d = isObj(j.data) ? j.data : j;
  if (!Array.isArray(d.history)) return { ok: false, error: 'Données non reconnues : aucun historique dans ce fichier.' };

  const ids = new Set(state.history.map((h) => h.id));
  const sigs = new Set(state.history.map(signature));
  const version = posNum(j.v ?? d.v);
  const legacy = version < 2;
  let added = 0;
  let dup = 0;
  let invalid = 0;
  d.history.forEach((raw, i) => {
    if (!isObj(raw)) return void invalid++;
    const id = typeof raw.id === 'string' ? raw.id.trim() : typeof raw.id === 'number' ? String(raw.id) : '';
    const h = cleanEntry({ ...raw, id: id || 'imp' + uid() + i }, null, program);
    if (!h || !h.rows.length) return void invalid++;
    // Les identifiants artificiels « oldN » peuvent désigner des séances différentes selon la sauvegarde.
    const legacyId = generatedLegacyId(h.id);
    const sig = signature(h);
    if ((!legacyId && ids.has(h.id)) || ((legacy || !id || legacyId) && sigs.has(sig))) return void dup++;
    if (ids.has(h.id)) h.id = 'imp' + uid() + i;
    ids.add(h.id);
    sigs.add(sig);
    state.history.push(h);
    added++;
  });
  const before = state.rides.length;
  state.rides = [...new Set([...state.rides, ...(Array.isArray(d.rides) ? d.rides.filter(isDay) : [])])].sort();
  state.uns = Math.min(state.history.length, state.uns + added);
  const res = { ok: true, added, dup, invalid, rides: state.rides.length - before, plans: isObj(j.plans) && Array.isArray(j.plans.plans) ? j.plans.plans : [] };
  if (restore) {
    res.configuration = {
      opt: d.opt,
      mute: d.mute,
      drafts: d.drafts,
      cur: d.cur,
      active: typeof j.plans?.active === 'string' ? j.plans.active : j.app && version >= 3 ? '' : undefined,
    };
  }
  return res;
}

/** Historique au format tableur (CSV, séparateur « ; », une ligne par série). */
function toCSV(state) {
  const q = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const lines = [['date', 'seance', 'exercice', 'serie', 'partie', 'reps_ou_secondes', 'charge_kg', 'duree_min', 'note'].join(';')];
  const sorted = state.history.slice().sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  for (const h of sorted) {
    for (const r of h.rows) {
      r.sets.forEach((s, i) => {
        const parts = s.p && s.p.length ? s.p : [s];
        parts.forEach((z, j) => {
          lines.push([h.date, q(h.short || h.title), q(r.ex), i + 1, s.p ? j + 1 : '', q(z.r), q(z.k), h.dur || '', q(h.note)].join(';'));
        });
      });
    }
  }
  return '﻿' + lines.join('\r\n') + '\r\n';
}

/* ---------- Stockage ---------- */

class Store {
  /**
   * @param {object} o
   * @param {object} o.program  programme (src/data/programs)
   * @param {Storage} o.storage  localStorage ou équivalent
   * @param {(status:string)=>void} [o.onWriteError]  appelé une fois si l'écriture échoue
   */
  constructor({ program, storage, onWriteError = () => {}, delay = 300 }) {
    this.program = program;
    this.storage = storage;
    this.key = 'sport:' + program.key;
    this.onWriteError = onWriteError;
    this.delay = delay;
    this.state = blank(program);
    this.base = baseOf(this.state);
    this.dirty = new Set();
    this.pinned = null;
    this.lastRaw = null;
    this.timer = null;
    this.writeFailed = false;
    /** 'empty' | 'ok' | 'migrated' | 'recovered' | 'reset' */
    this.status = 'empty';
  }

  read(key) {
    try {
      return this.storage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  write(key, value) {
    try {
      this.storage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  /** Charge l'état. Ne lève jamais d'exception : au pire, on repart d'un état vide en gardant une copie de l'illisible. */
  load() {
    const raw = this.read(this.key);
    if (raw == null || raw === '') {
      this.status = 'empty';
      return this.status;
    }
    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parsed = null;
    }
    if (isObj(parsed)) {
      const legacy = parsed.v !== SCHEMA;
      // copie brute avant toute transformation, une seule fois par ancien format (jamais réécrite)
      const backup = this.key + (parsed.v === 2 ? ':backup-v2' : ':backup-v1');
      if (legacy && this.read(backup) == null) this.write(backup, raw);
      this.state = normalize(parsed, this.program);
      this.status = legacy ? 'migrated' : 'ok';
      this.lastRaw = raw;
      this.base = baseOf(this.state);
      this.snapshot(raw);
      if (legacy) {
        this.dirty.add('opt');
        this.flush();
      }
      return this.status;
    }
    // Données illisibles : on en garde une copie, puis on tente la copie de sécurité automatique.
    this.write(this.key + ':illisible', raw);
    const snap = this.readSnapshot();
    const fromSnap = snap ? parseState(snap.raw, this.program) : null;
    if (fromSnap) {
      this.state = fromSnap;
      this.status = 'recovered';
    } else {
      this.status = 'reset';
    }
    this.base = baseOf(this.state);
    return this.status;
  }

  readSnapshot() {
    try {
      const s = JSON.parse(this.read(this.key + ':snap') || 'null');
      return isObj(s) && typeof s.raw === 'string' && isDay(String(s.day)) ? s : null;
    } catch (e) {
      return null;
    }
  }

  /** Copie de sécurité : l'état relu avec succès au premier lancement du jour. */
  snapshot(raw) {
    const s = this.readSnapshot();
    if (s && s.day === today()) return;
    this.write(this.key + ':snap', JSON.stringify({ day: today(), raw }));
  }

  /** Remplace l'historique par l'union avec celui de la copie de sécurité (rien n'est supprimé). */
  restoreSnapshot() {
    const snap = this.readSnapshot();
    if (!snap) return { ok: false, error: 'Aucune copie de sécurité disponible.' };
    return this.import(snap.raw);
  }

  /** Change de programme actif (programme personnalisé ↔ programme de base) sans rien perdre : l'historique et les
      brouillons des autres séances sont conservés tels quels. */
  setProgram(program) {
    this.flushIfDirty();
    const cur = this.state.cur;
    this.program = program;
    this.state = normalize(this.state, program);
    this.base = baseOf(this.state);
    if (this.state.cur !== cur) this.touch('cur');
  }

  /* ----- lecture ----- */

  get goal() {
    return this.state.opt.goal || this.program.goal;
  }

  /** Brouillon de la séance (créé au besoin). */
  draft(sid, defaults) {
    const d = this.state.drafts;
    if (!d[sid]) d[sid] = { date: today(), tours: 0, sets: {}, note: '', t0: 0, t1: 0, ...defaults };
    return d[sid];
  }

  hasDraft(sid) {
    return hasProgress(this.state.drafts[sid]);
  }

  /* ----- modifications ----- */

  /** Signale une modification (scope : 'cur', 'opt', 'exp', 'draft:<id>', 'history', 'rides') et planifie l'écriture. */
  touch(scope) {
    this.dirty.add(scope);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), this.delay);
  }

  addEntry(entry) {
    this.state.history.push(entry);
    this.state.uns = Math.min(this.state.history.length, this.state.uns + 1);
    this.flush();
  }

  /** Enregistre l'historique et retire le brouillon ensemble. Un échec laisse la saisie en place. */
  commitSession(sid, entry) {
    return !this.storage.volatile && this.flush((state) => {
      const drafts = { ...state.drafts };
      delete drafts[sid];
      const exists = state.history.some((h) => h.id === entry.id);
      return {
        ...state,
        drafts,
        history: exists ? state.history : [...state.history, entry],
        uns: exists ? state.uns : Math.min(state.history.length + 1, state.uns + 1),
      };
    });
  }

  /** Supprime une séance et la renvoie (pour pouvoir annuler). */
  removeEntry(id) {
    const i = this.state.history.findIndex((h) => h.id === id);
    if (i < 0) return null;
    const [h] = this.state.history.splice(i, 1);
    this.state.uns = Math.min(this.state.uns, this.state.history.length);
    this.flush();
    return h;
  }

  clearDraft(sid) {
    delete this.state.drafts[sid];
    this.dirty.add('draft:' + sid);
    this.flush();
  }

  toggleRide(day) {
    const r = this.state.rides;
    this.state.rides = r.includes(day) ? r.filter((x) => x !== day) : r.concat(day).sort();
    this.touch('rides');
  }

  markExported() {
    this.state.exp = today();
    this.state.expN = this.state.history.length;
    this.state.uns = 0;
    this.dirty.add('exp');
    this.flush();
  }

  import(text, options) {
    if (this.storage.volatile) return { ok: false, error: 'Import impossible : le stockage de cet appareil est indisponible.' };
    let result;
    const saved = this.flush((state) => {
      const next = { ...state, history: [...state.history] };
      result = importInto(next, text, this.program, options);
      return result.ok ? next : null;
    });
    return saved || !result.ok ? result : { ok: false, error: 'Import impossible : l’historique n’a pas pu être enregistré.' };
  }

  restoreConfiguration(configuration, allowedSessions) {
    const imported = normalize(configuration, this.program);
    const hasOptions = isObj(configuration.opt) || typeof configuration.mute === 'boolean';
    const conflicts = [];
    let restored = 0;
    const saved = this.flush((state) => {
      const drafts = { ...state.drafts };
      for (const [sid, draft] of Object.entries(imported.drafts)) {
        if (!hasProgress(draft)) continue;
        if (!allowedSessions.has(sid) || (hasProgress(drafts[sid]) && JSON.stringify(drafts[sid]) !== JSON.stringify(draft))) {
          conflicts.push(sid);
        } else if (!hasProgress(drafts[sid])) {
          drafts[sid] = draft;
          restored++;
        }
      }
      const hasSession = this.program.seances.some((se) => se.id === configuration.cur) && allowedSessions.has(configuration.cur);
      return { ...state, drafts, opt: hasOptions ? imported.opt : state.opt, cur: hasSession ? imported.cur : state.cur };
    });
    return { saved, restored, conflicts, hasOptions };
  }

  /** La séance guidée garde une référence sur son brouillon : il ne doit pas être remplacé par celui d'un autre onglet. */
  pin(sid) {
    this.pinned = sid;
  }

  /* ----- synchronisation ----- */

  dirtyScopes() {
    const d = new Set(this.dirty);
    if (this.pinned) d.add('draft:' + this.pinned);
    return d;
  }

  /** Intègre l'état écrit par un autre onglet. Renvoie true si quelque chose a été repris. */
  absorb(raw) {
    if (raw == null || raw === this.lastRaw) return false;
    const remote = parseState(raw, this.program);
    if (!remote) return false;
    const merged = mergeStates(this.state, remote, this.base, this.dirtyScopes());
    Object.assign(this.state, merged);
    this.base = baseOf(remote);
    this.lastRaw = raw;
    return true;
  }

  /** Écrit immédiatement (après avoir repris les éventuelles modifications d'un autre onglet). */
  flush(update = (state) => state) {
    this.absorb(this.read(this.key));
    const state = update(this.state);
    if (!state) return false;
    clearTimeout(this.timer);
    this.timer = null;
    state.v = SCHEMA;
    state.mt = Date.now();
    state.mute = !state.opt.sound; // lisible par l'ancienne version en cas de retour en arrière
    const json = JSON.stringify(state);
    let ok = this.write(this.key, json);
    if (!ok) {
      // Stockage plein : la copie de sécurité automatique est sacrifiée en premier, jamais les données courantes.
      try {
        this.storage.removeItem(this.key + ':snap');
      } catch (e) {
        /* stockage indisponible */
      }
      ok = this.write(this.key, json);
    }
    if (ok) {
      Object.assign(this.state, state);
      this.lastRaw = json;
      this.base = baseOf(this.state);
      this.dirty.clear();
      this.writeFailed = false;
    } else if (!this.writeFailed) {
      this.writeFailed = true;
      this.onWriteError();
    }
    return ok;
  }

  /** Écrit s'il reste des modifications en attente (mise en arrière-plan, fermeture). */
  flushIfDirty() {
    if (this.timer || this.dirty.size) this.flush();
  }
}
return { SCHEMA, KG_STEPS, blank, volumeOf, cleanEntry, normalize, parseState, baseOf, mergeStates, exportPayload, importInto, toCSV, Store };
})();

__m["src/core/plans.js"] = (function () {
const { EXERCISES, WARM_DEFAULTS } = __m["src/data/exercises.js"];
const { FIGURES } = __m["src/data/figures.js"];
const { validateProgram, allExercises, isCircuit } = __m["src/core/program.js"];
const { uid, restText } = __m["src/core/util.js"];
/* Programmes personnalisés (fonctions pures + stockage).

   Chaque page (axel, coralie) est un profil : un programme de base défini dans le code, plus des programmes
   personnalisés créés dans l'appli. Ceux-ci sont rangés dans une clé à part :
     sport:<profil>:plans            { v: 1, plans: [plan…], active: '' | id, mt }
     sport:<profil>:plans-illisible  données de programmes qu'on n'a pas su relire (jamais effacées)
   Raison : la clé principale garde le format relu par la version 2 ; un retour en arrière ne touche donc pas aux
   programmes personnalisés, qui réapparaissent au retour en version 3.

   Identifiants :
     - un exercice garde l'identifiant de la bibliothèque (sa clé k) ou celui du programme de base dont il est copié :
       son historique reste rattaché, quel que soit le programme où il apparaît ;
     - une variante est un autre exercice (autre clé, autre identifiant, historique séparé) ;
     - une séance d'un programme personnalisé a un identifiant propre, préfixé par celui du programme. */





const PLAN_FORMAT = 1;
const MAX_PLANS = 20;
const MAX_SESSIONS = 7;
const MAX_EXOS = 15;

const isObj = (o) => !!o && typeof o === 'object' && !Array.isArray(o);
const txt = (v, max) => (typeof v === 'string' ? v.slice(0, max) : typeof v === 'number' ? String(v).slice(0, max) : '');
const int = (v, lo, hi) => (Number.isInteger(+v) && +v >= lo && +v <= hi ? +v : null);
const clone = (o) => JSON.parse(JSON.stringify(o));

/* ---------- Nettoyage (tout ce qui vient du stockage ou d'un fichier importé) ---------- */

function cleanExercise(e, circuit) {
  if (!isObj(e) || typeof e.k !== 'string' || !EXERCISES[e.k] || !FIGURES[e.k]) return null;
  const id = txt(e.id, 40);
  if (!/^[\w-]{1,40}$/.test(id)) return null;
  const o = { id, k: e.k, n: txt(e.n, 120) || EXERCISES[e.k].name };
  if (e.s) o.s = txt(e.s, 60);
  for (const f of ['tip', 'load', 'sideNote', 'note']) if (e[f]) o[f] = txt(e[f], 600);
  if (e.yt) o.yt = txt(e.yt, 120);
  if (Array.isArray(e.steps) && e.steps.length) o.steps = e.steps.slice(0, 8).map((s) => txt(s, 400)).filter(Boolean);
  if (Array.isArray(e.aka)) o.aka = e.aka.slice(0, 5).map((s) => txt(s, 120)).filter(Boolean);
  if (circuit) {
    if (e.timed) o.timed = true;
    return o;
  }
  o.sets = int(e.sets, 1, 10) || 3;
  o.restS = int(e.restS, 10, 600) || 90;
  o.rest = restText(o.restS);
  if (e.noLoad) o.noLoad = true;
  if (Array.isArray(e.hold) && int(e.hold[0], 5, 600) && int(e.hold[1], 5, 600) && +e.hold[0] < +e.hold[1]) {
    o.hold = [+e.hold[0], +e.hold[1]];
    o.reps = o.hold[0] + '-' + o.hold[1] + ' s';
  } else o.reps = txt(e.reps, 40) || '8-12';
  if (Array.isArray(e.sides) && e.sides.length === 2 && e.sides.every((p) => isObj(p) && p.n)) {
    o.sides = e.sides.map((p) => ({ n: txt(p.n, 60), d: txt(p.d, 120) }));
    if (int(e.sideRest, 5, 300)) o.sideRest = +e.sideRest;
  }
  if (Array.isArray(e.parts) && e.parts.length >= 2) {
    o.parts = e.parts.slice(0, 4).filter(isObj).map((p) => {
      const q = { n: txt(p.n, 60) || 'Partie', d: txt(p.d, 120) };
      if (typeof p.k === 'string' && FIGURES[p.k]) q.k = p.k;
      if (Array.isArray(p.how)) q.how = p.how.slice(0, 6).map((s) => txt(s, 300)).filter(Boolean);
      return q;
    });
  }
  return o;
}

function cleanWarm(w) {
  if (!isObj(w) || typeof w.k !== 'string' || !FIGURES[w.k]) return null;
  const o = { k: w.k, n: txt(w.n, 120), dose: txt(w.dose, 80), how: txt(w.how, 400) };
  if (!o.n || !o.dose || !o.how) return null;
  if (int(w.s, 5, 600)) o.s = +w.s;
  if (int(w.rest, 5, 600)) o.rest = +w.rest;
  return o;
}

function cleanSession(se, circuit) {
  if (!isObj(se) || !/^[\w-]{1,60}$/.test(String(se.id))) return null;
  const title = txt(se.title, 120) || 'Séance';
  const steps = (isObj(se.warm) && Array.isArray(se.warm.steps) ? se.warm.steps : []).slice(0, 12).map(cleanWarm).filter(Boolean);
  const seen = new Set();
  const exos = (Array.isArray(se.exos) ? se.exos : []).slice(0, MAX_EXOS).map((e) => cleanExercise(e, circuit)).filter((e) => e && !seen.has(e.id) && seen.add(e.id));
  return {
    id: String(se.id),
    short: txt(se.short, 60) || title,
    tab: txt(se.tab, 40) || txt(se.short, 40) || title.slice(0, 40),
    title,
    sub: txt(se.sub, 300) || 'Séance personnalisée.',
    dur: int(se.dur, 1, 300) || 0,
    warm: { min: int(isObj(se.warm) && se.warm.min, 0, 30) ?? 5, steps },
    exos,
  };
}

/** Nettoie un programme personnalisé relu. Renvoie null s'il est inexploitable. Un programme « brouillon »
    (séance encore vide) est accepté ici : la validation complète a lieu avant de l'utiliser (planErrors). */
function cleanPlan(raw) {
  if (!isObj(raw) || !/^p[\w-]{2,40}$/.test(String(raw.id))) return null;
  const mode = raw.mode === 'circuit' ? 'circuit' : 'sets';
  const circuit = mode === 'circuit';
  const ids = new Set();
  const seances = (Array.isArray(raw.seances) ? raw.seances : []).slice(0, MAX_SESSIONS).map((s) => cleanSession(s, circuit)).filter((s) => s && !ids.has(s.id) && ids.add(s.id));
  if (!seances.length) return null;
  const plan = {
    id: String(raw.id),
    name: txt(raw.name, 60) || 'Mon programme',
    mode,
    goal: int(raw.goal, 1, 7) || 2,
    from: txt(raw.from, 60),
    at: Number.isFinite(+raw.at) && +raw.at > 0 ? +raw.at : 0,
    mt: Number.isFinite(+raw.mt) && +raw.mt > 0 ? +raw.mt : 0,
    seances,
  };
  if (circuit) {
    const P = isObj(raw.params) ? raw.params : {};
    plan.params = { work: int(P.work, 10, 300) || 40, rest: int(P.rest, 5, 300) || 20, restTour: int(P.restTour, 10, 600) || 90, tours: int(P.tours, 1, 5) || 2 };
  }
  if (Array.isArray(raw.info)) plan.info = raw.info.slice(0, 6).filter(isObj).map((b) => ({ h: txt(b.h, 80), items: (Array.isArray(b.items) ? b.items : []).slice(0, 10).map((i) => txt(i, 400)).filter(Boolean) })).filter((b) => b.h && b.items.length);
  if (raw.finisher) plan.finisher = txt(raw.finisher, 400);
  return plan;
}

/* ---------- Programme effectif ---------- */

/** Exercices de tous les programmes du profil (base et personnalisés), pour relier l'historique quel que soit le
    programme actif. */
function knownOf(base, plans, current) {
  const seen = new Set(allExercises(current).map((e) => e.id));
  const out = [];
  for (const p of [base, ...plans]) {
    for (const se of p.seances) for (const e of se.exos) if (!seen.has(e.id)) seen.add(e.id) && out.push(e);
  }
  return out;
}

/** Programme utilisé par le moteur et l'interface : le programme de base, ou un programme personnalisé complété des
    informations du profil (clé de stockage, apparence, prénom). */
function effectiveProgram(base, plans = [], active = '') {
  const plan = active ? plans.find((p) => p.id === active) : null;
  if (!plan || planErrors(base, plan).length) {
    const p = { ...base, plan: '', planName: base.planName || 'Programme de ' + base.name, legacy: base.seances };
    p.known = knownOf(base, plans, p);
    return p;
  }
  const p = {
    key: base.key,
    name: base.name,
    look: base.look,
    mode: plan.mode,
    goal: plan.goal,
    title: plan.name,
    sub: plan.seances.length + ' séance' + (plan.seances.length > 1 ? 's' : '') + ' · programme personnalisé',
    seances: plan.seances,
    info: plan.info || [],
    finisher: plan.finisher || '',
    plan: plan.id,
    planName: plan.name,
    legacy: base.seances,
  };
  if (plan.params) p.params = plan.params;
  p.known = knownOf(base, plans, p);
  return p;
}

/** Problèmes empêchant d'utiliser un programme (vide = utilisable). */
function planErrors(base, plan) {
  const errs = [];
  for (const se of plan.seances) if (!se.exos.length) errs.push('La séance « ' + se.title + ' » n’a aucun exercice.');
  if (errs.length) return errs;
  const prog = { key: base.key, mode: plan.mode, goal: plan.goal, params: plan.params, seances: plan.seances };
  return validateProgram(prog).map((e) => e.replace(base.key + ' : ', ''));
}

/* ---------- Construction ---------- */

const sessionId = (plan) => {
  const used = new Set(plan.seances.map((s) => s.id));
  for (let n = plan.seances.length + 1; ; n++) if (!used.has(plan.id + '-s' + n)) return plan.id + '-s' + n;
};

/** Exercice prêt à ajouter : copie de celui du programme de base s'il existe (mêmes consignes, même identifiant),
    sinon prescription proposée par la bibliothèque. */
function exerciseFor(k, base, mode) {
  const circuit = mode === 'circuit';
  const fromBase = allExercises(base).find((e) => e.id === k && e.k === k);
  if (fromBase && isCircuit(base) === circuit) return clone(fromBase);
  const lib = EXERCISES[k];
  const d = lib.def || {};
  if (circuit) return { id: k, k, n: lib.name, ...(d.hold ? { timed: true } : {}) };
  const e = { id: k, k, n: lib.name, sets: d.sets || 3, reps: d.reps || '8-12', restS: d.restS || 90 };
  e.rest = restText(e.restS);
  if (d.hold) e.hold = d.hold.slice();
  if (d.noLoad || d.hold) e.noLoad = true;
  if (d.sides) {
    e.sides = clone(d.sides);
    e.sideRest = d.sideRest || 20;
  }
  if (fromBase) for (const f of ['steps', 'tip', 'load', 'sideNote', 'yt']) if (fromBase[f]) e[f] = clone(fromBase[f]);
  return e;
}

const defaultWarm = (keys = ['knee', 'armcirc', 'bsquat', 'catcow']) => ({ min: 5, steps: keys.map((k) => ({ k, ...WARM_DEFAULTS[k] })) });

/** Nouvelle séance vide d'un programme. */
function addSession(plan, title = '') {
  const n = plan.seances.length + 1;
  const t = title || 'Séance ' + n;
  const se = { id: sessionId(plan), short: t, tab: t, title: t, sub: 'Séance personnalisée.', dur: 0, warm: defaultWarm(), exos: [] };
  plan.seances.push(se);
  return se;
}

/** Copie d'une séance (nouvel identifiant, mêmes exercices). */
function copySession(plan, se) {
  const c = clone(se);
  c.id = sessionId(plan);
  c.title = (se.title + ' (copie)').slice(0, 120);
  c.short = (se.short + ' (copie)').slice(0, 60);
  c.tab = (se.tab + ' (copie)').slice(0, 40);
  plan.seances.splice(plan.seances.indexOf(se) + 1, 0, c);
  return c;
}

/** Programme personnalisé vide. */
function newPlan(base, { name = 'Mon programme', mode = 'sets', now = Date.now() } = {}) {
  const plan = { id: 'p' + uid(now), name: name.slice(0, 60), mode, goal: mode === 'circuit' ? 1 : 2, from: '', at: now, mt: now, seances: [] };
  if (mode === 'circuit') plan.params = { work: 40, rest: 20, restTour: 90, tours: 2 };
  addSession(plan, mode === 'circuit' ? 'Circuit' : 'Séance 1');
  return plan;
}

/** Copie d'un programme (de base ou personnalisé) en programme personnalisé modifiable.
    Les identifiants d'exercices sont conservés (l'historique suit) ; les séances reçoivent de nouveaux identifiants. */
function duplicatePlan(program, { name, now = Date.now() } = {}) {
  const id = 'p' + uid(now);
  const plan = {
    id,
    name: (name || 'Copie de ' + (program.planName || program.title || program.name)).slice(0, 60),
    mode: program.mode,
    goal: program.goal,
    from: program.plan || program.key,
    at: now,
    mt: now,
    seances: program.seances.map((se, i) => ({ ...clone(se), id: id + '-s' + (i + 1) })),
  };
  if (program.params) plan.params = clone(program.params);
  if (program.info && program.info.length) plan.info = clone(program.info);
  if (program.finisher) plan.finisher = program.finisher;
  return cleanPlan(plan);
}

/** Déplace un élément d'une liste (d = -1 vers le haut, 1 vers le bas). Renvoie true si quelque chose a bougé. */
function move(list, i, d) {
  const j = i + d;
  if (i < 0 || j < 0 || i >= list.length || j >= list.length) return false;
  [list[i], list[j]] = [list[j], list[i]];
  return true;
}

/* ---------- Fusion entre onglets ---------- */

/** Fusion à trois voies, comme l'historique : base = identifiants vus à la dernière synchronisation. */
function mergePlans(local, remote, base, dirty) {
  const byId = new Map(remote.plans.map((p) => [p.id, p]));
  const localIds = new Set(local.plans.map((p) => p.id));
  for (const p of local.plans) {
    const r = byId.get(p.id);
    if (!r) {
      if (!base.has(p.id)) byId.set(p.id, p); // créé ici
    } else if ((p.mt || 0) > (r.mt || 0)) byId.set(p.id, p); // modifié ici plus récemment
  }
  for (const id of base) if (!localIds.has(id)) byId.delete(id); // supprimé ici
  const plans = [...byId.values()].sort((a, b) => (a.at || 0) - (b.at || 0));
  let active = dirty ? local.active : remote.active;
  if (active && !plans.some((p) => p.id === active)) active = '';
  return { v: PLAN_FORMAT, plans, active, mt: Math.max(local.mt || 0, remote.mt || 0) };
}

/* ---------- Stockage ---------- */

class PlanStore {
  constructor({ base, storage, onWriteError = () => {} }) {
    this.base = base;
    this.storage = storage;
    this.key = 'sport:' + base.key + ':plans';
    this.onWriteError = onWriteError;
    this.state = { v: PLAN_FORMAT, plans: [], active: '', mt: 0 };
    this.seen = new Set();
    this.dirtyActive = false;
    this.lastRaw = null;
  }

  read() {
    try {
      return this.storage.getItem(this.key);
    } catch (e) {
      return null;
    }
  }

  /** Relit un texte stocké. Les programmes illisibles sont mis de côté, jamais perdus. */
  parse(raw) {
    let o = null;
    try {
      o = JSON.parse(raw);
    } catch (e) {
      o = null;
    }
    if (!isObj(o) || !Array.isArray(o.plans)) return { state: null, rejected: raw };
    const plans = [];
    const rejected = [];
    const ids = new Set();
    for (const r of o.plans.slice(0, MAX_PLANS)) {
      const p = cleanPlan(r);
      if (p && !ids.has(p.id)) {
        ids.add(p.id);
        plans.push(p);
      } else rejected.push(r);
    }
    const active = typeof o.active === 'string' && ids.has(o.active) ? o.active : '';
    return { state: { v: PLAN_FORMAT, plans, active, mt: +o.mt || 0 }, rejected: rejected.length ? JSON.stringify(rejected) : null };
  }

  quarantine(text) {
    try {
      const k = this.key + '-illisible';
      const prev = this.storage.getItem(k);
      if (prev && prev.includes(text)) return;
      this.storage.setItem(k, (prev ? prev + '\n' : '') + text);
    } catch (e) {
      /* stockage indisponible */
    }
  }

  load() {
    const raw = this.read();
    if (raw == null || raw === '') return 'empty';
    const { state, rejected } = this.parse(raw);
    if (rejected) this.quarantine(rejected);
    if (!state) return 'reset';
    this.state = state;
    this.seen = new Set(state.plans.map((p) => p.id));
    this.lastRaw = raw;
    return rejected ? 'partial' : 'ok';
  }

  get plans() {
    return this.state.plans;
  }

  get active() {
    return this.state.active;
  }

  get(id) {
    return this.state.plans.find((p) => p.id === id) || null;
  }

  /** Remplace ou ajoute un programme (après nettoyage). Renvoie le programme enregistré ou null. */
  put(plan, now = Date.now()) {
    const p = cleanPlan({ ...plan, mt: now });
    if (!p) return null;
    const i = this.state.plans.findIndex((x) => x.id === p.id);
    if (i >= 0) this.state.plans[i] = p;
    else {
      if (this.state.plans.length >= MAX_PLANS) return null;
      this.state.plans.push(p);
    }
    return this.save() ? p : null;
  }

  remove(id) {
    this.state.plans = this.state.plans.filter((p) => p.id !== id);
    if (this.state.active === id) {
      this.state.active = '';
      this.dirtyActive = true;
    }
    return this.save();
  }

  setActive(id) {
    return this.save((state) => ({ ...state, active: id && this.get(id) ? id : '' }));
  }

  /** Intègre l'état écrit par un autre onglet. Renvoie true si quelque chose a changé. */
  absorb(raw) {
    if (raw == null || raw === this.lastRaw) return false;
    const { state } = this.parse(raw);
    if (!state) return false;
    this.state = mergePlans(this.state, state, this.seen, this.dirtyActive);
    this.seen = new Set(state.plans.map((p) => p.id));
    this.lastRaw = raw;
    return true;
  }

  save(update = (state) => state) {
    this.absorb(this.read());
    const next = update(this.state);
    if (!next) return true;
    next.mt = Date.now();
    const json = JSON.stringify(next);
    let ok = false;
    try {
      this.storage.setItem(this.key, json);
      ok = true;
    } catch (e) {
      this.onWriteError();
    }
    if (ok) {
      this.state = next;
      this.lastRaw = json;
      this.seen = new Set(this.state.plans.map((p) => p.id));
      this.dirtyActive = false;
    }
    return ok;
  }

  /** Ajoute les programmes d'une sauvegarde (jamais de remplacement). */
  importPlans(list) {
    let added = 0;
    const saved = this.save((state) => {
      const plans = [...state.plans];
      for (const raw of Array.isArray(list) ? list : []) {
        const plan = cleanPlan(raw);
        if (!plan || plans.some((p) => p.id === plan.id) || plans.length >= MAX_PLANS) continue;
        plans.push(plan);
        added++;
      }
      return added ? { ...state, plans } : null;
    });
    return saved ? added : null;
  }
}
return { PLAN_FORMAT, MAX_PLANS, cleanPlan, effectiveProgram, planErrors, exerciseFor, defaultWarm, addSession, copySession, newPlan, duplicatePlan, move, mergePlans, PlanStore };
})();

__m["src/ui/dom.js"] = (function () {
const { esc } = __m["src/core/util.js"];
/* Outils d'interface : sélection, annonces, messages, boîtes de dialogue, écrans superposés (avec bouton « retour »). */


const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Annonce un message aux lecteurs d'écran. */
function announce(text) {
  const el = $('#sr');
  if (!el) return;
  el.textContent = '';
  setTimeout(() => (el.textContent = text), 50);
}

let toastTimer = 0;
/** Message bref en bas d'écran, avec une action facultative (« Annuler »). */
function toast(text, { action = '', onAction = null, ms = 3200 } = {}) {
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
function openOverlay(el, { onClose, canClose = () => true }) {
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
function closeOverlay(entry) {
  if (!entry || !stack.includes(entry)) return;
  finishClose(entry);
  sync();
}

const overlayOpen = () => stack.length > 0;

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
function dialog({ title, text = '', html = '', actions, read = null }) {
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
const confirm = (title, text, yes, kind = 'danger') =>
  dialog({ title, text, actions: [{ label: yes, value: true, kind }, { label: 'Annuler', value: false, kind: 'quiet' }] }).then((v) => v === true);

/** Champ − / + pour saisir un nombre au pouce. hint = valeur proposée (adoptée au premier appui si le champ est vide). */
const stepper = (id, label, value, { hint = '', step = 1 } = {}) =>
  `<div class="stl"><span id="${id}-l">${esc(label)}</span><div class="stp" data-step="${step}"><button type="button" data-st="${id}" data-d="-1" aria-label="${esc(label)} : moins">−</button>` +
  `<input id="${id}" inputmode="decimal" autocomplete="off" enterkeyhint="done" aria-labelledby="${id}-l" value="${esc(value)}" placeholder="${esc(hint || '–')}" data-hint="${esc(hint)}">` +
  `<button type="button" data-st="${id}" data-d="1" aria-label="${esc(label)} : plus">+</button></div></div>`;

/** Branche les boutons − / + présents dans root. onInput(id, valeur) est appelé à chaque changement. */
function bindSteppers(root, onInput = () => {}) {
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
function download(filename, text, type) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(new Blob([text], { type }));
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
return { $, $$, announce, toast, openOverlay, closeOverlay, overlayOpen, dialog, confirm, stepper, bindSteppers, download };
})();

__m["src/ui/figure.js"] = (function () {
const { FIGURES } = __m["src/data/figures.js"];
const { esc } = __m["src/core/util.js"];
/* Figures illustrées : poses interpolées + cinématique inverse, rendu SVG (corps en volume, matériel,
   muscles travaillés, repères de technique, flèche de mouvement).
   pose() et figureSVG() sont pures (testables sans navigateur) ; paintFigures() et l'animation touchent au DOM. */



const DG = Math.PI / 180;
const GROUND = 91;
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
function ik(o, tg, l1, l2, s) {
  const dx = tg[0] - o[0];
  const dy = tg[1] - o[1];
  const b = Math.atan2(dy, dx);
  const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(l1 - l2) + 0.01), l1 + l2 - 0.01);
  const a = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d));
  const j = [o[0] + Math.cos(b - s * a) * l1, o[1] + Math.sin(b - s * a) * l1];
  const c = Math.atan2(tg[1] - j[1], tg[0] - j[0]);
  return [j, [j[0] + Math.cos(c) * l2, j[1] + Math.sin(c) * l2]];
}

const LIMB = { leg: [20, 20], arm: [13, 12], torso: 26 };

/** Vue de face : épaule, coude et main de chaque bras (sg = -1 bras gauche de l'image, 1 bras droit).
    Deux modes : angles (ar = écart du bras, el = flexion du coude), ou cercle (circ) où la main, bras tendu, décrit un
    cercle de rayon circ.r dans le plan de l'image autour d'un point situé à circ.d de l'épaule (phase q.ph, en degrés). */
function frontArms(E, q, fem = false) {
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
function pose(E, t) {
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
function cueLayout(q, cues) {
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
function figureSVG(key, t, { look = 'm', cues = false, label = '', dir = 0 } = {}) {
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
function animState(E, c, stepped = false) {
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
const figTag = (key, { t = 1, cues = false, cls = '' } = {}) =>
  `<svg class="fig ${cls}" viewBox="0 0 100 100" data-k="${esc(key)}" data-t="${t}"${cues ? ' data-cues="1"' : ''} aria-hidden="true" focusable="false"></svg>`;

/** Balise d'une figure animée (avec libellé de phase et repères). */
const figAnimTag = (key) =>
  `<svg class="fig" viewBox="0 0 100 100" data-k="${esc(key)}" data-anim="1" role="img" aria-label="Illustration animée du mouvement"></svg>`;

let look = 'm';
let raf = 0;
let lastFrame = 0;
let lastStep = -1;
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function setLook(l) {
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
function paintFigures(root = document) {
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
return { GROUND, ik, LIMB, frontArms, pose, cueLayout, figureSVG, animState, figTag, figAnimTag, setLook, paintFigures };
})();

__m["src/ui/audio.js"] = (function () {

/* Signaux de la séance : bips (Web Audio), vibrations, écran maintenu allumé.
   Tout est facultatif : chaque API absente ou refusée est ignorée sans bloquer la séance. */

let ctx = null;
let wakeLock = null;
let opts = { sound: true, vib: true };
let wantAwake = false;

function setSignalOptions(o) {
  opts = { sound: o.sound !== false, vib: o.vib !== false };
}

/** À appeler lors d'un geste de l'utilisateur (obligatoire pour autoriser le son sur mobile). */
function unlockAudio() {
  try {
    // « ambient » : les bips se mélangent à la musique en cours (iOS 17+) au lieu de la couper
    if (navigator.audioSession && navigator.audioSession.type !== 'ambient') navigator.audioSession.type = 'ambient';
  } catch (e) {
    /* API absente */
  }
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = ctx || new AC();
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
  } catch (e) {
    ctx = null;
  }
}

function beep(freq, dur, delay = 0) {
  if (!ctx || !opts.sound) return;
  const play = () => {
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const t = ctx.currentTime + delay;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.05);
    } catch (e) {
      /* contexte audio fermé */
    }
  };
  if (ctx.state === 'running') play();
  else ctx.resume().then(play).catch(() => {});
}

const PATTERNS = {
  go: () => { beep(660, 0.2); beep(880, 0.3, 0.13); },
  rest: () => { beep(587, 0.25); beep(440, 0.4, 0.15); },
  end: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.7, i * 0.16)),
  tick: () => beep(880, 0.12),
  ok: () => beep(880, 0.12),
};
const VIBES = { go: [60, 50, 120], rest: [120], end: [80, 60, 80, 60, 200], tick: 25, ok: 40 };

/** Joue un signal : 'tick' | 'go' | 'rest' | 'ok' | 'end'. */
function signal(name) {
  (PATTERNS[name] || PATTERNS.ok)();
  if (opts.vib) {
    try {
      navigator.vibrate && navigator.vibrate(VIBES[name] || 40);
    } catch (e) {
      /* vibration indisponible (iOS) */
    }
  }
}

function tap() {
  if (!opts.vib) return;
  try {
    navigator.vibrate && navigator.vibrate(10);
  } catch (e) {
    /* indisponible */
  }
}

/* ----- écran allumé pendant la séance ----- */

function requestWake() {
  try {
    if (!wantAwake || document.hidden || !navigator.wakeLock || (wakeLock && !wakeLock.released)) return;
    navigator.wakeLock.request('screen').then((l) => (wakeLock = l)).catch(() => {});
  } catch (e) {
    /* API absente */
  }
}

function keepAwake(on) {
  wantAwake = on;
  if (on) return requestWake();
  try {
    wakeLock && wakeLock.release();
  } catch (e) {
    /* déjà libéré */
  }
  wakeLock = null;
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // en arrière-plan, on rend la main à la musique ; le contexte est réveillé au prochain bip
      try {
        ctx && ctx.state === 'running' && ctx.suspend();
      } catch (e) {
        /* contexte fermé */
      }
    } else requestWake(); // le verrou d'écran est libéré par le système à chaque mise en arrière-plan
  });
}
return { setSignalOptions, unlockAudio, signal, tap, keepAwake };
})();

__m["src/ui/charts.js"] = (function () {
const { esc, fmtNum } = __m["src/core/util.js"];
/* Graphiques SVG sans dépendance. Une seule série par graphique (couleur d'accent), valeurs lisibles au toucher :
   chaque point ou barre porte data-tip, affiché sous le graphique par bindCharts(). */


const f1 = (n) => n.toFixed(1);

/** Mini-courbe sans axes (liste de progression). */
function sparkline(values) {
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
function lineChart(points, { unit = '', title = '' } = {}) {
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
function barChart(bars, { goal = 0, title = '' } = {}) {
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
function bindCharts(root) {
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
function ringMeter(frac, { big = '', small = '', title = '', size = 92 } = {}) {
  const r = 40, C = 2 * Math.PI * r, f = Math.max(0, Math.min(1, frac));
  return `<div class="meter-ring" style="width:${size}px;height:${size}px" role="img" aria-label="${esc(title)}"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle class="rb" cx="50" cy="50" r="${r}"/><circle class="rf${f >= 1 ? ' full' : ''}" cx="50" cy="50" r="${r}" stroke-dasharray="${f1(C)}" stroke-dashoffset="${f1(C * (1 - f))}"/></svg><div><b>${esc(big)}</b>${small ? `<span>${esc(small)}</span>` : ''}</div></div>`;
}

/** Barres horizontales (répartition) : items [{ label, v, tip }]. */
function hbars(items, { unit = '' } = {}) {
  const max = Math.max(1, ...items.map((i) => i.v));
  return `<div class="hbars">${items.map((i) => `<div class="hb"><span class="hl">${esc(i.label)}</span><span class="ht"><i style="width:${Math.max(3, Math.round((100 * i.v) / max))}%"></i></span><b>${esc(fmtNum(i.v))}${unit ? ' ' + esc(unit) : ''}</b></div>`).join('')}</div>`;
}

/** Variation entre deux valeurs : « ▲ +3 », « ▼ −2 », « = ». */
function deltaTag(cur, prev, { unit = '', invert = false } = {}) {
  if (prev == null) return '';
  const d = Math.round((cur - prev) * 10) / 10;
  if (!d) return '<span class="dl">=</span>';
  const up = d > 0;
  return `<span class="dl ${up !== invert ? 'up' : 'down'}">${up ? '▲ +' : '▼ −'}${esc(fmtNum(Math.abs(d)))}${unit ? ' ' + esc(unit) : ''}</span>`;
}
return { sparkline, lineChart, barChart, bindCharts, ringMeter, hbars, deltaTag };
})();

__m["src/ui/icons.js"] = (function () {

/* Icônes au trait (SVG en ligne, aucune ressource externe). */
const P = {
  play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  book: '<path d="M2.5 9.5v5M6 6.5v11M18 6.5v11M21.5 9.5v5M6 12h12"/>',
  more: '<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  bike: '<circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17l4-8h6l3 8M9.5 9l3 8M14 6h2.5"/>',
  flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3.2 2-4 .2 1.6 1 2.4 1.8 2.6C10.2 9 10.5 6 12 3z"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 01-8 0zM8 6H4.5c0 3 1.5 4.5 3.8 4.8M16 6h3.5c0 3-1.5 4.5-3.8 4.8M12 13v4M8.5 20h7M10 17h4v3h-4z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  down: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.5M9.5 3h5"/>',
  home: '<path d="M4 10.5L12 4l8 6.5V20h-5.5v-6h-5v6H4z"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  trash: '<path d="M4.5 7h15M10 11v6M14 11v6M6.5 7l1 13h9l1-13M9.5 7V4h5v3"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0014.5 4h-9A1.5 1.5 0 004 5.5v9A1.5 1.5 0 005.5 16H8"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  dn: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20 20"/>',
  swap: '<path d="M7 7h12l-4-4M17 17H5l4 4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
};

const icon = (name, cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[name] || ''}</svg>`;
return { icon };
})();

__m["src/core/stats.js"] = (function () {
const { num, weekStart, addDays, today: todayStr, dayDate, ymd, daysBetween } = __m["src/core/util.js"];
const { exerciseIndex, unitOf, topReps, trackedExercises, isCircuit, sheetOf, displayName } = __m["src/core/program.js"];
const { EXERCISES } = __m["src/data/exercises.js"];
const { volumeOf } = __m["src/core/store.js"];
/* Statistiques calculées à partir de l'historique (fonctions pures).
   Tout ce qui est affiché vient de valeurs saisies par l'utilisateur : aucune estimation (calories, 1RM…) n'est produite. */





/** Historique du plus récent au plus ancien. */
const sorted = (history) =>
  history.slice().sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    if ((a.at || 0) !== (b.at || 0)) return (b.at || 0) - (a.at || 0);
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
  });

/** Nombre de séances par semaine (clé = lundi). */
function weekCounts(history) {
  const c = {};
  for (const h of history) {
    const w = weekStart(h.date);
    c[w] = (c[w] || 0) + 1;
  }
  return c;
}

/** Séances de la semaine en cours et nombre de semaines consécutives où l'objectif est atteint
    (la semaine en cours ne casse pas la série tant qu'elle n'est pas terminée). */
function weekStats(history, goal, day = todayStr()) {
  const c = weekCounts(history);
  let w = weekStart(day);
  const n = c[w] || 0;
  let streak = 0;
  for (let i = 0; i < 520; i++) {
    if ((c[w] || 0) >= goal) streak++;
    else if (i > 0) break;
    w = addDays(w, -7);
  }
  return { n, streak };
}

/** Séances par semaine sur les n dernières semaines (de la plus ancienne à la semaine en cours). */
function weeklySeries(history, n = 12, day = todayStr()) {
  const c = weekCounts(history);
  const cur = weekStart(day);
  return Array.from({ length: n }, (_, i) => {
    const w = addDays(cur, -7 * (n - 1 - i));
    return { week: w, n: c[w] || 0 };
  });
}

/** Grille d'un mois : semaines de 7 jours (lundi → dimanche), null hors du mois. */
function monthGrid(year, month) {
  const first = new Date(year, month, 1, 12);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((lead + days) / 7) * 7 }, (_, i) => {
    const d = i - lead + 1;
    return d >= 1 && d <= days ? ymd(new Date(year, month, d, 12)) : null;
  });
  return cells;
}

/** Séance conseillée : celle qui suit la dernière séance enregistrée. */
function nextSession(program, history) {
  const last = sorted(history)[0];
  if (!last) return program.seances[0];
  const i = program.seances.findIndex((s) => s.id === last.sid || s.short === last.short);
  return program.seances[(i + 1) % program.seances.length];
}

/** Nombre de séries par défaut d'un circuit : celui du programme, puis 3 à partir de la 3ᵉ semaine d'entraînement. */
function defaultTours(program, history) {
  if (!isCircuit(program)) return 0;
  return new Set(history.map((h) => weekStart(h.date))).size >= 2 ? Math.max(3, program.params.tours) : program.params.tours;
}

/** Séries « à plat » d'une ligne : les parties d'un superset comptent chacune. */
const flatSets = (row) => row.sets.flatMap((s) => (s.p && s.p.length ? s.p : [s]));

/** Séries d'une partie de superset (part = index), ou de toute la ligne (part = null). */
const setsOf = (row, part) => (part == null ? flatSets(row) : row.sets.map((s) => (s.p && s.p[part]) || (part === 0 ? s : null)).filter(Boolean));

/** Ce qu'on suit dans les statistiques : chaque exercice connu du profil, et chaque partie d'un superset séparément
    (comparer la charge des élévations latérales à celle du curl n'aurait aucun sens).
    → [{ key, ex, part, name, k }] */
function trackables(program) {
  const out = [];
  for (const ex of trackedExercises(program)) {
    if (ex.parts && ex.parts.length) {
      ex.parts.forEach((p, j) => out.push({ key: ex.id + '#' + j, ex, part: j, name: p.n, k: p.k || ex.k }));
    } else out.push({ key: ex.id, ex, part: null, name: displayName(ex), k: ex.k });
  }
  return out;
}

/** Meilleure valeur d'une ligne : charge max (et les reps faites à cette charge), sinon durée ou reps max. */
function bestOf(row, ex, part = null) {
  const sets = setsOf(row, part);
  const kg = Math.max(0, ...sets.map((s) => num(s.k)));
  if (kg > 0) {
    const reps = Math.max(0, ...sets.filter((s) => num(s.k) === kg).map((s) => num(s.r)));
    return { v: kg, u: 'kg', reps };
  }
  return { v: Math.max(0, ...sets.map((s) => num(s.r))), u: unitOf(ex, row.ex), reps: 0 };
}

/** Lignes d'historique d'un exercice, de la plus ancienne à la plus récente : [{ date, row, best }]. */
function seriesOf(history, program, ex, part = null) {
  const idx = exerciseIndex(program);
  const out = [];
  for (const h of sorted(history).reverse()) {
    const row = h.rows.find((r) => idx.of(r) === ex);
    if (!row) continue;
    const sets = setsOf(row, part);
    const reps = sets.reduce((a, z) => a + num(z.r), 0);
    out.push({ date: h.date, id: h.id, row, best: bestOf(row, ex, part), reps, vol: sets.reduce((a, z) => a + num(z.r) * num(z.k), 0) });
  }
  return out;
}

/** Dernière ligne enregistrée pour un exercice (ou null). */
function lastRow(history, program, ex) {
  const idx = exerciseIndex(program);
  for (const h of sorted(history)) {
    const row = h.rows.find((r) => idx.of(r) === ex);
    if (row) return { date: h.date, row };
  }
  return null;
}

const better = (p, top) => !top || p.best.v > top.best.v || (p.best.v === top.best.v && p.best.reps > top.best.reps);

/** Records personnels : meilleure valeur dans l'unité la plus récente utilisée, pour chaque élément suivi. */
function records(history, program) {
  const out = [];
  for (const tr of trackables(program)) {
    const pts = seriesOf(history, program, tr.ex, tr.part).filter((p) => p.best.v > 0);
    if (!pts.length) continue;
    const u = pts[pts.length - 1].best.u;
    let top = null;
    for (const p of pts) if (p.best.u === u && better(p, top)) top = p;
    out.push({ ex: tr.ex, part: tr.part, name: tr.name, key: tr.key, k: tr.k, v: top.best.v, u, reps: top.best.reps, date: top.date, n: pts.length });
  }
  return out;
}

/** Records battus, dans l'ordre chronologique : une séance bat un record quand sa meilleure valeur dépasse toutes
    les précédentes (même unité). La toute première valeur d'un exercice n'est pas un record « battu ». */
function recordEvents(history, program) {
  const out = [];
  for (const tr of trackables(program)) {
    let top = null;
    for (const p of seriesOf(history, program, tr.ex, tr.part)) {
      if (p.best.v <= 0) continue;
      if (top && top.best.u !== p.best.u) top = null; // changement d'unité : nouvelle référence
      if (top && p.best.v > top.best.v) out.push({ date: p.date, id: p.id, ex: tr.ex, part: tr.part, name: tr.name, key: tr.key, k: tr.k, v: p.best.v, u: p.best.u, reps: p.best.reps, old: top.best.v });
      if (better(p, top)) top = p;
    }
  }
  return out.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

/* ---------- Périodes ---------- */

/** Chiffres d'une période [from, to] (jours inclus). Seules les durées réellement mesurées comptent. */
function periodStats(history, from, to) {
  const list = history.filter((h) => h.date >= from && h.date <= to);
  const durs = list.map((h) => h.dur).filter((d) => d > 0);
  let sets = 0;
  let reps = 0;
  for (const h of list) for (const r of h.rows) for (const z of flatSets(r)) {
    sets++;
    reps += num(z.r);
  }
  return {
    n: list.length,
    min: durs.reduce((a, d) => a + d, 0),
    durN: durs.length,
    avgDur: durs.length ? Math.round(durs.reduce((a, d) => a + d, 0) / durs.length) : 0,
    sets,
    reps,
    vol: volumeOf(list.flatMap((h) => h.rows)),
    days: new Set(list.map((h) => h.date)).size,
  };
}

/** Période qui se termine aujourd'hui et la période précédente de même longueur. */
function periodBounds(days, day = todayStr()) {
  const from = addDays(day, -(days - 1));
  return { from, to: day, prevFrom: addDays(from, -days), prevTo: addDays(from, -1) };
}

/** Séances par mois sur les n derniers mois (du plus ancien au mois en cours). */
function monthlySeries(history, n = 12, day = todayStr()) {
  const c = {};
  for (const h of history) c[h.date.slice(0, 7)] = (c[h.date.slice(0, 7)] || 0) + 1;
  const [y, m] = day.split('-').map(Number);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(y, m - 1 - (n - 1 - i), 1, 12);
    const key = ymd(d).slice(0, 7);
    const list = history.filter((h) => h.date.startsWith(key));
    const durs = list.map((h) => h.dur).filter((x) => x > 0);
    return { month: key, n: c[key] || 0, avgDur: durs.length ? Math.round(durs.reduce((a, x) => a + x, 0) / durs.length) : 0 };
  });
}

/** Séries réalisées par groupe musculaire sur une période (exercices reconnus seulement ; une partie de superset
    compte pour le groupe de son propre exercice). → [{ group, sets }] trié décroissant. */
function groupSets(history, program, from, to) {
  const idx = exerciseIndex(program);
  const c = {};
  for (const h of history) {
    if (h.date < from || h.date > to) continue;
    for (const r of h.rows) {
      const ex = idx.of(r);
      if (!ex) continue;
      if (ex.parts && ex.parts.length) {
        r.sets.forEach((s) => ex.parts.forEach((p, j) => {
          const g = (EXERCISES[p.k] || {}).group || sheetOf(ex).group;
          if (s.p ? s.p[j] : j === 0) c[g] = (c[g] || 0) + 1;
        }));
      } else {
        const g = sheetOf(ex).group;
        c[g] = (c[g] || 0) + r.sets.length;
      }
    }
  }
  return Object.entries(c).filter(([g]) => g !== 'warm').map(([group, sets]) => ({ group, sets })).sort((a, b) => b.sets - a.sets);
}

/** Informations utiles du tableau de bord, calculées uniquement à partir de l'historique (null si rien). */
function insights(history, program, day = todayStr()) {
  if (!history.length) return null;
  const H = sorted(history);
  const last = H[0];
  const prevSame = H.slice(1).find((h) => (h.sid && h.sid === last.sid) || (!h.sid && h.short === last.short));
  const vol = volumeOf(last.rows);
  const prevVol = prevSame ? volumeOf(prevSame.rows) : 0;
  const ev = recordEvents(history, program);
  // records des 30 derniers jours, le plus récent d'abord, un seul par exercice (le dernier battu)
  const seen = new Set();
  const recent = ev.filter((e) => daysBetween(e.date, day) <= 30).reverse().filter((e) => !seen.has(e.key) && seen.add(e.key));
  const b28 = periodBounds(28, day);
  return {
    last,
    lastSets: last.rows.reduce((a, r) => a + r.sets.length, 0),
    lastVol: vol,
    lastDelta: prevSame && prevVol && vol ? Math.round(vol - prevVol) : null,
    daysSince: daysBetween(last.date, day),
    records: recent,
    lastRecord: ev[ev.length - 1] || null,
    cur: periodStats(history, b28.from, b28.to),
    prev: periodStats(history, b28.prevFrom, b28.prevTo),
  };
}

/** Suggestion de progression (double progression) à partir de la dernière séance réellement enregistrée. */
function suggestion(program, ex, last) {
  if (!last || isCircuit(program)) return null;
  const sets = last.row.sets;
  const top = topReps(ex);
  const kg = Math.max(0, ...sets.map((s) => num(s.k)));
  if (top && kg && sets.length >= ex.sets && sets.every((s) => num(s.r) >= top)) {
    return 'Haut de la fourchette atteint sur toutes les séries à ' + String(kg).replace('.', ',') + ' kg : essaie la charge supérieure.';
  }
  if (ex.hold && sets.length >= ex.sets && sets.every((s) => num(s.r) >= ex.hold[1])) {
    return 'Durée maximale tenue sur toutes les séries : passe à une variante plus difficile (voir la fiche).';
  }
  return null;
}

/** Résumé d'une séance en cours par rapport à l'historique : volume, écart avec la séance précédente, nouveaux records. */
function sessionSummary(history, program, session, rows) {
  const idx = exerciseIndex(program);
  const vol = volumeOf(rows);
  const sets = rows.reduce((a, r) => a + r.sets.length, 0);
  const prev = sorted(history).find((h) => h.sid === session.id || h.short === session.short);
  const prevVol = prev ? volumeOf(prev.rows) : 0;
  const recs = [];
  for (const row of rows) {
    const ex = idx.of(row);
    if (!ex) continue;
    const parts = ex.parts && ex.parts.length ? ex.parts.map((p, j) => [j, p.n]) : [[null, displayName(ex)]];
    for (const [part, name] of parts) {
      const b = bestOf(row, ex, part);
      if (b.v <= 0) continue;
      let old = 0;
      for (const p of seriesOf(history, program, ex, part)) if (p.best.u === b.u && p.best.v > old) old = p.best.v;
      if (old > 0 && b.v > old) recs.push({ ex, part, name, v: b.v, u: b.u, old });
    }
  }
  return { vol, sets, delta: prev && prevVol && vol ? Math.round(vol - prevVol) : null, recs };
}

/** Jours écoulés depuis le dernier export (ou, à défaut, depuis la première séance). */
function daysSinceExport(state, day = todayStr()) {
  const ref = state.exp || state.history.map((h) => h.date).sort()[0];
  return ref ? Math.max(0, Math.round((dayDate(day) - dayDate(ref)) / 864e5)) : 0;
}

/** Faut-il rappeler de sauvegarder ? (3 séances non exportées, ou une seule depuis plus de 3 semaines) */
const backupDue = (state, day = todayStr()) => state.uns >= 3 || (state.uns > 0 && daysSinceExport(state, day) >= 21);
return { sorted, weekCounts, weekStats, weeklySeries, monthGrid, nextSession, defaultTours, trackables, bestOf, seriesOf, lastRow, records, recordEvents, periodStats, periodBounds, monthlySeries, groupSets, insights, suggestion, sessionSummary, daysSinceExport, backupDue };
})();

__m["src/core/workout.js"] = (function () {
const { isCircuit, partsOf, setsCount } = __m["src/core/program.js"];
const { today, isDay, uid } = __m["src/core/util.js"];
const { volumeOf } = __m["src/core/store.js"];
/* Moteur de la séance guidée : machine à états pure (aucun accès au DOM, horloge injectable → testable).

   Une séance est une liste d'étapes :
     warm   étape d'échauffement (s = durée du chrono, 0 si l'on avance à la main)
     rest   repos chronométré (after : 'warm' | 'set' | 'tour')
     ready  écran « prêt à démarrer » d'un circuit
     work   passage chronométré d'un circuit (x = exercice, i = tour)
     set    série d'un programme en séries (x = exercice, i = série)
     end    récapitulatif

   Phases de l'étape en cours (this.ph) :
     idle   rien ne tourne (série classique, échauffement sans chrono, prêt, fin)
     wait   chrono à lancer à la main (échauffement chronométré, gainage)
     prep   compte à rebours de mise en place (3 s)
     run    compte à rebours (repos, travail d'un circuit, échauffement chronométré)
     hold   chrono croissant du gainage
     side   repos de changement de côté (exercices unilatéraux)

   Tous les chronos reposent sur des heures absolues (now()) : ils restent justes si le navigateur
   ralentit ses minuteries ou si l'appli passe en arrière-plan. */




const PREP_MS = 3000;
/** Au-delà de cette durée, une séance est considérée comme interrompue : sa durée n'est pas enregistrée. */
const MAX_SESSION_MIN = 300;

function buildSteps(program, session, tours) {
  const st = [];
  session.warm.steps.forEach((w, j) => {
    st.push({ k: 'warm', w: j, s: w.s || 0 });
    if (w.rest) st.push({ k: 'rest', s: w.rest, after: 'warm' });
  });
  const L = session.exos.length;
  if (isCircuit(program)) {
    const P = program.params;
    st.push({ k: 'ready' });
    for (let t = 0; t < tours; t++) {
      session.exos.forEach((ex, x) => {
        st.push({ k: 'work', x, i: t, s: P.work });
        const last = x === L - 1;
        if (!(last && t === tours - 1)) st.push({ k: 'rest', s: last ? P.restTour : P.rest, after: last ? 'tour' : 'set' });
      });
    }
  } else {
    session.exos.forEach((ex, x) => {
      for (let i = 0; i < ex.sets; i++) {
        st.push({ k: 'set', x, i });
        if (!(x === L - 1 && i === ex.sets - 1)) st.push({ k: 'rest', s: ex.restS, after: 'set' });
      }
    });
  }
  st.push({ k: 'end' });
  return st;
}

/** Série du brouillon (créée au besoin). */
function draftSet(draft, x, i) {
  const a = (draft.sets[x] = draft.sets[x] || []);
  return (a[i] = a[i] || { r: '', k: '', d: false });
}

const filled = (s) => !!s && (s.d || s.r !== '' || s.k !== '' || !!(s.p && s.p.some((z) => z && (z.r !== '' || z.k !== ''))));

/** Valeur proposée pour un champ : saisie en cours, sinon série précédente, sinon dernière séance enregistrée.
    last = { row } de la dernière séance pour cet exercice (ou null) ; part = index de la partie d'un superset. */
function defaultValue(draft, x, i, field, last, part = null) {
  const pick = (s) => {
    if (!s) return '';
    if (part != null) return s.p && s.p[part] ? s.p[part][field] || '' : s.p ? '' : s[field] || '';
    return s[field] || '';
  };
  const cur = pick((draft.sets[x] || [])[i]);
  if (cur !== '') return cur;
  if (i > 0) {
    const prev = pick((draft.sets[x] || [])[i - 1]);
    if (prev !== '') return prev;
  }
  if (!last) return '';
  const sets = last.row.sets;
  if (field === 'r') return pick(sets[i]);
  const ks = sets.map(pick).filter((z) => z !== '');
  return ks.length ? ks[ks.length - 1] : '';
}

/** Lignes à enregistrer : seules les séries réellement renseignées ou validées sont gardées. */
function rowsOf(program, session, draft) {
  return session.exos
    .map((ex, x) => ({
      ex: ex.n,
      xid: ex.id,
      sets: (draft.sets[x] || [])
        .slice(0, setsCount(program, ex, draft.tours))
        .filter(filled)
        .map((s) => (s.p ? { r: s.r, k: s.k, p: s.p.map((z) => ({ r: (z && z.r) || '', k: (z && z.k) || '' })) } : { r: s.r, k: s.k })),
    }))
    .filter((r) => r.sets.length);
}

/** Durée mesurée de la séance en minutes (0 si inconnue ou manifestement interrompue). */
function durationMin(draft, now) {
  if (!draft.t0) return 0;
  const m = Math.round(((draft.t1 || now) - draft.t0) / 60000);
  return m > 0 && m <= MAX_SESSION_MIN ? m : 0;
}

/** Séance d'historique construite à partir du brouillon (null s'il n'y a rien à enregistrer). */
function buildEntry(program, session, draft, now = Date.now()) {
  const rows = rowsOf(program, session, draft);
  if (!rows.length) return null;
  const entry = {
    id: uid(now),
    date: isDay(draft.date) ? draft.date : today(),
    sid: session.id,
    short: session.short,
    title: session.title,
    tours: isCircuit(program) ? draft.tours : 0,
    rows,
    note: draft.note || '',
    vol: volumeOf(rows),
    dur: durationMin(draft, now),
    at: now,
  };
  if (program.plan) entry.pid = program.plan; // programme personnalisé dont vient la séance (filtre de l'historique)
  return entry;
}

class Workout {
  /**
   * @param {object} o
   * @param {object} o.program
   * @param {object} o.session
   * @param {object} o.draft     brouillon de la séance (modifié en place)
   * @param {()=>number} [o.now]
   * @param {(name:string)=>void} [o.cue]       'tick' | 'go' | 'rest' | 'ok' | 'end'
   * @param {(kind:string)=>void} [o.onChange]  'step' (réafficher) | 'data' (enregistrer)
   */
  constructor({ program, session, draft, now = Date.now, cue = () => {}, onChange = () => {} }) {
    this.program = program;
    this.session = session;
    this.draft = draft;
    this.now = now;
    this.cue = cue;
    this.onChange = onChange;
    this.steps = buildSteps(program, session, draft.tours);
    this.count = this.steps.filter((s) => s.x != null).length;
    this.i = 0;
    this.ph = 'idle';
    this.timer = null;
    this.pt = 0;
    this.prepEnd = 0;
    this.h0 = 0;
    this.holdCued = false;
    this.lastSec = null;
    this.interrupted = false;
    if (!draft.t0) draft.t0 = now();
    this.resume();
  }

  get step() {
    return this.steps[this.i];
  }

  exOf(step = this.step) {
    return step.x != null ? this.session.exos[step.x] : null;
  }

  set(x, i) {
    return draftSet(this.draft, x, i);
  }

  /** Lecture seule : ne crée pas la série dans le brouillon. */
  isDone(s) {
    const a = (this.draft.sets[s.x] || [])[s.i];
    return !!(a && a.d);
  }

  get doneCount() {
    return this.steps.filter((s) => s.x != null && this.isDone(s)).length;
  }

  /** Avancement (0 → 1) : part des séries situées avant l'étape en cours. */
  get progress() {
    return this.count ? this.steps.slice(0, this.i).filter((s) => s.x != null).length / this.count : 0;
  }

  get paused() {
    return !!(this.timer && this.timer.left);
  }

  /** Prochaine étape de travail après l'étape en cours (ou null). */
  nextWork() {
    return this.steps.slice(this.i + 1).find((s) => s.x != null) || null;
  }

  /** Dernière étape de travail avant l'étape en cours (ou null). */
  prevWork() {
    for (let j = this.i - 1; j >= 0; j--) if (this.steps[j].x != null) return this.steps[j];
    return null;
  }

  /* ----- position de départ / reprise ----- */

  firstUndone() {
    const first = this.steps.findIndex((s) => s.x != null);
    const i = this.steps.findIndex((s) => s.x != null && !this.isDone(s));
    if (i < 0) return this.steps.length - 1;
    return i === first ? 0 : i;
  }

  resume() {
    const now = this.now();
    const r = this.draft.run;
    const s = r && this.steps[r.i];
    const anyDone = this.doneCount > 0;
    if (s && s.k === 'rest' && r.timer && (r.timer.left > 0 || r.timer.end > now)) {
      // un repos était en cours quand l'appli a été fermée : on le retrouve là où il en est
      this.i = r.i;
      this.ph = 'run';
      this.timer = { end: r.timer.end, left: r.timer.left, total: r.timer.total || s.s };
    } else if (s && (s.k === 'warm' || s.k === 'ready') && !anyDone) {
      this.setup(r.i);
    } else if (s && s.x != null && !this.isDone(s)) {
      this.setup(r.i);
      const parts = partsOf(this.exOf(s), s.i);
      if (parts && r.pt > 0 && r.pt < parts.length) this.pt = r.pt;
    } else {
      this.setup(this.firstUndone());
    }
    this.persist();
  }

  /* ----- transitions ----- */

  setup(i) {
    const now = this.now();
    this.i = Math.max(0, Math.min(this.steps.length - 1, i));
    const s = this.step;
    const ex = this.exOf();
    this.pt = 0;
    this.h0 = 0;
    this.prepEnd = 0;
    this.holdCued = false;
    this.lastSec = null;
    this.timer = null;
    if (s.k === 'warm') this.ph = s.s ? 'wait' : 'idle';
    else if (s.k === 'rest' || s.k === 'work') {
      this.ph = 'run';
      this.timer = { end: now + s.s * 1000, left: 0, total: s.s };
    } else if (s.k === 'set') this.ph = ex.hold ? 'wait' : 'idle';
    else this.ph = 'idle';
    this.draft.t1 = s.k === 'end' ? this.draft.t1 || now : 0;
  }

  enter(i) {
    this.setup(i);
    this.persist();
    this.onChange('step');
  }

  persist() {
    const t = this.timer;
    this.draft.run = {
      i: this.i,
      pt: this.pt,
      timer: t ? { end: t.end, left: t.left, total: t.total, side: this.ph === 'side' } : null,
      at: this.now(),
    };
    this.onChange('data');
  }

  next() {
    if (this.i >= this.steps.length - 1) return;
    const k = this.steps[this.i + 1].k;
    this.cue(k === 'end' ? 'end' : k === 'rest' ? 'rest' : k === 'set' || k === 'work' ? 'go' : 'ok');
    this.enter(this.i + 1);
  }

  /** Lance le chrono manuel (échauffement chronométré, gainage) après 3 s de mise en place. */
  launch() {
    if (this.ph !== 'wait') return;
    this.ph = 'prep';
    this.prepEnd = this.now() + PREP_MS;
    this.lastSec = null;
    this.onChange('step');
  }

  /** Pause / reprise du compte à rebours en cours. */
  togglePause() {
    const t = this.timer;
    if (!t || (this.ph !== 'run' && this.ph !== 'side')) return;
    const now = this.now();
    if (t.left) {
      t.end = now + t.left;
      t.left = 0;
    } else {
      t.left = Math.max(1, t.end - now);
    }
    this.persist();
    this.onChange('timer');
  }

  pause() {
    if (this.timer && !this.timer.left) this.togglePause();
  }

  /** Ajoute du temps au compte à rebours en cours (y compris pendant une pause). */
  add(sec) {
    const t = this.timer;
    if (!t || (this.ph !== 'run' && this.ph !== 'side')) return;
    if (t.left) t.left += sec * 1000;
    else t.end += sec * 1000;
    t.total += sec;
    this.persist();
    this.onChange('timer');
  }

  /** Passe l'étape en cours sans la valider. */
  skip() {
    if (this.ph === 'side') return this.sideReady();
    this.next();
  }

  /** Enregistre des valeurs saisies pour une série sans changer d'étape (saisie pendant le repos d'un circuit). */
  setValues(x, i, v) {
    const a = this.set(x, i);
    if (v.r != null) a.r = String(v.r);
    if (v.k != null) a.k = String(v.k);
    this.onChange('data');
  }

  storeValues(v) {
    const s = this.step;
    const ex = this.exOf();
    const a = this.set(s.x, s.i);
    if (ex.parts) {
      a.p = a.p || [];
      for (let j = 0; j < ex.parts.length; j++) a.p[j] = a.p[j] || { r: '', k: '' };
      const p = a.p[Math.min(this.pt, ex.parts.length - 1)];
      if (v.r != null) p.r = String(v.r);
      if (v.k != null) p.k = String(v.k);
      a.r = a.p[0].r;
      a.k = a.p[0].k;
    } else {
      if (v.r != null) a.r = String(v.r);
      if (v.k != null) a.k = String(v.k);
    }
    return a;
  }

  /** Valide l'étape en cours (série terminée, échauffement suivant, gainage arrêté) et passe à la suite. */
  done(v = {}) {
    const s = this.step;
    if (s.k === 'end') return;
    if (s.x != null) {
      const ex = this.exOf();
      let a;
      if (this.ph === 'hold') {
        a = this.set(s.x, s.i);
        a.r = String(Math.max(0, Math.min(ex.hold[1], Math.floor((this.now() - this.h0) / 1000))));
      } else if (this.ph === 'wait' || this.ph === 'prep') {
        return; // gainage pas encore lancé : rien à valider (utiliser skip pour passer)
      } else {
        a = this.storeValues(v);
      }
      a.d = true;
    }
    this.next();
  }

  /** Valide une partie de la série (un côté, ou un exercice du superset) et passe à la suivante. */
  partDone(v = {}) {
    const s = this.step;
    const ex = this.exOf();
    const parts = ex && partsOf(ex, s.i);
    if (!parts || this.pt >= parts.length - 1 || this.ph !== 'idle') return;
    this.storeValues(v);
    this.pt++;
    if (ex.sides && ex.sideRest) {
      this.ph = 'side';
      this.timer = { end: this.now() + ex.sideRest * 1000, left: 0, total: ex.sideRest };
      this.lastSec = null;
      this.cue('rest');
    } else {
      this.cue('ok');
    }
    this.persist();
    this.onChange('step');
  }

  /** Fin du repos de changement de côté. */
  sideReady() {
    if (this.ph !== 'side') return;
    this.ph = 'idle';
    this.timer = null;
    this.cue('go');
    this.persist();
    this.onChange('step');
  }

  /** Revient à l'étape de travail précédente (pour corriger une validation trop rapide). */
  back() {
    if (this.ph === 'side' || (this.pt > 0 && this.ph === 'idle')) {
      this.pt = Math.max(0, this.pt - 1);
      this.ph = 'idle';
      this.timer = null;
      this.persist();
      this.onChange('step');
      return true;
    }
    let j = this.i - 1;
    while (j >= 0 && this.steps[j].k === 'rest') j--;
    if (j < 0) return false;
    const s = this.steps[j];
    if (s.x != null) this.set(s.x, s.i).d = false;
    this.enter(j);
    return true;
  }

  /** Va directement à un exercice (aperçu de la séance) : sa première série non faite, sinon sa première série.
      Les séries déjà validées restent validées ; celles qu'on saute restent à faire et on peut y revenir. */
  goToExercise(x) {
    let j = this.steps.findIndex((s) => s.x === x && !this.isDone(s));
    if (j < 0) j = this.steps.findIndex((s) => s.x === x);
    if (j < 0) return false;
    this.cue('go');
    this.enter(j);
    return true;
  }

  /** État de chaque exercice pour l'aperçu : séries faites / prévues. */
  overview() {
    return this.session.exos.map((ex, x) => {
      const st = this.steps.filter((s) => s.x === x);
      return { x, ex, done: st.filter((s) => this.isDone(s)).length, total: st.length, current: this.step.x === x };
    });
  }

  /** L'appli passe en arrière-plan : un chrono lancé à la main ne peut plus être suivi, on l'annule proprement. */
  interrupt() {
    if (this.ph === 'prep' || this.ph === 'hold') {
      this.ph = 'wait';
      this.h0 = 0;
      this.prepEnd = 0;
      this.interrupted = true;
      this.onChange('step');
    }
  }

  /* ----- horloge ----- */

  /** Secondes restantes du compte à rebours affiché (mise en place, repos, travail). */
  secondsLeft(now = this.now()) {
    if (this.ph === 'prep') return Math.max(0, Math.ceil((this.prepEnd - now) / 1000));
    const t = this.timer;
    if (!t) return 0;
    return Math.max(0, Math.ceil((t.left || t.end - now) / 1000));
  }

  /** Part du compte à rebours écoulée (0 → 1). */
  fraction(now = this.now()) {
    const t = this.timer;
    if (this.ph === 'hold') return Math.min(1, this.holdElapsed(now) / this.exOf().hold[1]);
    if (!t || !t.total) return 0;
    return Math.min(1, Math.max(0, 1 - (t.left || t.end - now) / (t.total * 1000)));
  }

  holdElapsed(now = this.now()) {
    return this.h0 ? Math.max(0, Math.floor((now - this.h0) / 1000)) : 0;
  }

  elapsedSec(now = this.now()) {
    return this.draft.t0 ? Math.max(0, Math.floor(((this.draft.t1 || now) - this.draft.t0) / 1000)) : 0;
  }

  /** À appeler régulièrement (≈ 4 fois par seconde) et au retour au premier plan. */
  tick(now = this.now()) {
    const s = this.step;
    if (this.ph === 'prep') {
      const left = Math.ceil((this.prepEnd - now) / 1000);
      if (left !== this.lastSec && left > 0) this.cue('tick');
      this.lastSec = left;
      if (now >= this.prepEnd) {
        this.cue('go');
        this.lastSec = null;
        if (s.k === 'warm') {
          this.ph = 'run';
          this.timer = { end: now + s.s * 1000, left: 0, total: s.s };
        } else {
          this.ph = 'hold';
          this.h0 = now;
          this.holdCued = false;
        }
        this.onChange('step');
      }
      return;
    }
    if (this.ph === 'hold') {
      const H = this.exOf().hold;
      const el = this.holdElapsed(now);
      if (el >= H[0] && !this.holdCued) {
        this.holdCued = true;
        this.cue('rest');
      }
      if (el >= H[1]) this.done();
      return;
    }
    if (this.ph !== 'run' && this.ph !== 'side') return;
    const t = this.timer;
    if (!t || t.left) return;
    const left = Math.ceil((t.end - now) / 1000);
    if (left !== this.lastSec && left > 0 && left <= 3 && this.lastSec != null) this.cue('tick');
    this.lastSec = left;
    if (now < t.end) return;
    if (this.ph === 'side') return void this.sideReady();
    if (s.k === 'work') this.set(s.x, s.i).d = true; // passage terminé : validé, les reps restent à saisir par l'utilisateur
    this.next();
  }
}
return { PREP_MS, MAX_SESSION_MIN, buildSteps, draftSet, defaultValue, rowsOf, durationMin, buildEntry, Workout };
})();

__m["src/ui/pwa.js"] = (function () {

/* Service worker côté page : enregistrement, détection et application des mises à jour, stockage persistant.

   Principe : une nouvelle version est téléchargée en entier dans son propre cache, puis attend.
   Elle n'est activée que lorsque l'utilisateur l'accepte (ou à la prochaine ouverture de l'appli) :
   on ne mélange jamais les fichiers de deux versions, et une séance en cours n'est jamais rechargée de force. */

const pwa = {
  state: { supported: false, version: '', offlineReady: false, waiting: false, persisted: null },
  reg: null,
  onChange: () => {},
  reloading: false,

  async init(onChange) {
    this.onChange = onChange || this.onChange;
    try {
      if (navigator.storage && navigator.storage.persist) {
        this.state.persisted = (await navigator.storage.persisted()) || (await navigator.storage.persist());
      }
    } catch (e) {
      /* API absente */
    }
    if (!('serviceWorker' in navigator)) return this.onChange();
    this.state.supported = true;
    try {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // une nouvelle version vient de prendre la main : on recharge une seule fois pour l'utiliser
        if (this.reloading || !this.acceptedUpdate) return;
        this.reloading = true;
        location.reload();
      });
      navigator.serviceWorker.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'VERSION') {
          this.state.version = e.data.version;
          this.onChange();
        }
      });
      const reg = (this.reg = await navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }));
      const track = (w) => {
        if (!w) return;
        w.addEventListener('statechange', () => {
          if (w.state === 'installed') this.refresh();
          if (w.state === 'activated') this.refresh();
        });
      };
      track(reg.installing);
      reg.addEventListener('updatefound', () => track(reg.installing));
      await this.refresh();
      // Une version téléchargée lors d'une visite précédente attend : on l'active tout de suite, au démarrage,
      // avant que l'utilisateur ait commencé quoi que ce soit (garde-fou contre un rechargement en boucle).
      if (this.state.waiting && this.canAutoApply()) this.applyUpdate();
      // appli gardée ouverte longtemps (écran d'accueil) : on revérifie au retour au premier plan, au plus une fois par heure
      let last = Date.now();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && Date.now() - last > 3600e3) {
          last = Date.now();
          reg.update().catch(() => {});
        }
      });
    } catch (e) {
      this.state.supported = false;
    }
    this.onChange();
  },

  async refresh() {
    const reg = this.reg;
    if (!reg) return;
    this.state.waiting = !!(reg.waiting && navigator.serviceWorker.controller);
    this.state.offlineReady = !!reg.active;
    const w = reg.active;
    if (w) w.postMessage({ type: 'GET_VERSION' });
    this.onChange();
  },

  /** Vérifie s'il existe une nouvelle version. Renvoie 'update' | 'current' | 'offline'. */
  async check() {
    if (!this.reg) return 'current';
    try {
      await this.reg.update();
    } catch (e) {
      return 'offline';
    }
    await new Promise((r) => setTimeout(r, 600));
    await this.refresh();
    return this.state.waiting || this.reg.installing ? 'update' : 'current';
  },

  canAutoApply() {
    try {
      const last = +sessionStorage.getItem('moncoach:auto-update') || 0;
      if (Date.now() - last < 60000) return false;
      sessionStorage.setItem('moncoach:auto-update', String(Date.now()));
      return true;
    } catch (e) {
      return false;
    }
  },

  /** Active la version en attente puis recharge la page. */
  applyUpdate() {
    const w = this.reg && this.reg.waiting;
    if (!w) return;
    this.acceptedUpdate = true;
    w.postMessage({ type: 'SKIP_WAITING' });
  },
};
return { pwa };
})();

__m["src/ui/views/more.js"] = (function () {
const { esc, today, fmtDay, plural } = __m["src/core/util.js"];
const { exportPayload, toCSV, KG_STEPS } = __m["src/core/store.js"];
const { cleanPlan, planErrors } = __m["src/core/plans.js"];
const { icon } = __m["src/ui/icons.js"];
const { toast, download, confirm } = __m["src/ui/dom.js"];
const { setSignalOptions, signal, unlockAudio } = __m["src/ui/audio.js"];
const { pwa } = __m["src/ui/pwa.js"];
/* Onglet « Plus » : guide du programme, réglages, sauvegarde des données, informations sur l'application. */








const fold = (title, body, open = false) => `<details class="card" data-keep="${esc(title)}"${open ? ' open' : ''}><summary><span class="grow"><b>${esc(title)}</b></span>${icon('chev', 'chev')}</summary>${body}</details>`;

function renderMore(app) {
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

function downloadBackup(app) {
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

const moreActions = {
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
function moreChange(app, t) {
  if (t.id !== 'imp') return;
  const f = t.files && t.files[0];
  if (!f) return;
  if (f.size > 5e6) return toast('Fichier trop volumineux pour être une sauvegarde.');
  const restore = document.getElementById('restore-config').checked;
  f.text().then((text) => report(app, app.store.import(text, { restore })), () => toast('Lecture du fichier impossible.'));
  t.value = '';
}
return { renderMore, downloadBackup, moreActions, moreChange };
})();

__m["src/ui/views/today.js"] = (function () {
const { esc, today, addDays, weekStart, fmtDay, dayDate, daysBetween, plural, restText, fmtNum, fmtInt } = __m["src/core/util.js"];
const { displayName, sessionById, setsCount, estimateMinutes, isCircuit } = __m["src/core/program.js"];
const { weekStats, nextSession, lastRow, suggestion, defaultTours, insights } = __m["src/core/stats.js"];
const { ringMeter, deltaTag } = __m["src/ui/charts.js"];
const { draftSet, buildEntry } = __m["src/core/workout.js"];
const { figTag } = __m["src/ui/figure.js"];
const { icon } = __m["src/ui/icons.js"];
const { toast, confirm, announce, dialog } = __m["src/ui/dom.js"];
const { unlockAudio } = __m["src/ui/audio.js"];
const { downloadBackup } = __m["src/ui/views/more.js"];
/* Onglet « Séance » : semaine en cours, séance du jour, saisie libre des séries. */











const DOW = 'LMMJVSD';

/** Brouillon de la séance affichée (créé au besoin, avec le bon nombre de séries pour un circuit). */
function currentDraft(app) {
  const se = sessionById(app.program, app.store.state.cur);
  const d = app.store.draft(se.id, { tours: defaultTours(app.program, app.store.state.history) });
  if (isCircuit(app.program) && !d.tours) d.tours = defaultTours(app.program, app.store.state.history);
  return d;
}

const countDone = (d, x, n) => (d.sets[x] || []).slice(0, n).filter((s) => s && s.d).length;

function weekCard(app) {
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
function rowSummary(row) {
  const ks = row.sets.map((s) => s.k).filter((k) => k !== '');
  const sameK = ks.length && ks.every((k) => k === ks[0]);
  if (sameK) return ks[0] + ' kg · ' + row.sets.map((s) => s.r || '–').join(' / ');
  return row.sets.map((s) => (s.r || '–') + (s.k !== '' ? ' × ' + s.k + ' kg' : '')).join(' · ');
}

function renderToday(app) {
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

/** Enregistre la séance et garde la saisie accessible si le stockage refuse l'écriture. */
async function saveSession(app, se = sessionById(app.program, app.store.state.cur), d = currentDraft(app), onSaved = () => {}) {
  const entry = buildEntry(app.program, se, d);
  if (!entry) {
    toast('Rien à enregistrer : renseigne au moins une série.');
    return false;
  }
  while (!app.store.commitSession(se.id, entry)) {
    const action = await dialog({
      title: 'Séance non enregistrée',
      text: 'Le stockage de cet appareil a refusé l’enregistrement. La saisie reste ouverte. Tu peux réessayer ou télécharger une sauvegarde qui contient ton brouillon.',
      actions: [
        { label: 'Réessayer', value: 'retry' },
        { label: 'Exporter mes données', value: 'export', kind: 'ghost' },
        { label: 'Revenir à la séance', value: 'back', kind: 'quiet' },
      ],
    });
    if (action === 'retry') continue;
    if (action === 'export') {
      try {
        downloadBackup(app);
        toast('Sauvegarde exportée avec le brouillon.');
      } catch (e) {
        toast('Export impossible sur cet appareil.');
      }
    }
    return false;
  }
  onSaved();
  app.stopMini();
  app.go('progres', { open: entry.id });
  toast('Séance enregistrée.');
  return true;
}

const todayActions = {
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
function todayInput(app, t) {
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
return { currentDraft, weekCard, rowSummary, renderToday, saveSession, todayActions, todayInput };
})();

__m["src/ui/views/progress.js"] = (function () {
const { esc, today, fmtDay, dayDate, num, fmtNum, fmtInt, plural, cap1, weekStart } = __m["src/core/util.js"];
const { displayName, exerciseIndex, unitOf, trackedExercises } = __m["src/core/program.js"];
const { GROUPS } = __m["src/data/exercises.js"];
const { sorted, weekStats, weeklySeries, monthlySeries, monthGrid, seriesOf, records, trackables, backupDue, daysSinceExport, periodStats, periodBounds, groupSets, weekCounts } = __m["src/core/stats.js"];
const { volumeOf } = __m["src/core/store.js"];
const { figTag } = __m["src/ui/figure.js"];
const { icon } = __m["src/ui/icons.js"];
const { sparkline, barChart, lineChart, hbars, deltaTag } = __m["src/ui/charts.js"];
const { toast, confirm, dialog } = __m["src/ui/dom.js"];
const { rowSummary } = __m["src/ui/views/today.js"];
/* Onglet « Progrès » : bilan par période, calendrier, progression par exercice et records, historique filtrable.
   Tout est calculé à partir des séances enregistrées : aucune valeur estimée ou inventée. */











const SUBS = [['bilan', 'Bilan'], ['cal', 'Calendrier'], ['perf', 'Exercices'], ['hist', 'Historique']];
const PERIODS = [[28, '4 semaines'], [91, '3 mois'], [365, '12 mois']];
const local = { sub: 'bilan', period: 28, month: null, openId: null, fSe: '', fEx: '', fNote: false, limit: 20 };

/** Détail d'une séance : chiffres mesurés, une pastille par série, et la séance précédente du même exercice. */
function entryDetail(app, h) {
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

function renderProgress(app, opts = {}) {
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

const progressActions = {
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
return { entryDetail, renderProgress, progressActions };
})();

__m["src/ui/views/library.js"] = (function () {
const { esc, fmtNum } = __m["src/core/util.js"];
const { displayName, sheetOf, allExercises, isCircuit } = __m["src/core/program.js"];
const { GROUPS, EXERCISES, EQUIP, TYPES, addable } = __m["src/data/exercises.js"];
const { records } = __m["src/core/stats.js"];
const { figTag } = __m["src/ui/figure.js"];
const { icon } = __m["src/ui/icons.js"];
const { $$ } = __m["src/ui/dom.js"];
/* Onglet « Exercices » : bibliothèque complète, filtrable par groupe musculaire, matériel et type de mouvement,
   avec recherche. Les exercices du programme actif sont signalés et ouvrent leur fiche avec la prescription. */








const local = { group: 'all', equip: '', type: '', mine: false, q: '' };

/** Mouvements d'échauffement du programme, sans doublon. */
function warmups(program) {
  const seen = new Map();
  for (const se of program.seances) for (const w of se.warm.steps) if (!seen.has(w.k)) seen.set(w.k, w);
  return [...seen.values()];
}

/** Texte de recherche d'un exercice (nom, muscles, matériel), sans accents. */
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Fiche « bibliothèque » d'un exercice absent du programme actif. */
const libExercise = (k) => ({ id: k, k, n: EXERCISES[k].name, lib: true });

/** Tous les exercices affichés : ceux du programme (avec leur prescription), puis le reste de la bibliothèque. */
function catalog(program) {
  const mine = allExercises(program);
  const inProg = new Set(mine.map((e) => e.k));
  return [...mine.map((ex) => ({ ex, mine: true })), ...addable().filter((k) => !inProg.has(k)).map((k) => ({ ex: libExercise(k), mine: false }))];
}

function renderLibrary(app) {
  const { program } = app;
  const rec = {};
  for (const r of records(app.store.state.history, program)) if (r.part == null) rec[r.ex.id] = r;
  const all = catalog(program);
  const chip = (id, label) => `<button data-a="group" data-v="${id}" aria-pressed="${local.group === id}">${esc(label)}</button>`;
  const groups = Object.keys(GROUPS).filter((g) => g !== 'warm' && all.some((c) => sheetOf(c.ex).group === g));
  let h = `<label class="search"><span class="sr">Rechercher un exercice</span>${icon('search')}<input type="search" data-in="q" placeholder="Rechercher : nom, muscle, matériel…" value="${esc(local.q)}" autocomplete="off" enterkeyhint="search"></label>`;
  h += `<div class="filters" role="group" aria-label="Groupe musculaire">${chip('all', 'Tous')}${groups.map((g) => chip(g, GROUPS[g])).join('')}${chip('warm', GROUPS.warm)}</div>`;
  if (local.group !== 'warm') {
    h += `<div class="filters-box row3"><label class="f">Matériel<select data-c="equip"><option value="">Tout</option><option value="none"${local.equip === 'none' ? ' selected' : ''}>Sans matériel</option>${Object.entries(EQUIP).map(([k, l]) => `<option value="${k}"${local.equip === k ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
      <label class="f">Mouvement<select data-c="type"><option value="">Tous</option>${Object.entries(TYPES).filter(([k]) => k !== 'mob').map(([k, l]) => `<option value="${k}"${local.type === k ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
      <label class="chkl"><input type="checkbox" data-c="mine"${local.mine ? ' checked' : ''}> Mon programme</label></div>`;
    const list = all.filter(({ ex, mine }) => {
      const sh = sheetOf(ex);
      if (local.group !== 'all' && sh.group !== local.group) return false;
      if (local.equip === 'none' ? sh.equip.length : local.equip && !sh.equip.includes(local.equip)) return false;
      if (local.type && sh.type !== local.type) return false;
      return !local.mine || mine;
    });
    const qn = fold(local.q.trim());
    h += `<p class="mute small count" style="margin:2px 2px 0"></p>`;
    const item = ({ ex, mine }) => {
      const sh = sheetOf(ex);
      const r = rec[ex.id];
      const where = mine ? program.seances.filter((s) => s.exos.includes(ex)).map((s) => (s.tab || s.short).split(' · ')[0]).join(', ') : '';
      const plan = !mine ? '' : isCircuit(program) ? program.params.work + ' s par passage' : ex.sets + ' × ' + (ex.hold ? ex.hold[0] + '–' + ex.hold[1] + ' s' : ex.reps);
      const eq = sh.equip.length ? sh.equip.map((q) => EQUIP[q]).join(', ') : 'Sans matériel';
      const q = fold([displayName(ex), sh.name, sh.muscles, eq, TYPES[sh.type] || '', GROUPS[sh.group] || ''].join(' '));
      return `<button class="li" data-a="open" data-v="${esc(ex.id)}" data-lib="${mine ? '' : '1'}" data-q="${esc(q)}"${qn && !q.includes(qn) ? ' hidden' : ''}><div class="th">${figTag(ex.k)}</div><div class="grow"><b>${esc(mine ? displayName(ex) : sh.name)}</b><div class="mute small">${esc(sh.muscles)}</div><div class="mute small">${mine ? esc(where) + ' · ' + esc(plan) : esc(eq)}</div></div>` +
        (r ? `<span class="v">${fmtNum(r.v)} ${r.u}<small>record</small></span>` : '') + icon('chev', 'mute') + '</button>';
    };
    const mineL = list.filter((c) => c.mine);
    const other = list.filter((c) => !c.mine);
    if (!list.length) h += '<div class="card flat"><p class="mute">Aucun exercice ne correspond à ces filtres.</p></div>';
    if (mineL.length) h += `<h4 class="month">Dans ton programme</h4><div class="card lib">${mineL.map(item).join('')}</div>`;
    if (other.length) h += `<h4 class="month">Autres exercices de la bibliothèque</h4><div class="card lib">${other.map(item).join('')}</div>`;
  }
  if (local.group === 'all' || local.group === 'warm') {
    h += `<div class="sec"><h3>Échauffement du programme</h3></div><div class="card lib">` + warmups(program).map((w) =>
      `<button class="li" data-a="warm" data-v="${esc(w.k)}" data-q="${esc(fold(w.n + ' ' + ((EXERCISES[w.k] || {}).muscles || '')))}"><div class="th sm">${figTag(w.k, { t: 0.5 })}</div><div class="grow"><b>${esc(w.n)}</b><div class="mute small">${esc(w.dose)} · ${esc((EXERCISES[w.k] || {}).muscles || '')}</div></div>${icon('chev', 'mute')}</button>`).join('') + '</div>';
  }
  return h;
}

/** Recherche : filtre la liste affichée sans la redessiner (le clavier reste ouvert). */
function applySearch() {
  const q = fold(local.q.trim());
  let n = 0;
  for (const li of $$('#view .lib .li')) {
    const hit = !q || li.dataset.q.includes(q);
    li.hidden = !hit;
    if (hit && li.dataset.a === 'open') n++;
  }
  const c = $$('#view .count')[0];
  if (c) c.textContent = n + ' exercice' + (n > 1 ? 's' : '') + (q ? ' pour « ' + local.q.trim() + ' »' : '');
}

const libraryActions = {
  group(app, b) {
    local.group = b.dataset.v;
    app.render({ keepScroll: true });
    applySearch();
  },
  equip(app, el) {
    local.equip = el.value;
    app.render({ keepScroll: true });
    applySearch();
  },
  type(app, el) {
    local.type = el.value;
    app.render({ keepScroll: true });
    applySearch();
  },
  mine(app, el) {
    local.mine = el.checked;
    app.render({ keepScroll: true });
    applySearch();
  },
  q(app, el) {
    local.q = el.value.slice(0, 60);
    applySearch();
  },
  open(app, b) {
    const ex = b.dataset.lib ? libExercise(b.dataset.v) : allExercises(app.program).find((e) => e.id === b.dataset.v);
    if (ex) app.openExercise(ex);
  },
  warm(app, b) {
    const w = warmups(app.program).find((x) => x.k === b.dataset.v);
    if (w) app.openExercise({ ...w, id: null, warm: true });
  },
};
return { libExercise, renderLibrary, applySearch, libraryActions };
})();

__m["src/ui/editor.js"] = (function () {
const { esc, restText, plural } = __m["src/core/util.js"];
const { displayName, sheetOf, estimateMinutes } = __m["src/core/program.js"];
const { EXERCISES, GROUPS, EQUIP, WARM_KEYS, WARM_DEFAULTS, addable } = __m["src/data/exercises.js"];
const { planErrors, exerciseFor, addSession, copySession, move, cleanPlan } = __m["src/core/plans.js"];
const { figTag, paintFigures } = __m["src/ui/figure.js"];
const { icon } = __m["src/ui/icons.js"];
const { $, openOverlay, closeOverlay, confirm, toast } = __m["src/ui/dom.js"];
/* Éditeur de programme personnalisé (plein écran).
   On travaille sur une copie : rien n'est enregistré avant « Enregistrer », et le moteur de séance ne voit jamais un
   programme incomplet (un programme invalide ne peut pas être activé, cf. core/plans.js). */








const REST = [20, 30, 45, 60, 75, 90, 105, 120, 150, 180, 240];
const SIDE_REST = [10, 15, 20, 30, 45, 60];
const HOLD = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90, 120];
const P_WORK = [20, 30, 40, 45, 50, 60];
const P_REST = [10, 15, 20, 30, 45];
const P_TOUR = [60, 90, 120, 150, 180];
const MAX_SESSIONS = 7;
const MAX_EXOS = 15;

let E = null; // { app, plan, orig, view, entry, pickGroup, pickQ }
const el = () => $('#editor');
const clone = (o) => JSON.parse(JSON.stringify(o));
const dirty = () => JSON.stringify(E.plan) !== E.orig;
const sel = (name, values, cur, fmt = (v) => v + ' s') =>
  `<select data-ef="${name}">${values.map((v) => `<option value="${v}"${v === cur ? ' selected' : ''}>${esc(fmt(v))}</option>`).join('')}</select>`;
const withCur = (list, v) => (list.includes(v) ? list : [...list, v].sort((a, b) => a - b));
const rowBtns = (i, n, kind) =>
  `<span class="ord"><button type="button" class="icon-btn sm" data-e="up" data-k="${kind}" data-i="${i}" aria-label="Monter"${i === 0 ? ' disabled' : ''}>${icon('up')}</button><button type="button" class="icon-btn sm" data-e="down" data-k="${kind}" data-i="${i}" aria-label="Descendre"${i === n - 1 ? ' disabled' : ''}>${icon('dn')}</button><button type="button" class="icon-btn sm" data-e="del" data-k="${kind}" data-i="${i}" aria-label="Retirer">${icon('close')}</button></span>`;

/* ---------- Vues ---------- */

function planView() {
  const { plan, app } = E;
  const circuit = plan.mode === 'circuit';
  const errs = planErrors(app.base, cleanPlan(plan) || plan);
  let h = `<label class="f">Nom du programme<input data-ef="name" maxlength="60" value="${esc(plan.name)}" autocomplete="off"></label>`;
  h += `<div class="setting"><div><b>Objectif hebdomadaire</b><span class="mute small">Séances par semaine</span></div><div class="pick" role="group" aria-label="Objectif hebdomadaire">${[1, 2, 3, 4, 5, 6].map((k) => `<button type="button" data-e="goal" data-v="${k}" aria-pressed="${plan.goal === k}">${k}</button>`).join('')}</div></div>`;
  if (circuit) {
    const P = plan.params;
    h += `<div class="card flat"><b>Circuit</b><div class="fields f4">
      <label class="f">Travail${sel('p.work', withCur(P_WORK, P.work), P.work)}</label>
      <label class="f">Repos${sel('p.rest', withCur(P_REST, P.rest), P.rest)}</label>
      <label class="f">Entre les séries${sel('p.restTour', withCur(P_TOUR, P.restTour), P.restTour, restText)}</label>
      <label class="f">Séries${sel('p.tours', [1, 2, 3, 4, 5], P.tours, (v) => String(v))}</label></div></div>`;
  }
  h += `<div class="sec"><h3>Séances</h3><span class="mute small">${plan.seances.length} / ${MAX_SESSIONS}</span></div><div class="card">`;
  h += plan.seances.map((se, i) => `<div class="li ed"><button type="button" class="grow tapzone" data-e="session" data-i="${i}"><b>${esc(se.title)}</b><span class="mute small" style="display:block">${se.exos.length} ${plural(se.exos.length, 'exercice', 'exercices')}${se.exos.length ? ' · ≈ ' + estimateMinutes({ mode: plan.mode, params: plan.params }, se, circuit ? plan.params.tours : 0) + ' min' : ''}</span></button>` +
    `<button type="button" class="icon-btn sm" data-e="copy" data-i="${i}" aria-label="Copier la séance"${plan.seances.length >= MAX_SESSIONS ? ' disabled' : ''}>${icon('copy')}</button>${rowBtns(i, plan.seances.length, 'se')}</div>`).join('');
  h += `</div>${plan.seances.length < MAX_SESSIONS ? `<button type="button" class="btn ghost" data-e="addse">${icon('plus')} Ajouter une séance</button>` : ''}`;
  if (errs.length) h += `<div class="card note"><b>À compléter avant de pouvoir utiliser ce programme</b><ul>${errs.slice(0, 5).map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>`;
  return { title: 'Programme', body: h, act: `<button type="button" class="btn" data-e="save">${icon('check')} Enregistrer</button>${!errs.length && E.app.program.plan !== plan.id ? '<button type="button" class="btn ghost" data-e="saveuse">Enregistrer et utiliser ce programme</button>' : ''}` };
}

function sessionView() {
  const se = E.plan.seances[E.view.s];
  const circuit = E.plan.mode === 'circuit';
  let h = `<label class="f">Nom de la séance<input data-ef="se.title" maxlength="60" value="${esc(se.title)}" autocomplete="off"></label>
    <label class="f" style="margin-top:12px">Description<input data-ef="se.sub" maxlength="200" value="${esc(se.sub)}" autocomplete="off"></label>`;
  h += `<div class="sec"><h3>Exercices</h3><span class="mute small">${se.exos.length} / ${MAX_EXOS}</span></div>`;
  h += se.exos.length ? '<div class="card">' + se.exos.map((ex, i) => `<div class="li ed"><button type="button" class="grow tapzone row" data-e="ex" data-i="${i}"><span class="th sm">${figTag(ex.k)}</span><span class="grow"><b>${esc(displayName(ex))}</b><span class="mute small" style="display:block">${circuit ? esc(ex.note || 'travail ' + E.plan.params.work + ' s') : ex.sets + ' × ' + esc(ex.reps) + ' · repos ' + esc(restText(ex.restS))}</span></span></button>${rowBtns(i, se.exos.length, 'ex')}</div>`).join('') + '</div>'
    : '<div class="card flat"><p class="mute">Aucun exercice pour l’instant : ajoute le premier depuis la bibliothèque.</p></div>';
  if (se.exos.length < MAX_EXOS) h += `<button type="button" class="btn" data-e="pick">${icon('plus')} Ajouter un exercice</button>`;
  h += `<div class="sec"><h3>Échauffement</h3><span class="mute small">${se.warm.steps.length} mouvements</span></div>`;
  h += se.warm.steps.length ? '<div class="card">' + se.warm.steps.map((w, i) => `<div class="li ed"><span class="th sm">${figTag(w.k, { t: 0.5 })}</span><span class="grow"><b>${esc(w.n)}</b><span class="mute small" style="display:block">${esc(w.dose)}</span></span>${rowBtns(i, se.warm.steps.length, 'warm')}</div>`).join('') + '</div>' : '<div class="card flat"><p class="mute">Pas d’échauffement.</p></div>';
  h += `<button type="button" class="btn ghost" data-e="wpick">${icon('plus')} Ajouter un mouvement d’échauffement</button>`;
  return { title: se.title, body: h, act: '' };
}

function exView() {
  const se = E.plan.seances[E.view.s];
  const ex = se.exos[E.view.x];
  const circuit = E.plan.mode === 'circuit';
  const sh = sheetOf(ex);
  let h = `<div class="nx"><div class="th">${figTag(ex.k)}</div><div class="grow"><b class="lg">${esc(sh.name)}</b><div class="mute small">${esc(sh.muscles)}</div></div></div>`;
  h += `<label class="f" style="margin-top:14px">Nom affiché<input data-ef="ex.n" maxlength="120" value="${esc(ex.n)}" autocomplete="off"></label>`;
  if (!circuit) {
    h += `<div class="setting"><div><b>Séries</b></div><div class="stp"><button type="button" data-e="sets" data-d="-1" aria-label="Une série de moins"${ex.sets <= 1 ? ' disabled' : ''}>−</button><output class="num" aria-live="polite">${ex.sets}</output><button type="button" data-e="sets" data-d="1" aria-label="Une série de plus"${ex.sets >= 10 ? ' disabled' : ''}>+</button></div></div>`;
    if (ex.hold) {
      h += `<div class="setting"><div><b>Durée tenue</b><span class="mute small">Chrono croissant : objectif minimum, arrêt automatique au maximum</span></div><div class="fields"><label class="f">Minimum${sel('ex.h0', withCur(HOLD, ex.hold[0]), ex.hold[0])}</label><label class="f">Maximum${sel('ex.h1', withCur(HOLD, ex.hold[1]), ex.hold[1])}</label></div></div>`;
    } else {
      h += `<label class="f" style="margin-top:8px">Répétitions par série<input data-ef="ex.reps" maxlength="40" value="${esc(ex.reps)}" placeholder="8-12, ou 10 par jambe" autocomplete="off"></label>`;
    }
    h += `<div class="setting"><div><b>Repos après chaque série</b></div>${sel('ex.restS', withCur(REST, ex.restS), ex.restS, restText)}</div>`;
    if (ex.sides) h += `<div class="setting"><div><b>Repos pour changer de côté</b><span class="mute small">${esc(ex.sides.map((p) => p.n).join(' puis '))}</span></div>${sel('ex.sideRest', withCur(SIDE_REST, ex.sideRest || 20), ex.sideRest || 20)}</div>`;
    if (!ex.hold && !ex.parts) h += `<label class="chkl" style="margin-top:8px"><input type="checkbox" data-ef="ex.noLoad"${ex.noLoad ? ' checked' : ''}> Sans charge (poids du corps) : pas de kg à noter</label>`;
    h += `<label class="f" style="margin-top:14px">Consigne personnelle<textarea data-ef="ex.tip" rows="3" maxlength="600" placeholder="Affichée dans la fiche à la place du conseil général">${esc(ex.tip || '')}</textarea></label>`;
  } else {
    h += `<label class="f" style="margin-top:14px">Consigne affichée pendant le circuit<textarea data-ef="ex.note" rows="3" maxlength="600" placeholder="Ex. : haltère légère, 20 s par côté">${esc(ex.note || '')}</textarea></label>`;
  }
  const vars = sh.variants.filter((k) => EXERCISES[k].def && !EXERCISES[k].only);
  if (vars.length) {
    h += `<div class="sec"><h3>Variantes</h3></div><p class="mute small" style="margin:-4px 0 6px">Une variante est un autre exercice : il a son propre historique et ses propres records.</p><div class="card">` +
      vars.map((k) => `<button type="button" class="li" data-e="variant" data-v="${k}"${se.exos.some((e) => e.k === k) ? ' disabled' : ''}><span class="th sm">${figTag(k)}</span><span class="grow"><b>${esc(EXERCISES[k].name)}</b><span class="mute small" style="display:block">${esc(EXERCISES[k].equip.length ? EXERCISES[k].equip.map((q) => EQUIP[q]).join(', ') : 'Sans matériel')}</span></span>${icon('swap', 'mute')}</button>`).join('') + '</div>';
  }
  h += `<button type="button" class="btn ghost" data-e="preview">${icon('info')} Voir la fiche de l’exercice</button><button type="button" class="btn danger" data-e="delex">${icon('trash')} Retirer de la séance</button>`;
  return { title: displayName(ex), body: h, act: '' };
}

function pickView(warm) {
  const se = E.plan.seances[E.view.s];
  const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  if (warm) {
    const have = new Set(se.warm.steps.map((w) => w.k));
    return { title: 'Échauffement', body: '<div class="card">' + WARM_KEYS.map((k) => `<button type="button" class="li" data-e="addwarm" data-v="${k}"${have.has(k) ? ' disabled' : ''}><span class="th sm">${figTag(k, { t: 0.5 })}</span><span class="grow"><b>${esc(WARM_DEFAULTS[k].n)}</b><span class="mute small" style="display:block">${esc(WARM_DEFAULTS[k].dose)}${have.has(k) ? ' · déjà dans l’échauffement' : ''}</span></span>${icon('plus', 'mute')}</button>`).join('') + '</div>', act: '' };
  }
  const have = new Set(se.exos.map((e) => e.k));
  const g = E.pickGroup;
  const keys = addable().filter((k) => g === 'all' || EXERCISES[k].group === g);
  const groups = Object.keys(GROUPS).filter((x) => x !== 'warm' && addable().some((k) => EXERCISES[k].group === x));
  let h = `<label class="search"><span class="sr">Rechercher</span>${icon('search')}<input type="search" data-ef="pickq" placeholder="Rechercher un exercice" value="${esc(E.pickQ)}" autocomplete="off"></label>`;
  h += `<div class="filters" role="group" aria-label="Groupe musculaire"><button type="button" data-e="pg" data-v="all" aria-pressed="${g === 'all'}">Tous</button>${groups.map((x) => `<button type="button" data-e="pg" data-v="${x}" aria-pressed="${g === x}">${esc(GROUPS[x])}</button>`).join('')}</div>`;
  const q = fold(E.pickQ.trim());
  h += '<div class="card pick-list">' + keys.map((k) => {
    const e = EXERCISES[k];
    const txt = fold(e.name + ' ' + e.muscles);
    return `<button type="button" class="li" data-e="add" data-v="${k}" data-q="${esc(txt)}"${have.has(k) ? ' disabled' : ''}${q && !txt.includes(q) ? ' hidden' : ''}><span class="th sm">${figTag(k)}</span><span class="grow"><b>${esc(e.name)}</b><span class="mute small" style="display:block">${esc(e.muscles)}${have.has(k) ? ' · déjà dans la séance' : ''}</span></span>${icon('plus', 'mute')}</button>`;
  }).join('') + '</div>';
  return { title: 'Ajouter un exercice', body: h, act: '' };
}

function draw(keepScroll = false) {
  const root = el();
  const y = root.scrollTop;
  const v = E.view.k;
  const scr = v === 'session' ? sessionView() : v === 'ex' ? exView() : v === 'pick' ? pickView(false) : v === 'wpick' ? pickView(true) : planView();
  root.innerHTML = `<div class="s-top"><button type="button" class="icon-btn" data-e="back" aria-label="${v === 'plan' ? 'Fermer l’éditeur' : 'Retour'}">${icon(v === 'plan' ? 'close' : 'back')}</button><b class="grow ell" id="ed-t" tabindex="-1">${esc(scr.title)}</b>${v !== 'plan' ? '<button type="button" class="btn sm" data-e="top">OK</button>' : ''}</div><div class="s-body">${scr.body}</div>${scr.act ? `<div class="w-act">${scr.act}</div>` : ''}`;
  paintFigures(root);
  root.scrollTop = keepScroll ? y : 0;
  if (!keepScroll) $('#ed-t', root).focus({ preventScroll: true });
}

/* ---------- Actions ---------- */

function go(view) {
  E.view = { ...E.view, ...view };
  draw();
}

function up() {
  const k = E.view.k;
  if (k === 'ex' || k === 'pick' || k === 'wpick') return go({ k: 'session' });
  if (k === 'session') return go({ k: 'plan' });
  return quit();
}

async function quit() {
  if (dirty() && !(await confirm('Abandonner les modifications ?', 'Les changements faits depuis l’ouverture de l’éditeur ne seront pas enregistrés.', 'Abandonner'))) return;
  close();
}

function close() {
  if (E && E.entry) closeOverlay(E.entry);
}

/** Nom affiché commun à toutes les occurrences d'un même exercice (même identifiant = même exercice). */
function renameAll(id, n) {
  for (const se of E.plan.seances) for (const ex of se.exos) if (ex.id === id) ex.n = n;
}

async function save(use) {
  const { app } = E;
  const plan = cleanPlan(E.plan);
  if (!plan) return toast('Programme invalide : ajoute au moins une séance.');
  plan.seances.forEach((se) => (se.warm.min = Math.max(se.warm.steps.length ? 2 : 0, Math.round(se.warm.steps.length * 0.75))));
  // une saisie en cours devient incohérente si les exercices de sa séance ont changé : on prévient avant de la vider
  const old = app.plans.get(plan.id);
  const sig = (se) => JSON.stringify(se.exos.map((e) => [e.id, e.sets || 0]));
  const affected = old ? old.seances.filter((o) => app.store.hasDraft(o.id) && (!plan.seances.find((n) => n.id === o.id) || sig(o) !== sig(plan.seances.find((n) => n.id === o.id)))) : [];
  if (affected.length) {
    const ok = await confirm('Saisie en cours', 'Une séance en cours (« ' + affected[0].title + ' ») utilise des exercices modifiés : sa saisie sera vidée. L’historique n’est pas touché.', 'Enregistrer quand même', '');
    if (!ok) return;
    for (const se of affected) app.store.clearDraft(se.id);
  }
  const saved = app.plans.put(plan);
  if (!saved) return toast('Enregistrement impossible.');
  const errs = planErrors(app.base, saved);
  if (use && !errs.length) app.usePlan(saved.id);
  else app.refreshProgram();
  E.orig = JSON.stringify(E.plan);
  close();
  app.go(use && !errs.length ? 'seance' : 'programme');
  toast(errs.length ? 'Programme enregistré. Il reste à le compléter pour pouvoir l’utiliser.' : use ? 'Programme enregistré et activé.' : 'Programme enregistré.');
}

const actions = {
  back: up,
  top: up,
  save: () => save(false),
  saveuse: () => save(true),
  goal: (b) => {
    E.plan.goal = +b.dataset.v;
    draw(true);
  },
  session: (b) => go({ k: 'session', s: +b.dataset.i }),
  ex: (b) => go({ k: 'ex', x: +b.dataset.i }),
  addse: () => {
    const se = addSession(E.plan);
    go({ k: 'session', s: E.plan.seances.indexOf(se) });
  },
  copy: (b) => {
    copySession(E.plan, E.plan.seances[+b.dataset.i]);
    draw(true);
  },
  up: (b) => reorder(b, -1),
  down: (b) => reorder(b, 1),
  del: async (b) => {
    const i = +b.dataset.i;
    const k = b.dataset.k;
    if (k === 'se') {
      if (E.plan.seances.length <= 1) return toast('Un programme garde au moins une séance.');
      if (!(await confirm('Supprimer cette séance ?', '« ' + E.plan.seances[i].title + ' » sera retirée du programme (l’historique est conservé).', 'Supprimer'))) return;
      E.plan.seances.splice(i, 1);
    } else if (k === 'ex') E.plan.seances[E.view.s].exos.splice(i, 1);
    else E.plan.seances[E.view.s].warm.steps.splice(i, 1);
    draw(true);
  },
  pick: () => go({ k: 'pick' }),
  wpick: () => go({ k: 'wpick' }),
  pg: (b) => {
    E.pickGroup = b.dataset.v;
    draw(true);
  },
  add: (b) => {
    const se = E.plan.seances[E.view.s];
    const ex = exerciseFor(b.dataset.v, E.app.base, E.plan.mode);
    const same = E.plan.seances.flatMap((s) => s.exos).find((e) => e.id === ex.id);
    if (same) ex.n = same.n;
    se.exos.push(ex);
    toast('« ' + displayName(ex) + ' » ajouté.');
    go({ k: 'session' });
  },
  addwarm: (b) => {
    E.plan.seances[E.view.s].warm.steps.push({ k: b.dataset.v, ...WARM_DEFAULTS[b.dataset.v] });
    go({ k: 'session' });
  },
  sets: (b) => {
    const ex = E.plan.seances[E.view.s].exos[E.view.x];
    ex.sets = Math.max(1, Math.min(10, ex.sets + +b.dataset.d));
    draw(true);
  },
  variant: (b) => {
    const se = E.plan.seances[E.view.s];
    const old = se.exos[E.view.x];
    const ex = exerciseFor(b.dataset.v, E.app.base, E.plan.mode);
    if (E.plan.mode !== 'circuit') {
      ex.sets = old.sets;
      ex.restS = old.restS;
      ex.rest = restText(ex.restS);
    } else if (old.note) ex.note = old.note;
    const same = E.plan.seances.flatMap((s) => s.exos).find((e) => e.id === ex.id);
    if (same) ex.n = same.n;
    se.exos[E.view.x] = ex;
    toast('Remplacé par « ' + displayName(ex) + ' ».');
    draw();
  },
  delex: () => {
    E.plan.seances[E.view.s].exos.splice(E.view.x, 1);
    go({ k: 'session' });
  },
  preview: () => {
    const ex = E.plan.seances[E.view.s].exos[E.view.x];
    E.app.openExercise({ ...ex, id: ex.id, lib: true });
  },
};

function reorder(b, d) {
  const i = +b.dataset.i;
  const list = b.dataset.k === 'se' ? E.plan.seances : b.dataset.k === 'ex' ? E.plan.seances[E.view.s].exos : E.plan.seances[E.view.s].warm.steps;
  if (move(list, i, d)) {
    draw(true);
    const nb = el().querySelector(`[data-e="${d < 0 ? 'up' : 'down'}"][data-k="${b.dataset.k}"][data-i="${i + d}"]`);
    if (nb && !nb.disabled) nb.focus({ preventScroll: true });
  }
}

/** Saisie dans un champ (sans redessiner : le clavier reste ouvert). */
function onInput(t) {
  const f = t.dataset.ef;
  if (!f) return;
  const v = t.type === 'checkbox' ? t.checked : t.value;
  const se = E.plan.seances[E.view.s];
  const ex = se && se.exos[E.view.x];
  if (f === 'name') E.plan.name = v.slice(0, 60);
  else if (f.startsWith('p.')) E.plan.params[f.slice(2)] = +v;
  else if (f === 'se.title') {
    se.title = se.short = v.slice(0, 60) || 'Séance';
    se.tab = se.title.slice(0, 40);
  } else if (f === 'se.sub') se.sub = v.slice(0, 200);
  else if (f === 'ex.n') renameAll(ex.id, v.slice(0, 120) || EXERCISES[ex.k].name);
  else if (f === 'ex.reps') ex.reps = v.slice(0, 40);
  else if (f === 'ex.restS') {
    ex.restS = +v;
    ex.rest = restText(ex.restS);
  } else if (f === 'ex.sideRest') ex.sideRest = +v;
  else if (f === 'ex.h0' || f === 'ex.h1') {
    ex.hold[f === 'ex.h0' ? 0 : 1] = +v;
    if (ex.hold[0] >= ex.hold[1]) ex.hold = f === 'ex.h0' ? [ex.hold[0], ex.hold[0] + 5] : [Math.max(5, ex.hold[1] - 5), ex.hold[1]];
    ex.reps = ex.hold[0] + '-' + ex.hold[1] + ' s';
    if (t.tagName === 'SELECT') draw(true);
  } else if (f === 'ex.noLoad') {
    if (v) ex.noLoad = true;
    else delete ex.noLoad;
  } else if (f === 'ex.tip' || f === 'ex.note') {
    if (v.trim()) ex[f.slice(3)] = v.slice(0, 600);
    else delete ex[f.slice(3)];
  } else if (f === 'pickq') {
    E.pickQ = v.slice(0, 60);
    const q = E.pickQ.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
    for (const li of el().querySelectorAll('.pick-list .li')) li.hidden = !!q && !li.dataset.q.includes(q);
  }
}

let bound = false;
function bind(root) {
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-e]');
    if (!b || !E || b.disabled) return;
    const fn = actions[b.dataset.e];
    if (fn) fn(b);
  });
  root.addEventListener('input', (e) => E && onInput(e.target));
}

/** Ouvre l'éditeur sur une copie du programme. */
function openEditor(app, plan) {
  if (E || !plan) return;
  const root = el();
  if (!bound) {
    bind(root);
    bound = true;
  }
  E = { app, plan: clone(plan), orig: JSON.stringify(plan), view: { k: 'plan', s: 0, x: 0 }, entry: null, pickGroup: 'all', pickQ: '' };
  E.entry = openOverlay(root, {
    canClose: () => {
      up(); // bouton « retour » du téléphone : remonte d'un niveau, ou demande avant d'abandonner
      return false;
    },
    onClose: () => {
      E = null;
      root.innerHTML = '';
      app.render({ keepScroll: true });
    },
  });
  draw();
}

const editorOpen = () => !!E;
return { openEditor, editorOpen };
})();

__m["src/ui/views/program.js"] = (function () {
const { esc, plural, restText, fmtDay } = __m["src/core/util.js"];
const { displayName, isCircuit, estimateMinutes } = __m["src/core/program.js"];
const { duplicatePlan, newPlan, planErrors, MAX_PLANS } = __m["src/core/plans.js"];
const { figTag } = __m["src/ui/figure.js"];
const { icon } = __m["src/ui/icons.js"];
const { toast, confirm, dialog } = __m["src/ui/dom.js"];
const { openEditor } = __m["src/ui/editor.js"];
/* Onglet « Programme » : programme actif (séances et exercices), liste des programmes (base et personnalisés),
   création, copie, suppression, guide du programme. La modification se fait dans l'éditeur (ui/editor.js). */








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

function renderProgram(app) {
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

const programActions = {
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
return { renderProgram, programActions };
})();

__m["src/ui/workout.js"] = (function () {
const { esc, mmss, restText, fmtNum, fmtInt, today, weekStart, isDay, plural, fmtDay } = __m["src/core/util.js"];
const { displayName, sessionById, setsCount, partsOf, goalOf, isCircuit } = __m["src/core/program.js"];
const { Workout, defaultValue, rowsOf, durationMin } = __m["src/core/workout.js"];
const { lastRow, suggestion, sessionSummary, weekStats } = __m["src/core/stats.js"];
const { figAnimTag, figTag, paintFigures } = __m["src/ui/figure.js"];
const { icon } = __m["src/ui/icons.js"];
const { $, openOverlay, closeOverlay, dialog, confirm, toast, stepper, bindSteppers } = __m["src/ui/dom.js"];
const { signal, keepAwake, unlockAudio, tap } = __m["src/ui/audio.js"];
const { currentDraft, saveSession, rowSummary } = __m["src/ui/views/today.js"];
/* Écran de séance guidée : affiche l'état du moteur (src/core/workout.js) et lui transmet les gestes de l'utilisateur. */










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
    body = '<div class="w-warm-details">' + body + '</div>' +
      ring('min(44vw,170px)', W.ph === 'wait' ? 'prêt quand tu veux' : W.ph === 'prep' ? 'mets-toi en place' : '');
    act = W.ph === 'wait'
      ? `<button class="btn" data-w="launch">${icon('play')} Lancer le chrono (${w.s} s)</button><button class="btn ghost" data-w="skip">Passer cet exercice</button>`
      : `<div class="btns"><button class="btn ghost" data-w="pause" id="w-pause"${W.ph === 'prep' ? ' disabled' : ''}>Pause</button><button class="btn ghost" data-w="skip">${lastStep ? 'Terminer' : 'Suivant'}</button></div>`;
  } else act = `<button class="btn" data-w="done">${lastStep ? 'Terminer l’échauffement' : 'Suivant'}</button>`;
  return { body, act, timedWarm: !!w.s };
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
  root.classList.toggle('timed-warm', !!scr.timedWarm);
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
  save: () => saveSession(app, W.session, W.draft, close),
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

function workoutOpen() {
  return !!W;
}

function startWorkout(a) {
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
return { workoutOpen, startWorkout };
})();

__m["src/ui/sheet.js"] = (function () {
const { esc, fmtDay, fmtNum, restText } = __m["src/core/util.js"];
const { sheetOf, isCircuit, displayName, trackedExercises } = __m["src/core/program.js"];
const { GROUPS, EQUIP, TYPES, EXERCISES } = __m["src/data/exercises.js"];
const { seriesOf } = __m["src/core/stats.js"];
const { figAnimTag, figTag, paintFigures } = __m["src/ui/figure.js"];
const { icon } = __m["src/ui/icons.js"];
const { lineChart } = __m["src/ui/charts.js"];
const { $, openOverlay, closeOverlay } = __m["src/ui/dom.js"];
const { rowSummary } = __m["src/ui/views/today.js"];
/* Fiche d'un exercice : illustration animée, repères (groupe, matériel, type), position de départ, étapes, conseils,
   erreurs fréquentes, variantes, et progression mesurée (charge, répétitions, volume). */










const list = (a, tag = 'ol', cls = '') => `<${tag}${cls ? ` class="${cls}"` : ''}>${a.map((z) => `<li>${esc(z)}</li>`).join('')}</${tag}>`;
const METRICS = [['best', 'Meilleure valeur'], ['reps', 'Répétitions'], ['vol', 'Volume']];
const local = { metric: 'best', part: 0 };

function statsHTML(app, ex) {
  const tracked = trackedExercises(app.program).find((e) => e.id === ex.id);
  if (!tracked) return '';
  const parts = tracked.parts && tracked.parts.length ? tracked.parts : null;
  const part = parts ? Math.min(local.part, parts.length - 1) : null;
  const all = seriesOf(app.store.state.history, app.program, tracked, part);
  if (!all.length) return '<h3 id="sheet-stats">Ta progression</h3><p class="mute">Pas encore de séance enregistrée pour cet exercice.</p>';
  let h = '<h3 id="sheet-stats">Ta progression</h3>';
  if (parts) h += `<div class="pick wide" role="group" aria-label="Exercice du superset">${parts.map((p, j) => `<button data-s="part" data-v="${j}" aria-pressed="${j === part}">${esc(p.n)}</button>`).join('')}</div>`;
  const withValue = all.filter((p) => p.best.v > 0);
  const short = (d) => fmtDay(d, { day: 'numeric', month: 'short' });
  if (withValue.length) {
    const u = withValue[withValue.length - 1].best.u;
    const pts = withValue.filter((p) => p.best.u === u).slice(-24);
    const top = pts.reduce((a, p) => (p.best.v > a.best.v || (p.best.v === a.best.v && p.best.reps > a.best.reps) ? p : a), pts[0]);
    h += `<div class="hsum"><div><b>${fmtNum(top.best.v)}</b><span>record (${u})</span></div><div><b>${fmtNum(pts[pts.length - 1].best.v)}</b><span>dernière (${u})</span></div><div><b>${all.length}</b><span>séances</span></div></div>`;
    if (pts.length >= 2) {
      const hasVol = pts.some((p) => p.vol > 0);
      const metrics = METRICS.filter(([m]) => m !== 'vol' || hasVol).filter(([m]) => m !== 'reps' || u !== 'reps');
      const m = metrics.some(([k]) => k === local.metric) ? local.metric : 'best';
      const val = (p) => (m === 'reps' ? p.reps : m === 'vol' ? Math.round(p.vol) : p.best.v);
      const unit = m === 'reps' ? 'reps' : m === 'vol' ? 'kg×reps' : u;
      const what = m === 'reps' ? 'Total des répétitions de la séance' : m === 'vol' ? 'Volume de la séance (reps × kg)' : u === 'kg' ? 'Charge maximale de la séance' : 'Meilleure série de la séance';
      h += `<div class="card flat">${metrics.length > 1 ? `<div class="pick wide" role="group" aria-label="Mesure affichée">${metrics.map(([k, l]) => `<button data-s="metric" data-v="${k}" aria-pressed="${k === m}">${l}</button>`).join('')}</div>` : ''}
        <p class="mute small" style="margin:8px 0 4px">${esc(what)}</p>${lineChart(
        pts.map((p) => ({ label: short(p.date), v: val(p), tip: short(p.date) + ' : ' + fmtNum(val(p)) + ' ' + unit + (m === 'best' && u === 'kg' && p.best.reps ? ' × ' + fmtNum(p.best.reps) + ' reps' : '') })),
        { unit, title: what + ' (' + unit + ')' },
      )}</div>`;
    }
  }
  h += '<div class="card flat">' + all.slice(-6).reverse().map((p) =>
    `<div class="li"><span class="mute" style="min-width:64px">${esc(short(p.date))}</span><span class="grow num">${esc(rowSummary(p.row))}</span></div>`).join('') + '</div>';
  return h;
}

function sheetHTML(app, ex) {
  const sh = sheetOf(ex);
  const q = encodeURIComponent(ex.yt || sh.name.split(' (')[0] + ' technique exercice');
  const circuit = isCircuit(app.program);
  const inProgram = !ex.lib && !ex.warm;
  let h = `<div class="s-top"><button class="icon-btn" id="sheet-x" aria-label="Fermer la fiche">${icon('back')}</button><b class="grow">${esc(ex.warm ? 'Échauffement' : GROUPS[sh.group] || '')}</b></div><div class="s-body">`;
  h += `<h2 id="sheet-t" tabindex="-1">${esc(ex.warm ? ex.n : sh.name)}</h2><p class="mute">${esc(sh.muscles)}</p>`;
  h += `<div class="hero-fig">${figAnimTag(ex.k)}</div>`;
  if (ex.warm) {
    h += `<p class="dose" style="text-align:center">${esc(ex.dose)}</p><h3>Comment faire</h3><p>${esc(ex.how)}</p>`;
    return h + '</div>';
  }
  const eq = sh.equip.length ? sh.equip.map((k) => EQUIP[k]).join(' · ') : 'Sans matériel';
  h += `<div class="chips" style="justify-content:center"><span class="chip">${icon('target')} ${esc(GROUPS[sh.group] || '')}</span><span class="chip">${esc(eq)}</span>${TYPES[sh.type] ? `<span class="chip">${esc(TYPES[sh.type])}</span>` : ''}</div>`;
  if (inProgram) {
    const plan = circuit ? `${app.program.params.work} s de travail, ${app.program.params.rest} s de repos` : `${ex.sets} séries · ${ex.hold ? ex.hold[0] + '–' + ex.hold[1] + ' s' : ex.reps} · repos ${restText(ex.restS)}`;
    h += `<div class="card flat plan"><span class="kicker">Dans ton programme</span><b>${esc(plan)}</b>${circuit && ex.note ? `<span class="mute small">${esc(ex.note)}</span>` : ''}</div>`;
  }
  if (sh.start) h += `<h3>Position de départ</h3><p>${esc(sh.start)}</p>`;
  h += `<h3>Exécution</h3>${list(sh.steps)}`;
  if (ex.parts) {
    h += ex.parts.map((p, j) => `<div class="card flat"><div class="nx"><div class="th">${figTag(p.k || ex.k)}</div><div><b>${j + 1}. ${esc(p.n)}</b><div class="mute">${esc(p.d || '')}</div></div></div>${p.how ? list(p.how) : ''}</div>`).join('');
  }
  if (ex.sideNote) h += `<div class="card flat"><b>Un côté après l’autre</b><p>${esc(ex.sideNote)}</p></div>`;
  if (sh.tip) h += `<div class="card flat"><b>Conseil</b><p>${esc(sh.tip)}</p></div>`;
  if (sh.errors.length) h += `<h3>Erreurs fréquentes</h3>${list(sh.errors, 'ul', 'errs')}`;
  if (ex.load) h += `<div class="card flat"><b>Charge</b><p>${esc(ex.load)}</p></div>`;
  if (sh.variants.length) {
    h += `<h3>Variantes</h3><div class="card flat">` + sh.variants.map((k) => `<button class="li" data-s="variant" data-v="${k}"><span class="th sm">${figTag(k)}</span><span class="grow"><b>${esc(EXERCISES[k].name)}</b><span class="mute small" style="display:block">${esc(EXERCISES[k].muscles)}</span></span>${icon('chev', 'mute')}</button>`).join('') + '</div>';
  }
  h += statsHTML(app, ex);
  h += `<a class="btn ghost" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener noreferrer">Chercher des vidéos de cet exercice ↗</a><p class="mute small" style="text-align:center;margin-top:6px">Ouvre YouTube dans le navigateur (nécessite Internet).</p>`;
  return h + '</div>';
}

let entry = null;
let current = null;

function fill(app, ex, { keepScroll = false } = {}) {
  const el = $('#sheet');
  const y = el.scrollTop;
  current = { app, ex };
  el.innerHTML = sheetHTML(app, ex);
  el.setAttribute('aria-label', 'Fiche : ' + displayName({ n: sheetOf(ex).name, s: ex.s }));
  paintFigures(el);
  el.scrollTop = keepScroll ? y : 0;
  $('#sheet-x', el).onclick = () => closeOverlay(entry);
}

/** Ouvre la fiche d'un exercice. opts.focus = 'stats' fait défiler jusqu'à la progression. */
function openExerciseSheet(app, ex, { focus = '', onClose = null } = {}) {
  const el = $('#sheet');
  local.part = 0;
  if (!entry) {
    el.onclick = (e) => {
      const b = e.target.closest('[data-s]');
      if (!b || !current) return;
      if (b.dataset.s === 'metric') local.metric = b.dataset.v;
      if (b.dataset.s === 'part') local.part = +b.dataset.v;
      if (b.dataset.s === 'variant') {
        const k = b.dataset.v;
        const mine = trackedExercises(current.app.program).find((x) => x.k === k && x.id === k);
        return fill(current.app, mine ? { ...mine, lib: true } : { id: k, k, n: EXERCISES[k].name, lib: true });
      }
      fill(current.app, current.ex, { keepScroll: true });
    };
    entry = openOverlay(el, {
      onClose: () => {
        entry = null;
        current = null;
        el.innerHTML = '';
        onClose && onClose();
      },
    });
  }
  fill(app, ex);
  const target = focus === 'stats' ? $('#sheet-stats', el) : null;
  if (target) target.scrollIntoView({ block: 'start' });
  try {
    $('#sheet-t', el).focus({ preventScroll: true });
  } catch (e) {
    /* focus impossible */
  }
}
return { openExerciseSheet };
})();

__m["src/main.js"] = (function () {
const { PROGRAMS } = __m["src/data/programs/index.js"];
const { Store } = __m["src/core/store.js"];
const { PlanStore, effectiveProgram } = __m["src/core/plans.js"];
const { cap1, mmss, esc, today } = __m["src/core/util.js"];
const { $, $$, toast, announce, overlayOpen } = __m["src/ui/dom.js"];
const { setLook, paintFigures } = __m["src/ui/figure.js"];
const { setSignalOptions, signal } = __m["src/ui/audio.js"];
const { bindCharts } = __m["src/ui/charts.js"];
const { icon } = __m["src/ui/icons.js"];
const { renderToday, todayActions, todayInput } = __m["src/ui/views/today.js"];
const { renderProgress, progressActions } = __m["src/ui/views/progress.js"];
const { renderLibrary, libraryActions, applySearch } = __m["src/ui/views/library.js"];
const { renderMore, moreActions, moreChange } = __m["src/ui/views/more.js"];
const { renderProgram, programActions } = __m["src/ui/views/program.js"];
const { startWorkout, workoutOpen } = __m["src/ui/workout.js"];
const { openExerciseSheet } = __m["src/ui/sheet.js"];
const { pwa } = __m["src/ui/pwa.js"];
/* Point d'entrée des pages de programme (axel.html, coralie.html) : état, onglets, évènements globaux. */


















const root = document.documentElement;
const base = PROGRAMS[root.dataset.prog];

const TABS = {
  seance: { label: 'Aujourd’hui', short: 'Accueil', icon: 'home', title: 'Aujourd’hui', render: renderToday, actions: todayActions },
  progres: { label: 'Progrès', icon: 'chart', title: 'Progrès', render: renderProgress, actions: progressActions },
  exercices: { label: 'Exercices', short: 'Exos', icon: 'book', title: 'Exercices', render: renderLibrary, actions: libraryActions, after: applySearch },
  programme: { label: 'Programme', short: 'Plan', icon: 'list', title: 'Programme', render: renderProgram, actions: programActions },
  plus: { label: 'Réglages', icon: 'gear', title: 'Réglages et données', render: renderMore, actions: moreActions },
};

/** localStorage peut être indisponible (navigation privée stricte, réglage du navigateur) : l'appli doit rester utilisable. */
function safeStorage() {
  try {
    const s = window.localStorage;
    s.getItem('sport:test');
    return s;
  } catch (e) {
    const m = new Map();
    return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), volatile: true };
  }
}

const storage = safeStorage();
const onWriteError = () => toast('Enregistrement impossible sur cet appareil : exporte tes données (onglet Réglages).', { ms: 7000 });
const plans = base ? new PlanStore({ base, storage, onWriteError }) : null;
const store = base ? new Store({ program: base, storage, onWriteError }) : null;

const app = {
  base,
  program: base,
  plans,
  store,
  tab: 'seance',
  viewOpts: {},
  render,
  go,
  startWorkout: () => startWorkout(app),
  openExercise: (ex, o) => openExerciseSheet(app, ex, o),
  startMini,
  stopMini,
  applyTheme: () => window.MonCoachTheme && window.MonCoachTheme.set(store.state.opt.theme),
  /** Recalcule le programme actif (programme de base ou personnalisé) après une modification des programmes. */
  refreshProgram() {
    const next = effectiveProgram(base, plans.plans, plans.active);
    app.program = next;
    store.setProgram(next);
  },
  /** Change de programme actif ('' = programme de base). */
  usePlan(id) {
    plans.setActive(id);
    app.refreshProgram();
  },
};

/* ---------- Affichage ---------- */

function render(opts = {}) {
  const view = $('#view');
  const tab = TABS[app.tab];
  const y = window.scrollY;
  const keyOf = (d) => d.dataset.ex || d.dataset.h || d.dataset.keep;
  const open = new Set($$('details[open]', view).map(keyOf).filter(Boolean));
  let html;
  try {
    html = tab.render(app, app.viewOpts);
  } catch (e) {
    console.error(e);
    html = `<div class="card note"><b>Affichage impossible</b><p class="mute">Une erreur empêche d’afficher cet onglet. Tes données ne sont pas perdues : ouvre l’onglet « Plus » pour les exporter.</p></div>`;
  }
  app.viewOpts = {};
  view.innerHTML = html;
  view.classList.remove('view');
  if (!opts.keepScroll) {
    void view.offsetWidth; // relance l'animation d'apparition
    view.classList.add('view');
  }
  for (const d of $$('details', view)) if (open.has(keyOf(d))) d.open = true;
  $('#title').textContent = tab.title;
  for (const b of $$('.tabs button')) {
    if (b.dataset.t === app.tab) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  }
  paintFigures(view);
  if (tab.after) tab.after(app);
  if (opts.keepScroll) window.scrollTo(0, y);
  updateBanner();
}

function go(tab, viewOpts = {}) {
  if (!TABS[tab]) return;
  app.tab = tab;
  app.viewOpts = viewOpts;
  render();
  window.scrollTo(0, 0);
  if (viewOpts.open) {
    const el = $(`[data-h="${CSS.escape(viewOpts.open)}"]`);
    if (el) el.scrollIntoView({ block: 'center' });
  }
}

function updateBanner() {
  const el = $('#update');
  const show = pwa.state.waiting && !workoutOpen();
  el.hidden = !show;
}

/* ---------- Mini-minuteur de repos (saisie libre, hors séance guidée) ---------- */

let mini = null;
let miniTimer = 0;

function drawMini() {
  const bar = $('#minibar');
  if (!mini) {
    bar.hidden = true;
    clearInterval(miniTimer);
    miniTimer = 0;
    return;
  }
  const now = Date.now();
  const left = Math.ceil((mini.end - now) / 1000);
  if (left <= 0 && !mini.done) {
    mini.done = true;
    mini.hide = now + 4000;
    signal('go');
    announce('Repos terminé');
  }
  if (mini.done && now > mini.hide) {
    mini = null;
    return drawMini();
  }
  bar.hidden = false;
  $('.l', bar).textContent = mini.label;
  $('.t', bar).textContent = mini.done ? 'Terminé' : mmss(left);
}

function startMini(sec, label) {
  mini = { end: Date.now() + sec * 1000, label, done: false, hide: 0 };
  if (!miniTimer) miniTimer = setInterval(drawMini, 250);
  drawMini();
}

function stopMini() {
  mini = null;
  drawMini();
}

/* ---------- Démarrage ---------- */

function boot() {
  const planStatus = plans.load();
  app.program = effectiveProgram(base, plans.plans, plans.active);
  store.program = app.program;
  const status = store.load();
  const program = app.program;
  setLook(program.look);
  setSignalOptions(store.state.opt);
  app.applyTheme();

  document.title = 'Mon coach – ' + base.name;
  $('#prog-name').textContent = program.name;
  const showDate = () => ($('#date').textContent = cap1(new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })));
  showDate();
  $('.tabs').innerHTML = Object.entries(TABS).map(([id, t]) => `<button type="button" data-t="${id}" aria-label="${esc(t.label)}">${icon(t.icon)}<span class="tl">${esc(t.label)}</span><span class="ts" aria-hidden="true">${esc(t.short || t.label)}</span></button>`).join('');

  const view = $('#view');
  view.addEventListener('click', (e) => {
    const b = e.target.closest('[data-a]');
    if (!b) return;
    const fn = TABS[app.tab].actions[b.dataset.a];
    if (fn) fn(app, b, e);
  });
  view.addEventListener('input', (e) => {
    if (app.tab === 'seance') todayInput(app, e.target);
    const fn = e.target.dataset.in && TABS[app.tab].actions[e.target.dataset.in];
    if (fn) fn(app, e.target, e);
  });
  view.addEventListener('change', (e) => {
    if (app.tab === 'plus') moreChange(app, e.target);
    const fn = e.target.dataset.c && TABS[app.tab].actions[e.target.dataset.c];
    if (fn) fn(app, e.target, e);
  });
  bindCharts(view);
  bindCharts($('#sheet'));

  $('.tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    go(b.dataset.t);
    announce('Onglet ' + TABS[b.dataset.t].label);
  });
  $('#minibar').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || !mini) return;
    if (b.dataset.m === 'add' && !mini.done) mini.end += 15000;
    if (b.dataset.m === 'stop') mini = null;
    drawMini();
  });
  $('#update button').addEventListener('click', () => pwa.applyUpdate());

  // Sauvegarde dès que l'appli passe en arrière-plan ou se ferme (les minuteries d'écriture peuvent ne jamais se déclencher).
  let shownDay = today();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return store.flushIfDirty();
    if (mini) drawMini();
    // appli laissée ouverte jusqu'au lendemain : la date et la semaine affichées doivent suivre
    if (today() !== shownDay) {
      shownDay = today();
      showDate();
      if (!overlayOpen()) render({ keepScroll: true });
    }
  });
  window.addEventListener('pagehide', () => store.flushIfDirty());

  // Même programme ouvert ailleurs (autre onglet, appli installée) : on fusionne ses modifications au lieu de les écraser.
  window.addEventListener('storage', (e) => {
    if (e.newValue == null) return;
    if (e.key === plans.key) {
      // programmes modifiés dans un autre onglet : on reprend la liste et le programme actif
      if (!plans.absorb(e.newValue) || workoutOpen()) return;
      app.refreshProgram();
      if (!overlayOpen()) render({ keepScroll: true });
      return;
    }
    if (e.key !== store.key) return;
    if (!store.absorb(e.newValue)) return;
    const typing = document.activeElement && view.contains(document.activeElement) && /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if (!workoutOpen() && !overlayOpen() && !typing) render({ keepScroll: true });
  });

  render();

  if (storage.volatile) toast('Le stockage du navigateur est bloqué : rien ne pourra être enregistré sur cet appareil.', { ms: 8000 });
  else if (status === 'recovered') toast('Données illisibles : la dernière copie de sécurité automatique a été restaurée.', { ms: 8000 });
  else if (status === 'reset') toast('Données illisibles mises de côté. Importe ta dernière sauvegarde depuis l’onglet Réglages.', { ms: 8000 });
  else if (planStatus === 'partial' || planStatus === 'reset') toast('Un programme personnalisé illisible a été mis de côté (il n’a pas été effacé).', { ms: 8000 });

  pwa.init(() => {
    updateBanner();
    if (app.tab === 'plus' && !overlayOpen()) {
      const active = document.activeElement;
      if (!(active && view.contains(active) && /INPUT|TEXTAREA/.test(active.tagName))) render({ keepScroll: true });
    }
  });
}

if (!base) {
  $('#view').innerHTML = '<div class="card note"><b>Programme introuvable</b><p><a href="index.html">Retour à l’accueil</a></p></div>';
} else {
  boot();
}
return {  };
})();
})();
