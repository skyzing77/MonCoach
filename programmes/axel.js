/* Programme « axel » : données uniquement, le moteur est dans assets/app.js */
(window.PROGRAMS=window.PROGRAMS||{}).axel={
 "key": "axel",
 "mode": "sets",
 "goal": 2,
 "ui": 2,
 "title": "Programme sportif – Axel",
 "h1": "Programme sportif – Axel",
 "sub": "2 séances par semaine, complémentaires du VTT. Charges proches de l’échec : arrêter 1 à 2 reps avant la limite.",
 "seances": [
  {
   "id": "s1",
   "short": "Séance 1 · jambes et dos",
   "title": "Séance 1 – accent jambes et dos",
   "sub": "Full body avec accent jambes et dos.",
   "dur": 52,
   "warm": {
    "min": 5,
    "steps": [
     {
      "n": "Montées de genoux sur place",
      "dose": "30 secondes",
      "how": "Monte les genoux à hauteur de hanche en balançant les bras. Le but est de te réchauffer, pas de te fatiguer.",
      "s": 30,
      "k": "knee"
     },
     {
      "n": "Balancés de jambe",
      "dose": "10 par jambe",
      "how": "Appuie une main au mur et balance la jambe d’avant en arrière, en augmentant l’amplitude à chaque répétition.",
      "s": null,
      "k": "legswing"
     },
     {
      "n": "Squats au poids du corps",
      "dose": "12 répétitions",
      "how": "Pieds écartés de la largeur des épaules, descends cuisses parallèles au sol en 2 s, dos droit, talons collés au sol.",
      "s": null,
      "k": "bsquat"
     },
     {
      "n": "Pont fessier",
      "dose": "12 répétitions",
      "how": "Sur le dos, pieds à plat, monte les hanches et serre les fessiers 1 s en haut, puis redescends.",
      "s": null,
      "k": "bridge"
     },
     {
      "n": "Bonjour sans charge",
      "dose": "10 répétitions",
      "how": "Jambes presque tendues, mains derrière la tête, recule les hanches en gardant le dos plat, puis remonte. Prépare le soulevé de terre roumain.",
      "s": null,
      "k": "hinge"
     },
     {
      "n": "Cat-cow sur le tapis",
      "dose": "8 répétitions lentes",
      "how": "À quatre pattes, creuse puis arrondis le dos en alternant, en expirant quand tu arrondis.",
      "s": null,
      "k": "catcow"
     },
     {
      "n": "Série d’approche : fentes bulgares",
      "dose": "6 reps par jambe",
      "how": "Haltères légères (environ la moitié de ta charge de travail). Jambe gauche devant puis jambe droite devant, sans pause entre les deux et sans forcer. Ensuite, 1 min 15 de récupération avant la première vraie série.",
      "s": null,
      "k": "bulg",
      "rest": 75
     }
    ]
   },
   "exos": [
    {
     "n": "Fentes bulgares (pied arrière sur le banc)",
     "sets": 4,
     "reps": "6-10 par jambe",
     "rest": "90-120 s",
     "restS": 105,
     "k": "bulg",
     "sides": [
      {
       "n": "Jambe gauche devant",
       "d": "pied droit posé sur le banc"
      },
      {
       "n": "Jambe droite devant",
       "d": "pied gauche posé sur le banc"
      }
     ],
     "sideNote": "Une série = 6 à 10 reps jambe gauche devant, puis 6 à 10 reps jambe droite devant, avec 30 s de récupération pour changer de côté (chrono automatique, tu peux le passer). C’est la jambe de devant qui travaille : le pied posé sur le banc sert seulement d’équilibre. L’appli fait commencer par une jambe différente à chaque série, pour que les deux soient aussi fraîches.",
     "yt": "fentes bulgares haltères technique",
     "sideRest": 30
    },
    {
     "n": "Soulevé de terre roumain aux haltères",
     "sets": 4,
     "reps": "8-10",
     "rest": "90-120 s",
     "restS": 105,
     "k": "rdl",
     "s": "Soulevé de terre roumain"
    },
    {
     "n": "Développé couché aux haltères",
     "sets": 4,
     "reps": "6-10",
     "rest": "90 s",
     "restS": 90,
     "k": "bench",
     "s": "Développé couché"
    },
    {
     "n": "Rowing un bras sur le banc",
     "sets": 4,
     "reps": "8-10 par côté",
     "rest": "75 s",
     "restS": 75,
     "k": "row",
     "sides": [
      {
       "n": "Bras droit tire",
       "d": "main et genou gauches sur le banc"
      },
      {
       "n": "Bras gauche tire",
       "d": "main et genou droits sur le banc"
      }
     ],
     "sideNote": "Une série = toutes les reps avec un bras, puis toutes les reps avec l’autre, avec 20 s de récupération pour changer de côté (chrono automatique, tu peux le passer). La main et le genou posés sur le banc sont ceux du côté opposé au bras qui tire. L’appli fait commencer par un bras différent à chaque série.",
     "steps": [
      "Pour tirer avec le bras droit : main gauche et genou gauche sur le banc, pied droit au sol un peu en arrière et écarté. Dos plat, presque parallèle au sol.",
      "Haltère dans la main droite, bras tendu sous l’épaule.",
      "Tire le coude vers la hanche (pas vers l’épaule) en serrant l’omoplate, puis redescends lentement jusqu’au bras tendu.",
      "Toutes les reps faites : inverse (main et genou droits sur le banc, bras gauche qui tire)."
     ],
     "yt": "rowing un bras haltère banc technique",
     "sideRest": 20
    },
    {
     "n": "Montées sur la pointe des pieds, une jambe",
     "sets": 3,
     "reps": "12-15 par jambe",
     "rest": "60 s",
     "restS": 60,
     "k": "calf",
     "sides": [
      {
       "n": "Pied gauche",
       "d": "haltère main gauche, main droite au support"
      },
      {
       "n": "Pied droit",
       "d": "haltère main droite, main gauche au support"
      }
     ],
     "sideNote": "Une série = 12 à 15 reps sur le pied gauche, puis 12 à 15 sur le pied droit, avec 20 s de récupération pour changer de côté (chrono automatique, tu peux le passer). 3 séries = 3 séries pour chaque pied : les deux travaillent autant. 3 séries suffisent : les mollets sont un petit muscle et travaillent déjà beaucoup en VTT.",
     "steps": [
      "Debout au sol, pieds nus ou en chaussures plates, face à un mur ou un poteau. Pose la main du côté opposé au pied qui travaille dessus, juste pour l’équilibre.",
      "Tiens-toi sur le pied qui travaille et plie l’autre jambe derrière toi, pied décollé du sol (comme sur ta photo).",
      "Prends l’haltère dans la main du même côté que le pied qui travaille, bras tendu le long du corps.",
      "Monte le plus haut possible sur la pointe, tiens 2 s en haut, puis redescends en 3 s jusqu’à poser tout le talon. Repars sans rebondir."
     ],
     "tip": "Au sol, l’amplitude est plus courte qu’avec une marche : compense avec la pause de 2 s en haut et la descente lente. Jambe d’appui tendue sans verrouiller le genou, la main ne pousse pas sur le support.",
     "load": "Une seule haltère, côté pied qui travaille (main gauche pour le pied gauche). Commence vers 10-12 kg ; quand 15 reps propres passent avec la pause de 2 s, augmente de 2 kg.",
     "yt": "mollets debout une jambe haltère technique",
     "sideRest": 20,
     "s": "Mollets, une jambe"
    },
    {
     "n": "Planche (gainage sur les avant-bras)",
     "sets": 3,
     "reps": "30-45 s",
     "rest": "45 s",
     "restS": 45,
     "k": "plank",
     "hold": [
      30,
      45
     ],
     "noLoad": true,
     "steps": [
      "Avant-bras au sol, coudes sous les épaules, pieds écartés de la largeur des hanches.",
      "Décolle les hanches pour aligner tête, épaules, hanches et talons.",
      "Serre fessiers et abdos, bas du dos plat (pas creusé), et respire calmement.",
      "Lance le chrono une fois en place ; arrête-le dès que la position se dégrade."
     ],
     "tip": "Mieux vaut 30 s parfaites que 45 s avec le dos creusé ou les fesses en l’air.",
     "load": "Pas de lest avec ton matériel : seul, une haltère ne tient pas en place sur le dos. Pour progresser quand 3 × 45 s deviennent faciles : 1) pieds surélevés sur le banc ; 2) planche « RKC » : serre fessiers, abdos et cuisses au maximum en tirant les coudes vers les pieds (20-30 s suffisent) ; 3) gainage latéral 30-45 s par côté, une haltère de 5 à 10 kg posée sur la hanche du dessus.",
     "yt": "planche gainage avant-bras technique",
     "s": "Planche"
    }
   ],
   "tab": "S1 · Jambes & dos"
  },
  {
   "id": "s2",
   "short": "Séance 2 · haut du corps",
   "title": "Séance 2 – accent haut du corps",
   "sub": "Full body avec accent haut du corps, plus le hip thrust pour l’arrière des cuisses et les fessiers.",
   "dur": 52,
   "warm": {
    "min": 5,
    "steps": [
     {
      "n": "Jumping jacks ou corde à sauter",
      "dose": "40 secondes",
      "how": "Rythme régulier et léger pour faire monter la chaleur et le pouls.",
      "s": 40,
      "k": "jack"
     },
     {
      "n": "Cercles de bras",
      "dose": "10 vers l’avant, 10 vers l’arrière",
      "how": "Bras tendus sur les côtés, petits cercles qui s’agrandissent peu à peu.",
      "s": null,
      "k": "armcirc"
     },
     {
      "n": "Rotations d’épaules",
      "dose": "10 répétitions",
      "how": "Mains posées sur les épaules, fais de larges cercles avec les coudes.",
      "s": null,
      "k": "shoulder"
     },
     {
      "n": "Pompes inclinées, mains sur le banc",
      "dose": "10 répétitions",
      "how": "Corps aligné, descends la poitrine vers le banc. Si c’est trop facile, tu peux choisir un support plus bas.",
      "s": null,
      "k": "push"
     },
     {
      "n": "Rowing à vide",
      "dose": "12 répétitions",
      "how": "Buste penché, dos plat, avec des haltères très légères (ou sans rien) : tire les coudes vers l’arrière en serrant les omoplates.",
      "s": null,
      "k": "rowv"
     },
     {
      "n": "Cat-cow sur le tapis",
      "dose": "8 répétitions lentes",
      "how": "À quatre pattes, creuse puis arrondis le dos en alternant pour assouplir le haut du dos.",
      "s": null,
      "k": "catcow"
     },
     {
      "n": "Série d’approche : développé incliné",
      "dose": "8 reps",
      "how": "Haltères légères (environ la moitié de ta charge de travail), sans aller vers l’échec. Ensuite, 1 min 15 de récupération avant la première vraie série.",
      "s": null,
      "k": "incl",
      "rest": 75
     }
    ]
   },
   "exos": [
    {
     "n": "Développé incliné aux haltères",
     "sets": 4,
     "reps": "6-10",
     "rest": "90 s",
     "restS": 90,
     "k": "incl",
     "s": "Développé incliné"
    },
    {
     "n": "Rowing buste penché (ou poitrine appuyée sur le banc incliné)",
     "sets": 4,
     "reps": "8-12",
     "rest": "75 s",
     "restS": 75,
     "k": "rowb",
     "s": "Rowing buste penché"
    },
    {
     "n": "Développé épaules assis",
     "sets": 3,
     "reps": "8-10",
     "rest": "90 s",
     "restS": 90,
     "k": "ohp"
    },
    {
     "n": "Step-up sur le banc (haltères aux mains)",
     "sets": 3,
     "reps": "8-10 par jambe",
     "rest": "75 s",
     "restS": 75,
     "k": "step",
     "sides": [
      {
       "n": "Jambe gauche",
       "d": "pied gauche posé sur le banc"
      },
      {
       "n": "Jambe droite",
       "d": "pied droit posé sur le banc"
      }
     ],
     "sideNote": "Une série = toutes les reps avec le pied gauche sur le banc, puis toutes avec le pied droit, avec 30 s de récupération pour changer de côté (chrono automatique, tu peux le passer). L’appli fait commencer par une jambe différente à chaque série.",
     "steps": [
      "Face au banc, haltères le long du corps, pose tout le pied qui travaille sur le banc.",
      "Monte en poussant dans le talon de ce pied jusqu’à être debout sur le banc, sans t’élancer avec la jambe restée au sol.",
      "Redescends en contrôle en reposant d’abord l’autre pied au sol. Fais toutes les reps de ce côté, puis change."
     ],
     "sideRest": 30
    },
    {
     "n": "Hip thrust au banc (haltère sur les hanches)",
     "sets": 3,
     "reps": "10-12",
     "rest": "75 s",
     "restS": 75,
     "k": "hip",
     "steps": [
      "Assis au sol, le bas des omoplates contre le bord long du banc, pieds à plat écartés largeur de hanches.",
      "Pose une haltère en travers des hanches (sur une serviette pliée pour le confort) et tiens-la à deux mains.",
      "Pousse dans les talons pour monter les hanches jusqu’à aligner épaules, hanches et genoux (tibias verticaux en haut).",
      "Serre fort les fessiers 1 s en haut, puis redescends en contrôle sans poser les fesses."
     ],
     "tip": "Menton rentré et regard vers les genoux : en haut, c’est le bassin qui bascule, pas le bas du dos qui se creuse.",
     "load": "Une haltère posée en travers des hanches. Commence vers 16-20 kg ; à 24 kg × 12 reps faciles, marque 2 s en haut ou passe en version une jambe.",
     "yt": "hip thrust banc haltère technique",
     "s": "Hip thrust"
    },
    {
     "n": "Superset : élévations latérales, curl marteau, extensions triceps",
     "sets": 3,
     "reps": "10-15 de chaque",
     "rest": "60 s entre les tours",
     "restS": 60,
     "k": "curl",
     "parts": [
      {
       "n": "Élévations latérales",
       "d": "10-15 reps",
       "k": "lat",
       "how": [
        "Debout, haltères légères le long du corps, coudes très légèrement fléchis.",
        "Monte les bras sur les côtés jusqu’à hauteur d’épaules, pas plus haut.",
        "Redescends lentement."
       ]
      },
      {
       "n": "Curl marteau",
       "d": "10-15 reps",
       "k": "hcurl",
       "how": [
        "Debout, paumes face à face, coudes collés au corps.",
        "Monte les haltères vers les épaules sans bouger les coudes.",
        "Redescends lentement jusqu’aux bras tendus."
       ]
      },
      {
       "n": "Extensions triceps",
       "d": "10-15 reps",
       "k": "tri",
       "how": [
        "Assis sur le banc, une haltère tenue à deux mains derrière la tête, coudes pointés vers le plafond.",
        "Tends les bras au-dessus de la tête sans écarter les coudes.",
        "Redescends lentement derrière la tête."
       ]
      }
     ],
     "steps": [
      "Enchaîne les trois exercices sans pause : élévations latérales, puis curl marteau, puis extensions triceps.",
      "Récupère ensuite 1 minute, puis recommence pour la série suivante."
     ],
     "tip": "Charges légères et mouvements contrôlés. Une charge différente par exercice est normale (les élévations latérales sont les plus légères).",
     "s": "Superset bras"
    },
    {
     "n": "Dead bug et rotations contrôlées",
     "sets": 3,
     "reps": "10",
     "rest": "45 s",
     "restS": 45,
     "k": "dead",
     "noLoad": true,
     "s": "Dead bug"
    }
   ],
   "tab": "S2 · Haut du corps"
  }
 ],
 "finisher": null,
 "info": [
  {
   "h": "Consignes",
   "items": [
    "Charges proches de l’échec : arrêter 1 à 2 reps avant la limite.",
    "Exercices sur un côté (fentes bulgares, rowing un bras, mollets, step-up) : une série = les deux côtés, l’un après l’autre, avec 20 à 30 s de récupération pour changer de côté (chrono automatique). L’appli indique par quel côté commencer et alterne à chaque série. Note les reps par côté et la charge d’une haltère.",
    "Planche : le chrono se lance quand tu es en place et s’arrête quand tu appuies (ou à 45 s). Pas de charge à noter."
   ]
  },
  {
   "h": "Progression",
   "items": [
    "Double progression : quand toutes les séries atteignent le haut de la fourchette de reps, passer à la charge supérieure.",
    "Les haltères limitent la charge : jouer sur le tempo (descente en 3 s), les pauses d’1 s en bas et les exercices unilatéraux."
   ]
  },
  {
   "h": "Compatibilité VTT",
   "items": [
    "Séance 1 (jambes) : au moins 48 h avant une grosse sortie, à éviter la veille.",
    "Séance 2 (haut du corps) : passe bien le lendemain d’une sortie, elle fatigue peu les jambes.",
    "Rowings, curls marteau et gainage renforcent le haut du dos, la prise et le tronc, utiles pour tenir le guidon.",
    "Hip thrust en séance 2 : il complète le soulevé de terre roumain de la séance 1 (fessiers et arrière des cuisses, utiles pour la puissance de pédalage et le bas du dos).",
    "Sans VTT, le programme tient tel quel ; une 3ᵉ séance (full body léger ou bras/épaules) peut s’ajouter plus tard."
   ]
  }
 ]
};
