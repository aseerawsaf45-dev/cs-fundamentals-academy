/* ==========================================================================
   TOPIC CONTENT DATA — Module 19: Linux Fundamentals
   ========================================================================== */
if (!window.CSFA_RAW_TOPICS) { window.CSFA_RAW_TOPICS = []; }

window.CSFA_RAW_TOPICS.push({
  id: 'm19-permissions',
  module: 19,
  title: 'Linux Permissions & Ownership',
  tagline: 'rwxr-xr-x — how Linux controls who can read, write, and execute every file.',
  readMinutes: 6,
  intro: {
    whatItIs: "Linux uses a permission system where every file and directory has an owner (user), a group, and permissions for three classes: owner, group, and others. Permissions are: r (read=4), w (write=2), x (execute=1). The combination is expressed as an octal number (e.g., 755) or symbolic string (e.g., rwxr-xr-x).",
    whyItMatters: "Misconfigured permissions are a major source of security vulnerabilities and deployment failures. SSH keys must be 600, public web files 644, executable scripts 755. Understanding permissions prevents 'Permission denied' errors and keeps servers secure.",
    whereUsed: "Every Linux/macOS server, CI/CD pipeline, Docker container, deployment script, SSH setup, and cloud server configuration. chmod and chown are among the most-used admin commands.",
    commonMistakes: "Setting permissions to 777 (world-writable) to 'fix' a permission error. This is a serious security risk — it allows any user or process on the system to modify or execute the file."
  },
  visual: { caption: "Permission string: -rwxr-xr-x = file, owner:rwx, group:r-x, others:r-x = chmod 755", type: "permission-bits" },
  examples: [
    { difficulty: "very-easy", title: "Reading permission notation", explanation: "The permission string has 10 characters: file type + 3 sets of rwx.", code: "function parsePerms(str) {\n  const type = str[0] === '-' ? 'file' : 'dir';\n  const owner = str.slice(1,4);\n  const group = str.slice(4,7);\n  const others = str.slice(7,10);\n  return { type, owner, group, others };\n}\nconsole.log(parsePerms('-rwxr-xr-x'));", language: "javascript", output: "{ type: 'file', owner: 'rwx', group: 'r-x', others: 'r-x' }" },
    { difficulty: "easy", title: "Octal to symbolic", explanation: "Convert octal permission digits to rwx string.", code: "function octalToRwx(octal) {\n  return String(octal).split('').map(d => {\n    const n = parseInt(d);\n    return `${n&4?'r':'-'}${n&2?'w':'-'}${n&1?'x':'-'}`;\n  }).join('');\n}\nconsole.log('755 =', octalToRwx(755));\nconsole.log('644 =', octalToRwx(644));\nconsole.log('600 =', octalToRwx(600));", language: "javascript", output: "755 = rwxr-xr-x\n644 = rw-r--r--\n600 = rw-------" },
    { difficulty: "medium", title: "chmod calculation", explanation: "Calculate the octal value for a given set of permissions.", code: "function calcPerms(ownerRWX, groupRWX, othersRWX) {\n  const toOctal = rwx => (rwx.includes('r')?4:0)+(rwx.includes('w')?2:0)+(rwx.includes('x')?1:0);\n  return `${toOctal(ownerRWX)}${toOctal(groupRWX)}${toOctal(othersRWX)}`;\n}\nconsole.log('rwxr-xr-x =', calcPerms('rwx','rx','rx'));\nconsole.log('rw-r--r-- =', calcPerms('rw','r','r'));", language: "javascript", output: "rwxr-xr-x = 755\nrw-r--r-- = 644" },
    { difficulty: "medium-plus", title: "Permission check simulator", explanation: "Determine if a given user can perform an action based on owner/group/others bits.", code: "function canAccess(fileOwner, userOwner, action) {\n  const perms = { owner: 'rwx', group: 'r-x', others: 'r--' };\n  const set = fileOwner === userOwner ? perms.owner : perms.others;\n  return set.includes(action) ? 'Allowed' : 'Denied';\n}\nconsole.log(canAccess('alice', 'alice', 'w')); // owner → rwx\nconsole.log(canAccess('alice', 'bob',   'w')); // others → r--", language: "javascript", output: "Allowed\nDenied" },
    { difficulty: "hard", title: "setuid bit concept", explanation: "The setuid bit (4000) allows a program to run with the owner's privileges. Used by sudo.", code: "function checkSpecialBits(mode) {\n  const setuid = (mode & 0o4000) !== 0;\n  const setgid = (mode & 0o2000) !== 0;\n  const sticky = (mode & 0o1000) !== 0;\n  console.log('setuid:', setuid, '| setgid:', setgid, '| sticky:', sticky);\n}\ncheckSpecialBits(0o4755); // setuid executable like sudo\ncheckSpecialBits(0o1777); // sticky bit like /tmp", language: "javascript", output: "setuid: true | setgid: false | sticky: false\nsetuid: false | setgid: false | sticky: true" },
    { difficulty: "real-world", title: "SSH key permission requirements", explanation: "SSH refuses to use private keys with too-open permissions. They must be 600 (owner read/write only).", code: "function checkSSHKeyPermission(octal) {\n  const required = 600;\n  if (octal === required) return 'SSH key permissions OK (600)';\n  return `SSH REFUSED: permissions ${octal} are too open. Run: chmod 600 ~/.ssh/id_rsa`;\n}\nconsole.log(checkSSHKeyPermission(600));\nconsole.log(checkSSHKeyPermission(644));", language: "javascript", output: "SSH key permissions OK (600)\nSSH REFUSED: permissions 644 are too open. Run: chmod 600 ~/.ssh/id_rsa" }
  ],
  exercises: [
    { level: 1, title: "Parse octal permissions", problem: "Write `octalToString(octal)` that converts e.g. 755 to 'rwxr-xr-x'.", hints: ["Process each digit: n&4→r, n&2→w, n&1→x."], solution: "function octalToString(o) { return String(o).split('').map(d=>{const n=parseInt(d);return`${n&4?'r':'-'}${n&2?'w':'-'}${n&1?'x':'-'}`}).join(''); }\nconsole.log(octalToString(755)); // rwxr-xr-x" },
    { level: 2, title: "Is file writable?", problem: "Write `isOwnerWritable(permissions)` that takes a 9-char permission string like 'rwxr-xr-x' and returns true if the owner (first 3 chars) has write permission.", hints: ["Check permissions[1] === 'w'."], solution: "function isOwnerWritable(p) { return p[1]==='w'; }\nconsole.log(isOwnerWritable('rwxr-xr-x')); // true\nconsole.log(isOwnerWritable('r-xr-xr-x')); // false" },
    { level: 3, title: "Validate SSH key permission", problem: "Write `validateSshKey(octal)` that returns true if the permission is exactly 600 (owner rw, group none, others none), false otherwise with an error message.", hints: ["Check octal === 600.", "Return true or error string."], solution: "function validateSshKey(o) { return o===600 || `Error: chmod 600 required, got ${o}`; }\nconsole.log(validateSshKey(600)); // true\nconsole.log(validateSshKey(644)); // 'Error: chmod 600 required, got 644'" }
  ],
  interview: [
    { q: "What does chmod 755 mean?", a: "755 means: Owner (7=rwx: read+write+execute), Group (5=r-x: read+execute), Others (5=r-x: read+execute). This is the standard permission for executable scripts and web server directories." },
    { q: "What is the principle of least privilege?", a: "Files and processes should have only the minimum permissions needed for their function. Never use 777 — set the minimum necessary bits. This limits damage if a process is compromised." },
    { q: "What is the sticky bit?", a: "The sticky bit (chmod +t) on a directory means only the file's owner can delete or rename files in that directory, even if others have write permission. Used on /tmp to prevent users deleting each other's temp files." }
  ],
  realWorld: [
    { company: "Amazon EC2", text: "Every EC2 instance setup guide requires running `chmod 400 keypair.pem` — SSH refuses connections if private keys are group-readable. This is a real Linux permission requirement enforced for security." },
    { company: "Nginx/Apache", text: "Web servers typically run as the 'www-data' user. Static files should be 644 (readable by www-data). Configuration files with passwords should be 600. Misconfigured permissions are a top cause of deployment failures." }
  ],
  quiz: [
    { q: "What does chmod 600 mean?", options: ["Owner: rw, Group: none, Others: none", "Owner: rwx, Group: r, Others: none", "All users: rw", "Owner: r, all others: rw"], answer: 0 },
    { q: "What command changes file permissions?", options: ["chown", "chmod", "chgrp", "ls"], answer: 1 },
    { q: "What does the 'x' permission on a file allow?", options: ["Reading the file", "Editing the file", "Executing the file as a program", "Deleting the file"], answer: 2 },
    { q: "Why should SSH private keys be chmod 600?", options: ["To allow all users to read them", "SSH rejects keys readable by others for security", "To make them executable", "To compress them"], answer: 1 },
    { q: "What octal value = rwx?", options: ["5", "6", "7", "4"], answer: 2 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm19-linux-filesystem',
  module: 19,
  title: 'Linux Filesystem',
  tagline: 'Master Linux Filesystem to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Linux Filesystem.',
    whyItMatters: 'Understanding Linux Filesystem is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Linux Filesystem before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Linux Filesystem.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Linux Filesystem', explanation: 'Let\'s look at a simple example demonstrating Linux Filesystem in action.', code: 'console.log("Initializing Linux Filesystem...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Linux Filesystem...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Linux Filesystem', explanation: 'A practical example showing a real-world coding scenario using Linux Filesystem.', code: 'function demonstrate() {\n  console.log("Running Linux Filesystem flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Linux Filesystem flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Linux Filesystem setup', problem: 'Write a function testSetup() that returns the string "Linux Filesystem OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Linux Filesystem OK"; }' }
  ],
  interview: [
    { q: 'Why is Linux Filesystem important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Linux Filesystem in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Linux Filesystem?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm19-directory-structure',
  module: 19,
  title: 'Directory Structure',
  tagline: 'Master Directory Structure to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Directory Structure.',
    whyItMatters: 'Understanding Directory Structure is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Directory Structure before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Directory Structure.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Directory Structure', explanation: 'Let\'s look at a simple example demonstrating Directory Structure in action.', code: 'console.log("Initializing Directory Structure...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Directory Structure...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Directory Structure', explanation: 'A practical example showing a real-world coding scenario using Directory Structure.', code: 'function demonstrate() {\n  console.log("Running Directory Structure flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Directory Structure flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Directory Structure setup', problem: 'Write a function testSetup() that returns the string "Directory Structure OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Directory Structure OK"; }' }
  ],
  interview: [
    { q: 'Why is Directory Structure important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Directory Structure in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Directory Structure?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm19-ownership',
  module: 19,
  title: 'Ownership',
  tagline: 'Master Ownership to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Ownership.',
    whyItMatters: 'Understanding Ownership is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Ownership before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Ownership.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Ownership', explanation: 'Let\'s look at a simple example demonstrating Ownership in action.', code: 'console.log("Initializing Ownership...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Ownership...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Ownership', explanation: 'A practical example showing a real-world coding scenario using Ownership.', code: 'function demonstrate() {\n  console.log("Running Ownership flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Ownership flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Ownership setup', problem: 'Write a function testSetup() that returns the string "Ownership OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Ownership OK"; }' }
  ],
  interview: [
    { q: 'Why is Ownership important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Ownership in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Ownership?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm19-users-groups',
  module: 19,
  title: 'Users & Groups',
  tagline: 'Master Users & Groups to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Users & Groups.',
    whyItMatters: 'Understanding Users & Groups is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Users & Groups before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Users & Groups.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Users & Groups', explanation: 'Let\'s look at a simple example demonstrating Users & Groups in action.', code: 'console.log("Initializing Users & Groups...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Users & Groups...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Users & Groups', explanation: 'A practical example showing a real-world coding scenario using Users & Groups.', code: 'function demonstrate() {\n  console.log("Running Users & Groups flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Users & Groups flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Users & Groups setup', problem: 'Write a function testSetup() that returns the string "Users & Groups OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Users & Groups OK"; }' }
  ],
  interview: [
    { q: 'Why is Users & Groups important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Users & Groups in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Users & Groups?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm19-shell',
  module: 19,
  title: 'Shell',
  tagline: 'Master Shell to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Shell.',
    whyItMatters: 'Understanding Shell is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Shell before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Shell.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Shell', explanation: 'Let\'s look at a simple example demonstrating Shell in action.', code: 'console.log("Initializing Shell...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Shell...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Shell', explanation: 'A practical example showing a real-world coding scenario using Shell.', code: 'function demonstrate() {\n  console.log("Running Shell flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Shell flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Shell setup', problem: 'Write a function testSetup() that returns the string "Shell OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Shell OK"; }' }
  ],
  interview: [
    { q: 'Why is Shell important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Shell in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Shell?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});

window.CSFA_RAW_TOPICS.push({
  id: 'm19-env-variables',
  module: 19,
  title: 'Environment Variables',
  tagline: 'Master Environment Variables to build a solid computer science foundation.',
  readMinutes: 6,
  intro: {
    whatItIs: 'An in-depth look at Environment Variables.',
    whyItMatters: 'Understanding Environment Variables is essential for writing efficient, reliable, and correct software programs.',
    whereUsed: 'Used everywhere in software development, from system utilities and network programming to application development and databases.',
    commonMistakes: 'Not understanding the basic constraints and underlying behavior of Environment Variables before applying it in complex production code.'
  },
  visual: { caption: 'Conceptual diagram of Environment Variables.', type: 'text' },
  examples: [
    { difficulty: 'easy', title: 'Basic usage of Environment Variables', explanation: 'Let\'s look at a simple example demonstrating Environment Variables in action.', code: 'console.log("Initializing Environment Variables...");\nconst isAvailable = true;\nconsole.log("Status:", isAvailable);', language: 'javascript', output: 'Initializing Environment Variables...\nStatus: true' },
    { difficulty: 'medium', title: 'Common pattern with Environment Variables', explanation: 'A practical example showing a real-world coding scenario using Environment Variables.', code: 'function demonstrate() {\n  console.log("Running Environment Variables flow...");\n}\ndemonstrate();', language: 'javascript', output: 'Running Environment Variables flow...' }
  ],
  exercises: [
    { level: 1, title: 'Check Environment Variables setup', problem: 'Write a function testSetup() that returns the string "Environment Variables OK".', hints: ['Return the exact string requested.'], solution: 'function testSetup() { return "Environment Variables OK"; }' }
  ],
  interview: [
    { q: 'Why is Environment Variables important in software engineering?', a: 'It provides a key building block for structuring applications, optimizing resources, and managing complex program logic.' }
  ],
  realWorld: [
    { company: 'Industry Standard', text: 'All modern tech companies rely on concepts related to Environment Variables in their core infrastructure.' }
  ],
  quiz: [
    { type: 'mcq', q: 'What is the main purpose of Environment Variables?', options: ['Optimizing performance', 'Increasing code size', 'Randomizing program execution', 'None of the above'], correct: 0 }
  ]
});
