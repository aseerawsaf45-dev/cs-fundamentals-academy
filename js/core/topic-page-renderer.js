/* ==========================================================================
   TOPIC PAGE RENDERER
   Reads ?id=<topicId> from the URL, looks the topic up via the App's
   Catalog, and renders the full Topic Detail Page — or a "coming soon"
   state if the topic isn't built yet. Replaces the old topic-render.js
   IIFE; depends on DiagramRenderer (diagrams) and QuizEngine (the quiz
   section), composed here rather than duplicated.
   ========================================================================== */

class TopicPageRenderer {
  /** @param {App} app */
  constructor(app) {
    this.app = app;
    this.rootEl = document.getElementById('topic-root');
  }

  /* ---- entry point ---- */
  render() {
    const topicId = this._getTopicIdFromUrl();
    const topic = this.app.catalog.getTopic(topicId);
    if (topic) {
      this._renderTopic(topic);
    } else {
      this._renderComingSoon(topicId);
    }
  }

  _getTopicIdFromUrl() {
    return new URLSearchParams(location.search).get('id');
  }

  _escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------------------------------------------------------------------
     SECTION RENDERERS — each returns an HTML string for one topic-section
  --------------------------------------------------------------------- */
  _renderIntro(topic) {
    return `
    <div class="topic-section" id="sec-intro">
      <h2>Introduction</h2>
      <div class="topic-prose">
        <p><strong>What it is.</strong> ${this._escapeHtml(topic.intro.whatItIs)}</p>
        <p><strong>Why it matters.</strong> ${this._escapeHtml(topic.intro.whyItMatters)}</p>
        <p><strong>Where it's used.</strong> ${this._escapeHtml(topic.intro.whereUsed)}</p>
      </div>
      <div class="mistake-box">
        <h4>⚠ Common mistake</h4>
        <p style="color:var(--text-1); font-size:0.92rem;">${this._escapeHtml(topic.intro.commonMistakes)}</p>
      </div>
    </div>`;
  }

  _renderVisual(topic) {
    return `
    <div class="topic-section" id="sec-visual">
      <h2>Visual Explanation</h2>
      <p style="color:var(--text-2); margin-bottom:8px;">${this._escapeHtml(topic.visual.caption)}</p>
      <div class="diagram-frame">${DiagramRenderer.render(topic.visual)}</div>
    </div>`;
  }

  _renderExamples(topic) {
    const cards = topic.examples.map((ex, i) => `
      <div class="example-card">
        <div class="example-head">
          <div class="example-head-left">
            <span class="example-num">EX ${i + 1}</span>
            <span class="badge ${ex.difficultyBadgeClass}">${ex.difficultyLabel}</span>
          </div>
          <h4 style="margin:0; font-size:1rem;">${this._escapeHtml(ex.title)}</h4>
        </div>
        <div class="example-body">
          <p class="example-explain">${this._escapeHtml(ex.explanation)}</p>
          <div class="code-block">
            <div class="code-block-bar">
              <span class="code-block-lang">${ex.language}</span>
              <div class="code-block-actions">
                <button class="icon-btn" data-copy-code title="Copy code">⧉</button>
              </div>
            </div>
            <pre><code>${this._escapeHtml(ex.code)}</code></pre>
          </div>
          <button class="btn btn-ghost btn-sm" data-run-example style="margin-top:12px;">▶ Run</button>
          <div class="output-block" data-output hidden>
            <div class="output-block-bar">Output</div>
            <pre>${this._escapeHtml(ex.output)}</pre>
          </div>
        </div>
      </div>
    `).join('');

    return `
    <div class="topic-section" id="sec-examples">
      <h2>Beginner Examples</h2>
      <p style="color:var(--text-2); margin-bottom:24px;">Six examples, ordered from very easy to real-world.</p>
      ${cards}
    </div>`;
  }

  _renderExercises(topic) {
    const cards = topic.exercises.map((ex, i) => {
      const hintsHTML = ex.hints.map((h, hi) => `
        <div class="hint-item" data-hint-toggle>
          <span class="hint-label">Hint ${hi + 1}</span><span class="hint-prompt">(click to reveal)</span>
          <div class="hint-text">${this._escapeHtml(h)}</div>
        </div>
      `).join('');

      return `
      <div class="exercise-card">
        <div class="exercise-head">
          <div class="exercise-head-left">
            <span class="example-num">LEVEL ${ex.level}</span>
            <h4 style="margin:0; font-size:1rem;">${this._escapeHtml(ex.title)}</h4>
          </div>
          <span class="badge">Practice</span>
        </div>
        <div class="example-body">
          <p class="exercise-problem">${this._escapeHtml(ex.problem).replace(/\n/g, '<br>')}</p>
          <div class="hint-list">${hintsHTML}</div>
          <button class="btn btn-ghost btn-sm solution-toggle" data-solution-toggle>Reveal Solution</button>
          <div class="solution-panel" data-solution-panel>
            <div class="code-block"><pre><code>${this._escapeHtml(ex.solution)}</code></pre></div>
            <button class="btn btn-primary btn-sm" data-mark-exercise="${topic.id}:${i}" style="margin-top:12px;">✓ Mark as solved</button>
          </div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="topic-section" id="sec-exercises">
      <h2>Practice Exercises</h2>
      <p style="color:var(--text-2); margin-bottom:24px;">Six exercises, increasing in difficulty. Try before revealing hints.</p>
      ${cards}
    </div>`;
  }

  _renderInterview(topic) {
    const items = topic.interview.map((qa, i) => `
      <div class="qa-item" data-qa-item>
        <button class="qa-question" data-qa-toggle style="width:100%; text-align:left; background:none; border:none;">
          <span>${i + 1}. ${this._escapeHtml(qa.q)}</span>
          <span class="qa-chevron">▾</span>
        </button>
        <div class="qa-answer"><p>${this._escapeHtml(qa.a)}</p></div>
      </div>`).join('');

    return `
    <div class="topic-section" id="sec-interview">
      <h2>Interview-Style Questions</h2>
      ${items}
    </div>`;
  }

  _renderRealWorld(topic) {
    const cards = topic.realWorld.map(rw => `
      <div class="card rw-card">
        <div class="rw-company">${this._escapeHtml(rw.company)}</div>
        <p>${this._escapeHtml(rw.text)}</p>
      </div>`).join('');

    return `
    <div class="topic-section" id="sec-realworld">
      <h2>Real-World Applications</h2>
      <div class="rw-grid">${cards}</div>
    </div>`;
  }

  _renderQuizSection() {
    return `
    <div class="topic-section" id="sec-quiz">
      <h2>Quiz</h2>
      <p style="color:var(--text-2); margin-bottom:20px;">10 questions. Instant grading.</p>
      <div id="quiz-mount"></div>
    </div>`;
  }

  /* ---------------------------------------------------------------------
     PREV / NEXT NAVIGATION HELPERS
  --------------------------------------------------------------------- */
  _getPrevNextTopics(topic) {
    const mod = this.app.catalog.getModuleForTopic(topic.id);
    if (!mod) return { prev: null, next: null };
    const ids = mod.topicIds;
    const idx = ids.indexOf(topic.id);
    const prevId = idx > 0 ? ids[idx - 1] : null;
    const nextId = idx < ids.length - 1 ? ids[idx + 1] : null;
    return {
      prev: prevId ? { id: prevId, title: this.app.catalog.topicTitle(prevId) } : null,
      next: nextId ? { id: nextId, title: this.app.catalog.topicTitle(nextId) } : null,
    };
  }

  _renderNavButtons(prev, next) {
    const prevBtn = prev
      ? `<a href="topic.html?id=${prev.id}" class="topic-nav-btn topic-nav-prev" id="btn-prev-topic">
           <span class="topic-nav-arrow">←</span>
           <span class="topic-nav-label">
             <span class="topic-nav-hint">Previous</span>
             <span class="topic-nav-title">${this._escapeHtml(prev.title)}</span>
           </span>
         </a>`
      : `<div></div>`;
    const nextBtn = next
      ? `<a href="topic.html?id=${next.id}" class="topic-nav-btn topic-nav-next" id="btn-next-topic">
           <span class="topic-nav-label">
             <span class="topic-nav-hint">Next</span>
             <span class="topic-nav-title">${this._escapeHtml(next.title)}</span>
           </span>
           <span class="topic-nav-arrow">→</span>
         </a>`
      : `<div></div>`;
    return `<div class="topic-nav-row">${prevBtn}${nextBtn}</div>`;
  }

  /* ---------------------------------------------------------------------
     PAGE ASSEMBLY
  --------------------------------------------------------------------- */
  _renderTopic(topic) {
    document.title = topic.title + ' — CS Fundamentals Academy';
    const mod = this.app.catalog.getModuleForTopic(topic.id);
    const isDone = this.app.progressStore.isLessonComplete(topic.id);
    const { prev, next } = this._getPrevNextTopics(topic);

    this.rootEl.innerHTML = `
      <div class="topic-hero">
        <div class="container">
          <div class="breadcrumb">
            <a href="courses.html">Courses</a> <span>/</span>
            <a href="courses.html#${mod ? mod.id : ''}">${mod ? this._escapeHtml(mod.name) : ''}</a> <span>/</span>
            <span>${this._escapeHtml(topic.title)}</span>
          </div>
          <h1 class="text-h1">${this._escapeHtml(topic.title)}</h1>
          <p class="text-lead" style="margin-top:14px; max-width:680px;">${this._escapeHtml(topic.tagline)}</p>
          <div class="topic-meta-row">
            <span class="badge">📖 ${topic.readMinutes} min read</span>
            <span class="badge">🧪 ${topic.exampleCount} examples</span>
            <span class="badge">✏️ ${topic.exerciseCount} exercises</span>
            <button class="btn ${isDone ? 'btn-ghost' : 'btn-primary'} btn-sm" id="mark-complete-btn">${isDone ? '✓ Lesson complete' : 'Mark lesson complete'}</button>
          </div>

          <!-- Show / Hide content toggle -->
          <div class="topic-reveal-row">
            <button class="btn btn-primary" id="show-content-btn">
              <span id="show-content-icon">👁</span> Show Content
            </button>
            <span class="topic-reveal-hint">Content is hidden — press the button to start reading.</span>
          </div>
        </div>
      </div>

      <!-- Collapsible content wrapper -->
      <div id="topic-content-area" class="topic-content-area" aria-hidden="true">
        <div class="container topic-layout">
          <nav class="topic-toc" aria-label="On this page">
            <a href="#sec-intro" class="toc-link">Introduction</a>
            <a href="#sec-visual" class="toc-link">Visual Explanation</a>
            <a href="#sec-examples" class="toc-link">Examples</a>
            <a href="#sec-exercises" class="toc-link">Exercises</a>
            <a href="#sec-interview" class="toc-link">Interview Qs</a>
            <a href="#sec-realworld" class="toc-link">Real World</a>
            <a href="#sec-quiz" class="toc-link">Quiz</a>
          </nav>
          <div>
            ${this._renderIntro(topic)}
            ${this._renderVisual(topic)}
            ${this._renderExamples(topic)}
            ${this._renderExercises(topic)}
            ${this._renderInterview(topic)}
            ${this._renderRealWorld(topic)}
            ${this._renderQuizSection()}
          </div>
        </div>
      </div>

      <!-- Prev / Next navigation -->
      <div class="container">
        ${this._renderNavButtons(prev, next)}
      </div>`;

    this._bindInteractions(topic);
    new QuizEngine(topic, document.getElementById('quiz-mount'), this.app).start();
    this._initTocScrollSpy();
  }

  _renderComingSoon(topicId) {
    const mod = this.app.catalog.getModuleForTopic(topicId);
    const title = this.app.catalog.topicTitle(topicId) || 'Topic';

    this.rootEl.innerHTML = `
      <div class="topic-hero">
        <div class="container">
          <div class="breadcrumb">
            <a href="courses.html">Courses</a> <span>/</span> <span>${this._escapeHtml(title)}</span>
          </div>
          <h1 class="text-h1">${this._escapeHtml(title)}</h1>
          <p class="text-lead" style="margin-top:14px;">${mod ? this._escapeHtml(mod.name) : 'This module'} is on the roadmap and coming soon. Module 1 (Computer Fundamentals) is fully available now.</p>
          <div class="topic-meta-row">
            <a href="courses.html#module-1" class="btn btn-primary btn-sm">Explore Module 1 instead</a>
            <a href="roadmap.html" class="btn btn-ghost btn-sm">View full roadmap</a>
          </div>
        </div>
      </div>`;
    document.title = title + ' (Coming Soon) — CS Fundamentals Academy';
  }

  /* ---------------------------------------------------------------------
     INTERACTIONS
  --------------------------------------------------------------------- */
  _bindInteractions(topic) {
    document.getElementById('mark-complete-btn').addEventListener('click', (e) => {
      this.app.markLessonComplete(topic.id);
      e.target.textContent = '✓ Lesson complete';
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-ghost');
    });

    // Show / Hide content toggle
    const showBtn = document.getElementById('show-content-btn');
    const contentArea = document.getElementById('topic-content-area');
    const hintEl = showBtn.parentElement.querySelector('.topic-reveal-hint');
    let isVisible = false;
    showBtn.addEventListener('click', () => {
      isVisible = !isVisible;
      contentArea.classList.toggle('is-visible', isVisible);
      contentArea.setAttribute('aria-hidden', String(!isVisible));
      showBtn.innerHTML = isVisible
        ? '<span>🙈</span> Hide Content'
        : '<span>👁</span> Show Content';
      hintEl.textContent = isVisible
        ? 'Scroll down to read the lesson.'
        : 'Content is hidden — press the button to start reading.';
      if (isVisible) {
        // Smooth scroll into content
        setTimeout(() => contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      }
    });

    document.querySelectorAll('[data-run-example]').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.example-body');
        const out = card.querySelector('[data-output]');
        out.hidden = false;
        btn.textContent = '✓ Ran';
      });
    });

    document.querySelectorAll('[data-copy-code]').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.closest('.code-block').querySelector('code').textContent;
        navigator.clipboard?.writeText(code).then(() => {
          btn.textContent = '✓';
          setTimeout(() => (btn.textContent = '⧉'), 1400);
        });
      });
    });

    document.querySelectorAll('[data-hint-toggle]').forEach(hint => {
      hint.addEventListener('click', () => hint.classList.toggle('is-revealed'));
    });

    document.querySelectorAll('[data-solution-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const isOpen = panel.classList.toggle('is-open');
        btn.textContent = isOpen ? 'Hide Solution' : 'Reveal Solution';
      });
    });

    document.querySelectorAll('[data-mark-exercise]').forEach(btn => {
      btn.addEventListener('click', () => {
        const [topicId, exIndex] = btn.dataset.markExercise.split(':');
        this.app.markExerciseComplete(topicId, exIndex);
        btn.textContent = '✓ Solved';
        btn.disabled = true;
      });
    });

    document.querySelectorAll('[data-qa-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('[data-qa-item]').classList.toggle('is-open');
      });
    });
  }

  _initTocScrollSpy() {
    const links = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.topic-section');
    if (!sections.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => obs.observe(s));
  }
}

document.addEventListener('csfa:layout-ready', () => {
  new TopicPageRenderer(window.CSFA_APP).render();
});
