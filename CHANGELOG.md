# Journal des changements

## 3.0.1

- Une séance est confirmée après son écriture. En cas d'échec, la saisie permet de réessayer ou d'exporter le brouillon.
- L'import distingue les séances munies d'identifiants différents et compare toutes les parties des supersets pour les anciennes sauvegardes.
- Une option d'import restaure les réglages, le programme actif et les brouillons compatibles.
- Le chrono d'échauffement reste visible sur les écrans courts. Les fichiers générés sont identiques sous Windows et Linux.

## 3.0.0

Les données des versions précédentes sont reprises automatiquement : une copie brute des données de la version 2 est
conservée (`sport:<nom>:backup-v2`) et le nouveau format reste lisible par la version 2 (voir « Revenir à une version
précédente » dans le README).

### Ajouté

- **Programmes personnalisés** (onglet *Programme*) : copier le programme de base pour le modifier, créer un programme
  vide (en séries ou en circuit), dupliquer, supprimer (avec annulation), choisir le programme actif.
  - Séances : ajouter, copier, renommer, réordonner, supprimer ; échauffement modifiable (mouvements illustrés).
  - Exercices : ajouter depuis la bibliothèque, retirer, réordonner ; séries, répétitions ou durée tenue, repos, repos
    de changement de côté, « sans charge », consigne personnelle ; remplacement par une variante.
  - Circuit : temps de travail, de repos, repos entre séries, nombre de séries par défaut.
  - Le programme de base n'est jamais modifié. Un programme incomplet peut être enregistré mais pas utilisé.
  - L'historique est commun à tous les programmes : un exercice garde ses records et ses courbes partout.
- **Tableau de bord** (onglet *Aujourd'hui*) : séance conseillée et date de la dernière fois où elle a été faite,
  anneau de l'objectif hebdomadaire, dernière séance (durée, séries, volume, écart avec la fois précédente),
  tendance sur 4 semaines, records des 30 derniers jours. État vide explicite sans historique.
- **Progrès** réorganisé en quatre rubriques :
  - *Bilan* : 4 semaines, 3 mois ou 12 mois comparés à la période précédente (séances, durée moyenne, séries, volume),
    séances par semaine ou par mois, durée des séances, séries par groupe musculaire ;
  - *Calendrier* : objectif atteint indiqué semaine par semaine, liste des séances du mois, régularité ;
  - *Exercices* : progression et records, chaque exercice d'un superset suivi séparément ;
  - *Historique* : filtres par séance, par exercice et « avec une note », regroupement par mois, comparaison de chaque
    exercice avec la fois précédente.
- **Bibliothèque** : 21 exercices documentés (position de départ, exécution, conseil, erreurs fréquentes, matériel,
  type de mouvement, variantes), recherche, filtres par groupe, matériel et type de mouvement. Deux nouveaux exercices
  illustrés : *pompes au sol* et *fentes statiques*. Élévations latérales, curl marteau, extensions triceps, squat au
  poids du corps et pont fessier deviennent des exercices à part entière.
- **Fiche d'exercice** : courbes de la meilleure valeur, des répétitions et du volume ; choix de l'exercice dans un
  superset ; variantes consultables.
- **Séance guidée** : aperçu de la séance avec accès direct à un exercice ; valeur de la même série la fois précédente
  (« Série 2 la dernière fois : 8 reps × 16 kg ») ; pas des boutons de charge réglable (0,5 / 1 / 2 / 2,5 kg).
- Accueil : programme actif et prochaine séance de chaque personne.
- Tests : 14 tests unitaires et 5 scénarios de bout en bout supplémentaires ; captures d'écran automatiques de toutes
  les vues sur six tailles d'écran en thème clair et sombre (`npm run test:visual`).

### Modifié

- Navigation à cinq onglets : *Aujourd'hui*, *Progrès*, *Exercices*, *Programme*, *Réglages*. Le guide du programme
  passe dans l'onglet *Programme*.
- Format des données v3 : ajout du pas de charge dans les réglages ; les séances gardent l'identifiant de leur séance
  et, le cas échéant, de leur programme personnalisé. Les programmes personnalisés sont rangés dans une clé séparée.
- Sauvegarde : le fichier exporté contient aussi les programmes personnalisés ; à l'import, ils sont ajoutés sans
  jamais remplacer ceux qui existent ni être activés d'office.
- Échauffement : les *cercles de bras* sont animés dans un sens puis dans l'autre, comme le demande la consigne.
- Interface : composants affinés (anneaux de progression, tuiles avec évolution, listes datées, filtres), colonne plus
  large sur ordinateur, barre d'onglets adaptée aux très petits écrans.
- Intégration continue : Playwright verrouillé (`package-lock.json`), captures d'écran conservées comme artefact.

### Corrigé

- **Records et courbes d'un superset** : la « charge maximale » mélangeait les trois exercices (le curl marteau battait
  le record des élévations latérales). Chaque exercice du superset est maintenant suivi séparément.
- **Coralie, échauffement** : l'étape s'appelait « Rotations d'épaules » alors que la consigne et l'animation décrivent
  des cercles bras tendus ; elle s'appelle désormais « Cercles de bras », comme chez Axel. Les « rotations d'épaules »
  (mains sur les épaules) restent un mouvement distinct.
- Calendrier : un jour avec deux séances n'ouvrait que la première ; on pouvait reculer indéfiniment dans des mois
  vides (le retour s'arrête maintenant au mois de la première séance).
- Volume affiché sans séparateur de milliers (« 15336 » → « 15 336 »).

## 2.0.2

### Corrigé — animations des exercices

- **Pont fessier** : les bras se dressaient vers les genoux. Ils reposent maintenant tendus au sol, le long du corps,
  et ne bougent plus ; les épaules restent fixes, le bassin pivote autour d'elles (auparavant, elles glissaient).
- **Rotations d'épaules** (Axel) : redessinées de profil, mains sur les épaules ; le coude fait un tour complet
  (avant, haut, arrière, bas) à vitesse constante, avec la trajectoire circulaire et une flèche.
- **Rotations d'épaules** (Coralie, figure des cercles de bras, aussi utilisée par « Cercles de bras » d'Axel) :
  bras tendus sur les côtés, chaque main décrit un cercle, au lieu d'un balayage de haut en bas.
- **Rowing à vide** : coudes qui partaient vers l'avant. Il reprend désormais le mouvement du rowing buste penché
  (coudes tirés vers l'arrière et le haut, avant-bras vertical), sans haltères.
- **Développé incliné** : bras pilotés par les articulations ; haltères à la verticale des épaules en haut,
  avant-bras vertical pendant toute la descente, coudes sous le niveau de la poitrine en bas.
- **Développé épaules assis** et **extension triceps** : genoux pliés à l'envers (personnage à genoux). Assise
  refaite : bassin sur le coussin, cuisses horizontales, pieds à plat ; développé avec avant-bras vertical, extension
  avec l'avant-bras qui se déplie derrière la tête (il passait devant le visage).
- **Hip thrust** (Axel et Coralie, même figure) : coudes qui se dressaient au-dessus du corps. Bras le long du buste
  jusqu'à l'haltère posée sur les hanches ; épaules fixes sur le banc, bassin qui pivote.

### Modifié

- Circuit de Coralie : « Nombre de séries (tours) » devient « Nombre de séries » (libellé seulement).
- Moteur des figures : animations en boucle (rotations), point de pivot des épaules, cercles en vue de face.
- 10 tests de biomécanique (sens des articulations, assise, avant-bras vertical, trajectoires circulaires…).

## 2.0.1

### Corrigé

- **Pages cassées et date absente quand le site est ouvert directement depuis le disque** (double-clic sur
  `index.html`) : les navigateurs refusent les modules JavaScript dans ce cas. Le code est désormais assemblé en un
  script classique par `npm run build`, et la police est intégrée à la feuille de style (elle était bloquée aussi,
  déjà dans la version d'origine). Un test de bout en bout couvre maintenant ce mode d'ouverture.

## 2.0.0 — refonte complète

Les données existantes sont reprises automatiquement (une copie de l'ancien format est conservée). Les adresses des
pages et les applis déjà installées ne changent pas.

### Corrigé

- **Figure `rdl` (soulevé de terre roumain)** : les haltères étaient dessinés loin devant les pieds alors que le repère
  indique « près des jambes ». Ils suivent maintenant les tibias.
- **Figure `step`** : la bascule du pied arrière (`ft2`) n'était définie que dans la pose d'arrivée et était ignorée
  par l'interpolation. Les deux poses définissent désormais les mêmes propriétés, et le moteur gère une valeur absente.
- **Figures `row`, `hip`, `legswing`** : cibles hors de portée des bras ou des jambes (la main ne touchait pas le
  support). **Figures `step`, `tri`** : libellés de repère coupés par le bord du cadre.
- Propriété `hl` présente dans 22 figures mais jamais lue : supprimée. Ancien moteur de figures « fil de fer » et ses
  données (`exercices.js`) : code mort, supprimé.
- **Fiche « Rowing à vide »** : consignes copiées par erreur du rowing un bras. **Planche** : le conseil de la
  bibliothèque recommandait un lest que le programme d'Axel déconseille. Mention « comme sur ta photo » sans photo.
- **Durée estimée du circuit** : l'échauffement n'était pas compté (16 min affichées au lieu de 21).
- **Circuit** : à la fin de chaque passage, les répétitions *de la séance précédente* étaient enregistrées comme si
  elles venaient d'être faites. Un passage est maintenant validé sans valeur ; la saisie se fait pendant le repos.
- **Gainage** : au retour d'une mise en veille, la durée maximale (45 s) était enregistrée d'office. Le chrono est
  désormais annulé.
- **Superset** : une seule charge pour trois exercices. Une charge et un nombre de reps par exercice.
- **Service worker** : stratégie « réseau d'abord » fichier par fichier → mélange possible de fichiers de deux versions
  avec un réseau instable, et 3 s d'attente à chaque ouverture en zone mal couverte. Version à incrémenter à la main.
- **Deux onglets** : l'onglet qui écrivait en dernier remplaçait tout, y compris la séance en cours de l'autre.
- **Reprise** : une séance guidée interrompue perdait son repos en cours et sa position dans un superset.
- **Bouton « retour » d'Android** : quittait l'application en pleine séance.
- **Dates** : « 2026-02-31 » était accepté ; l'appli laissée ouverte gardait la date de la veille.
- **Import** : séances identiques importées deux fois si leur identifiant différait ; champs non bornés.
- **Stockage plein** : l'écriture échouait sans tentative de récupération.
- Animation de fond et boucle de dessin des figures actives en permanence, même sans rien à animer.
- Libellé « kg soulevés » trompeur (reps × charge d'un seul haltère) : renommé « kg × reps ».

### Ajouté

- Onglet **Progrès** : calendrier mensuel (avec saisie des sorties VTT), régularité sur 12 semaines, courbe détaillée
  par exercice, records datés, détail de chaque séance.
- Onglet **Exercices** : bibliothèque filtrable par groupe musculaire, fiches enrichies (plan, conseils, progression).
- Séance guidée : retour à l'étape précédente, menu « quitter » (reprendre plus tard / terminer / abandonner), rappel
  de la dernière performance et suggestion de progression, notes en fin de séance, reprise exacte après fermeture.
- Données : export CSV, copie de sécurité automatique quotidienne, récupération automatique en cas de données
  illisibles, annulation d'une suppression, fusion entre onglets.
- Réglages : sons et vibrations séparés, objectif hebdomadaire, thème clair / sombre / automatique.
- PWA : mises à jour sans mélange de versions, bandeau « Nouvelle version prête », version affichée, état du stockage.
- Politique de sécurité de contenu (CSP) interdisant tout script en ligne et toute connexion externe.
- 63 tests unitaires et 20 scénarios de bout en bout ; intégration continue ; version du cache calculée automatiquement.

### Modifié

- Code réorganisé en modules ES (`src/core`, `src/data`, `src/ui`), sans dépendance ni étape de compilation.
- Interface redessinée (hiérarchie, espacements, navigation à 4 onglets, icônes vectorielles) en conservant l'identité
  de chaque programme.
