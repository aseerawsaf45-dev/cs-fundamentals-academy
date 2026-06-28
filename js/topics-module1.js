/* ==========================================================================
   TOPIC CONTENT DATA — Module 1: Computer Fundamentals
   Full depth per spec: intro, visual explanation, 6 examples, 6 exercises,
   5 interview questions, real-world applications, 10-question quiz.

   This file defines window.CSFA_TOPICS as an array. Other modules' topics
   are NOT in this array yet (they render a "coming soon" state on topic.html
   driven by modules-data.js).
   ========================================================================== */

window.CSFA_RAW_TOPICS = [];

window.CSFA_RAW_TOPICS.push({
  id: 'how-computers-work',
  module: 1,
  title: 'How Computers Work',
  tagline: 'The five-minute mental model that makes every other CS topic click into place.',
  readMinutes: 9,

  intro: {
    whatItIs: `At its core, a computer is a machine that does one thing extremely fast: it moves numbers around and changes them according to instructions. Everything you see on screen — a video, a chat message, a 3D game — is, underneath, just enormous quantities of binary numbers (1s and 0s) being shuffled between a few key components billions of times per second.`,
    whyItMatters: `If you're directing an AI coding assistant, you don't need to design a CPU. But when your code is "slow," or a deploy "runs out of memory," or a process "hangs," you're hitting one of these physical components. Knowing the model means you can read an error message and have an intuition for what actually broke, instead of just pasting it back into a chat box and hoping.`,
    whereUsed: `Every single thing you run — your browser, your code editor, the AI model answering your prompts — is this same loop, repeated at a scale that's hard to picture: a modern CPU can execute several billion instructions every second.`,
    commonMistakes: `Beginners often think "more code" or "the internet" is some separate magical layer from "the computer." It isn't. A website, an AI model, and a calculator app are all running on the exact same fetch-decode-execute loop described below — just with wildly different amounts of data and different instructions.`,
  },

  visual: {
    caption: 'Data flow: how a single instruction moves through a computer',
    type: 'cpu-ram-storage-flow',
  },

  examples: [
    {
      difficulty: 'very-easy', title: 'Where does "2 + 2" actually happen?',
      explanation: `When you type 2 + 2 into any program, the values 2 and 2 get loaded from memory into the CPU, the CPU's arithmetic circuit adds them, and the result 4 is written back to memory. This is true whether it's a calculator app, a spreadsheet, or a line buried inside a massive program.`,
      code: `let result = 2 + 2;\nconsole.log(result);`,
      language: 'javascript',
      output: `4`,
    },
    {
      difficulty: 'easy', title: 'Simulating a fetch-decode-execute step',
      explanation: `This snippet models — in plain JavaScript — the three-step loop every CPU runs: fetch an instruction, decode what it means, execute it. Real CPUs do this in hardware circuits, but the logic shape is identical.`,
      code: `const memory = ["LOAD 5", "LOAD 7", "ADD"];\nlet stack = [];\n\nfor (const instruction of memory) {\n  const [op, value] = instruction.split(" ");\n  if (op === "LOAD") stack.push(Number(value));\n  if (op === "ADD") stack.push(stack.pop() + stack.pop());\n}\n\nconsole.log("Result:", stack[0]);`,
      language: 'javascript',
      output: `Result: 12`,
    },
    {
      difficulty: 'medium', title: 'Why “out of memory” crashes happen',
      explanation: `RAM has a fixed size. If a program keeps creating data without releasing it, eventually there's no room left and the operating system kills the process. This loop keeps growing an array forever — a simplified version of a real memory leak.`,
      code: `const leak = [];\nfunction grow() {\n  // In a real leak, this runs forever and never\n  // releases old data, eventually exhausting RAM.\n  for (let i = 0; i < 5; i++) {\n    leak.push(new Array(1000).fill("x"));\n  }\n  return leak.length;\n}\nconsole.log("Chunks stored:", grow());`,
      language: 'javascript',
      output: `Chunks stored: 5`,
    },
    {
      difficulty: 'medium-plus', title: 'CPU cache vs. RAM speed (conceptual benchmark)',
      explanation: `Reading data that's already "close" to the CPU (cache) is dramatically faster than reading from RAM, which in turn is dramatically faster than reading from disk storage. This example times repeated access to a small array (likely cache-friendly) vs. a huge one (likely not), to make that hierarchy tangible.`,
      code: `function timeAccess(size) {\n  const arr = new Array(size).fill(1);\n  const start = performance.now();\n  let sum = 0;\n  for (let i = 0; i < 1_000_000; i++) {\n    sum += arr[i % size];\n  }\n  return performance.now() - start;\n}\n\nconsole.log("Small array (cache-friendly):", timeAccess(64).toFixed(2), "ms");\nconsole.log("Large array (less cache-friendly):", timeAccess(5_000_000).toFixed(2), "ms");`,
      language: 'javascript',
      output: `Small array (cache-friendly): 4.10 ms\nLarge array (less cache-friendly): 11.80 ms\n(Exact numbers vary by machine — the point is the gap.)`,
    },
    {
      difficulty: 'hard', title: 'Modeling a simplified instruction set',
      explanation: `This builds a tiny "CPU" that understands four instructions (LOAD, ADD, STORE, PRINT) operating on a simulated memory array — a miniature, runnable version of what real CPU instruction sets do at a much larger scale.`,
      code: `const memoryBank = new Array(16).fill(0);\nlet accumulator = 0;\n\nconst program = [\n  ["LOAD", 10],\n  ["ADD", 5],\n  ["STORE", 0],\n  ["PRINT", 0],\n];\n\nfunction run(program) {\n  for (const [op, arg] of program) {\n    if (op === "LOAD") accumulator = arg;\n    if (op === "ADD") accumulator += arg;\n    if (op === "STORE") memoryBank[arg] = accumulator;\n    if (op === "PRINT") console.log("Memory[" + arg + "] =", memoryBank[arg]);\n  }\n}\n\nrun(program);`,
      language: 'javascript',
      output: `Memory[0] = 15`,
    },
    {
      difficulty: 'real-world', title: 'Why AI inference needs specialized hardware',
      explanation: `Large language models perform staggering numbers of matrix multiplications. A regular CPU executes instructions mostly one (or a few) at a time; a GPU executes thousands of simple arithmetic operations in parallel. This is why "How Computers Work" — specifically, how CPUs vs. GPUs are built differently — directly explains why training and running models like the one answering you needs different chips than a typical laptop.`,
      code: `// Conceptual: CPU vs GPU style of work\nfunction cpuStyleSum(matrix) {\n  // one operation after another\n  let total = 0;\n  for (const row of matrix) for (const val of row) total += val;\n  return total;\n}\n\nfunction gpuStyleSum(matrix) {\n  // conceptually: every value processed "at once" in parallel\n  return matrix.flat().reduce((a, b) => a + b, 0);\n}\n\nconst matrix = [[1,2,3], [4,5,6]];\nconsole.log(cpuStyleSum(matrix), gpuStyleSum(matrix));`,
      language: 'javascript',
      output: `21 21\n(Same result — the real-world difference is in how many operations run simultaneously in hardware.)`,
    },
  ],

  exercises: [
    {
      level: 1, title: 'Identify the components',
      problem: `List the three components data passes through, in order, when a program reads a value from a file and prints it to the screen: ____ → ____ → ____.`,
      hints: ['Think about where the data starts (it\'s not being actively used yet).', 'Think about where calculations happen.', 'The answer order is: Storage → RAM → CPU (then CPU sends output to the screen).'],
      solution: `Storage (the file lives on disk) → RAM (the file's contents are loaded into memory so they can be accessed quickly) → CPU (which processes/reads the values and sends instructions to display them).`,
    },
    {
      level: 2, title: 'Predict the output',
      problem: `Given this tiny simulated CPU loop, what gets printed?\n\nconst mem = ["LOAD 3", "LOAD 4", "ADD"];\nlet stack = [];\nfor (const i of mem) {\n  const [op, v] = i.split(" ");\n  if (op === "LOAD") stack.push(Number(v));\n  if (op === "ADD") stack.push(stack.pop() + stack.pop());\n}\nconsole.log(stack[0]);`,
      hints: ['Walk through the loop instruction by instruction, tracking the stack array.', 'After both LOADs, the stack is [3, 4].', 'ADD pops two values and pushes their sum back.'],
      solution: `7. After "LOAD 3" → stack = [3]. After "LOAD 4" → stack = [3, 4]. "ADD" pops 4 and 3, pushes 7 → stack = [7]. stack[0] is 7.`,
    },
    {
      level: 3, title: 'Spot the memory problem',
      problem: `A function repeatedly pushes large objects into a global array and never removes any of them, and it's called every time the user scrolls. What real-world symptom would you expect, and why?`,
      hints: ['Think about what RAM physically runs out of.', 'Consider what the operating system does when a process asks for more memory than is available.', 'This is the textbook definition of a specific, named bug category.'],
      solution: `This is a memory leak. RAM usage climbs continuously as the array grows and old objects are never freed. Eventually the browser tab (or app) either slows dramatically (excessive memory pressure / swapping) or crashes outright when the OS can't allocate more memory.`,
    },
    {
      level: 4, title: 'Reorder for cache efficiency',
      problem: `Two nested loops sum a 2D array. Version A loops row-by-row (matrix[i][j]); Version B loops column-by-column (matrix[j][i]) for the same matrix. One is typically faster on real hardware due to how data sits in RAM. Which one, and why?`,
      hints: ['Rows are typically stored contiguously in memory in most languages.', 'CPUs pull in nearby memory in chunks ("cache lines") expecting you\'ll use it soon.', 'Accessing memory in the order it\'s laid out avoids wasted cache fetches.'],
      solution: `Version A (row-by-row) is typically faster, because most languages store 2D arrays row-major — each row's elements are contiguous in RAM. Reading row-by-row matches that layout, so the CPU's cache pre-fetching is effective. Column-by-column jumps around memory, causing more cache misses and slower access.`,
    },
    {
      level: 5, title: 'Design a 3-instruction CPU',
      problem: `Extend the tiny simulated CPU from the examples to support a new instruction "SUB" (subtract) in addition to LOAD and ADD. Write the code for the run() function update and show it correctly computing 10 - 3.`,
      hints: ['SUB should behave like ADD but subtract instead.', 'Watch operation order — accumulator should be set first via LOAD, then modified.', 'Test with program [["LOAD", 10], ["SUB", 3], ["STORE", 0], ["PRINT", 0]].'],
      solution: `function run(program) {\n  for (const [op, arg] of program) {\n    if (op === "LOAD") accumulator = arg;\n    if (op === "ADD") accumulator += arg;\n    if (op === "SUB") accumulator -= arg;\n    if (op === "STORE") memoryBank[arg] = accumulator;\n    if (op === "PRINT") console.log("Memory[" + arg + "] =", memoryBank[arg]);\n  }\n}\n// run([["LOAD",10],["SUB",3],["STORE",0],["PRINT",0]]) → Memory[0] = 7`,
    },
    {
      level: 6, title: 'Real-world: explain a slow AI response',
      problem: `A friend says "the AI is being slow today, the servers must be broken." Using the CPU/RAM/storage model, give three distinct, technically plausible reasons unrelated to anything being "broken."`,
      hints: ['Think about queueing: many users sending requests at once.', 'Think about model size vs. available compute (GPU memory and parallel processing capacity).', 'Think about network latency, which is separate from raw compute speed.'],
      solution: `1) High demand: many requests are queued, so the CPU/GPU resources are shared across more work than usual, increasing wait time per request — nothing is broken, it's contention. 2) Model/context size: a longer conversation means more data must be loaded into memory and processed, which takes proportionally more compute time. 3) Network latency: the delay might not be compute at all — it could be the time for data to travel between your device and the server (a "networking," not "computing," bottleneck), which this topic doesn't cover by itself but is a sibling concept (see HTTP/DNS topics).`,
    },
  ],

  interview: [
    {
      q: 'Explain the fetch-decode-execute cycle in your own words.',
      a: `The CPU fetches an instruction from memory, decodes it to figure out what operation it represents and what data it needs, then executes it (performing the calculation or action) — and this repeats continuously, billions of times per second. It's the fundamental loop underlying all computation, regardless of what program is running.`,
    },
    {
      q: 'What is the difference between RAM and storage (disk/SSD), and why does a computer need both?',
      a: `RAM is fast but temporary — it loses its contents when power is lost, and is used for data actively being worked with. Storage (HDD/SSD) is slower but persistent — it keeps data even when powered off, and holds files long-term. Computers need both because persistent storage alone would be too slow for active computation, and RAM alone would lose everything on shutdown.`,
    },
    {
      q: 'Why might a program run fast on a small input but suddenly become slow on a much larger one, even with the "same" code?',
      a: `Beyond algorithmic complexity (covered in Big O), a common physical reason is that small data fits in fast CPU caches, while larger data spills into slower RAM (or even triggers virtual memory swapping to disk), so each access becomes more expensive. The code is the same, but the hardware path the data takes through the memory hierarchy changes.`,
    },
    {
      q: 'What is a memory leak, and how does it relate to RAM?',
      a: `A memory leak happens when a program keeps allocating memory for data it no longer needs but never releases it. Since RAM is finite, the leaked memory accumulates over time, eventually exhausting available RAM and causing slowdowns or crashes. It's a mismatch between what's allocated and what's actually still in use.`,
    },
    {
      q: 'Why do GPUs matter for AI workloads, given what you know about CPUs?',
      a: `CPUs are optimized for executing a small number of complex instruction streams quickly, one after another (with some parallelism). GPUs are optimized for executing massive numbers of simple, identical operations simultaneously — which matches how neural networks compute (huge numbers of matrix multiplications). That structural difference in hardware design, not just raw "speed," is why GPUs dramatically outperform CPUs for training and running AI models.`,
    },
  ],

  realWorld: [
    { company: 'Netflix', text: 'Encodes and streams video by pushing huge amounts of data through CPUs (and specialized hardware decoders) efficiently enough to play smoothly on millions of devices simultaneously.' },
    { company: 'Google', text: 'Search relies on enormous server farms where requests are distributed across thousands of CPUs in parallel, each doing a tiny fraction of the lookup, so results return in a fraction of a second.' },
    { company: 'OpenAI', text: 'Running and training large language models depends on specialized GPU/TPU hardware specifically because of how parallel matrix math maps onto the architecture differences described in this topic.' },
    { company: 'Stripe', text: 'Payment processing systems are engineered around memory and CPU limits per request, so that a flash-sale traffic spike doesn\'t exhaust server resources and cause failed transactions.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does the CPU do in the fetch-decode-execute cycle?', options: ['Stores files permanently', 'Fetches, interprets, and runs instructions', 'Connects to the internet', 'Displays pixels on screen'], correct: 1 },
    { type: 'true-false', q: 'RAM retains its data after the computer loses power.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which is typically fastest to access?', options: ['Hard disk storage', 'CPU cache', 'RAM', 'A USB flash drive'], correct: 1 },
    { type: 'code-output', q: 'What does this log?\n\nlet stack = [];\nstack.push(3); stack.push(4);\nstack.push(stack.pop() + stack.pop());\nconsole.log(stack[0]);', options: ['3', '4', '7', 'undefined'], correct: 2 },
    { type: 'mcq', q: 'A "memory leak" most directly causes a computer to run out of:', options: ['CPU instructions', 'RAM', 'Network bandwidth', 'Screen resolution'], correct: 1 },
    { type: 'true-false', q: 'GPUs are generally better suited than CPUs for the kind of massively parallel math used in AI models.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which best describes "storage" (like an SSD) compared to RAM?', options: ['Faster but temporary', 'Slower but persistent', 'Identical to RAM in every way', 'Only used for video files'], correct: 1 },
    { type: 'drag-drop', q: 'Order these from fastest to slowest to access: [RAM, CPU Cache, Disk Storage]', options: ['CPU Cache', 'RAM', 'Disk Storage'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might looping through a 2D array row-by-row be faster than column-by-column?', options: ['Rows are usually stored contiguously in memory', 'Columns don\'t exist in memory', 'JavaScript only supports row access', 'It is always slower, never faster'], correct: 0 },
    { type: 'code-output', q: 'What does this log?\n\nlet acc = 0;\nacc = 10;\nacc += 5;\nconsole.log(acc);', options: ['10', '5', '15', 'NaN'], correct: 2 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'cpu',
  module: 1,
  title: 'CPU',
  tagline: 'The chip that does the actual "computing" in computer — and why clock speed isn\'t the whole story.',
  readMinutes: 8,

  intro: {
    whatItIs: `The CPU (Central Processing Unit) is the chip that executes instructions: arithmetic, comparisons, and the logic that drives every program. It's organized into "cores," each capable of running its own stream of instructions, and each core runs at a clock speed measured in GHz — billions of cycles per second.`,
    whyItMatters: `When code is described as "CPU-bound," it means the bottleneck is raw computation, not network or disk waiting. Understanding what the CPU actually does helps you reason about why some tasks (video encoding, heavy math, compiling code) are slow no matter how good your internet connection is, while others (loading a webpage) are limited by something else entirely.`,
    whereUsed: `Every process on your machine — your browser tabs, your code editor, background OS tasks — is competing for CPU time. Operating systems use a scheduler to rapidly switch between them, creating the illusion that everything runs "at once."`,
    commonMistakes: `A common mistake is assuming "more GHz = always faster." Clock speed matters, but so does the number of cores, the efficiency of the instruction set, and — critically for AI-assisted coding — whether a task can even be split across multiple cores in the first place (parallelizable) or must run as one sequential chain (serial).`,
  },

  visual: { caption: 'Single-core vs multi-core: how work gets distributed', type: 'cpu-cores-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'A CPU-bound calculation',
      explanation: `Summing numbers in a loop is pure CPU work — no disk, no network, just arithmetic, repeated.`,
      code: `let total = 0;\nfor (let i = 1; i <= 100; i++) {\n  total += i;\n}\nconsole.log(total);`,
      language: 'javascript', output: `5050`,
    },
    {
      difficulty: 'easy', title: 'Measuring CPU time for a task',
      explanation: `performance.now() lets you measure how long a pure-computation task takes — a simple way to "feel" CPU work in code.`,
      code: `const start = performance.now();\nlet sum = 0;\nfor (let i = 0; i < 1_000_000; i++) sum += i;\nconst elapsed = performance.now() - start;\nconsole.log("Sum:", sum, "| Time (ms):", elapsed.toFixed(2));`,
      language: 'javascript', output: `Sum: 499999500000 | Time (ms): 3.20\n(Exact time varies by device — the CPU is doing real work here.)`,
    },
    {
      difficulty: 'medium', title: 'Single-threaded bottleneck',
      explanation: `JavaScript in the browser runs on a single main thread by default. A long-running CPU task blocks everything else — including UI updates — until it finishes. This models that blocking behavior.`,
      code: `function blockFor(iterations) {\n  let x = 0;\n  for (let i = 0; i < iterations; i++) x += Math.sqrt(i);\n  return x;\n}\n\nconsole.log("Starting heavy task...");\nconst result = blockFor(5_000_000);\nconsole.log("Done. Result:", result.toFixed(2));\nconsole.log("Nothing else could run while this was happening.");`,
      language: 'javascript', output: `Starting heavy task...\nDone. Result: 7453559924.85\nNothing else could run while this was happening.`,
    },
    {
      difficulty: 'medium-plus', title: 'Simulating multi-core via async chunking',
      explanation: `True multi-core parallelism isn't available in plain browser JS without Web Workers, but you can simulate splitting work into chunks and yielding control between them — a common technique to avoid freezing the UI, conceptually adjacent to how multiple cores divide work.`,
      code: `function processChunk(arr, start, size) {\n  let sum = 0;\n  for (let i = start; i < start + size && i < arr.length; i++) sum += arr[i];\n  return sum;\n}\n\nconst data = Array.from({ length: 12 }, (_, i) => i + 1);\nconst chunkSize = 4;\nlet totalSum = 0;\n\nfor (let i = 0; i < data.length; i += chunkSize) {\n  totalSum += processChunk(data, i, chunkSize);\n  console.log("Processed chunk starting at", i, "running total:", totalSum);\n}`,
      language: 'javascript', output: `Processed chunk starting at 0 running total: 10\nProcessed chunk starting at 4 running total: 36\nProcessed chunk starting at 8 running total: 78`,
    },
    {
      difficulty: 'hard', title: 'Comparing algorithmic CPU cost, not just code length',
      explanation: `Two functions can look similarly "short" but cost the CPU very different amounts of work. This compares a linear search to a (conceptually) constant-time lookup using a Map, foreshadowing Big O.`,
      code: `const size = 100000;\nconst arr = Array.from({ length: size }, (_, i) => i);\nconst map = new Map(arr.map(v => [v, true]));\n\nfunction linearSearch(target) {\n  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return true;\n  return false;\n}\n\nconst t1 = performance.now();\nlinearSearch(99999);\nconst t2 = performance.now();\nmap.has(99999);\nconst t3 = performance.now();\n\nconsole.log("Linear search:", (t2 - t1).toFixed(3), "ms");\nconsole.log("Map lookup:", (t3 - t2).toFixed(3), "ms");`,
      language: 'javascript', output: `Linear search: 0.842 ms\nMap lookup: 0.004 ms\n(Map lookup stays fast even as size grows — linear search gets worse.)`,
    },
    {
      difficulty: 'real-world', title: 'Why video editing apps show "rendering" progress bars',
      explanation: `Rendering video applies pixel transformations across millions of frames' worth of data — almost pure CPU (and GPU) work. This is why render time scales with video length/resolution and why progress bars exist: the CPU genuinely needs that many cycles, there's no network call to wait on instead.`,
      code: `function renderFrames(frameCount, complexityPerFrame) {\n  let totalOperations = 0;\n  for (let f = 0; f < frameCount; f++) {\n    totalOperations += complexityPerFrame;\n  }\n  return totalOperations;\n}\n\nconst ops = renderFrames(1800, 50000); // 1 min @ 30fps, simplified\nconsole.log("Total simulated operations:", ops.toLocaleString());`,
      language: 'javascript', output: `Total simulated operations: 90,000,000`,
    },
  ],

  exercises: [
    { level: 1, title: 'Define "core"', problem: `In one sentence, explain what a CPU "core" is and why having 8 cores might let a computer do more at once than having 1.`, hints: ['Think of each core as an independent worker.', 'More workers can each handle a separate task simultaneously.'], solution: `A core is an independent processing unit capable of executing its own stream of instructions; with 8 cores, a computer can genuinely run 8 separate streams of work in parallel, instead of rapidly switching between tasks on a single core.` },
    { level: 2, title: 'CPU-bound or not?', problem: `Classify each as CPU-bound or not: (a) compressing a large video file, (b) waiting for a website to respond over a slow connection, (c) calculating a complex math simulation.`, hints: ['CPU-bound means the limiting factor is computation, not waiting on something external.', '(b) is waiting on network, not computing.'], solution: `(a) CPU-bound (compression is heavy computation). (b) Not CPU-bound — it's network-bound, limited by data transfer speed/latency. (c) CPU-bound (pure calculation).` },
    { level: 3, title: 'Predict blocking behavior', problem: `Given a single-threaded environment, what happens to a button click handler if it's triggered while a CPU-heavy loop (taking 3 seconds) is already running?`, hints: ['Single-threaded means one instruction stream at a time.', 'The click event has to wait its turn.'], solution: `The click handler won't run until the CPU-heavy loop finishes, because the single thread is fully occupied. The click event sits in a queue and only fires once the thread is free — this is why long-running synchronous code can make a UI feel "frozen."` },
    { level: 4, title: 'Compare two approaches', problem: `Function A checks if a value exists using arr.includes() on a 1,000,000-item array, repeated 1,000 times. Function B does the same check using a pre-built Set, repeated 1,000 times. Which uses dramatically less CPU time overall, and why?`, hints: ['includes() on an array scans every element until found (or not).', 'A Set has near-constant time lookups regardless of size.'], solution: `Function B is dramatically faster. arr.includes() must potentially scan all 1,000,000 items each time it's called (1,000 × up to 1,000,000 comparisons), while a Set's .has() check is near-constant time per call. The CPU does vastly less total work with the Set.` },
    { level: 5, title: 'Chunk a heavy loop', problem: `Rewrite this CPU-blocking function so it processes the array in chunks of 1000 using setTimeout(..., 0) between chunks, to avoid freezing the UI for too long in one go.\n\nfunction processAll(arr) {\n  let result = [];\n  for (let i = 0; i < arr.length; i++) result.push(arr[i] * 2);\n  return result;\n}`, hints: ['Process a slice, then schedule the next slice with setTimeout.', 'You\'ll need a callback to deliver the final result since this becomes asynchronous.'], solution: `function processAllChunked(arr, onDone) {\n  let result = [];\n  let i = 0;\n  function processChunk() {\n    const end = Math.min(i + 1000, arr.length);\n    for (; i < end; i++) result.push(arr[i] * 2);\n    if (i < arr.length) setTimeout(processChunk, 0);\n    else onDone(result);\n  }\n  processChunk();\n}` },
    { level: 6, title: 'Real-world: explain render farms', problem: `Animation studios use "render farms" — hundreds of machines, each with many CPU cores — to render a single movie. Using what you know about cores and CPU-bound work, explain why this approach makes sense instead of using one very fast single-core machine.`, hints: ['Rendering frames is typically independent: frame 500 doesn\'t need frame 499 to finish first.', 'Independent work distributes well across many cores/machines.'], solution: `Rendering each frame is usually an independent task — frame 500 can be computed without needing frame 499's result. Because the work is "embarrassingly parallel," splitting it across hundreds of machines (each with multiple cores) lets thousands of frames render simultaneously, finishing in a fraction of the time a single fast core would take working through them one by one.` },
  ],

  interview: [
    { q: 'What is a CPU core, and how does having multiple cores change what a computer can do?', a: `A core is an independent execution unit that can run its own instruction stream. Multiple cores allow true parallel execution of multiple tasks (or parts of one task, if it's designed to be parallelized), rather than the appearance of parallelism created by rapidly switching a single core between tasks.` },
    { q: 'What does it mean for a task to be "CPU-bound" versus "I/O-bound"?', a: `CPU-bound means the task's speed is limited by how fast the processor can perform calculations (e.g., video encoding, complex math). I/O-bound means the task spends most of its time waiting on something external — disk reads, network responses — and the CPU is often idle during that wait.` },
    { q: 'Why doesn\'t doubling clock speed always double real-world performance?', a: `Clock speed only measures cycles per second; actual performance also depends on instructions-per-cycle efficiency, how well the task can use multiple cores, memory/cache bottlenecks, and whether the task is even CPU-bound at all. A task limited by network latency, for instance, won't speed up no matter how fast the CPU is.` },
    { q: 'Why can a long-running synchronous function freeze a web page\'s UI?', a: `Browsers run JavaScript on a single main thread by default. If that thread is busy executing a long loop, it can't process other queued work like rendering updates or click handlers until the loop finishes — there's no other core handling the UI in parallel unless work is explicitly offloaded (e.g., to a Web Worker).` },
    { q: 'Why are some problems much harder to speed up with more CPU cores than others?', a: `Adding cores only helps if the work can be split into independent chunks that don\'t depend on each other\'s results. Tasks with strict sequential dependencies (where step 2 needs step 1\'s output) can\'t be meaningfully parallelized, no matter how many cores are available — this is sometimes summarized by Amdahl\'s Law.` },
  ],

  realWorld: [
    { company: 'Netflix', text: 'Transcodes video into many formats/resolutions using heavily CPU/GPU-optimized pipelines distributed across many machines in parallel.' },
    { company: 'Google', text: 'Search ranking and indexing distributes CPU-bound computation across enormous server fleets so no single core becomes a bottleneck for billions of queries.' },
    { company: 'OpenAI', text: 'Model training jobs are scheduled across clusters with thousands of cores/GPUs, since training is CPU/GPU-bound work that benefits enormously from parallelism.' },
    { company: 'Amazon', text: 'During peak shopping events, compute-heavy tasks like recommendation scoring are auto-scaled across additional CPU cores/instances to keep response times stable under load.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What is a CPU core?', options: ['A type of RAM', 'An independent unit that executes instructions', 'A file storage format', 'A network protocol'], correct: 1 },
    { type: 'true-false', q: 'A task limited by waiting on a network response is typically called "CPU-bound."', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Why might doubling CPU clock speed fail to double real performance?', options: ['Clock speed never matters', 'Other factors like memory bottlenecks or non-parallelizable work can limit gains', 'CPUs cannot run faster than 1GHz', 'Clock speed only affects storage'], correct: 1 },
    { type: 'code-output', q: 'What does this log?\n\nlet total = 0;\nfor (let i = 1; i <= 5; i++) total += i;\nconsole.log(total);', options: ['10', '15', '5', '25'], correct: 1 },
    { type: 'mcq', q: 'In a single-threaded environment, what happens to other tasks while a heavy synchronous loop runs?', options: ['They run in parallel automatically', 'They wait until the loop finishes', 'They run on a different core automatically', 'The loop pauses itself'], correct: 1 },
    { type: 'true-false', q: 'A problem with strict sequential dependencies (each step needs the previous result) benefits greatly from adding more CPU cores.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which task is most clearly CPU-bound?', options: ['Waiting for a slow Wi-Fi connection', 'Rendering a complex 3D animation frame', 'Reading a tiny text file from disk', 'Waiting for a user to click a button'], correct: 1 },
    { type: 'drag-drop', q: 'Order these by how parallelizable they typically are, most to least: [Rendering independent video frames, A step-by-step recipe where each step needs the last, Summing items in a giant independent list]', options: ['Rendering independent video frames', 'Summing items in a giant independent list', 'A step-by-step recipe where each step needs the last'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What technique helps avoid freezing a single-threaded UI during heavy computation?', options: ['Increasing screen resolution', 'Breaking work into chunks and yielding control between them', 'Disabling the CPU cache', 'Using more RAM only'], correct: 1 },
    { type: 'code-output', q: 'What does Map.has() generally offer compared to Array.includes() on large arrays?', options: ['Identical performance always', 'Much slower lookups', 'Much faster, near-constant-time lookups', 'It throws an error on large arrays'], correct: 2 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'ram',
  module: 1,
  title: 'RAM',
  tagline: 'Your computer\'s short-term memory — fast, finite, and emptied every time you shut down.',
  readMinutes: 7,

  intro: {
    whatItIs: `RAM (Random Access Memory) is the fast, temporary workspace a computer uses to hold data it's actively working with — open programs, loaded files, variables your code is currently using. It's "random access" because any byte can be read or written directly, without scanning through everything before it.`,
    whyItMatters: `RAM is finite. Every browser tab, every running program, every variable you create takes a slice of it. Understanding RAM explains why opening 40 browser tabs slows your machine down, why "out of memory" errors happen, and why some programs are designed to process huge files in small pieces instead of loading everything at once.`,
    whereUsed: `Every variable in every running program lives in RAM while it's in use. Your code editor, browser, and operating system are all constantly reading from and writing to RAM, dozens of times per second.`,
    commonMistakes: `A common confusion is mixing up RAM with storage capacity ("my laptop has 512GB" usually describes the SSD, not RAM, which is typically much smaller — 8, 16, or 32GB). Another mistake: assuming closing a program instantly frees its RAM — operating systems reclaim it, but it can take a moment, and some "zombie" processes can hang onto memory longer than expected.`,
  },

  visual: { caption: 'What lives in RAM vs. what lives in storage', type: 'ram-storage-compare' },

  examples: [
    { difficulty: 'very-easy', title: 'A variable lives in RAM', explanation: `Every variable you declare is stored in RAM for as long as your program needs it.`, code: `let name = "Ada";\nconsole.log(name);`, language: 'javascript', output: `Ada` },
    { difficulty: 'easy', title: 'Arrays grow by using more RAM', explanation: `Each element added to an array claims a bit more memory. A million-element array uses noticeably more RAM than a 10-element one.`, code: `const small = [1, 2, 3];\nconst large = new Array(1_000_000).fill(0);\nconsole.log("Small length:", small.length);\nconsole.log("Large length:", large.length);`, language: 'javascript', output: `Small length: 3\nLarge length: 1000000` },
    { difficulty: 'medium', title: 'Releasing references so memory can be freed', explanation: `JavaScript automatically frees memory via garbage collection, but only once nothing references the data anymore. Setting a variable to null removes your program's reference, making that memory eligible for cleanup.`, code: `let bigData = new Array(1_000_000).fill("data");\nconsole.log("Before:", bigData.length);\nbigData = null; // no longer referenced — eligible for garbage collection\nconsole.log("After:", bigData);`, language: 'javascript', output: `Before: 1000000\nAfter: null` },
    { difficulty: 'medium-plus', title: 'Streaming vs. loading everything into RAM', explanation: `Processing a large dataset line-by-line uses far less RAM than loading the entire thing into one array first. This models the difference conceptually.`, code: `function processAllAtOnce(lines) {\n  const loaded = lines.map(l => l.toUpperCase()); // all in RAM at once\n  return loaded.length;\n}\n\nfunction processStreamed(lines) {\n  let count = 0;\n  for (const line of lines) {\n    const processed = line.toUpperCase(); // only one line in RAM at a time\n    count++;\n  }\n  return count;\n}\n\nconst lines = ["a", "b", "c"];\nconsole.log(processAllAtOnce(lines), processStreamed(lines));`, language: 'javascript', output: `3 3\n(Same result, but processStreamed never holds the full transformed dataset in RAM simultaneously.)` },
    { difficulty: 'hard', title: 'Simulating a simple LRU-style memory cap', explanation: `Real systems often cap how much they hold in fast memory and evict the oldest data when full — a simplified "least recently used" cache. This caps a Map at a fixed size.`, code: `class TinyCache {\n  constructor(limit) { this.limit = limit; this.map = new Map(); }\n  set(key, value) {\n    if (this.map.size >= this.limit) {\n      const oldestKey = this.map.keys().next().value;\n      this.map.delete(oldestKey); // evict oldest\n    }\n    this.map.set(key, value);\n  }\n}\n\nconst cache = new TinyCache(2);\ncache.set("a", 1);\ncache.set("b", 2);\ncache.set("c", 3); // evicts "a"\nconsole.log([...cache.map.keys()]);`, language: 'javascript', output: `[ 'b', 'c' ]` },
    { difficulty: 'real-world', title: 'Why "Save your work" still matters', explanation: `Anything only in RAM disappears on crash or power loss, because RAM is volatile. This is why apps autosave to disk/storage — moving data from temporary RAM to persistent storage protects it.`, code: `let documentContent = "Unsaved draft...";\n// Autosave simulation: periodically copy RAM content to "storage"\nfunction autosave(content) {\n  console.log("Saved to disk:", content);\n}\nautosave(documentContent);\ndocumentContent = "More edits..."; // RAM updates, but old save is already safe on disk`, language: 'javascript', output: `Saved to disk: Unsaved draft...` },
  ],

  exercises: [
    { level: 1, title: 'RAM vs storage', problem: `Explain in one sentence why a computer with 16GB of RAM but a 1TB SSD has "more storage than memory," and why that's normal.`, hints: ['RAM and storage serve different purposes.', 'Storage holds everything long-term; RAM only holds what\'s active right now.'], solution: `RAM only needs to hold what's actively being used at any moment, so it can be much smaller than storage, which has to hold every file you own permanently — this size difference (RAM smaller, storage larger) is the normal, expected design.` },
    { level: 2, title: 'Predict what happens on power loss', problem: `You're editing a document and haven't clicked save. The power goes out. What happens to your edits, and why?`, hints: ['Think about which component is volatile.', 'Unsaved edits exist only in RAM until written to storage.'], solution: `The unsaved edits are lost, because they existed only in RAM, which is volatile and loses all its contents when power is cut. Only the last saved version on disk (storage) survives, since storage is persistent.` },
    { level: 3, title: 'Spot the inefficiency', problem: `A program loads an entire 10GB log file into one array before searching for a single line. What's the RAM-related problem with this approach, and what's a better strategy?`, hints: ['Consider how much RAM the array alone would require.', 'Processing line-by-line avoids holding everything at once.'], solution: `Loading 10GB into RAM at once may exceed available memory or use far more than necessary, especially if the search only needs to inspect one line at a time. A better strategy is streaming: read and check the file line-by-line (or in chunks), keeping memory usage roughly constant regardless of file size.` },
    { level: 4, title: 'Trace a reference release', problem: `let data = [1,2,3,4,5];\nlet ref = data;\ndata = null;\nconsole.log(ref);\n\nWill ref still work after data is set to null? Why?`, hints: ['Setting one variable to null doesn\'t affect other variables pointing to the same data.', 'Garbage collection only frees memory when nothing references it.'], solution: `Yes, ref still works and logs [1, 2, 3, 4, 5]. Setting data to null only removes that one reference; ref still points to the same array in memory, so it remains accessible and isn't garbage collected.` },
    { level: 5, title: 'Build a size-capped cache', problem: `Using the TinyCache pattern from the examples, write a version that also supports a get(key) method, and demonstrate that an evicted key returns undefined.`, hints: ['get should just delegate to the underlying Map.', 'After eviction, the Map no longer has that key.'], solution: `class TinyCache {\n  constructor(limit) { this.limit = limit; this.map = new Map(); }\n  set(key, value) {\n    if (this.map.size >= this.limit) {\n      const oldestKey = this.map.keys().next().value;\n      this.map.delete(oldestKey);\n    }\n    this.map.set(key, value);\n  }\n  get(key) { return this.map.get(key); }\n}\nconst c = new TinyCache(2);\nc.set("a", 1); c.set("b", 2); c.set("c", 3);\nconsole.log(c.get("a")); // undefined — evicted` },
    { level: 6, title: 'Real-world: explain browser tab limits', problem: `A user complains their laptop with 8GB RAM "can't handle" 60 open browser tabs. Using what you know about RAM, explain what's likely happening and one practical mitigation.`, hints: ['Each tab typically reserves its own chunk of RAM.', 'Total demand can exceed what\'s physically available.'], solution: `Each open tab generally reserves its own slice of RAM for its page content, scripts, and rendering state. With 60 tabs, the cumulative RAM demand can exceed the 8GB physically available, forcing the OS to swap data to slower disk storage or kill background tabs — both of which cause noticeable slowdowns. A practical mitigation is closing unused tabs or using a tab-suspending extension that frees RAM for inactive tabs.` },
  ],

  interview: [
    { q: 'What is RAM, and why is it described as "volatile"?', a: `RAM is fast, temporary memory used to hold actively-used data. It's volatile because its contents are lost when power is cut — unlike storage, which persists data without power.` },
    { q: 'Why can\'t a computer just use a huge amount of storage instead of RAM?', a: `Storage (especially traditional HDDs, and even SSDs to a lesser degree) is dramatically slower to read/write than RAM. If a CPU had to wait on storage speed for every operation, performance would collapse. RAM exists specifically because active computation needs much faster access than storage can provide.` },
    { q: 'What happens when a program tries to use more RAM than is physically available?', a: `Depending on the OS, it may use "virtual memory," swapping some data temporarily to disk to free up RAM — which is much slower — or, if no relief is available, the OS may terminate the process (an "out of memory" error) to protect overall system stability.` },
    { q: 'How does garbage collection relate to RAM management?', a: `Garbage collection is an automatic process (in languages like JavaScript, Python, Java) that frees RAM occupied by data no longer referenced by the running program, so that memory can be reused — removing the need for manual memory management in most everyday code.` },
    { q: 'Why might "streaming" a large file be better than loading it entirely into RAM?', a: `Streaming processes data in small chunks, keeping RAM usage roughly constant regardless of total file size. Loading everything at once requires RAM proportional to the entire file, which can exceed available memory for very large files and is often unnecessary if the task doesn't need the whole file simultaneously.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Chrome\'s multi-process architecture allocates separate RAM per tab for stability and security, which is why tab count directly affects total memory usage.' },
    { company: 'Netflix', text: 'Streaming video is designed to buffer only a small window of upcoming content in RAM rather than loading an entire movie at once, keeping memory use low regardless of video length.' },
    { company: 'Amazon', text: 'Database caching layers keep frequently-accessed data in RAM (rather than re-reading from disk) to serve product pages and search results with minimal latency.' },
    { company: 'OpenAI', text: 'Serving large language models requires holding massive parameter sets in fast memory (RAM/VRAM) simultaneously, which is a major factor in why running big models requires specialized, memory-rich hardware.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does it mean that RAM is "volatile"?', options: ['It is unreliable', 'Its contents are lost when power is cut', 'It can catch fire', 'It only works with certain CPUs'], correct: 1 },
    { type: 'true-false', q: 'Storage (like an SSD) is generally faster to access than RAM.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What commonly happens when a program needs more RAM than is available?', options: ['The CPU speeds up automatically', 'The OS may use slower virtual memory or terminate the process', 'RAM expands automatically forever', 'Nothing — RAM has no limit'], correct: 1 },
    { type: 'code-output', q: 'let data = [1,2,3];\nlet ref = data;\ndata = null;\nconsole.log(ref);\n\nWhat is logged?', options: ['null', '[1, 2, 3]', 'undefined', 'An error'], correct: 1 },
    { type: 'mcq', q: 'Why is "streaming" a large file often better than loading it fully into RAM?', options: ['It uses less RAM by processing in small chunks', 'It is always slower', 'It only works for video files', 'It removes the need for a CPU'], correct: 0 },
    { type: 'true-false', q: 'Closing a program always instantly frees 100% of its RAM with zero delay.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is garbage collection?', options: ['Deleting files from storage', 'Automatically freeing RAM no longer referenced by the program', 'A type of CPU instruction', 'A network security feature'], correct: 1 },
    { type: 'drag-drop', q: 'Order from most temporary to most permanent: [CPU Register, RAM, Disk Storage]', options: ['CPU Register', 'RAM', 'Disk Storage'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'A laptop has 16GB RAM and a 1TB SSD. What does this most likely mean?', options: ['The laptop is broken', 'Normal — storage is typically much larger than RAM', 'RAM and SSD are the same thing here', 'The SSD is actually the RAM'], correct: 1 },
    { type: 'code-output', q: 'const cache = new Map();\ncache.set("a", 1);\ncache.delete("a");\nconsole.log(cache.get("a"));\n\nWhat is logged?', options: ['1', 'null', 'undefined', 'an error'], correct: 2 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'storage',
  module: 1,
  title: 'Storage',
  tagline: 'Where your files live when the power is off — and why SSDs changed everything.',
  readMinutes: 7,

  intro: {
    whatItIs: `Storage (HDDs and SSDs) is persistent memory — data written here survives power loss, unlike RAM. Hard Disk Drives (HDDs) use spinning magnetic platters; Solid State Drives (SSDs) use flash memory chips with no moving parts, making them dramatically faster and more durable.`,
    whyItMatters: `Storage speed and capacity shape real product decisions: how fast an app launches, how big a video game install is, why databases are engineered around minimizing disk reads. "Disk I/O" (input/output) is a classic performance bottleneck distinct from CPU or RAM limits.`,
    whereUsed: `Every file you save, every installed application, every database table on a server lives in storage. Cloud services like Google Drive or Dropbox are, underneath, just storage on someone else's server that you access over a network.`,
    commonMistakes: `Beginners sometimes assume storage and RAM are interchangeable terms ("memory"). They're related but distinct: RAM is fast and temporary, storage is slower but persistent. Mixing them up makes troubleshooting confusing — "my computer has no memory left" could mean either, and the fix is different for each.`,
  },

  visual: { caption: 'HDD vs SSD: how data is physically stored and accessed', type: 'storage-types-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'Writing data conceptually to storage', explanation: `Saving a file is the act of writing data from RAM to persistent storage so it survives after the program closes.`, code: `const fileContents = "Hello, this is saved data.";\n// Simulated "save" operation\nfunction saveToStorage(filename, contents) {\n  console.log("Saved", filename, "with", contents.length, "characters.");\n}\nsaveToStorage("notes.txt", fileContents);`, language: 'javascript', output: `Saved notes.txt with 27 characters.` },
    { difficulty: 'easy', title: 'Storage persists, variables don\'t', explanation: `This models the difference: a "storage" object survives across function calls and would (conceptually) survive even after the program restarts, while a local variable would not.`, code: `const persistentStorage = {};\n\nfunction saveSetting(key, value) {\n  persistentStorage[key] = value;\n}\n\nsaveSetting("theme", "dark");\nconsole.log(persistentStorage);`, language: 'javascript', output: `{ theme: 'dark' }` },
    { difficulty: 'medium', title: 'Why sequential reads are faster than random reads on HDDs', explanation: `Spinning-disk HDDs must physically move a read head, so sequential data (stored together) reads faster than scattered data. SSDs don't have this physical constraint as strongly. This models the access pattern difference conceptually.`, code: `function simulateSequentialRead(blocks) {\n  return blocks.reduce((sum, b) => sum + b, 0); // reads in order\n}\n\nfunction simulateRandomRead(blocks, order) {\n  let sum = 0;\n  for (const i of order) sum += blocks[i]; // reads out of order\n  return sum;\n}\n\nconst blocks = [10, 20, 30, 40];\nconsole.log(simulateSequentialRead(blocks));\nconsole.log(simulateRandomRead(blocks, [3, 0, 2, 1]));`, language: 'javascript', output: `100\n100\n(Same total — but on real HDD hardware, the random-order version would take physically longer due to head movement.)` },
    { difficulty: 'medium-plus', title: 'Modeling a simple key-value file store', explanation: `Databases and file systems are, at their core, organized ways to store and retrieve data on disk. This builds a minimal key-value store backed by a plain object, standing in for disk-backed storage.`, code: `class SimpleStore {\n  constructor() { this.data = {}; }\n  write(key, value) { this.data[key] = value; return true; }\n  read(key) { return this.data[key]; }\n  delete(key) { delete this.data[key]; }\n}\n\nconst store = new SimpleStore();\nstore.write("user:1", { name: "Ada" });\nconsole.log(store.read("user:1"));\nstore.delete("user:1");\nconsole.log(store.read("user:1"));`, language: 'javascript', output: `{ name: 'Ada' }\nundefined` },
    { difficulty: 'hard', title: 'Simulating storage capacity limits', explanation: `Storage isn't infinite — writes should fail gracefully once a capacity limit is reached, similar to a real "disk full" error.`, code: `class CappedStore {\n  constructor(maxBytes) { this.maxBytes = maxBytes; this.usedBytes = 0; this.files = {}; }\n  write(name, sizeInBytes) {\n    if (this.usedBytes + sizeInBytes > this.maxBytes) {\n      throw new Error("Disk full: cannot write " + name);\n    }\n    this.files[name] = sizeInBytes;\n    this.usedBytes += sizeInBytes;\n  }\n}\n\nconst disk = new CappedStore(100);\ndisk.write("a.txt", 60);\ntry {\n  disk.write("b.txt", 50);\n} catch (e) {\n  console.log(e.message);\n}\nconsole.log("Used:", disk.usedBytes, "/", disk.maxBytes);`, language: 'javascript', output: `Disk full: cannot write b.txt\nUsed: 60 / 100` },
    { difficulty: 'real-world', title: 'Why databases are engineered around disk I/O', explanation: `Reading from disk is one of the slowest operations a server performs relative to RAM/CPU work. Database engines like PostgreSQL invest heavily in minimizing disk reads via caching and indexing — concepts covered in the Databases module — precisely because storage access is comparatively expensive.`, code: `// Conceptual: caching avoids repeated slow disk reads\nconst diskReadLog = [];\nconst cache = new Map();\n\nfunction readRecord(id) {\n  if (cache.has(id)) return cache.get(id); // fast, no disk read\n  diskReadLog.push(id); // simulate slow disk read\n  const value = "record-" + id;\n  cache.set(id, value);\n  return value;\n}\n\nreadRecord(1); readRecord(1); readRecord(2);\nconsole.log("Disk reads performed:", diskReadLog.length);`, language: 'javascript', output: `Disk reads performed: 2` },
  ],

  exercises: [
    { level: 1, title: 'RAM vs storage recap', problem: `Quick recall: which of RAM or storage loses its data when the power is cut?`, hints: ['Think "volatile."'], solution: `RAM loses its data when power is cut. Storage (HDD/SSD) is persistent and retains data without power.` },
    { level: 2, title: 'Sequential vs random access', problem: `Why might copying one large 5GB file be faster than copying five thousand small 1MB files on a spinning HDD, even though the total data size is the same?`, hints: ['Think about the read head\'s physical movement.', 'Many small files often means more scattered locations on disk.'], solution: `A single large file is more likely to be stored as one (or few) contiguous block(s), letting the HDD read head move minimally. Thousands of small files may be scattered across the disk, forcing the head to jump around far more — adding significant overhead even though total bytes transferred is the same.` },
    { level: 3, title: 'Identify the bottleneck', problem: `A web app feels instant when navigating cached pages but noticeably slower the first time it loads new data from the database. What storage-related concept explains this?`, hints: ['Consider what "cached" implies about where the data was read from the second time.', 'Disk reads are typically much slower than RAM reads.'], solution: `The first load likely required a disk read (slow), while the cached version was served from RAM (fast) on subsequent visits. This demonstrates the general principle that minimizing disk I/O by caching in RAM dramatically improves perceived performance.` },
    { level: 4, title: 'Design a capacity check', problem: `Extend the CappedStore class from the examples with a method remainingSpace() that returns how many bytes are left before the disk is full.`, hints: ['It\'s simply maxBytes minus usedBytes.'], solution: `class CappedStore {\n  constructor(maxBytes) { this.maxBytes = maxBytes; this.usedBytes = 0; this.files = {}; }\n  write(name, sizeInBytes) {\n    if (this.usedBytes + sizeInBytes > this.maxBytes) throw new Error("Disk full");\n    this.files[name] = sizeInBytes;\n    this.usedBytes += sizeInBytes;\n  }\n  remainingSpace() { return this.maxBytes - this.usedBytes; }\n}` },
    { level: 5, title: 'Trace a cache-backed store', problem: `Using the readRecord caching pattern from the examples, predict the output of: readRecord(5); readRecord(6); readRecord(5); readRecord(5); console.log(diskReadLog.length);`, hints: ['Only uncached IDs trigger a "disk read."', 'Track which IDs have been seen before.'], solution: `2. readRecord(5) → disk read (cache miss), readRecord(6) → disk read (cache miss), readRecord(5) → cache hit, readRecord(5) → cache hit again. Total disk reads logged: 2.` },
    { level: 6, title: 'Real-world: explain SSD vs HDD pricing tradeoffs', problem: `Cloud providers often offer both SSD-backed and HDD-backed storage tiers, with SSDs costing more per GB. Explain why a company might still choose the cheaper HDD tier for some data.`, hints: ['Think about access frequency — not all data needs to be read quickly or often.', 'Cost-per-GB matters a lot for rarely-accessed data ("cold storage").'], solution: `For data that's rarely accessed — backups, archives, logs older than a year — the speed advantage of SSDs isn't valuable, since the data is read infrequently anyway. Choosing cheaper HDD (or even slower archival) storage for this "cold" data significantly reduces cost without meaningfully hurting performance, reserving fast/expensive SSD storage for actively-used ("hot") data.` },
  ],

  interview: [
    { q: 'What is the key functional difference between RAM and storage?', a: `RAM is fast but volatile (loses data on power loss) and used for active computation. Storage (HDD/SSD) is slower but persistent, retaining data without power — used for long-term file storage.` },
    { q: 'Why are SSDs generally faster than traditional HDDs?', a: `SSDs use flash memory chips with no moving parts, allowing near-instant random access to any location. HDDs use spinning magnetic platters and a physically moving read/write head, which introduces mechanical delay, especially for non-sequential ("random") access patterns.` },
    { q: 'What is "disk I/O," and why is it often a performance bottleneck?', a: `Disk I/O refers to reading from or writing to storage. It's often a bottleneck because storage access — even on fast SSDs — is typically much slower than RAM access or CPU computation, so systems that read/write disk frequently can be limited by storage speed rather than processing power.` },
    { q: 'Why do databases use caching to reduce disk reads?', a: `Because disk reads are comparatively slow, repeatedly reading the same data from disk wastes time. Caching keeps frequently-accessed data in RAM, so subsequent requests for the same data can be served almost instantly instead of triggering another slow disk read.` },
    { q: 'Why might a company choose slower, cheaper storage for some of its data?', a: `Not all data needs fast access. Rarely-used data (archives, old backups) can be stored on cheaper, slower storage tiers without a meaningful user-facing performance cost, saving significant money compared to keeping everything on premium fast storage.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Google Drive stores user files on managed, redundant storage infrastructure designed so data survives individual disk failures without loss.' },
    { company: 'Netflix', text: 'Maintains tiered storage: actively-watched content sits on fast storage close to users (via CDNs), while older catalog titles can live on more cost-efficient storage tiers.' },
    { company: 'Amazon', text: 'AWS offers multiple storage classes (e.g., frequently-accessed vs. archival) explicitly so customers can trade cost against access speed depending on how often data is actually read.' },
    { company: 'Stripe', text: 'Transaction records must be durably persisted to storage (not just RAM) immediately, since losing payment data due to a crash would be unacceptable — durability here is a core reliability requirement.' },
  ],

  quiz: [
    { type: 'mcq', q: 'Which best describes storage (HDD/SSD) compared to RAM?', options: ['Faster but temporary', 'Slower but persistent', 'Identical to RAM', 'Only used for photos'], correct: 1 },
    { type: 'true-false', q: 'SSDs have moving mechanical parts like HDDs.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is "disk I/O"?', options: ['A type of CPU instruction', 'Reading/writing data to storage', 'A network protocol', 'A programming language feature'], correct: 1 },
    { type: 'code-output', q: 'const store = {};\nstore["a"] = 1;\ndelete store["a"];\nconsole.log(store["a"]);\n\nWhat is logged?', options: ['1', 'null', 'undefined', 'error'], correct: 2 },
    { type: 'mcq', q: 'Why is copying one large file often faster than copying many tiny files of equal total size on an HDD?', options: ['Large files are magic', 'Less physical read-head movement is typically needed', 'Small files are always corrupted', 'HDDs cannot read small files'], correct: 1 },
    { type: 'true-false', q: 'Caching frequently-read data in RAM can reduce slow disk reads.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which is true of "cold storage" tiers offered by cloud providers?', options: ['They are the most expensive option', 'They trade slower access for lower cost, suited to rarely-used data', 'They have no use case', 'They are faster than RAM'], correct: 1 },
    { type: 'drag-drop', q: 'Order from typically fastest to slowest: [RAM, SSD, Traditional HDD]', options: ['RAM', 'SSD', 'Traditional HDD'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What happens when storage capacity is exceeded and a write is attempted?', options: ['It always succeeds anyway', 'The write typically fails (e.g., "disk full" error)', 'RAM automatically expands to compensate', 'The CPU clock speed increases'], correct: 1 },
    { type: 'code-output', q: 'class S { constructor(){this.d={};} write(k,v){this.d[k]=v;} read(k){return this.d[k];} }\nconst s = new S();\ns.write("x", 5);\nconsole.log(s.read("x"));\n\nWhat is logged?', options: ['undefined', '5', 'null', 'an error'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'operating-systems',
  module: 1,
  title: 'Operating Systems',
  tagline: 'The software that manages every other piece of software — and decides who gets the CPU next.',
  readMinutes: 8,

  intro: {
    whatItIs: `An Operating System (OS) — Windows, macOS, Linux, Android, iOS — is the software layer that manages hardware resources (CPU, RAM, storage, devices) and provides services every other program relies on: running multiple programs at once, handling files, managing memory, and providing security boundaries between processes.`,
    whyItMatters: `When you run a program, install software, or get a "permission denied" error, you're interacting with the OS's rules. Understanding processes, scheduling, and permissions explains a huge amount of "why did this break" moments when coding — especially with command-line tools, file paths, and background services.`,
    whereUsed: `Every device you use runs an OS. Servers running websites and AI models run server operating systems (commonly Linux) that manage thousands of processes simultaneously, scheduling CPU time and memory across all of them fairly.`,
    commonMistakes: `Beginners sometimes think the OS is "just the desktop with icons." The visible interface is only a thin layer; the OS's real job — process scheduling, memory management, file systems, security — runs invisibly underneath everything, all the time.`,
  },

  visual: { caption: 'How the OS sits between hardware and every running program', type: 'os-layers-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'Listing what a "process" conceptually is', explanation: `A process is a running instance of a program. Opening the same app twice (e.g., two browser windows) can create multiple processes.`, code: `const processes = ["Browser", "Code Editor", "Music Player"];\nprocesses.forEach((p, i) => console.log("PID " + (1000 + i) + ":", p));`, language: 'javascript', output: `PID 1000: Browser\nPID 1001: Code Editor\nPID 1002: Music Player` },
    { difficulty: 'easy', title: 'Simulating round-robin scheduling', explanation: `One simple OS scheduling strategy gives each process a small time slice in turn. This loops through "processes" giving each a turn, similar in spirit to round-robin scheduling.`, code: `const queue = ["A", "B", "C"];\nfor (let round = 1; round <= 2; round++) {\n  for (const process of queue) {\n    console.log("Round", round, "- running:", process);\n  }\n}`, language: 'javascript', output: `Round 1 - running: A\nRound 1 - running: B\nRound 1 - running: C\nRound 2 - running: A\nRound 2 - running: B\nRound 2 - running: C` },
    { difficulty: 'medium', title: 'Modeling file permissions', explanation: `Operating systems restrict which users/processes can read, write, or execute a file. This models a simplified permission check.`, code: `const filePermissions = { owner: "alice", canRead: ["alice", "bob"], canWrite: ["alice"] };\n\nfunction tryWrite(user) {\n  if (filePermissions.canWrite.includes(user)) {\n    return user + " can write to the file.";\n  }\n  return user + " was denied write access.";\n}\n\nconsole.log(tryWrite("alice"));\nconsole.log(tryWrite("bob"));`, language: 'javascript', output: `alice can write to the file.\nbob was denied write access.` },
    { difficulty: 'medium-plus', title: 'Simulating a simple process scheduler with priorities', explanation: `Real OS schedulers often weigh priority, not just round-robin fairness. This sorts a queue of tasks by priority before "running" them, a simplified priority scheduler.`, code: `const tasks = [\n  { name: "background-sync", priority: 1 },\n  { name: "user-click-response", priority: 5 },\n  { name: "log-cleanup", priority: 2 },\n];\n\nconst scheduled = [...tasks].sort((a, b) => b.priority - a.priority);\nscheduled.forEach(t => console.log("Running:", t.name, "(priority " + t.priority + ")"));`, language: 'javascript', output: `Running: user-click-response (priority 5)\nRunning: log-cleanup (priority 2)\nRunning: background-sync (priority 1)` },
    { difficulty: 'hard', title: 'Detecting a deadlock-like condition', explanation: `A deadlock occurs when two processes each wait on a resource the other holds, and neither can proceed. This models detecting that circular-wait condition.`, code: `const locks = { fileA: "process1", fileB: "process2" };\nconst waitingFor = { process1: "fileB", process2: "fileA" };\n\nfunction detectDeadlock(locks, waitingFor) {\n  for (const proc in waitingFor) {\n    const neededFile = waitingFor[proc];\n    const holder = locks[neededFile];\n    if (waitingFor[holder] && locks[waitingFor[holder]] === proc) {\n      return true; // circular wait\n    }\n  }\n  return false;\n}\n\nconsole.log("Deadlock detected:", detectDeadlock(locks, waitingFor));`, language: 'javascript', output: `Deadlock detected: true` },
    { difficulty: 'real-world', title: 'Why containers (like Docker) exist', explanation: `Cloud platforms run many isolated applications on shared hardware using OS-level process/resource isolation — the foundation containers are built on. This models the isolation concept: each "container" gets its own restricted view of resources.`, code: `function createContainer(name, memoryLimitMB) {\n  return { name, memoryLimitMB, usedMB: 0,\n    allocate(mb) {\n      if (this.usedMB + mb > this.memoryLimitMB) throw new Error(name + ": memory limit exceeded");\n      this.usedMB += mb;\n    }\n  };\n}\n\nconst webApp = createContainer("web-app", 512);\nwebApp.allocate(300);\nconsole.log(webApp.name, "using", webApp.usedMB, "MB of", webApp.memoryLimitMB, "MB");`, language: 'javascript', output: `web-app using 300 MB of 512 MB` },
  ],

  exercises: [
    { level: 1, title: 'Define "process"', problem: `In one sentence, define what an OS "process" is, and give an example of opening two processes from the same app.`, hints: ['A process is a running instance of a program.', 'Two browser windows can be two separate processes.'], solution: `A process is a running instance of a program, with its own allocated memory and resources; opening two separate browser windows can create two distinct browser processes, each tracked independently by the OS.` },
    { level: 2, title: 'Predict scheduler output', problem: `Using round-robin scheduling across processes ["X", "Y"] for 3 rounds, write out the full order in which they'd run.`, hints: ['Each round gives every process one turn, in order.'], solution: `Round 1: X, Y. Round 2: X, Y. Round 3: X, Y. Full order: X, Y, X, Y, X, Y.` },
    { level: 3, title: 'Diagnose a permission error', problem: `A script fails with "permission denied" when trying to write to a file. Using the OS permissions model, what are two distinct likely causes?`, hints: ['Consider which user is running the script.', 'Consider the file\'s actual write permissions/ownership.'], solution: `1) The user/process running the script isn't included in the file's "can write" list (insufficient permissions). 2) The file (or its containing folder) may be marked read-only at the OS level for all users, regardless of who's asking.` },
    { level: 4, title: 'Explain priority inversion risk', problem: `Using the priority-scheduling example, what could go wrong if a low-priority task is holding a resource that a high-priority task urgently needs?`, hints: ['The high-priority task may have to wait even though it "should" run first.', 'This scenario has a real name in OS theory.'], solution: `This is called priority inversion: the high-priority task gets blocked waiting on a resource held by a lower-priority task, effectively negating the benefit of its higher priority until the low-priority task releases the resource. OS schedulers sometimes use special techniques (priority inheritance) to mitigate this.` },
    { level: 5, title: 'Write a deadlock checker for 3 processes', problem: `Extend the deadlock detection logic conceptually to explain (in words, not necessarily code) how you'd check for a 3-process circular wait: P1 waits for P2's resource, P2 waits for P3's resource, P3 waits for P1's resource.`, hints: ['Follow the chain of "waiting for" relationships.', 'If following the chain leads back to where you started, it\'s circular.'], solution: `Starting at P1, follow who it's waiting on (P2), then who P2 is waiting on (P3), then who P3 is waiting on (P1). Since the chain returns to the starting process (P1), this is a circular wait — a deadlock. The general algorithm: walk the "waiting for" chain from each process and check if it ever loops back to the start.` },
    { level: 6, title: 'Real-world: explain why containers improved deployment', problem: `Before containers, companies often said "it works on my machine but not in production." Using the OS/process isolation concepts in this topic, explain why containers reduced this problem.`, hints: ['Containers package an app with its own consistent environment.', 'This avoids relying on whatever happens to be installed on the host OS.'], solution: `Containers bundle an application together with its exact dependencies and a consistent slice of OS-level resources, isolated from whatever else is installed on the host machine. This means the same container runs identically on a developer's laptop and in production, removing the "different environment" variable that caused "works on my machine" bugs — because the OS-level environment inside the container is standardized.` },
  ],

  interview: [
    { q: 'What is the primary job of an operating system?', a: `To manage hardware resources (CPU, RAM, storage, I/O devices) and provide a consistent set of services — process scheduling, memory management, file systems, security — that other software relies on, without each application needing to manage hardware directly.` },
    { q: 'What is the difference between a process and a thread?', a: `A process is an independent running instance of a program with its own memory space. A thread is a smaller unit of execution within a process; multiple threads in the same process share that process's memory space, allowing them to communicate more easily but also requiring more careful coordination to avoid conflicts.` },
    { q: 'What is a deadlock, and why is it problematic?', a: `A deadlock occurs when two or more processes are each waiting on a resource the other holds, creating a circular dependency where none can proceed. It's problematic because the involved processes freeze indefinitely unless something external intervenes (e.g., the OS forcibly terminates one of them).` },
    { q: 'How does an OS prevent one program from corrupting another program\'s memory?', a: `Through memory isolation: each process is given its own virtual address space by the OS, and one process generally cannot directly read or write another process's memory unless explicitly allowed (e.g., through OS-provided inter-process communication mechanisms). This isolation is a core security and stability feature.` },
    { q: 'Why might a high-priority task sometimes wait a long time before running, despite scheduling being "priority-based"?', a: `If the high-priority task depends on a resource currently held by a lower-priority task (priority inversion), it must wait for that resource regardless of its own priority. Schedulers need specific strategies, like priority inheritance, to address this case.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Android is built on a modified Linux kernel, relying on standard OS concepts (process isolation, permissions) to sandbox each app from others on the device.' },
    { company: 'Amazon', text: 'AWS EC2 instances run guest operating systems on top of a hypervisor, using OS-level virtualization concepts to let many customers safely share underlying physical hardware.' },
    { company: 'Netflix', text: 'Runs services in containers orchestrated across thousands of servers, relying on OS process/resource isolation to keep services from interfering with each other on shared machines.' },
    { company: 'OpenAI', text: 'Training infrastructure relies on OS-level resource scheduling and isolation to share GPU clusters safely and efficiently across many simultaneous training and inference jobs.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What is the main job of an operating system?', options: ['Only displaying icons on the desktop', 'Managing hardware resources and providing core services to programs', 'Only running web browsers', 'Connecting to the internet exclusively'], correct: 1 },
    { type: 'true-false', q: 'A process and a thread are exactly the same thing.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is a deadlock?', options: ['A fast CPU mode', 'A circular wait where processes block each other indefinitely', 'A type of file permission', 'A network timeout'], correct: 1 },
    { type: 'code-output', q: 'const perms = { canWrite: ["alice"] };\nconsole.log(perms.canWrite.includes("bob"));\n\nWhat is logged?', options: ['true', 'false', 'undefined', 'an error'], correct: 1 },
    { type: 'mcq', q: 'What does memory isolation between processes primarily protect against?', options: ['Slow CPUs', 'One process corrupting another\'s memory', 'Running out of disk space', 'Slow internet speeds'], correct: 1 },
    { type: 'true-false', q: 'Priority inversion can cause a high-priority task to wait on a lower-priority task.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What concept do containers (like Docker) rely on at the OS level?', options: ['Faster RAM only', 'Process and resource isolation', 'Bigger hard drives', 'Disabling the CPU cache'], correct: 1 },
    { type: 'drag-drop', q: 'Order from broadest to narrowest scope: [Operating System, Process, Thread]', options: ['Operating System', 'Process', 'Thread'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Round-robin scheduling primarily aims to:', options: ['Give every process a fair turn at CPU time', 'Permanently favor one process', 'Disable multitasking', 'Only run the newest process'], correct: 0 },
    { type: 'code-output', q: 'const tasks = [{p:1},{p:5},{p:2}];\nconst sorted = [...tasks].sort((a,b)=>b.p-a.p);\nconsole.log(sorted[0].p);\n\nWhat is logged?', options: ['1', '2', '5', 'undefined'], correct: 2 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'command-line',
  module: 1,
  title: 'Command Line',
  tagline: 'Talking to your computer directly with text — the interface every AI coding agent actually uses.',
  readMinutes: 7,

  intro: {
    whatItIs: `The command line (terminal/shell) is a text-based way to interact with your computer: typing commands instead of clicking icons. Common shells include bash, zsh, and PowerShell. Commands can navigate folders, run programs, manage files, and chain together in powerful ways a graphical interface often can't.`,
    whyItMatters: `Virtually every AI coding tool — Claude Code, Cursor, Copilot CLI — works by running commands in a terminal under the hood. Understanding basic command-line literacy means you can read what an AI agent is actually doing to your filesystem, instead of treating it as an unreadable black box.`,
    whereUsed: `Developers use the terminal constantly: running scripts, installing packages, managing version control (Git), deploying applications, and automating repetitive tasks via scripts.`,
    commonMistakes: `A common beginner fear is "I'll break something by typing the wrong command." Most everyday commands (listing files, navigating folders, viewing file contents) are completely safe. The commands that genuinely require caution are ones that delete or overwrite data (like rm) — knowing which commands are destructive vs. safe is itself a key skill.`,
  },

  visual: { caption: 'Anatomy of a command: program, flags, and arguments', type: 'command-anatomy-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'Printing text (echo)', explanation: `echo simply prints text back to the terminal — the command-line equivalent of console.log.`, code: `echo "Hello, terminal!"`, language: 'bash', output: `Hello, terminal!` },
    { difficulty: 'easy', title: 'Listing files in a directory (ls)', explanation: `ls lists the contents of the current directory. Flags like -l show more detail.`, code: `ls\nls -l`, language: 'bash', output: `index.html  styles.css  script.js\n\n-rw-r--r--  1 user  staff   2048 Jun 10 09:14 index.html\n-rw-r--r--  1 user  staff   1024 Jun 10 09:10 styles.css` },
    { difficulty: 'medium', title: 'Navigating directories (cd) and creating folders (mkdir)', explanation: `cd changes your current directory; mkdir creates a new one. These are the basic building blocks of moving around a filesystem from the terminal.`, code: `mkdir projects\ncd projects\nmkdir my-first-app\ncd my-first-app\npwd`, language: 'bash', output: `/Users/you/projects/my-first-app` },
    { difficulty: 'medium-plus', title: 'Chaining commands and piping output', explanation: `The pipe (|) sends one command's output as input to another, letting you combine simple tools into powerful pipelines — a core Unix philosophy.`, code: `ls -l | grep ".html"`, language: 'bash', output: `-rw-r--r--  1 user  staff   2048 Jun 10 09:14 index.html\n(grep filters the ls output to only lines containing ".html")` },
    { difficulty: 'hard', title: 'Writing a small automation script', explanation: `Multiple commands can be saved into a script file and run together — the basis of automation and what CI/CD pipelines and AI coding agents do constantly.`, code: `#!/bin/bash\n# setup.sh — a tiny automation script\necho "Creating project structure..."\nmkdir -p src assets\ntouch src/index.js README.md\necho "Done. Files created:"\nls -R`, language: 'bash', output: `Creating project structure...\nDone. Files created:\nREADME.md src assets\n\n./src:\nindex.js` },
    { difficulty: 'real-world', title: 'What an AI coding agent actually runs', explanation: `When you ask an AI assistant to "install this package and run the tests," it's translating that request into real terminal commands — exactly like these — and reading the output to decide what to do next.`, code: `npm install lodash\nnpm test`, language: 'bash', output: `added 1 package in 1.2s\n\n> test\n> jest\n\nPASS  ./app.test.js\n✓ adds numbers correctly (3 ms)\n\nTests: 1 passed, 1 total` },
  ],

  exercises: [
    { level: 1, title: 'Match the command', problem: `Match each command to its purpose: ls, cd, mkdir, pwd. Purposes: (a) show current directory, (b) list files, (c) change directory, (d) create a new directory.`, hints: ['Think about what each command name abbreviates: "list," "change directory," "make directory," "print working directory."'], solution: `ls → (b) list files. cd → (c) change directory. mkdir → (d) create a new directory. pwd → (a) show current directory (print working directory).` },
    { level: 2, title: 'Predict the directory after navigation', problem: `Starting at /Users/you, what is the resulting directory after running: cd projects, then cd app, then cd ..?`, hints: ['cd .. moves up one level to the parent directory.', 'Track the path step by step.'], solution: `/Users/you/projects. Step by step: /Users/you → cd projects → /Users/you/projects → cd app → /Users/you/projects/app → cd .. → /Users/you/projects.` },
    { level: 3, title: 'Identify the risky command', problem: `Of these three commands, which one requires the most caution before running, and why? (a) ls -l, (b) rm -rf old-folder, (c) pwd`, hints: ['Consider which command modifies/deletes data versus only reading or displaying information.'], solution: `(b) rm -rf old-folder is the risky one — it recursively and forcibly deletes a folder and everything inside it, with no confirmation prompt and no built-in undo. (a) and (c) are read-only/informational and safe to run freely.` },
    { level: 4, title: 'Build a pipeline', problem: `Write a single command that lists all files in the current directory and filters the output to only lines containing the word "test".`, hints: ['Use ls combined with the pipe operator and grep.'], solution: `ls | grep "test"` },
    { level: 5, title: 'Write a tiny setup script', problem: `Write a short bash script that creates a folder called "my-app", moves into it, and creates two empty files: index.html and style.css.`, hints: ['Use mkdir, cd, and touch.'], solution: `#!/bin/bash\nmkdir my-app\ncd my-app\ntouch index.html style.css` },
    { level: 6, title: 'Real-world: explain what happened when an AI agent "broke" your project', problem: `An AI coding assistant ran a series of terminal commands and afterward some files were missing. As someone who now understands the command line, what's your first troubleshooting step, and why is command-line literacy useful here?`, hints: ['Think about reviewing the actual commands the agent ran, not just the end result.', 'Command-line literacy lets you read what was executed instead of guessing.'], solution: `The first step is reviewing the actual command history or log of what the agent ran (many AI coding tools show this), looking specifically for deletion or overwrite commands like rm, mv, or git commands that could have removed files. Command-line literacy matters here because it turns an opaque "something went wrong" into a readable sequence of specific actions you can verify, understand, and potentially reverse or prevent next time.` },
  ],

  interview: [
    { q: 'What is the difference between a GUI and a command-line interface?', a: `A GUI (graphical user interface) lets you interact via visual elements — windows, icons, buttons — using a mouse. A command-line interface (CLI) uses typed text commands instead. CLIs are often faster for repetitive or precise tasks and easier to automate, while GUIs are generally more approachable for newcomers.` },
    { q: 'What does the pipe ( | ) operator do in a terminal?', a: `It takes the output of one command and feeds it as input into the next command, allowing multiple simple tools to be chained together into a more powerful combined operation, without writing custom code.` },
    { q: 'Why is rm -rf considered a dangerous command?', a: `It recursively (-r) and forcibly (-f) deletes files and directories without confirmation, and there's typically no "undo" or recycle bin involved — deleted data is usually unrecoverable through normal means, making mistakes costly.` },
    { q: 'Why do AI coding tools rely so heavily on the command line?', a: `The command line provides a precise, scriptable, text-based interface to control the filesystem, run programs, install dependencies, and read output — all of which can be automated programmatically. It's far easier for software (including AI agents) to generate and interpret text commands than to simulate clicking through a graphical interface.` },
    { q: 'What is a shell, and name two examples.', a: `A shell is the program that interprets and executes the commands you type in a terminal. Common examples include bash and zsh (common on macOS/Linux) and PowerShell (common on Windows).` },
  ],

  realWorld: [
    { company: 'Google', text: 'Internal infrastructure tooling and deployment pipelines are heavily command-line and script-driven, since automation at Google\'s scale requires repeatable, scriptable operations rather than manual clicking.' },
    { company: 'Amazon', text: 'The AWS CLI lets engineers manage cloud infrastructure entirely from the terminal, enabling scripts that provision, configure, and tear down infrastructure automatically.' },
    { company: 'OpenAI', text: 'AI coding agents (and the infrastructure that trains/serves models) fundamentally operate through command-line tools and scripts to manage environments, dependencies, and compute jobs.' },
    { company: 'Netflix', text: 'Continuous integration pipelines run extensive automated command-line scripts on every code change to build, test, and deploy services without manual intervention.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does the "ls" command do?', options: ['Deletes a file', 'Lists files in the current directory', 'Changes directory', 'Installs a package'], correct: 1 },
    { type: 'true-false', q: 'The pipe operator ( | ) sends one command\'s output as input to another command.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which command is considered risky and should be used carefully?', options: ['pwd', 'ls', 'rm -rf', 'echo'], correct: 2 },
    { type: 'code-output', q: 'What does this print?\n\necho "Building..."', options: ['Nothing', 'Building...', 'An error', 'echo'], correct: 1 },
    { type: 'mcq', q: 'What does "cd .." do?', options: ['Creates a new directory', 'Moves up one directory level', 'Deletes the current directory', 'Lists hidden files'], correct: 1 },
    { type: 'true-false', q: 'Most everyday terminal commands (like ls, pwd, cd) are safe and reversible.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why do AI coding agents rely on the command line?', options: ['It looks more impressive', 'It\'s scriptable and easy for software to generate/interpret', 'GUIs are faster for AI', 'Command lines are required by law'], correct: 1 },
    { type: 'drag-drop', q: 'Order these steps to create and enter a new folder: [mkdir my-app, cd my-app, (start)]', options: ['(start)', 'mkdir my-app', 'cd my-app'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What is a "shell"?', options: ['A type of file', 'The program that interprets commands you type', 'A graphical icon', 'A network cable'], correct: 1 },
    { type: 'code-output', q: 'mkdir test\ncd test\npwd\n\nIf you started at /home/user, what does pwd print?', options: ['/home/user', '/home/user/test', '/test', 'An error'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'internet-basics',
  module: 1,
  title: 'Internet Basics',
  tagline: 'How your message gets from your laptop to a server on the other side of the planet and back.',
  readMinutes: 8,

  intro: {
    whatItIs: `The internet is a massive network of interconnected computers that communicate using shared rules (protocols). Data is broken into small "packets," each labeled with addressing information, and routed across many intermediate devices until it reaches its destination — then reassembled.`,
    whyItMatters: `"The website is down," "my request timed out," "CORS error" — all of these trace back to how data physically moves across networks. Understanding the basics turns confusing network errors into diagnosable, specific problems instead of an indistinct "the internet is broken."`,
    whereUsed: `Every API call, every page load, every chat message sent to an AI model travels across this packet-based system, typically in well under a second despite potentially crossing thousands of miles and many intermediate routers.`,
    commonMistakes: `A common misconception is imagining the internet as one big "cloud" with a single connection between you and a website. In reality, your data hops through many intermediate routers and networks, and any one of them having an issue can cause slowdowns or failures — which is why "is it my internet or their server?" is a genuinely meaningful diagnostic question.`,
  },

  visual: { caption: 'A request\'s journey: client → router → ISP → server → back', type: 'internet-packet-journey' },

  examples: [
    { difficulty: 'very-easy', title: 'An IP address identifies a device', explanation: `Every device on a network has an address (an IP address) so data knows where to go — conceptually similar to a postal address.`, code: `const device = { name: "my-laptop", ip: "192.168.1.42" };\nconsole.log(device.name, "->", device.ip);`, language: 'javascript', output: `my-laptop -> 192.168.1.42` },
    { difficulty: 'easy', title: 'Breaking a message into packets', explanation: `Large messages are split into smaller packets for transmission, then reassembled at the destination. This models splitting a string into chunks.`, code: `function splitIntoPackets(message, size) {\n  const packets = [];\n  for (let i = 0; i < message.length; i += size) {\n    packets.push(message.slice(i, i + size));\n  }\n  return packets;\n}\n\nconsole.log(splitIntoPackets("HELLOFROMTHEINTERNET", 5));`, language: 'javascript', output: `[ 'HELLO', 'FROMT', 'HEINT', 'ERNET' ]` },
    { difficulty: 'medium', title: 'Reassembling out-of-order packets', explanation: `Packets can arrive out of order over real networks; each packet carries a sequence number so the destination can reassemble them correctly.`, code: `const receivedPackets = [\n  { seq: 2, data: "FROMT" },\n  { seq: 0, data: "HELLO" },\n  { seq: 3, data: "HEINT" },\n  { seq: 1, data: "ERNET" },\n];\n\nconst reassembled = [...receivedPackets]\n  .sort((a, b) => a.seq - b.seq)\n  .map(p => p.data)\n  .join("");\n\nconsole.log(reassembled);`, language: 'javascript', output: `HELLOERNETFROMTHEINT\n(Note: this demonstrates reassembly mechanics — sequence numbers ensure correct order regardless of arrival order.)` },
    { difficulty: 'medium-plus', title: 'Modeling latency across multiple hops', explanation: `Each "hop" between routers adds a small delay. This models cumulative latency across a multi-hop path, similar to what a traceroute tool reveals.`, code: `const hops = [\n  { name: "Home router", ms: 1 },\n  { name: "ISP", ms: 8 },\n  { name: "Regional network", ms: 14 },\n  { name: "Destination server", ms: 22 },\n];\n\nlet totalLatency = 0;\nhops.forEach(hop => {\n  totalLatency += hop.ms;\n  console.log(hop.name + ":", hop.ms + "ms (cumulative: " + totalLatency + "ms)");\n});`, language: 'javascript', output: `Home router: 1ms (cumulative: 1ms)\nISP: 8ms (cumulative: 9ms)\nRegional network: 14ms (cumulative: 23ms)\nDestination server: 22ms (cumulative: 45ms)` },
    { difficulty: 'hard', title: 'Simulating packet loss and retransmission', explanation: `Real networks occasionally drop packets; reliable protocols (like TCP) detect this and retransmit. This models a simplified retry mechanism.`, code: `function sendWithRetry(packet, attempt = 1, maxAttempts = 3) {\n  const succeeded = Math.random() > 0.4 || attempt === maxAttempts; // simulate loss\n  if (succeeded) {\n    console.log("Packet '" + packet + "' delivered on attempt", attempt);\n    return true;\n  }\n  console.log("Packet '" + packet + "' lost — retrying (attempt " + (attempt + 1) + ")");\n  return sendWithRetry(packet, attempt + 1, maxAttempts);\n}\n\nsendWithRetry("hello-world");`, language: 'javascript', output: `Packet 'hello-world' lost — retrying (attempt 2)\nPacket 'hello-world' delivered on attempt 2\n(Random — your run may differ; the point is the retry logic.)` },
    { difficulty: 'real-world', title: 'Why streaming services use CDNs', explanation: `Sending video data across the entire planet for every viewer would be slow and expensive. Content Delivery Networks (CDNs) place copies of data physically closer to users, reducing the number of hops (and latency) data has to travel.`, code: `function nearestServer(userLocation, servers) {\n  return servers.reduce((closest, server) => {\n    const dist = Math.abs(server.distanceFromUser);\n    return dist < closest.distanceFromUser ? server : closest;\n  });\n}\n\nconst servers = [\n  { region: "us-east", distanceFromUser: 4000 },\n  { region: "eu-west", distanceFromUser: 800 },\n  { region: "ap-south", distanceFromUser: 9000 },\n];\n\nconsole.log("Routing user to:", nearestServer("user-in-europe", servers).region);`, language: 'javascript', output: `Routing user to: eu-west` },
  ],

  exercises: [
    { level: 1, title: 'Define "packet"', problem: `In one sentence, explain why large messages are broken into smaller packets instead of sent as one giant chunk.`, hints: ['Think about reliability and sharing network capacity fairly among many users.'], solution: `Breaking messages into smaller packets allows networks to share bandwidth fairly among many simultaneous users, route each packet independently (even via different paths), and recover from partial loss by retransmitting only the missing packet rather than the entire message.` },
    { level: 2, title: 'Reassemble out-of-order data', problem: `Given packets arriving as [{seq:1,data:"B"},{seq:0,data:"A"},{seq:2,data:"C"}], what is the correctly reassembled message?`, hints: ['Sort by the seq field before joining.'], solution: `"ABC" — sorting by seq (0, 1, 2) gives the packets in their original order: A, B, C.` },
    { level: 3, title: 'Diagnose a latency complaint', problem: `A user says a website "feels slow" from their location, but the site works fine for others nearby the server. Using the hop/latency concept, what's a plausible explanation, and what's one mitigation companies commonly use?`, hints: ['Consider physical distance and number of hops between the user and server.', 'Recall the real-world CDN example.'], solution: `The user is likely physically farther from the server, meaning their data crosses more hops/distance, increasing cumulative latency. A common mitigation is using a CDN — placing servers (or cached copies of content) geographically closer to users worldwide, reducing the distance (and hops) any individual request needs to travel.` },
    { level: 4, title: 'Estimate cumulative latency', problem: `Given hops with latencies [3ms, 12ms, 9ms, 20ms], what is the total round-trip-ish latency if a request must pass through them all one direction (response not included)?`, hints: ['Sum all the individual hop latencies.'], solution: `44ms total (3 + 12 + 9 + 20 = 44). Note real round-trip time would roughly double this if the response retraces the same path back.` },
    { level: 5, title: 'Add jitter awareness to the retry function', problem: `Modify the sendWithRetry function from the examples so it also logs the total number of attempts taken once successful.`, hints: ['Track attempts as the recursive calls happen, and log once succeeded is true.'], solution: `function sendWithRetry(packet, attempt = 1, maxAttempts = 3) {\n  const succeeded = Math.random() > 0.4 || attempt === maxAttempts;\n  if (succeeded) {\n    console.log("Delivered '" + packet + "' after", attempt, "attempt(s)");\n    return attempt;\n  }\n  return sendWithRetry(packet, attempt + 1, maxAttempts);\n}` },
    { level: 6, title: 'Real-world: explain a global outage', problem: `A major cloud provider has an outage in one region, and websites worldwide become slow or unreachable — even ones whose company isn't based in that region. Using the internet/routing concepts here, explain why a regional problem can have global impact.`, hints: ['Think about how content/services may be centralized or routed through specific regions regardless of user location.', 'Consider that many companies rely on the same handful of large cloud providers.'], solution: `Many companies host their infrastructure, or route significant traffic, through a small number of major cloud providers' regions — sometimes regardless of where their users physically are. If a key region (or core routing infrastructure) goes down, every service depending on that region's servers becomes unreachable or degraded for users everywhere, since the issue isn't about user proximity, but about the shared dependency on that specific infrastructure failing.` },
  ],

  interview: [
    { q: 'What is a packet, and why is data sent in packets rather than as a single stream?', a: `A packet is a small chunk of data with addressing/sequencing information attached, sent across a network. Breaking data into packets allows networks to share capacity efficiently among many users, route packets independently (even via different physical paths), and recover from loss by retransmitting only missing pieces.` },
    { q: 'What is latency, and what factors typically increase it?', a: `Latency is the delay between sending data and it arriving at its destination. It typically increases with physical distance, the number of intermediate hops (routers/networks) data passes through, and congestion at any point along that path.` },
    { q: 'How does a CDN (Content Delivery Network) reduce latency for users?', a: `A CDN places copies of content on servers distributed across many geographic locations, so users are served from a nearby location rather than a single, potentially distant, origin server — reducing the physical distance (and number of hops) data must travel.` },
    { q: 'What happens, generally, when a packet is lost in transit?', a: `Reliable protocols (like TCP) detect the loss (often via missing acknowledgments) and retransmit the lost packet. This adds some delay but ensures eventual, correct delivery of the complete data, unlike unreliable protocols (like raw UDP) which may simply drop it without retrying.` },
    { q: 'Why might a website be reachable for users in one region but not another during a network issue?', a: `Different users\' traffic may route through different intermediate networks, regions, or CDN nodes depending on their location. A problem isolated to specific infrastructure (a particular region\'s servers, a specific ISP, a regional router) may only affect users whose traffic happens to depend on that specific path.` },
  ],

  realWorld: [
    { company: 'Netflix', text: 'Operates its own CDN (Open Connect) with servers placed inside ISP networks worldwide specifically to minimize the number of hops video data travels to reach viewers.' },
    { company: 'Google', text: 'Operates a vast global network of data centers and undersea cables to reduce latency and increase reliability for services used by billions of people across every continent.' },
    { company: 'Amazon', text: 'AWS offers services across many geographic "regions" explicitly so customers can deploy infrastructure physically closer to their end users, reducing latency.' },
    { company: 'Stripe', text: 'Routes payment processing requests through redundant network paths and multiple data centers so a regional network issue doesn\'t take down transaction processing entirely.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What is a "packet" in networking?', options: ['A type of virus', 'A small chunk of data sent across a network', 'A web browser feature', 'A CPU instruction'], correct: 1 },
    { type: 'true-false', q: 'Packets always travel in perfect order and never need reassembly.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is "latency"?', options: ['The total storage capacity of a server', 'The delay between sending data and it arriving', 'A type of encryption', 'The number of users on a website'], correct: 1 },
    { type: 'code-output', q: 'const packets = [{seq:1,d:"B"},{seq:0,d:"A"}];\nconst sorted = [...packets].sort((a,b)=>a.seq-b.seq).map(p=>p.d).join("");\nconsole.log(sorted);\n\nWhat is logged?', options: ['BA', 'AB', 'undefined', 'an error'], correct: 1 },
    { type: 'mcq', q: 'What does a CDN primarily help reduce?', options: ['CPU usage', 'Latency, by serving content from nearby locations', 'RAM usage on the client', 'The need for IP addresses'], correct: 1 },
    { type: 'true-false', q: 'More hops/intermediate networks between sender and receiver generally increases latency.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What typically happens when a network protocol like TCP detects a lost packet?', options: ['It gives up immediately', 'It retransmits the lost packet', 'It deletes the whole connection', 'It ignores the loss permanently'], correct: 1 },
    { type: 'drag-drop', q: 'Order a request\'s typical journey: [Your device, Home router, ISP, Destination server]', options: ['Your device', 'Home router', 'ISP', 'Destination server'], correct: [0, 1, 2, 3] },
    { type: 'mcq', q: 'Why can a regional cloud outage affect users worldwide?', options: ['The internet always fails everywhere at once', 'Many services depend on specific shared infrastructure regardless of user location', 'It never actually happens', 'Users worldwide share one IP address'], correct: 1 },
    { type: 'code-output', q: 'function splitMsg(msg, size) {\n  const out = [];\n  for (let i = 0; i < msg.length; i += size) out.push(msg.slice(i, i+size));\n  return out;\n}\nconsole.log(splitMsg("ABCDEF", 2).length);\n\nWhat is logged?', options: ['2', '3', '6', '1'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'http',
  module: 1,
  title: 'HTTP',
  tagline: 'The request-and-response language every website and API speaks.',
  readMinutes: 8,

  intro: {
    whatItIs: `HTTP (HyperText Transfer Protocol) is the standard set of rules browsers and servers use to communicate. A client sends an HTTP request (with a method like GET or POST, a URL, headers, and sometimes a body), and the server sends back an HTTP response (with a status code, headers, and a body).`,
    whyItMatters: `Every API call you make, every webpage you load, every "fetch" in your code is an HTTP exchange. Reading a status code (200, 404, 500) and knowing what a request method means is essential for debugging anything web-related — including most AI-assisted coding involving APIs.`,
    whereUsed: `Browsers use HTTP to load every webpage. APIs (including the ones AI assistants and apps call to fetch data) almost universally use HTTP as their transport mechanism.`,
    commonMistakes: `Beginners often confuse status codes with actual success/failure of business logic — e.g., assuming a 200 status always means "everything the user wanted happened," when really it just means "the server successfully processed and responded to the request," which might still contain an error message in its body.`,
  },

  visual: { caption: 'Anatomy of an HTTP request/response cycle', type: 'http-request-response' },

  examples: [
    { difficulty: 'very-easy', title: 'A basic GET request', explanation: `fetch() sends an HTTP GET request by default, asking a server for data without sending a body.`, code: `fetch("https://api.example.com/users/1")\n  .then(response => console.log("Status:", response.status));`, language: 'javascript', output: `Status: 200` },
    { difficulty: 'easy', title: 'Reading common status codes', explanation: `Status codes are grouped by what they mean: 2xx success, 4xx client error, 5xx server error.`, code: `function describeStatus(code) {\n  if (code >= 200 && code < 300) return "Success";\n  if (code >= 400 && code < 500) return "Client error";\n  if (code >= 500) return "Server error";\n  return "Other";\n}\n\n[200, 404, 500, 301].forEach(code => console.log(code, "->", describeStatus(code)));`, language: 'javascript', output: `200 -> Success\n404 -> Client error\n500 -> Server error\n301 -> Other` },
    { difficulty: 'medium', title: 'Sending data with POST', explanation: `POST requests send data in the request body — typically used to create new resources, like submitting a form.`, code: `fetch("https://api.example.com/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "Ada", role: "engineer" }),\n})\n  .then(res => res.json())\n  .then(data => console.log("Created:", data));`, language: 'javascript', output: `Created: { id: 42, name: 'Ada', role: 'engineer' }` },
    { difficulty: 'medium-plus', title: 'Handling errors based on status', explanation: `A robust request checks response.ok (true for 2xx statuses) before assuming the data is usable, rather than blindly parsing the body.`, code: `async function getUser(id) {\n  const response = await fetch("https://api.example.com/users/" + id);\n  if (!response.ok) {\n    throw new Error("Request failed with status " + response.status);\n  }\n  return response.json();\n}\n\ngetUser(999)\n  .then(user => console.log(user))\n  .catch(err => console.log("Error caught:", err.message));`, language: 'javascript', output: `Error caught: Request failed with status 404` },
    { difficulty: 'hard', title: 'Modeling a simple HTTP router (server side)', explanation: `Servers receive requests and route them based on method + path. This models a minimal version of what frameworks like Express do internally.`, code: `const routes = {\n  "GET /users": () => ({ status: 200, body: ["alice", "bob"] }),\n  "POST /users": () => ({ status: 201, body: { created: true } }),\n  "GET /missing": () => ({ status: 404, body: { error: "Not found" } }),\n};\n\nfunction handleRequest(method, path) {\n  const key = method + " " + path;\n  const handler = routes[key];\n  return handler ? handler() : { status: 404, body: { error: "No route matched" } };\n}\n\nconsole.log(handleRequest("GET", "/users"));\nconsole.log(handleRequest("DELETE", "/users"));`, language: 'javascript', output: `{ status: 200, body: [ 'alice', 'bob' ] }\n{ status: 404, body: { error: 'No route matched' } }` },
    { difficulty: 'real-world', title: 'Why AI assistants calling tools is just HTTP underneath', explanation: `When an AI model "calls a tool" or "fetches data," in most implementations this is literally making an HTTP request to an API endpoint and parsing the JSON response — the same mechanics as any web app.`, code: `async function aiToolCall(toolName, params) {\n  const response = await fetch("https://internal-api.example.com/tools/" + toolName, {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(params),\n  });\n  return response.json();\n}\n\n// Conceptual: this is what's "under the hood" of a tool call\naiToolCall("get_weather", { city: "Dhaka" }).then(console.log);`, language: 'javascript', output: `{ city: 'Dhaka', tempC: 31, condition: 'Partly cloudy' }` },
  ],

  exercises: [
    { level: 1, title: 'Classify status codes', problem: `Classify these as success, client error, or server error: 200, 404, 500, 201, 403.`, hints: ['2xx = success, 4xx = client error, 5xx = server error.'], solution: `200 → success. 404 → client error (Not Found). 500 → server error (Internal Server Error). 201 → success (Created). 403 → client error (Forbidden).` },
    { level: 2, title: 'Pick the right method', problem: `Which HTTP method would you typically use to: (a) fetch a list of products, (b) create a new order, (c) delete a comment?`, hints: ['GET retrieves, POST creates, DELETE removes.'], solution: `(a) GET (retrieving data, no side effects expected). (b) POST (creating a new resource). (c) DELETE (removing a resource).` },
    { level: 3, title: 'Debug a misleading 200', problem: `A developer's code does fetch(url).then(res => res.json()) and assumes success because no error was thrown, but the actual operation failed on the server. What mistake did they make, and how should they fix it?`, hints: ['Check response.ok or response.status before parsing.', 'fetch() does not throw on HTTP error status codes by default.'], solution: `fetch() only throws on network failures, not on HTTP error status codes (like 404 or 500) — those still resolve successfully as far as fetch() is concerned. The mistake is not checking response.ok (or response.status) before treating the response as a success. The fix: check response.ok first and throw/handle accordingly before parsing the body as valid data.` },
    { level: 4, title: 'Predict router output', problem: `Using the handleRequest router from the examples, what does handleRequest("POST", "/users") return?`, hints: ['Look up "POST /users" in the routes object.'], solution: `{ status: 201, body: { created: true } } — matching the "POST /users" route defined in the routes object.` },
    { level: 5, title: 'Add a PUT route', problem: `Extend the routes object from the examples to support PUT /users/1 returning { status: 200, body: { updated: true } }.`, hints: ['Add a new key following the same "METHOD path" pattern.'], solution: `const routes = {\n  // ...existing routes\n  "PUT /users/1": () => ({ status: 200, body: { updated: true } }),\n};` },
    { level: 6, title: 'Real-world: explain a 429 status to a non-technical teammate', problem: `Your app starts returning HTTP 429 errors from a third-party API. Explain in plain terms what's happening and a reasonable first response, without saying "I don't know."`, hints: ['429 has a specific, well-known meaning related to request volume.', 'Think about what a reasonable engineering response would be (not necessarily code).'], solution: `A 429 status means "Too Many Requests" — the API is telling us we've exceeded its allowed rate of requests in a given time window, essentially asking us to slow down. A reasonable first response is to check how frequently we're calling that API, add a delay or backoff strategy between retries, and verify we're not accidentally calling it more often than intended (e.g., in a loop without a pause).` },
  ],

  interview: [
    { q: 'What are the main components of an HTTP request?', a: `A method (GET, POST, PUT, DELETE, etc.), a URL/path identifying the resource, headers (metadata like content type or authentication), and optionally a body containing data (common with POST/PUT requests).` },
    { q: 'What\'s the difference between a 404 and a 500 status code?', a: `404 (Not Found) is a client error — the requested resource doesn't exist at that URL. 500 (Internal Server Error) is a server error — something went wrong on the server's side while processing an otherwise valid request.` },
    { q: 'Why doesn\'t fetch() automatically throw an error for a 404 or 500 response?', a: `fetch() only rejects (throws) on network-level failures (e.g., the request couldn't be sent at all). HTTP error status codes are still considered a "successful" exchange of an HTTP request/response, so checking response.ok or response.status manually is necessary to detect them.` },
    { q: 'What is the difference between GET and POST requests?', a: `GET requests retrieve data and are generally idempotent (calling them repeatedly shouldn't change server state) and shouldn't include a meaningful body. POST requests typically create or submit data and often do change server state, with the data included in the request body rather than the URL.` },
    { q: 'What does a 429 status code mean, and what\'s a common way to handle it?', a: `429 means "Too Many Requests" — the client has exceeded a rate limit. A common handling strategy is implementing exponential backoff: waiting progressively longer between retries instead of immediately retrying, to avoid making the problem worse.` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'Its public API documentation is built entirely around HTTP methods and status codes, with specific, well-documented error codes so developers can handle payment failures precisely.' },
    { company: 'Google', text: 'Search and most Google services communicate via HTTP/HTTPS requests, with carefully designed status codes and caching headers to optimize speed at massive scale.' },
    { company: 'Netflix', text: 'Its API gateway routes and load-balances enormous volumes of HTTP requests across microservices, relying on status codes to detect and handle failures gracefully.' },
    { company: 'OpenAI', text: 'The API used to access models like the one answering you is fundamentally an HTTP API — requests are POSTed with parameters and the model\'s response comes back as an HTTP response.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does a 404 status code mean?', options: ['Server error', 'Resource not found', 'Request succeeded', 'Too many requests'], correct: 1 },
    { type: 'true-false', q: 'fetch() automatically throws an error when it receives a 500 status code.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which HTTP method is typically used to create a new resource?', options: ['GET', 'POST', 'DELETE', 'HEAD'], correct: 1 },
    { type: 'code-output', q: 'function describe(code) {\n  if (code >= 200 && code < 300) return "OK";\n  return "Not OK";\n}\nconsole.log(describe(201));\n\nWhat is logged?', options: ['"OK"', '"Not OK"', '201', 'undefined'], correct: 0 },
    { type: 'mcq', q: 'What does a 429 status code indicate?', options: ['Resource created', 'Too many requests / rate limited', 'Server crashed', 'Permanent redirect'], correct: 1 },
    { type: 'true-false', q: 'response.ok is true for status codes in the 200-299 range.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Where is data typically placed in a POST request?', options: ['In the URL only', 'In the request body', 'It cannot be sent', 'In the response headers'], correct: 1 },
    { type: 'drag-drop', q: 'Order from "everything worked" to "server itself broke": [2xx Success, 4xx Client Error, 5xx Server Error]', options: ['2xx Success', '4xx Client Error', '5xx Server Error'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might checking only "no error was thrown" be insufficient when using fetch()?', options: ['fetch never fails', 'HTTP error statuses (404, 500) don\'t throw by default — check response.ok', 'JavaScript has no error handling', 'It is always sufficient'], correct: 1 },
    { type: 'code-output', q: 'const routes = { "GET /a": () => 1, "GET /b": () => 2 };\nconsole.log(routes["GET /b"]());\n\nWhat is logged?', options: ['1', '2', 'undefined', 'an error'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'https',
  module: 1,
  title: 'HTTPS',
  tagline: 'HTTP, plus the encryption layer that keeps your passwords from being readable in transit.',
  readMinutes: 6,

  intro: {
    whatItIs: `HTTPS is HTTP layered on top of TLS (Transport Layer Security) encryption. It ensures data exchanged between browser and server is encrypted in transit, verifies the server's identity via certificates, and protects against tampering — without changing how requests/responses are structured at the HTTP level.`,
    whyItMatters: `Browsers now flag non-HTTPS sites as "Not Secure." Understanding why explains real security concerns: without HTTPS, anyone intercepting network traffic (on public Wi-Fi, for instance) could read or modify passwords, session tokens, and personal data in plain text.`,
    whereUsed: `Virtually all modern websites and APIs use HTTPS by default, including every API call AI tools and apps make to fetch data securely.`,
    commonMistakes: `Beginners sometimes think HTTPS makes a website "fully secure" in every sense. It only secures the data in transit between browser and server — it says nothing about whether the server itself stores data securely, validates input properly, or has other vulnerabilities.`,
  },

  visual: { caption: 'HTTP vs HTTPS: the encryption layer in between', type: 'https-encryption-layer' },

  examples: [
    { difficulty: 'very-easy', title: 'Spotting the protocol in a URL', explanation: `The "https://" prefix tells the browser to use an encrypted connection; "http://" does not.`, code: `const urls = ["http://example.com", "https://example.com"];\nurls.forEach(u => console.log(u, "->", u.startsWith("https") ? "Encrypted" : "Not encrypted"));`, language: 'javascript', output: `http://example.com -> Not encrypted\nhttps://example.com -> Encrypted` },
    { difficulty: 'easy', title: 'Conceptual encoding vs encryption', explanation: `This isn't real encryption (don't use this for anything real), but it illustrates the idea: data becomes unreadable in transit and is only reversible by someone with the right "key."`, code: `function simpleShift(text, key) {\n  return text.split("").map(c => String.fromCharCode(c.charCodeAt(0) + key)).join("");\n}\n\nconst original = "password123";\nconst scrambled = simpleShift(original, 3);\nconst restored = simpleShift(scrambled, -3);\n\nconsole.log("Scrambled (what an eavesdropper sees):", scrambled);\nconsole.log("Restored by the recipient:", restored);`, language: 'javascript', output: `Scrambled (what an eavesdropper sees): sdvvzrug456\nRestored by the recipient: password123` },
    { difficulty: 'medium', title: 'Checking certificate validity conceptually', explanation: `HTTPS relies on certificates issued by trusted authorities to verify a server's identity. This models a simplified validity check.`, code: `function isCertificateValid(cert, currentDate) {\n  return currentDate >= cert.validFrom && currentDate <= cert.validTo && cert.issuer === "Trusted CA";\n}\n\nconst cert = { issuer: "Trusted CA", validFrom: "2026-01-01", validTo: "2027-01-01" };\nconsole.log(isCertificateValid(cert, "2026-06-25"));\nconsole.log(isCertificateValid(cert, "2028-01-01"));`, language: 'javascript', output: `true\nfalse` },
    { difficulty: 'medium-plus', title: 'Why mixed content gets blocked', explanation: `An HTTPS page loading an HTTP resource creates a security gap; browsers often block this "mixed content." This models a simple check a browser might perform.`, code: `function checkMixedContent(pageProtocol, resourceUrl) {\n  const isResourceHttp = resourceUrl.startsWith("http://");\n  if (pageProtocol === "https" && isResourceHttp) {\n    return "Blocked: insecure resource on a secure page";\n  }\n  return "Allowed";\n}\n\nconsole.log(checkMixedContent("https", "http://insecure-cdn.com/script.js"));\nconsole.log(checkMixedContent("https", "https://secure-cdn.com/script.js"));`, language: 'javascript', output: `Blocked: insecure resource on a secure page\nAllowed` },
    { difficulty: 'hard', title: 'Modeling a simplified handshake sequence', explanation: `Before encrypted data flows, the browser and server perform a "handshake" to agree on encryption parameters. This models the conceptual sequence of steps (heavily simplified vs. real TLS).`, code: `function tlsHandshake() {\n  const steps = [\n    "Client: Hello, here are the encryption methods I support",\n    "Server: Let's use this method, here's my certificate",\n    "Client: Certificate verified, here's an encrypted session key",\n    "Server: Session key received, secure channel established",\n  ];\n  steps.forEach((step, i) => console.log("Step " + (i + 1) + ":", step));\n}\n\ntlsHandshake();`, language: 'javascript', output: `Step 1: Client: Hello, here are the encryption methods I support\nStep 2: Server: Let's use this method, here's my certificate\nStep 3: Client: Certificate verified, here's an encrypted session key\nStep 4: Server: Session key received, secure channel established` },
    { difficulty: 'real-world', title: 'Why login forms must use HTTPS', explanation: `Without HTTPS, a password typed into a login form would travel across the network in plain, readable text — interceptable by anyone on the same network (e.g., shared public Wi-Fi). HTTPS encrypts this so only the server can read it.`, code: `function submitLogin(protocol, username, password) {\n  if (protocol !== "https") {\n    console.warn("WARNING: credentials would be sent in plain text over", protocol);\n  } else {\n    console.log("Credentials encrypted before transmission.");\n  }\n}\n\nsubmitLogin("http", "alice", "hunter2");\nsubmitLogin("https", "alice", "hunter2");`, language: 'javascript', output: `WARNING: credentials would be sent in plain text over http\nCredentials encrypted before transmission.` },
  ],

  exercises: [
    { level: 1, title: 'Spot the insecure URL', problem: `Which of these URLs is insecure: https://bank.com/login or http://bank.com/login? Why?`, hints: ['Look at the protocol prefix.'], solution: `http://bank.com/login is insecure — it lacks the "s" in https, meaning the connection isn't encrypted and data (like login credentials) could be read by anyone intercepting the traffic.` },
    { level: 2, title: 'Explain what HTTPS protects against', problem: `Name two specific risks HTTPS protects against that plain HTTP does not.`, hints: ['Think about reading data vs. modifying data in transit.'], solution: `1) Eavesdropping: someone intercepting network traffic reading sensitive data (passwords, personal info) in plain text. 2) Tampering: someone intercepting and modifying the data in transit (e.g., injecting malicious content) without either party detecting it.` },
    { level: 3, title: 'Diagnose a "Not Secure" warning', problem: `A user reports their browser shows "Not Secure" for a company's login page. What is the most likely cause, and what's the fix?`, hints: ['Check the URL\'s protocol.', 'The fix involves installing/configuring something on the server.'], solution: `The page is likely being served over plain HTTP instead of HTTPS (or has an invalid/expired/misconfigured certificate). The fix is to install a valid TLS certificate and configure the server to serve the site over HTTPS, redirecting any HTTP requests to HTTPS.` },
    { level: 4, title: 'Predict mixed-content behavior', problem: `Using the checkMixedContent function from the examples, what would checkMixedContent("http", "http://example.com/script.js") return, and why does that differ from the HTTPS-page case?`, hints: ['The function only blocks specifically when the page is HTTPS but the resource is HTTP.'], solution: `It returns "Allowed". The function only flags mixed content when the page itself is HTTPS but loads an insecure HTTP resource. If the page is already plain HTTP, there's no "secure context" being undermined, so this particular check doesn't block it (though the whole page would still be insecure for other reasons).` },
    { level: 5, title: 'Validate a certificate date range', problem: `Using the isCertificateValid function pattern, write a check for a certificate valid from "2025-03-01" to "2026-03-01", and determine if it's valid on "2026-06-25" (today's date in this scenario).`, hints: ['Compare the test date against validFrom and validTo.'], solution: `function isCertificateValid(cert, currentDate) {\n  return currentDate >= cert.validFrom && currentDate <= cert.validTo;\n}\nconst cert = { validFrom: "2025-03-01", validTo: "2026-03-01" };\nconsole.log(isCertificateValid(cert, "2026-06-25")); // false — the certificate expired before this date` },
    { level: 6, title: 'Real-world: explain HTTPS to a non-technical founder', problem: `A non-technical founder asks "why do we need to pay for/set up HTTPS, isn't our site just informational?" Give a real, persuasive reason beyond "it's required."`, hints: ['Think about trust signals, search ranking, and browser warnings affecting conversion/credibility.', 'Think about any forms on the site, even simple contact forms.'], solution: `Even an "informational" site usually has at least a contact form or email field, and without HTTPS that data travels in plain text — a real privacy/trust issue. Beyond that, browsers actively display "Not Secure" warnings on HTTP sites, which damages visitor trust and can scare away potential customers; search engines also factor HTTPS into rankings. The cost of HTTPS (often free via providers like Let's Encrypt) is low compared to the credibility and SEO cost of not having it.` },
  ],

  interview: [
    { q: 'What does HTTPS add on top of HTTP?', a: `HTTPS adds TLS encryption: it encrypts data in transit, verifies the server's identity through certificates issued by trusted authorities, and protects against tampering — while keeping the same request/response structure as plain HTTP underneath.` },
    { q: 'What is a TLS certificate, and what does it prove?', a: `A TLS certificate is issued by a trusted Certificate Authority and cryptographically proves that a server is who it claims to be (e.g., that you're really talking to bank.com and not an impersonator), as well as enabling the encryption handshake.` },
    { q: 'What is "mixed content," and why do browsers block it?', a: `Mixed content occurs when an HTTPS page loads a resource (script, image, etc.) over plain HTTP. Browsers block or warn about this because the insecure resource creates a potential entry point for attackers to intercept or tamper with content, undermining the security the HTTPS page was supposed to provide.` },
    { q: 'Why is sending a password over plain HTTP risky, specifically?', a: `Without encryption, the password travels across the network as readable plain text. Anyone with access to intercept that traffic — for example on a shared public Wi-Fi network — could read the password directly, rather than needing to break any encryption.` },
    { q: 'Does HTTPS guarantee that a website is entirely safe/trustworthy?', a: `No. HTTPS only guarantees the connection between browser and server is encrypted and the server's identity is verified. It says nothing about whether the website's content is trustworthy, whether the server stores data securely, or whether the site has other vulnerabilities like SQL injection.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Chrome marks all plain HTTP sites as "Not Secure" in the address bar, and Google has stated HTTPS is a ranking signal in search results, pushing the entire web toward encryption by default.' },
    { company: 'Stripe', text: 'Requires HTTPS for all integrations handling payment data, since transmitting card details over an unencrypted connection would violate basic security and compliance standards.' },
    { company: 'Amazon', text: 'AWS Certificate Manager provides free TLS certificates to make HTTPS adoption easy for any site hosted on AWS infrastructure.' },
    { company: 'Netflix', text: 'Encrypts all account, billing, and streaming-session traffic via HTTPS to protect user credentials and payment information from interception.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does HTTPS add to HTTP?', options: ['Faster loading only', 'TLS encryption and identity verification', 'A new HTML version', 'Larger file size limits'], correct: 1 },
    { type: 'true-false', q: 'HTTPS guarantees a website is entirely safe and trustworthy in every respect.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does a TLS certificate help verify?', options: ['The user\'s identity', 'The server\'s identity', 'The browser version', 'The CPU speed'], correct: 1 },
    { type: 'code-output', q: 'const url = "http://example.com";\nconsole.log(url.startsWith("https"));\n\nWhat is logged?', options: ['true', 'false', 'undefined', 'an error'], correct: 1 },
    { type: 'mcq', q: 'What is "mixed content"?', options: ['Mixing CSS and JS files', 'An HTTPS page loading an insecure HTTP resource', 'A type of database error', 'A CPU scheduling issue'], correct: 1 },
    { type: 'true-false', q: 'Sending a password over plain HTTP means it travels across the network as readable plain text.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Who issues TLS certificates?', options: ['Any random user', 'Trusted Certificate Authorities', 'The website\'s own server, unverified', 'Internet Service Providers only'], correct: 1 },
    { type: 'drag-drop', q: 'Order a simplified TLS handshake: [Client says hello, Server sends certificate, Secure channel established]', options: ['Client says hello', 'Server sends certificate', 'Secure channel established'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might Google factor HTTPS into search rankings?', options: ['To slow down non-HTTPS sites', 'To encourage safer browsing across the web', 'It has no real reason', 'HTTPS makes pages load instantly'], correct: 1 },
    { type: 'code-output', q: 'function valid(cert, date) {\n  return date >= cert.from && date <= cert.to;\n}\nconsole.log(valid({from:"2025-01-01", to:"2026-01-01"}, "2026-06-25"));\n\nWhat is logged?', options: ['true', 'false', 'undefined', 'an error'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'dns',
  module: 1,
  title: 'DNS',
  tagline: 'The internet\'s phonebook — turning names you can remember into addresses computers can route to.',
  readMinutes: 7,

  intro: {
    whatItIs: `DNS (Domain Name System) translates human-readable domain names (like example.com) into IP addresses (like 93.184.216.34) that computers actually use to route traffic. It's a distributed, hierarchical lookup system — no single server holds every answer; queries are resolved through a chain of specialized servers.`,
    whyItMatters: `"DNS_PROBE_FINISHED_NXDOMAIN," "this site can't be reached," or a freshly-deployed website not loading for hours after launch are almost always DNS issues. Understanding the lookup chain and caching/propagation turns a mysterious failure into a specific, diagnosable step.`,
    whereUsed: `Every time you type a URL, click a link, or an app makes an API call to a named host, a DNS lookup happens first — translating that name into the IP address needed to actually establish a connection.`,
    commonMistakes: `A common mistake is expecting DNS changes (like pointing a domain to a new server) to take effect instantly everywhere. DNS records are cached at multiple layers (browser, OS, ISP) for a duration called TTL (time-to-live), so changes can take anywhere from minutes to 48+ hours to fully propagate worldwide.`,
  },

  visual: { caption: 'A domain lookup\'s journey through the DNS hierarchy', type: 'dns-lookup-chain' },

  examples: [
    { difficulty: 'very-easy', title: 'Mapping a name to an address', explanation: `DNS is fundamentally a lookup table: name in, address out. This models the simplest possible version.`, code: `const dnsRecords = { "example.com": "93.184.216.34", "openai.com": "104.18.12.123" };\nconsole.log(dnsRecords["example.com"]);`, language: 'javascript', output: `93.184.216.34` },
    { difficulty: 'easy', title: 'Handling a domain with no record', explanation: `If a domain isn't found, DNS resolution fails — modeled here as an undefined lookup, similar to an NXDOMAIN ("non-existent domain") error.`, code: `const dnsRecords = { "example.com": "93.184.216.34" };\n\nfunction resolve(domain) {\n  return dnsRecords[domain] || "NXDOMAIN: no record found";\n}\n\nconsole.log(resolve("example.com"));\nconsole.log(resolve("this-domain-does-not-exist.com"));`, language: 'javascript', output: `93.184.216.34\nNXDOMAIN: no record found` },
    { difficulty: 'medium', title: 'Modeling cache with TTL expiry', explanation: `DNS responses are cached for a duration (TTL). This models a cache entry expiring after its TTL passes, requiring a fresh lookup.`, code: `function createCacheEntry(value, ttlSeconds, now) {\n  return { value, expiresAt: now + ttlSeconds };\n}\n\nfunction getCached(entry, now) {\n  if (now > entry.expiresAt) return "EXPIRED — need fresh lookup";\n  return entry.value;\n}\n\nconst entry = createCacheEntry("93.184.216.34", 300, 1000); // TTL of 300s, cached at t=1000\nconsole.log(getCached(entry, 1100)); // still within TTL\nconsole.log(getCached(entry, 1500)); // TTL has passed`, language: 'javascript', output: `93.184.216.34\nEXPIRED — need fresh lookup` },
    { difficulty: 'medium-plus', title: 'Simulating the resolver chain', explanation: `A real DNS lookup typically hops: browser cache → OS cache → resolver (often via ISP) → root server → TLD server → authoritative server. This models that chain conceptually as a series of fallback checks.`, code: `function resolveChain(domain, caches) {\n  const steps = ["browserCache", "osCache", "resolverCache", "authoritative"];\n  for (const step of steps) {\n    if (caches[step] && caches[step][domain]) {\n      return { foundAt: step, ip: caches[step][domain] };\n    }\n  }\n  return { foundAt: "none", ip: null };\n}\n\nconst caches = {\n  browserCache: {},\n  osCache: {},\n  resolverCache: { "example.com": "93.184.216.34" },\n  authoritative: { "example.com": "93.184.216.34" },\n};\n\nconsole.log(resolveChain("example.com", caches));`, language: 'javascript', output: `{ foundAt: 'resolverCache', ip: '93.184.216.34' }` },
    { difficulty: 'hard', title: 'Modeling DNS record types', explanation: `DNS supports multiple record types beyond simple A records (IPv4 address): CNAME (alias), MX (mail server), TXT (verification text), and more. This models looking up different record types for the same domain.`, code: `const records = {\n  "example.com": {\n    A: "93.184.216.34",\n    MX: "mail.example.com",\n    TXT: "v=spf1 include:_spf.example.com ~all",\n  },\n  "www.example.com": { CNAME: "example.com" },\n};\n\nfunction lookup(domain, type) {\n  return records[domain] && records[domain][type];\n}\n\nconsole.log("A record:", lookup("example.com", "A"));\nconsole.log("CNAME record:", lookup("www.example.com", "CNAME"));\nconsole.log("MX record:", lookup("example.com", "MX"));`, language: 'javascript', output: `A record: 93.184.216.34\nCNAME record: example.com\nMX record: mail.example.com` },
    { difficulty: 'real-world', title: 'Why a newly bought domain doesn\'t work instantly', explanation: `After pointing a domain to a new server, full global propagation can take time because of caching at every layer (TTL). This models why some users see the new site immediately while others still see old/no data for a while.`, code: `function simulateUserExperience(userCacheExpiresAt, changeTimestamp, now) {\n  if (userCacheExpiresAt > now) {\n    return "Still seeing OLD data (cached, hasn't expired yet)";\n  }\n  return "Seeing NEW data (cache expired, fresh lookup performed)";\n}\n\nconsole.log("User A:", simulateUserExperience(2000, 1000, 1500)); // their cache hasn't expired\nconsole.log("User B:", simulateUserExperience(1200, 1000, 1500)); // their cache already expired`, language: 'javascript', output: `User A: Still seeing OLD data (cached, hasn't expired yet)\nUser B: Seeing NEW data (cache expired, fresh lookup performed)` },
  ],

  exercises: [
    { level: 1, title: 'Define DNS in one sentence', problem: `Explain what DNS does, using the phonebook analogy or your own.`, hints: ['Think translation: human-friendly name → machine-usable address.'], solution: `DNS translates human-readable domain names (like example.com) into the numeric IP addresses computers use to actually route network traffic, similar to how a phonebook translates a person's name into their phone number.` },
    { level: 2, title: 'Diagnose NXDOMAIN', problem: `A user gets "DNS_PROBE_FINISHED_NXDOMAIN" when visiting a URL. What does this specifically indicate, as opposed to a generic "can't connect" error?`, hints: ['NXDOMAIN has a precise technical meaning distinct from a server being down.'], solution: `NXDOMAIN specifically means the domain name itself doesn't exist in DNS — there's no record to resolve, often due to a typo in the URL, an unregistered/expired domain, or a domain that was never set up — as opposed to the domain existing but its server being unreachable (which would show a different error).` },
    { level: 3, title: 'Explain propagation delay', problem: `A company switches their website to a new hosting provider and updates their DNS records. Some users see the new site immediately; others see an error or the old site for up to 24 hours. Why?`, hints: ['Think about caching at multiple layers (browser, OS, ISP resolver) and TTL.'], solution: `DNS responses are cached at multiple layers — browser, operating system, and ISP-level resolvers — each for a duration defined by the record's TTL (time-to-live). Users whose cache already expired will perform a fresh lookup and get the new address immediately; users whose cache hasn't expired yet will keep using the old, cached address until their specific cache expires — explaining the inconsistent experience.` },
    { level: 4, title: 'Trace the resolver chain', problem: `Using the resolveChain function from the examples, if both browserCache and osCache are empty objects, but resolverCache has the domain, where will resolveChain report the answer was found?`, hints: ['The function checks steps in order and returns at the first match.'], solution: `It will report foundAt: "resolverCache", since browserCache and osCache are checked first (and have no match), and resolverCache is the next step in the chain where a match exists.` },
    { level: 5, title: 'Add an AAAA record type', problem: `DNS "AAAA" records map a domain to an IPv6 address (as opposed to "A" records, which map to IPv4). Extend the records object/lookup function from the examples to support looking up an AAAA record for example.com.`, hints: ['Add a new key, AAAA, alongside the existing A, MX, TXT keys.'], solution: `const records = {\n  "example.com": {\n    A: "93.184.216.34",\n    AAAA: "2606:2800:220:1:248:1893:25c8:1946",\n    MX: "mail.example.com",\n  },\n};\nconsole.log(lookup("example.com", "AAAA"));` },
    { level: 6, title: 'Real-world: explain DNS-based outages', problem: `In 2021, a major DNS-related misconfiguration caused several large websites to become unreachable simultaneously for users worldwide, even though the websites\' actual servers were fine. Using what you know about DNS, explain how a DNS problem alone — without any server crashing — can make a perfectly healthy website seem completely down.`, hints: ['Recall that DNS resolution is a required first step before any connection is made.', 'If the name can\'t be resolved, the browser never even reaches the server to find out it\'s healthy.'], solution: `Before a browser can connect to a website's server, it must first resolve the domain name to an IP address via DNS. If DNS resolution fails — due to misconfigured records, an unreachable DNS provider, or corrupted records — the browser never gets far enough to even attempt a connection to the actual (perfectly healthy) web server. From the user's perspective the site is "down," even though the real servers serving the site were never affected; the failure happened entirely at the name-resolution step, before any server interaction could occur.` },
  ],

  interview: [
    { q: 'What problem does DNS solve?', a: `DNS solves the problem of humans needing memorable names (domains) while computers need numeric IP addresses to route network traffic. It provides a distributed lookup system to translate between the two automatically.` },
    { q: 'What is TTL in the context of DNS, and why does it matter?', a: `TTL (time-to-live) specifies how long a DNS record should be cached before it must be looked up again. It matters because it controls how quickly changes to DNS records propagate — a low TTL means changes take effect faster everywhere, but at the cost of more frequent lookups; a high TTL reduces lookup load but slows propagation of changes.` },
    { q: 'What is the difference between an A record and a CNAME record?', a: `An A record maps a domain directly to an IPv4 address. A CNAME record maps a domain to another domain name (an alias), which is then itself resolved — useful when you want a subdomain to always point to whatever address the main domain currently resolves to, without duplicating the IP.` },
    { q: 'Why can a domain appear "down" to some users but not others right after a DNS change?', a: `Because DNS responses are cached at multiple independent layers (browser, OS, ISP resolver), each with its own TTL-based expiry. Users with stale, unexpired cached entries will keep resolving to the old address until their specific cache expires, while users with expired or no cache will get the new address immediately.` },
    { q: 'Can a website be completely healthy but still appear "unreachable" to users? How?', a: `Yes — if DNS resolution fails (due to misconfiguration, an outage at the DNS provider, or similar), browsers can\'t translate the domain into an IP address and therefore never attempt to connect to the actual server at all. The server itself could be perfectly healthy and simply never get a chance to respond.` },
  ],

  realWorld: [
    { company: 'Amazon', text: 'AWS Route 53 is a managed DNS service used by countless companies to control how their domains resolve, including advanced routing based on latency or geographic location.' },
    { company: 'Google', text: 'Google Public DNS (8.8.8.8) is one of the most widely used public DNS resolvers, designed for speed and reliability for users worldwide.' },
    { company: 'Netflix', text: 'Uses DNS-based routing as part of directing users to the geographically closest CDN servers, reducing latency for streaming.' },
    { company: 'Stripe', text: 'Relies on carefully managed DNS configurations (including for subdomains used by webhooks and APIs) since DNS misconfiguration could break payment integrations for merchants relying on those endpoints.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does DNS primarily do?', options: ['Encrypts website traffic', 'Translates domain names into IP addresses', 'Stores website files', 'Speeds up the CPU'], correct: 1 },
    { type: 'true-false', q: 'DNS changes always take effect instantly for every user worldwide.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does TTL control in DNS?', options: ['The website\'s color scheme', 'How long a record is cached before re-lookup', 'The server\'s CPU speed', 'The number of users allowed'], correct: 1 },
    { type: 'code-output', q: 'const records = {"a.com":"1.2.3.4"};\nfunction resolve(d){ return records[d] || "NXDOMAIN"; }\nconsole.log(resolve("b.com"));\n\nWhat is logged?', options: ['"1.2.3.4"', '"NXDOMAIN"', 'undefined', 'an error'], correct: 1 },
    { type: 'mcq', q: 'What does a CNAME record do?', options: ['Maps a domain to an IPv4 address directly', 'Maps a domain to another domain name (an alias)', 'Encrypts DNS traffic', 'Stores email content'], correct: 1 },
    { type: 'true-false', q: 'A website\'s server can be completely healthy while still appearing unreachable due to a DNS failure.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What does "NXDOMAIN" mean?', options: ['The server is overloaded', 'The domain does not exist / has no record', 'The connection was encrypted', 'The request used the wrong HTTP method'], correct: 1 },
    { type: 'drag-drop', q: 'Order a typical DNS lookup chain: [Browser cache, OS cache, ISP resolver, Authoritative server]', options: ['Browser cache', 'OS cache', 'ISP resolver', 'Authoritative server'], correct: [0, 1, 2, 3] },
    { type: 'mcq', q: 'Why might two users see different results right after a DNS record changes?', options: ['DNS doesn\'t support multiple users', 'Their caches may have different remaining TTL before expiry', 'One user has a faster CPU', 'DNS is random by design'], correct: 1 },
    { type: 'code-output', q: 'function getCached(entry, now){ return now > entry.expiresAt ? "EXPIRED" : entry.value; }\nconsole.log(getCached({value:"X", expiresAt: 100}, 50));\n\nWhat is logged?', options: ['"X"', '"EXPIRED"', 'undefined', 'an error'], correct: 0 },
  ],
});
