# Mon coach 🏋️

Application web de coaching sportif personnel : tableau de bord, séance guidée pas à pas, minuteurs, programmes
personnalisables, bibliothèque d'exercices animés, historique, statistiques et sauvegarde. Elle s'installe sur le téléphone, fonctionne sans réseau et **ne transmet aucune donnée** : tout reste dans
le navigateur de l'appareil.

**👉 Ouvrir l'application : https://skyzing77.github.io/MonCoach/**

Deux programmes sont inclus : **Axel** (2 séances par semaine, en séries) et **Coralie** (1 circuit par semaine).

## ✨ Fonctionnalités

| | |
|---|---|
| **Tableau de bord** | Séance conseillée, objectif de la semaine, dernière séance et écart avec la fois précédente, tendance sur 4 semaines, records récents. |
| **Séance guidée** | Échauffement, exercices illustrés et animés, objectif et repos affichés en grand, saisie des reps et des charges au pouce (− / +, pas réglable), valeurs de la dernière séance proposées, aperçu de la séance avec accès direct à un exercice. |
| **Exercices particuliers** | Unilatéraux (côté de départ alterné à chaque série, repos de changement de côté), supersets (une charge par exercice), gainage chronométré, circuits travail / repos automatiques. |
| **Minuteurs** | Repos, travail, mise en place 3 s, chrono croissant ; pause, +15 s, retour à l'étape précédente. Calés sur l'heure réelle : justes même si le téléphone ralentit l'appli. Bips, vibrations, écran maintenu allumé. |
| **Reprise** | Une séance interrompue (appel, appli fermée, téléphone redémarré) reprend exactement où elle en était, repos en cours compris. |
| **Progrès** | Bilan par période comparé à la période précédente (séances, durée, séries, volume), séances par semaine ou par mois, durée des séances, séries par groupe musculaire, calendrier avec objectif hebdomadaire, courbes et records par exercice, historique filtrable, suggestion de progression (double progression). |
| **Programmes** | Programme de base de chacun, plus des programmes personnalisés : séances, exercices, séries, répétitions, repos, échauffement, variantes, consignes. L'historique est commun à tous les programmes. |
| **Bibliothèque** | 21 exercices : animation, position de départ, exécution, conseils, erreurs fréquentes, matériel, variantes, historique des charges. Recherche et filtres (groupe musculaire, matériel, type de mouvement). |
| **Données** | Export / import en fichier, copie dans le presse-papiers, export tableur (CSV), copie de sécurité automatique, rappel de sauvegarde. |
| **Réglages** | Sons, vibrations, objectif hebdomadaire, pas de la charge, thème sombre / clair / automatique. |
| **Hors ligne** | Après la première visite, tout fonctionne sans réseau. Les mises à jour s'installent en arrière-plan. |

Tout ce qui est affiché provient de valeurs saisies ou chronométrées : l'application ne produit aucune estimation
(calories, charge maximale théorique…).

## 📱 Installer sur le téléphone

- **iPhone (Safari)** : ouvrir la page de son programme → bouton Partager → « Sur l'écran d'accueil ».
- **Android (Chrome)** : ouvrir la page de son programme → menu ⋮ → « Installer l'application ».

Installer directement la page de son programme (`axel.html` ou `coralie.html`) l'ouvre au bon endroit à chaque lancement.

## 💾 Sauvegarder ses données

L'historique est stocké uniquement sur l'appareil. Il peut être perdu si l'on vide les données du navigateur
(et Safari peut effacer les données d'un site resté longtemps inutilisé).

Onglet **Réglages → Tes données** : « Exporter une sauvegarde » de temps en temps (l'application le rappelle).
Le fichier contient l'historique et les programmes personnalisés. Il se réimporte sur n'importe quel appareil : les
séances et les programmes sont **ajoutés**, jamais remplacés, et les doublons sont ignorés.

Protections intégrées :

- les données des anciennes versions sont reprises automatiquement ; une copie brute est conservée avant chaque
  changement de format (`sport:<nom>:backup-v1`, `sport:<nom>:backup-v2`) ;
- une copie de sécurité automatique est faite au premier lancement de chaque jour (récupérable depuis l'onglet Plus) ;
- si les données deviennent illisibles, elles sont mises de côté (jamais effacées) et la copie de sécurité est restaurée ;
- deux onglets ou l'appli installée + le navigateur ouverts en même temps : les modifications sont fusionnées.

### Revenir à une version précédente

Le format de la version 3 est un sur-ensemble de celui de la version 2 : si l'on republie la version 2, elle relit
tout l'historique et les réglages. Elle ignore seulement ce qui n'existe qu'en version 3 (pas de la charge, programme
d'origine d'une séance, saisie en cours d'une séance personnalisée). Les programmes personnalisés sont rangés à part
(`sport:<nom>:plans`) : la version 2 les ignore sans les effacer, et ils réapparaissent au retour en version 3.
Par précaution, exporter une sauvegarde avant tout retour en arrière.

## ✏️ Personnaliser son programme

Onglet **Programme** → « Personnaliser une copie » (ou « Créer un programme »). On modifie une copie : le programme de
base reste intact et on peut y revenir à tout moment (« Mes programmes »). Un programme est enregistré même incomplet,
mais ne peut être utilisé que lorsque chaque séance a au moins un exercice. Une variante (ex. pompes au sol au lieu de
pompes inclinées) est un exercice distinct, avec son propre historique.

## 🚀 Lancer en local

Aucune dépendance à installer : ce sont des fichiers statiques. On peut simplement **ouvrir `index.html` par double-clic**
(l'installation sur l'écran d'accueil et les mises à jour automatiques ne sont alors pas disponibles : elles demandent
que le site soit publié ou servi en local). Pour développer :

```bash
npm start            # http://localhost:8000 (équivalent : node tools/serve.mjs)
```

Node.js 20 ou plus récent est nécessaire uniquement pour les outils (serveur local, tests, préparation d'une version).

## ✅ Tests

```bash
npm test             # tests unitaires (Node, sans navigateur) : données, figures, stockage, programmes, statistiques, moteur de séance
npm run test:e2e     # tests de bout en bout dans Chromium : séances, minuteurs, programmes personnalisés, import/export, hors ligne, mises à jour…
npm run test:visual  # captures de toutes les vues (6 tailles d'écran, clair et sombre) dans tests/e2e/captures/
npm run test:all     # unitaires + bout en bout
```

Les tests dans le navigateur utilisent Playwright, outil de développement seulement (le site n'en dépend pas). Sa
version est verrouillée par `package-lock.json` :

```bash
npm ci
npx playwright install chromium
```

Un seul scénario : `npm run test:e2e -- "hors ligne"` (filtre sur le nom).

## 📦 Publier une nouvelle version

GitHub Pages publie automatiquement la branche principale (dossier racine). Avant de pousser :

```bash
npm run build        # assemble src/ dans assets/js/, intègre la police, met à jour la version dans sw.js
npm test             # vérifie notamment que sw.js est à jour
git add -A
git commit -m "…"
git push
```

`npm run build` remplace l'ancienne consigne « incrémenter VERSION à la main » : la version est calculée à partir du
contenu des fichiers, et l'intégration continue (`.github/workflows/ci.yml`) refuse une publication où `sw.js` n'est
pas à jour. Pour une évolution notable, changer aussi `version` dans `package.json`.

Côté utilisateur, la nouvelle version est téléchargée en entier en arrière-plan, puis activée à l'ouverture suivante de
l'appli (ou tout de suite via le bandeau « Nouvelle version prête »). Une séance en cours n'est jamais interrompue.

Tous les chemins sont relatifs : le site fonctionne aussi bien sous `https://<compte>.github.io/MonCoach/` qu'à la
racine d'un domaine personnalisé, sans rien modifier.

## 📁 Structure du projet

```text
MonCoach/
├── index.html                  Accueil (choix du programme, statut de la semaine)
├── axel.html · coralie.html    Pages des programmes (coquilles : tout le contenu vient de assets/js/app.js)
├── 404.html                    Page « introuvable » (autonome)
├── sw.js                       Service worker : cache hors ligne, mises à jour (bloc de version généré)
├── manifest-*.webmanifest      Manifestes d'installation (un par page)
├── assets/
│   ├── css/app.css · home.css  Styles (thèmes par programme, mode clair / sombre)
│   ├── js/app.js · home.js     Scripts générés par « npm run build » à partir de src/ (ne pas modifier)
│   ├── fonts.css + fonts/      Police Bricolage Grotesque intégrée (fonts.css est généré ; licence OFL)
│   └── icons/                  Icônes de l'application
├── src/
│   ├── main.js · home.js       Points d'entrée (pages de programme, accueil)
│   ├── boot-theme.js           Applique le thème avant le premier affichage
│   ├── core/                   Logique pure, sans DOM, entièrement testée
│   │   ├── util.js             Texte, nombres, dates
│   │   ├── program.js          Lecture et validation des programmes
│   │   ├── store.js            Données : validation, migration, sauvegarde, fusion entre onglets, import / export
│   │   ├── plans.js            Programmes personnalisés : nettoyage, programme actif, copie, fusion, stockage
│   │   ├── stats.js            Semaine, périodes, régularité, records, progression, groupes musculaires
│   │   └── workout.js          Moteur de la séance guidée (machine à états + chronos)
│   ├── data/
│   │   ├── exercises.js        Bibliothèque d'exercices (muscles, matériel, consignes, erreurs, variantes)
│   │   ├── figures.js          Poses des figures illustrées
│   │   └── programs/           axel.js · coralie.js · index.js
│   └── ui/                     Interface
│       ├── figure.js           Rendu SVG et animation des figures
│       ├── workout.js          Écran de séance guidée
│       ├── sheet.js            Fiche d'exercice
│       ├── editor.js           Éditeur de programme personnalisé
│       ├── views/              Onglets : today.js · progress.js · library.js · program.js · more.js
│       ├── charts.js           Graphiques SVG
│       ├── dom.js              Dialogues, messages, écrans superposés (bouton « retour »)
│       ├── audio.js            Bips, vibrations, écran allumé
│       ├── pwa.js              Enregistrement et mises à jour du service worker
│       └── icons.js            Icônes au trait
├── tests/
│   ├── unit/                   node --test
│   └── e2e/                    run.mjs (scénarios Playwright) · visual.mjs (captures d'écran)
├── tools/
│   ├── serve.mjs               Serveur statique local
│   ├── bundle.mjs              Assemblage des modules en un script classique (sans dépendance)
│   └── build.mjs               Scripts assemblés, police intégrée, version et liste de cache de sw.js
└── docs/ARCHITECTURE.md        Documentation technique
```

## ➕ Ajouter une personne ou modifier un programme de base

Pour un simple changement d'exercices, l'onglet **Programme** de l'appli suffit (voir plus haut). Pour ajouter une
personne ou changer le programme de base livré avec l'appli :

1. Copier `src/data/programs/coralie.js` (mode `circuit`) ou `axel.js` (mode `sets`) en `<nom>.js`, adapter `key`, `name`
   et les séances, puis l'ajouter dans `src/data/programs/index.js`.
   - Chaque exercice a un `id` **stable** (il relie l'historique à l'exercice : ne pas le changer après coup) et une clé
     `k` qui désigne sa figure (`src/data/figures.js`) et sa fiche (`src/data/exercises.js`).
   - Si un exercice est renommé, ajouter l'ancien nom dans `aka: ['ancien nom']` pour que l'historique d'avant la
     version 2 reste rattaché.
2. Copier `coralie.html` en `<nom>.html` et y remplacer `coralie` (attribut `data-prog`, manifeste, icônes, titre).
3. Ajouter `manifest-<nom>.webmanifest`, les icônes `assets/icons/<nom>-*.png`, un thème `:root[data-prog="<nom>"]`
   dans `assets/css/app.css` et une carte dans `index.html`.
4. `npm test` signale toute incohérence (figure ou fiche manquante, repos absent, identifiant en double…), puis
   `npm run build`.

Options d'un exercice (mode `sets`) : `sets`, `reps`, `rest` (texte) et `restS` (secondes) ; `hold: [30, 45]` série
chronométrée ; `noLoad: true` pas de charge ; `sides` + `sideRest` exercice unilatéral ; `parts` superset ;
`steps`, `tip`, `load`, `sideNote`, `yt` consignes propres au programme (prioritaires sur la bibliothèque).

## 🔒 Confidentialité et sécurité

- Aucune requête vers un serveur tiers : pas de police, de script, de statistiques ni d'image externes. Une politique de
  sécurité (CSP) l'interdit au niveau du navigateur, et un test vérifie que le code ne contient aucun appel réseau.
- Seul lien sortant : la recherche de vidéos YouTube d'un exercice, ouverte à la demande dans le navigateur.
- Tout texte saisi ou importé est échappé avant affichage ; les fichiers importés sont validés champ par champ.

Documentation technique détaillée : [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
