/* ==========================================================================
   QUIZ ENGINE
   A real stateful class replacing the old initQuiz() closure. One instance
   per topic-page visit. Owns current question index, running score, and
   per-question "answered" lock; renders into a single mount element and
   reports the final score back through the App instance (XP + persistence)
   rather than reaching for window.CSFA directly, so it's testable in
   isolation given any object with a recordQuizScore(topicId, score, total)
   method.
   ========================================================================== */

class QuizEngine {
  /**
   * @param {Topic} topic - the Topic model (has .quiz: QuizQuestion[])
   * @param {HTMLElement} mountEl - container to render into
   * @param {{ recordQuizScore: (topicId, score, total) => void }} app
   */
  constructor(topic, mountEl, app) {
    this.topic = topic;
    this.mount = mountEl;
    this.app = app;

    this.current = 0;
    this.score = 0;
    this.answered = false;
    this.dragState = [];
  }

  start() {
    this._renderQuestion();
  }

  get total() {
    return this.topic.quiz.length;
  }

  _escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  _renderQuestion() {
    const q = this.topic.quiz[this.current];
    this.answered = false;

    if (q.type === 'drag-drop') {
      const shuffled = [...q.options].sort(() => Math.random() - 0.5);
      this.dragState = shuffled.map(label => ({ label, originalIndex: q.options.indexOf(label) }));
    }

    this.mount.innerHTML = `
      <div class="quiz-progress-row">
        <span class="text-mono" style="color:var(--text-2);">Question ${this.current + 1} / ${this.total}</span>
        <div class="progress-bar-track" style="flex:1;"><div class="progress-bar-fill" style="width:${(this.current / this.total) * 100}%"></div></div>
      </div>
      <div class="quiz-card glass">
        <div class="quiz-q-num">${q.type.toUpperCase().replace('-', ' ')}</div>
        <div class="quiz-question-text">${this._escapeHtml(q.q).replace(/\n/g, '<br>')}</div>
        <div id="quiz-options-mount"></div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
        <div class="quiz-footer">
          <span class="text-mono" style="color:var(--text-2); font-size:0.85rem;">Score: ${this.score} / ${this.total}</span>
          <button class="btn btn-primary btn-sm" id="quiz-next-btn" disabled>Next →</button>
        </div>
      </div>`;

    if (q.type === 'drag-drop') {
      this._renderDragDrop(q);
    } else {
      this._renderChoice(q);
    }

    document.getElementById('quiz-next-btn').addEventListener('click', () => this._goNext());
  }

  _renderChoice(q) {
    const optionsMount = document.getElementById('quiz-options-mount');
    optionsMount.innerHTML = `
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-opt-index="${i}">
            <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
            <span>${this._escapeHtml(opt)}</span>
          </button>`).join('')}
      </div>`;

    optionsMount.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.answered) return;
        const idx = Number(btn.dataset.optIndex);
        const correct = q.isCorrectChoice(idx);
        btn.classList.add(correct ? 'is-correct' : 'is-wrong');
        if (!correct) {
          optionsMount.querySelector(`[data-opt-index="${q.correct}"]`).classList.add('is-correct');
        }
        this._showFeedback(correct);
      });
    });
  }

  _renderDragDrop(q) {
    const optionsMount = document.getElementById('quiz-options-mount');
    optionsMount.innerHTML = `
      <p style="font-size:0.85rem; color:var(--text-2); margin-bottom:10px;">Click items in the pool, in the correct order, to place them below.</p>
      <div class="quiz-dd-zone" id="dd-zone"></div>
      <div class="quiz-dd-pool" id="dd-pool">
        ${this.dragState.map((item, i) => `<button class="quiz-dd-chip" data-dd-index="${i}">${this._escapeHtml(item.label)}</button>`).join('')}
      </div>`;

    const placed = [];
    const zone = document.getElementById('dd-zone');
    const pool = document.getElementById('dd-pool');

    pool.querySelectorAll('[data-dd-index]').forEach(chip => {
      chip.addEventListener('click', () => {
        if (this.answered) return;
        const idx = Number(chip.dataset.ddIndex);
        placed.push(this.dragState[idx].originalIndex);

        const placedChip = document.createElement('span');
        placedChip.className = 'quiz-dd-chip';
        placedChip.style.cursor = 'default';
        placedChip.textContent = chip.textContent;
        zone.appendChild(placedChip);
        chip.remove();

        if (placed.length === this.dragState.length) {
          this._showFeedback(q.isCorrectOrder(placed));
        }
      });
    });
  }

  _showFeedback(correct) {
    this.answered = true;
    if (correct) this.score++;

    const fb = document.getElementById('quiz-feedback');
    fb.textContent = correct ? '✓ Correct!' : '✗ Not quite — the correct answer is highlighted.';
    fb.className = 'quiz-feedback show ' + (correct ? 'correct' : 'wrong');

    document.getElementById('quiz-next-btn').disabled = false;
    this.mount.querySelector('.quiz-footer span').textContent = `Score: ${this.score} / ${this.total}`;
  }

  _goNext() {
    this.current++;
    if (this.current < this.total) {
      this._renderQuestion();
    } else {
      this._renderResult();
    }
  }

  _renderResult() {
    this.app.recordQuizScore(this.topic.id, this.score, this.total);
    const pct = Math.round((this.score / this.total) * 100);

    this.mount.innerHTML = `
      <div class="quiz-card glass quiz-result-screen">
        <div style="font-size:2.5rem; margin-bottom:14px;">${pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📘'}</div>
        <h3 class="text-h3">You scored ${this.score} / ${this.total}</h3>
        <p style="color:var(--text-2); margin: 14px 0 26px;">${pct}% — ${pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Solid effort — review and try again anytime.' : 'Worth a second pass through the lesson above.'}</p>
        <button class="btn btn-primary btn-sm" id="quiz-retry-btn">Retry Quiz</button>
      </div>`;

    document.getElementById('quiz-retry-btn').addEventListener('click', () => this.retry());
  }

  retry() {
    this.current = 0;
    this.score = 0;
    this._renderQuestion();
  }
}
