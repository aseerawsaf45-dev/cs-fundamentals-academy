/* ==========================================================================
   TOPIC CONTENT DATA — Module 15: Number Systems
   Topics: Decimal, Binary, Octal, Hexadecimal, Binary Arithmetic, Two's Complement, Floating Point, ASCII, Unicode
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm15-binary',
  module: 15,
  title: 'Binary & Number Systems',
  tagline: 'Decimal, binary, octal, and hex — the four counting systems every developer must know.',
  readMinutes: 7,
  intro: {
    whatItIs: "Computers work natively in binary (base-2). Programmers also use octal (base-8) and hexadecimal (base-16) as compact shorthand for binary values. Decimal (base-10) is what humans use. Converting between these systems is a core skill in systems programming, debugging, and understanding memory addresses.",
    whyItMatters: "Hex addresses appear in debuggers, memory dumps, and network protocols. Binary operations underlie bitwise flags, permissions, and encryption. Octal is used for Unix file permissions. Understanding all four systems makes you fluent in the language of computers.",
    whereUsed: "Hex: memory addresses, color codes (#FF5733), network MAC addresses. Binary: flags, permissions, hardware registers. Octal: chmod permissions in Linux. All four appear in low-level debugging.",
    commonMistakes: "Mixing up base-16 digit values — 'F' in hex is 15, not 16. Also, hexadecimal letters are case-insensitive (0xff === 0xFF), but being inconsistent makes code hard to read."
  },
  visual: { caption: "Decimal 255 expressed in all four bases: 255₁₀ = 11111111₂ = 377₈ = FF₁₆", type: "number-systems" },
  examples: [
    {
      difficulty: "very-easy", title: "Decimal to binary",
      explanation: "toString(2) converts any integer to its binary string representation.",
      code: "const n = 42;\nconsole.log('Decimal:', n);\nconsole.log('Binary:', n.toString(2));\nconsole.log('Octal:', n.toString(8));\nconsole.log('Hex:', n.toString(16));",
      language: "javascript", output: "Decimal: 42\nBinary: 101010\nOctal: 52\nHex: 2a"
    },
    {
      difficulty: "easy", title: "Parsing from different bases",
      explanation: "parseInt(str, base) converts a string in any base back to a decimal integer.",
      code: "console.log(parseInt('101010', 2));  // binary → 42\nconsole.log(parseInt('52', 8));      // octal → 42\nconsole.log(parseInt('2a', 16));     // hex → 42\nconsole.log(0xFF);                   // hex literal → 255",
      language: "javascript", output: "42\n42\n42\n255"
    },
    {
      difficulty: "medium", title: "Hex color code breakdown",
      explanation: "CSS hex colors pack three byte values (R, G, B) into 3 pairs of hex digits.",
      code: "const hex = 'FF5733';\nconst r = parseInt(hex.slice(0, 2), 16);\nconst g = parseInt(hex.slice(2, 4), 16);\nconst b = parseInt(hex.slice(4, 6), 16);\nconsole.log(`#${hex} = rgb(${r}, ${g}, ${b})`);",
      language: "javascript", output: "#FF5733 = rgb(255, 87, 51)"
    },
    {
      difficulty: "medium-plus", title: "Binary addition",
      explanation: "Binary addition follows the same rules as decimal, but carries happen at 2 instead of 10.",
      code: "const a = 0b1011; // 11\nconst b = 0b0110; //  6\nconst sum = a + b; // 17 = 0b10001\nconsole.log(`${a.toString(2)} + ${b.toString(2)} = ${sum.toString(2)} (${sum} decimal)`);",
      language: "javascript", output: "1011 + 110 = 10001 (17 decimal)"
    },
    {
      difficulty: "hard", title: "Two's complement representation",
      explanation: "Two's complement is how CPUs store negative integers. To negate: invert all bits, then add 1.",
      code: "function twosComplement(n, bits) {\n  if (n >= 0) return n.toString(2).padStart(bits, '0');\n  return (Math.pow(2, bits) + n).toString(2);\n}\nconsole.log('5  in 8-bit:', twosComplement(5, 8));\nconsole.log('-5 in 8-bit:', twosComplement(-5, 8));\nconsole.log('-1 in 8-bit:', twosComplement(-1, 8));",
      language: "javascript", output: "5  in 8-bit: 00000101\n-5 in 8-bit: 11111011\n-1 in 8-bit: 11111111"
    },
    {
      difficulty: "real-world", title: "Unix permission octal values",
      explanation: "Linux chmod permissions use octal: each digit represents 3 bits for owner/group/others (rwx).",
      code: "function parsePermissions(octal) {\n  const labels = ['Owner', 'Group', 'Others'];\n  return String(octal).split('').map((d, i) => {\n    const n = parseInt(d, 8);\n    return `${labels[i]}: ${'r'.repeat(n>>2)}${'w'.repeat((n>>1)&1)}${'x'.repeat(n&1)} (${d})`;\n  }).join('\\n');\n}\nconsole.log(parsePermissions(755));",
      language: "javascript", output: "Owner: rwx (7)\nGroup: r-x (5)\nOthers: r-x (5)"
    }
  ],
  exercises: [
    {
      level: 1, title: "Base conversions",
      problem: "Write a function `convertAll(n)` that takes a decimal integer and returns an object with keys 'binary', 'octal', and 'hex' showing the number in each base.",
      hints: ["Use toString(2), toString(8), toString(16).", "Return an object with three keys."],
      solution: "function convertAll(n) {\n  return { binary: n.toString(2), octal: n.toString(8), hex: n.toString(16) };\n}\nconsole.log(convertAll(255));"
    },
    {
      level: 2, title: "Hex color to RGB",
      problem: "Write `hexToRgb(hex)` that accepts a 6-digit hex color string (without #) and returns an object `{r, g, b}` with decimal values.",
      hints: ["Split into 3 pairs of 2 chars.", "Use parseInt(pair, 16) for each."],
      solution: "function hexToRgb(hex) {\n  return {\n    r: parseInt(hex.slice(0,2), 16),\n    g: parseInt(hex.slice(2,4), 16),\n    b: parseInt(hex.slice(4,6), 16)\n  };\n}\nconsole.log(hexToRgb('FF5733'));"
    },
    {
      level: 3, title: "Check bit is set",
      problem: "Write `isBitSet(n, position)` that returns true if the bit at the given position (0=LSB) in integer n is 1.",
      hints: ["Use (n >> position) & 1 to isolate the bit.", "Return whether it equals 1."],
      solution: "function isBitSet(n, position) {\n  return ((n >> position) & 1) === 1;\n}\nconsole.log(isBitSet(0b1010, 1)); // true (bit 1 is set)\nconsole.log(isBitSet(0b1010, 0)); // false (bit 0 is 0)"
    }
  ],
  interview: [
    { q: "Why do programmers use hexadecimal instead of binary?", a: "Hexadecimal is a compact representation of binary — each hex digit represents exactly 4 bits. So a 32-bit value needs 8 hex digits but 32 binary digits. Hex is much easier to read and write while still being directly mappable to binary." },
    { q: "How does two's complement allow negative numbers?", a: "Two's complement reserves the highest bit as a sign bit. Negative numbers are represented by inverting all bits and adding 1. This elegantly allows the same hardware addition circuit to handle both addition and subtraction correctly, including overflow." },
    { q: "What is a nibble?", a: "A nibble is 4 bits — half a byte. It can represent values 0–15, which maps directly to a single hexadecimal digit (0–F). This is why hex is so useful for expressing binary data." }
  ],
  realWorld: [
    { company: "CSS / Web Standards", text: "CSS color codes like #FF5733 are hex triplets. Web developers who understand number systems can mentally parse colors, calculate complementary hues, and understand why 0x00 is black and 0xFF is full brightness." },
    { company: "Wireshark / Network Analysis", text: "Packet analyzers display raw network data as hex dumps. Network engineers fluent in hexadecimal can read protocols, identify malformed packets, and spot intrusions directly from the bytes on the wire." }
  ],
  quiz: [
    { q: "What is 0xFF in decimal?", options: ["15", "256", "255", "128"], answer: 2 },
    { q: "What base does hexadecimal use?", options: ["Base 2", "Base 8", "Base 12", "Base 16"], answer: 3 },
    { q: "What is the binary representation of 13?", options: ["1011", "1101", "1100", "1001"], answer: 1 },
    { q: "How do you read Unix permission '755' in octal?", options: ["All permissions for all", "Owner: all, Group: rx, Others: rx", "Only owner can write", "No execute permissions"], answer: 1 },
    { q: "In two's complement 8-bit, what is the binary for -1?", options: ["10000001", "11111111", "01111111", "00000001"], answer: 1 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm15-floating-point',
  module: 15,
  title: 'Floating Point Numbers',
  tagline: 'How computers represent decimals — and why 0.1 + 0.2 ≠ 0.3.',
  readMinutes: 6,
  intro: {
    whatItIs: "Floating point is the standard way computers represent real (decimal) numbers. IEEE 754 is the universal standard: a float is stored as sign × mantissa × 2^exponent. A 64-bit double has 1 sign bit, 11 exponent bits, and 52 mantissa bits. Most languages (including JavaScript) use 64-bit doubles by default.",
    whyItMatters: "Floating point has precision limits. Not all decimal fractions can be represented exactly in binary, leading to rounding errors. This causes bugs in financial calculations, scientific computations, and equality comparisons. Every developer must understand why 0.1 + 0.2 !== 0.3.",
    whereUsed: "Every calculation with decimal numbers in JavaScript, Python, Java, C, etc. uses IEEE 754 floating point. Financial systems, game physics, scientific simulations, graphics — all affected by floating point precision.",
    commonMistakes: "Using floating point for financial calculations (e.g., prices, currency). Use integer arithmetic (amounts in cents) or a BigDecimal library for money. Never compare floats with === — use an epsilon comparison."
  },
  visual: { caption: "IEEE 754 double: 1 sign bit | 11 exponent bits | 52 mantissa bits = 64 bits total", type: "bit-layout" },
  examples: [
    {
      difficulty: "very-easy", title: "The classic floating point surprise",
      explanation: "0.1 + 0.2 cannot be represented exactly in binary floating point, producing a rounding artifact.",
      code: "console.log(0.1 + 0.2);\nconsole.log(0.1 + 0.2 === 0.3);\nconsole.log(0.1 + 0.2 === 0.30000000000000004);",
      language: "javascript", output: "0.30000000000000004\nfalse\ntrue"
    },
    {
      difficulty: "easy", title: "Epsilon comparison",
      explanation: "To compare floats for equality, check if the difference is smaller than an epsilon (tiny tolerance value).",
      code: "function floatEqual(a, b, eps = 1e-9) {\n  return Math.abs(a - b) < eps;\n}\nconsole.log(floatEqual(0.1 + 0.2, 0.3));  // true\nconsole.log(floatEqual(0.1 + 0.2, 0.31)); // false",
      language: "javascript", output: "true\nfalse"
    },
    {
      difficulty: "medium", title: "Precision loss in large integers",
      explanation: "JavaScript's Number type can only represent integers exactly up to 2^53 - 1. Beyond that, precision is lost.",
      code: "const max = Number.MAX_SAFE_INTEGER;\nconsole.log('Max safe int:', max);\nconsole.log(max + 1 === max + 2); // precision lost!\n// BigInt solves this:\nconsole.log(BigInt(max) + 1n === BigInt(max) + 2n);",
      language: "javascript", output: "Max safe int: 9007199254740991\ntrue\nfalse"
    },
    {
      difficulty: "medium-plus", title: "Currency in cents (avoid floats for money)",
      explanation: "Financial systems use integer cents to avoid floating point errors in money arithmetic.",
      code: "// BAD: float arithmetic\nconst priceA = 1.10;\nconst priceB = 2.20;\nconsole.log('Float sum:', priceA + priceB); // 3.3000...04\n\n// GOOD: integer cents\nconst centsA = 110;\nconst centsB = 220;\nconsole.log('Cents sum:', (centsA + centsB) / 100, 'USD');",
      language: "javascript", output: "Float sum: 3.3000000000000003\nCents sum: 3.3 USD"
    },
    {
      difficulty: "hard", title: "IEEE 754 bit examination",
      explanation: "We can peek at the raw bits of a float using DataView and ArrayBuffer.",
      code: "function floatBits(n) {\n  const buf = new ArrayBuffer(8);\n  new DataView(buf).setFloat64(0, n);\n  return [...new Uint8Array(buf)]\n    .map(b => b.toString(2).padStart(8, '0')).join(' ');\n}\nconsole.log('Bits of 1.0:', floatBits(1.0).slice(0, 35) + '...');",
      language: "javascript", output: "Bits of 1.0: 00111111 11110000 00000000 00000000..."
    },
    {
      difficulty: "real-world", title: "Rounding to N decimal places",
      explanation: "A common real-world fix: round to a fixed number of decimal places using toFixed() and parseFloat().",
      code: "function roundTo(n, decimals) {\n  return parseFloat(n.toFixed(decimals));\n}\nconsole.log(roundTo(0.1 + 0.2, 2)); // 0.3\nconsole.log(roundTo(1.005, 2));     // 1 (note: still tricky)\nconsole.log(roundTo(1.255, 2));     // 1.26",
      language: "javascript", output: "0.3\n1\n1.26"
    }
  ],
  exercises: [
    {
      level: 1, title: "Safe float comparison",
      problem: "Write `nearlyEqual(a, b)` that returns true if two floats are within 0.000001 (1e-6) of each other.",
      hints: ["Use Math.abs(a - b).", "Compare to 1e-6."],
      solution: "function nearlyEqual(a, b) { return Math.abs(a - b) < 1e-6; }\nconsole.log(nearlyEqual(0.1 + 0.2, 0.3)); // true"
    },
    {
      level: 2, title: "Money in cents",
      problem: "Write a function `addPrices(...prices)` where each price is a float dollar amount. Convert to cents internally, sum them, then return the result as a dollar float rounded to 2 decimal places.",
      hints: ["Multiply each price by 100 and round.", "Sum as integers, then divide by 100."],
      solution: "function addPrices(...prices) {\n  const totalCents = prices.reduce((sum, p) => sum + Math.round(p * 100), 0);\n  return totalCents / 100;\n}\nconsole.log(addPrices(1.10, 2.20, 0.05)); // 3.35"
    },
    {
      level: 3, title: "Check if integer is safe",
      problem: "Write `isSafeInt(n)` that returns true if the integer n can be represented exactly as a JavaScript Number, false otherwise.",
      hints: ["Compare to Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.", "Use Number.isSafeInteger() or manual bounds check."],
      solution: "function isSafeInt(n) { return Number.isSafeInteger(n); }\nconsole.log(isSafeInt(9007199254740991));  // true\nconsole.log(isSafeInt(9007199254740992));  // false"
    }
  ],
  interview: [
    { q: "Why is 0.1 + 0.2 !== 0.3 in most programming languages?", a: "0.1 and 0.2 cannot be represented exactly in binary floating point (IEEE 754). They are approximated, and when added, the accumulated rounding error produces 0.30000000000000004 instead of exactly 0.3." },
    { q: "How should you handle money in code?", a: "Never use floating point for money. Store amounts as integers (cents/pennies), perform all arithmetic in integers, and only format to decimal for display. Alternatively, use a BigDecimal library that supports exact decimal arithmetic." },
    { q: "What is Number.MAX_SAFE_INTEGER in JavaScript?", a: "It is 2^53 - 1 = 9,007,199,254,740,991. Integers beyond this value cannot be represented exactly in a 64-bit IEEE 754 double, because the 52-bit mantissa only gives 53 significant bits of precision. Use BigInt for larger integers." }
  ],
  realWorld: [
    { company: "Stripe", text: "Stripe's API accepts monetary amounts as integers in the smallest currency unit (e.g., cents for USD). This avoids floating point bugs in payment processing — a critical design decision documented in their API reference." },
    { company: "NASA / Ariane 5", text: "The Ariane 5 rocket failure in 1996 was caused by a floating point conversion error: a 64-bit float was converted to a 16-bit integer and overflowed, crashing the guidance system 37 seconds after launch." }
  ],
  quiz: [
    { q: "Why does 0.1 + 0.2 not equal exactly 0.3?", options: ["JavaScript bug", "Floating point cannot represent all decimals exactly in binary", "Incorrect operator", "Integer overflow"], answer: 1 },
    { q: "What is the correct way to compare two floats for equality?", options: ["Use ===", "Use ==", "Check if |a - b| < epsilon", "Use parseInt first"], answer: 2 },
    { q: "What standard do most languages use for floating point?", options: ["IEEE 754", "ISO 8601", "UTF-8", "Two's complement"], answer: 0 },
    { q: "How many bits in a JavaScript Number (double precision float)?", options: ["32", "16", "64", "128"], answer: 2 },
    { q: "What is Number.MAX_SAFE_INTEGER?", options: ["2^32 - 1", "2^53 - 1", "2^64 - 1", "2^31 - 1"], answer: 1 }
  ]
});
