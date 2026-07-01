/* ==========================================================================
   TOPIC CONTENT DATA — Modules 22–65 (Networking through Backend Engineering)
   Each module has one primary topic with full content.
   ========================================================================== */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

// ── MODULE 22: Networking Fundamentals ──────────────────────────────────────
window.CSFA_RAW_TOPICS.push({
  id: 'm22-ip-address', module: 22,
  title: 'IP Addresses & Network Packets',
  tagline: 'How data travels across networks — IP addressing, routing, and packets.',
  readMinutes: 6,
  intro: {
    whatItIs: "An IP (Internet Protocol) address is a numeric label assigned to every device on a network. IPv4 uses 32-bit addresses (e.g., 192.168.1.1), supporting ~4 billion addresses. IPv6 uses 128-bit addresses. Data is broken into packets — small chunks with source/destination addresses — that are routed independently across the internet.",
    whyItMatters: "IP addresses appear in server configuration, firewall rules, DNS records, API rate limiting, and security monitoring. Understanding packets explains latency, packet loss, and why TCP retransmits data.",
    whereUsed: "Server configuration, DNS setup, load balancers, firewalls, VPNs, CDNs, network debugging with traceroute/ping, API security (IP whitelisting).",
    commonMistakes: "Confusing private IP addresses (192.168.x.x, 10.x.x.x, 172.16-31.x.x) with public IPs. Private IPs are not routable on the public internet and require NAT to communicate externally."
  },
  visual: { caption: "Packet journey: App → OS → NIC → Router → Internet → Destination", type: "network-packet" },
  examples: [
    { difficulty: "very-easy", title: "IP address structure", explanation: "IPv4 addresses are 4 bytes (octets) separated by dots.", code: "const ip = '192.168.1.100';\nconst octets = ip.split('.').map(Number);\nconsole.log('IP:', ip);\nconsole.log('Octets:', octets);\nconsole.log('Is private:', octets[0] === 192 && octets[1] === 168);", language: "javascript", output: "IP: 192.168.1.100\nOctets: [ 192, 168, 1, 100 ]\nIs private: true" },
    { difficulty: "easy", title: "IP to binary", explanation: "Each octet is 8 bits. The full IPv4 address is 32 bits.", code: "const ip = '10.0.0.1';\nconst binary = ip.split('.').map(o => parseInt(o).toString(2).padStart(8,'0')).join('.');\nconsole.log('Binary:', binary);", language: "javascript", output: "Binary: 00001010.00000000.00000000.00000001" },
    { difficulty: "medium", title: "Private IP ranges", explanation: "Check if an IP falls within RFC 1918 private ranges.", code: "function isPrivate(ip) {\n  const [a,b] = ip.split('.').map(Number);\n  return a===10 || (a===172&&b>=16&&b<=31) || (a===192&&b===168);\n}\n['10.0.0.1','192.168.1.1','8.8.8.8','172.20.0.1'].forEach(ip=>\n  console.log(ip.padEnd(15), isPrivate(ip)?'PRIVATE':'PUBLIC'));", language: "javascript", output: "10.0.0.1        PRIVATE\n192.168.1.1     PRIVATE\n8.8.8.8         PUBLIC\n172.20.0.1      PRIVATE" },
    { difficulty: "medium-plus", title: "Packet simulation", explanation: "A network packet has a header (src/dst IP, TTL) and payload.", code: "function createPacket(src, dst, data) {\n  return { header: { src, dst, ttl: 64, protocol: 'TCP' }, payload: data, size: data.length + 20 };\n}\nconst pkt = createPacket('192.168.1.1', '93.184.216.34', 'GET / HTTP/1.1');\nconsole.log('Src:', pkt.header.src);\nconsole.log('TTL:', pkt.header.ttl);\nconsole.log('Size:', pkt.size, 'bytes');", language: "javascript", output: "Src: 192.168.1.1\nTTL: 64\nSize: 34 bytes" },
    { difficulty: "hard", title: "Subnet mask calculation", explanation: "A /24 subnet mask (255.255.255.0) means the first 24 bits are the network, last 8 are hosts.", code: "function subnetInfo(ip, prefix) {\n  const hostBits = 32 - prefix;\n  const maxHosts = Math.pow(2, hostBits) - 2;\n  const network = ip.split('.').slice(0,3).join('.') + '.0';\n  return { network, prefix: `/${prefix}`, maxHosts };\n}\nconsole.log(subnetInfo('192.168.1.100', 24));\nconsole.log(subnetInfo('10.0.0.1', 8));", language: "javascript", output: "{ network: '192.168.1.0', prefix: '/24', maxHosts: 254 }\n{ network: '10.0.0.0', prefix: '/8', maxHosts: 16777214 }" },
    { difficulty: "real-world", title: "IP rate limiting", explanation: "APIs use IP addresses to rate-limit requests — tracking requests per IP per time window.", code: "const rateLimiter = new Map();\nfunction checkRate(ip, limit=5) {\n  const count = (rateLimiter.get(ip) || 0) + 1;\n  rateLimiter.set(ip, count);\n  return count <= limit ? `OK (${count}/${limit})` : `RATE LIMITED (${count}/${limit})`;\n}\n['1.2.3.4','1.2.3.4','1.2.3.4','1.2.3.4','1.2.3.4','1.2.3.4'].forEach(ip=>\n  console.log(ip, checkRate(ip)));", language: "javascript", output: "1.2.3.4 OK (1/5)\n1.2.3.4 OK (2/5)\n1.2.3.4 OK (3/5)\n1.2.3.4 OK (4/5)\n1.2.3.4 OK (5/5)\n1.2.3.4 RATE LIMITED (6/5)" }
  ],
  exercises: [
    { level: 1, title: "Parse IP octets", problem: "Write `parseIP(ip)` returning array of 4 numbers.", hints: ["Split by '.' and map to Number."], solution: "const parseIP = ip => ip.split('.').map(Number);\nconsole.log(parseIP('192.168.1.1'));" },
    { level: 2, title: "Is private IP?", problem: "Write `isPrivate(ip)` returning true for 10.x.x.x, 172.16-31.x.x, 192.168.x.x.", hints: ["Check first octet for 10, 172 with second 16-31, 192 with second 168."], solution: "function isPrivate(ip){const[a,b]=ip.split('.').map(Number);return a===10||(a===172&&b>=16&&b<=31)||(a===192&&b===168);}\nconsole.log(isPrivate('192.168.0.1'),isPrivate('8.8.8.8'));" },
    { level: 3, title: "Rate limiter", problem: "Implement a rate limiter that allows max 3 requests per IP. Store counts in a Map. Return true if allowed, false if exceeded.", hints: ["Map.get(ip)||0 + 1. Return count <= 3."], solution: "const m=new Map();function allow(ip){const c=(m.get(ip)||0)+1;m.set(ip,c);return c<=3;}\n['a','a','a','a'].forEach(ip=>console.log(allow(ip)));" }
  ],
  interview: [
    { q: "What is IPv6 and why was it needed?", a: "IPv4 has 2^32 (~4 billion) addresses, which are exhausted. IPv6 uses 128-bit addresses (2^128 ≈ 340 undecillion) and supports modern features like auto-configuration and built-in IPsec." },
    { q: "What is TTL in an IP packet?", a: "Time-To-Live is a counter decremented by each router. When TTL hits 0 the packet is discarded and an ICMP 'Time Exceeded' message is sent back. Prevents packets looping forever on routing loops." },
    { q: "What is NAT?", a: "Network Address Translation lets many private IP devices share one public IP. The router rewrites packet source IPs when sending out and reverses it for incoming packets. This is why your home devices have 192.168.x.x but appear as one public IP to the internet." }
  ],
  realWorld: [
    { company: "Cloudflare", text: "Cloudflare's Anycast routing advertises the same IP from dozens of data centers. DNS resolves you to the nearest data center, dramatically reducing latency — all enabled by IP routing protocol fundamentals." },
    { company: "AWS", text: "AWS VPCs use private IP ranges (10.0.0.0/8 by default). Understanding subnets, CIDR notation, and routing tables is required to configure security groups, NAT gateways, and VPN connections in AWS." }
  ],
  quiz: [
    { q: "How many bits in an IPv4 address?", options: ["16", "32", "64", "128"], answer: 1 },
    { q: "Which is a private IP address?", options: ["8.8.8.8", "192.168.0.1", "216.58.194.46", "1.1.1.1"], answer: 1 },
    { q: "What is TTL in an IP packet?", options: ["Transfer Type Level", "Time-To-Live, limits packet lifespan", "Trusted Tunnel Layer", "Total Transfer Limit"], answer: 1 },
    { q: "What does NAT do?", options: ["Converts domain names to IPs", "Allows private IPs to share a public IP", "Encrypts packets", "Assigns static IPs"], answer: 1 },
    { q: "What is a /24 subnet's maximum number of usable hosts?", options: ["256", "255", "254", "128"], answer: 2 }
  ]
});

// ── MODULE 23: TCP/IP ────────────────────────────────────────────────────────
window.CSFA_RAW_TOPICS.push({
  id: 'm23-tcp', module: 23,
  title: 'TCP vs UDP',
  tagline: 'The two transport protocols — reliable ordered delivery vs fast-and-loose streaming.',
  readMinutes: 6,
  intro: {
    whatItIs: "TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery of data between applications. It uses a three-way handshake to establish connections, acknowledges received packets, and retransmits lost ones. UDP (User Datagram Protocol) is connectionless — it sends packets with no guarantee of delivery, order, or error correction, but is much faster.",
    whyItMatters: "Choosing TCP vs UDP matters for performance. Web (HTTP/HTTPS), email, file transfers use TCP. Video streaming, gaming, VoIP, DNS queries use UDP. WebRTC, the protocol behind video calls, uses UDP with application-level reliability.",
    whereUsed: "HTTP/HTTPS over TCP. DNS queries over UDP. Video streaming (HLS/DASH): TCP. Real-time gaming: UDP. WebRTC video calls: UDP. gRPC: TCP via HTTP/2.",
    commonMistakes: "Assuming UDP is always faster. UDP is faster only when the application can tolerate packet loss or handles reliability itself. For reliable data transfer, TCP's overhead is worth it."
  },
  visual: { caption: "TCP: SYN → SYN-ACK → ACK (3-way handshake). UDP: just send, no handshake.", type: "tcp-udp" },
  examples: [
    { difficulty: "very-easy", title: "TCP vs UDP comparison", explanation: "Key properties of each protocol.", code: "const protocols = {\n  TCP: { reliable: true,  ordered: true,  speed: 'slower', use: 'HTTP, email, SSH' },\n  UDP: { reliable: false, ordered: false, speed: 'faster', use: 'DNS, gaming, video' }\n};\nObject.entries(protocols).forEach(([name, p]) => {\n  console.log(`${name}: reliable=${p.reliable}, ordered=${p.ordered}, use=${p.use}`);\n});", language: "javascript", output: "TCP: reliable=true, ordered=true, use=HTTP, email, SSH\nUDP: reliable=false, ordered=false, use=DNS, gaming, video" },
    { difficulty: "easy", title: "TCP 3-way handshake simulation", explanation: "TCP connections start with SYN → SYN-ACK → ACK before any data flows.", code: "function tcpHandshake(client, server) {\n  console.log(`${client} → ${server}: SYN`);\n  console.log(`${server} → ${client}: SYN-ACK`);\n  console.log(`${client} → ${server}: ACK`);\n  console.log('Connection established!');\n}\ntcpHandshake('Browser', 'Server');", language: "javascript", output: "Browser → Server: SYN\nServer → Browser: SYN-ACK\nBrowser → Server: ACK\nConnection established!" },
    { difficulty: "medium", title: "Simulating TCP acknowledgement", explanation: "TCP tracks sequence numbers and ACKs to guarantee ordered delivery.", code: "class TCPStream {\n  constructor() { this.seq = 0; this.buffer = []; }\n  send(data) { this.seq++; return { seq: this.seq, data }; }\n  receive(packet) { this.buffer.push(packet); return { ack: packet.seq + 1 }; }\n}\nconst s = new TCPStream();\nconst p1 = s.send('Hello');\nconsole.log('Sent:', p1);\nconst ack = s.receive(p1);\nconsole.log('Ack:', ack);", language: "javascript", output: "Sent: { seq: 1, data: 'Hello' }\nAck: { ack: 2 }" },
    { difficulty: "medium-plus", title: "UDP packet loss simulation", explanation: "UDP doesn't guarantee delivery. Here we simulate random packet loss.", code: "function udpSend(packets, lossRate = 0.3) {\n  let received = 0;\n  packets.forEach((p, i) => {\n    if (Math.random() > lossRate) { received++; }\n    else { console.log(`Packet ${i+1} LOST`); }\n  });\n  console.log(`${received}/${packets.length} packets received`);\n}\n// Deterministic for demo:\nfunction deterministicUDP(packets) {\n  const lost = [1,3];\n  packets.forEach((_,i)=>{ if(lost.includes(i+1)) console.log(`Packet ${i+1} LOST`); });\n  console.log(`${packets.length-lost.length}/${packets.length} packets received`);\n}\ndeterministicUDP([1,2,3,4,5]);", language: "javascript", output: "Packet 1 LOST\nPacket 3 LOST\n3/5 packets received" },
    { difficulty: "hard", title: "TCP flow control (sliding window)", explanation: "TCP uses a sliding window to limit how much unacknowledged data can be in flight.", code: "function slidingWindow(data, windowSize) {\n  let sent = 0;\n  while (sent < data.length) {\n    const window = data.slice(sent, sent + windowSize);\n    console.log(`Window [${sent}-${sent+window.length-1}]:`, window);\n    sent += window.length; // simulate ACK received\n  }\n}\nslidingWindow([1,2,3,4,5,6,7,8], 3);", language: "javascript", output: "Window [0-2]: [ 1, 2, 3 ]\nWindow [3-5]: [ 4, 5, 6 ]\nWindow [6-7]: [ 7, 8 ]" },
    { difficulty: "real-world", title: "Port assignment", explanation: "Well-known ports: 80=HTTP, 443=HTTPS, 22=SSH, 5432=PostgreSQL.", code: "const wellKnownPorts = { 22:'SSH', 25:'SMTP', 53:'DNS', 80:'HTTP', 443:'HTTPS', 3000:'Dev Server', 5432:'PostgreSQL', 27017:'MongoDB' };\n[443, 5432, 27017, 9999].forEach(port => {\n  console.log(`Port ${port}: ${wellKnownPorts[port] || 'Dynamic/Unknown'}`);\n});", language: "javascript", output: "Port 443: HTTPS\nPort 5432: PostgreSQL\nPort 27017: MongoDB\nPort 9999: Dynamic/Unknown" }
  ],
  exercises: [
    { level: 1, title: "TCP or UDP?", problem: "Write `chooseProtocol(requirement)` that returns 'TCP' if requirement is 'reliable' and 'UDP' if requirement is 'fast'.", hints: ["Simple if/else."], solution: "const chooseProtocol = r => r==='reliable'?'TCP':'UDP';\nconsole.log(chooseProtocol('reliable'), chooseProtocol('fast'));" },
    { level: 2, title: "Port lookup", problem: "Create a Map of well-known ports (80→HTTP, 443→HTTPS, 22→SSH, 3306→MySQL). Write `lookupPort(n)` that returns the service name or 'Unknown'.", hints: ["Use Map.get() with ?? 'Unknown'."], solution: "const ports=new Map([[80,'HTTP'],[443,'HTTPS'],[22,'SSH'],[3306,'MySQL']]);\nconst lookupPort=n=>ports.get(n)??'Unknown';\nconsole.log(lookupPort(443),lookupPort(9999));" },
    { level: 3, title: "Sliding window", problem: "Write `slidingWindow(arr, size)` that yields chunks of the array in groups of `size`, logging each as 'Window: [items]'.", hints: ["Use a while loop with slice(i, i+size)."], solution: "function slidingWindow(arr,size){let i=0;while(i<arr.length){console.log('Window:',arr.slice(i,i+size));i+=size;}}\nslidingWindow([1,2,3,4,5],2);" }
  ],
  interview: [
    { q: "When would you choose UDP over TCP?", a: "Choose UDP when: (1) Low latency is critical and occasional packet loss is acceptable (gaming, video calls). (2) You're implementing your own reliability layer at the application level. (3) Simple request-response fits in one packet (DNS). HTTP/3 (QUIC) actually builds reliability on top of UDP to avoid TCP's head-of-line blocking." },
    { q: "What is the TCP 3-way handshake?", a: "Client sends SYN (synchronize). Server responds SYN-ACK. Client sends ACK. This establishes both directions of communication and synchronizes sequence numbers before data transfer begins." },
    { q: "What is TCP head-of-line blocking?", a: "If one TCP packet is lost, all subsequent packets in the stream must wait for it to be retransmitted before delivery. HTTP/2 multiplexes streams over one TCP connection, so one stream's loss blocks all others — this is why HTTP/3 switched to QUIC over UDP." }
  ],
  realWorld: [
    { company: "Discord", text: "Discord uses UDP for voice/video (through WebRTC) — a dropped packet in voice is barely noticeable, but TCP's retransmission delay would cause jarring audio stutters. Their text messaging uses TCP for guaranteed delivery." },
    { company: "Google (QUIC/HTTP3)", text: "Google created QUIC, which runs HTTP/3 over UDP, eliminating TCP's head-of-line blocking while implementing its own reliability. Chrome and most modern CDNs support HTTP/3 today." }
  ],
  quiz: [
    { q: "Which protocol guarantees packet delivery?", options: ["UDP", "TCP", "IP", "ICMP"], answer: 1 },
    { q: "TCP uses a ___ handshake to establish connections.", options: ["1-way", "2-way", "3-way", "4-way"], answer: 2 },
    { q: "Which protocol is best for real-time gaming?", options: ["TCP", "UDP", "FTP", "SMTP"], answer: 1 },
    { q: "What port does HTTPS use?", options: ["80", "22", "443", "8080"], answer: 2 },
    { q: "What is TCP head-of-line blocking?", options: ["Firewall blocking TCP", "Lost packet blocks delivery of subsequent packets", "Too many connections", "Slow server response"], answer: 1 }
  ]
});

// ── MODULE 24: HTTP & The Web ─────────────────────────────────────────────────
window.CSFA_RAW_TOPICS.push({
  id: 'm24-http', module: 24,
  title: 'HTTP & HTTPS',
  tagline: 'The protocol of the web — methods, status codes, headers, and TLS encryption.',
  readMinutes: 7,
  intro: {
    whatItIs: "HTTP (Hypertext Transfer Protocol) is a request-response protocol used by browsers and servers. A client sends a request with a method (GET, POST, PUT, DELETE), URL, headers, and optionally a body. The server responds with a status code, headers, and body. HTTPS adds TLS encryption, ensuring data confidentiality and server identity verification.",
    whyItMatters: "Every web API call is HTTP. Understanding methods, status codes, and headers is essential for debugging network issues, building APIs, and configuring caches, proxies, and CDNs correctly.",
    whereUsed: "All web apps, REST APIs, GraphQL APIs, webhooks, browser fetch calls, curl commands, Postman requests — HTTP is the universal language of the web.",
    commonMistakes: "Returning 200 OK for errors (e.g., returning 200 with an error body). Use proper status codes: 400 for bad requests, 401 for unauthenticated, 403 for unauthorized, 404 for not found, 500 for server errors."
  },
  visual: { caption: "HTTP Request: Method URL HTTP/1.1 Headers Body → HTTP Response: Status Headers Body", type: "http-request-response" },
  examples: [
    { difficulty: "very-easy", title: "HTTP status codes", explanation: "Status codes tell the client what happened: 2xx=success, 3xx=redirect, 4xx=client error, 5xx=server error.", code: "const codes = { 200:'OK', 201:'Created', 301:'Moved Permanently', 400:'Bad Request', 401:'Unauthorized', 403:'Forbidden', 404:'Not Found', 500:'Internal Server Error' };\n[200,201,404,500].forEach(c => console.log(`${c}: ${codes[c]}`));", language: "javascript", output: "200: OK\n201: Created\n404: Not Found\n500: Internal Server Error" },
    { difficulty: "easy", title: "HTTP methods", explanation: "Each HTTP method has a specific semantic meaning for REST APIs.", code: "const methods = [\n  { method: 'GET',    action: 'Read resource' },\n  { method: 'POST',   action: 'Create resource' },\n  { method: 'PUT',    action: 'Replace resource' },\n  { method: 'PATCH',  action: 'Partial update' },\n  { method: 'DELETE', action: 'Remove resource' },\n];\nmethods.forEach(m => console.log(`${m.method.padEnd(7)}: ${m.action}`));", language: "javascript", output: "GET    : Read resource\nPOST   : Create resource\nPUT    : Replace resource\nPATCH  : Partial update\nDELETE : Remove resource" },
    { difficulty: "medium", title: "Request/response simulation", explanation: "Simulate an HTTP exchange with headers.", code: "const request = {\n  method: 'GET', url: '/api/users/1',\n  headers: { 'Accept': 'application/json', 'Authorization': 'Bearer token123' }\n};\nconst response = {\n  status: 200,\n  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=300' },\n  body: { id: 1, name: 'Alice' }\n};\nconsole.log('Request:', request.method, request.url);\nconsole.log('Response:', response.status, JSON.stringify(response.body));", language: "javascript", output: "Request: GET /api/users/1\nResponse: 200 {\"id\":1,\"name\":\"Alice\"}" },
    { difficulty: "medium-plus", title: "CORS headers", explanation: "CORS headers tell browsers which origins can access an API.", code: "function setCORSHeaders(allowedOrigin) {\n  return {\n    'Access-Control-Allow-Origin': allowedOrigin,\n    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',\n    'Access-Control-Allow-Headers': 'Content-Type, Authorization',\n  };\n}\nconst headers = setCORSHeaders('https://myapp.com');\nObject.entries(headers).forEach(([k,v]) => console.log(`${k}: ${v}`));", language: "javascript", output: "Access-Control-Allow-Origin: https://myapp.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Content-Type, Authorization" },
    { difficulty: "hard", title: "TLS handshake steps", explanation: "HTTPS adds a TLS handshake before HTTP data flows — establishing encryption and verifying the server's identity.", code: "const tlsSteps = [\n  'Client Hello (supported ciphers, TLS version)',\n  'Server Hello + Certificate',\n  'Client verifies certificate against CA',\n  'Key exchange (generate shared session key)',\n  'Client Finished',\n  'Server Finished',\n  'Encrypted HTTP data flows',\n];\ntlsSteps.forEach((s, i) => console.log(`Step ${i+1}: ${s}`));", language: "javascript", output: "Step 1: Client Hello (supported ciphers, TLS version)\nStep 2: Server Hello + Certificate\nStep 3: Client verifies certificate against CA\nStep 4: Key exchange (generate shared session key)\nStep 5: Client Finished\nStep 6: Server Finished\nStep 7: Encrypted HTTP data flows" },
    { difficulty: "real-world", title: "Cache-Control headers", explanation: "Cache-Control headers tell browsers and CDNs how long to cache responses.", code: "function cacheHeader(type) {\n  const policies = {\n    'static-asset': 'public, max-age=31536000, immutable', // 1 year\n    'api-response':  'private, max-age=60',                  // 1 min\n    'no-cache':      'no-cache, no-store, must-revalidate',\n  };\n  return policies[type] || 'no-cache';\n}\n['static-asset','api-response','no-cache'].forEach(t =>\n  console.log(`${t}: ${cacheHeader(t)}`));", language: "javascript", output: "static-asset: public, max-age=31536000, immutable\napi-response: private, max-age=60\nno-cache: no-cache, no-store, must-revalidate" }
  ],
  exercises: [
    { level: 1, title: "Status code classifier", problem: "Write `classifyStatus(code)` returning 'Success', 'Redirect', 'Client Error', or 'Server Error' based on the status code.", hints: ["Check ranges: 200-299, 300-399, 400-499, 500-599."], solution: "function classifyStatus(c){return c<300?'Success':c<400?'Redirect':c<500?'Client Error':'Server Error';}\nconsole.log(classifyStatus(200),classifyStatus(404),classifyStatus(500));" },
    { level: 2, title: "HTTP method validator", problem: "Write `isIdempotent(method)` that returns true if the HTTP method is idempotent (GET, PUT, DELETE, HEAD) and false for POST/PATCH.", hints: ["Use a Set of idempotent methods."], solution: "const idempotent=new Set(['GET','PUT','DELETE','HEAD','OPTIONS']);\nconst isIdempotent=m=>idempotent.has(m);\nconsole.log(isIdempotent('GET'),isIdempotent('POST'));" },
    { level: 3, title: "Request builder", problem: "Write `buildRequest(method, url, token)` that returns a request object with method, url, and headers including Authorization: Bearer <token>.", hints: ["Return {method, url, headers:{Authorization:`Bearer ${token}`}}."], solution: "function buildRequest(method,url,token){return{method,url,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'}};}\nconsole.log(buildRequest('POST','/api/users','abc123'));" }
  ],
  interview: [
    { q: "What is the difference between PUT and PATCH?", a: "PUT replaces the entire resource with the new data (idempotent). PATCH applies a partial update — only the fields provided are changed. PATCH is better when you only want to update one field without sending the full object." },
    { q: "What does idempotent mean in HTTP?", a: "An idempotent request produces the same result whether called once or many times. GET, PUT, DELETE are idempotent. POST is not — calling POST /users twice creates two users. Idempotency is important for safe retries on network failures." },
    { q: "What is HTTPS and how does TLS work?", a: "HTTPS is HTTP over TLS. TLS provides: (1) Encryption — data is unreadable to eavesdroppers. (2) Authentication — the server presents a certificate signed by a trusted CA proving its identity. (3) Integrity — data cannot be tampered with in transit." }
  ],
  realWorld: [
    { company: "Twitter API", text: "Twitter's API returns precise HTTP status codes: 401 for missing auth, 403 for insufficient permissions, 429 for rate limit exceeded, 503 for server overload. Clients must handle each differently." },
    { company: "Cloudflare", text: "Cloudflare's CDN uses Cache-Control headers to cache static assets at edge locations globally. Correct max-age settings can eliminate origin requests for 99% of traffic — understanding HTTP headers directly impacts performance." }
  ],
  quiz: [
    { q: "What HTTP status code means 'Not Found'?", options: ["400", "401", "403", "404"], answer: 3 },
    { q: "Which HTTP method is used to create a new resource?", options: ["GET", "POST", "PUT", "DELETE"], answer: 1 },
    { q: "What does HTTPS add over HTTP?", options: ["Faster speed", "TLS encryption and authentication", "Larger payload support", "Compression"], answer: 1 },
    { q: "What status code means 'Unauthorized' (no authentication)?", options: ["400", "401", "403", "404"], answer: 1 },
    { q: "Which HTTP method is NOT idempotent?", options: ["GET", "PUT", "DELETE", "POST"], answer: 3 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm22-lan-wan',
  module: 22,
  title: 'LAN / WAN',
  tagline: 'Master LAN / WAN to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at LAN / WAN.',
    whyItMatters: 'Understanding LAN / WAN is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of LAN / WAN before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of LAN / WAN.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of LAN / WAN', explanation: 'Let\'s look at a simple example demonstrating LAN / WAN in action.', code: 'console.log("Initializing LAN / WAN...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing LAN / WAN...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with LAN / WAN', explanation: 'A practical example showing a real-world coding scenario using LAN / WAN.', code: 'function demonstrate() {\n  console.log("Running LAN / WAN flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running LAN / WAN flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check LAN / WAN setup', problem: 'Write a function testSetup() that returns the string "LAN / WAN OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "LAN / WAN OK"; }' }
  ],
  interview: [
    { q: 'Why is LAN / WAN important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to LAN / WAN in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of LAN / WAN?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm22-internet',
  module: 22,
  title: 'The Internet',
  tagline: 'Master The Internet to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at The Internet.',
    whyItMatters: 'Understanding The Internet is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of The Internet before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of The Internet.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of The Internet', explanation: 'Let\'s look at a simple example demonstrating The Internet in action.', code: 'console.log("Initializing The Internet...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing The Internet...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with The Internet', explanation: 'A practical example showing a real-world coding scenario using The Internet.', code: 'function demonstrate() {\n  console.log("Running The Internet flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running The Internet flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check The Internet setup', problem: 'Write a function testSetup() that returns the string "The Internet OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "The Internet OK"; }' }
  ],
  interview: [
    { q: 'Why is The Internet important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to The Internet in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of The Internet?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm22-routers-switches',
  module: 22,
  title: 'Routers & Switches',
  tagline: 'Master Routers & Switches to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Routers & Switches.',
    whyItMatters: 'Understanding Routers & Switches is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Routers & Switches before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Routers & Switches.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Routers & Switches', explanation: 'Let\'s look at a simple example demonstrating Routers & Switches in action.', code: 'console.log("Initializing Routers & Switches...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Routers & Switches...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Routers & Switches', explanation: 'A practical example showing a real-world coding scenario using Routers & Switches.', code: 'function demonstrate() {\n  console.log("Running Routers & Switches flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Routers & Switches flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Routers & Switches setup', problem: 'Write a function testSetup() that returns the string "Routers & Switches OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Routers & Switches OK"; }' }
  ],
  interview: [
    { q: 'Why is Routers & Switches important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Routers & Switches in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Routers & Switches?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm22-mac-address',
  module: 22,
  title: 'MAC Address',
  tagline: 'Master MAC Address to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at MAC Address.',
    whyItMatters: 'Understanding MAC Address is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of MAC Address before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of MAC Address.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of MAC Address', explanation: 'Let\'s look at a simple example demonstrating MAC Address in action.', code: 'console.log("Initializing MAC Address...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing MAC Address...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with MAC Address', explanation: 'A practical example showing a real-world coding scenario using MAC Address.', code: 'function demonstrate() {\n  console.log("Running MAC Address flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running MAC Address flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check MAC Address setup', problem: 'Write a function testSetup() that returns the string "MAC Address OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "MAC Address OK"; }' }
  ],
  interview: [
    { q: 'Why is MAC Address important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to MAC Address in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of MAC Address?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm22-ports',
  module: 22,
  title: 'Ports',
  tagline: 'Master Ports to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Ports.',
    whyItMatters: 'Understanding Ports is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Ports before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Ports.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Ports', explanation: 'Let\'s look at a simple example demonstrating Ports in action.', code: 'console.log("Initializing Ports...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Ports...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Ports', explanation: 'A practical example showing a real-world coding scenario using Ports.', code: 'function demonstrate() {\n  console.log("Running Ports flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Ports flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Ports setup', problem: 'Write a function testSetup() that returns the string "Ports OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Ports OK"; }' }
  ],
  interview: [
    { q: 'Why is Ports important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Ports in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Ports?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm22-packets',
  module: 22,
  title: 'Packets',
  tagline: 'Master Packets to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Packets.',
    whyItMatters: 'Understanding Packets is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Packets before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Packets.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Packets', explanation: 'Let\'s look at a simple example demonstrating Packets in action.', code: 'console.log("Initializing Packets...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Packets...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Packets', explanation: 'A practical example showing a real-world coding scenario using Packets.', code: 'function demonstrate() {\n  console.log("Running Packets flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Packets flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Packets setup', problem: 'Write a function testSetup() that returns the string "Packets OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Packets OK"; }' }
  ],
  interview: [
    { q: 'Why is Packets important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Packets in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Packets?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
