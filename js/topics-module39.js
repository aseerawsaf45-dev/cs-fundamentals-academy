/* Modules 39–65: Remaining curriculum stub files with topic data */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

// Modules 39-40 content is in topics-module35.js (Git, Testing)
// Module 41 content is in topics-module36.js (React)
// Modules 42-43 content is in topics-module37.js (Node.js, SQL)

// MODULE 44 — NoSQL Databases
window.CSFA_RAW_TOPICS.push({
  id: 'm44-mongodb', module: 44, title: 'NoSQL — MongoDB & Document Databases',
  tagline: 'Schema-flexible JSON document storage — when relational tables don\'t fit.',
  readMinutes: 6,
  intro: {
    whatItIs: "MongoDB stores data as BSON (Binary JSON) documents in collections (not tables). Schema-less — each document can have different fields. Supports nested objects and arrays natively. Query language uses JSON-like operators: $match, $project, $group (aggregation pipeline).",
    whyItMatters: "Many real-world data doesn't fit neatly into tables — product catalogs with varying attributes, user-generated content, event logs. MongoDB is the most popular NoSQL database used in the MERN stack.",
    whereUsed: "Content management systems, product catalogs, user profiles, real-time analytics, event logs, chat applications, IoT data. MongoDB Atlas is the managed cloud service.",
    commonMistakes: "Treating MongoDB like a relational database. Embedding vs referencing: embed data that's always queried together; reference (use ObjectId) for data queried independently. Over-embedding causes bloated documents and write amplification."
  },
  visual: { caption: "Collection: [{_id, name, tags:[...], address:{...}}] — nested documents, flexible schema", type: "mongodb-doc" },
  examples: [
    { difficulty: "very-easy", title: "Document structure", explanation: "MongoDB documents are JSON objects with an _id field.", code: "const userDoc = {\n  _id: '507f1f77bcf86cd799439011',\n  name: 'Alice',\n  email: 'alice@example.com',\n  tags: ['admin', 'developer'],\n  address: { city: 'New York', country: 'US' },\n  createdAt: new Date().toISOString(),\n};\nconsole.log('Document:', JSON.stringify(userDoc, null, 2).slice(0, 150) + '...');", language: "javascript", output: "Document: {\n  \"_id\": \"507f1f77bcf86cd799439011\",\n  \"name\": \"Alice\",\n  \"email\": \"alice@example.com\",\n  \"tags\": [\n    \"admin\",\n    \"developer\"\n  ],\n  \"address\": {..." },
    { difficulty: "easy", title: "SQL vs MongoDB mapping", explanation: "Translating SQL concepts to MongoDB equivalents.", code: "const mapping = [\n  { sql: 'Table',       mongo: 'Collection' },\n  { sql: 'Row',         mongo: 'Document' },\n  { sql: 'Column',      mongo: 'Field' },\n  { sql: 'JOIN',        mongo: '$lookup (aggregation)' },\n  { sql: 'PRIMARY KEY', mongo: '_id (ObjectId)' },\n  { sql: 'INDEX',       mongo: 'Index (same concept)' },\n];\nmapping.forEach(m => console.log(`${m.sql.padEnd(12)} → ${m.mongo}`));", language: "javascript", output: "Table        → Collection\nRow          → Document\nColumn       → Field\nJOIN         → $lookup (aggregation)\nPRIMARY KEY  → _id (ObjectId)\nINDEX        → Index (same concept)" },
    { difficulty: "medium", title: "MongoDB query operators", explanation: "MongoDB queries use operators like $gt, $in, $regex to filter documents.", code: "const products = [\n  { name: 'Laptop', price: 999, category: 'Electronics', inStock: true },\n  { name: 'Book',   price: 15,  category: 'Education',   inStock: true },\n  { name: 'Phone',  price: 699, category: 'Electronics', inStock: false },\n];\n// Simulate: db.products.find({ category: 'Electronics', price: { $lt: 800 } })\nconst result = products.filter(p => p.category === 'Electronics' && p.price < 800);\nconsole.log('Query result:', result.map(p => p.name));", language: "javascript", output: "Query result: [ 'Phone' ]" },
    { difficulty: "medium-plus", title: "Aggregation pipeline", explanation: "MongoDB aggregation pipeline: chain stages to transform and analyze data.", code: "const orders = [\n  { user: 'Alice', product: 'Laptop', amount: 999 },\n  { user: 'Bob',   product: 'Book',   amount: 15 },\n  { user: 'Alice', product: 'Phone',  amount: 699 },\n];\n// db.orders.aggregate([{$group:{_id:'$user', total:{$sum:'$amount'}}}])\nconst grouped = Object.values(orders.reduce((acc, o) => {\n  (acc[o.user] = acc[o.user] || { _id: o.user, total: 0 }).total += o.amount;\n  return acc;\n}, {}));\nconsole.log('Aggregation:', JSON.stringify(grouped));", language: "javascript", output: "Aggregation: [{\"_id\":\"Alice\",\"total\":1698},{\"_id\":\"Bob\",\"total\":15}]" },
    { difficulty: "hard", title: "Embedding vs referencing", explanation: "Embed when data is always queried together. Reference with ObjectId when queried separately.", code: "// EMBED: post with comments always loaded together\nconst embeddedPost = {\n  _id: 'post1', title: 'Hello World',\n  comments: [\n    { user: 'Alice', text: 'Great post!', date: '2024-01-01' },\n    { user: 'Bob', text: 'Thanks!', date: '2024-01-02' },\n  ]\n};\n// REFERENCE: user profile loaded separately from posts\nconst referencedPost = {\n  _id: 'post2', title: 'Another Post',\n  authorId: '507f1f77bcf86cd799439011', // reference to users collection\n};\nconsole.log('Embedded (always together):', embeddedPost.comments.length, 'comments');\nconsole.log('Referenced (separate query):', 'authorId:', referencedPost.authorId);", language: "javascript", output: "Embedded (always together): 2 comments\nReferenced (separate query): authorId: 507f1f77bcf86cd799439011" },
    { difficulty: "real-world", title: "Mongoose schema with validation", explanation: "Mongoose adds schemas to MongoDB for type safety and validation in Node.js.", code: "// Mongoose schema definition (conceptual)\nconst userSchemaDefinition = {\n  name:  { type: 'String', required: true, trim: true },\n  email: { type: 'String', required: true, unique: true, lowercase: true },\n  role:  { type: 'String', enum: ['user', 'admin'], default: 'user' },\n  age:   { type: 'Number', min: 0, max: 150 },\n  createdAt: { type: 'Date', default: 'Date.now' },\n};\nObject.entries(userSchemaDefinition).forEach(([field, def]) =>\n  console.log(`${field.padEnd(10)}: ${JSON.stringify(def)}`));", language: "javascript", output: "name      : {\"type\":\"String\",\"required\":true,\"trim\":true}\nemail     : {\"type\":\"String\",\"required\":true,\"unique\":true,\"lowercase\":true}\nrole      : {\"type\":\"String\",\"enum\":[\"user\",\"admin\"],\"default\":\"user\"}\nage       : {\"type\":\"Number\",\"min\":0,\"max\":150}\ncreatedAt : {\"type\":\"Date\",\"default\":\"Date.now\"}" }
  ],
  exercises: [
    { level: 1, title: "Document filter", problem: "Simulate `find(collection, query)` where query is `{field: value}`. Filter an array of objects matching all query fields.", hints: ["Use .filter() with Object.entries(query).every(([k,v]) => doc[k]===v)."], solution: "function find(coll,query){return coll.filter(doc=>Object.entries(query).every(([k,v])=>doc[k]===v));}\nconsole.log(find([{name:'Alice',role:'admin'},{name:'Bob',role:'user'}],{role:'admin'}));" },
    { level: 2, title: "Aggregation: sum by group", problem: "Write `groupSum(docs, groupField, sumField)` simulating MongoDB's $group $sum aggregation.", hints: ["reduce into an object keyed by groupField, summing sumField values."], solution: "function groupSum(docs,g,s){const r={};docs.forEach(d=>{r[d[g]]=(r[d[g]]||0)+d[s];});return Object.entries(r).map(([k,v])=>({_id:k,total:v}));}\nconsole.log(groupSum([{cat:'A',v:10},{cat:'B',v:5},{cat:'A',v:20}],'cat','v'));" },
    { level: 3, title: "Embed vs reference decision", problem: "Write `shouldEmbed(alwaysTogether, docSize)` returning true if the data should be embedded (always queried together AND doc size < 1000 bytes), false (use reference) otherwise.", hints: ["return alwaysTogether && docSize < 1000."], solution: "const shouldEmbed=(together,size)=>together&&size<1000;\nconsole.log(shouldEmbed(true,500),shouldEmbed(true,2000),shouldEmbed(false,100));" }
  ],
  interview: [
    { q: "When would you choose MongoDB over PostgreSQL?", a: "Choose MongoDB when: (1) Schema varies per document (product catalog with different attributes). (2) You need to store hierarchical/nested data that maps naturally to JSON. (3) Horizontal scaling (sharding) is a priority. Choose PostgreSQL when you need ACID transactions, complex joins, or strict schema enforcement." },
    { q: "What is the MongoDB aggregation pipeline?", a: "A sequence of processing stages that transform documents: $match (filter), $group (aggregate/count), $project (reshape), $sort, $limit, $lookup (join). Each stage's output is the next stage's input. More powerful than simple queries for analytics." },
    { q: "What is the difference between embed and reference in MongoDB?", a: "Embed nested documents when data is always queried together and has bounded size (e.g., post with its tags). Reference with ObjectId when data is queried independently, frequently updated, or could grow unboundedly (e.g., user's posts)." }
  ],
  realWorld: [
    { company: "MongoDB Atlas", text: "MongoDB Atlas (fully managed cloud MongoDB) powers apps for companies like Toyota, Forbes, and Lyft. Atlas Search adds full-text search, Atlas Charts adds BI dashboards — all on the same document data model." },
    { company: "MERN Stack", text: "MongoDB is the M in MERN (MongoDB, Express, React, Node). The entire stack uses JavaScript and JSON, making it easy to share data shapes from database schema to API to frontend component props." }
  ],
  quiz: [
    { q: "What is a MongoDB collection equivalent to in SQL?", options: ["Row", "Column", "Table", "Database"], answer: 2 },
    { q: "What operator filters by 'greater than' in MongoDB?", options: ["$gt", ">", "where >", "$gte only"], answer: 0 },
    { q: "When should you embed documents rather than reference?", options: ["When data is frequently updated separately", "When data is always queried together", "When documents exceed 16MB", "When using SQL joins"], answer: 1 },
    { q: "What does MongoDB's aggregation $group stage do?", options: ["Filters documents", "Groups documents by a field and computes aggregates", "Sorts results", "Joins collections"], answer: 1 },
    { q: "What unique field does every MongoDB document have?", options: ["id", "_id", "uuid", "objectid"], answer: 1 }
  ]
});

// MODULE 45 — Redis & Caching
window.CSFA_RAW_TOPICS.push({
  id: 'm45-redis', module: 45, title: 'Redis & Caching Strategies',
  tagline: 'In-memory data store — caching, sessions, queues, pub/sub, and rate limiting.',
  readMinutes: 6,
  intro: {
    whatItIs: "Redis is an in-memory key-value data store with persistence options. Speed: sub-millisecond reads/writes vs ~10ms for SSD databases. Data structures: strings, hashes, lists, sets, sorted sets. Used for caching (reduce DB load), session storage, rate limiting, pub/sub messaging, and queues.",
    whyItMatters: "Database queries are often the bottleneck. Caching frequently-read, rarely-changed data in Redis can reduce DB load by 90%+ and cut API response times from ~100ms to ~1ms. Redis is a standard part of production backend architecture.",
    whereUsed: "API response caching, session storage, rate limiting (sliding window), real-time leaderboards (sorted sets), job queues (BullMQ), pub/sub (chat, notifications).",
    commonMistakes: "Cache invalidation bugs — serving stale data after updates. Strategy: cache-aside (read-through) or event-driven invalidation. Also: not setting TTL on cached values, causing memory bloat."
  },
  visual: { caption: "Request → Check Redis cache → HIT: return cached data | MISS: DB query → cache → return", type: "cache-flow" },
  examples: [
    { difficulty: "very-easy", title: "Cache-aside pattern", explanation: "Read from cache first; on miss, read from DB and populate cache.", code: "const cache = new Map();\nconst db = { getUser: id => ({ id, name: `User${id}`, email: `u${id}@x.com` }) };\n\nasync function getUser(id) {\n  if (cache.has(id)) { console.log('Cache HIT'); return cache.get(id); }\n  console.log('Cache MISS — querying DB');\n  const user = db.getUser(id);\n  cache.set(id, user);\n  return user;\n}\nawait getUser(1);\nawait getUser(1);", language: "javascript", output: "Cache MISS — querying DB\nCache HIT" },
    { difficulty: "easy", title: "TTL-based cache", explanation: "Cached values should expire (TTL) to prevent serving stale data.", code: "class TTLCache {\n  constructor() { this.store = new Map(); }\n  set(key, value, ttlMs) {\n    this.store.set(key, { value, expires: Date.now() + ttlMs });\n  }\n  get(key) {\n    const entry = this.store.get(key);\n    if (!entry) return null;\n    if (Date.now() > entry.expires) { this.store.delete(key); return null; }\n    return entry.value;\n  }\n}\nconst cache = new TTLCache();\ncache.set('user:1', { name: 'Alice' }, 100); // 100ms TTL\nconsole.log('Immediate:', cache.get('user:1')?.name);\nawait new Promise(r => setTimeout(r, 150));\nconsole.log('After TTL:', cache.get('user:1'));", language: "javascript", output: "Immediate: Alice\nAfter TTL: null" },
    { difficulty: "medium", title: "Cache invalidation strategies", explanation: "Three main strategies for keeping cache fresh when data changes.", code: "const strategies = [\n  { name: 'TTL (time-based)',    desc: 'Cache expires after N seconds. Simple but serves stale data.' },\n  { name: 'Write-through',       desc: 'Update cache on every DB write. Always fresh, higher write cost.' },\n  { name: 'Event invalidation',  desc: 'Delete cache key when underlying data changes. Most accurate.' },\n];\nstrategies.forEach(s => console.log(`${s.name}:\\n  ${s.desc}`));", language: "javascript", output: "TTL (time-based):\n  Cache expires after N seconds. Simple but serves stale data.\nWrite-through:\n  Update cache on every DB write. Always fresh, higher write cost.\nEvent invalidation:\n  Delete cache key when underlying data changes. Most accurate." },
    { difficulty: "medium-plus", title: "Rate limiting with sliding window", explanation: "Redis sorted sets implement sliding window rate limiting efficiently.", code: "class RateLimiter {\n  constructor(limit, windowMs) {\n    this.limit = limit; this.windowMs = windowMs;\n    this.requests = new Map(); // key: userId, value: timestamp array\n  }\n  isAllowed(userId) {\n    const now = Date.now();\n    const window = this.requests.get(userId) || [];\n    const inWindow = window.filter(t => now - t < this.windowMs);\n    if (inWindow.length >= this.limit) return false;\n    this.requests.set(userId, [...inWindow, now]);\n    return true;\n  }\n}\nconst rl = new RateLimiter(3, 1000);\n['req1','req2','req3','req4'].forEach(r =>\n  console.log(r, rl.isAllowed('user1') ? '✓ allowed' : '✗ blocked'));", language: "javascript", output: "req1 ✓ allowed\nreq2 ✓ allowed\nreq3 ✓ allowed\nreq4 ✗ blocked" },
    { difficulty: "hard", title: "Redis sorted set (leaderboard)", explanation: "Redis sorted sets maintain elements with scores — perfect for real-time leaderboards.", code: "class SortedSet {\n  constructor() { this.data = new Map(); }\n  zadd(key, score, member) { this.data.set(member, score); }\n  zrange() { return [...this.data.entries()].sort((a,b)=>b[1]-a[1]).map(([m,s])=>({member:m,score:s})); }\n}\nconst leaderboard = new SortedSet();\n[['Alice',1500],['Bob',2200],['Charlie',1800],['Dave',900]].forEach(([n,s])=>leaderboard.zadd('lb',s,n));\nleaderboard.zrange().forEach((e,i)=>console.log(`#${i+1} ${e.member}: ${e.score}`));", language: "javascript", output: "#1 Bob: 2200\n#2 Charlie: 1800\n#3 Alice: 1500\n#4 Dave: 900" },
    { difficulty: "real-world", title: "BullMQ job queue", explanation: "Redis-backed job queues process work asynchronously — email sending, image resizing, report generation.", code: "class JobQueue {\n  constructor() { this.queue = []; this.processing = false; }\n  add(job) { this.queue.push({ id: Date.now(), ...job, status: 'waiting' }); }\n  async process(handler) {\n    while (this.queue.length) {\n      const job = this.queue.shift();\n      job.status = 'active';\n      console.log(`Processing job: ${job.type}`);\n      await handler(job);\n      job.status = 'completed';\n      console.log(`Completed: ${job.type}`);\n    }\n  }\n}\nconst q = new JobQueue();\nq.add({ type: 'send-email', to: 'alice@x.com' });\nq.add({ type: 'resize-image', file: 'avatar.jpg' });\nawait q.process(async job => { await new Promise(r=>setTimeout(r,1)); });", language: "javascript", output: "Processing job: send-email\nCompleted: send-email\nProcessing job: resize-image\nCompleted: resize-image" }
  ],
  exercises: [
    { level: 1, title: "Simple cache", problem: "Implement `createCache()` returning an object with `get(key)` and `set(key, value)` using a Map.", hints: ["const m=new Map(); return {get:k=>m.get(k), set:(k,v)=>m.set(k,v)};"], solution: "function createCache(){const m=new Map();return{get:k=>m.get(k),set:(k,v)=>m.set(k,v)};}\nconst c=createCache();c.set('x',42);console.log(c.get('x'));" },
    { level: 2, title: "Cache wrapper", problem: "Write `memoize(fn)` that caches the result of fn by its first argument. Return cached result on subsequent calls with same argument.", hints: ["const cache=new Map(); check cache.has(arg) before calling fn."], solution: "function memoize(fn){const c=new Map();return arg=>{if(!c.has(arg))c.set(arg,fn(arg));return c.get(arg);};}\nconst sq=memoize(n=>{console.log('computing');return n*n;});\nconsole.log(sq(5),sq(5));" },
    { level: 3, title: "Rate limiter", problem: "Write `createRateLimiter(limit, windowMs)` returning an `isAllowed(id)` function. Max `limit` calls per `windowMs` per id.", hints: ["Map of id→timestamps array. Filter timestamps within window, check length."], solution: "function createRateLimiter(limit,windowMs){const m=new Map();return id=>{const now=Date.now(),ts=(m.get(id)||[]).filter(t=>now-t<windowMs);m.set(id,[...ts,now]);return ts.length<limit;};}\nconst rl=createRateLimiter(2,1000);console.log(rl('u'),rl('u'),rl('u'));" }
  ],
  interview: [
    { q: "What is cache invalidation and why is it hard?", a: "Cache invalidation means removing or updating cached data when the source data changes. It's hard because: distributed systems may update data from multiple services, invalidation must be atomic, and timing gaps between DB update and cache invalidation cause momentary staleness. Phil Karlton: 'There are only two hard things in CS: cache invalidation and naming things.'" },
    { q: "What are Redis data structures and when would you use each?", a: "String: simple key-value. Hash: object fields (user profile). List: ordered sequences (activity feed). Set: unique members (online users). Sorted Set: scored members (leaderboard, rate limiting). HyperLogLog: approximate unique counts (page views)." },
    { q: "What is a job queue and why use Redis for it?", a: "A job queue decouples producers (API that accepts request) from workers (processes that execute tasks). Redis persistence + atomic operations make it ideal for queues. BullMQ (built on Redis) provides: job priorities, retry with backoff, delayed jobs, rate limiting, and job progress tracking." }
  ],
  realWorld: [
    { company: "Twitter", text: "Twitter uses Redis for timeline caching, storing the most recent tweets for active users. A cache miss triggers fanout — writing new tweets to the Redis timelines of all followers asynchronously." },
    { company: "Vercel / Next.js", text: "Vercel uses Redis (via Upstash) for edge rate limiting in Next.js middleware. Requests hitting the edge are rate-limited per IP using Redis atomic increment operations before reaching the origin server." }
  ],
  quiz: [
    { q: "What is a cache HIT?", options: ["Cache empty", "Requested data found in cache", "Cache error", "Database query succeeded"], answer: 1 },
    { q: "What does TTL stand for in caching?", options: ["Total Transfer Level", "Time-To-Live", "Typed Token Limit", "Transfer Token Length"], answer: 1 },
    { q: "Which Redis data structure is ideal for leaderboards?", options: ["String", "List", "Sorted Set", "Hash"], answer: 2 },
    { q: "What problem does a job queue solve?", options: ["Database indexing", "Decoupling fast producers from slow workers", "HTTP routing", "CSS caching"], answer: 1 },
    { q: "What is cache-aside pattern?", options: ["Cache is always populated on write", "App checks cache first; on miss queries DB and populates cache", "Cache mirrors all DB operations", "DB pushes updates to cache"], answer: 1 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm39-callbacks',
  module: 39,
  title: 'Callbacks',
  tagline: 'Master Callbacks to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Callbacks.',
    whyItMatters: 'Understanding Callbacks is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Callbacks before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Callbacks.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Callbacks', explanation: 'Let\'s look at a simple example demonstrating Callbacks in action.', code: 'console.log("Initializing Callbacks...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Callbacks...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Callbacks', explanation: 'A practical example showing a real-world coding scenario using Callbacks.', code: 'function demonstrate() {\n  console.log("Running Callbacks flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Callbacks flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Callbacks setup', problem: 'Write a function testSetup() that returns the string "Callbacks OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Callbacks OK"; }' }
  ],
  interview: [
    { q: 'Why is Callbacks important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Callbacks in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Callbacks?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm39-promises',
  module: 39,
  title: 'Promises',
  tagline: 'Master Promises to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Promises.',
    whyItMatters: 'Understanding Promises is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Promises before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Promises.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Promises', explanation: 'Let\'s look at a simple example demonstrating Promises in action.', code: 'console.log("Initializing Promises...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Promises...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Promises', explanation: 'A practical example showing a real-world coding scenario using Promises.', code: 'function demonstrate() {\n  console.log("Running Promises flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Promises flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Promises setup', problem: 'Write a function testSetup() that returns the string "Promises OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Promises OK"; }' }
  ],
  interview: [
    { q: 'Why is Promises important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Promises in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Promises?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm39-async-await',
  module: 39,
  title: 'Async/Await',
  tagline: 'Master Async/Await to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Async/Await.',
    whyItMatters: 'Understanding Async/Await is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Async/Await before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Async/Await.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Async/Await', explanation: 'Let\'s look at a simple example demonstrating Async/Await in action.', code: 'console.log("Initializing Async/Await...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Async/Await...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Async/Await', explanation: 'A practical example showing a real-world coding scenario using Async/Await.', code: 'function demonstrate() {\n  console.log("Running Async/Await flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Async/Await flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Async/Await setup', problem: 'Write a function testSetup() that returns the string "Async/Await OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Async/Await OK"; }' }
  ],
  interview: [
    { q: 'Why is Async/Await important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Async/Await in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Async/Await?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm39-fetch-api',
  module: 39,
  title: 'Fetch API',
  tagline: 'Master Fetch API to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Fetch API.',
    whyItMatters: 'Understanding Fetch API is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Fetch API before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Fetch API.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Fetch API', explanation: 'Let\'s look at a simple example demonstrating Fetch API in action.', code: 'console.log("Initializing Fetch API...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Fetch API...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Fetch API', explanation: 'A practical example showing a real-world coding scenario using Fetch API.', code: 'function demonstrate() {\n  console.log("Running Fetch API flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Fetch API flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Fetch API setup', problem: 'Write a function testSetup() that returns the string "Fetch API OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Fetch API OK"; }' }
  ],
  interview: [
    { q: 'Why is Fetch API important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Fetch API in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Fetch API?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
