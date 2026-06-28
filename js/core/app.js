/* ==========================================================================
   APP — composition root
   Instantiates every core class and wires them together. Runs once per
   page load. At the bottom, it exposes the *same* global surface the old
   procedural code did (window.CSFA, window.CSFA_TOPICS, window.CSFA_MODULES,
   window.CSFA_TOPIC_TITLES, window.CSFA_getModuleForTopic,
   window.CSFA_showToast) so none of the existing page-level <script> blocks
   (in index.html / pages/*.html) need to change. Those globals are now a
   thin façade delegating to real objects instead of being the source of
   truth themselves.
   ========================================================================== */

class App {
  constructor() {
    this.catalog = new Catalog(
      window.CSFA_RAW_MODULES || [],
      window.CSFA_RAW_TOPICS || [],
      window.CSFA_RAW_TOPIC_TITLES || {}
    );
    this.progressStore = new ProgressStore();
    this.badgeEngine = new BadgeEngine(this.catalog);
    this.toast = new ToastService();
    this.particles = new ParticleField('particles');
    this.reveal = new ScrollRevealController('.reveal');
    this.nav = new SiteNav(this.progressStore);
    this.layout = new SiteLayout({
      progressStore: this.progressStore,
      onReset: () => this.resetProgress(),
    });
  }

  /* ---- lifecycle ---- */
  init() {
    this.progressStore.registerVisit();
    this._announceNewBadges(this.badgeEngine.evaluate(this.progressStore));
    this._exposeLegacyGlobals(); // must run before layout.mount(), which fires
                                  // 'csfa:layout-ready' — listeners expect
                                  // window.CSFA / CSFA_TOPICS / CSFA_MODULES
                                  // to already exist at that point.
    this.layout.mount();
    this.nav.init();
    this.reveal.observe();
    this.particles.start();
  }

  /* ---- gameplay actions, used by topic pages / quiz engine ---- */
  addXP(amount, reason) {
    const result = this.progressStore.addXP(amount);
    if (amount > 0) this.toast.show(`+${amount} XP${reason ? ' · ' + reason : ''}`);
    if (result.leveledUp) setTimeout(() => this.toast.show(`🎉 Level up! You're now Level ${result.level}`), 700);
    this._announceNewBadges(this.badgeEngine.evaluate(this.progressStore));
    return result;
  }

  markLessonComplete(topicId) {
    const isNew = this.progressStore.markLessonComplete(topicId);
    if (isNew) this.addXP(40, 'Lesson complete');
    return isNew;
  }

  markExerciseComplete(topicId, exerciseId) {
    const isNew = this.progressStore.markExerciseComplete(topicId, exerciseId);
    if (isNew) this.addXP(15, 'Exercise solved');
    return isNew;
  }

  recordQuizScore(topicId, score, total) {
    const xpGain = this.progressStore.recordQuizScore(topicId, score, total);
    this.addXP(xpGain, 'Quiz complete');
  }

  resetProgress() {
    this.progressStore.reset();
    location.reload();
  }

  _announceNewBadges(newlyUnlocked) {
    newlyUnlocked.forEach(badge => this.toast.show(`🏅 Badge unlocked: ${badge.name}`));
  }

  /* ---- legacy global façade ----
     Keeps window.CSFA / window.CSFA_TOPICS / window.CSFA_MODULES etc.
     working exactly as before, backed by the class instances above. */
  _exposeLegacyGlobals() {
    const app = this;

    window.CSFA = {
      addXP: (amount, reason) => app.addXP(amount, reason),
      markLessonComplete: (topicId) => app.markLessonComplete(topicId),
      isLessonComplete: (topicId) => app.progressStore.isLessonComplete(topicId),
      markExerciseComplete: (topicId, exId) => app.markExerciseComplete(topicId, exId),
      isExerciseComplete: (topicId, exId) => app.progressStore.isExerciseComplete(topicId, exId),
      recordQuizScore: (topicId, score, total) => app.recordQuizScore(topicId, score, total),
      getQuizScore: (topicId) => app.progressStore.getQuizScore(topicId),
      getState: () => app.progressStore.getSnapshot(),
      resetProgress: () => app.resetProgress(),
      computeLevel: (xp) => ProgressStore.computeLevel(xp),
      moduleCompletion: (moduleNum) => app.progressStore.moduleCompletion(moduleNum, app.catalog),
      totalExercises: () => app.progressStore.totalExercisesSolved(),
      BADGE_DEFS: app.badgeEngine.badges,
      checkBadges: () => app.badgeEngine.evaluate(app.progressStore),
    };

    // Flat arrays/objects some pages read directly (courses.html, roadmap.html, etc.)
    window.CSFA_TOPICS = app.catalog.topics.map(t => ({
      id: t.id, module: t.module, title: t.title, tagline: t.tagline, readMinutes: t.readMinutes,
      intro: t.intro, visual: t.visual,
      examples: t.examples, exercises: t.exercises, interview: t.interview,
      realWorld: t.realWorld, quiz: t.quiz,
    }));
    window.CSFA_MODULES = app.catalog.modules.map(m => ({
      num: m.num, id: m.id, icon: m.icon, name: m.name, description: m.description, topics: m.topicIds,
    }));
    window.CSFA_TOPIC_TITLES = app.catalog.topicTitles;
    window.CSFA_getModuleForTopic = (topicId) => {
      const mod = app.catalog.getModuleForTopic(topicId);
      return mod ? { num: mod.num, id: mod.id, icon: mod.icon, name: mod.name, description: mod.description, topics: mod.topicIds } : null;
    };
    window.CSFA_showToast = (msg) => app.toast.show(msg);

    // Expose the app + catalog themselves for the new class-based renderers
    // (TopicPageRenderer, CodePlayground, TerminalEmulator) to use directly,
    // without going through the legacy globals.
    window.CSFA_APP = app;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.CSFA_APP_INSTANCE = new App();
  window.CSFA_APP_INSTANCE.init();
});
