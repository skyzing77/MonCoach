# Mon coach — documentation technique

## 1. Choix d'architecture

| Décision | Raison |
|---|---|
| **JavaScript natif en modules ES, sans framework** | L'appli tient en une trentaine de modules courts. Un framework (React, Vue, Svelte) imposerait des dépendances à maintenir et un poids supplémentaire, sans rien apporter que les gabarits de chaînes + délégation d'évènements ne fassent déjà ici. |
| **Modules assemblés en un script classique** (`tools/bundle.mjs` → `assets/js/app.js`, `home.js`) | Les navigateurs refusent de charger des modules ES depuis une page ouverte sur le disque (`file://`). Un assembleur maison de 70 lignes, sans dépendance, enveloppe chaque module dans une fonction et relie les imports : les pages fonctionnent hébergées, installées ou ouvertes par double-clic. Il n'accepte que les formes d'import / export utilisées dans `src/` et échoue sinon. Les fichiers générés sont versionnés : GitHub Pages publie le dépôt tel quel. |
| **Police intégrée en base64** (`assets/fonts.css`, générée) | Même raison : un fichier de police séparé est bloqué depuis le disque. Coût : +26 ko. |
| **Aucune dépendance à l'exécution** | Fonctionnement hors ligne garanti, aucune fuite de données possible vers un tiers, rien à mettre à jour. |
| **Programmes personnalisés comme données** (`core/plans.js`) | Un programme personnalisé a exactement la forme d'un programme de base : le moteur de séance, les statistiques et l'interface n'ont pas de cas particulier. Il est nettoyé champ par champ à la lecture et validé par `validateProgram` avant de pouvoir être activé : le moteur ne reçoit jamais un programme incomplet. |
| **Logique séparée de l'interface** (`src/core` sans DOM) | Stockage, statistiques et moteur de séance sont des fonctions pures testées avec `node --test`, sans navigateur, avec une horloge injectée pour les chronos. |
| **`localStorage` conservé** | Les données existantes y sont déjà ; le volume est faible (≈ 1 ko par séance) ; l'écriture synchrone permet de sauvegarder dans `pagehide`. IndexedDB n'apporterait que de la complexité. |
| **Trois pages HTML conservées** (`index`, `axel`, `coralie`) | Chaque personne installe « son » appli (icône, nom, page d'ouverture). Les adresses et identifiants de manifeste ne changent pas : les applis déjà installées continuent de fonctionner. |
| **Outils de développement = Node seul** | `tools/serve.mjs` et `tools/build.mjs` n'ont aucune dépendance. Playwright n'est requis que pour les tests de bout en bout. |

TypeScript n'a pas été retenu : il obligerait à compiler. Les structures clés sont documentées en JSDoc et verrouillées
par les tests.

## 2. Flux général

```text
axel.html ──► src/boot-theme.js      (thème appliqué avant le premier affichage)
          └─► assets/js/app.js   (assemblage de src/main.js et de ses imports)
                ├─ PlanStore.load()              programmes personnalisés → programme actif (effectiveProgram)
                ├─ Store.load()                  données validées / migrées
                ├─ rendu de l'onglet courant     ui/views/*.js → chaîne HTML → #view
                ├─ délégation d'évènements       data-a="action" → actions de l'onglet
                ├─ startWorkout()                ui/workout.js ⇄ core/workout.js
                ├─ openEditor()                  ui/editor.js (copie de travail d'un programme)
                ├─ openExerciseSheet()           ui/sheet.js
                └─ pwa.init()                    service worker, mises à jour
```

Chaque vue exporte une fonction `renderX(app)` qui renvoie du HTML, et un objet d'actions `{ nom(app, bouton) }`.
`app` regroupe `base` (programme livré), `program` (programme actif), `plans`, `store`, `render()`, `go(onglet)`,
`usePlan(id)`, `refreshProgram()`, `startWorkout()`, `openExercise()`, `startMini()`.
Tout texte dynamique passe par `esc()`.

## 3. Données

### Format (v3)

Clé `sport:<programme>` :

```js
{
  v: 3,
  history: [{
    id, date: 'AAAA-MM-JJ', sid: 's1', pid?: 'p…' /* programme personnalisé d'origine */, short, title, tours, note,
    dur /* minutes mesurées */, vol, at /* horodatage */,
    rows: [{ ex: 'nom complet', xid: 'identifiant stable', sets: [{ r: '10', k: '12', p?: [{ r, k }, …] }] }]
  }],
  drafts: { [sid]: { date, tours, note, t0, t1, sets: { [indexExercice]: [{ r, k, d, p? }] }, run?: { i, pt, timer } } },
  rides: ['AAAA-MM-JJ'],          // sorties VTT
  cur: 's1',                      // séance affichée
  opt: { sound, vib, theme, goal, kgStep /* pas des boutons de charge : 0.5 | 1 | 2 | 2.5 */ },
  exp, expN, uns,                 // suivi des exports (séances non sauvegardées)
  mt                              // dernière modification
}
```

- `r` et `k` restent des **chaînes** (ce que l'utilisateur a saisi) ; `num()` les interprète pour les calculs.
- `p` : valeurs par exercice d'un superset. `r`/`k` de la série reprennent ceux de la première partie.
- Le format est un **sur-ensemble des formats v2 et v1** : mêmes clés, mêmes champs de base. La version 2 relit
  l'historique et les réglages d'un état v3 (vérifié en relisant un état v3 avec le code de la version 2.0.2) ; elle
  ignore `pid`, `kgStep` et les brouillons des séances personnalisées.
- `sid` est conservé tel quel, même s'il désigne une séance d'un autre programme du profil ; il n'est recalculé (par le
  nom de la séance du programme de base) que pour l'ancien format sans identifiant.
- Les brouillons de séances absentes du programme actif sont gardés s'ils contiennent une saisie : changer de programme
  ne fait rien perdre.

### Migration et protection

| Situation | Comportement (`Store.load`) |
|---|---|
| Pas de données | État vide ; rien n'est écrit tant que l'utilisateur ne fait rien. |
| Données v1 | Copie brute dans `sport:<p>:backup-v1` (une seule fois, jamais réécrite), puis normalisation : `xid` et `sid` ajoutés, réglage « muet » converti. |
| Données v2 | Copie brute dans `sport:<p>:backup-v2` (une seule fois, jamais réécrite), puis normalisation (ajout de `kgStep`). |
| Données valides | Copie de sécurité `sport:<p>:snap` au premier lancement du jour. |
| JSON illisible | Brut conservé dans `sport:<p>:illisible` ; restauration depuis `:snap` si possible ; sinon état vide **sans écraser** la clé principale tant que rien n'est modifié. |
| Écriture impossible | `:snap` est supprimée pour libérer de la place, nouvelle tentative, puis message unique à l'utilisateur. |

`normalize()` accepte n'importe quelle valeur et renvoie toujours un état valide (champs bornés, dates réelles,
doublons d'identifiant écartés, clés inattendues ignorées).

### Plusieurs onglets

`mergeStates(local, distant, base, modifiés)` réalise une fusion à trois voies :

- **historique et sorties** : distant ∪ (ajouts locaux) − (suppressions locales), `base` étant l'état vu à la dernière
  synchronisation ;
- **brouillons, réglages** : la version locale ne gagne que si elle a été modifiée ici (`dirty`) ; le brouillon de la
  séance guidée ouverte est « épinglé » (`pin`) et garde la même référence d'objet.

La fusion a lieu à la réception de l'évènement `storage` **et** avant chaque écriture (un onglet figé en arrière-plan
ne reçoit pas les évènements).

### Programmes personnalisés (`core/plans.js`)

Clé séparée `sport:<programme>:plans` : `{ v: 1, plans: [plan…], active: '' | id, mt }`. Un `plan` a la forme d'un
programme (`mode`, `goal`, `params` pour un circuit, `seances`) plus `id`, `name`, `from`, `at`, `mt`.

- **Pourquoi une clé à part** : la clé principale reste relisible par la version 2, qui n'efface donc pas les programmes
  en cas de retour arrière.
- **Identifiants** : un exercice ajouté depuis la bibliothèque a pour identifiant sa clé (`pushf`…) ; copié du
  programme de base, il garde le sien (`bulg`…). L'historique d'un exercice est donc partagé entre tous les programmes.
  Une variante est un autre exercice (autre clé). Les séances personnalisées ont des identifiants préfixés par le
  programme (`p…-s1`).
- **Programme actif** : `effectiveProgram(base, plans, active)` renvoie le programme de base ou le programme
  personnalisé complété du profil (clé de stockage, apparence, prénom) et de `known` : les exercices des autres
  programmes, pour relire tout l'historique (records, courbes, détail des séances). Un programme invalide n'est jamais
  actif (retour au programme de base).
- **Lecture** : `cleanPlan` borne chaque champ et écarte ce qui est inconnu ; un programme illisible est copié dans
  `sport:<p>:plans-illisible`, jamais supprimé.
- **Plusieurs onglets** : `mergePlans` (ajouts et suppressions à trois voies, modification la plus récente gagnante).
- **Édition** (`ui/editor.js`) : sur une copie ; à l'enregistrement, une saisie en cours dont les exercices ont changé est
  signalée avant d'être vidée (les numéros d'exercices du brouillon n'auraient plus de sens).

### Import / export

- Export : `{ app, v, at, data, plans? }` (JSON) ; CSV une ligne par série (séparateur `;`, BOM pour Excel).
- Import : formats v1, v2 et v3, fichier ou texte collé. L'historique et les programmes sont fusionnés. Les doublons
  sont détectés par identifiant, avec une comparaison de la date et de toutes les séries pour les anciennes données.
  L'option de restauration reprend aussi les réglages, le programme actif et les brouillons compatibles. Une saisie
  locale garde la priorité sur le brouillon importé de la même séance. Fichier d'un autre profil refusé. Limite 5 Mo.

## 4. Moteur de séance (`core/workout.js`)

`buildSteps()` déroule la séance en étapes (`warm`, `rest`, `ready`, `work`, `set`, `end`). La classe `Workout` porte
l'étape et la phase courantes (`idle`, `wait`, `prep`, `run`, `hold`, `side`) et expose les transitions :
`launch`, `done`, `partDone`, `sideReady`, `skip`, `back`, `togglePause`, `add`, `setValues`, `interrupt`, `tick`.

- **Chronos** : uniquement des heures absolues (`end`, `h0`) comparées à `now()` dans `tick()`, appelée 4 fois par
  seconde et au retour au premier plan. Si le navigateur gèle les minuteries (écran verrouillé), le temps reste juste.
- **Pause** : le temps restant est stocké (`timer.left`) ; `+15 s` s'applique aussi pendant une pause.
- **Persistance** : `draft.run = { i, pt, timer }` est écrit à chaque transition → reprise exacte après fermeture.
- **Mise en arrière-plan** : un chrono lancé à la main (gainage) est annulé (`interrupt`) plutôt que d'enregistrer une
  durée non observée.
- **Circuit** : un passage terminé est marqué « fait » sans valeur ; les reps se saisissent, si on le souhaite, pendant
  le repos. Rien n'est enregistré à la place de l'utilisateur.
- **Aperçu** : `goToExercise(x)` va à la première série non faite d'un exercice ; `overview()` donne l'avancement.

## 4 bis. Statistiques (`core/stats.js`)

Uniquement des valeurs saisies ou chronométrées. `trackables()` liste ce qui est suivi : chaque exercice connu du
profil, et chaque exercice d'un superset séparément. `recordEvents()` donne les records battus dans l'ordre (la première
valeur d'un exercice n'est pas un record « battu »). `periodStats()` et `periodBounds()` calculent une période et la
précédente ; seules les durées mesurées entrent dans la durée moyenne. `groupSets()` compte les séries par muscle
principal. `insights()` alimente le tableau de bord et renvoie `null` sans historique.

L'écran `ui/workout.js` ne contient aucune règle métier : il dessine l'état et transmet les gestes.

## 5. PWA

### Service worker (`sw.js`)

1. `install` : tous les fichiers de `FILES` sont téléchargés (`cache: 'reload'`) dans le cache `moncoach-<version>`.
   Tout ou rien.
2. Pas de `skipWaiting()` à l'installation : la nouvelle version **attend**.
3. `fetch` : réponse depuis le cache de la version active (recherche sans paramètres d'URL), sinon réseau ; hors ligne,
   une navigation inconnue reçoit `404.html`.
4. `activate` : suppression des caches `moncoach-*` des autres versions (y compris `moncoach-v14` de l'ancienne appli).
5. Messages : `SKIP_WAITING` (activation demandée par la page), `GET_VERSION`.

Conséquence : une page n'exécute jamais des fichiers de deux versions différentes.

### Mise à jour côté page (`ui/pwa.js`)

- À l'ouverture, si une version attend déjà, elle est activée immédiatement (rechargement unique, garde-fou de 60 s
  contre les boucles).
- Pendant l'utilisation, une nouvelle version déclenche le bandeau « Nouvelle version prête » (masqué pendant une
  séance guidée). L'onglet Plus permet de vérifier manuellement.
- Appli laissée ouverte : vérification au retour au premier plan, au plus une fois par heure.

### Version

`tools/build.mjs` calcule `version = <package.json>-<empreinte SHA-256 du contenu>` et réécrit le bloc
`/* build:begin */ … /* build:end */` de `sw.js`. `npm run check` et le test `build.test.js` échouent si le bloc n'est
pas à jour : impossible d'oublier.

## 6. Figures

`data/figures.js` décrit deux poses par mouvement ; `ui/figure.js` interpole, résout bras et jambes par cinématique
inverse et produit le SVG (pur, testable). Les tests vérifient pour chaque figure : mêmes propriétés dans les deux
poses, cibles atteignables, rien sous le sol, libellés dans le cadre, rendu sans `NaN` pour les deux personnages.

Deux modes particuliers : `loop` (rotation continue, la pose b est la pose a après un tour) et `rev` (un tour dans un
sens puis dans l'autre, avec la flèche qui change de sens). Les tests vérifient aussi la biomécanique des figures
corrigées (sens des articulations, avant-bras vertical des développés, assise, trajectoires circulaires…).

L'animation ne tourne que s'il y a une figure animée à l'écran et que la page est visible. Avec « réduire les
animations », la figure alterne deux poses fixes.

## 7. Accessibilité

Navigation au clavier, focus déplacé dans les écrans ouverts et rendu à l'élément d'origine, arrière-plan `inert`,
annonces `aria-live`, libellés sur tous les contrôles, cibles tactiles ≥ 40 px, contrastes vérifiés dans les deux
thèmes, respect de `prefers-reduced-motion`, `prefers-reduced-transparency` et `forced-colors`.

## 8. Tests

| Suite | Contenu |
|---|---|
| `tests/unit/data.test.js` | Cohérence des programmes, de la bibliothèque (fiches complètes, variantes, prescriptions) et des figures ; clés dupliquées. |
| `tests/unit/plans.test.js` | Programmes personnalisés (copie, ajout, nettoyage, stockage, fusion, changement de programme), format v3 et retour vers la v2, statistiques par période et par partie de superset. |
| `tests/unit/store.test.js` | Migration, corruption, quota, fusion entre onglets, import / export, CSV. |
| `tests/unit/stats.test.js` | Dates, semaine et séries, records, suggestions, récapitulatif. |
| `tests/unit/workout.test.js` | Séances complètes (séries, circuit), tous les chronos, pause, reprise, retour arrière. |
| `tests/unit/build.test.js` | `sw.js` à jour, imports et références, CSP, absence d'appel réseau, manifestes. |
| `tests/e2e/run.mjs` | 26 scénarios dans Chromium (voir README). |
| `tests/e2e/visual.mjs` | Captures de toutes les vues sur 6 tailles d'écran, thèmes clair et sombre ; échoue sur une erreur ou un débordement. |

## 9. Limites connues

- **Écran verrouillé** : un navigateur ne peut ni sonner ni vibrer quand la page est gelée. L'écran est donc maintenu
  allumé pendant la séance ; au retour, les chronos sont justes mais le bip de fin n'a pas retenti.
- **Rappels programmés** : impossibles sans serveur d'envoi (contraire au principe de confidentialité).
- **Sons en arrière-plan** : un bip de fin de repos ne retentit que si la page est au premier plan ; la séance guidée
  garde l'écran allumé (Wake Lock) quand le navigateur le permet.
- **iPhone** : pas de vibration (API absente de Safari) ; les données d'un site non installé peuvent être purgées
  après plusieurs semaines d'inactivité, d'où le rappel de sauvegarde.
