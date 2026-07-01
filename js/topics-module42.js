/* Modules 42–65: Final curriculum modules — DevOps, Security, AI, Algorithms */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

// MODULE 49 — Docker & Containers
window.CSFA_RAW_TOPICS.push({
  id: 'm49-docker', module: 49, title: 'Docker & Containerization',
  tagline: 'Ship any app anywhere — containers, images, Dockerfile, and docker-compose.',
  readMinutes: 7,
  intro: {
    whatItIs: "Docker packages applications and their dependencies into containers — lightweight, portable, isolated environments. An image is an immutable snapshot. A container is a running image. Dockerfile defines how to build an image. docker-compose orchestrates multi-container apps. Containers solve 'works on my machine' problems.",
    whyItMatters: "Containerization is the foundation of modern DevOps. Kubernetes orchestrates containers at scale. Every cloud platform (AWS ECS, Google Cloud Run, Azure Container Apps) runs containers. Understanding Docker is required for modern deployment.",
    whereUsed: "Development environments, CI/CD pipelines (run tests in containers), production deployments (ECS, Kubernetes, Cloud Run), microservices, reproducible builds.",
    commonMistakes: "Running as root in containers (security risk — use USER directive). Storing secrets in Dockerfile or image layers — use environment variables or secrets managers. Not using .dockerignore (uploads node_modules to build context)."
  },
  visual: { caption: "Dockerfile → docker build → Image → docker run → Container (isolated process)", type: "docker-flow" },
  examples: [
    { difficulty: "very-easy", title: "Dockerfile basics", explanation: "A Dockerfile describes how to build a container image layer by layer.", code: "const dockerfile = `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nUSER node\nCMD [\"node\", \"src/server.js\"]`;\nconsole.log('Dockerfile:');\ndockerfile.split('\\n').forEach(l => console.log(l));", language: "javascript", output: "Dockerfile:\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nUSER node\nCMD [\"node\", \"src/server.js\"]" },
    { difficulty: "easy", title: "Docker commands", explanation: "Essential Docker CLI commands for development.", code: "const commands = [\n  { cmd: 'docker build -t myapp:1.0 .', desc: 'Build image from Dockerfile' },\n  { cmd: 'docker run -p 3000:3000 myapp:1.0', desc: 'Run container, map port' },\n  { cmd: 'docker ps', desc: 'List running containers' },\n  { cmd: 'docker logs -f container_id', desc: 'Follow container logs' },\n  { cmd: 'docker exec -it container bash', desc: 'Shell into running container' },\n  { cmd: 'docker stop container_id', desc: 'Stop container gracefully' },\n];\ncommands.forEach(c => console.log(`$ ${c.cmd}\\n  → ${c.desc}`));", language: "javascript", output: "$ docker build -t myapp:1.0 .\n  → Build image from Dockerfile\n$ docker run -p 3000:3000 myapp:1.0\n  → Run container, map port\n$ docker ps\n  → List running containers\n$ docker logs -f container_id\n  → Follow container logs\n$ docker exec -it container bash\n  → Shell into running container\n$ docker stop container_id\n  → Stop container gracefully" },
    { difficulty: "medium", title: "Multi-stage builds", explanation: "Multi-stage builds create smaller production images by separating build and runtime stages.", code: "const multiStage = `# Stage 1: Build\nFROM node:18 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\n# Stage 2: Production (only copy built output)\nFROM node:18-alpine AS production\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCMD [\"node\", \"dist/server.js\"]`;\nconsole.log('Multi-stage build reduces image size by ~70%');\nconsole.log('Build stage not included in final image');", language: "javascript", output: "Multi-stage build reduces image size by ~70%\nBuild stage not included in final image" },
    { difficulty: "medium-plus", title: "docker-compose.yml", explanation: "docker-compose defines multi-container apps with networks and volumes.", code: "const dockerCompose = `version: '3.8'\nservices:\n  app:\n    build: .\n    ports: ['3000:3000']\n    environment:\n      - DATABASE_URL=postgres://postgres:secret@db:5432/mydb\n    depends_on: [db, redis]\n  db:\n    image: postgres:15-alpine\n    environment:\n      - POSTGRES_PASSWORD=secret\n    volumes: ['postgres_data:/var/lib/postgresql/data']\n  redis:\n    image: redis:7-alpine\nvolumes:\n  postgres_data:`;\nconsole.log('docker-compose services:', ['app', 'db', 'redis'].join(', '));", language: "javascript", output: "docker-compose services: app, db, redis" },
    { difficulty: "hard", title: "Container security best practices", explanation: "Secure containers reduce attack surface in production.", code: "const securityChecklist = [\n  '✓ Use specific image tags, not :latest',\n  '✓ Run as non-root USER directive',\n  '✓ Use minimal base images (alpine, distroless)',\n  '✓ Never store secrets in Dockerfile or image',\n  '✓ Add .dockerignore (exclude node_modules, .env, .git)',\n  '✓ Scan images: docker scout / trivy / snyk',\n  '✓ Read-only filesystem: --read-only flag',\n  '✓ Drop Linux capabilities: --cap-drop ALL',\n];\nsecurityChecklist.forEach(c => console.log(c));", language: "javascript", output: "✓ Use specific image tags, not :latest\n✓ Run as non-root USER directive\n✓ Use minimal base images (alpine, distroless)\n✓ Never store secrets in Dockerfile or image\n✓ Add .dockerignore (exclude node_modules, .env, .git)\n✓ Scan images: docker scout / trivy / snyk\n✓ Read-only filesystem: --read-only flag\n✓ Drop Linux capabilities: --cap-drop ALL" },
    { difficulty: "real-world", title: "GitHub Actions with Docker", explanation: "CI/CD pipeline builds and pushes Docker images on every merge to main.", code: "const ciPipeline = `name: Build and Push\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Login to ECR\n        uses: aws-actions/amazon-ecr-login@v2\n      - name: Build and push\n        run: |\n          docker build -t \\$ECR_REGISTRY/myapp:\\$GITHUB_SHA .\n          docker push \\$ECR_REGISTRY/myapp:\\$GITHUB_SHA`;\nconsole.log('CI/CD: every merge builds + pushes a tagged image');", language: "javascript", output: "CI/CD: every merge builds + pushes a tagged image" }
  ],
  exercises: [
    { level: 1, title: "Dockerfile layer optimizer", problem: "Explain why COPY package*.json ./ and RUN npm ci should come BEFORE COPY . . Write the order as an array of steps.", hints: ["Package install is cached if package.json unchanged. Source code changes more often."], solution: "const steps=['FROM node:18-alpine','WORKDIR /app','COPY package*.json ./','RUN npm ci','COPY . .','CMD [\"node\",\"server.js\"]'];\nsteps.forEach((s,i)=>console.log(i+1,s));" },
    { level: 2, title: "docker-compose port mapper", problem: "Write `parsePort(portStr)` that takes '3000:3000' and returns {host:3000, container:3000}.", hints: ["Split on ':', return {host: parseInt(parts[0]), container: parseInt(parts[1])}."], solution: "const parsePort=s=>{const[h,c]=s.split(':');return{host:parseInt(h),container:parseInt(c)};}\nconsole.log(parsePort('8080:3000'));" },
    { level: 3, title: ".dockerignore generator", problem: "Write `dockerignore(extras=[])` returning an array of standard items to ignore: node_modules, .env, .git, dist, coverage, plus any extras.", hints: ["Spread [...defaults, ...extras]."], solution: "const dockerignore=(extra=[])=>['.git','.env','node_modules','dist','coverage','*.log',...extra];\nconsole.log(dockerignore(['.nyc_output','*.test.js']));" }
  ],
  interview: [
    { q: "What is the difference between a Docker image and a container?", a: "An image is an immutable, layered snapshot of a filesystem and configuration — like a class definition. A container is a running instance of an image — like an object. Multiple containers can run from the same image." },
    { q: "Why use multi-stage Docker builds?", a: "Separate build and runtime stages: Stage 1 installs all dev dependencies and builds artifacts. Stage 2 copies only the built output into a minimal base image — no build tools, test dependencies, or source code. Reduces image size by 60-80% and the attack surface." },
    { q: "How do containers differ from VMs?", a: "VMs virtualize hardware — each has a full OS kernel (GBs). Containers virtualize the OS — they share the host kernel and only contain the app and its dependencies (MBs). Containers start in milliseconds; VMs in minutes. Containers are less isolated but far more lightweight." }
  ],
  realWorld: [
    { company: "AWS ECS / Fargate", text: "AWS Fargate runs Docker containers without managing servers. You define a task definition (like docker-compose.yml), and Fargate handles provisioning, scaling, and networking. The entire container lifecycle is Docker-compatible." },
    { company: "GitHub Actions", text: "GitHub Actions runs every CI job inside a Docker container. This gives complete isolation, reproducibility, and the ability to use any environment without affecting other workflows." }
  ],
  quiz: [
    { q: "What is a Docker image?", options: ["A running container", "An immutable snapshot of app + dependencies", "A virtual machine", "A configuration file"], answer: 1 },
    { q: "What does EXPOSE do in a Dockerfile?", options: ["Opens a port on the host", "Documents which port the container listens on", "Creates a firewall rule", "Starts a service"], answer: 1 },
    { q: "Why use docker-compose?", options: ["Build single containers", "Orchestrate multiple containers with shared network", "Push to Docker Hub", "Scan for vulnerabilities"], answer: 1 },
    { q: "What does multi-stage build achieve?", options: ["Faster builds", "Smaller production images by excluding build tools", "Better logs", "Automatic scaling"], answer: 1 },
    { q: "Best practice: Dockerfile should run containers as:", options: ["root", "sudo", "Non-root USER", "admin"], answer: 2 }
  ]
});

// MODULE 50 — CI/CD Pipelines  
window.CSFA_RAW_TOPICS.push({
  id: 'm50-cicd', module: 50, title: 'CI/CD — Continuous Integration & Deployment',
  tagline: 'Automating the path from code commit to production — test, build, deploy, monitor.',
  readMinutes: 6,
  intro: {
    whatItIs: "Continuous Integration (CI) automatically runs tests and builds on every code push. Continuous Deployment (CD) automatically deploys to staging/production when CI passes. Tools: GitHub Actions, GitLab CI, CircleCI, Jenkins. The goal: fast, reliable, automated delivery of code to users.",
    whyItMatters: "Manual deployments are slow, error-prone, and scary. CI/CD transforms deployment from a stressful event to a routine operation. Teams that deploy frequently (multiple times per day) have fewer failures than those that deploy rarely.",
    whereUsed: "Every professional software team. GitHub Actions integrates directly with GitHub repos. Vercel/Netlify have built-in CI/CD for frontend. AWS CodePipeline for AWS deployments.",
    commonMistakes: "No rollback plan. Always deploy with a rollback strategy: blue-green deployments, feature flags, or keeping the previous image ready. Also: running slow tests in the critical path — parallelize and separate fast unit tests from slow E2E tests."
  },
  visual: { caption: "push → CI: lint+test+build → CD: deploy to staging → approve → deploy to prod", type: "cicd-pipeline" },
  examples: [
    { difficulty: "very-easy", title: "GitHub Actions workflow", explanation: "A GitHub Actions YAML workflow runs on push and executes steps.", code: "const workflow = `name: CI\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '18' }\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm run build`;\nconsole.log('Pipeline stages:', ['checkout','setup','install','lint','test','build'].join(' → '));", language: "javascript", output: "Pipeline stages: checkout → setup → install → lint → test → build" },
    { difficulty: "easy", title: "Deployment strategies", explanation: "Different strategies for deploying updates with varying risk and downtime.", code: "const strategies = [\n  { name: 'Recreate',      desc: 'Stop old, start new. Simple but has downtime.' },\n  { name: 'Rolling',       desc: 'Gradually replace old instances. No downtime.' },\n  { name: 'Blue-Green',    desc: 'Two identical envs. Switch traffic instantly. Instant rollback.' },\n  { name: 'Canary',        desc: 'Route 5% traffic to new version. Detect issues early.' },\n  { name: 'Feature Flag',  desc: 'Deploy code but enable for % of users via flag.' },\n];\nstrategies.forEach(s => console.log(`${s.name}: ${s.desc}`));", language: "javascript", output: "Recreate: Stop old, start new. Simple but has downtime.\nRolling: Gradually replace old instances. No downtime.\nBlue-Green: Two identical envs. Switch traffic instantly. Instant rollback.\nCanary: Route 5% traffic to new version. Detect issues early.\nFeature Flag: Deploy code but enable for % of users via flag." },
    { difficulty: "medium", title: "Environment progression", explanation: "Code moves through environments: dev → staging → production.", code: "const environments = [\n  { name: 'local',   trigger: 'Developer runs locally',    approvals: 0, audience: 'Developer only' },\n  { name: 'dev',     trigger: 'Push to feature branch',   approvals: 0, audience: 'Dev team' },\n  { name: 'staging', trigger: 'Merge to main (auto-deploy)', approvals: 0, audience: 'Internal QA' },\n  { name: 'prod',    trigger: 'Manual approval gate',     approvals: 1, audience: 'All users' },\n];\nenvironments.forEach(e => console.log(`${e.name.padEnd(8)}: ${e.trigger} | audience: ${e.audience}`));", language: "javascript", output: "local   : Developer runs locally | audience: Developer only\ndev     : Push to feature branch | audience: Dev team\nstaging : Merge to main (auto-deploy) | audience: Internal QA\nprod    : Manual approval gate | audience: All users" },
    { difficulty: "medium-plus", title: "Semantic versioning in CI", explanation: "Semantic versioning (major.minor.patch) communicates the impact of changes.", code: "function bumpVersion(current, changeType) {\n  const [major, minor, patch] = current.split('.').map(Number);\n  if (changeType === 'major') return `${major+1}.0.0`;\n  if (changeType === 'minor') return `${major}.${minor+1}.0`;\n  return `${major}.${minor}.${patch+1}`;\n}\nconsole.log('1.2.3 + patch:', bumpVersion('1.2.3','patch'));\nconsole.log('1.2.3 + minor:', bumpVersion('1.2.3','minor'));\nconsole.log('1.2.3 + major:', bumpVersion('1.2.3','major'));", language: "javascript", output: "1.2.3 + patch: 1.2.4\n1.2.3 + minor: 1.3.0\n1.2.3 + major: 2.0.0" },
    { difficulty: "hard", title: "Pipeline matrix strategy", explanation: "Matrix strategy runs jobs in parallel across multiple configurations.", code: "const matrixConfig = `jobs:\n  test:\n    strategy:\n      matrix:\n        node-version: [16, 18, 20]\n        os: [ubuntu-latest, windows-latest]\n    # This creates 6 parallel jobs:\n    # node16+ubuntu, node16+windows, node18+ubuntu...\n    runs-on: \\${{ matrix.os }}\n    steps:\n      - uses: actions/setup-node@v4\n        with: { node-version: \\${{ matrix.node-version }} }\n      - run: npm test`;\nconst jobs = [16,18,20].flatMap(v => ['ubuntu','windows'].map(os => `node${v}+${os}`));\nconsole.log('Matrix creates', jobs.length, 'parallel jobs:', jobs.join(', '));", language: "javascript", output: "Matrix creates 6 parallel jobs: node16+ubuntu, node16+windows, node18+ubuntu, node18+windows, node20+ubuntu, node20+windows" },
    { difficulty: "real-world", title: "Zero-downtime deployment", explanation: "Blue-green deployment enables instant rollback and zero downtime.", code: "class BlueGreenDeployment {\n  constructor() { this.active = 'blue'; this.envs = { blue: 'v1.0.0', green: null }; }\n  deploy(version) {\n    const target = this.active === 'blue' ? 'green' : 'blue';\n    this.envs[target] = version;\n    console.log(`Deployed ${version} to ${target} (inactive)`);\n    console.log(`Run smoke tests on ${target}...`);\n    this.active = target;\n    console.log(`✓ Traffic switched to ${target} (${version})`);\n    console.log(`Old ${target === 'blue' ? 'green' : 'blue'} env ready for instant rollback`);\n  }\n}\nconst bg = new BlueGreenDeployment();\nbg.deploy('v1.1.0');", language: "javascript", output: "Deployed v1.1.0 to green (inactive)\nRun smoke tests on green...\n✓ Traffic switched to green (v1.1.0)\nOld blue env ready for instant rollback" }
  ],
  exercises: [
    { level: 1, title: "Version bumper", problem: "Write `semverBump(version, type)` where type is 'major'|'minor'|'patch'. Return the new version string.", hints: ["Split on '.', increment the correct part, reset lower parts."], solution: "function semverBump(v,t){const[M,m,p]=v.split('.').map(Number);if(t==='major')return`${M+1}.0.0`;if(t==='minor')return`${M}.${m+1}.0`;return`${M}.${m}.${p+1}`;}\nconsole.log(semverBump('1.2.3','minor'));" },
    { level: 2, title: "Pipeline status", problem: "Write `pipelineStatus(steps)` where steps is an array of {name, status:'pass'|'fail'}. Return 'PASS' if all pass, 'FAIL: stepName' for the first failed step.", hints: ["Find first step where status==='fail'. Return FAIL message or PASS."], solution: "function pipelineStatus(steps){const fail=steps.find(s=>s.status==='fail');return fail?`FAIL: ${fail.name}`:'PASS';}\nconsole.log(pipelineStatus([{name:'test',status:'pass'},{name:'build',status:'fail'}]));" },
    { level: 3, title: "Canary calculator", problem: "Write `canaryTraffic(currentPercent, targetPercent, steps)` returning an array of traffic percentages for each rollout step.", hints: ["Linearly interpolate from currentPercent to targetPercent in steps steps."], solution: "function canaryTraffic(cur,target,steps){const step=(target-cur)/steps;return Array.from({length:steps+1},(_,i)=>Math.round(cur+step*i));}\nconsole.log(canaryTraffic(0,100,4));" }
  ],
  interview: [
    { q: "What is the difference between CI and CD?", a: "Continuous Integration automatically builds and tests code on every commit — detecting integration issues early. Continuous Delivery/Deployment automatically releases tested code to staging (Delivery) or production (Deployment) without manual intervention. CD requires CI as a prerequisite." },
    { q: "What is a canary deployment?", a: "Gradually route a small percentage (5-10%) of traffic to the new version while keeping the majority on the stable version. Monitor error rates and metrics on the canary. If healthy, increase percentage until 100%. If issues found, instantly route back to 0% — limiting blast radius." },
    { q: "Why deploy small and frequently?", a: "Small deployments are easier to rollback (fewer changes to undo), easier to diagnose (one feature at a time), and fail cheaper (less user impact). Teams deploying many times daily have lower MTTR (Mean Time To Recovery) than teams deploying weekly." }
  ],
  realWorld: [
    { company: "Vercel", text: "Vercel automatically deploys every git push as an immutable Preview Deployment with a unique URL. Merging to main deploys to production. Their CI/CD is invisible — zero configuration needed for Next.js projects." },
    { company: "Netflix", text: "Netflix deploys code hundreds of times per day using canary deployments. Their Spinnaker tool manages multi-cloud canary releases, automatically comparing error rates between canary and baseline to make rollback decisions." }
  ],
  quiz: [
    { q: "What is Continuous Integration?", options: ["Deploying to production automatically", "Auto-testing and building on every code push", "Manual code review process", "Feature flag management"], answer: 1 },
    { q: "What is blue-green deployment?", options: ["Two environments where traffic switches instantly between them", "Gradual rollout to % of users", "Database migration strategy", "A/B testing framework"], answer: 0 },
    { q: "What is a canary deployment?", options: ["Complete rollout to all users", "Route small % of traffic to new version to detect issues", "Blue-green switch", "Rolling restart"], answer: 1 },
    { q: "Semantic versioning: what does bumping the MINOR version mean?", options: ["Bug fix, backward compatible", "New features, backward compatible", "Breaking change", "Security patch only"], answer: 1 },
    { q: "Why is deploying frequently better?", options: ["Uses less bandwidth", "Smaller changes are easier to debug and rollback", "Avoids code review", "Reduces server costs"], answer: 1 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm42-pull-requests',
  module: 42,
  title: 'Pull Requests',
  tagline: 'Master Pull Requests to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Pull Requests.',
    whyItMatters: 'Understanding Pull Requests is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Pull Requests before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Pull Requests.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Pull Requests', explanation: 'Let\'s look at a simple example demonstrating Pull Requests in action.', code: 'console.log("Initializing Pull Requests...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Pull Requests...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Pull Requests', explanation: 'A practical example showing a real-world coding scenario using Pull Requests.', code: 'function demonstrate() {\n  console.log("Running Pull Requests flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Pull Requests flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Pull Requests setup', problem: 'Write a function testSetup() that returns the string "Pull Requests OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Pull Requests OK"; }' }
  ],
  interview: [
    { q: 'Why is Pull Requests important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Pull Requests in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Pull Requests?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm42-issues',
  module: 42,
  title: 'Issues',
  tagline: 'Master Issues to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Issues.',
    whyItMatters: 'Understanding Issues is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Issues before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Issues.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Issues', explanation: 'Let\'s look at a simple example demonstrating Issues in action.', code: 'console.log("Initializing Issues...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Issues...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Issues', explanation: 'A practical example showing a real-world coding scenario using Issues.', code: 'function demonstrate() {\n  console.log("Running Issues flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Issues flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Issues setup', problem: 'Write a function testSetup() that returns the string "Issues OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Issues OK"; }' }
  ],
  interview: [
    { q: 'Why is Issues important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Issues in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Issues?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm42-collaboration',
  module: 42,
  title: 'Collaboration',
  tagline: 'Master Collaboration to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Collaboration.',
    whyItMatters: 'Understanding Collaboration is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Collaboration before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Collaboration.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Collaboration', explanation: 'Let\'s look at a simple example demonstrating Collaboration in action.', code: 'console.log("Initializing Collaboration...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Collaboration...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Collaboration', explanation: 'A practical example showing a real-world coding scenario using Collaboration.', code: 'function demonstrate() {\n  console.log("Running Collaboration flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Collaboration flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Collaboration setup', problem: 'Write a function testSetup() that returns the string "Collaboration OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Collaboration OK"; }' }
  ],
  interview: [
    { q: 'Why is Collaboration important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Collaboration in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Collaboration?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm42-open-source',
  module: 42,
  title: 'Open Source',
  tagline: 'Master Open Source to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Open Source.',
    whyItMatters: 'Understanding Open Source is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Open Source before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Open Source.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Open Source', explanation: 'Let\'s look at a simple example demonstrating Open Source in action.', code: 'console.log("Initializing Open Source...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Open Source...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Open Source', explanation: 'A practical example showing a real-world coding scenario using Open Source.', code: 'function demonstrate() {\n  console.log("Running Open Source flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Open Source flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Open Source setup', problem: 'Write a function testSetup() that returns the string "Open Source OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Open Source OK"; }' }
  ],
  interview: [
    { q: 'Why is Open Source important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Open Source in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Open Source?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
