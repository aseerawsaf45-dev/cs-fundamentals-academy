/* ==========================================================================
   SITE LAYOUT
   Renders the shared nav + footer partials into #site-nav / #site-footer.
   Replaces the old layout.js IIFE with a class so it can be composed
   into App explicitly instead of running as a hidden side effect.
   ========================================================================== */

class SiteLayout {
  static NAV_ITEMS = [
    { label: 'Home', href: 'index.html', page: 'index.html' },
    { label: 'Roadmap', href: 'pages/roadmap.html', page: 'roadmap.html' },
    { label: 'Courses', href: 'pages/courses.html', page: 'courses.html' },
    { label: 'Playground', href: 'pages/playground.html', page: 'playground.html' },
    { label: 'Progress', href: 'pages/progress.html', page: 'progress.html' },
    { label: 'Resources', href: 'pages/resources.html', page: 'resources.html' },
  ];

  constructor({ progressStore, onReset } = {}) {
    this.progressStore = progressStore;
    this.onReset = onReset || (() => {});
    this.root = document.body.dataset.root || './';
  }

  _resolve(href) {
    return this.root + href;
  }

  _renderNavLinks() {
    return SiteLayout.NAV_ITEMS.map(item =>
      `<a class="nav-link" data-page="${item.page}" href="${this._resolve(item.href)}">${item.label}</a>`
    ).join('');
  }

  _renderNav() {
    const links = this._renderNavLinks();
    return `
    <nav class="nav" aria-label="Primary">
      <div class="nav-inner">
        <a class="nav-logo" href="${this._resolve('index.html')}">
          <img src="${this._resolve('assets/logo.png')}" alt="CS" style="height: 32px; width: auto; margin-right: 8px;">
          <span>CS Fundamentals Academy</span>
        </a>
        <div class="nav-links">${links}</div>
        <div class="nav-actions">
          <span class="nav-streak" data-streak-chip>🔥 <span>0 days</span></span>
          <button class="nav-burger" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
        </div>
      </div>
    </nav>
    <div class="nav-mobile-panel">${links}</div>`;
  }

  _renderFooter() {
    const r = (href) => this._resolve(href);
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h5 style="display:flex;align-items:center;gap:10px;">
              <img src="${this._resolve('assets/logo.png')}" alt="CS" style="height: 26px; width: auto;">
              CS Fundamentals Academy
            </h5>
            <p style="max-width:280px;">Computer science fundamentals built for people learning to direct AI well — so you understand what you're shipping, not just what you're prompting.</p>
          </div>
          <div class="footer-col">
            <h5>Learn</h5>
            <a href="${r('pages/roadmap.html')}">Roadmap</a>
            <a href="${r('pages/courses.html')}">Course Explorer</a>
            <a href="${r('pages/playground.html')}">Playground</a>
            <a href="${r('pages/resources.html')}">Resources</a>
          </div>
          <div class="footer-col">
            <h5>Modules</h5>
            <a href="${r('pages/courses.html')}#module-1">Computer Fundamentals</a>
            <a href="${r('pages/courses.html')}#module-2">Programming Fundamentals</a>
            <a href="${r('pages/courses.html')}#module-7">Data Structures</a>
            <a href="${r('pages/courses.html')}#module-8">Algorithms</a>
          </div>
          <div class="footer-col">
            <h5>You</h5>
            <a href="${r('pages/progress.html')}">Your progress</a>
            <a href="#" data-reset-progress>Reset local progress</a>
          </div>
        </div>
        <hr class="divider" style="margin-bottom:24px;">
        <div class="footer-bottom">
          <span>© 2026 CS Fundamentals Academy. Built for learners, not lectures.</span>
          <span>Progress is stored locally in your browser.</span>
        </div>
      </div>
    </footer>`;
  }

  mount() {
    const navMount = document.getElementById('site-nav');
    const footerMount = document.getElementById('site-footer');
    if (navMount) navMount.innerHTML = this._renderNav();
    if (footerMount) footerMount.innerHTML = this._renderFooter();

    const resetLink = document.querySelector('[data-reset-progress]');
    if (resetLink) {
      resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('This will erase all local progress, XP, and streaks. Continue?')) {
          this.onReset();
        }
      });
    }

    document.dispatchEvent(new CustomEvent('csfa:layout-ready'));
  }
}
