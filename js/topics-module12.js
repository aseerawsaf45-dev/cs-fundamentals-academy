/* ==========================================================================
   TOPIC CONTENT DATA — Module 12: Software Engineering
   Includes: Clean Code, Testing, SOLID, Design Patterns, Architecture, Refactoring
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) {
  window.CSFA_RAW_TOPICS = [];
}

// 1. Clean Code
window.CSFA_RAW_TOPICS.push({
  id: 'clean-code',
  module: 12,
  title: 'Clean Code',
  tagline: 'Writing code for humans first — meaningful names, small functions, and readability.',
  readMinutes: 7,
  intro: {
    whatItIs: "Clean Code is a software development philosophy that prioritizes code readability, simplicity, and maintainability. It focuses on writing code that is easy for other developers (and your future self) to understand, modify, and extend.",
    whyItMatters: "Code is read vastly more often than it is written. Writing clean code reduces the accumulation of technical debt, makes bugs obvious, and ensures team members can collaborate without deciphering confusing logic.",
    whereUsed: "An essential professional standard enforced in all software engineering departments and open-source projects.",
    commonMistakes: "Using single-letter variables (like x, y, z) for complex objects, writing massive 500-line functions, or copying and pasting duplicate code sections."
  },
  visual: {
    caption: "The progression from messy code to clean refactored components",
    type: "solid-principles"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Meaningful variable naming",
      explanation: "Choose names that clearly describe the data stored, avoiding abbreviations.",
      code: "const daysSinceLastLogin = 10; // clean\nconst d = 10; // messy\nconsole.log('Days tracker:', daysSinceLastLogin);",
      language: "javascript", output: "Days tracker: 10"
    },
    {
      difficulty: "easy", title: "Single responsibility functions",
      explanation: "Functions should do one thing and do it well, keeping code blocks short.",
      code: "function calculateArea(r) {\n  return Math.PI * r * r;\n}\nconsole.log('Area:', calculateArea(2).toFixed(2));",
      language: "javascript", output: "Area: 12.57"
    },
    {
      difficulty: "medium", title: "Self-documenting code",
      explanation: "Write expressive code that explains itself, using comments only for non-obvious design rationale.",
      code: "const isActive = true;\nconst hasPermissions = true;\nconst canAccessAdmin = isActive && hasPermissions;\nconsole.log('Can enter:', canAccessAdmin);",
      language: "javascript", output: "Can enter: true"
    },
    {
      difficulty: "medium-plus", title: "Default parameters over conditionals",
      explanation: "Use language defaults to clean up parameter checking conditionals.",
      code: "function createProfile(name, role = 'guest') {\n  return { name, role };\n}\nconsole.log(createProfile('Ada'));",
      language: "javascript", output: "{ name: 'Ada', role: 'guest' }"
    },
    {
      difficulty: "hard", title: "Decoupling deep nested parameters",
      explanation: "Guard clauses flatten nested conditionals, making the primary execution path readable.",
      code: "function checkout(cart) {\n  if (!cart) return 'Empty';\n  if (cart.length === 0) return 'Empty';\n  return 'Success';\n}\nconsole.log('Cart checkout:', checkout([]));",
      language: "javascript", output: "Cart checkout: Empty"
    },
    {
      difficulty: "real-world", title: "Refactoring duplicate configuration blocks",
      explanation: "Don't Repeat Yourself (DRY): consolidate duplicate routines into single shared utilities.",
      code: "const buildHeader = (tok) => ({ 'Authorization': 'Bearer ' + tok });\nconsole.log(buildHeader('token123'));",
      language: "javascript", output: "{ Authorization: 'Bearer token123' }"
    }
  ],
  exercises: [
    {
      level: 1, title: "Clean variable naming",
      problem: "Refactor this variable declaration to be clean and meaningful:\nconst d = new Date(); // representing user sign up date",
      hints: ["Choose a descriptive name like 'userSignUpDate'."],
      solution: "const userSignUpDate = new Date();"
    },
    {
      level: 2, title: "DRY function refactor",
      problem: "Identify the principle violated by copy-pasting the same email validation regex in three files.",
      hints: ["DRY: Don't Repeat Yourself."],
      solution: "DRY (Don't Repeat Yourself)"
    },
    {
      level: 3, title: "Simplify ternary nested check",
      problem: "Refactor this ternary to be self-documenting:\nconst res = u && u.age >= 18 && u.active ? 'Yes' : 'No';",
      hints: ["Extract the boolean logic into a variable 'isEligibleAdult'."],
      solution: "const isEligibleAdult = u && u.age >= 18 && u.active;\nconst res = isEligibleAdult ? 'Yes' : 'No';"
    },
    {
      level: 4, title: "Default value initializer",
      problem: "Write a function greetUser(name) that uses default parameters to greet 'Guest' if name is missing.",
      hints: ["Set parameter name = 'Guest' in definition."],
      solution: "function greetUser(name = 'Guest') {\n  return 'Hello ' + name;\n}"
    },
    {
      level: 5, title: "Flat guard clause converter",
      problem: "Refactor this function to use a flat guard clause:\nfunction verify(user) { if (user) { return user.active; } else { return false; } }",
      hints: ["Check the falsy case first, returning early."],
      solution: "function verify(user) {\n  if (!user) return false;\n  return user.active;\n}"
    },
    {
      level: 6, title: "Real-world: Extract logic from loop block",
      problem: "Write a clean refactoring of this loop by extracting its interior print validation logic into a helper function:\nfor (let i=0; i<users.length; i++) { if(users[i].active) { console.log(users[i].name); } }",
      hints: ["Create function printIfActive(user) checking user.active.", "Call this function inside the loop."],
      solution: "function printIfActive(user) {\n  if (user.active) {\n    console.log(user.name);\n  }\n}\nusers.forEach(printIfActive);"
    }
  ],
  interview: [
    {
      q: "What is 'Clean Code', and why is it important?",
      a: "Clean Code is code that is easy to read, understand, and maintain by other developers. It is important because software spends the vast majority of its lifecycle in maintenance mode; writing clean code reduces technical debt, prevents regressions, and accelerates teamwork."
    },
    {
      q: "Explain the DRY principle.",
      a: "DRY stands for 'Don't Repeat Yourself'. It dictates that every piece of knowledge or logic must have a single, unambiguous representation within a system. Duplicating code logic makes updates error-prone, as you must remember to change it in multiple locations."
    },
    {
      q: "What is the 'Boy Scout Rule' in software engineering?",
      a: "The Boy Scout Rule states: 'Always leave the campground cleaner than you found it.' In programming, this means you should always refactor and clean up small messes in the files you modify, gradually improving the overall codebase health over time."
    },
    {
      q: "When are code comments considered a 'code smell'?",
      a: "Comments are smells when they explain *what* the code does to compensate for poor variable naming or messy structure. Good code should be self-documenting. Comments are best reserved for explaining *why* a specific, non-obvious design decision or workaround was chosen."
    },
    {
      q: "Why are small functions with a single responsibility preferred?",
      a: "Small functions (typically under 20 lines) are easier to understand, test in isolation, reuse, and debug. When a function has a single responsibility, its name can be highly specific, documenting its exact behavior."
    }
  ],
  realWorld: [
    { company: "Google", text: "Enforces strict style guides and automated linters to maintain code consistency across millions of files." },
    { company: "Stripe", text: "Prioritizes self-documenting variable naming in public SDKs to ensure developer integrations remain intuitive." },
    { company: "Netflix", text: "Applies Boy Scout rules during PR reviews to steadily clean legacy streaming pipeline structures." },
    { company: "OpenAI", text: "Encapsulates model orchestration components inside small, single-purpose functions to simplify GPU load tracking." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the primary target audience when writing Clean Code?', options: ['The compiler', 'Other human developers and your future self', 'The database manager', 'The web crawler'], correct: 1 },
    { type: 'true-false', q: 'Comments should be written on every single line of code to explain exactly what each variable is doing.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which acronym represents the rule: "Don\'t Repeat Yourself"?', options: ['KISS', 'YAGNI', 'DRY', 'SOLID'], correct: 2 },
    { type: 'code-output', q: "const calculate = (a, b) => a * b;\nconsole.log(typeof calculate);", options: ['number', 'function', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'What is the "Boy Scout Rule"?', options: ['Write code as fast as possible', 'Always leave the codebase cleaner than you found it', 'Do not write tests', 'Document all functions in HTML files'], correct: 1 },
    { type: 'true-false', q: 'Guard clauses improve readability by flattening nested conditional blocks.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which naming choice is considered clean for tracking active items count?', options: ['const c = 5;', 'const count = 5;', 'const activeItemsCount = 5;', 'const n = 5;'], correct: 2 },
    { type: 'drag-drop', q: 'Order the cleanup flow: [Identify duplicate code, Extract to shared function, Replace copies with function calls]', options: ['Identify duplicate code', 'Extract to shared function', 'Replace copies with function calls'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What does YAGNI stand for?', options: ['You Aren\'t Gonna Need It', 'Your Agent Generates New Interfaces', 'Yield All Graph Node Indices', 'Yes Always Generate Normalized Indexes'], correct: 0 },
    { type: 'code-output', q: "const greet = (name = 'Joe') => name;\nconsole.log(greet());", options: ['Joe', 'undefined', 'null', 'Error'], correct: 0 }
  ]
});

// 2. Testing
window.CSFA_RAW_TOPICS.push({
  id: 'testing',
  module: 12,
  title: 'Testing',
  tagline: 'Ensuring codebase correctness — Unit, Integration, and End-to-End frameworks.',
  readMinutes: 8,
  intro: {
    whatItIs: "Software Testing is the practice of executing code automatically to verify that it behaves correctly under specific conditions. Tests are categorized into: Unit Tests (checking isolated functions), Integration Tests (checking groups of modules together), and End-to-End (E2E) Tests (checking the complete user flow in a browser).",
    whyItMatters: "Testing prevents regressions. As your codebase grows, tests verify that new features or refactoring changes do not break existing functionality, allowing teams to ship updates with confidence.",
    whereUsed: "Standard practice in continuous integration (CI) pipelines, automated deployments, and Test-Driven Development (TDD) workflows.",
    commonMistakes: "Writing code that is tightly coupled to global variables, which makes it impossible to isolate and test functions without setting up the entire database state."
  },
  visual: {
    caption: "The test automation pyramid: Unit vs Integration vs E2E",
    type: "solid-principles"
  },
  examples: [
    {
      difficulty: "very-easy", title: "A simple Assertion",
      explanation: "An assertion checks if a function output matches the expected value, throwing an error if it doesn't.",
      code: "function assertEqual(actual, expected) {\n  if (actual !== expected) throw new Error(`Expected ${expected} but got ${actual}`);\n  return 'Pass';\n}\nconsole.log(assertEqual(2 + 2, 4));",
      language: "javascript", output: "Pass"
    },
    {
      difficulty: "easy", title: "Testing isolated math utilities",
      explanation: "Writing a unit test suite to verify different input cases on a calculation helper.",
      code: "const add = (a, b) => a + b;\nfunction testAdd() {\n  if (add(2, 3) !== 5) return 'Fail';\n  if (add(-1, 1) !== 0) return 'Fail';\n  return 'All tests passed';\n}\nconsole.log(testAdd());",
      language: "javascript", output: "All tests passed"
    },
    {
      difficulty: "medium", title: "Mocking external network responses",
      explanation: "Unit tests use mock responses to test API clients without making real internet network calls.",
      code: "function fetchUserMock(id) {\n  return Promise.resolve({ id, name: 'Ada' }); // mock return\n}\nfetchUserMock(1).then(u => console.log('Mock user name:', u.name));",
      language: "javascript", output: "Mock user name: Ada"
    },
    {
      difficulty: "medium-plus", title: "Checking exceptions thrown",
      explanation: "Testing that functions correctly throw errors when given invalid inputs.",
      code: "function divide(a, b) {\n  if (b === 0) throw new Error('Divide by zero');\n  return a / b;\n}\nfunction testDivideError() {\n  try {\n    divide(10, 0);\n    return 'Fail (no error thrown)';\n  } catch (e) {\n    return 'Pass: ' + e.message;\n  }\n}\nconsole.log(testDivideError());",
      language: "javascript", output: "Pass: Divide by zero"
    },
    {
      difficulty: "hard", title: "A basic Unit Test runner",
      explanation: "A simple runner that collects and executes test suites, logging outcomes.",
      code: "const suite = [];\nfunction test(name, fn) { suite.push({ name, fn }); }\n\ntest('math check', () => { if (1+1 !== 2) throw 'err'; });\ntest('fail check', () => { if (2+2 !== 4) throw 'err'; });\n\nconst results = suite.map(t => {\n  try { t.fn(); return t.name + ': PASS'; }\n  catch(e) { return t.name + ': FAIL'; }\n});\nconsole.log(results.join(' | '));",
      language: "javascript", output: "math check: PASS | fail check: PASS"
    },
    {
      difficulty: "real-world", title: "Dynamic Cart state tester",
      explanation: "Verifying cart increment logic behaves correctly after multiple addition updates.",
      code: "const cart = [];\nconst add = (id) => {\n  const item = cart.find(i => i.id === id);\n  if (item) item.qty++; else cart.push({ id, qty: 1 });\n};\n// Test execution\nadd(10);\nadd(10);\nconst passed = cart.length === 1 && cart[0].qty === 2;\nconsole.log('Cart test outcome:', passed ? 'PASS' : 'FAIL');",
      language: "javascript", output: "Cart test outcome: PASS"
    }
  ],
  exercises: [
    {
      level: 1, title: "Write simple assertion",
      problem: "Write a statement that throws an error 'Assertion failed' if result is not 10.",
      hints: ["Use: if (result !== 10) throw new Error('Assertion failed');."],
      solution: "if (result !== 10) throw new Error('Assertion failed');"
    },
    {
      level: 2, title: "Unit test for multiply",
      problem: "Write a test function testMultiply() that asserts multiply(2, 3) is 6.",
      hints: ["If multiply(2,3) !== 6, throw error.", "Otherwise return 'Pass'."],
      solution: "function testMultiply() {\n  if (multiply(2, 3) !== 6) throw new Error('Test failed');\n  return 'Pass';\n}"
    },
    {
      level: 3, title: "Test pyramid levels",
      problem: "List the three main levels of the software testing pyramid, from base to top.",
      hints: ["Unit Tests, Integration Tests, End-to-End (E2E) Tests."],
      solution: "Unit Tests, Integration Tests, End-to-End (E2E) Tests"
    },
    {
      level: 4, title: "TDD step sequence",
      problem: "List the three phases of the Test-Driven Development (TDD) cycle.",
      hints: ["Red (write failing test), Green (make test pass), Refactor (clean code).", "Red, Green, Refactor."],
      solution: "Red, Green, Refactor"
    },
    {
      level: 5, title: "Explain testing isolation",
      problem: "Why are mock functions (stubs) used during Unit Testing of database modules?",
      hints: ["To isolate the code being tested from external databases, ensuring speed, predictability, and preventing data pollution."],
      solution: "Mocks decouple the tested function from actual database networks, ensuring tests run fast, reliably, and without writing temp records to real tables."
    },
    {
      level: 6, title: "Real-world: Build assertion validator",
      problem: "Write a function assertDeepEqual(arr1, arr2) that throws an error 'Arrays differ' if they have different elements or lengths.",
      hints: ["Check arr1.length !== arr2.length.", "Loop indexes, check arr1[i] !== arr2[i]."],
      solution: "function assertDeepEqual(arr1, arr2) {\n  if (arr1.length !== arr2.length) throw new Error('Arrays differ');\n  for (let i = 0; i < arr1.length; i++) {\n    if (arr1[i] !== arr2[i]) throw new Error('Arrays differ');\n  }\n  return true;\n}"
    }
  ],
  interview: [
    {
      q: "Explain the testing pyramid and the ratio of test types you should write.",
      a: "The testing pyramid shows the distribution of test types: 1) Unit Tests form the wide base (fast, cheap, highly isolated, write the most). 2) Integration Tests form the middle (verify modules work together). 3) End-to-End (E2E) Tests form the top peak (slow, expensive, runs full user flows in browser, write the fewest)."
    },
    {
      q: "What is Test-Driven Development (TDD), and what are its steps?",
      a: "TDD is a software design process where you write tests before writing implementation code. Its cycle is 'Red, Green, Refactor': 1) Red: Write a failing test for a non-existent feature. 2) Green: Write the minimum implementation code to make the test pass. 3) Refactor: Clean up and optimize the code while keeping tests green."
    },
    {
      q: "What is the difference between a Mock and a Stub?",
      a: "A Stub is a simple dummy replacement that returns hardcoded static values to satisfy function calls during tests. A Mock is a more advanced placeholder that records calls (arguments, invocation counts) and asserts that the tested code interacted with it correctly."
    },
    {
      q: "Why is global mutable state a major obstacle for automated testing?",
      a: "Because global state creates dependencies between tests. If Test A modifies a global variable, it can cause Test B to fail depending on their execution order. Tests must run in isolation, resetting all states before and after each run."
    },
    {
      q: "What is Regression Testing?",
      a: "Regression testing is running your existing test suite after making changes (like adding features or refactoring) to verify that the updates did not break previously functional code."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Runs thousands of unit tests on every pull request to verify invoice calculations are precise." },
    { company: "GitHub", text: "Executes integration test suites when compiling pull request branches to ensure branch status updates compile correctly." },
    { company: "Netflix", text: "Uses automated E2E browser scripts to test login and video playback interfaces across diverse virtual TV screens." },
    { company: "OpenAI", text: "Validates code library syntax across multiple Python environments using GitHub Action test runner suites." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which test type verifies isolated individual functions in complete isolation?', options: ['Unit Tests', 'Integration Tests', 'E2E Tests', 'System Tests'], correct: 0 },
    { type: 'true-false', q: 'End-to-End (E2E) tests are faster and cheaper to run than Unit tests.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is the correct sequence of the TDD development cycle?', options: ['Code, test, deploy', 'Refactor, red, green', 'Red (write failing test), Green (make pass), Refactor (clean)', 'Create database, write API, compile UI'], correct: 2 },
    { type: 'code-output', q: "const check = (act, exp) => act === exp ? 'PASS' : 'FAIL';\nconsole.log(check(2+2, 5));", options: ['PASS', 'FAIL', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which placeholder object checks function call invocations and arguments during test execution?', options: ['Stub', 'Mock', 'Constant', 'Global'], correct: 1 },
    { type: 'true-false', q: 'A regression test verifies that new code modifications have not broken previously functional features.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is the purpose of test assertions?', options: ['To compile JavaScript into machine code', 'To compare actual function outputs against expected values, flagging mismatches', 'To format code syntax styles', 'To query database records'], correct: 1 },
    { type: 'drag-drop', q: 'Order the testing layers from cheapest/fastest to most expensive/slowest: [Unit Tests, Integration Tests, E2E Browser Tests]', options: ['Unit Tests', 'Integration Tests', 'E2E Browser Tests'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What error is typically thrown by a failing test assertion in JavaScript?', options: ['SyntaxError', 'Error / AssertionError', 'TypeError', 'ReferenceError'], correct: 1 },
    { type: 'code-output', q: "const test = () => { throw new Error('fail'); };\ntry { test(); console.log('ok'); } catch(e) { console.log('caught'); }", options: ['ok', 'caught', 'fail', 'Error'], correct: 1 }
  ]
});

// 3. SOLID
window.CSFA_RAW_TOPICS.push({
  id: 'solid',
  module: 12,
  title: 'SOLID Principles',
  tagline: 'Designing flexible object-oriented architectures — five core guidelines.',
  readMinutes: 9,
  intro: {
    whatItIs: "SOLID is an acronym for five design principles of object-oriented software design: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. They make codebases modular, robust, and easy to extend.",
    whyItMatters: "Software requirements change. If code violates SOLID, making a small update requires editing dozens of unrelated classes, leading to fragile architectures ('spaghetti code'). SOLID ensures components decouple.",
    whereUsed: "Standard design framework analyzed in software architecture reviews, design patterns selection, and interface designs.",
    commonMistakes: "Violating Single Responsibility by creating classes that manage logging, database queries, and UI rendering simultaneously."
  },
  visual: {
    caption: "The five SOLID principles layout",
    type: "solid-principles"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Single Responsibility Principle (SRP)",
      explanation: "A class should have one, and only one, reason to change.",
      code: "class Report {\n  constructor(data) { this.data = data; }\n  getTitle() { return this.data.title; }\n}\n// Keep saving separate from content data\nclass ReportSaver {\n  save(report) { console.log('Saved report:', report.getTitle()); }\n}\nconst rs = new ReportSaver(); rs.save(new Report({ title: 'Quarterly' }));",
      language: "javascript", output: "Saved report: Quarterly"
    },
    {
      difficulty: "easy", title: "Open/Closed Principle (OCP)",
      explanation: "Software entities should be open for extension, but closed for modification.",
      code: "class GoldDiscount {\n  apply(price) { return price * 0.9; }\n}\nclass SilverDiscount {\n  apply(price) { return price * 0.95; }\n}\nfunction getPrice(price, discountClass) {\n  return discountClass.apply(price); // extensible without modifying getPrice\n}\nconsole.log(getPrice(100, new GoldDiscount()));",
      language: "javascript", output: "90"
    },
    {
      difficulty: "medium", title: "Liskov Substitution Principle (LSP)",
      explanation: "Subclasses must be substitutable for their superclass without breaking correct behavior.",
      code: "class Bird { fly() { return 'Flying'; } }\n// Duck inherits fly correctly\nclass Duck extends Bird {}\nconst d = new Duck();\nconsole.log(d.fly());",
      language: "javascript", output: "Flying"
    },
    {
      difficulty: "medium-plus", title: "Interface Segregation Principle (ISP)",
      explanation: "Clients should not be forced to depend on interfaces they do not use, splitting bloated APIs.",
      code: "const Printer = { print: () => 'Printing' };\nconst Scanner = { scan: () => 'Scanning' };\n// Client only implements Printer\nconst BasicMachine = { ...Printer };\nconsole.log(BasicMachine.print());",
      language: "javascript", output: "Printing"
    },
    {
      difficulty: "hard", title: "Dependency Inversion Principle (DIP)",
      explanation: "High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).",
      code: "class SQLDatabase {\n  connect() { return 'SQL DB Connected'; }\n}\nclass App {\n  // App depends on database parameter abstraction (dependency injection)\n  constructor(db) { this.db = db; }\n  init() { return this.db.connect(); }\n}\nconst app = new App(new SQLDatabase());\nconsole.log(app.init());",
      language: "javascript", output: "SQL DB Connected"
    },
    {
      difficulty: "real-world", title: "Decoupled Payment processor (DIP in Action)",
      explanation: "Checkout models connect to interfaces rather than concrete libraries (like Stripe), allowing easy processor switching.",
      code: "class StripeProcessor { pay(amount) { return `Charged $${amount} via Stripe`; } }\nclass PaypalProcessor { pay(amount) { return `Charged $${amount} via Paypal`; } }\nclass Cart {\n  constructor(paymentProcessor) { this.processor = paymentProcessor; }\n  checkout(amount) { return this.processor.pay(amount); }\n}\nconst cart = new Cart(new StripeProcessor());\nconsole.log(cart.checkout(50));",
      language: "javascript", output: "Charged $50 via Stripe"
    }
  ],
  exercises: [
    {
      level: 1, title: "Identify Single Responsibility",
      problem: "Which SOLID principle is violated by a class managing both email validation and PDF parsing?",
      hints: ["The letter is S.", "Single Responsibility Principle (SRP)."],
      solution: "Single Responsibility Principle"
    },
    {
      level: 2, title: "Open/Closed definition",
      problem: "Fill in blank: 'Entities should be open for ____, closed for modification.'",
      hints: ["We add features by adding new code, not editing old code.", "extension."],
      solution: "extension"
    },
    {
      level: 3, title: "Subclass rule validation",
      problem: "Which SOLID letter mandates that subclasses must behave consistently with their parent class?",
      hints: ["Liskov Substitution Principle.", "L."],
      solution: "L"
    },
    {
      level: 4, title: "Interface segregation target",
      problem: "What is the goal of the Interface Segregation Principle?",
      hints: ["To split bloated, multi-purpose interfaces into smaller, specific ones so clients only implement what they use."],
      solution: "To prevent clients from depending on methods they do not use, by splitting large interfaces into smaller, specific ones."
    },
    {
      level: 5, title: "Abstractions vs Concrete dependencies",
      problem: "Which SOLID principle recommends using Dependency Injection to pass database clients into application instances?",
      hints: ["Dependency Inversion Principle (DIP)."],
      solution: "Dependency Inversion Principle"
    },
    {
      level: 6, title: "Real-world: Refactor OCP validation class",
      problem: "Write a refactored PaymentGateway class that accepts validator classes as plugins, rather than using an internal switch statement to validate payments.",
      hints: ["Instead of switch(type), call validator.validate() on an object parameter passed into execute."],
      solution: "class PaymentGateway {\n  execute(payment, validator) {\n    if (!validator.validate(payment)) throw new Error('Invalid');\n    return 'Processed';\n  }\n}"
    }
  ],
  interview: [
    {
      q: "What does the SOLID acronym stand for?",
      a: "S: Single Responsibility Principle. O: Open/Closed Principle. L: Liskov Substitution Principle. I: Interface Segregation Principle. D: Dependency Inversion Principle."
    },
    {
      q: "Explain the Single Responsibility Principle (SRP).",
      a: "SRP states that a class or module should have one, and only one, reason to change. It means a component must perform exactly one core task; separating concerns (like business logic from database operations) makes the code easier to test and modify."
    },
    {
      q: "Explain the Open/Closed Principle (OCP).",
      a: "OCP states that software entities (classes, modules, functions) should be open for extension but closed for modification. You should be able to add new functionality (extend) by writing new code, rather than altering (modifying) existing, tested code."
    },
    {
      q: "What is the Dependency Inversion Principle (DIP) and how does it relate to Dependency Injection?",
      a: "DIP states that high-level modules should not depend on low-level modules; both should depend on abstractions (interfaces). Dependency Injection is a technique to implement this: instead of a class instantiating its dependencies inside its constructor, the dependencies are passed (injected) in, decoupling the implementations."
    },
    {
      q: "How does violating the Liskov Substitution Principle (LSP) lead to fragile code?",
      a: "LSP states that subclasses must be substitutable for their parent classes. If a subclass overrides a parent method by throwing an unexpected exception or changing the return type, code calling the parent class will break when passed the subclass, requiring messy type-checking loops."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Decouples payment networks using Dependency Inversion to support Stripe, PayPal, and local integrations without editing core checkout components." },
    { company: "Google", text: "Applies OCP to browser plugins, letting developers extend Chrome's features without modifying browser source code." },
    { company: "Netflix", text: "Uses Interface Segregation to design small client APIs for TV, web, and mobile, avoiding bloated payloads." },
    { company: "OpenAI", text: "Isolates model API clients using SRP, keeping authentication logic separate from text generation logic." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which SOLID principle mandates that a class should have exactly one reason to change?', options: ['Open/Closed', 'Interface Segregation', 'Single Responsibility', 'Liskov Substitution'], correct: 2 },
    { type: 'true-false', q: 'Open/Closed mandates that once code is written, it is finalized and cannot be extended with new code.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which principle states that subclasses must be substitutable for their superclass without breaking client expectations?', options: ['Single Responsibility', 'Dependency Inversion', 'Liskov Substitution', 'Interface Segregation'], correct: 2 },
    { type: 'code-output', q: "class Database {\n  connect() { return 'Connect'; }\n}\nconst db = new Database();\nconsole.log(db.connect());", options: ['Connect', 'undefined', 'null', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Which principle recommends relying on abstractions (interfaces) rather than concrete implementations?', options: ['Liskov Substitution', 'Open/Closed', 'Dependency Inversion', 'Interface Segregation'], correct: 2 },
    { type: 'true-false', q: 'Interface Segregation suggests splitting large, multi-purpose interfaces into smaller, highly specific ones.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What technique passes dependencies into a class\'s constructor rather than instantiating them inside?', options: ['Normalisation', 'Dependency Injection', 'Encapsulation', 'Polymorphism'], correct: 1 },
    { type: 'drag-drop', q: 'Match acronym to meaning: [S - Single Responsibility, O - Open/Closed, D - Dependency Inversion]', options: ['S - Single Responsibility', 'O - Open/Closed', 'D - Dependency Inversion'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What is a major symptom of code violating SOLID design principles?', options: ['Compiler syntax errors', 'Tight coupling where modifying one feature breaks unrelated code modules', 'Fast compilation times', 'Increased database query performance'], correct: 1 },
    { type: 'code-output', q: "const sum = (x, y) => x + y;\nconsole.log(typeof sum === 'function' ? 'SOLID-compliant' : 'non-compliant');", options: ['SOLID-compliant', 'non-compliant', 'undefined', 'Error'], correct: 0 }
  ]
});

// 4. Design Patterns
window.CSFA_RAW_TOPICS.push({
  id: 'design-patterns',
  module: 12,
  title: 'Design Patterns',
  tagline: 'Standard solutions to common software design problems — Singleton, Factory, and Observer.',
  readMinutes: 8,
  intro: {
    whatItIs: "Design Patterns are typical solutions to common problems in software design. Rather than specific copy-paste code segments, patterns are templates or conceptual guidelines explaining how to structure relationships between classes and objects.",
    whyItMatters: "Patterns prevent reinventing the wheel. They establish a shared vocabulary for developers, allowing you to say 'we'll use an Observer here' and immediately convey the communication structure.",
    whereUsed: "Every large codebase—UI event handling (Observer), configuration trackers (Singleton), and database wrappers (Factory).",
    commonMistakes: "Overusing patterns unnecessarily (like using Singletons for everything), leading to over-engineered architectures and global scope issues."
  },
  visual: {
    caption: "The Singleton, Factory, and Observer patterns communication structures",
    type: "design-patterns"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Singleton Pattern",
      explanation: "Enforces that a class has only one instance, providing a global access point to it.",
      code: "const DatabaseInstance = (function() {\n  let instance;\n  return {\n    getInstance: () => {\n      if (!instance) instance = { conn: 'SQL Connected' };\n      return instance;\n    }\n  };\n})();\nconst db1 = DatabaseInstance.getInstance();\nconst db2 = DatabaseInstance.getInstance();\nconsole.log('Same instance:', db1 === db2);",
      language: "javascript", output: "Same instance: true"
    },
    {
      difficulty: "easy", title: "Factory Pattern",
      explanation: "Defines an interface for creating objects, letting subclasses decide which class to instantiate.",
      code: "class Admin { constructor() { this.role = 'admin'; } }\nclass User { constructor() { this.role = 'user'; } }\nconst UserFactory = {\n  create: (type) => type === 'admin' ? new Admin() : new User()\n};\nconsole.log('Created admin role:', UserFactory.create('admin').role);",
      language: "javascript", output: "Created admin role: admin"
    },
    {
      difficulty: "medium", title: "Observer Pattern (Publish-Subscribe)",
      explanation: "Allows objects (observers) to subscribe to and receive updates when an event occurs in a subject.",
      code: "class Subject {\n  constructor() { this.subs = []; }\n  subscribe(fn) { this.subs.push(fn); }\n  notify(data) { this.subs.forEach(fn => fn(data)); }\n}\nconst sub = new Subject();\nsub.subscribe(msg => console.log('Sub received:', msg));\nsub.notify('Hello');",
      language: "javascript", output: "Sub received: Hello"
    },
    {
      difficulty: "medium-plus", title: "Decorator Pattern",
      explanation: "Dynamically adds responsibilities or behaviors to an object without modifying its core class code.",
      code: "const base = () => 'Base';\nconst withDecorations = (fn) => () => fn() + ' + Extra';\nconst decorated = withDecorations(base);\nconsole.log(decorated());",
      language: "javascript", output: "Base + Extra"
    },
    {
      difficulty: "hard", title: "Strategy Pattern simulator",
      explanation: "Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.",
      code: "const strategies = {\n  creditCard: (amount) => 'Stripe $' + amount,\n  paypal: (amount) => 'Paypal $' + amount\n};\nclass PaymentContext {\n  setStrategy(key) { this.strategy = strategies[key]; }\n  pay(amount) { return this.strategy(amount); }\n}\nconst context = new PaymentContext();\ncontext.setStrategy('creditCard');\nconsole.log(context.pay(100));",
      language: "javascript", output: "Stripe $100"
    },
    {
      difficulty: "real-world", title: "Event Dispatcher system (Observer Pattern)",
      explanation: "UI routing frameworks use observers to update views when the URL state changes.",
      code: "class Router {\n  constructor() { this.listeners = []; }\n  onNavigate(fn) { this.listeners.push(fn); }\n  go(path) { this.listeners.forEach(fn => fn(path)); }\n}\nconst r = new Router();\nr.onNavigate(path => console.log('Navigated to:', path));\nr.go('/dashboard');",
      language: "javascript", output: "Navigated to: /dashboard"
    }
  ],
  exercises: [
    {
      level: 1, title: "Singleton instance check",
      problem: "True or False: The Singleton pattern ensures that a class has exactly one instance globally.",
      hints: ["It prevents creating additional instances using constructors.", "True."],
      solution: "True"
    },
    {
      level: 2, title: "Identify creation pattern",
      problem: "Which pattern encapsulates object instantiation, returning different objects based on arguments?",
      hints: ["The word is Factory."],
      solution: "Factory"
    },
    {
      level: 3, title: "Identify publish/subscribe pattern",
      problem: "Name the pattern where objects register as listeners to receive updates automatically when a state changes.",
      hints: ["Observer."],
      solution: "Observer"
    },
    {
      level: 4, title: "Explain Singleton global problem",
      problem: "Why is overusing the Singleton pattern considered an anti-pattern in testing workflows?",
      hints: ["Singletons introduce global state, coupling tests together and making parallel test isolation impossible."],
      solution: "Because Singletons act as global state variables. This tightly couples test suites together, preventing test isolation and parallel execution."
    },
    {
      level: 5, title: "Observe event registers",
      problem: "Write a simple Subject class with methods subscribe(fn) and notify(data) using standard arrays.",
      hints: ["Declare this.subs = [] inside constructor.", "subscribe pushes fn.", "notify loops and calls fn(data)."],
      solution: "class Subject {\n  constructor() { this.subs = []; }\n  subscribe(fn) { this.subs.push(fn); }\n  notify(data) { this.subs.forEach(fn => fn(data)); }\n}"
    },
    {
      level: 6, title: "Real-world: Dynamic logger decorator",
      problem: "Write a decorator function logExecution(fn) that logs 'Running' before executing the decorated function, returning the result.",
      hints: ["Return a function returning fn(...args).", "Log 'Running' before executing fn."],
      solution: "function logExecution(fn) {\n  return function(...args) {\n    console.log('Running');\n    return fn(...args);\n  };\n}"
    }
  ],
  interview: [
    {
      q: "What are Design Patterns, and what are their categories?",
      a: "Design Patterns are typical templates for solving common software architecture challenges. They are categorized into three groups: 1) Creational Patterns (e.g. Singleton, Factory), 2) Structural Patterns (e.g. Decorator, Adapter), and 3) Behavioral Patterns (e.g. Observer, Strategy)."
    },
    {
      q: "Explain the Singleton Pattern and its drawbacks.",
      a: "The Singleton Pattern ensures a class has only one instance and provides a global access point to it. Its main drawbacks are that it introduces global mutable state, tightly couples components, hides dependencies, and makes unit testing difficult due to shared state across test suites."
    },
    {
      q: "Explain the Observer Pattern and when it should be used.",
      a: "The Observer Pattern defines a one-to-many dependency where a subject object maintains a list of observer listeners and notifies them of state changes (usually calling their callback functions). Use it when changes in one object require updating other components (e.g., event listeners, redux stores)."
    },
    {
      q: "What is the Factory Pattern, and what problem does it solve?",
      a: "The Factory Pattern delegates the instantiation of objects to a central factory class or object. It decouples the client code from the concrete classes being instantiated, allowing you to add or modify classes without changing the client-side code."
    },
    {
      q: "What is the difference between the Decorator Pattern and inheritance?",
      a: "Inheritance extends behavior statically at compile time by creating child classes. The Decorator Pattern dynamically adds responsibilities to objects at runtime by wrapping them in decorator functions, providing greater flexibility and avoiding class-hierarchy explosion."
    }
  ],
  realWorld: [
    { company: "React", text: "Uses the Observer pattern to trigger component updates whenever local state setters are called." },
    { company: "Google", text: "Chrome uses Singleton managers to organize global browser state and settings caches." },
    { company: "Stripe", text: "SDK classes use the Factory pattern to instantiate specific API client classes based on API keys." },
    { company: "Netflix", text: "Applies the Decorator pattern to wrap API request streams with telemetry hooks." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which design pattern category handles object creation logic?', options: ['Structural Patterns', 'Behavioral Patterns', 'Creational Patterns', 'Functional Patterns'], correct: 2 },
    { type: 'true-false', q: 'The Singleton pattern requires all class variables to be public and static.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which pattern defines a one-to-many relationship where multiple listeners are updated automatically?', options: ['Singleton', 'Factory', 'Observer', 'Adapter'], correct: 2 },
    { type: 'code-output', q: "const factory = (t) => t === 'A' ? { val: 1 } : { val: 2 };\nconsole.log(factory('B').val);", options: ['1', '2', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which pattern wraps objects dynamically to add behaviors at runtime without subclassing?', options: ['Decorator', 'Singleton', 'Strategy', 'Factory'], correct: 0 },
    { type: 'true-false', q: 'Overusing the Singleton pattern can introduce global state issues that complicate automated testing.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is a Factory Pattern used for?', options: ['To encrypt database password hashes', 'To encapsulate and centralize object creation logic', 'To listen for DOM click events', 'To scale server connections pools'], correct: 1 },
    { type: 'drag-drop', q: 'Match pattern to description: [Singleton - Single instance, Factory - Dynamic creation, Observer - Event listening]', options: ['Singleton - Single instance', 'Factory - Dynamic creation', 'Observer - Event listening'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which pattern isolates algorithms inside swap-eligible classes at runtime?', options: ['Singleton', 'Decorator', 'Strategy', 'Observer'], correct: 2 },
    { type: 'code-output', q: "const sub = { list: [] };\nconst subFunc = (fn) => sub.list.push(fn);\nsubFunc(() => 10);\nconsole.log(sub.list.length);", options: ['0', '1', '10', 'Error'], correct: 1 }
  ]
});

// 5. Architecture
window.CSFA_RAW_TOPICS.push({
  id: 'architecture',
  module: 12,
  title: 'Architecture',
  tagline: 'Structuring entire systems — MVC, Microservices, and database layout splits.',
  readMinutes: 8,
  intro: {
    whatItIs: "Software Architecture refers to the high-level structure of a software system. It defines the software components, their properties, and how they interact (e.g. Model-View-Controller, Monoliths, Microservices, and Event-Driven systems).",
    whyItMatters: "Architecture dictates scalability and team speed. Choosing the wrong architecture (like building a massive monolith for a distributed system) can lead to deployment bottlenecks, resource limits, and complex deployment coordination.",
    whereUsed: "Determined during project initialization, system scaling, and database replication setups.",
    commonMistakes: "Adopting trendy architectures (like microservices) for simple projects too early, adding network latency and deployment complexity."
  },
  visual: {
    caption: "High-level MVC (Model-View-Controller) structure",
    type: "mvc-architecture"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Model-View-Controller division layout",
      explanation: "MVC separates data state (Model), user interface presentation (View), and input controllers (Controller).",
      code: "const MVC = { Model: 'Data', View: 'UI', Controller: 'Actions' };\nconsole.log('Model duty:', MVC.Model);",
      language: "javascript", output: "Model duty: Data"
    },
    {
      difficulty: "easy", title: "Model data check simulator",
      explanation: "The Model manages direct data queries, keeping database columns isolated from the View.",
      code: "const Model = { data: { count: 42 }, get: () => Model.data.count };\nconsole.log('Query from Model:', Model.get());",
      language: "javascript", output: "Query from Model: 42"
    },
    {
      difficulty: "medium", title: "Controller routing action mock",
      explanation: "The Controller parses incoming inputs and coordinates Model updates and View refreshes.",
      code: "const Controller = {\n  handleClick: (model, view) => {\n    model.count++;\n    view.render(model.count);\n  }\n};\nconst model = { count: 0 };\nconst view = { render: (v) => console.log('View showing:', v) };\nController.handleClick(model, view);",
      language: "javascript", output: "View showing: 1"
    },
    {
      difficulty: "medium-plus", title: "Event-driven architecture simulation",
      explanation: "Components communicate asynchronously by emitting and catching message topics.",
      code: "const bus = {\n  listeners: {},\n  on(topic, fn) { (this.listeners[topic] = this.listeners[topic] || []).push(fn); },\n  emit(topic, data) { (this.listeners[topic] || []).forEach(fn => fn(data)); }\n};\nbus.on('checkout', (amount) => console.log('Billing processing:', amount));\nbus.emit('checkout', 100);",
      language: "javascript", output: "Billing processing: 100"
    },
    {
      difficulty: "hard", title: "Monolith vs Microservices network simulator",
      explanation: "Monoliths make synchronous function calls; microservices make network HTTP requests (adding latency).",
      code: "function monolithCall() {\n  return 'Success'; // direct execution\n}\nfunction microserviceCall() {\n  return Promise.resolve('Success'); // network latency\n}\nconsole.log('Monolith direct:', monolithCall());",
      language: "javascript", output: "Monolith direct: Success"
    },
    {
      difficulty: "real-world", title: "Decoupled Service Layer mock",
      explanation: "Modern backends isolate database queries inside service layer classes, keeping controllers clean.",
      code: "class UserService {\n  constructor(db) { this.db = db; }\n  getUser(id) { return this.db.find(id); }\n}\nconst mockDb = { find: (id) => ({ id, name: 'Grace' }) };\nconst service = new UserService(mockDb);\nconsole.log('Result name:', service.getUser(10).name);",
      language: "javascript", output: "Result name: Grace"
    }
  ],
  exercises: [
    {
      level: 1, title: "MVC Model role",
      problem: "Which letter in the MVC pattern represents data state and database interactions?",
      hints: ["M.", "Model."],
      solution: "Model"
    },
    {
      level: 2, title: "MVC Controller role",
      problem: "Which letter in the MVC pattern processes user input actions and updates the Model?",
      hints: ["C.", "Controller."],
      solution: "Controller"
    },
    {
      level: 3, title: "Monolith system definition",
      problem: "What term describes a software system where all components are compiled and deployed together as a single unit?",
      hints: ["Monolith."],
      solution: "Monolith"
    },
    {
      level: 4, title: "Microservice database rule",
      problem: "True or False: In a microservices architecture, all services should share one central database table schema.",
      hints: ["Services must own their databases independently to allow loose coupling.", "False."],
      solution: "False"
    },
    {
      level: 5, title: "Service layer purpose",
      problem: "Explain the role of a Service Layer in modern web architectures.",
      hints: ["It acts as a buffer between HTTP controllers and database repositories, encapsulating core business rules."],
      solution: "The Service Layer encapsulates business logic and coordinates operations between controllers and database models, keeping code modular."
    },
    {
      level: 6, title: "Real-world: Route dispatcher parser",
      problem: "Write a function routeMVC(url, model, view, controller) that calls controller.update(model, view) if url is '/update'.",
      hints: ["Check if url === '/update'.", "Call controller.update, passing model and view."],
      solution: "function routeMVC(url, model, view, controller) {\n  if (url === '/update') {\n    controller.update(model, view);\n  }\n}"
    }
  ],
  interview: [
    {
      q: "Explain the Model-View-Controller (MVC) architecture.",
      a: "MVC is a software design pattern that divides an application into three interconnected components: 1) Model: Manages data state, business logic, and database operations. 2) View: Handles the presentation layer and user interface. 3) Controller: Receives user inputs, processes queries, and coordinates updates between Model and View."
    },
    {
      q: "Compare Monolithic and Microservices architectures.",
      a: "A Monolith compiles all components into a single deployable unit (easier to test, build, and deploy initially; hard to scale independently). Microservices split the app into small, self-contained services that communicate over network protocols (independent deployments and scaling; adds network latency and operational complexity)."
    },
    {
      q: "What is Event-Driven Architecture (EDA)?",
      a: "EDA is an architectural style where components communicate asynchronously by producing and consuming events. An event producer emits a notification (e.g. 'OrderPlaced'); interested event consumers capture the notification and trigger actions, decoupling the systems."
    },
    {
      q: "What is the database-per-service pattern in microservices, and why is it important?",
      a: "It dictates that each microservice must own and manage its database independently. Sharing a database table creates tight coupling, meaning a change in one service's schema can break other services, defeating the purpose of independent microservices."
    },
    {
      q: "What is a 'Layered Architecture' (or N-Tier)?",
      a: "It organizes software into hierarchical layers (commonly Presentation, Business/Service, Data/Repository). Each layer has a specific responsibility and can only communicate with the layer directly beneath it, isolating concerns."
    }
  ],
  realWorld: [
    { company: "Google", text: "Integrates microservice routing mesh systems to process search and analytics queries concurrently." },
    { company: "Netflix", text: "Transitioned from a monolithic backend to a massive microservices architecture to scale video streaming feeds globally." },
    { company: "Stripe", text: "Coordinates billing pipelines using event-driven architectures to process subscriptions asynchronously." },
    { company: "Amazon", text: "Uses decoupled database schemas per service to prevent single database points of failure during shopping spikes." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which component in the MVC pattern is responsible for displaying the user interface?', options: ['Model', 'View', 'Controller', 'Router'], correct: 1 },
    { type: 'true-false', q: 'In a microservices architecture, all microservices are compiled and deployed together as a single executable.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which architecture communicates asynchronously using event topics?', options: ['Monolithic Architecture', 'Event-Driven Architecture', 'Strict Layered Architecture', 'Model-View-Controller'], correct: 1 },
    { type: 'code-output', q: "const mvc = { model: () => 'data' };\nconsole.log(mvc.model());", options: ['data', 'undefined', 'null', 'Error'], correct: 0 },
    { type: 'mcq', q: 'What is a major advantage of Microservices over Monoliths?', options: ['Zero network latency', 'Ease of initial local deployments', 'Ability to scale and deploy services independently', 'No need for database schemas'], correct: 2 },
    { type: 'true-false', q: 'A Service Layer encapsulates business rules, separating HTTP controllers from raw database models.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which component in MVC intercepts user inputs to update data structures?', options: ['View', 'Database', 'Controller', 'Staging Area'], correct: 2 },
    { type: 'drag-drop', q: 'Order the MVC data flow: [User inputs action, Controller modifies Model, View updates display]', options: ['User inputs action', 'Controller modifies Model', 'View updates display'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What database design rule is standard in microservices architectures?', options: ['All services must query one shared database schema', 'Each service must own its private database independently', 'Databases are not allowed in microservices', 'Use only local text files'], correct: 1 },
    { type: 'code-output', q: "const layer = { repos: 'db', controllers: 'web' };\nconsole.log(layer.controllers);", options: ['db', 'web', 'undefined', 'Error'], correct: 1 }
  ]
});

// 6. Refactoring
window.CSFA_RAW_TOPICS.push({
  id: 'refactoring',
  module: 12,
  title: 'Refactoring',
  tagline: 'Improving design without changing external behavior — cleaning code smells.',
  readMinutes: 7,
  intro: {
    whatItIs: "Refactoring is the process of restructuring existing computer code—changing the internal design—without altering its external behavior. It aims to clean up 'code smells', reduce complexity, and improve code readability.",
    whyItMatters: "Code quality decays over time ('software rot'). Refactoring cleans up rushed modifications, simplifies logic structures, and makes the code modular, facilitating future feature expansions.",
    whereUsed: "Standard practice during code maintenance phases, prep steps before adding features, and code review alignments.",
    commonMistakes: "Refactoring code without having an automated test suite. Without tests, there is no way to guarantee that your modifications didn't break external behaviors."
  },
  visual: {
    caption: "The refactoring loop: run tests, clean structure, verify behaviors",
    type: "solid-principles"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Renaming for clarity",
      explanation: "Replacing obscure variable names with descriptive ones is the simplest refactoring step.",
      code: "const width = 10; // refactored from w = 10\nconsole.log('Width:', width);",
      language: "javascript", output: "Width: 10"
    },
    {
      difficulty: "easy", title: "Extracting a Magic Number",
      explanation: "Magic numbers are hardcoded constants; extract them to named variables to document intent.",
      code: "const TAX_RATE = 0.08;\nconst total = 100 * (1 + TAX_RATE);\nconsole.log('Total with tax:', total);",
      language: "javascript", output: "Total with tax: 108"
    },
    {
      difficulty: "medium", title: "Extract Function refactor",
      explanation: "Extracting a nested block of logic into its own named helper function improves readability.",
      code: "const isEven = (num) => num % 2 === 0;\nfunction filterEvens(arr) {\n  return arr.filter(isEven); // refactored logic\n}\nconsole.log(filterEvens([1, 2, 3, 4]));",
      language: "javascript", output: "[ 2, 4 ]"
    },
    {
      difficulty: "medium-plus", title: "Inline Function refactor",
      explanation: "If a function's body is self-explanatory, inlining it removes unnecessary abstraction layers.",
      code: "const isAdult = (age) => age >= 18;\nconsole.log('Is adult:', isAdult(20));",
      language: "javascript", output: "Is adult: true"
    },
    {
      difficulty: "hard", title: "Replacing loops with pipelines",
      explanation: "Replacing standard loops with functional pipelines (.map, .filter) improves expressiveness.",
      code: "const users = [{ name: 'Ada', age: 20 }, { name: 'Bo', age: 15 }];\nconst adults = users\n  .filter(u => u.age >= 18)\n  .map(u => u.name);\nconsole.log('Adult names:', adults.join(', '));",
      language: "javascript", output: "Adult names: Ada"
    },
    {
      difficulty: "real-world", title: "Refactoring deep nest check with early return",
      explanation: "Guard clauses flatten nested conditional structures, exposing the primary success route.",
      code: "function registerUser(user) {\n  if (!user) return 'Invalid';\n  if (!user.email) return 'Missing email';\n  return 'Success';\n}\nconsole.log('Registration:', registerUser({ email: 'ada@a.com' }));",
      language: "javascript", output: "Registration: Success"
    }
  ],
  exercises: [
    {
      level: 1, title: "Refactor variable name",
      problem: "Refactor const s = 3600; (representing seconds in an hour) to extract the magic number into a const.",
      hints: ["Name the variable SECONDS_IN_HOUR."],
      solution: "const SECONDS_IN_HOUR = 3600;"
    },
    {
      level: 2, title: "Prerequisite for safe refactor",
      problem: "What is the absolute prerequisite you should have before starting to refactor a complex module?",
      hints: ["You need a way to verify you didn't break external behavior.", "Automated tests (or test suite)."],
      solution: "Automated tests"
    },
    {
      level: 3, title: "Explain magic numbers",
      problem: "What is a 'Magic Number' in programming?",
      hints: ["A hardcoded numeric value with no clear name explaining what it represents."],
      solution: "A hardcoded numeric constant in the code that lacks a descriptive variable name explaining its meaning."
    },
    {
      level: 4, title: "Refactor loop to pipeline",
      problem: "Refactor this loop using filter():\nconst res = []; for(let i=0; i<a.length; i++) { if(a[i]>0) res.push(a[i]); }",
      hints: ["Use: const res = a.filter(x => x > 0);."],
      solution: "const res = a.filter(x => x > 0);"
    },
    {
      level: 5, title: "Guard clause converter",
      problem: "Refactor to use a guard clause: function run(x) { if(x) { execute(); } }",
      hints: ["If (!x) return; then call execute()."],
      solution: "function run(x) {\n  if (!x) return;\n  execute();\n}"
    },
    {
      level: 6, title: "Real-world: Split bloated function",
      problem: "Refactor this function by extracting the score summation loop into a helper function sumScores(arr):\nfunction process(user) { let t=0; for(let i=0; i<user.scores.length; i++) t+=user.scores[i]; return t > 100; }",
      hints: ["Write sumScores(arr) returning total.", "In process(user), return sumScores(user.scores) > 100;."],
      solution: "function sumScores(arr) {\n  return arr.reduce((sum, val) => sum + val, 0);\n}\nfunction process(user) {\n  return sumScores(user.scores) > 100;\n}"
    }
  ],
  interview: [
    {
      q: "What is refactoring, and what is its main constraint?",
      a: "Refactoring is the process of restructuring existing source code to improve its internal design, readability, and maintainability. Its primary constraint is that it must not alter the external behavior of the code (it should produce the exact same outputs for the same inputs)."
    },
    {
      q: "What are 'code smells'?",
      a: "Code smells are indicators in code that suggest a deeper design flaw or structural problem (e.g. duplicated code, magic numbers, massive classes, deeply nested conditionals, long parameter lists). They are not errors, but they flag areas that need refactoring."
    },
    {
      q: "Why is having a comprehensive test suite critical before refactoring?",
      a: "Because refactoring updates code structures. Without automated tests, there is no way to verify that your modifications did not introduce regression bugs or change the program's behavior, making refactoring high-risk."
    },
    {
      q: "Explain the 'Extract Function' refactoring pattern.",
      a: "It is a pattern where you take a block of code within a large function that performs a specific sub-task, move it into its own newly created helper function, and name that function descriptively, replacing the original block with a call to the new function."
    },
    {
      q: "What is the difference between refactoring and rewriting code?",
      a: "Refactoring incrementally improves the internal structure of existing code in small, safe steps, keeping it functional throughout. Rewriting is throwing away the existing code entirely and building a new replacement codebase from scratch."
    }
  ],
  realWorld: [
    { company: "Google", text: "Refactors compiler routines to keep modules modular and maintainable." },
    { company: "Stripe", text: "Regularly refactors checkout pipelines to support new validation layers." },
    { company: "Netflix", text: "Refactors TV player codecs to optimize streaming speeds." },
    { company: "OpenAI", text: "Refactors training pipeline steps to isolate GPU parameters." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the primary constraint when refactoring code?', options: ['To make the code run twice as fast', 'To improve internal design without changing external behavior', 'To rewrite the system in a different language', 'To add new user features'], correct: 1 },
    { type: 'true-false', q: 'A "code smell" is a compile-time syntax error that prevents the app from launching.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which is a common refactoring pattern?', options: ['Divide and Conquer', 'Extract Function', 'B-Tree Indexing', 'CORS blocking'], correct: 1 },
    { type: 'code-output', q: "const double = (x) => x * 2;\nconsole.log(double(5));", options: ['5', '10', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'What are hardcoded constants (like tax rates or timeouts) in code called before refactoring?', options: ['Variable stubs', 'Magic Numbers', 'Composite keys', 'Static frames'], correct: 1 },
    { type: 'true-false', q: 'You should always ensure you have a working test suite before refactoring complex modules.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which refactoring method replaces a loop with an array pipeline?', options: ['In-lining', 'Extract Method', 'Replace Loop with Pipeline (.map, .filter)', 'Abstraction inversion'], correct: 2 },
    { type: 'drag-drop', q: 'Order the refactoring steps: [Write automated tests, Identify code smell, Restructure code, Verify tests stay green]', options: ['Write automated tests', 'Identify code smell', 'Restructure code', 'Verify tests stay green'], correct: [0, 1, 2, 3] },
    { type: 'mcq', q: 'What refactoring step cleans up deeply nested if statements?', options: ['Multiplying variables', 'Guard Clauses (early returns)', 'Normalisation', 'Linear probing'], correct: 1 },
    { type: 'code-output', q: "const cleanName = (w) => w;\nconsole.log(cleanName('width'));", options: ['w', 'width', 'undefined', 'Error'], correct: 1 }
  ]
});
