# 🚀 CÓMO USAR LOS SCRIPTS DE PRUEBA

## 📝 Archivos Creados

```
✓ test-endpoints.ps1    → Script PowerShell principal (detallado)
✓ test-endpoints.bat    → Batch para ejecutar fácilmente
✓ GUIA_PRUEBA_ENDPOINTS.md  → Documentación completa
```

---

## 🎯 FORMA 1: Ejecutar Batch (La más fácil)

### Opción A: Doble Click

1. Ve a: `c:\Users\Anon\Desktop\PLUS TECNOLOGIA\proyectoparamascotas\cementerio-virtual-animales\`
2. Busca: `test-endpoints.bat`
3. **Doble click** → Se abre terminal y ejecuta todas las pruebas automáticamente

### Opción B: Desde PowerShell

```powershell
cd "c:\Users\Anon\Desktop\PLUS TECNOLOGIA\proyectoparamascotas\cementerio-virtual-animales"
.\test-endpoints.bat
```

---

## 🎯 FORMA 2: Ejecutar Script PowerShell Directamente

### En PowerShell:

```powershell
# Primero, navega al directorio
cd "c:\Users\Anon\Desktop\PLUS TECNOLOGIA\proyectoparamascotas\cementerio-virtual-animales"

# Si obtienes error de ejecución, permite scripts temporalmente:
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Ejecuta el script
.\test-endpoints.ps1
```

---

## ✅ QUÉ PRUEBA EL SCRIPT

### 1️⃣ Autenticación (1 test)
- ✓ Login admin

### 2️⃣ Endpoints Públicos (3 tests)
- ✓ GET todos los memoriales
- ✓ GET memorial por ID
- ✓ GET memorial por SLUG (SEO)

### 3️⃣ Tributos (2 tests)
- ✓ GET tributos
- ✓ POST crear tributo

### 4️⃣ Social - Likes (2 tests)
- ✓ GET estado de like
- ✓ POST dar like

### 5️⃣ Reacciones (2 tests)
- ✓ GET reacciones
- ✓ POST agregar reacción

### 6️⃣ Comentarios (2 tests)
- ✓ GET comentarios
- ✓ POST crear comentario

### 7️⃣ Trending (1 test)
- ✓ GET trending popular

### 8️⃣ Vistas (1 test)
- ✓ POST incrementar vista

### 9️⃣ Admin (4 tests - requiere login)
- ✓ GET dashboard admin
- ✓ GET usuarios
- ✓ GET memoriales (admin)
- ✓ GET logs

**Total: 18 tests**

---

## 📊 INTERPRETACIÓN DE RESULTADOS

### ✓ Verde - Exitoso
```
✓ 1.1 - Login Admin
```
El endpoint funcionó correctamente.

### ✗ Rojo - Error
```
✗ 2.1 - GET Memoriales
```
Hay un problema. Revisa:
- ¿Servidor corriendo? (`npm run dev`)
- ¿URL correcta?
- ¿Datos en la BD?

### ⊘ Amarillo - Omitido
```
⊘ 6.1 - Comentarios (sin datos)
```
No había datos para probar (normal en primera ejecución).

---

## 🔍 EJEMPLO DE SALIDA ESPERADA

```
════════════════════════════════════════════════════════════
1️⃣ AUTENTICACIÓN
════════════════════════════════════════════════════════════

1.1 Login Admin
   POST /api/auth/login
   ✓ Login exitoso
   Response: {"success":true,"token":"eyJhbGc..."}

════════════════════════════════════════════════════════════
2️⃣ ENDPOINTS PÚBLICOS - MEMORIALES
════════════════════════════════════════════════════════════

2.1 GET Todos los memoriales
   GET /api/profiles?public=true
   ✓ Memoriales obtenidos correctamente
   Response: {"success":true,"data":[{...}]}
   Total: 10 memoriales

...
[más tests]
...

════════════════════════════════════════════════════════════
📊 RESUMEN DE RESULTADOS
════════════════════════════════════════════════════════════

Total de Pruebas: 18
✓ Exitosas: 16
✗ Fallidas: 0
⊘ Omitidas: 2

Detalles:
✓ 1.1 - Login Admin
✓ 2.1 - GET Memoriales
✓ 2.2 - GET Memorial por ID
...

Tasa de Éxito: 100%

✨ ¡TODAS LAS PRUEBAS PASARON CORRECTAMENTE! ✨
```

---

## ⚠️ PROBLEMAS COMUNES

### Error: "Invoke-WebRequest: Connection refused"
```
❌ Problema: El servidor no está corriendo
✅ Solución: Abre otra terminal y ejecuta:
   cd cementerio-virtual-animales
   npm run dev
```

### Error: "401 Unauthorized"
```
❌ Problema: Token no válido o credenciales incorrectas
✅ Solución: Verifica las credenciales admin:
   Email: admin@forever-pet-friend.local
   Password: Demo123!
```

### Error: "404 Not Found"
```
❌ Problema: Endpoint no existe o no está implementado
✅ Solución: Revisa que todos los endpoints estén en:
   src/app/api/
```

### Error: "PowerShell scripts are disabled"
```
❌ Problema: No tienes permiso para ejecutar scripts
✅ Solución: Ejecuta esto en PowerShell como admin:
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
```

---

## 🔄 AUTOMATIZAR - Ejecutar cada X segundos

### Crear archivo `auto-test.ps1`:

```powershell
while ($true) {
    Write-Host "=== Ejecutando pruebas ===" -ForegroundColor Cyan
    & ".\test-endpoints.ps1"
    
    Write-Host "Esperando 30 segundos antes de próxima prueba..." -ForegroundColor Yellow
    Start-Sleep -Seconds 30
}
```

Ejecuta:
```powershell
.\auto-test.ps1
```

---

## 📈 MONITOREO EN TIEMPO REAL

### Versión mejorada con logs:

```powershell
$LogFile = "test-results-$(Get-Date -Format 'yyyy-MM-dd').log"

while ($true) {
    $Result = & ".\test-endpoints.ps1" 2>&1
    Add-Content -Path $LogFile -Value "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Result"
    Start-Sleep -Seconds 60
}
```

---

## 🎓 PERSONALIZACIÓN DEL SCRIPT

### Cambiar URL base:
```powershell
$BASE_URL = "http://localhost:4000"  # Cambiar de 3000 a 4000
```

### Cambiar credenciales admin:
```powershell
$LoginBody = @{
    email = "tu@email.com"
    password = "tu-password"
}
```

### Agregar más tests:
```powershell
# Añade antes de "Resumen Final":

Write-Header "🆕 TU SECCIÓN"

Write-Test "X.1" "Tu Test" "GET" "/api/tu-endpoint"

$Result = Test-Endpoint -Method "GET" -Endpoint "/api/tu-endpoint"

if ($Result.Success) {
    Write-Success "Mensaje de éxito" $Result.Content
    $RESULTS += "✓ X.1 - Tu Test"
} else {
    Write-Error-Custom "Error: $($Result.Error)"
    $RESULTS += "✗ X.1 - Tu Test"
}
```

---

## 📋 CHECKLIST - ANTES DE EJECUTAR

- [ ] Servidor corriendo (`npm run dev`)
- [ ] Base de datos conectada
- [ ] Variables de entorno en `.env.local`
- [ ] Memoriales en la BD (al menos 1)
- [ ] Admin user existe: `admin@forever-pet-friend.local`

---

## 🚀 RESUMEN RÁPIDO

| Acción | Comando |
|--------|---------|
| Ejecutar fácil (Batch) | `test-endpoints.bat` |
| Ejecutar PowerShell | `.\test-endpoints.ps1` |
| Ver documentación | `GUIA_PRUEBA_ENDPOINTS.md` |
| Ejecutar cada 30s | `.\auto-test.ps1` |

---

**Creado:** 27 de Noviembre de 2025  
**Versión:** 1.0  
**Estado:** ✅ Listo para usar
