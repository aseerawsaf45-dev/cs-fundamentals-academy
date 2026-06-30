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
