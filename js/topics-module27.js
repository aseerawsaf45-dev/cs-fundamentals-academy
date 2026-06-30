/* Module 27 — Control Flow */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }
window.CSFA_RAW_TOPICS.push({
  id: 'm27-if-else', module: 27, title: 'Control Flow — Conditionals & Loops',
  tagline: 'Directing the path your code takes — if/else, switch, for, while, break, continue.',
  readMinutes: 6,
  intro: {
    whatItIs: "Control flow statements direct the order of execution in a program. Conditionals (if/else, switch) choose different code paths based on conditions. Loops (for, while, for...of, for...in) repeat code blocks. break exits a loop early; continue skips the current iteration.",
    whyItMatters: "All program logic is built from control flow. Knowing which construct to use (for vs while vs for...of) and when to use break/continue makes code cleaner and more efficient.",
    whereUsed: "Everywhere — data filtering, validation, game loops, server request handling, recursive algorithms, event processing, UI rendering.",
    commonMistakes: "Using for...in on arrays (it iterates keys including inherited ones). Use for...of for arrays. Also, infinite while loops from forgetting to update the loop condition."
  },
  visual: { caption: "if → condition true: branch A, false: branch B. Loop: condition → body → increment → repeat", type: "control-flow" },
  examples: [
    { difficulty: "very-easy", title: "if/else if/else chain", explanation: "Conditionals branch execution based on evaluated conditions.", code: "function grade(score) {\n  if (score >= 90) return 'A';\n  else if (score >= 80) return 'B';\n  else if (score >= 70) return 'C';\n  else return 'F';\n}\n[95, 82, 71, 55].forEach(s => console.log(`${s} → ${grade(s)}`));", language: "javascript", output: "95 → A\n82 → B\n71 → C\n55 → F" },
    { difficulty: "easy", title: "switch statement", explanation: "switch matches a value against cases — better than long if/else for discrete values.", code: "function dayType(day) {\n  switch(day) {\n    case 'Saturday': case 'Sunday': return 'Weekend';\n    case 'Monday': case 'Friday': return 'Weekday';\n    default: return 'Weekday';\n  }\n}\n['Monday','Saturday','Sunday','Wednesday'].forEach(d =>\n  console.log(`${d}: ${dayType(d)}`));", language: "javascript", output: "Monday: Weekday\nSaturday: Weekend\nSunday: Weekend\nWednesday: Weekday" },
    { difficulty: "medium", title: "for...of vs for...in", explanation: "for...of iterates values (use for arrays). for...in iterates keys (use for objects).", code: "const arr = ['a','b','c'];\nconst obj = { x:1, y:2, z:3 };\nconsole.log('for...of array:');\nfor (const val of arr) console.log(' ', val);\nconsole.log('for...in object:');\nfor (const key in obj) console.log(` ${key}:${obj[key]}`);", language: "javascript", output: "for...of array:\n  a\n  b\n  c\nfor...in object:\n x:1\n y:2\n z:3" },
    { difficulty: "medium-plus", title: "break and continue", explanation: "break exits the loop immediately; continue skips to the next iteration.", code: "console.log('With break:');\nfor (let i=0; i<10; i++) { if (i===4) break; console.log(i); }\nconsole.log('With continue (skip evens):');\nfor (let i=0; i<6; i++) { if (i%2===0) continue; console.log(i); }", language: "javascript", output: "With break:\n0\n1\n2\n3\nWith continue (skip evens):\n1\n3\n5" },
    { difficulty: "hard", title: "while loop with early exit", explanation: "while loops run as long as condition is true. Use for unknown iteration counts.", code: "function findFirstPrime(start) {\n  function isPrime(n) {\n    if (n < 2) return false;\n    for (let i=2; i<=Math.sqrt(n); i++) if (n%i===0) return false;\n    return true;\n  }\n  let n = start;\n  while (!isPrime(n)) n++;\n  return n;\n}\nconsole.log('First prime >= 20:', findFirstPrime(20));\nconsole.log('First prime >= 100:', findFirstPrime(100));", language: "javascript", output: "First prime >= 20: 23\nFirst prime >= 100: 101" },
    { difficulty: "real-world", title: "Pagination loop", explanation: "Real APIs paginate results — loop fetching pages until no more data.", code: "const pages = [[1,2,3],[4,5,6],[7,8,9],[]];\nlet page = 0, allItems = [];\nwhile (true) {\n  const items = pages[page++];\n  if (!items.length) { console.log('No more pages'); break; }\n  allItems.push(...items);\n  console.log(`Fetched page ${page}: ${items}`);\n}\nconsole.log('Total items:', allItems.length);", language: "javascript", output: "Fetched page 1: 1,2,3\nFetched page 2: 4,5,6\nFetched page 3: 7,8,9\nNo more pages\nTotal items: 9" }
  ],
  exercises: [
    { level: 1, title: "FizzBuzz", problem: "Write FizzBuzz for 1–20: print 'Fizz' for multiples of 3, 'Buzz' for 5, 'FizzBuzz' for both, number otherwise.", hints: ["Check % 15 first, then %3, then %5."], solution: "for(let i=1;i<=20;i++)console.log(i%15===0?'FizzBuzz':i%3===0?'Fizz':i%5===0?'Buzz':i);" },
    { level: 2, title: "Loop with early exit", problem: "Write `findIndex(arr, target)` that returns the index of target in arr using a for loop and break, or -1 if not found.", hints: ["Use a for loop, store result, break when found."], solution: "function findIndex(arr,target){let idx=-1;for(let i=0;i<arr.length;i++){if(arr[i]===target){idx=i;break;}}return idx;}\nconsole.log(findIndex([5,3,8,1],8),findIndex([5,3,8,1],99));" },
    { level: 3, title: "Skip and sum", problem: "Sum numbers 1–100 using a for loop, but skip multiples of 7 (use continue).", hints: ["if (i%7===0) continue; sum+=i;"], solution: "let sum=0;for(let i=1;i<=100;i++){if(i%7===0)continue;sum+=i;}console.log(sum);" }
  ],
  interview: [
    { q: "When should you use for...of vs for...in?", a: "for...of iterates iterable values (arrays, strings, Maps, Sets). for...in iterates enumerable property keys of objects. Never use for...in on arrays — it may include prototype properties and doesn't guarantee order." },
    { q: "What is short-circuit evaluation?", a: "Logical operators && and || short-circuit: if left side of && is falsy, right is not evaluated. If left side of || is truthy, right is not evaluated. This is used for default values: `const x = config.value || 'default'`." },
    { q: "What is the difference between break and continue?", a: "break exits the entire loop immediately. continue skips the rest of the current iteration and moves to the next one. Both can be labeled to break/continue outer loops." }
  ],
  realWorld: [
    { company: "Stripe", text: "Stripe's pagination API returns a `has_more` boolean. Server-side code loops fetching pages while has_more is true, exactly like the pagination loop example — a ubiquitous pattern in API consumption." },
    { company: "Google", text: "Google's V8 JIT compiler optimizes loops aggressively. Loops with predictable iteration patterns and consistent types run significantly faster — type stability inside loops is a real performance consideration." }
  ],
  quiz: [
    { q: "Which loop iterates over array values (not indices)?", options: ["for...in", "for...of", "while", "do...while"], answer: 1 },
    { q: "What does continue do in a loop?", options: ["Exits the loop", "Skips current iteration", "Restarts loop from beginning", "Pauses execution"], answer: 1 },
    { q: "What is short-circuit evaluation in `a && b`?", options: ["b is always evaluated", "If a is falsy, b is not evaluated", "a and b swap values", "Both always evaluate"], answer: 1 },
    { q: "What is wrong with using for...in on arrays?", options: ["It's too slow", "It may include inherited properties and doesn't guarantee order", "It doesn't exist", "It only works on empty arrays"], answer: 1 },
    { q: "What does break do inside a switch statement?", options: ["Exits the function", "Restarts the switch", "Prevents fall-through to next case", "Throws an error"], answer: 2 }
  ]
});
