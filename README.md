# 🐾 Memorias Eternas - Cementerio Virtual de Animales

Una plataforma web emotiva donde las personas pueden crear memoriales permanentes para sus mascotas y animales queridos, visualizados en un mapa interactivo mundial.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Ready-green)

## ✨ Características

### 🗺️ Mapa Interactivo Mundial
- Visualiza memoriales de mascotas de todo el mundo
- Marcadores personalizados por tipo de animal
- Filtros por especie (perros, gatos, aves, roedores, reptiles)
- **Búsqueda por nombre, raza o historia**
- Popups informativos con vista previa

### 📝 Perfiles Completos
- Información detallada: nombre, raza, fechas
- Foto principal y galería de imágenes
- Historia personalizada y epitafio
- Ubicación geográfica configurable

### 🌸 Sistema de Tributos
- Flores virtuales y velas
- Mensajes de condolencia
- Estadísticas de visitas

### 💳 Planes de Suscripción
- **Gratuito**: 1 perfil básico
- **Premium Mensual**: €4.99/mes - 5 perfiles
- **Premium Anual**: €49.99/año - Perfiles ilimitados
- **Familiar**: €79.99/año - 10 usuarios, perfiles ilimitados

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ o Bun
- (Opcional) Cuenta de Supabase para persistencia

### Instalación

1. **Clonar el repositorio**
```bash
cd cementerio-virtual-animales
```

2. **Instalar dependencias**
```bash
bun install
# o
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
bun run dev
# o
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

¡Listo! La aplicación funcionará con **datos de demostración** (20 perfiles de ejemplo).

## 🗄️ Configuración de Base de Datos (Opcional)

Por defecto, la aplicación usa datos mock para demostración. Para configurar Supabase y tener persistencia real:

1. **Lee las instrucciones completas**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

2. **Resumen rápido**:
   - Crea un proyecto en [Supabase](https://supabase.com)
   - Ejecuta el script `supabase-schema.sql` en el SQL Editor
   - Copia `.env.example` a `.env.local`
   - Agrega tus credenciales de Supabase

```bash
cp .env.example .env.local
# Edita .env.local con tus credenciales
```

## 📂 Estructura del Proyecto

```
cementerio-virtual-animales/
├── src/
│   ├── app/                    # Páginas de Next.js
│   │   ├── page.tsx           # Landing page
│   │   ├── map/               # Mapa interactivo
│   │   ├── create/            # Crear memorial
│   │   ├── profile/[id]/      # Perfil individual
│   │   ├── pricing/           # Planes
│   │   └── about/             # Acerca de
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes shadcn personalizados
│   │   ├── InteractiveMap.tsx # Mapa con Leaflet
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── contexts/             # Context providers
│   │   └── DataContext.tsx   # Mock vs Supabase
│   ├── data/
│   │   └── mockData.ts       # 20 perfiles de ejemplo
│   ├── hooks/                # Custom hooks
│   │   ├── useProfiles.ts    # CRUD de perfiles
│   │   └── useTributes.ts    # CRUD de tributos
│   ├── lib/
│   │   ├── supabase.ts       # Cliente de Supabase
│   │   └── utils.ts
│   └── types/
│       └── index.ts          # TypeScript types
├── supabase-schema.sql        # Esquema de DB
├── SUPABASE_SETUP.md         # Guía de configuración
└── README.md                 # Este archivo
```

## 🎨 Stack Tecnológico

### Frontend
- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utility-first
- **shadcn/ui**: Componentes UI personalizables
- **Leaflet**: Mapas interactivos
- **React Leaflet**: Integración de Leaflet con React

### Backend (Opcional)
- **Supabase**: Base de datos PostgreSQL
- **PostGIS**: Extensión geoespacial
- **Row Level Security**: Seguridad a nivel de fila

### Características Técnicas
- Búsqueda de texto completo en español
- Consultas geoespaciales (búsqueda por radio)
- Responsive design (móvil, tablet, desktop)
- Animaciones suaves con CSS
- Optimización de imágenes

## 🎯 Páginas Principales

### 1. Landing Page (`/`)
- Hero section emotivo
- Características destacadas
- Testimonios
- Call-to-action

### 2. Mapa Interactivo (`/map`)
- **20 perfiles de ejemplo** distribuidos globalmente
- Búsqueda en tiempo real
- Filtros por tipo de animal
- Estadísticas en vivo

### 3. Crear Memorial (`/create`)
- Wizard de 4 pasos
- Validación de formulario
- Vista previa

### 4. Perfil Individual (`/profile/[id]`)
- Historia completa
- Galería de fotos
- Tributos
- Compartir en redes sociales

### 5. Planes (`/pricing`)
- 4 planes de suscripción
- Comparación de características
- FAQ

## 📊 Datos de Demostración

El proyecto incluye **20 perfiles de ejemplo** con:
- ✅ 8 Perros (Max, Rocky, Charlie, Duke, Daisy, Bruno, Zeus)
- ✅ 7 Gatos (Luna, Bella, Milo, Simba, Shadow, Oliver, Nala)
- ✅ 3 Aves (Coco, Piolin, Kiwi)
- ✅ 2 Roedores (Toby, Whiskers)
- ✅ 1 Reptil (Rex)

Ubicaciones en:
- 🌍 España (Madrid, Barcelona)
- 🌍 Reino Unido (Londres)
- 🌍 Francia (París)
- 🌍 Alemania (Berlín)
- 🌍 USA (Nueva York, San Francisco)
- 🌍 Argentina (Buenos Aires)
- 🌍 Brasil (São Paulo)
- 🌍 México (Ciudad de México)
- 🌍 Australia (Sídney)
- 🌍 Japón (Tokio)
- 🌍 Rusia (Moscú)
- 🌍 Grecia (Atenas)
- 🌍 Y más...

## 🛠️ Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
bun run dev

# Build de producción
bun run build

# Preview de producción
bun run start

# Linting
bun run lint
```

### Agregar Componentes shadcn

```bash
bunx shadcn@latest add -y -o [component-name]
```

## 🔐 Seguridad

- Row Level Security (RLS) en Supabase
- Validación de datos en frontend y backend
- HTTPS obligatorio en producción
- Variables de entorno para credenciales

## 🚢 Deployment

### Vercel (Recomendado para Next.js)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Netlify

```bash
bun run build
netlify deploy --prod
```

### Variables de Entorno Necesarias

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica
```

## 🎨 Personalización

### Colores del Tema

Edita `tailwind.config.ts`:

```typescript
colors: {
  nature: { /* Verde tierra */ },
  sky: { /* Azul cielo */ },
  golden: { /* Dorado */ }
}
```

### Componentes

Todos los componentes shadcn están en `src/components/ui/` y pueden ser personalizados.

## 📝 Roadmap

- [ ] Autenticación de usuarios (NextAuth.js)
- [ ] Carga de imágenes (Cloudinary/S3)
- [ ] Integración con Stripe real
- [ ] Sistema de notificaciones por email
- [ ] Exportar memorial como PDF
- [ ] Modo oscuro
- [ ] Múltiples idiomas (i18n)
- [ ] Aplicación móvil (PWA)
- [ ] Moderación de contenido
- [ ] Comentarios entre usuarios
- [ ] Estadísticas avanzadas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 💬 Soporte

Si tienes preguntas o problemas:

1. Revisa la documentación
2. Consulta [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
3. Abre un issue en GitHub

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Leaflet](https://leafletjs.com/)
- [Unsplash](https://unsplash.com/) por las imágenes de ejemplo

---

Hecho con ❤️ para honrar a nuestros compañeros queridos.
