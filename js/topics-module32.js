/* Module 32 — CSS Foundations */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }
window.CSFA_RAW_TOPICS.push({
  id: 'm32-selectors', module: 32, title: 'CSS Selectors & the Box Model',
  tagline: 'Targeting elements precisely and understanding how spacing, borders and size really work.',
  readMinutes: 6,
  intro: {
    whatItIs: "CSS selectors determine which elements a rule applies to: element (p), class (.card), ID (#header), attribute ([type='text']), pseudo-class (:hover), pseudo-element (::before), combinators (descendant ' ', child '>', adjacent '+', sibling '~'). The Box Model describes every element as nested boxes: content → padding → border → margin.",
    whyItMatters: "Selector specificity determines which rule wins when multiple rules target the same element. Understanding the box model prevents the classic 'why is my element the wrong size?' bug — padding and border add to width by default unless box-sizing: border-box is set.",
    whereUsed: "Every CSS stylesheet. Specificity battles are a constant in large codebases — CSS Modules and CSS-in-JS were invented partly to solve specificity issues.",
    commonMistakes: "Not setting `box-sizing: border-box` globally. By default, padding and border are added OUTSIDE the specified width, causing elements to be larger than expected. Always add `*, *::before, *::after { box-sizing: border-box; }` as a CSS reset."
  },
  visual: { caption: "Box Model: content(width×height) + padding + border + margin = total element space", type: "box-model" },
  examples: [
    { difficulty: "very-easy", title: "Selector types", explanation: "Different selectors have different specificity weights.", code: "const selectors = [\n  { selector: 'p',           specificity: '0,0,1', type: 'element' },\n  { selector: '.card',       specificity: '0,1,0', type: 'class' },\n  { selector: '#header',     specificity: '1,0,0', type: 'ID' },\n  { selector: 'div.card p',  specificity: '0,1,2', type: 'combined' },\n  { selector: '[type=text]', specificity: '0,1,0', type: 'attribute' },\n];\nselectors.forEach(s => console.log(`${s.selector.padEnd(16)}: ${s.specificity} (${s.type})`));", language: "javascript", output: "p               : 0,0,1 (element)\n.card           : 0,1,0 (class)\n#header         : 1,0,0 (ID)\ndiv.card p      : 0,1,2 (combined)\n[type=text]     : 0,1,0 (attribute)" },
    { difficulty: "easy", title: "Box model calculation", explanation: "Default box model: total width = content + padding-left + padding-right + border-left + border-right.", code: "function totalWidth(contentWidth, padding, border) {\n  return contentWidth + (padding * 2) + (border * 2);\n}\nfunction borderBoxWidth(specifiedWidth) {\n  return specifiedWidth; // padding+border included inside\n}\nconsole.log('Default box model: width=200, padding=20, border=2 →', totalWidth(200,20,2));\nconsole.log('border-box: same spec →', borderBoxWidth(200), '(padding+border inside)');", language: "javascript", output: "Default box model: width=200, padding=20, border=2 → 244\nborder-box: same spec → 200 (padding+border inside)" },
    { difficulty: "medium", title: "Specificity calculator", explanation: "Specificity is calculated as (ID, class, element). Higher wins regardless of order.", code: "function specificity(selector) {\n  const ids = (selector.match(/#/g) || []).length;\n  const classes = (selector.match(/\\./g) || []).length;\n  const elements = (selector.match(/^[a-z]|\\s[a-z]/g) || []).length;\n  return [ids, classes, elements];\n}\nconsole.log('#nav .link a:', specificity('#nav .link a'));\nconsole.log('.card .title:', specificity('.card .title'));\nconsole.log('p:',           specificity('p'));", language: "javascript", output: "#nav .link a: [ 1, 1, 1 ]\n.card .title: [ 0, 2, 0 ]\np: [ 0, 0, 1 ]" },
    { difficulty: "medium-plus", title: "Pseudo-classes", explanation: "Pseudo-classes style elements in specific states: :hover, :focus, :first-child, :nth-child.", code: "const pseudoClasses = {\n  ':hover':          'mouse over element',\n  ':focus':          'element has keyboard focus',\n  ':first-child':    'first child of parent',\n  ':nth-child(2n)':  'every even child',\n  ':not(.disabled)': 'element NOT matching .disabled',\n  ':checked':        'checked checkbox/radio',\n};\nObject.entries(pseudoClasses).forEach(([pc, desc]) =>\n  console.log(`${pc.padEnd(20)}: ${desc}`));", language: "javascript", output: ":hover              : mouse over element\n:focus              : element has keyboard focus\n:first-child        : first child of parent\n:nth-child(2n)      : every even child\n:not(.disabled)     : element NOT matching .disabled\n:checked            : checked checkbox/radio" },
    { difficulty: "hard", title: "CSS combinators", explanation: "Combinators express relationships between elements for precise targeting.", code: "const combinators = [\n  { syntax: 'div p',      name: 'Descendant',  desc: 'any p inside div (any depth)' },\n  { syntax: 'div > p',    name: 'Child',        desc: 'direct child p of div' },\n  { syntax: 'h2 + p',     name: 'Adjacent',     desc: 'p immediately after h2' },\n  { syntax: 'h2 ~ p',     name: 'Sibling',      desc: 'all p siblings after h2' },\n];\ncombinatorsToShow = combinators;\ncombinatorsToShow.forEach(c => console.log(`${c.syntax.padEnd(12)}: ${c.name} — ${c.desc}`));", language: "javascript", output: "div p       : Descendant — any p inside div (any depth)\ndiv > p     : Child — direct child p of div\nh2 + p      : Adjacent — p immediately after h2\nh2 ~ p      : Sibling — all p siblings after h2" },
    { difficulty: "real-world", title: "CSS reset with border-box", explanation: "Modern CSS resets that every project should start with.", code: "const cssReset = `\n/* Box sizing reset — prevents sizing surprises */\n*, *::before, *::after { box-sizing: border-box; }\n\n/* Remove default margins */\nbody, h1, h2, h3, p, ul, ol { margin: 0; padding: 0; }\n\n/* Make images responsive by default */\nimg { max-width: 100%; height: auto; }\n\n/* Better font rendering */\nbody { -webkit-font-smoothing: antialiased; }\n`;\nconsole.log('Essential CSS reset:');\ncssReset.split('\\n').filter(l=>l.trim()).forEach(l=>console.log(l));", language: "javascript", output: "Essential CSS reset:\n/* Box sizing reset — prevents sizing surprises */\n*, *::before, *::after { box-sizing: border-box; }\n/* Remove default margins */\nbody, h1, h2, h3, p, ul, ol { margin: 0; padding: 0; }\n/* Make images responsive by default */\nimg { max-width: 100%; height: auto; }\n/* Better font rendering */\nbody { -webkit-font-smoothing: antialiased; }" }
  ],
  exercises: [
    { level: 1, title: "Box model total", problem: "Write `totalSize(content, padding, border)` that returns the total rendered width when box-sizing is content-box.", hints: ["content + padding*2 + border*2"], solution: "const totalSize=(c,p,b)=>c+p*2+b*2;\nconsole.log(totalSize(300,20,1)); // 342" },
    { level: 2, title: "Specificity winner", problem: "Given two selectors with specificities [0,2,1] and [1,0,0], write `specifWins(a,b)` returning 'a' or 'b'.", hints: ["Compare element by element: IDs first, then classes, then elements."], solution: "function specifWins(a,b){for(let i=0;i<3;i++){if(a[i]>b[i])return 'a';if(b[i]>a[i])return 'b';}return 'tie';}\nconsole.log(specifWins([0,2,1],[1,0,0])); // 'b'" },
    { level: 3, title: "nth-child filter", problem: "Write `nthChild(items, n)` returning items at 1-indexed positions that are multiples of n (like :nth-child(n)).", hints: ["Filter where (index+1) % n === 0."], solution: "const nthChild=(items,n)=>items.filter((_,i)=>(i+1)%n===0);\nconsole.log(nthChild(['a','b','c','d','e','f'],2)); // b,d,f" }
  ],
  interview: [
    { q: "What is CSS specificity?", a: "Specificity determines which CSS rule wins when multiple rules target the same element. Calculated as (ID count, class/attribute/pseudo-class count, element/pseudo-element count). Higher specificity wins regardless of source order. !important overrides all specificity." },
    { q: "What does box-sizing: border-box do?", a: "It changes the box model so that specified width and height include padding and border — not just content. With border-box, a div with width:200px, padding:20px stays 200px wide total instead of growing to 240px. Most modern CSS resets set this globally." },
    { q: "What is the difference between :nth-child and :nth-of-type?", a: ":nth-child(n) counts among all siblings regardless of element type. :nth-of-type(n) counts only siblings of the same element type. So p:nth-child(2) means the 2nd child that is a <p>; p:nth-of-type(2) means the 2nd <p> sibling." }
  ],
  realWorld: [
    { company: "Tailwind CSS", text: "Tailwind's preflight (CSS reset) applies border-box globally and resets default browser styles — exactly the pattern in the real-world example. Understanding why these resets exist helps you debug Tailwind-based UIs." },
    { company: "CSS Modules (React/Next.js)", text: "CSS Modules auto-scope class names to components, eliminating specificity battles in large apps. Understanding why specificity is a problem explains the entire motivation behind CSS Modules and CSS-in-JS." }
  ],
  quiz: [
    { q: "Which selector has the HIGHEST specificity?", options: ["p", ".card", "#main", "div.card p"], answer: 2 },
    { q: "box-sizing: border-box means:", options: ["Border added outside width", "Padding and border included in specified width", "Content-only width", "Margin included in width"], answer: 1 },
    { q: "Which combinator selects direct children only?", options: ["' ' (space)", ">", "+", "~"], answer: 1 },
    { q: "What does !important do?", options: ["Makes CSS load faster", "Overrides all other specificity rules", "Makes rule apply to all elements", "Sets inline style"], answer: 1 },
    { q: "Total rendered width (content-box): width:200px, padding:10px each side, border:1px each side =", options: ["200px", "220px", "222px", "211px"], answer: 2 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm32-box-model',
  module: 32,
  title: 'Box Model',
  tagline: 'Master Box Model to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Box Model.',
    whyItMatters: 'Understanding Box Model is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Box Model before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Box Model.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Box Model', explanation: 'Let\'s look at a simple example demonstrating Box Model in action.', code: 'console.log("Initializing Box Model...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Box Model...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Box Model', explanation: 'A practical example showing a real-world coding scenario using Box Model.', code: 'function demonstrate() {\n  console.log("Running Box Model flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Box Model flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Box Model setup', problem: 'Write a function testSetup() that returns the string "Box Model OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Box Model OK"; }' }
  ],
  interview: [
    { q: 'Why is Box Model important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Box Model in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Box Model?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm32-positioning',
  module: 32,
  title: 'Positioning',
  tagline: 'Master Positioning to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Positioning.',
    whyItMatters: 'Understanding Positioning is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Positioning before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Positioning.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Positioning', explanation: 'Let\'s look at a simple example demonstrating Positioning in action.', code: 'console.log("Initializing Positioning...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Positioning...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Positioning', explanation: 'A practical example showing a real-world coding scenario using Positioning.', code: 'function demonstrate() {\n  console.log("Running Positioning flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Positioning flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Positioning setup', problem: 'Write a function testSetup() that returns the string "Positioning OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Positioning OK"; }' }
  ],
  interview: [
    { q: 'Why is Positioning important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Positioning in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Positioning?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm32-flexbox',
  module: 32,
  title: 'Flexbox',
  tagline: 'Master Flexbox to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Flexbox.',
    whyItMatters: 'Understanding Flexbox is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Flexbox before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Flexbox.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Flexbox', explanation: 'Let\'s look at a simple example demonstrating Flexbox in action.', code: 'console.log("Initializing Flexbox...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Flexbox...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Flexbox', explanation: 'A practical example showing a real-world coding scenario using Flexbox.', code: 'function demonstrate() {\n  console.log("Running Flexbox flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Flexbox flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Flexbox setup', problem: 'Write a function testSetup() that returns the string "Flexbox OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Flexbox OK"; }' }
  ],
  interview: [
    { q: 'Why is Flexbox important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Flexbox in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Flexbox?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm32-grid',
  module: 32,
  title: 'Grid',
  tagline: 'Master Grid to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Grid.',
    whyItMatters: 'Understanding Grid is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Grid before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Grid.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Grid', explanation: 'Let\'s look at a simple example demonstrating Grid in action.', code: 'console.log("Initializing Grid...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Grid...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Grid', explanation: 'A practical example showing a real-world coding scenario using Grid.', code: 'function demonstrate() {\n  console.log("Running Grid flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Grid flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Grid setup', problem: 'Write a function testSetup() that returns the string "Grid OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Grid OK"; }' }
  ],
  interview: [
    { q: 'Why is Grid important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Grid in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Grid?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
