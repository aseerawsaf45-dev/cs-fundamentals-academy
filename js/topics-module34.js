/* Modules 34–38: CSS Animations, JS Advanced, OOP, Async, APIs */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

// MODULE 34 — stub (content merged into module33.js above)
// MODULE 35 — stub (content merged into module33.js above)

// MODULE 36 — Object-Oriented Programming
window.CSFA_RAW_TOPICS.push({
  id: 'm36-classes', module: 36, title: 'OOP — Classes, Inheritance & Encapsulation',
  tagline: 'Organizing code into objects with state and behavior — the pillars of OOP.',
  readMinutes: 7,
  intro: {
    whatItIs: "Object-Oriented Programming organizes code around objects that combine state (properties) and behavior (methods). The four pillars: Encapsulation (hiding internal state), Inheritance (child classes extend parents), Polymorphism (different objects respond to same interface), Abstraction (hiding complexity). JavaScript classes (ES6) are syntactic sugar over prototype chains.",
    whyItMatters: "OOP is fundamental to understanding most large codebases, frameworks (React classes, Angular, Java Spring), and design patterns. Even if you prefer functional programming, you'll read OOP code constantly.",
    whereUsed: "React class components, Angular services, NestJS controllers, Java/C# backends, game engines (Unity uses C# OOP), database models (Sequelize, TypeORM entities).",
    commonMistakes: "Overusing inheritance. Prefer composition over inheritance — building objects by combining small behaviors rather than deep inheritance hierarchies. The Gang of Four design patterns book warns against excessive inheritance."
  },
  visual: { caption: "class Animal → class Dog extends Animal. Encapsulation: #private. Polymorphism: speak().", type: "oop-hierarchy" },
  examples: [
    { difficulty: "very-easy", title: "Class with constructor", explanation: "ES6 class syntax for creating objects with shared methods.", code: "class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hi, I'm ${this.name}, aged ${this.age}.`;\n  }\n}\nconst alice = new Person('Alice', 30);\nconsole.log(alice.greet());\nconsole.log(alice instanceof Person);", language: "javascript", output: "Hi, I'm Alice, aged 30.\ntrue" },
    { difficulty: "easy", title: "Inheritance with extends", explanation: "Child class inherits all methods from parent; super() calls the parent constructor.", code: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} makes a sound.`; }\n}\nclass Dog extends Animal {\n  speak() { return `${this.name} barks!`; } // override\n}\nclass Cat extends Animal {\n  speak() { return `${this.name} meows!`; } // override\n}\n[new Dog('Rex'), new Cat('Whiskers')].forEach(a => console.log(a.speak()));", language: "javascript", output: "Rex barks!\nWhiskers meows!" },
    { difficulty: "medium", title: "Encapsulation with private fields", explanation: "Private fields (#) are truly private — inaccessible outside the class.", code: "class BankAccount {\n  #balance;\n  constructor(initial) { this.#balance = initial; }\n  deposit(amount) {\n    if (amount <= 0) throw new Error('Amount must be positive');\n    this.#balance += amount;\n  }\n  get balance() { return this.#balance; }\n}\nconst acc = new BankAccount(100);\nacc.deposit(50);\nconsole.log('Balance:', acc.balance);\nconsole.log('Private?', acc['#balance']); // undefined", language: "javascript", output: "Balance: 150\nPrivate?: undefined" },
    { difficulty: "medium-plus", title: "Polymorphism", explanation: "Different classes implementing the same interface — code works with any shape type.", code: "class Shape {\n  area() { throw new Error('area() not implemented'); }\n}\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r; }\n  area() { return Math.PI * this.r ** 2; }\n}\nclass Rectangle extends Shape {\n  constructor(w, h) { super(); this.w = w; this.h = h; }\n  area() { return this.w * this.h; }\n}\n[new Circle(5), new Rectangle(4, 6)].forEach(s =>\n  console.log(`${s.constructor.name}: ${s.area().toFixed(2)}`));", language: "javascript", output: "Circle: 78.54\nRectangle: 24.00" },
    { difficulty: "hard", title: "Static methods and singleton", explanation: "Static methods belong to the class, not instances. Used for factory methods and singletons.", code: "class Config {\n  static #instance;\n  #data = {};\n  static getInstance() {\n    if (!Config.#instance) Config.#instance = new Config();\n    return Config.#instance;\n  }\n  set(key, val) { this.#data[key] = val; }\n  get(key) { return this.#data[key]; }\n}\nconst c1 = Config.getInstance();\nconst c2 = Config.getInstance();\nc1.set('theme', 'dark');\nconsole.log('Same instance?', c1 === c2);\nconsole.log('theme:', c2.get('theme'));", language: "javascript", output: "Same instance?: true\ntheme: dark" },
    { difficulty: "real-world", title: "Composition over inheritance", explanation: "Build complex behavior by composing simple mixins rather than deep inheritance.", code: "const Serializable = Base => class extends Base {\n  serialize() { return JSON.stringify(this); }\n};\nconst Validatable = Base => class extends Base {\n  validate() { return Object.keys(this).length > 0; }\n};\nclass User { constructor(name) { this.name = name; } }\nclass FullUser extends Serializable(Validatable(User)) {}\nconst u = new FullUser('Alice');\nconsole.log('Valid:', u.validate());\nconsole.log('Serialized:', u.serialize());", language: "javascript", output: "Valid: true\nSerialized: {\"name\":\"Alice\"}" }
  ],
  exercises: [
    { level: 1, title: "Basic class", problem: "Create class `Rectangle(width, height)` with an `area()` method returning width×height and a `perimeter()` method.", hints: ["this.width, this.height in constructor."], solution: "class Rectangle{constructor(w,h){this.w=w;this.h=h;}area(){return this.w*this.h;}perimeter(){return 2*(this.w+this.h);}}\nconst r=new Rectangle(5,3);console.log(r.area(),r.perimeter());" },
    { level: 2, title: "Inheritance", problem: "Create class `Employee(name, salary)` extending `Person(name)`. Add `getSalary()` method and override `greet()` to include salary.", hints: ["extends Person, super(name), this.salary."], solution: "class Person{constructor(n){this.name=n;}greet(){return `Hi ${this.name}`;}}\nclass Employee extends Person{constructor(n,s){super(n);this.salary=s;}greet(){return `${super.greet()}, salary: ${this.salary}`;}\ngetSalary(){return this.salary;}}\nconst e=new Employee('Bob',50000);console.log(e.greet());" },
    { level: 3, title: "Singleton logger", problem: "Implement a `Logger` class with a static `getInstance()` and a `log(msg)` method that stores messages in an array. Verify two getInstance() calls return the same object.", hints: ["static #instance, check if null in getInstance."], solution: "class Logger{static #i;#logs=[];static getInstance(){return Logger.#i||(Logger.#i=new Logger());}log(m){this.#logs.push(m);}getLogs(){return this.#logs;}}\nconst l1=Logger.getInstance(),l2=Logger.getInstance();l1.log('test');console.log(l1===l2,l2.getLogs());" }
  ],
  interview: [
    { q: "What are the four pillars of OOP?", a: "Encapsulation (hiding internal state behind methods), Inheritance (child classes reuse parent behavior), Polymorphism (different types respond to the same interface differently), Abstraction (hiding complex implementation behind simple interfaces)." },
    { q: "What is the difference between class and prototype in JavaScript?", a: "JavaScript classes are syntactic sugar over prototype-based inheritance. When you write `class Dog extends Animal`, JavaScript sets up the prototype chain so Dog.prototype.__proto__ === Animal.prototype. Classes are just a cleaner syntax — the underlying mechanism is still prototypes." },
    { q: "Why prefer composition over inheritance?", a: "Deep inheritance creates tight coupling. A change in a base class can break all subclasses. Composition (mixing in behaviors as needed) is more flexible — you can combine any behaviors without committing to a hierarchy. Famous principle: 'Favor composition over inheritance' (Gang of Four)." }
  ],
  realWorld: [
    { company: "NestJS", text: "NestJS uses decorators and class-based OOP heavily — @Controller, @Injectable, @Module classes with inheritance. TypeScript and NestJS are a showcase of OOP in modern Node.js backends." },
    { company: "TypeORM", text: "TypeORM database entities are classes with decorators: @Entity(), @Column(), @PrimaryGeneratedColumn(). The ORM maps class instances to database rows, showing real-world OOP applied to data persistence." }
  ],
  quiz: [
    { q: "What keyword does a child class use to call the parent constructor?", options: ["parent()", "super()", "base()", "this.parent()"], answer: 1 },
    { q: "What is encapsulation?", options: ["Inheriting from parent", "Hiding internal state behind methods", "Running multiple instances", "Making methods static"], answer: 1 },
    { q: "What does polymorphism enable?", options: ["Private methods", "Different classes responding to same interface differently", "Faster code", "Singleton pattern"], answer: 1 },
    { q: "What are JavaScript classes syntactic sugar for?", options: ["Closures", "Prototype chains", "Modules", "Generators"], answer: 1 },
    { q: "What is the Singleton pattern?", options: ["Multiple instances of a class", "Ensuring only one instance of a class exists", "Static class methods", "Abstract base class"], answer: 1 }
  ]
});

// MODULE 37 — Async JavaScript
window.CSFA_RAW_TOPICS.push({
  id: 'm37-promises', module: 37, title: 'Promises & Async/Await',
  tagline: 'Handling asynchronous operations cleanly — the evolution from callbacks to async/await.',
  readMinutes: 7,
  intro: {
    whatItIs: "Asynchronous code handles operations that take time (network requests, file reads, timers) without blocking. Evolution: Callbacks → Promises → async/await. A Promise represents a value that will be available in the future. async/await is syntactic sugar over Promises, making async code look synchronous.",
    whyItMatters: "All real-world JavaScript involves async operations — fetch, database queries, file reads. Understanding Promises and async/await is essential for any JavaScript developer.",
    whereUsed: "Every API call (fetch/axios), database query (Mongoose, Prisma), file operation (fs.readFile), timer (setTimeout), third-party SDK call.",
    commonMistakes: "Forgetting to await async calls — the Promise is returned but never resolved. Forgetting to return in .then() chains. Using async functions inside forEach (doesn't await correctly — use for...of)."
  },
  visual: { caption: "Promise: pending → fulfilled (then) or rejected (catch). async fn returns Promise.", type: "promise-states" },
  examples: [
    { difficulty: "very-easy", title: "Creating a Promise", explanation: "Promises have three states: pending, fulfilled (resolved), rejected.", code: "const success = new Promise((resolve) => resolve(42));\nconst failure = new Promise((_, reject) => reject(new Error('Failed')));\nsuccess.then(v => console.log('Resolved:', v));\nfailure.catch(e => console.log('Rejected:', e.message));", language: "javascript", output: "Resolved: 42\nRejected: Failed" },
    { difficulty: "easy", title: "Promise chaining", explanation: "Each .then() returns a new Promise, enabling chainable async pipelines.", code: "Promise.resolve(1)\n  .then(n => n + 1)\n  .then(n => n * 10)\n  .then(n => `Result: ${n}`)\n  .then(console.log);", language: "javascript", output: "Result: 20" },
    { difficulty: "medium", title: "async/await syntax", explanation: "await pauses execution inside an async function until the Promise resolves.", code: "async function fetchUser(id) {\n  // Simulate API call\n  await new Promise(r => setTimeout(r, 10));\n  return { id, name: `User${id}`, email: `user${id}@example.com` };\n}\nasync function main() {\n  const user = await fetchUser(42);\n  console.log('User:', user.name, '|', user.email);\n}\nmain();", language: "javascript", output: "User: User42 | user42@example.com" },
    { difficulty: "medium-plus", title: "Promise.all — parallel execution", explanation: "Promise.all runs multiple Promises in parallel, resolving when all complete.", code: "async function fetchAll() {\n  const [users, posts, comments] = await Promise.all([\n    Promise.resolve([{id:1}]),        // users\n    Promise.resolve([{id:1},{id:2}]), // posts\n    Promise.resolve([{id:1}]),        // comments\n  ]);\n  console.log('Users:', users.length);\n  console.log('Posts:', posts.length);\n  console.log('Comments:', comments.length);\n}\nfetchAll();", language: "javascript", output: "Users: 1\nPosts: 2\nComments: 1" },
    { difficulty: "hard", title: "Promise.allSettled", explanation: "allSettled waits for all Promises, whether resolved or rejected — useful for independent operations.", code: "async function fetchWithFallbacks() {\n  const results = await Promise.allSettled([\n    Promise.resolve('Primary data'),\n    Promise.reject(new Error('CDN failed')),\n    Promise.resolve('Backup data'),\n  ]);\n  results.forEach((r, i) => {\n    if (r.status === 'fulfilled') console.log(`Source ${i}: ✓`, r.value);\n    else console.log(`Source ${i}: ✗`, r.reason.message);\n  });\n}\nfetchWithFallbacks();", language: "javascript", output: "Source 0: ✓ Primary data\nSource 1: ✗ CDN failed\nSource 2: ✓ Backup data" },
    { difficulty: "real-world", title: "async forEach pitfall and fix", explanation: "async functions inside forEach don't await correctly. Use for...of instead.", code: "async function processItems(items) {\n  // WRONG: forEach doesn't await async callbacks\n  // items.forEach(async item => await process(item)); // all run in parallel!\n  \n  // CORRECT: for...of awaits each one sequentially\n  for (const item of items) {\n    await new Promise(r => setTimeout(r, 1));\n    console.log('Processed:', item);\n  }\n  console.log('All done (sequential)');\n}\nprocessItems([1, 2, 3]);", language: "javascript", output: "Processed: 1\nProcessed: 2\nProcessed: 3\nAll done (sequential)" }
  ],
  exercises: [
    { level: 1, title: "Promisify timeout", problem: "Write `delay(ms)` that returns a Promise resolving after ms milliseconds.", hints: ["new Promise(resolve => setTimeout(resolve, ms))"], solution: "const delay=ms=>new Promise(r=>setTimeout(r,ms));\ndelay(100).then(()=>console.log('done after 100ms'));" },
    { level: 2, title: "Async data fetcher", problem: "Write async `getUser(id)` that awaits a simulated delay (Promise.resolve) and returns {id, name: 'User'+id}.", hints: ["async function, await a resolved Promise, return object."], solution: "async function getUser(id){await Promise.resolve();return{id,name:'User'+id};}\ngetUser(5).then(console.log);" },
    { level: 3, title: "Race with timeout", problem: "Write `withTimeout(promise, ms)` that races the given promise against a timeout rejection after ms milliseconds.", hints: ["Promise.race([promise, new Promise((_,r)=>setTimeout(()=>r(new Error('Timeout')),ms))])"], solution: "function withTimeout(p,ms){return Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error('Timeout')),ms))]);}\nwithTimeout(new Promise(r=>setTimeout(()=>r('ok'),50)),200).then(console.log).catch(console.error);" }
  ],
  interview: [
    { q: "What is the difference between Promise.all and Promise.allSettled?", a: "Promise.all rejects immediately if any Promise rejects (fail-fast). Promise.allSettled waits for ALL to complete regardless of outcome, giving you {status, value/reason} for each. Use all when you need all to succeed; allSettled when you can handle partial failures." },
    { q: "Why can't you use await inside a forEach callback?", a: "forEach executes all callbacks synchronously and ignores returned Promises. async callbacks in forEach all start but none are properly awaited. Use for...of with await for sequential processing, or Promise.all(arr.map(async item => ...)) for parallel processing." },
    { q: "What does async before a function do?", a: "It wraps the function's return value in a Promise. Even if you return a plain value like 42, the async function returns Promise.resolve(42). It also enables the use of await inside the function body." }
  ],
  realWorld: [
    { company: "Node.js fs/promises", text: "Node.js's fs.promises module exposes all file system operations as Promises, enabling clean async/await syntax for reading files, writing, and directory operations without callback hell." },
    { company: "Prisma ORM", text: "Prisma database operations return Promises: `const user = await prisma.user.findUnique({where:{id}})`. Understanding async/await is required to work with any modern ORM or database client." }
  ],
  quiz: [
    { q: "What does await do?", options: ["Blocks the entire thread", "Pauses the async function until Promise resolves", "Cancels the Promise", "Creates a new thread"], answer: 1 },
    { q: "What does Promise.all do if one Promise rejects?", options: ["Ignores the rejection", "Waits for all others", "Immediately rejects", "Returns partial results"], answer: 2 },
    { q: "What is Promise.allSettled useful for?", options: ["Racing Promises", "Handling all outcomes whether resolved or rejected", "Serial execution", "Cancellation"], answer: 1 },
    { q: "Why avoid async inside forEach?", options: ["It's deprecated", "forEach doesn't await the async callbacks", "It throws errors", "forEach only allows sync functions"], answer: 1 },
    { q: "What does an async function always return?", options: ["A number", "A string", "A Promise", "An array"], answer: 2 }
  ]
});

// MODULE 38 — Fetch API & REST
window.CSFA_RAW_TOPICS.push({
  id: 'm38-fetch-api', module: 38, title: 'Fetch API & REST Client Patterns',
  tagline: 'Making HTTP requests in JavaScript — fetch, error handling, interceptors, and API clients.',
  readMinutes: 6,
  intro: {
    whatItIs: "The Fetch API is the modern browser and Node.js API for making HTTP requests. It returns Promises and supports all HTTP methods. A well-structured API client wraps fetch with error handling, base URLs, authentication headers, and request/response interceptors.",
    whyItMatters: "Every frontend app makes HTTP requests. Understanding how to structure an API client — with proper error handling, auth, and retry — is essential for building production-quality applications.",
    whereUsed: "Browser fetch calls, axios (fetch wrapper), React Query / SWR data fetching, Next.js server-side fetching, Node.js API consumption.",
    commonMistakes: "Not checking response.ok before calling response.json(). fetch doesn't reject on 4xx/5xx HTTP errors — it only rejects on network failure. Always check `if (!response.ok) throw new Error(response.status)`."
  },
  visual: { caption: "fetch(url, options) → Response → response.json() → data. Always check response.ok!", type: "fetch-flow" },
  examples: [
    { difficulty: "very-easy", title: "Basic fetch", explanation: "fetch returns a Promise. You must await twice: once for the response, once for the body.", code: "// Conceptual simulation (actual fetch in browser/Node)\nasync function getUser(id) {\n  // const response = await fetch(`https://api.example.com/users/${id}`);\n  // const data = await response.json();\n  const data = { id, name: 'Alice', email: 'alice@example.com' }; // simulated\n  return data;\n}\ngetUser(1).then(u => console.log(`${u.name} <${u.email}>`));", language: "javascript", output: "Alice <alice@example.com>" },
    { difficulty: "easy", title: "Checking response.ok", explanation: "fetch only rejects on network errors — HTTP errors (404, 500) must be checked manually.", code: "async function safeFetch(url) {\n  // Simulate a 404 response\n  const response = { ok: false, status: 404, statusText: 'Not Found' };\n  if (!response.ok) {\n    throw new Error(`HTTP ${response.status}: ${response.statusText}`);\n  }\n  return response.json();\n}\nsafeFetch('/api/missing').catch(e => console.log('Error:', e.message));", language: "javascript", output: "Error: HTTP 404: Not Found" },
    { difficulty: "medium", title: "API client class", explanation: "Wrap fetch in a class with base URL, default headers, and error handling.", code: "class APIClient {\n  constructor(baseURL, token) {\n    this.baseURL = baseURL;\n    this.headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };\n  }\n  async get(path) {\n    console.log(`GET ${this.baseURL}${path}`);\n    console.log('Headers:', JSON.stringify(this.headers).slice(0,60) + '...');\n    return { data: 'response data', status: 200 };\n  }\n}\nconst api = new APIClient('https://api.example.com', 'token123');\napi.get('/users/1');", language: "javascript", output: "GET https://api.example.com/users/1\nHeaders: {\"Content-Type\":\"application/json\",\"Authorization\":\"Bearer token..." },
    { difficulty: "medium-plus", title: "POST with body", explanation: "POST requests include a JSON body serialized with JSON.stringify.", code: "async function createUser(userData) {\n  const options = {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(userData),\n  };\n  console.log('Request:', options.method);\n  console.log('Body:', options.body);\n  return { id: 42, ...userData, createdAt: new Date().toISOString() };\n}\ncreateUser({ name: 'Alice', email: 'alice@example.com' }).then(u => console.log('Created user:', u.id));", language: "javascript", output: "Request: POST\nBody: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}\nCreated user: 42" },
    { difficulty: "hard", title: "Request interceptors", explanation: "Interceptors run before requests (add auth) or after responses (normalize errors).", code: "class SmartClient {\n  #interceptors = [];\n  use(fn) { this.#interceptors.push(fn); }\n  async request(config) {\n    let cfg = config;\n    for (const fn of this.#interceptors) cfg = await fn(cfg);\n    console.log('Final config:', JSON.stringify(cfg));\n    return { status: 200, data: {} };\n  }\n}\nconst client = new SmartClient();\nclient.use(cfg => ({ ...cfg, headers: { ...cfg.headers, 'X-Request-ID': '123' } }));\nclient.request({ url: '/api', headers: {} });", language: "javascript", output: "Final config: {\"url\":\"/api\",\"headers\":{\"X-Request-ID\":\"123\"}}" },
    { difficulty: "real-world", title: "React Query pattern", explanation: "React Query manages server state — caching, background refresh, and loading/error states.", code: "// Conceptual React Query pattern\nconst queryPattern = {\n  queryKey: ['users', 1],\n  queryFn: async () => {\n    const res = await fetch('/api/users/1');\n    if (!res.ok) throw new Error('Failed to fetch');\n    return res.json();\n  },\n  staleTime: 5 * 60 * 1000, // cache for 5 minutes\n  retry: 3,                  // retry failed requests 3 times\n};\nconsole.log('React Query key:', queryPattern.queryKey);\nconsole.log('Stale time:', queryPattern.staleTime / 1000 / 60, 'minutes');\nconsole.log('Auto retry:', queryPattern.retry, 'times');", language: "javascript", output: "React Query key: [ 'users', 1 ]\nStale time: 5 minutes\nAuto retry: 3 times" }
  ],
  exercises: [
    { level: 1, title: "URL builder", problem: "Write `buildUrl(base, path, params)` where params is an object. Return a URL string with query parameters.", hints: ["Use URLSearchParams or template literal."], solution: "function buildUrl(base,path,params){const qs=Object.entries(params).map(([k,v])=>`${k}=${v}`).join('&');return `${base}${path}?${qs}`;}\nconsole.log(buildUrl('https://api.com','/users',{page:1,limit:10}));" },
    { level: 2, title: "Safe fetch wrapper", problem: "Write `safeFetch(url)` that simulates a fetch call, checks response.ok, throws on error, and returns parsed data.", hints: ["Check response.ok, throw if not, return response.json() (simulated)."], solution: "async function safeFetch(url){\n  const ok=!url.includes('broken');\n  if(!ok)throw new Error('HTTP 404');\n  return{url,data:'ok'};\n}\nsafeFetch('https://api.com/data').then(console.log).catch(e=>console.error(e.message));" },
    { level: 3, title: "Request builder", problem: "Write `buildRequest(method, url, body, token)` returning a fetch options object with method, headers (Content-Type + Authorization), and stringified body if provided.", hints: ["Return {method, headers:{}, body: body?JSON.stringify(body):undefined}"], solution: "function buildRequest(method,url,body,token){return{method,url,headers:{'Content-Type':'application/json',...(token&&{Authorization:`Bearer ${token}`})},...(body&&{body:JSON.stringify(body)})};}\nconsole.log(JSON.stringify(buildRequest('POST','/api',{name:'Alice'},'tok123')));" }
  ],
  interview: [
    { q: "Why doesn't fetch reject on 404 errors?", a: "fetch only rejects on network-level failures (no connection, DNS failure, CORS block). HTTP error responses (400, 404, 500) are still 'successful' network requests. You must check `response.ok` (true for 200-299) and throw manually if you want to treat HTTP errors as exceptions." },
    { q: "What is CORS?", a: "Cross-Origin Resource Sharing — a browser security mechanism preventing web pages from making requests to a different domain than the one that served the page. Servers must include Access-Control-Allow-Origin headers to allow cross-origin requests. CORS doesn't apply to server-to-server requests." },
    { q: "What is the difference between axios and fetch?", a: "fetch is native and returns Promises. axios is a library that wraps fetch/XMLHttpRequest with: automatic JSON serialization, response.ok checking (throws on 4xx/5xx), request/response interceptors, and better timeout support. axios is more convenient for production apps." }
  ],
  realWorld: [
    { company: "Stripe API", text: "Stripe's JavaScript SDK wraps fetch in a typed client with automatic retry logic, idempotency keys for safe retries, and structured error classes (StripeError, CardError) — exactly the API client patterns shown here." },
    { company: "GitHub REST API", text: "GitHub's Octokit library is a production API client with request interceptors for auth, automatic pagination, retry on rate limiting, and full TypeScript types — a real-world example of the SmartClient pattern." }
  ],
  quiz: [
    { q: "What does response.ok check?", options: ["Response is JSON", "Status is 200-299", "Request succeeded without CORS", "Body is not empty"], answer: 1 },
    { q: "What does JSON.stringify() do in a POST request?", options: ["Parses JSON from server", "Converts JS object to JSON string for request body", "Validates schema", "Compresses data"], answer: 1 },
    { q: "What is CORS?", options: ["A JavaScript framework", "Browser security restricting cross-origin requests", "CSS naming convention", "A caching strategy"], answer: 1 },
    { q: "When does fetch() reject its Promise?", options: ["On any HTTP error", "On 500 only", "On network failure only", "On 4xx and 5xx"], answer: 2 },
    { q: "What is a request interceptor?", options: ["Middleware blocking requests", "Function that runs before request to modify config", "CORS handler", "Response parser"], answer: 1 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm34-animations',
  module: 34,
  title: 'Animations',
  tagline: 'Master Animations to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Animations.',
    whyItMatters: 'Understanding Animations is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Animations before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Animations.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Animations', explanation: 'Let\'s look at a simple example demonstrating Animations in action.', code: 'console.log("Initializing Animations...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Animations...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Animations', explanation: 'A practical example showing a real-world coding scenario using Animations.', code: 'function demonstrate() {\n  console.log("Running Animations flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Animations flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Animations setup', problem: 'Write a function testSetup() that returns the string "Animations OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Animations OK"; }' }
  ],
  interview: [
    { q: 'Why is Animations important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Animations in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Animations?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm34-transitions',
  module: 34,
  title: 'Transitions',
  tagline: 'Master Transitions to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Transitions.',
    whyItMatters: 'Understanding Transitions is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Transitions before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Transitions.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Transitions', explanation: 'Let\'s look at a simple example demonstrating Transitions in action.', code: 'console.log("Initializing Transitions...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Transitions...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Transitions', explanation: 'A practical example showing a real-world coding scenario using Transitions.', code: 'function demonstrate() {\n  console.log("Running Transitions flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Transitions flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Transitions setup', problem: 'Write a function testSetup() that returns the string "Transitions OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Transitions OK"; }' }
  ],
  interview: [
    { q: 'Why is Transitions important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Transitions in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Transitions?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm34-css-variables',
  module: 34,
  title: 'CSS Variables',
  tagline: 'Master CSS Variables to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at CSS Variables.',
    whyItMatters: 'Understanding CSS Variables is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of CSS Variables before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of CSS Variables.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of CSS Variables', explanation: 'Let\'s look at a simple example demonstrating CSS Variables in action.', code: 'console.log("Initializing CSS Variables...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing CSS Variables...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with CSS Variables', explanation: 'A practical example showing a real-world coding scenario using CSS Variables.', code: 'function demonstrate() {\n  console.log("Running CSS Variables flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running CSS Variables flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check CSS Variables setup', problem: 'Write a function testSetup() that returns the string "CSS Variables OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "CSS Variables OK"; }' }
  ],
  interview: [
    { q: 'Why is CSS Variables important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to CSS Variables in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of CSS Variables?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm34-gradients',
  module: 34,
  title: 'Gradients',
  tagline: 'Master Gradients to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Gradients.',
    whyItMatters: 'Understanding Gradients is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Gradients before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Gradients.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Gradients', explanation: 'Let\'s look at a simple example demonstrating Gradients in action.', code: 'console.log("Initializing Gradients...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Gradients...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Gradients', explanation: 'A practical example showing a real-world coding scenario using Gradients.', code: 'function demonstrate() {\n  console.log("Running Gradients flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Gradients flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Gradients setup', problem: 'Write a function testSetup() that returns the string "Gradients OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Gradients OK"; }' }
  ],
  interview: [
    { q: 'Why is Gradients important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Gradients in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Gradients?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm34-glassmorphism',
  module: 34,
  title: 'Glassmorphism',
  tagline: 'Master Glassmorphism to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Glassmorphism.',
    whyItMatters: 'Understanding Glassmorphism is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Glassmorphism before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Glassmorphism.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Glassmorphism', explanation: 'Let\'s look at a simple example demonstrating Glassmorphism in action.', code: 'console.log("Initializing Glassmorphism...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Glassmorphism...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Glassmorphism', explanation: 'A practical example showing a real-world coding scenario using Glassmorphism.', code: 'function demonstrate() {\n  console.log("Running Glassmorphism flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Glassmorphism flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Glassmorphism setup', problem: 'Write a function testSetup() that returns the string "Glassmorphism OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Glassmorphism OK"; }' }
  ],
  interview: [
    { q: 'Why is Glassmorphism important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Glassmorphism in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Glassmorphism?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
