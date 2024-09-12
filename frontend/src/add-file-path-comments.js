const fs = require('fs');
const path = require('path');

function addFilePathComments(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      addFilePathComments(filePath);
    } else if (stats.isFile() && !filePath.endsWith('.json') && !filePath.includes('config')) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);
      const newContent = `// ${relativePath}\n${fileContent}`;
      fs.writeFileSync(filePath, newContent);
    }
  });
}

addFilePathComments('src'); // Start from the 'src' directory