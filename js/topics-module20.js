/* ==========================================================================
   TOPIC CONTENT DATA — Module 20: Command Line Mastery
   ========================================================================== */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm20-grep-find',
  module: 20,
  title: 'grep, find & Shell Pipes',
  tagline: 'Search files with grep, locate them with find, and chain commands with pipes.',
  readMinutes: 7,
  intro: {
    whatItIs: "grep (Global Regular Expression Print) searches file content for pattern matches. find locates files by name, type, size, or modification date. Pipes (|) connect commands so the output of one becomes the input of the next, enabling powerful one-liners that combine simple tools into complex workflows.",
    whyItMatters: "grep and find are indispensable for debugging production systems, parsing log files, searching large codebases, and automating tasks. Knowing how to pipe commands together is what separates a basic CLI user from a power user.",
    whereUsed: "Log analysis (grep 'ERROR' app.log), codebase searching (grep -r 'TODO' ./src), file auditing (find . -name '*.env'), data processing pipelines, CI/CD scripts, and DevOps automation.",
    commonMistakes: "Using grep without -r for recursive search in directories. The -r flag is required to search all files in a directory tree. Also, forgetting to quote search patterns containing spaces or special characters."
  },
  visual: { caption: "Pipeline: ls | grep '.js' | wc -l → counts JavaScript files in a directory", type: "pipe-flow" },
  examples: [
    { difficulty: "very-easy", title: "Simulating grep", explanation: "grep returns lines that match a pattern. We simulate it with .filter() on an array of lines.", code: "const logLines = [\n  '[INFO] Server started on port 3000',\n  '[ERROR] Cannot connect to database',\n  '[INFO] Request received: GET /api',\n  '[ERROR] Timeout after 30s',\n];\nconst errors = logLines.filter(line => line.includes('[ERROR]'));\nerrors.forEach(l => console.log(l));", language: "javascript", output: "[ERROR] Cannot connect to database\n[ERROR] Timeout after 30s" },
    { difficulty: "easy", title: "Case-insensitive grep", explanation: "grep -i makes matching case-insensitive — essential when log formats vary.", code: "const lines = ['User Login', 'user logout', 'USER REGISTERED', 'payment processed'];\nconst pattern = 'user';\nconst matches = lines.filter(l => l.toLowerCase().includes(pattern.toLowerCase()));\nconsole.log('Matches for \"user\" (case-insensitive):');\nmatches.forEach(l => console.log(' ', l));", language: "javascript", output: "Matches for \"user\" (case-insensitive):\n  User Login\n  user logout\n  USER REGISTERED" },
    { difficulty: "medium", title: "Simulating find by extension", explanation: "find searches a file tree by criteria. Here we simulate finding all .js files.", code: "const files = ['index.html', 'app.js', 'styles.css', 'utils.js', 'README.md', 'server.js'];\nconst jsFiles = files.filter(f => f.endsWith('.js'));\nconsole.log('JavaScript files:');\njsFiles.forEach(f => console.log(' ./' + f));", language: "javascript", output: "JavaScript files:\n  ./app.js\n  ./utils.js\n  ./server.js" },
    { difficulty: "medium-plus", title: "Piping: count matches", explanation: "Piping grep into wc -l counts matching lines. We simulate the full pipeline.", code: "function grepCount(lines, pattern) {\n  return lines.filter(l => l.includes(pattern)).length;\n}\nconst logs = Array.from({length: 100}, (_, i) => i % 5 === 0 ? '[ERROR] fault' : '[INFO] ok');\nconsole.log('Total lines:', logs.length);\nconsole.log('ERROR count:', grepCount(logs, '[ERROR]'));", language: "javascript", output: "Total lines: 100\nERROR count: 20" },
    { difficulty: "hard", title: "Regex grep simulation", explanation: "grep supports POSIX regex. Here we simulate regex matching for IP addresses.", code: "const lines = [\n  'Connection from 192.168.1.1',\n  'Connection from abc',\n  'Request from 10.0.0.1',\n  'Healthcheck OK',\n];\nconst ipRegex = /\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}/;\nlines.filter(l => ipRegex.test(l)).forEach(l => console.log(l));", language: "javascript", output: "Connection from 192.168.1.1\nRequest from 10.0.0.1" },
    { difficulty: "real-world", title: "Log analysis pipeline", explanation: "Count unique error types in a log file — equivalent to: grep ERROR app.log | sed 's/.*ERROR: //' | sort | uniq -c", code: "const logs = ['ERROR: DB timeout','INFO: request OK','ERROR: DB timeout','ERROR: auth failed','INFO: startup'];\nconst errorCounts = logs\n  .filter(l => l.startsWith('ERROR:'))\n  .reduce((acc, l) => { acc[l] = (acc[l] || 0) + 1; return acc; }, {});\nObject.entries(errorCounts).forEach(([err, count]) => console.log(`${count}x ${err}`));", language: "javascript", output: "2x ERROR: DB timeout\n1x ERROR: auth failed" }
  ],
  exercises: [
    { level: 1, title: "Simple grep", problem: "Write `grep(lines, pattern)` that returns all lines containing the pattern string.", hints: ["Use .filter() with .includes()."], solution: "const grep = (lines, p) => lines.filter(l => l.includes(p));\nconsole.log(grep(['a error','b ok','c error'], 'error'));" },
    { level: 2, title: "Find by extension", problem: "Write `findByExt(files, ext)` that returns all filenames ending with the given extension (e.g., '.js').", hints: ["Use .filter() with .endsWith()."], solution: "const findByExt = (files, ext) => files.filter(f => f.endsWith(ext));\nconsole.log(findByExt(['app.js','styles.css','main.js'], '.js'));" },
    { level: 3, title: "Word frequency (uniq -c simulation)", problem: "Write `wordFreq(text)` that splits text by spaces and returns an object mapping each word to its count.", hints: ["Split by ' ', then reduce into an object."], solution: "function wordFreq(text) {\n  return text.split(' ').reduce((a,w)=>{a[w]=(a[w]||0)+1;return a;},{});\n}\nconsole.log(wordFreq('the cat sat on the mat the'));" }
  ],
  interview: [
    { q: "What does grep -r do?", a: "The -r flag makes grep search recursively through all files in a directory tree, not just a single file. Essential for searching across large codebases: `grep -r 'TODO' ./src`" },
    { q: "What is a shell pipe?", a: "A pipe (|) connects the standard output (stdout) of one command to the standard input (stdin) of the next. It allows chaining commands: `grep ERROR log.txt | wc -l` counts error lines without creating a temporary file." },
    { q: "What is the difference between find and locate?", a: "find searches the filesystem in real-time by traversing directories — always current but slower. locate searches a pre-built database (updated by updatedb) — much faster but may be stale if the database hasn't been updated recently." }
  ],
  realWorld: [
    { company: "Cloudflare", text: "Cloudflare engineers regularly use grep pipelines to analyze terabytes of access logs, filtering for specific error patterns, IP addresses, or request types across distributed log streams." },
    { company: "GitHub Actions", text: "CI/CD scripts use find and grep extensively: finding test files, checking for forbidden strings in code (secrets), validating file structures, and counting changed files to trigger selective builds." }
  ],
  quiz: [
    { q: "What does grep -i do?", options: ["Invert match", "Case-insensitive match", "Show line numbers", "Recursive search"], answer: 1 },
    { q: "What does the pipe operator | do?", options: ["Redirects to a file", "Sends stdout of one command to stdin of next", "Creates a background process", "Repeats a command"], answer: 1 },
    { q: "How do you search all files recursively with grep?", options: ["grep -a", "grep -f", "grep -r", "grep -g"], answer: 2 },
    { q: "What does `grep 'ERROR' log.txt | wc -l` count?", options: ["Words in file", "Total lines in file", "Lines containing ERROR", "Files matching ERROR"], answer: 2 },
    { q: "Which command finds files by name?", options: ["grep", "locate", "find", "search"], answer: 2 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm20-pwd-ls-cd',
  module: 20,
  title: 'pwd / ls / cd',
  tagline: 'Master pwd / ls / cd to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at pwd / ls / cd.',
    whyItMatters: 'Understanding pwd / ls / cd is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of pwd / ls / cd before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of pwd / ls / cd.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of pwd / ls / cd', explanation: 'Let\'s look at a simple example demonstrating pwd / ls / cd in action.', code: 'console.log("Initializing pwd / ls / cd...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing pwd / ls / cd...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with pwd / ls / cd', explanation: 'A practical example showing a real-world coding scenario using pwd / ls / cd.', code: 'function demonstrate() {\n  console.log("Running pwd / ls / cd flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running pwd / ls / cd flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check pwd / ls / cd setup', problem: 'Write a function testSetup() that returns the string "pwd / ls / cd OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "pwd / ls / cd OK"; }' }
  ],
  interview: [
    { q: 'Why is pwd / ls / cd important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to pwd / ls / cd in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of pwd / ls / cd?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm20-mkdir-touch',
  module: 20,
  title: 'mkdir / touch',
  tagline: 'Master mkdir / touch to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at mkdir / touch.',
    whyItMatters: 'Understanding mkdir / touch is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of mkdir / touch before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of mkdir / touch.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of mkdir / touch', explanation: 'Let\'s look at a simple example demonstrating mkdir / touch in action.', code: 'console.log("Initializing mkdir / touch...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing mkdir / touch...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with mkdir / touch', explanation: 'A practical example showing a real-world coding scenario using mkdir / touch.', code: 'function demonstrate() {\n  console.log("Running mkdir / touch flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running mkdir / touch flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check mkdir / touch setup', problem: 'Write a function testSetup() that returns the string "mkdir / touch OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "mkdir / touch OK"; }' }
  ],
  interview: [
    { q: 'Why is mkdir / touch important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to mkdir / touch in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of mkdir / touch?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm20-cp-mv-rm',
  module: 20,
  title: 'cp / mv / rm',
  tagline: 'Master cp / mv / rm to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at cp / mv / rm.',
    whyItMatters: 'Understanding cp / mv / rm is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of cp / mv / rm before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of cp / mv / rm.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of cp / mv / rm', explanation: 'Let\'s look at a simple example demonstrating cp / mv / rm in action.', code: 'console.log("Initializing cp / mv / rm...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing cp / mv / rm...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with cp / mv / rm', explanation: 'A practical example showing a real-world coding scenario using cp / mv / rm.', code: 'function demonstrate() {\n  console.log("Running cp / mv / rm flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running cp / mv / rm flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check cp / mv / rm setup', problem: 'Write a function testSetup() that returns the string "cp / mv / rm OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "cp / mv / rm OK"; }' }
  ],
  interview: [
    { q: 'Why is cp / mv / rm important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to cp / mv / rm in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of cp / mv / rm?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm20-cat-nano-vim',
  module: 20,
  title: 'cat / nano / vim',
  tagline: 'Master cat / nano / vim to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at cat / nano / vim.',
    whyItMatters: 'Understanding cat / nano / vim is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of cat / nano / vim before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of cat / nano / vim.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of cat / nano / vim', explanation: 'Let\'s look at a simple example demonstrating cat / nano / vim in action.', code: 'console.log("Initializing cat / nano / vim...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing cat / nano / vim...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with cat / nano / vim', explanation: 'A practical example showing a real-world coding scenario using cat / nano / vim.', code: 'function demonstrate() {\n  console.log("Running cat / nano / vim flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running cat / nano / vim flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check cat / nano / vim setup', problem: 'Write a function testSetup() that returns the string "cat / nano / vim OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "cat / nano / vim OK"; }' }
  ],
  interview: [
    { q: 'Why is cat / nano / vim important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to cat / nano / vim in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of cat / nano / vim?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm20-chmod-chown',
  module: 20,
  title: 'chmod / chown',
  tagline: 'Master chmod / chown to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at chmod / chown.',
    whyItMatters: 'Understanding chmod / chown is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of chmod / chown before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of chmod / chown.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of chmod / chown', explanation: 'Let\'s look at a simple example demonstrating chmod / chown in action.', code: 'console.log("Initializing chmod / chown...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing chmod / chown...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with chmod / chown', explanation: 'A practical example showing a real-world coding scenario using chmod / chown.', code: 'function demonstrate() {\n  console.log("Running chmod / chown flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running chmod / chown flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check chmod / chown setup', problem: 'Write a function testSetup() that returns the string "chmod / chown OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "chmod / chown OK"; }' }
  ],
  interview: [
    { q: 'Why is chmod / chown important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to chmod / chown in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of chmod / chown?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm20-pipes-redirection',
  module: 20,
  title: 'Pipes & Redirection',
  tagline: 'Master Pipes & Redirection to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Pipes & Redirection.',
    whyItMatters: 'Understanding Pipes & Redirection is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Pipes & Redirection before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Pipes & Redirection.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Pipes & Redirection', explanation: 'Let\'s look at a simple example demonstrating Pipes & Redirection in action.', code: 'console.log("Initializing Pipes & Redirection...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Pipes & Redirection...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Pipes & Redirection', explanation: 'A practical example showing a real-world coding scenario using Pipes & Redirection.', code: 'function demonstrate() {\n  console.log("Running Pipes & Redirection flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Pipes & Redirection flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Pipes & Redirection setup', problem: 'Write a function testSetup() that returns the string "Pipes & Redirection OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Pipes & Redirection OK"; }' }
  ],
  interview: [
    { q: 'Why is Pipes & Redirection important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Pipes & Redirection in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Pipes & Redirection?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
