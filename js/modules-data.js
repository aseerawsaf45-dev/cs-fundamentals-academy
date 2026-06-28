/* ==========================================================================
   MODULES METADATA — all 12 modules per spec.
   Topics in Module 1 link to fully-built topic pages.
   Topics in Modules 2–12 are listed for the roadmap/explorer and are
   marked "comingSoon: true" until their content is authored.
   ========================================================================== */

window.CSFA_RAW_MODULES = [
  {
    num: 1, id: 'module-1', icon: '🖥️',
    name: 'Computer Fundamentals',
    description: 'How a computer actually works under the hood — and how the internet moves your requests around the world.',
    topics: ['how-computers-work', 'cpu', 'ram', 'storage', 'operating-systems', 'command-line', 'internet-basics', 'http', 'https', 'dns'],
  },
  {
    num: 2, id: 'module-2', icon: '🧩',
    name: 'Programming Fundamentals',
    description: 'The building blocks every language shares: variables, logic, loops, and functions.',
    topics: ['variables', 'data-types', 'conditions', 'loops', 'functions', 'scope', 'arrays', 'objects', 'error-handling'],
  },
  {
    num: 3, id: 'module-3', icon: '📄',
    name: 'HTML Fundamentals',
    description: 'The structural language of the web — elements, forms, and accessible semantic markup.',
    topics: ['elements', 'forms', 'semantic-html', 'accessibility', 'tables', 'media'],
  },
  {
    num: 4, id: 'module-4', icon: '🎨',
    name: 'CSS Fundamentals',
    description: 'Styling, layout systems, and the responsive techniques behind every modern interface.',
    topics: ['selectors', 'box-model', 'flexbox', 'grid', 'responsive-design', 'animations'],
  },
  {
    num: 5, id: 'module-5', icon: '⚡',
    name: 'JavaScript Fundamentals',
    description: 'The language that runs the browser: the DOM, events, closures, and async programming.',
    topics: ['dom', 'events', 'js-functions', 'closures', 'async-await', 'promises', 'fetch-api', 'modules'],
  },
  {
    num: 6, id: 'module-6', icon: '🌿',
    name: 'Git and GitHub',
    description: 'Version control fundamentals for working solo or shipping with a team — and with AI agents.',
    topics: ['repositories', 'commits', 'branches', 'merging', 'pull-requests'],
  },
  {
    num: 7, id: 'module-7', icon: '🗂️',
    name: 'Data Structures',
    description: 'The shapes data takes in memory, and why choosing the right one changes everything.',
    topics: ['ds-arrays', 'linked-lists', 'stacks', 'queues', 'trees', 'graphs', 'hash-maps'],
  },
  {
    num: 8, id: 'module-8', icon: '🧠',
    name: 'Algorithms',
    description: 'Reasoning about how code performs, and the classic techniques for searching, sorting, and traversal.',
    topics: ['sorting', 'searching', 'recursion', 'binary-search', 'bfs', 'dfs', 'big-o'],
  },
  {
    num: 9, id: 'module-9', icon: '🗄️',
    name: 'Databases',
    description: 'How structured data is stored, related, and queried at scale.',
    topics: ['sql', 'postgresql', 'relationships', 'indexes', 'normalization'],
  },
  {
    num: 10, id: 'module-10', icon: '🔌',
    name: 'Backend Development',
    description: 'Client-server architecture, REST APIs, and the auth systems that protect them.',
    topics: ['client-server', 'rest-apis', 'authentication', 'authorization', 'jwt', 'crud'],
  },
  {
    num: 11, id: 'module-11', icon: '⚛️',
    name: 'React & Modern Frontend',
    description: 'Component-based UI: props, state, hooks, and the patterns behind modern frontends.',
    topics: ['components', 'props', 'state', 'hooks', 'routing', 'context-api'],
  },
  {
    num: 12, id: 'module-12', icon: '🏛️',
    name: 'Software Engineering',
    description: 'The craft beyond syntax: clean code, testing, design patterns, and architecture.',
    topics: ['clean-code', 'testing', 'solid', 'design-patterns', 'architecture', 'refactoring'],
  },
];

// Pretty topic titles shared across modules (used by roadmap/explorer for unbuilt topics)
window.CSFA_RAW_TOPIC_TITLES = {
  'how-computers-work': 'How Computers Work', 'cpu': 'CPU', 'ram': 'RAM', 'storage': 'Storage',
  'operating-systems': 'Operating Systems', 'command-line': 'Command Line', 'internet-basics': 'Internet Basics',
  'http': 'HTTP', 'https': 'HTTPS', 'dns': 'DNS',
  'variables': 'Variables', 'data-types': 'Data Types', 'conditions': 'Conditions', 'loops': 'Loops',
  'functions': 'Functions', 'scope': 'Scope', 'arrays': 'Arrays', 'objects': 'Objects', 'error-handling': 'Error Handling',
  'elements': 'Elements', 'forms': 'Forms', 'semantic-html': 'Semantic HTML', 'accessibility': 'Accessibility',
  'tables': 'Tables', 'media': 'Media',
  'selectors': 'Selectors', 'box-model': 'Box Model', 'flexbox': 'Flexbox', 'grid': 'Grid',
  'responsive-design': 'Responsive Design', 'animations': 'Animations',
  'dom': 'DOM', 'events': 'Events', 'js-functions': 'Functions', 'closures': 'Closures',
  'async-await': 'Async/Await', 'promises': 'Promises', 'fetch-api': 'Fetch API', 'modules': 'Modules',
  'repositories': 'Repositories', 'commits': 'Commits', 'branches': 'Branches', 'merging': 'Merging', 'pull-requests': 'Pull Requests',
  'ds-arrays': 'Arrays', 'linked-lists': 'Linked Lists', 'stacks': 'Stacks', 'queues': 'Queues',
  'trees': 'Trees', 'graphs': 'Graphs', 'hash-maps': 'Hash Maps',
  'sorting': 'Sorting', 'searching': 'Searching', 'recursion': 'Recursion', 'binary-search': 'Binary Search',
  'bfs': 'BFS', 'dfs': 'DFS', 'big-o': 'Big O',
  'sql': 'SQL', 'postgresql': 'PostgreSQL', 'relationships': 'Relationships', 'indexes': 'Indexes', 'normalization': 'Normalization',
  'client-server': 'Client-Server Architecture', 'rest-apis': 'REST APIs', 'authentication': 'Authentication',
  'authorization': 'Authorization', 'jwt': 'JWT', 'crud': 'CRUD',
  'components': 'Components', 'props': 'Props', 'state': 'State', 'hooks': 'Hooks', 'routing': 'Routing', 'context-api': 'Context API',
  'clean-code': 'Clean Code', 'testing': 'Testing', 'solid': 'SOLID', 'design-patterns': 'Design Patterns',
  'architecture': 'Architecture', 'refactoring': 'Refactoring',
};

// NOTE: window.CSFA_getModuleForTopic is now provided by App (js/core/app.js),
// backed by Catalog.getModuleForTopic(). Kept here as a comment so the
// history of this file is clear — the old free-function implementation
// lived here before the class refactor.
