const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// Remaining 18 pages to update
const remainingPages = [
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

function fixPage(filePath, slug) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // If already has SchemaHead, skip
  if (content.includes('SchemaHead')) {
    return 'skip';
  }

  // Find the last import line
  const lines = content.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) {
      lastImportIdx = i;
    } else if (lastImportIdx > -1 && !lines[i].trim().startsWith('import ') && lines[i].trim()) {
      break;
    }
  }

  if (lastImportIdx > -1) {
    // Add imports
    const newImports = [
      "import { SchemaHead } from '@/components/SchemaHead';",
      "import { CanonicalHead } from '@/components/CanonicalHead';",
      "import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';",
      "import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';"
    ];
    
    lines.splice(lastImportIdx + 1, 0, ...newImports);
    
    // Add constants before export
    const exportIdx = lines.findIndex(l => l.includes('export default function'));
    if (exportIdx > -1) {
      const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const constants = [
        '',
        `const pageSlug = '${slug}';`,
        `const canonical = getCanonicalUrl(\`/\${pageSlug}\`);`,
        `const ogImage = getOgImageUrl(pageSlug, 'landing');`,
        '',
        `const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: '${title}', url: canonical }];`,
        `const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];`,
        ''
      ];
      lines.splice(exportIdx, 0, ...constants);
    }

    // Find and add schema generators after function declaration
    const newLines = lines.join('\n');
    const withGenerators = newLines.replace(
      /^(export default function \w+\(\) \{)\s*\n/m,
      `$1
  const localBusinessSchema = generateLocalBusinessSchema('${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

`
    );

    // Add schemas to JSX
    const withSchemas = withGenerators.replace(
      /(\breturn\s*\(\s*<div[^>]*className="[^"]*")/,
      `$1
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />`
    );

    fs.writeFileSync(filePath, withSchemas, 'utf-8');
    return 'updated';
  }

  return 'error';
}

console.log(`Processing ${remainingPages.length} remaining pages...\n`);

let updated = 0, skipped = 0, errors = 0;

remainingPages.forEach(dir => {
  const pagePath = path.join(appDir, dir, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  ${dir} (not found)`);
    errors++;
    return;
  }

  try {
    const result = fixPage(pagePath, dir);
    if (result === 'updated') {
      console.log(`✅ ${dir}`);
      updated++;
    } else if (result === 'skip') {
      console.log(`⏭️  ${dir}`);
      skipped++;
    } else {
      console.log(`❌ ${dir}`);
      errors++;
    }
  } catch (e) {
    console.log(`❌ ${dir}: ${e.message}`);
    errors++;
  }
});

console.log(`\n✅ Updated: ${updated}`);
console.log(`⏭️  Skipped: ${skipped}`);
console.log(`❌ Errors: ${errors}`);
