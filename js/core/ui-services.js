/* ==========================================================================
   UI INFRASTRUCTURE CLASSES
   Small, single-responsibility classes for things every page needs:
   toasts, ambient canvas particles, scroll-reveal, and nav chrome behavior.
   ========================================================================== */

class ToastService {
  constructor() {
    this.el = null;
    this.timer = null;
  }

  _ensureEl() {
    if (!this.el) {
      this.el = document.createElement('div');
      this.el.className = 'toast';
      document.body.appendChild(this.el);
    }
    return this.el;
  }

  show(message, durationMs = 3200) {
    const el = this._ensureEl();
    el.textContent = message;
    requestAnimationFrame(() => el.classList.add('show'));
    clearTimeout(this.timer);
    this.timer = setTimeout(() => el.classList.remove('show'), durationMs);
  }
}

class ParticleField {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.density = options.density || { desktop: 50, mobile: 26 };
    this.color = options.color || '192, 132, 252';
    this.particles = [];
    this.ctx = null;
    this.width = 0;
    this.height = 0;
  }

  start() {
    if (!this.canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.ctx = this.canvas.getContext('2d');
    this._resize();
    this._seed();
    this._tick = this._tick.bind(this);
    requestAnimationFrame(this._tick);
    window.addEventListener('resize', () => { this._resize(); this._seed(); });
  }

  _resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  _seed() {
    const count = window.innerWidth < 700 ? this.density.mobile : this.density.desktop;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.5 + 0.15,
    }));
  }

  _tick() {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
    for (const p of this.particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${p.a})`;
      ctx.fill();
    }
    requestAnimationFrame(this._tick);
  }
}

class ScrollRevealController {
  constructor(selector = '.reveal', options = {}) {
    this.selector = selector;
    this.threshold = options.threshold ?? 0.12;
    this.rootMargin = options.rootMargin ?? '0px 0px -40px 0px';
    this.observer = null;
  }

  observe(root = document) {
    const targets = root.querySelectorAll(this.selector);
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return;
    }

    if (!this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      }, { threshold: this.threshold, rootMargin: this.rootMargin });
    }

    targets.forEach(t => this.observer.observe(t));
  }
}

class SiteNav {
  constructor(progressStore) {
    this.progressStore = progressStore;
    this.navEl = document.querySelector('.nav');
  }

  init() {
    if (!this.navEl) return;
    this._bindScrollState();
    this._bindMobilePanel();
    this._renderStreakChip();
    this._highlightActiveLink();
  }

  _bindScrollState() {
    const onScroll = () => this.navEl.classList.toggle('is-scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  _bindMobilePanel() {
    const burger = document.querySelector('.nav-burger');
    const panel = document.querySelector('.nav-mobile-panel');
    if (!burger || !panel) return;
    burger.addEventListener('click', () => panel.classList.toggle('is-open'));
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => panel.classList.remove('is-open')));
  }

  _renderStreakChip() {
    const chip = document.querySelector('[data-streak-chip]');
    if (!chip || !this.progressStore) return;
    const streak = this.progressStore.state.streak;
    chip.innerHTML = `🔥 <span>${streak} day${streak === 1 ? '' : 's'}</span>`;
  }

  _highlightActiveLink() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
      if (link.dataset.page === path) link.classList.add('is-active');
    });
  }
}
