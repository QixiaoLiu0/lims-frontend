const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
}

const files = walkSync('./src/app', []).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('useRouter(') && !content.match(/import.*useRouter.*from ['"]next\/navigation['"]/)) {
    if (content.match(/import\s+{([^}]*)}\s+from\s+['"]next\/navigation['"]/)) {
      content = content.replace(/(import\s+{)([^}]*)(\}\s+from\s+['"]next\/navigation['"])/, (match, p1, p2, p3) => {
        if (!p2.includes('useRouter')) {
           return p1 + p2 + (p2.trim() ? ', ' : '') + 'useRouter' + p3;
        }
        return match;
      });
      changed = true;
    } else {
      content = 'import { useRouter } from \'next/navigation\';\n' + content;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Added useRouter import in', file);
  }
}
