# Mon Coach 🏋️‍♂️

Application web de suivi de coaching sportif personnalisée : séance guidée pas à pas, minuteur, historique, et import/export des données.

**👉 Ouvrir l'application : https://skyzing77.github.io/MonCoach/**

## ✨ Fonctionnalités

- **Séance guidée** : échauffement, exercices avec figures animées et consignes, saisie des reps et des charges.
- **Minuteur** de repos et de circuit, avec son et vibrations, et l'écran qui reste allumé pendant la séance.
- **Historique** et statut de la semaine (objectif de séances).
- **Fonctionne hors ligne** et peut être **installée sur le téléphone** comme une application.
- **Données privées** : tout reste dans le navigateur (`localStorage`), rien n'est envoyé à un serveur. Aucune police ni ressource externe n'est chargée.

## 📱 Installer sur le téléphone

- **iPhone (Safari)** : ouvrir la page de son programme → bouton Partager → « Sur l'écran d'accueil ».
- **Android (Chrome)** : ouvrir la page de son programme → menu ⋮ → « Installer l'application ».

Installer directement la page de son programme (`axel.html` ou `coralie.html`) l'ouvre au bon endroit à chaque lancement.

## 💾 Sauvegarder ses données

L'historique est stocké uniquement sur l'appareil. Il peut être perdu si on vide les données du navigateur
(et Safari peut effacer les données d'un site qu'on n'a pas ouvert depuis plusieurs jours).
Onglet **Programme → Tes données** : « Exporter en fichier » ou « Copier les données » de temps en temps.
L'application le rappelle automatiquement. On peut ensuite réimporter le fichier sur n'importe quel appareil.

## 📁 Structure du projet

```text
MonCoach/
├── index.html                  # Page d'accueil (choix du programme, statut de la semaine)
├── axel.html                   # Page d'Axel
├── coralie.html                # Page de Coralie
├── 404.html                    # Page « introuvable »
├── sw.js                       # Service worker (mode hors ligne)
├── manifest-*.webmanifest      # Manifestes d'installation (un par page)
├── robots.txt / .nojekyll      # Pas d'indexation / pas de traitement Jekyll par GitHub Pages
├── assets/
│   ├── app.js                  # Moteur commun (séance guidée, historique, minuteur, import/export)
│   ├── style.css               # Feuille de style commune (le thème dépend de <html data-prog="...">)
│   ├── exercices.js            # Bibliothèque d'exercices partagée (figures animées, consignes)
│   ├── figures.js              # Figures illustrées v2 (poses, muscles travaillés, repères de technique), chargées par les programmes "ui": 2
│   ├── fonts.css + fonts/      # Police Bricolage Grotesque hébergée localement (licence OFL)
│   └── icons/                  # Icônes de l'application
└── programmes/
    ├── axel.js                 # Séances et consignes d'Axel
    └── coralie.js              # Séances et consignes de Coralie
```

## ➕ Ajouter un programme

1. Copier `programmes/coralie.js` (mode `circuit`) ou `programmes/axel.js` (mode `sets`) en `programmes/<nom>.js`, remplacer la clé (`"key"` et `window.PROGRAMS.<nom>`) et adapter les séances. Les exercices (`"k"`) doivent exister dans `assets/exercices.js`.
2. Copier `coralie.html` en `<nom>.html` et y remplacer `coralie` par `<nom>` (`data-prog`, script du programme, manifeste, icône).
3. Ajouter un manifeste `manifest-<nom>.webmanifest`, un thème `:root[data-prog="<nom>"]` dans `assets/style.css`, une carte dans `index.html`, et les nouveaux fichiers dans la liste `FILES` de `sw.js`.

## 🧭 Options de programme (« ui »: 2)

Les deux programmes activent `"ui": 2` (et chargent `assets/figures.js`). En mode circuit (Coralie), l'écran d'exercice affiche le temps de travail et le repos suivant. Avec cette option :

- chrono d'échauffement et de gainage lancé à la main (« Lancer le chrono », 3 s pour se mettre en place) ;
- `"rest"` sur une étape d'échauffement : repos avant la 1ʳᵉ série ;
- `"sides"` : une série = les deux côtés, ordre alterné à chaque série ; `"parts"` : étapes d'un superset ;
- `"hold": [30, 45]` : série chronométrée (durée enregistrée) ; `"noLoad": true` : pas de champ charge ;
- `"steps"`, `"tip"`, `"load"`, `"sideNote"`, `"yt"` : consignes propres au programme (prioritaires sur `exercices.js`).

Sans changer l’écran de séance, `"fig": 2` active seulement les figures illustrées (la page doit charger `assets/figures.js`). `"look": "f"` dessine un personnage féminin (Coralie).

## 🔄 Mettre à jour le site

GitHub Pages publie automatiquement la branche principale. **Après toute modification, incrémenter `VERSION` dans `sw.js`**
(par exemple `moncoach-v2`) pour que les téléphones déjà installés récupèrent la nouvelle version.

Pour tester en local : `python3 -m http.server` à la racine, puis ouvrir http://localhost:8000.
