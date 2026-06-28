/* ==========================================================================
   TOPIC CONTENT DATA — Module 6: Git and GitHub
   Includes: Repositories, Commits, Branches, Merging, Pull Requests
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) {
  window.CSFA_RAW_TOPICS = [];
}

// 1. Repositories
window.CSFA_RAW_TOPICS.push({
  id: 'repositories',
  module: 6,
  title: 'Repositories',
  tagline: 'Understanding version control and the hidden .git directory structure.',
  readMinutes: 6,
  intro: {
    whatItIs: "A Git repository (repo) is a virtual storage space for your project. It contains all project files, directories, and critically, the complete history of every change made inside the hidden '.git' directory.",
    whyItMatters: "Version control keeps you from losing your code. It acts as a time machine for your codebase, allowing you or your AI agent to roll back to any past state if something breaks.",
    whereUsed: "Used in every professional engineering project on Earth, hosting repositories on platforms like GitHub, GitLab, and Bitbucket.",
    commonMistakes: "Accidentally initializing a Git repository in a parent directory (like your User or Desktop folder) instead of the specific project directory, tracking unrelated files."
  },
  visual: {
    caption: "The layout of a Git repository: Working Tree vs Index vs Object Store",
    type: "git-commits"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Git initialization simulation",
      explanation: "Running git init creates the .git tracking directory in the root of your project.",
      code: "const gitState = { initialized: false };\nfunction init() {\n  gitState.initialized = true;\n  return 'Initialized empty Git repository';\n}\nconsole.log(init());",
      language: "javascript", output: "Initialized empty Git repository"
    },
    {
      difficulty: "easy", title: "Inspecting status",
      explanation: "The status tells you if files are tracked, untracked, staged, or modified.",
      code: "const status = {\n  untracked: ['index.html', 'styles.css'],\n  staged: []\n};\nconsole.log('Untracked count:', status.untracked.length);",
      language: "javascript", output: "Untracked count: 2"
    },
    {
      difficulty: "medium", title: "Simulating .gitignore mapping",
      explanation: "The .gitignore file tells Git which files to intentionally ignore (like node_modules or env secrets).",
      code: "const ignorePatterns = ['node_modules/', '.env'];\nfunction shouldIgnore(file) {\n  return ignorePatterns.some(p => file.includes(p) || file.startsWith(p));\n}\nconsole.log('Ignore node_modules:', shouldIgnore('node_modules/lodash'));\nconsole.log('Ignore script.js:', shouldIgnore('script.js'));",
      language: "javascript", output: "Ignore node_modules: true\nIgnore script.js: false"
    },
    {
      difficulty: "medium-plus", title: "Tracking local configs",
      explanation: "Git projects use local configurations to identify authors of commits.",
      code: "const config = { 'user.name': '', 'user.email': '' };\nfunction setConfig(key, val) {\n  config[key] = val;\n}\nsetConfig('user.name', 'Ada');\nconsole.log('Config author:', config['user.name']);",
      language: "javascript", output: "Config author: Ada"
    },
    {
      difficulty: "hard", title: "Simulated object hash calculator",
      explanation: "Git identifies objects (blobs, trees, commits) by calculating SHA-1 hashes of their contents.",
      code: "function computeGitHash(content) {\n  // Git prefixes content with type and length before hashing\n  const header = 'blob ' + content.length + '\\0';\n  const full = header + content;\n  let hash = 0;\n  for (let i = 0; i < full.length; i++) {\n    hash = (hash << 5) - hash + full.charCodeAt(i);\n    hash |= 0;\n  }\n  return 'git-' + Math.abs(hash).toString(16);\n}\nconsole.log(computeGitHash('Hello World'));",
      language: "javascript", output: "git-a309e4"
    },
    {
      difficulty: "real-world", title: "Detecting nested .git repository warning",
      explanation: "Real developer scripts check for subdirectories with nested .git folders to avoid detached submodule issues.",
      code: "const fsMock = { 'project/.git': {}, 'project/client/.git': {} };\nconst paths = Object.keys(fsMock);\nconst subRepos = paths.filter(p => p.endsWith('.git') && p.split('/').length > 2);\nconsole.log('Detached repositories detected:', subRepos.length);",
      language: "javascript", output: "Detached repositories detected: 1"
    }
  ],
  exercises: [
    {
      level: 1, title: "Initialize repository command",
      problem: "What command initializes an empty Git repository in the current folder?",
      hints: ["The command is two words.", "The first word is 'git'."],
      solution: "git init"
    },
    {
      level: 2, title: "Ignore file creation",
      problem: "What is the exact name of the file used to exclude files from Git tracking?",
      hints: ["It starts with a dot.", "The word contains 'ignore'."],
      solution: ".gitignore"
    },
    {
      level: 3, title: "Configure username command",
      problem: "Write the git command to configure your global Git username to 'Grace'.",
      hints: ["Use git config --global.", "Specify user.name and value 'Grace'."],
      solution: "git config --global user.name \"Grace\""
    },
    {
      level: 4, title: "Identify object type",
      problem: "Name the Git object type used to store file content, excluding metadata.",
      hints: ["It's a four-letter word starting with 'b'.", "It represents a Binary Large Object."],
      solution: "blob"
    },
    {
      level: 5, title: "Explain .git directory safety",
      problem: "What happens to a project's Git commit history if you delete the '.git' folder?",
      hints: ["All history lives inside that hidden folder."],
      solution: "Deletions of the '.git' directory wipe out the entire version control history, branches, and staged commits, reverting the folder to a regular un-versioned directory."
    },
    {
      level: 6, title: "Real-world: Detect un-ignored secrets",
      problem: "Write a function scanFiles(files) that checks if files list contains '.env' and warns if it's not excluded by a mock ignore list ['.env'].",
      hints: ["Check if '.env' is in the files array.", "If present, check if it's in the ignores array. If not, trigger a warning."],
      solution: "function scanFiles(files, ignores) {\n  if (files.includes('.env') && !ignores.includes('.env')) {\n    return 'Warning: Security risk! Private env secrets are exposed to Git tracking.';\n  }\n  return 'Secure';\n}"
    }
  ],
  interview: [
    {
      q: "What physically happens when you run 'git init'?",
      a: "Git creates a hidden directory named '.git' in your current folder. This directory contains files and subdirectories that hold your configuration, hooks, refs (branches and tags), the index (staging area), and the object database storing all snapshot commits."
    },
    {
      q: "What is the purpose of the .gitignore file, and why is it important?",
      a: "The .gitignore file specifies patterns of files and directories that Git should ignore. It keeps bloated files (node_modules), compiled assets (dist), and sensitive files (.env api keys) out of version control, preventing security leaks and repo bloat."
    },
    {
      q: "What are the three main areas/stages of a Git project?",
      a: "The Working Directory (where you edit files), the Staging Area (index, where you select and group changes to prepare for commit), and the Git Directory (repository repository containing the database of committed snapshots)."
    },
    {
      q: "Why is Git called a 'distributed' version control system?",
      a: "Unlike centralized VCS where developer checkouts link directly to one central server repository database, every Git clone is a full backup of the repository, containing the entire commit history database locally, allowing developers to work offline."
    },
    {
      q: "What is a Git 'blob' and how does it differ from a 'tree'?",
      a: "A blob (binary large object) stores only the compressed file contents, without naming or folder metadata. A tree object represents a directory directory, storing references to blobs (files) and other nested trees alongside their filenames and permissions."
    }
  ],
  realWorld: [
    { company: "GitHub", text: "Hosts over 100 million git repositories, providing web tools for pull requests, issues, and continuous integration." },
    { company: "Stripe", text: "Manages monorepos using specialized Git filters to isolate sensitive financial codebases while letting development teams share utilities." },
    { company: "Google", text: "Combines Git with custom client tools (gerrit) to orchestrate massive code reviews across millions of commits daily." },
    { company: "Amazon", text: "AWS CodeCommit provides managed git repository host servers integrated with secure identity access access controls." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which folder contains the complete history of a Git project?', options: ['/node_modules', '/.git', '/dist', '/src'], correct: 1 },
    { type: 'true-false', q: 'Deleting the files in your project directory also deletes the commit history inside .git.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which file dictates which files Git should skip tracking?', options: ['package.json', '.gitconfig', '.gitignore', 'README.md'], correct: 2 },
    { type: 'code-output', q: "const hasGit = (dir) => dir.includes('.git');\nconsole.log(hasGit('project-folder/.git'));", options: ['true', 'false', 'Error', 'undefined'], correct: 0 },
    { type: 'mcq', q: 'What type of version control system is Git?', options: ['Centralized', 'Distributed', 'Sequential', 'Indexed'], correct: 1 },
    { type: 'true-false', q: 'A git blob object stores the name of the file alongside its file content.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'How do you check your current git configuration settings?', options: ['git status', 'git config --list', 'git init', 'git log'], correct: 1 },
    { type: 'drag-drop', q: 'Order the areas data moves through when staging: [Working directory, Staging area, Repository database]', options: ['Working directory', 'Staging area', 'Repository database'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What is the default name of the initial branch created by git init in modern setups?', options: ['master', 'main', 'trunk', 'root'], correct: 1 },
    { type: 'code-output', q: "const config = { 'user.name': 'Grace' };\nconsole.log(config['user.email']);", options: ['Grace', 'undefined', 'null', 'Error'], correct: 1 }
  ]
});

// 2. Commits
window.CSFA_RAW_TOPICS.push({
  id: 'commits',
  module: 6,
  title: 'Commits',
  tagline: 'Capturing snapshots of your project timeline using git add and git commit.',
  readMinutes: 7,
  intro: {
    whatItIs: "A commit is a snapshot of your project's files at a specific point in time. To make a commit, you first stage modifications using 'git add' to tell Git which changes to include, and then run 'git commit' to record the snapshot with a descriptive message.",
    whyItMatters: "Commits are the checkpoints of your project. If you break your application, commits let you analyze what changed, compare versions, and safely roll back to a functional snapshot.",
    whereUsed: "Commits form the atomic history of every Git-tracked project, showing who changed what line of code and why.",
    commonMistakes: "Making giant commits containing unrelated changes, or writing vague commit messages like 'fix' or 'stuff' that make history hard to search."
  },
  visual: {
    caption: "A timeline of Git commits linking to parent checkpoints",
    type: "git-commits"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Staging a file",
      explanation: "git add places a file into the staging area (index) preparing it for commit.",
      code: "const stage = [];\nfunction gitAdd(file) {\n  stage.push(file);\n  return 'Staged ' + file;\n}\nconsole.log(gitAdd('index.html'));",
      language: "javascript", output: "Staged index.html"
    },
    {
      difficulty: "easy", title: "Creating a commit snapshot",
      explanation: "git commit saves the staged files, clears the staging area, and outputs a unique commit hash.",
      code: "const repo = { commits: [], staged: ['index.html'] };\nfunction commit(msg) {\n  if (!repo.staged.length) return 'Nothing to commit';\n  const hash = Math.random().toString(16).slice(2, 8);\n  repo.commits.push({ hash, msg, files: [...repo.staged] });\n  repo.staged = [];\n  return 'Commit ' + hash + ' created';\n}\nconsole.log(commit('feat: add index page'));",
      language: "javascript", output: "Commit " // starts with Commit
    },
    {
      difficulty: "medium", title: "Inspecting commit log",
      explanation: "git log lists all commits in the repository in reverse chronological order.",
      code: "const commits = [\n  { hash: 'a12b3c', msg: 'first commit' },\n  { hash: 'd45e6f', msg: 'add css styles' }\n];\ncommits.reverse().forEach(c => console.log(c.hash, '-', c.msg));",
      language: "javascript", output: "d45e6f - add css styles\na12b3c - first commit"
    },
    {
      difficulty: "medium-plus", title: "Amend the last commit",
      explanation: "git commit --amend overrides the last commit, replacing it with a new snapshot and message.",
      code: "let lastCommit = { hash: 'a1b2c3', msg: 'fix typo' };\nfunction amend(newMsg) {\n  lastCommit.msg = newMsg;\n  lastCommit.hash = 'new-' + lastCommit.hash;\n}\namend('fix: update styling rules');\nconsole.log(lastCommit.hash, lastCommit.msg);",
      language: "javascript", output: "new-a1b2c3 fix: update styling rules"
    },
    {
      difficulty: "hard", title: "Unstaging files with restore",
      explanation: "git restore --staged takes a file out of the staging area, leaving your local changes intact.",
      code: "const state = { staged: ['index.html', 'secrets.json'] };\nfunction restoreStaged(file) {\n  state.staged = state.staged.filter(f => f !== file);\n}\nrestoreStaged('secrets.json');\nconsole.log('Staged files left:', state.staged.join(', '));",
      language: "javascript", output: "Staged files left: index.html"
    },
    {
      difficulty: "real-world", title: "Pre-commit lint validator hook",
      explanation: "Real companies run hooks before commits to prevent pushing syntax errors to the repo.",
      code: "function preCommitCheck(code) {\n  if (code.includes('debugger') || code.includes('console.log')) {\n    return 'Block: clean up debugging statements';\n  }\n  return 'Pass';\n}\nconsole.log(preCommitCheck('const a = 1; debugger;'));",
      language: "javascript", output: "Block: clean up debugging statements"
    }
  ],
  exercises: [
    {
      level: 1, title: "Stage all files command",
      problem: "Write the command to stage all modified and untracked files in the current folder.",
      hints: ["Use git add.", "The wild-card indicator is a single dot."],
      solution: "git add ."
    },
    {
      level: 2, title: "Create commit message",
      problem: "Write the command to commit staged changes with the message 'docs: add readme'.",
      hints: ["Use git commit.", "Pass the message using the -m flag in quotes."],
      solution: "git commit -m \"docs: add readme\""
    },
    {
      level: 3, title: "View history command",
      problem: "Write the git command used to view the list of past commits.",
      hints: ["It's a three-letter command starting with 'l'."],
      solution: "git log"
    },
    {
      level: 4, title: "Unstage a specific file",
      problem: "Write the command to remove 'config.json' from the staging area while keeping its local changes.",
      hints: ["Use git restore --staged <file>."],
      solution: "git restore --staged config.json"
    },
    {
      level: 5, title: "Amend commit command",
      problem: "Write the command to change the message of the most recent commit to 'feat: layout update'.",
      hints: ["Use git commit --amend.", "Pass the -m flag with the new message."],
      solution: "git commit --amend -m \"feat: layout update\""
    },
    {
      level: 6, title: "Real-world: Identify parent hash relationship",
      problem: "In Git, every commit (except the first) references its parent commit. Write a function walkHistory(commit, commitsMap) that prints the commit messages traveling up parent references to the initial commit.",
      hints: ["Each commit has a parent property matching another commit's hash.", "Loop or recurse until parent is null."],
      solution: "function walkHistory(commit, commitsMap) {\n  let curr = commit;\n  while (curr) {\n    console.log(curr.msg);\n    curr = curr.parent ? commitsMap.get(curr.parent) : null;\n  }\n}"
    }
  ],
  interview: [
    {
      q: "What is the difference between staging a file and committing it?",
      a: "Staging a file (git add) places the modifications into the index/staging area, marking it to be included in the next snapshot. Committing (git commit) takes all staged changes, creates a permanent snapshot object in the .git database, assign it a SHA-1 hash, and updates the branch head pointers."
    },
    {
      q: "How does Git calculate commit hashes?",
      a: "A commit hash is a cryptographic SHA-1 hash computed from the commit's data: the snapshot directory tree hash, parent commit hashes, the author name/email, the committer name/email, date timestamps, and the commit message. Even a tiny change in these fields yields a completely different hash."
    },
    {
      q: "What does 'git commit --amend' do under the hood?",
      a: "It does not modify the old commit object (since commits are immutable). Instead, it creates a brand new commit object incorporating the new staged files and commit details, updating the branch head pointer to reference this new commit and leaving the old one eligible for garbage collection (reflog)."
    },
    {
      q: "Explain what 'git status' tells you.",
      a: "git status analyzes your current project state, identifying files in three categories: untracked files (never staged), modified files (changed in working directory but not yet staged), and staged changes (added to index, ready for the next commit)."
    },
    {
      q: "What are Git hooks, and how are they used in team workflows?",
      a: "Git hooks are scripts located in '.git/hooks' that execute automatically before or after Git actions (like pre-commit, pre-push). Teams use them to automate checks—such as running linter tests, checking format guidelines, or verifying ticket IDs in commit messages before allowing commits to be created."
    }
  ],
  realWorld: [
    { company: "OpenAI", text: "Enforces conventional commits syntax (e.g. feat:, fix:) using pre-commit hooks to automate semantic package version updates." },
    { company: "Netflix", text: "Tracks performance metrics by linking telemetry graphs to specific Git commit hashes deployed on production servers." },
    { company: "Stripe", text: "Leverages atomic commits to ensure changes affecting database migrations and code modules roll out together safely." },
    { company: "Google", text: "Gerrit review pipeline structures feedback inline per commit hash, requiring amendments to resolve feedback before merging." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which command moves changes from your Working Directory into the Staging Area?', options: ['git commit', 'git status', 'git add', 'git init'], correct: 2 },
    { type: 'true-false', q: 'Staged files cannot be unstaged once git add is run.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which flag specifies the message directly inside the git commit command?', options: ['-message', '-msg', '-m', '-t'], correct: 2 },
    { type: 'code-output', q: "const commit = { parent: 'a12b', message: 'test' };\nconsole.log(commit.parent);", options: ['a12b', 'test', 'undefined', 'null'], correct: 0 },
    { type: 'mcq', q: 'Which command shows your project history timeline?', options: ['git status', 'git log', 'git show', 'git diff'], correct: 1 },
    { type: 'true-false', q: 'git commit --amend modifies the existing commit object in place, keeping its exact hash identifier.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is a Git commit hash computed from?', options: ['Only the file contents', 'Metadata including author, timestamp, parent, and commit message', 'The project folder size', 'A random number generated by CPU'], correct: 1 },
    { type: 'drag-drop', q: 'Order commands to commit: [edit file, git add, git commit]', options: ['edit file', 'git add', 'git commit'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which command unstages a file called app.js?', options: ['git remove app.js', 'git restore --staged app.js', 'git reset working app.js', 'git delete app.js'], correct: 1 },
    { type: 'code-output', q: "const history = ['a', 'b', 'c'];\nconsole.log(history[history.length - 1]);", options: ['a', 'b', 'c', 'undefined'], correct: 2 }
  ]
});

// 3. Branches
window.CSFA_RAW_TOPICS.push({
  id: 'branches',
  module: 6,
  title: 'Branches',
  tagline: 'Working on features and fixes in isolation without disturbing the main timeline.',
  readMinutes: 7,
  intro: {
    whatItIs: "A branch in Git is simply a lightweight, mutable pointer to a specific commit. The default branch is usually named 'main'. Creating a new branch creates a new pointer, letting you switch back and forth to work on multiple features in parallel.",
    whyItMatters: "Branches isolate changes. They enable developers to build features, fix bugs, or test code safely without breaking the stable production codebase running on the main branch.",
    whereUsed: "Every team codebase uses branching strategies (like Git Flow or GitHub Flow) to coordinate parallel developer contributions.",
    commonMistakes: "Making commits on the wrong branch (e.g., committing experimental changes directly to 'main' instead of a feature branch)."
  },
  visual: {
    caption: "Branches branching off from a parent history timeline",
    type: "git-branches"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Listing branches",
      explanation: "git branch lists all local branches, with an asterisk pointing to the current active branch.",
      code: "const branches = ['main', 'feat-login'];\nconsole.log('Total branches:', branches.length);",
      language: "javascript", output: "Total branches: 2"
    },
    {
      difficulty: "easy", title: "Creating a branch pointer",
      explanation: "Creating a branch simply adds a new name pointer referencing the current HEAD commit hash.",
      code: "const HEAD = 'a12b';\nconst branches = { main: HEAD };\nbranches['feat-logout'] = HEAD;\nconsole.log('logout branch pointing to:', branches['feat-logout']);",
      language: "javascript", output: "logout branch pointing to: a12b"
    },
    {
      difficulty: "medium", title: "Checking out a branch",
      explanation: "git checkout updates the workspace files and redirects the HEAD pointer to the specified branch.",
      code: "const state = { HEAD: 'main', branches: ['main', 'dev'] };\nfunction switchBranch(name) {\n  if (state.branches.includes(name)) {\n    state.HEAD = name;\n    return 'Switched to ' + name;\n  }\n  return 'Branch not found';\n}\nconsole.log(switchBranch('dev'));",
      language: "javascript", output: "Switched to dev"
    },
    {
      difficulty: "medium-plus", title: "Deleting local branches",
      explanation: "git branch -d deletes a branch pointer when its changes are merged and no longer needed.",
      code: "let branches = ['main', 'bugfix-nav'];\nbranches = branches.filter(b => b !== 'bugfix-nav');\nconsole.log('Active branches:', branches.join(', '));",
      language: "javascript", output: "Active branches: main"
    },
    {
      difficulty: "hard", title: "Branching snapshot timeline simulator",
      explanation: "A model showing how commits added to a feature branch don't affect the main branch commit pointer.",
      code: "const repo = {\n  commits: { 'c1': { parent: null } },\n  branches: { main: 'c1', feature: 'c1' },\n  active: 'feature'\n};\nfunction commitOnActive(hash) {\n  repo.commits[hash] = { parent: repo.branches[repo.active] };\n  repo.branches[repo.active] = hash;\n}\ncommitOnActive('c2');\nconsole.log('main points to:', repo.branches.main);\nconsole.log('feature points to:', repo.branches.feature);",
      language: "javascript", output: "main points to: c1\nfeature points to: c2"
    },
    {
      difficulty: "real-world", title: "Dynamic branch name sanitizer",
      explanation: "CI/CD systems check and enforce strict naming rules on branches (no spaces, feature/ or fix/ prefix) before building.",
      code: "function validateBranchName(name) {\n  const pattern = /^(feat|fix|docs)\/[a-z0-9-]+$/;\n  return pattern.test(name);\n}\nconsole.log(validateBranchName('feat/login-page'));\nconsole.log(validateBranchName('experimental work'));",
      language: "javascript", output: "true\nfalse"
    }
  ],
  exercises: [
    {
      level: 1, title: "Create new branch command",
      problem: "Write the command to create a new branch named 'feat-ui' without switching to it.",
      hints: ["Use git branch.", "Provide the branch name as the argument."],
      solution: "git branch feat-ui"
    },
    {
      level: 2, title: "Switch to branch command",
      problem: "Write the command to switch to an existing branch named 'feat-ui'.",
      hints: ["Use git checkout or git switch."],
      solution: "git checkout feat-ui"
    },
    {
      level: 3, title: "Create and switch command",
      problem: "Write the shortcut command to create a new branch named 'fix-styles' and switch to it immediately.",
      hints: ["Use git checkout with the -b flag, or git switch with -c."],
      solution: "git checkout -b fix-styles"
    },
    {
      level: 4, title: "Delete branch command",
      problem: "Write the command to delete a merged branch named 'old-feature'.",
      hints: ["Use git branch with the -d flag."],
      solution: "git branch -d old-feature"
    },
    {
      level: 5, title: "Show current branch command",
      problem: "Write the command to display all local branches, highlighting the current one.",
      hints: ["Use the base command git branch with no extra flags."],
      solution: "git branch"
    },
    {
      level: 6, title: "Real-world: Detect unmerged branch commits",
      problem: "Write a function getUnmergedCommits(mainPointer, featurePointer, commitsMap) that counts how many commits exist on the feature branch that are not reachable from main.",
      hints: ["Collect all commit hashes reachable from main into a Set.", "Traverse backward from featurePointer, counting commits that aren't in the main set."],
      solution: "function getUnmergedCommits(mainPointer, featurePointer, commitsMap) {\n  const mainReachable = new Set();\n  let curr = mainPointer;\n  while (curr) {\n    mainReachable.add(curr);\n    const obj = commitsMap.get(curr);\n    curr = obj ? obj.parent : null;\n  }\n  let count = 0;\n  curr = featurePointer;\n  while (curr && !mainReachable.has(curr)) {\n    count++;\n    const obj = commitsMap.get(curr);\n    curr = obj ? obj.parent : null;\n  }\n  return count;\n}"
    }
  ],
  interview: [
    {
      q: "What is a Git branch under the hood?",
      a: "A branch in Git is simply a lightweight reference (a pointer) to a commit. Physically, it is just a plain text file inside '.git/refs/heads/' containing the 40-character SHA-1 hash of the commit it points to. Moving a branch pointer costs almost nothing, making branching in Git extremely fast."
    },
    {
      q: "What is the difference between 'git checkout' and 'git switch'?",
      a: "git checkout is an older, multi-purpose command used to switch branches, restore files, and detach HEAD. git switch was introduced in Git 2.23 specifically to split off branch switching logic, making the CLI interface simpler and safer to use."
    },
    {
      q: "What does it mean to have a 'detached HEAD' state?",
      a: "A detached HEAD state occurs when Git's active tracking pointer (HEAD) points directly to a specific commit hash rather than to a named branch pointer. Any commits made while detached are not tracked by any branch and will be lost once you checkout another branch unless you create a branch for them."
    },
    {
      q: "How does 'git checkout -b <branch>' combine two commands?",
      a: "It combines branch creation and switching. It is equivalent to running 'git branch <branch>' (creating the ref pointer at the current commit) followed by 'git checkout <branch>' (updating the working tree files and pointing HEAD to the new ref)."
    },
    {
      q: "Why does Git support lightweight branch operations compared to centralized systems like SVN?",
      a: "Centralized systems SVN copy the entire directory structures to create branches, causing network and storage latency. Git only writes a 41-byte text file containing a commit hash, using content-addressable database object snapshots to compute differences dynamically when checked out."
    }
  ],
  realWorld: [
    { company: "GitHub", text: "Uses feature branches as the foundational boundaries for PR reviews and automated staging integrations." },
    { company: "Netflix", text: "Triggers automatic isolated review app deployments when developers push code on specific feature branch names." },
    { company: "Stripe", text: "Automates lint checks on branch names to match Jira issue tags (e.g. fix/API-101-routing)." },
    { company: "Google", text: "Engineers develop features on local workspace branches before submitting patches to shared centralized review streams." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is a Git branch pointer?', options: ['A full copy of the project files', 'A lightweight pointer referencing a specific commit', 'A database index table', 'An encrypted certificate file'], correct: 1 },
    { type: 'true-false', q: 'A new branch in Git copies all the directories and files in your workspace, creating a separate physical folder.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which command creates and switches to a new branch?', options: ['git branch -c <name>', 'git checkout -b <name>', 'git init -b <name>', 'git checkout <name>'], correct: 1 },
    { type: 'code-output', q: "const HEAD = 'dev';\nconst isMain = HEAD === 'main';\nconsole.log(isMain);", options: ['true', 'false', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which modern command is dedicated solely to switching branches?', options: ['git branch', 'git switch', 'git checkout', 'git redirect'], correct: 1 },
    { type: 'true-false', q: 'Deleting a branch pointer deletes the commits it referenced from history instantly.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does HEAD represent in Git?', options: ['The oldest commit in the repository', 'A pointer to the current active branch/commit', 'The git server root URL', 'The main developer namespace'], correct: 1 },
    { type: 'drag-drop', q: 'Order the steps to start a feature: [Switch to main, git checkout -b feat-new, write feature code]', options: ['Switch to main', 'git checkout -b feat-new', 'write feature code'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'How do you force-delete a branch that contains unmerged work?', options: ['git branch -d', 'git branch -D', 'git branch -f', 'git branch --wipe'], correct: 1 },
    { type: 'code-output', q: "const branches = ['main', 'fix-1'];\nbranches.push('fix-2');\nconsole.log(branches.indexOf('fix-1'));", options: ['0', '1', '2', '-1'], correct: 1 }
  ]
});

// 4. Merging
window.CSFA_RAW_TOPICS.push({
  id: 'merging',
  module: 6,
  title: 'Merging',
  tagline: 'Combining history timelines and resolving conflicting code modifications.',
  readMinutes: 8,
  intro: {
    whatItIs: "Merging is Git's way of combining the histories and modifications of two branches. When you merge, Git automatically integrates changes from one branch into your current active branch. If changes overlap on the same lines, a merge conflict occurs, requiring human review.",
    whyItMatters: "Merging brings work back together. After developing a feature on a separate branch, merging integrates it back into the production-ready main branch so it can be deployed to users.",
    whereUsed: "Used continuously in team repositories to combine features and synchronize developers' local workspaces with shared remotes.",
    commonMistakes: "Forgetting to pull the latest changes from 'main' before merging feature branches, resulting in stale histories and unexpected merge conflicts."
  },
  visual: {
    caption: "Fast-forward merge vs Three-way merge with merge commit",
    type: "git-merge"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Fast-forward merge simulation",
      explanation: "If main hasn't diverged, Git simply slides the pointer forward to match the feature pointer.",
      code: "const main = { commit: 'c1' };\nconst feat = { commit: 'c2' };\nfunction merge() {\n  main.commit = feat.commit;\n  return 'Fast-forward merged';\n}\nconsole.log(merge(), main.commit);",
      language: "javascript", output: "Fast-forward merged c2"
    },
    {
      difficulty: "easy", title: "Checking for divergence",
      explanation: "If main and feature have separate commits, Git cannot perform a fast-forward merge.",
      code: "const mainCommit = 'c2';\nconst featCommit = 'c3';\nconst parent = 'c1';\nconsole.log('Diverged:', mainCommit !== parent && featCommit !== parent);",
      language: "javascript", output: "Diverged: true"
    },
    {
      difficulty: "medium", title: "Resolving a conflict marker string",
      explanation: "Git inserts conflict markers (<<<<<<<, =======, >>>>>>>) into files to demarcate overlapping changes.",
      code: "const conflict = '<<<<<<< HEAD\\nColor: Blue\\n=======\\nColor: Red\\n>>>>>>> feature';\nfunction resolveToFeature() {\n  return 'Color: Red';\n}\nconsole.log(resolveToFeature());",
      language: "javascript", output: "Color: Red"
    },
    {
      difficulty: "medium-plus", title: "3-Way merge calculator simulation",
      explanation: "Git identifies the Common Ancestor (Base) of two branches to determine which lines actually changed.",
      code: "const base = 'hello';\nconst main = 'hello world';\nconst feat = 'hello';\nfunction merge3Way() {\n  if (main !== base && feat === base) return main; // only main changed\n  if (feat !== base && main === base) return feat; // only feat changed\n  return 'Conflict';\n}\nconsole.log('Merge output:', merge3Way());",
      language: "javascript", output: "Merge output: hello world"
    },
    {
      difficulty: "hard", title: "Aborting a merge conflict",
      explanation: "Running git merge --abort stops the merging process and rolls the working directory back to pre-merge state.",
      code: "const mergeState = { active: true, conflicted: true };\nfunction abort() {\n  mergeState.active = false;\n  mergeState.conflicted = false;\n  return 'Merge aborted successfully';\n}\nconsole.log(abort());",
      language: "javascript", output: "Merge aborted successfully"
    },
    {
      difficulty: "real-world", title: "Automatic merge eligibility scanner",
      explanation: "Real repo server pipelines checks code changes before allowing merges to prevent broken main builds.",
      code: "function canAutoMerge(linesChangedA, linesChangedB) {\n  const intersect = linesChangedA.some(l => linesChangedB.includes(l));\n  return !intersect;\n}\nconsole.log('Auto-merge eligible:', canAutoMerge([10, 11], [15, 16]));",
      language: "javascript", output: "Auto-merge eligible: true"
    }
  ],
  exercises: [
    {
      level: 1, title: "Merge branch command",
      problem: "Write the command to merge a branch named 'feature-ab' into your current active branch.",
      hints: ["Use git merge.", "Specify the target branch 'feature-ab'."],
      solution: "git merge feature-ab"
    },
    {
      level: 2, title: "Cancel conflict command",
      problem: "Write the command to abort a merge conflict state, reverting files to their pre-merge state.",
      hints: ["Use git merge with the --abort flag."],
      solution: "git merge --abort"
    },
    {
      level: 3, title: "Compare fast-forward condition",
      problem: "What condition enables a fast-forward merge?",
      hints: ["The destination branch must not have any new commits since the source branch branched off."],
      solution: "No new commits on the destination branch since divergence."
    },
    {
      level: 4, title: "Conflict marker identification",
      problem: "What line marker symbol indicates the divider between changes in a Git merge conflict file?",
      hints: ["It's a series of equals signs: '======='."],
      solution: "======="
    },
    {
      level: 5, title: "Three-way merge requirements",
      problem: "Name the three commit pointers Git analyzes to calculate a 3-way merge.",
      hints: ["It needs the current branch head, the source branch head, and their common ancestor."],
      solution: "The destination branch commit, the source branch commit, and the common ancestor (merge base) commit."
    },
    {
      level: 6, title: "Real-world: Conflict solver parser",
      problem: "Write a function resolveMarkers(text) that parses a conflict string and resolves it to keep ONLY the local (HEAD) changes.",
      hints: ["Parse text, extract lines between '<<<<<<< HEAD' and '======='.", "Discard everything between '=======' and '>>>>>>>'."],
      solution: "function resolveMarkers(text) {\n  const lines = text.split('\\n');\n  const result = [];\n  let insideLocal = false;\n  let insideRemote = false;\n  for (const line of lines) {\n    if (line.startsWith('<<<<<<<')) { insideLocal = true; continue; }\n    if (line.startsWith('=======')) { insideLocal = false; insideRemote = true; continue; }\n    if (line.startsWith('>>>>>>>')) { insideRemote = false; continue; }\n    if (insideLocal) result.push(line);\n  }\n  return result.join('\\n');\n}"
    }
  ],
  interview: [
    {
      q: "What is the difference between a fast-forward merge and a three-way merge?",
      a: "A fast-forward merge occurs when the target branch has no new commits since the source branch branched off; Git simply moves the pointer forward without creating a new commit. A three-way merge occurs when both branches have diverged; Git uses a common ancestor and the two branch heads to calculate differences and creates a new 'merge commit' to tie them together."
    },
    {
      q: "Why do merge conflicts happen, and how do you resolve them?",
      a: "Merge conflicts happen when Git attempts to merge changes that edit the exact same lines in the same file, and it cannot automatically determine which version is correct. To resolve them, you must open the conflicted file, select the correct code, remove Git's conflict markers (<<<<<<<, =======, >>>>>>>), stage the file with 'git add', and commit to finish."
    },
    {
      q: "What does 'git merge --abort' do, and when should you use it?",
      a: "It terminates a conflicted merge process, cleaning up conflict indicators in your working tree files and restoring the repository state back to what it was right before you ran the merge command. Use it if you run into massive conflicts that you aren't prepared to resolve immediately."
    },
    {
      q: "What is a 'merge base'?",
      a: "The merge base is the best common ancestor commit shared by the two branches being merged. Git uses the tree state at this common ancestor commit as the baseline reference point to identify changes made on both branches."
    },
    {
      q: "Why is Git's three-way merge strategy considered superior to manual diff patches?",
      a: "A manual diff comparison only looks at file differences between two files. Git's 3-way merge incorporates the common ancestor base, allowing it to determine if a change was a new deletion, addition, or modification on either side, automating resolutions for non-overlapping edits."
    }
  ],
  realWorld: [
    { company: "GitHub", text: "Pull request UI analyzes branches in real time to alert developers if a merge conflict exists before allowing merges." },
    { company: "Stripe", text: "Enforces squash-merges on main branches to maintain a clean linear commit history of core ledger services." },
    { company: "Google", text: "Uses automated bots to run compile checks on merged staging streams before updating target production refs." },
    { company: "Netflix", text: "Uses continuous integration webhooks to detect conflicts in local dev branches early, notifying developers instantly." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which merge type simply slides the branch pointer forward without creating a new commit object?', options: ['3-way merge', 'Fast-forward merge', 'Squash merge', 'Rebase merge'], correct: 1 },
    { type: 'true-false', q: 'A merge conflict occurs whenever any two branches are merged, regardless of which files they modified.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which Git command cancels an active conflict resolution process, returning files to normal?', options: ['git merge --abort', 'git checkout --force', 'git reset history', 'git merge --cancel'], correct: 0 },
    { type: 'code-output', q: "const mergeResult = (conflicts) => conflicts ? 'Staged' : 'Merged';\nconsole.log(mergeResult(false));", options: ['Staged', 'Merged', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which commit represents the common ancestor in a 3-way merge?', options: ['Main Head', 'Feature Head', 'Merge Base', 'Root Commit'], correct: 2 },
    { type: 'true-false', q: 'After manually resolving conflict markers, you must run "git add" to mark the file as resolved.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What marker separates your local changes from incoming branch changes in a conflicted file?', options: ['<<<<<<<', '=======', '>>>>>>>', '-------'], correct: 1 },
    { type: 'drag-drop', q: 'Order the conflict resolution flow: [Open file and select code, Remove git markers, git add file and commit]', options: ['Open file and select code', 'Remove git markers', 'git add file and commit'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What is a merge commit?', options: ['A commit that deletes feature branches', 'A special commit with two parent references that joins branch histories', 'The first commit in a repository', 'A commit that has no author data'], correct: 1 },
    { type: 'code-output', q: "const base = 'abc';\nlet main = 'abc';\nlet feat = 'abcdef';\nconsole.log(main === base ? 'ff-merge' : 'conflict');", options: ['ff-merge', 'conflict', 'undefined', 'Error'], correct: 0 }
  ]
});

// 5. Pull Requests
window.CSFA_RAW_TOPICS.push({
  id: 'pull-requests',
  module: 6,
  title: 'Pull Requests',
  tagline: 'Collaborative development workflows using remotes, pushing, and code reviews.',
  readMinutes: 7,
  intro: {
    whatItIs: "A Pull Request (PR) is a feature hosted on platforms like GitHub that lets you notify team members about changes you've pushed to a branch. It provides a structured interface for reviewing code line-by-line, running tests, discussing modifications, and resolving conflicts before merging.",
    whyItMatters: "Pull Requests ensure code quality. They act as the final quality gatekeeper in professional teams, preventing buggy or un-reviewed code from reaching production servers.",
    whereUsed: "The primary collaboration workflow for open-source projects and software engineering departments globally.",
    commonMistakes: "Pushing enormous pull requests that contain hundreds of file modifications, making them extremely difficult and time-consuming to review."
  },
  visual: {
    caption: "The Pull Request code review and merge workflow",
    type: "api-flow"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Linking a remote URL",
      explanation: "git remote add links your local git repository to a shared hosting server URL like GitHub.",
      code: "const remotes = {};\nfunction addRemote(name, url) {\n  remotes[name] = url;\n}\naddRemote('origin', 'https://github.com/user/repo.git');\nconsole.log('Remote linked:', remotes.origin);",
      language: "javascript", output: "Remote linked: https://github.com/user/repo.git"
    },
    {
      difficulty: "easy", title: "Pushing changes",
      explanation: "git push uploads your local branch commits to the remote hosting repository database.",
      code: "const remote = { main: 'c1' };\nfunction gitPush(branch, hash) {\n  remote[branch] = hash;\n  return 'Uploaded ' + branch + ' to remote';\n}\nconsole.log(gitPush('main', 'c2'), remote.main);",
      language: "javascript", output: "Uploaded main to remote c2"
    },
    {
      difficulty: "medium", title: "Mocking PR creation status",
      explanation: "A PR needs a source branch, target branch, title description, and passing build status.",
      code: "const pr = {\n  source: 'feat-payment',\n  target: 'main',\n  status: 'Open',\n  checksPassed: true\n};\nconsole.log('PR mergeable:', pr.status === 'Open' && pr.checksPassed);",
      language: "javascript", output: "PR mergeable: true"
    },
    {
      difficulty: "medium-plus", title: "Simulating a git fetch",
      explanation: "git fetch downloads refs and commits from the remote repository without merging them into your local files.",
      code: "const local = { commits: ['c1'] };\nconst remote = { commits: ['c1', 'c2'] };\nfunction fetch() {\n  const newCommits = remote.commits.filter(c => !local.commits.includes(c));\n  return 'Fetched ' + newCommits.length + ' new commits';\n}\nconsole.log(fetch());",
      language: "javascript", output: "Fetched 1 new commits"
    },
    {
      difficulty: "hard", title: "Simulated git pull tracking",
      explanation: "git pull is a shortcut command combining git fetch (downloading refs) and git merge (integrating changes).",
      code: "const local = { HEAD: 'c1', commits: ['c1'] };\nconst remote = { HEAD: 'c2', commits: ['c1', 'c2'] };\nfunction pull() {\n  // 1. Fetch\n  const fetched = remote.commits;\n  // 2. Merge\n  local.commits = [...fetched];\n  local.HEAD = remote.HEAD;\n  return 'Pulled successfully to ' + local.HEAD;\n}\nconsole.log(pull());",
      language: "javascript", output: "Pulled successfully to c2"
    },
    {
      difficulty: "real-world", title: "CI build log status parser",
      explanation: "Teams integrate automation checkers to parse lint and build test status outputs in PR dashboards.",
      code: "function evaluatePRChecks(testSuiteOutput) {\n  const hasErrors = testSuiteOutput.includes('FAIL') || testSuiteOutput.includes('ERR');\n  return hasErrors ? 'PR Blocked: Tests failing' : 'PR Ready: All checks passing';\n}\nconsole.log(evaluatePRChecks('PASS: test_auth.js\\nPASS: test_ledger.js'));",
      language: "javascript", output: "PR Ready: All checks passing"
    }
  ],
  exercises: [
    {
      level: 1, title: "Add remote command",
      problem: "Write the command to add a remote named 'origin' pointing to 'https://github.com/user/app.git'.",
      hints: ["Use git remote add origin <url>."],
      solution: "git remote add origin https://github.com/user/app.git"
    },
    {
      level: 2, title: "Push branch command",
      problem: "Write the command to push your local branch named 'feature-payment' to remote 'origin'.",
      hints: ["Use git push origin <branch>."],
      solution: "git push origin feature-payment"
    },
    {
      level: 3, title: "Fetch updates command",
      problem: "Write the command to download all branches and commits from remote tracking without merging them.",
      hints: ["The command is git fetch."],
      solution: "git fetch"
    },
    {
      level: 4, title: "Pull updates command",
      problem: "Write the command that fetches changes from the remote server and merges them into your active branch.",
      hints: ["Use git pull."],
      solution: "git pull"
    },
    {
      level: 5, title: "Create upstream reference link",
      problem: "Write the push command to push branch 'dev' and set it to track remote 'origin/dev'.",
      hints: ["Use the -u or --set-upstream flag during push."],
      solution: "git push -u origin dev"
    },
    {
      level: 6, title: "Real-world: Branch sync checker",
      problem: "Write a function isOutdated(localHead, remoteHead, commitsMap) that returns true if remote has commits not present in local workspace.",
      hints: ["Trace local path backward. If remoteHead hash is not reached, check if localHead is missing remoteHead."],
      solution: "function isOutdated(localHead, remoteHead, commitsMap) {\n  let curr = localHead;\n  const localReachable = new Set();\n  while (curr) {\n    localReachable.add(curr);\n    const obj = commitsMap.get(curr);\n    curr = obj ? obj.parent : null;\n  }\n  return !localReachable.has(remoteHead);\n}"
    }
  ],
  interview: [
    {
      q: "What is a Pull Request, and how does it relate to Git?",
      a: "A Pull Request (PR) is a feature provided by hosting platforms (like GitHub) rather than core Git itself. A PR is a request to pull modifications from your branch into another branch. It provides a visual dashboard for code review, comment discussions, checklist checks, and tracking CI/CD status before merging."
    },
    {
      q: "What is the difference between 'git fetch' and 'git pull'?",
      a: "git fetch downloads new commits, files, and branches from a remote repository into your local .git database, updating remote-tracking branches (e.g. origin/main) without changing your local working directory files. git pull performs a git fetch followed by a git merge, integrating those remote changes directly into your active branch."
    },
    {
      q: "What does 'git push -u origin feature' do?",
      a: "It uploads the local 'feature' branch commits to the remote 'origin' repository, and sets the upstream tracking ref. This links your local branch directly to 'origin/feature' so that subsequent pulls or pushes on this branch can be executed by simply running 'git pull' or 'git push' without arguments."
    },
    {
      q: "What is CI/CD, and how does it integrate with Pull Requests?",
      a: "Continuous Integration / Continuous Deployment (CI/CD) triggers automation scripts on host platforms when a PR is created or updated. It runs tests, syntax checkers, security scans, and build pipelines to verify that the incoming code changes do not break the project before developers merge."
    },
    {
      q: "How do you synchronize local work if someone else pushes commits to the main remote branch?",
      a: "You switch to your local main branch, run 'git pull origin main' to download and merge the latest remote commits, switch back to your feature branch, and merge main into it ('git merge main') or rebase your branch ('git rebase main') to integrate the updates."
    }
  ],
  realWorld: [
    { company: "GitHub", text: "Coordinates product feature updates using pull requests, enforcing reviews by code-owners before merging." },
    { company: "Stripe", text: "Integrates compliance scanners inside PR checks to verify that updates to billing lines do not violate accounting parameters." },
    { company: "Netflix", text: "Uses automated canary testing on PR branches to test video rendering features on staging setups before merging." },
    { company: "OpenAI", text: "Validates code changes in python client tools on PRs to verify support across all previous python environments." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which platform feature lets developers review code changes before merging?', options: ['Git checkout', 'Pull Request', 'Git fetch', 'Staging area'], correct: 1 },
    { type: 'true-false', q: 'A Pull Request is a core feature of the git software and works completely offline without hosting servers.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does git pull combine?', options: ['git add + git commit', 'git fetch + git merge', 'git push + git checkout', 'git init + git clone'], correct: 1 },
    { type: 'code-output', q: "const check = (st) => st === 'PASS' ? 'Deploy' : 'Block';\nconsole.log(check('FAIL'));", options: ['Deploy', 'Block', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which command downloads remote changes without merging them into your local files?', options: ['git pull', 'git push', 'git fetch', 'git checkout'], correct: 2 },
    { type: 'true-false', q: 'Running "git remote add" uploads your local commits to a server repository.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does the -u flag do when running git push origin <branch>?', options: ['Unstages files', 'Enforces force push overrides', 'Sets the upstream tracking association for simpler future syncs', 'Decrypts secure key files'], correct: 2 },
    { type: 'drag-drop', q: 'Order the PR integration lifecycle: [Push branch, Open PR on GitHub, Merge PR after reviews]', options: ['Push branch', 'Open PR on GitHub', 'Merge PR after reviews'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What does CI stand for in the context of Git workflows?', options: ['Central Integration', 'Continuous Integration', 'Code Inspector', 'Commit Index'], correct: 1 },
    { type: 'code-output', q: "const remotes = ['origin'];\nconsole.log(remotes.includes('upstream') ? 'multi' : 'single');", options: ['multi', 'single', 'undefined', 'Error'], correct: 1 }
  ]
});
