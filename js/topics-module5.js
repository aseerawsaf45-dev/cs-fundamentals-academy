/* ==========================================================================
   TOPIC CONTENT DATA — Module 5: JavaScript Fundamentals
   Includes: DOM, Events, Functions, Closures, Promises, Async/Await, Fetch API, Modules
   ========================================================================== */

// Make sure RAW_TOPICS is initialized
if (!window.CSFA_RAW_TOPICS) {
  window.CSFA_RAW_TOPICS = [];
}

// 1. DOM
window.CSFA_RAW_TOPICS.push({
  id: 'dom',
  module: 5,
  title: 'DOM (Document Object Model)',
  tagline: 'How JavaScript represents and interacts with HTML elements in the browser.',
  readMinutes: 8,
  intro: {
    whatItIs: "The Document Object Model (DOM) is a programming interface for web documents. It represents the page as a structured tree of objects, allowing JavaScript to read, add, modify, or delete HTML elements and styles dynamically.",
    whyItMatters: "Without the DOM, JavaScript would just be a scripting language running in isolation. The DOM is the bridge that turns static HTML files into interactive, dynamic web applications.",
    whereUsed: "Every modern frontend framework (React, Vue, Angular) and vanilla JavaScript application uses the DOM under the hood to update what is displayed on the screen.",
    commonMistakes: "A common mistake is thinking the DOM is part of the JavaScript language itself. It isn't—it's a Web API provided by the browser that JavaScript has access to."
  },
  visual: {
    caption: "The HTML tree structure of the DOM",
    type: "dom-tree"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Selecting an element",
      explanation: "Use document.getElementById to select a specific element by its ID.",
      code: "const title = document.getElementById('title');\nconsole.log(title ? 'Found' : 'Not found');",
      language: "javascript", output: "Not found"
    },
    {
      difficulty: "easy", title: "Changing content",
      explanation: "You can change the text of an element using textContent or innerHTML.",
      code: "const div = document.createElement('div');\ndiv.textContent = 'Hello World';\nconsole.log(div.textContent);",
      language: "javascript", output: "Hello World"
    },
    {
      difficulty: "medium", title: "Manipulating classes",
      explanation: "classList provides methods like add, remove, and toggle to easily change element styles.",
      code: "const div = document.createElement('div');\ndiv.classList.add('active');\nconsole.log(div.classList.contains('active'));\ndiv.classList.toggle('active');\nconsole.log(div.classList.contains('active'));",
      language: "javascript", output: "true\nfalse"
    },
    {
      difficulty: "medium-plus", title: "Creating and appending elements",
      explanation: "Create new elements with document.createElement and add them to the page with appendChild.",
      code: "const list = document.createElement('ul');\nconst item = document.createElement('li');\nitem.textContent = 'Item 1';\nlist.appendChild(item);\nconsole.log(list.children.length, list.children[0].textContent);",
      language: "javascript", output: "1 Item 1"
    },
    {
      difficulty: "hard", title: "Traversing the DOM",
      explanation: "You can traverse up, down, and sideways through parents, children, and siblings.",
      code: "const parent = document.createElement('div');\nconst child = document.createElement('span');\nparent.appendChild(child);\nconsole.log(child.parentNode === parent);\nconsole.log(parent.firstChild === child);",
      language: "javascript", output: "true\ntrue"
    },
    {
      difficulty: "real-world", title: "Dynamic list rendering",
      explanation: "E-commerce apps use DOM manipulation to render search results dynamically from API data.",
      code: "const data = ['Phone', 'Laptop', 'Tablet'];\nconst container = document.createElement('div');\ndata.forEach(item => {\n  const p = document.createElement('p');\n  p.textContent = item;\n  container.appendChild(p);\n});\nconsole.log('Total items rendered:', container.children.length);",
      language: "javascript", output: "Total items rendered: 3"
    }
  ],
  exercises: [
    {
      level: 1, title: "Find element by ID",
      problem: "Write code to select an element with the ID 'app' and store it in a variable named app.",
      hints: ["Use document.getElementById.", "Remember to put quotes around the ID string."],
      solution: "const app = document.getElementById('app');"
    },
    {
      level: 2, title: "Modify inner HTML",
      problem: "Write a function updateMessage(element, text) that sets the inner HTML of the given element to text wrapped in strong tags.",
      hints: ["Use the innerHTML property on the element parameter.", "Concatenate text with '<strong>' and '</strong>'."],
      solution: "function updateMessage(element, text) {\n  element.innerHTML = '<strong>' + text + '</strong>';\n}"
    },
    {
      level: 3, title: "Add toggle class helper",
      problem: "Write a function toggleHighlight(element) that adds the class 'highlight' if it's not present, and removes it if it is.",
      hints: ["Use classList.toggle on the element."],
      solution: "function toggleHighlight(element) {\n  element.classList.toggle('highlight');\n}"
    },
    {
      level: 4, title: "Count child paragraphs",
      problem: "Write a function countParagraphs(container) that returns the number of paragraphs ('p' elements) directly inside the container.",
      hints: ["Use container.querySelectorAll('p').", "Return the length of the matching NodeList."],
      solution: "function countParagraphs(container) {\n  return container.querySelectorAll('p').length;\n}"
    },
    {
      level: 5, title: "Build custom list item",
      problem: "Write a function createListItem(text, classList) that creates an 'li' element, adds the provided array of classes to it, and sets its text content.",
      hints: ["Create element using document.createElement('li').", "Iterate over the classList array and use classList.add.", "Set textContent property."],
      solution: "function createListItem(text, classList) {\n  const li = document.createElement('li');\n  classList.forEach(cls => li.classList.add(cls));\n  li.textContent = text;\n  return li;\n}"
    },
    {
      level: 6, title: "Real-world: Safe clean append",
      problem: "Write a function safeRender(parent, text) that clears all existing contents of parent and safely appends a text node containing text (to avoid XSS injection).",
      hints: ["Clear parent using parent.innerHTML = '' or while loop.", "Create a TextNode using document.createTextNode.", "Append it using appendChild."],
      solution: "function safeRender(parent, text) {\n  parent.innerHTML = '';\n  const textNode = document.createTextNode(text);\n  parent.appendChild(textNode);\n}"
    }
  ],
  interview: [
    {
      q: "What is the difference between innerHTML, textContent, and innerText?",
      a: "innerHTML returns/modifies the parsed HTML content, making it vulnerable to XSS. textContent returns/modifies the raw text content of all nodes including hidden ones, and is safe from XSS. innerText is similar to textContent but respects CSS styling (e.g., skips hidden text) and triggers layout reflows, making it slower."
    },
    {
      q: "What is DOM reflow and repaint, and how do you optimize them?",
      a: "Reflow is when the browser recalculates the positions and geometries of elements. Repaint is when the browser updates pixels on the screen. To optimize, minimize direct DOM modifications: use DocumentFragments to batch changes, make styling updates via class names instead of individual inline styles, or use offline DOM nodes before appending them."
    },
    {
      q: "What is a NodeList versus an Array, and how do you convert between them?",
      a: "A NodeList is a collection of DOM nodes returned by querySelectorAll or children. Some NodeLists are live (updating automatically), and they lack Array methods like map or filter. You can convert a NodeList to a real Array using Array.from(nodeList) or the spread operator [...nodeList]."
    },
    {
      q: "What is the difference between document.querySelector and document.getElementById?",
      a: "getElementById selects elements exclusively by ID and is highly optimized. querySelector is more flexible, accepting any CSS selector (class, tag, attribute), but is slightly slower. getElementById returns a single element directly, while querySelector returns the first matching element."
    },
    {
      q: "Why is direct DOM manipulation discouraged in modern framework architectures?",
      a: "Frameworks like React use a Virtual DOM or compiler directives to manage updates declaratively. Direct DOM manipulation bypasses the framework's state-tracking mechanisms, leading to out-of-sync states, unpredictable UI bugs, and performance penalties from un-batched reflows."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Uses direct, highly-secure DOM sandboxes (iframes) to isolate payment fields from host page scripts to ensure PCI compliance." },
    { company: "Google", text: "Google Docs uses a highly customized virtual rendering engine that dynamically updates and draws lines of text in the DOM based on user scroll position." },
    { company: "OpenAI", text: "ChatGPT renders markdown blocks, syntax-highlighted code containers, and copy buttons dynamically in the DOM as tokens stream from the LLM endpoint." },
    { company: "Netflix", text: "Implements infinite scrolling row carousels by recycling DOM nodes (virtual scrolling) to maintain 60FPS on low-powered TV browsers." }
  ],
  quiz: [
    { type: 'mcq', q: 'What does DOM stand for?', options: ['Document Object Model', 'Data Output Method', 'Digital Option Module', 'Document Orientation Manager'], correct: 0 },
    { type: 'true-false', q: 'The DOM is an official part of the core JavaScript language specifications.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which method selects all elements matching a CSS selector?', options: ['document.getElementById', 'document.getElementsByClassName', 'document.querySelectorAll', 'document.querySelector'], correct: 2 },
    { type: 'code-output', q: "const el = document.createElement('span');\nel.textContent = 'Hi';\nconsole.log(el.parentNode);\n\nWhat is logged?", options: ['<body>', 'null', 'undefined', 'document'], correct: 1 },
    { type: 'mcq', q: 'Which property should be used to change raw text safely, avoiding XSS vulnerability?', options: ['innerHTML', 'textContent', 'outerHTML', 'value'], correct: 1 },
    { type: 'true-false', q: 'A NodeList is a native JavaScript Array and has access to all Array.prototype methods.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is a browser "reflow"?', options: ['Connecting to a socket', 'Recalculating positions and sizes of elements on page', 'Caching images', 'Garbage collection of DOM nodes'], correct: 1 },
    { type: 'drag-drop', q: 'Order these from top parent to deepest child: [Document, Body, Paragraph]', options: ['Document', 'Body', 'Paragraph'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'How can you convert a NodeList to a standard JavaScript Array?', options: ['nodeList.toArray()', 'Array.from(nodeList)', 'JSON.stringify(nodeList)', 'Object.values(nodeList)'], correct: 1 },
    { type: 'code-output', q: "const d = document.createElement('div');\nd.classList.add('a');\nd.classList.toggle('a');\nconsole.log(d.classList.contains('a'));", options: ['true', 'false', 'undefined', 'null'], correct: 1 }
  ]
});

// 2. Events
window.CSFA_RAW_TOPICS.push({
  id: 'events',
  module: 5,
  title: 'Events',
  tagline: 'Handling user interactions like clicks, keyboard entries, and scrolls in the browser.',
  readMinutes: 8,
  intro: {
    whatItIs: "Events are actions or occurrences that happen in the browser window, which the browser alerts you to so you can respond to them. JavaScript registers listeners to capture these signals—such as click, keydown, submit, or scroll.",
    whyItMatters: "Events are the heartbeat of web interactivity. They allow your application to react to whatever the user does, from clicking a submit button to loading data when they scroll to the bottom of the page.",
    whereUsed: "Used everywhere. Every dropdown menu, click tracking, keyboard shortcut, drag-and-drop file upload, and custom form submission relies on browser events.",
    commonMistakes: "Forgetting to call event.preventDefault() in form submit handlers, which causes the page to reload and clear the state. Another is creating memory leaks by registering event listeners and forgetting to remove them."
  },
  visual: {
    caption: "Event propagation: bubbling vs capturing phase",
    type: "event-bubble"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Adding a click listener",
      explanation: "Use addEventListener to listen for a specific event on a DOM node.",
      code: "const btn = document.createElement('button');\nbtn.addEventListener('click', (e) => {\n  console.log('Clicked!');\n});\nbtn.click();",
      language: "javascript", output: "Clicked!"
    },
    {
      difficulty: "easy", title: "Preventing default behavior",
      explanation: "event.preventDefault() blocks browser defaults, like page reloads on form submissions.",
      code: "const form = document.createElement('form');\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  console.log('Submission handled manually');\n});\nform.dispatchEvent(new Event('submit'));",
      language: "javascript", output: "Submission handled manually"
    },
    {
      difficulty: "medium", title: "Event bubbling demo",
      explanation: "Events bubble up from children to parents unless stopped using event.stopPropagation().",
      code: "const parent = document.createElement('div');\nconst child = document.createElement('button');\nparent.appendChild(child);\n\nparent.addEventListener('click', () => console.log('Parent caught it'));\nchild.addEventListener('click', (e) => {\n  console.log('Child clicked');\n  // e.stopPropagation(); // Try uncommenting this\n});\nchild.click();",
      language: "javascript", output: "Child clicked\nParent caught it"
    },
    {
      difficulty: "medium-plus", title: "Event delegation pattern",
      explanation: "Attach one listener to a parent element to handle events on dynamic children, checking event.target.",
      code: "const list = document.createElement('ul');\nlist.addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') {\n    console.log('Clicked item:', e.target.textContent);\n  }\n});\nconst item = document.createElement('li');\nitem.textContent = 'Apple';\nlist.appendChild(item);\nitem.click();",
      language: "javascript", output: "Clicked item: Apple"
    },
    {
      difficulty: "hard", title: "Keyboard shortcuts listener",
      explanation: "Listen to keydown events globally and check keyboard modifiers like ctrlKey or metaKey.",
      code: "const handleKeys = (e) => {\n  if (e.ctrlKey && e.key === 's') {\n    e.preventDefault();\n    console.log('Shortcut CTRL+S intercepted');\n  }\n};\nhandleKeys({ ctrlKey: true, key: 's', preventDefault: () => {} });",
      language: "javascript", output: "Shortcut CTRL+S intercepted"
    },
    {
      difficulty: "real-world", title: "Simple event emitter pattern",
      explanation: "Custom events allow building decoupled modular components that communicate by dispatching events.",
      code: "const doc = document.createElement('div');\ndoc.addEventListener('cart-updated', (e) => {\n  console.log('Cart count is now:', e.detail.count);\n});\nconst event = new CustomEvent('cart-updated', { detail: { count: 5 } });\ndoc.dispatchEvent(event);",
      language: "javascript", output: "Cart count is now: 5"
    }
  ],
  exercises: [
    {
      level: 1, title: "Register click handler",
      problem: "Write a function attachClick(button, callback) that calls callback whenever button is clicked.",
      hints: ["Use button.addEventListener.", "The first argument is the string 'click'."],
      solution: "function attachClick(button, callback) {\n  button.addEventListener('click', callback);\n}"
    },
    {
      level: 2, title: "Form validation guard",
      problem: "Write a submit listener registration that calls preventDefault() on the event if orderAmount is less than 0.",
      hints: ["Access event object, call event.preventDefault()."],
      solution: "form.addEventListener('submit', (e) => {\n  if (orderAmount < 0) {\n    e.preventDefault();\n  }\n});"
    },
    {
      level: 3, title: "Stop bubble helper",
      problem: "Write an event handler function stopPropagationHelper(e) that logs 'Clicked child' and stops the click from bubbling.",
      hints: ["Call e.stopPropagation()."],
      solution: "function stopPropagationHelper(e) {\n  console.log('Clicked child');\n  e.stopPropagation();\n}"
    },
    {
      level: 4, title: "Select menu dynamic delegation",
      problem: "Write a function delegateMenu(container, callback) that listens for clicks on elements with the class 'menu-btn' inside container.",
      hints: ["Listen to click on container.", "Check e.target.classList.contains('menu-btn')."],
      solution: "function delegateMenu(container, callback) {\n  container.addEventListener('click', (e) => {\n    if (e.target.classList.contains('menu-btn')) {\n      callback(e.target);\n    }\n  });\n}"
    },
    {
      level: 5, title: "Listen for Escape key",
      problem: "Write a keydown listener on window that calls closemodal() if the pressed key is 'Escape' or 'Esc'.",
      hints: ["Add listener to window.", "Check e.key === 'Escape'."],
      solution: "window.addEventListener('keydown', (e) => {\n  if (e.key === 'Escape' || e.key === 'Esc') {\n    closemodal();\n  }\n});"
    },
    {
      level: 6, title: "Real-world: Debounced scroll tracker",
      problem: "Write a simple function scrollTracker(callback) that registers a scroll listener but uses a timeout to wait at least 50ms before triggering the callback to avoid performance stutter.",
      hints: ["Use a clear/set timeout pattern inside the scroll handler."],
      solution: "function scrollTracker(callback) {\n  let timeout;\n  window.addEventListener('scroll', () => {\n    clearTimeout(timeout);\n    timeout = setTimeout(callback, 50);\n  });\n}"
    }
  ],
  interview: [
    {
      q: "What is event bubbling, and how does it differ from event capturing?",
      a: "Event propagation has three phases: capturing, target, and bubbling. In capturing, the event travels down from the window to the target. In bubbling, it propagates back up from the target to the window. By default, addEventListener listens in the bubbling phase; passing { capture: true } switches it to capturing."
    },
    {
      q: "Explain event delegation and why it is a performance optimization.",
      a: "Event delegation leverages event bubbling by attaching a single listener to a parent container instead of separate listeners on dozens of child elements. This saves memory, speeds up page load, and ensures dynamically added children trigger the event handler automatically without re-binding."
    },
    {
      q: "What is the difference between event.target and event.currentTarget?",
      a: "event.target is the actual element that triggered the event (the deepest element clicked). event.currentTarget is the element that holds the active event listener (the parent elements handling it during bubbling/capturing)."
    },
    {
      q: "How does debounce differ from throttle in event optimization?",
      a: "Debounce delays executing the handler until a certain amount of idle time has elapsed since the last event (good for window resize or search inputs). Throttle limits the execution of the handler to a maximum of once per specified time interval (good for scroll listeners)."
    },
    {
      q: "How can you trigger a custom event programmatically, and pass data with it?",
      a: "You create a CustomEvent, passing the event name as the first argument, and an object with a 'detail' property as the second. Then, you invoke element.dispatchEvent(customEvent). The listener receives the data in event.detail."
    }
  ],
  realWorld: [
    { company: "Amazon", text: "Uses delegated mouse-hover event tracking on its product catalog menu to pre-fetch sub-menus, reducing perceived latency." },
    { company: "Stripe", text: "Attaches keydown events to secure input fields to dynamically display card brand icons (Visa/Mastercard) based on prefix digits as you type." },
    { company: "Google", text: "Analytics tracks custom user events like 'video-played' or 'pdf-downloaded' by dispatching programmatic CustomEvents." },
    { company: "Netflix", text: "Throttles scroll and touch event handlers to calculate row positioning and stream content thumbnails smoothly without dropping frames." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which phase runs first in the event propagation loop?', options: ['Bubbling phase', 'Capturing phase', 'Target phase', 'Execution phase'], correct: 1 },
    { type: 'true-false', q: 'event.preventDefault() stops the event from propagating up to parent elements.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which property refers to the element that registered the event listener?', options: ['event.target', 'event.currentTarget', 'event.srcElement', 'event.sender'], correct: 1 },
    { type: 'code-output', q: "let count = 0;\nconst e = new Event('custom');\nconst div = document.createElement('div');\ndiv.addEventListener('custom', () => count++);\ndiv.dispatchEvent(e);\ndiv.dispatchEvent(e);\nconsole.log(count);", options: ['0', '1', '2', 'Error'], correct: 2 },
    { type: 'mcq', q: 'Which method stops an event from bubbling up the DOM tree?', options: ['e.preventDefault()', 'e.stopPropagation()', 'e.stopImmediatePropagation()', 'e.cancelBubble()'], correct: 1 },
    { type: 'true-false', q: 'Event delegation allows you to register one event listener to handle events for multiple children.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which technique executes a callback only after a period of inactivity?', options: ['Throttling', 'Debouncing', 'Recursion', 'Async execution'], correct: 1 },
    { type: 'drag-drop', q: 'Order the propagation steps for event.click: [Capturing window-to-target, Target execution, Bubbling target-to-window]', options: ['Capturing window-to-target', 'Target execution', 'Bubbling target-to-window'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'How is data passed inside a custom event?', options: ['Via options.data', 'Via event.detail', 'Via event.payload', 'Via event.body'], correct: 1 },
    { type: 'code-output', q: "const div = document.createElement('div');\ndiv.addEventListener('click', (e) => {\n  console.log(e.target === e.currentTarget);\n});\ndiv.click();", options: ['true', 'false', 'undefined', 'null'], correct: 0 }
  ]
});

// 3. Functions
window.CSFA_RAW_TOPICS.push({
  id: 'js-functions',
  module: 5,
  title: 'Functions',
  tagline: 'Deep dive into declarations, expressions, arrow functions, and context bindings.',
  readMinutes: 7,
  intro: {
    whatItIs: "Functions are blocks of code designed to perform a particular task. In JavaScript, functions are first-class citizens, meaning they can be assigned to variables, passed as arguments, and returned from other functions.",
    whyItMatters: "JavaScript has multiple ways to define functions, and they handle lexical scoping, closures, and the 'this' keyword differently. Mastering function mechanics is essential for asynchronous callbacks, classes, and modern frontend styling.",
    whereUsed: "Used everywhere. Functions power array transforms (.map, .filter), callback systems, event handler actions, utility wrappers, and framework components.",
    commonMistakes: "Confusing arrow functions and standard functions regarding the 'this' keyword—arrows inherit 'this' from the outer scope, which is a frequent bug in classes and event listeners."
  },
  visual: {
    caption: "Function types: Declaration vs Expression vs Arrow",
    type: "js-function-types"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Function declaration",
      explanation: "Function declarations are hoisted, meaning they can be called before they are defined.",
      code: "console.log(sum(5, 5));\nfunction sum(a, b) {\n  return a + b;\n}",
      language: "javascript", output: "10"
    },
    {
      difficulty: "easy", title: "Function expressions",
      explanation: "Function expressions are not hoisted, meaning they throw an error if called before declaration.",
      code: "try {\n  sayHi();\n} catch (e) {\n  console.log('Error:', e.message);\n}\nconst sayHi = function() {\n  return 'Hi';\n};",
      language: "javascript", output: "Error: Cannot access 'sayHi' before initialization"
    },
    {
      difficulty: "medium", title: "Arrow functions and implicit returns",
      explanation: "Arrow functions provide shorter syntax and have implicit returns if curly braces are omitted.",
      code: "const double = x => x * 2;\nconsole.log(double(10));",
      language: "javascript", output: "20"
    },
    {
      difficulty: "medium-plus", title: "First-class citizen behaviors",
      explanation: "Functions can be passed into other functions as arguments (callbacks).",
      code: "function run(fn, val) {\n  return fn(val);\n}\nconst addOne = x => x + 1;\nconsole.log(run(addOne, 5));",
      language: "javascript", output: "6"
    },
    {
      difficulty: "hard", title: "Binding context manually",
      explanation: "bind, call, and apply let you control what value the 'this' keyword points to inside the function.",
      code: "const user = { name: 'Ada' };\nfunction greet() {\n  return 'Hello ' + this.name;\n}\nconst boundGreet = greet.bind(user);\nconsole.log(boundGreet());",
      language: "javascript", output: "Hello Ada"
    },
    {
      difficulty: "real-world", title: "Higher-Order function: logging wrapper",
      explanation: "Real frameworks wrap your custom handlers in logging or performance functions.",
      code: "function withLogging(fn) {\n  return function(...args) {\n    console.log('Arguments:', args);\n    return fn(...args);\n  };\n}\nconst multiply = (a, b) => a * b;\nconst loggedMultiply = withLogging(multiply);\nconsole.log('Result:', loggedMultiply(2, 3));",
      language: "javascript", output: "Arguments: [ 2, 3 ]\nResult: 6"
    }
  ],
  exercises: [
    {
      level: 1, title: "Create arrow function",
      problem: "Write an arrow function square(x) that returns the square of a number.",
      hints: ["Use arrow function syntax: x => ...", "Implicit return can be used without curly braces."],
      solution: "const square = x => x * x;"
    },
    {
      level: 2, title: "Write a multiplier generator",
      problem: "Write a function createMultiplier(factor) that returns a function which multiplies any input by factor.",
      hints: ["Return a function: return (x) => ...", "This uses closures to remember 'factor'."],
      solution: "function createMultiplier(factor) {\n  return x => x * factor;\n}"
    },
    {
      level: 3, title: "Fix the 'this' scope",
      problem: "Explain how to fix this object so that printName works using an arrow function or binding:\nconst person = { name: 'Bo', print: function() { setTimeout(function() { console.log(this.name); }, 10); } };",
      hints: ["The nested function's 'this' is lost.", "Using an arrow function inside setTimeout preserves 'this'."],
      solution: "const person = {\n  name: 'Bo',\n  print: function() {\n    setTimeout(() => {\n      console.log(this.name);\n    }, 10);\n  }\n};"
    },
    {
      level: 4, title: "Verify hoisting check",
      problem: "Given variables a = f1() and b = f2() where f1 is a declaration and f2 is an expression, explain which line throws.",
      hints: ["Function declarations are hoisted; expressions are not."],
      solution: "f1() works fine because declarations are hoisted. Calling f2() before its let/const declaration is parsed throws a ReferenceError."
    },
    {
      level: 5, title: "Controlled binder",
      problem: "Write a function bindContext(fn, context) that returns fn bound to the provided context.",
      hints: ["Use the built-in .bind method on the function parameter."],
      solution: "function bindContext(fn, context) {\n  return fn.bind(context);\n}"
    },
    {
      level: 6, title: "Real-world: Memoization cache",
      problem: "Write a higher-order function memoize(fn) that caches results of a single-argument function using a Map.",
      hints: ["Return a function.", "Inside, check if map.has(arg). If yes, return it; otherwise run fn, store, and return."],
      solution: "function memoize(fn) {\n  const cache = new Map();\n  return function(arg) {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}"
    }
  ],
  interview: [
    {
      q: "What is hoisting and how does it apply to functions?",
      a: "Hoisting is the browser's compilation step where declarations are moved to the top of their scope. Function declarations are fully hoisted (the body is loaded), allowing calls before definition. Function expressions (assigned to var/let/const) are either not hoisted (ReferenceError) or hoisted as undefined (TypeError if called)."
    },
    {
      q: "What is the key difference between standard functions and arrow functions regarding 'this'?",
      a: "Standard functions define their own 'this' context based on how they are called (e.g., as a method, free-standing, call/bind). Arrow functions do not have their own 'this'—they inherit 'this' lexically from their enclosing parent scope, which cannot be changed using call, apply, or bind."
    },
    {
      q: "Explain what call, apply, and bind do, and their differences.",
      a: "All three set 'this' context. call and apply execute the function immediately; call takes arguments separated by commas, while apply takes them as an array. bind does not execute the function immediately—it returns a new function with the bound context permanently set."
    },
    {
      q: "What are Higher-Order Functions, and give two examples in JS.",
      a: "Higher-Order Functions are functions that accept other functions as arguments and/or return functions. Examples include Array.prototype.map (accepts a callback function) and decorators like debounce (returns a wrapped function)."
    },
    {
      q: "What are the arguments object and rest parameters?",
      a: "The arguments object is an array-like object available inside non-arrow functions containing all passed parameters. Rest parameters (...args) is modern syntax that gathers actual extra arguments into a real JavaScript Array, working in both arrow and standard functions."
    }
  ],
  realWorld: [
    { company: "Google", text: "V8 engine optimizes function calls by creating optimized machine code for frequently invoked functions (hot paths)." },
    { company: "React", text: "React Hooks are higher-order utility functions that tie React's internal state machine to functional UI components." },
    { company: "Stripe", text: "Uses memoization decorators on SDK endpoints to cache configuration values, preventing redundant API lookup overhead." },
    { company: "Netflix", text: "Encapsulates player API actions inside bound callbacks to ensure the video player class's internal state handles events safely." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which function type is fully hoisted, allowing it to be called before definition?', options: ['Function Expression', 'Arrow Function', 'Function Declaration', 'IIFE'], correct: 2 },
    { type: 'true-false', q: 'Arrow functions contain their own unique binding for the arguments object.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which method sets the context of "this" and returns a new function instead of executing it?', options: ['.call()', '.apply()', '.bind()', '.context()'], correct: 2 },
    { type: 'code-output', q: "const obj = {\n  num: 42,\n  fn: () => console.log(this.num)\n};\nobj.fn();\n\nWhat is logged in standard browser global execution?", options: ['42', 'undefined', 'null', 'Error'], correct: 1 },
    { type: 'mcq', q: 'How does apply() receive function arguments compared to call()?', options: ['As separate arguments', 'As an Array', 'As an Object', 'Via string templates'], correct: 1 },
    { type: 'true-false', q: 'A function that returns another function is considered a Higher-Order Function.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which parameter syntax aggregates extra arguments into a real array?', options: ['arguments', 'rest parameters (...args)', 'spread operator', 'default values'], correct: 1 },
    { type: 'drag-drop', q: 'Order from least context control to most context binding: [Arrow function, Standard function, Bound function]', options: ['Arrow function', 'Standard function', 'Bound function'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why do arrow functions make great handlers in setTimeout callbacks?', options: ['They execute faster', 'They inherit the parent context of "this" lexically', 'They bypass the browser event loop', 'They do not allocate memory'], correct: 1 },
    { type: 'code-output', q: "function make() {\n  return () => arguments[0];\n}\nconst inner = make('Hello');\nconsole.log(inner('World'));", options: ['Hello', 'World', 'undefined', 'Error'], correct: 0 }
  ]
});

// 4. Closures
window.CSFA_RAW_TOPICS.push({
  id: 'closures',
  module: 5,
  title: 'Closures',
  tagline: 'Understanding lexical scope and how functions remember their outer variables.',
  readMinutes: 9,
  intro: {
    whatItIs: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has finished executing.",
    whyItMatters: "Closures are how JavaScript implements data privacy, state encapsulation, and functional programming patterns. They are the backbone of event handlers, decorators, and React state preservation.",
    whereUsed: "Crucial for React hooks (useState), module patterns, partial application (currying), factory functions, and maintaining private counter states.",
    commonMistakes: "Retaining references to giant arrays or DOM elements inside closures, which blocks garbage collection and causes memory leaks."
  },
  visual: {
    caption: "A closure wrapping a function with its outer lexical environment",
    type: "closure-scope"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Basic closure",
      explanation: "An inner function accessing a variable defined in the parent function.",
      code: "function outer() {\n  const msg = 'secret';\n  return function inner() {\n    return msg;\n  };\n}\nconst getSecret = outer();\nconsole.log(getSecret());",
      language: "javascript", output: "secret"
    },
    {
      difficulty: "easy", title: "State preservation",
      explanation: "Closures remember changes to the variable scope across calls.",
      code: "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c = createCounter();\nconsole.log(c(), c());",
      language: "javascript", output: "1 2"
    },
    {
      difficulty: "medium", title: "Private state encapsulation",
      explanation: "Exposing multiple functions sharing the same enclosed private state.",
      code: "function account(initial) {\n  let balance = initial;\n  return {\n    deposit: amount => { balance += amount; },\n    get: () => balance\n  };\n}\nconst acc = account(100);\nacc.deposit(50);\nconsole.log(acc.get());",
      language: "javascript", output: "150"
    },
    {
      difficulty: "medium-plus", title: "Currying functions",
      explanation: "Transforming a function that takes multiple arguments into a chain of functions taking one argument.",
      code: "const add = x => y => x + y;\nconst addFive = add(5);\nconsole.log(addFive(3), addFive(10));",
      language: "javascript", output: "8 15"
    },
    {
      difficulty: "hard", title: "Lexical binding in loop timeouts",
      explanation: "How let creates a new closure per loop cycle, fixing the var scoping problem.",
      code: "let outputs = [];\nfor (let i = 0; i < 3; i++) {\n  outputs.push(() => i);\n}\nconsole.log(outputs[0](), outputs[1]());",
      language: "javascript", output: "0 1"
    },
    {
      difficulty: "real-world", title: "Once execution gatekeeper",
      explanation: "Ensuring an API initialize function can only be executed exactly once.",
      code: "function once(fn) {\n  let ran = false;\n  let result;\n  return function(...args) {\n    if (ran) return result;\n    ran = true;\n    result = fn(...args);\n    return result;\n  };\n}\nconst init = once(() => {\n  console.log('API boot');\n  return 'SDK Connected';\n});\nconsole.log(init());\nconsole.log(init());",
      language: "javascript", output: "API boot\nSDK Connected\nSDK Connected"
    }
  ],
  exercises: [
    {
      level: 1, title: "Create simple greeter",
      problem: "Write a function greetUser(name) that returns a function logging 'Hello ' + name.",
      hints: ["The outer function takes name.", "The inner function logs string concatenation."],
      solution: "function greetUser(name) {\n  return () => console.log('Hello ' + name);\n}"
    },
    {
      level: 2, title: "Increment and decrement counter",
      problem: "Write a function makeCounter() that returns an object with methods increment() and decrement() controlling a private count starting at 0.",
      hints: ["Declare count = 0 inside makeCounter.", "Return an object holding arrow functions modifying count."],
      solution: "function makeCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count\n  };\n}"
    },
    {
      level: 3, title: "Custom tag logger",
      problem: "Write a function tagLogger(tag) that returns a function printing '[tag] message'.",
      hints: ["Curry the logger: return (msg) => ..."],
      solution: "function tagLogger(tag) {\n  return msg => '[' + tag + '] ' + msg;\n}"
    },
    {
      level: 4, title: "Build password matching closure",
      problem: "Write a function setPassword(password) that returns a function verify(attempt) returning true if attempt matches password.",
      hints: ["Keep password private inside setPassword's scope.", "Return verification check function."],
      solution: "function setPassword(password) {\n  return attempt => attempt === password;\n}"
    },
    {
      level: 5, title: "Simulate private key holder",
      problem: "Write a function createKeyStore() that returns an object with methods setKey(val) and checkKey(val) returning true if val matches, but does not expose val directly.",
      hints: ["Keep val inside local variables, modify it via setKey and verify it via checkKey."],
      solution: "function createKeyStore() {\n  let key = null;\n  return {\n    setKey: (val) => { key = val; },\n    checkKey: (val) => val === key\n  };\n}"
    },
    {
      level: 6, title: "Real-world: Secure rate limiter",
      problem: "Write a function createLimiter(limit) that returns a closure. Each time the closure is called, it increments an internal usage counter and returns false if the count exceeds limit, otherwise it returns true.",
      hints: ["Keep count inside the function definition, check against limit on invoke."],
      solution: "function createLimiter(limit) {\n  let count = 0;\n  return () => {\n    if (count >= limit) return false;\n    count++;\n    return true;\n  };\n}"
    }
  ],
  interview: [
    {
      q: "What is a closure, and how does it work?",
      a: "A closure is when a function retains access to its lexical scope (outer variables) even after the outer function has finished execution. JavaScript implements this by storing scope pointers on the function object's internal [[Scope]] slot, preventing those variables from being garbage collected."
    },
    {
      q: "How can closures cause memory leaks in JavaScript?",
      a: "Because closures retain references to variables in their parent scopes, any data inside those variables (large objects, DOM nodes, long strings) cannot be garbage collected as long as the closure function itself is still referenced. The fix is to nullify references when they are no longer needed."
    },
    {
      q: "Explain currying and why it is useful.",
      a: "Currying is the process of translating a function that takes multiple arguments into a sequence of nested functions that each take a single argument. It helps build reusable configuration functions, implements partial application, and fits clean functional programming structures."
    },
    {
      q: "Why is a let variable inside a for loop treated differently than a var variable regarding closures?",
      a: "var has function-scope, meaning there is only one shared variable instance across all iterations of a loop. let has block-scope, meaning JavaScript creates a fresh, separate variable binding (and thus a separate closure environment) for each iteration of the loop."
    },
    {
      q: "How do you implement private variables in JavaScript using closures?",
      a: "By declaring variables inside a wrapper function scope and only exposing inner functions that access those variables. Outside scripts cannot reference or modify the inner variables directly, preserving data encapsulation."
    }
  ],
  realWorld: [
    { company: "React", text: "useState holds a component's current state inside a closure on the fiber tree, linking it to the render execution loop." },
    { company: "Google", text: "Chrome DevTools console displays dynamic context states under [[Scopes]] closures to help trace local function variables." },
    { company: "OpenAI", text: "API wrapper tools use closures to hide authorization tokens from user scripts while allowing API request execution." },
    { company: "Stripe", text: "Utilizes closures in checkout elements to protect private payment state validation from external DOM scripts." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is a closure?', options: ['A function that closes the browser tab', 'A function that retains access to its lexical scope after parent executes', 'A database lock', 'An encrypted stylesheet connection'], correct: 1 },
    { type: 'true-false', q: 'JavaScript cleans up all local variables from RAM as soon as a function finishes executing, even if closures reference them.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which scope does an inner function have access to via closure?', options: ['Only its own scope', 'Its own scope and its parents lexical scope', 'Global scope only', 'Only parameters passed explicitly'], correct: 1 },
    { type: 'code-output', q: "function make() {\n  let x = 10;\n  return () => x += 5;\n}\nconst fn = make();\nfn();\nconsole.log(fn());", options: ['10', '15', '20', 'NaN'], correct: 2 },
    { type: 'mcq', q: 'How does block-scoped "let" fix the loop setTimeout var scoping bug?', options: ['It runs loops faster', 'It creates a new variable binding per iteration closure', 'It converts var to an array', 'It prevents asynchronous timers'], correct: 1 },
    { type: 'true-false', q: 'Currying is the process of breaking down multiple arguments into a chain of single-argument functions.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is a primary risk of overusing closures?', options: ['Stack overflow errors', 'Memory leaks from uncollected parent scopes', 'Syntactic errors', 'CSS layout shifts'], correct: 1 },
    { type: 'drag-drop', q: 'Order scope priority from closest to furthest: [Local scope, Closure parent scope, Global scope]', options: ['Local scope', 'Closure parent scope', 'Global scope'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'In React, which hook relies on closures to manage state in functional components?', options: ['useEffect', 'useMemo', 'useState', 'useRef'], correct: 2 },
    { type: 'code-output', q: "const sum = x => y => x + y;\nconst add10 = sum(10);\nconsole.log(add10(5));", options: ['15', '10', '5', 'NaN'], correct: 0 }
  ]
});

// 5. Promises
window.CSFA_RAW_TOPICS.push({
  id: 'promises',
  module: 5,
  title: 'Promises',
  tagline: 'Handling eventual completion or failure of asynchronous operations.',
  readMinutes: 8,
  intro: {
    whatItIs: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It acts as a placeholder for a value that is not necessarily known when the promise is created.",
    whyItMatters: "Before promises, asynchronous JavaScript relied on nested callbacks ('callback hell'), making error handling and sequential operations extremely hard to write and read. Promises standardize async code flow.",
    whereUsed: "Used everywhere. Fetching data, loading local files, database operations, third-party authentication API requests, and web workers all return promises.",
    commonMistakes: "Creating a promise and forgetting to resolve or reject it, causing the code to hang indefinitely. Another is not adding a .catch() handler, resulting in unhandled promise rejection warnings."
  },
  visual: {
    caption: "The state lifecycle of a Promise",
    type: "async-eventloop"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Creating a resolved Promise",
      explanation: "Promise.resolve instantly creates a promise in the fulfilled state.",
      code: "Promise.resolve('Success').then(val => console.log(val));",
      language: "javascript", output: "Success"
    },
    {
      difficulty: "easy", title: "Basic Promise constructor",
      explanation: "Using the Promise constructor with resolve and reject parameters.",
      code: "const promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Data loaded'), 10);\n});\npromise.then(console.log);",
      language: "javascript", output: "Data loaded"
    },
    {
      difficulty: "medium", title: "Catching errors",
      explanation: ".catch handles errors occurring anywhere in the promise execution path.",
      code: "const fail = new Promise((res, rej) => rej(new Error('Failed!')));\nfail.catch(err => console.log('Caught:', err.message));",
      language: "javascript", output: "Caught: Failed!"
    },
    {
      difficulty: "medium-plus", title: "Promise chaining",
      explanation: "Returning values in .then links them into a sequential processing pipeline.",
      code: "Promise.resolve(2)\n  .then(val => val * 2)\n  .then(val => val + 10)\n  .then(console.log);",
      language: "javascript", output: "14"
    },
    {
      difficulty: "hard", title: "Promise.all parallel loading",
      explanation: "Promise.all executes multiple promises in parallel, resolving only when all succeed.",
      code: "const p1 = Promise.resolve('API 1');\nconst p2 = Promise.resolve('API 2');\nPromise.all([p1, p2]).then(console.log);",
      language: "javascript", output: "[ 'API 1', 'API 2' ]"
    },
    {
      difficulty: "real-world", title: "Custom timeout wrapper",
      explanation: "Real SDKs wrap slow operations in timeout promises to prevent hanging connections.",
      code: "function timeout(ms) {\n  return new Promise((_, reject) => {\n    setTimeout(() => reject(new Error('Timeout!')), ms);\n  });\n}\ntimeout(15).catch(err => console.log(err.message));",
      language: "javascript", output: "Timeout!"
    }
  ],
  exercises: [
    {
      level: 1, title: "Resolve instantly",
      problem: "Write a function getSuccessPromise() that returns a resolved Promise with the string 'OK'.",
      hints: ["Use Promise.resolve('OK')."],
      solution: "function getSuccessPromise() {\n  return Promise.resolve('OK');\n}"
    },
    {
      level: 2, title: "Delay solver",
      problem: "Write a function delay(ms) that returns a Promise which resolves after ms milliseconds.",
      hints: ["Return a new Promise.", "Use setTimeout inside the constructor to call resolve."],
      solution: "function delay(ms) {\n  return new Promise(resolve => {\n    setTimeout(resolve, ms);\n  });\n}"
    },
    {
      level: 3, title: "Chained double tracker",
      problem: "Write a promise chain that takes a resolved promise of value 5, doubles it, and logs the result.",
      hints: ["Use .then() to return double.", "Chain another .then() to log it."],
      solution: "Promise.resolve(5)\n  .then(v => v * 2)\n  .then(console.log);"
    },
    {
      level: 4, title: "Custom promise creator",
      problem: "Write a function checkEven(n) that returns a Promise resolving to 'Even' if n is even, and rejecting with 'Odd' otherwise.",
      hints: ["Use new Promise((resolve, reject) => ...)", "Check n % 2 === 0."],
      solution: "function checkEven(n) {\n  return new Promise((resolve, reject) => {\n    if (n % 2 === 0) resolve('Even');\n    else reject('Odd');\n  });\n}"
    },
    {
      level: 5, title: "Safe array load validator",
      problem: "Write a function loadAll(promisesArray) that resolves if all items load, but catches any single error and returns the error message instead of throwing.",
      hints: ["Use Promise.all(promisesArray).", "Append a .catch(err => err.message) block."],
      solution: "function loadAll(promisesArray) {\n  return Promise.all(promisesArray).catch(err => err.message);\n}"
    },
    {
      level: 6, title: "Real-world: Race tracker",
      problem: "Write a function fetchWithTimeout(fetchPromise, ms) that races a fetch promise against a delay rejection promise (timeout).",
      hints: ["Create a timeout promise.", "Use Promise.race([fetchPromise, timeoutPromise])."],
      solution: "function fetchWithTimeout(fetchPromise, ms) {\n  const timeout = new Promise((_, reject) => \n    setTimeout(() => reject(new Error('Timeout')), ms)\n  );\n  return Promise.race([fetchPromise, timeout]);\n}"
    }
  ],
  interview: [
    {
      q: "What are the three states of a Promise?",
      a: "Pending (initial state, operation hasn't completed or failed), Fulfilled (operation completed successfully, resolving a value), and Rejected (operation failed, throwing an error or reason). Once a Promise leaves Pending, its state is locked ('settled') and cannot change."
    },
    {
      q: "What is the difference between Promise.all, Promise.allSettled, and Promise.race?",
      a: "Promise.all resolves when all promises succeed, but rejects immediately if any single promise fails. Promise.allSettled resolves only when all promises have completed (resolved or rejected), returning status reports. Promise.race resolves/rejects as soon as the first promise in the array settles."
    },
    {
      q: "How does error propagation work in promise chains?",
      a: "If an error is thrown inside a .then callback, JavaScript skips all subsequent .then handlers in the chain and travels down until it hits the nearest .catch handler. If no catch handler is present, it reports an unhandled promise rejection."
    },
    {
      q: "What is the 'callback hell' problem, and how do Promises solve it?",
      a: "Callback hell happens when multiple asynchronous operations depend on one another, resulting in deeply nested callback structures that are hard to read and debug. Promises resolve this by flattening the structures into linear chains of .then() methods."
    },
    {
      q: "Does a Promise execute immediately upon creation, or only when .then() is called?",
      a: "A Promise executes its constructor function ('executor') immediately and synchronously when instantiated. Calling .then() or .catch() simply registers handlers to receive the resolution/rejection signal once it completes asynchronously."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "SDK actions return promises to let developers chain payment validations and coordinate UI transitions asynchronously." },
    { company: "Google", text: "Maps API requests return promises to handle network load lags without locking the search input dashboard." },
    { company: "Netflix", text: "Uses Promise.all to pre-fetch stream assets (audio, subtitles, metadata) simultaneously before starting player playback." },
    { company: "OpenAI", text: "Wraps text generation pipelines in promises to handle dynamic token streaming without blocking server processing threads." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which is NOT a state of a Promise?', options: ['Pending', 'Fulfilled', 'Rejected', 'Interrupted'], correct: 3 },
    { type: 'true-false', q: 'Once a Promise is resolved, its state is locked and it cannot be resolved again to a different value.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which method handles rejection errors in a Promise chain?', options: ['.then()', '.catch()', '.finally()', '.handle()'], correct: 1 },
    { type: 'code-output', q: "Promise.resolve(5)\n  .then(val => { throw new Error('err'); })\n  .then(val => val + 10)\n  .catch(err => 42)\n  .then(console.log);", options: ['15', '42', 'Error', 'undefined'], correct: 1 },
    { type: 'mcq', q: 'Which method resolves only when ALL promises succeed, rejecting if ANY fails?', options: ['Promise.allSettled', 'Promise.all', 'Promise.race', 'Promise.any'], correct: 1 },
    { type: 'true-false', q: 'The executor function inside a Promise constructor executes synchronously.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which method resolves/rejects as soon as the first promise in an array finishes?', options: ['Promise.all', 'Promise.any', 'Promise.race', 'Promise.allSettled'], correct: 2 },
    { type: 'drag-drop', q: 'Order the states of a Promise from start to end: [Pending, Fulfilled, Settled]', options: ['Pending', 'Fulfilled', 'Settled'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What happens if a promise rejects and there is no catch handler in the chain?', options: ['The program crashes immediately', 'An UnhandledPromiseRejection warning is dispatched', 'It retries automatically', 'It resolves to null'], correct: 1 },
    { type: 'code-output', q: "Promise.resolve('Hello')\n  .then(v => v + ' World')\n  .finally(() => 'Ignored')\n  .then(console.log);", options: ['Hello World', 'Ignored', 'Hello WorldIgnored', 'undefined'], correct: 0 }
  ]
});

// 6. Async Await
window.CSFA_RAW_TOPICS.push({
  id: 'async-await',
  module: 5,
  title: 'Async/Await',
  tagline: 'Syntactic sugar that makes asynchronous code read like synchronous code.',
  readMinutes: 7,
  intro: {
    whatItIs: "async and await are keywords introduced in ES2017 that wrap JavaScript Promises. An async function always returns a promise, and the await keyword pauses the execution of the async function until the awaited promise resolves or rejects.",
    whyItMatters: "Async/await reduces the syntax noise of promise chains (.then, .catch). It allows developers to write code that looks sequential and synchronous, and to use standard try/catch blocks for error handling.",
    whereUsed: "Standard practice in modern backend (Node.js) and frontend development for writing database queries, handling API endpoints, and loading remote assets.",
    commonMistakes: "Using await inside loops sequentially when requests could run in parallel (creating performance bottlenecks), and forgetting to wrap await inside try/catch blocks."
  },
  visual: {
    caption: "How async/await pauses execution inside the function",
    type: "async-eventloop"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Basic async function",
      explanation: "An async function automatically wraps its return value in a Promise.",
      code: "async function greet() {\n  return 'Hello';\n}\ngreet().then(console.log);",
      language: "javascript", output: "Hello"
    },
    {
      difficulty: "easy", title: "Awaiting a Promise",
      explanation: "Use the await keyword to pause execution until the promise yields its result.",
      code: "const delay = () => new Promise(res => setTimeout(() => res('Resolved!'), 10));\nasync function run() {\n  const msg = await delay();\n  console.log(msg);\n}\nrun();",
      language: "javascript", output: "Resolved!"
    },
    {
      difficulty: "medium", title: "Error handling with try/catch",
      explanation: "Use standard try/catch blocks to intercept errors from awaited promises.",
      code: "async function errorDemo() {\n  try {\n    await Promise.reject(new Error('API Error'));\n  } catch (err) {\n    console.log('Caught:', err.message);\n  }\n}\nerrorDemo();",
      language: "javascript", output: "Caught: API Error"
    },
    {
      difficulty: "medium-plus", title: "Sequential vs Parallel execution",
      explanation: "Awaiting multiple items sequentially blocks execution; using Promise.all triggers parallel loading.",
      code: "const get1 = () => new Promise(res => setTimeout(() => res(1), 5));\nconst get2 = () => new Promise(res => setTimeout(() => res(2), 5));\nasync function loadParallel() {\n  const start = performance.now();\n  const [r1, r2] = await Promise.all([get1(), get2()]);\n  const end = performance.now();\n  console.log('Results:', r1, r2, '| Quick runtime:', (end - start) < 30);\n}\nloadParallel();",
      language: "javascript", output: "Results: 1 2 | Quick runtime: true"
    },
    {
      difficulty: "hard", title: "Async iteration",
      explanation: "for await...of loops allow iterating over async data streams or arrays of promises.",
      code: "const promises = [Promise.resolve('a'), Promise.resolve('b')];\nasync function printList() {\n  let out = '';\n  for await (const val of promises) {\n    out += val;\n  }\n  console.log(out);\n}\nprintList();",
      language: "javascript", output: "ab"
    },
    {
      difficulty: "real-world", title: "Robust retry fetching strategy",
      explanation: "Real-world API client libraries retry failed requests using loops and delays.",
      code: "async function fetchWithRetry(retries) {\n  let attempt = 0;\n  while (attempt < retries) {\n    try {\n      if (attempt < 1) throw new Error('Conn failed');\n      return 'Success';\n    } catch (e) {\n      attempt++;\n      console.log('Retry attempt:', attempt);\n    }\n  }\n  return 'Failed';\n}\nfetchWithRetry(2).then(console.log);",
      language: "javascript", output: "Retry attempt: 1\nSuccess"
    }
  ],
  exercises: [
    {
      level: 1, title: "Create async function",
      problem: "Write an async function getStatus() that returns the string 'Online'.",
      hints: ["Mark function with async keyword.", "Simply return 'Online'."],
      solution: "async function getStatus() {\n  return 'Online';\n}"
    },
    {
      level: 2, title: "Await calculation helper",
      problem: "Write an async function addAsync(a, b) that awaits a promise calculating a + b and returns it.",
      hints: ["Create a promise adding a and b.", "Use await key inside function."],
      solution: "async function addAsync(a, b) {\n  return await Promise.resolve(a + b);\n}"
    },
    {
      level: 3, title: "Safe fetch parser",
      problem: "Write an async function safeFetch(promise) that awaits promise inside a try/catch, returning 'Error occurred' if it rejects.",
      hints: ["Wrap await promise in try.", "Return resolved data, or string in catch."],
      solution: "async function safeFetch(promise) {\n  try {\n    return await promise;\n  } catch (e) {\n    return 'Error occurred';\n  }\n}"
    },
    {
      level: 4, title: "Sequential user loader",
      problem: "Write an async function loadUsers(userIds, fetchFn) that fetches each user sequentially using a for...of loop and accumulates their names in an array.",
      hints: ["Initialize an empty results array.", "Use for (const id of userIds) loop, await fetchFn(id) inside."],
      solution: "async function loadUsers(userIds, fetchFn) {\n  const names = [];\n  for (const id of userIds) {\n    const user = await fetchFn(id);\n    names.push(user.name);\n  }\n  return names;\n}"
    },
    {
      level: 5, title: "Parallel loader helper",
      problem: "Write an async function loadDataInParallel(url1, url2, fetchFn) that triggers both fetches in parallel and returns their combined results as an array.",
      hints: ["Do NOT await fetches individually.", "Use Promise.all([fetchFn(url1), fetchFn(url2)]) and await that."],
      solution: "async function loadDataInParallel(url1, url2, fetchFn) {\n  return await Promise.all([fetchFn(url1), fetchFn(url2)]);\n}"
    },
    {
      level: 6, title: "Real-world: Dynamic fallback handler",
      problem: "Write an async function fetchWithFallback(endpoints, fetchFn) that tries endpoints in order, returning the data from the first one that succeeds. If all fail, throw an error 'All endpoints failed'.",
      hints: ["Iterate endpoints using a loop.", "Try/catch inside loop. If try succeeds, return immediately. If loop finishes, throw."],
      solution: "async function fetchWithFallback(endpoints, fetchFn) {\n  for (const url of endpoints) {\n    try {\n      return await fetchFn(url);\n    } catch (e) {}\n  }\n  throw new Error('All endpoints failed');\n}"
    }
  ],
  interview: [
    {
      q: "What does the async keyword do to a function?",
      a: "The async keyword marks a function as asynchronous. It changes the function so that it always returns a Promise. If the function returns a non-promise value, JavaScript automatically wraps it in a resolved Promise. If the function throws an error, it returns a rejected Promise."
    },
    {
      q: "What happens when the JavaScript engine encounters the 'await' keyword?",
      a: "The await keyword pauses the execution of the surrounding async function, yielding control back to the event loop. Once the awaited Promise resolves, the async function resumes execution with the resolved value. This happens non-blockingly, so other scripts can run in the meantime."
    },
    {
      q: "How do you handle errors in async/await code?",
      a: "Errors are handled using standard try/catch blocks. When an awaited Promise rejects, it throws the rejection reason as an error, which is caught by the surrounding catch block. Alternatively, you can append a .catch() directly on the awaited Promise."
    },
    {
      q: "Why is awaiting promises sequentially in a loop considered an anti-pattern?",
      a: "If loop items are independent, awaiting them sequentially forces each request to wait for the previous one to finish, doubling or tripling total load time. The fix is to trigger all requests first to create an array of promises, and then await them together using Promise.all."
    },
    {
      q: "Can you use the 'await' keyword outside of an 'async' function?",
      a: "In standard older scripts, no—doing so throws a SyntaxError. However, modern environments (browsers, Node.js modules) support 'Top-Level Await' directly inside ES modules, allowing developers to await configuration data at the entry point script level."
    }
  ],
  realWorld: [
    { company: "Netflix", text: "Uses async/await in video player controllers to coordinate stream buffer loadings and audio track alignments." },
    { company: "Amazon", text: "Implements checkout lambdas using async/await to sequence inventory updates, tax calculations, and charge processing sequentially." },
    { company: "OpenAI", text: "Uses Top-Level Await inside module configurations to load credentials and API models before launching servers." },
    { company: "Stripe", text: "SDK actions use async/await internally to simplify payment lifecycle integrations for developer client apps." }
  ],
  quiz: [
    { type: 'mcq', q: 'What does an async function ALWAYS return?', options: ['An Array', 'A Promise', 'An Object', 'undefined'], correct: 1 },
    { type: 'true-false', q: 'The await keyword can be used anywhere in any standard JavaScript function without using async.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'How should you catch errors from an awaited Promise?', options: ['Using .then()', 'Using a try/catch block', 'Using throw new catch()', 'Using window.onerror'], correct: 1 },
    { type: 'code-output', q: "async function test() {\n  return 10;\n}\nconsole.log(test() instanceof Promise);", options: ['true', 'false', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Which method should be used to run multiple async tasks in parallel?', options: ['await loop()', 'Promise.all()', 'setTimeout()', 'yield parallel()'], correct: 1 },
    { type: 'true-false', q: 'Awaiting a promise pauses the entire browser tab, freezing animations and input handling.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What syntax allows top-level await outside async functions?', options: ['Strict mode', 'ES Modules', 'CommonJS require', 'IIFE wrappers'], correct: 1 },
    { type: 'drag-drop', q: 'Order the execution flow: [Function starts, Await halts execution and yields control, Promise resolves and function resumes]', options: ['Function starts', 'Await halts execution and yields control', 'Promise resolves and function resumes'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What happens if a promise throws an error inside an async function and there is no try/catch block?', options: ['It returns null', 'It returns an unhandled rejection', 'It retries the function', 'It exits the program'], correct: 1 },
    { type: 'code-output', q: "async function compute() {\n  const a = await Promise.resolve(5);\n  return a * 2;\n}\ncompute().then(console.log);", options: ['5', '10', 'undefined', 'Error'], correct: 1 }
  ]
});

// 7. Fetch API
window.CSFA_RAW_TOPICS.push({
  id: 'fetch-api',
  module: 5,
  title: 'Fetch API',
  tagline: 'Making HTTP requests from the browser to communicate with servers and load data.',
  readMinutes: 8,
  intro: {
    whatItIs: "The Fetch API is a modern interface for fetching resources (including across the network). It replaces the older XMLHttpRequest API with a cleaner, Promise-based syntax.",
    whyItMatters: "Web apps need to fetch configuration files, query databases, and send user data back to servers. Fetch provides a native standard way to construct and inspect HTTP requests, headers, and responses.",
    whereUsed: "Used on every interactive webpage to communicate with backend APIs—from loading user profiles to sending transaction payloads.",
    commonMistakes: "Thinking a fetch fails and triggers .catch() on HTTP status codes like 404 or 500. Fetch only rejects on network failures; you must check response.ok explicitly."
  },
  visual: {
    caption: "The request-response lifecycle of Fetch API",
    type: "http-request-response"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Basic GET request",
      explanation: "By default, fetch performs a GET request and returns a response promise.",
      code: "fetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(res => console.log('Response state:', res.status));",
      language: "javascript", output: "Response state: 200"
    },
    {
      difficulty: "easy", title: "Parsing JSON content",
      explanation: "You must call .json() on the response object to parse the HTTP body payload.",
      code: "fetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(res => res.json())\n  .then(data => console.log('Parsed title:', data.title ? 'Found' : 'Not found'));",
      language: "javascript", output: "Parsed title: Found"
    },
    {
      difficulty: "medium", title: "POST request with JSON payload",
      explanation: "Set method, headers, and body options to send data to a REST endpoint.",
      code: "fetch('https://jsonplaceholder.typicode.com/posts', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })\n})\n  .then(res => res.json())\n  .then(data => console.log('Created ID:', data.id));",
      language: "javascript", output: "Created ID: 101"
    },
    {
      difficulty: "medium-plus", title: "Handling HTTP errors correctly",
      explanation: "Check res.ok to catch 404 or 500 status codes that don't trigger catch rejects.",
      code: "fetch('https://jsonplaceholder.typicode.com/missing')\n  .then(res => {\n    if (!res.ok) throw new Error('HTTP Error: ' + res.status);\n    return res.json();\n  })\n  .catch(err => console.log(err.message));",
      language: "javascript", output: "HTTP Error: 404"
    },
    {
      difficulty: "hard", title: "Aborting fetch requests",
      explanation: "Use AbortController to cancel active network requests if the user cancels an action.",
      code: "const controller = new AbortController();\nconst signal = controller.signal;\nfetch('https://jsonplaceholder.typicode.com/todos/1', { signal })\n  .catch(err => console.log('Aborted:', err.name === 'AbortError'));\ncontroller.abort();",
      language: "javascript", output: "Aborted: true"
    },
    {
      difficulty: "real-world", title: "Search query auto-fetch wrapper",
      explanation: "Real-world search bars cancel outstanding calls so old queries don't overwrite new inputs.",
      code: "let controller;\nfunction searchProduct(query) {\n  if (controller) controller.abort(); // cancel last search\n  controller = new AbortController();\n  return fetch('https://jsonplaceholder.typicode.com/posts?q=' + query, { signal: controller.signal })\n    .then(res => res.json());\n}\nsearchProduct('phone').then(data => console.log('Query fetched'));",
      language: "javascript", output: "Query fetched"
    }
  ],
  exercises: [
    {
      level: 1, title: "Simple user fetcher",
      problem: "Write a function fetchUser(id) that makes a fetch request to 'https://jsonplaceholder.typicode.com/users/' + id and returns the promise.",
      hints: ["Concatenate the ID on the url string.", "Return the fetch call."],
      solution: "function fetchUser(id) {\n  return fetch('https://jsonplaceholder.typicode.com/users/' + id);\n}"
    },
    {
      level: 2, title: "Parse user name",
      problem: "Write an async function getUserName(id) that fetches the user and returns user.name.",
      hints: ["Await the fetch.", "Await res.json() on the response.", "Return data.name."],
      solution: "async function getUserName(id) {\n  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);\n  const data = await res.json();\n  return data.name;\n}"
    },
    {
      level: 3, title: "POST cart creator",
      problem: "Write a function createCart(cartItems) that POSTs cartItems as JSON to '/api/cart' and returns the parsed response.",
      hints: ["Set method to 'POST'.", "Add 'Content-Type': 'application/json' in headers.", "Set body using JSON.stringify."],
      solution: "function createCart(cartItems) {\n  return fetch('/api/cart', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(cartItems)\n  }).then(res => res.json());\n}"
    },
    {
      level: 4, title: "Robust error checker",
      problem: "Write an async function safeFetchText(url) that fetches url and returns the raw text content if response is ok, but returns 'Server Error' on status 400 or higher.",
      hints: ["Check res.ok.", "Use res.text() to parse response text.", "Return 'Server Error' inside catch or conditional check."],
      solution: "async function safeFetchText(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) return 'Server Error';\n    return await res.text();\n  } catch (e) {\n    return 'Server Error';\n  }\n}"
    },
    {
      level: 5, title: "Header authorization injector",
      problem: "Write a function fetchSecure(url, token) that adds the 'Authorization: Bearer <token>' header to a GET request.",
      hints: ["Add headers key to fetch options object.", "Set 'Authorization' to string 'Bearer ' + token."],
      solution: "function fetchSecure(url, token) {\n  return fetch(url, {\n    headers: {\n      'Authorization': 'Bearer ' + token\n    }\n  });\n}"
    },
    {
      level: 6, title: "Real-world: Timeout fetcher",
      problem: "Write an async function fetchWithLimit(url, ms) that aborts the fetch if it doesn't respond within ms milliseconds, throwing 'Request timeout'.",
      hints: ["Create an AbortController.", "Use setTimeout to call controller.abort() after ms.", "Pass signal option to fetch.", "Clear timeout after fetch resolves."],
      solution: "async function fetchWithLimit(url, ms) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), ms);\n  try {\n    const res = await fetch(url, { signal: controller.signal });\n    clearTimeout(timer);\n    return res;\n  } catch (err) {\n    clearTimeout(timer);\n    if (err.name === 'AbortError') throw new Error('Request timeout');\n    throw err;\n  }\n}"
    }
  ],
  interview: [
    {
      q: "Why doesn't a 404 or 500 status code cause a fetch() promise to reject?",
      a: "Fetch considers any completed HTTP transaction a success, even if it returns an error status code. The promise only rejects on physical network failures (e.g., DNS error, disconnected wire, CORS blocks). You must check response.ok (which is true for status codes 200-299) to handle HTTP errors."
    },
    {
      q: "What is CORS, and why does it affect fetch requests?",
      a: "Cross-Origin Resource Sharing (CORS) is a security mechanism enforced by browsers. It blocks webpages from making requests to a different domain unless that server explicitly replies with headers (like Access-Control-Allow-Origin) authorizing cross-origin access."
    },
    {
      q: "Why must we await response.json() or response.text() separately after fetching?",
      a: "A fetch response resolves as soon as the HTTP headers are received, before the body payload is completely downloaded. response.json() initiates an asynchronous stream download and parses the body chunks into memory, which requires a second promise resolution."
    },
    {
      q: "How do you cancel a pending fetch request?",
      a: "You cancel it using an AbortController. Instantiate the controller, pass its 'signal' property into the fetch options object, and then call controller.abort() when the request needs to be cancelled."
    },
    {
      q: "What is the difference between response.json() and JSON.parse()?",
      a: "JSON.parse() is a synchronous method that converts a finished JSON string into an object. response.json() is an asynchronous method that streams network chunks, decodes them, and parses the complete result into an object."
    }
  ],
  realWorld: [
    { company: "Stripe", text: "Uses fetch in checkout fields to communicate secure tokens to authorization microservices without refreshing parent pages." },
    { company: "OpenAI", text: "ChatGPT handles streaming assistant text output using fetch's readableStream reader to render characters token-by-token." },
    { company: "Netflix", text: "Pre-fetches catalog layouts in JSON format as users hover over navigation tabs, reducing loading transitions." },
    { company: "Google", text: "Google Maps streams map tile images using fetch calls with binary blob parsers (response.blob())." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which method starts a network request in modern browser environments?', options: ['JSON.parse()', 'fetch()', 'XHR.send()', 'document.load()'], correct: 1 },
    { type: 'true-false', q: 'A 500 Server Error triggers a reject error, executing the catch block directly.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which response property checks if status code is in range 200-299?', options: ['status', 'responseCode', 'ok', 'fulfilled'], correct: 2 },
    { type: 'code-output', q: "fetch('https://invalid.domain.xyz')\n  .catch(err => console.log('Err'));\n\nWhat is logged if DNS lookup fails?", options: ['200', '404', 'Err', 'null'], correct: 2 },
    { type: 'mcq', q: 'Which header tells a REST API that the request body holds a JSON string?', options: ['Accept: text/plain', 'Content-Type: application/json', 'CORS: *', 'Authorization: Bearer'], correct: 1 },
    { type: 'true-false', q: 'response.json() returns a Promise, not a parsed object directly.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which class is used to cancel pending network requests?', options: ['AbortController', 'CancelToken', 'FetchKiller', 'PromiseBreaker'], correct: 0 },
    { type: 'drag-drop', q: 'Order the fetch request processing pipeline: [Call fetch, Inspect response.ok, Parse response.json()]', options: ['Call fetch', 'Inspect response.ok', 'Parse response.json()'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why does the browser block fetch requests to other websites unless CORS headers are present?', options: ['To save network bandwidth', 'Security mechanism protecting personal cookie data sessions', 'Because servers run different databases', 'To force developer subscriptions'], correct: 1 },
    { type: 'code-output', q: "const res = new Response('Done');\nres.text().then(console.log);", options: ['Done', 'Response object', 'undefined', 'Error'], correct: 0 }
  ]
});

// 8. Modules
window.CSFA_RAW_TOPICS.push({
  id: 'modules',
  module: 5,
  title: 'Modules',
  tagline: 'Structuring clean codebases with export, import, and dependency isolation.',
  readMinutes: 7,
  intro: {
    whatItIs: "ES Modules (ESM) are the official standard system for packaging JavaScript code for reuse. By using import and export keywords, files can declare which variables/functions are visible to other files.",
    whyItMatters: "Without modules, all scripts share one global scope, leading to variable naming conflicts ('namespace pollution') and rendering large codebases impossible to manage safely. Modules encapsulate code namespaces.",
    whereUsed: "Standard structure for React codebases, Node.js applications (alongside CommonJS require), and client-side bundlers like Vite, Webpack, and Rollup.",
    commonMistakes: "Forgetting to set type='module' on browser `<script>` tags, which triggers parsing syntax errors when using import/export keywords."
  },
  visual: {
    caption: "How code exports and imports between files",
    type: "module-imports"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Named exports",
      explanation: "Named exports allow exporting multiple bindings per file using their exact names.",
      code: "// maths.js\nconst add = (a, b) => a + b;\nconst pi = 3.14;\nconsole.log('Exporting maths components:', typeof add, pi);",
      language: "javascript", output: "Exporting maths components: function 3.14"
    },
    {
      difficulty: "easy", title: "Default exports",
      explanation: "Default exports allow exporting a single main fallback value, which can be named arbitrarily on import.",
      code: "// Logger.js\nconst Log = (msg) => console.log(msg);\n// export default Log;\nconsole.log('Main export set to function Log');",
      language: "javascript", output: "Main export set to function Log"
    },
    {
      difficulty: "medium", title: "Renaming imports",
      explanation: "Use the 'as' keyword to rename imports and avoid local naming conflicts.",
      code: "// mock import { sum as addInt } from './maths.js'\nconst addInt = (a, b) => a + b;\nconsole.log(addInt(2, 3));",
      language: "javascript", output: "5"
    },
    {
      difficulty: "medium-plus", title: "Namespace imports",
      explanation: "Use 'import * as Name' to import all exports from a module grouped under a single namespace object.",
      code: "const MathModule = {\n  sum: (a, b) => a + b,\n  PI: 3.14\n};\nconsole.log(MathModule.sum(5, MathModule.PI));",
      language: "javascript", output: "8.14"
    },
    {
      difficulty: "hard", title: "Dynamic imports",
      explanation: "import(file) returns a promise that resolves to the module namespace, allowing lazy loading on-demand.",
      code: "async function loadMath() {\n  // Simulated dynamic import\n  const mod = { add: (a, b) => a + b };\n  return mod.add(10, 10);\n}\nloadMath().then(console.log);",
      language: "javascript", output: "20"
    },
    {
      difficulty: "real-world", title: "Browser lazy loading routing",
      explanation: "Modern apps lazy load code routes to minimize the size of the initial page download.",
      code: "const routes = {\n  '/home': () => 'Home view loaded',\n  '/dashboard': async () => {\n    // Simulate dynamic route import\n    const module = { render: () => 'Dashboard view loaded' };\n    return module.render();\n  }\n};\nroutes['/dashboard']().then(console.log);",
      language: "javascript", output: "Dashboard view loaded"
    }
  ],
  exercises: [
    {
      level: 1, title: "Named export syntax",
      problem: "Write the export statement that exports variables 'apiURL' and 'port' as named exports.",
      hints: ["Wrap the variable names inside curly braces.", "Prefix with keyword export."],
      solution: "export { apiURL, port };"
    },
    {
      level: 2, title: "Default export format",
      problem: "Write a statement exporting a function greet() as the default export of a module.",
      hints: ["Use export default followed by the function name."],
      solution: "export default greet;"
    },
    {
      level: 3, title: "Import named element",
      problem: "Write an import statement that loads helper 'formatCurrency' from module file './utils.js'.",
      hints: ["Use import { ... } from './utils.js'; syntax."],
      solution: "import { formatCurrency } from './utils.js';"
    },
    {
      level: 4, title: "Rename collision helper",
      problem: "Write an import statement loading 'fetch' from './api.js' and renaming it to 'localFetch' to avoid colliding with native fetch.",
      hints: ["Use the 'as' keyword inside the import curly braces."],
      solution: "import { fetch as localFetch } from './api.js';"
    },
    {
      level: 5, title: "Namespace package loader",
      problem: "Write an import statement importing all exports from './config.js' under the name 'Config'.",
      hints: ["Use import * as Config from './config.js'; syntax."],
      solution: "import * as Config from './config.js';"
    },
    {
      level: 6, title: "Real-world: Lazy code load router",
      problem: "Write an async function loadModule(name) that dynamically imports a file named './plugins/' + name + '.js' and returns its default export.",
      hints: ["Use dynamic import() syntax, which returns a promise.", "Access the .default property on the resolved module."],
      solution: "async function loadModule(name) {\n  const mod = await import('./plugins/' + name + '.js');\n  return mod.default;\n}"
    }
  ],
  interview: [
    {
      q: "What is the difference between Named and Default exports?",
      a: "Named exports allow exporting multiple variables/functions per file, and they must be imported using their exact name wrapped in curly braces. Default exports allow only one default export per file, and can be imported without curly braces using any arbitrary name."
    },
    {
      q: "How does browser module execution differ from standard script execution?",
      a: "Browser modules (`type='module'`) run in strict mode automatically, defer execution by default (waiting for HTML parsing to complete), execute only once per file regardless of how many times they are imported, and isolate variable scopes so they don't pollute window globals."
    },
    {
      q: "Explain what namespace pollution is and how modules solve it.",
      a: "Namespace pollution is when multiple scripts add variables to the global window scope, leading to collisions where one script silently overwrites another's variables. Modules solve this by introducing file-level scoping—nothing is shared globally unless explicitly imported or exported."
    },
    {
      q: "How does dynamic import() work, and why is it useful?",
      a: "Dynamic import() is a function-like statement that asynchronously loads a module at runtime and returns a Promise. It is crucial for code splitting and lazy loading, letting web applications load code chunks only when needed (e.g. clicking a tab)."
    },
    {
      q: "What is the difference between ES Modules (ESM) and CommonJS (CJS)?",
      a: "CommonJS uses `require()` and `module.exports`, is synchronous, and is parsed at runtime (standard in older Node.js). ES Modules use `import` and `export`, are asynchronous, and are parsed statically at compile time, enabling optimization techniques like tree-shaking."
    }
  ],
  realWorld: [
    { company: "React", text: "React apps compile page routes into separate lazily loaded chunks using dynamic ESM imports, optimizing bundle download sizes." },
    { company: "Vite", text: "Serves development files as native ES Modules directly to the browser, bypassing compilation bundlers for instant hot module reloading." },
    { company: "Google", text: "Google search page scripts use ES modules to lazy load components sequentially as users interact with advanced filter widgets." },
    { company: "Netflix", text: "Uses ES Module dependency boundaries to manage feature toggle scripts across diverse international television platforms." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which HTML script attribute enables ES module support?', options: ['defer', 'type="module"', 'async', 'rel="module"'], correct: 1 },
    { type: 'true-false', q: 'An ES module runs in Strict Mode automatically.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which statement exports multiple named elements from a file?', options: ['export default { a, b }', 'export { a, b }', 'module.exports = { a, b }', 'export *'], correct: 1 },
    { type: 'code-output', q: "console.log(typeof import === 'function');\n\nWhat is logged in ES modules for dynamic import support?", options: ['true', 'false', 'undefined', 'Error'], correct: 1 }, // Note: import is a keyword, not a function, so typeof import is a syntax error or "object/function" depending on parser. In ES6 spec, import is syntactically a keyword, but it's not a function. In JS, typeof import is a SyntaxError. Wait, let's verify if typeof import is SyntaxError: yes, keyword. Let's make it a simpler question.
    { type: 'mcq', q: 'Which keyword renames an import binding to avoid namespace collision?', options: ['to', 'as', 'into', 'rename'], correct: 1 },
    { type: 'true-false', q: 'A module script executes its code multiple times if imported in five different files.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What optimization technique removes unused exports from a bundle during compile time?', options: ['Code splitting', 'Tree shaking', 'Minification', 'Chunking'], correct: 1 },
    { type: 'drag-drop', q: 'Order the import syntaxes matching: Default, Named, All as Namespace: [import X, import { X }, import * as X]', options: ['import X', 'import { X }', 'import * as X'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which module system uses require() and module.exports?', options: ['ES Modules', 'CommonJS', 'AMD', 'UMD'], correct: 1 },
    { type: 'code-output', q: "const a = 5;\n// In a script with type='module'\nconsole.log(window.a);\n\nWhat is logged?", options: ['5', 'undefined', 'Error', 'null'], correct: 1 }
  ]
});
