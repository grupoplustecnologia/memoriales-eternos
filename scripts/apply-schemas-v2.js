const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

const pagesToUpdate = [
  // Memorial pages
  { dir: 'memorial-cachorros-online', name: 'Cachorros' },
  { dir: 'memorial-cobayas-online', name: 'Cobayas' },
  { dir: 'memorial-conejos-online', name: 'Conejos' },
  { dir: 'memorial-gatos-online', name: 'Gatos' },
  { dir: 'memorial-hamsters-online', name: 'Hamsters' },
  { dir: 'memorial-hurones-online', name: 'Hurones' },
  { dir: 'memorial-loros-online', name: 'Loros' },
  { dir: 'memorial-pajaros-online', name: 'Pájaros' },
  { dir: 'memorial-mascotas-online', name: 'Mascotas' },
  { dir: 'memorial-mascotas-exoticas-online', name: 'Mascotas Exóticas' },

  // Homenaje pages
  { dir: 'homenaje-virtual-gatos', name: 'Gatos' },
  { dir: 'homenaje-virtual-mascotas', name: 'Mascotas' },
  { dir: 'homenaje-virtual-mascotas-exoticas', name: 'Mascotas Exóticas' },
  { dir: 'homenaje-virtual-mi-gato', name: 'Mi Gato' },
  { dir: 'homenaje-virtual-mi-mascota', name: 'Mi Mascota' },
  { dir: 'homenaje-virtual-mi-perro', name: 'Mi Perro' },
  { dir: 'homenaje-virtual-perros', name: 'Perros' },

  // Crear memorial pages
  { dir: 'crear-memorial-conejo', name: 'Conejo' },
  { dir: 'crear-memorial-gato', name: 'Gato' },
  { dir: 'crear-memorial-hamster', name: 'Hamster' },
  { dir: 'crear-memorial-loro', name: 'Loro' },
  { dir: 'crear-memorial-mascota', name: 'Mascota' },
  { dir: 'crear-memorial-mascota-exotica', name: 'Mascota Exótica' },
  { dir: 'crear-memorial-pajaro', name: 'Pájaro' },
  { dir: 'crear-memorial-perro', name: 'Perro' },
  { dir: 'crear-memorial-tortuga', name: 'Tortuga' },

  // Registrar pages
  { dir: 'registrar-gato-cementerio-virtual', name: 'Gato' },
  { dir: 'registrar-mascota-cementerio-virtual', name: 'Mascota' },
  { dir: 'registrar-perro-cementerio-virtual', name: 'Perro' },

  // City cementerio pages
  { dir: 'cementerio-mascotas-alicante-online', name: 'Alicante' },
  { dir: 'cementerio-mascotas-barcelona-online', name: 'Barcelona' },
  { dir: 'cementerio-mascotas-bilbao-online', name: 'Bilbao' },
  { dir: 'cementerio-mascotas-madrid-online', name: 'Madrid' },
  { dir: 'cementerio-mascotas-malaga-online', name: 'Málaga' },
  { dir: 'cementerio-mascotas-murcia-online', name: 'Murcia' },
  { dir: 'cementerio-mascotas-sevilla-online', name: 'Sevilla' },
  { dir: 'cementerio-mascotas-valencia-online', name: 'Valencia' },
  { dir: 'cementerio-mascotas-valladolid-online', name: 'Valladolid' },
  { dir: 'cementerio-mascotas-zaragoza-online', name: 'Zaragoza' },
];

function applySchemaToPage(filePath, title, slug) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has SchemaHead
  if (content.includes('SchemaHead')) {
    return 'skip';
  }

  // Step 1: Replace imports section
  const oldImportPattern = /^'use client';\s*\n\s*import Link from 'next\/link';\s*\n\s*import { Button } from '@\/components\/ui\/button';\s*\n\s*import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@\/components\/ui\/card';\s*\n\s*import { Badge } from '@\/components\/ui\/badge';/m;
  
  const newImports = `'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';`;

  if (oldImportPattern.test(content)) {
    content = content.replace(oldImportPattern, newImports);
  }

  // Step 2: Add constants before export default
  const exportPattern = /^export default function/m;
  if (exportPattern.test(content)) {
    const constants = `
const pageSlug = '${slug}';
const canonical = getCanonicalUrl(\`/\${pageSlug}\`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: '${title}', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

`;
    content = content.replace(exportPattern, constants + 'export default function');
  }

  // Step 3: Add schema generators after function declaration
  const functionBodyPattern = /^export default function \w+\(\) \{\s*return/m;
  if (functionBodyPattern.test(content)) {
    const schemaGenerators = `export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('${title}');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('${title} - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return`;
    content = content.replace(functionBodyPattern, schemaGenerators);
  }

  // Step 4: Inject CanonicalHead and SchemaHead into JSX
  const divPattern = /return\s*\(\s*<div[^>]*className="min-h-screen[^"]*">/;
  if (divPattern.test(content)) {
    content = content.replace(
      divPattern,
      `return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />`
    );
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  return 'updated';
}

console.log(`Processing ${pagesToUpdate.length} pages...\n`);

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

pagesToUpdate.forEach(({ dir, name }) => {
  const pagePath = path.join(appDir, dir, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  File not found: ${dir}`);
    errorCount++;
    return;
  }

  try {
    const slug = dir;
    const title = `${dir.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`;
    const result = applySchemaToPage(pagePath, title, slug);
    
    if (result === 'updated') {
      console.log(`✅ ${dir}`);
      successCount++;
    } else if (result === 'skip') {
      console.log(`⏭️  ${dir} (already updated)`);
      skipCount++;
    }
  } catch (error) {
    console.error(`❌ ${dir}: ${error.message}`);
    errorCount++;
  }
});

console.log(`\n✅ Updated: ${successCount}`);
console.log(`⏭️  Already updated: ${skipCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`\nTotal processed: ${successCount + skipCount + errorCount}/${pagesToUpdate.length}`);
