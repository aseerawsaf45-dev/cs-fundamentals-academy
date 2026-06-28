/* ==========================================================================
   PROGRESS STORE + BADGE ENGINE
   Replaces the closures/IIFE state in the old main.js with real classes.
   ProgressStore owns persistence + XP/streak math.
   BadgeEngine owns badge definitions and unlock evaluation, decoupled
   from ProgressStore via dependency injection (it's handed a Catalog
   to evaluate module-completion-based badges).
   ========================================================================== */

class ProgressStore {
  static STORAGE_KEY = 'csfa_progress_v1';

  static DEFAULT_STATE = {
    xp: 0,
    level: 1,
    completedLessons: [],
    completedExercises: {},
    quizScores: {},
    lastVisitDate: null,
    streak: 0,
    longestStreak: 0,
    visitDates: [],
    badges: [],
  };

  constructor() {
    this.state = this._load();
  }

  /* ---- persistence ---- */
  _load() {
    try {
      const raw = localStorage.getItem(ProgressStore.STORAGE_KEY);
      if (!raw) return structuredClone(ProgressStore.DEFAULT_STATE);
      return Object.assign(structuredClone(ProgressStore.DEFAULT_STATE), JSON.parse(raw));
    } catch (e) {
      console.warn('ProgressStore: failed to load, resetting.', e);
      return structuredClone(ProgressStore.DEFAULT_STATE);
    }
  }

  _save() {
    try {
      localStorage.setItem(ProgressStore.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('ProgressStore: failed to save.', e);
    }
  }

  getSnapshot() {
    return structuredClone(this.state);
  }

  reset() {
    this.state = structuredClone(ProgressStore.DEFAULT_STATE);
    this._save();
  }

  /* ---- XP / leveling ---- */
  static xpForLevel(level) {
    return Math.round(150 * level * (1 + (level - 1) * 0.12));
  }

  static computeLevel(xp) {
    let level = 1;
    let cumulative = 0;
    while (true) {
      const need = ProgressStore.xpForLevel(level);
      if (cumulative + need > xp) break;
      cumulative += need;
      level += 1;
      if (level > 200) break; // safety valve
    }
    return { level, xpIntoLevel: xp - cumulative, xpNeeded: ProgressStore.xpForLevel(level) };
  }

  addXP(amount) {
    this.state.xp += amount;
    const lvl = ProgressStore.computeLevel(this.state.xp);
    const leveledUp = lvl.level > this.state.level;
    this.state.level = lvl.level;
    this._save();
    return { ...lvl, leveledUp };
  }

  /* ---- lessons ---- */
  markLessonComplete(topicId) {
    if (this.state.completedLessons.includes(topicId)) return false;
    this.state.completedLessons.push(topicId);
    this._save();
    return true;
  }

  isLessonComplete(topicId) {
    return this.state.completedLessons.includes(topicId);
  }

  /* ---- exercises ---- */
  markExerciseComplete(topicId, exerciseId) {
    if (!this.state.completedExercises[topicId]) this.state.completedExercises[topicId] = [];
    if (this.state.completedExercises[topicId].includes(exerciseId)) return false;
    this.state.completedExercises[topicId].push(exerciseId);
    this._save();
    return true;
  }

  isExerciseComplete(topicId, exerciseId) {
    const list = this.state.completedExercises[topicId];
    return !!(list && list.includes(exerciseId));
  }

  totalExercisesSolved() {
    return Object.values(this.state.completedExercises).reduce((sum, arr) => sum + arr.length, 0);
  }

  /* ---- quizzes ---- */
  recordQuizScore(topicId, score, total) {
    this.state.quizScores[topicId] = { score, total, date: this._todayStr() };
    this._save();
    return Math.round((score / total) * 60); // XP suggestion; caller decides whether to add it
  }

  getQuizScore(topicId) {
    return this.state.quizScores[topicId] || null;
  }

  /* ---- streaks ---- */
  _todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  registerVisit() {
    const today = this._todayStr();
    if (this.state.visitDates.includes(today)) return false;

    this.state.visitDates.push(today);
    this.state.visitDates = this.state.visitDates.slice(-90);

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (this.state.lastVisitDate === yesterday) {
      this.state.streak += 1;
    } else if (this.state.lastVisitDate !== today) {
      this.state.streak = 1;
    }
    this.state.lastVisitDate = today;
    this.state.longestStreak = Math.max(this.state.longestStreak, this.state.streak);
    this._save();
    return true;
  }

  /* ---- module completion (needs a Catalog to know topic membership) ---- */
  moduleCompletion(moduleNum, catalog) {
    const topics = catalog.topicsForModule(moduleNum);
    if (!topics.length) return 0;
    const done = topics.filter(t => this.state.completedLessons.includes(t.id)).length;
    return done / topics.length;
  }

  /* ---- badges ---- */
  hasBadge(badgeId) {
    return this.state.badges.includes(badgeId);
  }

  unlockBadge(badgeId) {
    if (this.hasBadge(badgeId)) return false;
    this.state.badges.push(badgeId);
    this._save();
    return true;
  }
}

class Badge {
  constructor({ id, name, desc, emoji, test }) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.emoji = emoji;
    this.test = test; // (store, catalog) => boolean
  }
}

class BadgeEngine {
  constructor(catalog) {
    this.catalog = catalog;
    this.badges = [
      new Badge({ id: 'first_lesson', name: 'First Steps', desc: 'Complete your first lesson', emoji: '🌱',
        test: (store) => store.state.completedLessons.length >= 1 }),
      new Badge({ id: 'five_lessons', name: 'Getting Traction', desc: 'Complete 5 lessons', emoji: '🚀',
        test: (store) => store.state.completedLessons.length >= 5 }),
      new Badge({ id: 'module_1_done', name: 'Foundations Laid', desc: 'Finish Module 1', emoji: '🏗️',
        test: (store, catalog) => store.moduleCompletion(1, catalog) >= 1 }),
      new Badge({ id: 'streak_3', name: 'On a Roll', desc: '3-day learning streak', emoji: '🔥',
        test: (store) => store.state.streak >= 3 }),
      new Badge({ id: 'streak_7', name: 'Committed', desc: '7-day learning streak', emoji: '🔥',
        test: (store) => store.state.streak >= 7 }),
      new Badge({ id: 'quiz_perfect', name: 'Perfectionist', desc: 'Score 100% on a quiz', emoji: '🎯',
        test: (store) => Object.values(store.state.quizScores).some(q => q.score === q.total) }),
      new Badge({ id: 'level_5', name: 'Rising Coder', desc: 'Reach Level 5', emoji: '⭐',
        test: (store) => ProgressStore.computeLevel(store.state.xp).level >= 5 }),
      new Badge({ id: 'exercises_10', name: 'Hands On', desc: 'Solve 10 practice exercises', emoji: '🛠️',
        test: (store) => store.totalExercisesSolved() >= 10 }),
    ];
  }

  /** Evaluate all badges against the current store state; unlock + return newly-earned ones. */
  evaluate(store) {
    const newlyUnlocked = [];
    for (const badge of this.badges) {
      if (!store.hasBadge(badge.id) && badge.test(store, this.catalog)) {
        store.unlockBadge(badge.id);
        newlyUnlocked.push(badge);
      }
    }
    return newlyUnlocked;
  }
}
