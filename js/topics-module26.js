/* Module 26 — Programming Basics */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }
window.CSFA_RAW_TOPICS.push({
  id: 'm26-variables-constants', module: 26, title: 'Variables, Constants & Data Types',
  tagline: 'The atoms of every program — naming and storing values that drive all logic.',
  readMinutes: 5,
  intro: {
    whatItIs: "Variables are named storage locations that hold values which can change. Constants hold values that don't change after assignment. Every programming language has primitive data types: numbers, strings, booleans, null/undefined. Understanding types prevents conversion bugs and enables correct logic.",
    whyItMatters: "Type errors are one of the most common bugs. JavaScript is dynamically typed, so variables can hold any type — but that flexibility leads to subtle bugs. TypeScript adds static typing to prevent these issues.",
    whereUsed: "Every program ever written uses variables. Type awareness matters especially in JavaScript where '5' + 3 = '53' (string concatenation) but '5' - 3 = 2 (numeric subtraction).",
    commonMistakes: "Using var instead of let/const in modern JS. var has function scope and hoisting issues. Always use const by default; use let only when reassignment is needed; never use var."
  },
  visual: { caption: "Memory: variable name → address → value. const prevents reassignment, not mutation.", type: "variable-memory" },
  examples: [
    { difficulty: "very-easy", title: "let vs const vs var", explanation: "const for values that don't change, let for values that do, never var in modern code.", code: "const PI = 3.14159;   // cannot be reassigned\nlet count = 0;        // can be reassigned\ncount = 1;            // OK\nconsole.log('PI:', PI);\nconsole.log('count:', count);\n// const PI = 3; // TypeError: Assignment to constant variable", language: "javascript", output: "PI: 3.14159\ncount: 1" },
    { difficulty: "easy", title: "Primitive types", explanation: "JavaScript has 7 primitive types: number, string, boolean, null, undefined, Symbol, BigInt.", code: "console.log(typeof 42);          // number\nconsole.log(typeof 'hello');     // string\nconsole.log(typeof true);        // boolean\nconsole.log(typeof undefined);   // undefined\nconsole.log(typeof null);        // object (historical bug!)\nconsole.log(typeof Symbol());    // symbol\nconsole.log(typeof 42n);         // bigint", language: "javascript", output: "number\nstring\nboolean\nundefined\nobject\nsymbol\nbigint" },
    { difficulty: "medium", title: "Type coercion surprises", explanation: "JavaScript auto-converts types in operations — leading to famous quirks.", code: "console.log('5' + 3);    // '53' (string concat)\nconsole.log('5' - 3);    // 2   (numeric)\nconsole.log(true + 1);   // 2\nconsole.log(false + 1);  // 1\nconsole.log('' == false); // true (loose equality)\nconsole.log('' === false); // false (strict equality)", language: "javascript", output: "53\n2\n2\n1\ntrue\nfalse" },
    { difficulty: "medium-plus", title: "const with objects", explanation: "const prevents reassignment of the variable, but the object's properties can still change.", code: "const user = { name: 'Alice', age: 30 };\nuser.age = 31;     // OK — mutating property\nconsole.log('Age:', user.age);\n// user = {};      // TypeError — can't reassign const\n// Use Object.freeze() for truly immutable objects:\nconst frozen = Object.freeze({ x: 1 });\n// frozen.x = 99; // silently fails (or throws in strict mode)\nconsole.log('frozen.x:', frozen.x);", language: "javascript", output: "Age: 31\nfrozen.x: 1" },
    { difficulty: "hard", title: "Temporal Dead Zone (TDZ)", explanation: "let and const are hoisted but not initialized — accessing them before declaration throws ReferenceError.", code: "try {\n  console.log(x); // ReferenceError: TDZ\n  let x = 5;\n} catch(e) {\n  console.log('TDZ error:', e.constructor.name);\n}\n// var is hoisted AND initialized to undefined:\nconsole.log(y); // undefined (no error)\nvar y = 5;", language: "javascript", output: "TDZ error: ReferenceError\nundefined" },
    { difficulty: "real-world", title: "TypeScript type annotations", explanation: "TypeScript prevents type bugs at compile time by adding type annotations.", code: "// TypeScript equivalent (JS simulation):\nfunction add(a, b) {\n  if (typeof a !== 'number' || typeof b !== 'number')\n    throw new TypeError(`Expected numbers, got ${typeof a} and ${typeof b}`);\n  return a + b;\n}\ntry {\n  console.log(add(2, 3));    // 5\n  console.log(add('2', 3));  // throws\n} catch(e) { console.log(e.message); }", language: "javascript", output: "5\nExpected numbers, got string and number" }
  ],
  exercises: [
    { level: 1, title: "Typeof checker", problem: "Write `getType(val)` returning typeof val. Test with 42, 'hi', true, null, undefined.", hints: ["Use typeof operator."], solution: "const getType=v=>typeof v;\n[42,'hi',true,null,undefined].forEach(v=>console.log(v,':',getType(v)));" },
    { level: 2, title: "Safe number parser", problem: "Write `safeParseInt(str)` that returns the integer if str is a valid integer string, or null otherwise.", hints: ["Use parseInt and check for NaN with Number.isNaN."], solution: "function safeParseInt(s){const n=parseInt(s);return Number.isNaN(n)?null:n;}\nconsole.log(safeParseInt('42'),safeParseInt('abc'));" },
    { level: 3, title: "Type validator", problem: "Write `isValidUser(obj)` returning true if obj has name (string) and age (number >= 0).", hints: ["Check typeof obj.name==='string' and typeof obj.age==='number' && obj.age>=0."], solution: "function isValidUser(o){return typeof o.name==='string'&&typeof o.age==='number'&&o.age>=0;}\nconsole.log(isValidUser({name:'Alice',age:30}),isValidUser({name:'Bob',age:-1}));" }
  ],
  interview: [
    { q: "What is the difference between == and ===?", a: "== performs loose equality with type coercion (e.g., 0 == false is true). === is strict equality — no type conversion (0 === false is false). Always use === to avoid coercion surprises." },
    { q: "What is the Temporal Dead Zone?", a: "let and const declarations are hoisted to the top of their block but not initialized. Accessing them before the declaration line throws a ReferenceError. This 'dead zone' from block start to declaration is the Temporal Dead Zone." },
    { q: "Why use const by default?", a: "const signals intent — this binding should not be reassigned. It makes code easier to reason about and catches accidental reassignments. When you do need mutation, let explicitly signals that. This is a widely adopted best practice in modern JavaScript." }
  ],
  realWorld: [
    { company: "Airbnb", text: "Airbnb's JavaScript style guide mandates const for all declarations that don't need reassignment, and bans var entirely. Their open-source ESLint config enforces this across millions of lines of production code." },
    { company: "TypeScript (Microsoft)", text: "TypeScript was created largely to solve JavaScript's type coercion and dynamic typing issues. Over 60% of npm packages now ship TypeScript types, showing industry-wide adoption of static typing for safety." }
  ],
  quiz: [
    { q: "Which keyword creates a block-scoped variable that cannot be reassigned?", options: ["var", "let", "const", "static"], answer: 2 },
    { q: "What is typeof null?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], answer: 2 },
    { q: "What does '5' + 3 evaluate to in JavaScript?", options: ["8", "'8'", "'53'", "Error"], answer: 2 },
    { q: "What is the Temporal Dead Zone?", options: ["Deleted variables", "Period where let/const is hoisted but not yet initialized", "Function scope", "Async wait period"], answer: 1 },
    { q: "Which equality operator prevents type coercion?", options: ["==", "===", "!=", "="], answer: 1 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm26-data-types-prog',
  module: 26,
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
  id: 'm26-operators',
  module: 26,
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

window.CSFA_RAW_TOPICS.push({
  id: 'm26-expressions',
  module: 26,
  title: 'Expressions',
  tagline: 'Master Expressions to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Expressions.',
    whyItMatters: 'Understanding Expressions is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Expressions before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Expressions.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Expressions', explanation: 'Let\'s look at a simple example demonstrating Expressions in action.', code: 'console.log("Initializing Expressions...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Expressions...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Expressions', explanation: 'A practical example showing a real-world coding scenario using Expressions.', code: 'function demonstrate() {\n  console.log("Running Expressions flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Expressions flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Expressions setup', problem: 'Write a function testSetup() that returns the string "Expressions OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Expressions OK"; }' }
  ],
  interview: [
    { q: 'Why is Expressions important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Expressions in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Expressions?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm26-input-output',
  module: 26,
  title: 'Input & Output',
  tagline: 'Master Input & Output to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Input & Output.',
    whyItMatters: 'Understanding Input & Output is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Input & Output before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Input & Output.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Input & Output', explanation: 'Let\'s look at a simple example demonstrating Input & Output in action.', code: 'console.log("Initializing Input & Output...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Input & Output...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Input & Output', explanation: 'A practical example showing a real-world coding scenario using Input & Output.', code: 'function demonstrate() {\n  console.log("Running Input & Output flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Input & Output flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Input & Output setup', problem: 'Write a function testSetup() that returns the string "Input & Output OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Input & Output OK"; }' }
  ],
  interview: [
    { q: 'Why is Input & Output important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Input & Output in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Input & Output?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
