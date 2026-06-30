/* ==========================================================================
   TOPIC CONTENT DATA — Module 21: Shell Scripting
   ========================================================================== */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm21-bash-scripts',
  module: 21,
  title: 'Shell Scripting with Bash',
  tagline: 'Automate everything — variables, loops, conditionals, and functions in Bash.',
  readMinutes: 8,
  intro: {
    whatItIs: "Bash (Bourne Again Shell) is the default shell on most Linux systems and macOS. Shell scripts are text files containing sequences of shell commands that execute as a program. They support variables, conditionals (if/else), loops (for/while), functions, and can call any system command. Scripts are used to automate repetitive tasks, deployment pipelines, and system administration.",
    whyItMatters: "Every DevOps workflow, CI/CD pipeline, Docker entrypoint, and server automation task uses shell scripts. Being able to write and debug Bash is essential for working in any professional Linux environment, even if you primarily write in other languages.",
    whereUsed: "CI/CD pipelines (GitHub Actions, Jenkins), Docker ENTRYPOINT scripts, server provisioning (Ansible, Terraform wrapper scripts), cron jobs, deployment scripts, database backup automation.",
    commonMistakes: "Forgetting to quote variables (use \"$VAR\" not $VAR) — unquoted variables break on spaces. Also, not checking exit codes — add `set -e` at the top of scripts to exit on any error."
  },
  visual: { caption: "Bash script flow: shebang → variables → conditionals → loops → functions → exit", type: "script-flow" },
  examples: [
    { difficulty: "very-easy", title: "Variables and echo", explanation: "Bash variables: no spaces around =. Access with $NAME.", code: "// Equivalent JavaScript of Bash:\nconst NAME = 'World';\nconst GREETING = `Hello, ${NAME}!`;\nconsole.log(GREETING);\n// In Bash:\n// NAME=\"World\"\n// GREETING=\"Hello, $NAME!\"\n// echo $GREETING", language: "javascript", output: "Hello, World!" },
    { difficulty: "easy", title: "If/else conditional", explanation: "Bash if/else tests conditions with [ ] or [[ ]].", code: "// JavaScript equivalent of Bash if/else:\nconst AGE = 20;\nif (AGE >= 18) {\n  console.log('Access granted');\n} else {\n  console.log('Access denied');\n}\n// Bash: if [ $AGE -ge 18 ]; then echo 'Access granted'; fi", language: "javascript", output: "Access granted" },
    { difficulty: "medium", title: "For loop over items", explanation: "Bash for loops iterate over lists of words or files.", code: "// JavaScript equivalent of: for fruit in apple banana cherry; do echo $fruit; done\nconst fruits = ['apple', 'banana', 'cherry'];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}", language: "javascript", output: "apple\nbanana\ncherry" },
    { difficulty: "medium-plus", title: "While loop with counter", explanation: "While loops run until a condition becomes false.", code: "// JavaScript equivalent of Bash while loop:\nlet count = 1;\nwhile (count <= 5) {\n  console.log(`Iteration: ${count}`);\n  count++;\n}\n// Bash: count=1; while [ $count -le 5 ]; do echo \"Iteration: $count\"; ((count++)); done", language: "javascript", output: "Iteration: 1\nIteration: 2\nIteration: 3\nIteration: 4\nIteration: 5" },
    { difficulty: "hard", title: "Functions with return values", explanation: "Bash functions return exit codes (0=success). Return data via stdout capture: result=$(my_func).", code: "// Bash function equivalent in JS:\nfunction greet(name, role) {\n  return `Hello ${name}, you are a ${role}`;\n}\nconst message = greet('Alice', 'developer');\nconsole.log(message);\n// Bash: greet() { echo \"Hello $1, you are a $2\"; }\n// message=$(greet Alice developer)", language: "javascript", output: "Hello Alice, you are a developer" },
    { difficulty: "real-world", title: "Deployment script simulation", explanation: "A real deployment script: check environment, build, and deploy.", code: "function deploy(env) {\n  const steps = [\n    `Checking environment: ${env}`,\n    'Running npm install...',\n    'Running tests...',\n    'Building production bundle...',\n    `Deploying to ${env} server...`,\n    'Health check passed ✓',\n  ];\n  steps.forEach(step => console.log(`[DEPLOY] ${step}`));\n}\ndeploy('staging');", language: "javascript", output: "[DEPLOY] Checking environment: staging\n[DEPLOY] Running npm install...\n[DEPLOY] Running tests...\n[DEPLOY] Building production bundle...\n[DEPLOY] Deploying to staging server...\n[DEPLOY] Health check passed ✓" }
  ],
  exercises: [
    { level: 1, title: "Bash variable echo", problem: "Write JavaScript that declares a variable `APP_NAME = 'MyApp'` and a variable `VERSION = '1.0.0'`, then logs the string 'Deploying MyApp v1.0.0'.", hints: ["Use template literal: `Deploying ${APP_NAME} v${VERSION}`."], solution: "const APP_NAME = 'MyApp'; const VERSION = '1.0.0'; console.log(`Deploying ${APP_NAME} v${VERSION}`);" },
    { level: 2, title: "Loop over files", problem: "Simulate `for file in *.js` — given an array of files, filter to only .js files and log 'Processing: <filename>' for each.", hints: ["Use filter() then forEach()."], solution: "const files=['app.js','style.css','server.js','index.html'];\nfiles.filter(f=>f.endsWith('.js')).forEach(f=>console.log(`Processing: ${f}`));" },
    { level: 3, title: "Exit code simulation", problem: "Write `runStep(name, shouldFail)` that logs '[OK] <name>' if shouldFail is false, or '[FAIL] <name>' and throws an Error if shouldFail is true. Wrap three steps in try/catch.", hints: ["Throw an Error when shouldFail is true.", "Catch and log 'Script failed at step'."], solution: "function runStep(name, fail) {\n  if (fail) { console.log(`[FAIL] ${name}`); throw new Error(name); }\n  console.log(`[OK] ${name}`);\n}\ntry { runStep('Install',false); runStep('Test',true); runStep('Deploy',false); }\ncatch(e) { console.log('Script failed at:', e.message); }" }
  ],
  interview: [
    { q: "What is the shebang line in a Bash script?", a: "#!/bin/bash — the first line of a script that tells the OS which interpreter to use. Without it, the script may run with the wrong shell. #!/usr/bin/env bash is preferred as it finds bash in PATH regardless of its location." },
    { q: "What does `set -e` do in a Bash script?", a: "set -e (errexit) makes the script exit immediately when any command returns a non-zero exit code (failure). Without it, errors are silently ignored and subsequent commands run on broken state. Always use `set -e` (and often -u and -o pipefail) in production scripts." },
    { q: "Why must you quote variables in Bash?", a: "Unquoted variables undergo word splitting and glob expansion. If $FILE contains 'my file.txt', rm $FILE runs `rm my file.txt` (two arguments). \"$FILE\" keeps it as one argument. Always quote: \"$VAR\"." }
  ],
  realWorld: [
    { company: "GitHub Actions", text: "Every GitHub Actions workflow runs shell scripts. The `run:` key executes bash commands, and complex workflows use shell functions, loops, and conditional logic to orchestrate builds, tests, and deployments." },
    { company: "Docker", text: "Docker ENTRYPOINT scripts are bash files that configure containers at startup: setting environment variables, waiting for databases to be ready, running migrations, then starting the app — all in a shell script." }
  ],
  quiz: [
    { q: "What does the shebang #!/bin/bash do?", options: ["Comments the first line", "Specifies the script interpreter", "Sets environment variables", "Exports the script"], answer: 1 },
    { q: "What does set -e do?", options: ["Sets environment variable e", "Exit immediately on any command failure", "Enable verbose output", "Set user to root"], answer: 1 },
    { q: "How do you access a Bash variable?", options: ["${VAR}", "$VAR (with quotes: \"$VAR\")", "Both A and B", "VAR()"], answer: 2 },
    { q: "What Bash construct runs a block of commands repeatedly?", options: ["if/fi", "case/esac", "for/do/done or while/do/done", "function/return"], answer: 2 },
    { q: "What does $(command) do in Bash?", options: ["Comments it out", "Captures command output into a variable", "Runs in background", "Sets permissions"], answer: 1 }
  ]
});
