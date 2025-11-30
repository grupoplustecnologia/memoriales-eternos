const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

const pagesToFix = [
  'memorial-cachorros-online',
  'memorial-cobayas-online',
  'memorial-conejos-online',
  'memorial-gatos-online',
  'memorial-hamsters-online',
  'memorial-hurones-online',
  'memorial-loros-online',
  'memorial-pajaros-online',
  'memorial-mascotas-online',
  'memorial-mascotas-exoticas-online',
  'homenaje-virtual-gatos',
  'homenaje-virtual-mascotas',
  'homenaje-virtual-mascotas-exoticas',
  'homenaje-virtual-mi-gato',
  'homenaje-virtual-mi-mascota',
  'homenaje-virtual-mi-perro',
  'homenaje-virtual-perros',
  'crear-memorial-conejo',
  'crear-memorial-gato',
  'crear-memorial-hamster',
  'crear-memorial-loro',
  'crear-memorial-mascota',
  'crear-memorial-mascota-exotica',
  'crear-memorial-pajaro',
  'crear-memorial-perro',
  'crear-memorial-tortuga',
  'registrar-gato-cementerio-virtual',
  'registrar-mascota-cementerio-virtual',
  'registrar-perro-cementerio-virtual',
  'cementerio-mascotas-alicante-online',
  'cementerio-mascotas-barcelona-online',
  'cementerio-mascotas-bilbao-online',
  'cementerio-mascotas-madrid-online',
  'cementerio-mascotas-malaga-online',
  'cementerio-mascotas-murcia-online',
  'cementerio-mascotas-sevilla-online',
  'cementerio-mascotas-valencia-online',
  'cementerio-mascotas-valladolid-online',
  'cementerio-mascotas-zaragoza-online',
];

pagesToFix.forEach(dir => {
  const pagePath = path.join(appDir, dir, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Not found: ${dir}`);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // If already has imports, skip
  if (content.includes('import { SchemaHead }')) {
    console.log(`⏭️  ${dir} (already fixed)`);
    return;
  }

  // Find the line with the last import
  const lines = content.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) {
      lastImportIdx = i;
    } else if (lastImportIdx > -1 && !lines[i].startsWith('import ')) {
      // Found end of imports
      break;
    }
  }

  if (lastImportIdx > -1) {
    // Insert new imports after last import
    const newImports = [
      "import { SchemaHead } from '@/components/SchemaHead';",
      "import { CanonicalHead } from '@/components/CanonicalHead';",
      "import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';",
      "import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';"
    ];
    
    lines.splice(lastImportIdx + 1, 0, ...newImports);
    
    // Write back
    content = lines.join('\n');
    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log(`✅ Fixed imports: ${dir}`);
  }
});

console.log('\nDone fixing imports!');
