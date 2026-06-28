/* ==========================================================================
   TOPIC CONTENT DATA — Module 8: Algorithms
   Includes: Sorting, Searching, Recursion, Binary Search, BFS, DFS, Big O
   ========================================================================== */

if (!window.CSFA_RAW_TOPICS) {
  window.CSFA_RAW_TOPICS = [];
}

// 1. Sorting
window.CSFA_RAW_TOPICS.push({
  id: 'sorting',
  module: 8,
  title: 'Sorting',
  tagline: 'Organizing unsorted arrays — Bubble Sort, Merge Sort, and complexity gaps.',
  readMinutes: 8,
  intro: {
    whatItIs: "Sorting is the process of arranging elements in a collection in a specific order (such as ascending numerical or alphabetical order). Common sorting algorithms range from simple O(n^2) methods like Bubble Sort to efficient O(n log n) divide-and-conquer methods like Merge Sort and Quick Sort.",
    whyItMatters: "Sorting is a core utility. If your data is sorted, searching for items becomes exponentially faster (reducing from linear O(n) to logarithmic O(log n) search time).",
    whereUsed: "Used in databases ordering search results, graphics card rendering layers, spreadsheets, and file directories.",
    commonMistakes: "Using slow O(n^2) Bubble Sort logic in production setups with large datasets, freezing the processor thread."
  },
  visual: {
    caption: "Merge Sort: split array, sort sub-arrays, and merge them",
    type: "algo-search"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Native sorting in JavaScript",
      explanation: "JavaScript has a built-in .sort() method, but by default it sorts elements alphabetically as strings.",
      code: "const arr = [10, 2, 30];\narr.sort();\nconsole.log('Default sort:', arr);\narr.sort((a, b) => a - b);\nconsole.log('Numeric sort:', arr);",
      language: "javascript", output: "Default sort: [ 10, 2, 30 ]\nNumeric sort: [ 2, 10, 30 ]"
    },
    {
      difficulty: "easy", title: "Bubble Sort implementation",
      explanation: "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      code: "function bubbleSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - 1; j++) {\n      if (arr[j] > arr[j+1]) {\n        let tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;\n      }\n    }\n  }\n  return arr;\n}\nconsole.log(bubbleSort([5, 2, 8, 1]));",
      language: "javascript", output: "[ 1, 2, 5, 8 ]"
    },
    {
      difficulty: "medium", title: "Merge two sorted arrays",
      explanation: "Merge Sort's core speed comes from merging two already sorted arrays in linear O(n) time.",
      code: "function merge(left, right) {\n  const res = [];\n  let l = 0, r = 0;\n  while (l < left.length && r < right.length) {\n    if (left[l] < right[r]) res.push(left[l++]);\n    else res.push(right[r++]);\n  }\n  return [...res, ...left.slice(l), ...right.slice(r)];\n}\nconsole.log(merge([2, 5], [1, 8]));",
      language: "javascript", output: "[ 1, 2, 5, 8 ]"
    },
    {
      difficulty: "medium-plus", title: "Divide-and-conquer Merge Sort",
      explanation: "Recursively split the array in half until single items remain, then merge them back sorted.",
      code: "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(l, r) {\n  const out = []; let i = 0, j = 0;\n  while (i < l.length && j < r.length) {\n    if (l[i] < r[j]) out.push(l[i++]); else out.push(r[j++]);\n  }\n  return [...out, ...l.slice(i), ...r.slice(j)];\n}\nconsole.log(mergeSort([4, 1, 5, 2]));",
      language: "javascript", output: "[ 1, 2, 4, 5 ]"
    },
    {
      difficulty: "hard", title: "In-place Quick Sort partition",
      explanation: "Quick Sort picks a pivot node and partitions the elements around it in-place.",
      code: "function partition(arr, low, high) {\n  let pivot = arr[high];\n  let i = low - 1;\n  for (let j = low; j < high; j++) {\n    if (arr[j] < pivot) {\n      i++;\n      let tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;\n    }\n  }\n  let tmp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = tmp;\n  return i + 1;\n}\nconst test = [3, 5, 1, 4];\npartition(test, 0, 3);\nconsole.log('Partitioned:', test);",
      language: "javascript", output: "Partitioned: [ 3, 1, 4, 5 ]"
    },
    {
      difficulty: "real-world", title: "Sorted catalog pricing search",
      explanation: "E-commerce stores sort their items to let customers toggle high-to-low listings instantly.",
      code: "const catalog = [\n  { name: 'Shirt', price: 20 },\n  { name: 'Socks', price: 5 },\n  { name: 'Jacket', price: 80 }\n];\ncatalog.sort((a, b) => b.price - a.price);\nconsole.log('Most expensive:', catalog[0].name);",
      language: "javascript", output: "Most expensive: Jacket"
    }
  ],
  exercises: [
    {
      level: 1, title: "Custom numeric sorter",
      problem: "Write the comparison function callback that sorts an array of numbers in descending order.",
      hints: ["The callback parameters are (a, b).", "To sort descending, return b - a."],
      solution: "(a, b) => b - a"
    },
    {
      level: 2, title: "Check sorted status",
      problem: "Write a function isSorted(arr) that returns true if the array of numbers is sorted in ascending order.",
      hints: ["Loop from index 0 to arr.length - 2.", "If arr[i] > arr[i+1], return false. If loop ends, return true."],
      solution: "function isSorted(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    if (arr[i] > arr[i + 1]) return false;\n  }\n  return true;\n}"
    },
    {
      level: 3, title: "Optimized Bubble Sort",
      problem: "Write a bubbleSort function that breaks early if a full pass completes without any swaps (indicating it's already sorted).",
      hints: ["Declare a boolean variable 'swapped' at the start of each outer loop.", "Set it to true if a swap occurs. If false, break."],
      solution: "function bubbleSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n; i++) {\n    let swapped = false;\n    for (let j = 0; j < n - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        let tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;\n        swapped = true;\n      }\n    }\n    if (!swapped) break;\n  }\n  return arr;\n}"
    },
    {
      level: 4, title: "Insertion Sort steps",
      problem: "Write an insertionSort(arr) function that sorts numbers by moving each key element to its correct sorted insertion location.",
      hints: ["Start looping at index 1.", "Store current value key = arr[i].", "Shift elements of sorted section that are greater than key to the right, then insert key."],
      solution: "function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}"
    },
    {
      level: 5, title: "Count inversions in array",
      problem: "Write a function countInversions(arr) that counts how many pairs of indices (i, j) have i < j and arr[i] > arr[j].",
      hints: ["Use nested loops comparing elements.", "Increment a counter when arr[i] > arr[j]."],
      solution: "function countInversions(arr) {\n  let count = 0;\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i] > arr[j]) count++;\n    }\n  }\n  return count;\n}"
    },
    {
      level: 6, title: "Real-world: Priority index sort",
      problem: "Write a function sortUsersByScore(usersList) that sorts users descending by score, but places users flagged as admin at the top of the list regardless of score.",
      hints: ["Use native .sort() with comparison function.", "If both are admins or both are not, sort by b.score - a.score.", "If only one is admin, place them first."],
      solution: "function sortUsersByScore(usersList) {\n  return usersList.sort((a, b) => {\n    if (a.admin && !b.admin) return -1;\n    if (!a.admin && b.admin) return 1;\n    return b.score - a.score;\n  });\n}"
    }
  ],
  interview: [
    {
      q: "Compare Bubble Sort, Merge Sort, and Quick Sort in terms of average and worst-case time complexities.",
      a: "Bubble Sort has average and worst-case complexities of O(n^2). Merge Sort has O(n log n) in all cases (requires extra O(n) helper space). Quick Sort has O(n log n) average complexity, but can degrade to O(n^2) worst-case if pivots are chosen poorly (e.g. sorted input), though it sorts in-place (O(log n) space)."
    },
    {
      q: "Why does JavaScript's array.sort() method require a comparison callback function?",
      a: "By default, array.sort() converts all elements into strings and compares their UTF-16 character code values alphabetically. This causes incorrect sorting for numbers (e.g. '10' sorted before '2'). The comparison callback tells the engine how to compare values (e.g., returning a negative, zero, or positive number)."
    },
    {
      q: "What is a 'stable' sorting algorithm?",
      a: "A sorting algorithm is stable if it preserves the relative original order of items that have identical keys. Stability is critical when sorting records with multiple fields sequentially (e.g., sorting items by date, then sorting them by department)."
    },
    {
      q: "How does the 'Divide and Conquer' paradigm work in Merge Sort?",
      a: "It divides the problem into smaller sub-problems recursively: splitting the unsorted array in half, solving the sub-problems by sorting each half, and then conquering the sub-problems by merging the sorted halves back together in linear time."
    },
    {
      q: "Why is Merge Sort typically preferred for sorting linked lists over arrays?",
      a: "Merge Sort does not require random access indexing to work, only sequential traversal, which matches linked lists. Additionally, merging nodes in linked lists can be done in-place by updating reference pointers, avoiding Merge Sort's O(n) array copying space penalty."
    }
  ],
  realWorld: [
    { company: "Google", text: "V8 engine sorts arrays under the hood using Timsort, which leverages pre-sorted data blocks to achieve near O(n) speeds." },
    { company: "Netflix", text: "Sorts recommendation carousel card arrays based on customer match percentages before sending content payloads." },
    { company: "Amazon", text: "Sorts product tables by price, ratings, or delivery date dynamically across massive elastic database farms." },
    { company: "Stripe", text: "Sorts ledger statements by audit timestamp before compiling compliance export sheets." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the average time complexity of Merge Sort?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], correct: 1 },
    { type: 'true-false', q: 'By default, JS array.sort() sorts numbers correctly without any custom callback function.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which sorting algorithm has a worst-case time complexity of O(n^2) when chosen pivots are poor?', options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Radix Sort'], correct: 1 },
    { type: 'code-output', q: "const a = [5, 1];\na.sort((x, y) => y - x);\nconsole.log(a[0]);", options: ['1', '5', 'undefined', 'Error'], correct: 1 },
    { type: 'mcq', q: 'What is the space complexity of standard Merge Sort on Arrays?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct: 2 },
    { type: 'true-false', q: 'A stable sorting algorithm preserves the original order of equal items.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which sorting algorithm repeatedly compares adjacent elements and swaps them if they are out of order?', options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort'], correct: 0 },
    { type: 'drag-drop', q: 'Order algorithms from fastest to slowest average time: [Merge Sort, Insertion Sort, Bubble Sort]', options: ['Merge Sort', 'Insertion Sort', 'Bubble Sort'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What paradigm splits a problem into smaller identical steps to solve recursively?', options: ['Linear programming', 'Dynamic lookup', 'Divide and Conquer', 'Linear mapping'], correct: 2 },
    { type: 'code-output', q: "const a = [3, 2, 1];\na.sort();\nconsole.log(a[0]);", options: ['1', '2', '3', 'undefined'], correct: 0 }
  ]
});

// 2. Searching
window.CSFA_RAW_TOPICS.push({
  id: 'searching',
  module: 8,
  title: 'Searching',
  tagline: 'Locating data points in collections — Linear vs Binary Search paradigms.',
  readMinutes: 6,
  intro: {
    whatItIs: "Searching is the algorithmic process of finding a specific target element within a collection. The two fundamental search strategies are Linear Search (scanning every item sequentially) and Binary Search (repeatedly dividing sorted bounds in half).",
    whyItMatters: "Searching is one of the most common computer tasks. While linear search is simple, binary search is vastly more efficient for large datasets, making it an essential performance optimization.",
    whereUsed: "Used in databases querying records, dictionary lookup keys, autocompletion search inputs, and compilers scanning symbols.",
    commonMistakes: "Attempting to perform Binary Search on unsorted data, which yields incorrect results because the divide-and-conquer assumptions are violated."
  },
  visual: {
    caption: "Linear Search (scans all) vs Binary Search (halves bounds)",
    type: "algo-search"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Linear Search loop",
      explanation: "Scanning items one-by-one from index 0 until target is found.",
      code: "const arr = [10, 25, 5, 80];\nfunction linearSearch(target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\nconsole.log('Found 5 at index:', linearSearch(5));",
      language: "javascript", output: "Found 5 at index: 2"
    },
    {
      difficulty: "easy", title: "JavaScript native search tools",
      explanation: ".find() and .includes() run optimized linear search scans on arrays.",
      code: "const users = ['Alice', 'Bob', 'Grace'];\nconsole.log('Has Bob:', users.includes('Bob'));",
      language: "javascript", output: "Has Bob: true"
    },
    {
      difficulty: "medium", title: "Iterative Binary Search",
      explanation: "Maintain low and high pointers, checking the midpoint index and halving bounds each step.",
      code: "function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1; else high = mid - 1;\n  }\n  return -1;\n}\nconsole.log(binarySearch([2, 5, 10, 20], 10));",
      language: "javascript", output: "2"
    },
    {
      difficulty: "medium-plus", title: "Recursive Binary Search",
      explanation: "Passing updated search boundaries recursively through function parameters.",
      code: "function recBS(arr, target, low, high) {\n  if (low > high) return -1;\n  let mid = Math.floor((low + high) / 2);\n  if (arr[mid] === target) return mid;\n  if (arr[mid] < target) return recBS(arr, target, mid + 1, high);\n  return recBS(arr, target, low, mid - 1);\n}\nconsole.log(recBS([2, 5, 10], 5, 0, 2));",
      language: "javascript", output: "1"
    },
    {
      difficulty: "hard", title: "Interpolation Search simulator",
      explanation: "Interpolation search estimates target location in uniformly distributed data, similar to lookup books.",
      code: "function interpolationSearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high && target >= arr[low] && target <= arr[high]) {\n    let pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));\n    if (arr[pos] === target) return pos;\n    if (arr[pos] < target) low = pos + 1; else high = pos - 1;\n  }\n  return -1;\n}\nconsole.log(interpolationSearch([10, 20, 30, 40], 30));",
      language: "javascript", output: "2"
    },
    {
      difficulty: "real-world", title: "Indexed product SKU search",
      explanation: "Stock database programs lookup barcodes in sorted item records instantly using Binary Search.",
      code: "const catalog = [\n  { sku: 1001, name: 'Phone' },\n  { sku: 1005, name: 'Tablet' },\n  { sku: 1010, name: 'Laptop' }\n];\nfunction findProduct(sku) {\n  let l = 0, h = catalog.length - 1;\n  while (l <= h) {\n    let m = Math.floor((l+h)/2);\n    if (catalog[m].sku === sku) return catalog[m].name;\n    if (catalog[m].sku < sku) l = m + 1; else h = m - 1;\n  }\n  return 'Not found';\n}\nconsole.log('SKU 1005:', findProduct(1005));",
      language: "javascript", output: "SKU 1005: Tablet"
    }
  ],
  exercises: [
    {
      level: 1, title: "Native find index",
      problem: "Write a statement using arr.indexOf(100) to search for target 100 in the array 'values'.",
      hints: ["Call the indexOf method on the values array variable."],
      solution: "values.indexOf(100);"
    },
    {
      level: 2, title: "Find object property",
      problem: "Write code using arr.find() to return the user object whose name is 'Grace' from the array 'users'.",
      hints: ["Pass callback: u => u.name === 'Grace'."],
      solution: "users.find(u => u.name === 'Grace');"
    },
    {
      level: 3, title: "First index checker",
      problem: "Write a function searchFirst(arr, target) that linear-searches for target, returning the index or -1 if missing.",
      hints: ["Use a standard loop checking elements: if (arr[i] === target) return i."],
      solution: "function searchFirst(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}"
    },
    {
      level: 4, title: "Binary Search bounds check",
      problem: "Modify Binary Search so that if target is missing, it returns the index where the target *should* be inserted to maintain sort order.",
      hints: ["When low > high, the loop ends.", "Return the value of low pointer."],
      solution: "function searchInsert(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1; else high = mid - 1;\n  }\n  return low;\n}"
    },
    {
      level: 5, title: "Search matrix coords",
      problem: "Write a function searchGrid(grid, target) that scans a 2D grid and returns [row, col] or [-1, -1] if missing.",
      hints: ["Use nested loops.", "Outer loop for rows, inner loop for columns. If grid[r][c] === target, return [r, c]."],
      solution: "function searchGrid(grid, target) {\n  for (let r = 0; r < grid.length; r++) {\n    for (let c = 0; c < grid[r].length; c++) {\n      if (grid[r][c] === target) return [r, c];\n    }\n  }\n  return [-1, -1];\n}"
    },
    {
      level: 6, title: "Real-world: Substring search index",
      problem: "Write a function searchLogs(logsArray, keyword) that returns all log strings containing keyword, utilizing regex or includes().",
      hints: ["Filter logsArray.", "Check if log.includes(keyword)."],
      solution: "function searchLogs(logsArray, keyword) {\n  return logsArray.filter(log => log.includes(keyword));\n}"
    }
  ],
  interview: [
    {
      q: "Compare Linear Search and Binary Search in terms of complexity and requirements.",
      a: "Linear Search operates in O(n) time, requires no sorting order, and works on any array collection. Binary Search operates in O(log n) time, but strictly requires the array collection to be sorted beforehand; otherwise, it splits ranges incorrectly and fails."
    },
    {
      q: "Why is Binary Search faster than Linear Search for large arrays?",
      a: "Linear Search scans items sequentially, adding 1 comparison per element. Binary Search discards half of the search range with each comparison step. For 1 million elements, Linear Search requires up to 1 million steps, while Binary Search takes at most 20 steps (2^20 ≈ 1 million)."
    },
    {
      q: "How do you avoid integer overflow when calculating the midpoint in Binary Search?",
      a: "In languages with static integer limits, calculating 'mid = (low + high) / 2' can overflow if low + high exceeds the max integer bounds. To prevent this, calculate the midpoint using subtraction: 'mid = low + Math.floor((high - low) / 2)'."
    },
    {
      q: "What is the time complexity of searching inside a Hash Map versus Binary Search?",
      a: "Hash Map lookups take O(1) constant average time because they compute array indices directly using a hash key. Binary Search takes O(log n) logarithmic time because it requires checking tree branches or dividing sorted array index bounds."
    },
    {
      q: "Can you perform Binary Search on a singly Linked List?",
      a: "Yes, but it is highly inefficient (O(n)). Linked lists lack random access index lookups. Finding the midpoint requires traversing from the head node node-by-node (costing O(n) steps), neutralizing Binary Search's logarithmic performance advantages."
    }
  ],
  realWorld: [
    { company: "Google", text: "Computes autocomplete search suggestions instantly using ternary search trees and prefix lookup index tables." },
    { company: "Amazon", text: "Searches database warehouses using indexed key lookups to locate order tracking rows." },
    { company: "Stripe", text: "Performs audit lookups on transactions using binary index trees sorted by timestamp." },
    { company: "Netflix", text: "Scans movie title logs using optimized substring search filters on user search dashboards." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the time complexity of Linear Search?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct: 2 },
    { type: 'true-false', q: 'Binary Search can be safely executed on any unsorted array.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What is the worst-case comparison count to search 1,000,000 sorted elements using Binary Search?', options: ['1,000,000', '1,000', '20', '1'], correct: 2 },
    { type: 'code-output', q: "const arr = [10, 20, 30];\nconsole.log(arr.indexOf(40));", options: ['-1', '0', 'undefined', 'Error'], correct: 0 },
    { type: 'mcq', q: 'How does Binary Search update bounds if mid value is smaller than target?', options: ['high = mid - 1', 'low = mid + 1', 'low = 0', 'high = mid + 1'], correct: 1 },
    { type: 'true-false', q: 'Searching for a key in a Hash Map is generally faster than performing Binary Search on a sorted array.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'Which method calculates the safe midpoint without risk of integer overflow?', options: ['(low + high) / 2', 'low + (high - low) / 2', 'high - low / 2', 'low * high / 2'], correct: 1 },
    { type: 'drag-drop', q: 'Order searches by time efficiency (best to worst): [Hash Map lookup, Binary Search, Linear Search]', options: ['Hash Map lookup', 'Binary Search', 'Linear Search'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which method is native to JS arrays for checking if a value exists, returning boolean?', options: ['find()', 'indexOf()', 'includes()', 'filter()'], correct: 2 },
    { type: 'code-output', q: "const u = [{ id: 1 }, { id: 2 }];\nconsole.log(u.find(item => item.id === 2).id);", options: ['1', '2', 'undefined', 'Error'], correct: 1 }
  ]
});

// 3. Recursion
window.CSFA_RAW_TOPICS.push({
  id: 'recursion',
  module: 8,
  title: 'Recursion',
  tagline: 'Function execution loop triggers — base cases, recursive cases, and stack limits.',
  readMinutes: 7,
  intro: {
    whatItIs: "Recursion is a programming technique where a function calls itself to solve a problem. Every recursive function must have two parts: a Base Case (which terminates the recursion) and a Recursive Case (which reduces the problem and triggers the self-call).",
    whyItMatters: "Recursion is the natural way to solve problems with nested or branching structures, such as directories, trees, graphs, and divide-and-conquer sorting algorithms.",
    whereUsed: "Used in directory searches, XML/HTML parser engines, JSON stringification, and fractal graphics generation.",
    commonMistakes: "Forgetting to write a base case or writing a recursive step that never converges to the base case, causing infinite loops that freeze the thread and throw 'Maximum call stack size exceeded'."
  },
  visual: {
    caption: "Call stack accumulation and rewind during recursion",
    type: "algo-recursion"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Simulating countdown",
      explanation: "A simple recursive countdown that terminates when it hits the base case (0).",
      code: "let out = '';\nfunction countdown(n) {\n  if (n <= 0) { out += 'Done'; return; } // Base case\n  out += n + ' ';\n  countdown(n - 1); // Recursive case\n}\ncountdown(3);\nconsole.log(out);",
      language: "javascript", output: "3 2 1 Done"
    },
    {
      difficulty: "easy", title: "Calculating Factorial",
      explanation: "n! is calculated as n * (n - 1)! recursively, stopping when n is 1.",
      code: "function factorial(n) {\n  if (n <= 1) return 1; // Base case\n  return n * factorial(n - 1); // Recursive case\n}\nconsole.log(factorial(4));",
      language: "javascript", output: "24"
    },
    {
      difficulty: "medium", title: "Summing numbers in a list",
      explanation: "Summing elements of an array recursively by breaking down head and tail.",
      code: "function sum(arr) {\n  if (arr.length === 0) return 0;\n  return arr[0] + sum(arr.slice(1));\n}\nconsole.log(sum([1, 2, 3, 4]));",
      language: "javascript", output: "10"
    },
    {
      difficulty: "medium-plus", title: "Fibonacci sequence generator",
      explanation: "Fibonacci numbers are generated recursively by summing the two previous values: fib(n) = fib(n-1) + fib(n-2).",
      code: "function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\nconsole.log(fib(5));",
      language: "javascript", output: "5"
    },
    {
      difficulty: "hard", title: "Call stack overflow error catcher",
      explanation: "Exceeding the browser's execution stack memory limits throws a RangeError.",
      code: "function overflow() {\n  return overflow();\n}\ntry {\n  overflow();\n} catch (e) {\n  console.log('Error caught:', e.name);\n}",
      language: "javascript", output: "Error caught: RangeError"
    },
    {
      difficulty: "real-world", title: "Nested JSON object serializer",
      explanation: "JSON stringifiers traverse arbitrarily nested structures recursively to build output strings.",
      code: "function stringify(obj) {\n  if (typeof obj !== 'object' || obj === null) return String(obj);\n  const parts = [];\n  for (const k in obj) {\n    parts.push(k + ':' + stringify(obj[k]));\n  }\n  return '{' + parts.join(',') + '}';\n}\nconsole.log(stringify({ a: 1, b: { c: 2 } }));",
      language: "javascript", output: "{a:1,b:{c:2}}"
    }
  ],
  exercises: [
    {
      level: 1, title: "Factorial base case",
      problem: "Write the conditional statement that checks the base case (n <= 1) for a factorial function, returning 1.",
      hints: ["If n is 0 or 1, factorial is 1.", "Use: if (n <= 1) return 1;"],
      solution: "if (n <= 1) return 1;"
    },
    {
      level: 2, title: "Sum of natural numbers",
      problem: "Write a recursive function sumTo(n) that returns the sum of numbers from 1 to n. The base case is n === 1.",
      hints: ["Base case: if (n === 1) return 1.", "Recursive case: return n + sumTo(n - 1)."],
      solution: "function sumTo(n) {\n  if (n === 1) return 1;\n  return n + sumTo(n - 1);\n}"
    },
    {
      level: 3, title: "Power calculator",
      problem: "Write a recursive function power(base, exp) that calculates base^exp. The base case is exp === 0, returning 1.",
      hints: ["If exp === 0, return 1.", "Otherwise, return base * power(base, exp - 1)."],
      solution: "function power(base, exp) {\n  if (exp === 0) return 1;\n  return base * power(base, exp - 1);\n}"
    },
    {
      level: 4, title: "Recursive string reverser",
      problem: "Write a recursive function reverseString(str) that takes a string and returns it reversed.",
      hints: ["Base case: if (str === '') return ''.", "Recursive case: return reverseString(str.slice(1)) + str[0]."],
      solution: "function reverseString(str) {\n  if (str === '') return '';\n  return reverseString(str.slice(1)) + str[0];\n}"
    },
    {
      level: 5, title: "Iterate nested array sum",
      problem: "Write a recursive function sumNestedArray(arr) that sums all numbers in an array that can contain nested arrays (e.g. [1, [2, 3], 4]).",
      hints: ["Loop over elements.", "If element is an array (Array.isArray), recurse on it. Otherwise, add to total."],
      solution: "function sumNestedArray(arr) {\n  let total = 0;\n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      total += sumNestedArray(item);\n    } else {\n      total += item;\n    }\n  }\n  return total;\n}"
    },
    {
      level: 6, title: "Real-world: Flat directory tree mapping",
      problem: "Write a recursive function getFileNames(folder) that crawls a folder category tree and returns a flat array of all filenames.",
      hints: ["Collect folder.files.", "Iterate folder.folders, calling getFileNames recursively on each, and concat to list."],
      solution: "function getFileNames(folder) {\n  let list = [...folder.files];\n  if (folder.folders) {\n    for (const sub of folder.folders) {\n      list = list.concat(getFileNames(sub));\n    }\n  }\n  return list;\n}"
    }
  ],
  interview: [
    {
      q: "What are the two essential components of a recursive function?",
      a: "1) The Base Case: A condition that stops the recursion and returns a value directly, preventing infinite looping. 2) The Recursive Case: The part of the function where it calls itself with a reduced input that converges toward the base case."
    },
    {
      q: "What causes a 'Maximum call stack size exceeded' error?",
      a: "This happens when a recursive function fails to hit its base case (due to a missing base case or incorrect state reductions). The function continues to push frame context objects onto the CPU's execution call stack until it runs out of stack memory allocation, throwing a RangeError."
    },
    {
      q: "Compare recursion and iteration in terms of time and space complexity.",
      a: "Both can achieve identical O(f(n)) time complexities. However, recursion requires O(d) auxiliary space (where d is the recursion depth) to store execution context frames on the call stack. Iteration runs in O(1) constant auxiliary space, making it more memory-efficient."
    },
    {
      q: "What is 'Tail Call Optimization' (TCO)?",
      a: "TCO is a compiler optimization where if the recursive call is the absolute last operation in the function ('tail position'), the compiler reuses the current stack frame instead of creating a new one. This allows writing recursive functions that run in O(1) constant stack space."
    },
    {
      q: "Why is a recursive Fibonacci function without caching slow, and how do you optimize it?",
      a: "The standard recursive fib(n) splits into fib(n-1) + fib(n-2), resulting in O(2^n) exponential time because it solves the same sub-problems repeatedly (e.g. computing fib(2) multiple times). It is optimized to O(n) using Memoization (caching previous values in a hash map) or switching to iteration."
    }
  ],
  realWorld: [
    { company: "Google", text: "Chrome V8 engine parses HTML syntax trees recursively, building DOM elements page-by-page." },
    { company: "OpenAI", text: "Traces token generation decision nodes recursively to calculate branch probability paths." },
    { company: "Stripe", text: "Validates complex, nested billing rules recursively before executing monthly invoice calculations." },
    { company: "Netflix", text: "Crawls database categorization category trees recursively to align user preferences with content genres." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which component halts recursive execution, preventing infinite loops?', options: ['Recursive case', 'Base case', 'Loop boundary', 'Default parameter'], correct: 1 },
    { type: 'true-false', q: 'Recursive functions run in O(1) constant space memory because they reuse the same function block.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What error is thrown when the call stack runs out of memory?', options: ['TypeError', 'RangeError: Maximum call stack size exceeded', 'ReferenceError', 'SyntaxError'], correct: 1 },
    { type: 'code-output', q: "function sum(n) {\n  if (n <= 1) return 1;\n  return n + sum(n-1);\n}\nconsole.log(sum(3));", options: ['3', '5', '6', 'Error'], correct: 2 },
    { type: 'mcq', q: 'What compiler optimization technique allows recursive calls to reuse the same stack frame?', options: ['Memoization', 'Tail Call Optimization (TCO)', 'Garbage collection', 'In-lining'], correct: 1 },
    { type: 'true-false', q: 'Any recursive algorithm can also be written using loops (iteration).', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What is the time complexity of a recursive Fibonacci function without caching?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(2^n)'], correct: 3 },
    { type: 'drag-drop', q: 'Order the execution cycle: [Push frame to stack, Evaluate base case check, Pop frame on return]', options: ['Push frame to stack', 'Evaluate base case check', 'Pop frame on return'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which structures are most naturally traversed using recursion?', options: ['Unsorted flat arrays', 'Hierarchical trees and graphs', 'Sequential print queues', 'LIFO stacks'], correct: 1 },
    { type: 'code-output', q: "function test(x) {\n  if (x === 0) return 0;\n  return x + test(x-1);\n}\n// What happens if we call test(-1)?", options: ['0', '-1', 'RangeError: Maximum call stack size exceeded', 'NaN'], correct: 2 }
  ]
});

// 4. Binary Search
window.CSFA_RAW_TOPICS.push({
  id: 'binary-search',
  module: 8,
  title: 'Binary Search',
  tagline: 'Logarithmic search O(log n) — halving sorted indexes to find targets fast.',
  readMinutes: 7,
  intro: {
    whatItIs: "Binary Search is an efficient algorithm for finding an item in a sorted list. It works by repeatedly halving the search space: comparing the target value to the middle element, and discarding the half where the target cannot exist.",
    whyItMatters: "Binary Search is incredibly fast. For an array of 1 billion sorted elements, linear search takes up to 1 billion comparisons, while binary search takes at most 30 comparisons.",
    whereUsed: "Used in database indexing, sorting algorithms (Timsort), compilers looking up library tags, and configuration checkers (git bisect).",
    commonMistakes: "Executing Binary Search on an unsorted array, or writing infinite loop boundaries by failing to update high or low pointers correctly (e.g. low = mid instead of low = mid + 1)."
  },
  visual: {
    caption: "Binary Search: step-by-step halving of search boundaries",
    type: "algo-search"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Finding mid index",
      explanation: "Calculating the middle index between low and high pointers.",
      code: "let low = 0, high = 10;\nlet mid = Math.floor((low + high) / 2);\nconsole.log('Midpoint index:', mid);",
      language: "javascript", output: "Midpoint index: 5"
    },
    {
      difficulty: "easy", title: "Target check matching",
      explanation: "If array[mid] matches target, the search ends instantly.",
      code: "const arr = [10, 20, 30];\nconst target = 20;\nconst mid = 1;\nconsole.log('Match found:', arr[mid] === target);",
      language: "javascript", output: "Match found: true"
    },
    {
      difficulty: "medium", title: "Halving bounds step",
      explanation: "If target is larger than mid, move the low boundary; if smaller, move the high boundary.",
      code: "let target = 25;\nlet arr = [10, 20, 30, 40];\nlet low = 0, high = 3;\nlet mid = 1;\nif (arr[mid] < target) {\n  low = mid + 1;\n}\nconsole.log('New search range low index:', low);",
      language: "javascript", output: "New search range low index: 2"
    },
    {
      difficulty: "medium-plus", title: "Full iterative Binary Search",
      explanation: "Running the search inside a while loop until pointers cross.",
      code: "function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1; else high = mid - 1;\n  }\n  return -1;\n}\nconsole.log('Found 12 at index:', binarySearch([2, 4, 8, 12, 16], 12));",
      language: "javascript", output: "Found 12 at index: 3"
    },
    {
      difficulty: "hard", title: "Finding first occurrence of duplicates",
      explanation: "Modifying Binary Search to continue searching left even after finding a match, to locate the first occurrence.",
      code: "function findFirst(arr, target) {\n  let low = 0, high = arr.length - 1, res = -1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) { res = mid; high = mid - 1; } // continue left\n    else if (arr[mid] < target) low = mid + 1; else high = mid - 1;\n  }\n  return res;\n}\nconsole.log('First index of 5:', findFirst([2, 5, 5, 5, 8], 5));",
      language: "javascript", output: "First index of 5: 1"
    },
    {
      difficulty: "real-world", title: "Git bisect debug simulation",
      explanation: "Git bisect uses binary search across a commit history timeline to quickly isolate which commit introduced a bug.",
      code: "const history = [\n  { hash: 'c1', bad: false },\n  { hash: 'c2', bad: false },\n  { hash: 'c3', bad: true },\n  { hash: 'c4', bad: true }\n];\nfunction bisect() {\n  let l = 0, h = history.length - 1, badCommit = null;\n  while (l <= h) {\n    let m = Math.floor((l+h)/2);\n    if (history[m].bad) { badCommit = history[m]; h = m - 1; } // search earlier\n    else l = m + 1;\n  }\n  return badCommit.hash;\n}\nconsole.log('Culprit commit hash:', bisect());",
      language: "javascript", output: "Culprit commit hash: c3"
    }
  ],
  exercises: [
    {
      level: 1, title: "Calculate mid pointer",
      problem: "Write the formula to calculate mid index using low and high, avoiding integer overflow.",
      hints: ["Add low to half of the range difference: high - low."],
      solution: "low + Math.floor((high - low) / 2)"
    },
    {
      level: 2, title: "Halve left boundary",
      problem: "Write the statement that updates 'high' boundary when target is smaller than the value at index 'mid'.",
      hints: ["If target is smaller, discard mid and everything to its right.", "Set high = mid - 1."],
      solution: "high = mid - 1;"
    },
    {
      level: 3, title: "Halve right boundary",
      problem: "Write the statement that updates 'low' boundary when target is larger than the value at index 'mid'.",
      hints: ["If target is larger, discard mid and everything to its left.", "Set low = mid + 1."],
      solution: "low = mid + 1;"
    },
    {
      level: 4, title: "Find insertion point",
      problem: "Write a function findInsertIndex(arr, target) that returns the index where target should be placed in sorted arr.",
      hints: ["Run binary search.", "When loop terminates, return the low pointer index."],
      solution: "function findInsertIndex(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1; else high = mid - 1;\n  }\n  return low;\n}"
    },
    {
      level: 5, title: "Recursive search wrapper",
      problem: "Write a recursive binary search function recurseBS(arr, target, l, h) that returns index or -1.",
      hints: ["Base case: if (l > h) return -1.", "Calculate mid.", "Check match or recurse left/right."],
      solution: "function recurseBS(arr, target, l, h) {\n  if (l > h) return -1;\n  const m = l + Math.floor((h - l) / 2);\n  if (arr[m] === target) return m;\n  if (arr[m] < target) return recurseBS(arr, target, m + 1, h);\n  return recurseBS(arr, target, l, m - 1);\n}"
    },
    {
      level: 6, title: "Real-world: Square root calculator",
      problem: "Write a function squareRoot(n) that calculates the integer square root of n in O(log n) time using binary search between 0 and n.",
      hints: ["Pointers: low = 0, high = n, ans = 0.", "Mid = (low+high)/2. If mid*mid === n, return mid.", "If mid*mid < n, low = mid+1, ans = mid; else high = mid-1.", "Return ans."],
      solution: "function squareRoot(n) {\n  if (n === 0 || n === 1) return n;\n  let low = 1, high = n, ans = 0;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (mid * mid === n) return mid;\n    if (mid * mid < n) {\n      low = mid + 1;\n      ans = mid;\n    } else {\n      high = mid - 1;\n    }\n  }\n  return ans;\n}"
    }
  ],
  interview: [
    {
      q: "Explain how Binary Search achieves O(log n) time complexity.",
      a: "Binary Search discards half of the remaining elements at each step. If you double the size of the array, it only adds a single additional comparison step. The relationship between array size n and search steps is logarithmic (2^steps = n), resulting in O(log n) time."
    },
    {
      q: "What is the prerequisite for running Binary Search?",
      a: "The underlying collection must be sorted in ascending or descending order. If the collection is not sorted, the assumption that the target must be on the left or right of a midpoint is invalid, and the search will fail to locate the item."
    },
    {
      q: "How does 'git bisect' use Binary Search to debug commits?",
      a: "It treats the commit history timeline as a sorted array (from oldest to newest). It checks a midpoint commit: if it is bad, the bug was introduced at or before this commit, so it checks the left half. If it is good, the bug was introduced after, so it checks the right half."
    },
    {
      q: "What is the difference between recursive and iterative Binary Search in terms of memory?",
      a: "Iterative Binary Search runs in O(1) constant auxiliary space because it updates simple pointer variables inside a loop. Recursive Binary Search runs in O(log n) auxiliary space because it pushes execution frame context objects onto the call stack for each step."
    },
    {
      q: "Why is Binary Search inefficient on a Linked List?",
      a: "Finding the midpoint element in a Linked List requires traversing node-by-node from the head pointer, which takes O(n) linear steps. Repeating this traversal in each step makes the overall search run in O(n) time, neutralizing the O(log n) performance advantage."
    }
  ],
  realWorld: [
    { company: "Google", text: "Applies binary search algorithms to sorted index tables to fetch keyword occurrences in search queries." },
    { company: "Amazon", text: "Retrieves items from stock inventories using barcode lookups indexed via binary search keys." },
    { company: "Stripe", text: "Uses binary search across transactional timestamps to compile reports within custom date windows." },
    { company: "Netflix", text: "Coordinates stream rendering keys in playback timelines using binary search ranges to align frames." }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the time complexity of Binary Search?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct: 1 },
    { type: 'true-false', q: 'Binary Search strictly requires the dataset array to be pre-sorted.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What happens to the search space with each comparison step in Binary Search?', options: ['It shrinks by 1 element', 'It is reduced by half', 'It doubles', 'It stays the same'], correct: 1 },
    { type: 'code-output', q: "let low = 0, high = 6;\nconsole.log(Math.floor((low + high)/2));", options: ['2', '3', '4', 'Error'], correct: 1 },
    { type: 'mcq', q: 'Which bug happens if you update boundaries using low = mid instead of low = mid + 1?', options: ['Stack Overflow', 'Infinite loop on missing targets', 'Syntax Error', 'CORS block'], correct: 1 },
    { type: 'true-false', q: 'Iterative Binary Search uses O(log n) extra space memory on the call stack.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which tool in Git uses Binary Search to find the commit that introduced a bug?', options: ['git log', 'git bisect', 'git blame', 'git diff'], correct: 1 },
    { type: 'drag-drop', q: 'Order the Binary Search steps to find 15 in [10, 15, 20]: [Check mid 15, Match target, Return index 1]', options: ['Check mid 15', 'Match target', 'Return index 1'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'What is the maximum number of comparisons to search 1,000 sorted elements using Binary Search?', options: ['1,000', '500', '10', '1'], correct: 2 },
    { type: 'code-output', q: "const a = [1, 2, 3];\n// What index is returned search for 4?\nlet l = 0, h = 2, ans = -1;\nwhile(l<=h) {\n  let m = Math.floor((l+h)/2);\n  if (a[m] === 4) { ans = m; break; } \n  if (a[m] < 4) l = m + 1; else h = m - 1;\n}\nconsole.log(ans);", options: ['-1', '0', '3', 'undefined'], correct: 0 }
  ]
});

// 5. BFS (Breadth-First Search)
window.CSFA_RAW_TOPICS.push({
  id: 'bfs',
  module: 8,
  title: 'BFS (Breadth-First Search)',
  tagline: 'Level-by-level tree and graph traversal using a queue buffer.',
  readMinutes: 8,
  intro: {
    whatItIs: "Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a chosen node (like the root of a tree) and explores all of its neighbor nodes at the current depth before moving on to nodes at the next depth level.",
    whyItMatters: "BFS is optimal for finding the shortest path on unweighted graphs because it explores nodes in order of their distance from the start, guaranteeing that the first path found is the shortest.",
    whereUsed: "Used in network routing hops, social network friend connections, GPS directions, and crawlers indexing website links.",
    commonMistakes: "Forgetting to use a Queue (FIFO) to track neighbors, which disrupts the level-by-level traversal order."
  },
  visual: {
    caption: "BFS: level-by-level tree node exploration using a FIFO queue",
    type: "bfs-dfs"
  },
  examples: [
    {
      difficulty: "very-easy", title: "BFS tracking array",
      explanation: "BFS relies on a FIFO queue to enforce level-by-level node exploration.",
      code: "const queue = ['Root'];\nqueue.push('Child A'); // Enqueue neighbor\nconsole.log('Next to explore:', queue.shift());",
      language: "javascript", output: "Next to explore: Root"
    },
    {
      difficulty: "easy", title: "BFS traversal step",
      explanation: "Taking a node, checking its value, and adding its child nodes to the back of the queue.",
      code: "const root = { val: 1, children: [{ val: 2 }, { val: 3 }] };\nconst queue = [root];\nconst current = queue.shift();\ncurrent.children.forEach(c => queue.push(c));\nconsole.log('Queue size now:', queue.length);",
      language: "javascript", output: "Queue size now: 2"
    },
    {
      difficulty: "medium", title: "Level-Order Tree traversal",
      explanation: "Traversing a tree level-by-level using a queue loop until empty.",
      code: "const tree = {\n  val: 'A',\n  left: { val: 'B', left: null, right: null },\n  right: { val: 'C', left: null, right: null }\n};\nconst q = [tree];\nlet out = '';\nwhile (q.length > 0) {\n  let curr = q.shift();\n  out += curr.val + ' ';\n  if (curr.left) q.push(curr.left);\n  if (curr.right) q.push(curr.right);\n}\nconsole.log(out.trim());",
      language: "javascript", output: "A B C"
    },
    {
      difficulty: "medium-plus", title: "Graph BFS cycle protection",
      explanation: "Using a Set to track visited nodes prevents infinite loops in graphs that contain cycles.",
      code: "const graph = { 'A': ['B'], 'B': ['A'] };\nconst q = ['A'];\nconst visited = new Set(['A']);\nwhile (q.length > 0) {\n  let curr = q.shift();\n  graph[curr].forEach(n => {\n    if (!visited.has(n)) { visited.add(n); q.push(n); }\n  });\n}\nconsole.log('Visited vertices:', [...visited].join(', '));",
      language: "javascript", output: "Visited vertices: A, B"
    },
    {
      difficulty: "hard", title: "BFS shortest path calculator",
      explanation: "Computing the minimum number of edge hops to reach a target node using BFS.",
      code: "const graph = { 'A': ['B'], 'B': ['C'], 'C': [] };\nfunction shortestPath(start, end) {\n  const q = [[start, 0]];\n  const visited = new Set([start]);\n  while (q.length > 0) {\n    let [curr, dist] = q.shift();\n    if (curr === end) return dist;\n    for (const n of graph[curr] || []) {\n      if (!visited.has(n)) { visited.add(n); q.push([n, dist + 1]); }\n    }\n  }\n  return -1;\n}\nconsole.log('A to C hops:', shortestPath('A', 'C'));",
      language: "javascript", output: "A to C hops: 2"
    },
    {
      difficulty: "real-world", title: "Dynamic web crawler simulation",
      explanation: "Search engine web crawlers discover pages level-by-level by parsing links in a FIFO queue.",
      code: "const web = { 'index.html': ['about.html', 'blog.html'], 'about.html': [] };\nconst queue = ['index.html'];\nconst discovered = new Set(['index.html']);\nwhile (queue.length > 0) {\n  const current = queue.shift();\n  for (const page of web[current] || []) {\n    if (!discovered.has(page)) { discovered.add(page); queue.push(page); }\n  }\n}\nconsole.log('Total pages indexed:', discovered.size);",
      language: "javascript", output: "Total pages indexed: 3"
    }
  ],
  exercises: [
    {
      level: 1, title: "Define BFS queue",
      problem: "Write a statement initializing an array queue with a single element rootNode to start BFS.",
      hints: ["Wrap rootNode inside brackets: [rootNode]."],
      solution: "const queue = [rootNode];"
    },
    {
      level: 2, title: "Enqueue children check",
      problem: "Write the code loop to push left and right children of a node 'curr' into a queue array if they exist.",
      hints: ["If curr.left exists, queue.push(curr.left).", "If curr.right exists, queue.push(curr.right)."],
      solution: "if (curr.left) queue.push(curr.left);\nif (curr.right) queue.push(curr.right);"
    },
    {
      level: 3, title: "Level Order collector",
      problem: "Write a function printLevelOrder(root) that runs BFS and returns an array of node values.",
      hints: ["Initialize queue = [root], result = [].", "Use while(queue.length), shift, push val, enqueue left/right."],
      solution: "function printLevelOrder(root) {\n  if (!root) return [];\n  const q = [root], res = [];\n  while (q.length > 0) {\n    const curr = q.shift();\n    res.push(curr.val);\n    if (curr.left) q.push(curr.left);\n    if (curr.right) q.push(curr.right);\n  }\n  return res;\n}"
    },
    {
      level: 4, title: "Graph neighbor explorer",
      problem: "Write a BFS step that iterates over an array of neighbor vertices, adding them to a queue only if they are not in the visited Set.",
      hints: ["Use neighbors.forEach(n => ...).", "If (!visited.has(n)) { visited.add(n); queue.push(n); }."],
      solution: "neighbors.forEach(n => {\n  if (!visited.has(n)) {\n    visited.add(n);\n    queue.push(n);\n  }\n});"
    },
    {
      level: 5, title: "Level counter",
      problem: "Write a function getTreeHeightBFS(root) that returns the height of a tree using a level-by-level BFS loop.",
      hints: ["Use nested loops: run an inner loop for the size of the queue at the start of each level.", "Increment height after processing each level."],
      solution: "function getTreeHeightBFS(root) {\n  if (!root) return 0;\n  const q = [root]; let height = 0;\n  while (q.length > 0) {\n    let size = q.length;\n    for (let i = 0; i < size; i++) {\n      const curr = q.shift();\n      if (curr.left) q.push(curr.left);\n      if (curr.right) q.push(curr.right);\n    }\n    height++;\n  }\n  return height;\n}"
    },
    {
      level: 6, title: "Real-world: Social connection path",
      problem: "Write a function getFriendPath(graph, start, target) that returns the shortest array path of user names connecting start to target.",
      hints: ["Enqueued items should store [node, pathArray].", "PathArray for neighbor is [...currentPath, neighbor].", "If node === target, return pathArray."],
      solution: "function getFriendPath(graph, start, target) {\n  const q = [[start, [start]]];\n  const visited = new Set([start]);\n  while (q.length > 0) {\n    const [curr, path] = q.shift();\n    if (curr === target) return path;\n    for (const neighbor of graph[curr] || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        q.push([neighbor, [...path, neighbor]]);\n      }\n    }\n  }\n  return null;\n}"
    }
  ],
  interview: [
    {
      q: "How does BFS traverse a tree, and what data structure does it use?",
      a: "BFS traverses a tree level-by-level, exploring all nodes at depth d before moving to depth d+1. It implements this using a Queue (FIFO) to buffer discovered nodes, processing them in the exact order they were discovered."
    },
    {
      q: "Why is BFS guaranteed to find the shortest path in an unweighted graph?",
      a: "Because BFS explores nodes in concentric rings outward from the starting node, checking all paths of length 1, then length 2, and so on. Since it checks shorter paths first, the first time it hits the target node, it must be the shortest path."
    },
    {
      q: "Compare the space complexity of BFS and DFS on a binary tree.",
      a: "BFS space complexity depends on the maximum width of the tree (storing the bottom level in the queue, O(w)). DFS space complexity depends on the maximum height of the tree (storing the path in the call stack, O(h)). For wide, shallow trees, DFS uses less memory; for deep, narrow trees, BFS is better."
    },
    {
      q: "How do you detect cycles in a Graph using BFS?",
      a: "Keep a visited set tracking nodes added to the queue. When exploring neighbors: if a neighbor is already in the visited set (and is not the parent node that led to the current node in an undirected graph), a cycle has been detected."
    },
    {
      q: "Explain how a web crawler uses BFS.",
      a: "A crawler starts at a seed URL. It fetches the page, extracts all linked URLs, adds new ones to a FIFO queue, and marks them as discovered. It then dequeues the next URL and repeats, exploring the web in concentric levels of link depth."
    }
  ],
  realWorld: [
    { company: "Google", text: "Maps calculates routing hops across road intersections using BFS on unweighted grid systems." },
    { company: "Amazon", text: "Traces supply chain shipping center connections using BFS to find direct pathways." },
    { company: "Netflix", text: "Renders genre graphs using BFS to cluster recommended categories in concentric rings." },
    { company: "OpenAI", text: "Uses BFS search buffers to validate XML configurations across multiple library directories." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which data structure is used to implement Breadth-First Search?', options: ['Stack', 'Queue', 'Hash Map', 'Heap'], correct: 1 },
    { type: 'true-false', q: 'BFS is guaranteed to find the shortest path on an unweighted graph.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'In what order does BFS traverse tree nodes?', options: ['Root, then all left children, then all right', 'Level-by-level from top to bottom', 'Left leaves first, then parent, then right', 'Randomly based on node values'], correct: 1 },
    { type: 'code-output', q: "const q = ['A'];\nq.push('B');\nconsole.log(q.shift());", options: ['A', 'B', 'undefined', 'null'], correct: 0 },
    { type: 'mcq', q: 'What is the time complexity of BFS on a graph with V vertices and E edges?', options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'], correct: 2 },
    { type: 'true-false', q: 'In graphs containing cycles, BFS runs forever unless a visited set tracks explored nodes.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What does BFS space complexity depend on in a wide tree?', options: ['The tree height', 'The maximum tree width', 'The leaf node count only', 'The root node value'], correct: 1 },
    { type: 'drag-drop', q: 'Order the BFS queue operations: [Enqueue root, Dequeue current node, Enqueue neighbors]', options: ['Enqueue root', 'Dequeue current node', 'Enqueue neighbors'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which application relies directly on BFS?', options: ['Compiling math operations', 'Finding shortest path on unweighted networks', 'Undoing edits in text editors', 'Linear array sorting'], correct: 1 },
    { type: 'code-output', q: "const visited = new Set(['A']);\nconst check = (n) => visited.has(n) ? 'skip' : 'explore';\nconsole.log(check('B'));", options: ['skip', 'explore', 'undefined', 'Error'], correct: 1 }
  ]
});

// 6. DFS (Depth-First Search)
window.CSFA_RAW_TOPICS.push({
  id: 'dfs',
  module: 8,
  title: 'DFS (Depth-First Search)',
  tagline: 'Deep path traversal through trees and graphs using recursion or stacks.',
  readMinutes: 8,
  intro: {
    whatItIs: "Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a chosen node and explores as far as possible along each branch before backtracking.",
    whyItMatters: "DFS is highly efficient for analyzing complete path possibilities. It uses less memory than BFS on wide trees and is the standard choice for connectivity analysis, sorting dependencies, and maze generation.",
    whereUsed: "Used in folder size calculators, resolving package dependencies, chess move calculators, and finding escape paths in maze solvers.",
    commonMistakes: "Writing recursive DFS searches on graphs without cycle tracking, which triggers call stack overflows."
  },
  visual: {
    caption: "DFS: deep path branch exploration using recursion and call stack",
    type: "bfs-dfs"
  },
  examples: [
    {
      difficulty: "very-easy", title: "DFS stack trace",
      explanation: "DFS uses a LIFO stack (or the call stack via recursion) to prioritize deep paths.",
      code: "const stack = ['Root'];\nstack.push('Deep Child'); // Push onto stack\nconsole.log('Next to explore:', stack.pop());",
      language: "javascript", output: "Next to explore: Deep Child"
    },
    {
      difficulty: "easy", title: "Recursive node traversal step",
      explanation: "Exploring down a node's children recursively before checking siblings.",
      code: "const node = { val: 'A', children: [{ val: 'B', children: [] }] };\nfunction dfs(n) {\n  console.log(n.val);\n  n.children.forEach(dfs);\n}\ndfs(node);",
      language: "javascript", output: "A\nB"
    },
    {
      difficulty: "medium", title: "Pre-Order DFS tree print",
      explanation: "A standard recursive DFS printing parent nodes before child branches.",
      code: "const tree = {\n  val: 'A',\n  left: { val: 'B', left: null, right: null },\n  right: { val: 'C', left: null, right: null }\n};\nlet result = [];\nfunction printDFS(node) {\n  if (!node) return;\n  result.push(node.val);\n  printDFS(node.left);\n  printDFS(node.right);\n}\nprintDFS(tree);\nconsole.log(result.join(' '));",
      language: "javascript", output: "A B C"
    },
    {
      difficulty: "medium-plus", title: "DFS cycle tracking on graphs",
      explanation: "Registering visited nodes in a Set blocks infinite recursive loops on circular graph paths.",
      code: "const graph = { 'A': ['B'], 'B': ['A'] };\nconst visited = new Set();\nfunction traverse(node) {\n  if (visited.has(node)) return;\n  visited.add(node);\n  (graph[node] || []).forEach(traverse);\n}\ntraverse('A');\nconsole.log('DFS visited:', [...visited].join(', '));",
      language: "javascript", output: "DFS visited: A, B"
    },
    {
      difficulty: "hard", title: "Maze path locator with backtracking",
      explanation: "DFS traverses grid steps, backing up if it hits a wall to explore other choices.",
      code: "const maze = [\n  ['S', 'W'],\n  [' ', 'E']\n];\nconst visited = new Set();\nfunction findExit(r, c) {\n  if (r < 0 || r >= 2 || c < 0 || c >= 2) return false;\n  if (maze[r][c] === 'W') return false;\n  if (maze[r][c] === 'E') return true;\n  const key = r + ',' + c;\n  if (visited.has(key)) return false;\n  visited.add(key);\n  return findExit(r+1, c) || findExit(r, c+1);\n}\nconsole.log('Path exists:', findExit(0, 0));",
      language: "javascript", output: "Path exists: true"
    },
    {
      difficulty: "real-world", title: "Folder size calculator",
      explanation: "Disk software calculates folder sizes by traversing subfolders to leaf files using DFS.",
      code: "const system = {\n  size: 0,\n  files: [{ size: 50 }],\n  folders: [{ size: 0, files: [{ size: 100 }], folders: [] }]\n};\nfunction getDiskSize(folder) {\n  let total = folder.files.reduce((sum, f) => sum + f.size, 0);\n  for (const sub of folder.folders) {\n    total += getDiskSize(sub);\n  }\n  return total;\n}\nconsole.log('Disk space (KB):', getDiskSize(system));",
      language: "javascript", output: "Disk space (KB): 150"
    }
  ],
  exercises: [
    {
      level: 1, title: "DFS call stack check",
      problem: "Which memory structure does recursive DFS use to track backtracking return points?",
      hints: ["The structure is LIFO.", "It holds active function frames: the Call Stack."],
      solution: "Call Stack"
    },
    {
      level: 2, title: "Base case check",
      problem: "Write the base case condition for a recursive printDFS(node) that returns if node is null.",
      hints: ["Check if !node, then return."],
      solution: "if (!node) return;"
    },
    {
      level: 3, title: "Post Order traverser",
      problem: "Write a recursive function postOrder(node, result = []) that traverses left, right, and then pushes node.val.",
      hints: ["Base case check.", "Recurse node.left.", "Recurse node.right.", "Push node.val to result."],
      solution: "function postOrder(node, result = []) {\n  if (!node) return result;\n  postOrder(node.left, result);\n  postOrder(node.right, result);\n  result.push(node.val);\n  return result;\n}"
    },
    {
      level: 4, title: "Iterative DFS implementation",
      problem: "Write an iterative function dfsIterative(root) that runs DFS using an array stack instead of recursion, returning path array.",
      hints: ["Initialize stack = [root], result = [].", "While stack has elements: pop, push val, push right child, push left child."],
      solution: "function dfsIterative(root) {\n  if (!root) return [];\n  const stack = [root], res = [];\n  while (stack.length > 0) {\n    const curr = stack.pop();\n    res.push(curr.val);\n    if (curr.right) stack.push(curr.right);\n    if (curr.left) stack.push(curr.left);\n  }\n  return res;\n}"
    },
    {
      level: 5, title: "Verify path connection",
      problem: "Write a function hasPath(graph, src, dest, visited = new Set()) that returns true if a path connects src to dest in graph using DFS.",
      hints: ["If src === dest, return true.", "If visited has src, return false; add it.", "Loop over graph[src], recurse on each neighbor. If neighbor has path, return true."],
      solution: "function hasPath(graph, src, dest, visited = new Set()) {\n  if (src === dest) return true;\n  if (visited.has(src)) return false;\n  visited.add(src);\n  for (const neighbor of graph[src] || []) {\n    if (hasPath(graph, neighbor, dest, visited)) return true;\n  }\n  return false;\n}"
    },
    {
      level: 6, title: "Real-world: Dependency installer parser",
      problem: "Write a function resolveDependencies(node, visited = new Set(), result = []) that adds dependent packages (DFS traversal) ensuring no duplicates, producing a safe install order list.",
      hints: ["If node is in visited, skip.", "Add node to visited.", "Iterate dependencies, calling recursively.", "Push node to result after dependencies run."],
      solution: "function resolveDependencies(node, visited = new Set(), result = []) {\n  if (visited.has(node.name)) return result;\n  visited.add(node.name);\n  for (const dep of node.deps || []) {\n    resolveDependencies(dep, visited, result);\n  }\n  result.push(node.name);\n  return result;\n}"
    }
  ],
  interview: [
    {
      q: "How does DFS traverse a tree, and how does it differ from BFS?",
      a: "DFS explores as deep as possible along each branch before backtracking, utilizing a Stack (or call stack) to process nodes in LIFO order. BFS explores level-by-level, checking all neighbors of the current depth before moving deeper, utilizing a Queue (FIFO)."
    },
    {
      q: "Why is DFS more memory-efficient than BFS on wide, shallow trees?",
      a: "On wide trees, BFS must buffer the entire bottom level of nodes in its queue (O(w) width complexity). DFS only needs to store the single active branch path down to a leaf in its call stack (O(h) height complexity), which requires significantly less memory when the tree is wide."
    },
    {
      q: "Explain what 'backtracking' is in DFS.",
      a: "Backtracking is the process of returning back up a branch path to the last intersection point after hitting a dead end (base case/leaf/wall), enabling the search to explore other branch paths that haven't been traversed yet."
    },
    {
      q: "What is topological sorting, and how does DFS implement it?",
      a: "Topological sorting is a linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge U -> V, U comes before V. DFS implements it by performing a post-order traversal and pushing nodes to a list, which is then reversed to represent dependency order."
    },
    {
      q: "How do you implement DFS iteratively without using recursion?",
      a: "By using an explicit Stack array to hold nodes. You push the root node. In each loop iteration: pop the top node, process its value, and then push its children onto the stack (pushing the right child before the left child, so the left child is popped and explored first)."
    }
  ],
  realWorld: [
    { company: "OpenAI", text: "Uses DFS to search parse trees representing syntax groupings in natural language inputs." },
    { company: "Google", text: "Crawls directory file systems using DFS to compile code bundles in compiler tools." },
    { company: "Stripe", text: "Traces transaction dependencies recursively using DFS to resolve complex audit trails." },
    { company: "Netflix", text: "Performs dependency sorting on media assets using DFS before packaging catalog items." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which data structure is naturally associated with Depth-First Search?', options: ['Queue', 'Stack / Call Stack', 'Binary Heap', 'Hash Map'], correct: 1 },
    { type: 'true-false', q: 'DFS is optimal for finding the shortest path on an unweighted graph.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'What happens when DFS hits a dead end (leaf node)?', options: ['It crashes the program', 'It backtracks to the previous parent node', 'It terminates the search', 'It resets the queue'], correct: 1 },
    { type: 'code-output', q: "const s = ['A'];\ns.push('B');\nconsole.log(s.pop());", options: ['A', 'B', 'undefined', 'null'], correct: 1 },
    { type: 'mcq', q: 'What does DFS space complexity depend on in a deep, narrow tree?', options: ['The maximum tree width', 'The maximum tree height', 'The leaf node values', 'The number of branches'], correct: 1 },
    { type: 'true-false', q: 'In an iterative DFS, pushing right child before left child ensures the left child is explored first.', options: ['True', 'False'], correct: 0 },
    { type: 'mcq', q: 'What sort ordering organizes package dependencies using DFS?', options: ['Bubble Sort', 'Binary Search', 'Topological Sort', 'Merge Sort'], correct: 2 },
    { type: 'drag-drop', q: 'Order the DFS recursive execution phases: [Push stack frame, Process current node, Recurse children]', options: ['Push stack frame', 'Process current node', 'Recurse children'], correct: [0, 1, 2] },
    { type: 'mcq', q: 'Which application typically uses DFS?', options: ['Printing documents sequentially', 'Finding shortest network path', 'Maze solvers and dependency resolution', 'Autocompletion query loops'], correct: 2 },
    { type: 'code-output', q: "const visited = new Set(['A']);\nvisited.add('B');\nconsole.log(visited.size);", options: ['1', '2', '3', 'Error'], correct: 1 }
  ]
});

// 7. Big O
window.CSFA_RAW_TOPICS.push({
  id: 'big-o',
  module: 8,
  title: 'Big O Notation',
  tagline: 'Measuring time and space complexity growth — making code performance predictable.',
  readMinutes: 9,
  intro: {
    whatItIs: "Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it is used to classify algorithms according to how their run time or space requirements grow as the input size (n) grows.",
    whyItMatters: "Big O tells you if your code will scale. A function that runs fast on 10 items might crash or freeze your servers on 1 million items if its complexity is O(n^2) rather than O(n log n) or O(n).",
    whereUsed: "Used in code reviews to evaluate scalability, comparing database query plans, and designing compiler optimization pathways.",
    commonMistakes: "Thinking Big O measures the exact execution time in seconds. It doesn't—it measures the rate of growth of operations relative to the input size."
  },
  visual: {
    caption: "Big O complexity curves: O(1) vs O(log n) vs O(n) vs O(n^2)",
    type: "os-layers-diagram"
  },
  examples: [
    {
      difficulty: "very-easy", title: "Constant time O(1)",
      explanation: "Constant time operations take the same number of steps regardless of input size.",
      code: "function getFirst(arr) {\n  return arr[0]; // always 1 step\n}\nconsole.log(getFirst([1, 2, 3, 4]));",
      language: "javascript", output: "1"
    },
    {
      difficulty: "easy", title: "Linear time O(n)",
      explanation: "Linear time operations grow in direct proportion to the size of the input.",
      code: "function printAll(arr) {\n  let count = 0;\n  for (const item of arr) {\n    count++;\n  }\n  return count;\n}\nconsole.log('Steps:', printAll([1, 2, 3]));",
      language: "javascript", output: "Steps: 3"
    },
    {
      difficulty: "medium", title: "Quadratic time O(n^2)",
      explanation: "Nested loops cause operations to grow quadratically: doubling input size quadruples step counts.",
      code: "function countPairs(arr) {\n  let steps = 0;\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length; j++) {\n      steps++;\n    }\n  }\n  return steps;\n}\nconsole.log('n=3 steps:', countPairs([1, 2, 3]));",
      language: "javascript", output: "n=3 steps: 9"
    },
    {
      difficulty: "medium-plus", title: "Logarithmic growth O(log n)",
      explanation: "Operations grow logarithmically when input size is divided at each step, like in binary search.",
      code: "let steps = 0;\nlet n = 8;\nwhile (n > 1) {\n  n = Math.floor(n / 2);\n  steps++;\n}\nconsole.log('n=8 divisions:', steps);",
      language: "javascript", output: "n=8 divisions: 3"
    },
    {
      difficulty: "hard", title: "Auxiliary space complexity check",
      explanation: "Measuring how much extra memory space is allocated relative to input size.",
      code: "function createCopy(arr) {\n  const copy = [];\n  for (const item of arr) {\n    copy.push(item); // O(n) auxiliary space\n  }\n  return copy.length;\n}\nconsole.log('Extra space units:', createCopy([1, 2]));",
      language: "javascript", output: "Extra space units: 2"
    },
    {
      difficulty: "real-world", title: "Solving O(n^2) duplicate search bottleneck",
      explanation: "Using a Set reduces lookup times from quadratic O(n^2) to linear O(n).",
      code: "const data = [1, 2, 3, 2];\nfunction hasDuplicateSlow(arr) {\n  // O(n^2) time\n  for (let i=0; i<arr.length; i++) \n    for (let j=i+1; j<arr.length; j++) \n      if (arr[i] === arr[j]) return true;\n  return false;\n}\nfunction hasDuplicateFast(arr) {\n  // O(n) time\n  const set = new Set();\n  for (const x of arr) {\n    if (set.has(x)) return true;\n    set.add(x);\n  }\n  return false;\n}\nconsole.log('Slow:', hasDuplicateSlow(data), '| Fast:', hasDuplicateFast(data));",
      language: "javascript", output: "Slow: true | Fast: true"
    }
  ],
  exercises: [
    {
      level: 1, title: "Identify constant complexity",
      problem: "What Big O notation denotes constant time execution?",
      hints: ["The steps do not scale with n.", "Use bracket O(1)."],
      solution: "O(1)"
    },
    {
      level: 2, title: "Identify linear loop growth",
      problem: "What is the time complexity of a single loop that iterates from 0 to n?",
      hints: ["The step count scales directly with n.", "It is O(n)."],
      solution: "O(n)"
    },
    {
      level: 3, title: "Identify quadratic growth",
      problem: "What is the time complexity of nested loops both running from 0 to n?",
      hints: ["Multiply the complexities: n * n.", "It is quadratic: O(n^2)."],
      solution: "O(n^2)"
    },
    {
      level: 4, title: "Trace sorting space",
      problem: "What is the auxiliary space complexity of an in-place Bubble Sort?",
      hints: ["It modifies the array directly without allocating extra helper arrays.", "It is constant O(1) space."],
      solution: "O(1)"
    },
    {
      level: 5, title: "Calculate step operations growth",
      problem: "If an O(n^2) algorithm takes 100 milliseconds for n=1000, estimate the time in milliseconds it takes for n=2000.",
      hints: ["Doubling input size in O(n^2) multiplies steps by 2^2 = 4.", "Multiply 100ms by 4."],
      solution: "400"
    },
    {
      level: 6, title: "Real-world: Analyze refactoring performance",
      problem: "You refactored a function containing a nested loop (scanning an array) into a single loop using a pre-populated Hash Map. What is the time complexity before and after?",
      hints: ["Nested loop was O(n^2).", "Hash Map lookup is O(1), making the single loop run in O(n) total time."],
      solution: "Before refactoring, it was O(n^2) quadratic time. After, it is O(n) linear time."
    }
  ],
  interview: [
    {
      q: "What is Big O notation, and what does it measure?",
      a: "Big O notation is a mathematical framework used to describe the limiting behavior of an algorithm's resource requirements (execution time or memory space) as the input size (n) grows toward infinity. It measures growth rates, not exact execution time in seconds."
    },
    {
      q: "Explain what O(1), O(n), and O(n^2) mean.",
      a: "O(1) is constant time: execution takes the same number of steps regardless of input size. O(n) is linear time: execution time grows in direct proportion to input size. O(n^2) is quadratic time: execution time grows proportionally to the square of the input size (doubling input size quadruples run time)."
    },
    {
      q: "Why do we drop constant values and non-dominant terms in Big O (e.g. O(2n + 5) -> O(n))?",
      a: "Because Big O focuses on asymptotic behavior as n grows extremely large. As n approaches infinity, constant coefficients (like 2) and lower-order terms (like 5) become negligible in their impact on growth compared to the dominant term."
    },
    {
      q: "What is the difference between Time Complexity and Space Complexity?",
      a: "Time Complexity measures how the number of operations/steps scales with input size. Space Complexity (specifically, Auxiliary Space) measures how much extra temporary memory storage space is allocated by the algorithm relative to the input size."
    },
    {
      q: "Why is O(log n) performance highly desirable in algorithms?",
      a: "Logarithmic time O(log n) grows extremely slowly. Doubling the input size adds only a single comparison step. This allows algorithms (like binary search) to process billions of records in dozens of steps, ensuring high scalability."
    }
  ],
  realWorld: [
    { company: "Google", text: "Optimizes indexing search algorithms to maintain O(log n) speeds, preventing queries from lagging under web growth." },
    { company: "Amazon", text: "Models cart item checks using O(1) hash maps to manage flash sale traffic spikes." },
    { company: "Stripe", text: "Enforces O(n log n) merge sorts on transactions to process compliance ledgers efficiently." },
    { company: "OpenAI", text: "Balances model parameter lookup graphs to optimize GPU execution speeds." }
  ],
  quiz: [
    { type: 'mcq', q: 'Which Big O notation represents the fastest average growth rate (most efficient)?', options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'], correct: 3 },
    { type: 'true-false', q: 'Big O notation measures the exact execution run time of code in milliseconds.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which complexity is typical of nested loops iterating over the same input?', options: ['O(log n)', 'O(n)', 'O(n^2)', 'O(2^n)'], correct: 2 },
    { type: 'code-output', q: "const count = (n) => {\n  let c = 0;\n  for(let i=0; i<n; i++) c++;\n  return c;\n};\nconsole.log(count(5));", options: ['1', '5', '25', 'Error'], correct: 1 },
    { type: 'mcq', q: 'What is O(2n + 10) simplified to in Big O notation?', options: ['O(2n)', 'O(n + 10)', 'O(n)', 'O(1)'], correct: 2 },
    { type: 'true-false', q: 'Space complexity measures only the size of the inputs, excluding temporary variables allocated by the algorithm.', options: ['True', 'False'], correct: 1 },
    { type: 'mcq', q: 'Which complexity curve grows logarithmically, like in binary search?', options: ['O(log n)', 'O(n log n)', 'O(1)', 'O(n)'], correct: 0 },
    { type: 'drag-drop', q: 'Order complexities from most scalable to least scalable: [O(1), O(log n), O(n), O(n^2)]', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct: [0, 1, 2, 3] },
    { type: 'mcq', q: 'What is the time complexity of searching a value in a balanced Binary Search Tree?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct: 1 },
    { type: 'code-output', q: "let n = 100;\n// If we lookup index 0 in n-length array\nconsole.log(typeof index0 === 'undefined' ? 'O(1)' : 'O(n)');", options: ['O(1)', 'O(n)', 'undefined', 'Error'], correct: 0 }
  ]
});
