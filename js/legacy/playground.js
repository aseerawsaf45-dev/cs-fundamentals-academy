/* ==========================================================================
   PLAYGROUND ENGINE — HTML/CSS/JS live editor + preview + console
   ========================================================================== */

(function () {
  const DEFAULTS = {
    html: `<h1>Hello, Playground!</h1>\n<p>Edit the HTML, CSS, and JS tabs, then hit Run.</p>\n<button id="btn">Click me</button>`,
    css: `body {\n  font-family: sans-serif;\n  background: #0d0d0d;\n  color: #fff;\n  padding: 40px;\n}\nbutton {\n  background: #8B5CF6;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n}`,
    js: `document.getElementById("btn").addEventListener("click", () => {\n  console.log("Button clicked!");\n  document.querySelector("h1").textContent = "You clicked it!";\n});`,
  };

  const editors = {
    html: document.getElementById('editor-html'),
    css: document.getElementById('editor-css'),
    js: document.getElementById('editor-js'),
  };

  function loadDefaults() {
    editors.html.value = DEFAULTS.html;
    editors.css.value = DEFAULTS.css;
    editors.js.value = DEFAULTS.js;
  }
  loadDefaults();

  /* ---- Tabs ---- */
  document.querySelectorAll('.pg-tab[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pg-tab[data-tab]').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      Object.entries(editors).forEach(([key, el]) => { el.hidden = key !== tab.dataset.tab; });
    });
  });

  /* ---- Console capture inside iframe ---- */
  const consoleScript = `
    <script>
      (function() {
        const send = (type, args) => {
          parent.postMessage({ __pgConsole: true, type, args: args.map(a => {
            try { return typeof a === 'object' ? JSON.stringify(a) : String(a); }
            catch(e) { return String(a); }
          }) }, '*');
        };
        ['log','warn','error','info'].forEach(method => {
          const original = console[method];
          console[method] = function(...args) {
            send(method === 'error' ? 'error' : 'log', args);
            original.apply(console, args);
          };
        });
        window.addEventListener('error', (e) => send('error', [e.message]));
      })();
    </script>`;

  function buildDocument() {
    return `<!DOCTYPE html><html><head><style>${editors.css.value}</style></head>
      <body>${editors.html.value}${consoleScript}<script>${editors.js.value}<\/script></body></html>`;
  }

  const frame = document.getElementById('preview-frame');
  const consoleOutput = document.getElementById('console-output');
  const statusEl = document.getElementById('run-status');

  function runCode() {
    consoleOutput.innerHTML = '';
    frame.srcdoc = buildDocument();
    statusEl.textContent = 'Running…';
    setTimeout(() => (statusEl.textContent = 'Ready'), 500);
  }

  window.addEventListener('message', (e) => {
    if (!e.data || !e.data.__pgConsole) return;
    const line = document.createElement('div');
    line.className = e.data.type === 'error' ? 'err' : 'log';
    line.textContent = (e.data.type === 'error' ? '✗ ' : '› ') + e.data.args.join(' ');
    consoleOutput.appendChild(line);
  });

  document.getElementById('run-btn').addEventListener('click', runCode);

  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset all code back to the starting example?')) {
      loadDefaults();
      runCode();
    }
  });

  document.getElementById('format-btn').addEventListener('click', () => {
    // Lightweight formatter: normalize indentation of the active tab
    const active = document.querySelector('.pg-tab.is-active[data-tab]').dataset.tab;
    const el = editors[active];
    const lines = el.value.split('\n');
    let depth = 0;
    const formatted = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (/^[\)\}\]]/.test(trimmed)) depth = Math.max(0, depth - 1);
      const out = '  '.repeat(depth) + trimmed;
      if (/[\(\{\[]\s*$/.test(trimmed)) depth += 1;
      return out;
    });
    el.value = formatted.join('\n');
    window.CSFA_showToast && window.CSFA_showToast('Code formatted');
  });

  document.getElementById('copy-btn').addEventListener('click', () => {
    const active = document.querySelector('.pg-tab.is-active[data-tab]').dataset.tab;
    navigator.clipboard?.writeText(editors[active].value).then(() => {
      window.CSFA_showToast && window.CSFA_showToast('Copied to clipboard');
    });
  });

  document.getElementById('download-btn').addEventListener('click', () => {
    const blob = new Blob([buildDocument()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playground.html';
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('show-preview').addEventListener('click', () => {
    frame.hidden = false; consoleOutput.hidden = true;
    document.getElementById('show-preview').style.color = 'var(--text-0)';
    document.getElementById('show-console').style.color = 'var(--text-2)';
  });
  document.getElementById('show-console').addEventListener('click', () => {
    frame.hidden = true; consoleOutput.hidden = false;
    document.getElementById('show-console').style.color = 'var(--text-0)';
    document.getElementById('show-preview').style.color = 'var(--text-2)';
  });

  // Auto-run on load
  document.addEventListener('csfa:layout-ready', () => setTimeout(runCode, 200));
})();
