# 📋 Guía de Sitemap Dinámico

## Descripción General

El sitemap de Forever Pet Friend se **actualiza automáticamente** cada vez que agregues nuevas landing pages. No necesitas hacer cambios manuales en el sitemap; solo sigue esta guía.

## 🚀 Cómo Agregar Nuevas Páginas

### 1. **Agregar un Nuevo Tipo de Mascota**

Para agregar un nuevo tipo de mascota (ej: Reptiles), sigue estos pasos:

#### Paso 1: Actualiza `src/lib/routes.ts`

```typescript
export const PET_TYPES: RouteConfig[] = [
  // ... tipos existentes ...
  { slug: 'reptiles', priority: 0.7, changeFrequency: 'monthly' as const },
  // ☝️ Agrega aquí tu nuevo tipo de mascota
];
```

#### Paso 2: Crea la página en `src/app/pet-types/reptiles/page.tsx`

```typescript
import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Reptiles - Forever Pet Friend',
  description: '...',
  keywords: '...',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Virtual para Reptiles',
  subtitle: '...',
  // ... resto del contenido
};

export default function ReptilesPage() {
  return <LandingPageTemplate {...pageData} />;
}
```

#### Resultado:
✅ El sitemap se actualiza automáticamente
✅ La página aparece en `/pet-types` index
✅ Se genera el enlace en la navegación automáticamente

---

### 2. **Agregar un Nuevo Servicio**

Para agregar un nuevo servicio (ej: Premium):

#### Paso 1: Actualiza `src/lib/routes.ts`

```typescript
export const SERVICES: RouteConfig[] = [
  // ... servicios existentes ...
  { slug: 'premium', priority: 0.8, changeFrequency: 'monthly' as const },
  // ☝️ Agrega aquí tu nuevo servicio
];
```

#### Paso 2: Crea la página en `src/app/services/premium/page.tsx`

Similar al ejemplo anterior de reptiles.

#### Resultado:
✅ El sitemap se actualiza automáticamente
✅ La página aparece en `/services` index
✅ Se genera automáticamente en el catálogo

---

### 3. **Agregar una Nueva Categoría (Futura Expansión)**

```typescript
export const CATEGORIES: RouteConfig[] = [
  { slug: 'testimonios', priority: 0.9, changeFrequency: 'monthly' as const },
  { slug: 'historias', priority: 0.85, changeFrequency: 'weekly' as const },
];
```

---

## 📊 Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `src/lib/routes.ts` | **Central de configuración** - Agregar/editar aquí |
| `src/app/sitemap.ts` | **Generador de sitemap** - Usa routes.ts automáticamente |
| `src/app/robots.ts` | **robots.txt** - Configurado automáticamente |
| `src/app/pet-types/page.tsx` | **Índice de mascotas** - Se actualiza desde routes.ts |
| `src/app/services/page.tsx` | **Índice de servicios** - Se actualiza desde routes.ts |

---

## 🔍 Estructura del Sitemap

El sitemap generado incluye:

```xml
<urlset>
  <!-- Static Routes (10 páginas) -->
  <url>
    <loc>http://localhost:3000/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  
  <!-- Pet Types (7 páginas actuales) -->
  <url>
    <loc>http://localhost:3000/pet-types/dogs</loc>
    <priority>0.85</priority>
    <changefreq>monthly</changefreq>
  </url>
  
  <!-- Services (5 páginas actuales) -->
  <url>
    <loc>http://localhost:3000/services/generic</loc>
    <priority>0.85</priority>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

**Total actual: 22 páginas indexadas**

---

## ⚙️ Prioridades de SEO

### Priority Levels:
- **1.0**: Página de inicio
- **0.9**: Rutas críticas (/map, /create)
- **0.85**: Tipos de mascotas populares (perros, gatos)
- **0.8**: Servicios principales
- **0.75**: Tipos de mascotas menos comunes
- **0.7**: Servicios secundarios
- **0.5**: Páginas legales (privacidad, términos)

### Change Frequency:
- `daily`: Contenido que cambia frecuentemente
- `weekly`: Contenido que se actualiza regularmente
- `monthly`: Contenido estable
- `yearly`: Páginas legales/estáticas
- `never`: Páginas archivadas

---

## 🤖 Integración con Google Search Console

1. Sube el sitemap a Google Search Console:
   - URL: `http://localhost:3000/sitemap.xml`
   - O cuando esté en producción: `https://tudominio.com/sitemap.xml`

2. Google enviará:
   - Nuevas páginas a indexar cada 24-48 horas
   - Notificaciones de cambios

3. Robots.txt ya está configurado para permitir:
   - Googlebot accede a todo
   - Otros bots respetan `/api` y `/admin`

---

## 📝 Checklist para Nueva Página

```
□ Agregar entrada en src/lib/routes.ts (PET_TYPES o SERVICES)
□ Crear archivo page.tsx con metadata
□ Incluir testimonios localizados
□ Agregar beneficios (3+) y características (6+)
□ Incluir FAQs (4+)
□ Incluir Schema.org structured data
□ Incluir Open Graph tags
□ Build: npm run build (verifica 0 errores)
□ Test: Verificar en navegador
□ Sitemap: Verificar que aparece en http://localhost:3000/sitemap.xml
```

---

## 🔗 URLs Dinámicas

Usa estas funciones en `src/lib/routes.ts`:

```typescript
// Obtener URL de tipo de mascota
getPetTypeUrl('dogs') // → http://localhost:3000/pet-types/dogs

// Obtener URL de servicio
getServiceUrl('digital') // → http://localhost:3000/services/digital

// Obtener estadísticas totales
getTotalIndexedPages() // → 22 (actual)
getAllRoutes() // → Objeto con todas las rutas
```

---

## ✅ Verificación

Después de agregar una nueva página:

```bash
# Compilar
npm run build

# Iniciar servidor
npm run dev

# Verificar sitemap
curl http://localhost:3001/sitemap.xml
```

Busca tu nueva página en el XML:
```xml
<loc>http://localhost:3001/pet-types/reptiles</loc>
```

---

## 🎯 Beneficios del Sistema Dinámico

✅ **Sin actualización manual de sitemap**
✅ **Prioridades automáticas basadas en tipo**
✅ **Índices de categorías se actualizan automáticamente**
✅ **robots.txt siempre sincronizado**
✅ **Fácil para agregar 100+ páginas sin configuración**
✅ **SEO optimizado desde el inicio**

---

## 📞 Soporte

Para agregar nuevas rutas de categorías:

1. Define en `CATEGORIES` en `src/lib/routes.ts`
2. Crea carpeta y página: `src/app/categories/[slug]/page.tsx`
3. El sitemap se actualiza automáticamente

¡El sistema está listo para escalar!
