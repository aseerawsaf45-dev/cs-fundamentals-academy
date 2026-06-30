/* ==========================================================================
   TOPIC CONTENT DATA — Module 13: Digital Literacy
   Topics: What is a Computer, Types, Hardware vs Software, I/O, Storage, Memory, OS, Apps, Files, Binary
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm13-what-is-computer',
  module: 13,
  title: 'What is a Computer?',
  tagline: 'A machine that processes data using instructions — the foundation of everything digital.',
  readMinutes: 5,
  intro: {
    whatItIs: "A computer is an electronic device that accepts input data, processes it according to a set of instructions (a program), stores results in memory, and produces output. At its core, everything a computer does is manipulation of binary numbers — 0s and 1s representing electrical signals.",
    whyItMatters: "Understanding what a computer fundamentally is helps you reason about every layer of software you write. When your code runs, it's ultimately being translated into instructions that a physical machine executes — knowing this helps you write better programs.",
    whereUsed: "Every smartphone, laptop, server, smartwatch, car computer, ATM, and embedded microcontroller is a computer. The principles are universal regardless of form factor.",
    commonMistakes: "Confusing a computer with just a desktop PC. Computers include smartphones, tablets, servers, and even microcontrollers in household appliances — any device with a CPU, memory, and programmable instructions."
  },
  visual: { caption: "The four fundamental operations of every computer: Input → Process → Store → Output", type: "process-flow" },
  examples: [
    {
      difficulty: "very-easy", title: "Simulating the input-process-output model",
      explanation: "A computer takes input, processes it, and produces output. Here we simulate that flow with a simple calculation.",
      code: "const input = 42;           // Input phase\nconst processed = input * 2; // Process phase\nconsole.log('Output:', processed); // Output phase",
      language: "javascript", output: "Output: 84"
    },
    {
      difficulty: "easy", title: "Binary representation of a number",
      explanation: "Computers store all data as binary (base-2). Here we convert a decimal number to its binary string.",
      code: "const num = 13;\nconsole.log('Decimal:', num);\nconsole.log('Binary:', num.toString(2));\nconsole.log('Computers see:', num.toString(2).split('').join(' '));",
      language: "javascript", output: "Decimal: 13\nBinary: 1101\nComputers see: 1 1 0 1"
    },
    {
      difficulty: "medium", title: "Simulating a stored program",
      explanation: "A computer follows a list of instructions (a program) stored in memory and executes them in sequence.",
      code: "const program = [\n  { op: 'LOAD',  val: 5 },\n  { op: 'ADD',   val: 3 },\n  { op: 'STORE', val: null }\n];\nlet accumulator = 0;\nprogram.forEach(instr => {\n  if (instr.op === 'LOAD') accumulator = instr.val;\n  if (instr.op === 'ADD')  accumulator += instr.val;\n  if (instr.op === 'STORE') console.log('Result stored:', accumulator);\n});",
      language: "javascript", output: "Result stored: 8"
    },
    {
      difficulty: "medium-plus", title: "Checking machine word size",
      explanation: "Modern computers work with 64-bit words — meaning they can process 2^64 different values in a single operation.",
      code: "const bits = 64;\nconst maxUnsigned = Math.pow(2, bits);\nconsole.log('64-bit max unsigned:', maxUnsigned.toExponential(3));\nconsole.log('Safe integer max:', Number.MAX_SAFE_INTEGER);",
      language: "javascript", output: "64-bit max unsigned: 1.845e+19\nSafe integer max: 9007199254740991"
    },
    {
      difficulty: "hard", title: "Simulating CPU fetch-decode-execute",
      explanation: "The CPU continuously fetches an instruction, decodes what it means, executes it, then repeats (the instruction cycle).",
      code: "const memory = [10, 20, 30]; // stored values\nconst instructions = ['FETCH 0', 'FETCH 1', 'ADD', 'PRINT'];\nlet reg = [];\ninstructions.forEach(instr => {\n  const [op, arg] = instr.split(' ');\n  if (op === 'FETCH') reg.push(memory[+arg]);\n  if (op === 'ADD')   reg = [reg[0] + reg[1]];\n  if (op === 'PRINT') console.log('CPU Result:', reg[0]);\n});",
      language: "javascript", output: "CPU Result: 30"
    },
    {
      difficulty: "real-world", title: "Counting clock cycles",
      explanation: "Modern CPUs run at GHz speeds — billions of cycles per second. Each cycle can execute one or more instructions.",
      code: "const clockGHz = 3.5;  // e.g. 3.5 GHz processor\nconst cyclesPerSec = clockGHz * 1e9;\nconst instructionsPerCycle = 2; // modern CPUs do >1 IPC\nconst ipsPerSec = cyclesPerSec * instructionsPerCycle;\nconsole.log('Clock speed:', clockGHz + ' GHz');\nconsole.log('Approx instructions/sec:', ipsPerSec.toExponential(2));",
      language: "javascript", output: "Clock speed: 3.5 GHz\nApprox instructions/sec: 7.00e+9"
    }
  ],
  exercises: [
    {
      level: 1, title: "Input-Process-Output",
      problem: "Write a function `compute(a, b)` that takes two numbers as input, multiplies them together as processing, and returns the result as output.",
      hints: ["Define a function with two parameters.", "Return a * b."],
      solution: "function compute(a, b) {\n  return a * b;\n}\nconsole.log(compute(6, 7)); // 42"
    },
    {
      level: 2, title: "Binary converter",
      problem: "Write a function `toBinary(n)` that returns the binary string representation of a given integer.",
      hints: ["Use JavaScript's .toString(2) method.", "Call it on the number."],
      solution: "function toBinary(n) {\n  return n.toString(2);\n}\nconsole.log(toBinary(42)); // '101010'"
    },
    {
      level: 3, title: "Simple stored program",
      problem: "Create an array of 5 numbers. Write a program that loops through them, accumulates their sum, and prints 'Total: <sum>'.",
      hints: ["Use reduce() or a for loop.", "Accumulate into a variable starting at 0."],
      solution: "const nums = [10, 20, 30, 40, 50];\nconst total = nums.reduce((acc, n) => acc + n, 0);\nconsole.log('Total:', total); // Total: 150"
    }
  ],
  interview: [
    { q: "What are the four core operations every computer performs?", a: "Input (receiving data), Processing (computing according to instructions), Storage (saving data to memory), and Output (producing results for users or other systems)." },
    { q: "Why do computers use binary instead of decimal?", a: "Binary maps perfectly to physical electronics: a transistor is either on (1) or off (0). It's more reliable and efficient to use two states than ten, and binary arithmetic is easy to implement in hardware." },
    { q: "What is the difference between hardware and software?", a: "Hardware is the physical components (CPU, RAM, storage). Software is the set of instructions (programs) that tell the hardware what to do. Hardware is tangible; software is intangible data." }
  ],
  realWorld: [
    { company: "Apple", text: "The M-series chips in MacBooks process trillions of operations per second using the same fundamental input-process-output model described in this topic." },
    { company: "Amazon AWS", text: "AWS data centers run millions of computers — each one a physical machine running billions of instructions per second, all based on the same von Neumann architecture." }
  ],
  quiz: [
    { q: "What does a CPU stand for?", options: ["Central Processing Unit", "Computer Power Unit", "Core Program Utility", "Central Program Uploader"], answer: 0 },
    { q: "What number system do computers use internally?", options: ["Decimal (base-10)", "Octal (base-8)", "Binary (base-2)", "Hexadecimal (base-16)"], answer: 2 },
    { q: "Which is an example of OUTPUT?", options: ["Typing on a keyboard", "Moving a mouse", "Text appearing on a monitor", "Inserting a USB drive"], answer: 2 },
    { q: "What does 'stored program' mean?", options: ["A program saved to the cloud", "Instructions stored in memory that the CPU fetches and executes", "A backup copy of your code", "A program running in the background"], answer: 1 },
    { q: "What is the binary representation of decimal 5?", options: ["101", "110", "011", "100"], answer: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm13-hardware-software',
  module: 13,
  title: 'Hardware vs Software',
  tagline: 'The physical machine and the instructions that bring it to life — two sides of every computer.',
  readMinutes: 5,
  intro: {
    whatItIs: "Hardware refers to the physical, tangible components of a computer system: the CPU, RAM sticks, hard drive, motherboard, display, and so on. Software is the intangible set of instructions (programs) that directs the hardware to perform specific tasks. The two are completely interdependent.",
    whyItMatters: "As a developer you write software, but that software runs on hardware. Understanding this relationship helps you write performance-aware code, understand why memory limits exist, and debug issues that stem from the hardware layer.",
    whereUsed: "Every piece of code you write runs on hardware. When you call console.log(), machine instructions execute on a physical CPU and data flows through physical RAM.",
    commonMistakes: "Thinking of software as completely abstract and separate from hardware. In reality, every function call, every variable, every loop iteration has a direct physical cost in CPU cycles and memory bytes."
  },
  visual: { caption: "The hardware-software stack: from transistors at the bottom to user applications at the top", type: "stack-diagram" },
  examples: [
    {
      difficulty: "very-easy", title: "Describing hardware components",
      explanation: "Hardware components have specific roles. Here we model them as JavaScript objects.",
      code: "const hardware = {\n  cpu: 'Processes instructions at 3.5 GHz',\n  ram: 'Stores 16 GB of active data',\n  ssd: 'Persists 512 GB of files',\n  gpu: 'Renders 60 frames per second'\n};\nObject.entries(hardware).forEach(([part, role]) => {\n  console.log(`${part.toUpperCase()}: ${role}`);\n});",
      language: "javascript", output: "CPU: Processes instructions at 3.5 GHz\nRAM: Stores 16 GB of active data\nSSD: Persists 512 GB of files\nGPU: Renders 60 frames per second"
    },
    {
      difficulty: "easy", title: "Software layers",
      explanation: "Software is organized in layers — from firmware close to hardware up to user applications.",
      code: "const layers = ['Firmware / BIOS', 'Operating System Kernel', 'System Libraries', 'Runtime (Node.js / JVM)', 'Application Code'];\nlayers.forEach((layer, i) => console.log(`Layer ${i + 1}: ${layer}`));",
      language: "javascript", output: "Layer 1: Firmware / BIOS\nLayer 2: Operating System Kernel\nLayer 3: System Libraries\nLayer 4: Runtime (Node.js / JVM)\nLayer 5: Application Code"
    },
    {
      difficulty: "medium", title: "RAM capacity simulator",
      explanation: "RAM has finite capacity. When programs use too much, performance degrades (thrashing). Here we simulate capacity tracking.",
      code: "const ramMB = 8192; // 8 GB RAM\nlet usedMB = 0;\nconst programs = [{ name: 'Chrome', mb: 2048 }, { name: 'VS Code', mb: 512 }, { name: 'Node', mb: 256 }];\nprograms.forEach(p => {\n  usedMB += p.mb;\n  const pct = ((usedMB / ramMB) * 100).toFixed(1);\n  console.log(`After ${p.name}: ${usedMB}MB used (${pct}%)`);\n});",
      language: "javascript", output: "After Chrome: 2048MB used (25.0%)\nAfter VS Code: 2560MB used (31.2%)\nAfter Node: 2816MB used (34.4%)"
    },
    {
      difficulty: "medium-plus", title: "CPU core utilization model",
      explanation: "Modern CPUs have multiple cores. Tasks are distributed across cores for parallel execution.",
      code: "const cores = 8;\nconst tasks = ['Render UI', 'Run JS', 'Handle I/O', 'Garbage Collect', 'Compile', 'Network', 'Disk Write', 'Decode Video'];\ntasks.forEach((task, i) => {\n  console.log(`Core ${(i % cores) + 1}: ${task}`);\n});",
      language: "javascript", output: "Core 1: Render UI\nCore 2: Run JS\nCore 3: Handle I/O\nCore 4: Garbage Collect\nCore 5: Compile\nCore 6: Network\nCore 7: Disk Write\nCore 8: Decode Video"
    },
    {
      difficulty: "hard", title: "Memory hierarchy access times",
      explanation: "Different hardware memory types have radically different access speeds — registers are nanoseconds, disk is milliseconds.",
      code: "const memHierarchy = [\n  { type: 'CPU Register',   accessNs: 0.3,    sizeBytes: 256 },\n  { type: 'L1 Cache',       accessNs: 1,      sizeBytes: 32768 },\n  { type: 'L2 Cache',       accessNs: 4,      sizeBytes: 262144 },\n  { type: 'RAM',            accessNs: 100,    sizeBytes: 17179869184 },\n  { type: 'SSD',            accessNs: 100000, sizeBytes: 549755813888 },\n];\nmemHierarchy.forEach(m => {\n  console.log(`${m.type.padEnd(14)}: ${m.accessNs}ns`);\n});",
      language: "javascript", output: "CPU Register  : 0.3ns\nL1 Cache      : 1ns\nL2 Cache      : 4ns\nRAM           : 100ns\nSSD           : 100000ns"
    },
    {
      difficulty: "real-world", title: "Choosing the right data structure for hardware constraints",
      explanation: "A software choice (array vs linked list) translates to hardware behavior: arrays have cache-friendly memory layout; linked lists cause cache misses.",
      code: "// Cache-friendly: array elements are contiguous in RAM\nconst arr = [1, 2, 3, 4, 5];\nconst sum = arr.reduce((a, b) => a + b, 0);\nconsole.log('Array sum (cache-friendly):', sum);\n// Linked list nodes are scattered — hardware fetches are slower\nconsole.log('Linked list access causes cache misses due to pointer indirection');",
      language: "javascript", output: "Array sum (cache-friendly): 15\nLinked list access causes cache misses due to pointer indirection"
    }
  ],
  exercises: [
    {
      level: 1, title: "Categorize components",
      problem: "Given an array of items: ['CPU', 'Windows 11', 'RAM', 'Chrome browser', 'SSD', 'Python script'] — write code that separates them into 'hardware' and 'software' arrays and prints both.",
      hints: ["Use a hardcoded Set or array for hardware names.", "Filter the items array twice."],
      solution: "const items = ['CPU', 'Windows 11', 'RAM', 'Chrome browser', 'SSD', 'Python script'];\nconst hwItems = new Set(['CPU', 'RAM', 'SSD']);\nconst hw = items.filter(i => hwItems.has(i));\nconst sw = items.filter(i => !hwItems.has(i));\nconsole.log('Hardware:', hw);\nconsole.log('Software:', sw);"
    },
    {
      level: 2, title: "RAM usage tracker",
      problem: "Write a function `addProcess(name, mb, totalRam)` that returns 'OK' if the process fits in RAM, or 'OUT OF MEMORY' if it would exceed totalRam. Start with usedMB at 0 in a closure.",
      hints: ["Use a closure to maintain usedMB state.", "Check usedMB + mb <= totalRam."],
      solution: "function createRamTracker(totalRam) {\n  let used = 0;\n  return function addProcess(name, mb) {\n    if (used + mb > totalRam) return `${name}: OUT OF MEMORY`;\n    used += mb;\n    return `${name}: OK (${used}/${totalRam}MB)`;\n  };\n}\nconst track = createRamTracker(1024);\nconsole.log(track('App A', 512));\nconsole.log(track('App B', 600));"
    },
    {
      level: 3, title: "Memory hierarchy lookup",
      problem: "Create an object `memSpeed` mapping memory types to access times in nanoseconds (register: 0.3, l1: 1, l2: 4, ram: 100, ssd: 100000). Write a function that accepts a type and returns how many times slower it is than a register.",
      hints: ["Divide memSpeed[type] by memSpeed['register'].", "Return the ratio."],
      solution: "const memSpeed = { register: 0.3, l1: 1, l2: 4, ram: 100, ssd: 100000 };\nfunction slowerThanRegister(type) {\n  return (memSpeed[type] / memSpeed.register).toFixed(0) + 'x slower';\n}\nconsole.log('RAM:', slowerThanRegister('ram'));\nconsole.log('SSD:', slowerThanRegister('ssd'));"
    }
  ],
  interview: [
    { q: "What is firmware?", a: "Firmware is low-level software stored on read-only memory chips inside hardware devices. It initializes hardware on startup (like BIOS/UEFI) and sits between hardware and the operating system." },
    { q: "Why does RAM matter for developer performance?", a: "RAM is where running programs and their data live. Insufficient RAM causes the OS to use virtual memory on disk, which is 1000x slower — causing severe slowdowns. Memory-aware developers design data structures that fit in cache." },
    { q: "What is the difference between RAM and storage?", a: "RAM (Random Access Memory) is fast, volatile working memory — contents are lost when power is cut. Storage (SSD/HDD) is slow, persistent memory — data survives power cycles. Programs load from storage into RAM to execute." }
  ],
  realWorld: [
    { company: "Google", text: "Google's search infrastructure runs on hundreds of thousands of physical servers. Their engineers optimize software to minimize RAM usage and maximize CPU cache efficiency, translating hardware understanding into billions in saved costs." },
    { company: "Valve / Steam", text: "Game engines like those used for Steam titles are deeply hardware-aware — they're written to utilize CPU cores, GPU pipelines, and RAM bandwidth in extremely specific ways that only matter if you understand the hardware layer." }
  ],
  quiz: [
    { q: "Which of the following is HARDWARE?", options: ["Python script", "Operating system", "RAM chip", "Web browser"], answer: 2 },
    { q: "Which is SOFTWARE?", options: ["CPU", "GPU", "SSD", "Linux kernel"], answer: 3 },
    { q: "What is firmware?", options: ["A type of RAM", "Low-level software stored in hardware chips", "A programming language", "A type of storage"], answer: 1 },
    { q: "Why are arrays more cache-friendly than linked lists?", options: ["Arrays use less memory", "Array elements are contiguous in RAM", "Arrays are faster to create", "Linked lists have no pointers"], answer: 1 },
    { q: "What is the fastest memory type in a computer?", options: ["SSD", "RAM", "L2 Cache", "CPU Register"], answer: 3 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm13-binary-human',
  module: 13,
  title: 'Binary vs Human Language',
  tagline: 'Why machines think in 0s and 1s — and how text, images, and sound become numbers.',
  readMinutes: 6,
  intro: {
    whatItIs: "Binary is a number system with only two digits (0 and 1), perfectly matching the on/off states of transistors in a CPU. Human language — letters, words, punctuation — is encoded into binary using standards like ASCII and Unicode, allowing computers to store and manipulate text.",
    whyItMatters: "Every string you type in code, every character in a file, every emoji in a message is ultimately a sequence of binary numbers. Understanding encoding prevents bugs like garbled text, incorrect string lengths, and encoding mismatches.",
    whereUsed: "Text encoding is relevant everywhere: file I/O, HTTP request headers, database text fields, API responses, and anywhere a program reads or writes human-readable data.",
    commonMistakes: "Assuming 1 character = 1 byte. In UTF-8 (used by most modern systems), many characters take 1 byte, but emoji and non-Latin characters can take 2–4 bytes, causing off-by-one bugs in string length calculations."
  },
  visual: { caption: "Character 'A' → ASCII 65 → Binary 01000001 → electrical voltage pattern in CPU", type: "encoding-flow" },
  examples: [
    {
      difficulty: "very-easy", title: "Character to ASCII code",
      explanation: "Every text character has a numeric code point. charCodeAt() reveals the ASCII number.",
      code: "const char = 'A';\nconst code = char.charCodeAt(0);\nconsole.log(`'${char}' → ASCII code: ${code}`);\nconsole.log(`Binary: ${code.toString(2)}`);",
      language: "javascript", output: "'A' → ASCII code: 65\nBinary: 1000001"
    },
    {
      difficulty: "easy", title: "String to ASCII codes",
      explanation: "Iterate over a string and get the numeric code for each character.",
      code: "const word = 'Hi!';\nconst codes = [...word].map(c => c.charCodeAt(0));\nconsole.log('String:', word);\nconsole.log('ASCII codes:', codes);",
      language: "javascript", output: "String: Hi!\nASCII codes: [ 72, 105, 33 ]"
    },
    {
      difficulty: "medium", title: "ASCII code back to character",
      explanation: "String.fromCharCode() converts a numeric code back to its character.",
      code: "const codes = [72, 101, 108, 108, 111];\nconst word = codes.map(c => String.fromCharCode(c)).join('');\nconsole.log('Decoded:', word);",
      language: "javascript", output: "Decoded: Hello"
    },
    {
      difficulty: "medium-plus", title: "UTF-8 byte length vs character count",
      explanation: "Emoji are multiple bytes in UTF-8 but count as 1 character in JavaScript's .length (which counts UTF-16 code units).",
      code: "const str = 'Hi 👋';\nconsole.log('JS .length:', str.length); // emoji = 2 code units\nconsole.log('Actual characters:', [...str].length); // use spread for correct count\nconsole.log('UTF-8 bytes (approx):', new TextEncoder().encode(str).length);",
      language: "javascript", output: "JS .length: 5\nActual characters: 4\nUTF-8 bytes (approx): 7"
    },
    {
      difficulty: "hard", title: "Simple Caesar cipher (binary shift conceptually)",
      explanation: "Encryption is fundamentally bit manipulation — even a simple Caesar cipher is adding a number to each character's code point.",
      code: "function caesar(text, shift) {\n  return [...text].map(c => String.fromCharCode(c.charCodeAt(0) + shift)).join('');\n}\nconst msg = 'Hello';\nconst encrypted = caesar(msg, 3);\nconst decrypted = caesar(encrypted, -3);\nconsole.log('Encrypted:', encrypted);\nconsole.log('Decrypted:', decrypted);",
      language: "javascript", output: "Encrypted: Khoor\nDecrypted: Hello"
    },
    {
      difficulty: "real-world", title: "Detecting encoding issues",
      explanation: "Real apps must handle encoding explicitly. The TextEncoder/TextDecoder API mirrors what happens in network transmission.",
      code: "const encoder = new TextEncoder();\nconst decoder = new TextDecoder();\nconst original = 'Héllo, wörld!';\nconst bytes = encoder.encode(original);\nconsole.log('Original:', original);\nconsole.log('Byte count:', bytes.length);\nconsole.log('Decoded back:', decoder.decode(bytes));",
      language: "javascript", output: "Original: Héllo, wörld!\nByte count: 15\nDecoded back: Héllo, wörld!"
    }
  ],
  exercises: [
    {
      level: 1, title: "Convert character to binary",
      problem: "Write a function `charToBinary(c)` that takes a single character and returns its binary representation (e.g. 'A' → '1000001').",
      hints: ["Use charCodeAt(0) to get the number.", "Then .toString(2) to get binary."],
      solution: "function charToBinary(c) {\n  return c.charCodeAt(0).toString(2);\n}\nconsole.log(charToBinary('A')); // '1000001'\nconsole.log(charToBinary('z')); // '1111010'"
    },
    {
      level: 2, title: "Encode a word",
      problem: "Write a function `encodeWord(word)` that returns an array of the decimal ASCII codes for each character in the word.",
      hints: ["Split or spread the string into individual characters.", "Map each char to charCodeAt(0)."],
      solution: "function encodeWord(word) {\n  return [...word].map(c => c.charCodeAt(0));\n}\nconsole.log(encodeWord('Cat')); // [67, 97, 116]"
    },
    {
      level: 3, title: "Decode a message",
      problem: "Given an array of ASCII codes [87, 101, 108, 99, 111, 109, 101], decode it back into a readable string using String.fromCharCode.",
      hints: ["Map each number to String.fromCharCode(n).", "Join the result with empty string."],
      solution: "const codes = [87, 101, 108, 99, 111, 109, 101];\nconst message = codes.map(n => String.fromCharCode(n)).join('');\nconsole.log(message); // 'Welcome'"
    }
  ],
  interview: [
    { q: "What is the difference between ASCII and Unicode?", a: "ASCII is a 7-bit encoding supporting 128 characters (English letters, digits, punctuation). Unicode is a universal standard supporting over 140,000 characters across all world scripts. UTF-8 is the most common Unicode encoding, using 1–4 bytes per character." },
    { q: "Why does JavaScript's .length return unexpected values for emoji?", a: "JavaScript strings are UTF-16 internally. Most emoji require two UTF-16 code units (called a surrogate pair), so .length counts 2 for a single emoji. Use [...str].length or Array.from(str).length to count actual characters." },
    { q: "What is a byte?", a: "A byte is 8 bits. Since each bit is 0 or 1, a byte can represent 2^8 = 256 different values (0–255). It's the fundamental unit of digital storage and memory addressing." }
  ],
  realWorld: [
    { company: "Twitter / X", text: "Twitter's 280-character limit counts Unicode characters, not bytes. An emoji or Chinese character counts as 1–2 characters in their system, handled by careful encoding-aware string processing." },
    { company: "MySQL", text: "A common real-world bug: MySQL's 'utf8' charset only supports 3-byte characters. To properly store emoji (4-byte UTF-8), you must use 'utf8mb4' — failing to do so silently truncates emoji in database inserts." }
  ],
  quiz: [
    { q: "What is the ASCII code for letter 'A'?", options: ["64", "65", "97", "41"], answer: 1 },
    { q: "How many bits are in 1 byte?", options: ["4", "16", "8", "32"], answer: 2 },
    { q: "Which encoding supports all world languages and emoji?", options: ["ASCII", "ANSI", "Unicode (UTF-8)", "Base64"], answer: 2 },
    { q: "Why might .length in JavaScript give a wrong character count?", options: ["JavaScript bug", "Emoji use 2 UTF-16 code units", "Strings are zero-indexed", "Unicode is not supported"], answer: 1 },
    { q: "What is a 'surrogate pair' in JavaScript strings?", options: ["Two bytes representing one ASCII character", "Two UTF-16 code units representing one Unicode character above U+FFFF", "A backup copy of a string", "A pair of matching quotes"], answer: 1 }
  ]
});
