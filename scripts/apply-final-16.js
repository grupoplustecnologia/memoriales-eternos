const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

const remaining16Pages = [
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
];

remaining16Pages.forEach(slug => {
  const pagePath = path.join(appDir, slug, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  ${slug}`);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Skip if already fixed
  if (content.includes('SchemaHead')) {
    console.log(`⏭️  ${slug}`);
    return;
  }

  // Find last import line and add new imports after it
  const lines = content.split('\n');
  let lastImportIdx = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      lastImportIdx = i;
    } else if (lastImportIdx > -1 && !lines[i].trim().startsWith('import ') && lines[i].trim() !== '') {
      break;
    }
  }

  if (lastImportIdx > -1) {
    const newImports = [
      "import { SchemaHead } from '@/components/SchemaHead';",
      "import { CanonicalHead } from '@/components/CanonicalHead';",
      "import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';",
      "import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';"
    ];
    lines.splice(lastImportIdx + 1, 0, ...newImports);

    // Find export default function and add constants before it
    let exportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('export default function')) {
        exportIdx = i;
        break;
      }
    }

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

      // Find { after export default function and add schema generators
      let braceIdx = -1;
      for (let i = exportIdx + constants.length; i < lines.length; i++) {
        if (lines[i].includes('{')) {
          braceIdx = i;
          break;
        }
      }

      if (braceIdx > -1) {
        const generators = [
          `  const localBusinessSchema = generateLocalBusinessSchema('${title}');`,
          `  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);`,
          `  const faqSchema = generateFAQSchema(faqs);`,
          `  const webPageSchema = generateWebPageSchema('${title} - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);`,
          ''
        ];
        lines.splice(braceIdx + 1, 0, ...generators);

        // Find return ( and inject schemas
        for (let i = braceIdx + generators.length + 1; i < lines.length; i++) {
          if (lines[i].includes('return (')) {
            // Look for the next line with <div
            for (let j = i + 1; j < lines.length; j++) {
              if (lines[j].includes('<div')) {
                // Insert after <div >
                const divMatch = lines[j].match(/(<div[^>]*>)/);
                if (divMatch) {
                  lines[j] = lines[j].replace(divMatch[1], `${divMatch[1]}\n      <CanonicalHead url={canonical} />\n      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />`);
                  break;
                }
              }
            }
            break;
          }
        }
      }
    }

    content = lines.join('\n');
    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log(`✅ ${slug}`);
  } else {
    console.log(`❌ ${slug} (no imports found)`);
  }
});

console.log('\nDone!');
