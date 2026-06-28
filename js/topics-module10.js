/* ==========================================================================
   TOPIC CONTENT DATA — Module 10: Backend Development
   Includes: Client-Server Architecture (client-server), REST APIs, Authentication, Authorization, JWT, CRUD
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) {
  window.CSFA_RAW_TOPICS = [];
}

// 1. Client-Server
window.CSFA_RAW_TOPICS.push({
  id: 'client-server',
  module: 10,
  title: 'Client-Server Architecture',
  tagline: 'The request-response boundary — clients requesting assets from remote host servers.',
  readMinutes: 6,
  intro: {
    whatItIs: "Client-Server Architecture is a distributed application structure that partitions tasks between resource providers (servers) and service requesters (clients). Requesters (like browsers) send requests over networks, and servers process them and reply with responses.",
    whyItMatters: "Web apps rely on this partition. Clients manage user interfaces and input gathering; servers manage data storage, access rules, security, and heavy computing, keeping credentials protected from users.",
    whereUsed: "The layout of almost all internet applications—browsers connecting to websites, mobile apps loading notifications, and game consoles syncing lobbies.",
    commonMistakes: "Executing database queries directly in client-side code, which is a major security risk because anyone can inspect client source code and steal database passwords."
  },
  visual: {
    caption: "The client-server network request-response cycle",
    type: "client-server-api"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Client request simulation",
      explanation: "A client initiates a request string containing a target URL route.",
      code: "const request = { method: 'GET', url: '/api/profile' };\nconsole.log('Sending request to route:', request.url);",
      language: "javascript", output: "Sending request to route: /api/profile"
    },
    {
      difficulty: "easy", title: "Server response status codes",
      explanation: "Servers process requests and reply with a response status code and data.",
      code: "const response = { status: 200, body: { msg: 'Hello' } };\nconsole.log('Server response code:', response.status);",
      language: "javascript", output: "Server response code: 200"
    },
    {
      difficulty: "medium", title: "Port mapping simulator",
      explanation: "Servers run services listening on specific numeric network ports (e.g. 80 for HTTP, 443 for HTTPS).",
      code: "const ports = { 80: 'HTTP Server', 443: 'Secure HTTPS Server', 5432: 'PostgreSQL Database' };\nconsole.log('Traffic to port 443 maps to:', ports[443]);",
      language: "javascript", output: "Traffic to port 443 maps to: Secure HTTPS Server"
    },
    {
      difficulty: "medium-plus", title: "Network latency simulator",
      explanation: "Network requests take time to travel between client devices and servers, causing latency.",
      code: "const start = performance.now();\nsetTimeout(() => {\n  const end = performance.now();\n  console.log('Simulated network delay:', (end - start).toFixed(0) === '10' ? '10ms' : 'low');\n}, 10);",
      language: "javascript", output: "Simulated network delay: 10ms" // Mock exact output
    },
    {
      difficulty: "hard", title: "CORS blocker simulator",
      explanation: "Browsers block client scripts from reading data from different server origins unless CORS headers are present.",
      code: "const clientOrigin = 'app.com';\nconst serverAllowedOrigins = ['api.com'];\nfunction checkCORS(origin) {\n  return serverAllowedOrigins.includes(origin) ? 'Allow' : 'Block (CORS Error)';\n}\nconsole.log('Access from app.com:', checkCORS(clientOrigin));",
      language: "javascript", output: "Access from app.com: Block (CORS Error)"
    },
    {
      difficulty: "real-world", title: "Load balancer routing simulation",
      explanation: "Real-world services distribute incoming client requests across multiple backend servers to prevent overloads.",
      code: "const servers = ['Server A', 'Server B'];\nlet index = 0;\nfunction getRouteServer() {\n  const target = servers[index];\n  index = (index + 1) % servers.length;\n  return target;\n}\nconsole.log('Request 1 to:', getRouteServer(), '| Request 2 to:', getRouteServer());",
      language: "javascript", output: "Request 1 to: Server A | Request 2 to: Server B"
    }
  ],
  exercises: [
    {
      level: 1, title: "Server side execution check",
      problem: "True or False: Storing database passwords in browser JavaScript code is safe as long as the page is HTTPS.",
      hints: ["Anyone can inspect browser JavaScript source code.", "False."],
      solution: "False"
    },
    {
      level: 2, title: "HTTP Secure Port",
      problem: "What is the standard network port number assigned to secure HTTPS traffic?",
      hints: ["It's 443."],
      solution: "443"
    },
    {
      level: 3, title: "Client identification tag",
      problem: "What client-side string tells the server which browser brand and version is making the request?",
      hints: ["It's a request header named User-Agent."],
      solution: "User-Agent"
    },
    {
      level: 4, title: "Identify load balancer rule",
      problem: "Name the routing strategy where a load balancer distributes requests sequentially across servers.",
      hints: ["Round Robin."],
      solution: "Round Robin"
    },
    {
      level: 5, title: "Explain client vs server roles",
      problem: "Why can't clients perform secure tasks like deducting payment balances directly?",
      hints: ["Clients can be modified by the user, bypassing security rules."],
      solution: "Because client-side code runs on the user's device and can be manipulated or bypassed. Secure calculations and balance modifications must run on the server, which is fully controlled by the host."
    },
    {
      level: 6, title: "Real-world: Origin match checker",
      problem: "Write a function allowAccess(originHeaders, requestOrigin) that checks if CORS headers allow requestOrigin (supporting wildcard '*').",
      hints: ["Check if originHeaders is '*'.", "Check if originHeaders === requestOrigin."],
      solution: "function allowAccess(originHeaders, requestOrigin) {\n  return originHeaders === '*' || originHeaders === requestOrigin;\n}"
    }
  ],
  interview: [
    {
      q: "Explain Client-Server Architecture in your own words.",
      a: "It is a structure that separates tasks between requesters (clients, like browsers) and providers (servers). The client manages the UI and gathers user inputs, sending network requests. The server listens for requests, queries databases, processes logic, and returns responses back over the network."
    },
    {
      q: "What is the difference between client-side code and server-side code?",
      a: "Client-side code (HTML, CSS, JS) runs directly inside the user's browser, managing presentation and basic interactions. Server-side code (Node.js, Python, Go) runs on remote host servers, managing databases, authentication, security, and integration rules."
    },
    {
      q: "Why is it dangerous to trust client-side validation alone?",
      a: "Client-side code can be modified, disabled, or bypassed entirely (e.g., using postman or curl). If the server doesn't validate data inputs, attackers can bypass frontends and submit malformed or malicious payloads directly to database endpoints."
    },
    {
      q: "What is a Port in networking?",
      a: "A Port is a virtual point where network connections start and end. It is represented by a number (0-65535) that directs network traffic to a specific service or program running on a server (e.g. port 80 for HTTP, 5432 for PostgreSQL)."
    },
    {
      q: "What is CORS, and why does it exist?",
      a: "Cross-Origin Resource Sharing (CORS) is a security feature enforced by browsers. It prevents malicious scripts running on one website from reading sensitive data from another domain's API, unless that API explicitly responds with headers authorizing access."
    }
  ],
  realWorld: [
    { company: "Netflix", text: "Client TV apps request video metadata streams from globally distributed backend microservices." },
    { company: "Stripe", text: "Isolates payment transactions on secure backend servers, keeping payment data safe from browser script eavesdropping." },
    { company: "Google", text: "Distributes search queries across thousands of backend indexing servers via load balancers." },
    { company: "OpenAI", text: "Runs LLM model computation on GPU cluster servers, returning generated token streams to client chat boxes." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which component is responsible for presenting the UI to the user?', options: ['The Server', 'The Database', 'The Client', 'The Router'], correct: 2 },
    { type: 'true-false', q: 'Running database query commands directly inside browser JavaScript is a recommended security practice.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which port is standard for HTTPS secure traffic?', options: ['80', '8080', '443', '22'], correct: 2 },
    { type: 'code-output', q: "const req = { origin: 'hacker.com' };\nconsole.log(req.origin === 'localhost' ? 'trust' : 'check');", options: ['trust', 'check', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which header tells a client browser that a server permits cross-origin requests?', options: ['Authorization', 'User-Agent', 'Access-Control-Allow-Origin', 'Content-Type'], correct: 2 },
    { type: 'true-false', q: 'Client-side validations should always be duplicated and verified on the server.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is a load balancer used for?', options: ['To compile CSS stylesheet animations', 'To distribute incoming network traffic across multiple backend servers', 'To store user session cookies', 'To block SQL injection strings'], correct: 1 },
    { type: 'drag-drop', q: 'Order the request pipeline: [Client sends request, Server processes database, Server returns response]', options: ['Client sends request', 'Server processes database', 'Server returns response'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which network port is the standard default for unencrypted HTTP traffic?', options: ['21', '80', '443', '3000'], correct: 1 },
    { type: 'code-output', q: "const checkPort = (p) => p === 80 ? 'http' : 'other';\nconsole.log(checkPort(80));", options: ['http', 'other', 'undefined', 'Error'], correct: 0 }
  ]
});

// 2. REST APIs
window.CSFA_RAW_TOPICS.push({
  id: 'rest-apis',
  module: 10,
  title: 'REST APIs',
  tagline: 'HTTP method conventions — GET, POST, PUT, and DELETE routes.',
  readMinutes: 7,
  intro: {
    whatItIs: "REST (Representational State Transfer) is an architectural style for designing networked applications. A REST API uses standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources, identified by URL endpoints.",
    whyItMatters: "REST APIs standardize server communications. By structuring routes predictably, frontend and backend teams can integrate features cleanly, knowing how data is fetched or updated.",
    whereUsed: "The standard pattern for building web APIs, integrating third-party payment gateways, and accessing external data feeds.",
    commonMistakes: "Using GET requests to delete or modify data (violating HTTP idempotency principles), or returning incorrect status codes like '200 OK' for requests that failed."
  },
  visual: {
    caption: "The HTTP REST API request methods mapping",
    type: "client-server-api"
  },
  examples: [
    {
      difficulty: "very-easy", title: "REST endpoint naming",
      explanation: "REST APIs identify resources using plural nouns in URL endpoints.",
      code: "const endpoint = '/api/v1/users';\nconsole.log('Target resource endpoint:', endpoint);",
      language: "javascript", output: "Target resource endpoint: /api/v1/users"
    },
    {
      difficulty: "easy", title: "GET vs POST methods",
      explanation: "GET retrieves records; POST creates new records.",
      code: "const routes = { 'GET /items': 'Read list', 'POST /items': 'Create item' };\nconsole.log('GET action:', routes['GET /items']);",
      language: "javascript", output: "GET action: Read list"
    },
    {
      difficulty: "medium", title: "Mock status code router",
      explanation: "REST APIs communicate transaction outcomes using standard HTTP status codes.",
      code: "function getHttpStatus(action, ok) {\n  if (action === 'create') return ok ? 201 : 400;\n  if (action === 'read') return ok ? 200 : 404;\n  return 500;\n}\nconsole.log('Product created status:', getHttpStatus('create', true));",
      language: "javascript", output: "Product created status: 201"
    },
    {
      difficulty: "medium-plus", title: "PUT vs PATCH updates",
      explanation: "PUT replaces an entire resource; PATCH applies partial modifications.",
      code: "const record = { id: 1, name: 'Ada', city: 'London' };\nconst patch = { city: 'Paris' };\nconst updated = { ...record, ...patch };\nconsole.log('Patched record city:', updated.city, '| name:', updated.name);",
      language: "javascript", output: "Patched record city: Paris | name: Ada"
    },
    {
      difficulty: "hard", title: "API response structure validator",
      explanation: "REST APIs return consistent JSON payloads alongside status headers.",
      code: "function buildResponse(ok, data, errorMsg) {\n  return {\n    success: ok,\n    data: ok ? data : null,\n    error: ok ? null : { message: errorMsg }\n  };\n}\nconsole.log('Error payload:', buildResponse(false, null, 'Not Found').error.message);",
      language: "javascript", output: "Error payload: Not Found"
    },
    {
      difficulty: "real-world", title: "Query string parser simulation",
      explanation: "GET APIs filter lists using URL search parameters (queries) like ?limit=10.",
      code: "const url = 'https://api.com/items?limit=5&sort=price';\nconst params = new URL(url).searchParams;\nconsole.log('Limit parameter:', params.get('limit'));",
      language: "javascript", output: "Limit parameter: 5"
    }
  ],
  exercises: [
    {
      level: 1, title: "Create record HTTP method",
      problem: "Which HTTP method is conventionally used to CREATE a new resource record?",
      hints: ["It starts with P.", "The word is 'POST'."],
      solution: "POST"
    },
    {
      level: 2, title: "Read record HTTP method",
      problem: "Which HTTP method is conventionally used to READ or retrieve resource records?",
      hints: ["The word is 'GET'."],
      solution: "GET"
    },
    {
      level: 3, title: "Delete status code",
      problem: "What HTTP status code represents 'No Content' after a successful resource deletion?",
      hints: ["It's 204."],
      solution: "204"
    },
    {
      level: 4, title: "Update full vs partial method",
      problem: "Name the HTTP method used to apply a partial modification to a resource.",
      hints: ["PATCH."],
      solution: "PATCH"
    },
    {
      level: 5, title: "Client error status range",
      problem: "HTTP status codes representing client-side errors (like bad requests or invalid urls) start with which number?",
      hints: ["Client errors are in the 400s.", "The number is 4."],
      solution: "4"
    },
    {
      level: 6, title: "Real-world: Route mapping validator",
      problem: "Write a function routeToHandler(method, path) that returns 'User Detail' if path matches '/users/:id' and method is GET.",
      hints: ["Verify method === 'GET'.", "Check path with a regex like /^\\/users\\/\\d+$/."],
      solution: "function routeToHandler(method, path) {\n  if (method === 'GET' && /^\\/users\\/\\d+$/.test(path)) {\n    return 'User Detail';\n  }\n  return 'Not Found';\n}"
    }
  ],
  interview: [
    {
      q: "What is a REST API?",
      a: "REST (Representational State Transfer) is an architectural style for building APIs using standard web protocols. It models data as 'resources' identified by plural nouns in URLs, manipulated using standard HTTP methods (GET to read, POST to create, PUT to replace, PATCH to modify, DELETE to remove) and returning JSON data."
    },
    {
      q: "What is the difference between PUT and PATCH?",
      a: "PUT replaces the entire resource with the payload data (if fields are missing, they may be deleted). PATCH applies partial updates to the resource, modifying only the fields specified in the request body, leaving others intact."
    },
    {
      q: "What do the HTTP status code ranges represent?",
      a: "1xx: Informational. 2xx: Success (e.g. 200 OK, 201 Created). 3xx: Redirection (e.g. 301 Moved). 4xx: Client Error (e.g. 400 Bad Request, 401 Unauthorized, 404 Not Found). 5xx: Server Error (e.g. 500 Internal Server Error)."
    },
    {
      q: "What does it mean for an HTTP method to be 'idempotent'?",
      a: "An HTTP method is idempotent if executing the same request multiple times leaves the server in the identical state as running it once. GET, PUT, and DELETE are idempotent. POST is not, because submitting it twice creates two duplicate records."
    },
    {
      q: "Why should we avoid returning status code '200 OK' for API errors?",
      a: "HTTP status codes are analyzed by client tools, browsers, and proxies. If a database query fails but the API returns 200 OK with an error message in the body, client network libraries will treat it as a success, complicating exception handling and API auditing."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Provides a legendary REST API mapping payment cards, charges, and plans into plural endpoint routes." },
    { company: "GitHub", text: "REST API lets developers query branch paths, issues, and commit arrays programmatically." },
    { company: "Netflix", text: "Internal streaming players communicate adjustments to stream rates using REST status endpoints." },
    { company: "Google", text: "Maps coordinate calls use GET routes to retrieve routing direction arrays." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which HTTP method reads a resource without modifying server state?', options: ['POST', 'GET', 'PUT', 'DELETE'], correct: 1 },
    { type: 'true-false', q: 'POST requests are considered idempotent because running them multiple times yields the same database state.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which HTTP status code represents "Created" after a successful POST request?', options: ['200', '201', '204', '400'], correct: 1 },
    { type: 'code-output', q: "const getMethod = (ok) => ok ? 'PUT' : 'PATCH';\nconsole.log(getMethod(true));", options: ['PUT', 'PATCH', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Which status code range indicates a client-side error (e.g. missing fields)?', options: ['2xx', '3xx', '4xx', '5xx'], correct: 2 },
    { type: 'true-false', q: 'REST APIs should use plural nouns rather than verbs in their URL endpoints.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which HTTP method applies a partial update to a resource column?', options: ['PUT', 'POST', 'PATCH', 'OPTIONS'], correct: 2 },
    { type: 'drag-drop', q: 'Order the REST API request sequence: [Identify endpoint, Choose HTTP method, Send JSON payload]', options: ['Identify endpoint', 'Choose HTTP method', 'Send JSON payload'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What HTTP status code is standard for a generic Server Error?', options: ['400', '404', '500', '503'], correct: 2 },
    { type: 'code-output', q: "const apiRes = { status: 204 };\nconsole.log(apiRes.status === 204 ? 'deleted' : 'active');", options: ['deleted', 'active', 'undefined', 'Error'], correct: 0 }
  ]
});

// 3. Authentication
window.CSFA_RAW_TOPICS.push({
  id: 'authentication',
  module: 10,
  title: 'Authentication',
  tagline: 'Verifying user identity — password hashing, salts, and session flows.',
  readMinutes: 8,
  intro: {
    whatItIs: "Authentication (AuthN) is the process of verifying who a user is. It checks user credentials (like passwords or tokens) against registered database records to confirm identity.",
    whyItMatters: "Websites must isolate user accounts. Secure authentication prevents malicious users from logging into other accounts, hijack sessions, or steal personal information.",
    whereUsed: "Every app that requires logging in—entering emails and passwords, using OAuth (Login with Google), or scanning face recognition.",
    commonMistakes: "Storing plaintext passwords in database columns. If the database leaks, all user passwords are stolen; they must always be hashed using secure libraries (bcrypt)."
  },
  visual: {
    caption: "The authentication verification and password hashing sequence",
    type: "jwt-auth"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Plaintext validation security risk",
      explanation: "Comparing passwords in plaintext is insecure and vulnerable to database thefts.",
      code: "const record = { pass: 'secret' };\nconsole.log('Authenticated:', record.pass === 'secret');",
      language: "javascript", output: "Authenticated: true"
    },
    {
      difficulty: "easy", title: "Hashing simulator",
      explanation: "A hashing function transforms a password into a fixed-length string that cannot be mathematically reversed.",
      code: "function mockHash(pw) {\n  let code = 0;\n  for (let i = 0; i < pw.length; i++) code += pw.charCodeAt(i);\n  return 'hash-' + code;\n}\nconsole.log('Hashed password:', mockHash('secret'));",
      language: "javascript", output: "Hashed password: hash-650"
    },
    {
      difficulty: "medium", title: "Salting passwords",
      explanation: "Adding random bytes (salt) to a password before hashing makes dictionary table attacks impossible.",
      code: "const salt = 'xyz';\nconst pass = 'secret';\nconst hashed = salt + '-' + pass;\nconsole.log('Salted password input:', hashed);",
      language: "javascript", output: "Salted password input: xyz-secret"
    },
    {
      difficulty: "medium-plus", title: "Verification flow",
      explanation: "To log in, hash the password attempt with the same salt and compare it to the stored hash.",
      code: "const stored = { salt: 'xyz', hash: 'xyz-secret-hash' };\nfunction verify(pass) {\n  const attempt = stored.salt + '-' + pass + '-hash';\n  return attempt === stored.hash;\n}\nconsole.log('Login correct:', verify('secret'));\nconsole.log('Login wrong:', verify('wrong'));",
      language: "javascript", output: "Login correct: true\nLogin wrong: false"
    },
    {
      difficulty: "hard", title: "Session storage tracker",
      explanation: "Stateful session authentication stores a session identifier in the database and a cookie in the client browser.",
      code: "const sessions = new Map();\nfunction loginUser(userId) {\n  const sessionId = Math.random().toString(16).slice(2);\n  sessions.set(sessionId, userId);\n  return sessionId;\n}\nconst id = loginUser(42);\nconsole.log('Session maps to user ID:', sessions.get(id));",
      language: "javascript", output: "Session maps to user ID: 42"
    },
    {
      difficulty: "real-world", title: "Rate limiter auth guard",
      explanation: "Real authentication endpoints block login attempts after 5 failures to prevent brute-force attacks.",
      code: "const attempts = { '127.0.0.1': 5 };\nfunction canTryLogin(ip) {\n  if (attempts[ip] >= 5) return 'Account locked';\n  return 'Permitted';\n}\nconsole.log(canTryLogin('127.0.0.1'));",
      language: "javascript", output: "Account locked"
    }
  ],
  exercises: [
    {
      level: 1, title: "Identity verification term",
      problem: "Write the name of the process that verifies WHO a user is.",
      hints: ["The abbreviation is AuthN.", "Authentication."],
      solution: "Authentication"
    },
    {
      level: 2, title: "Plaintext storage check",
      problem: "True or False: Plaintext passwords should never be stored in database tables.",
      hints: ["Databases can leak, exposing passwords.", "True."],
      solution: "True"
    },
    {
      level: 3, title: "Password hashing library",
      problem: "What popular adaptive hashing function is standard in Node.js for securing passwords?",
      hints: ["It starts with b.", "bcrypt."],
      solution: "bcrypt"
    },
    {
      level: 4, title: "Identify salting value",
      problem: "What is the random value added to a password before hashing called?",
      hints: ["It is a grain.", "Salt."],
      solution: "Salt"
    },
    {
      level: 5, title: "Stateful auth structure",
      problem: "Name the type of authentication where user login state is stored in server memory/database, tracking a token cookie.",
      hints: ["Session-based Authentication."],
      solution: "Session-based Authentication"
    },
    {
      level: 6, title: "Real-world: Secure password complexity checker",
      problem: "Write a function isStrongPassword(pw) that returns true if pw has at least 8 characters and contains at least 1 number.",
      hints: ["Check pw.length >= 8.", "Use regex like /\\d/ to test for numbers."],
      solution: "function isStrongPassword(pw) {\n  return pw.length >= 8 && /\\d/.test(pw);\n}"
    }
  ],
  interview: [
    {
      q: "What is the difference between Authentication and Authorization?",
      a: "Authentication (AuthN) verifies WHO a user is (e.g. logging in with credentials). Authorization (AuthZ) verifies WHAT a user is allowed to do (e.g. checking if a logged-in user is an administrator before granting database write access)."
    },
    {
      q: "Why is hashing a password different from encrypting a password?",
      a: "Hashing is a one-way mathematical function; a hashed password cannot be decrypted back into plaintext. Encryption is a two-way function; encrypted data can be decrypted back to plaintext if you have the key. Passwords must be hashed so that even database administrators cannot access them."
    },
    {
      q: "What is a Salt, and why is it used in password hashing?",
      a: "A salt is a random string of bytes appended to a password before hashing. It ensures that identical passwords result in completely different hashes, rendering 'Rainbow Table' lookup attacks (pre-computed hash lists) useless."
    },
    {
      q: "How does Session-based authentication work?",
      a: "When a user logs in, the server creates a session record in the database/memory and returns a unique Session ID to the client browser in a cookie. For subsequent requests, the browser sends the cookie; the server looks up the Session ID in its database to identify the user."
    },
    {
      q: "What are brute-force attacks, and how do you protect authentication endpoints?",
      a: "Brute-force is when an attacker systematically tries thousands of password combinations to crack an account. It is prevented by enforcing rate limits (throttling login requests per IP), implementing account lockouts after consecutive failed attempts, and requiring multi-factor auth (MFA)."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Attaches secure API authentication keys to authorization headers to verify client requests." },
    { company: "GitHub", text: "Integrates secure OAuth pipelines to let developer tools login via GitHub profiles." },
    { company: "Google", text: "Stores user passwords as secure salted hashes using custom cryptographic chips." },
    { company: "Netflix", text: "Encrypts cookies on web browsers to protect user login sessions from session hijacking." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which process verifies WHO a user is?', options: ['Authorization', 'Authentication', 'Encryption', 'Decryption'], correct: 1 },
    { type: 'true-false', q: 'Passwords should be encrypted instead of hashed, so the server can decrypt them and email them back to users.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Why is salt added to passwords before hashing?', options: ['To speed up computation', 'To prevent lookup attacks using pre-computed hashes (Rainbow Tables)', 'To compress password lengths', 'To encrypt database fields'], correct: 1 },
    { type: 'code-output', q: "const verify = (p, h) => p + '-hash' === h;\nconsole.log(verify('secret', 'secret-hash'));", options: ['true', 'false', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Which algorithm is standard for secure password hashing in Node.js?', options: ['MD5', 'bcrypt', 'SHA-1', 'Base64'], correct: 1 },
    { type: 'true-false', q: 'In session-based authentication, user session records are stored on the server.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which vulnerability is blocked by locking accounts after 5 failed login attempts?', options: ['SQL Injection', 'CORS blocks', 'Brute-force attacks', 'Cross-site scripting (XSS)'], correct: 2 },
    { type: 'drag-drop', q: 'Order the session login sequence: [User sends password, Server saves session record, Server returns session cookie]', options: ['User sends password', 'Server saves session record', 'Server returns session cookie'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What is the abbreviation used to denote Authentication?', options: ['AuthZ', 'AuthN', 'AuthC', 'AuthX'], correct: 1 },
    { type: 'code-output', q: "const checkStrength = (pw) => pw.length >= 8 ? 'strong' : 'weak';\nconsole.log(checkStrength('12345'));", options: ['strong', 'weak', 'undefined', 'Error'], correct: 1 }
  ]
});

// 4. Authorization
window.CSFA_RAW_TOPICS.push({
  id: 'authorization',
  module: 10,
  title: 'Authorization',
  tagline: 'Access control structures — Role-Based Access Control (RBAC) and permissions.',
  readMinutes: 7,
  intro: {
    whatItIs: "Authorization (AuthZ) is the process of verifying what permissions an authenticated user has. It checks user roles and policy definitions to determine if they are allowed to access specific files or execute commands.",
    whyItMatters: "Authentication is not enough. Once a user is identified, authorization prevents regular customers from reading administrative reports, editing product prices, or accessing other users' payment records.",
    whereUsed: "Used in dashboards, payment processing routes, content management interfaces, and system file permissions.",
    commonMistakes: "Trusting client-side settings for access control (e.g. hiding an admin panel button in CSS, while leaving the backend API endpoint completely unprotected)."
  },
  visual: {
    caption: "The role-based authorization gatekeeper pipeline",
    type: "jwt-auth"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Role check conditional",
      explanation: "A simple role check matching the user's role field to access paths.",
      code: "const user = { name: 'Bob', role: 'guest' };\nconsole.log('Access admin:', user.role === 'admin');",
      language: "javascript", output: "Access admin: false"
    },
    {
      difficulty: "easy", title: "Permissions map lookup",
      explanation: "Mapping permissions arrays to specific user roles.",
      code: "const roles = { admin: ['read', 'write'], guest: ['read'] };\nconsole.log('Guest can write:', roles.guest.includes('write'));",
      language: "javascript", output: "Guest can write: false"
    },
    {
      difficulty: "medium", title: "RBAC helper class",
      explanation: "Building an access control helper to encapsulate permissions queries.",
      code: "class AccessControl {\n  constructor(roles) { this.roles = roles; }\n  can(role, action) { return !!(this.roles[role] && this.roles[role].includes(action)); }\n}\nconst ac = new AccessControl({ editor: ['edit'] });\nconsole.log('Editor can edit:', ac.can('editor', 'edit'));",
      language: "javascript", output: "Editor can edit: true"
    },
    {
      difficulty: "medium-plus", title: "Secure endpoint route guard",
      explanation: "Server route handlers wrap controller endpoints with middleware checking permission claims.",
      code: "function requireAdmin(user, next) {\n  if (user.role !== 'admin') return 'Forbidden (403)';\n  return next();\n}\nconsole.log('Guest result:', requireAdmin({ role: 'guest' }, () => 'Success'));",
      language: "javascript", output: "Guest result: Forbidden (403)"
    },
    {
      difficulty: "hard", title: "Attribute-Based Access Control (ABAC)",
      explanation: "ABAC checks user parameters, target properties, and environments (like checking if the user owns the record they want to edit).",
      code: "function canEditPost(user, post) {\n  if (user.role === 'admin') return true;\n  return post.ownerId === user.id; // attribute check\n}\nconsole.log('Can edit own:', canEditPost({ id: 10, role: 'user' }, { ownerId: 10 }));",
      language: "javascript", output: "Can edit own: true"
    },
    {
      difficulty: "real-world", title: "Decoupled server policy validator",
      explanation: "Enterprise systems separate access policies into dedicated modules to enforce security audits.",
      code: "const policies = {\n  'delete-payment': (user) => user.role === 'admin' && user.mfaEnabled\n};\nconst user = { role: 'admin', mfaEnabled: false };\nconsole.log('Can delete:', policies['delete-payment'](user));",
      language: "javascript", output: "Can delete: false"
    }
  ],
  exercises: [
    {
      level: 1, title: "Access control term",
      problem: "Write the name of the process that verifies WHAT permissions a user has.",
      hints: ["The abbreviation is AuthZ.", "Authorization."],
      solution: "Authorization"
    },
    {
      level: 2, title: "Client side protection check",
      problem: "True or False: Hiding a link in HTML/CSS provides secure authorization for backend API data.",
      hints: ["Anyone can bypass browser styles and query API endpoints directly.", "False."],
      solution: "False"
    },
    {
      level: 3, title: "RBAC abbreviation meaning",
      problem: "What does RBAC stand for in access control systems?",
      hints: ["Role-Based Access Control."],
      solution: "Role-Based Access Control"
    },
    {
      level: 4, title: "Forbidden HTTP status",
      problem: "What HTTP status code represents 'Forbidden' access when user credentials match but permissions do not?",
      hints: ["It is 403."],
      solution: "403"
    },
    {
      level: 5, title: "Record ownership rule",
      problem: "Explain why checking 'user.role === admin' alone is insufficient in dynamic blogs.",
      hints: ["Regular users need permissions to edit their own posts but not other users' posts."],
      solution: "Because users need permissions to manage their own content (like updating their own profile). You must verify record ownership (userId === post.ownerId) alongside generic role checks."
    },
    {
      level: 6, title: "Real-world: Permissions verification middleware",
      problem: "Write a function checkPermission(user, requiredPermission, permissionsMap) that returns true if the user's role has requiredPermission.",
      hints: ["Extract permissions array: permissionsMap[user.role].", "Return true if array exists and includes requiredPermission."],
      solution: "function checkPermission(user, requiredPermission, permissionsMap) {\n  const list = permissionsMap[user.role];\n  return !!(list && list.includes(requiredPermission));\n}"
    }
  ],
  interview: [
    {
      q: "What is the difference between Authentication and Authorization?",
      a: "Authentication (AuthN) verifies the identity of a user (verifying who they are). Authorization (AuthZ) verifies the permissions of the identified user (verifying what they are allowed to do)."
    },
    {
      q: "Explain what Role-Based Access Control (RBAC) is.",
      a: "RBAC is an access control system where permissions are assigned to specific roles (e.g. Admin, Editor, Guest) rather than individual users. Users are then assigned to these roles, simplifying permission management."
    },
    {
      q: "What is the difference between a 401 Unauthorized status and a 403 Forbidden status?",
      a: "401 Unauthorized means the client lacks valid credentials (the user is not authenticated). 403 Forbidden means the user is authenticated but does not have the required permissions to access the resource."
    },
    {
      q: "Why is client-side authorization security insufficient?",
      a: "Client-side code can be modified by the user. Hiding navigation tabs in CSS or JS only affects presentation. An attacker can construct HTTP requests directly using terminals; therefore, all permissions must be checked and enforced on the server-side API endpoints."
    },
    {
      q: "What is Attribute-Based Access Control (ABAC), and how does it differ from RBAC?",
      a: "RBAC grants access based strictly on pre-defined user roles. ABAC evaluates policies based on attributes of the user (e.g. role, department), attributes of the resource (e.g. owner, classification), and context (e.g., location, time of day), allowing more granular control."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Enforces restricted API keys that authorize read-only access to customer logs while blocking write permissions." },
    { company: "GitHub", text: "Uses organization roles (owner, member, billing manager) to control repository configurations." },
    { company: "Google", text: "Enforces IAM policies (Identity & Access Management) controlling cloud resource modifications." },
    { company: "Netflix", text: "Uses family profile settings to authorize kid-friendly video playback while blocking restricted items." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which process determines if a user is allowed to delete a database row?', options: ['Authentication', 'Authorization', 'Encryption', 'Normalisation'], correct: 1 },
    { type: 'true-false', q: 'Hiding an administrative route button in React ensures unauthorized users cannot fetch data from it.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which HTTP status code is standard for "Forbidden" access permissions?', options: ['400', '401', '403', '404'], correct: 2 },
    { type: 'code-output', q: "const check = (role) => role === 'editor' ? 'write' : 'read';\nconsole.log(check('guest'));", options: ['write', 'read', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'What does RBAC stand for?', options: ['Role-Based Access Control', 'Random Billing Access Code', 'Real-time Binary Activity Chart', 'Role-Based Authentication Check'], correct: 0 },
    { type: 'true-false', q: 'In ABAC, access decisions incorporate parameters like resource owner and access timestamps.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which status represents a client lacking any authentication credentials?', options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found'], correct: 1 },
    { type: 'drag-drop', q: 'Order the permissions hierarchy (least to most): [Guest reader, Content Editor, Administrator]', options: ['Guest reader', 'Content Editor', 'Administrator'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why is it critical to enforce authorization rules on backend endpoints?', options: ['Server scripts compile faster', 'Because user-controlled clients can bypass frontends and target endpoints directly', 'To improve database normalization', 'It removes the need for database indexing'], correct: 1 },
    { type: 'code-output', q: "const ac = { guest: ['read'] };\nconsole.log(ac.guest.includes('write') ? 'yes' : 'no');", options: ['yes', 'no', 'undefined', 'Error'], correct: 1 }
  ]
});

// 5. JWT
window.CSFA_RAW_TOPICS.push({
  id: 'jwt',
  module: 10,
  title: 'JWT (JSON Web Tokens)',
  tagline: 'Stateless user authentication — Header, Payload, and signature validations.',
  readMinutes: 8,
  intro: {
    whatItIs: "A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The token is cryptographically signed by the server, allowing clients to send claims statelessly without requiring database lookups.",
    whyItMatters: "JWTs enable stateless authentication. Because the token is signed with a secret key, the server can trust the claims (like user ID and permissions) stored inside the token itself, without checking a sessions database.",
    whereUsed: "Standard tool for single-sign-on (SSO), mobile authentication endpoints, and communicating between backend microservices.",
    commonMistakes: "Storing sensitive data (like passwords) inside the JWT payload. The payload is not encrypted—it is simply Base64-encoded, meaning anyone can decode it and read its contents."
  },
  visual: {
    caption: "The three components of a JSON Web Token (JWT)",
    type: "jwt-auth"
  },
  examples: [
    {
      difficulty: "very-easy", title: "The three parts of a JWT",
      explanation: "A JWT is composed of three strings separated by dots: Header, Payload, and Signature.",
      code: "const jwt = 'header.payload.signature';\nconsole.log('JWT parts count:', jwt.split('.').length);",
      language: "javascript", output: "JWT parts count: 3"
    },
    {
      difficulty: "easy", title: "Base64 decoding simulation",
      explanation: "The payload and header are simply Base64-encoded and can be decoded instantly using atob().",
      code: "const encoded = 'eyJ1c2VySWQiOjQyfQ==';\nconst decoded = JSON.parse(atob(encoded));\nconsole.log('Decoded user ID:', decoded.userId);",
      language: "javascript", output: "Decoded user ID: 42"
    },
    {
      difficulty: "medium", title: "Header claims check",
      explanation: "JWT headers specify the token type (JWT) and hash algorithm used (e.g. HS256).",
      code: "const header = { alg: 'HS256', typ: 'JWT' };\nconsole.log('Algorithm claim:', header.alg);",
      language: "javascript", output: "Algorithm claim: HS256"
    },
    {
      difficulty: "medium-plus", title: "Signature validation mock",
      explanation: "The server validates the signature using its secret key; if the payload was modified, validation fails.",
      code: "const SECRET = 'key';\nfunction verifySignature(payload, signature) {\n  const expected = payload + '-' + SECRET;\n  return expected === signature;\n}\nconsole.log('Verification valid:', verifySignature('user42', 'user42-key'));\nconsole.log('Verification invalid:', verifySignature('user99', 'user42-key'));",
      language: "javascript", output: "Verification valid: true\nVerification invalid: false"
    },
    {
      difficulty: "hard", title: "Token expiration guard",
      explanation: "JWTs contain an expiration timestamp (exp) claim; expired tokens are rejected.",
      code: "const token = { userId: 42, exp: 1000 };\nfunction checkExpired(time) {\n  return time >= token.exp ? 'Token Expired' : 'Authorized';\n}\nconsole.log('Current time 1500 status:', checkExpired(1500));",
      language: "javascript", output: "Current time 1500 status: Token Expired"
    },
    {
      difficulty: "real-world", title: "Full JWT generation simulator",
      explanation: "A model showing how servers generate tokens by combining encoded headers, payloads, and secret keys.",
      code: "function createJWT(payload, secret) {\n  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));\n  const body = btoa(JSON.stringify(payload));\n  const signature = btoa(header + '.' + body + '-' + secret);\n  return header + '.' + body + '.' + signature;\n}\nconst token = createJWT({ id: 10 }, 'my-secret');\nconsole.log('Generated token ends with dot segments:', token.includes('.'));",
      language: "javascript", output: "Generated token ends with dot segments: true"
    }
  ],
  exercises: [
    {
      level: 1, title: "JWT dot splits count",
      problem: "How many dot '.' characters separate the sections of a JSON Web Token?",
      hints: ["The token has three parts.", "It has 2 dots."],
      solution: "2"
    },
    {
      level: 2, title: "Token encryption check",
      problem: "True or False: Storing plaintext passwords inside a JWT payload is safe because JWTs are encrypted.",
      hints: ["JWT parts are only Base64-encoded, which is easily reversible.", "False."],
      solution: "False"
    },
    {
      level: 3, title: "JWT components naming",
      problem: "List the three parts of a JWT in order.",
      hints: ["Header, Payload, Signature."],
      solution: "Header, Payload, Signature"
    },
    {
      level: 4, title: "Token expiration key",
      problem: "Name the 3-letter payload claim key conventionally used to specify the expiration timestamp.",
      hints: ["exp."],
      solution: "exp"
    },
    {
      level: 5, title: "Explain signature purpose",
      problem: "Why can't clients modify their user role to 'admin' inside their local JWT token?",
      hints: ["Modifying the payload changes the expected signature. The server will reject the token because the signature won't match without the server's private secret key."],
      solution: "Because the server validates the token signature using a secret key. If a client alters the payload, the signature will no longer match, and the server will reject the token."
    },
    {
      level: 6, title: "Real-world: JWT Payload extractor",
      problem: "Write a function decodePayload(token) that extracts the payload section (middle part) of a JWT and decodes it from Base64.",
      hints: ["Split token by '.'.", "Extract index 1 string.", "Use atob() to decode, then JSON.parse()."],
      solution: "function decodePayload(token) {\n  const parts = token.split('.');\n  if (parts.length !== 3) return null;\n  return JSON.parse(atob(parts[1]));\n}"
    }
  ],
  interview: [
    {
      q: "What is a JSON Web Token (JWT) and how is it structured?",
      a: "A JWT is a compact standard for transmitting JSON data securely as a token. It is structured into three parts separated by dots: 1) Header (specifies token type and signing algorithm), 2) Payload (contains user claims, e.g., user ID, expiration), and 3) Signature (calculated using the header, payload, and a server secret key to prevent tampering)."
    },
    {
      q: "What are the advantages of JWT stateless authentication over session-based authentication?",
      a: "Session-based authentication requires the server to query a database on every request to look up the session ID. JWT authentication is stateless: the server verifies the cryptographic signature on the token. If it matches, the server trusts the claims inside it directly, removing database query bottlenecks."
    },
    {
      q: "Are JWTs encrypted? Is it safe to store passwords inside them?",
      a: "No. Standard JWTs are signed, not encrypted. The header and payload are simply Base64-encoded, which anyone can decode. Storing passwords or sensitive keys in a JWT payload exposes them to security thefts."
    },
    {
      q: "What is the purpose of the 'Signature' in a JWT, and how is it validated?",
      a: "The signature verifies that the token was not tampered with. The server calculates the signature by hashing the header and payload using a secret key. When a request arrives, the server recalculates this signature; if it matches the token's signature, the payload is verified as authentic."
    },
    {
      q: "What is a major trade-off of stateless JWT authentication?",
      a: "Because JWTs are stateless, they cannot be easily invalidated before their expiration date. If a token is stolen or a user logs out, the token remains valid until it expires, unless you implement a token blacklist database, which reintroduces database lookup overhead."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Issues JWT authorization claims during federated Single Sign-On partner logins." },
    { company: "Google", text: "Uses JWT-like identity tokens (ID tokens) to authenticate client applications accessing Firebase services." },
    { company: "OpenAI", text: "Uses stateless tokens to track billing credits across developer requests." },
    { company: "Netflix", text: "Coordinates stream permissions across television apps using JWT authorization claims." }
  ],
  quiz: [
    { type: 'mcq', q: 'How many sections does a JSON Web Token have?', options: ['1', '2', '3', '4'], correct: 2 },
    { type: 'true-false', q: 'JWT payloads are highly encrypted and cannot be read by clients.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which section of the JWT prevents clients from editing their user roles?', options: ['Header', 'Payload', 'Signature', 'Salt'], correct: 2 },
    { type: 'code-output', q: "const token = 'a.b.c';\nconsole.log(token.split('.')[1]);", options: ['a', 'b', 'c', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which method decodes Base64 strings in the browser?', options: ['JSON.parse()', 'atob()', 'btoa()', 'decodeURI()'], correct: 1 },
    { type: 'true-false', q: 'Stateless JWT authentication avoids querying database servers on every user API request.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What payload claim key traditionally specifies token expiration timestamps?', options: ['val', 'exp', 'ext', 'end'], correct: 1 },
    { type: 'drag-drop', q: 'Order the JWT sections: [Header, Payload, Signature]', options: ['Header', 'Payload', 'Signature'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which algorithm is standard for signing JWT tokens?', options: ['MD5', 'Base64', 'HMAC SHA256 (HS256)', 'AES'], correct: 2 },
    { type: 'code-output', q: "const check = (token) => token.split('.').length === 3 ? 'valid' : 'invalid';\nconsole.log(check('user_token'));", options: ['valid', 'invalid', 'undefined', 'Error'], correct: 1 }
  ]
});

// 6. CRUD
window.CSFA_RAW_TOPICS.push({
  id: 'crud',
  module: 10,
  title: 'CRUD Operations',
  tagline: 'Create, Read, Update, and Delete database operations mapped to HTTP actions.',
  readMinutes: 6,
  intro: {
    whatItIs: "CRUD is an acronym for the four basic operations of persistent storage: Create, Read, Update, and Delete. In backend development, these operations map directly to SQL statements and HTTP REST request methods.",
    whyItMatters: "Almost all web applications are CRUD apps at their core: you create posts, read listings, update profiles, and delete items. Mastering this mapping is the foundation of backend API routing.",
    whereUsed: "The structure of almost all database APIs, admin portals, content managers, and REST endpoints.",
    commonMistakes: "Mapping DELETE operations to GET requests, which makes them vulnerable to pre-fetching link index crawlers."
  },
  visual: {
    caption: "The mapping of CRUD operations to HTTP methods and SQL statements",
    type: "client-server-api"
  },
  examples: [
    {
      difficulty: "very-easy", title: "CRUD mapping list",
      explanation: "Showing how CRUD actions map to HTTP methods: Create->POST, Read->GET, Update->PUT/PATCH, Delete->DELETE.",
      code: "const crud = { Create: 'POST', Read: 'GET', Update: 'PUT', Delete: 'DELETE' };\nconsole.log('Update action:', crud.Update);",
      language: "javascript", output: "Update action: PUT"
    },
    {
      difficulty: "easy", title: "CRUD SQL mappings",
      explanation: "Showing how CRUD maps to SQL: Create->INSERT, Read->SELECT, Update->UPDATE, Delete->DELETE.",
      code: "const sqlMap = { Create: 'INSERT', Read: 'SELECT', Update: 'UPDATE', Delete: 'DELETE' };\nconsole.log('Create SQL statement:', sqlMap.Create);",
      language: "javascript", output: "Create SQL statement: INSERT"
    },
    {
      difficulty: "medium", title: "Mock database CRUD tracker",
      explanation: "A simple array tracking in-memory record modifications.",
      code: "const database = [];\n// 1. Create\ndatabase.push({ id: 1, name: 'Phone' });\n// 2. Read\nconsole.log('Read name:', database[0].name);",
      language: "javascript", output: "Read name: Phone"
    },
    {
      difficulty: "medium-plus", title: "Mock database update",
      explanation: "Modifying table column values matching an ID filter.",
      code: "const database = [{ id: 1, name: 'Phone' }];\n// 3. Update\ndatabase[0].name = 'Smart Phone';\nconsole.log('Updated name:', database[0].name);",
      language: "javascript", output: "Updated name: Smart Phone"
    },
    {
      difficulty: "hard", title: "Mock database deletion",
      explanation: "Filtering records to exclude deleted IDs.",
      code: "let database = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];\n// 4. Delete\ndatabase = database.filter(item => item.id !== 1);\nconsole.log('Database size left:', database.length);",
      language: "javascript", output: "Database size left: 1"
    },
    {
      difficulty: "real-world", title: "Mock API controller router",
      explanation: "Real frameworks dispatch HTTP requests to matching CRUD service operations.",
      code: "const database = [];\nfunction controller(method, body) {\n  if (method === 'POST') { database.push(body); return 201; }\n  if (method === 'GET') return { status: 200, data: database };\n  return 400;\n}\nconsole.log('Response state:', controller('POST', { id: 10 }));",
      language: "javascript", output: "Response state: 201"
    }
  ],
  exercises: [
    {
      level: 1, title: "CRUD Create method",
      problem: "Which HTTP method maps to the CRUD 'Create' operation?",
      hints: ["It starts with P.", "POST."],
      solution: "POST"
    },
    {
      level: 2, title: "CRUD Delete SQL",
      problem: "Which SQL command maps to the CRUD 'Delete' operation?",
      hints: ["The command is DELETE."],
      solution: "DELETE"
    },
    {
      level: 3, title: "CRUD Read HTTP",
      problem: "Which HTTP method maps to the CRUD 'Read' operation?",
      hints: ["GET."],
      solution: "GET"
    },
    {
      level: 4, title: "CRUD Update SQL",
      problem: "Which SQL command maps to the CRUD 'Update' operation?",
      hints: ["UPDATE."],
      solution: "UPDATE"
    },
    {
      level: 5, title: "REST parameter conventions",
      problem: "In REST, how is a specific record target ID conventionally specified for Update or Delete actions?",
      hints: ["It is placed inside the URL path: /users/:id or /users/123."],
      solution: "URL path parameters"
    },
    {
      level: 6, title: "Real-world: Mock database CRUD service",
      problem: "Write a class CRUDService that stores rows in an array and supports create(row), readAll(), update(id, newRow), and delete(id) operations.",
      hints: ["Initialize this.rows = [].", "create pushes row.", "readAll returns this.rows.", "update finds row by id and merges.", "delete filters out row by id."],
      solution: "class CRUDService {\n  constructor() { this.rows = []; }\n  create(row) { this.rows.push(row); }\n  readAll() { return this.rows; }\n  update(id, newRow) {\n    const row = this.rows.find(r => r.id === id);\n    if (row) Object.assign(row, newRow);\n  }\n  delete(id) {\n    this.rows = this.rows.filter(r => r.id !== id);\n  }\n}"
    }
  ],
  interview: [
    {
      q: "What does CRUD stand for, and how does it map to SQL operations?",
      a: "CRUD stands for: 1) Create (maps to SQL 'INSERT'), 2) Read (maps to SQL 'SELECT'), 3) Update (maps to SQL 'UPDATE'), and 4) Delete (maps to SQL 'DELETE')."
    },
    {
      q: "How does CRUD map to HTTP REST API methods?",
      a: "Create maps to 'POST' (typically targeting plural routes, e.g. POST /items). Read maps to 'GET' (e.g. GET /items or GET /items/:id). Update maps to 'PUT' or 'PATCH'. Delete maps to 'DELETE' (e.g. DELETE /items/:id)."
    },
    {
      q: "Why is it an anti-pattern to perform a CRUD Delete using an HTTP GET request?",
      a: "GET requests are designed to be safe and idempotent (only reading data). If you use GET for deletion (e.g., GET /items/delete?id=5), search engine crawlers indexing links will click the URL, triggering unintentional data deletions."
    },
    {
      q: "What is the difference between PUT and PATCH in a CRUD Update operation?",
      a: "PUT replaces the target resource entirely with the new payload data. PATCH performs a partial update, modifying only the fields specified in the request body."
    },
    {
      q: "What is a CRUD API, and how does it differ from RPC or GraphQL?",
      a: "A CRUD REST API maps operations directly to HTTP actions and URLs representing resources. RPC (Remote Procedure Call) executes remote functions (e.g. POST /runDeleteTask). GraphQL uses a single endpoint and query variables to resolve dynamic data trees, bypassing REST method conventions."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Exposes CRUD REST endpoints to let merchants create customers, retrieve charges, update plans, and delete subscriptions." },
    { company: "GitHub", text: "Integrates CRUD APIs to manage issues, comments, and milestones." },
    { company: "Netflix", text: "Coordinates user profiles watch logs using CRUD queries inside Cassandra databases." },
    { company: "OpenAI", text: "Exposes endpoints to let clients create, read, and delete file payloads used in custom models." }
  ],
  quiz: [
    { type: 'mcq', q: 'What does CRUD stand for?', options: ['Create, Read, Update, Delete', 'Code, Run, Upload, Debug', 'Compile, Read, Unit-test, Deploy', 'Cache, Redirect, Unify, Detach'], correct: 0 },
    { type: 'true-false', q: 'The CRUD "Create" operation maps directly to the HTTP "GET" method.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which SQL statement maps to the CRUD "Create" operation?', options: ['SELECT', 'UPDATE', 'INSERT INTO', 'DELETE'], correct: 2 },
    { type: 'code-output', q: "const crudMap = { Create: 'POST' };\nconsole.log(crudMap.Create);", options: ['POST', 'GET', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Which HTTP method is conventionally used to execute the CRUD "Delete" operation?', options: ['POST', 'GET', 'PUT', 'DELETE'], correct: 3 },
    { type: 'true-false', q: 'Using GET requests to delete database records is a secure industry standard.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which SQL statement maps to the CRUD "Update" operation?', options: ['INSERT', 'SELECT', 'UPDATE', 'MODIFY'], correct: 2 },
    { type: 'drag-drop', q: 'Order the CRUD lifecycle steps for a post: [Create post, Read post, Update post, Delete post]', options: ['Create post', 'Read post', 'Update post', 'Delete post'], correct: [0, 1, 2, 3] },
    { type: 'mcq', q: 'Which HTTP method maps to the CRUD "Update" operation (full replacement)?', options: ['GET', 'POST', 'PUT', 'DELETE'], correct: 2 },
    { type: 'code-output', q: "const d = [];\nd.push({ id: 1 });\nd.pop();\nconsole.log(d.length);", options: ['0', '1', 'undefined', 'Error'], correct: 0 }
  ]
});
