/* ==========================================================================
   TOPIC CONTENT DATA — Module 17: Computer Memory
   ========================================================================== */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm17-stack-memory',
  module: 17,
  title: 'Stack vs Heap Memory',
  tagline: 'The two regions every program uses — and why getting them confused crashes programs.',
  readMinutes: 7,
  intro: {
    whatItIs: "Programs use two primary memory regions: the Stack and the Heap. The stack is a region of memory that grows and shrinks automatically as functions are called and return. It stores local variables, function parameters, and return addresses in a strict LIFO (last-in, first-out) order. The heap is a large pool of memory where dynamically allocated objects live — managed explicitly (C/C++) or by a garbage collector (JavaScript, Python).",
    whyItMatters: "Stack overflows occur when recursion is too deep. Memory leaks occur when heap objects are allocated but never freed. Understanding stack vs heap explains why closures capture references, why pass-by-value differs from pass-by-reference, and how garbage collection works.",
    whereUsed: "Stack: local variables, function call frames, recursion. Heap: objects, arrays, closures, dynamically sized data structures in every programming language.",
    commonMistakes: "Creating circular references that prevent garbage collection (especially with event listeners and closures holding references to DOM elements), causing memory leaks in long-running applications."
  },
  visual: { caption: "Stack grows downward (function calls), Heap grows upward (dynamic objects). Stack overflow crashes; heap leak grows silently.", type: "memory-layout" },
  examples: [
    { difficulty: "very-easy", title: "Stack frame simulation", explanation: "Each function call pushes a frame onto the call stack. Returns pop it off.", code: "function outer() {\n  console.log('outer: entered');\n  inner();\n  console.log('outer: inner returned');\n}\nfunction inner() {\n  console.log('inner: entered');\n  console.log('inner: returning');\n}\nouter();", language: "javascript", output: "outer: entered\ninner: entered\ninner: returning\nouter: inner returned" },
    { difficulty: "easy", title: "Stack overflow from infinite recursion", explanation: "Calling a function recursively without a base case fills the call stack until it crashes.", code: "function countDown(n) {\n  if (n < 0) return; // base case prevents overflow\n  // Without this check, infinite recursion → stack overflow\n  countDown(n - 1);\n}\ntry {\n  countDown(10000); // safe with base case\n  console.log('Completed safely');\n} catch(e) {\n  console.log('Stack overflow:', e.message);\n}", language: "javascript", output: "Completed safely" },
    { difficulty: "medium", title: "Objects live on the heap", explanation: "Primitive values (numbers, booleans) live on the stack. Objects and arrays are allocated on the heap; variables hold references.", code: "let a = 5;         // primitive — value copied\nlet b = a;         // b gets its own copy\nb = 99;\nconsole.log('a:', a, '(unchanged)'); // 5\n\nlet obj1 = { x: 5 };  // object on heap\nlet obj2 = obj1;       // both point to same object\nobj2.x = 99;\nconsole.log('obj1.x:', obj1.x, '(changed!)'); // 99", language: "javascript", output: "a: 5 (unchanged)\nobj1.x: 99 (changed!)" },
    { difficulty: "medium-plus", title: "Closure capturing heap reference", explanation: "Closures keep a reference to the heap-allocated scope of the enclosing function alive even after it returns.", code: "function makeCounter() {\n  let count = 0; // lives on heap (captured by closure)\n  return () => ++count;\n}\nconst counter = makeCounter(); // outer fn returned, but count survives\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3", language: "javascript", output: "1\n2\n3" },
    { difficulty: "hard", title: "Detecting memory leaks with WeakRef", explanation: "WeakRef holds a reference without preventing garbage collection — useful for detecting when objects are collected.", code: "let obj = { data: 'important' };\nconst ref = new WeakRef(obj);\nconsole.log('Before GC:', ref.deref()?.data); // 'important'\n// In a real environment, nulling obj allows GC:\n// obj = null; // after GC, ref.deref() → undefined\nconsole.log('WeakRef.deref():', ref.deref()?.data);", language: "javascript", output: "Before GC: important\nWeakRef.deref(): important" },
    { difficulty: "real-world", title: "Preventing event listener memory leaks", explanation: "Adding event listeners without removing them on component teardown is a common memory leak in SPAs.", code: "class Component {\n  constructor(el) {\n    this.el = el;\n    this.handler = () => console.log('clicked');\n    this.el.addEventListener('click', this.handler);\n  }\n  destroy() {\n    // CRITICAL: remove listener to allow GC\n    this.el.removeEventListener('click', this.handler);\n    console.log('Listener removed, component can be GCd');\n  }\n}\nconst btn = { addEventListener: ()=>{}, removeEventListener: ()=>{} };\nconst c = new Component(btn);\nc.destroy();", language: "javascript", output: "Listener removed, component can be GCd" }
  ],
  exercises: [
    { level: 1, title: "Pass by value vs reference", problem: "Write code that demonstrates: (1) changing a number variable `b` after assigning `b = a` does NOT change `a`, and (2) changing a property of an object `obj2` after assigning `obj2 = obj1` DOES change `obj1`.", hints: ["Primitives copy the value.", "Objects copy the reference."], solution: "let a = 10; let b = a; b = 20; console.log(a); // 10\nlet o1 = {v:10}; let o2 = o1; o2.v = 20; console.log(o1.v); // 20" },
    { level: 2, title: "Counter closure", problem: "Write `makeCounter(start)` that returns a function. Each call to the returned function increments an internal counter (starting at `start`) and returns the new value.", hints: ["Use closure to capture count.", "Return a function that increments and returns count."], solution: "function makeCounter(start) {\n  let count = start;\n  return () => ++count;\n}\nconst c = makeCounter(5);\nconsole.log(c(), c(), c()); // 6 7 8" },
    { level: 3, title: "Max call stack depth", problem: "Write a function `maxDepth()` that recursively calls itself until a stack overflow occurs. Catch the RangeError and print the approximate stack depth reached.", hints: ["Use a counter parameter.", "Wrap the initial call in try/catch."], solution: "function maxDepth(n = 0) { return maxDepth(n + 1); }\ntry { maxDepth(); } catch(e) { console.log('Stack error:', e.message.slice(0,30)); }" }
  ],
  interview: [
    { q: "What is a stack overflow?", a: "A stack overflow occurs when the call stack exceeds its maximum size, typically due to infinite or excessively deep recursion. Each function call pushes a new frame; with no base case, frames accumulate until memory runs out and the runtime throws a RangeError or crashes." },
    { q: "What is a memory leak?", a: "A memory leak occurs when heap-allocated memory is no longer needed but is never freed (or garbage collected). In JavaScript this happens when references to objects are kept alive unintentionally — e.g., global variables, closures, or event listeners that are never removed." },
    { q: "What is garbage collection?", a: "Garbage collection is an automatic memory management strategy where the runtime periodically identifies heap objects that are no longer reachable from any active reference and reclaims their memory. JavaScript uses mark-and-sweep GC — it traces reachable objects from root references and collects the rest." }
  ],
  realWorld: [
    { company: "Chrome / V8", text: "V8's garbage collector uses generational GC — most short-lived objects are collected quickly in the 'young generation' space. Objects that survive multiple GC cycles are promoted to 'old generation', preventing frequent collection pauses." },
    { company: "Node.js", text: "Node.js server processes running for days can accumulate memory leaks from unremoved event listeners or accumulated closures. Tools like node --inspect and heapdump are used to capture heap snapshots and identify leaking objects in production." }
  ],
  quiz: [
    { q: "What memory region holds local function variables?", options: ["Heap", "Stack", "ROM", "Cache"], answer: 1 },
    { q: "What happens when recursion has no base case?", options: ["Heap overflow", "Stack overflow", "Memory leak", "Garbage collection"], answer: 1 },
    { q: "Where do JavaScript objects live?", options: ["Stack", "Registers", "Heap", "ROM"], answer: 2 },
    { q: "What causes a memory leak in JavaScript?", options: ["Using let instead of var", "Keeping unneeded references alive", "Too many function calls", "Using async/await"], answer: 1 },
    { q: "What does garbage collection do?", options: ["Deletes unused variables from source code", "Reclaims unreachable heap memory automatically", "Clears the call stack", "Compresses files"], answer: 1 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm17-ram',
  module: 17,
  title: 'RAM',
  tagline: 'Master RAM to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at RAM.',
    whyItMatters: 'Understanding RAM is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of RAM before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of RAM.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of RAM', explanation: 'Let\'s look at a simple example demonstrating RAM in action.', code: 'console.log("Initializing RAM...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing RAM...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with RAM', explanation: 'A practical example showing a real-world coding scenario using RAM.', code: 'function demonstrate() {\n  console.log("Running RAM flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running RAM flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check RAM setup', problem: 'Write a function testSetup() that returns the string "RAM OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "RAM OK"; }' }
  ],
  interview: [
    { q: 'Why is RAM important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to RAM in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of RAM?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm17-rom',
  module: 17,
  title: 'ROM',
  tagline: 'Master ROM to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at ROM.',
    whyItMatters: 'Understanding ROM is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of ROM before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of ROM.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of ROM', explanation: 'Let\'s look at a simple example demonstrating ROM in action.', code: 'console.log("Initializing ROM...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing ROM...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with ROM', explanation: 'A practical example showing a real-world coding scenario using ROM.', code: 'function demonstrate() {\n  console.log("Running ROM flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running ROM flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check ROM setup', problem: 'Write a function testSetup() that returns the string "ROM OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "ROM OK"; }' }
  ],
  interview: [
    { q: 'Why is ROM important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to ROM in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of ROM?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm17-cache',
  module: 17,
  title: 'Cache',
  tagline: 'Master Cache to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Cache.',
    whyItMatters: 'Understanding Cache is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Cache before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Cache.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Cache', explanation: 'Let\'s look at a simple example demonstrating Cache in action.', code: 'console.log("Initializing Cache...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Cache...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Cache', explanation: 'A practical example showing a real-world coding scenario using Cache.', code: 'function demonstrate() {\n  console.log("Running Cache flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Cache flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Cache setup', problem: 'Write a function testSetup() that returns the string "Cache OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Cache OK"; }' }
  ],
  interview: [
    { q: 'Why is Cache important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Cache in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Cache?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm17-registers-mem',
  module: 17,
  title: 'Registers',
  tagline: 'Master Registers to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Registers.',
    whyItMatters: 'Understanding Registers is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Registers before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Registers.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Registers', explanation: 'Let\'s look at a simple example demonstrating Registers in action.', code: 'console.log("Initializing Registers...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Registers...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Registers', explanation: 'A practical example showing a real-world coding scenario using Registers.', code: 'function demonstrate() {\n  console.log("Running Registers flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Registers flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Registers setup', problem: 'Write a function testSetup() that returns the string "Registers OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Registers OK"; }' }
  ],
  interview: [
    { q: 'Why is Registers important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Registers in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Registers?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm17-heap-memory',
  module: 17,
  title: 'Heap Memory',
  tagline: 'Master Heap Memory to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Heap Memory.',
    whyItMatters: 'Understanding Heap Memory is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Heap Memory before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Heap Memory.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Heap Memory', explanation: 'Let\'s look at a simple example demonstrating Heap Memory in action.', code: 'console.log("Initializing Heap Memory...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Heap Memory...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Heap Memory', explanation: 'A practical example showing a real-world coding scenario using Heap Memory.', code: 'function demonstrate() {\n  console.log("Running Heap Memory flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Heap Memory flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Heap Memory setup', problem: 'Write a function testSetup() that returns the string "Heap Memory OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Heap Memory OK"; }' }
  ],
  interview: [
    { q: 'Why is Heap Memory important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Heap Memory in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Heap Memory?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm17-virtual-memory',
  module: 17,
  title: 'Virtual Memory',
  tagline: 'Master Virtual Memory to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Virtual Memory.',
    whyItMatters: 'Understanding Virtual Memory is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Virtual Memory before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Virtual Memory.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Virtual Memory', explanation: 'Let\'s look at a simple example demonstrating Virtual Memory in action.', code: 'console.log("Initializing Virtual Memory...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Virtual Memory...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Virtual Memory', explanation: 'A practical example showing a real-world coding scenario using Virtual Memory.', code: 'function demonstrate() {\n  console.log("Running Virtual Memory flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Virtual Memory flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Virtual Memory setup', problem: 'Write a function testSetup() that returns the string "Virtual Memory OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Virtual Memory OK"; }' }
  ],
  interview: [
    { q: 'Why is Virtual Memory important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Virtual Memory in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Virtual Memory?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm17-memory-allocation',
  module: 17,
  title: 'Memory Allocation',
  tagline: 'Master Memory Allocation to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Memory Allocation.',
    whyItMatters: 'Understanding Memory Allocation is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Memory Allocation before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Memory Allocation.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Memory Allocation', explanation: 'Let\'s look at a simple example demonstrating Memory Allocation in action.', code: 'console.log("Initializing Memory Allocation...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Memory Allocation...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Memory Allocation', explanation: 'A practical example showing a real-world coding scenario using Memory Allocation.', code: 'function demonstrate() {\n  console.log("Running Memory Allocation flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Memory Allocation flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Memory Allocation setup', problem: 'Write a function testSetup() that returns the string "Memory Allocation OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Memory Allocation OK"; }' }
  ],
  interview: [
    { q: 'Why is Memory Allocation important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Memory Allocation in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Memory Allocation?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm17-garbage-collection',
  module: 17,
  title: 'Garbage Collection',
  tagline: 'Master Garbage Collection to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Garbage Collection.',
    whyItMatters: 'Understanding Garbage Collection is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Garbage Collection before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Garbage Collection.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Garbage Collection', explanation: 'Let\'s look at a simple example demonstrating Garbage Collection in action.', code: 'console.log("Initializing Garbage Collection...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Garbage Collection...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Garbage Collection', explanation: 'A practical example showing a real-world coding scenario using Garbage Collection.', code: 'function demonstrate() {\n  console.log("Running Garbage Collection flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Garbage Collection flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Garbage Collection setup', problem: 'Write a function testSetup() that returns the string "Garbage Collection OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Garbage Collection OK"; }' }
  ],
  interview: [
    { q: 'Why is Garbage Collection important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Garbage Collection in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Garbage Collection?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
