/* ==========================================================================
   TERMINAL SIMULATOR — a sandboxed fake filesystem + command interpreter
   ========================================================================== */

(function () {
  const body = document.getElementById('terminal-body');
  const input = document.getElementById('terminal-input');
  if (!body || !input) return;

  /* ---- Simulated filesystem ---- */
  let fs = makeInitialFs();
  let cwd = ['~'];
  let gitInitialized = false;
  let gitStaged = [];
  let gitCommits = [];
  let gitBranch = 'main';
  let npmInstalled = [];

  function makeInitialFs() {
    return {
      '~': { type: 'dir', children: {
        'projects': { type: 'dir', children: {} },
        'README.md': { type: 'file', content: '# My computer\n' },
      } },
    };
  }

  function resolvePath() {
    let node = fs['~'];
    for (let i = 1; i < cwd.length; i++) {
      node = node.children[cwd[i]];
    }
    return node;
  }

  function printLine(html, cls) {
    const div = document.createElement('div');
    div.className = 'term-line' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function printPromptEcho(cmd) {
    printLine(`<span class="term-prompt">➜</span> <span class="term-path">${cwd.join('/')}</span> ${escapeHtml(cmd)}`);
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  const HELP_TEXT = `Available commands:
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

  const COMMANDS = {
    help: () => HELP_TEXT,

    pwd: () => '/' + cwd.slice(1).join('/') + (cwd.length === 1 ? '~' : ''),

    ls: () => {
      const node = resolvePath();
      const names = Object.keys(node.children || {});
      if (!names.length) return '(empty directory)';
      return names.map(n => node.children[n].type === 'dir' ? n + '/' : n).join('   ');
    },

    cd: (args) => {
      const target = args[0];
      if (!target || target === '~') { cwd = ['~']; return ''; }
      if (target === '..') {
        if (cwd.length > 1) cwd.pop();
        return '';
      }
      const node = resolvePath();
      if (node.children && node.children[target] && node.children[target].type === 'dir') {
        cwd.push(target);
        return '';
      }
      return `cd: no such directory: ${target}`;
    },

    mkdir: (args) => {
      if (!args[0]) return 'mkdir: missing directory name';
      const node = resolvePath();
      node.children[args[0]] = { type: 'dir', children: {} };
      return '';
    },

    touch: (args) => {
      if (!args[0]) return 'touch: missing file name';
      const node = resolvePath();
      node.children[args[0]] = { type: 'file', content: '' };
      return '';
    },

    cat: (args) => {
      const node = resolvePath();
      const file = node.children && node.children[args[0]];
      if (!file) return `cat: ${args[0]}: No such file`;
      if (file.type === 'dir') return `cat: ${args[0]}: Is a directory`;
      return file.content || '(empty file)';
    },

    echo: (args) => args.join(' '),

    clear: () => { body.innerHTML = ''; return null; },

    git: (args) => {
      const sub = args[0];
      if (sub === 'init') { gitInitialized = true; return 'Initialized empty Git repository in ' + cwd.join('/') + '/.git/'; }
      if (!gitInitialized) return 'fatal: not a git repository (run "git init" first)';
      if (sub === 'add') {
        const file = args[1];
        if (!file) return 'Nothing specified, nothing added.';
        if (file === '.' || file === '-A') { gitStaged = ['(all changes)']; return ''; }
        gitStaged.push(file);
        return '';
      }
      if (sub === 'commit') {
        const mIndex = args.indexOf('-m');
        const message = mIndex !== -1 ? args.slice(mIndex + 1).join(' ').replace(/^"|"$/g, '') : '(no message)';
        if (!gitStaged.length) return 'nothing to commit, working tree clean';
        const hash = Math.random().toString(16).slice(2, 9);
        gitCommits.push({ hash, message });
        gitStaged = [];
        return `[${gitBranch} ${hash}] ${message}`;
      }
      if (sub === 'status') {
        return gitStaged.length
          ? `On branch ${gitBranch}\nChanges to be committed:\n  ${gitStaged.join('\n  ')}`
          : `On branch ${gitBranch}\nnothing to commit, working tree clean`;
      }
      if (sub === 'branch') {
        if (args[1]) { return `Created branch '${args[1]}' (simulated — not switched)`; }
        return '* ' + gitBranch;
      }
      if (sub === 'log') {
        if (!gitCommits.length) return 'fatal: your current branch does not have any commits yet';
        return gitCommits.map(c => `commit ${c.hash}\n    ${c.message}`).join('\n\n');
      }
      return `git: '${sub}' is not a recognized command in this simulation`;
    },

    npm: (args) => {
      const sub = args[0];
      if (sub === 'install' || sub === 'i') {
        const pkg = args[1];
        if (!pkg) return 'added 0 packages';
        npmInstalled.push(pkg);
        return `\nadded 1 package in ${(Math.random() * 1.5 + 0.3).toFixed(1)}s`;
      }
      if (sub === 'run') {
        const script = args[1];
        if (!script) return 'Usage: npm run <script>';
        return `\n> ${script}\n> node ${script}.js\n\n(simulated output — script "${script}" ran successfully)`;
      }
      return `npm: '${sub}' is not a recognized command in this simulation`;
    },
  };

  function runCommand(raw) {
    printPromptEcho(raw);
    const trimmed = raw.trim();
    if (!trimmed) return;

    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = parts[0];
    const args = parts.slice(1).map(a => a.replace(/^"|"$/g, ''));

    const handler = COMMANDS[cmd];
    if (!handler) {
      printLine(`command not found: ${escapeHtml(cmd)} <span style="opacity:0.6;">(try "help")</span>`, 'err');
      return;
    }
    const result = handler(args);
    if (result === null) return; // clear handled itself
    if (result) printLine(escapeHtml(result).replace(/\n/g, '<br>'));
  }

  function printWelcome() {
    printLine('CS Fundamentals Academy — Terminal Simulator', 'ok');
    printLine('Type <strong>help</strong> to see available commands. This is sandboxed — nothing here touches your real computer.');
  }

  printWelcome();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    }
  });

  document.getElementById('terminal-reset')?.addEventListener('click', () => {
    fs = makeInitialFs();
    cwd = ['~'];
    gitInitialized = false; gitStaged = []; gitCommits = []; npmInstalled = [];
    body.innerHTML = '';
    printWelcome();
  });

  body.addEventListener('click', () => input.focus());
})();
