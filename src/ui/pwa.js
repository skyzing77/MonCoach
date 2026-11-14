/* Service worker côté page : enregistrement, détection et application des mises à jour, stockage persistant.

   Principe : une nouvelle version est téléchargée en entier dans son propre cache, puis attend.
   Elle n'est activée que lorsque l'utilisateur l'accepte (ou à la prochaine ouverture de l'appli) :
   on ne mélange jamais les fichiers de deux versions, et une séance en cours n'est jamais rechargée de force. */

export const pwa = {
  state: { supported: false, version: '', offlineReady: false, waiting: false, persisted: null },
  reg: null,
  onChange: () => {},
  reloading: false,

  async init(onChange) {
    this.onChange = onChange || this.onChange;
    try {
      if (navigator.storage && navigator.storage.persist) {
        this.state.persisted = (await navigator.storage.persisted()) || (await navigator.storage.persist());
      }
    } catch (e) {
      /* API absente */
    }
    if (!('serviceWorker' in navigator)) return this.onChange();
    this.state.supported = true;
    try {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // une nouvelle version vient de prendre la main : on recharge une seule fois pour l'utiliser
        if (this.reloading || !this.acceptedUpdate) return;
        this.reloading = true;
        location.reload();
      });
      navigator.serviceWorker.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'VERSION') {
          this.state.version = e.data.version;
          this.onChange();
        }
      });
      const reg = (this.reg = await navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }));
      const track = (w) => {
        if (!w) return;
        w.addEventListener('statechange', () => {
          if (w.state === 'installed') this.refresh();
          if (w.state === 'activated') this.refresh();
        });
      };
      track(reg.installing);
      reg.addEventListener('updatefound', () => track(reg.installing));
      await this.refresh();
      // Une version téléchargée lors d'une visite précédente attend : on l'active tout de suite, au démarrage,
      // avant que l'utilisateur ait commencé quoi que ce soit (garde-fou contre un rechargement en boucle).
      if (this.state.waiting && this.canAutoApply()) this.applyUpdate();
      // appli gardée ouverte longtemps (écran d'accueil) : on revérifie au retour au premier plan, au plus une fois par heure
      let last = Date.now();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && Date.now() - last > 3600e3) {
          last = Date.now();
          reg.update().catch(() => {});
        }
      });
    } catch (e) {
      this.state.supported = false;
    }
    this.onChange();
  },

  async refresh() {
    const reg = this.reg;
    if (!reg) return;
    this.state.waiting = !!(reg.waiting && navigator.serviceWorker.controller);
    this.state.offlineReady = !!reg.active;
    const w = reg.active;
    if (w) w.postMessage({ type: 'GET_VERSION' });
    this.onChange();
  },

  /** Vérifie s'il existe une nouvelle version. Renvoie 'update' | 'current' | 'offline'. */
  async check() {
    if (!this.reg) return 'current';
    try {
      await this.reg.update();
    } catch (e) {
      return 'offline';
    }
    await new Promise((r) => setTimeout(r, 600));
    await this.refresh();
    return this.state.waiting || this.reg.installing ? 'update' : 'current';
  },

  canAutoApply() {
    try {
      const last = +sessionStorage.getItem('moncoach:auto-update') || 0;
      if (Date.now() - last < 60000) return false;
      sessionStorage.setItem('moncoach:auto-update', String(Date.now()));
      return true;
    } catch (e) {
      return false;
    }
  },

  /** Active la version en attente puis recharge la page. */
  applyUpdate() {
    const w = this.reg && this.reg.waiting;
    if (!w) return;
    this.acceptedUpdate = true;
    w.postMessage({ type: 'SKIP_WAITING' });
  },
};
