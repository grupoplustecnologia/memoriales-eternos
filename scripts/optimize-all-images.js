#!/usr/bin/env node

/**
 * Batch script to convert all <img> tags to <OptimizedImage> components
 * across all landing pages
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all landing page files
const landingPagesDir = 'src/app';
const pattern = path.join(landingPagesDir, '*/page.tsx').replace(/\\/g, '/');

console.log(`🔍 Searching for landing pages in ${landingPagesDir}...`);

const files = glob.sync(pattern, { ignore: ['**/node_modules/**'] });

console.log(`✅ Found ${files.length} landing page files\n`);

if (files.length === 0) {
  console.log('No landing pages found.');
  process.exit(0);
}

let totalReplacements = 0;
const results = [];

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Skip if already uses OptimizedImage
  if (content.includes("OptimizedImage from '@/components/OptimizedImage'")) {
    results.push({
      file: filePath,
      status: 'SKIPPED',
      message: 'Already optimized'
    });
    return;
  }

  // Add import if not present
  if (!content.includes("import OptimizedImage from '@/components/OptimizedImage'")) {
    // Find a good place to add the import (after other component imports)
    const lastComponentImportMatch = content.match(/import\s+\{[^}]*\}\s+from\s+['"]@\/components\/[^'"]*['"];/);
    
    if (lastComponentImportMatch) {
      const insertPos = content.indexOf(lastComponentImportMatch[0]) + lastComponentImportMatch[0].length;
      content = content.slice(0, insertPos) + "\nimport OptimizedImage from '@/components/OptimizedImage';" + content.slice(insertPos);
    } else {
      // Insert after first import
      const firstImportEnd = content.indexOf('\n') + 1;
      content = content.slice(0, firstImportEnd) + "import OptimizedImage from '@/components/OptimizedImage';\n" + content.slice(firstImportEnd);
    }
  }

  // Convert <img> tags
  const imgRegex = /<img\s+([^>]*?)src="([^"]+)"([^>]*?)alt="([^"]+)"([^>]*?)\/?\s*>/g;
  
  let replacementCount = 0;
  content = content.replace(imgRegex, (match, before, src, middle, alt, after) => {
    replacementCount++;
    
    // Extract className
    const classMatch = (before + middle + after).match(/className="([^"]*)"/);
    const className = classMatch ? classMatch[1] : '';
    
    // Extract width/height
    const widthMatch = (before + middle + after).match(/width[=:\s]+["']?(\d+)/i);
    const heightMatch = (before + middle + after).match(/height[=:\s]+["']?(\d+)/i);
    
    const width = widthMatch ? widthMatch[1] : '640';
    const height = heightMatch ? heightMatch[1] : '480';
    
    // First image should have priority
    const priority = replacementCount <= 1 ? ' priority={true}' : '';
    
    return `<OptimizedImage
      src="${src}"
      alt="${alt}"
      width={${width}}
      height={${height}}${priority}
      className="${className}"
      objectFit="cover"
    />`;
  });

  if (replacementCount > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    totalReplacements += replacementCount;
    results.push({
      file: filePath,
      status: 'CONVERTED',
      replacements: replacementCount
    });
  } else {
    results.push({
      file: filePath,
      status: 'NO_IMAGES',
      message: 'No <img> tags found'
    });
  }
});

// Print summary
console.log('\n' + '='.repeat(80));
console.log('IMAGE OPTIMIZATION SUMMARY');
console.log('='.repeat(80) + '\n');

results.forEach(r => {
  const icon = r.status === 'CONVERTED' ? '✅' : '⏭️';
  const details = r.replacements ? ` (${r.replacements} tags converted)` : r.message ? ` - ${r.message}` : '';
  console.log(`${icon} ${path.basename(path.dirname(r.file))}/page.tsx${details}`);
});

console.log('\n' + '='.repeat(80));
console.log(`📊 TOTAL: ${totalReplacements} <img> tags converted across ${files.length} files`);
console.log('='.repeat(80) + '\n');
