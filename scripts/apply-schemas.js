#!/usr/bin/env node

/**
 * Script to automatically apply SEO schemas to all landing pages
 * Usage: node scripts/apply-schemas.js
 */

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// Landing page patterns
const patterns = {
  cementerio: 'cementerio-virtual',
  memorial: 'memorial-',
  homenaje: 'homenaje-virtual',
  crear: 'crear-memorial',
  registrar: 'registrar-',
  mascotas_city: 'cementerio-mascotas-'
};

// Get slug from directory name
function getSlugFromDir(dirName) {
  return dirName;
}

// Get appropriate title from slug
function getTitleFromSlug(slug) {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate import statements
function generateImports() {
  return `import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema
} from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';`;
}

// Generate page setup code
function generatePageSetup(slug) {
  return `
// Page schemas
const pageSlug = '${slug}';
const canonical = getCanonicalUrl(\`/\${pageSlug}\`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [
  { name: 'Home', url: 'https://memorias-eternas.app' },
  { name: getTitleFromSlug(slug), url: canonical }
];

const faqs = [
  {
    question: '¿Cómo comenzar?',
    answer: 'Es muy simple. Haz clic en "Crear Memorial" y sigue los pasos para crear un hermoso espacio para tu mascota.'
  },
  {
    question: '¿Es gratis?',
    answer: 'Sí, puedes crear tu primer memorial de forma completamente gratuita.'
  },
  {
    question: '¿Puedo compartir?',
    answer: 'Absolutamente. Cada memorial tiene un enlace que puedes compartir con amigos y familia.'
  }
];`;
}

// Generate function setup inside component
function generateComponentSetup(title, description) {
  return `
  const localBusinessSchema = generateLocalBusinessSchema('Forever Pet Friend');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema(
    '${title} - Forever Pet Friend',
    '${description}',
    canonical,
    ogImage
  );`;
}

// Generate JSX injection code
function generateJSXInjection() {
  return `
      {/* Add Canonical and Schemas to head */}
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />`;
}

// Process each landing page directory
function processLandingPages() {
  if (!fs.existsSync(appDir)) {
    console.error(`Directory not found: ${appDir}`);
    process.exit(1);
  }

  const dirs = fs.readdirSync(appDir);
  let processedCount = 0;
  let skippedCount = 0;

  dirs.forEach(dir => {
    const dirPath = path.join(appDir, dir);
    const pagePath = path.join(dirPath, 'page.tsx');

    if (!fs.statSync(dirPath).isDirectory()) {
      return;
    }

    // Check if it's a landing page
    const isLandingPage = Object.values(patterns).some(pattern => dir.includes(pattern));
    
    if (!isLandingPage || !fs.existsSync(pagePath)) {
      return;
    }

    let content = fs.readFileSync(pagePath, 'utf8');

    // Skip if already has SchemaHead
    if (content.includes('SchemaHead')) {
      console.log(`⏭️  Skipped (already updated): ${dir}`);
      skippedCount++;
      return;
    }

    // Skip if not 'use client'
    if (!content.includes("'use client'")) {
      console.log(`⏭️  Skipped (not client component): ${dir}`);
      skippedCount++;
      return;
    }

    console.log(`✓ Processing: ${dir}`);
    
    // Add imports after 'use client'
    const useClientRegex = /'use client';\n\n/;
    if (useClientRegex.test(content)) {
      const imports = generateImports();
      content = content.replace(useClientRegex, `'use client';\n\n${imports}\n\n`);
    }

    // Find the first <div className="min-h-screen"> and insert schemas
    const divRegex = /(\s+)<div className="min-h-screen">/;
    if (divRegex.test(content)) {
      const injection = generateJSXInjection();
      content = content.replace(
        divRegex,
        `$1<div className="min-h-screen">\n$1  {/* Add Canonical and Schemas to head */}\n$1  <CanonicalHead url={canonical} />\n$1  <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />`
      );
    }

    // Add component setup code inside the function, before return
    const componentRegex = /export default function \w+\(\) \{/;
    if (componentRegex.test(content)) {
      const slug = getSlugFromDir(dir);
      const title = getTitleFromSlug(slug);
      const setup = generateComponentSetup(title, `Crea un memorial virtual hermoso para honrar a tus mascotas queridas.`);
      
      content = content.replace(
        componentRegex,
        (match) => `${match}${setup}\n`
      );
    }

    // Write back
    fs.writeFileSync(pagePath, content);
    processedCount++;
  });

  console.log(`\n✅ Process complete!`);
  console.log(`   Processed: ${processedCount}`);
  console.log(`   Skipped: ${skippedCount}`);
}

processLandingPages();
