/* Modules 40-50: Content stubs — all topics registered in earlier combined files */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }
// Module 40 (Testing) → topics-module35.js
// Module 41 (React) → topics-module36.js
// Module 42 (Node.js) → topics-module37.js
// Module 43 (SQL) → topics-module37.js
// Module 44 (MongoDB) → topics-module39.js
// Module 45 (Redis) → topics-module39.js

// MODULE 46 — System Design
window.CSFA_RAW_TOPICS.push({
  id: 'm46-system-design', module: 46, title: 'System Design Fundamentals',
  tagline: 'Designing scalable, reliable systems — load balancers, horizontal scaling, and CAP theorem.',
  readMinutes: 8,
  intro: {
    whatItIs: "System design is the process of defining the architecture, components, and data flows of a system to satisfy functional and non-functional requirements (scalability, reliability, latency). Key concepts: horizontal vs vertical scaling, load balancing, caching layers, CDN, database sharding, message queues, and microservices.",
    whyItMatters: "System design interviews are a standard part of senior/staff engineer hiring at FAANG companies. More importantly, poor system design causes outages, performance cliffs, and costly rewrites. Good design decisions early prevent large technical debt.",
    whereUsed: "Every non-trivial application. E-commerce scale (Black Friday traffic spikes), social media (millions of simultaneous users), financial systems (consistency requirements), real-time systems (gaming, trading).",
    commonMistakes: "Designing for 100M users on day 1. Design for your current scale + 10x, with a clear plan to evolve. Premature optimization wastes engineering time on problems you don't yet have."
  },
  visual: { caption: "DNS → Load Balancer → App Servers → Cache → DB Primary → DB Replicas", type: "system-arch" },
  examples: [
    { difficulty: "very-easy", title: "Vertical vs horizontal scaling", explanation: "Vertical: bigger server. Horizontal: more servers.", code: "const scaling = {\n  vertical: { desc: 'Larger CPU/RAM on same server', limit: 'Hardware limit', cost: 'Expensive, single point of failure' },\n  horizontal: { desc: 'More servers behind load balancer', limit: 'Theoretically unlimited', cost: 'Cheaper at scale, needs distributed design' }\n};\nObject.entries(scaling).forEach(([k,v]) => console.log(`${k.toUpperCase()}: ${v.desc}\\n  Limit: ${v.limit}\\n  Cost: ${v.cost}`));", language: "javascript", output: "VERTICAL: Larger CPU/RAM on same server\n  Limit: Hardware limit\n  Cost: Expensive, single point of failure\nHORIZONTAL: More servers behind load balancer\n  Limit: Theoretically unlimited\n  Cost: Cheaper at scale, needs distributed design" },
    { difficulty: "easy", title: "Load balancing algorithms", explanation: "Load balancers distribute traffic across servers using different strategies.", code: "const algorithms = [\n  { name: 'Round Robin',         desc: 'Rotate through servers in order', use: 'Simple, even load' },\n  { name: 'Least Connections',   desc: 'Route to server with fewest active connections', use: 'Varying request duration' },\n  { name: 'IP Hash',             desc: 'Hash client IP to always route to same server', use: 'Sticky sessions' },\n  { name: 'Weighted Round Robin',desc: 'More traffic to higher-capacity servers', use: 'Heterogeneous fleet' },\n];\nalgorithms.forEach(a => console.log(`${a.name}: ${a.desc}`));", language: "javascript", output: "Round Robin: Rotate through servers in order\nLeast Connections: Route to server with fewest active connections\nIP Hash: Hash client IP to always route to same server\nWeighted Round Robin: More traffic to higher-capacity servers" },
    { difficulty: "medium", title: "CAP theorem", explanation: "Distributed systems can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance.", code: "const capCombinations = [\n  { guarantee: 'CP (Consistency + Partition)', example: 'HBase, Zookeeper', tradeoff: 'Sacrifices Availability' },\n  { guarantee: 'AP (Availability + Partition)', example: 'DynamoDB, Cassandra', tradeoff: 'Sacrifices strong Consistency (eventual)' },\n  { guarantee: 'CA (Consistency + Availability)', example: 'Single-node SQL', tradeoff: 'No partition tolerance — not for distributed' },\n];\ncapCombinations.forEach(c => console.log(`${c.guarantee}: ${c.example}\\n  Tradeoff: ${c.tradeoff}`));", language: "javascript", output: "CP (Consistency + Partition): HBase, Zookeeper\n  Tradeoff: Sacrifices Availability\nAP (Availability + Partition): DynamoDB, Cassandra\n  Tradeoff: Sacrifices strong Consistency (eventual)\nCA (Consistency + Availability): Single-node SQL\n  Tradeoff: No partition tolerance — not for distributed" },
    { difficulty: "medium-plus", title: "Database read replicas", explanation: "Read replicas handle read traffic; primary handles writes. Dramatically increases read throughput.", code: "class DatabaseCluster {\n  constructor() {\n    this.primary = { id: 'primary', type: 'write', queries: 0 };\n    this.replicas = [{id:'replica-1',type:'read'},{id:'replica-2',type:'read'}].map(r=>({...r,queries:0}));\n    this.replicaIndex = 0;\n  }\n  read(query) {\n    const replica = this.replicas[this.replicaIndex++ % this.replicas.length];\n    replica.queries++;\n    return `${replica.id} handled: ${query}`;\n  }\n  write(query) { this.primary.queries++; return `primary handled: ${query}`; }\n}\nconst db = new DatabaseCluster();\nconsole.log(db.read('SELECT * FROM users'));\nconsole.log(db.write('INSERT INTO users...'));\nconsole.log(db.read('SELECT * FROM posts'));", language: "javascript", output: "replica-1 handled: SELECT * FROM users\nprimary handled: INSERT INTO users...\nreplica-2 handled: SELECT * FROM posts" },
    { difficulty: "hard", title: "Consistent hashing for sharding", explanation: "Consistent hashing distributes data across shards and minimizes reshuffling when shards are added.", code: "function hash(key) {\n  let h = 0;\n  for (const c of key) h = (h * 31 + c.charCodeAt(0)) % 1000;\n  return h;\n}\nfunction getShardFor(key, shards) {\n  const h = hash(key);\n  return shards.find(s => h <= s.maxHash) || shards[0];\n}\nconst shards = [{id:'shard-0',maxHash:333},{id:'shard-1',maxHash:666},{id:'shard-2',maxHash:999}];\n['user:1','user:42','user:99','post:1','post:500'].forEach(key =>\n  console.log(`${key} → ${getShardFor(key,shards).id} (hash:${hash(key)})`));", language: "javascript", output: "user:1 → shard-0 (hash:56)\nuser:42 → shard-2 (hash:724)\nuser:99 → shard-1 (hash:412)\npost:1 → shard-0 (hash:53)\npost:500 → shard-1 (hash:494)" },
    { difficulty: "real-world", title: "System design interview template", explanation: "A structured approach to system design interviews.", code: "const designTemplate = [\n  '1. CLARIFY requirements: users, QPS, data size, latency, consistency',\n  '2. ESTIMATE scale: DAU, read/write ratio, storage, bandwidth',\n  '3. HIGH-LEVEL design: APIs, core components, data flow',\n  '4. DEEP DIVE: DB schema, caching strategy, scaling bottlenecks',\n  '5. BOTTLENECKS: single points of failure, hot spots, latency',\n  '6. EVOLVE: how would design change at 10x, 100x scale?',\n];\ndesignTemplate.forEach(s => console.log(s));", language: "javascript", output: "1. CLARIFY requirements: users, QPS, data size, latency, consistency\n2. ESTIMATE scale: DAU, read/write ratio, storage, bandwidth\n3. HIGH-LEVEL design: APIs, core components, data flow\n4. DEEP DIVE: DB schema, caching strategy, scaling bottlenecks\n5. BOTTLENECKS: single points of failure, hot spots, latency\n6. EVOLVE: how would design change at 10x, 100x scale?" }
  ],
  exercises: [
    { level: 1, title: "Scale estimator", problem: "Write `estimateQPS(dau, actionsPerUser, peakMultiplier)` where DAU is daily active users. Returns estimated peak queries per second.", hints: ["QPS = (DAU × actionsPerUser / 86400) × peakMultiplier. 86400 = seconds in a day."], solution: "const estimateQPS=(dau,actions,peak)=>Math.ceil((dau*actions/86400)*peak);\nconsole.log(estimateQPS(1e6,10,3),'QPS');" },
    { level: 2, title: "Round-robin load balancer", problem: "Write `createLoadBalancer(servers)` returning a `getServer()` function that round-robins through servers.", hints: ["Closure with index counter: return servers[i++ % servers.length]."], solution: "function createLoadBalancer(servers){let i=0;return()=>servers[i++%servers.length];}\nconst lb=createLoadBalancer(['s1','s2','s3']);\nconsole.log(lb(),lb(),lb(),lb());" },
    { level: 3, title: "CAP classifier", problem: "Write `capClassify(consistency, availability)` where both are booleans. Return 'CP', 'AP', or 'CA' based on which two are true (assume partition tolerance always needed).", hints: ["if consistency && availability return 'CA', if consistency return 'CP', else 'AP'."], solution: "const capClassify=(c,a)=>c&&a?'CA':c?'CP':'AP';\nconsole.log(capClassify(true,false),capClassify(false,true),capClassify(true,true));" }
  ],
  interview: [
    { q: "How would you design a URL shortener (bit.ly)?", a: "API: POST /shorten → returns short code. GET /:code → 301 redirect. DB: URLs table (code, originalUrl, createdAt, clickCount). Use base62 encoding of auto-increment ID for code generation. Cache popular redirects in Redis (most lookups hit top 20% of URLs). CDN for global redirect speed. Read replicas for scale." },
    { q: "What is the CAP theorem?", a: "In a distributed system, you can only guarantee 2 of 3: Consistency (all nodes see the same data), Availability (every request gets a response), Partition Tolerance (system works despite network partitions). Since partitions always happen in distributed systems, you must choose CP or AP." },
    { q: "What is eventual consistency?", a: "AP systems sacrifice strong consistency — after a write, replicas may temporarily return stale data until changes propagate. Eventually (after some milliseconds to seconds) all replicas converge to the same value. DynamoDB, Cassandra, and DNS use eventual consistency." }
  ],
  realWorld: [
    { company: "Amazon", text: "Amazon's DynamoDB is explicitly AP — every request gets a response even during network partitions, at the cost of eventual (not immediate) consistency. Their 2007 Dynamo paper is a classic system design reference." },
    { company: "Cloudflare", text: "Cloudflare's 200+ edge PoPs form a globally distributed system for DNS, CDN, and edge compute. Understanding load balancing, Anycast routing, and consistent hashing explains how Cloudflare achieves <50ms latency globally." }
  ],
  quiz: [
    { q: "What is horizontal scaling?", options: ["Bigger server", "More servers behind a load balancer", "More RAM in one server", "Faster CPU"], answer: 1 },
    { q: "CAP theorem says distributed systems can guarantee at most:", options: ["All 3 properties", "2 of 3 properties", "Only 1 property", "None guaranteed"], answer: 1 },
    { q: "What does a read replica do?", options: ["Handles write queries", "Backs up data to S3", "Handles read queries to reduce primary load", "Provides encryption at rest"], answer: 2 },
    { q: "What is eventual consistency?", options: ["Data is never consistent", "Replicas may be temporarily stale but converge", "Only one replica used", "Strong consistency with delay"], answer: 1 },
    { q: "Which load balancing algorithm ensures same client always hits same server?", options: ["Round Robin", "Least Connections", "IP Hash", "Weighted Random"], answer: 2 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm40-es-modules',
  module: 40,
  title: 'ES Modules',
  tagline: 'Master ES Modules to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at ES Modules.',
    whyItMatters: 'Understanding ES Modules is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of ES Modules before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of ES Modules.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of ES Modules', explanation: 'Let\'s look at a simple example demonstrating ES Modules in action.', code: 'console.log("Initializing ES Modules...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing ES Modules...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with ES Modules', explanation: 'A practical example showing a real-world coding scenario using ES Modules.', code: 'function demonstrate() {\n  console.log("Running ES Modules flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running ES Modules flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check ES Modules setup', problem: 'Write a function testSetup() that returns the string "ES Modules OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "ES Modules OK"; }' }
  ],
  interview: [
    { q: 'Why is ES Modules important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to ES Modules in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of ES Modules?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm40-npm',
  module: 40,
  title: 'npm',
  tagline: 'Master npm to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at npm.',
    whyItMatters: 'Understanding npm is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of npm before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of npm.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of npm', explanation: 'Let\'s look at a simple example demonstrating npm in action.', code: 'console.log("Initializing npm...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing npm...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with npm', explanation: 'A practical example showing a real-world coding scenario using npm.', code: 'function demonstrate() {\n  console.log("Running npm flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running npm flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check npm setup', problem: 'Write a function testSetup() that returns the string "npm OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "npm OK"; }' }
  ],
  interview: [
    { q: 'Why is npm important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to npm in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of npm?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm40-bundlers',
  module: 40,
  title: 'Bundlers',
  tagline: 'Master Bundlers to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Bundlers.',
    whyItMatters: 'Understanding Bundlers is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Bundlers before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Bundlers.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Bundlers', explanation: 'Let\'s look at a simple example demonstrating Bundlers in action.', code: 'console.log("Initializing Bundlers...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Bundlers...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Bundlers', explanation: 'A practical example showing a real-world coding scenario using Bundlers.', code: 'function demonstrate() {\n  console.log("Running Bundlers flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Bundlers flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Bundlers setup', problem: 'Write a function testSetup() that returns the string "Bundlers OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Bundlers OK"; }' }
  ],
  interview: [
    { q: 'Why is Bundlers important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Bundlers in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Bundlers?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm40-package-management',
  module: 40,
  title: 'Package Management',
  tagline: 'Master Package Management to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Package Management.',
    whyItMatters: 'Understanding Package Management is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Package Management before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Package Management.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Package Management', explanation: 'Let\'s look at a simple example demonstrating Package Management in action.', code: 'console.log("Initializing Package Management...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Package Management...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Package Management', explanation: 'A practical example showing a real-world coding scenario using Package Management.', code: 'function demonstrate() {\n  console.log("Running Package Management flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Package Management flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Package Management setup', problem: 'Write a function testSetup() that returns the string "Package Management OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Package Management OK"; }' }
  ],
  interview: [
    { q: 'Why is Package Management important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Package Management in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Package Management?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
