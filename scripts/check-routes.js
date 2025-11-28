/**
 * Script para verificar y listar todas las rutas del sitemap
 * Ejecutar: node scripts/check-routes.js
 */

const routes = require('../src/lib/routes.ts');

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║         📋 VERIFICADOR DE RUTAS - FOREVER PET FRIEND       ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Helper to format priority
const formatPriority = (priority) => {
  if (priority === 1) return '⭐⭐⭐⭐⭐';
  if (priority >= 0.8) return '⭐⭐⭐⭐';
  if (priority >= 0.7) return '⭐⭐⭐';
  if (priority >= 0.6) return '⭐⭐';
  return '⭐';
};

// Display Static Routes
console.log('📌 RUTAS ESTÁTICAS (10)\n');
console.table(
  routes.STATIC_ROUTES.map((route) => ({
    'Path': route.path,
    'Priority': route.priority,
    'Frecuencia': route.changeFrequency,
    'Importancia': formatPriority(route.priority),
  }))
);

// Display Pet Types
console.log('\n🐾 TIPOS DE MASCOTAS (7)\n');
console.table(
  routes.PET_TYPES.map((pet) => ({
    'Tipo': pet.slug,
    'URL': `/pet-types/${pet.slug}`,
    'Priority': pet.priority,
    'Importancia': formatPriority(pet.priority),
  }))
);

// Display Services
console.log('\n🎯 SERVICIOS (5)\n');
console.table(
  routes.SERVICES.map((service) => ({
    'Servicio': service.slug,
    'URL': `/services/${service.slug}`,
    'Priority': service.priority,
    'Importancia': formatPriority(service.priority),
  }))
);

// Display Categories (if any)
if (routes.CATEGORIES.length > 0) {
  console.log('\n📂 CATEGORÍAS\n');
  console.table(
    routes.CATEGORIES.map((cat) => ({
      'Categoría': cat.slug,
      'URL': `/categories/${cat.slug}`,
      'Priority': cat.priority,
    }))
  );
}

// Summary
console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║                      📊 RESUMEN TOTAL                       ║');
console.log('╠════════════════════════════════════════════════════════════╣');
console.log(`║ Rutas Estáticas:      ${String(routes.STATIC_ROUTES.length).padEnd(48, ' ')} ║`);
console.log(`║ Tipos de Mascotas:    ${String(routes.PET_TYPES.length).padEnd(48, ' ')} ║`);
console.log(`║ Servicios:            ${String(routes.SERVICES.length).padEnd(48, ' ')} ║`);
console.log(`║ Categorías:           ${String(routes.CATEGORIES.length).padEnd(48, ' ')} ║`);
console.log(`║ ────────────────────────────────────────────────────────── ║`);
console.log(`║ TOTAL DE PÁGINAS:     ${String(routes.getTotalIndexedPages()).padEnd(48, ' ')} ║`);
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Helper info
console.log('💡 GUÍA RÁPIDA:');
console.log('├─ Para AGREGAR una nueva mascota: Edita PET_TYPES en src/lib/routes.ts');
console.log('├─ Para AGREGAR un nuevo servicio: Edita SERVICES en src/lib/routes.ts');
console.log('├─ El sitemap se actualiza AUTOMÁTICAMENTE');
console.log('└─ Ver SITEMAP_GUIDE.md para más detalles\n');

// Generate sample URLs
console.log('🔗 EJEMPLOS DE URLs GENERADAS:');
console.log(`├─ ${routes.getPetTypeUrl('dogs')}`);
console.log(`├─ ${routes.getServiceUrl('free')}`);
console.log(`├─ ${routes.getRouteUrl('/map')}`);
console.log('└─ Sitemap: http://localhost:3001/sitemap.xml\n');
