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
