/* Module 29 — Data Structures in Programming */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }
window.CSFA_RAW_TOPICS.push({
  id: 'm29-maps-sets', module: 29, title: 'Maps, Sets & Modern Data Structures',
  tagline: 'Beyond arrays and objects — Map, Set, WeakMap for efficient lookups and unique collections.',
  readMinutes: 6,
  intro: {
    whatItIs: "JavaScript's Map is a key-value store (like Object) but allows any type as key and maintains insertion order. Set is a collection of unique values — duplicates are automatically removed. WeakMap/WeakSet hold weak references, allowing garbage collection of their keys. These structures solve specific problems more cleanly than plain arrays or objects.",
    whyItMatters: "Map gives O(1) lookups like Object but with guaranteed order and non-string keys. Set eliminates duplicate logic. Using the right data structure leads to cleaner, more efficient code.",
    whereUsed: "Map: caches, frequency counters, memoization. Set: de-duplication, membership testing, tracking visited nodes in graph algorithms. WeakMap: private class data, DOM element metadata.",
    commonMistakes: "Using Object as a Map when keys are not known in advance — Object has prototype chain issues (key 'constructor' conflicts with Object.prototype). Use Map for dynamic key-value stores."
  },
  visual: { caption: "Map: any-key → value. Set: {unique values only}. Both iterable with for...of.", type: "map-set-diagram" },
  examples: [
    { difficulty: "very-easy", title: "Basic Map usage", explanation: "Map stores key-value pairs with any key type.", code: "const map = new Map();\nmap.set('name', 'Alice');\nmap.set(42, 'The answer');\nmap.set(true, 'Boolean key');\nconsole.log(map.get('name'));\nconsole.log(map.get(42));\nconsole.log('Size:', map.size);", language: "javascript", output: "Alice\nThe answer\nSize: 3" },
    { difficulty: "easy", title: "Set removes duplicates", explanation: "Set automatically deduplicates — perfect for unique value collections.", code: "const nums = [1, 2, 2, 3, 3, 3, 4];\nconst unique = [...new Set(nums)];\nconsole.log('Original:', nums.length, 'items');\nconsole.log('Unique:', unique);", language: "javascript", output: "Original: 7 items\nUnique: [ 1, 2, 3, 4 ]" },
    { difficulty: "medium", title: "Frequency counter with Map", explanation: "Map is ideal for counting occurrences — the key is the word, value is the count.", code: "const words = ['the','cat','sat','on','the','mat','the'];\nconst freq = new Map();\nwords.forEach(w => freq.set(w, (freq.get(w)||0) + 1));\n[...freq.entries()].sort((a,b)=>b[1]-a[1]).forEach(([w,c]) =>\n  console.log(`${w}: ${c}`));", language: "javascript", output: "the: 3\ncat: 1\nsat: 1\non: 1\nmat: 1" },
    { difficulty: "medium-plus", title: "Set intersection and union", explanation: "Sets make set operations (union, intersection, difference) clean and readable.", code: "const a = new Set([1,2,3,4]);\nconst b = new Set([3,4,5,6]);\nconst union = new Set([...a, ...b]);\nconst intersection = new Set([...a].filter(x => b.has(x)));\nconst difference = new Set([...a].filter(x => !b.has(x)));\nconsole.log('Union:', [...union]);\nconsole.log('Intersection:', [...intersection]);\nconsole.log('Difference (a-b):', [...difference]);", language: "javascript", output: "Union: [ 1, 2, 3, 4, 5, 6 ]\nIntersection: [ 3, 4 ]\nDifference (a-b): [ 1, 2 ]" },
    { difficulty: "hard", title: "WeakMap for private data", explanation: "WeakMap allows attaching private data to objects without preventing garbage collection.", code: "const _private = new WeakMap();\nclass BankAccount {\n  constructor(balance) {\n    _private.set(this, { balance }); // private, GC-friendly\n  }\n  deposit(amount) { _private.get(this).balance += amount; }\n  getBalance() { return _private.get(this).balance; }\n}\nconst acc = new BankAccount(100);\nacc.deposit(50);\nconsole.log('Balance:', acc.getBalance());\nconsole.log('Private visible?', acc.balance); // undefined", language: "javascript", output: "Balance: 150\nPrivate visible?: undefined" },
    { difficulty: "real-world", title: "LRU Cache with Map", explanation: "Map maintains insertion order, making it perfect for LRU (Least Recently Used) cache implementation.", code: "class LRUCache {\n  constructor(capacity) { this.cap = capacity; this.map = new Map(); }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key); this.map.set(key, val); // move to end\n    return val;\n  }\n  put(key, val) {\n    if (this.map.has(key)) this.map.delete(key);\n    else if (this.map.size >= this.cap) this.map.delete(this.map.keys().next().value);\n    this.map.set(key, val);\n  }\n}\nconst lru = new LRUCache(2);\nlru.put(1, 'A'); lru.put(2, 'B');\nconsole.log(lru.get(1)); // A\nlru.put(3, 'C'); // evicts key 2\nconsole.log(lru.get(2)); // -1 (evicted)", language: "javascript", output: "A\n-1" }
  ],
  exercises: [
    { level: 1, title: "Deduplicate array", problem: "Write `unique(arr)` that returns a new array with duplicate values removed using Set.", hints: ["new Set(arr) then spread."], solution: "const unique=arr=>[...new Set(arr)];\nconsole.log(unique([1,2,2,3,3,3])); // [1,2,3]" },
    { level: 2, title: "Word frequency", problem: "Write `wordFreq(text)` that returns a Map of word → count for words in a space-separated string.", hints: ["Split, then forEach with map.set(w, (map.get(w)||0)+1)."], solution: "function wordFreq(text){const m=new Map();text.split(' ').forEach(w=>m.set(w,(m.get(w)||0)+1));return m;}\nconsole.log([...wordFreq('a b a c b a')]);" },
    { level: 3, title: "Set intersection", problem: "Write `intersection(a, b)` that returns an array of values present in both arrays.", hints: ["new Set(a), then filter b values that a-set has."], solution: "function intersection(a,b){const s=new Set(a);return b.filter(v=>s.has(v));}\nconsole.log(intersection([1,2,3,4],[3,4,5,6])); // [3,4]" }
  ],
  interview: [
    { q: "When would you use Map instead of Object?", a: "Use Map when: (1) keys are not strings (numbers, objects, functions as keys). (2) Insertion order matters and you need to iterate in that order. (3) You frequently add/remove keys — Map is optimized for this. (4) You need to avoid prototype collision issues." },
    { q: "How does Set determine uniqueness?", a: "Set uses the SameValueZero algorithm (similar to ===). Primitives compared by value, objects by reference. So two objects {a:1} and {a:1} are different in a Set (different references), but two strings 'hello' are the same." },
    { q: "What is an LRU Cache?", a: "Least Recently Used cache evicts the item that was accessed least recently when capacity is full. Used everywhere caching is needed (CPU cache, database query cache, CDN). Map in JavaScript maintains insertion order, enabling O(1) LRU with move-to-end on access." }
  ],
  realWorld: [
    { company: "LeetCode / Tech Interviews", text: "Frequency counter pattern with Map and two-pointer/Set approaches solve dozens of interview questions more elegantly than nested loops — knowing when to reach for Map/Set is a core interview skill." },
    { company: "Redis", text: "Redis is essentially a highly optimized Map at scale — key-value storage in memory with O(1) get/set. Understanding Map's O(1) operations helps explain why Redis outperforms SQL for cache lookups." }
  ],
  quiz: [
    { q: "What does new Set([1,2,2,3]) contain?", options: ["[1,2,2,3]", "[1,2,3]", "[2,3]", "[1,2]"], answer: 1 },
    { q: "What type of keys does Map support?", options: ["Only strings", "Only numbers", "Any type", "Only primitives"], answer: 2 },
    { q: "Which is O(1) lookup?", options: ["Array.indexOf", "Object/Map .get()", "Array.find", "Set.forEach"], answer: 1 },
    { q: "What happens when you add an existing value to a Set?", options: ["Error thrown", "Set gains a duplicate", "Ignored — Set stays same size", "Old value removed"], answer: 2 },
    { q: "WeakMap holds references that are:", options: ["Strong (prevent GC)", "Weak (allow GC)", "Immutable", "Typed"], answer: 1 }
  ]
});
