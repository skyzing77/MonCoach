/* Fichier généré par « npm run build » à partir de src/home.js : ne pas modifier à la main.
   Modules : data/programs/axel.js, data/programs/coralie.js, data/programs/index.js, core/util.js, data/exercises.js, data/figures.js, core/program.js, core/plans.js, core/store.js, core/stats.js, home.js */
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
    this.state.active = id && this.get(id) ? id : '';
    this.dirtyActive = true;
    return this.save();
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

  save() {
    this.absorb(this.read());
    this.state.mt = Date.now();
    const json = JSON.stringify(this.state);
    let ok = false;
    try {
      this.storage.setItem(this.key, json);
      ok = true;
    } catch (e) {
      this.onWriteError();
    }
    if (ok) {
      this.lastRaw = json;
      this.seen = new Set(this.state.plans.map((p) => p.id));
      this.dirtyActive = false;
    }
    return ok;
  }

  /** Ajoute les programmes d'une sauvegarde (jamais de remplacement). */
  importPlans(list) {
    let added = 0;
    for (const r of Array.isArray(list) ? list : []) {
      const p = cleanPlan(r);
      if (!p || this.get(p.id) || this.state.plans.length >= MAX_PLANS) continue;
      this.state.plans.push(p);
      added++;
    }
    if (added) this.save();
    return added;
  }
}
return { PLAN_FORMAT, MAX_PLANS, cleanPlan, effectiveProgram, planErrors, exerciseFor, defaultWarm, addSession, copySession, newPlan, duplicatePlan, move, mergePlans, PlanStore };
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

const txt = (v, max = MAX_TXT) => (v == null ? '' : String(v).slice(0, max));
const posNum = (v) => (Number.isFinite(+v) && +v > 0 ? +v : 0);
const isObj = (o) => !!o && typeof o === 'object' && !Array.isArray(o);

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
  if (!isObj(h) || !isDay(String(h.date)) || !Array.isArray(h.rows) || (h.id == null && i == null)) return null;
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
  const circuit = se ? isCircuit(program) : +d.tours > 0;
  const sets = {};
  for (const x of Object.keys(d.sets)) {
    const a = d.sets[x];
    if (!/^\d+$/.test(x) || +x >= (se ? se.exos.length : 20) || !Array.isArray(a)) continue;
    sets[x] = a.slice(0, 30).map((z) => (isObj(z) ? { ...cleanSet(z), d: !!z.d } : { r: '', k: '', d: false }));
  }
  const out = {
    date: isDay(String(d.date)) ? String(d.date) : today(),
    tours: circuit ? (Number.isInteger(+d.tours) && +d.tours >= 1 && +d.tours <= 5 ? +d.tours : se ? program.params.tours : 2) : 0,
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
    if (!/^[\w-]{1,60}$/.test(sid)) continue;
    const se = program.seances.find((x) => x.id === sid) || null;
    const d = cleanDraft(drafts[sid], program, se);
    // brouillon d'une séance inconnue du programme actif : gardé seulement s'il contient une saisie
    if (d && (se || Object.values(d.sets).some((a) => a.some((z) => z.d || z.r !== '' || z.k !== '')))) s.drafts[sid] = d;
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

const signature = (h) => h.date + '|' + JSON.stringify(h.rows.map((r) => [r.ex, r.sets.map((s) => [s.r, s.k])]));

/** Ajoute à l'état les séances d'un texte exporté (formats v1 et v2). Ne supprime et ne remplace jamais rien. */
function importInto(state, text, program) {
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
  let added = 0;
  let dup = 0;
  let invalid = 0;
  d.history.forEach((raw, i) => {
    const h = cleanEntry(raw, null, program) || (isObj(raw) && raw.id == null ? cleanEntry({ ...raw, id: 'imp' + uid() + i }, null, program) : null);
    if (!h || !h.rows.length) return void invalid++;
    if (ids.has(h.id) || sigs.has(signature(h))) return void dup++;
    ids.add(h.id);
    sigs.add(signature(h));
    state.history.push(h);
    added++;
  });
  const before = state.rides.length;
  state.rides = [...new Set([...state.rides, ...(Array.isArray(d.rides) ? d.rides.map(String).filter(isDay) : [])])].sort();
  return { ok: true, added, dup, invalid, rides: state.rides.length - before, plans: isObj(j.plans) && Array.isArray(j.plans.plans) ? j.plans.plans : [] };
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
    const res = importInto(this.state, snap.raw, this.program);
    if (res.ok) this.flush();
    return res;
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
    const d = this.state.drafts[sid];
    return !!d && Object.values(d.sets).some((a) => a.some((s) => s && (s.d || s.r !== '' || s.k !== '')));
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

  import(text) {
    const res = importInto(this.state, text, this.program);
    if (res.ok) this.flush();
    return res;
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
  flush() {
    clearTimeout(this.timer);
    this.timer = null;
    this.absorb(this.read(this.key));
    this.state.v = SCHEMA;
    this.state.mt = Date.now();
    this.state.mute = !this.state.opt.sound; // lisible par l'ancienne version en cas de retour en arrière
    const json = JSON.stringify(this.state);
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

__m["src/home.js"] = (function () {
const { PROGRAMS } = __m["src/data/programs/index.js"];
const { today, weekStart, isDay, fmtDay, cap1, plural } = __m["src/core/util.js"];
const { PlanStore, effectiveProgram } = __m["src/core/plans.js"];
const { nextSession } = __m["src/core/stats.js"];
/* Page d'accueil : choix du programme et état de la semaine de chacun (lu dans le stockage local, rien n'est modifié ici). */





/** Lit l'état enregistré d'un programme sans jamais lever d'exception. */
function readState(key) {
  try {
    const s = JSON.parse(localStorage.getItem('sport:' + key) || 'null');
    return s && typeof s === 'object' ? s : null;
  } catch (e) {
    return null; // stockage indisponible ou illisible : la carte reste sans statut
  }
}

/** Programme actif du profil (programme de base ou personnalisé), lu sans rien écrire. */
function activeProgram(base) {
  try {
    const ps = new PlanStore({ base, storage: localStorage });
    const raw = localStorage.getItem(ps.key);
    const st = raw ? ps.parse(raw).state : null;
    return st ? effectiveProgram(base, st.plans, st.active) : base;
  } catch (e) {
    return base;
  }
}

function statusLines(base, state) {
  const program = activeProgram(base);
  const history = state && Array.isArray(state.history) ? state.history.filter((h) => h && isDay(String(h.date))) : [];
  const goal = (state && state.opt && Number.isInteger(state.opt.goal) && state.opt.goal > 0 && state.opt.goal) || program.goal;
  const good = history.filter((h) => typeof h.sid === 'string' || typeof h.short === 'string');
  const drafts = state && state.drafts && typeof state.drafts === 'object' ? Object.values(state.drafts) : [];
  const running = drafts.some((d) => d && d.sets && typeof d.sets === 'object' && Object.values(d.sets).some((a) => Array.isArray(a) && a.some((s) => s && (s.d || s.r || s.k))));
  const lines = [];
  if (running) lines.push('Séance en cours : à reprendre');
  if (history.length) {
    const thisWeek = weekStart(today());
    const n = history.filter((h) => weekStart(h.date) === thisWeek).length;
    lines.push(n >= goal ? 'Objectif de la semaine atteint (' + n + '/' + goal + ')' : 'Cette semaine : ' + n + '/' + goal + ' ' + plural(goal, 'séance', 'séances'));
    const last = history.map((h) => h.date).sort().pop();
    lines.push('Dernière séance : ' + fmtDay(last, { weekday: 'short', day: 'numeric', month: 'short' }));
    if (!running && program.seances.length > 1) lines.push('Prochaine : ' + nextSession(program, good).short);
  }
  if (program.plan) lines.push('Programme : ' + program.planName);
  return lines;
}

function refresh() {
  const now = new Date();
  const dateEl = document.getElementById('today');
  dateEl.textContent = cap1(now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }));
  dateEl.dateTime = today();
  document.getElementById('year').textContent = now.getFullYear();
  for (const [key, program] of Object.entries(PROGRAMS)) {
    const el = document.getElementById('st-' + key);
    if (!el) continue;
    const lines = statusLines(program, readState(key));
    el.hidden = !lines.length;
    el.textContent = '';
    lines.forEach((t, i) => {
      const span = document.createElement('span');
      span.textContent = t;
      if (i === 0) span.className = 'first';
      el.appendChild(span);
    });
  }
}

refresh();
// Retour sur l'accueil après une séance (page restaurée depuis le cache du navigateur) : le statut doit être à jour.
window.addEventListener('pageshow', (e) => e.persisted && refresh());
document.addEventListener('visibilitychange', () => document.hidden || refresh());

/* Mode hors ligne : même service worker que les pages de programme. */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {});
}
return {  };
})();
})();
