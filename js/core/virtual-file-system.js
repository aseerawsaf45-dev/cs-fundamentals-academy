/* ==========================================================================
   VIRTUAL FILE SYSTEM
   A pure, DOM-free in-memory filesystem tree used by the terminal
   simulator. Knows nothing about rendering or commands beyond basic
   directory/file operations — TerminalEmulator drives it.
   ========================================================================== */

class VirtualFileSystem {
  constructor() {
    this.reset();
  }

  reset() {
    this.root = {
      '~': {
        type: 'dir',
        children: {
          projects: { type: 'dir', children: {} },
          'README.md': { type: 'file', content: '# My computer\n' },
        },
      },
    };
    this.cwd = ['~'];
  }

  get pathString() {
    return this.cwd.join('/');
  }

  /** Resolves the directory node the cwd currently points to. */
  currentNode() {
    let node = this.root['~'];
    for (let i = 1; i < this.cwd.length; i++) {
      node = node.children[this.cwd[i]];
    }
    return node;
  }

  list() {
    const node = this.currentNode();
    return Object.keys(node.children || {});
  }

  isDir(name) {
    const node = this.currentNode();
    return !!(node.children && node.children[name] && node.children[name].type === 'dir');
  }

  changeDir(target) {
    if (!target || target === '~') {
      this.cwd = ['~'];
      return { ok: true };
    }
    if (target === '..') {
      if (this.cwd.length > 1) this.cwd.pop();
      return { ok: true };
    }
    if (this.isDir(target)) {
      this.cwd.push(target);
      return { ok: true };
    }
    return { ok: false, error: `cd: no such directory: ${target}` };
  }

  makeDir(name) {
    if (!name) return { ok: false, error: 'mkdir: missing directory name' };
    this.currentNode().children[name] = { type: 'dir', children: {} };
    return { ok: true };
  }

  touch(name) {
    if (!name) return { ok: false, error: 'touch: missing file name' };
    this.currentNode().children[name] = { type: 'file', content: '' };
    return { ok: true };
  }

  readFile(name) {
    const node = this.currentNode();
    const file = node.children && node.children[name];
    if (!file) return { ok: false, error: `cat: ${name}: No such file` };
    if (file.type === 'dir') return { ok: false, error: `cat: ${name}: Is a directory` };
    return { ok: true, content: file.content || '(empty file)' };
  }
}
