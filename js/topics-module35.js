/* Modules 35–40: stub redirect files — content is in earlier combined files */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }
// Module 35 content (JavaScript Syntax) is in topics-module33.js
// Module 36 content (OOP) is in topics-module34.js
// Module 37 content (Async/Await) is in topics-module34.js
// Module 38 content (Fetch API) is in topics-module34.js

// MODULE 39 — Git & Version Control
window.CSFA_RAW_TOPICS.push({
  id: 'm39-git-workflows', module: 39, title: 'Git Workflows & Branching',
  tagline: 'Feature branches, pull requests, rebasing, and team collaboration with Git.',
  readMinutes: 7,
  intro: {
    whatItIs: "Git is a distributed version control system. Workflows define how teams use branches. The most common: Feature Branch Workflow — each feature gets its own branch, merged via pull request. GitFlow adds release and hotfix branches. GitHub Flow is simpler: main + short-lived feature branches with CI/CD deployments.",
    whyItMatters: "Version control is non-negotiable in professional development. Every team uses Git. Understanding branches, merges, rebases, and conflict resolution is daily work for developers.",
    whereUsed: "Every software project. GitHub, GitLab, Bitbucket all build on Git. CI/CD pipelines trigger on git push. Code review happens on pull requests.",
    commonMistakes: "Committing directly to main/master. Always work in feature branches. Also: writing vague commit messages like 'fix stuff'. Commit messages should explain WHAT changed and WHY."
  },
  visual: { caption: "main ← feature-branch PR → code review → merge. Never commit directly to main.", type: "git-workflow" },
  examples: [
    { difficulty: "very-easy", title: "Basic git commands", explanation: "The essential daily git workflow commands.", code: "const gitWorkflow = [\n  'git clone <repo-url>          # Get the repo',\n  'git checkout -b feature/login # Create + switch branch',\n  'git add .                     # Stage all changes',\n  'git commit -m \"feat: add login form\" # Commit',\n  'git push origin feature/login # Push to remote',\n  '# Open Pull Request on GitHub',\n  'git checkout main             # Switch to main',\n  'git pull origin main          # Get latest changes',\n];\ngitWorkflow.forEach(cmd => console.log(cmd));", language: "javascript", output: "git clone <repo-url>          # Get the repo\ngit checkout -b feature/login # Create + switch branch\ngit add .                     # Stage all changes\ngit commit -m \"feat: add login form\" # Commit\ngit push origin feature/login # Push to remote\n# Open Pull Request on GitHub\ngit checkout main             # Switch to main\ngit pull origin main          # Get latest changes" },
    { difficulty: "easy", title: "Conventional commits", explanation: "Conventional Commits format: type(scope): description — enables automated changelogs.", code: "const commitExamples = [\n  { msg: 'feat: add user authentication',        type: 'feat',  breaking: false },\n  { msg: 'fix: correct email validation regex',  type: 'fix',   breaking: false },\n  { msg: 'docs: update API documentation',       type: 'docs',  breaking: false },\n  { msg: 'refactor!: rename User to Account',    type: 'refactor', breaking: true },\n  { msg: 'chore: upgrade dependencies',          type: 'chore', breaking: false },\n];\ncommitExamples.forEach(c => console.log(`[${c.type.toUpperCase()}${c.breaking?' BREAKING':''}] ${c.msg}`));", language: "javascript", output: "[FEAT] feat: add user authentication\n[FIX] fix: correct email validation regex\n[DOCS] docs: update API documentation\n[REFACTOR BREAKING] refactor!: rename User to Account\n[CHORE] chore: upgrade dependencies" },
    { difficulty: "medium", title: "Git rebase vs merge", explanation: "Merge preserves history (fork point visible). Rebase replays commits on top of another branch (linear history).", code: "const comparison = {\n  merge: {\n    command: 'git merge feature',\n    history: 'Non-linear — shows fork point and merge commit',\n    use: 'Long-lived branches, public branches',\n    result: 'Merge commit preserves exact history',\n  },\n  rebase: {\n    command: 'git rebase main',\n    history: 'Linear — commits replayed on top of main',\n    use: 'Local cleanup before PR, squashing commits',\n    result: 'Clean linear history, rewrites commit SHAs',\n  }\n};\nObject.entries(comparison).forEach(([k,v]) => console.log(`${k.toUpperCase()}: ${v.history}`));", language: "javascript", output: "MERGE: Non-linear — shows fork point and merge commit\nREBASE: Linear — commits replayed on top of main" },
    { difficulty: "medium-plus", title: "git bisect for debugging", explanation: "git bisect uses binary search to find the commit that introduced a bug.", code: "function bisect(commits, bugIntroducedAt) {\n  let lo = 0, hi = commits.length - 1;\n  while (lo < hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    console.log(`Test commit ${commits[mid]} ...`);\n    if (commits[mid] >= bugIntroducedAt) hi = mid;\n    else lo = mid + 1;\n  }\n  console.log(`Bug introduced at: ${commits[lo]}`);\n}\nbisect(['a1b','c2d','e3f','g4h','i5j','k6l'], 'g4h');", language: "javascript", output: "Test commit e3f ...\nTest commit i5j ...\nTest commit g4h ...\nBug introduced at: g4h" },
    { difficulty: "hard", title: "git stash workflow", explanation: "git stash temporarily saves uncommitted changes so you can switch context.", code: "const stashWorkflow = [\n  { cmd: 'git stash',                   action: 'Save WIP changes, restore clean state' },\n  { cmd: 'git checkout other-branch',   action: 'Switch to urgent hotfix branch' },\n  { cmd: '# ... fix bug, commit ...',   action: 'Do urgent work' },\n  { cmd: 'git checkout feature-branch', action: 'Return to original work' },\n  { cmd: 'git stash pop',               action: 'Restore saved WIP changes' },\n];\nstashWorkflow.forEach(s => console.log(`${s.cmd.padEnd(35)}: ${s.action}`));", language: "javascript", output: "git stash                              : Save WIP changes, restore clean state\ngit checkout other-branch              : Switch to urgent hotfix branch\n# ... fix bug, commit ...              : Do urgent work\ngit checkout feature-branch            : Return to original work\ngit stash pop                          : Restore saved WIP changes" },
    { difficulty: "real-world", title: "GitHub Flow", explanation: "GitHub Flow: simple workflow for continuous delivery — main is always deployable.", code: "const githubFlow = [\n  '1. Create branch from main: feature/my-feature',\n  '2. Commit often with clear messages',\n  '3. Open PR early for feedback (Draft PR)',\n  '4. CI runs: tests, lint, type check on every push',\n  '5. Code review by team members',\n  '6. Merge when approved + CI green',\n  '7. GitHub Actions deploys main to production',\n  '8. Delete feature branch',\n];\ngithubFlow.forEach(step => console.log(step));", language: "javascript", output: "1. Create branch from main: feature/my-feature\n2. Commit often with clear messages\n3. Open PR early for feedback (Draft PR)\n4. CI runs: tests, lint, type check on every push\n5. Code review by team members\n6. Merge when approved + CI green\n7. GitHub Actions deploys main to production\n8. Delete feature branch" }
  ],
  exercises: [
    { level: 1, title: "Commit message validator", problem: "Write `isConventionalCommit(msg)` that returns true if message starts with one of: feat, fix, docs, style, refactor, test, chore followed by a colon.", hints: ["Test regex: /^(feat|fix|docs|style|refactor|test|chore)(\\(.*\\))?!?:/"], solution: "const isConventionalCommit=msg=>/^(feat|fix|docs|style|refactor|test|chore)(\\(.*\\))?!?:/.test(msg);\nconsole.log(isConventionalCommit('feat: add login'),isConventionalCommit('update stuff'));" },
    { level: 2, title: "Branch name validator", problem: "Write `isValidBranch(name)` returning true if branch name matches pattern: type/description (e.g., feat/add-login, fix/email-bug).", hints: ["Regex: /^(feat|fix|hotfix|chore|docs)\\/[a-z0-9-]+$/"], solution: "const isValidBranch=n=>/^(feat|fix|hotfix|chore|docs)\\/[a-z0-9-]+$/.test(n);\nconsole.log(isValidBranch('feat/add-login'),isValidBranch('my branch'));" },
    { level: 3, title: "Bisect simulator", problem: "Implement `bisect(arr, target)` that uses binary search to find the index of target in sorted array, logging each step.", hints: ["lo=0, hi=arr.length-1. Loop while lo<hi, test mid."], solution: "function bisect(arr,t){let lo=0,hi=arr.length-1;while(lo<hi){const m=Math.floor((lo+hi)/2);console.log('Test index',m,arr[m]);if(arr[m]>=t)hi=m;else lo=m+1;}return lo;}\nconsole.log('Found at:',bisect([1,3,5,7,9,11,13],7));" }
  ],
  interview: [
    { q: "What is the difference between git merge and git rebase?", a: "git merge creates a merge commit preserving the full branching history. git rebase replays your commits on top of another branch, creating a linear history with new commit SHAs. Use merge for shared branches (don't rewrite public history). Use rebase to clean up local commits before a PR." },
    { q: "What is a pull request?", a: "A pull request (PR) is a GitHub/GitLab feature for proposing and reviewing changes. You push a feature branch, open a PR against main, teammates review the diff and leave comments, CI runs automated checks, and the branch is merged after approval. PRs are the standard code review mechanism." },
    { q: "What is git stash?", a: "git stash temporarily saves your uncommitted changes and reverts the working directory to the last commit, giving you a clean state. git stash pop restores the saved changes. Useful for context-switching to an urgent fix without committing half-done work." }
  ],
  realWorld: [
    { company: "GitHub", text: "GitHub itself uses GitHub Flow for deploying dozens of times per day. main is always deployable, feature branches are short-lived (hours to days), and each PR triggers CI that must pass before merging." },
    { company: "Conventional Commits / semantic-release", text: "Many teams use semantic-release which reads Conventional Commits to automatically determine version bumps (patch/minor/major) and generate changelogs — showing how commit message discipline has real automation payoff." }
  ],
  quiz: [
    { q: "What does git rebase do?", options: ["Creates a merge commit", "Replays commits on top of another branch with linear history", "Deletes remote branches", "Resets to previous commit"], answer: 1 },
    { q: "What is a Pull Request?", options: ["Fetching changes from remote", "Proposing and reviewing code changes before merging", "Pulling Docker images", "Requesting code access"], answer: 1 },
    { q: "What does git stash do?", options: ["Commits changes", "Temporarily saves uncommitted changes", "Pushes to remote", "Merges branches"], answer: 1 },
    { q: "What format do Conventional Commits use?", options: ["branch: description", "type(scope): description", "#ticket: description", "JIRA-123: description"], answer: 1 },
    { q: "In GitHub Flow, which branch is always deployable?", options: ["develop", "feature", "main", "release"], answer: 2 }
  ]
});

// MODULE 40 — Testing
window.CSFA_RAW_TOPICS.push({
  id: 'm40-testing', module: 40, title: 'Unit, Integration & E2E Testing',
  tagline: 'Writing tests that catch bugs automatically — Jest, Testing Library, and Cypress.',
  readMinutes: 7,
  intro: {
    whatItIs: "Testing pyramid: Unit tests (fast, isolated, test one function), Integration tests (test modules working together), E2E tests (browser automation, test full user flows). Test-Driven Development (TDD) writes tests before implementation. Popular tools: Jest (unit/integration JS), Vitest (Vite projects), Playwright/Cypress (E2E).",
    whyItMatters: "Tests prevent regressions — changes that break existing functionality. A good test suite enables confident refactoring and continuous delivery. Untested code accumulates technical debt and production bugs.",
    whereUsed: "Every professional codebase. GitHub Actions runs tests on every PR. Jest is the most popular JS test runner. React Testing Library tests React components. Playwright/Cypress tests full browser flows.",
    commonMistakes: "Testing implementation details instead of behavior. Tests should verify what the code does for users, not how it does it internally. Test the public interface; refactor internals freely."
  },
  visual: { caption: "Pyramid: Many fast unit tests → fewer integration tests → few slow E2E tests", type: "test-pyramid" },
  examples: [
    { difficulty: "very-easy", title: "Basic Jest test", explanation: "Jest tests use describe blocks and expect assertions.", code: "// Jest syntax\nfunction add(a, b) { return a + b; }\n\n// describe('add', () => {\n//   it('adds two numbers', () => {\n//     expect(add(2, 3)).toBe(5);\n//   });\n// });\n\n// Simulation:\nfunction expect(val) {\n  return { toBe: (expected) => console.log(val === expected ? '✓ PASS' : `✗ FAIL: expected ${expected}, got ${val}`) };\n}\nexpect(add(2, 3)).toBe(5);\nexpect(add(-1, 1)).toBe(0);", language: "javascript", output: "✓ PASS\n✓ PASS" },
    { difficulty: "easy", title: "Testing with mocks", explanation: "Mocks replace real dependencies (databases, APIs) with controlled fakes for isolated unit tests.", code: "function createUserService(db) {\n  return {\n    getUser: (id) => db.findById(id),\n  };\n}\n// Mock database\nconst mockDb = {\n  findById: (id) => ({ id, name: `User${id}`, email: `user${id}@example.com` }),\n};\nconst service = createUserService(mockDb);\nconst user = service.getUser(42);\nconsole.log('Test:', user.name === 'User42' ? '✓ PASS' : '✗ FAIL');", language: "javascript", output: "Test: ✓ PASS" },
    { difficulty: "medium", title: "TDD: Red → Green → Refactor", explanation: "TDD: write failing test → write minimal code to pass → refactor.", code: "// RED: failing test\nfunction sum(arr) { /* not implemented yet */ }\n// expect(sum([1,2,3])).toBe(6); → FAIL\n\n// GREEN: minimal implementation\nfunction sumGreen(arr) { return arr.reduce((a,b) => a+b, 0); }\n\n// REFACTOR (same logic, cleaner)\nconst sumFinal = arr => arr.reduce((a,b) => a+b, 0);\n\n// Verify\n[sumGreen, sumFinal].forEach(fn => {\n  console.log(fn([1,2,3]) === 6 ? '✓ PASS' : '✗ FAIL');\n});", language: "javascript", output: "✓ PASS\n✓ PASS" },
    { difficulty: "medium-plus", title: "Testing async code", explanation: "Jest async tests use async/await to handle Promises.", code: "async function fetchUser(id) {\n  if (id <= 0) throw new Error('Invalid ID');\n  return { id, name: `User${id}` };\n}\n// Test: success case\nasync function runTests() {\n  const user = await fetchUser(1);\n  console.log(user.id === 1 ? '✓ success case' : '✗ failed');\n  // Test: error case\n  try { await fetchUser(-1); console.log('✗ should have thrown'); }\n  catch (e) { console.log(e.message === 'Invalid ID' ? '✓ error case' : '✗ wrong error'); }\n}\nrunTests();", language: "javascript", output: "✓ success case\n✓ error case" },
    { difficulty: "hard", title: "Test coverage and boundary cases", explanation: "Good tests cover: happy path, edge cases, and error cases.", code: "function divide(a, b) {\n  if (typeof a !== 'number' || typeof b !== 'number') throw new TypeError('Must be numbers');\n  if (b === 0) throw new Error('Division by zero');\n  return a / b;\n}\nconst cases = [\n  [10, 2, 5, null],     // happy path\n  [0, 5, 0, null],      // edge: zero dividend\n  [10, 0, null, 'Division by zero'],  // error: divide by zero\n  ['a', 2, null, 'Must be numbers'],  // error: wrong type\n];\ncases.forEach(([a,b,expected,errorMsg]) => {\n  try { const r = divide(a,b); console.log(r === expected ? '✓ PASS' : `✗ FAIL got ${r}`); }\n  catch(e) { console.log(e.message === errorMsg ? '✓ PASS (error)' : `✗ FAIL: ${e.message}`); }\n});", language: "javascript", output: "✓ PASS\n✓ PASS\n✓ PASS (error)\n✓ PASS (error)" },
    { difficulty: "real-world", title: "React Testing Library philosophy", explanation: "Test what users see and interact with — not implementation details.", code: "// Philosophy: test from user perspective\nconst testPhilosophy = [\n  '// BAD: testing implementation details',\n  '// expect(component.state.count).toBe(1); // fragile',\n  '',\n  '// GOOD: testing what user sees',\n  '// const btn = screen.getByRole(\"button\", { name: /increment/i });',\n  '// await userEvent.click(btn);',\n  '// expect(screen.getByText(\"Count: 1\")).toBeInTheDocument();',\n];\nconsole.log('Testing Library principle:');\ntestPhilosophy.forEach(l => console.log(l));", language: "javascript", output: "Testing Library principle:\n// BAD: testing implementation details\n// expect(component.state.count).toBe(1); // fragile\n\n// GOOD: testing what user sees\n// const btn = screen.getByRole(\"button\", { name: /increment/i });\n// await userEvent.click(btn);\n// expect(screen.getByText(\"Count: 1\")).toBeInTheDocument();" }
  ],
  exercises: [
    { level: 1, title: "Simple assertion function", problem: "Write `assert(actual, expected, label)` that logs '✓ PASS: label' if actual === expected, or '✗ FAIL: label — expected X, got Y'.", hints: ["Use === comparison, template literals."], solution: "function assert(actual,expected,label){console.log(actual===expected?`✓ PASS: ${label}`:`✗ FAIL: ${label} — expected ${expected}, got ${actual}`);}\nassert(2+2,4,'addition');\nassert(2+2,5,'addition should fail');" },
    { level: 2, title: "Test runner", problem: "Write `test(name, fn)` that calls fn(), catches errors, and logs '✓ PASS: name' or '✗ FAIL: name — error message'.", hints: ["try { fn(); console.log PASS } catch(e) { console.log FAIL }"], solution: "function test(name,fn){try{fn();console.log(`✓ PASS: ${name}`);}catch(e){console.log(`✗ FAIL: ${name} — ${e.message}`);}}\ntest('math',()=>{if(2+2!==4)throw new Error('wrong');});\ntest('fail example',()=>{throw new Error('deliberate fail');});" },
    { level: 3, title: "Mock function", problem: "Write `mockFn()` that returns a function. Each call records its arguments. The returned function has a `.calls` property (array of argument arrays).", hints: ["const calls=[]; const fn=(...args)=>{calls.push(args); return undefined;}; fn.calls=calls;"], solution: "function mockFn(){const calls=[];const fn=(...args)=>{calls.push(args);};fn.calls=calls;return fn;}\nconst m=mockFn();m(1,2);m('a');console.log(m.calls);" }
  ],
  interview: [
    { q: "What is the test pyramid?", a: "The test pyramid shows the ideal distribution of test types: many fast unit tests at the base (cheap to write/run), fewer integration tests in the middle, and few slow E2E tests at the top (expensive). Inverting this (many E2E, few unit) is called the 'ice cream cone anti-pattern'." },
    { q: "What is TDD?", a: "Test-Driven Development: write a failing test first (Red), write minimal code to make it pass (Green), then refactor while keeping tests green (Refactor). TDD produces highly testable code, prevents over-engineering, and creates a comprehensive test suite as a byproduct." },
    { q: "What is the difference between a mock and a stub?", a: "Stub: returns pre-defined data without verifying calls. Mock: also verifies that specific calls were made with specific arguments. Stubs are simpler; mocks add behavioral verification. Both replace real dependencies in tests." }
  ],
  realWorld: [
    { company: "Vercel / Next.js", text: "Next.js projects ship with Jest + React Testing Library configuration out of the box. Vercel's preview deployments run test suites in CI before any deployment, making testing a built-in part of the deployment pipeline." },
    { company: "Spotify", text: "Spotify's engineering teams enforce a minimum test coverage threshold in their CI pipelines. New code that drops coverage below the threshold fails the build — using test coverage as a quality gate." }
  ],
  quiz: [
    { q: "Which level of the test pyramid should have the MOST tests?", options: ["E2E tests", "Integration tests", "Unit tests", "Performance tests"], answer: 2 },
    { q: "What is TDD?", options: ["Testing after deployment", "Writing tests after implementation", "Writing tests BEFORE implementation", "Manual testing only"], answer: 2 },
    { q: "What does a mock do?", options: ["Runs production code", "Replaces real dependencies with controlled fakes and verifies calls", "Simulates network latency", "Generates test data"], answer: 1 },
    { q: "React Testing Library encourages testing:", options: ["Component internals/state", "Implementation details", "What users see and interact with", "CSS class names"], answer: 2 },
    { q: "Jest expects() throw an error when:", options: ["Test passes", "Test code has syntax error", "Assertion fails", "Test takes too long"], answer: 2 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm35-js-syntax',
  module: 35,
  title: 'Syntax',
  tagline: 'Master Syntax to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Syntax.',
    whyItMatters: 'Understanding Syntax is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Syntax before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Syntax.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Syntax', explanation: 'Let\'s look at a simple example demonstrating Syntax in action.', code: 'console.log("Initializing Syntax...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Syntax...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Syntax', explanation: 'A practical example showing a real-world coding scenario using Syntax.', code: 'function demonstrate() {\n  console.log("Running Syntax flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Syntax flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Syntax setup', problem: 'Write a function testSetup() that returns the string "Syntax OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Syntax OK"; }' }
  ],
  interview: [
    { q: 'Why is Syntax important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Syntax in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Syntax?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm35-js-variables',
  module: 35,
  title: 'Variables',
  tagline: 'Master Variables to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Variables.',
    whyItMatters: 'Understanding Variables is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Variables before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Variables.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Variables', explanation: 'Let\'s look at a simple example demonstrating Variables in action.', code: 'console.log("Initializing Variables...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Variables...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Variables', explanation: 'A practical example showing a real-world coding scenario using Variables.', code: 'function demonstrate() {\n  console.log("Running Variables flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Variables flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Variables setup', problem: 'Write a function testSetup() that returns the string "Variables OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Variables OK"; }' }
  ],
  interview: [
    { q: 'Why is Variables important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Variables in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Variables?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm35-js-data-types',
  module: 35,
  title: 'Data Types',
  tagline: 'Master Data Types to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Data Types.',
    whyItMatters: 'Understanding Data Types is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Data Types before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Data Types.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Data Types', explanation: 'Let\'s look at a simple example demonstrating Data Types in action.', code: 'console.log("Initializing Data Types...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Data Types...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Data Types', explanation: 'A practical example showing a real-world coding scenario using Data Types.', code: 'function demonstrate() {\n  console.log("Running Data Types flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Data Types flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Data Types setup', problem: 'Write a function testSetup() that returns the string "Data Types OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Data Types OK"; }' }
  ],
  interview: [
    { q: 'Why is Data Types important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Data Types in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Data Types?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm35-js-operators',
  module: 35,
  title: 'Operators',
  tagline: 'Master Operators to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Operators.',
    whyItMatters: 'Understanding Operators is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Operators before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Operators.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Operators', explanation: 'Let\'s look at a simple example demonstrating Operators in action.', code: 'console.log("Initializing Operators...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Operators...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Operators', explanation: 'A practical example showing a real-world coding scenario using Operators.', code: 'function demonstrate() {\n  console.log("Running Operators flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Operators flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Operators setup', problem: 'Write a function testSetup() that returns the string "Operators OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Operators OK"; }' }
  ],
  interview: [
    { q: 'Why is Operators important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Operators in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Operators?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
