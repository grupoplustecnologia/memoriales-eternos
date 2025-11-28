# 🧪 MANUAL BROWSER TESTING GUIDE - Social Features

## 🎯 Objetivo
Verificar manualmente que todas las features sociales funcionan correctamente en el navegador.

---

## 🚀 PREPARACIÓN

### 1. Iniciar servidor
```bash
npm run dev
```
Espera hasta ver: `✓ Ready in XXXms`

### 2. Abrir navegador
```
http://localhost:3000
```

### 3. Login con usuario demo
**Email**: `demo@memorias-eternas.local`  
**Contraseña**: `Demo123!`

---

## 📋 TEST CASOS

### TEST 1: Página de Trending
**Ubicación**: http://localhost:3000/trending

#### Pasos:
1. Navega a /trending
2. Verifica que cargue sin errores
3. Haz click en cada tab:
   - ⭐ **Popular** - Ver memorials ordenados por viewCount
   - 📅 **Recent** - Ver memorials más recientes
   - ❤️ **Most Liked** - Ver memorials con más likes
   - 💬 **Most Commented** - Ver memorials con más comentarios

#### Expected Results:
- [x] Página carga correctamente
- [x] 4 tabs funcionales
- [x] Cada tab muestra resultados diferentes
- [x] Cada memorial muestra: foto, nombre, tipo animal, stats

#### Resultado: ✅ / ❌

---

### TEST 2: Página de Búsqueda
**Ubicación**: http://localhost:3000/search

#### Pasos:
1. Navega a /search
2. Ingresa una búsqueda: "perro", "gato", "memorial"
3. Selecciona un tipo de animal en el dropdown
4. Presiona Enter o click en botón Buscar
5. Verifica resultados

#### Expected Results:
- [x] Campo de búsqueda funcional
- [x] Dropdown de tipo animal funcional
- [x] Resultados se muestran en grid
- [x] Puedes hacer click en cada resultado
- [x] Los resultados coinciden con búsqueda

#### Resultado: ✅ / ❌

---

### TEST 3: Like en Memorial
**Ubicación**: http://localhost:3000/profile/[id]

#### Pasos:
1. Navega a una página de memorial (/profile/[id])
2. Busca el botón de corazón (❤️) en la sección "Interacciones"
3. Haz click en el corazón
4. Verifica que:
   - El corazón cambie de color (vacío → lleno)
   - El contador aumente en 1
5. Haz click de nuevo para quitar like
6. Verifica que el contador disminuya

#### Expected Results:
- [x] Corazón cambia de estado al hacer click
- [x] Contador aumenta/disminuye correctamente
- [x] El cambio persiste al refrescar la página
- [x] Requiere estar logueado

#### Resultado: ✅ / ❌

---

### TEST 4: Reacciones de Emoji
**Ubicación**: http://localhost:3000/profile/[id]

#### Pasos:
1. En la sección "Interacciones" de memorial, busca "Reacciones"
2. Haz click en "Agregar reacción" o directamente en los emojis
3. Verifica el grid de emojis disponibles (8 emojis)
4. Selecciona un emoji (ej: ❤️, 😢, 🙏, 😊, 🌹, ⭐, 🕊️, 💐)
5. Verifica que aparezca en la sección de reacciones con contador
6. Selecciona el mismo emoji nuevamente para quitar reacción
7. Prueba con diferentes emojis

#### Expected Results:
- [x] Grid de emojis aparece
- [x] 8 emojis disponibles
- [x] Puedes seleccionar múltiples emojis
- [x] Contador aumenta para cada emoji
- [x] Tu reacción está destacada/resaltada
- [x] Otras personas ven tus reacciones

#### Resultado: ✅ / ❌

---

### TEST 5: Comentarios
**Ubicación**: http://localhost:3000/profile/[id]

#### Pasos:
1. Desplázate hasta la sección "Condolencias y Mensajes"
2. Verifica que haya:
   - Campo de texto para escribir
   - Campo de nombre (si no estás logueado) o autorrelleno (si estás logueado)
   - Botón para enviar

3. Escribe un comentario de prueba:
   - Sin estar logueado: requiere nombre y mensaje
   - Logueado: solo requiere mensaje

4. Haz click en "Enviar" o presiona Enter

5. Verifica que el comentario aparezca en la lista con:
   - Tu nombre
   - Timestamp
   - Tu mensaje

6. Haz click en el botón de eliminar (🗑️) en tu comentario

7. Verifica que el comentario se elimine

#### Expected Results:
- [x] Campo de comentario funcional
- [x] Puedes escribir como usuario logueado
- [x] Comentario aparece inmediatamente
- [x] Timestamp se muestra correctamente
- [x] Puedes eliminar tus comentarios
- [x] No puedes eliminar comentarios de otros

#### Resultado: ✅ / ❌

---

### TEST 6: Botón Compartir
**Ubicación**: http://localhost:3000/profile/[id]

#### Pasos:
1. En la sección "Interacciones", busca el botón de compartir (🔗 o Compartir)
2. Haz click para abrir el menú
3. Verifica que haya opciones para:
   - 📋 **Copiar link** - Click y verifica "Copied!" mensaje
   - 💬 **WhatsApp** - Click y verifica que abre WhatsApp con link
   - 👍 **Facebook** - Click y verifica que abre Facebook
   - 𝕏 **Twitter** - Click y verifica que abre Twitter
   - ✉️ **Email** - Click y verifica que abre cliente de email

4. Prueba al menos 2 opciones

#### Expected Results:
- [x] Menú de compartir aparece
- [x] 5 opciones disponibles
- [x] Copiar link muestra confirmación
- [x] Links de redes sociales funcionan
- [x] Link compartido incluye ID del memorial

#### Resultado: ✅ / ❌

---

### TEST 7: Etiquetas (Tags)
**Ubicación**: http://localhost:3000/profile/[id]

#### Pasos (Solo si eres propietario del memorial):
1. En la sección "Etiquetas", verifica tags existentes como badges azules
2. Busca el botón para agregar etiqueta
3. Haz click e ingresa una etiqueta:
   - Usa una predefinida (Perro, Gato, Heroico, etc.)
   - O crea una nueva
4. Verifica que aparezca en la lista
5. Haz click en la X de una etiqueta para removerla
6. Verifica que desaparezca

#### Expected Results:
- [x] Tags mostrados como badges
- [x] Puedes agregar nuevos tags (si es tu memorial)
- [x] Búsqueda de tags funciona
- [x] Puedes remover tags
- [x] Los cambios persisten

#### Resultado: ✅ / ❌

---

### TEST 8: View Counter
**Ubicación**: http://localhost:3000/profile/[id]

#### Pasos:
1. Abre un memorial cualquiera
2. Observa el contador de vistas en la metadata (abajo/arriba de la foto)
3. Recuerda el número (ej: "345 vistas")
4. Recarga la página (F5 o Ctrl+R)
5. Verifica que el contador haya aumentado en 1
6. Recarga varias veces más
7. Verifica que continúe incrementando

#### Expected Results:
- [x] Contador visible en la página
- [x] Aumenta en 1 cada vez que visitas
- [x] Se incrementa desde diferentes navegadores/sesiones
- [x] Persiste en la base de datos

#### Resultado: ✅ / ❌

---

### TEST 9: Navbar Navigation
**Ubicación**: http://localhost:3000 (cualquier página)

#### Pasos:
1. Busca en el navbar los nuevos links:
   - 🔍 "Buscar" - debe ir a /search
   - ⭐ "Destacados" - debe ir a /trending
2. Haz click en cada uno
3. Verifica que navegue correctamente
4. Verifica que sean accesibles desde cualquier página

#### Expected Results:
- [x] Links "Buscar" y "Destacados" están en navbar
- [x] Son clickeables
- [x] Navegan a las páginas correctas
- [x] Visible en desktop (verificar responsive en mobile)

#### Resultado: ✅ / ❌

---

## 🔒 TEST 10: Seguridad y Permisos

### Pasos:
1. **Sin estar logueado**:
   - [x] Puedo ver todos los likes, comentarios, reacciones
   - [x] No puedo agregar likes (debe mostrar "Inicia sesión")
   - [x] No puedo agregar reacciones
   - [x] Puedo agregar comentarios como anónimo (nombre requerido)
   - [x] No puedo eliminar comentarios

2. **Como propietario del memorial**:
   - [x] Puedo agregar/quitar tags en mi memorial
   - [x] Puedo ver todos los comentarios en mi memorial
   - [x] Puedo eliminar comentarios en mi memorial

3. **Como no propietario**:
   - [x] No puedo editar datos del memorial
   - [x] No puedo agregar/quitar tags en memorial ajeno
   - [x] Solo puedo eliminar mis propios comentarios

#### Resultado: ✅ / ❌

---

## 📊 TEST 11: Responsividad y Performance

### Desktop
- [ ] Todas las features funcionan en pantalla completa
- [ ] Layout se ve correcto
- [ ] Botones son fáciles de clickear
- [ ] Texto es legible

### Mobile
- [ ] Página se adapta correctamente (responsive)
- [ ] Botones son accesibles
- [ ] Grid de reacciones funciona bien
- [ ] Menu de compartir funciona
- [ ] Búsqueda funciona

### Performance
- [ ] Páginas cargan en menos de 3 segundos
- [ ] No hay lag al scrollear
- [ ] Interacciones son rápidas
- [ ] Imagenes cargan correctamente

#### Resultado: ✅ / ❌

---

## ✅ RESUMEN DE RESULTADOS

| Test | Resultado | Notas |
|------|-----------|-------|
| Trending Page | ✅ / ❌ | |
| Search Page | ✅ / ❌ | |
| Likes | ✅ / ❌ | |
| Reactions | ✅ / ❌ | |
| Comments | ✅ / ❌ | |
| Share | ✅ / ❌ | |
| Tags | ✅ / ❌ | |
| View Counter | ✅ / ❌ | |
| Navigation | ✅ / ❌ | |
| Security | ✅ / ❌ | |
| Responsividad | ✅ / ❌ | |

---

## 🐛 PROBLEMAS ENCONTRADOS

### Problema 1
- **Descripción**: 
- **Pasos para reproducir**:
- **Resultado esperado**:
- **Resultado actual**:
- **Solución**:

### Problema 2
- **Descripción**: 
- **Pasos para reproducir**:
- **Resultado esperado**:
- **Resultado actual**:
- **Solución**:

---

## 📝 NOTAS ADICIONALES

```
[Espacio para notas adicionales]
```

---

## 🎯 CONCLUSIÓN

**Fecha de Testing**: _______________  
**Tester**: _______________  
**Resultado Final**: ✅ PASS / ❌ FAIL  
**Observaciones**: 

```
[Observaciones finales]
```

---

*Guía de testing manual generada el November 20, 2025*
