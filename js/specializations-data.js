/* ==========================================================================
   SPECIALIZATION TRACKS DATA
   Specializations 1–14 plus Final Industry Capstone.
   ========================================================================== */

window.CSFA_SPECIALIZATIONS = [
  {
    id: 'spec-1',
    num: 1,
    icon: '🤖',
    title: 'AI Agent Engineering & Modern AI Workflow',
    lessons: 40,
    modules: [
      {
        name: 'Module 1 — AI Fundamentals',
        topics: [
          'What is Artificial Intelligence?',
          'Machine Learning vs Deep Learning vs LLMs',
          'How Large Language Models Work',
          'Tokens & Tokenization',
          'Context Windows',
          'Embeddings',
          'Fine-Tuning vs Prompt Engineering',
          'AI Agent vs AI Assistant',
          'AI Ecosystem Overview'
        ]
      },
      {
        name: 'Module 2 — Prompt Engineering',
        topics: [
          'Prompt Anatomy',
          'Zero-shot Prompting',
          'Few-shot Prompting',
          'Chain of Thought',
          'Tree of Thought',
          'Self Reflection',
          'Role Prompting',
          'Structured Output',
          'JSON Responses',
          'Prompt Evaluation'
        ]
      },
      {
        name: 'Module 3 — AI Coding Workflow',
        topics: [
          'AI Assisted Development',
          'Vibe Coding',
          'Requirement Engineering',
          'Code Generation',
          'Code Review',
          'AI Refactoring',
          'AI Documentation',
          'AI Debugging',
          'AI Test Generation',
          'AI Code Explanation'
        ]
      },
      {
        name: 'Module 4 — AI Agent Architecture',
        topics: [
          'Agent Lifecycle',
          'Memory',
          'Planning',
          'Tool Calling',
          'Multi-Agent Systems',
          'Autonomous Agents',
          'Event Driven Agents',
          'Agent Orchestration'
        ]
      },
      {
        name: 'Module 5 — Model Context Protocol (MCP)',
        topics: [
          'MCP Basics',
          'Tools',
          'Resources',
          'Prompts',
          'Servers',
          'Clients',
          'MCP Development'
        ]
      },
      {
        name: 'Module 6 — Retrieval Augmented Generation (RAG)',
        topics: [
          'Vector Embeddings',
          'Chunking',
          'Retrieval',
          'Similarity Search',
          'Knowledge Bases',
          'Context Injection'
        ]
      },
      {
        name: 'Module 7 — AI Automation',
        topics: [
          'Email Agents',
          'Research Agents',
          'CRM Agents',
          'Scheduling Agents',
          'Coding Agents',
          'Browser Automation',
          'Workflow Automation'
        ]
      },
      {
        name: 'Module 8 — Production AI',
        topics: [
          'Rate Limits',
          'Cost Optimization',
          'AI Monitoring',
          'Prompt Versioning',
          'AI Security',
          'AI Ethics'
        ]
      }
    ]
  },
  {
    id: 'spec-2',
    num: 2,
    icon: '📱',
    title: 'Mobile App Development',
    lessons: 50,
    modules: [
      {
        name: 'Flutter Fundamentals',
        topics: ['Dart Basics', 'Widgets', 'Layouts', 'State Management', 'Navigation']
      },
      {
        name: 'UI Development',
        topics: ['Material Design', 'Cupertino', 'Responsive Layouts', 'Animations']
      },
      {
        name: 'App Features',
        topics: ['Authentication', 'Notifications', 'Camera', 'Maps', 'GPS', 'Storage', 'Offline Support']
      },
      {
        name: 'Backend Integration',
        topics: ['REST APIs', 'Firebase', 'Supabase']
      },
      {
        name: 'Deployment',
        topics: ['Android', 'iOS', 'Play Store', 'App Store']
      }
    ]
  },
  {
    id: 'spec-3',
    num: 3,
    icon: '⚛️',
    title: 'React Frontend Development',
    lessons: 60,
    modules: [
      {
        name: 'JavaScript Refresh',
        topics: ['ES6+', 'Modules', 'Async Programming']
      },
      {
        name: 'React Fundamentals',
        topics: ['Components', 'JSX', 'Props', 'State', 'Events', 'Lifecycle']
      },
      {
        name: 'Hooks',
        topics: ['useState', 'useEffect', 'useMemo', 'useCallback', 'useReducer', 'useContext']
      },
      {
        name: 'Routing',
        topics: ['React Router', 'Nested Routes', 'Protected Routes']
      },
      {
        name: 'State Management',
        topics: ['Context API', 'Redux Toolkit', 'Zustand']
      },
      {
        name: 'Forms',
        topics: ['React Hook Form', 'Validation']
      },
      {
        name: 'API Integration',
        topics: ['Fetch', 'Axios', 'TanStack Query']
      },
      {
        name: 'Authentication',
        topics: ['JWT', 'OAuth', 'Protected Routes']
      },
      {
        name: 'UI Libraries',
        topics: ['Tailwind CSS', 'Material UI', 'ShadCN']
      },
      {
        name: 'Performance',
        topics: ['Lazy Loading', 'Memoization', 'Code Splitting']
      },
      {
        name: 'Deployment',
        topics: ['Vercel', 'Netlify']
      }
    ]
  },
  {
    id: 'spec-4',
    num: 4,
    icon: '🔥',
    title: 'Laravel Backend Development',
    lessons: 70,
    modules: [
      {
        name: 'PHP Fundamentals',
        topics: ['Syntax', 'OOP', 'Composer']
      },
      {
        name: 'Laravel Basics',
        topics: ['Installation', 'Routing', 'Controllers', 'Blade']
      },
      {
        name: 'Database',
        topics: ['Migrations', 'Seeders', 'Models', 'Relationships']
      },
      {
        name: 'Authentication',
        topics: ['Laravel Breeze', 'Sanctum', 'Passport']
      },
      {
        name: 'API Development',
        topics: ['REST API', 'API Resources', 'Validation']
      },
      {
        name: 'File Storage',
        topics: ['Local', 'S3']
      },
      {
        name: 'Queues',
        topics: ['Jobs', 'Workers']
      },
      {
        name: 'Events',
        topics: ['Broadcasting']
      },
      {
        name: 'Performance',
        topics: ['Caching', 'Optimization']
      },
      {
        name: 'Testing',
        topics: ['PHPUnit', 'Pest']
      },
      {
        name: 'Deployment',
        topics: ['Shared Hosting', 'VPS', 'Docker']
      }
    ]
  },
  {
    id: 'spec-5',
    num: 5,
    icon: '🗄️',
    title: 'MySQL Database Engineering',
    lessons: 35,
    modules: [
      {
        name: 'Database Fundamentals',
        topics: [
          'SQL Fundamentals',
          'Schema Design',
          'Relationships',
          'Normalization',
          'Indexing',
          'Query Optimization',
          'Transactions',
          'Stored Procedures',
          'Views',
          'Triggers',
          'Database Security',
          'Backup & Recovery',
          'Scaling'
        ]
      }
    ]
  },
  {
    id: 'spec-6',
    num: 6,
    icon: '⚡',
    title: 'Firebase & Supabase',
    lessons: 35,
    modules: [
      {
        name: 'Firebase',
        topics: ['Authentication', 'Firestore', 'Storage', 'Cloud Functions', 'Hosting', 'Push Notifications']
      },
      {
        name: 'Supabase',
        topics: ['PostgreSQL', 'Authentication', 'Storage', 'Edge Functions', 'Realtime', 'Row Level Security']
      },
      {
        name: 'Comparison',
        topics: ['Firebase vs Supabase', 'When to Choose Which']
      }
    ]
  },
  {
    id: 'spec-7',
    num: 7,
    icon: '🔌',
    title: 'API Development & Authentication',
    lessons: 45,
    modules: [
      {
        name: 'API Design & Security',
        topics: [
          'REST',
          'GraphQL',
          'Sessions',
          'JWT',
          'OAuth',
          'API Keys',
          'Authorization',
          'Rate Limiting',
          'Webhooks',
          'API Documentation',
          'API Versioning',
          'Security'
        ]
      }
    ]
  },
  {
    id: 'spec-8',
    num: 8,
    icon: '☁️',
    title: 'Hosting & Deployment',
    lessons: 45,
    modules: [
      {
        name: 'Infrastructure & Operations',
        topics: [
          'Domains',
          'DNS',
          'Shared Hosting',
          'VPS',
          'Linux Servers',
          'Nginx',
          'Apache',
          'Docker',
          'CI/CD',
          'SSL',
          'CDN',
          'Reverse Proxy',
          'Monitoring',
          'Logging',
          'Backup'
        ]
      }
    ]
  },
  {
    id: 'spec-9',
    num: 9,
    icon: '🐛',
    title: 'Debugging & Bug Fixing',
    lessons: 30,
    modules: [
      {
        name: 'Troubleshooting & Diagnostics',
        topics: [
          'Debugging Mindset',
          'Browser DevTools',
          'Network Debugging',
          'JavaScript Debugging',
          'PHP Debugging',
          'SQL Debugging',
          'Memory Leaks',
          'Performance Bottlenecks',
          'Logging',
          'Production Debugging'
        ]
      }
    ]
  },
  {
    id: 'spec-10',
    num: 10,
    icon: '🧩',
    title: 'Chrome Extension Development',
    lessons: 30,
    modules: [
      {
        name: 'Browser Extensions',
        topics: [
          'Manifest V3',
          'Background Scripts',
          'Content Scripts',
          'Popup UI',
          'Storage',
          'Messaging',
          'Tabs API',
          'Context Menu',
          'Permissions',
          'Publishing'
        ]
      }
    ]
  },
  {
    id: 'spec-11',
    num: 11,
    icon: '🔌',
    title: 'WordPress Plugin Development',
    lessons: 40,
    modules: [
      {
        name: 'WordPress Ecosystem',
        topics: [
          'WordPress Architecture',
          'Hooks',
          'Actions',
          'Filters',
          'Plugin Structure',
          'Database',
          'Admin Pages',
          'REST API',
          'Gutenberg Blocks',
          'Security',
          'Publishing'
        ]
      }
    ]
  },
  {
    id: 'spec-12',
    num: 12,
    icon: '💼',
    title: 'SaaS & CRM Development',
    lessons: 60,
    modules: [
      {
        name: 'Product Architecture',
        topics: [
          'SaaS Architecture',
          'Multi-Tenancy',
          'User Management',
          'Roles & Permissions',
          'Billing',
          'Subscription Systems',
          'Stripe Integration',
          'CRM Design',
          'Dashboards',
          'Notifications',
          'Email Automation',
          'Analytics',
          'Reporting',
          'Audit Logs',
          'Team Collaboration'
        ]
      }
    ]
  },
  {
    id: 'spec-13',
    num: 13,
    icon: '📈',
    title: 'Real-World Software Development Workflow',
    lessons: 50,
    modules: [
      {
        name: 'Product Lifecycle',
        topics: [
          'Requirement Analysis',
          'Product Discovery',
          'User Stories',
          'Wireframing',
          'UI/UX Handoff',
          'Sprint Planning',
          'Agile',
          'Scrum',
          'Kanban'
        ]
      },
      {
        name: 'Engineering Workflow',
        topics: [
          'Git Workflow',
          'Feature Branches',
          'Code Reviews',
          'Pull Requests',
          'Pair Programming',
          'CI/CD',
          'Testing Strategy',
          'Staging',
          'Production Deployment',
          'Monitoring',
          'Bug Tracking',
          'Documentation',
          'Release Management',
          'Incident Response',
          'Maintenance'
        ]
      }
    ]
  },
  {
    id: 'spec-14',
    num: 14,
    icon: '🌿',
    title: 'Git & GitHub Mastery',
    lessons: 35,
    modules: [
      {
        name: 'Git Basics',
        topics: ['Installation', 'Configuration', 'Repository Initialization']
      },
      {
        name: 'Core Git',
        topics: ['add', 'commit', 'status', 'log', 'diff']
      },
      {
        name: 'Branching',
        topics: ['Branches', 'Merge', 'Rebase', 'Cherry Pick']
      },
      {
        name: 'Remote Git',
        topics: ['Clone', 'Push', 'Pull', 'Fetch']
      },
      {
        name: 'GitHub',
        topics: ['Repositories', 'Pull Requests', 'Issues', 'Discussions', 'Projects', 'Actions', 'Releases']
      },
      {
        name: 'Collaboration',
        topics: ['Forking', 'Code Reviews', 'Conflict Resolution']
      },
      {
        name: 'Advanced Git',
        topics: ['Interactive Rebase', 'Stash', 'Tags', 'Hooks', 'Git Internals']
      }
    ]
  }
];

window.CSFA_CAPSTONE = {
  title: 'Final Industry Capstone',
  duration: '100+ Hours',
  icon: '🎓',
  description: "To complete all specializations, learners build and deploy a production-ready SaaS platform from scratch, applying every skill they've learned.",
  features: [
    'Product discovery and requirements gathering',
    'UI/UX design and prototyping',
    'Frontend development (React)',
    'Backend development (Laravel)',
    'Database design (MySQL)',
    'Authentication and authorization',
    'API design and third-party integrations',
    'Firebase/Supabase services where appropriate',
    'AI agent integration for intelligent features',
    'Testing, debugging, and performance optimization',
    'CI/CD pipeline setup',
    'Cloud deployment with monitoring and logging',
    'Documentation and team-style Git workflow',
    'Production release and post-launch maintenance'
  ]
};
