/* Programme « coralie » : données uniquement, le moteur est dans assets/app.js */
(window.PROGRAMS=window.PROGRAMS||{}).coralie={
 "key": "coralie",
 "mode": "circuit",
 "goal": 1,
 "title": "Programme sportif – Coralie",
 "h1": "Programme sportif – Coralie",
 "sub": "1 séance par semaine. Objectif : remise en forme et perte de poids. Avec ou sans sortie VTT.",
 "params": {
  "work": 40,
  "rest": 20,
  "restTour": 90,
  "tours": 2
 },
 "seances": [
  {
   "id": "c1",
   "short": "Circuit",
   "title": "Circuit full body",
   "sub": "Une série = les 7 exercices enchaînés : 40 s de travail, 20 s de repos, 90 s entre deux séries.",
   "warm": {
    "min": 5,
    "steps": [
     {
      "n": "Marche rapide ou montées de genoux",
      "dose": "1 minute",
      "how": "Sur place, bras actifs, pour faire monter doucement le pouls.",
      "s": 60,
      "k": "knee"
     },
     {
      "n": "Rotations d’épaules",
      "dose": "10 vers l’avant, 10 vers l’arrière",
      "how": "Bras tendus sur les côtés, petits cercles qui s’agrandissent peu à peu.",
      "s": null,
      "k": "armcirc"
     },
     {
      "n": "Squats au poids du corps",
      "dose": "10 répétitions",
      "how": "Pieds écartés de la largeur des épaules, descends en reculant les hanches, dos droit, talons au sol.",
      "s": null,
      "k": "bsquat"
     },
     {
      "n": "Pompes inclinées, mains sur le banc",
      "dose": "10 répétitions",
      "how": "Corps aligné, descends la poitrine vers le banc. Si c’est trop dur, monte les mains plus haut.",
      "s": null,
      "k": "push"
     },
     {
      "n": "Cat-cow sur le tapis",
      "dose": "8 répétitions lentes",
      "how": "À quatre pattes, creuse puis arrondis le dos en alternant, en expirant quand tu arrondis.",
      "s": null,
      "k": "catcow"
     }
    ]
   },
   "exos": [
    {
     "n": "Squat goblet jusqu’au banc",
     "note": "Force des jambes pour la pédalée. Haltère légère.",
     "k": "squat"
    },
    {
     "n": "Step-up sur le banc (alterner les jambes)",
     "note": "Reproduit l’effort de pédalage, une jambe à la fois.",
     "k": "step"
    },
    {
     "n": "Rowing un bras, genou et main sur le banc",
     "note": "Dos et prise pour tenir le guidon. 20 s par côté, en enchaînant sans pause.",
     "k": "row"
    },
    {
     "n": "Soulevé de terre roumain, haltères légères",
     "note": "Chaîne postérieure, aide à tenir la position sur le vélo.",
     "k": "rdl"
    },
    {
     "n": "Pompes inclinées, mains sur le banc",
     "note": "Stabilité des épaules et des bras en descente.",
     "k": "push"
    },
    {
     "n": "Hip thrust, haut du dos sur le banc",
     "note": "Fessiers. Sans charge, puis haltère sur les hanches.",
     "k": "hip"
    },
    {
     "n": "Planche ou dead bug sur le tapis",
     "note": "Gainage du tronc.",
     "k": "plank"
    }
   ]
  }
 ],
 "finisher": "5 minutes de cardio léger (montées de genoux, jumping jacks). À supprimer les semaines où tu roules beaucoup, le VTT faisant déjà office de cardio.",
 "info": [
  {
   "h": "Paramètres du circuit",
   "items": [
    "Travail par exercice : 40 s · repos entre exercices : 20 s · repos entre les séries : 90 s.",
    "Nombre de séries : 2 les deux premières semaines, puis 3 (proposé automatiquement, modifiable). Une série correspond aux 7 exercices enchaînés.",
    "Pour un exercice en durée (planche), laisser la charge vide."
   ]
  },
  {
   "h": "Placement dans la semaine",
   "items": [
    "Faire la séance au moins 48 h avant une grosse sortie, et éviter la veille (jambes fatiguées).",
    "Le lendemain d’une sortie ou un jour de repos convient bien.",
    "Sans VTT, le programme se suffit à lui-même. Après 4 à 6 semaines, possibilité de passer à 2 séances en alternant avec une variante (fentes, développé couché léger, rowing buste penché)."
   ]
  }
 ]
};
