/* ==========================================================================
   TOPIC CONTENT DATA — Module 14: Computer Architecture
   Topics: Von Neumann, CPU Components, ALU, Registers, Control Unit, Instruction Cycle, Clock, Multi-Core, GPU vs CPU, Cache
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm14-von-neumann',
  module: 14,
  title: 'Von Neumann Architecture',
  tagline: 'The blueprint every modern computer follows — one shared memory for both instructions and data.',
  readMinutes: 6,
  intro: {
    whatItIs: "The Von Neumann Architecture (proposed by John von Neumann in 1945) describes a computer with four key components: a Central Processing Unit (CPU), Memory, Input devices, and Output devices. Crucially, both program instructions and data share the same memory — the 'stored program' concept. The CPU fetches instructions from memory and executes them sequentially.",
    whyItMatters: "Nearly every computer you will ever write code for follows this architecture. Understanding it explains why CPU-bound vs memory-bound performance matters, why cache exists, and what the 'Von Neumann bottleneck' is (memory bandwidth limits CPU throughput).",
    whereUsed: "All general-purpose CPUs (Intel, AMD, ARM) implement a derivative of this architecture. Even GPUs, though massively parallel, follow related principles.",
    commonMistakes: "Assuming that because the CPU is fast, it's never the bottleneck. The Von Neumann bottleneck — the limited bandwidth of the bus between CPU and memory — is often the actual performance constraint in data-intensive programs."
  },
  visual: { caption: "Von Neumann Architecture: CPU ↔ Bus ↔ Memory, with Input/Output attached", type: "architecture-diagram" },
  examples: [
    {
      difficulty: "very-easy", title: "Simulating fetch from memory",
      explanation: "In Von Neumann architecture, the CPU fetches the next instruction from a memory address (the Program Counter points to it).",
      code: "const memory = ['LOAD A', 'ADD B', 'STORE C', 'HALT'];\nlet programCounter = 0;\nconst instruction = memory[programCounter];\nconsole.log('Fetched instruction:', instruction);\nprogramCounter++;\nconsole.log('Next PC:', programCounter);",
      language: "javascript", output: "Fetched instruction: LOAD A\nNext PC: 1"
    },
    {
      difficulty: "easy", title: "Shared memory: instructions and data",
      explanation: "In Von Neumann architecture, instructions and data live in the same memory space.",
      code: "const memory = {\n  0x00: 'MOV R1, 5',  // instruction\n  0x01: 'MOV R2, 10', // instruction\n  0x02: 'ADD R1, R2', // instruction\n  0xFF: 5,            // data value\n};\nconsole.log('Instruction at 0x00:', memory[0x00]);\nconsole.log('Data at 0xFF:', memory[0xFF]);",
      language: "javascript", output: "Instruction at 0x00: MOV R1, 5\nData at 0xFF: 5"
    },
    {
      difficulty: "medium", title: "Simulating the full instruction cycle",
      explanation: "The CPU repeats: Fetch → Decode → Execute → (Write Back). This is the heartbeat of every Von Neumann computer.",
      code: "const program = [\n  { op: 'LOAD', operand: 7 },\n  { op: 'LOAD', operand: 3 },\n  { op: 'ADD' },\n  { op: 'PRINT' }\n];\nconst stack = [];\nlet pc = 0;\nwhile (pc < program.length) {\n  const instr = program[pc]; // Fetch\n  // Decode + Execute\n  if (instr.op === 'LOAD')  stack.push(instr.operand);\n  if (instr.op === 'ADD')   stack.push(stack.pop() + stack.pop());\n  if (instr.op === 'PRINT') console.log('Result:', stack.pop());\n  pc++;\n}",
      language: "javascript", output: "Result: 10"
    },
    {
      difficulty: "medium-plus", title: "The Von Neumann bottleneck",
      explanation: "Because instructions and data share the same bus, they compete for bandwidth. This is the Von Neumann bottleneck.",
      code: "const busBandwidthGBs = 50; // modern DDR5\nconst cpuSpeedGHz = 3.5;\nconst instrPerCycle = 4; // IPC\nconst dataNeededGBs = cpuSpeedGHz * instrPerCycle; // how much CPU could process\nconsole.log('CPU demand (GB/s):', dataNeededGBs.toFixed(1));\nconsole.log('Bus bandwidth (GB/s):', busBandwidthGBs);\nconsole.log('Bottleneck?', dataNeededGBs > busBandwidthGBs ? 'No' : 'Potential');",
      language: "javascript", output: "CPU demand (GB/s): 14.0\nBus bandwidth (GB/s): 50\nBottleneck?: Potential"
    },
    {
      difficulty: "hard", title: "Program Counter simulation",
      explanation: "The Program Counter (PC) register always points to the memory address of the next instruction to fetch.",
      code: "function runProgram(instructions) {\n  let pc = 0;\n  let acc = 0;\n  while (pc < instructions.length) {\n    const [op, val] = instructions[pc].split(' ');\n    if (op === 'SET') acc = +val;\n    if (op === 'ADD') acc += +val;\n    if (op === 'MUL') acc *= +val;\n    if (op === 'OUT') console.log('Output:', acc);\n    if (op === 'JMP') { pc = +val; continue; }\n    pc++;\n  }\n}\nrunProgram(['SET 10', 'ADD 5', 'MUL 2', 'OUT', 'JMP 99']);",
      language: "javascript", output: "Output: 30"
    },
    {
      difficulty: "real-world", title: "Cache reducing the Von Neumann bottleneck",
      explanation: "Modern CPUs use L1/L2/L3 cache to buffer frequently used data, hiding the memory bus latency.",
      code: "class CachedMemory {\n  constructor() { this.cache = new Map(); this.memory = { 0: 42, 1: 7, 2: 99 }; this.hits = 0; this.misses = 0; }\n  read(addr) {\n    if (this.cache.has(addr)) { this.hits++; return this.cache.get(addr); }\n    this.misses++;\n    const val = this.memory[addr];\n    this.cache.set(addr, val);\n    return val;\n  }\n}\nconst mem = new CachedMemory();\n[0, 1, 0, 2, 0, 1].forEach(a => mem.read(a));\nconsole.log('Cache hits:', mem.hits, '| misses:', mem.misses);",
      language: "javascript", output: "Cache hits: 3 | misses: 3"
    }
  ],
  exercises: [
    {
      level: 1, title: "Program counter walk",
      problem: "Given an array of instructions ['START', 'ADD', 'MULTIPLY', 'END'], write a loop that prints each instruction along with its memory address (index), simulating how the program counter increments.",
      hints: ["Use a for loop with an index.", "Print `Address ${i}: ${instruction}`."],
      solution: "const instructions = ['START', 'ADD', 'MULTIPLY', 'END'];\nfor (let i = 0; i < instructions.length; i++) {\n  console.log(`Address ${i}: ${instructions[i]}`);\n}"
    },
    {
      level: 2, title: "Simple accumulator CPU",
      problem: "Implement a function `runAccumulator(ops)` that accepts an array of `{op: 'ADD'|'SUB'|'MUL', val: number}` objects and returns the final accumulator value (starting from 0).",
      hints: ["Start acc = 0.", "Switch or if on op to perform the math."],
      solution: "function runAccumulator(ops) {\n  let acc = 0;\n  ops.forEach(({op, val}) => {\n    if (op === 'ADD') acc += val;\n    if (op === 'SUB') acc -= val;\n    if (op === 'MUL') acc *= val;\n  });\n  return acc;\n}\nconsole.log(runAccumulator([{op:'ADD',val:10},{op:'MUL',val:3},{op:'SUB',val:5}])); // 25"
    },
    {
      level: 3, title: "Cache hit rate",
      problem: "Simulate a cache with capacity 3. Implement `readWithCache(addresses)` that takes an array of memory addresses, maintains a Set of cached addresses (max 3, evict oldest on overflow), and returns the hit rate as a percentage.",
      hints: ["Track a queue for FIFO eviction.", "Count hits when address already in cache."],
      solution: "function readWithCache(addresses) {\n  const cache = new Set();\n  const order = [];\n  let hits = 0;\n  addresses.forEach(addr => {\n    if (cache.has(addr)) { hits++; return; }\n    if (cache.size >= 3) { cache.delete(order.shift()); }\n    cache.add(addr);\n    order.push(addr);\n  });\n  return ((hits / addresses.length) * 100).toFixed(1) + '%';\n}\nconsole.log(readWithCache([1, 2, 1, 3, 2, 4, 1, 2])); // '37.5%'"
    }
  ],
  interview: [
    { q: "What is the Von Neumann bottleneck?", a: "The Von Neumann bottleneck is the limited bandwidth of the bus connecting the CPU to shared memory. Because both instructions and data travel over the same bus, the CPU often has to wait for memory — reducing performance. Modern solutions include cache hierarchies and Harvard architecture variants." },
    { q: "What is the Program Counter?", a: "The Program Counter (PC) is a CPU register that stores the memory address of the next instruction to be fetched. After each fetch, the PC is automatically incremented (or set by a jump instruction)." },
    { q: "What does 'stored program' mean in the Von Neumann model?", a: "In the stored-program model, the program instructions themselves are stored in the same memory as data. This allows programs to be loaded and changed without rewiring hardware — enabling general-purpose computing." }
  ],
  realWorld: [
    { company: "Intel", text: "Intel's Core and Xeon CPUs implement the Von Neumann model with multiple layers of cache (L1/L2/L3) to mitigate the memory bottleneck, allowing billions of instructions per second despite relatively slow DRAM." },
    { company: "Harvard Architecture (ARM MCUs)", text: "Embedded microcontrollers like ARM Cortex-M use Harvard Architecture — separate buses for instructions and data — to eliminate the Von Neumann bottleneck in real-time systems like car ECUs and medical devices." }
  ],
  quiz: [
    { q: "Who proposed the stored-program computer architecture?", options: ["Alan Turing", "John von Neumann", "Claude Shannon", "Charles Babbage"], answer: 1 },
    { q: "In Von Neumann architecture, instructions and data share:", options: ["Separate memory banks", "The same memory and bus", "A GPU", "A dedicated cache"], answer: 1 },
    { q: "What does the Program Counter (PC) store?", options: ["The current calculated result", "The address of the next instruction", "The number of CPU cycles elapsed", "The current variable value"], answer: 1 },
    { q: "What is the Von Neumann bottleneck?", options: ["CPU is too slow", "Memory bus bandwidth limits CPU throughput", "Too many CPU cores", "Slow SSD access"], answer: 1 },
    { q: "Which architecture separates instruction memory from data memory to avoid the bottleneck?", options: ["RISC", "CISC", "Harvard Architecture", "SIMD"], answer: 2 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm14-alu',
  module: 14,
  title: 'ALU — Arithmetic Logic Unit',
  tagline: 'The mathematical heart of the CPU — every addition, comparison, and logical operation runs here.',
  readMinutes: 5,
  intro: {
    whatItIs: "The Arithmetic Logic Unit (ALU) is the component inside every CPU that performs mathematical operations (addition, subtraction, multiplication) and logical operations (AND, OR, NOT, XOR, comparisons). It is the part of the CPU that 'does the math.' Every calculation your code ever makes ultimately executes in the ALU.",
    whyItMatters: "Understanding the ALU helps you reason about which operations are fast (addition, bitwise ops) and which are slow (division, complex floating-point). It's also why bitwise operations in low-level code can outperform multiplication or modulo.",
    whereUsed: "Every numeric computation in every programming language — from `2 + 2` to machine learning matrix math — translates into ALU operations at the hardware level.",
    commonMistakes: "Assuming all arithmetic operations are equally fast. Integer addition is a single ALU cycle; floating-point division takes many cycles and may use a separate FPU (Floating Point Unit)."
  },
  visual: { caption: "ALU receives two operands and an opcode, produces a result and status flags", type: "alu-diagram" },
  examples: [
    {
      difficulty: "very-easy", title: "Simulating ADD operation",
      explanation: "The most fundamental ALU operation: adding two integers and producing a result.",
      code: "function aluADD(a, b) { return a + b; }\nconsole.log('ALU ADD 15 + 27 =', aluADD(15, 27));",
      language: "javascript", output: "ALU ADD 15 + 27 = 42"
    },
    {
      difficulty: "easy", title: "Logical AND, OR, NOT operations",
      explanation: "The ALU performs bitwise logical operations on integers. AND sets a bit only if both inputs have it; OR if either does; NOT flips all bits.",
      code: "const a = 0b1010; // 10 in decimal\nconst b = 0b1100; // 12 in decimal\nconsole.log('AND:', (a & b).toString(2).padStart(4, '0')); // 1000 = 8\nconsole.log('OR: ', (a | b).toString(2).padStart(4, '0')); // 1110 = 14\nconsole.log('XOR:', (a ^ b).toString(2).padStart(4, '0')); // 0110 = 6",
      language: "javascript", output: "AND: 1000\nOR:  1110\nXOR: 0110"
    },
    {
      difficulty: "medium", title: "ALU with status flags",
      explanation: "Real ALUs produce status flags: Zero (Z), Negative (N), Carry (C). These flags are used by branch instructions.",
      code: "function alu(op, a, b) {\n  let result, flags = { Z: false, N: false };\n  if (op === 'ADD') result = a + b;\n  if (op === 'SUB') result = a - b;\n  flags.Z = result === 0;\n  flags.N = result < 0;\n  return { result, flags };\n}\nconsole.log(alu('ADD', 5, -5));\nconsole.log(alu('SUB', 3, 7));",
      language: "javascript", output: "{ result: 0, flags: { Z: true, N: false } }\n{ result: -4, flags: { Z: false, N: true } }"
    },
    {
      difficulty: "medium-plus", title: "Bitwise multiply by 2 (left shift)",
      explanation: "Multiplying by a power of 2 can be done with a left bit shift (<<), which is a single ALU cycle — much faster than full multiplication.",
      code: "const x = 7;\nconsole.log('x:', x);\nconsole.log('x * 2 (multiply):', x * 2);\nconsole.log('x << 1 (bit shift):', x << 1);\nconsole.log('x * 8 via shifts:', x << 3); // 3 shifts = *8",
      language: "javascript", output: "x: 7\nx * 2 (multiply): 14\nx << 1 (bit shift): 14\nx * 8 via shifts: 56"
    },
    {
      difficulty: "hard", title: "1-bit full adder logic",
      explanation: "A full adder is the fundamental ALU building block. It adds 3 single bits (a, b, carry-in) and outputs a sum bit and carry-out.",
      code: "function fullAdder(a, b, cin) {\n  const sum = a ^ b ^ cin;         // XOR\n  const cout = (a & b) | (b & cin) | (a & cin); // carry logic\n  return { sum, cout };\n}\nconsole.log('1+1+0:', fullAdder(1, 1, 0));\nconsole.log('1+1+1:', fullAdder(1, 1, 1));",
      language: "javascript", output: "1+1+0: { sum: 0, cout: 1 }\n1+1+1: { sum: 1, cout: 1 }"
    },
    {
      difficulty: "real-world", title: "Bitwise flags in real systems",
      explanation: "Linux file permissions use bitwise flags: read (4), write (2), execute (1) combined with OR. Checking uses AND.",
      code: "const READ = 4, WRITE = 2, EXEC = 1;\nconst filePerms = READ | WRITE; // 0b110 = 6\nconsole.log('Permissions value:', filePerms);\nconsole.log('Can read?',  (filePerms & READ)  !== 0);\nconsole.log('Can write?', (filePerms & WRITE) !== 0);\nconsole.log('Can exec?',  (filePerms & EXEC)  !== 0);",
      language: "javascript", output: "Permissions value: 6\nCan read?: true\nCan write?: true\nCan exec?: false"
    }
  ],
  exercises: [
    {
      level: 1, title: "ALU simulator",
      problem: "Write a function `alu(op, a, b)` that supports 'ADD', 'SUB', 'AND', 'OR' operations on two integers and returns the result.",
      hints: ["Use if/switch to branch on op.", "Apply the corresponding JavaScript operator."],
      solution: "function alu(op, a, b) {\n  if (op === 'ADD') return a + b;\n  if (op === 'SUB') return a - b;\n  if (op === 'AND') return a & b;\n  if (op === 'OR')  return a | b;\n  return null;\n}\nconsole.log(alu('ADD', 10, 5)); // 15\nconsole.log(alu('AND', 0b1010, 0b1100)); // 8"
    },
    {
      level: 2, title: "Power of 2 using bit shift",
      problem: "Write a function `pow2(n)` that returns 2^n using only bit shifting (the << operator), without using Math.pow or **.",
      hints: ["1 << n gives you 2^n.", "Return 1 << n."],
      solution: "function pow2(n) { return 1 << n; }\nconsole.log(pow2(0)); // 1\nconsole.log(pow2(3)); // 8\nconsole.log(pow2(10)); // 1024"
    },
    {
      level: 3, title: "Permission checker",
      problem: "Given a bitmask `perms` and a requested permission (READ=4, WRITE=2, EXEC=1), write a function `canDo(perms, flag)` that returns true if the permission is set.",
      hints: ["Use bitwise AND: (perms & flag) !== 0.", "Return a boolean."],
      solution: "const READ = 4, WRITE = 2, EXEC = 1;\nfunction canDo(perms, flag) { return (perms & flag) !== 0; }\nconst myPerms = READ | EXEC; // 5\nconsole.log('Read:', canDo(myPerms, READ));   // true\nconsole.log('Write:', canDo(myPerms, WRITE)); // false\nconsole.log('Exec:', canDo(myPerms, EXEC));   // true"
    }
  ],
  interview: [
    { q: "What operations does the ALU perform?", a: "The ALU performs arithmetic operations (addition, subtraction, multiplication, division) and logical operations (AND, OR, NOT, XOR, bit shifts, and comparisons). It is fed operands from registers and produces a result plus status flags." },
    { q: "Why is bitwise AND useful in programming?", a: "Bitwise AND lets you check if specific bits are set (masking). It's used in permission systems, flag fields, low-level hardware control, and performance-critical code where you need to test or extract specific bits without branching." },
    { q: "What are ALU status flags?", a: "Status flags are bits set by the ALU after an operation: Zero (Z) - result was 0; Negative (N) - result was negative; Carry (C) - arithmetic produced a carry out; Overflow (V) - signed overflow occurred. Branch instructions read these flags to make decisions." }
  ],
  realWorld: [
    { company: "NVIDIA", text: "GPU ALUs are designed for SIMD (Single Instruction Multiple Data) — thousands of ALU cores perform the same operation on thousands of values simultaneously, enabling the matrix math that powers deep learning." },
    { company: "Linux Kernel", text: "The Linux kernel uses bitwise ALU operations extensively for file permissions, interrupt flags, memory mapping bits, and network packet flags — often manipulating dozens of flags packed into a single integer." }
  ],
  quiz: [
    { q: "What does ALU stand for?", options: ["Array Logic Unit", "Arithmetic Logic Unit", "Asynchronous Loading Unit", "Automated Language Utility"], answer: 1 },
    { q: "Which ALU operation is equivalent to multiplying by 4?", options: ["x >> 2", "x << 2", "x & 4", "x | 4"], answer: 1 },
    { q: "What status flag is set when an ALU result equals zero?", options: ["Carry flag", "Negative flag", "Zero flag", "Overflow flag"], answer: 2 },
    { q: "What does bitwise AND (a & b) produce?", options: ["1 where either input has a 1", "1 where both inputs have a 1", "1 where inputs differ", "Flips all bits"], answer: 1 },
    { q: "Why are bit shifts faster than multiplication for powers of 2?", options: ["They use fewer registers", "They complete in a single ALU cycle", "They use less memory", "They avoid using the FPU"], answer: 1 }
  ]
});
