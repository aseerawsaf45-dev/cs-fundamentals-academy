/* ==========================================================================
   MODULES METADATA — all 65 modules across 20 phases.
   Modules 1–12 retain existing topic IDs (full content built).
   Modules 13–65 use m<N>-<slug> IDs to avoid collisions.
   ========================================================================== */

window.CSFA_RAW_MODULES = [
  /* ── PHASE 1: Digital & Computer Foundations ── */
  {
    num: 1, id: 'module-1', icon: '🖥️', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'Computer Fundamentals',
    description: 'How a computer actually works under the hood — and how the internet moves your requests around the world.',
    topics: ['how-computers-work', 'cpu', 'ram', 'storage', 'operating-systems', 'command-line', 'internet-basics', 'http', 'https', 'dns'],
  },
  {
    num: 2, id: 'module-2', icon: '🧩', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'Programming Fundamentals',
    description: 'The building blocks every language shares: variables, logic, loops, and functions.',
    topics: ['variables', 'data-types', 'conditions', 'loops', 'functions', 'scope', 'arrays', 'objects', 'error-handling'],
  },
  {
    num: 3, id: 'module-3', icon: '📄', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'HTML Fundamentals',
    description: 'The structural language of the web — elements, forms, and accessible semantic markup.',
    topics: ['elements', 'forms', 'semantic-html', 'accessibility', 'tables', 'media'],
  },
  {
    num: 4, id: 'module-4', icon: '🎨', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'CSS Fundamentals',
    description: 'Styling, layout systems, and the responsive techniques behind every modern interface.',
    topics: ['selectors', 'box-model', 'flexbox', 'grid', 'responsive-design', 'animations'],
  },
  {
    num: 5, id: 'module-5', icon: '⚡', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'JavaScript Fundamentals',
    description: 'The language that runs the browser: the DOM, events, closures, and async programming.',
    topics: ['dom', 'events', 'js-functions', 'closures', 'async-await', 'promises', 'fetch-api', 'modules'],
  },

  /* ── PHASE 2: Operating Systems & Linux ── */
  {
    num: 6, id: 'module-6', icon: '🌿', phase: 'Phase 2 — Operating Systems & Linux',
    name: 'Git and GitHub',
    description: 'Version control fundamentals for working solo or shipping with a team — and with AI agents.',
    topics: ['repositories', 'commits', 'branches', 'merging', 'pull-requests'],
  },
  {
    num: 7, id: 'module-7', icon: '🗂️', phase: 'Phase 2 — Operating Systems & Linux',
    name: 'Data Structures',
    description: 'The shapes data takes in memory, and why choosing the right one changes everything.',
    topics: ['ds-arrays', 'linked-lists', 'stacks', 'queues', 'trees', 'graphs', 'hash-maps'],
  },
  {
    num: 8, id: 'module-8', icon: '🧠', phase: 'Phase 2 — Operating Systems & Linux',
    name: 'Algorithms',
    description: 'Reasoning about how code performs, and the classic techniques for searching, sorting, and traversal.',
    topics: ['sorting', 'searching', 'recursion', 'binary-search', 'bfs', 'dfs', 'big-o'],
  },
  {
    num: 9, id: 'module-9', icon: '🗄️', phase: 'Phase 2 — Operating Systems & Linux',
    name: 'Databases',
    description: 'How structured data is stored, related, and queried at scale.',
    topics: ['sql', 'postgresql', 'relationships', 'indexes', 'normalization'],
  },

  /* ── PHASE 3: Networking & Internet ── */
  {
    num: 10, id: 'module-10', icon: '🔌', phase: 'Phase 3 — Networking & Internet',
    name: 'Backend Development',
    description: 'Client-server architecture, REST APIs, and the auth systems that protect them.',
    topics: ['client-server', 'rest-apis', 'authentication', 'authorization', 'jwt', 'crud'],
  },
  {
    num: 11, id: 'module-11', icon: '⚛️', phase: 'Phase 3 — Networking & Internet',
    name: 'React & Modern Frontend',
    description: 'Component-based UI: props, state, hooks, and the patterns behind modern frontends.',
    topics: ['components', 'props', 'state', 'hooks', 'routing', 'context-api'],
  },
  {
    num: 12, id: 'module-12', icon: '🏛️', phase: 'Phase 3 — Networking & Internet',
    name: 'Software Engineering',
    description: 'The craft beyond syntax: clean code, testing, design patterns, and architecture.',
    topics: ['clean-code', 'testing', 'solid', 'design-patterns', 'architecture', 'refactoring'],
  },

  /* ── PHASE 1 (Detailed) — Digital Literacy ── */
  {
    num: 13, id: 'module-13', icon: '💡', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'Digital Literacy',
    description: 'What computers really are, how hardware and software relate, and why binary is the universal language of machines.',
    topics: ['m13-what-is-computer', 'm13-types-computers', 'm13-hardware-software', 'm13-input-output', 'm13-storage-devices', 'm13-memory-basics', 'm13-os-intro', 'm13-applications', 'm13-files-extensions', 'm13-binary-human'],
  },
  {
    num: 14, id: 'module-14', icon: '⚙️', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'Computer Architecture',
    description: 'Inside the CPU: how the ALU, registers, control unit, and clock turn raw transistors into computation.',
    topics: ['m14-von-neumann', 'm14-cpu-components', 'm14-alu', 'm14-registers', 'm14-control-unit', 'm14-instruction-cycle', 'm14-clock-speed', 'm14-multi-core', 'm14-gpu-vs-cpu', 'm14-cache-memory'],
  },
  {
    num: 15, id: 'module-15', icon: '🔢', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'Number Systems',
    description: 'Decimal, binary, octal, and hex — the four counting systems that power every digital device.',
    topics: ['m15-decimal', 'm15-binary', 'm15-octal', 'm15-hexadecimal', 'm15-binary-arithmetic', 'm15-twos-complement', 'm15-floating-point', 'm15-char-encoding', 'm15-unicode', 'm15-ascii'],
  },
  {
    num: 16, id: 'module-16', icon: '🔀', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'Digital Logic',
    description: 'Logic gates, Boolean algebra, and the circuits that make arithmetic and memory possible at the hardware level.',
    topics: ['m16-logic-gates', 'm16-boolean-algebra', 'm16-truth-tables', 'm16-flip-flops', 'm16-multiplexers', 'm16-adders', 'm16-memory-circuits', 'm16-cpu-logic'],
  },
  {
    num: 17, id: 'module-17', icon: '🧮', phase: 'Phase 1 — Digital & Computer Foundations',
    name: 'Computer Memory',
    description: 'RAM, ROM, cache, stack, heap, virtual memory — why every type of memory exists and what your program uses.',
    topics: ['m17-ram', 'm17-rom', 'm17-cache', 'm17-registers-mem', 'm17-stack-memory', 'm17-heap-memory', 'm17-virtual-memory', 'm17-memory-allocation', 'm17-garbage-collection'],
  },

  /* ── PHASE 2 (Detailed) — Operating Systems & Linux ── */
  {
    num: 18, id: 'module-18', icon: '🖧', phase: 'Phase 2 — Operating Systems & Linux',
    name: 'Operating Systems Deep Dive',
    description: 'Processes, threads, scheduling, system calls, deadlocks — the software that manages every resource on your machine.',
    topics: ['m18-processes', 'm18-threads', 'm18-scheduling', 'm18-context-switching', 'm18-system-calls', 'm18-file-systems', 'm18-memory-management', 'm18-interrupts', 'm18-deadlocks'],
  },
  {
    num: 19, id: 'module-19', icon: '🐧', phase: 'Phase 2 — Operating Systems & Linux',
    name: 'Linux Fundamentals',
    description: 'Navigate the Linux filesystem, control permissions, manage users and groups, and understand environment variables.',
    topics: ['m19-linux-filesystem', 'm19-directory-structure', 'm19-permissions', 'm19-ownership', 'm19-users-groups', 'm19-shell', 'm19-env-variables'],
  },
  {
    num: 20, id: 'module-20', icon: '💻', phase: 'Phase 2 — Operating Systems & Linux',
    name: 'Command Line Mastery',
    description: 'Every essential shell command — from pwd and ls to grep, find, pipes, and redirection.',
    topics: ['m20-pwd-ls-cd', 'm20-mkdir-touch', 'm20-cp-mv-rm', 'm20-cat-nano-vim', 'm20-grep-find', 'm20-chmod-chown', 'm20-pipes-redirection'],
  },
  {
    num: 21, id: 'module-21', icon: '📜', phase: 'Phase 2 — Operating Systems & Linux',
    name: 'Shell Scripting',
    description: 'Variables, loops, conditions, functions, and scheduling — automate everything with Bash.',
    topics: ['m21-variables', 'm21-loops', 'm21-conditions', 'm21-functions', 'm21-automation', 'm21-scheduling', 'm21-bash-scripts'],
  },

  /* ── PHASE 3 (Detailed) — Networking & Internet ── */
  {
    num: 22, id: 'module-22', icon: '🌐', phase: 'Phase 3 — Networking & Internet',
    name: 'Networking Fundamentals',
    description: 'LANs, WANs, routers, switches, IP addresses, MAC addresses, ports, and how packets travel the internet.',
    topics: ['m22-lan-wan', 'm22-internet', 'm22-routers-switches', 'm22-ip-address', 'm22-mac-address', 'm22-ports', 'm22-packets'],
  },
  {
    num: 23, id: 'module-23', icon: '📡', phase: 'Phase 3 — Networking & Internet',
    name: 'TCP/IP',
    description: 'TCP, UDP, IPv4, IPv6, routing, NAT, subnetting, and DNS — the full internet protocol stack.',
    topics: ['m23-tcp', 'm23-udp', 'm23-ipv4-ipv6', 'm23-routing', 'm23-nat', 'm23-subnetting', 'm23-dns'],
  },
  {
    num: 24, id: 'module-24', icon: '🔗', phase: 'Phase 3 — Networking & Internet',
    name: 'HTTP & The Web',
    description: 'HTTP, HTTPS, SSL/TLS, cookies, sessions, and the full request/response lifecycle that powers every website.',
    topics: ['m24-http', 'm24-https', 'm24-ssl-tls', 'm24-cookies', 'm24-sessions', 'm24-browser-lifecycle', 'm24-request-response', 'm24-rest'],
  },
  {
    num: 25, id: 'module-25', icon: '🌍', phase: 'Phase 3 — Networking & Internet',
    name: 'Browser Internals',
    description: 'How browsers parse, paint, and render: the DOM, CSSOM, JavaScript engine, event loop, and rendering pipeline.',
    topics: ['m25-rendering-engine', 'm25-dom', 'm25-cssom', 'm25-js-engine', 'm25-event-loop', 'm25-rendering-pipeline'],
  },

  /* ── PHASE 4 (Detailed) — Programming Foundations ── */
  {
    num: 26, id: 'module-26', icon: '📝', phase: 'Phase 4 — Programming Foundations',
    name: 'Programming Basics',
    description: 'Variables, constants, data types, operators, expressions — the atoms of every program ever written.',
    topics: ['m26-variables-constants', 'm26-data-types-prog', 'm26-operators', 'm26-expressions', 'm26-input-output'],
  },
  {
    num: 27, id: 'module-27', icon: '🔀', phase: 'Phase 4 — Programming Foundations',
    name: 'Control Flow',
    description: 'if/else, switch, every loop type, break, and continue — directing the path your code takes.',
    topics: ['m27-if-else', 'm27-switch', 'm27-loops-cf', 'm27-break-continue'],
  },
  {
    num: 28, id: 'module-28', icon: '🔧', phase: 'Phase 4 — Programming Foundations',
    name: 'Functions Deep Dive',
    description: 'Parameters, arguments, return values, scope, and recursion — thinking in reusable units of logic.',
    topics: ['m28-params-args', 'm28-return-values', 'm28-scope-fn', 'm28-recursion-fn'],
  },
  {
    num: 29, id: 'module-29', icon: '📦', phase: 'Phase 4 — Programming Foundations',
    name: 'Data Structures in Programming',
    description: 'Arrays, objects, maps, sets, and strings as first-class language constructs in modern code.',
    topics: ['m29-arrays-prog', 'm29-objects-prog', 'm29-maps-sets', 'm29-strings'],
  },
  {
    num: 30, id: 'module-30', icon: '🚨', phase: 'Phase 4 — Programming Foundations',
    name: 'Error Handling',
    description: 'try/catch/throw/finally, debugging techniques, and writing code that fails gracefully.',
    topics: ['m30-try-catch', 'm30-throw-finally', 'm30-debugging'],
  },

  /* ── PHASE 5 (Detailed) — HTML & CSS ── */
  {
    num: 31, id: 'module-31', icon: '📄', phase: 'Phase 5 — HTML & CSS',
    name: 'HTML In Depth',
    description: 'Semantic HTML, forms, tables, accessibility, and SEO — the structural markup professionals write.',
    topics: ['m31-semantic-html', 'm31-forms-html', 'm31-tables-html', 'm31-accessibility', 'm31-seo-basics'],
  },
  {
    num: 32, id: 'module-32', icon: '🎨', phase: 'Phase 5 — HTML & CSS',
    name: 'CSS Foundations Deep Dive',
    description: 'Selectors, the box model, positioning, Flexbox, and CSS Grid — mastering layout.',
    topics: ['m32-selectors', 'm32-box-model', 'm32-positioning', 'm32-flexbox', 'm32-grid'],
  },
  {
    num: 33, id: 'module-33', icon: '📱', phase: 'Phase 5 — HTML & CSS',
    name: 'Responsive Design',
    description: 'Media queries, mobile-first strategy, CSS units, and modern layout systems that adapt to any screen.',
    topics: ['m33-media-queries', 'm33-mobile-first', 'm33-css-units', 'm33-layout-systems'],
  },
  {
    num: 34, id: 'module-34', icon: '✨', phase: 'Phase 5 — HTML & CSS',
    name: 'Advanced CSS',
    description: 'Animations, transitions, CSS variables, gradients, glassmorphism, and modern UI techniques.',
    topics: ['m34-animations', 'm34-transitions', 'm34-css-variables', 'm34-gradients', 'm34-glassmorphism'],
  },

  /* ── PHASE 6 (Detailed) — JavaScript ── */
  {
    num: 35, id: 'module-35', icon: '⚡', phase: 'Phase 6 — JavaScript',
    name: 'JavaScript Basics',
    description: 'Syntax, variables, data types, and operators — JavaScript from the ground up.',
    topics: ['m35-js-syntax', 'm35-js-variables', 'm35-js-data-types', 'm35-js-operators'],
  },
  {
    num: 36, id: 'module-36', icon: '🎯', phase: 'Phase 6 — JavaScript',
    name: 'Functions & Scope',
    description: 'Arrow functions, closures, and hoisting — the subtleties that trip up every JS developer.',
    topics: ['m36-arrow-functions', 'm36-closures', 'm36-hoisting'],
  },
  {
    num: 37, id: 'module-37', icon: '🗃️', phase: 'Phase 6 — JavaScript',
    name: 'Objects & Arrays',
    description: 'Object methods, array methods, destructuring, spread, and rest — working with collections in JavaScript.',
    topics: ['m37-object-methods', 'm37-array-methods', 'm37-destructuring', 'm37-spread-rest'],
  },
  {
    num: 38, id: 'module-38', icon: '🖱️', phase: 'Phase 6 — JavaScript',
    name: 'DOM Manipulation',
    description: 'Querying the DOM tree, responding to events, handling forms, and building dynamic UIs.',
    topics: ['m38-dom-tree', 'm38-events-dom', 'm38-forms-dom', 'm38-dynamic-ui'],
  },
  {
    num: 39, id: 'module-39', icon: '⏳', phase: 'Phase 6 — JavaScript',
    name: 'Async JavaScript',
    description: 'Callbacks, Promises, async/await, and the Fetch API — writing non-blocking JavaScript.',
    topics: ['m39-callbacks', 'm39-promises', 'm39-async-await', 'm39-fetch-api'],
  },
  {
    num: 40, id: 'module-40', icon: '📦', phase: 'Phase 6 — JavaScript',
    name: 'Modules & Tooling',
    description: 'ES Modules, npm, bundlers, and package management — the professional JS ecosystem.',
    topics: ['m40-es-modules', 'm40-npm', 'm40-bundlers', 'm40-package-management'],
  },

  /* ── PHASE 7 — Git & Professional Workflow ── */
  {
    num: 41, id: 'module-41', icon: '🌿', phase: 'Phase 7 — Git & Professional Workflow',
    name: 'Git In Depth',
    description: 'Commits, branches, merge, rebase, and conflict resolution — version control at the professional level.',
    topics: ['m41-commits', 'm41-branches', 'm41-merge-rebase', 'm41-conflict-resolution'],
  },
  {
    num: 42, id: 'module-42', icon: '🐙', phase: 'Phase 7 — Git & Professional Workflow',
    name: 'GitHub & Collaboration',
    description: 'Pull requests, issues, collaboration workflows, and contributing to open source.',
    topics: ['m42-pull-requests', 'm42-issues', 'm42-collaboration', 'm42-open-source'],
  },

  /* ── PHASE 8 — Data Structures (Detailed) ── */
  {
    num: 43, id: 'module-43', icon: '📊', phase: 'Phase 8 — Data Structures',
    name: 'Arrays (Data Structure)',
    description: 'The foundation of all data structures — contiguous memory, indexing, and array operations.',
    topics: ['m43-array-basics', 'm43-array-operations', 'm43-multi-dim', 'm43-array-algorithms'],
  },
  {
    num: 44, id: 'module-44', icon: '🔗', phase: 'Phase 8 — Data Structures',
    name: 'Linked Lists',
    description: 'Singly and doubly linked lists — pointer-based structures and why they exist alongside arrays.',
    topics: ['m44-singly-linked', 'm44-doubly-linked', 'm44-linked-operations', 'm44-linked-vs-array'],
  },
  {
    num: 45, id: 'module-45', icon: '📚', phase: 'Phase 8 — Data Structures',
    name: 'Stacks & Queues',
    description: 'LIFO stacks and FIFO queues — two structures behind undo/redo, function calls, and task scheduling.',
    topics: ['m45-stack', 'm45-queue', 'm45-deque', 'm45-stack-queue-apps'],
  },
  {
    num: 46, id: 'module-46', icon: '#️⃣', phase: 'Phase 8 — Data Structures',
    name: 'Hash Tables',
    description: 'Hash functions, collision resolution, and why O(1) lookups are possible.',
    topics: ['m46-hash-functions', 'm46-collision-resolution', 'm46-hash-map-impl', 'm46-hash-applications'],
  },
  {
    num: 47, id: 'module-47', icon: '🌲', phase: 'Phase 8 — Data Structures',
    name: 'Trees',
    description: 'Binary trees, BSTs, AVL trees, and tree traversal — hierarchical structures for fast search.',
    topics: ['m47-binary-tree', 'm47-bst', 'm47-tree-traversal', 'm47-avl-balanced'],
  },
  {
    num: 48, id: 'module-48', icon: '🕸️', phase: 'Phase 8 — Data Structures',
    name: 'Graphs',
    description: 'Directed, undirected, weighted graphs — adjacency lists, matrices, and graph algorithms.',
    topics: ['m48-graph-basics', 'm48-adjacency-list', 'm48-adjacency-matrix', 'm48-graph-types'],
  },
  {
    num: 49, id: 'module-49', icon: '🏔️', phase: 'Phase 8 — Data Structures',
    name: 'Heaps & Priority Queues',
    description: 'Min-heaps, max-heaps, and priority queues — extracting the minimum or maximum in O(log n).',
    topics: ['m49-min-heap', 'm49-max-heap', 'm49-heap-operations', 'm49-priority-queue'],
  },

  /* ── PHASE 9 — Algorithms ── */
  {
    num: 50, id: 'module-50', icon: '🔍', phase: 'Phase 9 — Algorithms',
    name: 'Searching Algorithms',
    description: 'Linear search, binary search, and when to use each — the foundational search algorithms.',
    topics: ['m50-linear-search', 'm50-binary-search', 'm50-search-trees', 'm50-search-complexity'],
  },
  {
    num: 51, id: 'module-51', icon: '📋', phase: 'Phase 9 — Algorithms',
    name: 'Sorting Algorithms',
    description: 'Bubble, selection, insertion, merge, quick, and heap sort — from naive to production-grade.',
    topics: ['m51-bubble-sort', 'm51-merge-sort', 'm51-quick-sort', 'm51-heap-sort', 'm51-sort-comparison'],
  },
  {
    num: 52, id: 'module-52', icon: '🔄', phase: 'Phase 9 — Algorithms',
    name: 'Recursion',
    description: 'Base cases, recursive calls, call stack depth, and memoization — thinking recursively.',
    topics: ['m52-recursion-basics', 'm52-call-stack', 'm52-memoization', 'm52-tail-recursion'],
  },
  {
    num: 53, id: 'module-53', icon: '⚔️', phase: 'Phase 9 — Algorithms',
    name: 'Divide & Conquer',
    description: 'Breaking problems into subproblems — merge sort, binary search, and the master theorem.',
    topics: ['m53-divide-conquer-basics', 'm53-master-theorem', 'm53-dc-examples'],
  },
  {
    num: 54, id: 'module-54', icon: '🧩', phase: 'Phase 9 — Algorithms',
    name: 'Dynamic Programming',
    description: 'Memoization, tabulation, overlapping subproblems, and optimal substructure — the algorithmic superpower.',
    topics: ['m54-dp-basics', 'm54-memoization-dp', 'm54-tabulation', 'm54-dp-patterns'],
  },
  {
    num: 55, id: 'module-55', icon: '💰', phase: 'Phase 9 — Algorithms',
    name: 'Greedy Algorithms',
    description: 'Making locally optimal choices — interval scheduling, Huffman coding, and Dijkstra\'s greedy insight.',
    topics: ['m55-greedy-basics', 'm55-interval-scheduling', 'm55-greedy-examples'],
  },
  {
    num: 56, id: 'module-56', icon: '🗺️', phase: 'Phase 9 — Algorithms',
    name: 'Graph Algorithms',
    description: 'BFS, DFS, Dijkstra, Bellman-Ford, Kruskal, Prim — the algorithms that power maps and networks.',
    topics: ['m56-bfs-algo', 'm56-dfs-algo', 'm56-dijkstra', 'm56-spanning-tree'],
  },
  {
    num: 57, id: 'module-57', icon: '⏱️', phase: 'Phase 9 — Algorithms',
    name: 'Time & Space Complexity',
    description: 'Big-O, Ω, Θ notation, amortized analysis — measuring and reasoning about algorithm efficiency.',
    topics: ['m57-big-o', 'm57-omega-theta', 'm57-amortized', 'm57-space-complexity'],
  },

  /* ── PHASE 10 — Object-Oriented Programming ── */
  {
    num: 58, id: 'module-58', icon: '🏗️', phase: 'Phase 10 — Object-Oriented Programming',
    name: 'Object-Oriented Programming',
    description: 'Classes, objects, encapsulation, inheritance, polymorphism, and abstraction — the OOP pillars.',
    topics: ['m58-classes-objects', 'm58-encapsulation', 'm58-inheritance', 'm58-polymorphism', 'm58-abstraction'],
  },

  /* ── PHASE 11 — Software Engineering ── */
  {
    num: 59, id: 'module-59', icon: '📐', phase: 'Phase 11 — Software Engineering',
    name: 'Software Engineering Principles',
    description: 'SOLID, DRY, KISS, YAGNI, and clean code — the principles that separate good code from great code.',
    topics: ['m59-solid', 'm59-dry-kiss-yagni', 'm59-clean-code'],
  },
  {
    num: 60, id: 'module-60', icon: '🏛️', phase: 'Phase 11 — Software Engineering',
    name: 'Design Patterns',
    description: 'MVC, Repository Pattern, Dependency Injection, and the classic Gang of Four patterns.',
    topics: ['m60-mvc', 'm60-repository-pattern', 'm60-dependency-injection', 'm60-gof-patterns'],
  },
  {
    num: 61, id: 'module-61', icon: '🔨', phase: 'Phase 11 — Software Engineering',
    name: 'Refactoring, Reviews & Docs',
    description: 'Refactoring techniques, code review best practices, and writing documentation that actually helps.',
    topics: ['m61-refactoring', 'm61-code-reviews', 'm61-documentation'],
  },

  /* ── PHASE 12 — Databases ── */
  {
    num: 62, id: 'module-62', icon: '🗄️', phase: 'Phase 12 — Databases',
    name: 'SQL In Depth',
    description: 'CRUD, joins, indexes, transactions, and views — mastering relational query language.',
    topics: ['m62-crud', 'm62-joins', 'm62-indexes', 'm62-transactions', 'm62-views'],
  },
  {
    num: 63, id: 'module-63', icon: '🔷', phase: 'Phase 12 — Databases',
    name: 'Database Design',
    description: 'ER diagrams, normalization (1NF–3NF), and modeling table relationships correctly.',
    topics: ['m63-er-diagrams', 'm63-normalization', 'm63-relationships'],
  },
  {
    num: 64, id: 'module-64', icon: '🍃', phase: 'Phase 12 — Databases',
    name: 'NoSQL Databases',
    description: 'Document databases, key-value stores, and graph databases — when and why to go beyond relational.',
    topics: ['m64-document-db', 'm64-key-value', 'm64-graph-db'],
  },

  /* ── PHASE 13 — Backend Development ── */
  {
    num: 65, id: 'module-65', icon: '🖥️', phase: 'Phase 13 — Backend Development',
    name: 'Backend Engineering',
    description: 'REST APIs, authentication, authorization, JWT, file upload, email, background jobs, and logging — the complete backend toolkit.',
    topics: ['m65-rest-api', 'm65-auth-authz', 'm65-jwt-sessions', 'm65-middleware', 'm65-file-upload', 'm65-email-jobs', 'm65-logging'],
  },
];

// Pretty topic titles shared across all modules
window.CSFA_RAW_TOPIC_TITLES = {
  // Module 1
  'how-computers-work': 'How Computers Work', 'cpu': 'CPU', 'ram': 'RAM', 'storage': 'Storage',
  'operating-systems': 'Operating Systems', 'command-line': 'Command Line', 'internet-basics': 'Internet Basics',
  'http': 'HTTP', 'https': 'HTTPS', 'dns': 'DNS',
  // Module 2
  'variables': 'Variables', 'data-types': 'Data Types', 'conditions': 'Conditions', 'loops': 'Loops',
  'functions': 'Functions', 'scope': 'Scope', 'arrays': 'Arrays', 'objects': 'Objects', 'error-handling': 'Error Handling',
  // Module 3
  'elements': 'Elements', 'forms': 'Forms', 'semantic-html': 'Semantic HTML', 'accessibility': 'Accessibility',
  'tables': 'Tables', 'media': 'Media',
  // Module 4
  'selectors': 'Selectors', 'box-model': 'Box Model', 'flexbox': 'Flexbox', 'grid': 'Grid',
  'responsive-design': 'Responsive Design', 'animations': 'Animations',
  // Module 5
  'dom': 'DOM', 'events': 'Events', 'js-functions': 'Functions', 'closures': 'Closures',
  'async-await': 'Async/Await', 'promises': 'Promises', 'fetch-api': 'Fetch API', 'modules': 'Modules',
  // Module 6
  'repositories': 'Repositories', 'commits': 'Commits', 'branches': 'Branches', 'merging': 'Merging', 'pull-requests': 'Pull Requests',
  // Module 7
  'ds-arrays': 'Arrays', 'linked-lists': 'Linked Lists', 'stacks': 'Stacks', 'queues': 'Queues',
  'trees': 'Trees', 'graphs': 'Graphs', 'hash-maps': 'Hash Maps',
  // Module 8
  'sorting': 'Sorting', 'searching': 'Searching', 'recursion': 'Recursion', 'binary-search': 'Binary Search',
  'bfs': 'BFS', 'dfs': 'DFS', 'big-o': 'Big O',
  // Module 9
  'sql': 'SQL', 'postgresql': 'PostgreSQL', 'relationships': 'Relationships', 'indexes': 'Indexes', 'normalization': 'Normalization',
  // Module 10
  'client-server': 'Client-Server Architecture', 'rest-apis': 'REST APIs', 'authentication': 'Authentication',
  'authorization': 'Authorization', 'jwt': 'JWT', 'crud': 'CRUD',
  // Module 11
  'components': 'Components', 'props': 'Props', 'state': 'State', 'hooks': 'Hooks', 'routing': 'Routing', 'context-api': 'Context API',
  // Module 12
  'clean-code': 'Clean Code', 'testing': 'Testing', 'solid': 'SOLID', 'design-patterns': 'Design Patterns',
  'architecture': 'Architecture', 'refactoring': 'Refactoring',

  // Module 13 — Digital Literacy
  'm13-what-is-computer': 'What is a Computer?', 'm13-types-computers': 'Types of Computers',
  'm13-hardware-software': 'Hardware vs Software', 'm13-input-output': 'Input & Output Devices',
  'm13-storage-devices': 'Storage Devices', 'm13-memory-basics': 'Memory',
  'm13-os-intro': 'Operating Systems', 'm13-applications': 'Applications',
  'm13-files-extensions': 'Files & File Extensions', 'm13-binary-human': 'Binary vs Human Language',

  // Module 14 — Computer Architecture
  'm14-von-neumann': 'Von Neumann Architecture', 'm14-cpu-components': 'CPU Components',
  'm14-alu': 'ALU', 'm14-registers': 'Registers', 'm14-control-unit': 'Control Unit',
  'm14-instruction-cycle': 'Instruction Cycle', 'm14-clock-speed': 'Clock Speed',
  'm14-multi-core': 'Multi-Core Processors', 'm14-gpu-vs-cpu': 'GPU vs CPU', 'm14-cache-memory': 'Cache Memory',

  // Module 15 — Number Systems
  'm15-decimal': 'Decimal', 'm15-binary': 'Binary', 'm15-octal': 'Octal', 'm15-hexadecimal': 'Hexadecimal',
  'm15-binary-arithmetic': 'Binary Arithmetic', 'm15-twos-complement': "Two's Complement",
  'm15-floating-point': 'Floating Point Numbers', 'm15-char-encoding': 'Character Encoding',
  'm15-unicode': 'Unicode', 'm15-ascii': 'ASCII',

  // Module 16 — Digital Logic
  'm16-logic-gates': 'Logic Gates', 'm16-boolean-algebra': 'Boolean Algebra',
  'm16-truth-tables': 'Truth Tables', 'm16-flip-flops': 'Flip-Flops',
  'm16-multiplexers': 'Multiplexers', 'm16-adders': 'Adders',
  'm16-memory-circuits': 'Memory Circuits', 'm16-cpu-logic': 'CPU Logic',

  // Module 17 — Computer Memory
  'm17-ram': 'RAM', 'm17-rom': 'ROM', 'm17-cache': 'Cache',
  'm17-registers-mem': 'Registers', 'm17-stack-memory': 'Stack Memory',
  'm17-heap-memory': 'Heap Memory', 'm17-virtual-memory': 'Virtual Memory',
  'm17-memory-allocation': 'Memory Allocation', 'm17-garbage-collection': 'Garbage Collection',

  // Module 18 — OS Deep Dive
  'm18-processes': 'Processes', 'm18-threads': 'Threads', 'm18-scheduling': 'Scheduling',
  'm18-context-switching': 'Context Switching', 'm18-system-calls': 'System Calls',
  'm18-file-systems': 'File Systems', 'm18-memory-management': 'Memory Management',
  'm18-interrupts': 'Interrupts', 'm18-deadlocks': 'Deadlocks',

  // Module 19 — Linux Fundamentals
  'm19-linux-filesystem': 'Linux Filesystem', 'm19-directory-structure': 'Directory Structure',
  'm19-permissions': 'Permissions', 'm19-ownership': 'Ownership',
  'm19-users-groups': 'Users & Groups', 'm19-shell': 'Shell', 'm19-env-variables': 'Environment Variables',

  // Module 20 — Command Line Mastery
  'm20-pwd-ls-cd': 'pwd / ls / cd', 'm20-mkdir-touch': 'mkdir / touch',
  'm20-cp-mv-rm': 'cp / mv / rm', 'm20-cat-nano-vim': 'cat / nano / vim',
  'm20-grep-find': 'grep / find', 'm20-chmod-chown': 'chmod / chown', 'm20-pipes-redirection': 'Pipes & Redirection',

  // Module 21 — Shell Scripting
  'm21-variables': 'Variables', 'm21-loops': 'Loops', 'm21-conditions': 'Conditions',
  'm21-functions': 'Functions', 'm21-automation': 'Automation',
  'm21-scheduling': 'Scheduling', 'm21-bash-scripts': 'Bash Scripts',

  // Module 22 — Networking Fundamentals
  'm22-lan-wan': 'LAN / WAN', 'm22-internet': 'The Internet',
  'm22-routers-switches': 'Routers & Switches', 'm22-ip-address': 'IP Address',
  'm22-mac-address': 'MAC Address', 'm22-ports': 'Ports', 'm22-packets': 'Packets',

  // Module 23 — TCP/IP
  'm23-tcp': 'TCP', 'm23-udp': 'UDP', 'm23-ipv4-ipv6': 'IPv4 & IPv6',
  'm23-routing': 'Routing', 'm23-nat': 'NAT', 'm23-subnetting': 'Subnetting', 'm23-dns': 'DNS',

  // Module 24 — HTTP & Web
  'm24-http': 'HTTP', 'm24-https': 'HTTPS', 'm24-ssl-tls': 'SSL/TLS',
  'm24-cookies': 'Cookies', 'm24-sessions': 'Sessions',
  'm24-browser-lifecycle': 'Browser Lifecycle', 'm24-request-response': 'Request/Response', 'm24-rest': 'REST',

  // Module 25 — Browser Internals
  'm25-rendering-engine': 'Rendering Engine', 'm25-dom': 'DOM',
  'm25-cssom': 'CSSOM', 'm25-js-engine': 'JavaScript Engine',
  'm25-event-loop': 'Event Loop', 'm25-rendering-pipeline': 'Rendering Pipeline',

  // Module 26 — Programming Basics
  'm26-variables-constants': 'Variables & Constants', 'm26-data-types-prog': 'Data Types',
  'm26-operators': 'Operators', 'm26-expressions': 'Expressions', 'm26-input-output': 'Input & Output',

  // Module 27 — Control Flow
  'm27-if-else': 'if / else', 'm27-switch': 'switch',
  'm27-loops-cf': 'Loops', 'm27-break-continue': 'break / continue',

  // Module 28 — Functions
  'm28-params-args': 'Parameters & Arguments', 'm28-return-values': 'Return Values',
  'm28-scope-fn': 'Scope', 'm28-recursion-fn': 'Recursion',

  // Module 29 — Data Structures in Programming
  'm29-arrays-prog': 'Arrays', 'm29-objects-prog': 'Objects',
  'm29-maps-sets': 'Maps & Sets', 'm29-strings': 'Strings',

  // Module 30 — Error Handling
  'm30-try-catch': 'try / catch', 'm30-throw-finally': 'throw / finally', 'm30-debugging': 'Debugging',

  // Module 31 — HTML In Depth
  'm31-semantic-html': 'Semantic HTML', 'm31-forms-html': 'Forms',
  'm31-tables-html': 'Tables', 'm31-accessibility': 'Accessibility', 'm31-seo-basics': 'SEO Basics',

  // Module 32 — CSS Foundations
  'm32-selectors': 'Selectors', 'm32-box-model': 'Box Model',
  'm32-positioning': 'Positioning', 'm32-flexbox': 'Flexbox', 'm32-grid': 'Grid',

  // Module 33 — Responsive Design
  'm33-media-queries': 'Media Queries', 'm33-mobile-first': 'Mobile First',
  'm33-css-units': 'CSS Units', 'm33-layout-systems': 'Layout Systems',

  // Module 34 — Advanced CSS
  'm34-animations': 'Animations', 'm34-transitions': 'Transitions',
  'm34-css-variables': 'CSS Variables', 'm34-gradients': 'Gradients', 'm34-glassmorphism': 'Glassmorphism',

  // Module 35 — JS Basics
  'm35-js-syntax': 'Syntax', 'm35-js-variables': 'Variables',
  'm35-js-data-types': 'Data Types', 'm35-js-operators': 'Operators',

  // Module 36 — Functions & Scope
  'm36-arrow-functions': 'Arrow Functions', 'm36-closures': 'Closures', 'm36-hoisting': 'Hoisting',

  // Module 37 — Objects & Arrays
  'm37-object-methods': 'Object Methods', 'm37-array-methods': 'Array Methods',
  'm37-destructuring': 'Destructuring', 'm37-spread-rest': 'Spread & Rest',

  // Module 38 — DOM Manipulation
  'm38-dom-tree': 'DOM Tree', 'm38-events-dom': 'Events',
  'm38-forms-dom': 'Forms', 'm38-dynamic-ui': 'Dynamic UI',

  // Module 39 — Async JS
  'm39-callbacks': 'Callbacks', 'm39-promises': 'Promises',
  'm39-async-await': 'Async/Await', 'm39-fetch-api': 'Fetch API',

  // Module 40 — Modules & Tooling
  'm40-es-modules': 'ES Modules', 'm40-npm': 'npm',
  'm40-bundlers': 'Bundlers', 'm40-package-management': 'Package Management',

  // Module 41 — Git
  'm41-commits': 'Commits', 'm41-branches': 'Branches',
  'm41-merge-rebase': 'Merge & Rebase', 'm41-conflict-resolution': 'Conflict Resolution',

  // Module 42 — GitHub
  'm42-pull-requests': 'Pull Requests', 'm42-issues': 'Issues',
  'm42-collaboration': 'Collaboration', 'm42-open-source': 'Open Source',

  // Module 43 — Arrays DS
  'm43-array-basics': 'Array Basics', 'm43-array-operations': 'Array Operations',
  'm43-multi-dim': 'Multi-Dimensional Arrays', 'm43-array-algorithms': 'Array Algorithms',

  // Module 44 — Linked Lists
  'm44-singly-linked': 'Singly Linked List', 'm44-doubly-linked': 'Doubly Linked List',
  'm44-linked-operations': 'Linked List Operations', 'm44-linked-vs-array': 'Linked List vs Array',

  // Module 45 — Stacks & Queues
  'm45-stack': 'Stack', 'm45-queue': 'Queue',
  'm45-deque': 'Deque', 'm45-stack-queue-apps': 'Real-World Applications',

  // Module 46 — Hash Tables
  'm46-hash-functions': 'Hash Functions', 'm46-collision-resolution': 'Collision Resolution',
  'm46-hash-map-impl': 'Hash Map Implementation', 'm46-hash-applications': 'Hash Table Applications',

  // Module 47 — Trees
  'm47-binary-tree': 'Binary Tree', 'm47-bst': 'Binary Search Tree',
  'm47-tree-traversal': 'Tree Traversal', 'm47-avl-balanced': 'AVL & Balanced Trees',

  // Module 48 — Graphs
  'm48-graph-basics': 'Graph Basics', 'm48-adjacency-list': 'Adjacency List',
  'm48-adjacency-matrix': 'Adjacency Matrix', 'm48-graph-types': 'Graph Types',

  // Module 49 — Heaps
  'm49-min-heap': 'Min Heap', 'm49-max-heap': 'Max Heap',
  'm49-heap-operations': 'Heap Operations', 'm49-priority-queue': 'Priority Queue',

  // Module 50 — Searching
  'm50-linear-search': 'Linear Search', 'm50-binary-search': 'Binary Search',
  'm50-search-trees': 'Tree Search', 'm50-search-complexity': 'Search Complexity',

  // Module 51 — Sorting
  'm51-bubble-sort': 'Bubble Sort', 'm51-merge-sort': 'Merge Sort',
  'm51-quick-sort': 'Quick Sort', 'm51-heap-sort': 'Heap Sort', 'm51-sort-comparison': 'Sort Comparison',

  // Module 52 — Recursion
  'm52-recursion-basics': 'Recursion Basics', 'm52-call-stack': 'Call Stack',
  'm52-memoization': 'Memoization', 'm52-tail-recursion': 'Tail Recursion',

  // Module 53 — Divide & Conquer
  'm53-divide-conquer-basics': 'D&C Basics', 'm53-master-theorem': 'Master Theorem',
  'm53-dc-examples': 'D&C Examples',

  // Module 54 — Dynamic Programming
  'm54-dp-basics': 'DP Basics', 'm54-memoization-dp': 'Memoization',
  'm54-tabulation': 'Tabulation', 'm54-dp-patterns': 'DP Patterns',

  // Module 55 — Greedy
  'm55-greedy-basics': 'Greedy Basics', 'm55-interval-scheduling': 'Interval Scheduling',
  'm55-greedy-examples': 'Greedy Examples',

  // Module 56 — Graph Algorithms
  'm56-bfs-algo': 'BFS', 'm56-dfs-algo': 'DFS',
  'm56-dijkstra': "Dijkstra's Algorithm", 'm56-spanning-tree': 'Spanning Trees',

  // Module 57 — Complexity
  'm57-big-o': 'Big-O Notation', 'm57-omega-theta': 'Ω and Θ Notation',
  'm57-amortized': 'Amortized Analysis', 'm57-space-complexity': 'Space Complexity',

  // Module 58 — OOP
  'm58-classes-objects': 'Classes & Objects', 'm58-encapsulation': 'Encapsulation',
  'm58-inheritance': 'Inheritance', 'm58-polymorphism': 'Polymorphism', 'm58-abstraction': 'Abstraction',

  // Module 59 — SE Principles
  'm59-solid': 'SOLID Principles', 'm59-dry-kiss-yagni': 'DRY / KISS / YAGNI', 'm59-clean-code': 'Clean Code',

  // Module 60 — Design Patterns
  'm60-mvc': 'MVC', 'm60-repository-pattern': 'Repository Pattern',
  'm60-dependency-injection': 'Dependency Injection', 'm60-gof-patterns': 'Gang of Four Patterns',

  // Module 61 — Refactoring
  'm61-refactoring': 'Refactoring', 'm61-code-reviews': 'Code Reviews', 'm61-documentation': 'Documentation',

  // Module 62 — SQL
  'm62-crud': 'CRUD', 'm62-joins': 'Joins',
  'm62-indexes': 'Indexes', 'm62-transactions': 'Transactions', 'm62-views': 'Views',

  // Module 63 — DB Design
  'm63-er-diagrams': 'ER Diagrams', 'm63-normalization': 'Normalization', 'm63-relationships': 'Relationships',

  // Module 64 — NoSQL
  'm64-document-db': 'Document Databases', 'm64-key-value': 'Key-Value Stores', 'm64-graph-db': 'Graph Databases',

  // Module 65 — Backend Engineering
  'm65-rest-api': 'REST APIs', 'm65-auth-authz': 'Authentication & Authorization',
  'm65-jwt-sessions': 'JWT & Sessions', 'm65-middleware': 'Middleware',
  'm65-file-upload': 'File Upload', 'm65-email-jobs': 'Email & Background Jobs', 'm65-logging': 'Logging',
};

// NOTE: window.CSFA_getModuleForTopic is now provided by App (js/core/app.js),
// backed by Catalog.getModuleForTopic(). Kept here as a comment so the
// history of this file is clear — the old free-function implementation
// lived here before the class refactor.
