/* ==========================================================================
   TOPIC CONTENT DATA — Module 4: CSS Fundamentals
   Full depth per spec: intro, visual explanation, 6 examples, 6 exercises,
   5 interview questions, real-world applications, 10-question quiz.

   IMPORTANT: this file does NOT re-initialize window.CSFA_RAW_TOPICS — that
   array is created once in topics-module1.js. This file must be loaded
   AFTER topics-module1.js, topics-module2.js, and topics-module3.js in
   every HTML page's <script> tags, and simply pushes Module 4's topics
   onto the same shared array.
   ========================================================================== */

window.CSFA_RAW_TOPICS.push({
  id: 'selectors',
  module: 4,
  title: 'Selectors',
  tagline: 'How CSS finds the elements you want to style — the targeting system behind every rule.',
  readMinutes: 7,

  intro: {
    whatItIs: `A CSS selector is a pattern that targets specific HTML elements to apply styles to. Selectors range from simple (tag names, classes, IDs) to combinators that describe relationships between elements (descendant, child, sibling) and pseudo-classes that target states (hover, focus, first-child).`,
    whyItMatters: `Every CSS rule starts with a selector deciding which elements it affects. Writing selectors well — specific enough to target the right elements, general enough to stay maintainable — is the difference between a CSS codebase that's easy to change and one where every fix risks breaking something unrelated.`,
    whereUsed: `Every single styled webpage uses selectors, from the simplest single-class rule to complex component libraries with deeply structured selector strategies.`,
    commonMistakes: `A common mistake is over-specifying selectors (like div.container > ul.nav-list > li.nav-item > a.nav-link) when a single class would do, making styles brittle and hard to reuse. Another is relying on deeply nested descendant selectors that break the moment the HTML structure changes slightly.`,
  },

  visual: { caption: 'How a selector\'s specificity is calculated', type: 'selector-specificity-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'Tag, class, and ID selectors',
      explanation: `The three most fundamental selector types: by tag name, by class (reusable, prefixed with a dot), and by ID (unique, prefixed with #).`,
      code: `p { color: gray; }\n.highlight { background: yellow; }\n#main-title { font-size: 2rem; }`,
      language: 'css', output: `Every <p> turns gray; any element with class="highlight"\ngets a yellow background; the one element with\nid="main-title" gets a larger font size.`,
    },
    {
      difficulty: 'easy', title: 'Grouping and combining selectors',
      explanation: `Commas apply the same rule to multiple selectors at once; writing selectors directly next to each other (no space) requires an element to match both.`,
      code: `h1, h2, h3 {\n  font-family: sans-serif;\n}\n\np.intro {\n  font-weight: bold;\n}`,
      language: 'css', output: `All h1, h2, AND h3 elements get the sans-serif font.\nOnly <p> elements that ALSO have class="intro" become bold\n— a plain <p> without that class is unaffected.`,
    },
    {
      difficulty: 'medium', title: 'Descendant vs. child combinators',
      explanation: `A space means "anywhere inside" (descendant, any depth); > means "direct child only" (one level deep). This distinction matters a lot for predictable styling.`,
      code: `/* Descendant: matches ANY <a> inside .card, at any depth */\n.card a { color: blue; }\n\n/* Child: matches ONLY <a> that is a DIRECT child of .card */\n.card > a { color: red; }`,
      language: 'css', output: `Given <div class="card"><p><a>Link</a></p></div>, the\ndescendant rule (.card a) matches the link, but the\nchild rule (.card > a) does NOT, since the link is nested\ninside a <p>, not a direct child of .card.`,
    },
    {
      difficulty: 'medium-plus', title: 'Pseudo-classes for state and position',
      explanation: `Pseudo-classes target elements based on state (like :hover) or structural position (like :first-child, :nth-child) without needing extra classes in the HTML.`,
      code: `button:hover {\n  background: #6D28D9;\n}\n\nli:first-child {\n  font-weight: bold;\n}\n\nli:nth-child(even) {\n  background: #f5f5f5;\n}`,
      language: 'css', output: `Buttons darken on hover; the first <li> in any list\nbecomes bold; every even-numbered <li> gets a light\ngray background — a classic "zebra striping" pattern.`,
    },
    {
      difficulty: 'hard', title: 'Calculating selector specificity',
      explanation: `When multiple rules target the same element, the more specific selector wins, regardless of source order. IDs beat classes; classes beat tag names. This models comparing two competing rules.`,
      code: `/* Specificity: 0-1-0 (one class) */\n.button { color: blue; }\n\n/* Specificity: 1-0-0 (one ID) — this WINS, despite\n   appearing first in this file or coming "before" in\n   the actual stylesheet order */\n#submit-btn { color: red; }\n\n/* Even though .button is written below in many real\n   files, #submit-btn still wins due to higher specificity */`,
      language: 'css', output: `An element with both class="button" and id="submit-btn"\nrenders with red text — the ID selector's specificity\noutweighs the class selector's, regardless of which rule\nappears later in the file.`,
    },
    {
      difficulty: 'real-world', title: 'Why design systems use low-specificity, class-based selectors',
      explanation: `Real component libraries deliberately avoid ID selectors and deep nesting, using flat, single-class selectors so styles remain predictable and easy to override consistently across a huge codebase.`,
      code: `/* Avoided in most modern design systems: */\n#header .nav ul li a.active { color: purple; }\n\n/* Preferred: a single, flat, reusable class */\n.nav-link--active { color: purple; }`,
      language: 'css', output: `The flat class-based selector is far easier to reuse,\noverride predictably, and reason about — it doesn't\ndepend on a specific nested HTML structure existing\nexactly as written to work correctly.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Write basic selectors', problem: `Write CSS selectors that target: (a) all <h2> elements, (b) all elements with class "card", (c) the single element with id "footer".`, hints: ['Tag selectors have no prefix; classes use a dot; IDs use a hash.'], solution: `h2 { }\n.card { }\n#footer { }` },
    { level: 2, title: 'Combine two selectors', problem: `Write a selector that targets only <li> elements that also have the class "active".`, hints: ['Write the tag and class directly together with no space between them.'], solution: `li.active { }` },
    { level: 3, title: 'Distinguish descendant from child', problem: `Given <ul class="menu"><li><a>Link A</a></li></ul>, would the selector .menu > a match the link? Why or why not?`, hints: ['> requires a DIRECT child relationship.', 'The <a> is nested inside an <li>, not directly inside .menu.'], solution: `No, .menu > a would NOT match. The > combinator requires the <a> to be a direct child of .menu, but it's actually nested one level deeper, inside an <li>. The descendant selector .menu a (with a space) WOULD match, since it matches any depth.` },
    { level: 4, title: 'Use a pseudo-class for zebra striping', problem: `Write a CSS rule that gives every odd-numbered <tr> in a table a light gray background, without adding any extra classes to the HTML.`, hints: ['Use the :nth-child(odd) pseudo-class.'], solution: `tr:nth-child(odd) {\n  background: #f0f0f0;\n}` },
    { level: 5, title: 'Predict which rule wins', problem: `Given these two rules targeting the same button, which color applies, and why?\n\n.btn { color: green; }\n#save-button { color: orange; }\n\n<button id="save-button" class="btn">Save</button>`, hints: ['Compare the specificity of an ID selector vs a class selector.'], solution: `orange applies. An ID selector (#save-button) has higher specificity than a class selector (.btn), so it wins regardless of which rule is written first or last in the stylesheet.` },
    { level: 6, title: 'Real-world: refactor an overly specific selector', problem: `Refactor this selector into something more maintainable, and explain the real-world problem with the original:\n\n#main-content .sidebar ul.links li a.external-link { color: teal; }`, hints: ['A single, well-named class applied directly to the relevant element is usually sufficient.'], solution: `.external-link {\n  color: teal;\n}\n\n// The original selector is extremely fragile: it depends on a very specific\n// nested HTML structure (#main-content containing .sidebar containing a\n// ul.links containing li containing a.external-link) existing exactly as\n// written. If the markup structure changes even slightly — say, the sidebar\n// is restructured, or the link moves outside the <ul> — the rule silently\n// stops applying, with no error, just a visually broken page. A single,\n// well-named class applied directly to the relevant link element achieves\n// the same visual result without that fragile dependency on exact HTML structure.` },
  ],

  interview: [
    { q: 'How is CSS specificity calculated, in general terms?', a: `Specificity is generally calculated by counting, in order of importance: the number of ID selectors, then the number of class/attribute/pseudo-class selectors, then the number of tag/element selectors. More IDs always outweigh any number of classes; more classes always outweigh any number of tag selectors. Inline styles outweigh all of these, and !important overrides specificity rules entirely (and should be used sparingly).` },
    { q: 'What is the difference between a descendant selector and a child selector?', a: `A descendant selector (written with a space, like .card p) matches an element nested anywhere inside another, at any depth. A child selector (written with >, like .card > p) matches only elements that are a direct child — exactly one level deep — of the parent.` },
    { q: 'Why might overly specific or deeply nested selectors be considered a code smell in CSS?', a: `Highly specific selectors are fragile — they depend on a very particular HTML structure existing exactly as assumed, and break silently (no error, just visually wrong) if that structure changes even slightly. They also make styles hard to override predictably later, since overriding a highly specific selector requires writing something even more specific (or resorting to !important), which compounds the problem over time.` },
    { q: 'What is a pseudo-class, and how does it differ from a regular class?', a: `A pseudo-class (like :hover, :focus, :first-child) targets an element based on its state or structural position, without requiring an actual class attribute in the HTML. A regular class is an explicit attribute value (class="...") added directly to the markup; a pseudo-class is computed by the browser based on current state or DOM structure.` },
    { q: 'Why do many design systems and component libraries avoid ID selectors for styling?', a: `IDs have very high specificity, making any style applied via an ID selector difficult to override later without resorting to even higher specificity or !important. Since component libraries need styles to remain consistently overridable across many different contexts and consumers, they generally favor flat, class-based selectors with low, predictable specificity instead.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Material Design\'s component library uses flat, well-namespaced class selectors specifically to keep specificity low and predictable across the enormous number of products and teams that consume it.' },
    { company: 'Netflix', text: 'Frontend style guides discourage ID-based styling and deep selector nesting, favoring component-scoped class names to keep styles maintainable across a codebase maintained by many independent teams.' },
    { company: 'Stripe', text: 'Public-facing UI components are styled with carefully namespaced, low-specificity class selectors so that styles remain predictable and overridable when embedded into many different customer websites.' },
    { company: 'Amazon', text: 'Large-scale e-commerce frontend teams enforce linting rules limiting selector nesting depth and specificity, since CSS specificity conflicts have historically caused real, hard-to-trace styling bugs across massive shared codebases.' },
  ],

  quiz: [
    { type: 'mcq', q: 'Which selector targets all elements with class="card"?', options: ['#card', 'card', '.card', '*card'], correct: 2 },
    { type: 'true-false', q: 'A child selector (>) matches elements nested at any depth.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which selector has the HIGHEST specificity?', options: ['.button', 'button', '#submit', 'button.button'], correct: 2 },
    { type: 'code-output', q: '.card a { color: blue; }\n\nGiven <div class="card"><p><a>Link</a></p></div>, does this rule match the link?', options: ['Yes, descendant selectors match any depth', 'No, only direct children match', 'Only if the link has no other styles', 'It depends on the browser'], correct: 0 },
    { type: 'mcq', q: 'What does the :nth-child(even) pseudo-class target?', options: ['Every element with an even-numbered class', 'Every even-positioned child element', 'Only the second child', 'Elements with even-numbered IDs'], correct: 1 },
    { type: 'true-false', q: 'An ID selector always has higher specificity than any number of class selectors combined... actually, multiple classes CAN sometimes outweigh one ID in raw count, but ID still wins due to its specificity tier.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why are highly specific, deeply nested selectors often discouraged?', options: ['They are slower to type', 'They are fragile and break silently if HTML structure changes', 'CSS does not support them', 'They only work in certain browsers'], correct: 1 },
    { type: 'drag-drop', q: 'Order from lowest to highest specificity: [tag selector, class selector, ID selector]', options: ['tag selector', 'class selector', 'ID selector'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why do design systems often avoid ID selectors for component styling?', options: ['IDs cannot be styled with CSS', 'High specificity makes styles hard to override predictably later', 'IDs are deprecated in HTML5', 'IDs only work with JavaScript'], correct: 1 },
    { type: 'code-output', q: '.btn { color: green; }\n#save { color: orange; }\n\n<button id="save" class="btn">Save</button>\n\nWhich color applies?', options: ['green', 'orange', 'Both, mixed together', 'Neither, default black'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'box-model',
  module: 4,
  title: 'Box Model',
  tagline: 'Every element is a box — content, padding, border, and margin, stacked outward.',
  readMinutes: 7,

  intro: {
    whatItIs: `The CSS box model describes how every element's size is calculated from four layers, from the inside out: content (the actual text/image), padding (space inside the border), border (a visible or invisible edge), and margin (space outside the border, separating it from other elements).`,
    whyItMatters: `Almost every confusing layout bug — "why is this element wider than I expected," "why is there a gap I didn't add" — traces back to a misunderstanding of how these four layers combine to determine an element's actual rendered size and position.`,
    whereUsed: `Every visible element on every webpage is sized and spaced according to the box model, whether the developer is thinking about it explicitly or not.`,
    commonMistakes: `A very common mistake is forgetting that, by default, padding and border ADD to an element's specified width rather than being included within it — set width: 200px with 20px of padding, and the element actually renders 240px wide unless box-sizing: border-box is used. Another common mistake is confusing margin collapsing behavior between vertically adjacent elements, which doesn't always add up the way you'd intuitively expect.`,
  },

  visual: { caption: 'The four layers of the box model, from content outward', type: 'box-model-layers-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'The four layers in one rule',
      explanation: `A single element with content, padding, a border, and margin all specified — each adds visible space around the layer inside it.`,
      code: `.box {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 10px;\n}`,
      language: 'css', output: `Renders a box with 200px of content width, 20px of\npadding inside the border on every side, a 2px visible\nborder, and 10px of margin separating it from other elements.`,
    },
    {
      difficulty: 'easy', title: 'content-box vs border-box sizing',
      explanation: `box-sizing: content-box (the default) means width applies only to content, with padding/border added on top. box-sizing: border-box means width includes padding and border, making sizing far more predictable.`,
      code: `/* Default content-box: actual rendered width = 200 + 40 + 4 = 244px */\n.box-a {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid black;\n}\n\n/* border-box: actual rendered width = exactly 200px total */\n.box-b {\n  box-sizing: border-box;\n  width: 200px;\n  padding: 20px;\n  border: 2px solid black;\n}`,
      language: 'css', output: `.box-a renders 244px wide overall, even though width\nsays 200px. .box-b renders exactly 200px wide overall —\nthe padding and border are subtracted from the content\narea internally instead of being added on top.`,
    },
    {
      difficulty: 'medium', title: 'Margin vs padding — visual difference',
      explanation: `Padding is inside the border (and can have a background color show through it); margin is outside the border (transparent, just empty space) — they look identical in a diagram but behave very differently.`,
      code: `.card {\n  background: lightblue;\n  padding: 20px;  /* blue background extends through this space */\n  margin: 20px;   /* transparent space; no background here */\n  border: 1px solid navy;\n}`,
      language: 'css', output: `The light blue background fills the padding area, right\nup to the border. The margin area outside the border\nremains fully transparent, showing whatever is behind\nthe element (the page background, typically).`,
    },
    {
      difficulty: 'medium-plus', title: 'Margin collapsing between siblings',
      explanation: `When two block elements stack vertically, their margins don't simply add together — the larger of the two margins "wins" and the smaller one collapses into it. This is a famous, often-confusing CSS behavior.`,
      code: `.box-1 {\n  margin-bottom: 30px;\n}\n.box-2 {\n  margin-top: 20px;\n}\n/* You might expect 50px of total gap (30 + 20),\n   but margin collapsing means the LARGER value (30px)\n   wins, and the smaller one (20px) is absorbed into it */`,
      language: 'css', output: `The actual visible gap between box-1 and box-2 is 30px,\nNOT 50px — margin collapsing takes the larger of the two\nadjacent vertical margins rather than summing them.`,
    },
    {
      difficulty: 'hard', title: 'Setting border-box globally as a reset',
      explanation: `Because content-box sizing causes so much confusion, most real projects apply border-box to every element globally as one of the first rules in their stylesheet, making width/height behave intuitively everywhere.`,
      code: `*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* Now EVERY element in the page uses the more predictable\n   border-box sizing model by default, without needing to\n   repeat box-sizing on every individual rule. */`,
      language: 'css', output: `After this global reset, every element's specified\nwidth/height already includes its padding and border —\nno more surprise extra pixels from adding padding to a\nfixed-width element anywhere in the project.`,
    },
    {
      difficulty: 'real-world', title: 'Why a fixed-width sidebar mysteriously overflowed its container',
      explanation: `A real, commonly-reported bug: a sidebar set to width: 300px with internal padding overflows its 300px-wide parent container, because the padding was added on top of the specified width under the default content-box model.`,
      code: `.sidebar {\n  width: 300px;\n  padding: 20px;\n  /* Actual rendered width: 300 + 40 = 340px —\n     40px WIDER than intended, overflowing a 300px container */\n}\n\n/* The fix: */\n.sidebar {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  /* Now actually renders exactly 300px total, as intended */\n}`,
      language: 'css', output: `Without box-sizing: border-box, the sidebar silently\nrenders 40px wider than its declared width, causing\nunexpected overflow or horizontal scrolling. Adding\nborder-box fixes it without changing the visual padding at all.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Identify the four layers', problem: `List the four layers of the box model, from innermost to outermost.`, hints: ['Think from the actual text/image outward to the space separating elements.'], solution: `Content, padding, border, margin — in that order, from the innermost (actual content) to the outermost (space separating this element from its neighbors).` },
    { level: 2, title: 'Calculate rendered width', problem: `An element has width: 100px, padding: 10px, and border: 5px solid black, using the DEFAULT box-sizing (content-box). What is its total rendered width?`, hints: ['Under content-box, padding and border are added on top of the specified width, on each side (left and right).'], solution: `130px total. Padding adds 10px on the left AND 10px on the right (20px total), and border adds 5px on the left AND 5px on the right (10px total): 100 (content) + 20 (padding) + 10 (border) = 130px.` },
    { level: 3, title: 'Fix an overflow bug with border-box', problem: `This element is overflowing its 250px-wide container because of its padding. Fix it using box-sizing, without changing the padding or width values:\n\n.box {\n  width: 250px;\n  padding: 15px;\n}`, hints: ['Add box-sizing: border-box to include the padding within the specified width.'], solution: `.box {\n  box-sizing: border-box;\n  width: 250px;\n  padding: 15px;\n}\n\n// Now the box renders exactly 250px wide total, with the\n// padding included within that width rather than added on top.` },
    { level: 4, title: 'Distinguish padding from margin visually', problem: `An element has a yellow background. Padding is 20px and margin is 20px. Which 20px area shows the yellow background, and which shows the page's background instead?`, hints: ['Padding is INSIDE the border (and background); margin is OUTSIDE.'], solution: `The padding area (inside the border) shows the element's own yellow background, since background color fills the content + padding area. The margin area (outside the border) is always transparent and shows whatever is behind the element — typically the page's own background, not the element's yellow.` },
    { level: 5, title: 'Predict margin collapsing', problem: `Two stacked paragraphs have margin-bottom: 40px (first) and margin-top: 25px (second). What is the actual visible gap between them, assuming standard margin collapsing applies?`, hints: ['Margin collapsing takes the LARGER of the two adjacent margins, not the sum.'], solution: `40px — the larger of the two margins (40px) wins under margin collapsing; the smaller margin (25px) is absorbed into it rather than adding on top, so the total gap is 40px, not 65px.` },
    { level: 6, title: 'Real-world: apply a global border-box reset', problem: `Write a CSS rule that applies box-sizing: border-box to every element, pseudo-element included, across an entire project — the common "reset" pattern real projects use near the top of their stylesheet. Explain why doing this early/globally is preferable to adding box-sizing individually to each component as bugs appear.`, hints: ['Use the universal selector combined with ::before and ::after.'], solution: `*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n// Applying this globally near the top of the stylesheet means every element\n// in the project — including ones written by other developers later, or third-\n// party components — automatically gets the more predictable sizing behavior.\n// Adding box-sizing individually only as bugs appear means the project has an\n// inconsistent mix of content-box and border-box elements, making sizing\n// behavior harder to reason about and more likely to cause the exact overflow\n// bugs this property is meant to prevent in the first place.` },
  ],

  interview: [
    { q: 'What are the four layers of the CSS box model, from inside to outside?', a: `Content (the actual text or image), padding (space inside the border, same background as the content), border (a visible or invisible edge), and margin (transparent space outside the border, separating the element from its neighbors).` },
    { q: 'What is the difference between content-box and border-box sizing?', a: `With content-box (the CSS default), the width/height properties apply only to the content area, with padding and border added on top, increasing the element's total rendered size beyond the specified value. With border-box, width/height include padding and border within that specified value, making the total rendered size match exactly what was declared — generally considered far more predictable and is why most real projects apply it globally.` },
    { q: 'What is "margin collapsing," and when does it happen?', a: `Margin collapsing happens between vertically adjacent block-level elements' margins (e.g. one element's margin-bottom and the next element's margin-top) — instead of adding together, the larger of the two values is used, and the smaller one is absorbed. It does not apply to horizontal (left/right) margins, and has specific exceptions (e.g. elements with certain display values, or separated by padding/border/content).` },
    { q: 'Why might a fixed-width element unexpectedly overflow its container?', a: `Under the default content-box model, padding and border are added on top of the specified width rather than being included within it. An element with width: 300px and padding: 20px actually renders 340px wide total (20px padding on each side), which can overflow a parent container that's exactly 300px wide, even though the width property itself says 300px.` },
    { q: 'Why do most modern CSS resets include box-sizing: border-box as one of the first rules?', a: `Because content-box's default behavior of adding padding/border on top of a specified width is a very common and confusing source of layout bugs. Applying border-box globally early in a project makes sizing behave intuitively and consistently everywhere, preventing an entire category of overflow and unexpected-sizing bugs from ever needing to be debugged individually later.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Most major CSS frameworks and Google\'s own web development guidance recommend a global box-sizing: border-box reset as a near-universal best practice for predictable layout behavior.' },
    { company: 'Netflix', text: 'Large-scale UI component libraries rely on consistent border-box sizing across every component, since mixing content-box and border-box behavior across hundreds of independently developed components would create unpredictable, hard-to-debug layout inconsistencies.' },
    { company: 'Stripe', text: 'Embeddable payment UI components are built with carefully controlled box-sizing behavior so that their fixed dimensions render consistently and predictably regardless of the host website\'s own CSS resets or lack thereof.' },
    { company: 'Amazon', text: 'Product card and grid layouts across the shopping platform depend on precise, predictable box model behavior to ensure consistent spacing and alignment across thousands of different product listings rendered in the same grid.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What are the four layers of the box model, from inside to outside?', options: ['Margin, border, padding, content', 'Content, padding, border, margin', 'Border, content, margin, padding', 'Padding, content, margin, border'], correct: 1 },
    { type: 'true-false', q: 'Under the default content-box model, padding is added on top of the specified width.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What does box-sizing: border-box do?', options: ['Removes all borders', 'Includes padding and border within the specified width/height', 'Disables margins', 'Adds a default border to every element'], correct: 1 },
    { type: 'code-output', q: '.box { width: 100px; padding: 10px; }\n\nUnder DEFAULT (content-box) sizing, what is the total rendered width?', options: ['100px', '110px', '120px', '90px'], correct: 2 },
    { type: 'mcq', q: 'What does "margin collapsing" refer to?', options: ['Margins always sum together', 'The larger of two adjacent vertical margins is used instead of summing them', 'Margins disappear when an element has a border', 'Margins only apply to inline elements'], correct: 1 },
    { type: 'true-false', q: 'The margin area can show the element\'s own background color.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Why might a 300px-wide element with padding overflow a 300px container?', options: ['Containers cannot be exactly 300px', 'Under content-box, padding adds to the total rendered width beyond 300px', 'Padding is always ignored by browsers', 'This never actually happens'], correct: 1 },
    { type: 'drag-drop', q: 'Order from innermost to outermost: [border, content, margin, padding]', options: ['content', 'padding', 'border', 'margin'], correct: [0, 1, 2, 3] },
    { type: 'mcq', q: 'Why do most projects apply box-sizing: border-box globally near the top of their CSS?', options: ['It is required for CSS to work at all', 'It prevents a common category of unpredictable sizing/overflow bugs', 'It makes text bold by default', 'It only affects print stylesheets'], correct: 1 },
    { type: 'code-output', q: '.a { margin-bottom: 30px; }\n.b { margin-top: 50px; }\n\nWith standard margin collapsing between these stacked elements, what is the visible gap?', options: ['80px', '50px', '30px', '0px'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'flexbox',
  module: 4,
  title: 'Flexbox',
  tagline: 'A one-dimensional layout system for distributing space and aligning items along a row or column.',
  readMinutes: 8,

  intro: {
    whatItIs: `Flexbox (display: flex) is a CSS layout mode designed for arranging items along a single axis — either a row or a column — handling alignment, spacing, and sizing far more easily than older techniques like floats. A flex container holds flex items, and properties on each control how they grow, shrink, and align.`,
    whyItMatters: `Flexbox solved a huge number of common layout problems — centering something both vertically and horizontally, evenly distributing items, making items grow to fill available space — that used to require fragile workarounds. It remains one of the most-used layout tools in real-world CSS.`,
    whereUsed: `Navigation bars, card layouts, form controls aligned in a row, centering content vertically and horizontally, button groups — flexbox is everywhere in modern web layout.`,
    commonMistakes: `A common mistake is confusing the main axis with the cross axis — justify-content controls alignment along the main axis (typically horizontal in a row), while align-items controls the cross axis (typically vertical in a row); mixing these up is one of the most frequent flexbox confusions. Another mistake is forgetting that flex items default to shrinking to fit, which can cause unexpected wrapping or squishing without flex-wrap or explicit sizing.`,
  },

  visual: { caption: 'The flex container\'s two axes: main and cross', type: 'flexbox-axes-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'A basic flex row',
      explanation: `display: flex turns a container's direct children into flex items, automatically arranged in a row by default.`,
      code: `.container {\n  display: flex;\n}`,
      language: 'css', output: `Direct children of .container now sit side by side\nin a horizontal row, instead of stacking vertically\nthe way block elements normally would.`,
    },
    {
      difficulty: 'easy', title: 'Centering with justify-content and align-items',
      explanation: `justify-content centers along the main axis (horizontal, in a row); align-items centers along the cross axis (vertical, in a row) — together, this is the classic "center anything" flexbox pattern.`,
      code: `.center-everything {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 300px;\n}`,
      language: 'css', output: `Any content inside .center-everything is centered both\nhorizontally AND vertically within its 300px-tall container\n— a notoriously fiddly thing to achieve with older CSS techniques.`,
    },
    {
      difficulty: 'medium', title: 'Distributing space with justify-content',
      explanation: `justify-content offers several distribution strategies beyond centering — space-between pushes items to the edges with equal gaps between them.`,
      code: `.nav {\n  display: flex;\n  justify-content: space-between;\n}`,
      language: 'css', output: `Given a logo on the left and nav links on the right as\ndirect children, they push to opposite edges of the\ncontainer, with the available space distributed between them.`,
    },
    {
      difficulty: 'medium-plus', title: 'Controlling growth and shrinking with flex',
      explanation: `The flex shorthand controls how an item grows or shrinks relative to its siblings to fill available space — a flex value of 1 means "take an equal share of any extra space."`,
      code: `.sidebar {\n  flex: 0 0 200px; /* don't grow, don't shrink, stay 200px */\n}\n.main-content {\n  flex: 1; /* grow to fill all remaining space */\n}`,
      language: 'css', output: `The sidebar stays a fixed 200px wide no matter the\ncontainer's total width; main-content automatically\nexpands to fill whatever space remains beside it.`,
    },
    {
      difficulty: 'hard', title: 'Wrapping items with flex-wrap',
      explanation: `By default, flex items try to fit on one line, shrinking if needed. flex-wrap: wrap allows items to flow onto multiple lines instead, which is essential for responsive card grids.`,
      code: `.card-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card {\n  flex: 1 1 250px; /* grow/shrink, but prefer 250px */\n}`,
      language: 'css', output: `Cards arrange in a row, each preferring 250px wide, but\nwrap onto a new line once the container is too narrow to\nfit another 250px card — producing a responsive grid\nwithout needing CSS Grid at all.`,
    },
    {
      difficulty: 'real-world', title: 'Why "sticky footer" layouts use flexbox',
      explanation: `A classic real layout challenge — a footer that stays at the bottom of the viewport on short pages but isn't fixed/overlapping on long pages — is commonly solved with a flex column and flex: 1 on the main content area.`,
      code: `body {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\nmain {\n  flex: 1; /* grow to push the footer down on short pages */\n}\nfooter {\n  /* naturally sits right after main, pushed to the\n     bottom when main has grown to fill available space */\n}`,
      language: 'css', output: `On a short page, main grows to fill leftover vertical\nspace, pushing footer to the very bottom of the viewport.\nOn a long page, main simply takes the space it needs and\nfooter follows naturally after the actual content — no\nfixed positioning or JavaScript required.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Turn on flexbox', problem: `Write the CSS rule that turns a container's children into a horizontal row of flex items.`, hints: ['display: flex is the starting point; row is the default direction.'], solution: `.container {\n  display: flex;\n}` },
    { level: 2, title: 'Center content both ways', problem: `Write the CSS to center a single child both horizontally and vertically inside a flex container.`, hints: ['You need both justify-content and align-items set to center.'], solution: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}` },
    { level: 3, title: 'Distinguish main and cross axis', problem: `In a default flex row, which property (justify-content or align-items) controls vertical alignment, and which controls horizontal alignment?`, hints: ['The main axis in a row is horizontal; the cross axis is vertical.'], solution: `justify-content controls horizontal alignment (the main axis, in a default row direction). align-items controls vertical alignment (the cross axis). If flex-direction were column instead, these roles would swap — justify-content would control vertical, align-items horizontal.` },
    { level: 4, title: 'Make one item grow to fill space', problem: `Given a flex row with a fixed 250px sidebar and a content area, write the CSS so the content area automatically expands to fill all remaining horizontal space.`, hints: ['Give the sidebar a fixed flex-basis (or width) and the content area flex: 1.'], solution: `.sidebar {\n  flex: 0 0 250px;\n}\n.content {\n  flex: 1;\n}` },
    { level: 5, title: 'Build a wrapping card grid', problem: `Write the CSS for a flex container holding cards that each prefer to be 200px wide, wrapping onto new lines as needed, with 12px of gap between all cards.`, hints: ['Use flex-wrap: wrap on the container and flex: 1 1 200px on each card.'], solution: `.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.card {\n  flex: 1 1 200px;\n}` },
    { level: 6, title: 'Real-world: build a sticky footer layout', problem: `Using flexbox, write CSS so that a page's footer always sits at the bottom of the viewport on short pages (with little content) but follows naturally after the content on long pages — never overlapping content or floating awkwardly in the middle of a short page.`, hints: ['Make the body (or a wrapping container) a flex column spanning the full viewport height, with the main content area set to flex: 1.'], solution: `body {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  margin: 0;\n}\nmain {\n  flex: 1;\n}\n\n// On a short page, "main" grows to fill any leftover vertical space (since\n// it has flex: 1 inside a full-height flex column), pushing the footer all\n// the way down to the bottom of the viewport. On a long page, main simply\n// takes whatever height its actual content needs, and the footer follows\n// immediately after it — achieving the classic "sticky footer" behavior\n// without fixed positioning or any JavaScript.` },
  ],

  interview: [
    { q: 'What problem does flexbox solve that was historically difficult with CSS?', a: `Flexbox makes common layout needs — centering content both horizontally and vertically, evenly distributing space between items, making items grow/shrink to fill available space — straightforward, where these previously required fragile workarounds involving floats, absolute positioning, or precise manual calculations.` },
    { q: 'What is the difference between the main axis and the cross axis in flexbox?', a: `The main axis is the primary direction items are laid out along, controlled by flex-direction (row by default, meaning the main axis is horizontal). The cross axis runs perpendicular to it. justify-content aligns items along the main axis; align-items aligns them along the cross axis — when flex-direction changes to column, these axes (and which property does what visually) swap accordingly.` },
    { q: 'What does the flex shorthand property actually control?', a: `flex is shorthand for flex-grow, flex-shrink, and flex-basis together — controlling whether an item grows to take extra available space, whether it shrinks when space is tight, and its preferred starting size before growing or shrinking is applied.` },
    { q: 'What does flex-wrap: wrap do, and why is it important for responsive layouts?', a: `By default, flex items try to fit on a single line, shrinking as needed. flex-wrap: wrap allows items to flow onto multiple lines instead once they no longer fit, which is essential for building layouts (like card grids) that need to adapt naturally across different container widths without manually calculating breakpoints for every item count.` },
    { q: 'When might you choose flexbox over CSS Grid, or vice versa?', a: `Flexbox is generally better suited for one-dimensional layouts — arranging items along a single row or column, especially when item sizes are somewhat flexible or content-driven. CSS Grid is generally better for two-dimensional layouts where you need explicit control over both rows AND columns simultaneously, like a full page layout or a precise card grid with defined row and column tracks.` },
  ],

  realWorld: [
    { company: 'Netflix', text: 'Navigation bars and content row layouts across the streaming interface rely heavily on flexbox for distributing and aligning items consistently across many different screen sizes and device types.' },
    { company: 'Stripe', text: 'Checkout and dashboard UI components use flexbox extensively for form layouts and button groups, where flexible, content-driven sizing along a single axis is the natural fit.' },
    { company: 'Google', text: 'Many Google product interfaces use flexbox for toolbar and header layouts, where items need to align and distribute predictably regardless of how much text or how many icons are present.' },
    { company: 'Amazon', text: 'Product card rows and filter/sort control bars commonly use flexbox\'s wrapping and space-distribution features to remain usable across a very wide range of browser window sizes.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What CSS property turns a container into a flex container?', options: ['flex: true', 'display: flex', 'position: flex', 'layout: flex'], correct: 1 },
    { type: 'true-false', q: 'In a default flex row, justify-content controls vertical alignment.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which property centers flex items along the CROSS axis?', options: ['justify-content', 'align-items', 'flex-direction', 'flex-wrap'], correct: 1 },
    { type: 'code-output', q: '.sidebar { flex: 0 0 200px; }\n.content { flex: 1; }\n\nWhat happens to .content as the container grows wider?', options: ['It stays a fixed width', 'It grows to fill the remaining space', 'It shrinks to nothing', 'It disappears'], correct: 1 },
    { type: 'mcq', q: 'What does flex-wrap: wrap allow?', options: ['Items to overlap each other', 'Items to flow onto multiple lines instead of shrinking to fit one line', 'Text inside items to wrap', 'Flex items to become block elements'], correct: 1 },
    { type: 'true-false', q: 'Flexbox is generally better suited to two-dimensional layouts (rows AND columns at once) than CSS Grid.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does the flex shorthand property combine?', options: ['margin, padding, border', 'flex-grow, flex-shrink, flex-basis', 'width, height, position', 'color, background, border'], correct: 1 },
    { type: 'drag-drop', q: 'Order the steps to center content both ways in flexbox: [display: flex, justify-content: center, align-items: center]', options: ['display: flex', 'justify-content: center', 'align-items: center'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'In the "sticky footer" flexbox pattern, what role does flex: 1 on the main content play?', options: ['It hides the footer', 'It makes main grow to fill leftover space, pushing the footer to the bottom', 'It centers the footer', 'It has no effect on the footer\'s position'], correct: 1 },
    { type: 'code-output', q: '.nav { display: flex; justify-content: space-between; }\n\nWith a logo and a menu as the two children, where do they end up?', options: ['Both centered together', 'Pushed to opposite edges with space between them', 'Stacked vertically', 'Overlapping each other'], correct: 1 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'grid',
  module: 4,
  title: 'Grid',
  tagline: 'A two-dimensional layout system for precisely controlling rows and columns together.',
  readMinutes: 8,

  intro: {
    whatItIs: `CSS Grid (display: grid) is a layout system designed for two-dimensional layouts — controlling rows and columns simultaneously, rather than the single-axis focus of flexbox. You define a grid's structure with grid-template-columns and grid-template-rows, then place items within that structure.`,
    whyItMatters: `Grid makes complex page layouts — full designs with headers, sidebars, main content, and footers, or precise card grids with controlled row/column alignment — far easier to express clearly than flexbox or older techniques, which can only really reason about one axis cleanly at a time.`,
    whereUsed: `Full page layouts, image galleries, dashboard layouts with multiple distinct regions, and any design needing precise alignment across both rows and columns simultaneously.`,
    commonMistakes: `A common mistake is reaching for Grid when Flexbox would be simpler — Grid's power is most valuable for genuinely two-dimensional layouts, and using it for a simple single-row toolbar can be more complex than necessary. Another mistake is forgetting that grid items can be explicitly placed anywhere in the grid (potentially out of visual document order), which can create confusing markup if overused without care.`,
  },

  visual: { caption: 'A grid\'s structure: explicit rows, columns, and named areas', type: 'grid-structure-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'A basic 3-column grid',
      explanation: `grid-template-columns defines the grid's column structure; here, three equal-width columns using the fr (fraction) unit.`,
      code: `.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}`,
      language: 'css', output: `Direct children of .grid arrange into 3 equal-width\ncolumns, with 16px of consistent gap between every\nrow and column.`,
    },
    {
      difficulty: 'easy', title: 'Mixing fixed and flexible columns',
      explanation: `Columns don't all need to be the same unit — a fixed-width sidebar alongside a flexible main content column is a very common real pattern.`,
      code: `.layout {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  gap: 20px;\n}`,
      language: 'css', output: `The first column stays a fixed 250px (a sidebar);\nthe second column (1fr) expands to fill all remaining\nhorizontal space — a classic sidebar + content layout.`,
    },
    {
      difficulty: 'medium', title: 'Defining rows and columns together',
      explanation: `Grid lets you define both dimensions explicitly at once, giving precise control over a layout's overall structure rather than just one axis.`,
      code: `.page {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: 80px 1fr 60px;\n  min-height: 100vh;\n}`,
      language: 'css', output: `Creates a 2-column, 3-row structural grid: a fixed\n80px-tall top row, a flexible middle row filling\nremaining height, and a fixed 60px-tall bottom row —\nready for header/sidebar/content/footer placement.`,
    },
    {
      difficulty: 'medium-plus', title: 'Named grid areas',
      explanation: `grid-template-areas lets you name regions of the layout and assign items to them by name, making complex layouts dramatically easier to read than tracking row/column line numbers.`,
      code: `.page {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas:\n    "sidebar header"\n    "sidebar main"\n    "sidebar footer";\n}\n.sidebar { grid-area: sidebar; }\n.header  { grid-area: header; }\n.main    { grid-area: main; }\n.footer  { grid-area: footer; }`,
      language: 'css', output: `The sidebar visually spans all three rows on the left;\nheader, main, and footer stack in the right column —\nand the layout's structure is immediately readable just\nfrom the grid-template-areas string itself.`,
    },
    {
      difficulty: 'hard', title: 'A responsive auto-fit card grid',
      explanation: `repeat() combined with auto-fit and minmax() creates a genuinely responsive grid that automatically adjusts how many columns fit, without any media queries at all.`,
      code: `.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}`,
      language: 'css', output: `On a wide screen, several 220px+ columns fit side by\nside, each stretching to fill remaining space evenly.\nOn a narrow screen, fewer columns fit, automatically\nreflowing — all without writing a single media query.`,
    },
    {
      difficulty: 'real-world', title: 'Why dashboard layouts use named grid areas',
      explanation: `Real analytics dashboards with many distinct regions (header, filters, charts, sidebar) commonly use named grid areas specifically because the resulting CSS reads almost like a literal diagram of the page, making it far easier for a team to maintain over time.`,
      code: `.dashboard {\n  display: grid;\n  grid-template-columns: 240px 1fr 1fr;\n  grid-template-areas:\n    "nav filters filters"\n    "nav chart-a  chart-b"\n    "nav chart-a  chart-c";\n}`,
      language: 'css', output: `Reading just the grid-template-areas string tells you\nthe entire page structure at a glance: a nav column\nspanning the full height, filters across the top of the\nremaining space, and three charts arranged below with\nchart-a spanning two rows.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Create a 2-column grid', problem: `Write the CSS for a grid container with two equal-width columns and 16px of gap.`, hints: ['Use grid-template-columns: 1fr 1fr.'], solution: `.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}` },
    { level: 2, title: 'Mix fixed and flexible columns', problem: `Write a grid layout with a fixed 300px first column and a flexible second column filling the remaining space.`, hints: ['Combine a fixed unit (px) with fr in grid-template-columns.'], solution: `.layout {\n  display: grid;\n  grid-template-columns: 300px 1fr;\n}` },
    { level: 3, title: 'Define a 3-row page structure', problem: `Write a grid with a fixed 70px header row, a flexible main content row, and a fixed 50px footer row, spanning the full viewport height.`, hints: ['Use grid-template-rows: 70px 1fr 50px and min-height: 100vh.'], solution: `.page {\n  display: grid;\n  grid-template-rows: 70px 1fr 50px;\n  min-height: 100vh;\n}` },
    { level: 4, title: 'Use named grid areas', problem: `Using grid-template-areas, define a layout with a "nav" area on the left spanning the full height, and "header" and "content" stacked on the right.`, hints: ['Repeat "nav" in each row of the template-areas string to make it span all rows.'], solution: `.page {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas:\n    "nav header"\n    "nav content";\n}\n.nav { grid-area: nav; }\n.header { grid-area: header; }\n.content { grid-area: content; }` },
    { level: 5, title: 'Build a responsive auto-fit grid', problem: `Write a grid for a photo gallery where each photo prefers to be at least 180px wide, automatically fitting as many columns as the container width allows, with no media queries.`, hints: ['Use repeat(auto-fit, minmax(180px, 1fr)).'], solution: `.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n}` },
    { level: 6, title: 'Real-world: design a dashboard layout', problem: `Design a CSS Grid layout for a dashboard with: a 220px-wide nav column spanning the full height, a top filter bar across the remaining width, and two equally-sized chart areas below the filter bar. Use named grid areas, and explain why named areas are preferable to tracking numeric grid line positions for a layout this complex.`, hints: ['Repeat "nav" across both content rows so it spans the full height of the right-side content.'], solution: `.dashboard {\n  display: grid;\n  grid-template-columns: 220px 1fr 1fr;\n  grid-template-areas:\n    "nav filters filters"\n    "nav chart-a chart-b";\n}\n.nav { grid-area: nav; }\n.filters { grid-area: filters; }\n.chart-a { grid-area: chart-a; }\n.chart-b { grid-area: chart-b; }\n\n// Named grid areas are preferable here because the grid-template-areas string\n// itself visually resembles the actual page layout, making the structure\n// immediately understandable to anyone reading the CSS — including someone\n// new to the codebase. Tracking numeric grid line positions (e.g. grid-column:\n// 2 / 4; grid-row: 1 / 3;) for a layout this complex would require constantly\n// cross-referencing line numbers mentally, which becomes error-prone and hard\n// to maintain as the layout grows or changes over time.` },
  ],

  interview: [
    { q: 'What is the key difference between CSS Grid and Flexbox?', a: `Grid is designed for two-dimensional layouts, giving explicit control over both rows and columns simultaneously. Flexbox is designed for one-dimensional layouts, arranging items along a single row or column at a time. Grid is generally better for overall page structure or precise card grids; Flexbox is generally better for distributing/aligning items along one axis, like a toolbar or button group.` },
    { q: 'What does the fr unit represent in CSS Grid?', a: `fr represents a "fraction" of the available space in the grid container, after fixed-size tracks (like px values) have been accounted for. grid-template-columns: 1fr 2fr creates two columns where the second is twice as wide as the first, splitting whatever space remains after any fixed-width columns.` },
    { q: 'What is the benefit of using grid-template-areas over manually specifying grid-column and grid-row line numbers?', a: `Named grid areas let the CSS visually resemble the actual page layout, since the grid-template-areas string is essentially a text diagram of where each region sits. This makes complex layouts significantly easier to read and maintain, compared to manually tracking and cross-referencing numeric line positions for every item.` },
    { q: 'How does repeat(auto-fit, minmax(...)) create a responsive grid without media queries?', a: `minmax(180px, 1fr) tells each column to be at least 180px but otherwise grow to fill available space; auto-fit tells the grid to automatically determine how many such columns can fit in the current container width, fitting more columns on a wide screen and fewer on a narrow one, all recalculated automatically as the container resizes — no manual breakpoints needed.` },
    { q: 'When would you choose Flexbox over Grid for a layout, even though Grid is more powerful overall?', a: `Flexbox is often simpler and more appropriate when the layout is genuinely one-dimensional — a row of navigation links, a button group, vertically centering a single element — since reaching for Grid's two-dimensional machinery for a one-dimensional problem adds unnecessary complexity without any real benefit.` },
  ],

  realWorld: [
    { company: 'Netflix', text: 'Full-page dashboard and admin tool layouts internally use CSS Grid with named areas to maintain clear, maintainable structure across complex interfaces built by many different engineering teams.' },
    { company: 'Google', text: 'Many modern Google product redesigns rely on CSS Grid for overall page layout structure, replacing older, more fragile float- and table-based layout techniques used in earlier versions of the same products.' },
    { company: 'Amazon', text: 'Product gallery and category browsing pages use responsive CSS Grid patterns (like auto-fit with minmax) to adapt the number of visible columns smoothly across an enormous range of device and window sizes.' },
    { company: 'Stripe', text: 'Documentation and dashboard pages use CSS Grid for two-dimensional layout structure — sidebars, content areas, and footers — while still using Flexbox within individual components for one-dimensional alignment needs.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What is the key difference between Grid and Flexbox?', options: ['They are identical', 'Grid is two-dimensional (rows AND columns); Flexbox is one-dimensional', 'Flexbox is newer than Grid', 'Grid only works with images'], correct: 1 },
    { type: 'true-false', q: 'The fr unit represents a fixed number of pixels.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What does grid-template-columns: 200px 1fr create?', options: ['Two equal-width columns', 'A fixed 200px column and a flexible column filling the rest', 'Three columns total', 'A single column'], correct: 1 },
    { type: 'code-output', q: '.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }\n\nWhat happens as the container width shrinks?', options: ['Columns disappear entirely', 'Fewer columns fit, automatically reflowing without media queries', 'The layout breaks', 'Nothing changes ever'], correct: 1 },
    { type: 'mcq', q: 'What is the main benefit of named grid areas?', options: ['Faster page rendering', 'The CSS visually resembles the actual layout, improving readability', 'They are required for Grid to work at all', 'They reduce the number of CSS files needed'], correct: 1 },
    { type: 'true-false', q: 'Flexbox is generally simpler than Grid for a one-dimensional layout like a navigation bar.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What does grid-area: header do on an element?', options: ['Adds a border', 'Assigns the element to the area named "header" in grid-template-areas', 'Centers the element', 'Makes the element a header tag'], correct: 1 },
    { type: 'drag-drop', q: 'Order from most one-dimensional to most two-dimensional: [Flexbox row, CSS Grid with rows and columns, Flexbox column]', options: ['Flexbox row', 'Flexbox column', 'CSS Grid with rows and columns'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might a dashboard with many distinct regions use CSS Grid over Flexbox?', options: ['Grid is always faster to render', 'Grid naturally handles precise two-dimensional region placement', 'Flexbox cannot display more than 3 items', 'There is no real reason'], correct: 1 },
    { type: 'code-output', q: '.layout { display: grid; grid-template-columns: 1fr 1fr 1fr; }\n\nHow many equal-width columns does this create?', options: ['1', '2', '3', '4'], correct: 2 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'responsive-design',
  module: 4,
  title: 'Responsive Design',
  tagline: 'Making one set of HTML/CSS work well across phones, tablets, and desktops alike.',
  readMinutes: 8,

  intro: {
    whatItIs: `Responsive design is the practice of building web pages that adapt their layout, sizing, and sometimes content based on the device or viewport size viewing them — primarily achieved with flexible layouts (flexbox/grid), relative units, and media queries that apply different CSS rules at different screen widths.`,
    whyItMatters: `People access the web from an enormous range of devices — small phones, tablets, ultra-wide monitors. A page that only looks good at one specific width either becomes unusable on most real devices or requires maintaining entirely separate versions of the site, which doesn't scale.`,
    whereUsed: `Every modern website needs to work across phone, tablet, and desktop screens — responsive design isn't an optional enhancement anymore, it's a baseline expectation for any public-facing site.`,
    commonMistakes: `A common mistake is designing only for desktop first and trying to "squeeze" the layout down for mobile afterward, rather than designing mobile-first and progressively enhancing for larger screens — mobile traffic is the majority for many sites, making this approach backwards. Another mistake is using fixed pixel widths everywhere instead of relative units and flexible layouts, which breaks immediately on any screen narrower than assumed.`,
  },

  visual: { caption: 'The same layout adapting across breakpoints', type: 'responsive-breakpoints-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'The viewport meta tag',
      explanation: `Without this meta tag, mobile browsers often render pages at a fixed "desktop" width and zoom out, defeating the purpose of any responsive CSS. This single line is essentially required for responsive design to work at all on mobile.`,
      code: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
      language: 'html', output: `Tells mobile browsers to render the page at the actual\ndevice's width, rather than a default desktop-sized\nviewport scaled down — the foundation every other\nresponsive technique depends on.`,
    },
    {
      difficulty: 'easy', title: 'A basic media query',
      explanation: `Media queries apply CSS rules only when certain conditions are met — most commonly, a maximum or minimum viewport width.`,
      code: `.sidebar {\n  width: 300px;\n}\n\n@media (max-width: 768px) {\n  .sidebar {\n    width: 100%;\n  }\n}`,
      language: 'css', output: `The sidebar is 300px wide on screens wider than 768px,\nbut switches to full width on screens 768px or narrower\n— like most phones and small tablets.`,
    },
    {
      difficulty: 'medium', title: 'Mobile-first media queries',
      explanation: `Mobile-first design writes the base styles for small screens, then uses min-width media queries to progressively add complexity for larger screens — generally considered the more maintainable approach.`,
      code: `/* Base styles: designed for small screens first */\n.nav {\n  flex-direction: column;\n}\n\n/* Progressively enhance for larger screens */\n@media (min-width: 768px) {\n  .nav {\n    flex-direction: row;\n  }\n}`,
      language: 'css', output: `On small screens, nav items stack vertically (the\ndefault/base styles). Once the viewport reaches 768px\nor wider, they switch to a horizontal row instead.`,
    },
    {
      difficulty: 'medium-plus', title: 'Relative units for flexible sizing',
      explanation: `rem and % scale relative to a root font size or parent container, rather than being a fixed, unchanging pixel value — helping content scale more naturally across devices and user font-size preferences.`,
      code: `:root {\n  font-size: 16px;\n}\n\nh1 {\n  font-size: 2.5rem; /* 2.5 x 16px = 40px, but scales\n                         if the user changes their browser's\n                         default font size for accessibility */\n}\n\n.container {\n  width: 90%; /* always 90% of its parent's width,\n                  regardless of parent size */\n}`,
      language: 'css', output: `The heading's size scales relative to the root font\nsize, respecting user accessibility preferences; the\ncontainer's width stays proportional to its parent\nat any screen size, rather than a fixed pixel value.`,
    },
    {
      difficulty: 'hard', title: 'A responsive grid using both Grid and media queries together',
      explanation: `Real layouts often combine modern flexible techniques (like auto-fit grids) with media queries for cases that need more deliberate control than automatic flexibility alone provides.`,
      code: `.cards {\n  display: grid;\n  grid-template-columns: 1fr; /* mobile: single column */\n  gap: 16px;\n}\n\n@media (min-width: 600px) {\n  .cards {\n    grid-template-columns: repeat(2, 1fr); /* tablet: 2 columns */\n  }\n}\n\n@media (min-width: 1024px) {\n  .cards {\n    grid-template-columns: repeat(3, 1fr); /* desktop: 3 columns */\n  }\n}`,
      language: 'css', output: `Phones see one column, tablets see two, and desktops\nsee three — a deliberately staged progression rather\nthan a fully automatic reflow, giving more precise\ncontrol over the layout at each major breakpoint.`,
    },
    {
      difficulty: 'real-world', title: 'Why "mobile-first" became standard practice industry-wide',
      explanation: `Once mobile traffic overtook desktop traffic for most consumer websites, designing and writing CSS mobile-first (rather than retrofitting a desktop design down to mobile) became the practical, performance-conscious default across the industry.`,
      code: `/* Mobile-first: simple, lightweight base styles load\n   for ALL devices, including the majority-share mobile\n   users, with NO extra unnecessary CSS overhead */\nbody {\n  font-size: 16px;\n}\n\n/* Desktop-specific enhancements only apply (and only\n   need to be parsed/applied) on larger screens */\n@media (min-width: 1024px) {\n  body {\n    font-size: 18px;\n  }\n}`,
      language: 'css', output: `Mobile users — typically the majority of traffic — get\nlean, directly-applicable base styles with no wasted\noverhead; desktop-specific rules only kick in for the\nscreens that actually need them.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Add the viewport meta tag', problem: `Add the standard viewport meta tag to make a page render correctly on mobile devices.`, hints: ['It belongs in the <head>, with width=device-width and initial-scale=1.0.'], solution: `<meta name="viewport" content="width=device-width, initial-scale=1.0">` },
    { level: 2, title: 'Write a basic media query', problem: `Write a media query that makes a .menu element hidden (display: none) on screens 600px wide or narrower.`, hints: ['Use @media (max-width: 600px) { ... }.'], solution: `@media (max-width: 600px) {\n  .menu {\n    display: none;\n  }\n}` },
    { level: 3, title: 'Convert desktop-first to mobile-first', problem: `Rewrite this desktop-first approach as mobile-first instead:\n\n.box { width: 300px; }\n@media (max-width: 768px) {\n  .box { width: 100%; }\n}`, hints: ['Mobile-first means the BASE styles target small screens; use min-width to add complexity for larger ones.'], solution: `.box {\n  width: 100%;\n}\n\n@media (min-width: 769px) {\n  .box {\n    width: 300px;\n  }\n}` },
    { level: 4, title: 'Use relative units', problem: `Rewrite this rule using rem instead of a fixed pixel value, assuming a root font-size of 16px, so the heading remains 32px by default but scales with user font-size preferences:\n\nh1 { font-size: 32px; }`, hints: ['32 ÷ 16 = 2, so the equivalent is 2rem.'], solution: `h1 {\n  font-size: 2rem;\n}` },
    { level: 5, title: 'Build a staged responsive grid', problem: `Write CSS Grid rules so a card layout shows 1 column by default, 2 columns at 700px and above, and 4 columns at 1200px and above.`, hints: ['Start with the mobile (1-column) base style, then layer min-width media queries on top.'], solution: `.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n@media (min-width: 700px) {\n  .cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 1200px) {\n  .cards {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}` },
    { level: 6, title: 'Real-world: explain a mobile rendering bug', problem: `A page looks perfectly designed in a desktop browser, but on an actual phone it renders zoomed out and tiny, with users having to pinch-zoom to read anything, even though the CSS includes media queries for small screens. What is the most likely missing piece, and why does it cause this specific symptom?`, hints: ['Media queries alone aren\'t enough if the browser doesn\'t know the actual device width to compare against.'], solution: `The page is almost certainly missing the viewport meta tag (<meta name="viewport" content="width=device-width, initial-scale=1.0">). Without it, many mobile browsers render the page at an assumed default desktop-like width (often 980px) and then zoom the entire rendered page out to fit the actual screen — this is exactly why everything appears tiny and zoomed out despite the CSS itself being otherwise correct. The media queries never even get a chance to apply their intended small-screen styles, because the browser is reporting (and rendering at) the wrong viewport width in the first place.` },
  ],

  interview: [
    { q: 'What is the purpose of the viewport meta tag, and what happens without it?', a: `It tells mobile browsers to use the device's actual screen width as the rendering viewport, rather than defaulting to an assumed desktop-like width and zooming the result out to fit. Without it, responsive media queries often never trigger as intended, since the browser reports an incorrect (typically much wider) viewport width than the actual physical screen.` },
    { q: 'What is the difference between "mobile-first" and "desktop-first" responsive design?', a: `Mobile-first writes the base CSS styles for small screens by default, then uses min-width media queries to progressively add complexity for larger screens. Desktop-first does the reverse — base styles target large screens, with max-width media queries simplifying the layout down for smaller ones. Mobile-first is now generally considered the more practical default, especially given that mobile traffic is the majority for most consumer-facing sites.` },
    { q: 'Why are relative units like rem and % often preferred over fixed pixel values in responsive design?', a: `Relative units scale naturally with their reference point — rem relative to the root font size (respecting user accessibility preferences for larger text), and % relative to a parent container's size. Fixed pixel values don't adapt to either of these contexts, making layouts and typography less flexible across different devices, zoom levels, and user accessibility settings.` },
    { q: 'What is a "breakpoint" in responsive design?', a: `A breakpoint is a specific viewport width at which the layout's media query rules change the design meaningfully — for example, switching a navigation menu from a horizontal row to a hidden, hamburger-triggered menu below a certain width. Breakpoints are usually chosen based on common device size ranges and the specific content's actual layout needs, not arbitrary round numbers alone.` },
    { q: 'How do modern flexible layout techniques (like Grid\'s auto-fit) reduce the need for media queries?', a: `Techniques like repeat(auto-fit, minmax(...)) let the browser automatically determine how many columns fit at the current container width, continuously adapting without needing explicit breakpoints for every possible size. This doesn't eliminate the need for media queries entirely (some layout changes are genuinely more deliberate/staged than purely automatic reflow allows), but it significantly reduces how many breakpoints a typical layout needs to define manually.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Mobile-friendliness and responsive design have been factored into Google Search ranking for years, making responsive design a practical SEO consideration as well as a usability one.' },
    { company: 'Amazon', text: 'Product and checkout pages are extensively tested and optimized across phone, tablet, and desktop breakpoints, since a large and growing share of e-commerce traffic and purchases happen on mobile devices.' },
    { company: 'Netflix', text: 'The browsing interface adapts its grid density and navigation patterns significantly between phone, tablet, desktop, and TV screen sizes, going well beyond simple breakpoint adjustments to genuinely different layouts per device class.' },
    { company: 'Stripe', text: 'Documentation and dashboard interfaces are built mobile-first, ensuring the core experience works well on smaller screens before progressively enhancing for the additional space available on desktop.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What does the viewport meta tag do?', options: ['Adds a border to the page', 'Tells mobile browsers to use the actual device width as the viewport', 'Disables CSS entirely', 'Forces desktop layout on all devices'], correct: 1 },
    { type: 'true-false', q: 'Mobile-first design uses max-width media queries to simplify a desktop-first base style for smaller screens.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is a "breakpoint" in responsive design?', options: ['A bug in the CSS', 'A viewport width at which layout rules meaningfully change', 'A type of HTML element', 'A JavaScript error'], correct: 1 },
    { type: 'code-output', q: '@media (min-width: 768px) {\n  .nav { flex-direction: row; }\n}\n\nOn a 500px-wide phone screen, does this rule apply?', options: ['Yes, always', 'No, the viewport is narrower than 768px', 'Only on iOS', 'Only if JavaScript is enabled'], correct: 1 },
    { type: 'mcq', q: 'Why are relative units like rem often preferred over fixed pixels?', options: ['They render faster', 'They scale with root font size, respecting accessibility preferences', 'Pixels are deprecated in CSS', 'rem only works in media queries'], correct: 1 },
    { type: 'true-false', q: 'Without the viewport meta tag, media queries may never trigger as intended on mobile.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why has "mobile-first" become the industry-standard default approach?', options: ['Desktop screens no longer exist', 'Mobile traffic is the majority for many sites, making it the practical default to design for first', 'It is required by HTML5', 'It only affects page color schemes'], correct: 1 },
    { type: 'drag-drop', q: 'Order a mobile-first media query progression: [base mobile styles, min-width: 768px tablet styles, min-width: 1200px desktop styles]', options: ['base mobile styles', 'min-width: 768px tablet styles', 'min-width: 1200px desktop styles'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'How does repeat(auto-fit, minmax(...)) reduce the need for media queries?', options: ['It disables responsive design entirely', 'It lets the browser automatically determine column count based on available width', 'It only works with one column ever', 'It requires JavaScript to function'], correct: 1 },
    { type: 'code-output', q: 'A phone\'s actual screen is 390px wide, but without a viewport meta tag the browser assumes 980px.\n\nWhat visual symptom would this most likely cause?', options: ['The page renders zoomed out and tiny', 'The page renders in black and white', 'The page fails to load entirely', 'No visible effect at all'], correct: 0 },
  ],
});

window.CSFA_RAW_TOPICS.push({
  id: 'animations',
  module: 4,
  title: 'Animations',
  tagline: 'Making interfaces feel alive — smooth transitions and motion, purely in CSS.',
  readMinutes: 7,

  intro: {
    whatItIs: `CSS animations bring movement and change to a page without JavaScript, using two main tools: transition (smoothly animating a property change between two states, like a hover effect) and @keyframes combined with animation (defining multi-step animations that can run automatically, repeat, or loop).`,
    whyItMatters: `Thoughtful motion makes interfaces feel more responsive and polished — a button that smoothly highlights on hover, a menu that slides in rather than snapping into existence. Done in CSS rather than JavaScript, these animations are typically smoother and cheaper for the browser to render, since the browser can often hand them off to the GPU.`,
    whereUsed: `Hover effects, loading spinners, modal/menu open-close transitions, subtle attention-drawing effects, and page-load reveal animations are common across nearly every polished modern website.`,
    commonMistakes: `A common mistake is animating properties like width, height, or top/left, which force the browser to recalculate layout on every frame, causing janky, non-smooth motion. Animating transform and opacity instead is dramatically smoother, since those properties can be handled by the GPU without triggering layout recalculation. Another common mistake is overusing animation so much that it becomes distracting or motion-sickness-inducing for sensitive users, rather than purposeful and restrained.`,
  },

  visual: { caption: 'transition vs @keyframes: two states vs multi-step motion', type: 'animation-types-diagram' },

  examples: [
    {
      difficulty: 'very-easy', title: 'A basic hover transition',
      explanation: `transition smoothly animates a property's change between its starting value and whatever value it changes to (here, on :hover) instead of switching instantly.`,
      code: `.button {\n  background: #8B5CF6;\n  transition: background 0.2s ease;\n}\n.button:hover {\n  background: #6D28D9;\n}`,
      language: 'css', output: `Instead of snapping instantly to the darker hover color,\nthe background smoothly fades from light purple to dark\npurple over 0.2 seconds when the mouse enters the button.`,
    },
    {
      difficulty: 'easy', title: 'Transitioning multiple properties at once',
      explanation: `transition can animate several properties together, each optionally with its own duration and timing, by listing them comma-separated or using the shorthand for all at once.`,
      code: `.card {\n  transform: scale(1);\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card:hover {\n  transform: scale(1.03);\n  box-shadow: 0 8px 20px rgba(0,0,0,0.2);\n}`,
      language: 'css', output: `On hover, the card smoothly grows slightly larger\n(scale) WHILE its shadow simultaneously grows deeper —\nboth properties animate together over the same duration.`,
    },
    {
      difficulty: 'medium', title: 'A basic @keyframes animation',
      explanation: `@keyframes defines a sequence of styles at different points (0% to 100%) of an animation's timeline; the animation property then applies that sequence to an element.`,
      code: `@keyframes pulse {\n  0%   { transform: scale(1); }\n  50%  { transform: scale(1.1); }\n  100% { transform: scale(1); }\n}\n\n.notification-dot {\n  animation: pulse 1.5s ease-in-out infinite;\n}`,
      language: 'css', output: `The notification dot continuously grows slightly larger\nand shrinks back, repeating forever (infinite) every\n1.5 seconds — a classic "pulsing attention" effect.`,
    },
    {
      difficulty: 'medium-plus', title: 'Why transform/opacity animate more smoothly than width/top',
      explanation: `Animating layout-affecting properties (width, height, top, left) forces the browser to recalculate the page's layout on every single frame; animating transform and opacity can often skip that step entirely, running smoothly on the GPU instead.`,
      code: `/* Janky: animating 'left' forces layout recalculation\n   on every frame of the animation */\n.slow-slide {\n  transition: left 0.3s ease;\n}\n.slow-slide.open { left: 0; }\n\n/* Smooth: animating 'transform' avoids layout\n   recalculation, often handled directly by the GPU */\n.fast-slide {\n  transition: transform 0.3s ease;\n}\n.fast-slide.open { transform: translateX(0); }`,
      language: 'css', output: `Both achieve a visually similar sliding effect, but the\ntransform version is significantly smoother in practice,\nespecially on lower-powered devices, because it avoids\nforcing the browser to recalculate layout every frame.`,
    },
    {
      difficulty: 'hard', title: 'A loading spinner from scratch',
      explanation: `A continuously rotating loading spinner is a classic, simple, purely-CSS animation combining a keyframe rotation with an infinite, linear timing function for constant speed.`,
      code: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.spinner {\n  width: 24px;\n  height: 24px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #8B5CF6;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}`,
      language: 'css', output: `Renders a small circle with one differently-colored\nsegment, continuously rotating at a constant speed\n(linear timing) forever (infinite) — a complete loading\nspinner with zero JavaScript or image assets required.`,
    },
    {
      difficulty: 'real-world', title: 'Why respecting prefers-reduced-motion matters in real products',
      explanation: `Some users experience genuine discomfort, dizziness, or distraction from animated motion. Real, accessible products check the prefers-reduced-motion media feature and significantly reduce or disable non-essential animation for users who've requested it at the OS level.`,
      code: `.card {\n  transition: transform 0.2s ease;\n}\n.card:hover {\n  transform: scale(1.03);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .card {\n    transition: none;\n  }\n  .card:hover {\n    transform: none;\n  }\n}`,
      language: 'css', output: `Most users see the normal smooth hover animation. Users\nwho've enabled "reduce motion" in their operating system\naccessibility settings see the hover state change\ninstantly, with no animated motion at all.`,
    },
  ],

  exercises: [
    { level: 1, title: 'Add a hover transition', problem: `Add a smooth 0.3s transition to a button's background-color so it doesn't change instantly on hover.`, hints: ['Add the transition property to the base (non-hover) rule.'], solution: `.button {\n  background-color: #8B5CF6;\n  transition: background-color 0.3s ease;\n}\n.button:hover {\n  background-color: #6D28D9;\n}` },
    { level: 2, title: 'Identify the smoother property choice', problem: `Which property would animate more smoothly for a sliding-in menu: left or transform: translateX()? Why?`, hints: ['One forces layout recalculation every frame; the other can often be handled by the GPU.'], solution: `transform: translateX() would animate more smoothly. Animating left forces the browser to recalculate page layout on every single frame of the animation, which can cause visible jank, especially on lower-powered devices. transform avoids triggering layout recalculation, often running smoothly on the GPU instead.` },
    { level: 3, title: 'Write a basic keyframe animation', problem: `Write a @keyframes animation called "fadeIn" that animates opacity from 0 to 1, and apply it to a .toast element over 0.4 seconds.`, hints: ['Use 0% and 100% (or from/to) inside @keyframes.'], solution: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.toast {\n  animation: fadeIn 0.4s ease;\n}` },
    { level: 4, title: 'Build a pulsing effect', problem: `Write a @keyframes animation that scales an element up slightly and back down, repeating forever every 2 seconds.`, hints: ['Use 0%, 50%, and 100% keyframes; set animation-iteration-count to infinite.'], solution: `@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.08); }\n  100% { transform: scale(1); }\n}\n.badge {\n  animation: pulse 2s ease-in-out infinite;\n}` },
    { level: 5, title: 'Respect reduced motion preferences', problem: `Given an element with a continuously spinning animation, write the media query that disables the animation entirely for users who have requested reduced motion at the OS level.`, hints: ['Use @media (prefers-reduced-motion: reduce) and set animation: none.'], solution: `@media (prefers-reduced-motion: reduce) {\n  .spinner {\n    animation: none;\n  }\n}` },
    { level: 6, title: 'Real-world: diagnose janky animation performance', problem: `A mobile menu slide-in animation looks smooth on a high-end laptop but visibly stutters on a mid-range phone. The CSS animates the menu's left property from -300px to 0. Diagnose the likely cause and rewrite the animation to perform better across devices.`, hints: ['Animating left forces layout recalculation every frame — a cost that scales badly on weaker hardware.'], solution: `The likely cause is animating left, which forces the browser to recalculate page layout on every single animation frame — a cost that's far more noticeable on weaker mobile hardware than on a powerful laptop. The fix: animate transform: translateX() instead, which achieves the same visual sliding motion without triggering layout recalculation, typically running smoothly on the GPU regardless of device power.\n\n/* Before (janky on weaker devices) */\n.menu { left: -300px; transition: left 0.3s ease; }\n.menu.open { left: 0; }\n\n/* After (smooth across devices) */\n.menu { transform: translateX(-300px); transition: transform 0.3s ease; }\n.menu.open { transform: translateX(0); }` },
  ],

  interview: [
    { q: 'What is the difference between transition and @keyframes/animation?', a: `transition smoothly animates a property's change between two states — typically a starting value and a value triggered by something like :hover or a class change — and requires that state change to be triggered by something. @keyframes combined with animation defines a self-contained, multi-step animation sequence that can run automatically on its own, repeat, or loop, without needing an external trigger.` },
    { q: 'Why do transform and opacity generally animate more smoothly than properties like width or left?', a: `Animating layout-affecting properties (width, height, top, left, margin) forces the browser to recalculate the page's layout on every single frame of the animation. transform and opacity can typically be handled directly by the GPU as compositing operations, skipping that layout recalculation step entirely, which is why they tend to produce noticeably smoother animation, especially on lower-powered devices.` },
    { q: 'What does prefers-reduced-motion do, and why does it matter for accessibility?', a: `prefers-reduced-motion is a media feature that reflects a user's operating-system-level request to minimize non-essential motion, often due to vestibular disorders or motion sensitivity that can cause genuine discomfort or dizziness from animated interfaces. Respecting it (by reducing or disabling non-essential animations when it's set to "reduce") is an accessibility best practice, not an optional nice-to-have.` },
    { q: 'What is animation-iteration-count: infinite used for, and what are some real examples?', a: `It makes a @keyframes animation repeat indefinitely rather than running once. Common real examples include loading spinners, pulsing notification badges, and subtle "breathing" attention effects — anything that should continue animating for as long as it remains visible, rather than completing once and stopping.` },
    { q: 'Why might excessive or poorly-considered animation hurt a product\'s usability, beyond accessibility concerns?', a: `Overused animation can make an interface feel sluggish (if durations are too long), distracting (if motion draws attention away from what the user is actually trying to do), or unpredictable (if state changes aren't clearly communicated by the motion). Good animation use is generally restrained and purposeful — supporting the user's understanding of what changed, rather than being decoration for its own sake.` },
  ],

  realWorld: [
    { company: 'Google', text: 'Material Design\'s motion guidelines specify precise, restrained timing and easing curves for UI transitions across Google products, treating animation as a deliberate communication tool rather than decoration.' },
    { company: 'Apple', text: 'iOS and macOS interface guidelines emphasize subtle, physically-plausible motion (closely related to the CSS animation principles covered here) as a core part of making interfaces feel responsive and trustworthy.' },
    { company: 'Netflix', text: 'Loading states and content reveal animations across the streaming interface are deliberately kept lightweight and GPU-friendly (favoring transform/opacity) to remain smooth even on lower-powered smart TV hardware.' },
    { company: 'Stripe', text: 'Checkout flow micro-interactions use carefully tuned CSS transitions to provide clear visual feedback during payment processing, while explicitly respecting prefers-reduced-motion for users who\'ve requested it.' },
  ],

  quiz: [
    { type: 'mcq', q: 'What is the main difference between transition and @keyframes/animation?', options: ['They are identical', 'transition animates between two states triggered externally; animation can run automatically/loop on its own', 'transition only works on color properties', 'animation cannot repeat'], correct: 1 },
    { type: 'true-false', q: 'Animating the left property is generally just as smooth as animating transform.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Why do transform and opacity tend to animate more smoothly?', options: ['They are simpler CSS properties', 'They can be handled by the GPU without forcing layout recalculation', 'They only work with @keyframes', 'They are deprecated, so browsers optimize them specially'], correct: 1 },
    { type: 'code-output', q: '.badge { animation: pulse 2s ease-in-out infinite; }\n\nWhat does "infinite" control here?', options: ['The animation duration', 'The animation repeats forever', 'The animation only runs once', 'The element\'s opacity'], correct: 1 },
    { type: 'mcq', q: 'What does prefers-reduced-motion detect?', options: ['The user\'s screen resolution', 'A user\'s OS-level request to minimize non-essential motion', 'The browser\'s rendering speed', 'Whether JavaScript is enabled'], correct: 1 },
    { type: 'true-false', q: 'Respecting prefers-reduced-motion is considered an accessibility best practice.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Why might animating "width" cause performance issues compared to "transform: scale()"?', options: ['Width cannot be animated at all', 'Animating width forces layout recalculation on every frame', 'Scale always looks worse visually', 'There is no real performance difference'], correct: 1 },
    { type: 'drag-drop', q: 'Order the steps of defining and using a keyframe animation: [Define @keyframes, Apply via the animation property, Browser renders each frame]', options: ['Define @keyframes', 'Apply via the animation property', 'Browser renders each frame'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Why might excessive animation hurt usability beyond accessibility concerns?', options: ['It never has any downside', 'It can make an interface feel sluggish, distracting, or unpredictable', 'CSS animations always slow down page load', 'Animation is purely a visual style with no UX impact'], correct: 1 },
    { type: 'code-output', q: '.spinner { animation: spin 0.8s linear infinite; }\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\nWhat visual effect does this produce?', options: ['A fading effect', 'A continuous rotation', 'A color change', 'A bouncing effect'], correct: 1 },
  ],
});
