/* ==========================================================================
   TOPIC CONTENT DATA — Module 11: React & Modern Frontend
   Includes: Components, Props, State, Hooks, Routing, Context API
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) {
  window.CSFA_RAW_TOPICS = [];
}

// 1. Components
window.CSFA_RAW_TOPICS.push({
  id: 'components',
  module: 11,
  title: 'Components',
  tagline: 'Modular declarative UI building blocks — encapsulating presentation and logic.',
  readMinutes: 6,
  intro: {
    whatItIs: "Components are the fundamental building blocks of modern frontend applications. A component is a self-contained, reusable piece of user interface that encapsulates its own rendering logic, styling, and behavior.",
    whyItMatters: "Building interfaces with components improves code reusability and maintainability. Instead of writing massive HTML pages, you compose the UI from small, testable blocks like Button, Header, and ProductCard.",
    whereUsed: "Standard pattern in all modern web libraries—React, Vue, Svelte, Angular, and Web Components.",
    commonMistakes: "Creating giant, monolithic components that handle too many responsibilities, making them extremely difficult to reuse or debug."
  },
  visual: {
    caption: "The hierarchical component tree layout",
    type: "react-components"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Basic functional Component",
      explanation: "A React component is simply a JavaScript function that returns a JSX UI description.",
      code: "function Welcome() {\n  return '<h1>Welcome to CSFA</h1>';\n}\nconsole.log('Welcome component type:', typeof Welcome);",
      language: "javascript", output: "Welcome component type: function"
    },
    {
      difficulty: "easy", title: "Component composition",
      explanation: "Components can render other nested components inside them.",
      code: "const Welcome = () => 'Welcome';\nconst App = () => 'App container rendering ' + Welcome();\nconsole.log(App());",
      language: "javascript", output: "App container rendering Welcome"
    },
    {
      difficulty: "medium", title: "Declarative UI rendering mock",
      explanation: "Components update the DOM declaratively by returning UI blueprints based on inputs, rather than manipulating elements directly.",
      code: "function Header(user) {\n  return user ? `Logged in as ${user}` : 'Guest User';\n}\nconsole.log(Header('Ada'));\nconsole.log(Header(null));",
      language: "javascript", output: "Logged in as Ada\nGuest User"
    },
    {
      difficulty: "medium-plus", title: "Conditional rendering in components",
      explanation: "Using conditional logic to render different UI branches inside components.",
      code: "function LoadingButton(loading) {\n  return loading ? '<Spinner /> Loading' : '<Button>Submit</Button>';\n}\nconsole.log(LoadingButton(true));",
      language: "javascript", output: "<Spinner /> Loading"
    },
    {
      difficulty: "hard", title: "Dynamic list mapping representation",
      explanation: "Components render collections of elements by mapping arrays to component blueprints, using unique keys.",
      code: "const items = ['a', 'b'];\nconst list = items.map((item, idx) => `<li key='${idx}'>${item}</li>`);\nconsole.log('Rendered list tags count:', list.length);",
      language: "javascript", output: "Rendered list tags count: 2"
    },
    {
      difficulty: "real-world", title: "Mock virtual DOM node check",
      explanation: "Real frameworks compile component JSX into lightweight virtual DOM objects before touching the browser.",
      code: "const vdomNode = {\n  type: 'div',\n  props: { className: 'container' },\n  children: ['Hello']\n};\nconsole.log('Virtual node type:', vdomNode.type);",
      language: "javascript", output: "Virtual node type: div"
    }
  ],
  exercises: [
    {
      level: 1, title: "Identify component definition",
      problem: "True or False: In modern React, components are primarily written as JavaScript functions.",
      hints: ["Class components are legacy; functions are standard now.", "True."],
      solution: "True"
    },
    {
      level: 2, title: "JSX Return requirement",
      problem: "What syntax description format does a React component return to render UI?",
      hints: ["JSX (JavaScript XML)."],
      solution: "JSX"
    },
    {
      level: 3, title: "Conditional banner helper",
      problem: "Write a function Banner(isActive) that returns 'Active' if isActive is true, and 'Inactive' otherwise.",
      hints: ["Use a ternary operator or if statement."],
      solution: "function Banner(isActive) {\n  return isActive ? 'Active' : 'Inactive';\n}"
    },
    {
      level: 4, title: "List render keys",
      problem: "What special attribute is required when rendering a list of child components in React to help track adjustments?",
      hints: ["key."],
      solution: "key"
    },
    {
      level: 5, title: "Monolith separation logic",
      problem: "Why should a developer split a ProductGrid component containing filter check lists, search inputs, and item cards into separate sub-components?",
      hints: ["Improves reusability, isolation of states, and makes testing individual components simple."],
      solution: "To follow the single responsibility principle, making parts (like SearchBar or ItemCard) separately reusable, testable, and easier to debug."
    },
    {
      level: 6, title: "Real-world: Build dynamic list tag mapper",
      problem: "Write a function List(items) that returns a dynamic list string where each item is wrapped in an 'li' tag.",
      hints: ["Use items.map() to wrap each item.", "Join the resulting array with empty strings."],
      solution: "function List(items) {\n  return '<ul>' + items.map(item => '<li>' + item + '</li>').join('') + '</ul>';\n}"
    }
  ],
  interview: [
    {
      q: "What is a React Component?",
      a: "A React Component is a reusable, self-contained function (or legacy class) that returns JSX to define a portion of the user interface. It manages its own logic, rendering, and lifecycle, and can compose with other components to build complex UIs."
    },
    {
      q: "What is the Virtual DOM, and how do components interact with it?",
      a: "The Virtual DOM is a lightweight, in-memory representation of the real DOM. When a component's state changes, React updates the Virtual DOM, compares it to the previous snapshot (diffing), and batches only the necessary changes to update the real DOM, optimizing rendering performance."
    },
    {
      q: "Why is the 'key' prop important when rendering lists of components?",
      a: "The 'key' prop is a unique identifier that helps React track which list items have changed, been added, or been removed. Without unique keys, React re-renders the entire list sequentially, which degrades performance and can cause UI state bugs (e.g. input focus loss)."
    },
    {
      q: "What is the difference between Functional Components and Class Components?",
      a: "Class Components are older ES6 classes that extend React.Component, requiring boilerplate, lifecycle methods, and manual binding. Functional Components are plain JavaScript functions that are simpler, have less overhead, and use React Hooks to manage state and side effects."
    },
    {
      q: "What is 'prop-drilling'?",
      a: "Prop-drilling is the process of passing props down through multiple layers of nested components to deliver data to a deeply nested child, even if the intermediate components don't need the data themselves. It is resolved using Context API or state management tools."
    }
  ],
  realWorld: [
    { company: "React", text: "React component tree structures allow Meta to scale engineering teams by isolating button components from catalog widgets." },
    { company: "Netflix", text: "Implements modular movie card components reusable across television, mobile, and web layouts." },
    { company: "Google", text: "Material-UI components package Google design guidelines into importable React modules." },
    { company: "Stripe", text: "Exposes pre-built secure form components to let developers drop credit card inputs into checkout containers." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the primary purpose of a frontend Component?', options: ['To connect to databases directly', 'To encapsulate UI presentation and logic in a reusable block', 'To configure network router DNS records', 'To build SQL tables'], correct: 1 },
    { type: 'true-false', q: 'A React component must always return a complete HTML document starting with <html>.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which format is conventionally returned by functional components in React?', options: ['JSON data strings', 'JSX element code', 'CSS stylesheets', 'Binary blobs'], correct: 1 },
    { type: 'code-output', q: "const Card = (p) => 'Card';\nconsole.log(typeof Card());", options: ['string', 'object', 'function', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Why does React require unique keys when rendering lists of components?', options: ['To encrypt components for safety', 'To track and identify which items changed/moved, optimizing diff updates', 'To bypass CSS layout rules', 'To convert arrays to objects'], correct: 1 },
    { type: 'true-false', q: 'Intermediate components must always consume the props they pass down during prop-drilling.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What memory tree structure does React use to optimize updates before writing to the browser DOM?', options: ['Binary Search Tree', 'B-Tree', 'Virtual DOM', 'Call Stack'], correct: 2 },
    { type: 'drag-drop', q: 'Order the rendering stages: [State changes, Virtual DOM diffing, Real DOM update]', options: ['State changes', 'Virtual DOM diffing', 'Real DOM update'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which keyword defines standard modern React components?', options: ['class', 'function (or arrow)', 'module', 'template'], correct: 1 },
    { type: 'code-output', q: "const Btn = ({ active }) => active ? 'ON' : 'OFF';\nconsole.log(Btn({ active: true }));", options: ['ON', 'OFF', 'undefined', 'Error'], correct: 0 }
  ]
});

// 2. Props
window.CSFA_RAW_TOPICS.push({
  id: 'props',
  module: 11,
  title: 'Props',
  tagline: 'Passing configuration data down component trees — inputs and read-only attributes.',
  readMinutes: 6,
  intro: {
    whatItIs: "Props (short for properties) are read-only inputs passed down from parent components to child components. They allow parents to customize the appearance, behavior, and data content of their children.",
    whyItMatters: "Props enable component reusability. Instead of creating different button components for 'Submit' and 'Cancel', you create one Button component and customize its text and color using props.",
    whereUsed: "Standard input mechanism in React, Vue, Svelte, Angular, and Web Components.",
    commonMistakes: "Attempting to modify props directly inside a child component. Props are read-only (immutable); changing them triggers runtime errors or un-predictable UI state bugs."
  },
  visual: {
    caption: "Data flowing unidirectional down the component tree via props",
    type: "react-components"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Passing prop variables",
      explanation: "Props are received as a single object argument in functional components.",
      code: "function Greet(props) {\n  return 'Hello ' + props.name;\n}\nconsole.log(Greet({ name: 'Ada' }));",
      language: "javascript", output: "Hello Ada"
    },
    {
      difficulty: "easy", title: "Destructuring props",
      explanation: "Using ES6 destructuring to extract keys directly from the props parameter.",
      code: "const Card = ({ title, price }) => `Product: ${title} ($${price})`;\nconsole.log(Card({ title: 'Book', price: 10 }));",
      language: "javascript", output: "Product: Book ($10)"
    },
    {
      difficulty: "medium", title: "Default props",
      explanation: "Providing fallback values for props using default parameters.",
      code: "const Button = ({ label = 'Click' }) => label;\nconsole.log(Button({}), Button({ label: 'Submit' }));",
      language: "javascript", output: "Click Submit"
    },
    {
      difficulty: "medium-plus", title: "Callback props (inverse data flow)",
      explanation: "Passing functions down as props lets child components trigger actions in parent components.",
      code: "const childButton = ({ onClick }) => onClick('Clicked!');\nchildButton({\n  onClick: (msg) => console.log('Parent caught event:', msg)\n});",
      language: "javascript", output: "Parent caught event: Clicked!"
    },
    {
      difficulty: "hard", title: "Prop type validation model",
      explanation: "Checking prop data types at runtime to capture bugs early during development.",
      code: "function validateProps(props, schema) {\n  for (const k in schema) {\n    if (typeof props[k] !== schema[k]) return 'Invalid prop ' + k;\n  }\n  return 'Pass';\n}\nconsole.log(validateProps({ age: 'ten' }, { age: 'number' }));",
      language: "javascript", output: "Invalid prop age"
    },
    {
      difficulty: "real-world", title: "Dynamic theme modifier component",
      explanation: "Real applications customize button styles by passing variant classes as props.",
      code: "function StyledButton({ variant = 'primary', label }) {\n  return `<button class='btn-${variant}'>${label}</button>`;\n}\nconsole.log(StyledButton({ variant: 'danger', label: 'Delete' }));",
      language: "javascript", output: "<button class='btn-danger'>Delete</button>"
    }
  ],
  exercises: [
    {
      level: 1, title: "Read prop parameter",
      problem: "Write a component Label(props) that returns the prop value 'text'.",
      hints: ["Access props.text."],
      solution: "function Label(props) {\n  return props.text;\n}"
    },
    {
      level: 2, title: "Destructured price card",
      problem: "Write a component PriceTag({ amount }) returning '$' + amount.",
      hints: ["Use arrow function or function parameter destructuring."],
      solution: "const PriceTag = ({ amount }) => '$' + amount;"
    },
    {
      level: 3, title: "Default status badge",
      problem: "Write a component Badge({ status = 'Pending' }) returning status.",
      hints: ["Set default parameter directly inside brackets: { status = 'Pending' }."],
      solution: "const Badge = ({ status = 'Pending' }) => status;"
    },
    {
      level: 4, title: "Callback prop trigger",
      problem: "Write a component InputTrigger({ onChange }) that calls onChange('text') on execution.",
      hints: ["Invoke the onChange prop function parameter with string argument."],
      solution: "const InputTrigger = ({ onChange }) => onChange('text');"
    },
    {
      level: 5, title: "Props immutability check",
      problem: "Explain why the statement 'props.count = 5;' inside a Counter component is a bug.",
      hints: ["Props are read-only and should not be modified directly by child components."],
      solution: "Props are immutable and managed by the parent component. Modifying props directly inside a child breaks React's unidirectional data flow, preventing state updates from rendering correctly."
    },
    {
      level: 6, title: "Real-world: Conditional variant picker",
      problem: "Write a function Alert({ type = 'info', text }) that returns text wrapped in a div with class 'alert-info' or 'alert-error' based on type.",
      hints: ["Return a template string: `<div class='alert-${type}'>${text}</div>`."],
      solution: "function Alert({ type = 'info', text }) {\n  return `<div class='alert-${type}'>${text}</div>`;\n}"
    }
  ],
  interview: [
    {
      q: "What are React Props, and how are they used?",
      a: "Props (short for properties) are read-only configuration inputs passed from parent components to child components. They are structured as a single object parameter in functional components, letting parents customize child rendering and logic."
    },
    {
      q: "Are props mutable inside a child component?",
      a: "No. Props are strictly immutable (read-only) inside child components. React enforces a unidirectional data flow (top-to-bottom); allowing children to modify their inputs would bypass state tracking and make debugging UI changes extremely difficult."
    },
    {
      q: "How do you pass data 'up' from a child component to its parent using props?",
      a: "You pass a callback function from the parent to the child as a prop. The child component then invokes this callback function (e.g. during an onClick event), passing data back up as arguments to trigger state updates in the parent."
    },
    {
      q: "What is the purpose of prop destructuring, and give an example.",
      a: "Prop destructuring is an ES6 shortcut that extracts keys from the props object directly in the function signature (e.g. 'const Card = ({ name }) => name;' instead of 'const Card = (props) => props.name;'). It makes the code shorter and cleaner."
    },
    {
      q: "What are propTypes in React, and how are they replaced in modern setups?",
      a: "propTypes is a legacy React feature that performs runtime type-checking on component inputs during development. In modern setups, it is largely replaced by compile-time type-checking tools like TypeScript, which find type bugs before code even runs."
    }
  ],
  realWorld: [
    { company: "React", text: "React enforces read-only props constraints to optimize virtual DOM diff comparisons." },
    { company: "Google", text: "Uses props to pass styling configurations (colors, sizes) down to reusable Material design buttons." },
    { company: "Netflix", text: "Passes movie URLs as props to isolated player cards, reuse-rendering catalog listings." },
    { company: "Stripe", text: "Receives localized currency values as props inside billing widgets to customize client displays." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which statement defines React Props?', options: ['State variables local to components', 'Read-only configuration inputs passed down from parent components', 'Database query statements', 'Browser cookies'], correct: 1 },
    { type: 'true-false', q: 'A child component can safely modify the values of the props it receives.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'How do functional components receive props?', options: ['As local state calls', 'As a single object argument to the function', 'Via global variables', 'Via cookies'], correct: 1 },
    { type: 'code-output', q: "const Card = ({ name }) => name;\nconsole.log(Card({ name: 'Ada' }));", options: ['Ada', 'name', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'How do you configure a fallback value for a prop if the parent doesn\'t pass it?', options: ['Using throw new Error()', 'Using default parameter assignments', 'Checking localStorage', 'It is not possible'], correct: 1 },
    { type: 'true-false', q: 'Passing callback functions as props allows child components to trigger actions in parent components.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What compile-time tool is preferred in modern React for checking prop types?', options: ['Babel', 'TypeScript', 'Web Components', 'webpack'], correct: 1 },
    { type: 'drag-drop', q: 'Order the data flow: [Parent declares state, Parent passes state via props, Child receives read-only props]', options: ['Parent declares state', 'Parent passes state via props', 'Child receives read-only props'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which property is standard for checking children tags nested inside component selectors?', options: ['props.content', 'props.children', 'props.nested', 'props.inner'], correct: 1 },
    { type: 'code-output', q: "const Alert = ({ txt = 'Hello' }) => txt;\nconsole.log(Alert({ txt: 'Hi' }));", options: ['Hello', 'Hi', 'undefined', 'Error'], correct: 1 }
  ]
});

// 3. State
window.CSFA_RAW_TOPICS.push({
  id: 'state',
  module: 11,
  title: 'State',
  tagline: 'Encapsulating local interactive variables — tracking component data changes.',
  readMinutes: 7,
  intro: {
    whatItIs: "State is an object that holds information local to a component that may change over the lifetime of the component. When state changes, the component automatically re-renders to reflect the updates in the UI.",
    whyItMatters: "State makes components interactive. While props configure components from the outside, state manages internal data that changes due to user input, timers, or network responses.",
    whereUsed: "Used to manage form inputs, toggled menu states, cart contents, active user sessions, and loading flags.",
    commonMistakes: "Modifying state variables directly (e.g., state.count = 5) instead of using the set state updater function, which fails to trigger component re-renders."
  },
  visual: {
    caption: "The state mutation and re-rendering flow",
    type: "react-state-flow"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Mock state initialization",
      explanation: "State represents mutable variables local to the component.",
      code: "let state = { count: 0 };\nconsole.log('Initial count:', state.count);",
      language: "javascript", output: "Initial count: 0"
    },
    {
      difficulty: "easy", title: "State updater function",
      explanation: "Modifying state must trigger a re-render operation to update the UI.",
      code: "let state = { count: 0 };\nfunction setState(newVal) {\n  state = { ...state, ...newVal };\n  console.log('UI Re-rendered with:', state.count);\n}\nsetState({ count: 1 });",
      language: "javascript", output: "UI Re-rendered with: 1"
    },
    {
      difficulty: "medium", title: "Toggle menu state mock",
      explanation: "Using state boolean flags to toggle presentation blocks.",
      code: "let state = { open: false };\nconst toggle = () => { state.open = !state.open; };\ntoggle();\nconsole.log('Menu open:', state.open);\ntoggle();\nconsole.log('Menu open:', state.open);",
      language: "javascript", output: "Menu open: true\nMenu open: false"
    },
    {
      difficulty: "medium-plus", title: "Input text binding simulation",
      explanation: "Updating component state dynamically as the user types into form fields.",
      code: "let state = { query: '' };\nfunction handleInput(e) {\n  state.query = e.target.value;\n}\nhandleInput({ target: { value: 'shoes' } });\nconsole.log('Search query state:', state.query);",
      language: "javascript", output: "Search query state: shoes"
    },
    {
      difficulty: "hard", title: "Functional state updates",
      explanation: "Passing a function to state updaters prevents race conditions when updates depend on prior state.",
      code: "let state = { count: 1 };\nfunction update(fn) {\n  state.count = fn(state.count);\n}\nupdate(prev => prev + 1);\nconsole.log('Safe count:', state.count);",
      language: "javascript", output: "Safe count: 2"
    },
    {
      difficulty: "real-world", title: "Dynamic Cart state manager",
      explanation: "E-commerce grids track additions and quantity increases inside local or global states.",
      code: "const cart = [];\nfunction addToCart(item) {\n  const found = cart.find(i => i.id === item.id);\n  if (found) found.qty++; else cart.push({ ...item, qty: 1 });\n}\naddToCart({ id: 101, title: 'Shirt' });\naddToCart({ id: 101, title: 'Shirt' });\nconsole.log('Cart items count:', cart.length, '| Item qty:', cart[0].qty);",
      language: "javascript", output: "Cart items count: 1 | Item qty: 2"
    }
  ],
  exercises: [
    {
      level: 1, title: "State role check",
      problem: "True or False: Modifying a component's local state variable directly (without set state functions) will automatically trigger a UI re-render.",
      hints: ["React has no way of knowing a variable changed unless the updater function is called.", "False."],
      solution: "False"
    },
    {
      level: 2, title: "State initialization syntax",
      problem: "Write the React useState call that initializes a count state to 0, returning variables count and setCount.",
      hints: ["Use array destructuring syntax: const [count, setCount] = useState(0);"],
      solution: "const [count, setCount] = useState(0);"
    },
    {
      level: 3, title: "Boolean toggler function",
      problem: "Write a function triggerToggle(setIsOpen) that calls setIsOpen, reversing current status.",
      hints: ["Pass functional updater: prev => !prev."],
      solution: "function triggerToggle(setIsOpen) {\n  setIsOpen(prev => !prev);\n}"
    },
    {
      level: 4, title: "Reset state function",
      problem: "Write a function resetAll(setName, setAge) that resets name to '' and age to 0.",
      hints: ["Call both state setters with initial values."],
      solution: "function resetAll(setName, setAge) {\n  setName('');\n  setAge(0);\n}"
    },
    {
      level: 5, title: "List addition helper",
      problem: "Given state array list and setter setList, write a statement to add 'new-item' to the list, maintaining immutability.",
      hints: ["Create a new array using spread syntax: setList([...list, 'new-item']);."],
      solution: "setList([...list, 'new-item']);"
    },
    {
      level: 6, title: "Real-world: Complete count validation updater",
      problem: "Write a function safeIncrement(setCount, maxLimit) that increments count by 1 but prevents it from exceeding maxLimit.",
      hints: ["Pass functional updater to setCount.", "Check: if (prev < maxLimit) return prev + 1; else return prev;."],
      solution: "function safeIncrement(setCount, maxLimit) {\n  setCount(prev => prev < maxLimit ? prev + 1 : prev);\n}"
    }
  ],
  interview: [
    {
      q: "What is React State, and how does it differ from Props?",
      a: "Props are configuration inputs passed down from parent components, and they are read-only (immutable). State is mutable data managed internally by the component itself. When state updates, the component and its children re-render automatically."
    },
    {
      q: "Why should you never mutate state directly in React?",
      a: "React overrides standard object setter properties. It only knows to re-render the UI when the state updater function (e.g. setState, setCount) is called, which schedules virtual DOM diff comparisons. Modifying variables directly leaves the interface out-of-sync."
    },
    {
      q: "What is the benefit of passing a function to a state updater (e.g., setCount(prev => prev + 1))?",
      a: "Pass a function when the new state depends on the previous state. Because React batches state updates asynchronously for performance, accessing the state variable directly (setCount(count + 1)) can lead to race conditions where you use stale values; functional updaters guarantee you use the latest queued state."
    },
    {
      q: "What happens when a component's state changes?",
      a: "React schedules a re-render of that component and all of its nested child components. It computes the new virtual DOM tree, diffs it against the previous tree, and updates only the changed elements in the real browser DOM."
    },
    {
      q: "Explain how to add an item to an array stored in React state, maintaining immutability.",
      a: "You should not push directly to the state array. Instead, create a new array incorporating the new item using the ES6 spread operator, and pass it to the state setter (e.g. 'setItems([...items, newItem])')."
    }
  ],
  realWorld: [
    { company: "React", text: "React batches state updates to prevent redundant rendering cycles, maintaining smooth animations." },
    { company: "Stripe", text: "Manages checkout form validation checks and loading flags inside local component states." },
    { company: "Google", text: "Google Sheets tracks edit cursor locations and cell input values inside component states." },
    { company: "Netflix", text: "Tracks video player play/pause state and elapsed playtime inside local state variables." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is React State?', options: ['Read-only inputs passed from parents', 'Mutable variables managed internally by components', 'Database credentials', 'Global HTML style files'], correct: 1 },
    { type: 'true-false', q: 'Mutating state directly (e.g. state.count = 5) will force the component to re-render instantly.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which hook initializes state inside functional components?', options: ['useEffect', 'useState', 'useRef', 'useContext'], correct: 1 },
    { type: 'code-output', q: "const [x, setX] = [5, () => {}];\nconsole.log(x);", options: ['5', 'function', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Why should you use functional state updaters (prev => prev + 1)?', options: ['It uses less RAM memory', 'To guarantee you use the most recent state value, avoiding batching race conditions', 'It prevents CSS styling bugs', 'It compiles faster'], correct: 1 },
    { type: 'true-false', q: 'When a component\'s state changes, all of its nested child components also re-render.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which ES6 syntax is preferred to append an item to a state array?', options: ['arr.push(item)', 'setArr([...arr, item])', 'arr.unshift(item)', 'setArr(arr.concat(item)) but modify in place'], correct: 1 },
    { type: 'drag-drop', q: 'Order the state update pipeline: [User triggers click, State setter called, Component re-renders]', options: ['User triggers click', 'State setter called', 'Component re-renders'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What is the default return value of the state setter function?', options: ['The new state value', 'undefined', 'A Promise', 'null'], correct: 1 },
    { type: 'code-output', q: "let s = { active: false };\nconst set = (v) => { s = { ...s, ...v }; };\nset({ active: true });\nconsole.log(s.active);", options: ['true', 'false', 'undefined', 'Error'], correct: 0 }
  ]
});

// 4. Hooks
window.CSFA_RAW_TOPICS.push({
  id: 'hooks',
  module: 11,
  title: 'Hooks',
  tagline: 'Hooking into React lifecycles — useState, useEffect, and custom hook wrappers.',
  readMinutes: 8,
  intro: {
    whatItIs: "React Hooks are functions that let functional components hook into React state and lifecycle features. The core hooks are useState (for managing state) and useEffect (for handling side effects like data fetching or event listeners).",
    whyItMatters: "Hooks allow using state and lifecycle capabilities without writing class components. They simplify code sharing and let developers compose side effects declaratively.",
    whereUsed: "Standard practice in modern React frontend applications, including custom hooks (like useFetch or useAuth) that wrap complex logic.",
    commonMistakes: "Calling hooks inside loops, conditions, or nested functions. Hooks must always be called at the top level of your React function, in the exact same order on every render."
  },
  visual: {
    caption: "The execution rules and order of React Hooks",
    type: "react-state-flow"
  },
  examples: [
    {
      difficulty: "very-easy", title: "useState hook example",
      explanation: "useState initializes a state variable and returns an updater function.",
      code: "const [state, setState] = ['active', () => {}];\nconsole.log('Hook state:', state);",
      language: "javascript", output: "Hook state: active"
    },
    {
      difficulty: "easy", title: "useEffect dependency array",
      explanation: "useEffect executes side effects. An empty dependency array [] ensures it runs only once when the component mounts.",
      code: "const dependencies = [];\nconsole.log('Runs on mount:', dependencies.length === 0);",
      language: "javascript", output: "Runs on mount: true"
    },
    {
      difficulty: "medium", title: "useEffect cleanup simulator",
      explanation: "useEffect functions can return a cleanup function to clean up listeners and prevent memory leaks.",
      code: "function effect() {\n  console.log('Effect mounted');\n  return function cleanup() {\n    console.log('Effect cleaned up');\n  };\n}\nconst clean = effect(); clean();",
      language: "javascript", output: "Effect mounted\nEffect cleaned up"
    },
    {
      difficulty: "medium-plus", title: "Dependencies tracking",
      explanation: "If you pass values in the dependency array, the effect triggers again when those values change.",
      code: "let lastDeps = [1];\nfunction checkTrigger(newDeps) {\n  const changed = newDeps.some((d, idx) => d !== lastDeps[idx]);\n  if (changed) console.log('Re-run effect');\n}\ncheckTrigger([2]);",
      language: "javascript", output: "Re-run effect"
    },
    {
      difficulty: "hard", title: "Custom Hook: useCounter simulator",
      explanation: "Custom hooks wrap core hooks to package reusable logic.",
      code: "function useCounter(initial = 0) {\n  let val = initial;\n  return {\n    get: () => val,\n    increment: () => ++val\n  };\n}\nconst count = useCounter(5);\ncount.increment();\nconsole.log('Custom hook count:', count.get());",
      language: "javascript", output: "Custom hook count: 6"
    },
    {
      difficulty: "real-world", title: "Dynamic title syncer hook model",
      explanation: "Real hooks synchronize component states to browser features like document.title.",
      code: "function syncTitle(title) {\n  // Simulated useEffect syncing document.title\n  const doc = { title: '' };\n  doc.title = title;\n  console.log('Synced page title:', doc.title);\n}\nsyncTitle('Home — Dashboard');",
      language: "javascript", output: "Synced page title: Home — Dashboard"
    }
  ],
  exercises: [
    {
      level: 1, title: "State hook initialization",
      problem: "Write the hook call to declare a state variable named 'active' starting as false.",
      hints: ["Use const [active, setActive] = useState(false);."],
      solution: "const [active, setActive] = useState(false);"
    },
    {
      level: 2, title: "Mount effect declaration",
      problem: "Write the structure of a useEffect call that logs 'Mount' and runs only ONCE on mount.",
      hints: ["Pass an empty dependency array [] as the second argument."],
      solution: "useEffect(() => {\n  console.log('Mount');\n}, []);"
    },
    {
      level: 3, title: "Rules of Hooks validation",
      problem: "True or False: It is safe to call a React Hook inside an if statement or a loop.",
      hints: ["Hooks must be called in the exact same order on every render; conditional calls violate this.", "False."],
      solution: "False"
    },
    {
      level: 4, title: "Cleanup effect structure",
      problem: "Write a useEffect that sets up a resize listener on window, and returns a function to remove it.",
      hints: ["Define handler.", "Call window.addEventListener.", "Return arrow function calling window.removeEventListener."],
      solution: "useEffect(() => {\n  const handleResize = () => {};\n  window.addEventListener('resize', handleResize);\n  return () => window.removeEventListener('resize', handleResize);\n}, []);"
    },
    {
      level: 5, title: "Dependency tracking checker",
      problem: "Write a useEffect that runs a search query fetch each time the state variable 'query' changes.",
      hints: ["Include 'query' in the dependency array: [query]."],
      solution: "useEffect(() => {\n  fetchData(query);\n}, [query]);"
    },
    {
      level: 6, title: "Real-world: Build useToggle custom hook",
      problem: "Write a custom hook function useToggle(initialValue = false) that returns [value, toggleFunction].",
      hints: ["Call useState(initialValue) inside.", "Define toggle function calling setValue(prev => !prev).", "Return array containing value and toggle function."],
      solution: "function useToggle(initialValue = false) {\n  const [val, setVal] = useState(initialValue);\n  const toggle = () => setVal(prev => !prev);\n  return [val, toggle];\n}"
    }
  ],
  interview: [
    {
      q: "What are React Hooks, and why were they introduced?",
      a: "Hooks are functions introduced in React 16.8 that allow functional components to use state, lifecycle methods, and context. They resolve code sharing issues, eliminate the need for class components, and simplify nested component composition."
    },
    {
      q: "What are the two absolute Rules of Hooks?",
      a: "1) Only call hooks at the top level: Do not call them inside loops, conditions, or nested functions. 2) Only call hooks from React functions: Call them from functional components or custom hooks, never from standard JavaScript helper functions."
    },
    {
      q: "What is the purpose of the dependency array in useEffect?",
      a: "The dependency array controls when the effect executes. If omitted, the effect runs on every render. If empty [], the effect runs once when the component mounts. If it contains variables, the effect re-runs whenever any of those variables change between renders."
    },
    {
      q: "How does the cleanup function in useEffect work, and when does it run?",
      a: "If useEffect returns a function, React executes this cleanup function right before the component unmounts, and also before re-running the effect on subsequent renders. It is used to clean up subscriptions, intervals, and event listeners, preventing memory leaks."
    },
    {
      q: "How do you create a custom Hook, and when should you?",
      a: "A custom Hook is a JavaScript function whose name starts with 'use' and that calls other React Hooks inside it. Create one when you need to extract and reuse stateful logic (e.g. data fetching, toggle states, event listeners) across multiple components."
    }
  ],
  realWorld: [
    { company: "React", text: "React relies on hook call order arrays to align state tables with functional renders." },
    { company: "Netflix", text: "Uses custom useAuth hooks to verify subscriber tokens before rendering members dashboards." },
    { company: "Stripe", text: "Integrates useElements hooks to securely load card input fields within custom checkout elements." },
    { company: "Google", text: "Applies custom hooks to track scroll thresholds inside search query widgets." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which hook executes side effects (like data fetching or subscriptions) in functional components?', options: ['useState', 'useEffect', 'useMemo', 'useContext'], correct: 1 },
    { type: 'true-false', q: 'It is safe to call a React Hook inside an if statement as long as the condition evaluates to true.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What naming convention must all custom React Hooks follow?', options: ['They must end with "Hook"', 'They must start with the lowercase word "use"', 'They must be capitalized', 'They must contain the word "react"'], correct: 1 },
    { type: 'code-output', q: "let count = 0;\nconst effect = () => { count++; return () => count--; };\nconst clean = effect();\nclean();\nconsole.log(count);", options: ['0', '1', '2', 'Error'], correct: 0 },
    { type: 'mcq', q: 'How do you configure a useEffect hook to execute only ONCE on component mount?', options: ['Omit the dependency array', 'Pass an empty dependency array []', 'Pass null', 'Pass [true]'], correct: 1 },
    { type: 'true-false', q: 'The cleanup function returned by useEffect runs right before the component unmounts and before re-running the effect on changes.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which hook accesses database parameters directly from context elements?', options: ['useRef', 'useContext', 'useReducer', 'useState'], correct: 1 },
    { type: 'drag-drop', q: 'Order the useEffect sequence: [Mount component, Execute effect callback, Run cleanup function on unmount]', options: ['Mount component', 'Execute effect callback', 'Run cleanup function on unmount'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What error occurs if you call a hook conditionally?', options: ['TypeError', 'React rules check violation (broken render order)', 'ReferenceError', 'CORS block'], correct: 1 },
    { type: 'code-output', q: "const check = (deps) => deps === undefined ? 'every-render' : 'conditional';\nconsole.log(check(undefined));", options: ['every-render', 'conditional', 'undefined', 'Error'], correct: 0 }
  ]
});

// 5. Routing
window.CSFA_RAW_TOPICS.push({
  id: 'routing',
  module: 11,
  title: 'Routing',
  tagline: 'Client-side navigation — mapping URLs to components without page reloads.',
  readMinutes: 6,
  intro: {
    whatItIs: "Client-Side Routing is the mechanism that allows single-page applications (SPAs) to update the URL and render different components dynamically without requesting a new HTML page from the server.",
    whyItMatters: "Traditional page reloads are slow. Client-side routing intercepts links, updates the browser URL using the HTML5 History API, and updates the UI instantly, creating a smooth, desktop-like experience.",
    whereUsed: "Standard in all Single-Page Applications built with tools like React Router, Vue Router, or Next.js.",
    commonMistakes: "Using standard `<a href>` tags instead of the router's `<Link>` component. Standard anchor tags force the browser to reload the entire page, clearing local state and XP."
  },
  visual: {
    caption: "How client-side routing routes URLs to components",
    type: "react-components"
  },
  examples: [
    {
      difficulty: "very-easy", title: "URL path query",
      explanation: "Reading current URL pathname properties to determine which page is active.",
      code: "const path = '/dashboard';\nconsole.log('Active page route:', path.slice(1));",
      language: "javascript", output: "Active page route: dashboard"
    },
    {
      difficulty: "easy", title: "Interrogating parameters",
      explanation: "Extracting dynamic parameters (like IDs) from path strings.",
      code: "const route = '/users/42';\nconst userId = route.split('/').pop();\nconsole.log('ID parameter extracted:', userId);",
      language: "javascript", output: "ID parameter extracted: 42"
    },
    {
      difficulty: "medium", title: "Client routing simulator",
      explanation: "A simple router mapping path strings to component render callbacks.",
      code: "const routes = {\n  '/': () => 'Home Page',\n  '/about': () => 'About Page'\n};\nfunction navigate(path) {\n  return routes[path] ? routes[path]() : '404 Not Found';\n}\nconsole.log(navigate('/about'));",
      language: "javascript", output: "About Page"
    },
    {
      difficulty: "medium-plus", title: "History API pushState simulator",
      explanation: "Using window.history.pushState to update the browser URL search address without reload triggers.",
      code: "const historyMock = { state: null, url: '' };\nfunction pushState(state, title, url) {\n  historyMock.state = state;\n  historyMock.url = url;\n}\npushState({ id: 1 }, '', '/profile');\nconsole.log('Updated client URL address:', historyMock.url);",
      language: "javascript", output: "Updated client URL address: /profile"
    },
    {
      difficulty: "hard", title: "Dynamic URL matches compiler",
      explanation: "Converting route templates (like '/users/:id') to regex to match paths and extract parameters dynamically.",
      code: "const pattern = /^\\/users\\/([^/]+)$/;\nconst match = '/users/grace'.match(pattern);\nconsole.log('Param matches:', match ? match[1] : 'null');",
      language: "javascript", output: "Param matches: grace"
    },
    {
      difficulty: "real-world", title: "Simple router middleware guard",
      explanation: "Routers intercept navigation attempts to verify authorization privileges before showing pages.",
      code: "const routes = { '/admin': { authRequired: true } };\nfunction canNavigate(user, path) {\n  if (routes[path]?.authRequired && user.role !== 'admin') return 'Redirect /login';\n  return 'Allow';\n}\nconsole.log('Guest accessing admin:', canNavigate({ role: 'guest' }, '/admin'));",
      language: "javascript", output: "Guest accessing admin: Redirect /login"
    }
  ],
  exercises: [
    {
      level: 1, title: "Identify routing trigger",
      problem: "True or False: Clicking a standard '<a href='/about'>' link in a React app keeps the page from reloading.",
      hints: ["Standard anchors force a full browser page refresh.", "False."],
      solution: "False"
    },
    {
      level: 2, title: "React Router link component",
      problem: "What React Router component replaces the standard HTML 'a' tag to allow client-side navigation without reloading?",
      hints: ["Link."],
      solution: "Link"
    },
    {
      level: 3, title: "Parameter router route",
      problem: "How is a dynamic parameter segment (like user ID) conventionally specified in a route path template?",
      hints: ["Use a colon: '/users/:id'."],
      solution: "/users/:id"
    },
    {
      level: 4, title: "HTML5 History API method",
      problem: "What window.history method changes the browser URL address without triggering a page reload?",
      hints: ["pushState."],
      solution: "pushState"
    },
    {
      level: 5, title: "Explain fallback routing",
      problem: "What is the purpose of a '*' or 'Catch-All' route in client-side routing definitions?",
      hints: ["Renders a 404 page when none of the specified routes match the URL."],
      solution: "To capture any invalid or unregistered URL paths entered by the user, rendering a custom 404 Not Found component instead of crashing."
    },
    {
      level: 6, title: "Real-world: Build basic route parser",
      problem: "Write a function parseParams(routeTemplate, urlPath) that extracts parameter value if template is '/users/:id' and path is '/users/bob'.",
      hints: ["Verify both have same lengths when split by '/'.", "Match indices where template has ':id', and return the corresponding value from path."],
      solution: "function parseParams(routeTemplate, urlPath) {\n  const tempParts = routeTemplate.split('/');\n  const pathParts = urlPath.split('/');\n  if (tempParts.length !== pathParts.length) return null;\n  const idx = tempParts.indexOf(':id');\n  return idx !== -1 ? pathParts[idx] : null;\n}"
    }
  ],
  interview: [
    {
      q: "What is client-side routing, and how does it work?",
      a: "Client-side routing is a mechanism that updates the browser URL and renders matching page components dynamically without requesting a new HTML page from the server. It intercepts link clicks, updates the browser URL using the HTML5 History API (pushState), and updates the virtual DOM."
    },
    {
      q: "Why should you use the `<Link>` component instead of standard anchor `<a>` tags in React?",
      a: "A standard anchor tag forces the browser to request a new page from the server, causing a full reload that wipes out the application state, local memory, and active threads. The `<Link>` component intercepts the click, prevents the default reload, and updates the view client-side."
    },
    {
      q: "Explain how dynamic parameters work in paths (e.g. /posts/:id) and how you retrieve them.",
      a: "Dynamic parameters act as wildcards in the route path template (e.g. :id matches any string). The router uses regex matching to parse the URL and extract these segments. In React Router, they are retrieved inside the component using the 'useParams()' hook."
    },
    {
      q: "What is the role of a fallback '*' route?",
      a: "It acts as a catch-all route at the bottom of the routing list. If the browser URL does not match any of the preceding route paths, the router falls back to this route, typically rendering a '404 Not Found' page."
    },
    {
      q: "Explain what server-side configuration is needed to support client-side routing in single-page apps.",
      a: "Because client-side routing handles URLs locally, refreshing the page on a sub-route (e.g. /dashboard) causes the browser to request '/dashboard' from the server, resulting in a 404. The server must be configured to route all incoming requests to 'index.html', letting the client-side router handle the path."
    }
  ],
  realWorld: [
    { company: "React", text: "React Router powers navigation grids on thousands of large-scale single-page dashboards." },
    { company: "Netflix", text: "Navigates movie catalog categories programmatically using client-side routers." },
    { company: "Stripe", text: "Uses Next.js file-system routing to structure payment dashboard routes." },
    { company: "Google", text: "Google Drive switches folders dynamically using hash-routing timelines to track steps." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which API lets browsers change the URL address without reloading the page?', options: ['Fetch API', 'HTML5 History API (pushState)', 'CORS API', 'DOM Node API'], correct: 1 },
    { type: 'true-false', q: 'Clicking <Link> in React Router fetches a brand new index.html file from the server.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which hook extracts dynamic URL parameters (e.g. id) in React Router?', options: ['useSearchParams', 'useParams', 'useLocation', 'useNavigate'], correct: 1 },
    { type: 'code-output', q: "const route = '/items/:id';\nconsole.log(route.startsWith('/items') ? 'match' : 'no');", options: ['match', 'no', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Which route path represents a fallback "catch-all" to render a 404 page?', options: ['/404', '/', '*', 'default'], correct: 2 },
    { type: 'true-false', q: 'Single Page Applications (SPAs) require servers to redirect all sub-routes to index.html to support direct links refreshes.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which hook allows navigating programmatically (e.g. redirecting after checkout)?', options: ['useParams', 'useNavigate', 'useHistoryOnly', 'useLocation'], correct: 1 },
    { type: 'drag-drop', q: 'Order the routing events: [User clicks Link, Router calls pushState, Router updates view component]', options: ['User clicks Link', 'Router calls pushState', 'Router updates view component'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What happens to React state if you navigate pages using standard a-href tags instead of Link?', options: ['It transfers to the new page automatically', 'It is completely reset and lost', 'It caches in localStorage', 'It throws a compilation syntax error'], correct: 1 },
    { type: 'code-output', q: "const parse = (path) => path.split('/')[2];\nconsole.log(parse('/posts/101'));", options: ['posts', '101', 'undefined', 'Error'], correct: 1 }
  ]
});

// 6. Context API
window.CSFA_RAW_TOPICS.push({
  id: 'context-api',
  module: 11,
  title: 'Context API',
  tagline: 'Global state sharing — resolving prop-drilling by providing data directly to subtrees.',
  readMinutes: 7,
  intro: {
    whatItIs: "The Context API is a built-in React feature that allows sharing state across the entire component tree without passing props down manually through every level (prop-drilling). It consists of a Context object, a Provider component (which supplies the data), and a Consumer or useContext hook (which reads the data).",
    whyItMatters: "Context simplifies global state. It allows components deeply nested in the tree (like a settings button) to access global values (like theme or auth status) directly, keeping intermediate component APIs clean.",
    whereUsed: "Used to manage app-wide state: theme toggles (dark/light mode), user authentication sessions, localized language settings, and shopping cart systems.",
    commonMistakes: "Using Context API for frequently changing state throughout huge trees, which triggers unnecessary re-renders in all consuming components."
  },
  visual: {
    caption: "Prop drilling vs direct Context access",
    type: "react-components"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Context creation mock",
      explanation: "React.createContext creates a context object containing Provider and Consumer components.",
      code: "const mockContext = { Provider: 'ProviderClass', value: 'light' };\nconsole.log('Context provider exists:', !!mockContext.Provider);",
      language: "javascript", output: "Context provider exists: true"
    },
    {
      difficulty: "easy", title: "Providing a value",
      explanation: "The Provider component wraps a tree, supplying a shared value to all children.",
      code: "const Provider = ({ value, children }) => children(value);\nconsole.log(Provider({ value: 'dark', children: (v) => 'Theme is: ' + v }));",
      language: "javascript", output: "Theme is: dark"
    },
    {
      difficulty: "medium", title: "Consuming context via Hook mock",
      explanation: "Components read the closest provider's value directly, bypassing parent props.",
      code: "const activeTheme = 'dark';\nfunction ThemeButton() {\n  return 'Rendered button with theme: ' + activeTheme;\n}\nconsole.log(ThemeButton());",
      language: "javascript", output: "Rendered button with theme: dark"
    },
    {
      difficulty: "medium-plus", title: "Nested consumption without drilling",
      explanation: "Intermediate parent components don't pass the context values, but child nodes can still access them.",
      code: "const sharedContext = { user: 'Grace' };\nconst MiddleComponent = () => 'Middle (passing nothing)';\nconst DeepChild = () => 'Resolved user: ' + sharedContext.user;\nconsole.log(MiddleComponent(), '|', DeepChild());",
      language: "javascript", output: "Middle (passing nothing) | Resolved user: Grace"
    },
    {
      difficulty: "hard", title: "Dynamic context updater",
      explanation: "Context can pass state setters alongside data, allowing children to update global values.",
      code: "const context = { theme: 'light', setTheme: (v) => { context.theme = v; } };\ncontext.setTheme('dark');\nconsole.log('Global theme set to:', context.theme);",
      language: "javascript", output: "Global theme set to: dark"
    },
    {
      difficulty: "real-world", title: "User authentication Provider model",
      explanation: "Real apps wrap the root component in an AuthProvider to share user credentials and logout helpers globally.",
      code: "class AuthContext {\n  constructor() { this.user = null; }\n  login(name) { this.user = { name }; }\n  logout() { this.user = null; }\n}\nconst auth = new AuthContext(); auth.login('Ada');\nconsole.log('Current global user logged:', auth.user.name);",
      language: "javascript", output: "Current global user logged: Ada"
    }
  ],
  exercises: [
    {
      level: 1, title: "Create context statement",
      problem: "Write the React command to create a context object named ThemeContext.",
      hints: ["Use React.createContext() or createContext()."],
      solution: "const ThemeContext = React.createContext();"
    },
    {
      level: 2, title: "Provider wrapper tag",
      problem: "Write the opening tag for a ThemeContext provider that passes the value 'dark'.",
      hints: ["Use <ThemeContext.Provider value='dark'>."],
      solution: "<ThemeContext.Provider value=\"dark\">"
    },
    {
      level: 3, title: "Read context hook",
      problem: "Write the statement inside a component that reads ThemeContext using the useContext hook.",
      hints: ["Use const theme = useContext(ThemeContext);."],
      solution: "const theme = useContext(ThemeContext);"
    },
    {
      level: 4, title: "Prop drilling resolution",
      problem: "Explain how Context API resolves the problem of prop-drilling.",
      hints: ["It allows children to access data directly from a Provider, bypassing intermediate parent components."],
      solution: "It provides a global data store that any nested component can subscribe to directly using hooks, removing the need to pass data down manually through intermediate components."
    },
    {
      level: 5, title: "Re-render performance optimization",
      problem: "Why is it an anti-pattern to store frequently updating values (like input coordinates) in a global Context wrapping the entire app?",
      hints: ["Every time the context value changes, all components that consume the context will re-render, creating performance lags."],
      solution: "Because any change to the context value forces all consuming components to re-render. Frequent updates can cause performance stuttering across large component trees."
    },
    {
      level: 6, title: "Real-world: Build UserContext provider",
      problem: "Write a React component UserProvider({ children }) that creates a UserContext, manages a local 'user' state, and provides { user, setUser } to its children.",
      hints: ["Create UserContext.", "Inside UserProvider, call useState(null).", "Return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>."],
      solution: "const UserContext = React.createContext();\nfunction UserProvider({ children }) {\n  const [user, setUser] = useState(null);\n  return (\n    <UserContext.Provider value={{ user, setUser }}>\n      {children}\n    </UserContext.Provider>\n  );\n}"
    }
  ],
  interview: [
    {
      q: "What is the React Context API, and what problem does it solve?",
      a: "The Context API is a built-in React feature that allows sharing state across the component tree without manually passing props down through every level. It resolves the problem of 'prop-drilling', where intermediate components act as pass-throughs for data they don't use."
    },
    {
      q: "What are the three main components involved in utilizing Context?",
      a: "1) The Context Object (created with React.createContext). 2) The Provider component (wraps components and accepts a 'value' prop to share). 3) The Consumer (or modern 'useContext' hook, used by nested components to read the value)."
    },
    {
      q: "How does useContext trigger re-renders in consumer components?",
      a: "When the 'value' prop of a Provider changes, React automatically flags all components that call 'useContext' for that specific context as dirty, forcing them to re-render with the new value, bypassing any memoization (like React.memo) in intermediate components."
    },
    {
      q: "When should you use Context API versus a dedicated state manager like Redux?",
      a: "Use Context API for low-frequency updates and static configurations (themes, user auth settings, language preferences). Use Redux or Zustand for high-frequency updates, complex state logic, or when you need advanced debugging tools (like time-travel debugging)."
    },
    {
      q: "Can a component consume multiple Contexts?",
      a: "Yes. A component can call the 'useContext' hook multiple times with different context objects (e.g. 'useContext(ThemeContext)' and 'useContext(UserContext)') to subscribe to different data stores."
    }
  ],
  realWorld: [
    { company: "React", text: "React Router uses Context API to share path navigation states across component subtrees." },
    { company: "Netflix", text: "Uses context providers to share active user profiles and child-safety locks across TV menus." },
    { company: "Google", text: "Coordinates Material-UI style settings (dark/light themes) across pages using context providers." },
    { company: "Stripe", text: "Shares API account keys across nested credit card components using custom Context Providers." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which problem is directly solved by the React Context API?', options: ['Network request latency', 'Prop-drilling (passing props through unused intermediate layers)', 'SQL injection security vulnerabilities', 'CSS style specificity collisions'], correct: 1 },
    { type: 'true-false', q: 'When a Context Provider value changes, only the direct child of the Provider re-renders.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which hook is used to read a context value inside functional components?', options: ['useState', 'useContext', 'useReducer', 'useRef'], correct: 1 },
    { type: 'code-output', q: "const Theme = React.createContext('light');\nconsole.log(Theme ? 'exists' : 'null');", options: ['exists', 'null', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'Which component is responsible for distributing the context value to subtrees?', options: ['Consumer', 'Provider', 'Reducer', 'Router'], correct: 1 },
    { type: 'true-false', q: 'Context values can pass both state variables and state updater functions.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is a typical use case for the Context API?', options: ['Linear sorting optimization', 'Managing global state like theme options or user login profiles', 'Replacing the HTML5 History API', 'Direct DOM manipulation'], correct: 1 },
    { type: 'drag-drop', q: 'Order the Context setup steps: [Create Context, Wrap tree in Provider, Call useContext in child]', options: ['Create Context', 'Wrap tree in Provider', 'Call useContext in child'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which hook creates the Context object in React?', options: ['useContext', 'createContext', 'React.createContext', 'useState'], correct: 2 },
    { type: 'code-output', q: "const ctx = { value: 'A' };\nconst get = () => ctx.value;\nconsole.log(get());", options: ['A', 'undefined', 'null', 'Error'], correct: 0 }
  ]
});
