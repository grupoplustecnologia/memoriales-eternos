# 🧪 GUÍA COMPLETA - PRUEBA DE ENDPOINTS

## 📋 MÉTODOS PARA PROBAR ENDPOINTS

Hay varias herramientas para probar endpoints. Aquí están las mejores:

---

## 1️⃣ POSTMAN (Recomendado - Interfaz Gráfica)

### Instalación

```
1. Descarga desde: https://www.postman.com/downloads/
2. Instala la aplicación
3. Crea una cuenta (opcional pero recomendado)
```

### Ventajas

✅ Interfaz visual intuitiva  
✅ Guarda requests para reutilizar  
✅ Colecciones organizadas  
✅ Variables globales  
✅ Autenticación automática  
✅ Historial de requests  

### Uso Básico

```
1. Abre Postman
2. Click "+ New" → Request
3. Selecciona método (GET, POST, PUT, DELETE)
4. Pega URL: http://localhost:3000/api/...
5. Headers (si aplica):
   - Content-Type: application/json
   - Authorization: Bearer [token]
6. Body (para POST/PUT):
   - Selecciona "raw" → JSON
   - Pega JSON
7. Click "Send"
8. Ver respuesta en "Response"
```

---

## 2️⃣ CURL (Terminal - Línea de Comando)

### Ventajas

✅ Sin necesidad de instalar nada extra  
✅ Rápido para pruebas simples  
✅ Fácil de automatizar  
✅ Perfecto para scripts  

### Sintaxis Básica

```bash
# GET simple
curl http://localhost:3000/api/profiles

# GET con headers
curl -H "Authorization: Bearer TOKEN_AQUI" http://localhost:3000/api/admin/users

# POST con JSON
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# PUT con JSON
curl -X PUT http://localhost:3000/api/admin/profiles/update-photo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"profileId":"123","photoUrl":"/uploads/photos/xxx.png"}'

# DELETE
curl -X DELETE http://localhost:3000/api/resource/id
```

---

## 3️⃣ INSOMNIA (Alternativa a Postman)

### Instalación

```
Descarga desde: https://insomnia.rest/download
```

### Ventajas

✅ Más ligero que Postman  
✅ Interfaz clara  
✅ Soporte para GraphQL  
✅ Variables de entorno  

---

## 4️⃣ Thunder Client (VS Code Extension)

### Instalación

```
1. Abre VS Code
2. Extensions (Ctrl+Shift+X)
3. Busca: "Thunder Client"
4. Instala
```

### Ventajas

✅ Integrado en VS Code  
✅ Sin abrir otra aplicación  
✅ Muy ligero  
✅ Gratuito  

---

## 📡 ENDPOINTS A PROBAR (Con ejemplos CURL)

### PÚBLICOS - Memoriales

#### 1. GET Todos los memoriales públicos

```bash
curl http://localhost:3000/api/profiles?public=true
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cmih97...",
      "name": "Luna",
      "slug": "luna-gato",
      "animalType": "gato",
      "photoUrl": "/uploads/photos/...",
      "isPublic": true
    }
  ]
}
```

---

#### 2. GET Memorial por ID

```bash
curl http://localhost:3000/api/profiles/cmih97shu0002myrwlxgxtoa8
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "cmih97shu0002myrwlxgxtoa8",
    "name": "Luna",
    "slug": "luna-gato",
    "breed": "Siamés",
    "story": "Historia completa...",
    "epitaph": "En nuestros corazones para siempre",
    "createdAt": "2025-11-27T..."
  }
}
```

---

#### 3. GET Memorial por SLUG (SEO-Friendly) ⭐

```bash
curl http://localhost:3000/api/memorials/luna-gato
```

**Respuesta esperada:** (Misma estructura que GET por ID)

---

#### 4. POST Incrementar vistas

```bash
curl -X POST http://localhost:3000/api/profiles/cmih97shu0002myrwlxgxtoa8/view \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "View count incremented"
}
```

---

### TRIBUTOS

#### 5. GET Tributos de un memorial

```bash
curl "http://localhost:3000/api/tributes?profileId=cmih97shu0002myrwlxgxtoa8&limit=10"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "tribute1",
      "tributeType": "vela-blanca",
      "visitorName": "María",
      "message": "Qué bonito memorial",
      "createdAt": "2025-11-27T..."
    }
  ]
}
```

---

#### 6. POST Crear tributo

```bash
curl -X POST http://localhost:3000/api/tributes \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "cmih97shu0002myrwlxgxtoa8",
    "visitorName": "Juan",
    "message": "Hermoso memorial para Luna",
    "tributeType": "flor"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "tribute_nuevo",
    "profileId": "cmih97shu0002myrwlxgxtoa8",
    "tributeType": "flor",
    "createdAt": "2025-11-27T..."
  }
}
```

---

### SOCIAL - Likes

#### 7. GET Estado de like

```bash
curl "http://localhost:3000/api/likes?profileId=cmih97shu0002myrwlxgxtoa8&userId=user123"
```

**Respuesta esperada:**
```json
{
  "liked": false,
  "count": 12
}
```

---

#### 8. POST Dar like

```bash
curl -X POST http://localhost:3000/api/likes \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "cmih97shu0002myrwlxgxtoa8",
    "userId": "user123"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Like added"
}
```

---

### REACCIONES

#### 9. GET Reacciones emoji

```bash
curl "http://localhost:3000/api/reactions?profileId=cmih97shu0002myrwlxgxtoa8&userId=user123"
```

**Respuesta esperada:**
```json
{
  "reactions": {
    "❤️": 5,
    "😢": 2,
    "😍": 8
  }
}
```

---

#### 10. POST Agregar reacción

```bash
curl -X POST http://localhost:3000/api/reactions \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "cmih97shu0002myrwlxgxtoa8",
    "userId": "user123",
    "emoji": "❤️"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true
}
```

---

### COMENTARIOS

#### 11. GET Comentarios

```bash
curl http://localhost:3000/api/comments?profileId=cmih97shu0002myrwlxgxtoa8
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "comment1",
      "visitorName": "Ana",
      "message": "Luna era hermosa",
      "createdAt": "2025-11-27T..."
    }
  ]
}
```

---

#### 12. POST Crear comentario

```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "cmih97shu0002myrwlxgxtoa8",
    "visitorName": "Carlos",
    "message": "Qué hermosa historia"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "comment_nuevo",
    "profileId": "cmih97shu0002myrwlxgxtoa8",
    "message": "Qué hermosa historia"
  }
}
```

---

### TRENDING

#### 13. GET Memoriales Trending

```bash
curl "http://localhost:3000/api/trending?type=popular&limit=10"
```

**Parámetros type:** `popular`, `recent`, `mostViewed`

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "memorial1",
      "name": "Max",
      "viewCount": 450,
      "likeCount": 28
    }
  ]
}
```

---

### AUTENTICACIÓN

#### 14. POST Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@forever-pet-friend.local",
    "password": "Demo123!"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "email": "admin@forever-pet-friend.local",
    "name": "Admin",
    "role": "admin"
  }
}
```

**⚠️ Guarda el token para usar en endpoints de admin**

---

#### 15. POST Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario_nuevo@example.com",
    "name": "Nuevo Usuario",
    "password": "Password123!"
  }'
```

**Respuesta esperada:** (Similar a login)

---

#### 16. POST Logout

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer TOKEN_AQUI"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Logged out"
}
```

---

### ADMIN - Requiere autenticación

#### 17. GET Dashboard Admin

```bash
curl -H "Authorization: Bearer TOKEN_AQUI" \
  http://localhost:3000/api/admin/dashboard
```

**Respuesta esperada:**
```json
{
  "stats": {
    "users": 1,
    "memorials": 10,
    "tributes": 25
  }
}
```

---

#### 18. GET Usuarios (Admin only)

```bash
curl -H "Authorization: Bearer TOKEN_AQUI" \
  http://localhost:3000/api/admin/users
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user1",
      "email": "admin@forever-pet-friend.local",
      "name": "Admin",
      "role": "admin",
      "subscriptionTier": "santuario-premium"
    }
  ]
}
```

---

#### 19. GET Memoriales (Admin only)

```bash
curl -H "Authorization: Bearer TOKEN_AQUI" \
  http://localhost:3000/api/admin/profiles
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "memorial1",
      "name": "Luna",
      "owner": "Admin",
      "animalType": "gato",
      "viewCount": 42
    }
  ]
}
```

---

#### 20. POST Upload de Foto (Admin only)

```bash
# Necesita FormData, mejor con Postman
# O con curl:

curl -X POST http://localhost:3000/api/admin/upload \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -F "file=@/ruta/a/foto.jpg"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "photoUrl": "/uploads/photos/photo_1764236311403_a7bc31a36e8dbe9d.jpg"
}
```

---

#### 21. PUT Actualizar foto de memorial (Admin only)

```bash
curl -X PUT http://localhost:3000/api/admin/profiles/update-photo \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "cmih97shu0002myrwlxgxtoa8",
    "photoUrl": "/uploads/photos/photo_nuevo.jpg"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Photo updated"
}
```

---

#### 22. GET Logs de Admin (Admin only)

```bash
curl -H "Authorization: Bearer TOKEN_AQUI" \
  http://localhost:3000/api/admin/logs
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "log1",
      "action": "UPDATE_PHOTO",
      "entity": "memorial",
      "timestamp": "2025-11-27T..."
    }
  ]
}
```

---

## 🎯 CHECKLIST DE PRUEBAS

### Antes de Empezar

```
☐ Servidor corriendo: npm run dev
☐ Base de datos conectada
☐ Variables de entorno configuradas (.env.local)
☐ 10 memoriales en la BD
```

### Pruebas Públicas (Sin autenticación)

```
☐ GET /api/profiles?public=true - Lista memoriales
☐ GET /api/profiles/[id] - Memorial por ID
☐ GET /api/memorials/[slug] - Memorial por slug (SEO)
☐ POST /api/profiles/[id]/view - Incrementar vistas
☐ GET /api/tributes?profileId=... - Ver tributos
☐ POST /api/tributes - Crear tributo
☐ GET /api/likes?profileId=... - Ver likes
☐ POST /api/likes - Dar like
☐ GET /api/reactions?profileId=... - Ver reacciones
☐ POST /api/reactions - Agregar reacción
☐ GET /api/comments?profileId=... - Ver comentarios
☐ POST /api/comments - Crear comentario
☐ GET /api/trending?type=popular - Trending
```

### Pruebas de Autenticación

```
☐ POST /api/auth/login - Login admin
☐ POST /api/auth/register - Registro nuevo usuario
☐ POST /api/auth/logout - Logout (con token)
```

### Pruebas de Admin (Con token)

```
☐ GET /api/admin/dashboard - Stats
☐ GET /api/admin/users - Lista usuarios
☐ GET /api/admin/profiles - Lista memoriales (admin)
☐ POST /api/admin/upload - Upload foto
☐ PUT /api/admin/profiles/update-photo - Cambiar foto
☐ GET /api/admin/logs - Ver logs
```

---

## 🔑 CÓMO OBTENER EL TOKEN

### Paso 1: Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@forever-pet-friend.local",
    "password": "Demo123!"
  }'
```

### Paso 2: Copiar token de la respuesta

```json
{
  "success": true,
  "token": "ESTE_ES_TU_TOKEN_AQUI",
  "user": {...}
}
```

### Paso 3: Usar token en headers

```bash
curl -H "Authorization: Bearer ESTE_ES_TU_TOKEN_AQUI" \
  http://localhost:3000/api/admin/dashboard
```

---

## ⚠️ ERRORES COMUNES Y SOLUCIONES

### Error: "Cannot GET /api/..."

**Problema:** Endpoint no existe  
**Solución:** Verifica la URL y spelling exacto

---

### Error: "Unauthorized" (401)

**Problema:** Token faltante o inválido  
**Solución:** 
```bash
1. Haz login para obtener token
2. Copia token de la respuesta
3. Incluye en header: Authorization: Bearer TOKEN
```

---

### Error: "Forbidden" (403)

**Problema:** Usuario no tiene permisos  
**Solución:** 
```
- Endpoints /api/admin/* requieren role: "admin"
- Usuario debe ser admin@forever-pet-friend.local
```

---

### Error: "Not Found" (404)

**Problema:** Recurso no existe  
**Solución:**
```
- Verifica que el ID/slug existe
- Comprueba en base de datos con prisma studio
```

---

### Error: "Bad Request" (400)

**Problema:** JSON mal formado  
**Solución:**
```
- Verifica JSON válido: jsonlint.com
- Headers correcto: "Content-Type: application/json"
- Campos requeridos completos
```

---

## 🧪 SCRIPT BASH PARA PROBAR TODO

Crea archivo `test-endpoints.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"
TOKEN=""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🧪 Iniciando pruebas de endpoints...${NC}\n"

# 1. Login
echo -e "${YELLOW}1️⃣  Testing login...${NC}"
LOGIN=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@forever-pet-friend.local","password":"Demo123!"}')

TOKEN=$(echo $LOGIN | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$TOKEN" ]; then
  echo -e "${GREEN}✓ Login exitoso${NC}"
  echo "Token: $TOKEN"
else
  echo -e "${RED}✗ Login falló${NC}"
  exit 1
fi

echo ""

# 2. GET Memoriales
echo -e "${YELLOW}2️⃣  Testing GET memoriales...${NC}"
PROFILES=$(curl -s "$BASE_URL/api/profiles?public=true")
echo -e "${GREEN}✓ Response:${NC} $(echo $PROFILES | cut -c1-100)..."

echo ""

# 3. GET Trending
echo -e "${YELLOW}3️⃣  Testing GET trending...${NC}"
TRENDING=$(curl -s "$BASE_URL/api/trending?type=popular&limit=5")
echo -e "${GREEN}✓ Response:${NC} $(echo $TRENDING | cut -c1-100)..."

echo ""

# 4. GET Admin Dashboard
echo -e "${YELLOW}4️⃣  Testing GET admin dashboard...${NC}"
ADMIN=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/api/admin/dashboard")
echo -e "${GREEN}✓ Response:${NC} $(echo $ADMIN | cut -c1-100)..."

echo ""

echo -e "${GREEN}✓ Todas las pruebas completadas!${NC}"
```

### Ejecutar script

```bash
chmod +x test-endpoints.sh
./test-endpoints.sh
```

---

## 📊 TABLA DE REFERENCIA RÁPIDA

| Endpoint | Método | Auth | Descripción |
|----------|--------|------|-------------|
| /api/profiles | GET | ❌ | Listar memoriales públicos |
| /api/profiles/[id] | GET | ❌ | Memorial por ID |
| /api/memorials/[slug] | GET | ❌ | Memorial por slug |
| /api/auth/login | POST | ❌ | Login usuario |
| /api/auth/register | POST | ❌ | Registrar usuario |
| /api/admin/dashboard | GET | ✅ | Stats admin |
| /api/admin/upload | POST | ✅ | Upload foto |
| /api/tributes | GET/POST | ❌ | Tributos |
| /api/likes | GET/POST | ❌ | Likes |
| /api/reactions | GET/POST | ❌ | Reacciones |
| /api/comments | GET/POST | ❌ | Comentarios |

---

**Documento creado:** 27 de Noviembre de 2025  
**Versión:** 1.0  
**Estado:** ✅ Completo
