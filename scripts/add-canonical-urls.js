#!/usr/bin/env node

/**
 * Script to add CanonicalHead to all pages that don't have it
 * Processes all page.tsx files in src/app directories
 */

const fs = require('fs');
const path = require('path');

function findAllPages(dir) {
  const pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[') && !entry.name.startsWith('_')) {
      const pagePath = path.join(dir, entry.name, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        pages.push({ name: entry.name, path: pagePath });
      }
    }
  }

  return pages;
}

function getCanonicalUrl(dirName) {
  const baseUrl = 'https://cementerio-virtual-mascotas.com';
  // Convert directory name to URL path
  return `${baseUrl}/${dirName}`;
}

function addCanonicalHead(filePath, canonicalUrl) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has CanonicalHead
  if (content.includes('CanonicalHead')) {
    return { status: 'SKIPPED', message: 'Already has CanonicalHead' };
  }

  // Add import if not present
  if (!content.includes("import { CanonicalHead }")) {
    // Find a good place to add import - after other imports
    const importMatch = content.match(/import\s+.*from\s+['"]@\/components\/[^'"]*['"];/);
    if (importMatch) {
      const insertPos = content.indexOf(importMatch[0]) + importMatch[0].length;
      content = content.slice(0, insertPos) + "\nimport { CanonicalHead } from '@/components/CanonicalHead';" + content.slice(insertPos);
    } else {
      // Insert after first import line
      const firstImportEnd = content.indexOf('\n', content.indexOf('import')) + 1;
      content = content.slice(0, firstImportEnd) + "import { CanonicalHead } from '@/components/CanonicalHead';\n" + content.slice(firstImportEnd);
    }
  }

  // Find the return statement and add CanonicalHead
  const returnMatch = content.match(/return\s*\(\s*<div[^>]*>/);
  if (returnMatch) {
    const insertPos = returnMatch.index + returnMatch[0].length;
    content = content.slice(0, insertPos) + `\n      <CanonicalHead url="${canonicalUrl}" />\n` + content.slice(insertPos);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    return { status: 'ADDED', canonicalUrl };
  }

  return { status: 'FAILED', message: 'Could not find return statement' };
}

// Main execution
console.log('\n🔗 CANONICAL URLs - Adding to all pages');
console.log('='.repeat(80));

const appDir = path.join(process.cwd(), 'src', 'app');
const pages = findAllPages(appDir);

console.log(`Found ${pages.length} pages to check\n`);

const results = pages.map(page => {
  const canonicalUrl = getCanonicalUrl(page.name);
  const result = addCanonicalHead(page.path, canonicalUrl);
  
  const status = result.status === 'ADDED' ? '✅' : result.status === 'SKIPPED' ? '⏭️' : '❌';
  console.log(`${status} ${page.name.padEnd(40)} - ${result.status}`);

  return { ...page, ...result };
});

const added = results.filter(r => r.status === 'ADDED').length;
const skipped = results.filter(r => r.status === 'SKIPPED').length;
const failed = results.filter(r => r.status === 'FAILED').length;

console.log('\n' + '='.repeat(80));
console.log(`📊 SUMMARY: ${added} added, ${skipped} skipped, ${failed} failed`);
console.log('='.repeat(80) + '\n');
