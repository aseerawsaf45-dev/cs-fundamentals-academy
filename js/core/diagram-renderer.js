/* ==========================================================================
   DIAGRAM RENDERER
   Owns the inline-SVG diagram templates, keyed by topic.visual.type.
   Pure rendering — no DOM access, no state. A static lookup table behind
   a tiny class so it composes cleanly with TopicPageRenderer via DI
   instead of being a free-floating object literal.
   ========================================================================== */

class DiagramRenderer {
  static DIAGRAMS = {
    'cpu-ram-storage-flow': () => `
      <svg viewBox="0 0 720 220" style="width:100%; max-width:680px; height:auto;">
        <defs>
          <marker id="arrow1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#C084FC"/></marker>
        </defs>
        ${[['Storage', 40], ['RAM', 290], ['CPU', 540]].map(([label, x]) => `
          <rect x="${x}" y="70" width="140" height="80" rx="14" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6" stroke-width="1.5"/>
          <text x="${x + 70}" y="116" text-anchor="middle" fill="#FFFFFF" font-family="Space Grotesk, sans-serif" font-size="18" font-weight="600">${label}</text>
        `).join('')}
        <line x1="180" y1="110" x2="282" y2="110" stroke="#C084FC" stroke-width="2" marker-end="url(#arrow1)"/>
        <line x1="430" y1="110" x2="532" y2="110" stroke="#C084FC" stroke-width="2" marker-end="url(#arrow1)"/>
        <text x="231" y="95" text-anchor="middle" fill="#9CA3AF" font-size="11" font-family="JetBrains Mono, monospace">slow</text>
        <text x="481" y="95" text-anchor="middle" fill="#9CA3AF" font-size="11" font-family="JetBrains Mono, monospace">fast</text>
        <text x="110" y="180" text-anchor="middle" fill="#9CA3AF" font-size="12" font-family="JetBrains Mono, monospace">persistent</text>
        <text x="360" y="180" text-anchor="middle" fill="#9CA3AF" font-size="12" font-family="JetBrains Mono, monospace">temporary</text>
        <text x="610" y="180" text-anchor="middle" fill="#9CA3AF" font-size="12" font-family="JetBrains Mono, monospace">computes</text>
      </svg>`,
    'cpu-cores-diagram': () => `
      <svg viewBox="0 0 720 240" style="width:100%; max-width:680px; height:auto;">
        <text x="120" y="30" text-anchor="middle" fill="#E5E7EB" font-family="Space Grotesk, sans-serif" font-size="14">Single-core</text>
        <rect x="40" y="50" width="160" height="50" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="120" y="80" text-anchor="middle" fill="#fff" font-size="12" font-family="JetBrains Mono, monospace">Task A → B → C</text>
        <text x="120" y="125" text-anchor="middle" fill="#9CA3AF" font-size="11">One thing at a time</text>

        <text x="540" y="30" text-anchor="middle" fill="#E5E7EB" font-family="Space Grotesk, sans-serif" font-size="14">Multi-core</text>
        ${[0,1,2].map(i => `
          <rect x="${420 + i*85}" y="50" width="70" height="50" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
          <text x="${455 + i*85}" y="80" text-anchor="middle" fill="#fff" font-size="11" font-family="JetBrains Mono, monospace">${['A','B','C'][i]}</text>
        `).join('')}
        <text x="540" y="125" text-anchor="middle" fill="#9CA3AF" font-size="11">All at once, in parallel</text>
      </svg>`,
    'ram-storage-compare': () => `
      <svg viewBox="0 0 720 200" style="width:100%; max-width:680px; height:auto;">
        <rect x="60" y="40" width="280" height="120" rx="14" fill="rgba(139,92,246,0.1)" stroke="#8B5CF6"/>
        <text x="200" y="75" text-anchor="middle" fill="#fff" font-size="16" font-family="Space Grotesk, sans-serif" font-weight="600">RAM</text>
        <text x="200" y="100" text-anchor="middle" fill="#9CA3AF" font-size="12">Fast · Volatile</text>
        <text x="200" y="120" text-anchor="middle" fill="#9CA3AF" font-size="12">Cleared on power loss</text>
        <rect x="380" y="40" width="280" height="120" rx="14" fill="rgba(192,132,252,0.08)" stroke="#C084FC"/>
        <text x="520" y="75" text-anchor="middle" fill="#fff" font-size="16" font-family="Space Grotesk, sans-serif" font-weight="600">Storage</text>
        <text x="520" y="100" text-anchor="middle" fill="#9CA3AF" font-size="12">Slower · Persistent</text>
        <text x="520" y="120" text-anchor="middle" fill="#9CA3AF" font-size="12">Survives power loss</text>
      </svg>`,
    'storage-types-diagram': () => `
      <svg viewBox="0 0 720 200" style="width:100%; max-width:680px; height:auto;">
        <circle cx="180" cy="100" r="55" fill="none" stroke="#8B5CF6" stroke-width="2"/>
        <circle cx="180" cy="100" r="6" fill="#C084FC"/>
        <text x="180" y="170" text-anchor="middle" fill="#E5E7EB" font-size="13" font-family="Space Grotesk, sans-serif">HDD (spinning platter)</text>
        <rect x="460" y="70" width="180" height="60" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="550" y="170" text-anchor="middle" fill="#E5E7EB" font-size="13" font-family="Space Grotesk, sans-serif">SSD (flash chips)</text>
      </svg>`,
    'os-layers-diagram': () => `
      <svg viewBox="0 0 720 220" style="width:100%; max-width:680px; height:auto;">
        ${[['Apps (Browser, Editor...)', 20, '#C084FC'], ['Operating System', 90, '#A855F7'], ['Hardware (CPU, RAM, Disk)', 160, '#6D28D9']].map(([label, y, color]) => `
          <rect x="80" y="${y}" width="560" height="50" rx="10" fill="rgba(139,92,246,0.1)" stroke="${color}"/>
          <text x="360" y="${y+30}" text-anchor="middle" fill="#fff" font-size="14" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
      </svg>`,
    'command-anatomy-diagram': () => `
      <svg viewBox="0 0 720 140" style="width:100%; max-width:680px; height:auto;">
        <text x="60" y="60" fill="#C084FC" font-family="JetBrains Mono, monospace" font-size="22">git</text>
        <text x="120" y="60" fill="#FBBF24" font-family="JetBrains Mono, monospace" font-size="22">commit</text>
        <text x="240" y="60" fill="#93C5FD" font-family="JetBrains Mono, monospace" font-size="22">-m</text>
        <text x="280" y="60" fill="#6EE7B7" font-family="JetBrains Mono, monospace" font-size="22">"message"</text>
        <text x="75" y="90" fill="#9CA3AF" font-size="11">program</text>
        <text x="150" y="90" fill="#9CA3AF" font-size="11">subcommand</text>
        <text x="250" y="90" fill="#9CA3AF" font-size="11">flag</text>
        <text x="350" y="90" fill="#9CA3AF" font-size="11">argument</text>
      </svg>`,
    'internet-packet-journey': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        ${['You','Router','ISP','Server'].map((label,i) => `
          <circle cx="${90+i*180}" cy="70" r="36" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
          <text x="${90+i*180}" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
        ${[0,1,2].map(i => `<line x1="${126+i*180}" y1="70" x2="${254+i*180}" y2="70" stroke="#C084FC" stroke-width="2"/>`).join('')}
      </svg>`,
    'http-request-response': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="40" y="60" width="150" height="60" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="115" y="95" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Client</text>
        <rect x="530" y="60" width="150" height="60" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="605" y="95" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Server</text>
        <line x1="190" y1="80" x2="528" y2="80" stroke="#C084FC" stroke-width="2"/>
        <text x="360" y="70" text-anchor="middle" fill="#6EE7B7" font-size="11" font-family="JetBrains Mono, monospace">GET /users →</text>
        <line x1="528" y1="105" x2="190" y2="105" stroke="#FBBF24" stroke-width="2"/>
        <text x="360" y="130" text-anchor="middle" fill="#FBBF24" font-size="11" font-family="JetBrains Mono, monospace">← 200 OK + data</text>
      </svg>`,
    'https-encryption-layer': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        <rect x="40" y="60" width="120" height="50" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="100" y="90" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Browser</text>
        <rect x="290" y="50" width="140" height="70" rx="10" fill="rgba(52,211,153,0.1)" stroke="#34D399"/>
        <text x="360" y="80" text-anchor="middle" fill="#34D399" font-size="12" font-family="Space Grotesk, sans-serif">🔒 TLS</text>
        <text x="360" y="100" text-anchor="middle" fill="#9CA3AF" font-size="10">Encrypted tunnel</text>
        <rect x="560" y="60" width="120" height="50" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="620" y="90" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Server</text>
        <line x1="160" y1="85" x2="288" y2="85" stroke="#34D399" stroke-width="2"/>
        <line x1="432" y1="85" x2="558" y2="85" stroke="#34D399" stroke-width="2"/>
      </svg>`,
    'dns-lookup-chain': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        ${['Browser cache','OS cache','ISP resolver','Authoritative'].map((label,i) => `
          <rect x="${40+i*170}" y="70" width="140" height="60" rx="10" fill="rgba(139,92,246,0.13)" stroke="#8B5CF6"/>
          <text x="${110+i*170}" y="105" text-anchor="middle" fill="#fff" font-size="11" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
        ${[0,1,2].map(i => `<line x1="${180+i*170}" y1="100" x2="${210+i*170}" y2="100" stroke="#C084FC" stroke-width="2"/>`).join('')}
      </svg>`,
    'dom-tree': () => `
      <svg viewBox="0 0 720 200" style="width:100%; max-width:680px; height:auto;">
        <rect x="290" y="20" width="140" height="40" rx="8" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="360" y="45" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">document</text>
        <line x1="360" y1="60" x2="360" y2="90" stroke="#C084FC" stroke-width="1.5"/>
        <rect x="290" y="90" width="140" height="40" rx="8" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="360" y="115" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">&lt;body&gt;</text>
        <line x1="360" y1="130" x2="230" y2="160" stroke="#C084FC" stroke-width="1.5"/>
        <line x1="360" y1="130" x2="490" y2="160" stroke="#C084FC" stroke-width="1.5"/>
        <rect x="160" y="160" width="140" height="30" rx="6" fill="rgba(52,211,153,0.1)" stroke="#34D399"/>
        <text x="230" y="180" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">&lt;div id="app"&gt;</text>
        <rect x="420" y="160" width="140" height="30" rx="6" fill="rgba(251,191,36,0.1)" stroke="#FBBF24"/>
        <text x="490" y="180" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">&lt;script&gt;</text>
      </svg>`,
    'event-bubble': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="110" y="40" width="500" height="120" rx="14" fill="rgba(139,92,246,0.06)" stroke="#8B5CF6"/>
        <text x="360" y="65" text-anchor="middle" fill="#9CA3AF" font-size="11" font-family="JetBrains Mono, monospace">Parent: Div Container</text>
        <rect x="230" y="80" width="260" height="60" rx="10" fill="rgba(52,211,153,0.1)" stroke="#34D399"/>
        <text x="360" y="105" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Child: Button (Click Target)</text>
        <text x="360" y="125" text-anchor="middle" fill="#FBBF24" font-size="11" font-family="Space Grotesk, sans-serif">Event bubbles up: Target → Parent</text>
      </svg>`,
    'js-function-types': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        ${[['Declaration', 'function greet()', 40], ['Expression', 'const greet = function()', 270], ['Arrow', 'const greet = () =>', 500]].map(([label, code, x]) => `
          <rect x="${x}" y="30" width="180" height="100" rx="10" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6"/>
          <text x="${x + 90}" y="65" text-anchor="middle" fill="#fff" font-size="14" font-family="Space Grotesk, sans-serif" font-weight="600">${label}</text>
          <text x="${x + 90}" y="100" text-anchor="middle" fill="#C084FC" font-size="10" font-family="JetBrains Mono, monospace">${code}</text>
        `).join('')}
      </svg>`,
    'closure-scope': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="80" y="30" width="560" height="120" rx="14" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6"/>
        <text x="120" y="55" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Outer Scope (remembers count = 0)</text>
        <rect x="220" y="70" width="280" height="60" rx="10" fill="rgba(52,211,153,0.15)" stroke="#34D399"/>
        <text x="360" y="105" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Inner Function (Closure access)</text>
      </svg>`,
    'async-event-loop': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        ${[['1. Call Stack', 'sync tasks run here', 40], ['2. Web APIs', 'timers / fetch requests', 270], ['3. Queue (Event Loop)', 'callbacks queue up', 500]].map(([label, desc, x]) => `
          <rect x="${x}" y="30" width="180" height="110" rx="10" fill="rgba(139,92,246,0.1)" stroke="#8B5CF6"/>
          <text x="${x + 90}" y="65" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif" font-weight="600">${label}</text>
          <text x="${x + 90}" y="95" text-anchor="middle" fill="#9CA3AF" font-size="10" font-family="Space Grotesk, sans-serif">${desc}</text>
        `).join('')}
      </svg>`,
    'module-imports': () => `
      <svg viewBox="0 0 720 150" style="width:100%; max-width:680px; height:auto;">
        <rect x="40" y="45" width="200" height="60" rx="10" fill="rgba(139,92,246,0.13)" stroke="#8B5CF6"/>
        <text x="140" y="80" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">maths.js (export const add)</text>
        <line x1="240" y1="75" x2="470" y2="75" stroke="#34D399" stroke-width="2" stroke-dasharray="4"/>
        <text x="355" y="65" text-anchor="middle" fill="#34D399" font-size="11" font-family="JetBrains Mono, monospace">import { add }</text>
        <rect x="480" y="45" width="200" height="60" rx="10" fill="rgba(139,92,246,0.13)" stroke="#8B5CF6"/>
        <text x="580" y="80" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">app.js (uses add)</text>
      </svg>`,
    'git-commits': () => `
      <svg viewBox="0 0 720 150" style="width:100%; max-width:680px; height:auto;">
        ${['C1 (Initial)','C2 (feat: nav)','C3 (fix: bug)'].map((label,i) => `
          <circle cx="${140+i*220}" cy="70" r="32" fill="rgba(139,92,246,0.18)" stroke="#8B5CF6" stroke-width="2"/>
          <text x="${140+i*220}" y="74" text-anchor="middle" fill="#fff" font-size="10" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
        ${[0,1].map(i => `<line x1="${172+i*220}" y1="70" x2="${276+i*220}" y2="70" stroke="#C084FC" stroke-width="2"/>`).join('')}
      </svg>`,
    'git-branches': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <text x="50" y="55" fill="#9CA3AF" font-size="12" font-family="Space Grotesk, sans-serif">main</text>
        <line x1="120" y1="50" x2="600" y2="50" stroke="#8B5CF6" stroke-width="2"/>
        <circle cx="160" cy="50" r="8" fill="#C084FC"/>
        <circle cx="440" cy="50" r="8" fill="#C084FC"/>
        <text x="50" y="135" fill="#34D399" font-size="12" font-family="Space Grotesk, sans-serif">feature</text>
        <path d="M 160 50 Q 240 130 320 130 L 600 130" fill="none" stroke="#34D399" stroke-width="2"/>
        <circle cx="320" cy="130" r="8" fill="#34D399"/>
        <circle cx="500" cy="130" r="8" fill="#34D399"/>
      </svg>`,
    'git-merge': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <line x1="100" y1="50" x2="620" y2="50" stroke="#8B5CF6" stroke-width="2"/>
        <text x="50" y="55" fill="#9CA3AF" font-size="12" font-family="Space Grotesk, sans-serif">main</text>
        <path d="M 200 50 Q 280 120 360 120 L 500 120 Q 560 50 620 50" fill="none" stroke="#34D399" stroke-width="2"/>
        <text x="50" y="125" fill="#34D399" font-size="12" font-family="Space Grotesk, sans-serif">feature</text>
        <circle cx="200" cy="50" r="8" fill="#C084FC"/>
        <circle cx="360" cy="120" r="8" fill="#34D399"/>
        <circle cx="620" cy="50" r="8" fill="#FBBF24"/>
        <text x="620" y="30" text-anchor="middle" fill="#FBBF24" font-size="10" font-family="Space Grotesk, sans-serif">Merge Commit</text>
      </svg>`,
    'ds-array': () => `
      <svg viewBox="0 0 720 140" style="width:100%; max-width:680px; height:auto;">
        ${[0,1,2,3,4].map(i => `
          <rect x="${110+i*100}" y="40" width="80" height="50" rx="8" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6" stroke-width="1.5"/>
          <text x="${150+i*100}" y="70" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">val: ${[10, 20, 30, 40, 50][i]}</text>
          <text x="${150+i*100}" y="115" text-anchor="middle" fill="#9CA3AF" font-size="11" font-family="JetBrains Mono, monospace">idx: ${i}</text>
        `).join('')}
      </svg>`,
    'ds-linkedlist': () => `
      <svg viewBox="0 0 720 140" style="width:100%; max-width:680px; height:auto;">
        ${[0,1,2].map(i => `
          <rect x="${60+i*220}" y="40" width="120" height="50" rx="8" fill="rgba(139,92,246,0.13)" stroke="#8B5CF6"/>
          <text x="${120+i*220}" y="70" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">val: ${[1, 2, 3][i]}</text>
          ${i < 2 ? `<line x1="${180+i*220}" y1="65" x2="${276+i*220}" y2="65" stroke="#34D399" stroke-width="2" stroke-dasharray="3"/>` : ''}
        `).join('')}
        <text x="640" y="70" fill="#9CA3AF" font-size="12" font-family="Space Grotesk, sans-serif">null</text>
      </svg>`,
    'stack-queue': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="60" y="40" width="260" height="110" rx="10" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6"/>
        <text x="190" y="75" text-anchor="middle" fill="#fff" font-size="14" font-weight="600" font-family="Space Grotesk, sans-serif">Stack (LIFO)</text>
        <text x="190" y="105" text-anchor="middle" fill="#9CA3AF" font-size="11">Push / Pop at the top</text>
        <rect x="400" y="40" width="260" height="110" rx="10" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6"/>
        <text x="530" y="75" text-anchor="middle" fill="#fff" font-size="14" font-weight="600" font-family="Space Grotesk, sans-serif">Queue (FIFO)</text>
        <text x="530" y="105" text-anchor="middle" fill="#9CA3AF" font-size="11">Enqueue at back, Dequeue at front</text>
      </svg>`,
    'ds-tree': () => `
      <svg viewBox="0 0 720 200" style="width:100%; max-width:680px; height:auto;">
        <circle cx="360" cy="40" r="22" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6" stroke-width="1.5"/>
        <text x="360" y="44" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Root: 10</text>
        <line x1="345" y1="58" x2="245" y2="102" stroke="#C084FC" stroke-width="1.5"/>
        <line x1="375" y1="58" x2="475" y2="102" stroke="#C084FC" stroke-width="1.5"/>
        <circle cx="230" cy="120" r="22" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="1.5"/>
        <text x="230" y="124" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Left: 5</text>
        <circle cx="490" cy="120" r="22" fill="rgba(251,191,36,0.12)" stroke="#FBBF24" stroke-width="1.5"/>
        <text x="490" y="124" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Right: 15</text>
      </svg>`,
    'ds-graph': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <circle cx="220" cy="90" r="26" fill="rgba(139,92,246,0.18)" stroke="#8B5CF6"/>
        <text x="220" y="94" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Node A</text>
        <line x1="246" y1="90" x2="454" y2="90" stroke="#C084FC" stroke-width="2"/>
        <circle cx="480" cy="90" r="26" fill="rgba(139,92,246,0.18)" stroke="#8B5CF6"/>
        <text x="480" y="94" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Node B</text>
        <path d="M 220 64 Q 350 15 480 64" fill="none" stroke="#C084FC" stroke-width="1.5"/>
      </svg>`,
    'algo-recursion': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="260" y="20" width="200" height="40" rx="8" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="360" y="45" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">factorial(3)</text>
        <line x1="360" y1="60" x2="360" y2="80" stroke="#C084FC" stroke-width="1.5"/>
        <rect x="260" y="80" width="200" height="40" rx="8" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="360" y="105" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">3 * factorial(2)</text>
        <line x1="360" y1="120" x2="360" y2="140" stroke="#C084FC" stroke-width="1.5"/>
        <rect x="260" y="140" width="200" height="30" rx="6" fill="rgba(52,211,153,0.15)" stroke="#34D399"/>
        <text x="360" y="160" text-anchor="middle" fill="#fff" font-size="11" font-family="Space Grotesk, sans-serif">2 * factorial(1) = 2 (Base case)</text>
      </svg>`,
    'algo-search': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        ${['10','20','30','40','50'].map((val,i) => `
          <rect x="${110+i*100}" y="40" width="80" height="50" rx="8" fill="${i === 2 ? 'rgba(52,211,153,0.15)' : 'rgba(139,92,246,0.1)'}" stroke="${i === 2 ? '#34D399' : '#8B5CF6'}"/>
          <text x="${150+i*100}" y="70" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">${val}</text>
        `).join('')}
        <text x="350" y="120" text-anchor="middle" fill="#34D399" font-size="11" font-family="Space Grotesk, sans-serif">Midpoint: 30 (Check target)</text>
      </svg>`,
    'bfs-dfs': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        <rect x="60" y="30" width="280" height="100" rx="10" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6"/>
        <text x="200" y="65" text-anchor="middle" fill="#fff" font-size="14" font-weight="600" font-family="Space Grotesk, sans-serif">BFS (Breadth-First)</text>
        <text x="200" y="95" text-anchor="middle" fill="#9CA3AF" font-size="11">Level-order: A → B → C (Queue)</text>
        <rect x="380" y="30" width="280" height="100" rx="10" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6"/>
        <text x="520" y="65" text-anchor="middle" fill="#fff" font-size="14" font-weight="600" font-family="Space Grotesk, sans-serif">DFS (Depth-First)</text>
        <text x="520" y="95" text-anchor="middle" fill="#9CA3AF" font-size="11">Deep path: A → B → D (Stack)</text>
      </svg>`,
    'db-relations': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        <rect x="80" y="40" width="180" height="80" rx="10" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6"/>
        <text x="170" y="70" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Users (Primary Key: id)</text>
        <line x1="260" y1="80" x2="454" y2="80" stroke="#C084FC" stroke-width="2" stroke-dasharray="4"/>
        <rect x="460" y="40" width="180" height="80" rx="10" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6"/>
        <text x="550" y="70" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Posts (Foreign Key: user_id)</text>
      </svg>`,
    'client-server-api': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        <rect x="60" y="40" width="150" height="70" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="135" y="80" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Client (Browser)</text>
        <line x1="210" y1="75" x2="508" y2="75" stroke="#C084FC" stroke-width="2"/>
        <text x="360" y="65" text-anchor="middle" fill="#34D399" font-size="11" font-family="JetBrains Mono, monospace">GET /users HTTP/1.1</text>
        <rect x="510" y="40" width="150" height="70" rx="10" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="585" y="80" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Server (Node/API)</text>
      </svg>`,
    'jwt-auth': () => `
      <svg viewBox="0 0 720 140" style="width:100%; max-width:680px; height:auto;">
        ${[['Header', 'alg: HS256', 40], ['Payload', 'userId: 42, role: admin', 270], ['Signature', 'verified hash', 500]].map(([label, desc, x]) => `
          <rect x="${x}" y="30" width="180" height="80" rx="10" fill="rgba(139,92,246,0.13)" stroke="#8B5CF6"/>
          <text x="${x + 90}" y="55" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif" font-weight="600">${label}</text>
          <text x="${x + 90}" y="85" text-anchor="middle" fill="#9CA3AF" font-size="10" font-family="JetBrains Mono, monospace">${desc}</text>
        `).join('')}
      </svg>`,
    'react-components': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="280" y="20" width="160" height="40" rx="8" fill="rgba(139,92,246,0.18)" stroke="#8B5CF6"/>
        <text x="360" y="45" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">&lt;App /&gt;</text>
        <line x1="360" y1="60" x2="220" y2="100" stroke="#C084FC" stroke-width="1.5"/>
        <line x1="360" y1="60" x2="500" y2="100" stroke="#C084FC" stroke-width="1.5"/>
        <rect x="140" y="100" width="160" height="40" rx="8" fill="rgba(139,92,246,0.1)" stroke="#8B5CF6"/>
        <text x="220" y="125" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">&lt;Sidebar /&gt;</text>
        <rect x="420" y="100" width="160" height="40" rx="8" fill="rgba(139,92,246,0.1)" stroke="#8B5CF6"/>
        <text x="500" y="125" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">&lt;Dashboard /&gt;</text>
      </svg>`,
    'react-state-flow': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="80" y="50" width="180" height="80" rx="12" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6"/>
        <text x="170" y="85" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">1. State: count = 0</text>
        <line x1="260" y1="90" x2="454" y2="90" stroke="#C084FC" stroke-width="2"/>
        <text x="360" y="80" text-anchor="middle" fill="#34D399" font-size="11" font-family="JetBrains Mono, monospace">setCount(count + 1)</text>
        <rect x="460" y="50" width="180" height="80" rx="12" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6"/>
        <text x="550" y="85" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">2. UI re-renders with 1</text>
      </svg>`,
    'solid-principles': () => `
      <svg viewBox="0 0 720 160" style="width:100%; max-width:680px; height:auto;">
        ${[['S', 'Single Responsibility', 40], ['O', 'Open / Closed', 170], ['L', 'Liskov Substitution', 300], ['I', 'Interface Segregation', 430], ['D', 'Dependency Inversion', 560]].map(([letter, label, x]) => `
          <rect x="${x}" y="30" width="120" height="100" rx="10" fill="rgba(139,92,246,0.13)" stroke="#8B5CF6"/>
          <text x="${x + 60}" y="65" text-anchor="middle" fill="#34D399" font-size="28" font-family="Space Grotesk, sans-serif" font-weight="700">${letter}</text>
          <text x="${x + 60}" y="105" text-anchor="middle" fill="#fff" font-size="9" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
      </svg>`,
    'design-patterns': () => `
      <svg viewBox="0 0 720 150" style="width:100%; max-width:680px; height:auto;">
        ${[['Singleton', 'Single shared instance', 40], ['Factory', 'Encapsulated creation', 270], ['Observer', 'Publish / Subscribe', 500]].map(([label, desc, x]) => `
          <rect x="${x}" y="35" width="180" height="80" rx="10" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6"/>
          <text x="${x + 90}" y="65" text-anchor="middle" fill="#fff" font-size="14" font-weight="600" font-family="Space Grotesk, sans-serif">${label}</text>
          <text x="${x + 90}" y="95" text-anchor="middle" fill="#9CA3AF" font-size="10" font-family="Space Grotesk, sans-serif">${desc}</text>
        `).join('')}
      </svg>`,
    'mvc-architecture': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        <rect x="270" y="20" width="180" height="40" rx="8" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6"/>
        <text x="360" y="45" text-anchor="middle" fill="#fff" font-size="13" font-family="Space Grotesk, sans-serif">Controller (Inputs / Routers)</text>
        <line x1="360" y1="60" x2="220" y2="100" stroke="#C084FC" stroke-width="1.5"/>
        <line x1="360" y1="60" x2="500" y2="100" stroke="#C084FC" stroke-width="1.5"/>
        <rect x="130" y="100" width="180" height="45" rx="8" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6"/>
        <text x="220" y="127" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">Model (Data records)</text>
        <rect x="410" y="100" width="180" height="45" rx="8" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6"/>
        <text x="500" y="127" text-anchor="middle" fill="#fff" font-size="12" font-family="Space Grotesk, sans-serif">View (User Interface)</text>
      </svg>`,
    'dns-lookup-chain': () => `
      <svg viewBox="0 0 720 180" style="width:100%; max-width:680px; height:auto;">
        ${['Browser cache','OS cache','ISP resolver','Authoritative'].map((label,i) => `
          <rect x="${40+i*170}" y="70" width="140" height="60" rx="10" fill="rgba(139,92,246,0.13)" stroke="#8B5CF6"/>
          <text x="${110+i*170}" y="105" text-anchor="middle" fill="#fff" font-size="11" font-family="Space Grotesk, sans-serif">${label}</text>
        `).join('')}
        ${[0,1,2].map(i => `<line x1="${180+i*170}" y1="100" x2="${210+i*170}" y2="100" stroke="#C084FC" stroke-width="2"/>`).join('')}
      </svg>`,
  };

  /** @param {{type: string, caption: string}} visual */
  static render(visual) {
    const renderer = DiagramRenderer.DIAGRAMS[visual.type];
    return renderer ? renderer() : '<p class="text-muted">Diagram unavailable.</p>';
  }
}
