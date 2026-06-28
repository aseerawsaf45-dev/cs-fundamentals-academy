/* ==========================================================================
   CS Fundamentals Academy — Core App Engine
   Shared across every page: nav behavior, particles, scroll reveal,
   and the Progress/XP/Streak/Badge system (persisted to localStorage).
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. STORAGE KEYS & DEFAULTS
  --------------------------------------------------------------------- */
  const STORAGE_KEY = 'csfa_progress_v1';

  const DEFAULT_STATE = {
    xp: 0,
    level: 1,
    completedLessons: [],     // topic ids marked "read"
    completedExercises: {},   // { topicId: [exerciseId, ...] }
    quizScores: {},           // { topicId: { score, total, date } }
    lastVisitDate: null,
    streak: 0,
    longestStreak: 0,
    visitDates: [],           // array of YYYY-MM-DD strings
    badges: [],               // unlocked badge ids
  };

  /* ---------------------------------------------------------------------
     2. STATE LOAD / SAVE
  --------------------------------------------------------------------- */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return Object.assign(structuredClone(DEFAULT_STATE), parsed);
    } catch (e) {
      console.warn('CSFA: failed to load progress, resetting.', e);
      return structuredClone(DEFAULT_STATE);
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('CSFA: failed to save progress.', e);
    }
  }

  let state = loadState();

  /* ---------------------------------------------------------------------
     3. LEVEL / XP MATH
  --------------------------------------------------------------------- */
  // Level n requires n * 150 XP cumulative growth (simple linear ramp).
  function xpForLevel(level) {
    return Math.round(150 * level * (1 + (level - 1) * 0.12));
  }

  function computeLevel(xp) {
    let level = 1;
    let cumulative = 0;
    while (true) {
      const need = xpForLevel(level);
      if (cumulative + need > xp) break;
      cumulative += need;
      level += 1;
      if (level > 200) break; // safety
    }
    return { level, xpIntoLevel: xp - cumulative, xpNeeded: xpForLevel(level) };
  }

  /* ---------------------------------------------------------------------
     4. BADGES
  --------------------------------------------------------------------- */
  const BADGE_DEFS = [
    { id: 'first_lesson', name: 'First Steps', desc: 'Complete your first lesson', emoji: '🌱', test: s => s.completedLessons.length >= 1 },
    { id: 'five_lessons', name: 'Getting Traction', desc: 'Complete 5 lessons', emoji: '🚀', test: s => s.completedLessons.length >= 5 },
    { id: 'module_1_done', name: 'Foundations Laid', desc: 'Finish Module 1', emoji: '🏗️', test: s => moduleCompletion(1, s) >= 1 },
    { id: 'streak_3', name: 'On a Roll', desc: '3-day learning streak', emoji: '🔥', test: s => s.streak >= 3 },
    { id: 'streak_7', name: 'Committed', desc: '7-day learning streak', emoji: '🔥', test: s => s.streak >= 7 },
    { id: 'quiz_perfect', name: 'Perfectionist', desc: 'Score 100% on a quiz', emoji: '🎯', test: s => Object.values(s.quizScores).some(q => q.score === q.total) },
    { id: 'level_5', name: 'Rising Coder', desc: 'Reach Level 5', emoji: '⭐', test: s => computeLevel(s.xp).level >= 5 },
    { id: 'exercises_10', name: 'Hands On', desc: 'Solve 10 practice exercises', emoji: '🛠️', test: s => totalExercises(s) >= 10 },
  ];

  function totalExercises(s) {
    return Object.values(s.completedExercises).reduce((sum, arr) => sum + arr.length, 0);
  }

  function moduleCompletion(moduleNum, s) {
    if (!window.CSFA_TOPICS) return 0;
    const topics = window.CSFA_TOPICS.filter(t => t.module === moduleNum);
    if (!topics.length) return 0;
    const done = topics.filter(t => s.completedLessons.includes(t.id)).length;
    return done / topics.length;
  }

  function checkBadges() {
    const newly = [];
    BADGE_DEFS.forEach(b => {
      if (!state.badges.includes(b.id) && b.test(state)) {
        state.badges.push(b.id);
        newly.push(b);
      }
    });
    if (newly.length) {
      saveState(state);
      newly.forEach(b => showToast(`🏅 Badge unlocked: ${b.name}`));
    }
    return newly;
  }

  /* ---------------------------------------------------------------------
     5. STREAK TRACKING
  --------------------------------------------------------------------- */
  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function registerVisit() {
    const today = todayStr();
    if (state.visitDates.includes(today)) return;

    state.visitDates.push(today);
    state.visitDates = state.visitDates.slice(-90); // cap history

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (state.lastVisitDate === yesterday) {
      state.streak += 1;
    } else if (state.lastVisitDate !== today) {
      state.streak = 1;
    }
    state.lastVisitDate = today;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    saveState(state);
  }

  /* ---------------------------------------------------------------------
     6. PUBLIC API — window.CSFA
  --------------------------------------------------------------------- */
  function addXP(amount, reason) {
    state.xp += amount;
    const lvl = computeLevel(state.xp);
    const leveledUp = lvl.level > state.level;
    state.level = lvl.level;
    saveState(state);
    if (amount > 0) showToast(`+${amount} XP${reason ? ' · ' + reason : ''}`);
    if (leveledUp) setTimeout(() => showToast(`🎉 Level up! You're now Level ${lvl.level}`), 700);
    checkBadges();
    return lvl;
  }

  function markLessonComplete(topicId) {
    if (state.completedLessons.includes(topicId)) return false;
    state.completedLessons.push(topicId);
    saveState(state);
    addXP(40, 'Lesson complete');
    return true;
  }

  function isLessonComplete(topicId) {
    return state.completedLessons.includes(topicId);
  }

  function markExerciseComplete(topicId, exerciseId) {
    if (!state.completedExercises[topicId]) state.completedExercises[topicId] = [];
    if (state.completedExercises[topicId].includes(exerciseId)) return false;
    state.completedExercises[topicId].push(exerciseId);
    saveState(state);
    addXP(15, 'Exercise solved');
    return true;
  }

  function isExerciseComplete(topicId, exerciseId) {
    return !!(state.completedExercises[topicId] && state.completedExercises[topicId].includes(exerciseId));
  }

  function recordQuizScore(topicId, score, total) {
    state.quizScores[topicId] = { score, total, date: todayStr() };
    saveState(state);
    const xpGain = Math.round((score / total) * 60);
    addXP(xpGain, 'Quiz complete');
  }

  function getQuizScore(topicId) {
    return state.quizScores[topicId] || null;
  }

  function getState() { return structuredClone(state); }

  function resetProgress() {
    state = structuredClone(DEFAULT_STATE);
    saveState(state);
    location.reload();
  }

  window.CSFA = {
    addXP,
    markLessonComplete,
    isLessonComplete,
    markExerciseComplete,
    isExerciseComplete,
    recordQuizScore,
    getQuizScore,
    getState,
    resetProgress,
    computeLevel,
    moduleCompletion,
    totalExercises,
    BADGE_DEFS,
    checkBadges,
  };

  /* ---------------------------------------------------------------------
     7. NAV: scroll state, mobile burger, active link, streak chip
  --------------------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const burger = document.querySelector('.nav-burger');
    const panel = document.querySelector('.nav-mobile-panel');
    if (burger && panel) {
      burger.addEventListener('click', () => {
        panel.classList.toggle('is-open');
      });
      panel.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => panel.classList.remove('is-open'))
      );
    }

    const streakChip = document.querySelector('[data-streak-chip]');
    if (streakChip) {
      streakChip.innerHTML = `🔥 <span>${state.streak} day${state.streak === 1 ? '' : 's'}</span>`;
    }

    // Active link highlighting based on current path
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
      if (link.dataset.page === path) link.classList.add('is-active');
    });
  }

  /* ---------------------------------------------------------------------
     8. SCROLL REVEAL
  --------------------------------------------------------------------- */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => obs.observe(t));
  }

  /* ---------------------------------------------------------------------
     9. AMBIENT PARTICLES (canvas, lightweight)
  --------------------------------------------------------------------- */
  function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const COUNT = window.innerWidth < 700 ? 26 : 50;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function makeParticles() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.15,
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    resize();
    makeParticles();
    tick();
    window.addEventListener('resize', () => { resize(); makeParticles(); });
  }

  /* ---------------------------------------------------------------------
     10. TOAST
  --------------------------------------------------------------------- */
  let toastEl = null;
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }
  window.CSFA_showToast = showToast;

  /* ---------------------------------------------------------------------
     INIT
  --------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    registerVisit();
    checkBadges();
    initNav();
    initReveal();
    initParticles();
  });
})();
