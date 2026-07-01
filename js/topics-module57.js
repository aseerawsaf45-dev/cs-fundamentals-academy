/* ==========================================================================
   TOPIC CONTENT DATA — Module 57: Time & Space Complexity
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm57-big-o',
  module: 57,
  title: 'Big-O Notation',
  tagline: 'Master Big-O Notation to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Big-O Notation.',
    whyItMatters: 'Understanding Big-O Notation is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Big-O Notation before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Big-O Notation.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Big-O Notation', explanation: 'Let\'s look at a simple example demonstrating Big-O Notation in action.', code: 'console.log("Initializing Big-O Notation...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Big-O Notation...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Big-O Notation', explanation: 'A practical example showing a real-world coding scenario using Big-O Notation.', code: 'function demonstrate() {\n  console.log("Running Big-O Notation flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Big-O Notation flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Big-O Notation setup', problem: 'Write a function testSetup() that returns the string "Big-O Notation OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Big-O Notation OK"; }' }
  ],
  interview: [
    { q: 'Why is Big-O Notation important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Big-O Notation in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Big-O Notation?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm57-omega-theta',
  module: 57,
  title: 'Ω and Θ Notation',
  tagline: 'Master Ω and Θ Notation to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Ω and Θ Notation.',
    whyItMatters: 'Understanding Ω and Θ Notation is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Ω and Θ Notation before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Ω and Θ Notation.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Ω and Θ Notation', explanation: 'Let\'s look at a simple example demonstrating Ω and Θ Notation in action.', code: 'console.log("Initializing Ω and Θ Notation...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Ω and Θ Notation...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Ω and Θ Notation', explanation: 'A practical example showing a real-world coding scenario using Ω and Θ Notation.', code: 'function demonstrate() {\n  console.log("Running Ω and Θ Notation flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Ω and Θ Notation flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Ω and Θ Notation setup', problem: 'Write a function testSetup() that returns the string "Ω and Θ Notation OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Ω and Θ Notation OK"; }' }
  ],
  interview: [
    { q: 'Why is Ω and Θ Notation important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Ω and Θ Notation in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Ω and Θ Notation?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm57-amortized',
  module: 57,
  title: 'Amortized Analysis',
  tagline: 'Master Amortized Analysis to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Amortized Analysis.',
    whyItMatters: 'Understanding Amortized Analysis is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Amortized Analysis before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Amortized Analysis.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Amortized Analysis', explanation: 'Let\'s look at a simple example demonstrating Amortized Analysis in action.', code: 'console.log("Initializing Amortized Analysis...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Amortized Analysis...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Amortized Analysis', explanation: 'A practical example showing a real-world coding scenario using Amortized Analysis.', code: 'function demonstrate() {\n  console.log("Running Amortized Analysis flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Amortized Analysis flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Amortized Analysis setup', problem: 'Write a function testSetup() that returns the string "Amortized Analysis OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Amortized Analysis OK"; }' }
  ],
  interview: [
    { q: 'Why is Amortized Analysis important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Amortized Analysis in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Amortized Analysis?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm57-space-complexity',
  module: 57,
  title: 'Space Complexity',
  tagline: 'Master Space Complexity to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Space Complexity.',
    whyItMatters: 'Understanding Space Complexity is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Space Complexity before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Space Complexity.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Space Complexity', explanation: 'Let\'s look at a simple example demonstrating Space Complexity in action.', code: 'console.log("Initializing Space Complexity...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Space Complexity...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Space Complexity', explanation: 'A practical example showing a real-world coding scenario using Space Complexity.', code: 'function demonstrate() {\n  console.log("Running Space Complexity flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Space Complexity flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Space Complexity setup', problem: 'Write a function testSetup() that returns the string "Space Complexity OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Space Complexity OK"; }' }
  ],
  interview: [
    { q: 'Why is Space Complexity important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Space Complexity in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Space Complexity?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
