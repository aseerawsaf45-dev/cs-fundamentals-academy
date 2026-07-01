/* Module 23 content is included in topics-module22.js (TCP topic with module:23).
   This file adds a supplementary DNS topic for Module 23. */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm23-dns', module: 23,
  title: 'DNS — The Internet\'s Phone Book',
  tagline: 'How domain names like google.com become IP addresses your computer can connect to.',
  readMinutes: 5,
  intro: {
    whatItIs: "DNS (Domain Name System) is a hierarchical distributed database that translates human-readable domain names (like google.com) into IP addresses (like 142.250.80.46). When you type a URL, your browser queries DNS before making any HTTP request. The resolution chain: browser cache → OS cache → Recursive Resolver → Root Nameserver → TLD Nameserver → Authoritative Nameserver.",
    whyItMatters: "DNS affects every web request. DNS misconfiguration causes sites to go down. Understanding DNS helps you debug deployment issues, configure custom domains, set up email (MX records), and implement CDNs correctly. DNS propagation delays are a real source of deployment confusion.",
    whereUsed: "Domain configuration, SSL certificate issuance (DNS validation), email delivery (MX records), CDN setup (CNAME), load balancing (A records with multiple IPs), infrastructure as code (Route 53, Cloudflare).",
    commonMistakes: "Forgetting DNS TTL when changing DNS records. If TTL is 86400 (24 hours), old records can be cached by resolvers for a full day after changes. Lower TTL before planned changes, then restore it after."
  },
  visual: { caption: "DNS resolution: Browser → Recursive Resolver → Root → TLD (.com) → Authoritative NS → IP", type: "dns-resolution" },
  examples: [
    { difficulty: "very-easy", title: "DNS record types", explanation: "Different DNS record types serve different purposes.", code: "const dnsRecords = [\n  { type: 'A',     value: '93.184.216.34',         purpose: 'IPv4 address' },\n  { type: 'AAAA',  value: '2606:2800:220:1::93',   purpose: 'IPv6 address' },\n  { type: 'CNAME', value: 'myapp.netlify.com',      purpose: 'Alias/redirect' },\n  { type: 'MX',    value: 'mail.google.com',        purpose: 'Email server' },\n  { type: 'TXT',   value: 'v=spf1 include:...',     purpose: 'Text/verification' },\n];\ndnsRecords.forEach(r => console.log(`${r.type.padEnd(5)}: ${r.purpose}`));", language: "javascript", output: "A    : IPv4 address\nAAAA : IPv6 address\nCNAME: Alias/redirect\nMX   : Email server\nTXT  : Text/verification" },
    { difficulty: "easy", title: "DNS resolution simulation", explanation: "Simulate the recursive resolution chain from browser to authoritative nameserver.", code: "function resolveDomain(domain) {\n  const steps = [\n    `Check browser cache: ${domain}`,\n    'Query recursive resolver (ISP/8.8.8.8)',\n    'Resolver queries Root nameserver → .com TLD',\n    `Resolver queries TLD → ${domain.split('.').slice(-2).join('.')} nameserver`,\n    'Authoritative NS returns A record: 93.184.216.34',\n  ];\n  steps.forEach((s,i) => console.log(`Step ${i+1}: ${s}`));\n  return '93.184.216.34';\n}\nresolveDomain('example.com');", language: "javascript", output: "Step 1: Check browser cache: example.com\nStep 2: Query recursive resolver (ISP/8.8.8.8)\nStep 3: Resolver queries Root nameserver → .com TLD\nStep 4: Resolver queries TLD → example.com nameserver\nStep 5: Authoritative NS returns A record: 93.184.216.34" },
    { difficulty: "medium", title: "TTL and caching", explanation: "TTL (Time-To-Live) controls how long DNS records are cached by resolvers.", code: "function dnsCache(domain, ttlSeconds) {\n  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);\n  console.log(`${domain} cached until: ${expiresAt.toISOString()}`);\n  console.log(`TTL: ${ttlSeconds}s (${ttlSeconds/3600}h)`);\n}\ndnsCache('example.com', 3600);\ndnsCache('api.example.com', 60);", language: "javascript", output: "example.com cached until: 2026-06-30T20:41:30.000Z\nTTL: 3600s (1h)\napi.example.com cached until: 2026-06-30T19:42:30.000Z\nTTL: 60s (0.016666666666666666h)" },
    { difficulty: "medium-plus", title: "Round-robin DNS load balancing", explanation: "Multiple A records for the same domain enables simple load balancing.", code: "const aRecords = ['10.0.0.1','10.0.0.2','10.0.0.3'];\nfunction roundRobinDNS(domain, requestNum) {\n  return aRecords[requestNum % aRecords.length];\n}\nfor (let i=0; i<6; i++) {\n  console.log(`Request ${i+1} → ${roundRobinDNS('api.example.com', i)}`);\n}", language: "javascript", output: "Request 1 → 10.0.0.1\nRequest 2 → 10.0.0.2\nRequest 3 → 10.0.0.3\nRequest 4 → 10.0.0.1\nRequest 5 → 10.0.0.2\nRequest 6 → 10.0.0.3" },
    { difficulty: "hard", title: "DNS-based service discovery", explanation: "Microservices use DNS SRV records to discover service endpoints dynamically.", code: "const srvRecords = {\n  '_http._tcp.payments': [{ host:'pay1.internal', port:8080, weight:10 }],\n  '_http._tcp.users':    [{ host:'users1.internal', port:3000, weight:10 }],\n};\nfunction discoverService(name) {\n  const srv = srvRecords[name];\n  if (!srv) return 'Service not found';\n  return `${srv[0].host}:${srv[0].port}`;\n}\nconsole.log('payments:', discoverService('_http._tcp.payments'));\nconsole.log('users:', discoverService('_http._tcp.users'));", language: "javascript", output: "payments: pay1.internal:8080\nusers: users1.internal:3000" },
    { difficulty: "real-world", title: "CNAME for custom domains", explanation: "SaaS apps let users add custom domains via CNAME records pointing to the platform.", code: "const customDomains = [\n  { userDomain: 'shop.alice.com', cname: 'alice.myshop.app' },\n  { userDomain: 'blog.bob.com',  cname: 'bob.myshop.app' },\n];\ncustomDomains.forEach(d => {\n  console.log(`DNS: ${d.userDomain} CNAME → ${d.cname}`);\n  console.log(`  Platform sees Host header, routes to correct tenant`);\n});", language: "javascript", output: "DNS: shop.alice.com CNAME → alice.myshop.app\n  Platform sees Host header, routes to correct tenant\nDNS: blog.bob.com CNAME → bob.myshop.app\n  Platform sees Host header, routes to correct tenant" }
  ],
  exercises: [
    { level: 1, title: "DNS record types", problem: "Create a function `dnsRecordPurpose(type)` that returns the purpose string for 'A', 'CNAME', 'MX', and 'TXT' record types.", hints: ["Use a switch or object map."], solution: "const purposes={A:'IPv4 address',CNAME:'Alias',MX:'Mail server',TXT:'Verification'};\nconst dnsRecordPurpose=t=>purposes[t]||'Unknown';\nconsole.log(dnsRecordPurpose('MX'));" },
    { level: 2, title: "TTL expiry checker", problem: "Write `isCacheExpired(cachedAt, ttlSeconds)` where cachedAt is a timestamp (ms). Returns true if the cached entry is expired.", hints: ["Compare Date.now() > cachedAt + ttlSeconds*1000."], solution: "function isCacheExpired(cachedAt,ttl){return Date.now()>cachedAt+ttl*1000;}\nconst old=Date.now()-10000;\nconsole.log(isCacheExpired(old,5)); // true - expired 5s ago\nconsole.log(isCacheExpired(Date.now(),60)); // false - fresh" },
    { level: 3, title: "Round-robin resolver", problem: "Write `roundRobin(records)` returning a function that cycles through an array of IP strings, returning the next one each call.", hints: ["Use closure with an index counter."], solution: "function roundRobin(records){let i=0;return()=>records[i++%records.length];}\nconst resolve=roundRobin(['1.2.3.4','5.6.7.8']);\nconsole.log(resolve(),resolve(),resolve());" }
  ],
  interview: [
    { q: "What is a DNS TTL and why does it matter?", a: "TTL (Time-To-Live) is how long DNS resolvers cache a record before re-querying. Lower TTL means faster propagation of changes but more DNS queries. Before changing DNS (e.g., migrating servers), lower TTL to 60s a few hours before, then change. Afterward restore high TTL for better caching." },
    { q: "What is the difference between an A record and a CNAME?", a: "An A record maps a domain directly to an IPv4 address. A CNAME is an alias pointing to another domain name (which then resolves to an IP). CNAMEs enable flexible load balancing and are used for custom domain support in SaaS platforms." },
    { q: "What is DNS propagation?", a: "After changing a DNS record, the change must propagate to all global DNS resolvers (which have their own caches). Until their cached records expire (TTL), some users see the old IP. This delay is DNS propagation — typically minutes to 48 hours depending on TTL." }
  ],
  realWorld: [
    { company: "Netlify/Vercel", text: "When you add a custom domain to Netlify, they tell you to set a CNAME pointing to their platform. Netlify reads the Host header to serve the right site — pure DNS-based multi-tenancy." },
    { company: "Amazon Route 53", text: "Route 53 supports health-check-based failover: if the primary server's health check fails, Route 53 automatically returns the IP of the backup server — DNS-level disaster recovery." }
  ],
  quiz: [
    { q: "What does an A record map?", options: ["Domain to IPv6", "Domain to IPv4 address", "Domain to email server", "Domain to alias"], answer: 1 },
    { q: "What is DNS TTL?", options: ["The maximum domain name length", "How long resolvers cache a record", "Transfer speed limit", "Trust Token Level"], answer: 1 },
    { q: "What record type is used for email routing?", options: ["A", "AAAA", "CNAME", "MX"], answer: 3 },
    { q: "What does a CNAME record do?", options: ["Maps to an IP address", "Creates an alias to another domain", "Sets email servers", "Stores text data"], answer: 1 },
    { q: "What is the correct sequence of DNS resolution?", options: ["Authoritative → Root → TLD", "Browser cache → Resolver → Root → TLD → Authoritative", "Root → Browser → ISP", "ISP → CDN → Browser"], answer: 1 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm23-tcp',
  module: 23,
  title: 'TCP',
  tagline: 'Master TCP to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at TCP.',
    whyItMatters: 'Understanding TCP is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of TCP before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of TCP.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of TCP', explanation: 'Let\'s look at a simple example demonstrating TCP in action.', code: 'console.log("Initializing TCP...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing TCP...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with TCP', explanation: 'A practical example showing a real-world coding scenario using TCP.', code: 'function demonstrate() {\n  console.log("Running TCP flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running TCP flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check TCP setup', problem: 'Write a function testSetup() that returns the string "TCP OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "TCP OK"; }' }
  ],
  interview: [
    { q: 'Why is TCP important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to TCP in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of TCP?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm23-udp',
  module: 23,
  title: 'UDP',
  tagline: 'Master UDP to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at UDP.',
    whyItMatters: 'Understanding UDP is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of UDP before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of UDP.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of UDP', explanation: 'Let\'s look at a simple example demonstrating UDP in action.', code: 'console.log("Initializing UDP...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing UDP...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with UDP', explanation: 'A practical example showing a real-world coding scenario using UDP.', code: 'function demonstrate() {\n  console.log("Running UDP flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running UDP flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check UDP setup', problem: 'Write a function testSetup() that returns the string "UDP OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "UDP OK"; }' }
  ],
  interview: [
    { q: 'Why is UDP important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to UDP in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of UDP?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm23-ipv4-ipv6',
  module: 23,
  title: 'IPv4 & IPv6',
  tagline: 'Master IPv4 & IPv6 to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at IPv4 & IPv6.',
    whyItMatters: 'Understanding IPv4 & IPv6 is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of IPv4 & IPv6 before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of IPv4 & IPv6.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of IPv4 & IPv6', explanation: 'Let\'s look at a simple example demonstrating IPv4 & IPv6 in action.', code: 'console.log("Initializing IPv4 & IPv6...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing IPv4 & IPv6...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with IPv4 & IPv6', explanation: 'A practical example showing a real-world coding scenario using IPv4 & IPv6.', code: 'function demonstrate() {\n  console.log("Running IPv4 & IPv6 flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running IPv4 & IPv6 flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check IPv4 & IPv6 setup', problem: 'Write a function testSetup() that returns the string "IPv4 & IPv6 OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "IPv4 & IPv6 OK"; }' }
  ],
  interview: [
    { q: 'Why is IPv4 & IPv6 important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to IPv4 & IPv6 in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of IPv4 & IPv6?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm23-routing',
  module: 23,
  title: 'Routing',
  tagline: 'Master Routing to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Routing.',
    whyItMatters: 'Understanding Routing is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Routing before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Routing.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Routing', explanation: 'Let\'s look at a simple example demonstrating Routing in action.', code: 'console.log("Initializing Routing...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Routing...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Routing', explanation: 'A practical example showing a real-world coding scenario using Routing.', code: 'function demonstrate() {\n  console.log("Running Routing flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Routing flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Routing setup', problem: 'Write a function testSetup() that returns the string "Routing OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Routing OK"; }' }
  ],
  interview: [
    { q: 'Why is Routing important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Routing in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Routing?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm23-nat',
  module: 23,
  title: 'NAT',
  tagline: 'Master NAT to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at NAT.',
    whyItMatters: 'Understanding NAT is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of NAT before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of NAT.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of NAT', explanation: 'Let\'s look at a simple example demonstrating NAT in action.', code: 'console.log("Initializing NAT...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing NAT...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with NAT', explanation: 'A practical example showing a real-world coding scenario using NAT.', code: 'function demonstrate() {\n  console.log("Running NAT flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running NAT flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check NAT setup', problem: 'Write a function testSetup() that returns the string "NAT OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "NAT OK"; }' }
  ],
  interview: [
    { q: 'Why is NAT important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to NAT in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of NAT?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm23-subnetting',
  module: 23,
  title: 'Subnetting',
  tagline: 'Master Subnetting to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Subnetting.',
    whyItMatters: 'Understanding Subnetting is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Subnetting before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Subnetting.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Subnetting', explanation: 'Let\'s look at a simple example demonstrating Subnetting in action.', code: 'console.log("Initializing Subnetting...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Subnetting...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Subnetting', explanation: 'A practical example showing a real-world coding scenario using Subnetting.', code: 'function demonstrate() {\n  console.log("Running Subnetting flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Subnetting flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Subnetting setup', problem: 'Write a function testSetup() that returns the string "Subnetting OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Subnetting OK"; }' }
  ],
  interview: [
    { q: 'Why is Subnetting important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Subnetting in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Subnetting?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
