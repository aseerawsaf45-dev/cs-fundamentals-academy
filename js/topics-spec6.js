/* Specialization 6 — Firebase & Supabase */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }
if (!window.CSFA_RAW_TOPIC_TITLES) { window.CSFA_RAW_TOPIC_TITLES = {}; }

window.CSFA_RAW_TOPIC_TITLES['spec6-authentication'] = "Authentication";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-authentication', module: 106, title: "Authentication",
  tagline: "Master Authentication in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Authentication inside Firebase of Firebase & Supabase.",
    whyItMatters: "Understanding Authentication allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Authentication before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Authentication.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Authentication.", code: "console.log('Initializing Authentication...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Authentication...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Authentication', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Authentication" }
  ],
  exercises: [
    { level: 1, title: "Initialize Authentication", problem: "Write a function setup() that returns true when Authentication is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Authentication?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Authentication to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Authentication?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-firestore'] = "Firestore";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-firestore', module: 106, title: "Firestore",
  tagline: "Master Firestore in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Firestore inside Firebase of Firebase & Supabase.",
    whyItMatters: "Understanding Firestore allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Firestore before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Firestore.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Firestore.", code: "console.log('Initializing Firestore...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Firestore...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Firestore', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Firestore" }
  ],
  exercises: [
    { level: 1, title: "Initialize Firestore", problem: "Write a function setup() that returns true when Firestore is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Firestore?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Firestore to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Firestore?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-storage'] = "Storage";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-storage', module: 106, title: "Storage",
  tagline: "Master Storage in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Storage inside Firebase of Firebase & Supabase.",
    whyItMatters: "Understanding Storage allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Storage before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Storage.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Storage.", code: "console.log('Initializing Storage...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Storage...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Storage', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Storage" }
  ],
  exercises: [
    { level: 1, title: "Initialize Storage", problem: "Write a function setup() that returns true when Storage is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Storage?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Storage to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Storage?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-cloud-functions'] = "Cloud Functions";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-cloud-functions', module: 106, title: "Cloud Functions",
  tagline: "Master Cloud Functions in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Cloud Functions inside Firebase of Firebase & Supabase.",
    whyItMatters: "Understanding Cloud Functions allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Cloud Functions before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Cloud Functions.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Cloud Functions.", code: "console.log('Initializing Cloud Functions...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Cloud Functions...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Cloud Functions', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Cloud Functions" }
  ],
  exercises: [
    { level: 1, title: "Initialize Cloud Functions", problem: "Write a function setup() that returns true when Cloud Functions is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Cloud Functions?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Cloud Functions to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Cloud Functions?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-hosting'] = "Hosting";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-hosting', module: 106, title: "Hosting",
  tagline: "Master Hosting in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Hosting inside Firebase of Firebase & Supabase.",
    whyItMatters: "Understanding Hosting allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Hosting before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Hosting.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Hosting.", code: "console.log('Initializing Hosting...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Hosting...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Hosting', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Hosting" }
  ],
  exercises: [
    { level: 1, title: "Initialize Hosting", problem: "Write a function setup() that returns true when Hosting is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Hosting?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Hosting to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Hosting?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-push-notifications'] = "Push Notifications";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-push-notifications', module: 106, title: "Push Notifications",
  tagline: "Master Push Notifications in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Push Notifications inside Firebase of Firebase & Supabase.",
    whyItMatters: "Understanding Push Notifications allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Push Notifications before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Push Notifications.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Push Notifications.", code: "console.log('Initializing Push Notifications...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Push Notifications...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Push Notifications', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Push Notifications" }
  ],
  exercises: [
    { level: 1, title: "Initialize Push Notifications", problem: "Write a function setup() that returns true when Push Notifications is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Push Notifications?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Push Notifications to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Push Notifications?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-postgresql'] = "PostgreSQL";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-postgresql', module: 106, title: "PostgreSQL",
  tagline: "Master PostgreSQL in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of PostgreSQL inside Supabase of Firebase & Supabase.",
    whyItMatters: "Understanding PostgreSQL allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of PostgreSQL before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of PostgreSQL.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand PostgreSQL.", code: "console.log('Initializing PostgreSQL...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing PostgreSQL...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'PostgreSQL', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: PostgreSQL" }
  ],
  exercises: [
    { level: 1, title: "Initialize PostgreSQL", problem: "Write a function setup() that returns true when PostgreSQL is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of PostgreSQL?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage PostgreSQL to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of PostgreSQL?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-authentication'] = "Authentication";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-authentication', module: 106, title: "Authentication",
  tagline: "Master Authentication in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Authentication inside Supabase of Firebase & Supabase.",
    whyItMatters: "Understanding Authentication allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Authentication before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Authentication.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Authentication.", code: "console.log('Initializing Authentication...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Authentication...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Authentication', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Authentication" }
  ],
  exercises: [
    { level: 1, title: "Initialize Authentication", problem: "Write a function setup() that returns true when Authentication is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Authentication?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Authentication to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Authentication?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-storage'] = "Storage";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-storage', module: 106, title: "Storage",
  tagline: "Master Storage in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Storage inside Supabase of Firebase & Supabase.",
    whyItMatters: "Understanding Storage allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Storage before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Storage.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Storage.", code: "console.log('Initializing Storage...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Storage...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Storage', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Storage" }
  ],
  exercises: [
    { level: 1, title: "Initialize Storage", problem: "Write a function setup() that returns true when Storage is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Storage?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Storage to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Storage?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-edge-functions'] = "Edge Functions";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-edge-functions', module: 106, title: "Edge Functions",
  tagline: "Master Edge Functions in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Edge Functions inside Supabase of Firebase & Supabase.",
    whyItMatters: "Understanding Edge Functions allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Edge Functions before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Edge Functions.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Edge Functions.", code: "console.log('Initializing Edge Functions...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Edge Functions...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Edge Functions', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Edge Functions" }
  ],
  exercises: [
    { level: 1, title: "Initialize Edge Functions", problem: "Write a function setup() that returns true when Edge Functions is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Edge Functions?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Edge Functions to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Edge Functions?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-realtime'] = "Realtime";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-realtime', module: 106, title: "Realtime",
  tagline: "Master Realtime in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Realtime inside Supabase of Firebase & Supabase.",
    whyItMatters: "Understanding Realtime allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Realtime before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Realtime.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Realtime.", code: "console.log('Initializing Realtime...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Realtime...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Realtime', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Realtime" }
  ],
  exercises: [
    { level: 1, title: "Initialize Realtime", problem: "Write a function setup() that returns true when Realtime is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Realtime?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Realtime to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Realtime?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-row-level-security'] = "Row Level Security";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-row-level-security', module: 106, title: "Row Level Security",
  tagline: "Master Row Level Security in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Row Level Security inside Supabase of Firebase & Supabase.",
    whyItMatters: "Understanding Row Level Security allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Row Level Security before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Row Level Security.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Row Level Security.", code: "console.log('Initializing Row Level Security...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Row Level Security...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Row Level Security', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Row Level Security" }
  ],
  exercises: [
    { level: 1, title: "Initialize Row Level Security", problem: "Write a function setup() that returns true when Row Level Security is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Row Level Security?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Row Level Security to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Row Level Security?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-firebase-vs-supabase'] = "Firebase vs Supabase";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-firebase-vs-supabase', module: 106, title: "Firebase vs Supabase",
  tagline: "Master Firebase vs Supabase in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of Firebase vs Supabase inside Comparison of Firebase & Supabase.",
    whyItMatters: "Understanding Firebase vs Supabase allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of Firebase vs Supabase before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of Firebase vs Supabase.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand Firebase vs Supabase.", code: "console.log('Initializing Firebase vs Supabase...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing Firebase vs Supabase...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'Firebase vs Supabase', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: Firebase vs Supabase" }
  ],
  exercises: [
    { level: 1, title: "Initialize Firebase vs Supabase", problem: "Write a function setup() that returns true when Firebase vs Supabase is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of Firebase vs Supabase?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage Firebase vs Supabase to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of Firebase vs Supabase?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPIC_TITLES['spec6-when-to-choose-which'] = "When to Choose Which";
window.CSFA_RAW_TOPICS.push({
  id: 'spec6-when-to-choose-which', module: 106, title: "When to Choose Which",
  tagline: "Master When to Choose Which in the context of Firebase & Supabase.",
  readMinutes: 6,
  intro: {
    whatItIs: "An exploration of When to Choose Which inside Comparison of Firebase & Supabase.",
    whyItMatters: "Understanding When to Choose Which allows developers to build more efficient, scalable, and maintainable systems in real-world environments.",
    whereUsed: "Used across modern production ecosystems, SaaS architectures, cloud platforms, and developer workflows.",
    commonMistakes: "Failing to grasp the core concepts of When to Choose Which before diving into complex tooling."
  },
  visual: { caption: "Conceptual flow of When to Choose Which.", type: "text" },
  examples: [
    { difficulty: "easy", title: "Basic Setup", explanation: "How to initialize or understand When to Choose Which.", code: "console.log('Initializing When to Choose Which...');\nconst active = true;\nconsole.log('Status:', active);", language: "javascript", output: "Initializing When to Choose Which...\nStatus: true" },
    { difficulty: "medium", title: "Real-world Flow", explanation: "A practical implementation pattern.", code: "const data = { topic: 'When to Choose Which', status: 'Active' };\nfunction run(item) {\n  console.log('Processing:', item.topic);\n}\nrun(data);", language: "javascript", output: "Processing: When to Choose Which" }
  ],
  exercises: [
    { level: 1, title: "Initialize When to Choose Which", problem: "Write a function setup() that returns true when When to Choose Which is loaded.", hints: ["Return a boolean value."], solution: "function setup() { return true; }" }
  ],
  interview: [
    { q: "What is the primary benefit of When to Choose Which?", a: "It provides a reliable abstraction and structure to solve business logic or interface constraints efficiently." }
  ],
  realWorld: [
    { company: "Industry Standard", text: "Many top tech companies leverage When to Choose Which to scale their platforms and improve developer productivity." }
  ],
  quiz: [
    { q: "What is the main goal of When to Choose Which?", options: ["Simplify architecture", "Increase complexity", "Deploy without testing", "None of the above"], answer: 0 }
  ]
});

