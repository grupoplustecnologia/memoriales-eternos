# 🎉 ¡Usuarios Demo Listos!

## 📋 Resumen de lo Creado

### 3️⃣ Usuarios Demo Pre-configurados

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  👤 HUELLA ETERNA (Gratuito)                               │
│  📧 huella@memorias-eternas.local                          │
│  🔑 Demo123!                                               │
│  ⭐ 4 estrellas                                            │
│  📍 3 memoriales (Lucas, Miau, Birdy)                      │
│  🎖️ 3 tributos recibidos                                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ⭐ CIELO DE ESTRELLAS (Premium)                           │
│  📧 cielo@memorias-eternas.local                           │
│  🔑 Demo123!                                               │
│  ⭐ 10 estrellas                                           │
│  📍 3 memoriales (Rey, Princesa, Loro)                     │
│  🎖️ 4 tributos recibidos                                  │
│  📅 2 misiones completadas                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  👑 SANTUARIO PREMIUM (Premium+)                           │
│  📧 santuario@memorias-eternas.local                       │
│  🔑 Demo123!                                               │
│  ⭐ 30 estrellas                                           │
│  📍 3 memoriales (Simba, Whiskers, Kiwi)                   │
│  🎖️ 6 tributos recibidos                                  │
│  📅 5 misiones completadas                                 │
│  📊 Dashboard de estadísticas activo                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗺️ Memoriales Distribuidos

**Total: 9 memoriales en el mapa mundial**

### Huella Eterna (Madrid, España)
- 🐕 **Lucas** - Labrador Retriever
- 🐱 **Miau** - Gato Doméstico
- 🐦 **Birdy** - Canario

### Cielo de Estrellas (Londres, Reino Unido)
- 🐕 **Rey** - Pastor Alemán
- 🐱 **Princesa** - Gato Persa Blanco
- 🦜 **Loro** - Loro Africano Gris

### Santuario Premium (San Francisco, USA)
- 🐕 **Simba** - Husky Siberiano
- 🐱 **Whiskers** - Gato Maine Coon
- 🦜 **Kiwi** - Loro Guacamayo

---

## 🎮 Qué Puedes Hacer Ahora

### Paso 1: Iniciar Sesión
```
1. Ve a /auth/login
2. Usa cualquiera de los 3 emails demo
3. Contraseña: Demo123!
4. ¡Listo!
```

### Paso 2: Explorar el Mapa
```
1. Ve a /map
2. Verás 9 pines de colores
3. Haz clic para ver detalles
4. Los colores corresponden al tipo de animal
```

### Paso 3: Ver Perfiles
```
1. Haz clic en cualquier pin
2. Lee la historia del memorial
3. Ve fotos en la galería
4. Mira tributos recibidos
```

### Paso 4: Dejar Tributos
```
1. Desde un perfil abierto
2. Elige flor 🌹 o vela 🕯️
3. Gasta estrellas
4. ¡El dueño recibe tu tributo!
```

### Paso 5: Ver Planes
```
1. Ve a /plans
2. Compara los 3 planes
3. Toggle entre pago único/suscripción
4. Ve tabla comparativa
```

### Paso 6: Probar Tienda
```
1. Ve a /user/subscription
2. Baja a "Tienda de Estrellas"
3. Mira los 3 paquetes
4. Entiende los descuentos (17%, 34%)
```

### Paso 7: Ver Misiones
```
1. Ve a /user/subscription
2. Mira "Misiones Emocionales"
3. Santuario Premium tiene 5/6 completadas
4. Intenta completar la última
```

### Paso 8: Cambiar de Usuario
```
1. Logout (botón en navbar)
2. Inicia sesión con otro email
3. Ve las diferencias entre planes
4. Repite pasos 1-7
```

---

## 💾 Datos Guardados

```
✅ Sistema de Autenticación
   └─ 3 usuarios en memoria + localStorage

✅ Memoriales
   └─ 9 perfiles en mockData.ts
   └─ 3 fotos por perfil (de Unsplash)

✅ Tributos
   └─ 13 tributos de ejemplo
   └─ Interacciones cruzadas entre usuarios

✅ Estrellas
   └─ Huella: 4⭐
   └─ Cielo: 10⭐
   └─ Santuario: 30⭐

✅ Misiones
   └─ Huella: 0/6 completadas
   └─ Cielo: 2/6 completadas
   └─ Santuario: 5/6 completadas
```

---

## 🔧 Archivos Modificados

```
src/lib/auth.ts
├─ Tipo User actualizado con nuevos campos
├─ 3 usuarios demo pre-cargados
└─ getDemoCredentials() actualizado

src/data/mockData.ts
├─ 9 memoriales para usuarios demo
├─ 13 tributos de ejemplo
└─ Interacciones cruzadas

USUARIOS_DEMO.md (NUEVO)
└─ Guía completa de prueba

VERIFICACION_USUARIOS_DEMO.md (NUEVO)
└─ Checklist y script de validación
```

---

## 🚀 Para Empezar

### Opción 1: Desarrollo Local
```bash
# Terminal 1: Inicia el servidor
npm run dev        # o: bun run dev

# Terminal 2: Abre el navegador
http://localhost:3000/auth/login
```

### Opción 2: Vercel/Deploy
```bash
# Los usuarios demo se cargan automáticamente
# en servidor (node.js) cuando inicia la app
```

---

## ✨ Lo Especial de Estos Datos Demo

1. **Plan Específico por Usuario**
   - Huella: Sin acceso a momentos especiales
   - Cielo: 3 momentos desbloqueados
   - Santuario: 6 momentos + Dashboard

2. **Historias Reales**
   - Cada memorial tiene una historia emocional
   - Fotos de Unsplash de alta calidad
   - Epithafios personalizados

3. **Interacciones Cruzadas**
   - Los usuarios visitan perfiles de otros
   - Dejan tributos realistas
   - Sistemas de estrellas funcionan

4. **Misiones Completadas**
   - Progreso diferente por usuario
   - Santuario Premium casi completo (5/6)
   - Huella sin misiones (plan gratuito)

5. **Estadísticas Ficticias**
   - Santuario Premium: 242 visitas, 87 tributos
   - Datos realistas para el dashboard
   - Gráficos populados

---

## 📊 Tabla Rápida

| Aspecto | Huella | Cielo | Santuario |
|---------|--------|-------|-----------|
| **Plan** | Gratuito | Premium | Premium+ |
| **Email** | huella@ | cielo@ | santuario@ |
| **Estrellas** | 4⭐ | 10⭐ | 30⭐ |
| **Memoriales** | 3 | 3 | 3 |
| **Momentos** | 0/6 | 3/6 | 6/6 |
| **Misiones** | 0/6 | 2/6 | 5/6 |
| **Tributos Recibidos** | 3 | 4 | 6 |
| **Dashboard** | ❌ | ❌ | ✅ |

---

## 🎯 Prueba Recomendada (5-10 min)

1. **Inicia sesión con Huella** (2 min)
   - Ve /map, mira los pines
   - Haz clic en un memorial

2. **Cambia a Cielo** (2 min)
   - Ve /user/subscription
   - Mira misiones (2/6)

3. **Cambia a Santuario** (3 min)
   - Ve dashboard
   - Ve todos los momentos
   - Ve todas las misiones

4. **Prueba interacción** (3 min)
   - Inicia como Huella
   - Ve a /map
   - Busca memorial de Santuario (Simba)
   - Deja un tributo
   - Verifica que se restan estrellas

---

## 🎊 ¡Ya Está Todo Listo!

Todos los datos están pre-cargados. Solo necesitas:

1. Iniciar la app (`npm run dev`)
2. Ir a `/auth/login`
3. Usar cualquiera de los 3 emails demo
4. Contraseña: `Demo123!`
5. ¡Explorar!

**Los 3 usuarios y sus 9 memoriales están listos para prueba.** ✅

---

Documentación: Ver `USUARIOS_DEMO.md` para flujos completos.
