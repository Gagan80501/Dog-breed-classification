const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(
  path.join(__dirname, '../public/dashboard-console-capture.js'),
  'utf8'
);

const scriptTag = `<script>${scriptContent}</script>`;

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture')) {
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${scriptTag}\n</head>`);
  } else if (content.includes('<body>')) {
    content = content.replace('<body>', `<body>\n${scriptTag}`);
  }
  
  fs.writeFileSync(filePath, content);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

const outDir = path.join(__dirname, '../out');
if (fs.existsSync(outDir)) {
  processDirectory(outDir);
  console.log('Console capture script injected successfully');
}