/* ==========================================================================
   CODE PLAYGROUND
   A live HTML/CSS/JS editor + iframe preview + captured console output.
   Replaces the old playground.js IIFE with a class owning its own DOM
   references and state (active tab, last-built document), so a page
   could in principle host more than one instance without global clashes.
   ========================================================================== */

class CodePlayground {
  static DEFAULTS = {
    html: `<h1>Hello, Playground!</h1>\n<p>Edit the HTML, CSS, and JS tabs, then hit Run.</p>\n<button id="btn">Click me</button>`,
    css: `body {\n  font-family: sans-serif;\n  background: #0d0d0d;\n  color: #fff;\n  padding: 40px;\n}\nbutton {\n  background: #8B5CF6;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n}`,
    js: `document.getElementById("btn").addEventListener("click", () => {\n  console.log("Button clicked!");\n  document.querySelector("h1").textContent = "You clicked it!";\n});`,
  };

  static CONSOLE_BRIDGE_SCRIPT = `
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

  constructor(toast) {
    this.toast = toast; // ToastService instance (optional)

    this.editors = {
      html: document.getElementById('editor-html'),
      css: document.getElementById('editor-css'),
      js: document.getElementById('editor-js'),
    };
    this.frame = document.getElementById('preview-frame');
    this.consoleOutput = document.getElementById('console-output');
    this.statusEl = document.getElementById('run-status');

    this._onMessage = this._onMessage.bind(this);
  }

  init() {
    this.loadDefaults();
    this._bindTabs();
    this._bindToolbar();
    this._bindViewToggle();
    window.addEventListener('message', this._onMessage);
    setTimeout(() => this.run(), 200);
  }

  loadDefaults() {
    this.editors.html.value = CodePlayground.DEFAULTS.html;
    this.editors.css.value = CodePlayground.DEFAULTS.css;
    this.editors.js.value = CodePlayground.DEFAULTS.js;
  }

  get activeTabKey() {
    return document.querySelector('.pg-tab.is-active[data-tab]').dataset.tab;
  }

  buildDocument() {
    const { html, css, js } = this.editors;
    return `<!DOCTYPE html><html><head><style>${css.value}</style></head>
      <body>${html.value}${CodePlayground.CONSOLE_BRIDGE_SCRIPT}<script>${js.value}<\/script></body></html>`;
  }

  run() {
    this.consoleOutput.innerHTML = '';
    this.frame.srcdoc = this.buildDocument();
    this.statusEl.textContent = 'Running…';
    setTimeout(() => (this.statusEl.textContent = 'Ready'), 500);
  }

  reset() {
    if (!confirm('Reset all code back to the starting example?')) return;
    this.loadDefaults();
    this.run();
  }

  formatActiveTab() {
    const el = this.editors[this.activeTabKey];
    let depth = 0;
    const formatted = el.value.split('\n').map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (/^[)\}\]]/.test(trimmed)) depth = Math.max(0, depth - 1);
      const out = '  '.repeat(depth) + trimmed;
      if (/[(\{\[]\s*$/.test(trimmed)) depth += 1;
      return out;
    });
    el.value = formatted.join('\n');
    this.toast?.show('Code formatted');
  }

  copyActiveTab() {
    navigator.clipboard?.writeText(this.editors[this.activeTabKey].value).then(() => {
      this.toast?.show('Copied to clipboard');
    });
  }

  download() {
    const blob = new Blob([this.buildDocument()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playground.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  showPreview() {
    this.frame.hidden = false;
    this.consoleOutput.hidden = true;
    document.getElementById('show-preview').style.color = 'var(--text-0)';
    document.getElementById('show-console').style.color = 'var(--text-2)';
  }

  showConsole() {
    this.frame.hidden = true;
    this.consoleOutput.hidden = false;
    document.getElementById('show-console').style.color = 'var(--text-0)';
    document.getElementById('show-preview').style.color = 'var(--text-2)';
  }

  /* ---- private wiring ---- */
  _bindTabs() {
    document.querySelectorAll('.pg-tab[data-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pg-tab[data-tab]').forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        Object.entries(this.editors).forEach(([key, el]) => { el.hidden = key !== tab.dataset.tab; });
      });
    });
  }

  _bindToolbar() {
    document.getElementById('run-btn').addEventListener('click', () => this.run());
    document.getElementById('reset-btn').addEventListener('click', () => this.reset());
    document.getElementById('format-btn').addEventListener('click', () => this.formatActiveTab());
    document.getElementById('copy-btn').addEventListener('click', () => this.copyActiveTab());
    document.getElementById('download-btn').addEventListener('click', () => this.download());
  }

  _bindViewToggle() {
    document.getElementById('show-preview').addEventListener('click', () => this.showPreview());
    document.getElementById('show-console').addEventListener('click', () => this.showConsole());
  }

  _onMessage(e) {
    if (!e.data || !e.data.__pgConsole) return;
    const line = document.createElement('div');
    line.className = e.data.type === 'error' ? 'err' : 'log';
    line.textContent = (e.data.type === 'error' ? '✗ ' : '› ') + e.data.args.join(' ');
    this.consoleOutput.appendChild(line);
  }
}

document.addEventListener('csfa:layout-ready', () => {
  const toast = window.CSFA_APP ? window.CSFA_APP.toast : null;
  window.CSFA_PLAYGROUND = new CodePlayground(toast);
  window.CSFA_PLAYGROUND.init();
});
