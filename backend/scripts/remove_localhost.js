const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../frontend/src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.html')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

function removeLocalhost() {
  console.log(`Scanning directory: ${srcDir}`);
  const files = walk(srcDir);
  let count = 0;

  files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('http://localhost:5000')) {
      content = content.replace(/http:\/\/localhost:5000/g, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✔ Cleaned localhost URL from: ${path.basename(filePath)}`);
      count++;
    }
  });

  console.log(`Finished. Cleaned ${count} files.`);
}

removeLocalhost();
