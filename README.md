# Mon Coach 🏋️‍♂️

Application web de suivi de coaching sportif personnalisée (gestion de séances, historique, minuteur et import/export des données).

## 📁 Structure du projet

```text
sport/
├── index.html              # Page d'accueil (choix du programme, statut de la semaine)
├── axel.html               # Page d'Axel
├── coralie.html            # Page de Coralie
├── assets/
│   ├── app.js              # Moteur commun (séance guidée, historique, minuteur, import/export)
│   ├── style.css           # Feuille de style commune (le thème dépend de <html data-prog="...">)
│   └── exercices.js        # Bibliothèque d'exercices partagée (figures animées, consignes)
└── programmes/
    ├── axel.js             # Séances et consignes d'Axel
    └── coralie.js          # Séances et consignes de Coralie
