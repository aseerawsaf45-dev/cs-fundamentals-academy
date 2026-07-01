const fs = require('fs');
const path = require('path');
const htmlFiles = [
  'index.html',
  'pages/courses.html',
  'pages/playground.html',
  'pages/progress.html',
  'pages/resources.html',
  'pages/roadmap.html',
  'pages/topic.html'
];

let newScriptsBase = '';
let newScriptsPages = '';
for (let i = 1; i <= 45; i++) {
  newScriptsBase += `  <script src="js/topics-module${i}.js"></script>\n`;
  newScriptsPages += `  <script src="../js/topics-module${i}.js"></script>\n`;
}
for (let i = 1; i <= 14; i++) {
  newScriptsBase += `  <script src="js/topics-spec${i}.js"></script>\n`;
  newScriptsPages += `  <script src="../js/topics-spec${i}.js"></script>\n`;
}

// Remove trailing newlines to keep formatting exact
newScriptsBase = newScriptsBase.trimEnd();
newScriptsPages = newScriptsPages.trimEnd();

htmlFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  if (file === 'index.html') {
    content = content.replace(/  <script src="js\/topics-module1\.js"><\/script>[\s\S]*?<script src="js\/topics-module12\.js"><\/script>/, newScriptsBase);
  } else {
    content = content.replace(/  <script src="\.\.\/js\/topics-module1\.js"><\/script>[\s\S]*?<script src="\.\.\/js\/topics-module12\.js"><\/script>/, newScriptsPages);
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(`Updated ${file}`);
});
