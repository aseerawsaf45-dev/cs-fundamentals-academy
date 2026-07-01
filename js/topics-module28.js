/* Module 28 — Functions Deep Dive */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }
window.CSFA_RAW_TOPICS.push({
  id: 'm28-recursion-fn', module: 28, title: 'Functions, Scope & Recursion',
  tagline: 'The fundamental unit of reusable logic — parameters, scope, closures, and recursion.',
  readMinutes: 7,
  intro: {
    whatItIs: "A function is a named, reusable block of code that accepts parameters, performs work, and optionally returns a value. Scope determines where variables are accessible. Recursion is when a function calls itself — solving problems by breaking them into smaller versions of the same problem. Every recursive function needs a base case to terminate.",
    whyItMatters: "Functions are the primary tool of abstraction in programming. Scope bugs are common — understanding lexical scope, closures, and the call stack prevents 'variable not defined' errors and subtle state bugs. Recursion enables elegant solutions to tree traversal, parsing, and divide-and-conquer algorithms.",
    whereUsed: "Functions: everywhere. Scope: React hooks depend on closure scope. Recursion: file system traversal, parsing nested JSON, tree algorithms, Fibonacci sequences, merge sort.",
    commonMistakes: "Recursion without a base case (infinite loop → stack overflow). Also, off-by-one errors in base cases. Always identify: What is the simplest input? What should the function return for it?"
  },
  visual: { caption: "factorial(4) → 4 × factorial(3) → 3 × factorial(2) → 2 × factorial(1) → 1 (base case)", type: "recursion-tree" },
  examples: [
    { difficulty: "very-easy", title: "Function declaration vs expression", explanation: "Functions can be declared (hoisted) or expressed (not hoisted).", code: "// Declaration: hoisted\nfunction add(a, b) { return a + b; }\n// Expression: not hoisted\nconst multiply = (a, b) => a * b;\n// Arrow: concise, no own 'this'\nconst square = n => n * n;\nconsole.log(add(3, 4), multiply(3, 4), square(5));", language: "javascript", output: "7 12 25" },
    { difficulty: "easy", title: "Default parameters", explanation: "Default parameters provide fallback values when arguments are omitted.", code: "function greet(name = 'World', greeting = 'Hello') {\n  return `${greeting}, ${name}!`;\n}\nconsole.log(greet());\nconsole.log(greet('Alice'));\nconsole.log(greet('Bob', 'Hi'));", language: "javascript", output: "Hello, World!\nHello, Alice!\nHi, Bob!" },
    { difficulty: "medium", title: "Lexical scope chain", explanation: "Inner functions have access to variables from all enclosing (outer) scopes.", code: "const globalVar = 'global';\nfunction outer() {\n  const outerVar = 'outer';\n  function inner() {\n    const innerVar = 'inner';\n    // Can access all: inner + outer + global\n    console.log(innerVar, outerVar, globalVar);\n  }\n  inner();\n}\nouter();", language: "javascript", output: "inner outer global" },
    { difficulty: "medium-plus", title: "Recursion: factorial", explanation: "Factorial(n) = n × factorial(n-1). Base case: factorial(0) = 1.", code: "function factorial(n) {\n  if (n <= 1) return 1;     // base case\n  return n * factorial(n-1); // recursive case\n}\n[0,1,5,10].forEach(n => console.log(`${n}! = ${factorial(n)}`));", language: "javascript", output: "0! = 1\n1! = 1\n5! = 120\n10! = 3628800" },
    { difficulty: "hard", title: "Memoized recursion", explanation: "Cache recursive results to avoid redundant computation (dynamic programming basis).", code: "function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n}\nconst fib = memoize(function(n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n});\nconsole.log(fib(10), fib(20), fib(40));", language: "javascript", output: "55 6765 102334155" },
    { difficulty: "real-world", title: "Tree traversal with recursion", explanation: "Recursion is the natural solution for traversing nested structures like file trees or JSON.", code: "const fileTree = {\n  name: 'src', children: [\n    { name: 'components', children: [\n      { name: 'Button.jsx', children: [] },\n      { name: 'Input.jsx', children: [] }\n    ]},\n    { name: 'index.js', children: [] }\n  ]\n};\nfunction listFiles(node, path='') {\n  const current = path + node.name;\n  if (!node.children.length) console.log(current);\n  else node.children.forEach(c => listFiles(c, current + '/'));\n}\nlistFiles(fileTree);", language: "javascript", output: "src/components/Button.jsx\nsrc/components/Input.jsx\nsrc/index.js" }
  ],
  exercises: [
    { level: 1, title: "Sum with default", problem: "Write `sum(a, b=0, c=0)` returning a+b+c. Test with (1), (1,2), (1,2,3).", hints: ["Use default parameters."], solution: "function sum(a,b=0,c=0){return a+b+c;}\nconsole.log(sum(1),sum(1,2),sum(1,2,3));" },
    { level: 2, title: "Fibonacci recursive", problem: "Write `fib(n)` returning the nth Fibonacci number (fib(0)=0, fib(1)=1).", hints: ["Base case n<=1 return n. Recursive: return fib(n-1)+fib(n-2)."], solution: "function fib(n){if(n<=1)return n;return fib(n-1)+fib(n-2);}\nconsole.log(fib(0),fib(1),fib(7),fib(10));" },
    { level: 3, title: "Flatten nested array", problem: "Write `flatten(arr)` that recursively flattens nested arrays: [[1,[2]],[3]] → [1,2,3].", hints: ["Check Array.isArray for each item. Recursively flatten arrays, push primitives."], solution: "function flatten(arr){return arr.reduce((flat,item)=>flat.concat(Array.isArray(item)?flatten(item):[item]),[]);}\nconsole.log(flatten([[1,[2,3]],[4,[5,[6]]]])); // [1,2,3,4,5,6]" }
  ],
  interview: [
    { q: "What is a closure?", a: "A closure is a function that retains access to variables from its outer (enclosing) scope even after the outer function has returned. The inner function 'closes over' those variables, keeping them alive in memory." },
    { q: "What is tail recursion?", a: "Tail recursion is when the recursive call is the last operation in the function — there's nothing left to do after it returns. Some engines optimize tail recursion to avoid growing the call stack (TCO). JavaScript spec includes TCO but few engines implement it." },
    { q: "When should you use recursion vs iteration?", a: "Use recursion for naturally recursive problems: tree/graph traversal, parsing nested structures, divide-and-conquer. Use iteration for simple linear problems — it's faster and doesn't risk stack overflow. Memoization bridges the two for recursive algorithms with overlapping subproblems." }
  ],
  realWorld: [
    { company: "React", text: "React's rendering is recursive — a component renders its children, which render their children, forming a tree traversal exactly like the fileTree example. React Fiber rewrote this recursion to be interruptible using the event loop." },
    { company: "JSON.parse", text: "JSON parsing is inherently recursive — objects contain arrays which contain objects. The parser must recursively descend nested structures. Understanding recursion is key to building parsers, compilers, and interpreters." }
  ],
  quiz: [
    { q: "What is required in every recursive function?", options: ["A for loop", "A base case to stop recursion", "At least two parameters", "A return type annotation"], answer: 1 },
    { q: "What is a closure?", options: ["A function that calls itself", "A function with access to its outer scope's variables", "A closed-source library", "A function without parameters"], answer: 1 },
    { q: "What does factorial(5) equal?", options: ["25", "120", "15", "100"], answer: 1 },
    { q: "What happens without a base case in recursion?", options: ["Returns undefined", "Runs once", "Stack overflow", "Runs in parallel"], answer: 2 },
    { q: "Which function type does NOT have its own 'this'?", options: ["function declaration", "function expression", "Arrow function", "Generator function"], answer: 2 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm28-params-args',
  module: 28,
  title: 'Parameters & Arguments',
  tagline: 'Master Parameters & Arguments to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Parameters & Arguments.',
    whyItMatters: 'Understanding Parameters & Arguments is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Parameters & Arguments before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Parameters & Arguments.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Parameters & Arguments', explanation: 'Let\'s look at a simple example demonstrating Parameters & Arguments in action.', code: 'console.log("Initializing Parameters & Arguments...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Parameters & Arguments...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Parameters & Arguments', explanation: 'A practical example showing a real-world coding scenario using Parameters & Arguments.', code: 'function demonstrate() {\n  console.log("Running Parameters & Arguments flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Parameters & Arguments flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Parameters & Arguments setup', problem: 'Write a function testSetup() that returns the string "Parameters & Arguments OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Parameters & Arguments OK"; }' }
  ],
  interview: [
    { q: 'Why is Parameters & Arguments important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Parameters & Arguments in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Parameters & Arguments?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm28-return-values',
  module: 28,
  title: 'Return Values',
  tagline: 'Master Return Values to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Return Values.',
    whyItMatters: 'Understanding Return Values is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Return Values before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Return Values.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Return Values', explanation: 'Let\'s look at a simple example demonstrating Return Values in action.', code: 'console.log("Initializing Return Values...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Return Values...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Return Values', explanation: 'A practical example showing a real-world coding scenario using Return Values.', code: 'function demonstrate() {\n  console.log("Running Return Values flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Return Values flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Return Values setup', problem: 'Write a function testSetup() that returns the string "Return Values OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Return Values OK"; }' }
  ],
  interview: [
    { q: 'Why is Return Values important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Return Values in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Return Values?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm28-scope-fn',
  module: 28,
  title: 'Scope',
  tagline: 'Master Scope to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Scope.',
    whyItMatters: 'Understanding Scope is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Scope before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Scope.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Scope', explanation: 'Let\'s look at a simple example demonstrating Scope in action.', code: 'console.log("Initializing Scope...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Scope...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Scope', explanation: 'A practical example showing a real-world coding scenario using Scope.', code: 'function demonstrate() {\n  console.log("Running Scope flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Scope flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Scope setup', problem: 'Write a function testSetup() that returns the string "Scope OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Scope OK"; }' }
  ],
  interview: [
    { q: 'Why is Scope important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Scope in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Scope?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
