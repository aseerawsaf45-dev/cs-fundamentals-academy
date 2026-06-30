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
