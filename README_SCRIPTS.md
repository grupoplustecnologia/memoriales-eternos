# 🎉 SCRIPTS DE PRUEBA - READY TO USE

He creado **3 archivos completos** para probar todos los endpoints de tu aplicación.

---

## 📁 ARCHIVOS CREADOS

### 1. **test-all-endpoints.ps1** (PowerShell)
- Ubicación: `cementerio-virtual-animales/test-all-endpoints.ps1`
- Lenguaje: PowerShell Script
- Funciones:
  - Login admin
  - GET memoriales públicos
  - Crear tributos
  - Dar likes
  - Agregar reacciones
  - Crear comentarios
  - GET trending
  - Endpoints admin

### 2. **test-endpoints-curl.bat** (Batch con CURL)
- Ubicación: `cementerio-virtual-animales/test-endpoints-curl.bat`
- Lenguaje: Batch (CMD)
- Ventaja: Funciona en cualquier Windows sin PowerShell
- Pruebas: Login, Memoriales, Trending

### 3. **test-endpoints.bat** (Batch General)
- Ubicación: `cementerio-virtual-animales/test-endpoints.bat`
- Ejecuta el script PowerShell automáticamente

### 4. **GUIA_PRUEBA_ENDPOINTS.md**
- Documentación completa de todos los endpoints
- Ejemplos CURL para cada uno
- Tabla de referencia rápida

### 5. **COMO_USAR_SCRIPTS.md**
- Instrucciones paso a paso
- Solución de problemas comunes
- Cómo personalizar los scripts

---

## 🚀 CÓMO EJECUTAR

### Opción 1: CURL (Recomendado - Más Simple)

```bash
# Doble click en:
test-endpoints-curl.bat

# O desde CMD:
cd cementerio-virtual-animales
test-endpoints-curl.bat
```

### Opción 2: PowerShell

```powershell
cd "cementerio-virtual-animales"
powershell -ExecutionPolicy Bypass -File "test-all-endpoints.ps1"
```

### Opción 3: Batch (inicia PowerShell)

```bash
# Doble click en:
test-endpoints.bat
```

---

## ✅ ESTADO ACTUAL

El servidor está **CORRIENDO** en:
- URL: `http://localhost:3000`
- Servidor: Next.js 15.5.6 con Turbopack
- Status: ✓ Ready

**Memoriales disponibles:** 10 en la BD

---

## 📊 QUÉ PRUEBAN LOS SCRIPTS

### Script PowerShell (test-all-endpoints.ps1)
```
1. Autenticacion (Login)
2. Endpoints Publicos (GET Memoriales)
3. Tributos (GET/POST)
4. Likes (POST)
5. Reacciones (POST)
6. Comentarios (POST)
7. Trending (GET)
8. Admin (Dashboard/Usuarios/Memoriales)
```

### Script CURL (test-endpoints-curl.bat)
```
1. Autenticacion (Login)
2. GET Memoriales Publicos
3. GET Trending Popular
```

---

## 💡 PRÓXIMOS PASOS

### Para probar TODO rápidamente:

1. **Abre una terminal** (CMD o PowerShell)
2. **Navega al directorio:**
   ```
   cd "c:\Users\Anon\Desktop\PLUS TECNOLOGIA\proyectoparamascotas\cementerio-virtual-animales"
   ```

3. **Ejecuta CURL (opción más fácil):**
   ```
   .\test-endpoints-curl.bat
   ```

4. **Espera resultados** (deberías ver [OK] en verde)

---

## 🔗 ENDPOINTS DISPONIBLES PARA PROBAR

### Públicos (sin autenticación):
- ✓ `/api/profiles?public=true` - Listar memoriales
- ✓ `/api/tributes` - Listar tributos
- ✓ `/api/likes` - Ver likes
- ✓ `/api/reactions` - Ver reacciones
- ✓ `/api/comments` - Ver comentarios
- ✓ `/api/trending` - Memoriales trending
- ✓ `/api/memorials/[slug]` - Memorial por slug

### Requieren autenticación:
- ✓ `/api/admin/dashboard` - Stats admin
- ✓ `/api/admin/users` - Lista usuarios
- ✓ `/api/admin/profiles` - Memoriales (admin)
- ✓ `/api/admin/logs` - Logs del sistema

---

## 📝 EJEMPLOS DE USO

### Desde terminal (CURL directo):

```bash
# Listar memoriales
curl http://localhost:3000/api/profiles?public=true

# Crear tributo
curl -X POST http://localhost:3000/api/tributes \
  -H "Content-Type: application/json" \
  -d '{
    "profileId":"cmih97shu0002...",
    "visitorName":"Juan",
    "message":"Hermoso memorial",
    "tributeType":"flor"
  }'

# Dar like
curl -X POST http://localhost:3000/api/likes \
  -H "Content-Type: application/json" \
  -d '{"profileId":"cmih97shu0002...","userId":"user123"}'
```

### Desde Postman (GUI):

1. Descarga: https://www.postman.com/downloads/
2. Crea una colección
3. Agrega requests POST/GET
4. Usa ejemplos del documento `GUIA_PRUEBA_ENDPOINTS.md`

---

## ⚙️ CREDENCIALES PARA PROBAR ADMIN

```
Email: admin@forever-pet-friend.local
Password: Demo123!
```

---

## 📋 CHECKLIST ANTES DE EJECUTAR

- [x] Servidor corriendo (npm run dev)
- [x] Base de datos conectada
- [x] Variables de entorno en .env.local
- [x] Memoriales en la BD (10 disponibles)
- [x] Admin user existe

---

## 🎯 RESULTADO ESPERADO

Cuando ejecutes el script, deberías ver:

```
================================================================
PRUEBAS DE ENDPOINTS - Forever Pet Friend
================================================================

Base URL: http://localhost:3000
...

[OK] Login exitoso
[OK] Memoriales obtenidos: 10
[OK] Tributos obtenidos
[OK] Like agregado
[OK] Reaccion agregada
[OK] Comentario creado
[OK] Trending obtenido
[OK] Dashboard admin

================================================================
RESUMEN
================================================================

Total de Pruebas: 8
[OK] Exitosas: 8
[ERROR] Fallidas: 0

TODAS LAS PRUEBAS PASARON!
```

---

## 🆘 SI ALGO FALLA

### Error: "No es posible conectar con el servidor remoto"
- Asegúrate que el servidor esté corriendo
- Ejecuta: `npm run dev`
- Verifica: http://localhost:3000 en el navegador

### Error: "401 Unauthorized"
- Las credenciales del admin son incorrectas
- Verifica email y password

### Error: "PowerShell scripts are disabled"
- Ejecuta como admin:
  ```
  Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
  ```

### Error: "curl no encontrado"
- CURL viene con Windows 10+
- O usa el script PowerShell en su lugar

---

## 📈 PRÓXIMAS MEJORAS

Puedes extender estos scripts para:
- [ ] Agregar más endpoints admin
- [ ] Crear un reporte de performance
- [ ] Monitoreo en tiempo real (cada 30s)
- [ ] Exportar resultados a CSV
- [ ] Integración con GitHub Actions
- [ ] Notificaciones por email

---

## 📞 SOPORTE

Si tienes dudas:
1. Revisa `GUIA_PRUEBA_ENDPOINTS.md`
2. Revisa `COMO_USAR_SCRIPTS.md`
3. Prueba manualmente con CURL
4. Usa Postman para interfaz visual

---

**Creado:** 27 de Noviembre de 2025  
**Versión:** 1.0  
**Estado:** ✅ Listo para usar

**Próximo paso:** Ejecuta `test-endpoints-curl.bat` ahora mismo
