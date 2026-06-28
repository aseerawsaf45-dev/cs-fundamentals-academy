/* ==========================================================================
   TOPIC CONTENT DATA — Module 9: Databases
   Includes: SQL, PostgreSQL, Relationships, Indexes, Normalization
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) {
  window.CSFA_RAW_TOPICS = [];
}

// 1. SQL
window.CSFA_RAW_TOPICS.push({
  id: 'sql',
  module: 9,
  title: 'SQL',
  tagline: 'Structured Query Language — querying and manipulating relational database records.',
  readMinutes: 7,
  intro: {
    whatItIs: "SQL (Structured Query Language) is the standard language used to interact with Relational Database Management Systems (RDBMS). It allows developers to define schemas, insert data (INSERT), query records (SELECT), update fields (UPDATE), and delete rows (DELETE).",
    whyItMatters: "Almost all application data lives in databases. Knowing SQL lets you query structured information efficiently, join tables, aggregate fields, and protect database integrity directly.",
    whereUsed: "Used by every backend server communicating with relational databases like PostgreSQL, MySQL, SQLite, and SQL Server.",
    commonMistakes: "Executing modifications or deletions without a WHERE clause (e.g. DELETE FROM users), which wipes out or changes every record in the table."
  },
  visual: {
    caption: "A SELECT query parsing records from a database table",
    type: "db-relations"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Basic SELECT query",
      explanation: "SELECT retrieves columns from a table, filtered by a WHERE clause.",
      code: "const query = 'SELECT name, age FROM users WHERE age >= 18;';\nconsole.log('Constructed query:', query);",
      language: "javascript", output: "Constructed query: SELECT name, age FROM users WHERE age >= 18;"
    },
    {
      difficulty: "easy", title: "Inserting records",
      explanation: "INSERT INTO adds new rows of values into a table.",
      code: "const query = 'INSERT INTO users (name, role) VALUES (\\'Ada\\', \\'admin\\');';\nconsole.log(query);",
      language: "javascript", output: "INSERT INTO users (name, role) VALUES ('Ada', 'admin');"
    },
    {
      difficulty: "medium", title: "Mock database row filtering",
      explanation: "Simulating a SQL SELECT WHERE query in JavaScript arrays.",
      code: "const users = [\n  { name: 'Alice', age: 25 },\n  { name: 'Bob', age: 15 }\n];\nconst selected = users.filter(u => u.age >= 18);\nconsole.log('Selected count:', selected.length, '| first:', selected[0].name);",
      language: "javascript", output: "Selected count: 1 | first: Alice"
    },
    {
      difficulty: "medium-plus", title: "Updating fields",
      explanation: "UPDATE modifies existing table column values matching a filter.",
      code: "const sql = 'UPDATE users SET status = \\'active\\' WHERE id = 42;';\nconsole.log(sql);",
      language: "javascript", output: "UPDATE users SET status = 'active' WHERE id = 42;"
    },
    {
      difficulty: "hard", title: "Joining tables mock",
      explanation: "SQL JOINs merge rows from related tables using primary and foreign keys.",
      code: "const users = { 1: 'Ada' };\nconst posts = [{ id: 101, userId: 1, text: 'Hello' }];\nconst joined = posts.map(p => ({ ...p, userName: users[p.userId] }));\nconsole.log('Joined result username:', joined[0].userName);",
      language: "javascript", output: "Joined result username: Ada"
    },
    {
      difficulty: "real-world", title: "Safe parametrized SQL injection guard",
      explanation: "Real codebases never concatenate user strings directly into SQL queries to prevent security injection exploits; instead they use parametrized inputs.",
      code: "const userIdInput = '42 OR 1=1'; // Malicious input\nfunction unsafeQuery(id) {\n  return `SELECT * FROM users WHERE id = ${id};`;\n}\nfunction safeQuery(id) {\n  return { text: 'SELECT * FROM users WHERE id = $1;', values: [id] };\n}\nconsole.log('Unsafe:', unsafeQuery(userIdInput));\nconsole.log('Safe Parametrized:', safeQuery(userIdInput).text);",
      language: "javascript", output: "Unsafe: SELECT * FROM users WHERE id = 42 OR 1=1;\nSafe Parametrized: SELECT * FROM users WHERE id = $1;"
    }
  ],
  exercises: [
    {
      level: 1, title: "Select all query",
      problem: "Write the SQL query to retrieve all columns and rows from a table named 'products'.",
      hints: ["Use SELECT.", "Use asterisk '*' to specify all columns."],
      solution: "SELECT * FROM products;"
    },
    {
      level: 2, title: "Filter search query",
      problem: "Write the SQL query to select 'name' from 'users' where 'id' is 5.",
      hints: ["Use SELECT name FROM users.", "Add WHERE id = 5;"],
      solution: "SELECT name FROM users WHERE id = 5;"
    },
    {
      level: 3, title: "Add new row query",
      problem: "Write the SQL query to insert a user with name 'Bob' into the 'users' table column 'name'.",
      hints: ["Use INSERT INTO users (name) VALUES ('Bob');"],
      solution: "INSERT INTO users (name) VALUES ('Bob');"
    },
    {
      level: 4, title: "Update email address",
      problem: "Write the SQL query to update the email of user id 10 to 'grace@example.com' in table 'users'.",
      hints: ["Use UPDATE users SET email = 'grace@example.com'.", "Add WHERE id = 10;"],
      solution: "UPDATE users SET email = 'grace@example.com' WHERE id = 10;"
    },
    {
      level: 5, title: "Count posts aggregate",
      problem: "Write the SQL query to count total rows in table 'posts' grouped by 'user_id'.",
      hints: ["Use SELECT user_id, COUNT(*) FROM posts.", "Add GROUP BY user_id;"],
      solution: "SELECT user_id, COUNT(*) FROM posts GROUP BY user_id;"
    },
    {
      level: 6, title: "Real-world: Inner join query",
      problem: "Write the SQL query to select 'users.name' and 'orders.total' by joining 'users' and 'orders' on 'users.id = orders.user_id' for orders where total > 100.",
      hints: ["Use SELECT users.name, orders.total FROM users.", "Add JOIN orders ON users.id = orders.user_id.", "Add WHERE orders.total > 100;"],
      solution: "SELECT users.name, orders.total FROM users JOIN orders ON users.id = orders.user_id WHERE orders.total > 100;"
    }
  ],
  interview: [
    {
      q: "What does SQL stand for, and what is its primary use?",
      a: "SQL stands for Structured Query Language. It is a declarative language used to manage, query, and manipulate data stored in relational databases (RDBMS), which organize data into structured tables connected by schemas."
    },
    {
      q: "What is SQL injection, and how do you prevent it?",
      a: "SQL injection is a security vulnerability where an attacker inputs malicious SQL statements into entry forms, causing the database to execute unauthorized commands. It is prevented by using Parametrized Queries (Prepared Statements), which treat user inputs strictly as parameters, never as executable code."
    },
    {
      q: "Explain what an INNER JOIN does in SQL.",
      a: "An INNER JOIN combines records from two tables by comparing a shared key. It returns only the rows where there is a matching value in both tables, discarding any non-matching rows from either side."
    },
    {
      q: "What is the difference between DELETE and TRUNCATE?",
      a: "DELETE is a DML command that deletes rows matching a WHERE filter sequentially, logging each deletion (slower, can be rolled back). TRUNCATE is a DDL command that deallocates the entire table's storage immediately, bypassing individual row logging (much faster, cannot be rolled back easily in some databases)."
    },
    {
      q: "What does the GROUP BY clause do, and give an example.",
      a: "GROUP BY aggregates rows that have identical values in specified columns into summary rows (e.g. 'group all sales by city'). It is commonly used alongside aggregate functions like COUNT, SUM, AVG, or MAX."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Uses SQL query auditing to track transactions and balance customer ledger balances." },
    { company: "Google", text: "Queries analytics tables containing billions of log records using distributed SQL engine pipelines (BigQuery)." },
    { company: "Amazon", text: "Manages seller inventory lists by querying transactional relational databases." },
    { company: "OpenAI", text: "Stores developer API token registrations and logs in relational database engines queried via SQL." }
  ],
  quiz: [
    { type: 'mcq', q: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Queue Layout', 'Standardized Query List', 'Sequential Query Link'], correct: 0 },
    { type: 'true-false', q: 'Running DELETE FROM table_name without a WHERE clause deletes the table schema from the database.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which statement adds a new row of data to a database table?', options: ['ADD NEW', 'INSERT INTO', 'CREATE ROW', 'UPDATE TABLE'], correct: 1 },
    { type: 'code-output', q: "const q = 'SELECT * FROM users;';\nconsole.log(q.includes('DELETE') ? 'write' : 'read');", options: ['write', 'read', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which clause combines tables using foreign key matches?', options: ['GROUP BY', 'JOIN', 'UNION', 'ORDER BY'], correct: 1 },
    { type: 'true-false', q: 'Parametrized queries prevent SQL injection by converting input variables into query string segments at execution.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which aggregate function calculates the total count of matching rows?', options: ['SUM()', 'COUNT()', 'TOTAL()', 'MAX()'], correct: 1 },
    { type: 'drag-drop', q: 'Order the SQL SELECT components: [SELECT columns, FROM table, WHERE condition]', options: ['SELECT columns', 'FROM table', 'WHERE condition'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which command removes all rows immediately without logging individual row deletions?', options: ['DELETE', 'TRUNCATE', 'DROP', 'REMOVE'], correct: 1 },
    { type: 'code-output', q: "const sql = 'UPDATE users SET status = \\'active\\';';\nconsole.log(sql.includes('WHERE') ? 'safe' : 'dangerous');", options: ['safe', 'dangerous', 'undefined', 'Error'], correct: 1 }
  ]
});

// 2. PostgreSQL
window.CSFA_RAW_TOPICS.push({
  id: 'postgresql',
  module: 9,
  title: 'PostgreSQL',
  tagline: 'Transactional safety, ACID compliance, and robust relational database engine characteristics.',
  readMinutes: 8,
  intro: {
    whatItIs: "PostgreSQL (Postgres) is an advanced, open-source object-relational database system. It supports transactional SQL operations, guarantees ACID compliance, handles JSON data natively, and is highly extensible.",
    whyItMatters: "PostgreSQL is the standard database choice for modern apps. It guarantees that transactions succeed or fail atomically, ensuring financial and user records never get corrupted.",
    whereUsed: "The primary relational database choice for thousands of web platforms, financial tools, and corporate data warehouses.",
    commonMistakes: "Not configuring database connections pools, which leads to exhausting client connections limits under high web traffic."
  },
  visual: {
    caption: "The ACID transaction properties in PostgreSQL",
    type: "db-relations"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Opening a transaction",
      explanation: "Postgres transactions start with BEGIN and commit changes using COMMIT.",
      code: "const transaction = ['BEGIN', 'INSERT INTO user VALUES (1)', 'COMMIT'];\nconsole.log('Transaction path:', transaction.join(' -> '));",
      language: "javascript", output: "Transaction path: BEGIN -> INSERT INTO user VALUES (1) -> COMMIT"
    },
    {
      difficulty: "easy", title: "Transaction rollback",
      explanation: "If an error happens during a transaction, ROLLBACK reverts all edits.",
      code: "const query = ['BEGIN', 'INSERT INTO user VALUES (1)', 'ROLLBACK'];\nconsole.log('Abort result:', query[2]);",
      language: "javascript", output: "Abort result: ROLLBACK"
    },
    {
      difficulty: "medium", title: "JSON query simulation",
      explanation: "Postgres supports querying unstructured JSON data directly inside relational tables using the -> operator.",
      code: "const row = { id: 101, metadata: { ip: '127.0.0.1', agent: 'Chrome' } };\nconsole.log('IP address lookup:', row.metadata.ip);",
      language: "javascript", output: "IP address lookup: 127.0.0.1"
    },
    {
      difficulty: "medium-plus", title: "Mocking ACID Atomicity",
      explanation: "Atomicity ensures that all edits in a transaction succeed together, or all are rolled back.",
      code: "function executeTransaction(steps) {\n  let dbState = 100;\n  try {\n    steps.forEach(s => {\n      if (s < 0 && dbState + s < 0) throw new Error('Insufficient funds');\n      dbState += s;\n    });\n    return { ok: true, state: dbState };\n  } catch (e) {\n    return { ok: false, error: e.message };\n  }\n}\nconsole.log('Tx 1:', executeTransaction([-50, -60]));",
      language: "javascript", output: "Tx 1: { ok: false, error: 'Insufficient funds' }"
    },
    {
      difficulty: "hard", title: "Row Locking simulation",
      explanation: "Postgres locks rows (SELECT FOR UPDATE) to prevent concurrent modifications from overwriting each other.",
      code: "const lockState = { rowId: 42, locked: false };\nfunction acquireLock(id) {\n  if (lockState.rowId === id && lockState.locked) return 'Wait';\n  lockState.locked = true;\n  return 'Locked';\n}\nconsole.log(acquireLock(42), acquireLock(42));",
      language: "javascript", output: "Locked Wait"
    },
    {
      difficulty: "real-world", title: "Database connection pooler",
      explanation: "Connecting to database servers costs memory; pooling reuses active sockets to speed up applications.",
      code: "class Pool {\n  constructor(size) { this.clients = Array(size).fill('client'); }\n  checkout() { return this.clients.pop() || 'create new'; }\n}\nconst dbPool = new Pool(2);\nconsole.log('Client 1:', dbPool.checkout());\nconsole.log('Client 2:', dbPool.checkout());",
      language: "javascript", output: "Client 1: client\nClient 2: client"
    }
  ],
  exercises: [
    {
      level: 1, title: "Start transaction statement",
      problem: "Write the SQL statement that opens a new database transaction.",
      hints: ["The statement is a single word starting with 'B'."],
      solution: "BEGIN;"
    },
    {
      level: 2, title: "Save transaction modifications",
      problem: "Write the SQL statement that commits and saves all active transaction edits.",
      hints: ["The statement is a single word starting with 'C'."],
      solution: "COMMIT;"
    },
    {
      level: 3, title: "Abort transaction modifications",
      problem: "Write the SQL statement that aborts transaction edits, reverting changes.",
      hints: ["The statement is a single word starting with 'R'."],
      solution: "ROLLBACK;"
    },
    {
      level: 4, title: "JSON query format",
      problem: "In PostgreSQL, how do you query a JSON column named 'profile' to extract key 'city'?",
      hints: ["Use the json arrow operator: profile ->> 'city' or profile -> 'city'."],
      solution: "profile ->> 'city'"
    },
    {
      level: 5, title: "Explain ACID Consistency",
      problem: "Briefly explain the 'Consistency' property in ACID.",
      hints: ["Consistency ensures database rules and constraints are enforced before and after transactions."],
      solution: "Consistency guarantees that a transaction can only bring the database from one valid state to another, maintaining all schema rules, keys, and constraint checks."
    },
    {
      level: 6, title: "Real-world: Transaction executor",
      problem: "Write a function runTransaction(client, queries) that executes BEGIN, queries sequentially, and COMMIT. If any query fails, catch it and run ROLLBACK.",
      hints: ["Use try/catch.", "Inside try, execute BEGIN, then loop queries, then COMMIT.", "Inside catch, execute ROLLBACK and throw."],
      solution: "async function runTransaction(client, queries) {\n  try {\n    await client.query('BEGIN');\n    for (const q of queries) {\n      await client.query(q);\n    }\n    await client.query('COMMIT');\n  } catch (err) {\n    await client.query('ROLLBACK');\n    throw err;\n  }\n}"
    }
  ],
  interview: [
    {
      q: "What is PostgreSQL, and why is it preferred over MySQL in many enterprise environments?",
      a: "PostgreSQL is an advanced, open-source object-relational database. It is often preferred over MySQL due to its strict SQL standards compliance, robust ACID safety, superior support for complex query optimizations, native JSONB index structures, and rich extensions ecosystem (like PostGIS)."
    },
    {
      q: "Explain the four properties of ACID transactions.",
      a: "1) Atomicity: All steps succeed together, or all fail and revert. 2) Consistency: Database rules and integrity constraints are preserved. 3) Isolation: Concurrent transactions execute without interfering with one another. 4) Durability: Once committed, changes are written permanently to disk storage and survive power loss."
    },
    {
      q: "What is the difference between JSON and JSONB columns in PostgreSQL?",
      a: "JSON stores data as raw text, requiring re-parsing on every query lookup (faster writes, slower reads). JSONB parses data into a decomposed binary format, allowing indexing (like GIN indexes) for rapid lookups (slower writes, much faster reads)."
    },
    {
      q: "Explain what connection pooling is and why it is critical for databases.",
      a: "Opening a new TCP connection to a database server is expensive and consumes memory. Connection pooling maintains a cache of active database connections that client application threads can reuse, preventing the database from crashing under high connection counts."
    },
    {
      q: "How does Postgres implement concurrent reads and writes without locking the entire table?",
      a: "Postgres uses Multi-Version Concurrency Control (MVCC). Instead of locking tables during updates, Postgres keeps multiple versions of rows. Writers create new row versions, while readers access older snapshots, allowing concurrent reads and writes without blocking."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Relies on PostgreSQL transactional isolation levels to ensure ledger statements balance under high concurrent payment volumes." },
    { company: "Google", text: "Hosts auxiliary configuration databases on PostgreSQL servers with replication setups for high availability." },
    { company: "Netflix", text: "Stores user accounts and subscription billing tables in Postgres databases for consistency." },
    { company: "OpenAI", text: "Manages backend client settings and workspace memberships inside highly-scaled Postgres database servers." }
  ],
  quiz: [
    { type: 'mcq', q: 'What database design standard does PostgreSQL prioritize to ensure safe transaction outcomes?', options: ['ACID compliance', 'CAP theorem', 'NoSQL indexing', 'JSON stringification'], correct: 0 },
    { type: 'true-false', q: 'A transaction rollback leaves half of the database changes saved while discarding the rest.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which Postgres datatype parses JSON data into binary format, allowing lookups to be indexed?', options: ['JSON', 'JSONB', 'VARCHAR', 'BLOB'], correct: 1 },
    { type: 'code-output', q: "const tx = ['BEGIN', 'ROLLBACK'];\nconsole.log(tx.includes('COMMIT') ? 'saved' : 'reverted');", options: ['saved', 'reverted', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which ACID property guarantees that committed changes survive system power loss?', options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'], correct: 3 },
    { type: 'true-false', q: 'PostgreSQL is an open-source database system.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why do applications use database connection pools?', options: ['To encrypt SQL query strings', 'To reuse active connection sockets, improving performance and memory efficiency', 'To replicate data to secondary servers', 'To bypass SQL injection checks'], correct: 1 },
    { type: 'drag-drop', q: 'Order the transaction states: [BEGIN, INSERT/UPDATE queries, COMMIT or ROLLBACK]', options: ['BEGIN', 'INSERT/UPDATE queries', 'COMMIT or ROLLBACK'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What conccurency mechanism does Postgres use to support simultaneous reads and writes without locking tables?', options: ['CORS blocks', 'MVCC (Multi-Version Concurrency Control)', 'Binary Search', 'Linear probing'], correct: 1 },
    { type: 'code-output', q: "const pool = { available: 5 };\nconst getConn = () => pool.available--;\ngetConn();\nconsole.log(pool.available);", options: ['5', '4', 'undefined', 'Error'], correct: 1 }
  ]
});

// 3. Relationships
window.CSFA_RAW_TOPICS.push({
  id: 'relationships',
  module: 9,
  title: 'Relationships',
  tagline: 'Connecting tables using keys — One-to-One, One-to-Many, and Many-to-Many layouts.',
  readMinutes: 7,
  intro: {
    whatItIs: "Relationships define how tables connect in a relational database schema. Tables link to one another using primary keys (unique identifiers) and foreign keys (references pointing to another table's primary key), in One-to-One, One-to-Many, or Many-to-Many configurations.",
    whyItMatters: "Data is naturally relational: users write posts, products belong to orders. Structuring relationships correctly ensures data integrity, prevents duplicate records, and makes joins efficient.",
    whereUsed: "Every relational database schema uses relationships to connect users, profiles, orders, transactions, comments, and posts.",
    commonMistakes: "Forgetting to add Foreign Key constraints in the database, allowing orphaned records (e.g. posts pointing to user IDs that don't exist)."
  },
  visual: {
    caption: "Database relationship layouts and key references",
    type: "db-relations"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Foreign Key reference representation",
      explanation: "A table row stores a reference (foreign key) pointing to the ID of another table row.",
      code: "const user = { id: 1, name: 'Ada' };\nconst post = { id: 101, userId: 1, text: 'Hello' }; // userId is foreign key\nconsole.log('Post linked to user ID:', post.userId);",
      language: "javascript", output: "Post linked to user ID: 1"
    },
    {
      difficulty: "easy", title: "One-to-Many association",
      explanation: "In One-to-Many, one parent row has multiple children referencing its key.",
      code: "const user = { id: 2, name: 'Grace' };\nconst posts = [\n  { id: 1, userId: 2, text: 'Post A' },\n  { id: 2, userId: 2, text: 'Post B' }\n];\nconsole.log('Grace posts count:', posts.length);",
      language: "javascript", output: "Grace posts count: 2"
    },
    {
      difficulty: "medium", title: "Join-Table representation (Many-to-Many)",
      explanation: "Many-to-Many relationships require a middle helper 'Join Table' referencing keys from both tables.",
      code: "const actors = { 1: 'Bob', 2: 'Alice' };\nconst movies = { 101: 'Film A', 102: 'Film B' };\nconst cast = [\n  { actorId: 1, movieId: 101 },\n  { actorId: 1, movieId: 102 },\n  { actorId: 2, movieId: 101 }\n];\nconsole.log('Cast members mapped count:', cast.length);",
      language: "javascript", output: "Cast members mapped count: 3"
    },
    {
      difficulty: "medium-plus", title: "Referential Integrity simulator",
      explanation: "Foreign key constraints prevent deleting parent rows if child references still exist.",
      code: "const state = {\n  users: [{ id: 1 }],\n  posts: [{ id: 101, userId: 1 }]\n};\nfunction deleteUser(id) {\n  const hasPosts = state.posts.some(p => p.userId === id);\n  if (hasPosts) return 'Error: Foreign key constraint violation';\n  state.users = state.users.filter(u => u.id !== id);\n  return 'Deleted';\n}\nconsole.log(deleteUser(1));",
      language: "javascript", output: "Error: Foreign key constraint violation"
    },
    {
      difficulty: "hard", title: "Cascade Delete simulation",
      explanation: "ON DELETE CASCADE tells the database to automatically delete child rows if the parent is deleted.",
      code: "const state = {\n  users: [{ id: 1 }],\n  posts: [{ id: 101, userId: 1 }]\n};\nfunction deleteUserCascade(id) {\n  state.users = state.users.filter(u => u.id !== id);\n  // Cascade delete\n  state.posts = state.posts.filter(p => p.userId !== id);\n}\ndeleteUserCascade(1);\nconsole.log('Posts count after cascade:', state.posts.length);",
      language: "javascript", output: "Posts count after cascade: 0"
    },
    {
      difficulty: "real-world", title: "Mocking ORM model relationship",
      explanation: "Object-Relational Mapping (ORM) tools automate joins by mapping rows to nested objects.",
      code: "const userMap = { 1: { name: 'Ada' } };\nconst posts = [{ id: 10, userId: 1, content: 'Text' }];\nfunction attachUsers(posts) {\n  return posts.map(p => ({ ...p, user: userMap[p.userId] }));\n}\nconsole.log(attachUsers(posts)[0].user.name);",
      language: "javascript", output: "Ada"
    }
  ],
  exercises: [
    {
      level: 1, title: "SQL primary key constraint",
      problem: "Write the SQL column constraint tag that makes an integer ID unique and primary.",
      hints: ["The words are 'PRIMARY KEY'."],
      solution: "PRIMARY KEY"
    },
    {
      level: 2, title: "SQL foreign key reference",
      problem: "Write the SQL command segment that specifies 'user_id' references 'users(id)'.",
      hints: ["Use FOREIGN KEY (user_id) REFERENCES users(id)."],
      solution: "FOREIGN KEY (user_id) REFERENCES users(id)"
    },
    {
      level: 3, title: "Identify relationship type",
      problem: "Name the relationship type between a Customer and their Orders.",
      hints: ["A customer can have multiple orders, but an order belongs to one customer.", "One-to-Many."],
      solution: "One-to-Many"
    },
    {
      level: 4, title: "SQL Cascade delete tag",
      problem: "What SQL keywords are appended to a foreign key reference to delete child rows automatically when parent is deleted?",
      hints: ["The words are 'ON DELETE CASCADE'."],
      solution: "ON DELETE CASCADE"
    },
    {
      level: 5, title: "Represent join table columns",
      problem: "List the minimum two columns required inside a join table for Many-to-Many relations between 'students' and 'courses'.",
      hints: ["The table needs foreign keys pointing to both target tables.", "student_id and course_id."],
      solution: "student_id, course_id"
    },
    {
      level: 6, title: "Real-world: Filter orphaned records",
      problem: "Write a function cleanOrphans(users, posts) that returns a filtered posts array containing only posts whose userId matches an existing user id.",
      hints: ["Map user IDs to a Set.", "Filter posts to keep only those where Set has post.userId."],
      solution: "function cleanOrphans(users, posts) {\n  const userIds = new Set(users.map(u => u.id));\n  return posts.filter(p => userIds.has(p.userId));\n}"
    }
  ],
  interview: [
    {
      q: "Explain Primary Keys and Foreign Keys.",
      a: "A Primary Key is a column (or set of columns) that uniquely identifies each row in a table. A Foreign Key is a column in a table that references the Primary Key of another table, creating a relational link and enforcing referential integrity."
    },
    {
      q: "What is a Many-to-Many relationship, and how do you design it in a database?",
      a: "A Many-to-Many relationship occurs when multiple records in Table A are associated with multiple records in Table B (e.g. students and classes). It is implemented using a middle 'Join Table' (or Junction Table) that contains foreign keys referencing primary keys of both Table A and Table B."
    },
    {
      q: "What does 'ON DELETE CASCADE' do?",
      a: "It is an option configured on foreign key constraints. When a parent row is deleted, the database automatically deletes all child rows referencing that parent key, preventing orphan records and preserving database integrity."
    },
    {
      q: "What is referential integrity?",
      a: "Referential integrity is a database state where all foreign key values are valid. It ensures that references between tables are clean—preventing developers from deleting parent rows that have active child references, or inserting children with invalid parent references."
    },
    {
      q: "Compare one-to-one and one-to-many relationship structures.",
      a: "One-to-One connects exactly one row in Table A to one row in Table B (e.g., User and Profile), usually by putting the foreign key in either table with a UNIQUE constraint. One-to-Many connects one row in Table A to multiple rows in Table B (e.g., User and Posts), by placing the foreign key in Table B without a unique constraint."
    }
  ],
  realWorld: [
    { company: "GitHub", text: "Connects repositories to pull requests using one-to-many foreign key references." },
    { company: "Stripe", text: "Links customer profiles to active subscription rows through indexed foreign key constraints." },
    { company: "Netflix", text: "Maps movies to user watch lists using join tables representing many-to-many configurations." },
    { company: "Google", text: "Tracks document authorizations by mapping groups to folder nodes inside access tables." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which key uniquely identifies each row in its own database table?', options: ['Foreign Key', 'Primary Key', 'Composite Key', 'Index Key'], correct: 1 },
    { type: 'true-false', q: 'A foreign key is a key value stored in a table that references a primary key in another table.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'How is a Many-to-Many relationship implemented in a relational database?', options: ['By adding array columns to both tables', 'Using a middle join table with foreign keys referencing both tables', 'By merging both tables together', 'Using a recursive index key'], correct: 1 },
    { type: 'code-output', q: "const post = { id: 5, user_id: 10 };\nconsole.log(post.user_id);", options: ['5', '10', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'What does ON DELETE CASCADE do?', options: ['Prevents deleting any rows in the database', 'Deletes child rows automatically when the parent row is deleted', 'Throws a foreign key error', 'Encrypts deleted rows'], correct: 1 },
    { type: 'true-false', q: 'One-to-One relationships require the foreign key column to have a UNIQUE constraint.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What error occurs if you try to delete a parent row that still has active child references under a standard foreign key constraint?', options: ['Referential Integrity Violation', 'Syntax Error', 'Null Pointer Error', 'Timeout Error'], correct: 0 },
    { type: 'drag-drop', q: 'Order the relationship steps: [Create parent row, Retrieve parent id, Create child referencing parent id]', options: ['Create parent row', 'Retrieve parent id', 'Create child referencing parent id'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which relationship type connects a User to their Profile?', options: ['One-to-Many', 'Many-to-Many', 'One-to-One', 'Self-join'], correct: 2 },
    { type: 'code-output', q: "const user = { id: 1 };\nconst post = { user_id: 2 };\nconsole.log(user.id === post.user_id ? 'match' : 'mismatch');", options: ['match', 'mismatch', 'undefined', 'Error'], correct: 1 }
  ]
});

// 4. Indexes
window.CSFA_RAW_TOPICS.push({
  id: 'indexes',
  module: 9,
  title: 'Indexes',
  tagline: 'B-Tree structures — speeding up lookup queries from linear to logarithmic time.',
  readMinutes: 8,
  intro: {
    whatItIs: "A Database Index is a data structure (typically a B-Tree) that improves the speed of data retrieval operations on a table at the cost of additional write speed and storage space. Instead of scanning the entire table (Sequential Scan), the database reads the index first to locate rows directly (Index Scan).",
    whyItMatters: "Without indexes, searching for a single record in a table of 1 million rows requires scanning all 1 million rows (O(n) linear complexity). With an index, lookups run in logarithmic time (O(log n)), resolving in dozens of steps.",
    whereUsed: "Applied to frequently searched columns like email, username, sku, and creation timestamps.",
    commonMistakes: "Indexing every single column in a database. While indexing speeds up reads, it slows down writes (INSERT, UPDATE, DELETE) because the database must update all indexes alongside table edits."
  },
  visual: {
    caption: "A B-Tree database index pointing directly to row addresses",
    type: "db-index"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Index creation command",
      explanation: "CREATE INDEX builds an index structure on a specific table column.",
      code: "const sql = 'CREATE INDEX idx_users_email ON users(email);';\nconsole.log(sql);",
      language: "javascript", output: "CREATE INDEX idx_users_email ON users(email);"
    },
    {
      difficulty: "easy", title: "Sequential scan mock",
      explanation: "Scanning an array sequentially from start to end without an index.",
      code: "const users = [{ email: 'a@a.com' }, { email: 'b@b.com' }];\nlet steps = 0;\nfunction findEmail(email) {\n  for (const u of users) { steps++; if (u.email === email) return u; }\n}\nfindEmail('b@b.com');\nconsole.log('Sequential scan steps:', steps);",
      language: "javascript", output: "Sequential scan steps: 2"
    },
    {
      difficulty: "medium", title: "Index lookup simulation",
      explanation: "Using a key-value Map to mock a database index lookup, skipping array scans.",
      code: "const index = new Map([['b@b.com', { id: 101, name: 'Bob' }]]);\nlet steps = 0;\nfunction findWithIndex(email) {\n  steps++; // direct map check\n  return index.get(email);\n}\nfindWithIndex('b@b.com');\nconsole.log('Index lookup steps:', steps);",
      language: "javascript", output: "Index lookup steps: 1"
    },
    {
      difficulty: "medium-plus", title: "Why writes are slower with indexes",
      explanation: "Adding a record requires updating the table AND all indexes associated with it.",
      code: "const table = [];\nconst index = new Map();\nfunction insertRecord(id, email) {\n  const row = { id, email };\n  table.push(row); // write to table\n  index.set(email, row); // write to index (extra step)\n  return 'Inserted';\n}\nconsole.log(insertRecord(1, 'ada@example.com'));",
      language: "javascript", output: "Inserted"
    },
    {
      difficulty: "hard", title: "Query optimizer scan simulation",
      explanation: "A database query planner determines whether to use an index based on the query structure.",
      code: "function explainQuery(hasIndex, isWildcard) {\n  if (hasIndex && !isWildcard) return 'Index Scan';\n  return 'Seq Scan';\n}\nconsole.log('Standard query:', explainQuery(true, false));\nconsole.log('Prefix wildcard query:', explainQuery(true, true));",
      language: "javascript", output: "Index Scan\nSeq Scan"
    },
    {
      difficulty: "real-world", title: "Multi-column composite index planner",
      explanation: "Real databases use composite indexes (multi-column) to speed up queries containing multiple filters.",
      code: "const index = new Map([['active_US', [{ id: 1 }]]]);\nfunction searchActiveInUS(status, country) {\n  const key = status + '_' + country;\n  return index.get(key) || [];\n}\nconsole.log('Results count:', searchActiveInUS('active', 'US').length);",
      language: "javascript", output: "Results count: 1"
    }
  ],
  exercises: [
    {
      level: 1, title: "Create SQL index",
      problem: "Write the SQL command to create an index named 'idx_prod_sku' on column 'sku' of table 'products'.",
      hints: ["Use CREATE INDEX idx_prod_sku ON products(sku);"],
      solution: "CREATE INDEX idx_prod_sku ON products(sku);"
    },
    {
      level: 2, title: "Unique index SQL",
      problem: "Write the SQL command to create a unique index named 'idx_user_email' on column 'email' of table 'users'.",
      hints: ["Add UNIQUE keyword: CREATE UNIQUE INDEX ..."],
      solution: "CREATE UNIQUE INDEX idx_user_email ON users(email);"
    },
    {
      level: 3, title: "Identify lookup time",
      problem: "What is the average time complexity of performing a search on a B-Tree indexed column?",
      hints: ["B-Trees are branching trees, halving bounds.", "It is O(log n)."],
      solution: "O(log n)"
    },
    {
      level: 4, title: "Explain write overhead",
      problem: "Why does adding multiple indexes to a table slow down INSERT queries?",
      hints: ["The database must physically calculate and write to the index structures as well as the main table storage."],
      solution: "Every new index requires the database to calculate and insert new pointers into the B-Tree structures, adding computational and disk write overhead during inserts."
    },
    {
      level: 5, title: "Identify index scan type",
      problem: "What is the name of the database scan type that reads the entire table row-by-row?",
      hints: ["It checks rows sequentially.", "Sequential Scan (or Table Scan)."],
      solution: "Sequential Scan (Seq Scan)"
    },
    {
      level: 6, title: "Real-world: Composite index ordering rule",
      problem: "Write a function validatesCompositeIndexUsage(indexColumns, queryFilters) that returns true if queryFilters can utilize a composite index on indexColumns (obeying the left-prefix rule: first column must be filtered).",
      hints: ["Check if queryFilters contains the first column in the indexColumns array."],
      solution: "function validatesCompositeIndexUsage(indexColumns, queryFilters) {\n  if (indexColumns.length === 0) return false;\n  return queryFilters.includes(indexColumns[0]);\n}"
    }
  ],
  interview: [
    {
      q: "How does a database index speed up lookup queries?",
      a: "An index acts like the index of a textbook. Instead of scanning the entire table page-by-page (Sequential Scan), the database queries a sorted B-Tree index structure. This allows it to locate the exact storage page address of the matching rows in logarithmic time O(log n), bypassing linear table reads."
    },
    {
      q: "What are the trade-offs of adding database indexes?",
      a: "The trade-offs are read speed vs write speed and storage space. While indexes speed up retrieval queries (SELECT), they slow down modification write queries (INSERT, UPDATE, DELETE) because the database must rebuild the B-Tree indices, and they consume extra storage memory on disk."
    },
    {
      q: "What is a B-Tree index, and why is it preferred over a binary tree?",
      a: "A B-Tree (Balanced Tree) is a self-balancing search tree designed to work efficiently on disk storage. Unlike binary trees where nodes have up to 2 children, B-Tree nodes can have hundreds of children (high branching factor). This minimizes disk reads by keeping the tree extremely shallow (usually 3-4 levels deep even for millions of rows)."
    },
    {
      q: "What is a Composite Index, and what is the 'leftmost prefix' rule?",
      a: "A Composite Index is an index built on multiple columns (e.g. status, country). The leftmost prefix rule states that the index can only speed up queries if they filter by the first column in the index definition. A query filtering only by 'country' cannot utilize a composite index on (status, country)."
    },
    {
      q: "What does the EXPLAIN keyword do in SQL?",
      a: "The EXPLAIN keyword displays the execution plan generated by the database query optimizer. It details how the database will execute the query—such as whether it will use an Index Scan (fast) or fall back to a Sequential Scan (slow), and the estimated cost."
    }
  ],
  realWorld: [
    { company: "Amazon", text: "Indexes SKU and customer order ID columns to maintain rapid search lookups across database tables." },
    { company: "Stripe", text: "Applies indexes to charge transaction tokens to ensure API status checks respond within milliseconds." },
    { company: "Google", text: "Applies indexing B-Tree partitions to log files to speed up analytics dashboards." },
    { company: "Netflix", text: "Uses indexes on user profile IDs to retrieve watch lists instantly on client app load." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the primary data structure used for database indexes?', options: ['Queue', 'Linked List', 'B-Tree', 'Stack'], correct: 2 },
    { type: 'true-false', q: 'Adding an index to a column improves the speed of both SELECT and INSERT queries on that table.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is the time complexity of searching a value on an indexed column?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct: 1 },
    { type: 'code-output', q: "const index = new Map([['id_1', 'row']]);\nconsole.log(index.has('id_1') ? 'hit' : 'miss');", options: ['hit', 'miss', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'What SQL keyword displays the query execution plan details, including scan types?', options: ['SHOW', 'EXPLAIN', 'ANALYZE', 'LOOKUP'], correct: 1 },
    { type: 'true-false', q: 'A composite index built on (first_name, last_name) can be utilized by a query filtering only by last_name.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is a Sequential Scan (Seq Scan)?', options: ['A fast binary tree search', 'Reading the entire table row-by-row from disk', 'Caching index keys in memory', 'Aborting transaction edits'], correct: 1 },
    { type: 'drag-drop', q: 'Order the database retrieval efficiency (best to worst): [Index Scan, Sequential Scan, Disk Swap Scan]', options: ['Index Scan', 'Sequential Scan', 'Disk Swap Scan'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which column is a natural candidate for database indexing?', options: ['A large text comment column', 'Frequently filtered search keys (e.g. email, status)', 'Rarely queried attributes', 'Boolean true/false flags with uniform distributions'], correct: 1 },
    { type: 'code-output', q: "const plan = { type: 'Index Scan', cost: 10 };\nconsole.log(plan.type.includes('Scan') ? 'Scan' : 'Rebuild');", options: ['Scan', 'Rebuild', 'undefined', 'Error'], correct: 0 }
  ]
});

// 5. Normalization
window.CSFA_RAW_TOPICS.push({
  id: 'normalization',
  module: 9,
  title: 'Normalization',
  tagline: 'Database design rules — First, Second, and Third Normal Forms (1NF, 2NF, 3NF).',
  readMinutes: 8,
  intro: {
    whatItIs: "Database Normalization is the systematic process of organizing fields and tables of a relational database to minimize data redundancy (duplication) and avoid update anomalies. It divides large tables into smaller, linked tables using specific rules called Normal Forms.",
    whyItMatters: "Denormalized databases cause bugs. If user details are duplicated across multiple orders, updating their address requires editing multiple rows; forgetting one leads to inconsistent state (update anomaly).",
    whereUsed: "Essential guideline during database architecture and schema design phases in relational software projects.",
    commonMistakes: "Storing comma-separated list strings inside a single database column, violating First Normal Form (1NF) atomic requirements."
  },
  visual: {
    caption: "Normalization progression: splitting tables to remove redundancies",
    type: "os-layers-diagram"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Non-atomic table format (Violating 1NF)",
      explanation: "Storing multiple values in a single cell prevents indexing and SQL filtering.",
      code: "const badRow = { id: 1, name: 'Bob', phones: '555-0101, 555-0102' };\nconsole.log('Un-normalized cell value:', badRow.phones);",
      language: "javascript", output: "Un-normalized cell value: 555-0101, 555-0102"
    },
    {
      difficulty: "easy", title: "Atomic table format (1NF compliance)",
      explanation: "1NF requires each table cell to contain atomic (indivisible) values, splitting arrays into rows.",
      code: "const normalizedRows = [\n  { id: 1, name: 'Bob', phone: '555-0101' },\n  { id: 1, name: 'Bob', phone: '555-0102' }\n];\nconsole.log('First phone:', normalizedRows[0].phone);",
      language: "javascript", output: "First phone: 555-0101"
    },
    {
      difficulty: "medium", title: "Data redundancy duplicate records anomaly",
      explanation: "Duplicating user cities across multiple product orders creates redundant data.",
      code: "const orders = [\n  { id: 101, user: 'Ada', city: 'London', item: 'Book' },\n  { id: 102, user: 'Ada', city: 'Paris', item: 'Pen' } // Anomaly: Ada city mismatch!\n];\nconsole.log('City records mismatch detected:', orders[0].city !== orders[1].city);",
      language: "javascript", output: "City records mismatch detected: true"
    },
    {
      difficulty: "medium-plus", title: "2NF table split simulation",
      explanation: "2NF splits tables to remove partial dependencies (where columns depend on only part of a composite key).",
      code: "const orders = [{ id: 101, userId: 1, itemId: 50 }];\nconst users = [{ id: 1, name: 'Ada', city: 'London' }]; // split profile out\nconsole.log('User profile decoupled from orders table');",
      language: "javascript", output: "User profile decoupled from orders table"
    },
    {
      difficulty: "hard", title: "3NF transit dependency resolution",
      explanation: "3NF requires removing transitive dependencies, where a non-key column depends on another non-key column.",
      code: "const zipCodes = { 'NW1': 'London' }; // transitive data decoupled\nconst users = [{ id: 1, name: 'Ada', zip: 'NW1' }];\nconsole.log('User city via Zip Code lookup:', zipCodes[users[0].zip]);",
      language: "javascript", output: "User city via Zip Code lookup: London"
    },
    {
      difficulty: "real-world", title: "Refactoring database update state anomalies",
      explanation: "Normalized tables ensure editing user profile fields requires updating exactly one row.",
      code: "const userProfiles = { 1: { name: 'Ada', city: 'London' } };\nfunction updateCity(userId, newCity) {\n  userProfiles[userId].city = newCity; // exactly 1 write\n  return 'Updated';\n}\nconsole.log(updateCity(1, 'Paris'), '| City state:', userProfiles[1].city);",
      language: "javascript", output: "Updated | City state: Paris"
    }
  ],
  exercises: [
    {
      level: 1, title: "1NF atomic rule check",
      problem: "True or False: First Normal Form (1NF) allows storing lists of tags as comma-separated values in a single cell.",
      hints: ["1NF requires values to be atomic (single indivisible values).", "False."],
      solution: "False"
    },
    {
      level: 2, title: "Name normal form levels",
      problem: "Write the name of the normal form level that requires all attributes to depend on the primary key, the whole primary key, and nothing but the primary key.",
      hints: ["The phrase describes removing partial dependencies.", "Second Normal Form (2NF)."],
      solution: "Second Normal Form"
    },
    {
      level: 3, title: "Identify transit dependency form",
      problem: "Which normal form level addresses removing transitive dependencies (non-key columns depending on other non-key columns)?",
      hints: ["It follows 2NF.", "Third Normal Form (3NF)."],
      solution: "Third Normal Form"
    },
    {
      level: 4, title: "Analyze redundancy anomaly",
      problem: "Identify the type of database anomaly where deleting a student row accidentally deletes a course registration record because they were stored in the same table.",
      hints: ["It's a Deletion Anomaly."],
      solution: "Deletion Anomaly"
    },
    {
      level: 5, title: "Design split schema columns",
      problem: "Given a denormalized row { order_id, product_name, price }, split it into two tables, listing the columns for each table to achieve 2NF.",
      hints: ["Create a Products table and an Orders table linked by a foreign key.", "Table 1: Products (product_id, name, price). Table 2: Orders (order_id, product_id)."],
      solution: "Table 1: Products(product_id, name, price). Table 2: Orders(order_id, product_id)."
    },
    {
      level: 6, title: "Real-world: Detect un-normalized lists",
      problem: "Write a function scanTableFor1NF(rows) that returns false if any row contains a column value with a comma separator, indicating non-atomic values.",
      hints: ["Check each value in the row object.", "If typeof value === 'string' and value.includes(','), return false."],
      solution: "function scanTableFor1NF(rows) {\n  for (const row of rows) {\n    for (const key in row) {\n      if (typeof row[key] === 'string' && row[key].includes(',')) {\n        return false;\n      }\n    }\n  }\n  return true;\n}"
    }
  ],
  interview: [
    {
      q: "What is database normalization, and why is it important?",
      a: "Database Normalization is the process of structuring relational tables to reduce data redundancy and eliminate update anomalies. It ensures data consistency by storing each fact in exactly one place, linking tables via key relationships."
    },
    {
      q: "Explain First Normal Form (1NF).",
      a: "First Normal Form (1NF) requires that: 1) Table cells contain only atomic (indivisible) values, meaning no arrays or comma-separated lists. 2) There are no repeating groups of columns (e.g. phone1, phone2). 3) Each row has a unique identifier (Primary Key)."
    },
    {
      q: "Explain Second Normal Form (2NF).",
      a: "To meet 2NF, a table must be in 1NF and have no partial dependencies—meaning all non-key columns must depend on the entire primary key, not a portion of it (which only applies to composite primary keys). Partial dependencies are resolved by splitting tables."
    },
    {
      q: "Explain Third Normal Form (3NF).",
      a: "To meet 3NF, a table must be in 2NF and have no transitive dependencies. A transitive dependency occurs when a non-key column depends on another non-key column (e.g., in a table with columns UserID, ZipCode, City, 'City' depends on 'ZipCode', which depends on 'UserID'). These are resolved by creating a separate lookup table."
    },
    {
      q: "When would you intentionally 'denormalize' a database?",
      a: "Denormalization (introducing redundancy intentionally) is used in high-read environments like data warehouses or scaled analytics platforms to avoid expensive table joins, improving SELECT query speeds at the cost of extra storage and more complex write operations."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Enforces 3NF schemas across core billing ledgers to guarantee strict accounting consistency." },
    { company: "Google", text: "Denormalizes search history log partitions to accelerate queries across large clusters." },
    { company: "Netflix", text: "Normalizes user account credentials for security, but denormalizes watch logs for real-time recommendation feeds." },
    { company: "Amazon", text: "Uses normalized order schemas to prevent anomalies in inventory shipping transactions." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the primary goal of database normalization?', options: ['To encrypt data records', 'To minimize data redundancy and prevent anomalies', 'To merge all tables together', 'To bypass SQL joins'], correct: 1 },
    { type: 'true-false', q: 'First Normal Form (1NF) allows storing comma-separated lists of values inside a single cell.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which normal form level addresses partial dependencies (attributes depending on only part of a composite key)?', options: ['1NF', '2NF', '3NF', 'BCNF'], correct: 1 },
    { type: 'code-output', q: "const check = (val) => val.includes(',') ? 'denormalized' : 'atomic';\nconsole.log(check('John,Doe'));", options: ['denormalized', 'atomic', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Which normal form level addresses transitive dependencies (non-key columns depending on other non-key columns)?', options: ['1NF', '2NF', '3NF', '4NF'], correct: 2 },
    { type: 'true-false', q: 'A denormalized database is generally faster for write operations (INSERT) compared to a fully normalized database.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What type of anomaly occurs when updating a duplicated data value in one row leaves outdated versions in other rows?', options: ['Insertion anomaly', 'Deletion anomaly', 'Update anomaly', 'CORS anomaly'], correct: 2 },
    { type: 'drag-drop', q: 'Order the normalization stages: [1NF atomic cells, 2NF no partial dependencies, 3NF no transitive dependencies]', options: ['1NF atomic cells', '2NF no partial dependencies', '3NF no transitive dependencies'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which normal form requires each table to have a primary key?', options: ['1NF', '2NF', '3NF', 'None'], correct: 0 },
    { type: 'code-output', q: "const schema = { orders: ['id', 'user_id'], users: ['id', 'zip'] };\nconsole.log(schema.users.includes('zip') ? '3nf-split-needed' : 'clean');", options: ['3nf-split-needed', 'clean', 'undefined', 'Error'], correct: 0 }
  ]
});
