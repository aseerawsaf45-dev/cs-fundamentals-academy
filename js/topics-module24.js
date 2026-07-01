/* Module 24 — Browser Internals supplementary content.
   HTTP/HTTPS core content is in topics-module22.js (module:24).
   This file adds the Event Loop topic. */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm25-event-loop', module: 25,
  title: 'The JavaScript Event Loop',
  tagline: 'How a single-threaded language handles async operations without blocking.',
  readMinutes: 7,
  intro: {
    whatItIs: "JavaScript is single-threaded — it can only do one thing at a time. The Event Loop is the mechanism that allows JavaScript to handle async operations (timers, network requests, I/O) without blocking the main thread. It works with the Call Stack, Web APIs, Callback Queue, and Microtask Queue. The loop constantly checks: 'Is the call stack empty? If yes, push the next callback from the queue.'",
    whyItMatters: "Understanding the event loop explains why `setTimeout(fn, 0)` doesn't run immediately, why Promises resolve before setTimeout callbacks, and why blocking the main thread with heavy computation freezes the UI. It's foundational to writing correct async JavaScript.",
    whereUsed: "All browser JavaScript, Node.js, and any JavaScript runtime. Every async operation — fetch, setTimeout, Promise, file read — goes through the event loop.",
    commonMistakes: "Blocking the event loop with synchronous CPU-heavy operations (e.g., processing a huge array in a loop). This freezes the UI or server. Use web workers (browser) or worker_threads (Node.js) for CPU work."
  },
  visual: { caption: "Event Loop: Call Stack → empty? → pop microtask → pop macro-task → repeat", type: "event-loop" },
  examples: [
    { difficulty: "very-easy", title: "Sync vs async execution order", explanation: "Synchronous code runs first, then async callbacks from the queue.", code: "console.log('1: sync start');\nsetTimeout(() => console.log('3: setTimeout (macro-task)'), 0);\nPromise.resolve().then(() => console.log('2: Promise (microtask)'));\nconsole.log('1: sync end');", language: "javascript", output: "1: sync start\n1: sync end\n2: Promise (microtask)\n3: setTimeout (macro-task)" },
    { difficulty: "easy", title: "Microtasks before macrotasks", explanation: "Promise callbacks (microtasks) always run before setTimeout callbacks (macrotasks), even with 0ms delay.", code: "console.log('start');\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve()\n  .then(() => console.log('promise 1'))\n  .then(() => console.log('promise 2'));\nconsole.log('end');", language: "javascript", output: "start\nend\npromise 1\npromise 2\ntimeout" },
    { difficulty: "medium", title: "Event loop phases", explanation: "The event loop processes: sync code → microtasks → macrotasks (timers, I/O).", code: "function visualizeLoop() {\n  const phases = ['Synchronous code', 'Microtask queue (Promises)', 'Macrotask queue (setTimeout, setInterval, I/O)'];\n  phases.forEach((phase, i) => console.log(`Phase ${i+1}: ${phase}`));\n  console.log('\\nLoop repeats continuously while the app runs');\n}\nvisualizeLoop();", language: "javascript", output: "Phase 1: Synchronous code\nPhase 2: Microtask queue (Promises)\nPhase 3: Macrotask queue (setTimeout, setInterval, I/O)\n\nLoop repeats continuously while the app runs" },
    { difficulty: "medium-plus", title: "Blocking the event loop", explanation: "A synchronous while loop blocks the event loop — nothing else can run during it.", code: "function blockingWork(ms) {\n  const start = Date.now();\n  while (Date.now() - start < ms) {} // blocks!\n  return `Blocked for ${ms}ms`;\n}\nconsole.log('Before block');\nconst result = blockingWork(10); // simulate blocking\nconsole.log(result);\nconsole.log('After block (any pending callbacks waited here)');", language: "javascript", output: "Before block\nBlocked for 10ms\nAfter block (any pending callbacks waited here)" },
    { difficulty: "hard", title: "queueMicrotask", explanation: "queueMicrotask adds to the microtask queue, running before the next macrotask.", code: "console.log('sync 1');\nqueueMicrotask(() => console.log('microtask 1'));\nqueueMicrotask(() => console.log('microtask 2'));\nsetTimeout(() => console.log('macrotask'), 0);\nconsole.log('sync 2');", language: "javascript", output: "sync 1\nsync 2\nmicrotask 1\nmicrotask 2\nmacrotask" },
    { difficulty: "real-world", title: "Async batching with Promise.all", explanation: "Use Promise.all to run async operations in parallel, waiting for all to complete.", code: "async function fetchUsers(ids) {\n  const fetches = ids.map(id => Promise.resolve({ id, name: `User${id}` }));\n  const users = await Promise.all(fetches);\n  return users;\n}\nfetchUsers([1,2,3]).then(users => {\n  users.forEach(u => console.log(`Fetched: ${u.name}`));\n});", language: "javascript", output: "Fetched: User1\nFetched: User2\nFetched: User3" }
  ],
  exercises: [
    { level: 1, title: "Predict execution order", problem: "Given: console.log('A'); setTimeout(()=>console.log('B'),0); Promise.resolve().then(()=>console.log('C')); console.log('D'); — write the correct output order.", hints: ["Sync first, then microtasks, then macrotasks."], solution: "// Output order: A, D, C, B\nconsole.log('A');\nsetTimeout(()=>console.log('B'),0);\nPromise.resolve().then(()=>console.log('C'));\nconsole.log('D');" },
    { level: 2, title: "Async with delay", problem: "Write `delay(ms)` using Promise and setTimeout that resolves after `ms` milliseconds.", hints: ["return new Promise(resolve => setTimeout(resolve, ms))."], solution: "function delay(ms){return new Promise(r=>setTimeout(r,ms));}\ndelay(100).then(()=>console.log('Resolved after 100ms'));" },
    { level: 3, title: "Sequential vs parallel", problem: "Write `sequential([p1,p2,p3])` that awaits each promise one at a time, and `parallel([p1,p2,p3])` that awaits all at once. Log the difference in approach.", hints: ["Sequential: for...of with await. Parallel: Promise.all."], solution: "async function sequential(ps){for(const p of ps)await p;}\nasync function parallel(ps){await Promise.all(ps);}\nconst ps=[Promise.resolve(1),Promise.resolve(2)];\nparallel(ps).then(()=>console.log('parallel done'));" }
  ],
  interview: [
    { q: "What is the difference between microtasks and macrotasks?", a: "Microtasks (Promises, queueMicrotask, MutationObserver) run after the current synchronous code but before the next macrotask. Macrotasks (setTimeout, setInterval, I/O callbacks) run one at a time, with all microtasks flushed after each one." },
    { q: "Why does setTimeout(fn, 0) not run immediately?", a: "setTimeout schedules a macrotask. Even with 0ms delay, it won't run until: (1) current sync code finishes, (2) all microtasks flush. The 0ms is the minimum delay — actual delay depends on event loop queue depth." },
    { q: "How do you avoid blocking the event loop?", a: "Break large synchronous work into chunks using setImmediate/setTimeout (Node.js) or requestAnimationFrame (browser). Move CPU-intensive work to Web Workers (browser) or worker_threads (Node.js). Use async I/O instead of synchronous file/network operations." }
  ],
  realWorld: [
    { company: "React", text: "React 18's concurrent mode uses the event loop deliberately — it can pause rendering (yield to the event loop) to keep the UI responsive during long renders, using scheduler to prioritize user interactions over background updates." },
    { company: "Node.js", text: "Node.js's scalability comes from the event loop: instead of blocking on I/O, callbacks are queued. One Node process can handle thousands of concurrent connections — each async I/O completes via event loop callbacks." }
  ],
  quiz: [
    { q: "What runs first in JavaScript?", options: ["setTimeout callbacks", "Promise microtasks", "Synchronous code", "Event listeners"], answer: 2 },
    { q: "Which queue has higher priority: microtask or macrotask?", options: ["Macrotask", "Microtask", "Equal priority", "Depends on browser"], answer: 1 },
    { q: "What is an example of a microtask?", options: ["setTimeout", "setInterval", "Promise.then()", "click event"], answer: 2 },
    { q: "What happens when you block the event loop?", options: ["Memory increases", "CPU usage drops", "No other callbacks can run", "JavaScript crashes"], answer: 2 },
    { q: "How do you run CPU-heavy work without blocking the event loop?", options: ["Use longer setTimeout", "Use Promise.race", "Use Web Workers / worker_threads", "Use JSON.stringify"], answer: 2 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm24-http',
  module: 24,
  title: 'HTTP',
  tagline: 'Master HTTP to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at HTTP.',
    whyItMatters: 'Understanding HTTP is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of HTTP before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of HTTP.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of HTTP', explanation: 'Let\'s look at a simple example demonstrating HTTP in action.', code: 'console.log("Initializing HTTP...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing HTTP...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with HTTP', explanation: 'A practical example showing a real-world coding scenario using HTTP.', code: 'function demonstrate() {\n  console.log("Running HTTP flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running HTTP flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check HTTP setup', problem: 'Write a function testSetup() that returns the string "HTTP OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "HTTP OK"; }' }
  ],
  interview: [
    { q: 'Why is HTTP important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to HTTP in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of HTTP?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm24-https',
  module: 24,
  title: 'HTTPS',
  tagline: 'Master HTTPS to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at HTTPS.',
    whyItMatters: 'Understanding HTTPS is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of HTTPS before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of HTTPS.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of HTTPS', explanation: 'Let\'s look at a simple example demonstrating HTTPS in action.', code: 'console.log("Initializing HTTPS...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing HTTPS...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with HTTPS', explanation: 'A practical example showing a real-world coding scenario using HTTPS.', code: 'function demonstrate() {\n  console.log("Running HTTPS flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running HTTPS flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check HTTPS setup', problem: 'Write a function testSetup() that returns the string "HTTPS OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "HTTPS OK"; }' }
  ],
  interview: [
    { q: 'Why is HTTPS important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to HTTPS in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of HTTPS?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm24-ssl-tls',
  module: 24,
  title: 'SSL/TLS',
  tagline: 'Master SSL/TLS to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at SSL/TLS.',
    whyItMatters: 'Understanding SSL/TLS is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of SSL/TLS before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of SSL/TLS.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of SSL/TLS', explanation: 'Let\'s look at a simple example demonstrating SSL/TLS in action.', code: 'console.log("Initializing SSL/TLS...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing SSL/TLS...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with SSL/TLS', explanation: 'A practical example showing a real-world coding scenario using SSL/TLS.', code: 'function demonstrate() {\n  console.log("Running SSL/TLS flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running SSL/TLS flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check SSL/TLS setup', problem: 'Write a function testSetup() that returns the string "SSL/TLS OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "SSL/TLS OK"; }' }
  ],
  interview: [
    { q: 'Why is SSL/TLS important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to SSL/TLS in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of SSL/TLS?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm24-cookies',
  module: 24,
  title: 'Cookies',
  tagline: 'Master Cookies to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Cookies.',
    whyItMatters: 'Understanding Cookies is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Cookies before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Cookies.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Cookies', explanation: 'Let\'s look at a simple example demonstrating Cookies in action.', code: 'console.log("Initializing Cookies...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Cookies...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Cookies', explanation: 'A practical example showing a real-world coding scenario using Cookies.', code: 'function demonstrate() {\n  console.log("Running Cookies flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Cookies flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Cookies setup', problem: 'Write a function testSetup() that returns the string "Cookies OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Cookies OK"; }' }
  ],
  interview: [
    { q: 'Why is Cookies important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Cookies in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Cookies?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm24-sessions',
  module: 24,
  title: 'Sessions',
  tagline: 'Master Sessions to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Sessions.',
    whyItMatters: 'Understanding Sessions is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Sessions before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Sessions.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Sessions', explanation: 'Let\'s look at a simple example demonstrating Sessions in action.', code: 'console.log("Initializing Sessions...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Sessions...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Sessions', explanation: 'A practical example showing a real-world coding scenario using Sessions.', code: 'function demonstrate() {\n  console.log("Running Sessions flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Sessions flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Sessions setup', problem: 'Write a function testSetup() that returns the string "Sessions OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Sessions OK"; }' }
  ],
  interview: [
    { q: 'Why is Sessions important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Sessions in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Sessions?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm24-browser-lifecycle',
  module: 24,
  title: 'Browser Lifecycle',
  tagline: 'Master Browser Lifecycle to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Browser Lifecycle.',
    whyItMatters: 'Understanding Browser Lifecycle is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Browser Lifecycle before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Browser Lifecycle.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Browser Lifecycle', explanation: 'Let\'s look at a simple example demonstrating Browser Lifecycle in action.', code: 'console.log("Initializing Browser Lifecycle...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Browser Lifecycle...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Browser Lifecycle', explanation: 'A practical example showing a real-world coding scenario using Browser Lifecycle.', code: 'function demonstrate() {\n  console.log("Running Browser Lifecycle flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Browser Lifecycle flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Browser Lifecycle setup', problem: 'Write a function testSetup() that returns the string "Browser Lifecycle OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Browser Lifecycle OK"; }' }
  ],
  interview: [
    { q: 'Why is Browser Lifecycle important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Browser Lifecycle in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Browser Lifecycle?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm24-request-response',
  module: 24,
  title: 'Request/Response',
  tagline: 'Master Request/Response to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Request/Response.',
    whyItMatters: 'Understanding Request/Response is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Request/Response before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Request/Response.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Request/Response', explanation: 'Let\'s look at a simple example demonstrating Request/Response in action.', code: 'console.log("Initializing Request/Response...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Request/Response...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Request/Response', explanation: 'A practical example showing a real-world coding scenario using Request/Response.', code: 'function demonstrate() {\n  console.log("Running Request/Response flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Request/Response flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Request/Response setup', problem: 'Write a function testSetup() that returns the string "Request/Response OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Request/Response OK"; }' }
  ],
  interview: [
    { q: 'Why is Request/Response important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Request/Response in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Request/Response?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm24-rest',
  module: 24,
  title: 'REST',
  tagline: 'Master REST to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at REST.',
    whyItMatters: 'Understanding REST is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of REST before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of REST.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of REST', explanation: 'Let\'s look at a simple example demonstrating REST in action.', code: 'console.log("Initializing REST...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing REST...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with REST', explanation: 'A practical example showing a real-world coding scenario using REST.', code: 'function demonstrate() {\n  console.log("Running REST flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running REST flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check REST setup', problem: 'Write a function testSetup() that returns the string "REST OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "REST OK"; }' }
  ],
  interview: [
    { q: 'Why is REST important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to REST in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of REST?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
