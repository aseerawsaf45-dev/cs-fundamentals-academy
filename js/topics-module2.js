/* ==========================================================================
   TOPIC CONTENT DATA — Module 2: Programming Fundamentals
   Full depth per spec: intro, visual explanation, 6 examples, 6 exercises,
   5 interview questions, real-world applications, 10-question quiz.

   IMPORTANT: this file does NOT re-initialize window.CSFA_RAW_TOPICS — that
   array is created once in topics-module1.js. This file must be loaded
   AFTER topics-module1.js in every HTML page's <script> tags, and simply
   pushes Module 2's topics onto the same shared array.
   ========================================================================== */

window.CSFA_RAW_TOPICS.push({
  id: 'variables',
  module: 2,
  title: 'Variables',
  tagline: 'Named boxes that hold data — the first idea every program is built on.',
  readMinutes: 7,

  intro: {
    whatItIs: `A variable is a named reference to a value stored in memory. Instead of writing the literal value every time, you give it a name — like total or userName — and the program looks up the current value behind that name whenever it's used. In JavaScript, variables are declared with let, const, or var.`,
    whyItMatters: `Variables are how programs remember things between steps: a user's input, a running total, a loaded file's contents. Every concept in programming — loops, functions, objects — is built on the assumption that you can store a value under a name and refer back to it. Get comfortable with variables and almost everything else becomes easier to reason about.`,
    whereUsed: `Every line of real code uses variables, from a simple counter in a loop to the massive in-memory state of a running web application or AI model.`,
    commonMistakes: `Beginners often confuse "naming" with "copying" for objects and arrays — reassigning one variable that points to an object doesn't always behave the way reassigning a number does. Another common mistake: using var out of habit instead of let/const, missing out on the safer block-scoping that let and const provide.`,
  },

  visual: { caption: 'A variable as a labeled box pointing to a value in memory', type: 'variable-box-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'Declaring and using a variable',
      explanation: `let creates a variable that can change later. Here we store a name and print it.`,
      code: `let name = "Ada";\nconsole.log(name);`,
      language: 'javascript', output: `Ada`,
    },
    {
      difficulty: 'easy', title: 'const vs let',
      explanation: `const creates a variable that can't be reassigned after its initial value. let can be reassigned. Trying to reassign a const throws an error.`,
      code: `const pi = 3.14159;\nlet radius = 2;\nradius = 5; // fine, let can change\nconsole.log("radius:", radius);\n\ntry {\n  pi = 4; // not allowed\n} catch (e) {\n  console.log("Error:", e.message);\n}`,
      language: 'javascript', output: `radius: 5\nError: Assignment to constant variable.`,
    },
    {
      difficulty: 'medium', title: 'Reassignment vs mutation',
      explanation: `Reassigning a variable points it at a new value. Mutating an object changes its contents without changing which object the variable points to. This distinction matters a lot once objects and arrays are involved.`,
      code: `let user = { name: "Ada" };\nuser.name = "Grace"; // mutation: same object, changed property\nconsole.log(user);\n\nuser = { name: "Linus" }; // reassignment: now points to a brand new object\nconsole.log(user);`,
      language: 'javascript', output: `{ name: 'Grace' }\n{ name: 'Linus' }`,
    },
    {
      difficulty: 'medium-plus', title: 'var vs let in a loop (the classic gotcha)',
      explanation: `var doesn't create a new binding per loop iteration the way let does. This famous example shows why let usually behaves more predictably in loops with callbacks.`,
      code: `// With var: all callbacks share the SAME variable\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log("var i:", i), 0);\n}\n\n// With let: each iteration gets its OWN i\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log("let j:", j), 0);\n}`,
      language: 'javascript', output: `var i: 3\nvar i: 3\nvar i: 3\nlet j: 0\nlet j: 1\nlet j: 2`,
    },
    {
      difficulty: 'hard', title: 'Swapping two variables without a helper library',
      explanation: `Array destructuring lets you swap two variables' values in one line, without needing a manual temporary variable — a small but real demonstration of how variable bindings can be rearranged.`,
      code: `let a = 1;\nlet b = 2;\n\n[a, b] = [b, a];\n\nconsole.log("a:", a, "b:", b);`,
      language: 'javascript', output: `a: 2 b: 1`,
    },
    {
      difficulty: 'real-world', title: 'Why config values are usually const',
      explanation: `Real applications declare configuration values — API URLs, feature flags, limits — as const, signaling to every other engineer reading the code that these values are intentionally fixed for the lifetime of that module, reducing the chance of an accidental, hard-to-trace reassignment bug.`,
      code: `const API_BASE_URL = "https://api.example.com/v1";\nconst MAX_RETRIES = 3;\nconst FEATURE_FLAGS = { darkMode: true, betaSearch: false };\n\nfunction buildUrl(path) {\n  return API_BASE_URL + path;\n}\n\nconsole.log(buildUrl("/users"));`,
      language: 'javascript', output: `https://api.example.com/v1/users`,
    },
  ],

  exercises: [
    { level: 1, title: 'Declare and print', problem: `Declare a variable called favoriteLanguage, set it to a string of your choice, then log it to the console.`, hints: ['Use let or const followed by the variable name.', 'Strings need quotes around them.'], solution: `const favoriteLanguage = "JavaScript";\nconsole.log(favoriteLanguage);` },
    { level: 2, title: 'Spot the error', problem: `What's wrong with this code, and why?\n\nconst score = 10;\nscore = 20;\nconsole.log(score);`, hints: ['Look closely at how score was declared.', 'const has a specific restriction.'], solution: `score is declared with const, which cannot be reassigned after its initial value. Attempting score = 20 throws "Assignment to constant variable." The fix is to declare it with let instead if it needs to change.` },
    { level: 3, title: 'Predict mutation vs reassignment', problem: `let arr = [1, 2, 3];\nlet copy = arr;\ncopy.push(4);\nconsole.log(arr);\n\nWhat gets logged, and why might this surprise a beginner?`, hints: ['arr and copy both point to the SAME array in memory.', 'push() mutates the array rather than creating a new one.'], solution: `[1, 2, 3, 4] is logged. This surprises beginners because copy was never explicitly used to change arr — but since let copy = arr makes copy point to the exact same array object (not a duplicate), mutating copy via push() also affects what arr sees, since they're really the same underlying array.` },
    { level: 4, title: 'Fix the var loop bug', problem: `Rewrite this code so each logged value is correct (0, 1, 2) instead of all logging 3:\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`, hints: ['Change the loop variable\'s declaration keyword.', 'let creates a new binding per iteration; var does not.'], solution: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// Logs: 0, 1, 2 — because let gives each iteration its own independent "i".` },
    { level: 5, title: 'Swap without a temp variable', problem: `Given let x = "first"; let y = "second";, swap their values using array destructuring in a single line, then log both.`, hints: ['Use the [a, b] = [b, a] pattern from the examples.'], solution: `let x = "first";\nlet y = "second";\n[x, y] = [y, x];\nconsole.log(x, y); // "second" "first"` },
    { level: 6, title: 'Real-world: explain a config bug', problem: `A teammate accidentally reassigned a value meant to be a fixed application setting somewhere deep in a large codebase, causing confusing bugs elsewhere. How would declaring that value with const instead of let have prevented this, and why is that a meaningful real-world practice?`, hints: ['const throws an error immediately at the reassignment attempt, rather than silently succeeding.', 'Catching the mistake at the exact line it happens is much easier to debug than discovering its effects elsewhere.'], solution: `If the setting had been declared with const, the accidental reassignment would have thrown a runtime error immediately at the exact line where the mistake happened, making it obvious and easy to fix right away. Because it was declared with let, the reassignment succeeded silently, and the resulting bug only became visible somewhere else in the program — making it much harder to trace back to its actual cause. This is exactly why real codebases default to const for values that aren't meant to change, only using let when reassignment is genuinely needed.` },
  ],

  interview: [
    { q: 'What is the difference between let, const, and var?', a: `let and const are block-scoped (confined to the nearest {} block) and were introduced in ES6; var is function-scoped and has looser, more error-prone behavior, especially inside loops. const additionally prevents reassignment after the initial value is set, while let allows reassignment. Modern JavaScript style generally prefers const by default and let only when reassignment is needed, avoiding var entirely.` },
    { q: 'Does const make an object immutable?', a: `No. const only prevents the variable itself from being reassigned to a different value — it does not freeze the contents of an object or array. You can still mutate properties or push to an array declared with const; what you can't do is point that const variable at an entirely new object or array.` },
    { q: 'Why did the classic var-in-a-loop-with-setTimeout example print the same value for every iteration?', a: `var is function-scoped, not block-scoped, so all iterations of the loop share the exact same variable binding. By the time the setTimeout callbacks actually run (after the loop has already finished), that shared variable holds its final value. let fixes this by creating a fresh, independent binding for each iteration, so each callback captures its own value.` },
    { q: 'What does it mean for a variable to be "in scope"?', a: `A variable is in scope at a given point in the code if it's accessible there — declared in an enclosing block, function, or the global scope, and not yet out of its lifetime. Trying to use a variable outside its scope (e.g. one declared inside a function, from outside that function) results in a ReferenceError.` },
    { q: 'Why might experienced developers default to const and only use let when truly necessary?', a: `Defaulting to const documents intent: it signals to anyone reading the code that a value is not expected to change, which makes the code easier to reason about and immediately flags an error if someone accidentally tries to reassign it. Reserving let for genuinely mutable values keeps that signal meaningful instead of diluted by overuse.` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'Public API client libraries declare configuration constants like base URLs and timeout values with const, making misuse or accidental mutation immediately obvious during development.' },
    { company: 'Google', text: 'Large-scale JavaScript style guides used internally at Google explicitly recommend const by default and let only when reassignment is required, specifically to reduce bug surface area across huge codebases.' },
    { company: 'Netflix', text: 'Frontend engineering teams rely on linting rules that flag any use of var, enforcing let/const everywhere to avoid the scoping bugs that have historically caused hard-to-trace production issues.' },
    { company: 'Amazon', text: 'Internal style guides for AWS SDKs and web consoles favor const for feature flags and configuration objects, since accidental reassignment of a flag controlling production behavior could affect real customers.' },
  ],

  quiz: [
    { type: 'mcq', q: 'Which keyword prevents a variable from being reassigned?', options: ['var', 'let', 'const', 'function'], correct: 2 },
    { type: 'true-false', q: 'const makes an entire object immutable, including its properties.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is the main scoping difference between var and let?', options: ['No difference', 'var is block-scoped, let is function-scoped', 'var is function-scoped, let is block-scoped', 'Both are always global'], correct: 2 },
    { type: 'code-output', q: 'const arr = [1, 2];\narr.push(3);\nconsole.log(arr.length);\n\nWhat is logged?', options: ['2', '3', 'Error', 'undefined'], correct: 1 },
    { type: 'mcq', q: 'What error occurs when reassigning a const variable?', options: ['SyntaxError', 'TypeError: Assignment to constant variable', 'No error, it just changes', 'ReferenceError'], correct: 1 },
    { type: 'true-false', q: 'let arr1 = [1,2]; let arr2 = arr1; arr2.push(3); — this changes arr1 too.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why does the classic var-in-a-setTimeout-loop bug happen?', options: ['setTimeout is broken', 'var shares one binding across all loop iterations', 'JavaScript cannot use loops with timers', 'console.log is asynchronous'], correct: 1 },
    { type: 'drag-drop', q: 'Order from least to most restrictive in modern best practice: [var, let, const]', options: ['const', 'let', 'var'], correct: [2, 1, 0] },
    { type: 'mcq', q: 'What does "in scope" mean for a variable?', options: ['It is declared with const', 'It is accessible at a given point in the code', 'It has a numeric value', 'It was declared first in the file'], correct: 1 },
    { type: 'code-output', q: 'let a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(a, b);\n\nWhat is logged?', options: ['1 2', '2 1', 'undefined undefined', 'Error'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'data-types',
  module: 2,
  title: 'Data Types',
  tagline: 'Numbers, text, booleans, and the structures built from them — the raw materials of every program.',
  readMinutes: 8,

  intro: {
    whatItIs: `A data type describes what kind of value a piece of data is and what operations make sense on it. JavaScript's primitive types are: string (text), number, boolean (true/false), undefined, null, symbol, and bigint. Beyond primitives, JavaScript has object types like plain objects, arrays, and functions.`,
    whyItMatters: `Most bugs that feel mysterious — "why is this NaN," "why did this print [object Object]," "why does 1 + "1" give "11"" — come down to a misunderstanding of types and how JavaScript converts between them. Knowing the type system precisely turns confusing output into something predictable.`,
    whereUsed: `Every value flowing through a program — form input, an API response, a database row — has a type, and how your code handles that type determines whether it behaves correctly or produces subtle bugs.`,
    commonMistakes: `A very common mistake is assuming JavaScript will "do what I mean" across types — e.g. assuming "5" + 3 gives 8 (it gives "53", because + with a string triggers string concatenation). Another common mistake is confusing null and undefined, which are both "nothing," but mean subtly different things and behave differently in comparisons.`,
  },

  visual: { caption: 'JavaScript\'s primitive types vs. object types', type: 'data-types-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'The basic primitive types', explanation: `typeof reveals what type a value is at runtime.`, code: `console.log(typeof "hello");\nconsole.log(typeof 42);\nconsole.log(typeof true);\nconsole.log(typeof undefined);`, language: 'javascript', output: `string\nnumber\nboolean\nundefined` },
    { difficulty: 'easy', title: 'null vs undefined', explanation: `undefined means a variable was declared but never assigned a value. null means a variable was explicitly set to "no value." They're similar but distinct, and typeof treats them differently in a famously odd way.`, code: `let a;\nlet b = null;\nconsole.log(a, typeof a);\nconsole.log(b, typeof b);\nconsole.log(a == b); // loose equality treats them as equal\nconsole.log(a === b); // strict equality does not`, language: 'javascript', output: `undefined undefined\nnull object\ntrue\nfalse` },
    { difficulty: 'medium', title: 'Type coercion with +', explanation: `The + operator behaves differently depending on whether either operand is a string. This is one of the most common sources of unexpected JavaScript output.`, code: `console.log(1 + 1);     // both numbers\nconsole.log("1" + 1);   // string wins, concatenation\nconsole.log(1 + "1");   // same, order doesn't matter here\nconsole.log("5" - 2);   // minus always tries to convert to numbers\nconsole.log("5" * "2"); // multiply also coerces to numbers`, language: 'javascript', output: `2\n11\n11\n3\n10` },
    { difficulty: 'medium-plus', title: 'Checking types safely', explanation: `typeof has quirks (typeof null === "object", typeof [] === "object"). Array.isArray() and other explicit checks are more reliable than typeof for distinguishing arrays from plain objects.`, code: `console.log(typeof null);\nconsole.log(typeof []);\nconsole.log(typeof {});\nconsole.log(Array.isArray([]));\nconsole.log(Array.isArray({}));`, language: 'javascript', output: `object\nobject\nobject\ntrue\nfalse` },
    { difficulty: 'hard', title: 'Building a safe type-checking helper', explanation: `A small utility function that correctly distinguishes common types, working around typeof's known inconsistencies for null and arrays.`, code: `function getType(value) {\n  if (value === null) return "null";\n  if (Array.isArray(value)) return "array";\n  return typeof value;\n}\n\n[42, "hi", true, null, undefined, [1,2], {a:1}].forEach(v => {\n  console.log(JSON.stringify(v), "->", getType(v));\n});`, language: 'javascript', output: `42 -> number\n"hi" -> string\ntrue -> boolean\nnull -> null\nundefined -> undefined\n[1,2] -> array\n{"a":1} -> object` },
    { difficulty: 'real-world', title: 'Why APIs validate types before processing', explanation: `Real backend services validate incoming request data types before trusting them — a price field that should be a number but arrives as the string "free" could cause serious bugs (or worse) if not caught. This is a simplified version of that validation pattern.`, code: `function validateOrder(order) {\n  if (typeof order.price !== "number" || order.price < 0) {\n    throw new Error("Invalid price: must be a non-negative number");\n  }\n  if (typeof order.quantity !== "number" || !Number.isInteger(order.quantity)) {\n    throw new Error("Invalid quantity: must be a whole number");\n  }\n  return true;\n}\n\ntry {\n  validateOrder({ price: "free", quantity: 2 });\n} catch (e) {\n  console.log("Rejected:", e.message);\n}\nconsole.log(validateOrder({ price: 9.99, quantity: 3 }));`, language: 'javascript', output: `Rejected: Invalid price: must be a non-negative number\ntrue` },
  ],

  exercises: [
    { level: 1, title: 'Identify the type', problem: `What does typeof return for each of these: "42", 42, true, undefined, null?`, hints: ['Remember typeof null has a famous quirk.'], solution: `typeof "42" -> "string". typeof 42 -> "number". typeof true -> "boolean". typeof undefined -> "undefined". typeof null -> "object" (a long-standing JavaScript quirk, not actually meaning null is an object).` },
    { level: 2, title: 'Predict coercion output', problem: `What does "3" + 2 + 1 evaluate to, and why? What about 3 + 2 + "1"?`, hints: ['JavaScript evaluates left to right.', 'Once a string is involved, + becomes concatenation for the rest of that chain only if a string operand is encountered at that step.'], solution: `"3" + 2 + 1 evaluates to "321": "3" + 2 first becomes "32" (string concatenation), then "32" + 1 becomes "321". 3 + 2 + "1" evaluates to "51": 3 + 2 is calculated first as plain number addition (5), then 5 + "1" becomes string concatenation, giving "51".` },
    { level: 3, title: 'Fix the validation bug', problem: `This validation always passes, even for bad input. What's wrong, and how would you fix it?\n\nfunction isValidAge(age) {\n  return age; // returns truthy/falsy, not a real boolean check\n}\nconsole.log(isValidAge("25")); // should this be valid?`, hints: ['The function doesn\'t check the TYPE of age, only its truthiness.', 'A string like "25" is truthy but might not be the intended type.'], solution: `The function just returns the value itself rather than performing an actual type and range check, so any truthy value (including strings, objects, or negative numbers as long as they're non-zero/non-empty) "passes." A real fix: \n\nfunction isValidAge(age) {\n  return typeof age === "number" && Number.isInteger(age) && age >= 0 && age < 150;\n}\nThis explicitly checks the type, not just truthiness.` },
    { level: 4, title: 'Distinguish array from object', problem: `Write a function describeValue(v) that returns "array" if v is an array, "null" if v is null, and otherwise the result of typeof v.`, hints: ['Check Array.isArray() and the null case before falling back to typeof.'], solution: `function describeValue(v) {\n  if (v === null) return "null";\n  if (Array.isArray(v)) return "array";\n  return typeof v;\n}` },
    { level: 5, title: 'Trace loose vs strict equality', problem: `For each pair, predict the result of == and ===: (0, false), ("", false), (null, undefined), (1, "1").`, hints: ['== allows type coercion before comparing; === does not.', 'JavaScript coerces 0, "", and false all to "falsy" but they are still different types.'], solution: `0 == false -> true, 0 === false -> false.\n"" == false -> true, "" === false -> false.\nnull == undefined -> true, null === undefined -> false.\n1 == "1" -> true, 1 === "1" -> false.\nIn every case, == coerces types before comparing, while === requires both type and value to match exactly.` },
    { level: 6, title: 'Real-world: explain a type bug in production', problem: `An e-commerce site briefly displayed "$NaNNaN" as a total price after a backend change. Using what you know about type coercion, give a plausible explanation of what likely happened.`, hints: ['NaN often results from attempting arithmetic on a value that can\'t convert cleanly to a number.', 'Concatenated NaN values would produce repeated "NaN" text rather than a single NaN.'], solution: `The displayed total was likely built by concatenating values with + rather than adding them numerically — if one of the price fields arrived as a non-numeric string (or undefined) from the backend change, attempting arithmetic on it would produce NaN, and if the code concatenated multiple such NaN results as strings instead of summing them as numbers, the display would show repeated "NaN" text glued together ("$NaNNaN") instead of a single dollar amount. The fix would involve validating/parsing the price values as actual numbers before performing arithmetic or display formatting.` },
  ],

  interview: [
    { q: 'What are JavaScript\'s primitive data types?', a: `string, number, boolean, undefined, null, symbol, and bigint. Everything else — objects, arrays, functions — is technically an object type built on top of these primitives.` },
    { q: 'What is the difference between null and undefined?', a: `undefined means a variable has been declared but not yet assigned a value (or a function didn\'t return anything explicitly). null is an intentional, explicit value meaning "no value" assigned by the programmer. They are loosely equal (null == undefined is true) but not strictly equal (null === undefined is false).` },
    { q: 'Why does typeof null return "object"?', a: `This is a long-standing bug in JavaScript\'s original design that has been kept for backward compatibility ever since — null is not actually an object, but typeof reports it as one due to how the type tag was implemented in the earliest versions of the language.` },
    { q: 'What is type coercion, and give an example where it causes unexpected results.', a: `Type coercion is JavaScript automatically converting a value from one type to another to make an operation work. A classic example: "5" + 3 results in "53" (string concatenation) because the + operator concatenates if either operand is a string, while "5" - 3 results in 2 because - always attempts numeric conversion, with no string-concatenation behavior.` },
    { q: 'Why is Array.isArray() preferred over typeof for checking if something is an array?', a: `typeof returns "object" for both plain objects and arrays, since arrays are technically a specialized kind of object in JavaScript — so typeof can\'t distinguish them. Array.isArray() is a dedicated check specifically designed to correctly identify arrays regardless of this overlap.` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'Payment APIs strictly validate that amount fields are integers representing cents (not floating-point dollars), specifically to avoid type-related rounding and coercion bugs in financial calculations.' },
    { company: 'Google', text: 'Form validation across Google products checks input types explicitly rather than relying on truthiness checks, to avoid silently accepting malformed data like numeric strings where real numbers are expected.' },
    { company: 'Amazon', text: 'Product catalog and pricing systems enforce strict type validation on incoming data from third-party sellers, since a malformed price type could otherwise propagate incorrect charges to customers.' },
    { company: 'Netflix', text: 'Client-server API contracts use schema validation (often via TypeScript or JSON schema) specifically to catch type mismatches before they reach runtime, given the user-facing cost of a type-coercion bug at scale.' },
  ],

  quiz: [
    { type: 'mcq', q: 'Which of these is NOT a JavaScript primitive type?', options: ['string', 'boolean', 'array', 'number'], correct: 2 },
    { type: 'true-false', q: 'null === undefined evaluates to true.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does typeof null return?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2 },
    { type: 'code-output', q: 'console.log("5" + 3);\n\nWhat is logged?', options: ['8', '"53"', 'NaN', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which check correctly identifies an array (avoiding typeof\'s limitation)?', options: ['typeof value === "array"', 'value instanceof Number', 'Array.isArray(value)', 'value.length > 0'], correct: 2 },
    { type: 'true-false', q: '"5" - 2 results in the number 3.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is type coercion?', options: ['Declaring a variable with const', 'JavaScript automatically converting a value\'s type to make an operation work', 'A syntax error', 'A method on arrays'], correct: 1 },
    { type: 'drag-drop', q: 'Order these by their typeof result alphabetically: ["hello", true, 42]', options: ['true', '42', '"hello"'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why is checking typeof age === "number" safer than just checking if(age)?', options: ['It is not safer', 'It explicitly verifies the type, not just truthiness', 'typeof is faster', 'if(age) always throws an error'], correct: 1 },
    { type: 'code-output', q: 'console.log(0 == false, 0 === false);\n\nWhat is logged?', options: ['true true', 'false false', 'true false', 'false true'], correct: 2 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'conditions',
  module: 2,
  title: 'Conditions',
  tagline: 'Letting code make decisions — the if/else logic that gives programs their branching behavior.',
  readMinutes: 7,

  intro: {
    whatItIs: `Conditional statements (if, else if, else, and switch) let a program execute different code depending on whether an expression evaluates to true or false. This is how programs branch — choosing one path instead of another based on data.`,
    whyItMatters: `Nearly every meaningful program needs to behave differently depending on circumstances: is the user logged in, is the cart empty, did the API call succeed. Conditions are the mechanism that makes that branching possible, and writing them clearly is a core readability skill.`,
    whereUsed: `Form validation, access control, feature flags, error handling, game logic — anywhere a decision needs to be made based on current data.`,
    commonMistakes: `A common mistake is writing deeply nested if statements that become hard to follow ("if pyramids"). Another is confusing assignment (=) with comparison (=== or ==) inside a condition, which can silently turn a comparison into an assignment in some languages (though JavaScript flags this as a likely error in most linters).`,
  },

  visual: { caption: 'A branching decision tree: how if/else routes execution', type: 'conditions-branch-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'A basic if/else', explanation: `The simplest conditional: check a condition, run one branch or the other.`, code: `let age = 20;\nif (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}`, language: 'javascript', output: `Adult` },
    { difficulty: 'easy', title: 'Chaining with else if', explanation: `else if lets you check multiple conditions in sequence, stopping at the first one that's true.`, code: `function gradeLabel(score) {\n  if (score >= 90) return "A";\n  else if (score >= 80) return "B";\n  else if (score >= 70) return "C";\n  else return "F";\n}\n\nconsole.log(gradeLabel(85));\nconsole.log(gradeLabel(60));`, language: 'javascript', output: `B\nF` },
    { difficulty: 'medium', title: 'Switch statement', explanation: `switch is an alternative to long else-if chains when checking one value against several exact possibilities. Don't forget break, or execution "falls through" to the next case.`, code: `function dayType(day) {\n  switch (day) {\n    case "Saturday":\n    case "Sunday":\n      return "Weekend";\n    default:\n      return "Weekday";\n  }\n}\n\nconsole.log(dayType("Saturday"));\nconsole.log(dayType("Tuesday"));`, language: 'javascript', output: `Weekend\nWeekday` },
    { difficulty: 'medium-plus', title: 'Combining conditions with && and ||', explanation: `Logical operators let you combine multiple conditions into one check. && requires both sides to be true; || requires at least one.`, code: `function canRentCar(age, hasLicense) {\n  if (age >= 21 && hasLicense) {\n    return "Approved";\n  }\n  return "Denied";\n}\n\nconsole.log(canRentCar(25, true));\nconsole.log(canRentCar(19, true));\nconsole.log(canRentCar(25, false));`, language: 'javascript', output: `Approved\nDenied\nDenied` },
    { difficulty: 'hard', title: 'Refactoring nested ifs into guard clauses', explanation: `Deeply nested conditionals can often be flattened using early returns ("guard clauses"), making the happy path easier to follow at a glance.`, code: `// Before: nested\nfunction processOrderNested(order) {\n  if (order) {\n    if (order.items.length > 0) {\n      if (order.paid) {\n        return "Shipping order";\n      } else {\n        return "Awaiting payment";\n      }\n    } else {\n      return "Empty cart";\n    }\n  } else {\n    return "No order";\n  }\n}\n\n// After: guard clauses\nfunction processOrder(order) {\n  if (!order) return "No order";\n  if (order.items.length === 0) return "Empty cart";\n  if (!order.paid) return "Awaiting payment";\n  return "Shipping order";\n}\n\nconsole.log(processOrder({ items: [1], paid: true }));`, language: 'javascript', output: `Shipping order` },
    { difficulty: 'real-world', title: 'Why feature flags rely on conditions', explanation: `Real products often ship a feature to only some users using a simple conditional check against a flag — letting companies test new functionality safely before a full release.`, code: `function shouldShowNewCheckout(user) {\n  if (user.betaTester) return true;\n  if (user.country === "US" && user.signupYear >= 2025) return true;\n  return false;\n}\n\nconsole.log(shouldShowNewCheckout({ betaTester: true, country: "FR", signupYear: 2020 }));\nconsole.log(shouldShowNewCheckout({ betaTester: false, country: "US", signupYear: 2025 }));\nconsole.log(shouldShowNewCheckout({ betaTester: false, country: "US", signupYear: 2019 }));`, language: 'javascript', output: `true\ntrue\nfalse` },
  ],

  exercises: [
    { level: 1, title: 'Write a basic condition', problem: `Write a function isEven(n) that returns true if a number is even, false otherwise.`, hints: ['The remainder operator % can check divisibility.', 'A number is even if n % 2 === 0.'], solution: `function isEven(n) {\n  return n % 2 === 0;\n}` },
    { level: 2, title: 'Predict the output', problem: `function check(x) {\n  if (x > 10) return "big";\n  else if (x > 5) return "medium";\n  else return "small";\n}\nconsole.log(check(7));\n\nWhat is logged, and why doesn't it return "big"?`, hints: ['Conditions are checked top to bottom, and execution stops at the first true one.', '7 is not greater than 10, so move to the next check.'], solution: `"medium" is logged. 7 > 10 is false, so the first branch is skipped. 7 > 5 is true, so "medium" is returned — execution never reaches the final else, since the second condition already matched.` },
    { level: 3, title: 'Combine conditions correctly', problem: `Write a function canVote(age, isCitizen) that returns true only if age is 18 or older AND isCitizen is true.`, hints: ['Use && to require both conditions.'], solution: `function canVote(age, isCitizen) {\n  return age >= 18 && isCitizen;\n}` },
    { level: 4, title: 'Convert if-chain to switch', problem: `Convert this if-chain into an equivalent switch statement:\n\nfunction sizeLabel(size) {\n  if (size === "S") return "Small";\n  if (size === "M") return "Medium";\n  if (size === "L") return "Large";\n  return "Unknown";\n}`, hints: ['Each "if (size === X)" becomes a "case X:" in the switch.', 'Don\'t forget a default case for "Unknown".'], solution: `function sizeLabel(size) {\n  switch (size) {\n    case "S": return "Small";\n    case "M": return "Medium";\n    case "L": return "Large";\n    default: return "Unknown";\n  }\n}` },
    { level: 5, title: 'Refactor nested ifs with guard clauses', problem: `Refactor this nested function using guard clauses (early returns) to flatten it:\n\nfunction check(user) {\n  if (user) {\n    if (user.active) {\n      return "OK";\n    } else {\n      return "Inactive";\n    }\n  } else {\n    return "No user";\n  }\n}`, hints: ['Return early for the "falsy" or unwanted cases first.'], solution: `function check(user) {\n  if (!user) return "No user";\n  if (!user.active) return "Inactive";\n  return "OK";\n}` },
    { level: 6, title: 'Real-world: design a discount eligibility check', problem: `An online store gives a 10% discount if a customer is a loyalty member OR has spent over $200 this year, but never gives a discount if their account is flagged for fraud, regardless of the other conditions. Write a function isDiscountEligible(customer) implementing this rule, and explain why the fraud check should be evaluated first.`, hints: ['The fraud check should short-circuit everything else — it\'s a guard clause.', 'Use || for the loyalty/spending OR condition, after the fraud guard.'], solution: `function isDiscountEligible(customer) {\n  if (customer.flaggedForFraud) return false; // guard clause, checked first\n  return customer.loyaltyMember || customer.yearSpend > 200;\n}\n\n// The fraud check must come first as a guard clause because it should override\n// every other condition unconditionally — if it were checked last or combined\n// into one large boolean expression, a subtle ordering or precedence mistake\n// could accidentally grant a discount to a flagged account. Checking it first\n// and returning immediately removes any ambiguity.` },
  ],

  interview: [
    { q: 'What is the difference between if/else and switch, and when would you choose one over the other?', a: `if/else evaluates arbitrary boolean expressions and works well for ranges or combined conditions. switch compares one value against several exact possibilities and reads more cleanly when you have many discrete cases for the same variable. Choose switch when checking many exact matches against one value; choose if/else for ranges, combined conditions, or anything beyond simple equality.` },
    { q: 'What are "guard clauses" and why are they useful?', a: `Guard clauses are early return statements that handle invalid or edge cases right at the top of a function, before the main logic. They flatten deeply nested conditionals, making the "happy path" of the function easier to read since it isn\'t buried several indentation levels deep.` },
    { q: 'What is the difference between && and || in a condition?', a: `&& (logical AND) requires both sides of the expression to be true for the overall expression to be true. || (logical OR) requires at least one side to be true. They\'re used to combine multiple boolean conditions into a single check.` },
    { q: 'What does "short-circuit evaluation" mean for && and ||?', a: `JavaScript stops evaluating a logical expression as soon as the result is determined: for &&, if the left side is false, the right side is never evaluated (since the result must be false). For ||, if the left side is true, the right side is never evaluated. This is sometimes used deliberately, e.g. user && user.name avoids an error if user is null.` },
    { q: 'What is a common readability problem with deeply nested if statements, and how would you address it?', a: `Deeply nested conditionals (sometimes called an "if pyramid" or "arrow code" from the visual shape of the indentation) make it hard to track which condition led to which branch, especially several levels deep. Restructuring with guard clauses, early returns, or extracting nested logic into separate named functions usually improves readability significantly.` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'Fraud detection systems use layered conditional checks (transaction amount, location mismatch, velocity of attempts) to decide in real time whether to approve, flag, or block a payment.' },
    { company: 'Netflix', text: 'Feature flag systems use simple conditional checks against user attributes (region, account tier, A/B test group) to determine which version of the UI a given user sees.' },
    { company: 'Amazon', text: 'Checkout flows use conditional logic to determine shipping options, tax calculation, and eligibility for same-day delivery, often layering many business rules into clear, prioritized conditions.' },
    { company: 'Google', text: 'Search ranking and ad-serving systems apply extensive conditional business logic to decide what content is eligible to display for a given query and user context.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does else if allow you to do?', options: ['Run two branches simultaneously', 'Check additional conditions in sequence after the first if', 'Skip all conditions', 'Declare a new variable'], correct: 1 },
    { type: 'true-false', q: 'A switch statement requires a break to prevent fallthrough to the next case.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What does && require to evaluate to true?', options: ['Either side true', 'Both sides true', 'Neither side true', 'Exactly one side true'], correct: 1 },
    { type: 'code-output', q: 'function check(x) {\n  if (x > 10) return "big";\n  else if (x > 5) return "medium";\n  else return "small";\n}\nconsole.log(check(3));\n\nWhat is logged?', options: ['"big"', '"medium"', '"small"', 'undefined'], correct: 2 },
    { type: 'mcq', q: 'What is a "guard clause"?', options: ['A type of loop', 'An early return handling an edge case before the main logic', 'A switch statement', 'A comment explaining code'], correct: 1 },
    { type: 'true-false', q: '|| stops evaluating once it finds a true value (short-circuiting).', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which is a benefit of guard clauses over deeply nested if statements?', options: ['They run faster always', 'They flatten logic, improving readability', 'They remove the need for functions', 'They prevent all bugs'], correct: 1 },
    { type: 'drag-drop', q: 'Order the evaluation for: if (a) {...} else if (b) {...} else {...} — assume a is false, b is true. Order checked: [a, b, else block skipped]', options: ['a', 'b', 'else block skipped'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'In user && user.name, what does short-circuiting prevent?', options: ['A syntax error', 'Accessing .name on a null/undefined user', 'An infinite loop', 'A type coercion'], correct: 1 },
    { type: 'code-output', q: 'function canVote(age, isCitizen) {\n  return age >= 18 && isCitizen;\n}\nconsole.log(canVote(17, true));\n\nWhat is logged?', options: ['true', 'false', 'undefined', 'Error'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'loops',
  module: 2,
  title: 'Loops',
  tagline: 'Repeating work without repeating code — the foundation of processing any collection of data.',
  readMinutes: 8,

  intro: {
    whatItIs: `A loop repeats a block of code multiple times, either a fixed number of times (for), while a condition holds (while), or once per item in a collection (for...of, .forEach, etc.). Loops let you avoid writing the same line of code dozens or millions of times.`,
    whyItMatters: `Processing a list of users, summing values, searching for an item, rendering repeated UI elements — almost everything that touches more than one piece of data uses a loop somewhere, even if it's hidden inside an array method like .map().`,
    whereUsed: `Any time a program processes a collection — rendering a list of search results, validating every field in a form, summing transaction amounts — a loop (explicit or implicit) is doing the repeating.`,
    commonMistakes: `A classic mistake is the "off-by-one" error — looping one too many or one too few times, often from getting < vs <= wrong in the loop condition. Another common mistake is writing an infinite loop by forgetting to update the loop's counter variable, freezing the program.`,
  },

  visual: { caption: 'How a for loop repeats: initialize, check, run, update', type: 'loop-cycle-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'A basic for loop', explanation: `for loops have three parts: initialization, condition, and update — repeated until the condition becomes false.`, code: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`, language: 'javascript', output: `1\n2\n3\n4\n5` },
    { difficulty: 'easy', title: 'while loop', explanation: `while loops repeat as long as a condition stays true, useful when you don't know in advance how many iterations you'll need.`, code: `let count = 0;\nwhile (count < 3) {\n  console.log("Count is", count);\n  count++;\n}`, language: 'javascript', output: `Count is 0\nCount is 1\nCount is 2` },
    { difficulty: 'medium', title: 'Looping over an array with for...of', explanation: `for...of iterates directly over the values of an array (or any iterable), without needing to manage an index manually.`, code: `const fruits = ["apple", "banana", "cherry"];\nfor (const fruit of fruits) {\n  console.log(fruit.toUpperCase());\n}`, language: 'javascript', output: `APPLE\nBANANA\nCHERRY` },
    { difficulty: 'medium-plus', title: 'break and continue', explanation: `break exits a loop entirely; continue skips to the next iteration without finishing the current one. Both are useful for controlling flow within a loop body.`, code: `for (let i = 1; i <= 10; i++) {\n  if (i % 2 === 0) continue; // skip even numbers\n  if (i > 7) break; // stop once we pass 7\n  console.log(i);\n}`, language: 'javascript', output: `1\n3\n5\n7` },
    { difficulty: 'hard', title: 'Nested loops for a multiplication table', explanation: `Loops can be nested inside one another — the inner loop runs completely for every single iteration of the outer loop. This is the basis of many grid/table-style algorithms.`, code: `for (let row = 1; row <= 3; row++) {\n  let line = "";\n  for (let col = 1; col <= 3; col++) {\n    line += (row * col) + "\\t";\n  }\n  console.log(line);\n}`, language: 'javascript', output: `1\t2\t3\t\n2\t4\t6\t\n3\t6\t9\t` },
    { difficulty: 'real-world', title: 'Why pagination exists', explanation: `Real systems avoid looping over millions of database rows at once — instead, they loop over manageable "pages" of data. This models fetching and processing data in pages rather than all at once.`, code: `const allRecords = Array.from({ length: 23 }, (_, i) => "record-" + (i + 1));\nconst pageSize = 10;\n\nfor (let start = 0; start < allRecords.length; start += pageSize) {\n  const page = allRecords.slice(start, start + pageSize);\n  console.log("Processing page:", page.length, "records");\n}`, language: 'javascript', output: `Processing page: 10 records\nProcessing page: 10 records\nProcessing page: 3 records` },
  ],

  exercises: [
    { level: 1, title: 'Print a range', problem: `Write a loop that logs the numbers from 1 to 10.`, hints: ['Use a for loop with i starting at 1.'], solution: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}` },
    { level: 2, title: 'Find the off-by-one bug', problem: `This loop is supposed to print 1 through 5 but prints 1 through 4. What's the bug?\n\nfor (let i = 1; i < 5; i++) {\n  console.log(i);\n}`, hints: ['Compare the loop condition to the intended range.', '< vs <= makes a difference at the boundary.'], solution: `The condition i < 5 stops the loop once i reaches 5, meaning the last value actually processed is 4. To include 5, the condition should be i <= 5.` },
    { level: 3, title: 'Sum an array with a loop', problem: `Write a function sumArray(arr) that returns the sum of all numbers in an array, using a loop (not .reduce()).`, hints: ['Start a total at 0 and add each element in turn.'], solution: `function sumArray(arr) {\n  let total = 0;\n  for (const num of arr) {\n    total += num;\n  }\n  return total;\n}` },
    { level: 4, title: 'Use break and continue correctly', problem: `Write a loop over the numbers 1 to 20 that skips multiples of 3 (continue) and stops entirely once it reaches a number greater than 15 (break).`, hints: ['Check the skip condition first with continue.', 'Check the stop condition next with break.'], solution: `for (let i = 1; i <= 20; i++) {\n  if (i % 3 === 0) continue;\n  if (i > 15) break;\n  console.log(i);\n}` },
    { level: 5, title: 'Build a multiplication table function', problem: `Write a function multiplicationTable(n) that returns an array of arrays representing an n x n multiplication table (e.g. n=2 returns [[1,2],[2,4]]).`, hints: ['Use a nested loop — outer loop for rows, inner loop for columns.', 'Push each row array into a results array.'], solution: `function multiplicationTable(n) {\n  const table = [];\n  for (let row = 1; row <= n; row++) {\n    const rowValues = [];\n    for (let col = 1; col <= n; col++) {\n      rowValues.push(row * col);\n    }\n    table.push(rowValues);\n  }\n  return table;\n}` },
    { level: 6, title: 'Real-world: design a paginated processor', problem: `Write a function processInPages(items, pageSize, processPage) that loops through items in chunks of pageSize, calling processPage(chunk) for each chunk. Explain why this pattern matters for very large datasets.`, hints: ['Use array.slice(start, start + pageSize) to get each chunk.', 'Loop using start += pageSize.'], solution: `function processInPages(items, pageSize, processPage) {\n  for (let start = 0; start < items.length; start += pageSize) {\n    const chunk = items.slice(start, start + pageSize);\n    processPage(chunk);\n  }\n}\n\n// This pattern matters because loading or processing millions of records all\n// at once could exhaust available memory or take an unacceptably long time\n// before any results are usable. Processing in fixed-size pages keeps memory\n// usage bounded and allows partial progress/results to be used or displayed\n// incrementally, rather than waiting for an entire massive dataset to finish.` },
  ],

  interview: [
    { q: 'What is the difference between for, while, and for...of loops?', a: `for is best when you know the number of iterations (or need explicit control over an index). while repeats as long as a condition holds, useful when the number of iterations isn\'t known upfront. for...of iterates directly over the values of an iterable (like an array), without needing to manage an index at all.` },
    { q: 'What is an "off-by-one" error and why is it common?', a: `An off-by-one error happens when a loop runs one time too many or one time too few, usually from a boundary condition mistake — confusing < with <=, or starting an index at 0 vs 1 inconsistently. It\'s common because loop boundaries require precise reasoning about whether the endpoint is inclusive or exclusive.` },
    { q: 'What is the difference between break and continue?', a: `break immediately exits the loop entirely, skipping any remaining iterations. continue skips only the rest of the current iteration\'s code and moves on to the next iteration, without exiting the loop.` },
    { q: 'What causes an infinite loop, and how would you debug one?', a: `An infinite loop happens when the loop's exit condition never becomes false — often because the loop variable isn't being updated correctly, or the condition references something that never changes. Debugging usually involves checking the loop's update step and condition carefully, or adding a temporary counter/log statement to see how many iterations actually run before the program appears to freeze.` },
    { q: 'Why might a real system process data in "pages" or "batches" instead of looping over everything at once?', a: `Processing huge datasets entirely in memory at once can exhaust available RAM or take an unacceptably long time before producing any usable result. Looping over smaller, fixed-size batches keeps memory usage predictable and allows partial results to be used, displayed, or checkpointed incrementally.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Search result pages are rendered by looping over a limited page of results rather than the entire index of matching pages, which would be computationally infeasible to process or display at once.' },
    { company: 'Amazon', text: 'Order processing and inventory systems loop through large datasets in batches during nightly reconciliation jobs, avoiding memory exhaustion when handling millions of transactions.' },
    { company: 'Netflix', text: 'Recommendation systems loop over a user\'s viewing history in efficient batches to generate updated suggestions without reprocessing the platform\'s entire catalog on every request.' },
    { company: 'Stripe', text: 'Bulk API endpoints for retrieving transaction history use pagination loops on the client side, fetching and processing one page of records at a time instead of requesting unbounded result sets.' },
  ],

  quiz: [
    { type: 'mcq', q: 'Which loop type is best when you don\'t know the number of iterations in advance?', options: ['for', 'while', 'for...of', 'They are all identical'], correct: 1 },
    { type: 'true-false', q: 'continue exits a loop entirely.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What causes an "off-by-one" error?', options: ['Using the wrong variable name', 'A boundary condition mistake, like < vs <=', 'Forgetting a semicolon', 'Using for instead of while'], correct: 1 },
    { type: 'code-output', q: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}\n\nWhat is logged?', options: ['1 2 3', '0 1 2', '0 1 2 3', '1 2'], correct: 1 },
    { type: 'mcq', q: 'What does break do inside a loop?', options: ['Skips to the next iteration', 'Exits the loop entirely', 'Pauses the loop temporarily', 'Restarts the loop'], correct: 1 },
    { type: 'true-false', q: 'for...of lets you iterate directly over array values without managing an index.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What typically causes an infinite loop?', options: ['Using let instead of const', 'The exit condition never becomes false', 'Using too many console.log statements', 'Nesting loops'], correct: 1 },
    { type: 'drag-drop', q: 'Order the parts of a for loop as they appear: [condition, update, initialization]', options: ['initialization', 'condition', 'update'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might a system process data in batches/pages instead of all at once?', options: ['It is always slower so it\'s avoided', 'To keep memory usage bounded and allow incremental progress', 'JavaScript cannot loop over large arrays', 'Batches are required by HTTP'], correct: 1 },
    { type: 'code-output', q: 'for (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) continue;\n  console.log(i);\n}\n\nWhat is logged?', options: ['1 2 3 4 5', '1 3 5', '2 4', '1 2 3'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'functions',
  module: 2,
  title: 'Functions',
  tagline: 'Reusable, named blocks of logic — the single most important tool for organizing code.',
  readMinutes: 8,

  intro: {
    whatItIs: `A function is a named, reusable block of code that performs a task, optionally accepts input (parameters), and optionally returns a result. Functions can be declared with the function keyword, as arrow functions, or as methods on objects.`,
    whyItMatters: `Functions let you write logic once and use it everywhere it's needed, instead of duplicating the same code repeatedly. They're also the primary unit of organization in most codebases — breaking a large problem into small, named, testable pieces.`,
    whereUsed: `Every meaningful program is built from functions: validating input, calculating a total, handling a button click, formatting a date. Even AI coding tools generate and call functions as the basic unit of "doing something."`,
    commonMistakes: `A common mistake is writing functions that do too many unrelated things at once, making them hard to test or reuse. Another is forgetting that a function without an explicit return statement returns undefined, which can cause confusing bugs further down the line.`,
  },

  visual: { caption: 'Inputs in, logic happens, output back out', type: 'function-io-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'A basic function', explanation: `A function declaration with one parameter and a return value.`, code: `function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("Ada"));`, language: 'javascript', output: `Hello, Ada!` },
    { difficulty: 'easy', title: 'Arrow functions', explanation: `Arrow functions are a shorter syntax for writing functions, especially common for short, single-expression logic.`, code: `const square = (n) => n * n;\nconst add = (a, b) => a + b;\n\nconsole.log(square(5));\nconsole.log(add(3, 4));`, language: 'javascript', output: `25\n7` },
    { difficulty: 'medium', title: 'Default parameters', explanation: `Parameters can have default values, used automatically when no argument (or undefined) is passed for that parameter.`, code: `function greet(name = "stranger") {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("Grace"));\nconsole.log(greet());`, language: 'javascript', output: `Hello, Grace!\nHello, stranger!` },
    { difficulty: 'medium-plus', title: 'Functions as values (higher-order functions)', explanation: `Functions can be passed as arguments to other functions, or returned from them — this is what makes array methods like .map() and .filter() possible.`, code: `function applyTwice(fn, value) {\n  return fn(fn(value));\n}\n\nconst double = (n) => n * 2;\nconsole.log(applyTwice(double, 3)); // double(double(3)) = double(6) = 12`, language: 'javascript', output: `12` },
    { difficulty: 'hard', title: 'A function that returns a function', explanation: `Functions can create and return other functions, "remembering" the values they were created with — a preview of closures, covered in depth in the next topic.`, code: `function makeMultiplier(factor) {\n  return function (n) {\n    return n * factor;\n  };\n}\n\nconst triple = makeMultiplier(3);\nconsole.log(triple(7));\nconsole.log(triple(10));`, language: 'javascript', output: `21\n30` },
    { difficulty: 'real-world', title: 'Why validation logic lives in its own function', explanation: `Real applications extract repeated logic like validation into a single named function, so the rule is defined once and reused everywhere it's needed — fixing a bug or changing the rule only requires editing one place.`, code: `function isValidEmail(email) {\n  return typeof email === "string" && email.includes("@") && email.includes(".");\n}\n\nfunction signUp(email) {\n  if (!isValidEmail(email)) {\n    return "Invalid email";\n  }\n  return "Account created for " + email;\n}\n\nconsole.log(signUp("not-an-email"));\nconsole.log(signUp("ada@example.com"));`, language: 'javascript', output: `Invalid email\nAccount created for ada@example.com` },
  ],

  exercises: [
    { level: 1, title: 'Write a basic function', problem: `Write a function double(n) that returns n multiplied by 2.`, hints: ['Use the return keyword to send back a value.'], solution: `function double(n) {\n  return n * 2;\n}` },
    { level: 2, title: 'Convert to an arrow function', problem: `Rewrite this function as an arrow function:\n\nfunction add(a, b) {\n  return a + b;\n}`, hints: ['Arrow functions use => instead of the function keyword.'], solution: `const add = (a, b) => a + b;` },
    { level: 3, title: 'Predict the return value', problem: `function greet(name) {\n  console.log("Hello " + name);\n}\nconst result = greet("Sam");\nconsole.log(result);\n\nWhat does the second console.log print, and why?`, hints: ['greet does not have a return statement.', 'A function without an explicit return returns undefined.'], solution: `undefined is printed. The greet function logs a message but never explicitly returns a value, so calling it returns undefined by default — that's what gets assigned to result.` },
    { level: 4, title: 'Use a default parameter', problem: `Write a function calculateTotal(price, taxRate = 0.1) that returns price plus tax, using a default 10% tax rate if none is given.`, hints: ['Default parameters are written as paramName = defaultValue in the function signature.'], solution: `function calculateTotal(price, taxRate = 0.1) {\n  return price + price * taxRate;\n}` },
    { level: 5, title: 'Write a higher-order function', problem: `Write a function repeat(fn, times) that calls fn() exactly times times, then returns nothing meaningful (just demonstrates the calls happening).`, hints: ['Use a loop that calls fn() on each iteration.'], solution: `function repeat(fn, times) {\n  for (let i = 0; i < times; i++) {\n    fn();\n  }\n}\n\n// Example usage:\nrepeat(() => console.log("Hi!"), 3);` },
    { level: 6, title: 'Real-world: extract repeated logic into a function', problem: `Three different parts of an app each separately check "if (typeof value === 'number' && value >= 0)" before processing a price. Write a single reusable function isValidPrice(value) that replaces all three checks, and explain the real-world benefit of doing this.`, hints: ['Wrap the exact same condition in a named function.', 'The benefit is about maintenance, not performance.'], solution: `function isValidPrice(value) {\n  return typeof value === "number" && value >= 0;\n}\n\n// Real-world benefit: if the validation rule ever needs to change (e.g. to also\n// reject NaN, or to cap the maximum allowed price), there is now exactly ONE\n// place to update instead of three. This reduces the risk of the three checks\n// silently drifting out of sync with each other over time as the codebase evolves,\n// which is a very common real source of subtle bugs in growing applications.` },
  ],

  interview: [
    { q: 'What is the difference between a function declaration and a function expression?', a: `A function declaration (function name() {}) is hoisted, meaning it can be called before its definition appears in the code. A function expression (const name = function() {} or an arrow function) is not hoisted in the same way — the variable must be defined before it can be called.` },
    { q: 'What does a function return if it has no explicit return statement?', a: `It returns undefined. Every JavaScript function returns something, and if no return statement is reached (or return is used without a value), the result is undefined.` },
    { q: 'What is a "higher-order function"?', a: `A higher-order function either accepts another function as an argument, returns a function, or both. Array methods like .map(), .filter(), and .reduce() are common examples — they accept a function as their argument to customize behavior.` },
    { q: 'What is the benefit of extracting repeated logic into a named function?', a: `It creates a single source of truth for that logic. If the rule needs to change, there is exactly one place to update, reducing the risk of different parts of the codebase drifting out of sync with slightly different versions of "the same" logic.` },
    { q: 'What is the difference between parameters and arguments?', a: `Parameters are the named placeholders listed in a function's definition (e.g., function greet(name) — name is a parameter). Arguments are the actual values passed in when the function is called (e.g., greet("Ada") — "Ada" is the argument).` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'Validation and formatting logic for currency amounts is centralized into shared utility functions used across the entire payments codebase, ensuring consistent behavior everywhere money is handled.' },
    { company: 'Google', text: 'Internal style guides emphasize small, single-purpose functions specifically because they are easier to test, review, and reuse across the vast scale of Google\'s codebases.' },
    { company: 'Netflix', text: 'Recommendation and personalization logic is broken into composable functions, allowing different teams to reuse and combine scoring functions without duplicating logic.' },
    { company: 'Amazon', text: 'Checkout and pricing calculations rely on shared, well-tested utility functions rather than duplicated inline logic, reducing the chance of inconsistent pricing bugs across different parts of the site.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does a function return if it has no explicit return statement?', options: ['null', '0', 'undefined', 'An error'], correct: 2 },
    { type: 'true-false', q: 'Arrow functions and regular functions are always 100% interchangeable in every situation.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is a "higher-order function"?', options: ['A function that runs faster', 'A function that accepts or returns another function', 'A function with no parameters', 'A function declared with var'], correct: 1 },
    { type: 'code-output', q: 'function add(a, b = 10) {\n  return a + b;\n}\nconsole.log(add(5));\n\nWhat is logged?', options: ['5', '10', '15', 'NaN'], correct: 2 },
    { type: 'mcq', q: 'What is the difference between a parameter and an argument?', options: ['No difference', 'Parameters are placeholders in the definition; arguments are actual values passed in', 'Arguments come first', 'Parameters only exist in arrow functions'], correct: 1 },
    { type: 'true-false', q: 'A function declaration is hoisted, meaning it can be called before its definition appears in the code.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why extract repeated logic into a named function?', options: ['It makes code run slower on purpose', 'It creates a single source of truth, easier to maintain', 'It is required by JavaScript syntax', 'It removes the need for variables'], correct: 1 },
    { type: 'drag-drop', q: 'Order the steps of calling a function: [Define the function, Call the function with arguments, Receive the return value]', options: ['Define the function', 'Call the function with arguments', 'Receive the return value'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which array methods are examples of higher-order functions?', options: ['.length and .push()', '.map() and .filter()', '.toString() only', 'None of them'], correct: 1 },
    { type: 'code-output', q: 'const square = (n) => n * n;\nconsole.log(square(4));\n\nWhat is logged?', options: ['8', '16', '4', 'undefined'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'scope',
  module: 2,
  title: 'Scope',
  tagline: 'Where a variable is visible and accessible — and where it isn\'t.',
  readMinutes: 7,

  intro: {
    whatItIs: `Scope determines where in your code a variable is accessible. JavaScript has global scope (accessible everywhere), function scope (accessible only inside the function it's declared in), and block scope (accessible only inside the {} block it's declared in, for let and const).`,
    whyItMatters: `Understanding scope explains why a variable declared inside an if block isn't accessible outside it, why two functions can each have their own local variable with the same name without conflict, and why global variables are generally considered risky in larger programs.`,
    whereUsed: `Every function, loop, and conditional block creates its own scope. Module systems, closures, and even basic debugging all depend on understanding which variables are visible from where.`,
    commonMistakes: `A common mistake is assuming a variable declared inside an if or for block is accessible outside it, when using let or const it is not — only var leaks out of blocks (though still not out of functions). Another common mistake is unintentionally creating global variables by forgetting a declaration keyword.`,
  },

  visual: { caption: 'Nested scopes: global, function, and block, each containing the next', type: 'scope-nesting-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'Global vs local scope', explanation: `A variable declared outside any function is global and accessible everywhere; one declared inside a function is local to that function.`, code: `let globalVar = "I'm everywhere";\n\nfunction showScope() {\n  let localVar = "I'm only in here";\n  console.log(globalVar);\n  console.log(localVar);\n}\n\nshowScope();\nconsole.log(globalVar);\n// console.log(localVar); // would throw ReferenceError if uncommented`, language: 'javascript', output: `I'm everywhere\nI'm only in here\nI'm everywhere` },
    { difficulty: 'easy', title: 'Block scope with let', explanation: `let and const are scoped to the nearest enclosing {} block, including if statements and loops — not just functions.`, code: `if (true) {\n  let blockVar = "only visible in this block";\n  console.log(blockVar);\n}\n// console.log(blockVar); // ReferenceError if uncommented — out of scope here`, language: 'javascript', output: `only visible in this block` },
    { difficulty: 'medium', title: 'var ignores block scope', explanation: `Unlike let and const, var is function-scoped, not block-scoped — so it "leaks" out of if blocks and loops, sometimes causing confusing bugs.`, code: `if (true) {\n  var leaky = "I escaped the block";\n}\nconsole.log(leaky); // works, because var ignores block boundaries`, language: 'javascript', output: `I escaped the block` },
    { difficulty: 'medium-plus', title: 'Shadowing', explanation: `A variable in an inner scope can have the same name as one in an outer scope — this is called shadowing. The inner variable temporarily "hides" the outer one within its own scope.`, code: `let value = "outer";\n\nfunction test() {\n  let value = "inner"; // shadows the outer "value"\n  console.log(value);\n}\n\ntest();\nconsole.log(value); // unaffected by the shadowing inside test()`, language: 'javascript', output: `inner\nouter` },
    { difficulty: 'hard', title: 'Scope chains and lookup', explanation: `When a variable is referenced, JavaScript looks for it in the current scope first, then walks outward through enclosing scopes until it finds it (or throws a ReferenceError if it never does). This models that lookup process conceptually.`, code: `let outer = "I'm in the outer scope";\n\nfunction middle() {\n  function inner() {\n    console.log(outer); // not found locally or in middle() — found in the outer scope\n  }\n  inner();\n}\n\nmiddle();`, language: 'javascript', output: `I'm in the outer scope` },
    { difficulty: 'real-world', title: 'Why global variables are avoided in real codebases', explanation: `Two unrelated parts of a large application accidentally using the same global variable name can silently overwrite each other's data — a classic source of hard-to-trace bugs in real systems, which is why modern code favors module-scoped or function-scoped variables over globals.`, code: `// Risky pattern: relying on a shared global\nlet currentUser = { name: "Ada" };\n\nfunction loginModule() {\n  currentUser = { name: "Grace" }; // accidentally overwrites the global\n}\n\nfunction profileModule() {\n  console.log("Displaying profile for:", currentUser.name);\n}\n\nloginModule();\nprofileModule(); // shows Grace, even if profileModule expected Ada to still be set`, language: 'javascript', output: `Displaying profile for: Grace` },
  ],

  exercises: [
    { level: 1, title: 'Identify the scope', problem: `function outer() {\n  let x = 5;\n}\nconsole.log(x);\n\nWhat happens when this runs, and why?`, hints: ['x is declared inside outer\'s function scope.', 'Trying to access it outside that scope causes a specific error.'], solution: `This throws a ReferenceError: x is not defined. x is scoped entirely inside the outer function and does not exist anywhere outside it, including in the global scope where console.log(x) is being called.` },
    { level: 2, title: 'Predict block scope behavior', problem: `for (let i = 0; i < 3; i++) {\n  // loop body\n}\nconsole.log(i);\n\nWhat happens, and why?`, hints: ['let is block-scoped, and the for loop\'s parentheses count as part of that block.'], solution: `This throws a ReferenceError: i is not defined. Because i was declared with let, it is scoped to the for loop block itself and ceases to exist once the loop finishes — it is not accessible afterward.` },
    { level: 3, title: 'Spot the var leak', problem: `function test() {\n  if (true) {\n    var leaked = "oops";\n  }\n  console.log(leaked);\n}\ntest();\n\nWhat is logged, and why might this surprise someone expecting block scoping?`, hints: ['var is function-scoped, not block-scoped.', 'The if block does not contain var the way it would contain let.'], solution: `"oops" is logged. Even though leaked is declared inside an if block, var ignores block boundaries entirely and is scoped to the nearest enclosing function (test), so it remains accessible anywhere inside that function, not just inside the if block. This often surprises people coming from languages (or expectations) where block scoping is the default.` },
    { level: 4, title: 'Explain shadowing', problem: `let count = 1;\nfunction increment() {\n  let count = 100;\n  count++;\n  console.log("Inside:", count);\n}\nincrement();\nconsole.log("Outside:", count);\n\nWhat is logged, and why doesn't incrementing affect the outer count?`, hints: ['The inner count shadows the outer one — they are two completely separate variables.', 'Changes to the inner variable never touch the outer one.'], solution: `Inside: 101\nOutside: 1\nThe inner let count = 100 creates a brand new variable that shadows (hides) the outer count entirely within the function. Incrementing it only affects that local variable; the outer count, a completely separate variable, remains unchanged at 1.` },
    { level: 5, title: 'Fix a scope bug', problem: `This code is supposed to log 0, 1, 2 from inside setTimeout callbacks, but logs 3, 3, 3 instead. Fix it using what you know about scope.\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`, hints: ['var is function-scoped, so all callbacks share the same i.', 'Switching to let gives each iteration its own scoped copy.'], solution: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// Logs: 0, 1, 2 — because let creates a new block-scoped binding of i for\n// each iteration, so each callback captures a different value.` },
    { level: 6, title: 'Real-world: redesign away from a risky global', problem: `Redesign the loginModule()/profileModule() example from earlier so the two modules don't rely on a shared mutable global variable, instead passing the current user explicitly. Explain why this is safer in a real, larger codebase.`, hints: ['Pass currentUser as a parameter or return value instead of reading/writing a shared global.'], solution: `function login(name) {\n  return { name }; // returns the user instead of mutating a shared global\n}\n\nfunction displayProfile(user) {\n  console.log("Displaying profile for:", user.name);\n}\n\nconst user = login("Grace");\ndisplayProfile(user);\n\n// This is safer because the data flows explicitly between functions through\n// parameters and return values, rather than implicitly through a shared\n// mutable global. In a large codebase, this makes it much easier to trace\n// exactly where a value came from and prevents unrelated code from silently\n// overwriting shared state in ways that are hard to track down.` },
  ],

  interview: [
    { q: 'What is the difference between global scope, function scope, and block scope?', a: `Global scope is accessible from anywhere in the program. Function scope means a variable (declared with var, or any variable inside a function) is accessible only within that function. Block scope (for let and const) means a variable is accessible only within the nearest enclosing {} block — including if statements, loops, and standalone blocks, not just functions.` },
    { q: 'Why does var "leak" out of if blocks and loops, but let does not?', a: `var was designed before block scoping existed in JavaScript and is function-scoped, meaning it ignores block boundaries like if and for entirely, only respecting function boundaries. let (and const), introduced in ES6, are properly block-scoped, meaning they only exist within the nearest enclosing block.` },
    { q: 'What is variable shadowing?', a: `Shadowing occurs when a variable declared in an inner scope has the same name as one in an outer scope. The inner variable takes precedence within its own scope, effectively hiding the outer variable for any code inside that inner scope, without affecting the outer variable itself.` },
    { q: 'What is a "scope chain"?', a: `When JavaScript looks up a variable, it first checks the current (innermost) scope; if not found there, it checks the next enclosing scope outward, and so on, until it either finds the variable or reaches the global scope and throws a ReferenceError. This sequence of nested scopes being checked is called the scope chain.` },
    { q: 'Why are global variables generally considered risky in larger applications?', a: `Global variables can be read or modified from anywhere in the codebase, which makes it easy for unrelated parts of a large application to accidentally interfere with each other's data — one module overwriting a value another module depends on, with no clear, traceable connection between the two. Scoping variables more narrowly (to a function, module, or block) limits the "blast radius" of any given piece of code.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Internal JavaScript style guides strongly discourage global variables, requiring code to be organized into modules with clearly scoped, encapsulated state to avoid unpredictable cross-module interference at scale.' },
    { company: 'Netflix', text: 'Frontend applications use module bundlers and scoping conventions specifically to prevent variable name collisions across the large number of independently developed UI components in their codebase.' },
    { company: 'Stripe', text: 'SDK libraries are carefully designed so that internal implementation variables never leak into the global scope of the websites that embed them, avoiding any chance of conflicting with the host site\'s own code.' },
    { company: 'Amazon', text: 'Large-scale internal tooling enforces strict scoping and linting rules that flag accidental global variable creation, since an unintended global in a massive shared codebase could silently affect unrelated teams\' code.' },
  ],

  quiz: [
    { type: 'mcq', q: 'Which keyword creates a block-scoped variable?', options: ['var', 'let', 'function', 'global'], correct: 1 },
    { type: 'true-false', q: 'var is scoped to the nearest enclosing block (like if or for), the same way let is.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is "shadowing"?', options: ['Deleting a variable', 'An inner-scope variable having the same name as an outer one, hiding it locally', 'A syntax error', 'Using var instead of let'], correct: 1 },
    { type: 'code-output', q: 'if (true) {\n  let x = 5;\n}\nconsole.log(typeof x);\n\nWhat is logged?', options: ['"number"', '"undefined"', '5', 'Error (ReferenceError)'], correct: 3 },
    { type: 'mcq', q: 'What is a "scope chain"?', options: ['A type of array', 'The sequence of nested scopes checked when looking up a variable', 'A CSS property', 'A loop construct'], correct: 1 },
    { type: 'true-false', q: 'Global variables can be read or modified from anywhere in the program.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why is var considered more error-prone than let in loops?', options: ['var is slower', 'var shares one binding across all iterations instead of a new one per iteration', 'var cannot hold numbers', 'There is no real difference'], correct: 1 },
    { type: 'drag-drop', q: 'Order from broadest to narrowest scope: [Global scope, Function scope, Block scope]', options: ['Global scope', 'Function scope', 'Block scope'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why are global variables considered risky in large codebases?', options: ['They use more memory', 'Unrelated code can accidentally read/overwrite them, causing hard-to-trace bugs', 'They are deprecated and will be removed', 'They only work with numbers'], correct: 1 },
    { type: 'code-output', q: 'let val = "outer";\nfunction test() {\n  let val = "inner";\n  return val;\n}\nconsole.log(test(), val);\n\nWhat is logged?', options: ['"inner" "inner"', '"outer" "outer"', '"inner" "outer"', '"outer" "inner"'], correct: 2 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'arrays',
  module: 2,
  title: 'Arrays',
  tagline: 'Ordered lists of values — and the methods that make working with them powerful.',
  readMinutes: 8,

  intro: {
    whatItIs: `An array is an ordered collection of values, accessed by numeric index starting at 0. Arrays can hold any type of value, including other arrays and objects, and come with many built-in methods for searching, transforming, and combining their contents.`,
    whyItMatters: `Nearly all real data comes in lists: search results, form fields, rows from a database, items in a shopping cart. Arrays and their methods (.map(), .filter(), .reduce(), and more) are the primary tools for working with that kind of data efficiently and readably.`,
    whereUsed: `Rendering a list of products, processing API responses, sorting search results, calculating totals — arrays are everywhere real data is involved.`,
    commonMistakes: `A common mistake is confusing methods that mutate the original array (like .push(), .sort(), .splice()) with methods that return a new array without changing the original (like .map(), .filter(), .slice()). Another common mistake is off-by-one indexing errors, since arrays are zero-indexed.`,
  },

  visual: { caption: 'An array as numbered slots holding values', type: 'array-indices-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'Creating and accessing an array', explanation: `Arrays are written with square brackets; elements are accessed by their zero-based index.`, code: `const fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits[0]);\nconsole.log(fruits[2]);\nconsole.log(fruits.length);`, language: 'javascript', output: `apple\ncherry\n3` },
    { difficulty: 'easy', title: 'push and pop', explanation: `.push() adds an item to the end of an array; .pop() removes and returns the last item. Both mutate the original array.`, code: `const stack = [1, 2, 3];\nstack.push(4);\nconsole.log(stack);\n\nconst removed = stack.pop();\nconsole.log("Removed:", removed);\nconsole.log(stack);`, language: 'javascript', output: `[ 1, 2, 3, 4 ]\nRemoved: 4\n[ 1, 2, 3 ]` },
    { difficulty: 'medium', title: '.map() transforms every item', explanation: `.map() returns a brand new array where each item has been transformed by a function, without modifying the original array.`, code: `const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map(n => n * 2);\n\nconsole.log(doubled);\nconsole.log(numbers); // unchanged`, language: 'javascript', output: `[ 2, 4, 6, 8 ]\n[ 1, 2, 3, 4 ]` },
    { difficulty: 'medium-plus', title: '.filter() and .reduce() together', explanation: `.filter() keeps only items matching a condition; .reduce() combines all items into a single result. Chaining them is a common, powerful pattern.`, code: `const orders = [\n  { amount: 50, paid: true },\n  { amount: 30, paid: false },\n  { amount: 100, paid: true },\n];\n\nconst totalPaid = orders\n  .filter(order => order.paid)\n  .reduce((sum, order) => sum + order.amount, 0);\n\nconsole.log(totalPaid);`, language: 'javascript', output: `150` },
    { difficulty: 'hard', title: 'Sorting objects by a property', explanation: `.sort() can take a comparator function to control sort order on complex data, not just simple values. Note that .sort() mutates the original array.`, code: `const people = [\n  { name: "Grace", age: 36 },\n  { name: "Ada", age: 28 },\n  { name: "Linus", age: 45 },\n];\n\npeople.sort((a, b) => a.age - b.age);\nconsole.log(people.map(p => p.name + " (" + p.age + ")"));`, language: 'javascript', output: `[ 'Ada (28)', 'Grace (36)', 'Linus (45)' ]` },
    { difficulty: 'real-world', title: 'Why .map()/.filter() chains power real dashboards', explanation: `Real product dashboards routinely transform raw API data into display-ready data using chained array methods — filtering to relevant records, then mapping them into the exact shape a UI component needs.`, code: `const transactions = [\n  { id: 1, status: "completed", amount: 49.99 },\n  { id: 2, status: "failed", amount: 19.99 },\n  { id: 3, status: "completed", amount: 99.5 },\n];\n\nconst displayRows = transactions\n  .filter(t => t.status === "completed")\n  .map(t => ({ id: t.id, label: "$" + t.amount.toFixed(2) }));\n\nconsole.log(displayRows);`, language: 'javascript', output: `[ { id: 1, label: '$49.99' }, { id: 3, label: '$99.50' } ]` },
  ],

  exercises: [
    { level: 1, title: 'Access array elements', problem: `Given const colors = ["red", "green", "blue"], log the first and last elements.`, hints: ['The last element\'s index is colors.length - 1.'], solution: `const colors = ["red", "green", "blue"];\nconsole.log(colors[0]);\nconsole.log(colors[colors.length - 1]);` },
    { level: 2, title: 'Predict mutation', problem: `const arr = [1, 2, 3];\nconst mapped = arr.map(n => n * 10);\narr.push(4);\nconsole.log(arr, mapped);\n\nWhat is logged?`, hints: ['.map() does not mutate the original array.', 'push() happens AFTER map() already ran.'], solution: `[ 1, 2, 3, 4 ] [ 10, 20, 30 ]\n.map() created a completely separate new array (mapped) before push() was ever called on arr, so mapped only reflects the original 3 elements, while arr correctly shows the pushed 4th element.` },
    { level: 3, title: 'Filter and count', problem: `Given an array of numbers, write code that counts how many are greater than 10.`, hints: ['Use .filter() to keep only qualifying numbers, then check .length.'], solution: `const numbers = [4, 15, 8, 23, 9, 30];\nconst count = numbers.filter(n => n > 10).length;\nconsole.log(count); // 3` },
    { level: 4, title: 'Sum with reduce', problem: `Write a function totalPrice(items) that takes an array of { price, quantity } objects and returns the total cost using .reduce().`, hints: ['Multiply price by quantity inside the reducer, and accumulate the sum.'], solution: `function totalPrice(items) {\n  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);\n}` },
    { level: 5, title: 'Chain map and filter', problem: `Given an array of student objects with { name, score }, write code that returns an array of names for students who scored 60 or above.`, hints: ['Filter first by score, then map to extract just the name.'], solution: `const students = [\n  { name: "Ada", score: 92 },\n  { name: "Sam", score: 45 },\n  { name: "Grace", score: 78 },\n];\n\nconst passingNames = students\n  .filter(s => s.score >= 60)\n  .map(s => s.name);\n\nconsole.log(passingNames); // [ 'Ada', 'Grace' ]` },
    { level: 6, title: 'Real-world: build a dashboard transform', problem: `Given an array of raw API order objects { id, status, total }, write a function that returns display-ready rows only for orders with status "shipped", each formatted as { id, displayTotal: "$X.XX" }. Explain why doing this transformation in one place is better than scattering similar logic across multiple UI components.`, hints: ['Filter by status first, then map into the new shape.', '.toFixed(2) formats a number to two decimal places.'], solution: `function getShippedRows(orders) {\n  return orders\n    .filter(o => o.status === "shipped")\n    .map(o => ({ id: o.id, displayTotal: "$" + o.total.toFixed(2) }));\n}\n\n// Centralizing this transformation in one function means every part of the UI\n// that needs "shipped order rows" gets identical, consistent formatting and\n// filtering logic. If the formatting rule changes (e.g. adding currency symbols\n// for international users), there's exactly one function to update, rather than\n// hunting down every component that duplicated similar filter/map logic inline.` },
  ],

  interview: [
    { q: 'What is the difference between .map() and .forEach()?', a: `.map() returns a brand new array containing the result of calling a function on every element, leaving the original array unchanged. .forEach() also runs a function on every element but does not return a new array (it returns undefined) — it's used purely for side effects, like logging or pushing to an external array.` },
    { q: 'Which array methods mutate the original array, and which return a new one?', a: `Mutating methods include .push(), .pop(), .shift(), .unshift(), .splice(), .sort(), and .reverse() — they change the original array in place. Non-mutating methods include .map(), .filter(), .slice(), and .concat() — they return a brand new array, leaving the original untouched.` },
    { q: 'How does .reduce() work, and what is it useful for?', a: `.reduce() takes a function and an initial value, then iterates through the array, accumulating a single result by repeatedly combining the running accumulator with each element. It's useful for summing values, building a single object from a list, flattening data, or any "collapse a list into one value" operation.` },
    { q: 'What is the time complexity of accessing an array element by index, versus searching for a value with .includes()?', a: `Accessing by index (arr[i]) is constant time, O(1), since arrays are stored in contiguous memory allowing direct address calculation. Searching with .includes() (or .indexOf(), .find()) is linear time, O(n), since it may need to check every element before finding a match or reaching the end.` },
    { q: 'Why might chaining .filter().map() be preferred over a single manual loop with an if statement?', a: `Chained array methods describe the transformation declaratively — "keep these, then turn them into that" — which is often more readable than imperative loop code managing an index and a separate results array manually. It also composes well: each step is independently testable and reusable.` },
  ],

  realWorld: [
    { company: 'Netflix', text: 'Frontend code transforms raw catalog API data into display-ready rows using chained array methods, separating data shaping from rendering logic across thousands of UI components.' },
    { company: 'Stripe', text: 'Dashboard reporting features filter and aggregate large transaction arrays client-side using .filter() and .reduce() patterns to compute real-time summaries without a fresh server round-trip for every view change.' },
    { company: 'Amazon', text: 'Product listing and search-result pages map raw inventory data into consistent, UI-ready card objects using shared array transformation utilities across many different page types.' },
    { company: 'Google', text: 'Search result ranking pipelines use array transformation and filtering extensively to narrow, score, and reorder large candidate result sets before final display.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What index does the first element of an array have?', options: ['1', '0', '-1', 'It depends on the array'], correct: 1 },
    { type: 'true-false', q: '.map() mutates the original array.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which method removes and returns the last element of an array?', options: ['.shift()', '.pop()', '.slice()', '.filter()'], correct: 1 },
    { type: 'code-output', q: 'const arr = [1, 2, 3];\nconst doubled = arr.map(n => n * 2);\nconsole.log(arr.length, doubled.length);\n\nWhat is logged?', options: ['3 3', '3 6', '6 3', '0 3'], correct: 0 },
    { type: 'mcq', q: 'What does .reduce() do?', options: ['Removes duplicate values', 'Combines all elements into a single accumulated result', 'Sorts the array', 'Reverses the array'], correct: 1 },
    { type: 'true-false', q: '.sort() mutates the original array by default.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is the time complexity of accessing arr[5] directly?', options: ['O(n)', 'O(1)', 'O(n^2)', 'O(log n)'], correct: 1 },
    { type: 'drag-drop', q: 'Order this chain conceptually: [filter() keeps matching items, map() transforms each item, reduce() combines into one value]', options: ['filter() keeps matching items', 'map() transforms each item', 'reduce() combines into one value'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which method is best for checking if any item exists matching a condition without building a new array?', options: ['.map()', '.some()', '.sort()', '.push()'], correct: 1 },
    { type: 'code-output', q: 'const orders = [{amount:10,paid:true},{amount:20,paid:false}];\nconst total = orders.filter(o => o.paid).reduce((s,o) => s + o.amount, 0);\nconsole.log(total);\n\nWhat is logged?', options: ['10', '20', '30', '0'], correct: 0 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'objects',
  module: 2,
  title: 'Objects',
  tagline: 'Key-value pairs that model real-world things — the other core data structure alongside arrays.',
  readMinutes: 8,

  intro: {
    whatItIs: `An object is a collection of key-value pairs, where each key (a string, usually unquoted) maps to a value of any type — a number, string, array, function, or even another object. Objects are how JavaScript models structured, real-world entities like a user, a product, or a configuration.`,
    whyItMatters: `Almost every meaningful piece of data in a real application is an object: a user profile, an API response, a form's state. Understanding how to read, update, and reshape objects is essential for working with that data correctly.`,
    whereUsed: `API responses are usually JSON, which maps directly onto JavaScript objects. Configuration settings, component state, database records — all commonly represented as objects.`,
    commonMistakes: `A common mistake is assuming copying an object with = creates a true independent copy — it doesn't; both variables point to the same underlying object, so mutating one affects the other (the same issue covered for arrays). Another is confusing dot notation (obj.key) with bracket notation (obj["key"]) — bracket notation is required when the key is dynamic or not a valid identifier.`,
  },

  visual: { caption: 'An object as labeled key-value pairs', type: 'object-keys-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'Creating and accessing an object', explanation: `Objects are written with curly braces; values are accessed via dot notation or bracket notation.`, code: `const user = { name: "Ada", age: 28 };\nconsole.log(user.name);\nconsole.log(user["age"]);`, language: 'javascript', output: `Ada\n28` },
    { difficulty: 'easy', title: 'Adding and updating properties', explanation: `New properties can be added by simple assignment; existing ones can be updated the same way.`, code: `const user = { name: "Ada" };\nuser.age = 28; // add a new property\nuser.name = "Grace"; // update an existing one\nconsole.log(user);`, language: 'javascript', output: `{ name: 'Grace', age: 28 }` },
    { difficulty: 'medium', title: 'Destructuring', explanation: `Destructuring lets you pull specific properties out of an object into their own variables in one concise step, rather than accessing each one individually.`, code: `const product = { name: "Keyboard", price: 49.99, inStock: true };\nconst { name, price } = product;\n\nconsole.log(name, price);`, language: 'javascript', output: `Keyboard 49.99` },
    { difficulty: 'medium-plus', title: 'Object.keys, values, and entries', explanation: `These built-in methods let you iterate over an object's structure even when you don't know the property names ahead of time.`, code: `const scores = { math: 90, science: 85, art: 95 };\n\nconsole.log(Object.keys(scores));\nconsole.log(Object.values(scores));\nObject.entries(scores).forEach(([subject, score]) => {\n  console.log(subject + ":", score);\n});`, language: 'javascript', output: `[ 'math', 'science', 'art' ]\n[ 90, 85, 95 ]\nmath: 90\nscience: 85\nart: 95` },
    { difficulty: 'hard', title: 'Shallow copying with the spread operator', explanation: `The spread operator (...) creates a new object with the same top-level properties, avoiding accidental mutation of the original — but nested objects inside are still shared references (a "shallow" copy).`, code: `const original = { name: "Ada", address: { city: "London" } };\nconst copy = { ...original, name: "Grace" };\n\ncopy.address.city = "Paris"; // mutates the SHARED nested object\n\nconsole.log(original.name, original.address.city); // name is safe, city is not\nconsole.log(copy.name, copy.address.city);`, language: 'javascript', output: `Ada Paris\nGrace Paris` },
    { difficulty: 'real-world', title: 'Why API responses are validated against expected shapes', explanation: `Real applications often check that an object returned from an API actually has the properties expected before using them, since a malformed or unexpected response shape could otherwise cause confusing downstream errors.`, code: `function isValidUserResponse(data) {\n  return (\n    typeof data === "object" &&\n    data !== null &&\n    typeof data.id === "number" &&\n    typeof data.email === "string"\n  );\n}\n\nconsole.log(isValidUserResponse({ id: 1, email: "ada@example.com" }));\nconsole.log(isValidUserResponse({ id: "not-a-number" }));`, language: 'javascript', output: `true\nfalse` },
  ],

  exercises: [
    { level: 1, title: 'Create and access an object', problem: `Create an object book with properties title and author, then log both values.`, hints: ['Use dot notation to access each property after creating the object.'], solution: `const book = { title: "Dune", author: "Frank Herbert" };\nconsole.log(book.title);\nconsole.log(book.author);` },
    { level: 2, title: 'Predict the shared reference behavior', problem: `const a = { value: 1 };\nconst b = a;\nb.value = 99;\nconsole.log(a.value);\n\nWhat is logged, and why?`, hints: ['= does not create a copy of an object — both variables point to the same object.'], solution: `99 is logged. const b = a does not create a new, independent object — it makes b point to the exact same object in memory as a. Changing b.value also changes what a.value sees, since they refer to the same underlying object.` },
    { level: 3, title: 'Use destructuring', problem: `Given const order = { id: 1, total: 49.99, status: "shipped" }, use destructuring to pull out total and status into their own variables in one line.`, hints: ['Use const { propA, propB } = object syntax.'], solution: `const { total, status } = order;\nconsole.log(total, status); // 49.99 "shipped"` },
    { level: 4, title: 'Iterate with Object.entries', problem: `Given an object of inventory counts like { apples: 5, bananas: 0, cherries: 12 }, write code that logs only the items with a count greater than 0.`, hints: ['Use Object.entries() to get [key, value] pairs, then filter or check inside a loop.'], solution: `const inventory = { apples: 5, bananas: 0, cherries: 12 };\nObject.entries(inventory).forEach(([item, count]) => {\n  if (count > 0) console.log(item, count);\n});` },
    { level: 5, title: 'Create a safe shallow copy', problem: `Write a function updateName(user, newName) that returns a NEW object with the name changed, without mutating the original user object.`, hints: ['Use the spread operator to copy existing properties, then override name.'], solution: `function updateName(user, newName) {\n  return { ...user, name: newName };\n}\n\nconst original = { name: "Ada", age: 28 };\nconst updated = updateName(original, "Grace");\nconsole.log(original.name); // "Ada" — unchanged\nconsole.log(updated.name);  // "Grace"` },
    { level: 6, title: 'Real-world: validate an API response shape', problem: `Write a function isValidProductResponse(data) that checks an object has a string name, a number price greater than 0, and a boolean inStock. Explain why validating shape (not just existence) matters for a real application receiving external data.`, hints: ['Check both typeof and any additional constraints like price > 0.'], solution: `function isValidProductResponse(data) {\n  return (\n    typeof data === "object" && data !== null &&\n    typeof data.name === "string" &&\n    typeof data.price === "number" && data.price > 0 &&\n    typeof data.inStock === "boolean"\n  );\n}\n\n// Validating shape matters because external data (from a third-party API, user\n// input, or even a different team's service) can change unexpectedly or arrive\n// malformed. Checking the full expected shape — not just whether a property\n// exists — catches cases like price arriving as a string or a negative number,\n// preventing confusing bugs from propagating further into the application.` },
  ],

  interview: [
    { q: 'What is the difference between dot notation and bracket notation for accessing object properties?', a: `Dot notation (obj.key) is concise but requires the key to be a valid identifier known at write-time. Bracket notation (obj["key"]) is required when the key is dynamic (stored in a variable), contains special characters, or isn't a valid identifier (like a key starting with a number).` },
    { q: 'Does assigning an object to a new variable create a copy of it?', a: `No. Assignment with = makes the new variable point to the exact same object in memory — it's a reference copy, not a value copy. Mutating the object through either variable affects what both variables see, since they refer to the same underlying data.` },
    { q: 'What is the difference between a "shallow copy" and a "deep copy" of an object?', a: `A shallow copy (e.g. via the spread operator or Object.assign()) copies only the top-level properties; if any property's value is itself an object or array, that nested structure is still shared by reference between the original and the copy. A deep copy recursively copies every nested level, so the copy is fully independent of the original at every depth.` },
    { q: 'What does Object.entries() return, and when would you use it?', a: `Object.entries() returns an array of [key, value] pairs for an object's own enumerable properties. It's useful when you need to iterate over an object while having access to both the key and value together, such as with a for...of loop or .forEach().` },
    { q: 'Why is it important to validate the shape of data received from an external API, not just check that it exists?', a: `External data can change unexpectedly, arrive malformed, or simply not match what your code assumes — a price field might come back as a string instead of a number, or a required field might be missing. Validating the full expected shape (types, ranges, required fields) catches these issues immediately at the boundary where the data enters your system, rather than allowing it to cause confusing failures somewhere deep in unrelated code later.` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'API client libraries validate response object shapes against documented schemas, immediately surfacing clear errors if a backend response doesn\'t match the expected structure, rather than failing silently downstream.' },
    { company: 'Google', text: 'Large-scale services use schema validation libraries to enforce expected object shapes at every service boundary, reducing the risk of malformed data propagating through interconnected systems.' },
    { company: 'Netflix', text: 'User profile and preference objects are carefully validated and normalized at the API boundary before being used anywhere in personalization or recommendation logic.' },
    { company: 'Amazon', text: 'Order and inventory objects passed between internal services are validated against strict shape contracts, since a malformed object reaching fulfillment logic could cause real, costly operational errors.' },
  ],

  quiz: [
    { type: 'mcq', q: 'Which notation is required when an object key is stored in a variable?', options: ['Dot notation', 'Bracket notation', 'Both work identically always', 'Neither works'], correct: 1 },
    { type: 'true-false', q: 'const b = a; (where a is an object) creates a fully independent copy of a.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does the spread operator (...) create when copying an object?', options: ['A deep copy', 'A shallow copy', 'A reference to the same object', 'An array'], correct: 1 },
    { type: 'code-output', q: 'const a = { value: 1 };\nconst b = a;\nb.value = 5;\nconsole.log(a.value);\n\nWhat is logged?', options: ['1', '5', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'What does Object.entries() return?', options: ['Just the keys', 'Just the values', 'An array of [key, value] pairs', 'A single string'], correct: 2 },
    { type: 'true-false', q: 'Destructuring lets you pull multiple properties out of an object in a single statement.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why does validating an API response\'s shape matter?', options: ['It is not necessary if the API is popular', 'External data can be malformed or change unexpectedly, causing downstream bugs if unchecked', 'JavaScript validates all objects automatically', 'It only matters for arrays, not objects'], correct: 1 },
    { type: 'drag-drop', q: 'Order from least to most independent copy: [reference assignment (=), shallow copy (spread), deep copy]', options: ['reference assignment (=)', 'shallow copy (spread)', 'deep copy'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'In a shallow copy, what happens to nested objects inside the copied object?', options: ['They are fully duplicated', 'They remain shared references with the original', 'They are deleted', 'They become arrays'], correct: 1 },
    { type: 'code-output', q: 'const product = { name: "Pen", price: 2 };\nconst { name } = product;\nconsole.log(name);\n\nWhat is logged?', options: ['"Pen"', '2', 'undefined', '{ name: "Pen" }'], correct: 0 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'error-handling',
  module: 2,
  title: 'Error Handling',
  tagline: 'Anticipating what can go wrong, and handling it gracefully instead of crashing.',
  readMinutes: 8,

  intro: {
    whatItIs: `Error handling is the practice of anticipating, catching, and responding to problems that occur while a program runs — invalid input, a failed network request, a bug in logic. In JavaScript, this is primarily done with try/catch blocks, and by throwing custom Error objects with throw.`,
    whyItMatters: `Without error handling, one unexpected problem (a malformed API response, a missing field, a division by zero in the wrong place) can crash an entire application or leave it in a broken state. Good error handling lets programs fail gracefully, show useful messages, and recover where possible.`,
    whereUsed: `Network requests, file operations, user input validation, parsing data — anywhere something could go wrong outside your code's direct control, error handling is what keeps the program stable.`,
    commonMistakes: `A common mistake is catching an error and silently ignoring it (an empty catch block), which hides real bugs and makes debugging much harder later. Another is catching errors so broadly that genuinely unexpected bugs get swallowed along with the "expected" failure cases, masking problems that should have been visible.`,
  },

  visual: { caption: 'try/catch: attempt the risky code, handle failure if it happens', type: 'try-catch-flow-diagram' },

  examples: [
    { difficulty: 'very-easy', title: 'A basic try/catch', explanation: `Code inside try runs normally; if it throws an error, execution jumps immediately to catch instead of crashing the program.`, code: `try {\n  const result = 10 / 0;\n  console.log(result); // Infinity, not actually an error in JS\n  JSON.parse("{ invalid json");\n} catch (error) {\n  console.log("Caught an error:", error.message);\n}`, language: 'javascript', output: `Infinity\nCaught an error: Unexpected token i in JSON at position 2` },
    { difficulty: 'easy', title: 'Throwing a custom error', explanation: `throw lets your own code signal that something went wrong, with a message describing what happened.`, code: `function divide(a, b) {\n  if (b === 0) {\n    throw new Error("Cannot divide by zero");\n  }\n  return a / b;\n}\n\ntry {\n  console.log(divide(10, 0));\n} catch (e) {\n  console.log("Error:", e.message);\n}`, language: 'javascript', output: `Error: Cannot divide by zero` },
    { difficulty: 'medium', title: 'finally always runs', explanation: `The finally block runs whether or not an error occurred — commonly used for cleanup code that must happen regardless of success or failure.`, code: `function loadResource() {\n  try {\n    console.log("Loading...");\n    throw new Error("Network failure");\n  } catch (e) {\n    console.log("Caught:", e.message);\n  } finally {\n    console.log("Cleanup: closing connection");\n  }\n}\n\nloadResource();`, language: 'javascript', output: `Loading...\nCaught: Network failure\nCleanup: closing connection` },
    { difficulty: 'medium-plus', title: 'Handling errors in async code', explanation: `try/catch works with async/await the same way it does with synchronous code, making asynchronous error handling much more readable than older callback-based patterns.`, code: `async function fetchUser(id) {\n  if (id < 0) {\n    throw new Error("Invalid user id: " + id);\n  }\n  return { id, name: "Ada" };\n}\n\nasync function run() {\n  try {\n    const user = await fetchUser(-5);\n    console.log(user);\n  } catch (e) {\n    console.log("Failed to fetch user:", e.message);\n  }\n}\n\nrun();`, language: 'javascript', output: `Failed to fetch user: Invalid user id: -5` },
    { difficulty: 'hard', title: 'Custom error classes', explanation: `Extending the built-in Error class lets you create specific, named error types, making it possible to handle different kinds of failures differently in a catch block.`, code: `class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "ValidationError";\n  }\n}\n\nfunction createUser(data) {\n  if (!data.email) {\n    throw new ValidationError("Email is required");\n  }\n  return data;\n}\n\ntry {\n  createUser({ name: "Ada" });\n} catch (e) {\n  if (e instanceof ValidationError) {\n    console.log("Validation problem:", e.message);\n  } else {\n    console.log("Unexpected error:", e.message);\n  }\n}`, language: 'javascript', output: `Validation problem: Email is required` },
    { difficulty: 'real-world', title: 'Why production apps show friendly error messages instead of crashing', explanation: `Real applications wrap risky operations (like API calls) in error handling specifically so a single failed request shows a helpful message to the user instead of crashing the entire page or leaving it stuck in a broken loading state.`, code: `async function loadDashboard() {\n  try {\n    const data = await fetchDashboardData();\n    return { success: true, data };\n  } catch (e) {\n    console.log("Showing fallback UI. Reason:", e.message);\n    return { success: false, error: "Unable to load dashboard. Please try again." };\n  }\n}\n\nasync function fetchDashboardData() {\n  throw new Error("503 Service Unavailable");\n}\n\nloadDashboard().then(result => console.log(result));`, language: 'javascript', output: `Showing fallback UI. Reason: 503 Service Unavailable\n{ success: false, error: 'Unable to load dashboard. Please try again.' }` },
  ],

  exercises: [
    { level: 1, title: 'Wrap risky code in try/catch', problem: `Wrap this line in a try/catch so that if it throws, the program logs "Something went wrong" instead of crashing:\n\nJSON.parse("not valid json");`, hints: ['Put the risky line inside the try block.'], solution: `try {\n  JSON.parse("not valid json");\n} catch (e) {\n  console.log("Something went wrong");\n}` },
    { level: 2, title: 'Throw a custom error', problem: `Write a function withdrawMoney(balance, amount) that throws an Error with the message "Insufficient funds" if amount is greater than balance, otherwise returns balance - amount.`, hints: ['Check the condition first, then throw if it fails; otherwise return normally.'], solution: `function withdrawMoney(balance, amount) {\n  if (amount > balance) {\n    throw new Error("Insufficient funds");\n  }\n  return balance - amount;\n}` },
    { level: 3, title: 'Predict finally\'s behavior', problem: `function test() {\n  try {\n    return "from try";\n  } finally {\n    console.log("finally ran");\n  }\n}\nconsole.log(test());\n\nWhat is logged, and in what order?`, hints: ['finally runs even when try contains a return statement.', 'The return value is still honored after finally completes.'], solution: `finally ran\nfrom try\nEven though try has a return statement, finally still runs before the function actually returns control to the caller. Only after finally finishes does test() actually return "from try", which is what gets logged second.` },
    { level: 4, title: 'Handle async errors', problem: `Write an async function safeFetch(url) that calls fetch(url), and if it throws, returns null instead of letting the error propagate.`, hints: ['Use try/catch inside an async function exactly like synchronous code.'], solution: `async function safeFetch(url) {\n  try {\n    const response = await fetch(url);\n    return response;\n  } catch (e) {\n    return null;\n  }\n}` },
    { level: 5, title: 'Create a custom error class', problem: `Create a class NotFoundError that extends Error, sets this.name = "NotFoundError", and use it inside a function findUser(id) that throws it when id doesn't match a known user.`, hints: ['Call super(message) inside the constructor before setting this.name.'], solution: `class NotFoundError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "NotFoundError";\n  }\n}\n\nconst knownUsers = { 1: "Ada", 2: "Grace" };\n\nfunction findUser(id) {\n  if (!knownUsers[id]) {\n    throw new NotFoundError("User " + id + " not found");\n  }\n  return knownUsers[id];\n}` },
    { level: 6, title: 'Real-world: design graceful degradation', problem: `Write a function loadUserPreferences(userId) that tries to fetch preferences from an API, but if that fails for any reason, falls back to a default preferences object instead of throwing. Explain why this kind of graceful fallback matters for real user-facing products.`, hints: ['Use try/catch around the risky fetch, returning a default object in the catch block.'], solution: `async function loadUserPreferences(userId) {\n  const defaults = { theme: "light", notifications: true };\n  try {\n    const response = await fetch("/api/preferences/" + userId);\n    if (!response.ok) throw new Error("Bad response");\n    return await response.json();\n  } catch (e) {\n    console.log("Falling back to default preferences:", e.message);\n    return defaults;\n  }\n}\n\n// This matters because a single failed request (a flaky network, a brief\n// server hiccup) shouldn't prevent a user from using the product at all.\n// Falling back to sensible defaults keeps the experience functional and calm\n// instead of showing a broken page or an unhelpful crash, even though something\n// did go wrong behind the scenes.` },
  ],

  interview: [
    { q: 'What is the purpose of a try/catch block?', a: `try/catch lets a program attempt a risky operation and, if it throws an error, catch that error and handle it gracefully — logging it, showing a fallback message, or recovering — instead of letting the error crash the entire program.` },
    { q: 'What does the finally block do, and when does it run?', a: `finally contains code that runs regardless of whether the try block succeeded or an error was caught — even if try has a return statement. It's commonly used for cleanup work (closing a connection, hiding a loading spinner) that must happen no matter what.` },
    { q: 'Why might you create a custom Error subclass instead of just using new Error("message")?', a: `A custom error subclass (e.g. class ValidationError extends Error) lets you distinguish different categories of failure using instanceof checks in a catch block, so you can handle a validation problem differently from a network failure or a not-found error, rather than treating every error identically.` },
    { q: 'What is a risk of catching errors too broadly or silently?', a: `An overly broad or empty catch block can accidentally swallow genuinely unexpected bugs along with the specific failure case you intended to handle, hiding real problems and making them much harder to discover and debug later, since the program appears to continue normally despite something being wrong.` },
    { q: 'How does error handling work differently (or similarly) with async/await compared to synchronous code?', a: `It works almost identically: wrapping an await expression inside a try block catches any rejected promise the same way a thrown synchronous error would be caught. This is one of the main usability advantages of async/await over older callback-based or raw .then()/.catch() chains — the error-handling code reads the same way regardless of whether the operation is synchronous or asynchronous.` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'Payment processing APIs return structured, typed error objects (e.g. card_declined, rate_limit) so client applications can handle different failure categories with specific, appropriate user messaging rather than a single generic failure state.' },
    { company: 'Netflix', text: 'Streaming clients gracefully fall back to lower-quality playback or cached content when a network request fails, rather than crashing or showing a blank screen, directly applying the "graceful degradation" pattern.' },
    { company: 'Amazon', text: 'Checkout flows catch and handle payment and inventory errors distinctly, showing specific guidance ("try a different card" vs "item out of stock") instead of one generic error message for every possible failure.' },
    { company: 'Google', text: 'Large-scale services use structured error handling and logging extensively to distinguish expected, recoverable failures from genuine bugs, which is essential for diagnosing problems across systems serving billions of requests.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does a try/catch block do?', options: ['Always crashes the program', 'Attempts risky code and handles any error it throws', 'Only works with numbers', 'Prevents all bugs'], correct: 1 },
    { type: 'true-false', q: 'The finally block only runs if an error was caught.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What keyword is used to manually signal that an error occurred?', options: ['catch', 'throw', 'finally', 'return'], correct: 1 },
    { type: 'code-output', q: 'function test() {\n  try {\n    return "A";\n  } finally {\n    console.log("B");\n  }\n}\nconsole.log(test());\n\nWhat is logged, in order?', options: ['"A" then "B"', '"B" then "A"', 'Only "A"', 'Only "B"'], correct: 1 },
    { type: 'mcq', q: 'Why create a custom error class extending Error?', options: ['It is required by JavaScript', 'To distinguish error categories using instanceof in catch blocks', 'It makes code run faster', 'It prevents all errors from being thrown'], correct: 1 },
    { type: 'true-false', q: 'An empty catch block that does nothing can hide real bugs.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'How does try/catch work with async/await?', options: ['It does not work at all with async code', 'It works the same way as with synchronous code', 'It requires a different keyword entirely', 'Only finally works with async code'], correct: 1 },
    { type: 'drag-drop', q: 'Order the execution: [try block runs, error is thrown, catch block runs, finally block runs]', options: ['try block runs', 'error is thrown', 'catch block runs', 'finally block runs'], correct: [0, 1, 2, 3] },
    { type: 'mcq', q: 'What is "graceful degradation" in error handling?', options: ['Letting the whole app crash', 'Falling back to a reduced but functional experience instead of failing completely', 'Ignoring all errors silently', 'A type of syntax error'], correct: 1 },
    { type: 'code-output', q: 'try {\n  throw new Error("oops");\n} catch (e) {\n  console.log(e.message);\n}\n\nWhat is logged?', options: ['"Error"', '"oops"', 'undefined', 'An uncaught exception'], correct: 1 },
  ],
});
