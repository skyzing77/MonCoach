/* Applique le thème (sombre / clair / automatique) avant le premier affichage, pour éviter un éclair de couleur.
   Script classique volontairement minuscule : il s'exécute avant les modules. Le réglage est rangé à part
   (clé « moncoach:theme:<programme> ») pour ne pas avoir à relire tout l'historique ici. */
(function () {
  var root = document.documentElement;
  var prog = root.dataset.prog || 'accueil';
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
  function read() {
    try {
      return localStorage.getItem('moncoach:theme:' + prog) || 'dark';
    } catch (e) {
      return 'dark';
    }
  }
  function apply(choice) {
    var t = choice === 'auto' ? (mq && mq.matches ? 'light' : 'dark') : choice === 'light' ? 'light' : 'dark';
    root.dataset.theme = t;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t === 'light' ? (prog === 'coralie' ? '#fbf3f1' : '#f3f2fb') : prog === 'coralie' ? '#1a0e14' : '#0d1020';
  }
  apply(read());
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { apply(read()); });
  window.MonCoachTheme = {
    set: function (choice) {
      try {
        localStorage.setItem('moncoach:theme:' + prog, choice);
      } catch (e) { /* stockage indisponible : le thème reste appliqué pour cette visite */ }
      apply(choice);
    },
  };
})();
