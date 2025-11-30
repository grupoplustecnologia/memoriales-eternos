#!/usr/bin/env node

/**
 * Script to convert <img> tags to <OptimizedImage> components
 * Usage: node scripts/optimize-images.js src/app/page.tsx
 */

const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node scripts/optimize-images.js <file-path>');
  process.exit(1);
}

const fullPath = path.resolve(filePath);
if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

let content = fs.readFileSync(fullPath, 'utf-8');
const originalContent = content;

// Check if OptimizedImage is already imported
if (!content.includes("import OptimizedImage from '@/components/OptimizedImage'")) {
  // Find the first import statement and add it after
  const importRegex = /^(import .*?[;'"\n])/m;
  const match = content.match(importRegex);
  
  if (match) {
    // Insert after the first import line
    const insertPosition = content.indexOf('\n', match.index) + 1;
    content = 
      content.slice(0, insertPosition) +
      "import OptimizedImage from '@/components/OptimizedImage';\n" +
      content.slice(insertPosition);
  } else {
    // Add at the beginning
    content = "import OptimizedImage from '@/components/OptimizedImage';\n\n" + content;
  }
}

// Convert <img> tags to <OptimizedImage> components
// Pattern: <img\s+([^>]*?)src="([^"]+)"([^>]*?)alt="([^"]+)"([^>]*?)\/?>
const imgRegex = /<img\s+([^>]*?)src="([^"]+)"([^>]*?)alt="([^"]+)"([^>]*?)\/?\s*>/g;

let replacementCount = 0;

content = content.replace(imgRegex, (match, before, src, middle, alt, after) => {
  replacementCount++;
  
  // Extract className if exists
  const classMatch = (before + middle + after).match(/className="([^"]*)"/);
  const className = classMatch ? classMatch[1] : '';
  
  // Extract width and height if they exist
  const widthMatch = (before + middle + after).match(/width[=:\s]+["']?(\d+)/i);
  const heightMatch = (before + middle + after).match(/height[=:\s]+["']?(\d+)/i);
  
  const width = widthMatch ? widthMatch[1] : '640';
  const height = heightMatch ? heightMatch[1] : '480';
  
  // Check if it should have priority (usually first images in hero)
  const priority = replacementCount <= 2 ? ' priority={true}' : '';
  
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
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ Successfully converted ${replacementCount} <img> tags to <OptimizedImage>`);
  console.log(`📝 File: ${fullPath}`);
} else {
  console.log('No <img> tags found to convert');
}
