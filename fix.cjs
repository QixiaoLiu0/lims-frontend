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
  
  const replacements = [
    { regex: /from\s+['"](\.\.\/)+components([^'"]*)['"]/g, replace: 'from \'@/app/components$2\'' },
    { regex: /from\s+['"](\.\.\/)+contexts([^'"]*)['"]/g, replace: 'from \'@/app/contexts$2\'' },
    { regex: /from\s+['"](\.\.\/)+data([^'"]*)['"]/g, replace: 'from \'@/app/data$2\'' }
  ];
  
  for (const r of replacements) {
    if (r.regex.test(content)) {
      content = content.replace(r.regex, r.replace);
      changed = true;
    }
  }

  if (file.includes('coc') || file.includes('dashboard') || file.includes('login') || file.includes('home')) {
     const localReplacements = [
        { regex: /from\s+['"]\.\/components([^'"]*)['"]/g, replace: 'from \'@/app/components$1\'' },
        { regex: /from\s+['"]\.\/contexts([^'"]*)['"]/g, replace: 'from \'@/app/contexts$1\'' },
        { regex: /from\s+['"]\.\/data([^'"]*)['"]/g, replace: 'from \'@/app/data$1\'' }
     ];
     for (const r of localReplacements) {
        if (r.regex.test(content)) {
          content = content.replace(r.regex, r.replace);
          changed = true;
        }
     }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed imports in', file);
  }
}
