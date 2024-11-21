const fs = require('fs');
const path = require('path');
const { endpoints } = require('./utils/endpoints');

const readmeFilePath = path.join(process.cwd(), 'README.md');

(() => {
  const textReadme = fs.readFileSync(readmeFilePath, { encoding: 'utf8' });
  const readmeArr = textReadme.split('\n');

  const insertIndex = readmeArr.indexOf('## Daftar Route') + 1;
  const enpointsToText = endpoints
    .map((endpoint) => {
      return `- \`/${endpoint.primary}/:kategori\`\n  - Kategori: ${endpoint.paths.map((path) => `\`${path}\``).join(', ')}\n` +
             `- \`/${endpoint.primary}/:kategori/date/:date\`\n  - Kategori: ${endpoint.paths.map((path) => `\`${path}\``).join(', ')} - Filter data based on the provided date`;
    })
    .join('\n');
  
  readmeArr.splice(insertIndex, 0, enpointsToText);
  
  fs.writeFileSync(readmeFilePath, readmeArr.join('\n'), { encoding: 'utf-8' });
})();
