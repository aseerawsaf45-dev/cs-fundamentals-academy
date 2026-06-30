/* ==========================================================================
   TOPIC CONTENT DATA — Module 16: Digital Logic
   Topics: Logic Gates, Boolean Algebra, Truth Tables, Flip-Flops
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm16-logic-gates',
  module: 16,
  title: 'Logic Gates & Boolean Algebra',
  tagline: 'AND, OR, NOT, XOR — the physical gates that implement all digital computation.',
  readMinutes: 7,
  intro: {
    whatItIs: "Logic gates are the fundamental building blocks of all digital circuits. They are physical devices (implemented with transistors) that take binary inputs and produce a binary output based on a Boolean function. The main gates are: AND, OR, NOT, NAND, NOR, XOR, XNOR. All CPU operations — addition, comparison, branching — are built from combinations of these gates.",
    whyItMatters: "Logic gates are why bitwise operators in programming exist. Understanding gates explains why `&&` in JavaScript is different from `&`, why short-circuit evaluation works, and how hardware implements every conditional your code ever runs.",
    whereUsed: "Hardware design, FPGA programming, CPU architecture, digital signal processing, cryptography, and anywhere Boolean algebra is used in software (permission systems, feature flags, search filters).",
    commonMistakes: "Confusing logical operators (&&, ||) with bitwise operators (&, |). Logical operators work on truthiness and short-circuit; bitwise operators operate on individual bits of integers."
  },
  visual: { caption: "Logic gate truth tables: AND, OR, NOT, XOR", type: "logic-gates" },
  examples: [
    {
      difficulty: "very-easy", title: "Basic gate functions",
      explanation: "Implement AND, OR, NOT gates as JavaScript functions.",
      code: "const AND = (a, b) => a & b;\nconst OR  = (a, b) => a | b;\nconst NOT = (a)    => a ^ 1; // XOR with 1 flips a single bit\nconsole.log('AND(1,0):', AND(1, 0));\nconsole.log('OR(1,0):', OR(1, 0));\nconsole.log('NOT(1):', NOT(1));",
      language: "javascript", output: "AND(1,0): 0\nOR(1,0): 1\nNOT(1): 0"
    },
    {
      difficulty: "easy", title: "XOR gate",
      explanation: "XOR (Exclusive OR) outputs 1 only when inputs differ. It's used in adders, checksums, and encryption.",
      code: "const XOR = (a, b) => a ^ b;\nconsole.log('XOR(0,0):', XOR(0, 0));\nconsole.log('XOR(0,1):', XOR(0, 1));\nconsole.log('XOR(1,0):', XOR(1, 0));\nconsole.log('XOR(1,1):', XOR(1, 1));",
      language: "javascript", output: "XOR(0,0): 0\nXOR(0,1): 1\nXOR(1,0): 1\nXOR(1,1): 0"
    },
    {
      difficulty: "medium", title: "Generate full truth table",
      explanation: "A truth table lists all possible input combinations and their output for a Boolean expression.",
      code: "function truthTable(fn, inputs) {\n  const combos = 1 << inputs;\n  for (let i = 0; i < combos; i++) {\n    const bits = inputs === 2\n      ? [(i >> 1) & 1, i & 1]\n      : [i & 1];\n    console.log(`${bits.join(' ')} → ${fn(...bits)}`);\n  }\n}\ntruthTable((a, b) => a & b, 2); // AND truth table",
      language: "javascript", output: "0 0 → 0\n0 1 → 0\n1 0 → 0\n1 1 → 1"
    },
    {
      difficulty: "medium-plus", title: "NAND gate — universal gate",
      explanation: "NAND is a universal gate: you can build ANY other gate using only NAND gates.",
      code: "const NAND = (a, b) => (a & b) ^ 1; // NOT(AND)\n// Build NOT from NAND: NOT(a) = NAND(a, a)\nconst NOT_from_NAND = (a) => NAND(a, a);\n// Build AND from NAND: AND(a,b) = NAND(NAND(a,b), NAND(a,b))\nconst AND_from_NAND = (a, b) => NAND(NAND(a, b), NAND(a, b));\nconsole.log('NOT(1) via NAND:', NOT_from_NAND(1));\nconsole.log('AND(1,1) via NAND:', AND_from_NAND(1, 1));",
      language: "javascript", output: "NOT(1) via NAND: 0\nAND(1,1) via NAND: 1"
    },
    {
      difficulty: "hard", title: "Half adder using gates",
      explanation: "A half adder adds two 1-bit numbers. Sum = XOR(a,b), Carry = AND(a,b).",
      code: "function halfAdder(a, b) {\n  return { sum: a ^ b, carry: a & b };\n}\nconsole.log('0+0:', halfAdder(0, 0));\nconsole.log('0+1:', halfAdder(0, 1));\nconsole.log('1+0:', halfAdder(1, 0));\nconsole.log('1+1:', halfAdder(1, 1));",
      language: "javascript", output: "0+0: { sum: 0, carry: 0 }\n0+1: { sum: 1, carry: 0 }\n1+0: { sum: 1, carry: 0 }\n1+1: { sum: 0, carry: 1 }"
    },
    {
      difficulty: "real-world", title: "Feature flags with bitwise gates",
      explanation: "Feature toggles in production systems are often stored as bitmasks — individual bits represent individual features.",
      code: "const DARK_MODE    = 0b0001;\nconst BETA_FEATURE = 0b0010;\nconst ADMIN        = 0b0100;\n\nlet userFlags = DARK_MODE | ADMIN; // 0b0101 = 5\nconsole.log('Dark mode?',    (userFlags & DARK_MODE)    !== 0);\nconsole.log('Beta feature?', (userFlags & BETA_FEATURE) !== 0);\nconsole.log('Admin?',        (userFlags & ADMIN)        !== 0);\n\n// Enable beta feature:\nuserFlags |= BETA_FEATURE;\nconsole.log('After enabling beta:', userFlags.toString(2));",
      language: "javascript", output: "Dark mode?: true\nBeta feature?: false\nAdmin?: true\nAfter enabling beta: 111"
    }
  ],
  exercises: [
    {
      level: 1, title: "Implement all basic gates",
      problem: "Implement functions AND(a,b), OR(a,b), NOT(a), XOR(a,b) using only JavaScript bitwise operators. Test each with inputs (1,0).",
      hints: ["AND → &, OR → |, NOT → ^1, XOR → ^"],
      solution: "const AND = (a,b) => a & b;\nconst OR  = (a,b) => a | b;\nconst NOT = a => a ^ 1;\nconst XOR = (a,b) => a ^ b;\nconsole.log(AND(1,0), OR(1,0), NOT(1), XOR(1,0));"
    },
    {
      level: 2, title: "Truth table printer",
      problem: "Write a function `printTruthTable(fn)` that prints all four rows of a 2-input truth table for the given Boolean function fn(a,b).",
      hints: ["Loop a from 0 to 1, b from 0 to 1.", "Print `${a} ${b} | ${fn(a,b)}` for each."],
      solution: "function printTruthTable(fn) {\n  console.log('A B | OUT');\n  [0,1].forEach(a => [0,1].forEach(b => console.log(`${a} ${b} | ${fn(a,b)}`)));\n}\nprintTruthTable((a,b) => a | b); // OR gate"
    },
    {
      level: 3, title: "Bitmask feature toggling",
      problem: "Given `flags = 0b101`, write three operations: (1) enable bit 1 (0b010), (2) disable bit 0 (0b001), (3) check if bit 2 is set. Print each result.",
      hints: ["Enable: flags |= mask. Disable: flags &= ~mask. Check: (flags & mask) !== 0."],
      solution: "let flags = 0b101;\nflags |= 0b010;\nconsole.log('After enable bit1:', flags.toString(2)); // 111\nflags &= ~0b001;\nconsole.log('After disable bit0:', flags.toString(2)); // 110\nconsole.log('Bit 2 set?', (flags & 0b100) !== 0); // true"
    }
  ],
  interview: [
    { q: "What is a universal gate and why is NAND considered one?", a: "A universal gate can implement any Boolean function on its own. NAND is universal because you can construct NOT (NAND with both inputs tied), AND (NOT the NAND output), OR (NAND with NOT inputs), and therefore any logic circuit, using only NAND gates. This is why real CPUs are predominantly built from NAND gates." },
    { q: "What is the difference between && and & in JavaScript?", a: "&& is a logical AND that operates on truthiness and short-circuits (if left side is falsy, right side is never evaluated). & is a bitwise AND that operates on the individual bits of integers and always evaluates both sides." },
    { q: "What is De Morgan's Law?", a: "De Morgan's Laws state: NOT(A AND B) = (NOT A) OR (NOT B), and NOT(A OR B) = (NOT A) AND (NOT B). They're essential for simplifying Boolean expressions and are why NAND and NOR are universal gates." }
  ],
  realWorld: [
    { company: "Facebook / Meta", text: "Meta's GateKeeper system controls feature rollouts to millions of users using bitmask flags — enabling or disabling features for specific user segments using bitwise operations, exactly like the feature flag example above." },
    { company: "Intel", text: "Modern Intel CPUs contain over 10 billion transistors, each acting as a switch that implements NAND/NOR logic. Every floating-point operation, every branch, every cache access is built from combinations of these fundamental gates." }
  ],
  quiz: [
    { q: "What does XOR return for equal inputs (e.g., XOR(1,1))?", options: ["1", "0", "Undefined", "2"], answer: 1 },
    { q: "Which gate is called 'universal'?", options: ["AND", "OR", "NAND", "XOR"], answer: 2 },
    { q: "What is the output of AND(1,0)?", options: ["1", "0", "Undefined", "Both"], answer: 1 },
    { q: "De Morgan's Law: NOT(A AND B) equals?", options: ["NOT(A) AND NOT(B)", "NOT(A) OR NOT(B)", "A OR B", "NOT(A OR B)"], answer: 1 },
    { q: "Which operator enables a specific bit in a bitmask?", options: ["& (AND)", "^ (XOR)", "| (OR)", "~ (NOT)"], answer: 2 }
  ]
});
