/* Programme « coralie » : données uniquement (le moteur est dans src/core et src/ui).
   Chaque exercice a un identifiant stable (id) : c'est lui qui relie l'historique à l'exercice,
   même si son nom affiché change. La clé k désigne la figure et la fiche de src/data/exercises.js. */
export default {
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
