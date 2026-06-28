/* ==========================================================================
   TOPIC CONTENT DATA — Module 3: HTML Fundamentals
   Full depth per spec: intro, visual explanation, 6 examples, 6 exercises,
   5 interview questions, real-world applications, 10-question quiz.

   IMPORTANT: this file does NOT re-initialize window.CSFA_RAW_TOPICS — that
   array is created once in topics-module1.js. This file must be loaded
   AFTER topics-module1.js and topics-module2.js in every HTML page's
   <script> tags, and simply pushes Module 3's topics onto the same array.
   ========================================================================== */

window.CSFA_RAW_TOPICS.push({
  id: 'elements',
  module: 3,
  title: 'Elements',
  tagline: 'Tags, attributes, and the nesting structure that makes up every web page.',
  readMinutes: 7,

  intro: {
    whatItIs: `An HTML element is a building block of a web page, usually written as an opening tag, content, and a closing tag — like <p>Hello</p>. Elements can have attributes (extra information inside the opening tag, like class="title") and can be nested inside one another to form a tree structure.`,
    whyItMatters: `Every web page you've ever seen is built from elements nested inside other elements. Understanding how tags, attributes, and nesting work is the prerequisite for everything else in web development — CSS styling targets elements, JavaScript manipulates elements, and accessibility depends on using the right elements correctly.`,
    whereUsed: `Every single web page, email template, and many app interfaces (via WebViews) are built from HTML elements.`,
    commonMistakes: `A common beginner mistake is forgetting to close tags, or nesting elements incorrectly (e.g. putting a block-level element inside a paragraph), which can cause unpredictable rendering. Another is confusing attributes with CSS properties — attributes like class and id are HTML-level hooks, not styling instructions themselves.`,
  },

  visual: { caption: 'An element\'s anatomy: opening tag, attributes, content, closing tag', type: 'element-anatomy-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'A basic element',
      explanation: `The simplest element: an opening tag, some text content, and a matching closing tag.`,
      code: `<p>Hello, world!</p>`,
      language: 'html', output: `Renders as a paragraph of text:\nHello, world!`,
    },
    {
      difficulty: 'easy', title: 'Attributes inside the opening tag',
      explanation: `Attributes provide extra information about an element. Here, class gives the element a name CSS/JavaScript can target, and id gives it a unique identifier.`,
      code: `<p class="intro" id="welcome-message">Welcome to the site!</p>`,
      language: 'html', output: `Renders as a paragraph with the text "Welcome to the site!",\nnow targetable via .intro (class) or #welcome-message (id).`,
    },
    {
      difficulty: 'medium', title: 'Nesting elements',
      explanation: `Elements can contain other elements, forming a tree. Here, a div contains a heading and a paragraph, demonstrating parent/child relationships.`,
      code: `<div class="card">\n  <h2>Product Name</h2>\n  <p>A short description goes here.</p>\n</div>`,
      language: 'html', output: `Renders a block containing a heading "Product Name"\nfollowed by a paragraph of description text.`,
    },
    {
      difficulty: 'medium-plus', title: 'Self-closing (void) elements',
      explanation: `Some elements never have content or a closing tag, like img and br — they're called "void elements." They still carry attributes, just no inner content.`,
      code: `<img src="photo.jpg" alt="A sunset over the ocean">\n<br>\n<input type="text" placeholder="Enter your name">`,
      language: 'html', output: `Renders an image (with alt text for accessibility),\na line break, and a text input field — none of these\nelements have a closing tag.`,
    },
    {
      difficulty: 'hard', title: 'Building a small structured component',
      explanation: `Real UI is built from several nested elements working together — here, a card combining an image, heading, paragraph, and button into one cohesive structure.`,
      code: `<article class="product-card">\n  <img src="shoe.jpg" alt="Running shoe, side view">\n  <h3>Trail Runner X2</h3>\n  <p>Lightweight and built for rough terrain.</p>\n  <button type="button">Add to cart</button>\n</article>`,
      language: 'html', output: `Renders a self-contained card: image, heading,\ndescription, and a clickable button — a pattern\nused constantly across real e-commerce sites.`,
    },
    {
      difficulty: 'real-world', title: 'Why malformed nesting breaks real pages',
      explanation: `Browsers try to recover from invalid HTML, but the result can be unpredictable — especially with deeply nested, malformed structures. Real teams use HTML validators and linters specifically to catch nesting mistakes before they ship.`,
      code: `<!-- Invalid: a <div> (block-level) nested inside a <p> -->\n<p>\n  Some text\n  <div>This div shouldn't be inside a paragraph</div>\n</p>\n\n<!-- Browsers often "fix" this by closing the <p> early,\n     which can produce layout you didn't intend. -->`,
      language: 'html', output: `Most browsers will silently close the <p> tag before\nthe <div>, then re-open a new (empty) paragraph after it —\nresulting in different structure than what was written.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Write a basic element', problem: `Write an HTML element that displays the text "My First Page" as a top-level heading (the most important heading on a page).`, hints: ['The most important heading tag is <h1>.'], solution: `<h1>My First Page</h1>` },
    { level: 2, title: 'Add attributes', problem: `Add a class attribute with the value "highlight" and an id attribute with the value "main-quote" to this element:\n\n<blockquote>Stay curious.</blockquote>`, hints: ['Attributes go inside the opening tag, before the closing >.'], solution: `<blockquote class="highlight" id="main-quote">Stay curious.</blockquote>` },
    { level: 3, title: 'Fix the nesting', problem: `Identify and fix the nesting problem in this snippet:\n\n<span>\n  <div>This is a block element inside an inline one</div>\n</span>`, hints: ['span is an inline element; div is a block-level element.', 'Block-level elements generally shouldn\'t be nested inside inline elements.'], solution: `<div>\n  <span>This is now correctly an inline element inside a block one</span>\n</div>\n\n// The fix swaps the nesting order: div (block-level) on the outside,\n// span (inline) on the inside — the structurally valid direction.` },
    { level: 4, title: 'Use a void element correctly', problem: `Add an image to this card with src="avatar.jpg" and appropriate alt text, placed before the heading:\n\n<div class="profile-card">\n  <h2>Ada Lovelace</h2>\n</div>`, hints: ['img is a void element — no closing tag needed.', 'alt text should describe the image content for accessibility.'], solution: `<div class="profile-card">\n  <img src="avatar.jpg" alt="Portrait of Ada Lovelace">\n  <h2>Ada Lovelace</h2>\n</div>` },
    { level: 5, title: 'Build a small structured component', problem: `Build a "notification" component: a div with class "notification" containing a paragraph with the message text and a button labeled "Dismiss".`, hints: ['Nest the paragraph and button inside the div.'], solution: `<div class="notification">\n  <p>Your changes have been saved.</p>\n  <button type="button">Dismiss</button>\n</div>` },
    { level: 6, title: 'Real-world: explain a rendering bug from bad nesting', problem: `A web page shows a button rendered outside of its intended card, even though the HTML source code clearly shows the button nested inside the card's closing div. Using what you know about element nesting and browser error recovery, give a plausible explanation.`, hints: ['Consider whether an earlier tag in the structure might have been left unclosed or improperly nested.', 'Browsers often silently "fix" invalid HTML by closing tags early.'], solution: `If an element somewhere earlier in the card's HTML was left unclosed, or a block-level element was incorrectly nested inside an inline one, the browser's error-recovery behavior may have closed that earlier element prematurely — effectively closing the surrounding card div earlier than the source code visually suggests. Once the card's div is closed early by the browser's auto-correction, any markup that "looks" nested inside it in the source (like the button) actually renders outside it in the resulting DOM. The fix is to find and correct the actual invalid nesting earlier in the markup, often using a validator to pinpoint exactly where.` },
  ],

  interview: [
    { q: 'What is the difference between an HTML element and an HTML tag?', a: `A tag is the markup syntax itself, like <p> or </p> — the opening or closing piece. An element is the complete unit: the opening tag, its content, and its closing tag together (or just a single tag for void elements like <img>). People often use the terms loosely interchangeably, but technically "element" refers to the whole thing.` },
    { q: 'What is the difference between an attribute and a CSS property?', a: `An attribute is part of the HTML markup itself, written inside the opening tag (like class="card" or src="photo.jpg") and provides metadata or configuration directly to the element. A CSS property (like color: blue;) is a styling instruction defined separately, in CSS, and applied to elements via selectors — attributes like class and id are commonly used as hooks for CSS selectors, but they aren't styling instructions themselves.` },
    { q: 'What is a "void element," and can you give two examples?', a: `A void element is one that can never have content or a closing tag, because it represents something self-contained — like an image or a line break. Examples include <img>, <br>, <input>, and <hr>.` },
    { q: 'Why does invalid HTML nesting sometimes cause unpredictable rendering instead of an outright error?', a: `Browsers are designed to be forgiving and attempt to recover from invalid HTML rather than refusing to render the page entirely, since the web has decades of imperfect markup that still needs to display something usable. This recovery process applies specific (but not always intuitive) rules for "fixing" invalid structures, like auto-closing tags early, which can produce a different DOM structure than the page's source code visually suggests.` },
    { q: 'Why is consistent, valid nesting important beyond just "looking right" in a browser?', a: `Beyond visual rendering, valid nesting matters for accessibility tools (like screen readers) that rely on a predictable document structure to describe the page to users, for CSS selectors that target elements based on their position in the tree, and for JavaScript code that walks or queries the DOM — all of which can behave unexpectedly if the actual rendered structure differs from what the markup appears to describe.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Search crawlers parse HTML element structure to understand page content and hierarchy, meaning poorly structured markup can directly affect how a page is interpreted for search ranking.' },
    { company: 'Amazon', text: 'Product pages are built from deeply nested, reusable HTML element structures (cards, galleries, reviews) maintained through component libraries to ensure consistency across millions of listings.' },
    { company: 'Netflix', text: 'The streaming interface\'s row-and-card layout is built from nested HTML elements designed to remain valid and predictable across many different browsers and TV-based devices.' },
    { company: 'Stripe', text: 'Embeddable checkout widgets are carefully built with minimal, valid HTML structure so they render consistently no matter what host website embeds them.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What is a "void element"?', options: ['An element with no attributes', 'An element that never has content or a closing tag', 'An invisible element', 'An element only used in forms'], correct: 1 },
    { type: 'true-false', q: 'Attributes are written inside the closing tag of an element.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which of these is a void element?', options: ['<div>', '<p>', '<img>', '<span>'], correct: 2 },
    { type: 'code-output', q: '<p class="note">Hello</p>\n\nWhat is the value of the class attribute?', options: ['"p"', '"Hello"', '"note"', 'There is no class attribute'], correct: 2 },
    { type: 'mcq', q: 'What commonly happens when HTML elements are nested invalidly?', options: ['The page always fails to load', 'The browser attempts to recover, sometimes producing unexpected structure', 'Nothing, browsers ignore nesting entirely', 'The CSS file becomes corrupted'], correct: 1 },
    { type: 'true-false', q: 'class and id attributes are styling instructions by themselves.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Why does alt text matter on an <img> element?', options: ['It changes the image\'s file size', 'It provides accessible, descriptive text for the image', 'It is required for the image to load', 'It only affects SEO, nothing else'], correct: 1 },
    { type: 'drag-drop', q: 'Order from outermost to innermost in this structure: <div><h2><span>Text</span></h2></div> — [div, h2, span]', options: ['div', 'h2', 'span'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might invalid nesting affect accessibility, not just visual appearance?', options: ['It never affects accessibility', 'Screen readers rely on a predictable document structure to describe pages', 'Accessibility tools ignore HTML entirely', 'It only affects print stylesheets'], correct: 1 },
    { type: 'code-output', q: '<input type="text" placeholder="Name">\n\nDoes this element require a closing tag?', options: ['Yes, always', 'No, input is a void element', 'Only in older browsers', 'Only if it has a value attribute'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'forms',
  module: 3,
  title: 'Forms',
  tagline: 'How web pages collect input from real people — text, choices, files, and submissions.',
  readMinutes: 8,

  intro: {
    whatItIs: `An HTML form (<form>) is a container for collecting user input through controls like text fields, checkboxes, radio buttons, dropdowns, and buttons, then submitting that data somewhere — typically to a server. Form controls use the <input>, <select>, <textarea>, and <button> elements, often paired with <label> for accessibility.`,
    whyItMatters: `Forms are how the web collects almost all user-generated data: sign-ups, search boxes, checkout flows, comments. Getting form structure right affects usability, accessibility, and whether browsers can offer helpful built-in behavior like autofill and validation.`,
    whereUsed: `Login pages, checkout flows, search bars, contact pages, surveys — virtually every interactive website includes at least one form.`,
    commonMistakes: `A very common mistake is omitting <label> elements or not properly associating them with their input (via the for attribute matching the input's id), which breaks accessibility and reduces clickable target size. Another is forgetting the name attribute on inputs, without which the form's data can't be correctly submitted or read on the server.`,
  },

  visual: { caption: 'A form\'s anatomy: labels, inputs, and a submission target', type: 'form-anatomy-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'A basic text input with a label',
      explanation: `label and input work together — clicking the label text focuses the associated input, which matters both for usability and accessibility.`,
      code: `<label for="username">Username</label>\n<input type="text" id="username" name="username">`,
      language: 'html', output: `Renders a text field with a clickable label.\nClicking "Username" focuses the input box.`,
    },
    {
      difficulty: 'easy', title: 'Different input types',
      explanation: `The type attribute changes both behavior and the on-screen keyboard/control shown — email validates format, and password masks characters.`,
      code: `<input type="email" name="email" placeholder="you@example.com">\n<input type="password" name="password" placeholder="Password">\n<input type="number" name="age" min="0" max="120">`,
      language: 'html', output: `Renders three distinct inputs: an email field (validated\nformat), a password field (masked characters), and a\nnumber field (restricted to 0-120, often with up/down arrows).`,
    },
    {
      difficulty: 'medium', title: 'Checkboxes, radio buttons, and select dropdowns',
      explanation: `Checkboxes allow multiple independent choices; radio buttons (sharing the same name) allow only one choice from a group; select provides a dropdown of options.`,
      code: `<label><input type="checkbox" name="newsletter"> Subscribe to newsletter</label>\n\n<input type="radio" name="plan" value="free" id="free"> <label for="free">Free</label>\n<input type="radio" name="plan" value="pro" id="pro"> <label for="pro">Pro</label>\n\n<select name="country">\n  <option value="us">United States</option>\n  <option value="uk">United Kingdom</option>\n</select>`,
      language: 'html', output: `Renders a checkbox, two mutually-exclusive radio buttons\n(only one of "Free"/"Pro" can be selected at a time since\nthey share the same name), and a country dropdown.`,
    },
    {
      difficulty: 'medium-plus', title: 'Required fields and basic validation',
      explanation: `The required attribute triggers built-in browser validation, preventing form submission until the field has a value — no JavaScript needed for this basic case.`,
      code: `<form>\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" required>\n  <button type="submit">Sign up</button>\n</form>`,
      language: 'html', output: `If submitted with an empty or invalid email field, the\nbrowser shows a built-in validation message and blocks\nsubmission, without any custom JavaScript.`,
    },
    {
      difficulty: 'hard', title: 'A complete, structured sign-up form',
      explanation: `Combining several form elements with proper labeling, grouping, and a submit action — closer to a real, production sign-up form.`,
      code: `<form action="/signup" method="POST">\n  <fieldset>\n    <legend>Create your account</legend>\n\n    <label for="name">Full name</label>\n    <input type="text" id="name" name="name" required>\n\n    <label for="email">Email</label>\n    <input type="email" id="email" name="email" required>\n\n    <label for="password">Password</label>\n    <input type="password" id="password" name="password" required minlength="8">\n\n    <label><input type="checkbox" name="terms" required> I agree to the terms</label>\n\n    <button type="submit">Create account</button>\n  </fieldset>\n</form>`,
      language: 'html', output: `Renders a grouped form (fieldset/legend) with name, email,\npassword fields, a required terms checkbox, and a submit\nbutton — submitting POSTs the data to "/signup".`,
    },
    {
      difficulty: 'real-world', title: 'Why checkout forms minimize required fields',
      explanation: `Real e-commerce checkout flows are carefully designed to ask for only what's strictly necessary, since every additional required form field measurably increases the chance a user abandons the purchase before completing it.`,
      code: `<!-- A deliberately minimal checkout form, asking only\n     for what's truly required to complete the purchase -->\n<form action="/checkout" method="POST">\n  <label for="card">Card number</label>\n  <input type="text" id="card" name="card" required inputmode="numeric">\n\n  <label for="zip">ZIP / Postal code</label>\n  <input type="text" id="zip" name="zip" required>\n\n  <button type="submit">Pay now</button>\n</form>`,
      language: 'html', output: `A minimal, focused form — every field included has a clear,\nnecessary purpose for completing payment, nothing extra\nthat might cause hesitation or abandonment.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Create a labeled input', problem: `Create a text input for a "City" field, with a properly associated label.`, hints: ['The label\'s for attribute must match the input\'s id.'], solution: `<label for="city">City</label>\n<input type="text" id="city" name="city">` },
    { level: 2, title: 'Choose the right input type', problem: `Which input type attribute would you use for: (a) a phone number field, (b) a date of birth field, (c) a search box?`, hints: ['HTML provides specific input types beyond plain text for many common cases.'], solution: `(a) type="tel" (b) type="date" (c) type="search". Using the specific type gives better mobile keyboards, built-in pickers (for date), and appropriate semantics/behavior for each case, compared to a generic type="text" for all three.` },
    { level: 3, title: 'Fix the unlabeled input', problem: `Fix the accessibility problem in this snippet:\n\n<p>Email</p>\n<input type="email" name="email">`, hints: ['A plain <p> next to an input is not programmatically associated with it.', 'Use a real <label> with a matching for/id pair.'], solution: `<label for="email">Email</label>\n<input type="email" id="email" name="email">\n\n// The fix replaces the plain paragraph with a real <label>,\n// properly associated to the input via matching for/id values\n// — this is what screen readers and click-to-focus behavior rely on.` },
    { level: 4, title: 'Group related radio buttons', problem: `Create three radio buttons for shipping speed options ("Standard", "Express", "Overnight") that are mutually exclusive, each with a proper label.`, hints: ['All three radio inputs need the SAME name attribute to be mutually exclusive.'], solution: `<input type="radio" name="shipping" value="standard" id="standard"> <label for="standard">Standard</label>\n<input type="radio" name="shipping" value="express" id="express"> <label for="express">Express</label>\n<input type="radio" name="shipping" value="overnight" id="overnight"> <label for="overnight">Overnight</label>` },
    { level: 5, title: 'Add built-in validation', problem: `Add appropriate validation attributes to this password field so it requires at least 8 characters and cannot be submitted empty:\n\n<input type="password" id="pwd" name="pwd">`, hints: ['Use the required and minlength attributes.'], solution: `<input type="password" id="pwd" name="pwd" required minlength="8">` },
    { level: 6, title: 'Real-world: redesign a high-abandonment form', problem: `A checkout form currently requires 12 fields including "company name" and "fax number" before a customer can complete a simple $20 purchase. Using what you know about real-world form design, identify what should be removed or made optional, and explain the business reasoning.`, hints: ['Distinguish fields that are truly necessary to process payment/shipping from "nice to have" data collection.', 'Every unnecessary required field is a potential point of abandonment.'], solution: `Fields like "company name" and "fax number" are very unlikely to be necessary for a simple consumer purchase and should be removed entirely or made explicitly optional (not required). Only fields genuinely necessary to process payment and delivery — card details, shipping address, contact email — should remain required. The business reasoning: every additional required field adds friction and a chance for the customer to hesitate, get confused, or abandon the purchase entirely; for a low-value, simple transaction, minimizing required fields directly protects conversion rate and revenue.` },
  ],

  interview: [
    { q: 'Why is associating a <label> with its input important, beyond just visual layout?', a: `Proper label association (via the for attribute matching the input\'s id) makes the relationship programmatically clear to assistive technology like screen readers, lets users click the label text to focus the input (improving usability and touch target size), and is a basic, expected accessibility requirement for any real form.` },
    { q: 'What is the difference between checkboxes and radio buttons?', a: `Checkboxes allow independent, multiple selections — each one can be checked or unchecked on its own. Radio buttons, when sharing the same name attribute, form a mutually exclusive group where only one option can be selected at a time.` },
    { q: 'What does the required attribute do, and what are its limits?', a: `required triggers the browser\'s built-in validation, preventing form submission (and showing a default validation message) if the field is empty. Its limits: the messaging and styling are browser-default and not very customizable, and it only checks presence (or basic type validity), not more complex business rules — those typically still need JavaScript or server-side validation.` },
    { q: 'Why do many real-world forms minimize the number of required fields?', a: `Extensive research on form design and conversion consistently shows that each additional required field increases the chance a user abandons the form before completing it, especially in commerce or sign-up flows where friction directly costs the business potential customers or revenue. Minimizing required fields to only what's truly necessary is a deliberate, data-driven design decision, not just a stylistic preference.` },
    { q: 'Why might client-side validation (like required or minlength) not be enough on its own?', a: `Client-side validation can be bypassed entirely (a user could disable JavaScript, or submit the form data directly via a script without going through the browser's HTML validation at all). Server-side validation is required as the real safeguard, since the server cannot trust that any data arriving from the client has actually passed the intended client-side checks.` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'Checkout forms are meticulously designed to minimize required fields and use appropriate input types (like inputmode for card numbers) specifically to reduce friction and improve completion rates for real payment flows.' },
    { company: 'Amazon', text: 'One-click and saved-address checkout flows exist specifically to reduce the number of form fields a returning customer needs to fill out, directly targeting the well-documented relationship between form length and abandonment.' },
    { company: 'Google', text: 'Sign-up and account forms across Google products use careful labeling and built-in validation attributes to maximize accessibility and usability across a massive, diverse user base.' },
    { company: 'Netflix', text: 'The sign-up flow splits a long form into multiple shorter steps rather than presenting every field at once, a common real-world technique for reducing perceived friction in form-heavy conversion flows.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What attribute associates a <label> with its input?', options: ['name', 'for (matching the input\'s id)', 'class', 'value'], correct: 1 },
    { type: 'true-false', q: 'Radio buttons with different name attributes are mutually exclusive with each other.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does the required attribute do?', options: ['Hides the field', 'Triggers built-in browser validation, blocking empty submission', 'Makes the field read-only', 'Changes the input type'], correct: 1 },
    { type: 'code-output', q: '<input type="radio" name="size" value="s">\n<input type="radio" name="size" value="m">\n\nCan both of these be selected at the same time?', options: ['Yes', 'No, they share the same name so only one can be selected', 'Only on mobile devices', 'Only if required is added'], correct: 1 },
    { type: 'mcq', q: 'Why might checkboxes be used instead of radio buttons?', options: ['When only one mutually exclusive choice is allowed', 'When multiple independent choices should be allowed', 'Checkboxes and radio buttons are identical', 'Checkboxes cannot have labels'], correct: 1 },
    { type: 'true-false', q: 'Client-side validation alone is sufficient and server-side validation is unnecessary.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Why do real checkout forms often minimize required fields?', options: ['To make the page load faster only', 'Because extra required fields increase the chance of cart/form abandonment', 'Browsers limit the number of fields allowed', 'It has no effect on completion rates'], correct: 1 },
    { type: 'drag-drop', q: 'Order a typical sign-up form\'s fields top to bottom: [Name, Email, Password, Submit button]', options: ['Name', 'Email', 'Password', 'Submit button'], correct: [0, 1, 2, 3] },
    { type: 'mcq', q: 'What is a key accessibility benefit of properly labeling form inputs?', options: ['Faster page load times', 'Screen readers can correctly describe and associate the input', 'It changes the input\'s color', 'It is purely cosmetic'], correct: 1 },
    { type: 'code-output', q: '<input type="email" required>\n\nIf this field is left empty and the form is submitted, what generally happens?', options: ['The form submits anyway', 'The browser blocks submission and shows a validation message', 'The page crashes', 'Nothing, required has no effect on email type'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'semantic-html',
  module: 3,
  title: 'Semantic HTML',
  tagline: 'Choosing tags that describe meaning, not just appearance — and why it matters more than it looks.',
  readMinutes: 7,

  intro: {
    whatItIs: `Semantic HTML means using elements that accurately describe the meaning and structure of content — <nav> for navigation, <article> for self-contained content, <button> for clickable actions — rather than relying on generic <div> and <span> elements for everything and styling them to "look like" the real thing.`,
    whyItMatters: `Semantic elements communicate structure to browsers, search engines, and assistive technology, not just to human eyes reading rendered pixels. A <button> is automatically keyboard-accessible and announced correctly by screen readers; a <div> styled to look like a button is not, unless you manually reimplement all that behavior yourself.`,
    whereUsed: `Page layout (header, nav, main, footer), content structure (article, section), and interactive elements (button, a) all benefit from semantic choices across virtually every website.`,
    commonMistakes: `A common mistake is "div soup" — building entire interfaces out of <div> and <span> elements styled to resemble buttons, headings, or navigation, without using the actual semantic elements that provide built-in behavior and meaning. Another is overusing <section> for every visual grouping, when a generic <div> (purely for styling, with no semantic meaning) is sometimes the more accurate choice.`,
  },

  visual: { caption: 'A page\'s semantic regions: header, nav, main, article, footer', type: 'semantic-regions-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'Semantic vs non-semantic button',
      explanation: `A real <button> comes with keyboard accessibility, focus behavior, and screen reader announcement built in. A styled <div> has none of that by default.`,
      code: `<!-- Semantic: works correctly out of the box -->\n<button type="button">Save changes</button>\n\n<!-- Non-semantic: looks like a button, but isn't one -->\n<div class="button-style">Save changes</div>`,
      language: 'html', output: `The <button> is focusable via Tab, activatable via\nEnter/Space, and announced as "button" by screen readers —\nall automatically. The <div> has none of this by default.`,
    },
    {
      difficulty: 'easy', title: 'Page layout regions',
      explanation: `header, nav, main, and footer describe the structural role of each section, rather than relying on generic divs with class names alone.`,
      code: `<header>\n  <h1>My Site</h1>\n  <nav>...</nav>\n</header>\n<main>\n  <p>Page content goes here.</p>\n</main>\n<footer>\n  <p>&copy; 2026 My Site</p>\n</footer>`,
      language: 'html', output: `Renders the same visually as divs would, but now\nassistive technology and browsers understand the actual\nROLE of each region, not just its visual position.`,
    },
    {
      difficulty: 'medium', title: 'article vs section vs div',
      explanation: `article is for self-contained content that could stand alone (like a blog post or news story). section groups related content with its own heading. div is purely a styling/structural container with no semantic meaning.`,
      code: `<article>\n  <h2>Breaking News: Local Team Wins Championship</h2>\n  <p>The story content goes here...</p>\n</article>\n\n<section>\n  <h3>Related Articles</h3>\n  <div class="card-grid">...</div>\n</section>`,
      language: 'html', output: `article marks the self-contained news story; section\ngroups the related-articles area under its own heading;\ndiv is just a styling wrapper for the grid layout, with\nno semantic meaning of its own — which is the correct choice here.`,
    },
    {
      difficulty: 'medium-plus', title: 'Using <a> correctly vs a styled div',
      explanation: `<a> with an href provides real navigation: keyboard accessibility, right-click "open in new tab," and correct screen reader announcement. JavaScript click handlers on a div can superficially mimic the visual behavior but miss all of this by default.`,
      code: `<!-- Correct: real navigation, fully accessible -->\n<a href="/pricing">View pricing</a>\n\n<!-- Problematic: requires JavaScript to even work,\n     and lacks built-in keyboard/accessibility support -->\n<div onclick="location.href='/pricing'">View pricing</div>`,
      language: 'html', output: `The <a> works even with JavaScript disabled, supports\nright-click "open in new tab," and is correctly announced\nas a link. The div-based version has none of these by default.`,
    },
    {
      difficulty: 'hard', title: 'A fully semantic blog post structure',
      explanation: `Combining time, article, header, and footer elements to build a structure that clearly communicates meaning at every level, not just visual layout.`,
      code: `<article>\n  <header>\n    <h2>Understanding Semantic HTML</h2>\n    <p>By Ada Lovelace · <time datetime="2026-06-01">June 1, 2026</time></p>\n  </header>\n  <p>Semantic HTML improves accessibility and clarity...</p>\n  <footer>\n    <p>Tags: <a href="/tags/html">HTML</a>, <a href="/tags/accessibility">Accessibility</a></p>\n  </footer>\n</article>`,
      language: 'html', output: `Every part of this structure has explicit meaning: the\narticle's own header/footer (distinct from the page's),\nand a machine-readable <time> element with a real datetime\nvalue, not just human-readable text.`,
    },
    {
      difficulty: 'real-world', title: 'Why "div soup" causes real accessibility lawsuits',
      explanation: `Companies have faced real legal action over inaccessible websites built almost entirely from non-semantic divs with no keyboard support or screen reader compatibility — semantic HTML is a major, low-cost part of avoiding this risk.`,
      code: `<!-- Inaccessible: a fake "button" with no keyboard\n     support, no focus state, and no screen reader announcement -->\n<div class="btn" onclick="submitForm()">Submit</div>\n\n<!-- Accessible by default: real button, real behavior -->\n<button type="submit">Submit</button>`,
      language: 'html', output: `The semantic <button> version requires zero extra code\nto be keyboard-operable and correctly announced — switching\nfrom the div version to this single change meaningfully\nimproves real-world accessibility compliance.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Replace a div-button with a real button', problem: `Convert this non-semantic clickable div into a proper semantic element:\n\n<div class="btn" onclick="doSomething()">Click me</div>`, hints: ['Use the real <button> element instead.'], solution: `<button type="button" onclick="doSomething()">Click me</button>` },
    { level: 2, title: 'Choose article vs section vs div', problem: `For each, choose the most appropriate element — article, section, or div: (a) a single self-contained blog post, (b) a "Top Picks" grouping with its own heading, (c) a purely visual wrapper used only for a CSS grid layout.`, hints: ['Self-contained, standalone content suggests article.', 'Grouped content with its own heading suggests section.', 'Purely visual/structural with no semantic meaning suggests div.'], solution: `(a) <article> — a standalone blog post makes sense on its own. (b) <section> — a thematically grouped area with its own heading ("Top Picks"). (c) <div> — purely a styling/layout container with no semantic meaning of its own.` },
    { level: 3, title: 'Fix a fake link', problem: `Fix this non-semantic, JavaScript-dependent "link" so it works correctly even without JavaScript and is properly accessible:\n\n<span onclick="location.href='/about'">About us</span>`, hints: ['Use a real <a> element with an href attribute.'], solution: `<a href="/about">About us</a>\n\n// This now works even with JavaScript disabled, supports\n// right-click "open in new tab," and is correctly announced\n// to screen readers as a link — none of which the span\n// version provided.` },
    { level: 4, title: 'Mark up a page\'s major regions', problem: `Using semantic elements, structure a basic page with: a header containing a site title, a nav for the main menu, a main content area, and a footer with copyright text.`, hints: ['Use header, nav, main, and footer for these four regions respectively.'], solution: `<header>\n  <h1>My Site</h1>\n  <nav>\n    <a href="/">Home</a>\n    <a href="/about">About</a>\n  </nav>\n</header>\n<main>\n  <p>Main page content goes here.</p>\n</main>\n<footer>\n  <p>&copy; 2026 My Site</p>\n</footer>` },
    { level: 5, title: 'Add a machine-readable date', problem: `This blog post shows a human-readable date but isn't machine-readable. Fix it using the appropriate semantic element:\n\n<p>Published: June 1, 2026</p>`, hints: ['Use the <time> element with a datetime attribute.'], solution: `<p>Published: <time datetime="2026-06-01">June 1, 2026</time></p>` },
    { level: 6, title: 'Real-world: audit a page for "div soup"', problem: `A page uses <div class="header">, <div class="nav-link" onclick="...">, and <div class="submit-btn" onclick="...">. Rewrite all three using proper semantic elements, and explain the accessibility risk of leaving them as divs in a real production product.`, hints: ['Map each div to its real semantic equivalent: header, a (with href), button.'], solution: `<header>...</header>\n<a href="/page">Nav link text</a>\n<button type="submit">Submit</button>\n\n// The accessibility risk of leaving these as divs: none of them would be\n// keyboard-operable, properly focusable, or correctly announced by screen\n// readers by default — a keyboard-only or screen-reader-dependent user could\n// be entirely unable to navigate the site or submit the form. In many\n// jurisdictions, this kind of inaccessibility has led to real legal\n// complaints and lawsuits against companies, in addition to simply excluding\n// real users from being able to use the product at all.` },
  ],

  interview: [
    { q: 'What is "semantic HTML," and why does it matter beyond visual appearance?', a: `Semantic HTML means choosing elements that accurately describe the meaning and role of content (nav, article, button) rather than relying on generic divs styled to look similar. It matters because semantic elements communicate structure to browsers, search engines, and assistive technologies like screen readers — not just to a sighted human looking at rendered pixels.` },
    { q: 'What is "div soup," and why is it considered a problem?', a: `"Div soup" describes a page built almost entirely out of generic <div> and <span> elements, styled with CSS and wired up with JavaScript to mimic the appearance of buttons, links, and navigation, instead of using the real semantic elements. It's a problem because it typically loses built-in accessibility behavior (keyboard support, focus states, screen reader announcements) that real semantic elements provide automatically, and often increases the amount of custom code needed to reimplement that behavior.` },
    { q: 'What is the practical difference between <article> and <section>?', a: `<article> represents self-contained content that would make sense on its own, independent of the rest of the page — like a blog post, news story, or forum post. <section> groups related content together, typically with its own heading, but isn't necessarily meant to stand entirely alone the way an article is.` },
    { q: 'Why is using a real <button> better than a styled, clickable <div> with an onclick handler?', a: `A real <button> is automatically focusable via keyboard (Tab), activatable via Enter or Space, and correctly announced as a button by screen readers — all without any extra code. A div with onclick provides none of this by default; replicating that behavior manually requires significant additional ARIA attributes and JavaScript, and is easy to get subtly wrong.` },
    { q: 'How does semantic HTML relate to SEO, separate from accessibility?', a: `Search engines use HTML structure to understand a page's content and hierarchy — properly used heading levels, article/section boundaries, and navigation landmarks help search engines parse what a page is actually about, which can influence indexing and ranking, separate from (though often complementary to) the accessibility benefits semantic HTML also provides.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Search algorithms parse semantic HTML structure to understand page content and hierarchy, making proper use of headings, articles, and navigation landmarks a practical factor in how well a page is understood and indexed.' },
    { company: 'Amazon', text: 'Has faced real accessibility-related legal scrutiny over inaccessible interface elements, reinforcing why large e-commerce platforms invest heavily in semantic, accessible markup across their product pages.' },
    { company: 'Netflix', text: 'Builds interactive carousels and navigation using semantic landmarks and real interactive elements specifically so the platform remains usable via keyboard and assistive technology across many device types, including TVs.' },
    { company: 'Stripe', text: 'Documentation and embeddable UI components are built with deliberate, semantic markup so third-party developers inherit good accessibility behavior by default when embedding Stripe\'s elements into their own sites.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does "semantic HTML" mean?', options: ['Using only <div> elements', 'Choosing elements that accurately describe content meaning and structure', 'Writing HTML in all lowercase', 'Using inline CSS styles'], correct: 1 },
    { type: 'true-false', q: 'A <div> styled to look like a button automatically gets keyboard accessibility and screen reader support.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is "div soup"?', options: ['A CSS framework', 'A page built almost entirely from generic divs instead of semantic elements', 'A type of HTML validator', 'A JavaScript error'], correct: 1 },
    { type: 'code-output', q: '<a href="/about">About</a>\n\nDoes this link work if JavaScript is disabled in the browser?', options: ['No, links require JavaScript', 'Yes, real <a> links work without JavaScript', 'Only in Chrome', 'Only if onclick is added'], correct: 1 },
    { type: 'mcq', q: 'What is the difference between <article> and <section>?', options: ['No real difference', 'article is self-contained standalone content; section groups related content', 'section is only for forms', 'article cannot contain headings'], correct: 1 },
    { type: 'true-false', q: 'Semantic HTML can influence both accessibility and SEO.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why is a real <button> preferred over a clickable styled <div>?', options: ['Buttons load faster', 'Buttons get keyboard accessibility and screen reader support automatically', 'Divs cannot have CSS applied', 'There is no real difference'], correct: 1 },
    { type: 'drag-drop', q: 'Order from most semantic to least semantic for marking up a clickable action: [<button>, <div onclick>, <span onclick>]', options: ['<button>', '<div onclick>', '<span onclick>'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What does the <time datetime="..."> element provide that plain text does not?', options: ['Faster page loading', 'A machine-readable date value alongside human-readable text', 'Automatic translation', 'Built-in countdown timers'], correct: 1 },
    { type: 'code-output', q: '<div class="btn" onclick="submit()">Submit</div>\n\nWhat accessibility feature is MISSING by default compared to a real <button>?', options: ['Visual styling', 'Keyboard focus and activation support', 'The ability to have a CSS class', 'The ability to contain text'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'accessibility',
  module: 3,
  title: 'Accessibility',
  tagline: 'Building pages that work for everyone, including people using screen readers, keyboards, and assistive technology.',
  readMinutes: 8,

  intro: {
    whatItIs: `Web accessibility (often abbreviated a11y) means designing and building websites so people with disabilities — visual, auditory, motor, or cognitive — can perceive, navigate, and interact with them. This includes proper semantic HTML, sufficient color contrast, keyboard navigability, and ARIA attributes when semantic HTML alone isn't enough.`,
    whyItMatters: `Accessibility isn't a niche edge case — it affects a significant percentage of all users, and many accessibility improvements (clear structure, good contrast, keyboard support) measurably improve usability for everyone, not just people using assistive technology. It's also a legal requirement in many jurisdictions for many types of websites.`,
    whereUsed: `Every public-facing website ideally needs accessibility consideration, but it's especially critical for government services, e-commerce, healthcare, banking, and education — anywhere people genuinely cannot afford to be excluded from using the service.`,
    commonMistakes: `A common mistake is treating accessibility as something to "add at the end" via an automated overlay widget, rather than building it in from the start through correct semantic HTML. Another is adding ARIA attributes incorrectly or unnecessarily — when proper native HTML elements already provide the needed behavior, adding redundant or conflicting ARIA can make things worse, not better.`,
  },

  visual: { caption: 'How different users navigate the same page differently', type: 'accessibility-navigation-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'Alt text for images',
      explanation: `alt text describes an image's content or purpose for users who can't see it — read aloud by screen readers, and shown if the image fails to load.`,
      code: `<img src="chart.png" alt="Bar chart showing sales growth of 40% in Q2 2026">`,
      language: 'html', output: `A screen reader announces the full description.\nIf the image fails to load, this text displays instead.`,
    },
    {
      difficulty: 'easy', title: 'Sufficient color contrast',
      explanation: `Text needs enough contrast against its background to be readable by users with low vision or color blindness — this is a CSS concern with direct accessibility impact.`,
      code: `/* Poor contrast: light gray text on a white background */\n.low-contrast { color: #ccc; background: #fff; }\n\n/* Good contrast: meets WCAG AA guidelines for normal text */\n.good-contrast { color: #333; background: #fff; }`,
      language: 'css', output: `The low-contrast version may be unreadable for many users\nwith low vision; the good-contrast version meets widely\nrecognized accessibility guidelines (WCAG AA, ~4.5:1 ratio).`,
    },
    {
      difficulty: 'medium', title: 'Keyboard navigability',
      explanation: `Interactive elements need to be reachable and operable via keyboard alone (Tab to move focus, Enter/Space to activate) — native elements like button and a provide this automatically.`,
      code: `<!-- Naturally keyboard-accessible -->\n<button type="button">Open menu</button>\n<a href="/settings">Settings</a>\n\n<!-- NOT keyboard-accessible without extra work -->\n<div onclick="openMenu()">Open menu</div>`,
      language: 'html', output: `Tab key moves focus between the button and link\nnaturally; Enter activates them. The div would be\nentirely skipped by keyboard navigation by default.`,
    },
    {
      difficulty: 'medium-plus', title: 'ARIA labels for icon-only buttons',
      explanation: `When a button only contains an icon (no visible text), aria-label provides the accessible name a screen reader needs, since there's no text content to read.`,
      code: `<!-- Without aria-label, a screen reader has nothing\n     meaningful to announce for this icon-only button -->\n<button type="button">\n  <svg aria-hidden="true">...</svg>\n</button>\n\n<!-- Fixed with aria-label -->\n<button type="button" aria-label="Close dialog">\n  <svg aria-hidden="true">...</svg>\n</button>`,
      language: 'html', output: `The first button announces nothing useful to a screen\nreader (just "button"). The second correctly announces\n"Close dialog, button".`,
    },
    {
      difficulty: 'hard', title: 'A focus-visible skip link',
      explanation: `A "skip to main content" link lets keyboard users bypass repetitive navigation, jumping straight to the page's main content — a small addition with a large usability impact for keyboard-only users.`,
      code: `<a class="skip-link" href="#main-content">Skip to main content</a>\n<nav>\n  <!-- Long navigation menu with many links -->\n</nav>\n<main id="main-content">\n  <!-- Actual page content starts here -->\n</main>`,
      language: 'html', output: `A keyboard user can press Tab once, see "Skip to main\ncontent" appear, and press Enter to jump straight past\nthe entire navigation menu — instead of tabbing through\nevery single nav link first.`,
    },
    {
      difficulty: 'real-world', title: 'Why accessible error messages matter in real forms',
      explanation: `Real forms need to associate error messages with their specific fields in a way assistive technology can announce, not just visually display the error in red text near the field.`,
      code: `<label for="email">Email</label>\n<input type="email" id="email" name="email"\n  aria-describedby="email-error" aria-invalid="true">\n<p id="email-error" role="alert">Please enter a valid email address.</p>`,
      language: 'html', output: `A screen reader announces the error message in connection\nwith the email field, not just as disconnected red text\nthat a sighted user would notice but a screen reader user\nmight miss entirely.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Write meaningful alt text', problem: `Write appropriate alt text for an image showing a red "Sold Out" badge on a product photo.`, hints: ['Describe the meaning/purpose, not just literally "image of a badge".'], solution: `<img src="sold-out-badge.png" alt="Sold out">\n\n// Good alt text describes the meaningful information being conveyed\n// (that the product is sold out), not a literal, unhelpful description\n// like "red badge image."` },
    { level: 2, title: 'Identify a contrast problem', problem: `Which of these color pairs likely has insufficient contrast for body text: (a) #000000 text on #FFFFFF background, (b) #DDDDDD text on #FFFFFF background?`, hints: ['Very light gray on white tends to have very low contrast.'], solution: `(b) #DDDDDD (very light gray) text on a #FFFFFF (white) background almost certainly has insufficient contrast for most users — the colors are too close to each other. (a) pure black on white has maximum contrast and is safe.` },
    { level: 3, title: 'Fix a keyboard-inaccessible control', problem: `Fix this so it is keyboard-accessible without needing extra custom JavaScript for focus/activation:\n\n<div onclick="toggleMenu()">Menu</div>`, hints: ['Use a real <button> element instead of a div with onclick.'], solution: `<button type="button" onclick="toggleMenu()">Menu</button>\n\n// A real <button> is automatically focusable via Tab and\n// activatable via Enter/Space, with zero additional code needed.` },
    { level: 4, title: 'Add an aria-label to an icon button', problem: `Add an appropriate aria-label to this icon-only button so screen readers announce its purpose:\n\n<button type="button"><svg>...</svg></button>`, hints: ['Describe what the button DOES, not what the icon looks like.'], solution: `<button type="button" aria-label="Add to favorites"><svg>...</svg></button>` },
    { level: 5, title: 'Associate an error message with its field', problem: `Connect this error message to its input so assistive technology announces it correctly:\n\n<label for="pwd">Password</label>\n<input type="password" id="pwd" name="pwd">\n<p>Password must be at least 8 characters.</p>`, hints: ['Use aria-describedby on the input, pointing to the error message\'s id.'], solution: `<label for="pwd">Password</label>\n<input type="password" id="pwd" name="pwd" aria-describedby="pwd-hint">\n<p id="pwd-hint">Password must be at least 8 characters.</p>` },
    { level: 6, title: 'Real-world: audit a checkout form for accessibility', problem: `A checkout form uses unlabeled inputs (placeholder text only, no <label>), a div-based "Place order" button, and shows validation errors only as red border colors with no text. List the three accessibility problems and the fix for each.`, hints: ['Placeholder text is not a substitute for a real label.', 'Div-based buttons lack keyboard support.', 'Color-only error indication is invisible to screen readers and color-blind users.'], solution: `Problem 1: Placeholder-only inputs have no real accessible label — screen readers may not announce the field's purpose once the user starts typing (since placeholder text often disappears). Fix: add real <label> elements properly associated via for/id.\n\nProblem 2: The div-based "Place order" control is not natively keyboard-accessible. Fix: replace it with a real <button type="submit">.\n\nProblem 3: Red-border-only error indication conveys nothing to screen reader users and may be hard to perceive for color-blind users. Fix: add visible text error messages, connected to their fields via aria-describedby, not just a color change.` },
  ],

  interview: [
    { q: 'What is web accessibility, and why does it matter for a business, not just ethically?', a: `Web accessibility means building sites usable by people with visual, auditory, motor, or cognitive disabilities. Beyond the ethical and often legal obligation, it matters for business because it expands the addressable user base, frequently improves usability for all users (not just those using assistive technology), and reduces legal risk in jurisdictions with accessibility requirements for digital services.` },
    { q: 'What is the relationship between semantic HTML and accessibility?', a: `Semantic HTML is one of the most effective and lowest-cost ways to achieve good accessibility, since elements like button, a, nav, and header come with appropriate keyboard behavior, focus management, and screen reader announcements built in by default — accessibility "for free," compared to manually reimplementing that behavior on generic, non-semantic elements.` },
    { q: 'When should you use ARIA attributes, and when should you avoid them?', a: `ARIA attributes should be used to fill gaps where semantic HTML alone doesn't convey enough information — like aria-label on an icon-only button, or aria-describedby connecting an error message to a field. They should generally be avoided when a native HTML element already provides the needed semantics and behavior, since redundant or conflicting ARIA can sometimes make accessibility worse, not better — the common guidance is "no ARIA is better than bad ARIA."` },
    { q: 'Why is color contrast an accessibility concern, and which guideline is commonly referenced?', a: `Low contrast between text and its background can make content difficult or impossible to read for users with low vision or certain types of color blindness. WCAG (Web Content Accessibility Guidelines) is the commonly referenced standard, with WCAG AA generally requiring a contrast ratio of at least 4.5:1 for normal body text.` },
    { q: 'What is a "skip link," and what problem does it solve?', a: `A skip link is typically a hidden-until-focused link near the top of a page that lets keyboard users jump directly to the main content, bypassing repetitive navigation menus. It solves the real usability problem of keyboard-only users otherwise having to tab through every navigation link on every single page load before reaching the actual content they came for.` },
  ],

  realWorld: [
    { company: 'Amazon', text: 'Has faced real legal complaints regarding website accessibility, which has contributed to substantial, ongoing investment in accessible checkout, navigation, and product page design across the platform.' },
    { company: 'Google', text: 'Maintains and publishes extensive accessibility guidelines and tooling (like Lighthouse accessibility audits) used widely across the industry to help teams identify and fix accessibility issues during development.' },
    { company: 'Netflix', text: 'Designs its TV and remote-control interfaces with strict keyboard/remote navigability requirements, since pointer-based interaction (a mouse) is not available at all on that platform, making true keyboard-equivalent accessibility a core functional requirement, not an enhancement.' },
    { company: 'Stripe', text: 'Publishes accessibility-focused documentation and design guidance for its embeddable payment components, recognizing that an inaccessible checkout flow can directly prevent some customers from completing a purchase at all.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does alt text on an image provide?', options: ['A larger image size', 'A text description read by screen readers / shown if the image fails', 'A required CSS class', 'Faster page loading'], correct: 1 },
    { type: 'true-false', q: 'Generic divs with onclick handlers are automatically keyboard-accessible.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What guideline is commonly referenced for color contrast requirements?', options: ['HTML5 spec', 'WCAG', 'JSON schema', 'CSS Grid spec'], correct: 1 },
    { type: 'code-output', q: '<button aria-label="Close dialog"><svg>...</svg></button>\n\nWhat does a screen reader announce for this button?', options: ['Nothing at all', '"Close dialog, button"', 'The raw SVG code', 'Just "button" with no label'], correct: 1 },
    { type: 'mcq', q: 'What is the common guidance regarding ARIA usage?', options: ['Always add ARIA to every element', 'No ARIA is better than bad ARIA', 'ARIA replaces the need for semantic HTML', 'ARIA only works in Chrome'], correct: 1 },
    { type: 'true-false', q: 'A skip link lets keyboard users bypass repetitive navigation and jump to main content.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why is using real semantic elements (button, a) considered an accessibility best practice?', options: ['They render faster', 'They come with built-in keyboard support and screen reader announcements', 'They are required by HTML5 syntax rules', 'They have no real benefit'], correct: 1 },
    { type: 'drag-drop', q: 'Order from least to most accessible for a clickable action: [div with onclick only, div with onclick and full custom ARIA/keyboard support, native button element]', options: ['div with onclick only', 'div with onclick and full custom ARIA/keyboard support', 'native button element'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why is showing form errors only via a red border insufficient?', options: ['Red borders are not allowed in CSS', 'Color-only indication is invisible to screen readers and hard to perceive for color-blind users', 'It is actually a great approach with no issues', 'Browsers block red-colored borders'], correct: 1 },
    { type: 'code-output', q: '<input id="email" aria-describedby="err">\n<p id="err">Invalid email</p>\n\nWhat is the purpose of aria-describedby here?', options: ['It styles the input red', 'It connects the error message to the input for assistive technology', 'It validates the email format automatically', 'It has no real effect'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'tables',
  module: 3,
  title: 'Tables',
  tagline: 'Displaying genuinely tabular data — rows, columns, and the structure that makes it readable by everyone.',
  readMinutes: 6,

  intro: {
    whatItIs: `An HTML table (<table>) displays data organized into rows and columns, built from <tr> (table row), <th> (header cell), and <td> (data cell) elements, often grouped using <thead>, <tbody>, and <tfoot> for clearer structure.`,
    whyItMatters: `Tables remain the correct, accessible way to present genuinely tabular data — pricing comparisons, schedules, financial reports, spreadsheet-like data. Used correctly, they let assistive technology announce row/column relationships; used incorrectly (for page layout, a now-outdated practice), they cause real accessibility and maintenance problems.`,
    whereUsed: `Pricing comparison pages, data dashboards, financial statements, sports statistics, schedules, and any other genuinely row-and-column data.`,
    commonMistakes: `A common modern mistake is avoiding tables entirely (even for genuinely tabular data) in favor of divs styled to look like a grid — this loses the built-in semantic row/column relationships that screen readers rely on to announce table data correctly. An older, now-discouraged mistake is using tables purely for visual page layout, which was common in the early web but is considered bad practice today.`,
  },

  visual: { caption: 'A table\'s structure: header row, body rows, columns', type: 'table-structure-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'A basic table',
      explanation: `tr defines a row; th defines a header cell (bold, semantically marked as a header); td defines a regular data cell.`,
      code: `<table>\n  <tr>\n    <th>Name</th>\n    <th>Score</th>\n  </tr>\n  <tr>\n    <td>Ada</td>\n    <td>92</td>\n  </tr>\n</table>`,
      language: 'html', output: `Renders a simple 2x2 grid: a header row ("Name", "Score")\nfollowed by one data row ("Ada", "92").`,
    },
    {
      difficulty: 'easy', title: 'Multiple data rows',
      explanation: `Adding more <tr> elements adds more rows; the same column structure applies to each.`,
      code: `<table>\n  <tr><th>Name</th><th>Score</th></tr>\n  <tr><td>Ada</td><td>92</td></tr>\n  <tr><td>Grace</td><td>88</td></tr>\n  <tr><td>Linus</td><td>95</td></tr>\n</table>`,
      language: 'html', output: `Renders a table with one header row and three data rows,\neach following the same two-column structure.`,
    },
    {
      difficulty: 'medium', title: 'Structuring with thead, tbody, tfoot',
      explanation: `Grouping rows into thead (header), tbody (main content), and tfoot (summary/footer) clarifies the table's structure both visually and for assistive technology.`,
      code: `<table>\n  <thead>\n    <tr><th>Item</th><th>Price</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Coffee</td><td>$4.50</td></tr>\n    <tr><td>Pastry</td><td>$3.25</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td>Total</td><td>$7.75</td></tr>\n  </tfoot>\n</table>`,
      language: 'html', output: `Renders the same visual table, but now with explicit\nsemantic grouping: header section, body section, and a\nfooter section for the total — useful for both styling\nhooks and assistive technology.`,
    },
    {
      difficulty: 'medium-plus', title: 'Associating headers with scope',
      explanation: `The scope attribute on a <th> clarifies whether it's a header for a column or a row, which matters for screen readers correctly announcing complex tables.`,
      code: `<table>\n  <tr>\n    <th scope="col">Product</th>\n    <th scope="col">Q1</th>\n    <th scope="col">Q2</th>\n  </tr>\n  <tr>\n    <th scope="row">Widgets</th>\n    <td>120</td>\n    <td>150</td>\n  </tr>\n</table>`,
      language: 'html', output: `A screen reader can now correctly announce, for the cell\ncontaining "150": "Q2, Widgets, 150" — understanding both\nthe column AND row header that cell belongs to.`,
    },
    {
      difficulty: 'hard', title: 'Merging cells with colspan and rowspan',
      explanation: `colspan merges a cell across multiple columns; rowspan merges across multiple rows — useful for grouped headers or repeated values, but should be used carefully to avoid confusing the table's structure.`,
      code: `<table>\n  <tr>\n    <th colspan="2">Contact Info</th>\n  </tr>\n  <tr>\n    <td>Email</td>\n    <td>ada@example.com</td>\n  </tr>\n  <tr>\n    <td>Phone</td>\n    <td>555-0100</td>\n  </tr>\n</table>`,
      language: 'html', output: `"Contact Info" spans across both columns as a single\nmerged header cell, visually grouping the email and phone\nrows beneath it.`,
    },
    {
      difficulty: 'real-world', title: 'Why pricing comparison tables use real <table> markup',
      explanation: `Real SaaS pricing pages use genuine table markup (not divs styled to look like a grid) so screen reader users can correctly navigate and compare plan features cell by cell, row by row.`,
      code: `<table>\n  <caption>Plan comparison</caption>\n  <tr>\n    <th scope="col">Feature</th>\n    <th scope="col">Free</th>\n    <th scope="col">Pro</th>\n  </tr>\n  <tr>\n    <th scope="row">Storage</th>\n    <td>5GB</td>\n    <td>500GB</td>\n  </tr>\n  <tr>\n    <th scope="row">Support</th>\n    <td>Community</td>\n    <td>24/7 priority</td>\n  </tr>\n</table>`,
      language: 'html', output: `A screen reader user navigating this table can move\ncell by cell and hear both the row header ("Storage")\nand column header ("Pro") for full context — comparing\nplans accurately without needing to see the visual grid.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Build a basic table', problem: `Create a table with a header row ("Day", "Temperature") and two data rows of your choice.`, hints: ['Use th for the header row, td for data rows.'], solution: `<table>\n  <tr><th>Day</th><th>Temperature</th></tr>\n  <tr><td>Monday</td><td>72°F</td></tr>\n  <tr><td>Tuesday</td><td>68°F</td></tr>\n</table>` },
    { level: 2, title: 'Add thead/tbody structure', problem: `Restructure this table to use thead and tbody appropriately:\n\n<table>\n  <tr><th>Item</th><th>Qty</th></tr>\n  <tr><td>Pens</td><td>10</td></tr>\n</table>`, hints: ['Wrap the header row in thead, the data rows in tbody.'], solution: `<table>\n  <thead>\n    <tr><th>Item</th><th>Qty</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Pens</td><td>10</td></tr>\n  </tbody>\n</table>` },
    { level: 3, title: 'Add scope to header cells', problem: `Add the appropriate scope attribute to each <th> in this table to clarify column vs row headers:\n\n<table>\n  <tr><th>Product</th><th>Jan</th><th>Feb</th></tr>\n  <tr><th>Widgets</th><td>10</td><td>15</td></tr>\n</table>`, hints: ['The first row\'s headers describe columns; "Widgets" describes its row.'], solution: `<table>\n  <tr><th scope="col">Product</th><th scope="col">Jan</th><th scope="col">Feb</th></tr>\n  <tr><th scope="row">Widgets</th><td>10</td><td>15</td></tr>\n</table>` },
    { level: 4, title: 'Merge a header with colspan', problem: `Merge a single header cell with the text "2026 Sales" across 3 columns, above individual "Jan", "Feb", "Mar" column headers.`, hints: ['Use colspan="3" on the merged header cell.'], solution: `<table>\n  <tr><th colspan="3">2026 Sales</th></tr>\n  <tr><th scope="col">Jan</th><th scope="col">Feb</th><th scope="col">Mar</th></tr>\n</table>` },
    { level: 5, title: 'Add a caption', problem: `Add an appropriate <caption> to this table describing its content as "Monthly expense breakdown":\n\n<table>\n  <tr><th>Category</th><th>Amount</th></tr>\n  <tr><td>Rent</td><td>$1200</td></tr>\n</table>`, hints: ['caption should be the first child inside <table>.'], solution: `<table>\n  <caption>Monthly expense breakdown</caption>\n  <tr><th>Category</th><th>Amount</th></tr>\n  <tr><td>Rent</td><td>$1200</td></tr>\n</table>` },
    { level: 6, title: 'Real-world: fix a div-based pricing table', problem: `A pricing comparison page is built entirely from divs and CSS grid to visually resemble a table, with no real <table> markup at all. Rewrite it conceptually using real table elements with proper scope attributes, and explain the accessibility cost of the original div-based approach.`, hints: ['Map visual rows/columns to real tr/th/td structure with scope attributes.'], solution: `<table>\n  <caption>Plan comparison</caption>\n  <tr>\n    <th scope="col">Feature</th>\n    <th scope="col">Free</th>\n    <th scope="col">Pro</th>\n  </tr>\n  <tr>\n    <th scope="row">Storage</th>\n    <td>5GB</td>\n    <td>500GB</td>\n  </tr>\n</table>\n\n// The accessibility cost of the original div-based grid: screen readers\n// have no way to understand that cells are related as rows and columns —\n// a user navigating cell by cell would hear isolated values with no\n// header context ("500GB" with no indication this means "Pro plan storage"),\n// making it very difficult to actually compare the plans by listening alone.` },
  ],

  interview: [
    { q: 'When should you use an HTML table, and when should you avoid one?', a: `Use a table when the content is genuinely tabular — data that has a real row/column relationship, like a schedule, pricing comparison, or financial report. Avoid using tables purely for visual page layout (positioning unrelated content into a grid shape), which was common in the early web but is considered bad practice today since it confuses the document's actual structure and accessibility.` },
    { q: 'What is the difference between <th> and <td>?', a: `<th> represents a header cell — typically bold by default and semantically marked as a header for a row or column, important for assistive technology. <td> represents a regular data cell containing the actual content, without that header semantic.` },
    { q: 'What does the scope attribute on a <th> do, and why does it matter?', a: `scope (with a value like "col" or "row") clarifies whether a header cell describes an entire column or an entire row. It matters because in tables with both row and column headers, this disambiguation lets screen readers correctly announce both relevant headers when a user navigates to a specific data cell, rather than guessing or announcing nothing useful.` },
    { q: 'What do colspan and rowspan do?', a: `colspan makes a single cell span across multiple columns; rowspan makes a single cell span across multiple rows. They're used for grouped headers or cells that logically apply to more than one row/column, but should be used carefully since overly complex merged structures can become difficult for assistive technology (and humans) to interpret correctly.` },
    { q: 'Why is using divs styled to look like a table considered worse than using a real <table> for tabular data?', a: `A div-based grid has no inherent semantic relationship between its visual rows and columns — a screen reader navigating it sees a flat sequence of unrelated divs, with no way to announce "this cell belongs to this row and this column." A real <table>, especially with proper th/scope usage, provides that relationship structurally, letting assistive technology correctly communicate the data's actual organization.` },
  ],

  realWorld: [
    { company: 'Stripe', text: 'Pricing and billing comparison pages use real, properly scoped table markup so the comparison remains accessible and accurately understandable via assistive technology, not just visually.' },
    { company: 'Google', text: 'Search results pages display structured tabular data (like sports scores or comparison data) using real table semantics where appropriate, supporting both accessibility and structured data extraction for search features.' },
    { company: 'Amazon', text: 'Product comparison features and order history pages rely on real table markup to present genuinely tabular data clearly for all users, including those using screen readers to shop independently.' },
    { company: 'Netflix', text: 'Internal analytics dashboards used by engineering and business teams rely heavily on properly structured tables to present large volumes of metrics data clearly and navigably.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does <th> represent in a table?', options: ['A regular data cell', 'A header cell', 'A table caption', 'A merged cell'], correct: 1 },
    { type: 'true-false', q: 'Using tables purely for visual page layout is considered good modern practice.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does the scope attribute on a <th> clarify?', options: ['The cell\'s color', 'Whether the header applies to a row or a column', 'The cell\'s width', 'The table\'s caption'], correct: 1 },
    { type: 'code-output', q: '<table>\n  <tr><th colspan="2">Title</th></tr>\n</table>\n\nHow many columns does the "Title" header visually span?', options: ['1', '2', '0', 'It depends on the browser'], correct: 1 },
    { type: 'mcq', q: 'What is the accessibility risk of using divs styled to look like a table?', options: ['No risk at all', 'Screen readers cannot announce row/column relationships between cells', 'Divs cannot be styled with CSS', 'Divs load more slowly'], correct: 1 },
    { type: 'true-false', q: 'rowspan makes a single cell span across multiple rows.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is the purpose of <caption> in a table?', options: ['It styles the table border', 'It provides a title/description for the table', 'It is required for tables to render', 'It merges cells'], correct: 1 },
    { type: 'drag-drop', q: 'Order a table\'s structural groups top to bottom: [thead, tbody, tfoot]', options: ['thead', 'tbody', 'tfoot'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might a pricing comparison page use a real <table> instead of a CSS grid of divs?', options: ['Tables load faster always', 'Real tables let assistive technology announce row/column header context for each cell', 'CSS grid cannot display text', 'There is no real reason'], correct: 1 },
    { type: 'code-output', q: '<th scope="row">Widgets</th>\n<td>150</td>\n\nWhat does a screen reader announce when focusing the data cell "150"?', options: ['Just "150"', 'Something like "Widgets, 150" including the row header context', 'Nothing at all', 'Only the column header'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'media',
  module: 3,
  title: 'Media',
  tagline: 'Embedding images, audio, and video directly into a page — with the right element for each job.',
  readMinutes: 7,

  intro: {
    whatItIs: `HTML provides dedicated elements for embedding media: <img> for images, <audio> for sound, <video> for video, and <picture> for serving different images based on screen size or format support. Each comes with relevant attributes for controls, fallback content, and responsive behavior.`,
    whyItMatters: `Media is often the heaviest part of a web page in terms of file size and load time, and one of the most failure-prone (a broken image link, an unsupported video format). Using the right elements and attributes correctly affects performance, accessibility, and graceful fallback behavior.`,
    whereUsed: `Product photos, profile pictures, embedded video tutorials, podcasts, background music players, responsive image galleries — any page with non-text content beyond plain HTML markup.`,
    commonMistakes: `A common mistake is loading full-resolution images everywhere regardless of how large they'll actually display, wasting significant bandwidth and slowing page load. Another is omitting alt text on images or captions/transcripts on video, both of which are accessibility requirements, not optional extras.`,
  },

  visual: { caption: 'Choosing the right media element for the job', type: 'media-elements-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'A basic image',
      explanation: `The fundamental image element: a source URL and required alt text.`,
      code: `<img src="mountain.jpg" alt="Snow-capped mountain peak at sunrise">`,
      language: 'html', output: `Displays the image; if it fails to load, shows the\nalt text in its place instead of a broken icon.`,
    },
    {
      difficulty: 'easy', title: 'A video with controls',
      explanation: `The controls attribute adds the browser's built-in play/pause/volume UI; without it, the video would have no visible way to interact.`,
      code: `<video src="tutorial.mp4" controls width="640" height="360">\n  Your browser does not support the video tag.\n</video>`,
      language: 'html', output: `Renders a 640x360 video player with play/pause,\nvolume, and a seek bar. The fallback text only displays\nin the rare case the browser can't render <video> at all.`,
    },
    {
      difficulty: 'medium', title: 'Audio with multiple source formats',
      explanation: `Different browsers support different audio formats. Providing multiple <source> elements lets the browser pick whichever format it supports first.`,
      code: `<audio controls>\n  <source src="podcast.mp3" type="audio/mpeg">\n  <source src="podcast.ogg" type="audio/ogg">\n  Your browser does not support the audio element.\n</audio>`,
      language: 'html', output: `The browser tries each <source> in order and plays\nthe first format it supports — mp3 first, falling back\nto ogg if mp3 isn't supported.`,
    },
    {
      difficulty: 'medium-plus', title: 'Responsive images with srcset',
      explanation: `srcset lets the browser choose the most appropriately-sized image for the user's actual screen, avoiding downloading an unnecessarily large image on a small device.`,
      code: `<img\n  src="photo-800w.jpg"\n  srcset="photo-400w.jpg 400w, photo-800w.jpg 800w, photo-1600w.jpg 1600w"\n  sizes="(max-width: 600px) 100vw, 50vw"\n  alt="Team photo at the annual conference">`,
      language: 'html', output: `On a small phone screen, the browser may download\nphoto-400w.jpg instead of the full 1600w version,\nsaving significant bandwidth and improving load time.`,
    },
    {
      difficulty: 'hard', title: 'Video with captions for accessibility',
      explanation: `The track element adds captions (a .vtt file) to a video, making the audio content accessible to deaf or hard-of-hearing users, and useful for anyone watching without sound.`,
      code: `<video src="lecture.mp4" controls width="640" height="360">\n  <track kind="captions" src="lecture-captions.vtt" srclang="en" label="English" default>\n  Your browser does not support the video tag.\n</video>`,
      language: 'html', output: `Renders the video player with a captions toggle\navailable in the controls, displaying synchronized\ntext from the .vtt file when enabled.`,
    },
    {
      difficulty: 'real-world', title: 'Why e-commerce sites use srcset and lazy loading together',
      explanation: `Real product listing pages combine responsive images with lazy loading (deferring offscreen image downloads) to keep initial page load fast even with dozens of product photos on a single page.`,
      code: `<img\n  src="product-placeholder.jpg"\n  srcset="product-400w.jpg 400w, product-800w.jpg 800w"\n  sizes="50vw"\n  alt="Wireless headphones, black"\n  loading="lazy">`,
      language: 'html', output: `The browser only downloads this image once it's about\nto scroll into view (loading="lazy"), and picks an\nappropriately-sized version for the user's screen —\nboth reducing wasted bandwidth on a page with many products.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Add a basic image', problem: `Add an image with src="logo.png" and appropriate alt text describing a company logo.`, hints: ['Describe the meaning/purpose of the logo, not just "logo image".'], solution: `<img src="logo.png" alt="Acme Corp logo">` },
    { level: 2, title: 'Add video controls', problem: `Fix this video so users actually have a way to play, pause, and control volume:\n\n<video src="demo.mp4" width="640" height="360"></video>`, hints: ['Add the controls attribute.'], solution: `<video src="demo.mp4" controls width="640" height="360"></video>` },
    { level: 3, title: 'Provide fallback audio formats', problem: `Convert this single-format audio element to support both mp3 and ogg via multiple source elements:\n\n<audio controls src="song.mp3"></audio>`, hints: ['Use <source> children instead of a single src attribute.'], solution: `<audio controls>\n  <source src="song.mp3" type="audio/mpeg">\n  <source src="song.ogg" type="audio/ogg">\n  Your browser does not support the audio element.\n</audio>` },
    { level: 4, title: 'Add responsive image sizing', problem: `Add a srcset to this image offering 3 sizes (400w, 800w, 1200w) named photo-400.jpg, photo-800.jpg, photo-1200.jpg:\n\n<img src="photo-800.jpg" alt="City skyline at night">`, hints: ['List each file and its width descriptor, separated by commas.'], solution: `<img\n  src="photo-800.jpg"\n  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"\n  alt="City skyline at night">` },
    { level: 5, title: 'Add captions to a video', problem: `Add an English captions track to this video, pointing to "captions-en.vtt":\n\n<video src="webinar.mp4" controls></video>`, hints: ['Use a <track> child element with kind="captions".'], solution: `<video src="webinar.mp4" controls>\n  <track kind="captions" src="captions-en.vtt" srclang="en" label="English" default>\n</video>` },
    { level: 6, title: 'Real-world: optimize a slow-loading product page', problem: `A product listing page with 60 product photos takes 12 seconds to load because every image is a single full-resolution 2MB file with no lazy loading. Using what you know about srcset and the loading attribute, describe the specific changes you'd make and why they would help.`, hints: ['Address both: serving an appropriately-sized image per device, and deferring offscreen images.'], solution: `Two changes: (1) Add srcset with several appropriately-sized versions of each product photo (e.g. 400w, 800w, 1200w), so phones and smaller screens download a much smaller file instead of the full 2MB version — this alone could cut most image payload significantly on mobile devices. (2) Add loading="lazy" to images below the initial viewport, so the browser only downloads them once the user actually scrolls near them, rather than all 60 images downloading immediately on page load regardless of whether the user ever scrolls that far. Together, these address both "images are too big for the device" and "we're loading images nobody has scrolled to yet" — the two most common causes of this exact symptom.` },
  ],

  interview: [
    { q: 'Why is alt text required (not optional) on meaningful images?', a: `alt text is read aloud by screen readers and displayed if an image fails to load, making it essential for both accessibility and graceful degradation. Treating it as optional excludes users who rely on screen readers from understanding meaningful visual content entirely.` },
    { q: 'What problem does srcset solve?', a: `srcset lets the browser choose the most appropriately-sized image from a set of options based on the actual device and viewport, avoiding the waste of downloading a large, high-resolution image on a small mobile screen where most of that resolution would be invisible anyway.` },
    { q: 'Why might you provide multiple <source> elements inside an <audio> or <video> tag?', a: `Different browsers and devices support different media formats. Providing multiple source options lets the browser automatically pick the first format it supports, providing broader compatibility without needing to detect the browser and serve different markup manually.` },
    { q: 'What does the loading="lazy" attribute do, and when is it appropriate?', a: `It tells the browser to defer loading that image until it's about to scroll into the viewport, rather than loading it immediately along with the rest of the page. It's appropriate for images below the initial visible area of a page — using it on images that are immediately visible on load can actually hurt perceived performance, since it can delay loading content the user sees right away.` },
    { q: 'Why are captions/transcripts important for video content, beyond accessibility for deaf or hard-of-hearing users?', a: `Captions also benefit users watching in sound-off environments (public transport, shared offices), users in noisy environments, non-native speakers who read more easily than they listen, and search engines, which can index caption text for content discovery — making captions a broadly useful feature, not a narrow accommodation.` },
  ],

  realWorld: [
    { company: 'Netflix', text: 'Serves video at multiple resolutions and bitrates, dynamically switching based on the viewer\'s network conditions — a more advanced, continuously-adapting cousin of the same "serve the right size for the situation" principle behind srcset.' },
    { company: 'Amazon', text: 'Product photo galleries use responsive images and lazy loading extensively across listing pages with dozens of products, since unnecessary image payload directly slows page load and can measurably affect conversion rates.' },
    { company: 'Google', text: 'PageSpeed Insights and Core Web Vitals explicitly measure image loading performance, making responsive images and lazy loading practical, measurable factors in a site\'s search performance and user experience scoring.' },
    { company: 'Netflix', text: 'Provides closed captions and subtitles across its entire catalog in many languages, both as an accessibility requirement and because a very large portion of viewing happens with captions enabled for reasons unrelated to hearing ability.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does the controls attribute on a <video> or <audio> element do?', options: ['Hides the media player', 'Shows the browser\'s built-in play/pause/volume UI', 'Forces autoplay', 'Compresses the file'], correct: 1 },
    { type: 'true-false', q: 'alt text is purely optional and has no real functional purpose.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What problem does srcset solve?', options: ['It adds captions to video', 'It lets the browser choose an appropriately-sized image for the device', 'It compresses audio files', 'It is required for all images to display'], correct: 1 },
    { type: 'code-output', q: '<audio controls>\n  <source src="a.mp3" type="audio/mpeg">\n  <source src="a.ogg" type="audio/ogg">\n</audio>\n\nIf a browser does not support mp3, what happens?', options: ['The audio fails entirely', 'The browser tries the next source (ogg)', 'The page crashes', 'Nothing is rendered ever'], correct: 1 },
    { type: 'mcq', q: 'What does loading="lazy" do on an image?', options: ['Makes the image load immediately', 'Defers loading until the image nears the viewport', 'Reduces the image\'s resolution', 'Adds a loading spinner permanently'], correct: 1 },
    { type: 'true-false', q: 'Video captions only benefit users who are deaf or hard of hearing.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What element is used to add captions to a video?', options: ['<caption>', '<track>', '<subtitle>', '<alt>'], correct: 1 },
    { type: 'drag-drop', q: 'Order from smallest to largest typical file size impact: [400w image, 800w image, 1600w image]', options: ['400w image', '800w image', '1600w image'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might a product listing page combine srcset with loading="lazy"?', options: ['They cancel each other out', 'Together they reduce wasted bandwidth from oversized and unnecessary image downloads', 'It is required by HTML syntax', 'It has no effect on performance'], correct: 1 },
    { type: 'code-output', q: '<img src="a.jpg" srcset="a-400.jpg 400w, a-800.jpg 800w" alt="Photo">\n\nOn a small mobile screen, which file is the browser likely to choose?', options: ['Always a.jpg', 'Likely a-400.jpg, the smaller appropriate size', 'Always a-800.jpg regardless of screen size', 'Neither, only src is ever used'], correct: 1 },
  ],
});
