# 🧪 Guía de Testing - Funcionalidades de Tributos

**Versión**: 1.0  
**Fecha**: 20 de Noviembre, 2025  
**Estado**: ✅ Listo para testing

---

## 🎯 Objetivos de Testing

Verificar que los siguientes features funcionan correctamente:

1. ❤️ **Sistema de Likes** - Dar y quitar likes a tributos
2. 🚩 **Sistema de Reportes** - Reportar tributos inapropiados
3. 💬 **Sistema de Respuestas** - Responder a tributos

---

## 🚀 Setup Inicial

### 1. Iniciar el Servidor
```bash
cd cementerio-virtual-animales
npm run dev
```
El servidor se inicia en `http://localhost:3000`

### 2. Usar Credenciales de Demo
```
Email: demo@memorias-eternas.local
Password: Demo123!
```

O registrarse con un nuevo usuario si lo prefieres.

### 3. Navegar a un Memorial
1. Ve a `/map` (Mapa de Memorials)
2. Haz click en un memorial existente
3. Baja hasta la sección "Tributos Recibidos"

---

## ✅ Test Case 1: Sistema de Likes

### Objetivo
Verificar que los usuarios pueden dar likes a tributos, con contador actualizado.

### Pasos

**Paso 1: Login**
```
1. Navega a http://localhost:3000/auth/login
2. Ingresa email: demo@memorias-eternas.local
3. Ingresa password: Demo123!
4. Click en "Iniciar Sesión"
✓ Debes ver el dashboard
```

**Paso 2: Acceder a un Memorial**
```
1. Click en "Mapa" en la navbar
2. Haz click en un marker (memorial)
3. Baja hasta "Tributos Recibidos"
✓ Debes ver una lista de tributos
```

**Paso 3: Dar Like**
```
1. Ubica un tributo en la lista
2. Haz click en el botón "❤️ Me gusta (X)"
3. Observa:
   - El contador incrementa (X+1)
   - El botón cambia a color rojo
   - Se recarga la información del servidor
✓ El like debe aparecer inmediatamente
```

**Paso 4: Quitar Like (Toggle)**
```
1. Vuelve a hacer click en el botón rojo "❤️ Me gusta"
2. Observa:
   - El contador decrementa (X-1)
   - El botón vuelve a color outline
✓ El like debe removerse inmediatamente
```

**Paso 5: Verificar Persistencia**
```
1. Recarga la página (F5)
2. Navega nuevamente al memorial
3. Baja a tributos
✓ El estado de likes debe mantenerse igual
```

**Paso 6: Sin Autenticación**
```
1. Logout (Click en tu nombre → Logout)
2. Intenta dar like a un tributo
✓ Debes ver un mensaje: "Debes iniciar sesión para dar like"
```

### ✓ Criterios de Éxito

- [x] Contador incrementa al dar like
- [x] Contador decrementa al quitar like
- [x] El estado persiste después de recargar
- [x] Se requiere autenticación
- [x] No se puede dar 2 likes al mismo tributo
- [x] El estado visual cambia (color rojo cuando liked)

---

## ✅ Test Case 2: Sistema de Reportes

### Objetivo
Verificar que los usuarios pueden reportar tributos y que el admin recibe la notificación.

### Pasos

**Paso 1: Localizar un Tributo**
```
1. Navega a http://localhost:3000/map
2. Click en un memorial
3. Baja a "Tributos Recibidos"
✓ Puedes ver varios tributos
```

**Paso 2: Reportar un Tributo**
```
1. Haz click en el botón "🚩" (Reportar) en un tributo
2. Se abre un prompt pidiendo la razón
3. Selecciona una razón:
   - inappropriate
   - spam
   - offensive
   - misleading
   - other
4. Click OK
✓ Debes ver el mensaje: "✅ Reporte enviado. Gracias por ayudarnos..."
```

**Paso 3: Verificar Reportes en Admin (si eres admin)**
```
1. Navega a http://localhost:3000/admin
2. Busca la sección "Reportes de Tributos"
3. Verifica que tu reporte aparece
4. Deberías ver:
   - Tributo que fue reportado
   - Razón del reporte
   - Usuario que reportó (si estaba logueado)
   - Estado: "pending"
✓ El reporte debe estar visible para el admin
```

**Paso 4: Actualizar Estado del Reporte (como admin)**
```
1. En el admin panel, ubica tu reporte
2. Haz click en "Revisar" o similar
3. Cambia el estado a "reviewed"
4. Agrega una nota (ej: "Revisado, tributo apropiado")
5. Click en "Guardar"
✓ El estado debe cambiar a "reviewed"
```

**Paso 5: Reportar Sin Estar Logueado**
```
1. Logout
2. Ve a un memorial
3. Intenta reportar un tributo
4. Completa el proceso de reporte
✓ Debe aceptar reportes anónimos también
```

### ✓ Criterios de Éxito

- [x] Se puede reportar un tributo
- [x] Se pide la razón del reporte
- [x] El admin recibe el reporte
- [x] El estado del reporte se puede cambiar
- [x] Se acepta reportes anónimos
- [x] Aparece confirmación al usuario

---

## ✅ Test Case 3: Sistema de Respuestas

### Objetivo
Verificar que los usuarios pueden responder a tributos con un sistema de threading.

### Pasos

**Paso 1: Login**
```
1. Asegúrate de estar logueado
2. Navega a un memorial con tributos
✓ Debes ver "Tributos Recibidos"
```

**Paso 2: Abrir Sección de Respuestas**
```
1. Ubica un tributo
2. Haz click en el botón "💬 Responder (X)"
3. Se expande la sección con:
   - Lista de respuestas existentes
   - Input para escribir nueva respuesta
✓ La sección debe expandirse
```

**Paso 3: Escribir una Respuesta**
```
1. En el input que dice "Escribe una respuesta..."
2. Escribe: "Hermoso tributo, lo recordaremos siempre"
3. Presiona Enter O click en el botón Enviar (✈️)
✓ La respuesta debe aparecer inmediatamente
```

**Paso 4: Verificar la Respuesta**
```
1. Observa que tu respuesta aparece en la lista
2. Muestra:
   - Tu nombre (Avatar opcional)
   - Tu mensaje
   - Fecha/hora
✓ La respuesta debe estar visible
```

**Paso 5: Múltiples Respuestas**
```
1. Escribe otra respuesta: "Segundas condolencias"
2. Presiona Enter
✓ Ambas respuestas deben aparecer en la lista
✓ El contador de respuestas debe incrementar
```

**Paso 6: Recargar Página**
```
1. Presiona F5 para recargar
2. Navega nuevamente al memorial
3. Haz click en "💬 Responder" nuevamente
✓ Tus respuestas deben estar en la lista
✓ El contador debe mostrar el número correcto
```

**Paso 7: Sin Estar Logueado**
```
1. Logout
2. Ve a un memorial
3. Intenta responder a un tributo
✓ Debes ver: "Debes iniciar sesión para responder"
```

**Paso 8: Eliminar una Respuesta (Opcional)**
```
1. Si tu respuesta tiene un botón de delete (🗑️)
2. Haz click
3. Confirma la eliminación
✓ La respuesta debe desaparecer
```

### ✓ Criterios de Éxito

- [x] Se puede expandir/contraer replies
- [x] Se puede escribir una respuesta
- [x] La respuesta aparece inmediatamente
- [x] El contador se actualiza
- [x] Las respuestas persisten después de recargar
- [x] Se requiere autenticación
- [x] Se puede eliminar propia respuesta

---

## 🧪 Test Case 4: Integración Completa

### Objetivo
Verificar que todos los features funcionan juntos correctamente.

### Escenario: "Un día en la vida de Memorias Eternas"

```
1. LOGIN
   - Email: demo@memorias-eternas.local
   - Password: Demo123!
   
2. VER MAPA
   - Click en "/map"
   - Observa memorials en el mapa
   
3. VER TRIBUTOS
   - Click en un memorial
   - Baja a "Tributos Recibidos"
   
4. INTERACTUAR CON TRIBUTO #1
   - Da like (❤️)
   - Observa contador: 1
   
5. INTERACTUAR CON TRIBUTO #2
   - Escribe una respuesta
   - Verifica que aparece
   - Da like (❤️)
   
6. INTERACTUAR CON TRIBUTO #3
   - Reporta el tributo (razón: "inappropriate")
   - Verifica confirmación
   
7. RECARGAR PÁGINA
   - F5
   - Verifica que likes persisten
   - Verifica que replies persisten
   
8. LOGOUT Y VUELVE A LOGIN
   - Logout
   - Login nuevamente
   - Ve al mismo memorial
   - Verifica estado de likes y replies

✓ ESPERADO: Todo debe funcionar perfectamente
```

---

## 🐛 Debugging

### Problema: El contador de likes no cambia

**Solución:**
```
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Busca errores rojos
4. Si dice "401 Unauthorized":
   - Verifica que estés logueado
   - Recarga la página
5. Si dice "Error toggling like":
   - Abre la pestaña "Network"
   - Haz click en like nuevamente
   - Mira el error en la respuesta del servidor
```

### Problema: Las respuestas no aparecen

**Solución:**
```
1. Verifica que estés logueado
2. Abre la consola (F12)
3. Busca errores
4. Intenta escribir una respuesta en un tributo diferente
5. Recarga la página y revisa si aparecen
```

### Problema: El reporte no aparece en admin

**Solución:**
```
1. Verifica que tu usuario sea admin
   - Navega a http://localhost:3000/admin
   - Si ves "Access Denied", no eres admin
2. Usa credenciales de admin:
   - Email: admin@memorias-eternas.local
   - Password: Demo123!
3. Navega a /admin/tributes/reports
```

---

## 📊 Pruebas de API (Con cURL/Postman)

### Test Like API

```bash
# POST - Toggle like
curl -X POST http://localhost:3000/api/tributes/tribute123/like \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{}'

# Response esperado:
{
  "success": true,
  "data": {
    "liked": true,
    "count": 5
  }
}

# GET - Get like info
curl -X GET "http://localhost:3000/api/tributes/tribute123/like?userId=user456"

# Response esperado:
{
  "success": true,
  "data": {
    "count": 5,
    "hasLiked": true
  }
}
```

### Test Report API

```bash
# POST - Create report
curl -X POST http://localhost:3000/api/tributes/tribute123/report \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "inappropriate",
    "description": "This tribute is offensive"
  }'

# Response esperado:
{
  "success": true,
  "data": {
    "id": "report123",
    "tributeId": "tribute123",
    "reason": "inappropriate",
    "status": "pending"
  }
}

# GET - Get reports (admin only)
curl -X GET http://localhost:3000/api/tributes/tribute123/report \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"

# Response esperado:
{
  "success": true,
  "data": [
    {
      "id": "report123",
      "reason": "inappropriate",
      "status": "pending",
      "createdAt": "2025-11-20T15:30:00Z"
    }
  ]
}
```

### Test Reply API

```bash
# POST - Create reply
curl -X POST http://localhost:3000/api/tributes/tribute123/reply \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Beautiful tribute, we will remember him forever"
  }'

# Response esperado:
{
  "success": true,
  "data": {
    "id": "reply123",
    "tributeId": "tribute123",
    "authorId": "user456",
    "message": "Beautiful tribute...",
    "createdAt": "2025-11-20T15:30:00Z"
  }
}

# GET - Get replies
curl -X GET "http://localhost:3000/api/tributes/tribute123/reply?limit=10"

# Response esperado:
{
  "success": true,
  "data": [
    {
      "id": "reply123",
      "message": "Beautiful tribute...",
      "author": {
        "id": "user456",
        "name": "John Doe"
      },
      "createdAt": "2025-11-20T15:30:00Z"
    }
  ]
}

# DELETE - Delete reply
curl -X DELETE http://localhost:3000/api/tributes/tribute123/reply \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "replyId": "reply123"
  }'

# Response esperado:
{
  "success": true,
  "data": { "deleted": true }
}
```

---

## ✅ Checklist de Testing

### Manual Testing
- [ ] Test Case 1: Sistema de Likes (6 pasos)
- [ ] Test Case 2: Sistema de Reportes (5 pasos)
- [ ] Test Case 3: Sistema de Respuestas (8 pasos)
- [ ] Test Case 4: Integración Completa (8 pasos)
- [ ] Debugging: Resolver problemas si es necesario

### API Testing
- [ ] POST /api/tributes/[id]/like
- [ ] GET /api/tributes/[id]/like
- [ ] POST /api/tributes/[id]/report
- [ ] GET /api/tributes/[id]/report (admin)
- [ ] POST /api/tributes/[id]/reply
- [ ] GET /api/tributes/[id]/reply
- [ ] DELETE /api/tributes/[id]/reply

### Validación de Edge Cases
- [ ] Login requerido para likes
- [ ] Login requerido para replies
- [ ] Reportes anónimos funcionan
- [ ] No se puede dar like dos veces (constraint único)
- [ ] No se puede responder vacío
- [ ] Recargas persistentes
- [ ] Múltiples usuarios interactuando

---

## 📝 Reporte de Testing

Cuando completes las pruebas, genera un reporte:

```
REPORTE DE TESTING - Funcionalidades de Tributos
=================================================

Fecha: 2025-11-20
Tester: [Tu nombre]
Build: npm run build ✅

RESULTADOS:
-----------
✅ Test Case 1: Sistema de Likes - PASSED
✅ Test Case 2: Sistema de Reportes - PASSED
✅ Test Case 3: Sistema de Respuestas - PASSED
✅ Test Case 4: Integración Completa - PASSED
✅ API Tests - PASSED (7/7 endpoints)

ISSUES ENCONTRADOS:
-------------------
[Describe cualquier problema]

CRITERIOS DE ACEPTACIÓN:
------------------------
[x] Todos los endpoints responden 200 OK
[x] Los datos persisten después de recargar
[x] La autenticación funciona correctamente
[x] Los permisos están correctamente implementados
[x] La UI es intuitiva y responsive

CONCLUSIÓN:
-----------
✅ LISTO PARA PRODUCCIÓN
```

---

## 📞 Contacto

Si encuentras problemas o tienes preguntas:

1. Verifica que el servidor esté corriendo (`npm run dev`)
2. Verifica que estés logueado
3. Revisa la consola del navegador (F12)
4. Revisa los logs del servidor
5. Consulta la documentación en `TRIBUTE_FEATURES_COMPLETE.md`

---

**¡Gracias por testear Memorias Eternas! 🕊️**
