/* ==========================================================================
   TERMINAL EMULATOR
   Drives a VirtualFileSystem plus simulated git/npm state, dispatches
   typed commands to handler methods, and renders output into the
   terminal DOM. Replaces the old terminal.js IIFE.
   ========================================================================== */

class TerminalEmulator {
  static HELP_TEXT = `Available commands:
  ls              list files in current directory
  cd &lt;dir&gt;        change directory (".." to go up)
  pwd             print working directory
  mkdir &lt;name&gt;    create a directory
  touch &lt;name&gt;    create an empty file
  cat &lt;name&gt;      print a file's contents
  echo &lt;text&gt;     print text
  clear           clear the terminal
  git init / add &lt;file&gt; / commit -m "msg" / status / branch
  npm install &lt;pkg&gt; / npm run &lt;script&gt;
  help            show this message`;

  constructor(bodyEl, inputEl) {
    this.body = bodyEl;
    this.input = inputEl;
    this.fs = new VirtualFileSystem();

    this._resetGitAndNpmState();

    this.commands = {
      help: () => TerminalEmulator.HELP_TEXT,
      pwd: () => this._pwd(),
      ls: () => this._ls(),
      cd: (args) => this._cd(args),
      mkdir: (args) => this._mkdir(args),
      touch: (args) => this._touch(args),
      cat: (args) => this._cat(args),
      echo: (args) => args.join(' '),
      clear: () => { this.body.innerHTML = ''; return null; },
      git: (args) => this._git(args),
      npm: (args) => this._npm(args),
    };
  }

  init() {
    if (!this.body || !this.input) return;
    this._printWelcome();

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = this.input.value;
        this.input.value = '';
        this.run(val);
      }
    });

    document.getElementById('terminal-reset')?.addEventListener('click', () => this.resetAll());
    this.body.addEventListener('click', () => this.input.focus());
  }

  /* ---- public command execution ---- */
  run(raw) {
    this._printPromptEcho(raw);
    const trimmed = raw.trim();
    if (!trimmed) return;

    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = parts[0];
    const args = parts.slice(1).map(a => a.replace(/^"|"$/g, ''));

    const handler = this.commands[cmd];
    if (!handler) {
      this._printLine(`command not found: ${this._escapeHtml(cmd)} <span style="opacity:0.6;">(try "help")</span>`, 'err');
      return;
    }

    const result = handler(args);
    if (result === null) return; // e.g. clear handled the DOM itself
    if (result) this._printLine(this._escapeHtml(result).replace(/\n/g, '<br>'));
  }

  resetAll() {
    this.fs.reset();
    this._resetGitAndNpmState();
    this.body.innerHTML = '';
    this._printWelcome();
  }

  /* ---- filesystem-backed commands ---- */
  _pwd() {
    return '/' + this.fs.cwd.slice(1).join('/') + (this.fs.cwd.length === 1 ? '~' : '');
  }

  _ls() {
    const names = this.fs.list();
    if (!names.length) return '(empty directory)';
    return names.map(n => this.fs.isDir(n) ? n + '/' : n).join('   ');
  }

  _cd(args) {
    const result = this.fs.changeDir(args[0]);
    return result.ok ? '' : result.error;
  }

  _mkdir(args) {
    const result = this.fs.makeDir(args[0]);
    return result.ok ? '' : result.error;
  }

  _touch(args) {
    const result = this.fs.touch(args[0]);
    return result.ok ? '' : result.error;
  }

  _cat(args) {
    const result = this.fs.readFile(args[0]);
    return result.ok ? result.content : result.error;
  }

  /* ---- simulated git ---- */
  _resetGitAndNpmState() {
    this.git = { initialized: false, staged: [], commits: [], branch: 'main' };
    this.npmInstalled = [];
  }

  _git(args) {
    const sub = args[0];
    const g = this.git;

    if (sub === 'init') {
      g.initialized = true;
      return 'Initialized empty Git repository in ' + this.fs.pathString + '/.git/';
    }
    if (!g.initialized) return 'fatal: not a git repository (run "git init" first)';

    if (sub === 'add') {
      const file = args[1];
      if (!file) return 'Nothing specified, nothing added.';
      if (file === '.' || file === '-A') { g.staged = ['(all changes)']; return ''; }
      g.staged.push(file);
      return '';
    }

    if (sub === 'commit') {
      const mIndex = args.indexOf('-m');
      const message = mIndex !== -1 ? args.slice(mIndex + 1).join(' ').replace(/^"|"$/g, '') : '(no message)';
      if (!g.staged.length) return 'nothing to commit, working tree clean';
      const hash = Math.random().toString(16).slice(2, 9);
      g.commits.push({ hash, message });
      g.staged = [];
      return `[${g.branch} ${hash}] ${message}`;
    }

    if (sub === 'status') {
      return g.staged.length
        ? `On branch ${g.branch}\nChanges to be committed:\n  ${g.staged.join('\n  ')}`
        : `On branch ${g.branch}\nnothing to commit, working tree clean`;
    }

    if (sub === 'branch') {
      if (args[1]) return `Created branch '${args[1]}' (simulated — not switched)`;
      return '* ' + g.branch;
    }

    if (sub === 'log') {
      if (!g.commits.length) return 'fatal: your current branch does not have any commits yet';
      return g.commits.map(c => `commit ${c.hash}\n    ${c.message}`).join('\n\n');
    }

    return `git: '${sub}' is not a recognized command in this simulation`;
  }

  /* ---- simulated npm ---- */
  _npm(args) {
    const sub = args[0];

    if (sub === 'install' || sub === 'i') {
      const pkg = args[1];
      if (!pkg) return 'added 0 packages';
      this.npmInstalled.push(pkg);
      return `\nadded 1 package in ${(Math.random() * 1.5 + 0.3).toFixed(1)}s`;
    }

    if (sub === 'run') {
      const script = args[1];
      if (!script) return 'Usage: npm run <script>';
      return `\n> ${script}\n> node ${script}.js\n\n(simulated output — script "${script}" ran successfully)`;
    }

    return `npm: '${sub}' is not a recognized command in this simulation`;
  }

  /* ---- rendering ---- */
  _printLine(html, cls) {
    const div = document.createElement('div');
    div.className = 'term-line' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    this.body.appendChild(div);
    this.body.scrollTop = this.body.scrollHeight;
  }

  _printPromptEcho(cmd) {
    this._printLine(`<span class="term-prompt">➜</span> <span class="term-path">${this.fs.pathString}</span> ${this._escapeHtml(cmd)}`);
  }

  _printWelcome() {
    this._printLine('CS Fundamentals Academy — Terminal Simulator', 'ok');
    this._printLine('Type <strong>help</strong> to see available commands. This is sandboxed — nothing here touches your real computer.');
  }

  _escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('terminal-body');
  const input = document.getElementById('terminal-input');
  if (!body || !input) return; // not on a page with a terminal
  window.CSFA_TERMINAL = new TerminalEmulator(body, input);
  window.CSFA_TERMINAL.init();
});
