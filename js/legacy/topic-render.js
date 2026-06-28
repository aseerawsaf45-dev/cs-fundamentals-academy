/* ==========================================================================
   TOPIC PAGE RENDERER
   Reads ?id=<topicId> from the URL, finds the matching topic in
   window.CSFA_TOPICS, and renders the full Topic Detail Page.
   If the topic isn't built yet, renders a "coming soon" state instead.
   ========================================================================== */

(function () {
  function getTopicId() {
    const params = new URLSearchParams(location.search);
    return params.get('id');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------------------------------------------------------------------
     DIAGRAM RENDERERS — one inline SVG per visual.type
  --------------------------------------------------------------------- */
  const DIAGRAMS = {
    'cpu-ram-storage-flow': () => `
      <svg viewBox="0 0 720 220" style="width:100%; max-width:680px; height:auto;">
        <defs>
          <marker id="arrow1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#C084FC"/></marker>
        </defs>
        ${[['Storage', 40], ['RAM', 290], ['CPU', 540]].map(([label, x]) => `
          <rect x="${x}" y="70" width="140" height="80" rx="14" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6" stroke-width="1.5"/>
          <text x="${x + 70}" y="116" text-anchor="middle" fill="#FFFFFF" font-family="Space Grotesk, sans-serif" font-size="18" font-weight="600">${label}</text>
        `).join('')}
        <line x1="180" y1="110" x2="282" y2="110" stroke="#C084FC" stroke-width="2" marker-end="url(#arrow1)"/>
        <line x1="430" y1="110" x2="532" y2="110" stroke="#C084FC" stroke-width="2" marker-end="url(#arrow1)"/>
        <text x="231" y="95" text-anchor="middle" fill="#9CA3AF" font-size="11" font-family="JetBrains Mono, monospace">slow</text>
        <text x="481" y="95" text-anchor="middle" fill="#9CA3AF" font-size="11" font-family="JetBrains Mono, monospace">fast</text>
        <text x="110" y="180" text-anchor="middle" fill="#9CA3AF" font-size="12" font-family="JetBrains Mono, monospace">persistent</text>
        <text x="360" y="180" text-anchor="middle" fill="#9CA3AF" font-size="12" font-family="JetBrains Mono, monospace">temporary</text>
        <text x="610" y="180" text-anchor="middle" fill="#9CA3AF" font-size="12" font-family="JetBrains Mono, monospace">computes</text>
      </svg>`,
    'cpu-cores-diagram': () => `
      <svg viewBox="0 0 720 240" style="width:100%; max-width:680px; height:auto;">
        <text x="120" y="30" text-anchor="middle" fill="#E5E7EB" font-family="Space Grotesk, sans-serif" font-size="14">Single-core</text>
        <rect x="40" y="50" width="160" height="50" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="120" y="80" text-anchor="middle" fill="#fff" font-size="12" font-family="JetBrains Mono, monospace">Task A → B → C</text>
        <text x="120" y="125" text-anchor="middle" fill="#9CA3AF" font-size="11">One thing at a time</text>

        <text x="540" y="30" text-anchor="middle" fill="#E5E7EB" font-family="Space Grotesk, sans-serif" font-size="14">Multi-core</text>
        ${[0,1,2].map(i => `
          <rect x="${420 + i*85}" y="50" width="70" height="50" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
          <text x="${455 + i*85}" y="80" text-anchor="middle" fill="#fff" font-size="11" font-family="JetBrains Mono, monospace">${['A','B','C'][i]}</text>
        `).join('')}
        <text x="540" y="125" text-anchor="middle" fill="#9CA3AF" font-size="11">All at once, in parallel</text>
      </svg>`,
    'ram-storage-compare': () => `
      <svg viewBox="0 0 720 200" style="width:100%; max-width:680px; height:auto;">
        <rect x="60" y="40" width="280" height="120" rx="14" fill="rgba(139,92,246,0.1)" stroke="#8B5CF6"/>
        <text x="200" y="75" text-anchor="middle" fill="#fff" font-size="16" font-family="Space Grotesk, sans-serif" font-weight="600">RAM</text>
        <text x="200" y="100" text-anchor="middle" fill="#9CA3AF" font-size="12">Fast · Volatile</text>
        <text x="200" y="120" text-anchor="middle" fill="#9CA3AF" font-size="12">Cleared on power loss</text>
        <rect x="380" y="40" width="280" height="120" rx="14" fill="rgba(192,132,252,0.08)" stroke="#C084FC"/>
        <text x="520" y="75" text-anchor="middle" fill="#fff" font-size="16" font-family="Space Grotesk, sans-serif" font-weight="600">Storage</text>
        <text x="520" y="100" text-anchor="middle" fill="#9CA3AF" font-size="12">Slower · Persistent</text>
        <text x="520" y="120" text-anchor="middle" fill="#9CA3AF" font-size="12">Survives power loss</text>
      </svg>`,
    'storage-types-diagram': () => `
      <svg viewBox="0 0 720 200" style="width:100%; max-width:680px; height:auto;">
        <circle cx="180" cy="100" r="55" fill="none" stroke="#8B5CF6" stroke-width="2"/>
        <circle cx="180" cy="100" r="6" fill="#C084FC"/>
        <text x="180" y="170" text-anchor="middle" fill="#E5E7EB" font-size="13" font-family="Space Grotesk, sans-serif">HDD (spinning platter)</text>
        <rect x="460" y="70" width="180" height="60" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="550" y="170" text-anchor="middle" fill="#E5E7EB" font-size="13" font-family="Space Grotesk, sans-serif">SSD (flash chips)</text>
      </svg>`,
    'os-layers-diagram': () => `
      <svg viewBox="0 0 720 220" style="width:100%; max-width:680px; height:auto;">
        ${[['Apps (Browser, Editor...)', 20, '#C084FC'], ['Operating System', 90, '#A855F7'], ['Hardware (CPU, RAM, Disk)', 160, '#6D28D9']].map(([label, y, color]) => `
          <rect x="80" y="${y}" width="560" height="50" rx="10" fill="rgba(139,92,246,0.1)" stroke="${color}"/>
          <text x="360" y="${y+30}" text-anchor="middle" fill="#fff" font-size="14" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
      </svg>`,
    'command-anatomy-diagram': () => `
      <svg viewBox="0 0 720 140" style="width:100%; max-width:680px; height:auto;">
        <text x="60" y="60" fill="#C084FC" font-family="JetBrains Mono, monospace" font-size="22">git</text>
        <text x="120" y="60" fill="#FBBF24" font-family="JetBrains Mono, monospace" font-size="22">commit</text>
        <text x="240" y="60" fill="#93C5FD" font-family="JetBrains Mono, monospace" font-size="22">-m</text>
        <text x="280" y="60" fill="#6EE7B7" font-family="JetBrains Mono, monospace" font-size="22">"message"</text>
        <text x="75" y="90" fill="#9CA3AF" font-size="11">program</text>
        <text x="150" y="90" fill="#9CA3AF" font-size="11">subcommand</text>
        <text x="250" y="90" fill="#9CA3AF" font-size="11">flag</text>
        <text x="350" y="90" fill="#9CA3AF" font-size="11">argument</text>
      </svg>`,
    'internet-packet-journey': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        ${['You','Router','ISP','Server'].map((label,i) => `
          <circle cx="${90+i*180}" cy="70" r="36" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
          <text x="${90+i*180}" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
        ${[0,1,2].map(i => `<line x1="${126+i*180}" y1="70" x2="${254+i*180}" y2="70" stroke="#C084FC" stroke-width="2"/>`).join('')}
      </svg>`,
    'http-request-response': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="40" y="60" width="150" height="60" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="115" y="95" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Client</text>
        <rect x="530" y="60" width="150" height="60" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="605" y="95" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Server</text>
        <line x1="190" y1="80" x2="528" y2="80" stroke="#C084FC" stroke-width="2"/>
        <text x="360" y="70" text-anchor="middle" fill="#6EE7B7" font-size="11" font-family="JetBrains Mono, monospace">GET /users →</text>
        <line x1="528" y1="105" x2="190" y2="105" stroke="#FBBF24" stroke-width="2"/>
        <text x="360" y="130" text-anchor="middle" fill="#FBBF24" font-size="11" font-family="JetBrains Mono, monospace">← 200 OK + data</text>
      </svg>`,
    'https-encryption-layer': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        <rect x="40" y="60" width="120" height="50" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="100" y="90" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Browser</text>
        <rect x="290" y="50" width="140" height="70" rx="10" fill="rgba(52,211,153,0.1)" stroke="#34D399"/>
        <text x="360" y="80" text-anchor="middle" fill="#34D399" font-size="12" font-family="Space Grotesk, sans-serif">🔒 TLS</text>
        <text x="360" y="100" text-anchor="middle" fill="#9CA3AF" font-size="10">Encrypted tunnel</text>
        <rect x="560" y="60" width="120" height="50" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="620" y="90" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Server</text>
        <line x1="160" y1="85" x2="288" y2="85" stroke="#34D399" stroke-width="2"/>
        <line x1="432" y1="85" x2="558" y2="85" stroke="#34D399" stroke-width="2"/>
      </svg>`,
    'dns-lookup-chain': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        ${['Browser cache','OS cache','ISP resolver','Authoritative'].map((label,i) => `
          <rect x="${40+i*170}" y="70" width="140" height="60" rx="10" fill="rgba(139,92,246,0.13)" stroke="#8B5CF6"/>
          <text x="${110+i*170}" y="105" text-anchor="middle" fill="#fff" font-size="11" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
        ${[0,1,2].map(i => `<line x1="${180+i*170}" y1="100" x2="${210+i*170}" y2="100" stroke="#C084FC" stroke-width="2"/>`).join('')}
      </svg>`,
  };

  function renderDiagram(visual) {
    const renderer = DIAGRAMS[visual.type];
    return renderer ? renderer() : '<p class="text-muted">Diagram unavailable.</p>';
  }

  /* ---------------------------------------------------------------------
     SECTION RENDERERS
  --------------------------------------------------------------------- */
  function difficultyBadgeClass(d) {
    return 'badge-' + d;
  }
  function difficultyLabel(d) {
    return { 'very-easy': 'Very Easy', easy: 'Easy', medium: 'Medium', 'medium-plus': 'Medium+', hard: 'Hard', 'real-world': 'Real World' }[d] || d;
  }

  function renderIntro(topic) {
    return `
    <div class="topic-section" id="sec-intro">
      <h2>Introduction</h2>
      <div class="topic-prose">
        <p><strong>What it is.</strong> ${topic.intro.whatItIs}</p>
        <p><strong>Why it matters.</strong> ${topic.intro.whyItMatters}</p>
        <p><strong>Where it's used.</strong> ${topic.intro.whereUsed}</p>
      </div>
      <div class="mistake-box">
        <h4>⚠ Common mistake</h4>
        <p style="color:var(--text-1); font-size:0.92rem;">${topic.intro.commonMistakes}</p>
      </div>
    </div>`;
  }

  function renderVisual(topic) {
    return `
    <div class="topic-section" id="sec-visual">
      <h2>Visual Explanation</h2>
      <p style="color:var(--text-2); margin-bottom:8px;">${topic.visual.caption}</p>
      <div class="diagram-frame">${renderDiagram(topic.visual)}</div>
    </div>`;
  }

  function renderExamples(topic) {
    const cards = topic.examples.map((ex, i) => `
      <div class="example-card">
        <div class="example-head">
          <div class="example-head-left">
            <span class="example-num">EX ${i + 1}</span>
            <span class="badge ${difficultyBadgeClass(ex.difficulty)}">${difficultyLabel(ex.difficulty)}</span>
          </div>
          <h4 style="margin:0; font-size:1rem;">${ex.title}</h4>
        </div>
        <div class="example-body">
          <p class="example-explain">${ex.explanation}</p>
          <div class="code-block">
            <div class="code-block-bar">
              <span class="code-block-lang">${ex.language}</span>
              <div class="code-block-actions">
                <button class="icon-btn" data-copy-code title="Copy code">⧉</button>
              </div>
            </div>
            <pre><code>${escapeHtml(ex.code)}</code></pre>
          </div>
          <button class="btn btn-ghost btn-sm" data-run-example style="margin-top:12px;">▶ Run</button>
          <div class="output-block" data-output hidden>
            <div class="output-block-bar">Output</div>
            <pre>${escapeHtml(ex.output)}</pre>
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

  function renderExercises(topic) {
    const cards = topic.exercises.map((ex, i) => {
      const hintsHTML = ex.hints.map((h, hi) => `
        <div class="hint-item" data-hint-toggle>
          <span class="hint-label">Hint ${hi + 1}</span><span class="hint-prompt">(click to reveal)</span>
          <div class="hint-text">${h}</div>
        </div>
      `).join('');
      return `
      <div class="exercise-card">
        <div class="exercise-head">
          <div class="exercise-head-left">
            <span class="example-num">LEVEL ${ex.level}</span>
            <h4 style="margin:0; font-size:1rem;">${ex.title}</h4>
          </div>
          <span class="badge">Practice</span>
        </div>
        <div class="example-body">
          <p class="exercise-problem">${escapeHtml(ex.problem).replace(/\n/g, '<br>')}</p>
          <div class="hint-list">${hintsHTML}</div>
          <button class="btn btn-ghost btn-sm solution-toggle" data-solution-toggle>Reveal Solution</button>
          <div class="solution-panel" data-solution-panel>
            <div class="code-block"><pre><code>${escapeHtml(ex.solution)}</code></pre></div>
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

  function renderInterview(topic) {
    const items = topic.interview.map((qa, i) => `
      <div class="qa-item" data-qa-item>
        <button class="qa-question" data-qa-toggle style="width:100%; text-align:left; background:none; border:none;">
          <span>${i + 1}. ${qa.q}</span>
          <span class="qa-chevron">▾</span>
        </button>
        <div class="qa-answer"><p>${qa.a}</p></div>
      </div>`).join('');
    return `
    <div class="topic-section" id="sec-interview">
      <h2>Interview-Style Questions</h2>
      ${items}
    </div>`;
  }

  function renderRealWorld(topic) {
    const cards = topic.realWorld.map(rw => `
      <div class="card rw-card">
        <div class="rw-company">${rw.company}</div>
        <p>${rw.text}</p>
      </div>`).join('');
    return `
    <div class="topic-section" id="sec-realworld">
      <h2>Real-World Applications</h2>
      <div class="rw-grid">${cards}</div>
    </div>`;
  }

  function renderQuizSection(topic) {
    return `
    <div class="topic-section" id="sec-quiz">
      <h2>Quiz</h2>
      <p style="color:var(--text-2); margin-bottom:20px;">10 questions. Instant grading.</p>
      <div id="quiz-mount"></div>
    </div>`;
  }

  /* ---------------------------------------------------------------------
     QUIZ ENGINE
  --------------------------------------------------------------------- */
  function initQuiz(topic) {
    const mount = document.getElementById('quiz-mount');
    let current = 0;
    let score = 0;
    let answered = false;
    let dragState = [];

    function renderQuestion() {
      const q = topic.quiz[current];
      answered = false;

      if (q.type === 'drag-drop') {
        const shuffled = [...q.options].sort(() => Math.random() - 0.5);
        dragState = shuffled.map((label, idx) => ({ label, originalIndex: q.options.indexOf(label) }));
      }

      mount.innerHTML = `
        <div class="quiz-progress-row">
          <span class="text-mono" style="color:var(--text-2);">Question ${current + 1} / ${topic.quiz.length}</span>
          <div class="progress-bar-track" style="flex:1;"><div class="progress-bar-fill" style="width:${(current / topic.quiz.length) * 100}%"></div></div>
        </div>
        <div class="quiz-card glass">
          <div class="quiz-q-num">${q.type.toUpperCase().replace('-', ' ')}</div>
          <div class="quiz-question-text">${escapeHtml(q.q).replace(/\n/g, '<br>')}</div>
          <div id="quiz-options-mount"></div>
          <div class="quiz-feedback" id="quiz-feedback"></div>
          <div class="quiz-footer">
            <span class="text-mono" style="color:var(--text-2); font-size:0.85rem;">Score: ${score} / ${topic.quiz.length}</span>
            <button class="btn btn-primary btn-sm" id="quiz-next-btn" disabled>Next →</button>
          </div>
        </div>`;

      const optionsMount = document.getElementById('quiz-options-mount');

      if (q.type === 'drag-drop') {
        optionsMount.innerHTML = `
          <p style="font-size:0.85rem; color:var(--text-2); margin-bottom:10px;">Click items in the pool, in the correct order, to place them below.</p>
          <div class="quiz-dd-zone" id="dd-zone"></div>
          <div class="quiz-dd-pool" id="dd-pool">
            ${dragState.map((item, i) => `<button class="quiz-dd-chip" data-dd-index="${i}">${escapeHtml(item.label)}</button>`).join('')}
          </div>`;
        const placed = [];
        const zone = document.getElementById('dd-zone');
        const pool = document.getElementById('dd-pool');
        pool.querySelectorAll('[data-dd-index]').forEach(chip => {
          chip.addEventListener('click', () => {
            if (answered) return;
            const idx = Number(chip.dataset.ddIndex);
            placed.push(dragState[idx].originalIndex);
            const placedChip = document.createElement('span');
            placedChip.className = 'quiz-dd-chip';
            placedChip.style.cursor = 'default';
            placedChip.textContent = chip.textContent;
            zone.appendChild(placedChip);
            chip.remove();
            if (placed.length === dragState.length) {
              const correct = JSON.stringify(placed) === JSON.stringify(q.correct);
              showFeedback(correct);
            }
          });
        });
      } else {
        optionsMount.innerHTML = `
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option" data-opt-index="${i}">
                <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
                <span>${escapeHtml(opt)}</span>
              </button>`).join('')}
          </div>`;
        optionsMount.querySelectorAll('.quiz-option').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            const idx = Number(btn.dataset.optIndex);
            const correct = idx === q.correct;
            btn.classList.add(correct ? 'is-correct' : 'is-wrong');
            if (!correct) {
              optionsMount.querySelector(`[data-opt-index="${q.correct}"]`).classList.add('is-correct');
            }
            showFeedback(correct);
          });
        });
      }

      function showFeedback(correct) {
        answered = true;
        if (correct) score++;
        const fb = document.getElementById('quiz-feedback');
        fb.textContent = correct ? '✓ Correct!' : '✗ Not quite — the correct answer is highlighted.';
        fb.className = 'quiz-feedback show ' + (correct ? 'correct' : 'wrong');
        document.getElementById('quiz-next-btn').disabled = false;
        mount.querySelector('.quiz-footer span').textContent = `Score: ${score} / ${topic.quiz.length}`;
      }

      document.getElementById('quiz-next-btn').addEventListener('click', () => {
        current++;
        if (current < topic.quiz.length) {
          renderQuestion();
        } else {
          renderResult();
        }
      });
    }

    function renderResult() {
      window.CSFA.recordQuizScore(topic.id, score, topic.quiz.length);
      const pct = Math.round((score / topic.quiz.length) * 100);
      mount.innerHTML = `
        <div class="quiz-card glass quiz-result-screen">
          <div style="font-size:2.5rem; margin-bottom:14px;">${pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📘'}</div>
          <h3 class="text-h3">You scored ${score} / ${topic.quiz.length}</h3>
          <p style="color:var(--text-2); margin: 14px 0 26px;">${pct}% — ${pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Solid effort — review and try again anytime.' : 'Worth a second pass through the lesson above.'}</p>
          <button class="btn btn-primary btn-sm" id="quiz-retry-btn">Retry Quiz</button>
        </div>`;
      document.getElementById('quiz-retry-btn').addEventListener('click', () => {
        current = 0; score = 0;
        renderQuestion();
      });
    }

    renderQuestion();
  }

  /* ---------------------------------------------------------------------
     PAGE ASSEMBLY
  --------------------------------------------------------------------- */
  function renderComingSoon(topicId) {
    const mod = window.CSFA_getModuleForTopic ? window.CSFA_getModuleForTopic(topicId) : null;
    const title = window.CSFA_TOPIC_TITLES[topicId] || topicId || 'Topic';
    document.getElementById('topic-root').innerHTML = `
      <div class="topic-hero">
        <div class="container">
          <div class="breadcrumb">
            <a href="courses.html">Courses</a> <span>/</span> <span>${title}</span>
          </div>
          <h1 class="text-h1">${title}</h1>
          <p class="text-lead" style="margin-top:14px;">${mod ? mod.name : 'This module'} is on the roadmap and coming soon. Module 1 (Computer Fundamentals) is fully available now.</p>
          <div class="topic-meta-row">
            <a href="courses.html#module-1" class="btn btn-primary btn-sm">Explore Module 1 instead</a>
            <a href="roadmap.html" class="btn btn-ghost btn-sm">View full roadmap</a>
          </div>
        </div>
      </div>`;
    document.title = title + ' (Coming Soon) — CS Fundamentals Academy';
  }

  function renderTopicPage(topic) {
    document.title = topic.title + ' — CS Fundamentals Academy';
    const mod = window.CSFA_getModuleForTopic(topic.id);
    const isDone = window.CSFA.isLessonComplete(topic.id);

    document.getElementById('topic-root').innerHTML = `
      <div class="topic-hero">
        <div class="container">
          <div class="breadcrumb">
            <a href="courses.html">Courses</a> <span>/</span>
            <a href="courses.html#${mod ? mod.id : ''}">${mod ? mod.name : ''}</a> <span>/</span>
            <span>${topic.title}</span>
          </div>
          <h1 class="text-h1">${topic.title}</h1>
          <p class="text-lead" style="margin-top:14px; max-width:680px;">${topic.tagline}</p>
          <div class="topic-meta-row">
            <span class="badge">📖 ${topic.readMinutes} min read</span>
            <span class="badge">🧪 ${topic.examples.length} examples</span>
            <span class="badge">✏️ ${topic.exercises.length} exercises</span>
            <button class="btn ${isDone ? 'btn-ghost' : 'btn-primary'} btn-sm" id="mark-complete-btn">${isDone ? '✓ Lesson complete' : 'Mark lesson complete'}</button>
          </div>
        </div>
      </div>

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
          ${renderIntro(topic)}
          ${renderVisual(topic)}
          ${renderExamples(topic)}
          ${renderExercises(topic)}
          ${renderInterview(topic)}
          ${renderRealWorld(topic)}
          ${renderQuizSection(topic)}
        </div>
      </div>`;

    bindInteractions(topic);
    initQuiz(topic);
    initTocScrollSpy();
  }

  function bindInteractions(topic) {
    document.getElementById('mark-complete-btn').addEventListener('click', (e) => {
      const wasNew = window.CSFA.markLessonComplete(topic.id);
      e.target.textContent = '✓ Lesson complete';
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-ghost');
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
        const isNew = window.CSFA.markExerciseComplete(topicId, exIndex);
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

  function initTocScrollSpy() {
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

  function init() {
    const topicId = getTopicId();
    const topic = window.CSFA_TOPICS.find(t => t.id === topicId);
    if (topic) {
      renderTopicPage(topic);
    } else {
      renderComingSoon(topicId);
    }
  }

  document.addEventListener('csfa:layout-ready', init);
})();
