# 🚀 Quick Start - Nuevas Funcionalidades Sociales

## Aceso Rápido

| Funcionalidad | URL | Acceso |
|---|---|---|
| 🔍 Buscar | `/search` | Navbar: "Buscar" |
| ⭐ Trending | `/trending` | Navbar: "Destacados" |
| ❤️ Me Gusta | `/profile/[id]` | Sección "Interacciones" |
| 😊 Reacciones | `/profile/[id]` | Sección "Interacciones" |
| 🔗 Compartir | `/profile/[id]` | Botón "Compartir" |
| 💬 Comentarios | `/profile/[id]` | Sección "Comentarios" |
| 🏷️ Etiquetas | `/profile/[id]` | Sección "Etiquetas" |

---

## 🎬 Guía Visual Rápida

### Para Buscar Memoriales

```
1. Click en "Buscar" (navbar)
2. Tipo de búsqueda (dropdown):
   • Todos los memoriales (predeterminado)
   • Por nombre (ej: "Luna")
   • Por animal (ej: "gato")
   • Por ubicación (ej: "40.4,-3.7")
3. Escribir búsqueda
4. Click "Buscar" o Enter
5. ¡Resultados listos!
```

### Para Ver Trending

```
1. Click en "Destacados" (navbar)
2. Elegir categoría con tabs:
   ⭐ Populares (más visitados)
   📅 Recientes (nuevos)
   ❤️ Más Queridos (más likes)
   💬 Comentados (más comentarios)
3. Scroll para ver más
4. Click en memorial para verlo
```

### Para Interactuar en un Memorial

```
PASO 1: Ver Interacciones
└─ ❤️ Me Gusta  [contador]
└─ 😊 Reaccionar [panel de emojis]
└─ 🔗 Compartir

PASO 2: Dar Me Gusta (requiere login)
└─ Click en ❤️ → Se pone rojo
└─ Contador aumenta
└─ Click de nuevo para quitar

PASO 3: Reaccionar (requiere login)
└─ Click en 😊
└─ Elegir emoji del grid
└─ Emoji aparece con contador
└─ Click de nuevo en mismo emoji para quitar

PASO 4: Compartir (no requiere login)
└─ Click en 🔗 Compartir
└─ Elegir red social:
   └─ 📋 Copiar enlace
   └─ 💬 WhatsApp
   └─ 👍 Facebook
   └─ 𝕏 Twitter
   └─ ✉️ Email

PASO 5: Comentar (opcional: login)
└─ Scroll a "Comentarios"
└─ Nombre: Autocompletado si logueado
└─ Mensaje: Escribir comentario
└─ Click "Publicar Comentario"
└─ Comentario aparece en lista

PASO 6: Etiquetas (solo si eres propietario)
└─ Scroll a "Etiquetas"
└─ Escribir en campo de búsqueda
└─ Seleccionar tag existente
└─ O crear nuevo escribiendo nombre + Click +
└─ Click X para remover tag
```

---

## 💡 Tips de Uso

### Búsqueda Avanzada
```
✨ Búsqueda por ubicación:
   Formato: latitud,longitud
   Ej: 40.4168,-3.7038
   Resultado: Memoriales cercanos (ordenados por distancia)

✨ Búsqueda de nombres:
   Busca en: nombre, historia, epígrafe
   Ej: "Max" encontrará memoriales con "Max" en el nombre

✨ Búsqueda de animales:
   Tipos: perro, gato, ave, roedor, reptil, otro
   Ej: "perro" listará todos los memoriales de perros
```

### Emojis de Reacción Disponibles
```
❤️ Amor
😢 Tristeza
🙏 Respeto
😊 Felicidad
🌹 Belleza
⭐ Admiración
🕊️ Paz
💐 Flores/Flores de luto
```

### Etiquetas Predefinidas
```
Por tipo:
  • Perro, Gato, Ave, Roedor, Conejo

Por carácter:
  • Heroico, Amado, Aventurero, Travieso, Guardián

(Puedes crear tus propias etiquetas)
```

---

## 🔐 Reglas de Acceso

### Sin Autenticación ✅
- ✅ Ver me gusta (contador)
- ✅ Ver reacciones (emojis)
- ✅ Ver comentarios
- ✅ Ver etiquetas
- ✅ Usar búsqueda
- ✅ Ver trending
- ✅ Comentar (como visitante)
- ✅ Compartir en redes

### Con Autenticación ✅
- ✅ Dar me gusta
- ✅ Hacer reacciones
- ✅ Comentar (con nombre autollenado)
- ✅ Eliminar propios comentarios
- ✅ Agregar/quitar etiquetas (propios memoriales)

---

## 🆕 APIs para Desarrolladores

```bash
# LIKES
curl -X GET "http://localhost:3000/api/likes?profileId=XXX&userId=YYY"
curl -X POST "http://localhost:3000/api/likes" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"profileId":"XXX"}'

# REACTIONS
curl -X GET "http://localhost:3000/api/reactions?profileId=XXX"
curl -X POST "http://localhost:3000/api/reactions" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"profileId":"XXX","emoji":"❤️"}'

# COMMENTS
curl -X GET "http://localhost:3000/api/comments?profileId=XXX"
curl -X POST "http://localhost:3000/api/comments" \
  -H "Content-Type: application/json" \
  -d '{"profileId":"XXX","visitorName":"Juan","message":"Qué bonito"}'

# SEARCH
curl -X GET "http://localhost:3000/api/search?q=Max&type=memorial"
curl -X GET "http://localhost:3000/api/search?q=perro&type=animal"
curl -X GET "http://localhost:3000/api/search?q=40.4,-3.7&type=location"

# TRENDING
curl -X GET "http://localhost:3000/api/trending?type=popular&limit=10"
curl -X GET "http://localhost:3000/api/trending?type=mostLiked&limit=5"

# TAGS
curl -X GET "http://localhost:3000/api/tags?action=popular"
curl -X GET "http://localhost:3000/api/tags?profileId=XXX"
curl -X GET "http://localhost:3000/api/tags?action=search&q=perro"
```

---

## 📊 Estadísticas Visibles

En `/profile/[id]`, puedes ver:

```
📈 Estadísticas del Memorial:
   • ❤️ Me gusta: [número]
   • 😊 Reacciones: [emojis con contadores]
   • 💬 Comentarios: [número]
   • 🕯️ Tributos: [número]
   • 👁️ Visitantes: [número] (viewCount)

📊 En /trending, por categoría:
   • Populares: Ordenados por viewCount ↓
   • Recientes: Por fecha de creación (nuevos primero)
   • Más Queridos: Por cantidad de likes ↓
   • Comentados: Por cantidad de comentarios ↓
```

---

## ⚡ Atajos de Teclado

```
En /search:
  Enter → Buscar
  
En /profile/[id]:
  Tab → Navegar entre elementos
  Ctrl+Enter → Publicar comentario (cuando está enfocado)
```

---

## 🆘 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "No puedo dar me gusta" | Necesitas estar logueado |
| "Emoji no permitido" | Usa uno de los 8 emojis sugeridos |
| "Comentario no se publica" | Verifica nombre y mensaje no estén vacíos |
| "No veo mis etiquetas" | Debes ser propietario del memorial |
| "Búsqueda sin resultados" | Intenta términos diferentes o sin mayúsculas |
| "Trending vacío" | Aún no hay memoriales populares. Crea uno! |

---

## 📱 Responsive Design

Todas las funcionalidades son 100% responsive:
- ✅ Desktop (laptops)
- ✅ Tablet (iPads)
- ✅ Mobile (teléfonos)

Probado en Chrome, Firefox, Safari, Edge.

---

## 🎯 Próximas Mejoras

En el roadmap:
- 🔔 Notificaciones cuando alguien interactúa
- 📧 Email digests de tendencias
- 🏆 Badges por participación
- 📌 Colecciones/Favoritos
- 👥 Seguir usuarios
- 🤖 Recomendaciones personalizadas

---

**¿Preguntas? 💬 Ver SOCIAL_FEATURES_IMPLEMENTATION.md para detalles técnicos**

**¡Disfruta las nuevas funcionalidades! 🎉**
