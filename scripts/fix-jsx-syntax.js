const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

const brokenPages = [
  'cementerio-mascotas-cerca-de-mi',
  'cementerio-virtual-animales-compania',
  'cementerio-virtual-animales-domesticos',
  'cementerio-virtual-gatos-barcelona',
  'cementerio-virtual-gatos-espana',
  'cementerio-virtual-gatos-madrid',
  'cementerio-virtual-mascotas-barcelona',
  'cementerio-virtual-mascotas-espana',
  'cementerio-virtual-mascotas-madrid',
  'cementerio-virtual-mascotas-sevilla',
  'cementerio-virtual-mascotas-valencia',
  'cementerio-virtual-mascotas-zaragoza',
  'cementerio-virtual-perros-barcelona',
  'cementerio-virtual-perros-espana',
  'cementerio-virtual-perros-gatos',
  'cementerio-virtual-perros-madrid',
  'memorial-perros-online',
  'memorial-tortugas-online',
];

brokenPages.forEach(dir => {
  const pagePath = path.join(appDir, dir, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Not found: ${dir}`);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Fix: Replace broken div pattern: <div className="..." followed by component on next line
  // Pattern: <div className="..." without closing > that gets broken
  content = content.replace(
    /return\s*\(\s*<div[^>]*className="([^"]+)"(?!\s*>)\s*<CanonicalHead/,
    `return (
    <div className="$1">
      <CanonicalHead`
  );

  // Also fix extra closing >
  content = content.replace(
    /\/>\s*>>/g,
    '/>'
  );

  fs.writeFileSync(pagePath, content, 'utf-8');
  console.log(`✅ Fixed JSX: ${dir}`);
});

console.log('\nAll pages fixed!');
