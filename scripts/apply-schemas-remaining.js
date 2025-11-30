const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// List of remaining pages to update (41 pages)
const pagesToUpdate = [
  // Memorial pages (8)
  { dir: 'memorial-cachorros-online', title: 'Memorial Cachorros Online', slug: 'memorial-cachorros-online' },
  { dir: 'memorial-cobayas-online', title: 'Memorial Cobayas Online', slug: 'memorial-cobayas-online' },
  { dir: 'memorial-conejos-online', title: 'Memorial Conejos Online', slug: 'memorial-conejos-online' },
  { dir: 'memorial-gatos-online', title: 'Memorial Gatos Online', slug: 'memorial-gatos-online' },
  { dir: 'memorial-hamsters-online', title: 'Memorial Hamsters Online', slug: 'memorial-hamsters-online' },
  { dir: 'memorial-hurones-online', title: 'Memorial Hurones Online', slug: 'memorial-hurones-online' },
  { dir: 'memorial-loros-online', title: 'Memorial Loros Online', slug: 'memorial-loros-online' },
  { dir: 'memorial-pajaros-online', title: 'Memorial Pájaros Online', slug: 'memorial-pajaros-online' },
  
  // Homenaje pages (6)
  { dir: 'homenaje-virtual-gatos', title: 'Homenaje Virtual Gatos', slug: 'homenaje-virtual-gatos' },
  { dir: 'homenaje-virtual-mascotas', title: 'Homenaje Virtual Mascotas', slug: 'homenaje-virtual-mascotas' },
  { dir: 'homenaje-virtual-mascotas-exoticas', title: 'Homenaje Virtual Mascotas Exóticas', slug: 'homenaje-virtual-mascotas-exoticas' },
  { dir: 'homenaje-virtual-mi-gato', title: 'Homenaje Virtual Mi Gato', slug: 'homenaje-virtual-mi-gato' },
  { dir: 'homenaje-virtual-mi-mascota', title: 'Homenaje Virtual Mi Mascota', slug: 'homenaje-virtual-mi-mascota' },
  { dir: 'homenaje-virtual-mi-perro', title: 'Homenaje Virtual Mi Perro', slug: 'homenaje-virtual-mi-perro' },
  
  // Crear memorial pages (9)
  { dir: 'crear-memorial-conejo', title: 'Crear Memorial Conejo', slug: 'crear-memorial-conejo' },
  { dir: 'crear-memorial-gato', title: 'Crear Memorial Gato', slug: 'crear-memorial-gato' },
  { dir: 'crear-memorial-hamster', title: 'Crear Memorial Hamster', slug: 'crear-memorial-hamster' },
  { dir: 'crear-memorial-loro', title: 'Crear Memorial Loro', slug: 'crear-memorial-loro' },
  { dir: 'crear-memorial-mascota', title: 'Crear Memorial Mascota', slug: 'crear-memorial-mascota' },
  { dir: 'crear-memorial-mascota-exotica', title: 'Crear Memorial Mascota Exótica', slug: 'crear-memorial-mascota-exotica' },
  { dir: 'crear-memorial-pajaro', title: 'Crear Memorial Pájaro', slug: 'crear-memorial-pajaro' },
  { dir: 'crear-memorial-perro', title: 'Crear Memorial Perro', slug: 'crear-memorial-perro' },
  { dir: 'crear-memorial-tortuga', title: 'Crear Memorial Tortuga', slug: 'crear-memorial-tortuga' },
  
  // Registrar pages (3)
  { dir: 'registrar-gato-cementerio-virtual', title: 'Registrar Gato', slug: 'registrar-gato-cementerio-virtual' },
  { dir: 'registrar-mascota-cementerio-virtual', title: 'Registrar Mascota', slug: 'registrar-mascota-cementerio-virtual' },
  { dir: 'registrar-perro-cementerio-virtual', title: 'Registrar Perro', slug: 'registrar-perro-cementerio-virtual' },
  
  // Cementerio mascotas city pages (10)
  { dir: 'cementerio-mascotas-alicante-online', title: 'Cementerio Mascotas Alicante', slug: 'cementerio-mascotas-alicante-online' },
  { dir: 'cementerio-mascotas-barcelona-online', title: 'Cementerio Mascotas Barcelona', slug: 'cementerio-mascotas-barcelona-online' },
  { dir: 'cementerio-mascotas-bilbao-online', title: 'Cementerio Mascotas Bilbao', slug: 'cementerio-mascotas-bilbao-online' },
  { dir: 'cementerio-mascotas-madrid-online', title: 'Cementerio Mascotas Madrid', slug: 'cementerio-mascotas-madrid-online' },
  { dir: 'cementerio-mascotas-malaga-online', title: 'Cementerio Mascotas Málaga', slug: 'cementerio-mascotas-malaga-online' },
  { dir: 'cementerio-mascotas-murcia-online', title: 'Cementerio Mascotas Murcia', slug: 'cementerio-mascotas-murcia-online' },
  { dir: 'cementerio-mascotas-sevilla-online', title: 'Cementerio Mascotas Sevilla', slug: 'cementerio-mascotas-sevilla-online' },
  { dir: 'cementerio-mascotas-valencia-online', title: 'Cementerio Mascotas Valencia', slug: 'cementerio-mascotas-valencia-online' },
  { dir: 'cementerio-mascotas-valladolid-online', title: 'Cementerio Mascotas Valladolid', slug: 'cementerio-mascotas-valladolid-online' },
  { dir: 'cementerio-mascotas-zaragoza-online', title: 'Cementerio Mascotas Zaragoza', slug: 'cementerio-mascotas-zaragoza-online' },
  
  // Other pages (1)
  { dir: 'memorial-mascotas-online', title: 'Memorial Mascotas Online', slug: 'memorial-mascotas-online' },
  { dir: 'memorial-mascotas-exoticas-online', title: 'Memorial Mascotas Exóticas Online', slug: 'memorial-mascotas-exoticas-online' },
  { dir: 'homenaje-virtual-perros', title: 'Homenaje Virtual Perros', slug: 'homenaje-virtual-perros' },
];

const getShorterFAQ = (slug) => {
  const faqs = {
    default: [
      { question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' },
      { question: '¿Es gratis?', answer: 'Sí.' },
      { question: '¿Puedo compartir?', answer: 'Sí.' }
    ]
  };
  return faqs.default;
};

function generateUpdatedContent(originalContent, title, slug) {
  const imports = `'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';

const pageSlug = '${slug}';
const canonical = getCanonicalUrl(\`/\${pageSlug}\`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: '${title}', url: canonical }];
const faqs = ${JSON.stringify(getShorterFAQ(slug))};

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('${title}');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('${title} - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);`;

  // Replace imports section up to export default
  const importPattern = /^'use client';[\s\S]*?export default function.*?\{/m;
  let updated = originalContent.replace(importPattern, imports + '\n\n  return (');

  // Ensure SchemaHead and CanonicalHead are injected
  if (!updated.includes('<CanonicalHead')) {
    updated = updated.replace(
      /\breturn \(\s*<div[^>]*className="min-h-screen">/,
      `return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />`
    );
  }

  return updated;
}

console.log(`Preparing to update ${pagesToUpdate.length} pages...\n`);

let successCount = 0;
let errorCount = 0;

pagesToUpdate.forEach(({ dir, title, slug }) => {
  const pagePath = path.join(appDir, dir, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  File not found: ${pagePath}`);
    errorCount++;
    return;
  }

  try {
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    // Skip if already has SchemaHead
    if (content.includes('SchemaHead')) {
      console.log(`⏭️  Already updated: ${dir}`);
      return;
    }

    const updated = generateUpdatedContent(content, title, slug);
    fs.writeFileSync(pagePath, updated, 'utf-8');
    console.log(`✅ Updated: ${dir}`);
    successCount++;
  } catch (error) {
    console.error(`❌ Error updating ${dir}:`, error.message);
    errorCount++;
  }
});

console.log(`\n✅ Successfully updated: ${successCount}`);
console.log(`⚠️  Errors: ${errorCount}`);
console.log(`\nNext: Run 'npm run build' to verify all changes`);
