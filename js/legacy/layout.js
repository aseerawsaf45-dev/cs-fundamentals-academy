/* ==========================================================================
   Shared layout partials: top nav + footer
   Injected at runtime so every page stays in sync from one source.
   ========================================================================== */

(function () {
  const NAV_ITEMS = [
    { label: 'Home', href: 'index.html', page: 'index.html' },
    { label: 'Roadmap', href: 'pages/roadmap.html', page: 'roadmap.html' },
    { label: 'Courses', href: 'pages/courses.html', page: 'courses.html' },
    { label: 'Playground', href: 'pages/playground.html', page: 'playground.html' },
    { label: 'Progress', href: 'pages/progress.html', page: 'progress.html' },
    { label: 'Resources', href: 'pages/resources.html', page: 'resources.html' },
  ];

  function resolveHref(href, root) {
    return root + href;
  }

  function renderNav(root) {
    const links = NAV_ITEMS.map(item =>
      `<a class="nav-link" data-page="${item.page}" href="${resolveHref(item.href, root)}">${item.label}</a>`
    ).join('');

    return `
    <nav class="nav" aria-label="Primary">
      <div class="nav-inner">
        <a class="nav-logo" href="${resolveHref('index.html', root)}">
          <span class="nav-logo-mark">CS</span>
          <span>CS Fundamentals Academy</span>
        </a>
        <div class="nav-links">${links}</div>
        <div class="nav-actions">
          <span class="nav-streak" data-streak-chip>🔥 <span>0 days</span></span>
          <button class="nav-burger" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
        </div>
      </div>
    </nav>
    <div class="nav-mobile-panel">${links}</div>
    `;
  }

  function renderFooter(root) {
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h5 style="display:flex;align-items:center;gap:10px;">
              <span class="nav-logo-mark" style="width:26px;height:26px;font-size:0.7rem;">CS</span>
              CS Fundamentals Academy
            </h5>
            <p style="max-width:280px;">Computer science fundamentals built for people learning to direct AI well — so you understand what you're shipping, not just what you're prompting.</p>
          </div>
          <div class="footer-col">
            <h5>Learn</h5>
            <a href="${resolveHref('pages/roadmap.html', root)}">Roadmap</a>
            <a href="${resolveHref('pages/courses.html', root)}">Course Explorer</a>
            <a href="${resolveHref('pages/playground.html', root)}">Playground</a>
            <a href="${resolveHref('pages/resources.html', root)}">Resources</a>
          </div>
          <div class="footer-col">
            <h5>Modules</h5>
            <a href="${resolveHref('pages/courses.html', root)}#module-1">Computer Fundamentals</a>
            <a href="${resolveHref('pages/courses.html', root)}#module-2">Programming Fundamentals</a>
            <a href="${resolveHref('pages/courses.html', root)}#module-7">Data Structures</a>
            <a href="${resolveHref('pages/courses.html', root)}#module-8">Algorithms</a>
          </div>
          <div class="footer-col">
            <h5>You</h5>
            <a href="${resolveHref('pages/progress.html', root)}">Your progress</a>
            <a href="#" data-reset-progress>Reset local progress</a>
          </div>
        </div>
        <hr class="divider" style="margin-bottom:24px;">
        <div class="footer-bottom">
          <span>© 2026 CS Fundamentals Academy. Built for learners, not lectures.</span>
          <span>Progress is stored locally in your browser.</span>
        </div>
      </div>
    </footer>
    `;
  }

  function inject() {
    const navMount = document.getElementById('site-nav');
    const footerMount = document.getElementById('site-footer');
    const root = document.body.dataset.root || './';

    if (navMount) navMount.innerHTML = renderNav(root);
    if (footerMount) footerMount.innerHTML = renderFooter(root);

    const resetLink = document.querySelector('[data-reset-progress]');
    if (resetLink) {
      resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('This will erase all local progress, XP, and streaks. Continue?')) {
          window.CSFA.resetProgress();
        }
      });
    }

    document.dispatchEvent(new CustomEvent('csfa:layout-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
