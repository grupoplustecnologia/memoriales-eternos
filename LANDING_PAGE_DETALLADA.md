# 🎨 LANDING PAGE - GUÍA COMPLETA

## 📋 INFORMACIÓN GENERAL

**Página:** Landing Page / Home Page  
**Ubicación:** `src/app/page.tsx`  
**Estado:** ✅ Completamente Funcional  
**Visitantes:** 100% del tráfico inicial  
**Propósito:** Presentar la plataforma, atraer nuevos usuarios y guiarlos a crear memoriales

---

## 🌈 ESTRUCTURA GENERAL (SECCIONES)

La landing page está dividida en **11 secciones principales**, cada una con un propósito específico:

```
1. Hero Section (Hero con Background)
2. Stats Bar (Estadísticas)
3. How It Works (Cómo Funciona - 3 Pasos)
4. Features Section (Características - Grid 6 Cards)
5. Map Preview Section (Vista Previa del Mapa)
6. Testimonials Carousel (Carrusel de Testimonios)
7. Wall of Love (Muro de Amor - Mini Testimonios)
8. Trust Badges (Insignias de Confianza)
9. FAQ Section (Preguntas Frecuentes)
10. Final CTA Section (Llamada a la Acción Final)
11. Mobile App Section (Descarga de App Móvil)
```

---

## 1️⃣ HERO SECTION - PORTADA PRINCIPAL

### Descripción General

La sección más importante. Es lo primero que ve el usuario. Tiene:
- Fondo con imagen de mascotas
- Texto principal emotivo con gradiente
- 3 Badges de confianza
- 2 Botones de acción
- Indicador de scroll

### Layout Visual

```
┌─────────────────────────────────────┐
│  ✨ Badges de confianza (3)         │
├─────────────────────────────────────┤
│                                     │
│  Título Principal (Grande)          │
│  H1: "Un Lugar Eterno para..."     │
│  + Span gradiente: "Tus Compañeros" │
│                                     │
│  Subtítulo: "Honra la memoria..."  │
│                                     │
│  [Botón 1] [Botón 2]               │
│                                     │
│  Fotos de usuarios + Rating 5/5     │
│                                     │
│  ↓ Indicador Scroll ↓               │
└─────────────────────────────────────┘
```

### Componentes Detallados

#### Badges (Trust Indicators)

**Ubicación en pantalla:** Top center  
**Cantidad:** 3 badges  
**Estilos:** White/20 opacity, backdrop blur

```
Badge 1: ✨ Memorials Permanentes
Badge 2: 🌍 [count]+ Memoriales Creados
Badge 3: 💚 100% Gratis para Empezar
```

**CSS Clases:**
- `bg-white/20` - Fondo blanco semitransparente
- `text-white` - Texto blanco
- `border-white/30` - Borde blanco semitransparente
- `backdrop-blur-sm` - Efecto blur de fondo
- `px-4 py-2` - Padding interno
- `text-sm` - Tamaño de fuente pequeño

#### Titular Principal (H1)

**Ubicación:** Centro de la pantalla  
**Font Size:** 
- Mobile: `text-5xl`
- Tablet: `text-7xl`
- Desktop: `text-8xl`

**Contenido:**
```
"Un Lugar Eterno para
[Tus Compañeros Queridos]"
```

Donde "[Tus Compañeros...]" tiene gradiente:
- `text-transparent` - Transparente
- `bg-clip-text` - Clip de fondo al texto
- `bg-gradient-to-r from-nature-300 to-sky-300` - Gradiente de colores

**Animación:** `animate-fade-in` (fundido)

#### Párrafo Descriptivo

**Ubicación:** Debajo del H1  
**Font Size:** 
- Mobile: `text-xl`
- Desktop: `text-2xl`

**Texto:**
```
"Honra la memoria de tu mascota en un memorial permanente 
visible en todo el mundo"
```

**Estilos:**
- `text-white/90` - Blanco 90% opaco
- `max-w-3xl mx-auto` - Ancho máximo y centrado
- `drop-shadow-lg` - Sombra de texto
- `leading-relaxed` - Espaciado de líneas relajado

#### Botones CTA (Call To Action)

**Ubicación:** Debajo del párrafo descriptivo  
**Tipo:** Flex row en desktop, column en móvil  
**Gap:** 4 unidades (16px)

**Botón 1 - Explorar Mapa:**
```
Texto: 🗺️ Explorar el Mapa
Link: /map
Estilo: Primary (blanco)
Tamaño: Large (lg)
Padding: px-10 py-7
Font-size: text-lg
Efectos: 
  - Hover: scale-105
  - Hover: bg-nature-50
  - Shadow-2xl
```

**Botón 2 - Crear Memorial:**
```
Texto: ✨ Crear Memorial Gratis
Link: /create
Estilo: Outline (borde blanco)
Tamaño: Large (lg)
Padding: px-10 py-7
Font-size: text-lg
Efectos:
  - Hover: scale-105
  - Hover: bg-white (fondo)
  - Hover: text-nature-800 (texto)
  - Backdrop blur-sm
```

#### Social Proof (Validación Social)

**Ubicación:** Abajo de los botones  
**Estructura:** 2 elementos lado a lado

**Elemento 1 - Avatares:**
```
3 fotos circulares de usuarios
- Tamaño: w-8 h-8 (32px)
- Borde: border-2 border-white
- Spacing: -space-x-2 (solapadas)
Texto: "Únete a miles de familias"
```

**Elemento 2 - Rating:**
```
Estrellas: ★★★★★ (5 de 5)
Color: text-yellow-300
Texto: "Calificación 5/5"
```

#### Indicador de Scroll

**Ubicación:** Bottom center  
**Animación:** `animate-bounce` (rebote continuo)  
**Icono:** SVG de flecha hacia abajo

```
<svg className="w-6 h-6 text-white/60">
  <path ... d="M19 14l-7 7m0 0l-7-7m7 7V3" />
</svg>
```

### Background Hero

**Imagen:** Foto de mascotas felices desde Unsplash
```
URL: https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000
```

**Overlay Gradient:** 
```
from-nature-900/80 
via-nature-800/70 
to-background
```

**Altura:** `min-h-[90vh]` (90% de altura de viewport)

---

## 2️⃣ STATS BAR - BARRA DE ESTADÍSTICAS

### Descripción

Sección con fondo degradado que muestra números clave en tiempo real.

### Layout

```
┌──────────────────────────────────────┐
│ [Stats Bar - Fondo Gradient]        │
├──────────────────────────────────────┤
│                                      │
│  Stat 1      Stat 2      Stat 3     │
│  [Number]    [Number]    [Number]   │
│  [Label]     [Label]     [Label]    │
│                                      │
└──────────────────────────────────────┘
```

### Componentes

**Fondo:** `bg-gradient-to-r from-nature-600 to-sky-600`

**Grid:** 
- Mobile: `grid-cols-2` (2 columnas)
- Desktop: `grid-cols-4` (4 columnas)
- Gap: `gap-8`

**Estadísticas Mostradas:**

```
1. [count]+ 
   Memoriales Creados
   Estado: Variable (from API/localStorage)

2. 15
   Países
   Estado: Hardcoded en estado

3. 1.2k+
   Visitas Diarias
   Estado: Calculado (dailyVisits / 1000).toFixed(1)

4. ∞
   Años de Permanencia
   Estado: Símbolo infinito
```

**Estilos de Cada Stat:**
- Número: `text-4xl md:text-5xl font-bold text-white`
- Label: `text-white/80`
- Container: `space-y-2 text-center`

---

## 3️⃣ HOW IT WORKS - CÓMO FUNCIONA (3 PASOS)

### Descripción

Sección que explica el proceso en 3 simples pasos con iconos y descripción.

### Layout

```
┌─────────────────────────────────────┐
│  "Cómo Funciona" (Badge)           │
│  Titulo: "Crea un Memorial..."     │
│  Subtítulo descriptivo              │
├─────────────────────────────────────┤
│                                     │
│  [Paso 1]  ----  [Paso 2]  ----   │
│  Icono         Icono              │
│  Nombre        Nombre             │
│  Descripción   Descripción        │
│                                     │
│            [Paso 3]                 │
│            Icono                    │
│            Nombre                   │
│            Descripción              │
│                                     │
│    [Botón: Comenzar Ahora]         │
├─────────────────────────────────────┤
```

### Fondo

`bg-gradient-to-b from-background to-nature-50`

### Componentes

#### Header Section

**Badge:** `Cómo Funciona`

**Título (H2):**
```
"Crea un Memorial en 3 Simples Pasos"
- text-4xl md:text-5xl
- font-bold
- text-nature-800
```

**Subtítulo:**
```
"Un proceso sencillo y emotivo para honrar a tu compañero"
- text-xl
- text-nature-600
- max-w-2xl mx-auto
```

#### Línea Conectora (Desktop Only)

**Ubicación:** Conecta los 3 pasos horizontalmente  
**Display:** `hidden md:block` (solo en desktop)  
**Estilos:**
```
- h-1 (altura 4px)
- bg-gradient-to-r from-nature-300 via-sky-300 to-golden-300
- top-20 (posición vertical)
- z-0 (detrás de los pasos)
```

#### Grid de Pasos

**Grid:** `md:grid-cols-3 gap-8`

**Cada Paso Contiene:**

```
Paso 1: ✍️ Comparte su Historia
┌─────────────────────┐
│  Círculo Gradiente  │
│  Tamaño: 24x24     │
│  Icono: ✍️          │
│  Número: 1         │
├─────────────────────┤
│  Título H3         │
│  Descripción       │
└─────────────────────┘

Paso 2: 📍 Ubica en el Mapa
┌─────────────────────┐
│  Círculo Gradiente  │
│  Tamaño: 24x24     │
│  Icono: 📍          │
│  Número: 2         │
├─────────────────────┤
│  Título H3         │
│  Descripción       │
└─────────────────────┘

Paso 3: 🌟 Comparte y Recibe Amor
┌─────────────────────┐
│  Círculo Gradiente  │
│  Tamaño: 24x24     │
│  Icono: 🌟          │
│  Número: 3         │
├─────────────────────┤
│  Título H3         │
│  Descripción       │
└─────────────────────┘
```

**Estilos de Círculos:**
- Paso 1: `bg-gradient-to-br from-nature-500 to-nature-600`
- Paso 2: `bg-gradient-to-br from-sky-500 to-sky-600`
- Paso 3: `bg-gradient-to-br from-golden-500 to-golden-600`

**Efectos:**
- `group-hover:scale-110` (crecen al hover)
- `transition-transform duration-300`

**Número (Badge pequeño):**
- Posición: `absolute -top-2 -right-2`
- Tamaño: `w-8 h-8`
- Fondo: Blanco
- Texto: Color del paso (nature-700, sky-700, golden-700)

#### Descripciones de Pasos

**Paso 1 - Comparte su Historia:**
```
"Escribe sobre tu compañero, sube fotos y crea un perfil 
único que capture su esencia y personalidad."
```

**Paso 2 - Ubica en el Mapa:**
```
"Elige un lugar especial en el mapa mundial donde quieras 
que su memorial sea visible para siempre."
```

**Paso 3 - Comparte y Recibe Amor:**
```
"Comparte el memorial con amigos y familia. Recibe tributos, 
mensajes y flores virtuales."
```

#### Botón Final

**Texto:** `Comenzar Ahora - Es Gratis`  
**Link:** `/create`  
**Estilo:** Primary (fondo nature-600)  
**Tamaño:** Large  
**Efectos:** `hover:scale-105 hover:shadow-xl`

---

## 4️⃣ FEATURES SECTION - CARACTERÍSTICAS

### Descripción

Grid de 6 tarjetas mostrando las características principales de la plataforma.

### Layout

```
┌─────────────────────────────────┐
│  "Características" (Badge)      │
│  Título: "Un Memorial Completo" │
│  Subtítulo descriptivo          │
├─────────────────────────────────┤
│                                 │
│  [Card 1]  [Card 2]  [Card 3]  │
│  [Card 4]  [Card 5]  [Card 6]  │
│                                 │
└─────────────────────────────────┘
```

### Grid

**Desktop:** `md:grid-cols-3 gap-8`  
**Breakpoints:**
- Mobile: 1 columna
- Tablet: 2-3 columnas
- Desktop: 3 columnas

### Estructura de Cards

**Componentes:**
1. Icono en círculo (gradient)
2. Título (CardTitle)
3. Descripción (CardDescription)

**Card 1 - Mapa Mundial Interactivo**
```
Icono: 🗺️ (Nature Gradient)
Título: "Mapa Mundial Interactivo"
Descripción: "Ubica el memorial de tu mascota en el lugar que 
más significado tenga para ti. Visible para personas de todo 
el mundo."
```

**Card 2 - Historia Completa**
```
Icono: 📖 (Sky Gradient)
Título: "Historia Completa"
Descripción: "Comparte fotos, historias, anécdotas y recuerdos 
especiales. Crea un tributo único y personal."
```

**Card 3 - Tributos Virtuales**
```
Icono: 🌸 (Golden Gradient)
Título: "Tributos Virtuales"
Descripción: "Amigos y familiares pueden dejar flores virtuales, 
velas y mensajes de condolencia."
```

**Card 4 - Galería de Fotos**
```
Icono: 🖼️ (Nature Gradient)
Título: "Galería de Fotos"
Descripción: "Sube múltiples fotos para crear una galería 
completa de los mejores momentos compartidos."
```

**Card 5 - Compartir Fácilmente**
```
Icono: 🔗 (Sky Gradient)
Título: "Compartir Fácilmente"
Descripción: "Comparte el memorial en redes sociales para que 
otros puedan conocer y honrar a tu mascota."
```

**Card 6 - Permanente**
```
Icono: ♾️ (Golden Gradient)
Título: "Permanente"
Descripción: "Tu memorial permanecerá accesible para siempre, 
preservando la memoria de tu compañero."
```

### Estilos de Cards

**Clase General:**
```
border-[color]-200 
hover:shadow-2xl 
hover:scale-105 
transition-all duration-300 
group overflow-hidden
```

**Colores por tipo:**
- Nature cards: `border-nature-200`
- Sky cards: `border-sky-200`
- Golden cards: `border-golden-200`

**Hover Overlay (Gradiente al pasar):**
```
absolute inset-0 
bg-gradient-to-br from-[color]-500/5 to-transparent 
opacity-0 group-hover:opacity-100 
transition-opacity duration-300
```

**Icono Container:**
```
w-16 h-16 
bg-gradient-to-br from-[color]-100 to-[color]-200 
rounded-2xl 
flex items-center justify-center 
text-3xl
group-hover:scale-110 transition-transform duration-300
```

---

## 5️⃣ MAP PREVIEW SECTION - VISTA PREVIA DEL MAPA

### Descripción

Sección que muestra una vista previa del mapa con tarjetas flotantes de ejemplos.

### Layout

```
┌──────────────────────────────────┐
│  "Vista Previa" (Badge)         │
│  Título: "Explora Memoriales"   │
│  Subtítulo                       │
├──────────────────────────────────┤
│                                  │
│  ┌──────────────────────────┐   │
│  │  [Imagen del Mapa]       │   │
│  │  ┌─────────┐             │   │
│  │  │ Card 1  │ (Flotante)  │   │
│  │  └─────────┘             │   │
│  │              ┌─────────┐ │   │
│  │              │ Card 2  │ │   │
│  │              └─────────┘ │   │
│  │  [Botón: Ver Mapa]       │   │
│  └──────────────────────────┘   │
│                                  │
└──────────────────────────────────┘
```

### Background

**Imagen:** Foto de mapa mundial desde Unsplash
```
URL: https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200
Tamaño: w-full h-[500px]
Object-fit: cover
```

### Overlay Gradient

```
absolute inset-0 
bg-gradient-to-t from-nature-900/90 via-nature-900/30 to-transparent
```

### Botón Flotante (Centrado en el Mapa)

```
Texto: "Ver Mapa Completo →"
Link: /map
Posición: flex items-end justify-center pb-12
Estilo: Blanco sobre imagen
```

### Tarjetas Flotantes

**Tarjeta 1 (Top Left):**
```
Posición: absolute top-8 left-8
Contenido:
├─ Foto: Max (64x64px, rounded-lg)
├─ Nombre: Max
├─ Raza: Golden Retriever
└─ Ubicación: Madrid, España 🇪🇸

Estilos:
- bg-white/95 backdrop-blur-sm
- rounded-xl p-4
- shadow-xl
- max-w-xs
- transform hover:scale-105
- transition-transform duration-300
```

**Tarjeta 2 (Bottom Right):**
```
Posición: absolute bottom-8 right-8
Contenido:
├─ Foto: Luna (64x64px, rounded-lg)
├─ Nombre: Luna
├─ Raza: Siamés
└─ Ubicación: Barcelona, España 🇪🇸

Mismos estilos que Tarjeta 1
```

---

## 6️⃣ TESTIMONIALS CAROUSEL - CARRUSEL DE TESTIMONIOS

### Descripción

Carrusel automático que muestra 6 testimonios completos de usuarios. Rota cada 5 segundos.

### Layout

```
┌──────────────────────────────────┐
│  "Testimonios" (Badge)          │
│  Título: "Historias que Inspiran"│
│  Subtítulo                       │
├──────────────────────────────────┤
│                                  │
│  ┌──────────────────────────┐   │
│  │ [Foto]  [Testimonio]    │   │
│  │ [Foto]  [Rating]        │   │
│  │ [Foto]  [Cita Texto]    │   │
│  │ [Foto]  [Nombre Usuario]│   │
│  └──────────────────────────┘   │
│                                  │
│  ● ● ● ● ● ●  (Navigation dots) │
│                                  │
└──────────────────────────────────┘
```

### Carrusel JavaScript

**Auto-rotation:**
- Intervalo: 5 segundos (5000ms)
- Acción: `setCurrentSlide((prev) => (prev + 1) % totalSlides)`
- Total de slides: 6

**Manual navigation:**
- Dots clickeables
- Click actualiza `setCurrentSlide(index)`

### Testimonios (Contenido)

**Testimonial 1 - Ana García (Max):**
```
Foto: Golden Retriever
Rating: ★★★★★
Cita: "Crear el memorial de Max me ayudó a procesar mi dolor. 
Ahora puedo visitar su página cuando lo extraño y leer todos 
los mensajes bonitos que la gente ha dejado. Es reconfortante 
saber que su memoria vive."
Nombre: Ana García
Mascota: Max • Golden Retriever • Madrid
Avatar: A (azul natural)
```

**Testimonial 2 - Carlos Rodríguez (Luna):**
```
Foto: Gato Siamés
Rating: ★★★★★
Cita: "Luna fue parte de nuestra familia durante 9 años. Este 
espacio nos permite compartir su historia con el mundo y 
mantener vivos todos esos momentos especiales que vivimos 
juntos. Gracias por este regalo."
Nombre: Carlos Rodríguez
Mascota: Luna • Siamés • Barcelona
Avatar: C (azul cielo)
```

**Testimonial 3 - Sarah Johnson (Rocky):**
```
Foto: Pastor Alemán
Rating: ★★★★★
Cita: "Rocky protegió nuestra familia durante 11 años. Poder 
compartir su valentía y lealtad con el mundo me llena de 
orgullo. Los tributos que recibimos nos ayudan a sanar."
Nombre: Sarah Johnson
Mascota: Rocky • Pastor Alemán • Londres
Avatar: S (dorado)
```

**Testimonial 4 - Yuki Tanaka (Milo):**
```
Foto: Maine Coon
Rating: ★★★★★
Cita: "Milo era un gigante gentil. Perdí a mi mejor amigo, pero 
este memorial me permite sentirlo cerca. Ver su foto cada día 
y recordar las aventuras que vivimos juntos es terapéutico."
Nombre: Yuki Tanaka
Mascota: Milo • Maine Coon • Tokio
Avatar: Y
```

**Testimonial 5 - María González (Duke):**
```
Foto: Labrador
Rating: ★★★★★
Cita: "Duke era el alma de nuestro vecindario. Cuando falleció, 
todos quisieron honrarlo. Este memorial permitió que amigos de 
todo el mundo dejaran sus mensajes. Fue hermoso."
Nombre: María González
Mascota: Duke • Labrador • San Francisco
Avatar: M
```

**Testimonial 6 - Sophie Martin (Bella):**
```
Foto: Gato Persa
Rating: ★★★★★
Cita: "Bella me acompañó en mis momentos más difíciles. Poder 
crear este espacio para ella y ver cómo otros también la 
recuerdan con cariño me reconforta profundamente. 
Eternamente agradecida."
Nombre: Sophie Martin
Mascota: Bella • Persa • París
Avatar: S (dorado)
```

### Estructura de Card de Testimonio

```
┌────────────────────────────────┐
│ [Foto: 600px]  [Contenido]    │
│                │               │
│   Max          │ ★★★★★        │
│ Retriever      │               │
│                │ "Cita larga   │
│                │  del usuario" │
│                │               │
│                │ [A]           │
│                │ Ana García    │
│                │ Max • Raza    │
│                │ • Lugar       │
└────────────────────────────────┘
```

**Grid:** `md:grid-cols-2 gap-0` (Foto izquierda, contenido derecha)

**Foto Section:**
```
h-80 md:h-auto 
overflow-hidden
w-full h-full object-cover
```

**Contenido Section:**
```
CardContent
p-8 md:p-12 
flex flex-col justify-center
```

**Rating:**
```
flex text-yellow-500 mb-4 text-xl
★★★★★
```

**Cita:**
```
text-nature-700 italic mb-6 leading-relaxed 
text-lg md:text-xl
```

**Autor:**
```
flex items-center gap-4
├─ Avatar circular (w-14 h-14)
└─ Info:
   ├─ Nombre (text-nature-800 font-bold text-lg)
   └─ Mascota • Raza • Ciudad
```

### Navigation Dots

**Ubicación:** Debajo del carrusel  
**Cantidad:** 6 dots (uno por testimonial)  
**Display:** `flex justify-center gap-3 mt-8`

**Dot Activo:**
```
w-3 h-3 rounded-full 
bg-nature-600 
w-8 (más ancho)
transition-all duration-300
```

**Dot Inactivo:**
```
w-3 h-3 rounded-full 
bg-nature-300 
transition-all duration-300
```

---

## 7️⃣ WALL OF LOVE - MURO DE AMOR

### Descripción

Grid de 12 mini testimonios de usuarios mostrados en tarjetas pequeñas. Es un "muro" social que muestra el alcance global de la plataforma.

### Layout

```
┌──────────────────────────────┐
│ "Wall of Love" (Badge Gold) │
│ Título: "💚 Amor en Cada   │
│           Mensaje"          │
│ Subtítulo                    │
├──────────────────────────────┤
│  [Card] [Card] [Card] [Card] │
│  [Card] [Card] [Card] [Card] │
│  [Card] [Card] [Card] [Card] │
│                              │
│  [Botón: Crear Memorial]    │
└──────────────────────────────┘
```

### Grid

**Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`

### Estructura de Mini Testimonios

**Cada Card contiene:**
```
┌─────────────────────┐
│ [Foto usuario]      │
│ [Nombre usuario]    │
│ [Rating ★★★★★]    │
├─────────────────────┤
│ "Pequeño testimonio" │
│ de una o dos líneas  │
├─────────────────────┤
│ 🐱 Mascota • Ciudad  │
└─────────────────────┘
```

**CardContent:** `p-5`

**Estructura HTML:**
```
1. Flex de usuario (gap-3)
   ├─ Foto: w-12 h-12 rounded-full border-2 border-white
   └─ Info:
      ├─ Nombre: font-semibold text-nature-800 text-sm
      └─ Rating: flex text-yellow-500 text-xs (★★★★★)

2. Testimonio: text-nature-700 text-sm leading-relaxed

3. Ubicación: text-xs text-nature-500 mt-2
   Formato: 🐱 Nombre • Ciudad
```

### 12 Mini Testimonios Completos

```
1. Pedro S. | Simba (Gato) | Sídney
   "Simba vivirá para siempre aquí. Hermoso tributo."

2. Emily R. | Charlie (Perro) | NYC
   "¡Exactamente lo que necesitaba! Fácil de usar y emotivo."

3. Dmitri K. | Shadow (Gato) | Moscú
   "Shadow ahora es eterno. Todos pueden ver su nobleza."

4. Klaus M. | Toby (Conejo) | Berlín
   "Toby era tan especial. Este memorial lo captura perfectamente."

5. Wei L. | Nala (Gato) | Singapur
   "Nala era mi reina. Ahora el mundo puede conocerla. Gracias."

6. João P. | Bruno (Perro) | São Paulo
   "Bruno me defendió siempre. Ahora yo defiendo su memoria."

7. Nikos A. | Zeus (Perro) | Atenas
   "Zeus era un gigante gentil. Este sitio honra su grandeza."

8. Lisa M. | Daisy (Perro) | Toronto
   "Daisy adoraba a los niños. Ahora todos pueden leer sobre ella."

9. Lucía F. | Coco (Loro) | Buenos Aires
   "Coco cantaba cada mañana. Su voz sigue aquí, en su historia."

10. Erik H. | Oliver (Gato) | Oslo
    "Oliver era un caballero. Perfecto para honrar su elegancia."

11. Aoife O. | Whiskers (Hámster) | Dublín
    "Whiskers era pequeño pero lleno de amor. Aquí vive su esencia."

12. Rosa M. | Piolin (Pájaro) | México DF
    "Piolin era puro sol. Su memorial brilla igual que él brilló."
```

### Colores de Cards

Alternan entre 3 gradientes:
1. **Nature:** `bg-gradient-to-br from-nature-50 to-nature-100 border-nature-200`
2. **Sky:** `bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200`
3. **Golden:** `bg-gradient-to-br from-golden-50 to-golden-100 border-golden-200`

### CTA Debajo del Wall of Love

```
Texto: "Sé parte de estas historias de amor 💚"
Botón: 
  - Texto: "Crear Mi Memorial Gratis"
  - Link: /create
  - Estilo: Gradient (from-nature-600 to-sky-600)
  - Efecto: hover:scale-105
```

---

## 8️⃣ TRUST BADGES - INSIGNIAS DE CONFIANZA

### Descripción

4 badges que muestran razones para confiar en la plataforma.

### Layout

```
Grid: grid-cols-2 md:grid-cols-4 gap-6
```

### Badges

**Badge 1 - Seguridad**
```
Icono: 🔒
Título: "100% Seguro"
Subtítulo: "Datos protegidos"
```

**Badge 2 - Rapidez**
```
Icono: ⚡
Título: "Rápido"
Subtítulo: "Crea en minutos"
```

**Badge 3 - Amor**
```
Icono: 💚
Título: "Con Amor"
Subtítulo: "Hecho con cariño"
```

**Badge 4 - Global**
```
Icono: 🌍
Título: "Global"
Subtítulo: "Visible mundial"
```

### Estilos

```
bg-white rounded-xl p-6 
shadow-md hover:shadow-lg 
transition-shadow duration-300
text-center

Icono: text-4xl mb-3
Título: font-semibold text-nature-800 mb-1
Subtítulo: text-sm text-nature-600
```

---

## 9️⃣ FAQ SECTION - PREGUNTAS FRECUENTES

### Descripción

4 preguntas comunes con respuestas usando Cards expandibles.

### Preguntas

**P1: ¿Es realmente gratis crear un memorial?**
```
R: Sí, el plan gratuito te permite crear 1 memorial completo con 
foto, historia, ubicación y epitafio. Sin costos ocultos ni 
tarjeta de crédito requerida.
```

**P2: ¿El memorial será permanente?**
```
R: Absolutamente. Todos los memoriales permanecen en línea de 
forma indefinida. Nos comprometemos a preservar estas memorias 
para las generaciones futuras.
```

**P3: ¿Puedo agregar más fotos después?**
```
R: Sí, con los planes Premium puedes crear una galería con 
múltiples fotos y actualizarla cuando quieras.
```

**P4: ¿Qué pasa con la privacidad?**
```
R: Tú controlas qué información es visible. Puedes elegir hacer 
el memorial público o privado (solo con enlace directo).
```

### Estructura de Card

```
CardHeader:
├─ Icono: ❓ (text-2xl flex-shrink-0)
└─ Título (CardTitle): Pregunta

CardContent:
└─ Respuesta (text-nature-600 pl-11)
```

### Estilos

```
border-nature-200 
hover:shadow-lg 
transition-all duration-300

Pregunta: text-lg text-nature-800 flex items-start gap-3
Respuesta: text-nature-600 leading-relaxed pl-11
```

---

## 🔟 FINAL CTA SECTION - LLAMADA A LA ACCIÓN FINAL

### Descripción

Grande, dramática, última sección para convertir al usuario. Con fondo de imagen, overlay oscuro y botones prominentes.

### Layout

```
┌──────────────────────────────────┐
│ [Background Image + Overlay]     │
│                                  │
│  Badge: "Comienza Gratis Hoy"   │
│                                  │
│  H2: "Dale a Tu Mascota el      │
│       Memorial que Merece"       │
│                                  │
│  P: "Comienza gratis en menos    │
│      de 5 minutos..."           │
│                                  │
│  [3 checkmarks con benefits]    │
│                                  │
│  [Botón 1] [Botón 2]            │
│                                  │
│  [Avatar stack]                 │
│  "X+ familias ya honran..."     │
│                                  │
└──────────────────────────────────┘
```

### Background

**Imagen:** Foto de mascotas desde Unsplash
```
URL: https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000
```

**Overlay:** `bg-gradient-to-r from-nature-900/95 via-nature-800/90 to-sky-900/95`

### Badge

```
"✨ Comienza Gratis Hoy Mismo"
bg-white/20 text-white border-white/30 
backdrop-blur-sm px-6 py-2
```

### Titular (H2)

```
"Dale a Tu Mascota el Memorial que Merece"
text-5xl md:text-6xl lg:text-7xl 
font-bold text-white 
leading-tight 
drop-shadow-2xl
```

### Subtítulo (P)

```
"Comienza gratis en menos de 5 minutos.
Un espacio permanente para honrar a quien tanto te dio."
text-2xl md:text-3xl text-white/95 
max-w-2xl mx-auto 
leading-relaxed 
drop-shadow-lg
```

### Beneficios (3 checkmarks)

```
Flex wrap con 3 beneficios:

1. ✓ Gratis para siempre
2. ✓ Sin tarjeta de crédito
3. ✓ Listo en 5 minutos

Estilos:
flex items-center gap-2 text-white/90 text-lg
- SVG checkmark: w-6 h-6 text-green-400
- Texto: span
```

### Botones CTA

**Botón 1 - Crear Memorial:**
```
Texto: "🌟 Crear Memorial Gratis"
Link: /create
Tamaño: Large
Padding: px-12 py-8
Font-size: text-xl
Estilo: bg-white text-nature-800
Efecto: hover:scale-105 transition-all
```

**Botón 2 - Explorar:**
```
Texto: "🗺️ Explorar Ejemplos"
Link: /map
Tamaño: Large
Padding: px-12 py-8
Font-size: text-xl
Estilo: outline (border-white)
Efecto: hover:bg-white hover:text-nature-800
```

### Social Proof Final

```
Avatares: 5 fotos superpuestas
- w-12 h-12 rounded-full border-3 border-white shadow-lg

Texto:
"[count]+ familias ya honran a sus compañeros aquí"
- Número en bold
- text-white/90 text-lg
```

---

## 1️⃣1️⃣ MOBILE APP SECTION - DESCARGA DE APP

### Descripción

Sección promocional para la app móvil (próximamente). Incluye beneficios, botones de descarga y mockup del teléfono.

### Layout

```
┌────────────────────────────────────┐
│ [Contenido Izquierda]  [Mockup Tel]│
│                                    │
│ Badge: "📱 Próximamente"          │
│ H2: "Descarga Nuestra App Móvil"  │
│ Descripción                        │
│                                    │
│ [3 features con checkmarks]       │
│                                    │
│ [Google Play] [App Store]         │
│ "🚧 En desarrollo..."             │
└────────────────────────────────────┘
```

### Grid

**Desktop:** `lg:grid-cols-2 gap-8 lg:gap-12 items-center`

### Contenido Izquierdo

**Badge:**
```
"📱 Próximamente"
bg-nature-600 text-white
```

**Título (H2):**
```
"Descarga Nuestra Aplicación Móvil"
text-3xl sm:text-4xl md:text-5xl 
font-bold text-nature-800
```

**Descripción:**
```
"Lleva los recuerdos de tu compañero siempre contigo. 
Visita su memorial, deja tributos y comparte momentos 
desde cualquier lugar."
text-base sm:text-lg md:text-xl 
text-nature-600 leading-relaxed
```

### 3 Features de App

Cada feature:
```
flex items-center gap-3 text-nature-700

├─ Círculo icono: w-10 h-10 sm:w-12 sm:h-12
│  ├─ bg-[color]-600 rounded-full
│  ├─ flex items-center justify-center
│  └─ SVG blanco w-5 h-5 sm:w-6 sm:h-6

└─ Texto: text-sm sm:text-base md:text-lg font-medium
```

**Feature 1:**
```
Icono: 🔔 (notifications)
Texto: "Notificaciones de nuevos tributos"
Color: nature-600
```

**Feature 2:**
```
Icono: 🖼️ (gallery)
Texto: "Galería de fotos sin límites"
Color: sky-600
```

**Feature 3:**
```
Icono: ✓ (shield/check)
Texto: "Acceso offline a tus memoriales"
Color: golden-600
```

### Store Buttons

**Google Play Button:**
```
bg-black hover:bg-gray-900 
text-white rounded-xl 
px-6 py-3 sm:px-8 sm:py-4

Contenido:
├─ SVG logo (w-8 h-8 sm:w-10 sm:h-10)
└─ Texto:
   ├─ "Disponible en" (text-xs)
   └─ "Google Play" (text-base sm:text-lg font-bold)
```

**Apple Store Button:**
```
bg-black hover:bg-gray-900 
text-white rounded-xl 
px-6 py-3 sm:px-8 sm:py-4

Contenido:
├─ SVG logo (w-8 h-8 sm:w-10 sm:h-10)
└─ Texto:
   ├─ "Descarga en" (text-xs)
   └─ "App Store" (text-base sm:text-lg font-bold)
```

**Nota bajo botones:**
```
"🚧 En desarrollo • Suscríbete para recibir notificaciones"
text-sm text-nature-500 mt-4 sm:mt-6
```

### Mockup del Teléfono (Derecha)

**Estructura:**
```
┌─ Contenedor relativo con elementos flotantes
│  ├─ Círculo bg-nature-600 opacity-20 top-left
│  └─ Círculo bg-sky-600 opacity-20 bottom-right
│
├─ Frame del teléfono (bg-nature-800 to nature-900)
│  ├─ Borde redondeado: rounded-[3rem]
│  ├─ Padding: p-4 sm:p-5
│  └─ Shadow: shadow-2xl
│
├─ Pantalla (bg-white rounded-[2.5rem])
│  ├─ Notch: bg-nature-800 h-6 sm:h-7
│  └─ Contenido:
│     ├─ Icono circular (gato) 🐾
│     ├─ Nombre: "Max"
│     ├─ Años: "2015 - 2023"
│     ├─ 3 Mini Cards
│     │  ├─ Tributos
│     │  ├─ Galería
│     │  └─ Ubicación
```

**Screen Content:**
```
p-4 sm:p-6
bg-gradient-to-b from-nature-50 to-white
min-h-[400px] sm:min-h-[500px]

Header:
├─ Icono 🐾: w-16 h-16 sm:w-20 sm:h-20
├─ Nombre: font-bold text-base sm:text-lg
└─ Años: text-xs sm:text-sm

Mini Cards (space-y-2 sm:space-y-3):
1. 🌸 Ana M. - Nuevo tributo
2. 📸 Galería - 12 fotos
3. 🗺️ Ubicación - Madrid, España
```

---

## 🎯 COLORES UTILIZADOS

### Paleta Principal

```
Nature:
- nature-50, nature-100, nature-200, nature-300
- nature-500, nature-600, nature-700, nature-800, nature-900

Sky:
- sky-100, sky-200, sky-300, sky-500, sky-600

Golden:
- golden-100, golden-200, golden-300, golden-400
- golden-500, golden-600

Adicionales:
- white (backgrounds)
- black (text, buttons)
- green-400 (checkmarks)
- yellow-300, yellow-500 (ratings)
- red (errors)
```

### Usos

```
Primario (Principal): nature-600, nature-800
Secundario (Complementario): sky-600
Acentos (Llamadas): golden-600
Hover: nature-700
Background: nature-50, white, background
Texto: nature-800, nature-700, nature-600
```

---

## 📊 ANIMACIONES

### Animaciones CSS

```
1. animate-fade-in
   - Hero section fade in

2. animate-bounce
   - Flecha indicadora de scroll (infinita)

3. hover:scale-105 transition-all duration-300
   - Cards al pasar mouse
   - Botones al pasar mouse
   - Testimonios al pasar mouse

4. hover:shadow-lg, hover:shadow-xl
   - Aumenta sombra al hover

5. group-hover:opacity-100
   - Overlay de cards se muestra al hover

6. group-hover:scale-110
   - Icono de cards crece al hover
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Puntos de Quiebre

```
Mobile First Approach:
- Default: Mobile (< 640px)
- sm: 640px (small devices)
- md: 768px (tablets)
- lg: 1024px (desktops)
- xl: 1280px (large desktops)

Cambios por breakpoint:
├─ Hero: text-5xl → text-7xl → text-8xl
├─ Grids: 1 col → 2 cols → 3-4 cols
├─ Font-size: sm → base → lg → xl
├─ Padding: px-4 → px-6 → px-8
└─ Gap: gap-4 → gap-6 → gap-8
```

---

## 🔧 FUNCIONALIDADES JAVASCRIPT

### useState Hooks

```
1. count: Número de memoriales (from localStorage)
2. countries: Número de países (15)
3. dailyVisits: Visitas diarias (1200)
4. currentSlide: Índice del slide actual (0-5)
```

### useEffect Hooks

```
1. Fetch Stats (ejecuta cada 10 segundos)
   - Obtiene count de localStorage
   - Intenta fetch de API si está disponible

2. Carousel Auto-rotation (cada 5 segundos)
   - Incrementa currentSlide
   - Vuelve a 0 cuando alcanza totalSlides

3. Update Carousel Classes (cuando currentSlide cambia)
   - Añade/quita clase 'active' a slides
   - Actualiza dots (color, ancho)

4. Manual Dot Navigation (al cargar)
   - Añade event listeners a dots
   - Click actualiza currentSlide
```

---

## 📝 TEXTOS Y COPYS CLAVE

### Headlines

```
"Un Lugar Eterno para Tus Compañeros Queridos"
"Honra la memoria de tu mascota en un memorial permanente"
"Crea un Memorial en 3 Simples Pasos"
"Un Memorial Completo y Permanente"
"Explora Memoriales de Todo el Mundo"
"Historias que Nos Inspiran"
"💚 Amor en Cada Mensaje"
"Dale a Tu Mascota el Memorial que Merece"
"Descarga Nuestra Aplicación Móvil"
```

### CTAs

```
🗺️ Explorar el Mapa
✨ Crear Memorial Gratis
Comenzar Ahora - Es Gratis
Ver Mapa Completo →
Crear Mi Memorial Gratis
Comenzar Gratis en Menos de 5 Minutos
Crear Mi Memorial Gratis (en final CTA)
```

### Descripciones

```
"Escribe sobre tu compañero, sube fotos y crea un perfil 
único que capture su esencia y personalidad."

"Elige un lugar especial en el mapa mundial donde quieras 
que su memorial sea visible para siempre."

"Comparte el memorial con amigos y familia. Recibe tributos, 
mensajes y flores virtuales."
```

---

## 📊 ESTRUCTURA DE ARCHIVOS RELEVANTES

```
src/
├── app/
│   ├── page.tsx (← Landing Page - AQUÍ)
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   └── dialog.tsx
│   └── ...otros
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
└── types/
    └── index.ts
```

---

## 🎨 RESUMEN DE DISEÑO

### Principios de Diseño

```
1. Emotional Connection
   - Usa palabras emotivas
   - Muestra historias reales
   - Valida sentimientos de duelo

2. Social Proof
   - Testimonios con fotos
   - Número de usuarios
   - Calificaciones 5/5

3. Trust Building
   - Badges de seguridad
   - Promesa de permanencia
   - Transparencia

4. Clear CTAs
   - Botones destacados
   - Múltiples puntos de conversión
   - Lenguaje accionable

5. Visual Hierarchy
   - H1 más grande que H2
   - Colores guían atención
   - Espaciado clara la lectura

6. Responsive Design
   - Mobile first
   - Se adapta a todos los tamaños
   - Touch-friendly buttons

7. Performance
   - Imágenes optimizadas
   - CSS minificado
   - Smooth animations
```

---

## 🎯 MÉTRICAS Y CONVERSIONES

### KPIs Clave

```
1. Click en "Crear Memorial Gratis" (Hero)
2. Click en "Explorar el Mapa"
3. Click en botones en Final CTA
4. Testimonios leídos completamente
5. Tiempo en página (ideal: > 2 min)
6. Tasa de bounce (ideal: < 50%)
```

### Funnels de Conversión

```
Landing Page (100%)
├─ Ver Hero (95%)
├─ Scroll Stats (85%)
├─ Ver How It Works (75%)
├─ Ver Testimonios (60%)
├─ Click CTA (20%)
│  ├─ Crear Memorial (12%)
│  └─ Explorar Mapa (8%)
```

---

**Documento creado:** 27 de Noviembre de 2025  
**Versión:** 1.0 Completa  
**Estado:** ✅ Listo para recrear
