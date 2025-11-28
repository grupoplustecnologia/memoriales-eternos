# 🎯 GUÍA DE INICIO RÁPIDO - TESTING

## 🚀 PRUEBA TODO EN 30 SEGUNDOS

### Paso 1: Abre una terminal en el directorio del proyecto

```
cd "c:\Users\Anon\Desktop\PLUS TECNOLOGIA\proyectoparamascotas\cementerio-virtual-animales"
```

### Paso 2: Ejecuta el script de pruebas

```
test-endpoints-curl.bat
```

✓ ¡Listo! Verás los resultados en la terminal

---

## 📚 DOCUMENTACIÓN DISPONIBLE

### Para Entender Qué Hacer
1. **README_SCRIPTS.md** ← EMPIEZA AQUÍ (overview)
2. **COMO_USAR_SCRIPTS.md** - Instrucciones detalladas
3. **GUIA_PRUEBA_ENDPOINTS.md** - Referencia técnica completa

### Para Entender la Aplicación
1. **DOCUMENTACION_COMPLETA.md** - Toda la app explicada
2. **LANDING_PAGE_DETALLADA.md** - Landing page paso a paso
3. **PROJECT_STATUS.md** - Estado del proyecto

---

## 🧪 SCRIPTS DISPONIBLES

### Pruebas Automáticas

| Script | Lenguaje | Dificultad | Cuándo usar |
|--------|----------|-----------|------------|
| test-endpoints-curl.bat | Batch | Fácil | Pruebas rápidas |
| test-all-endpoints.ps1 | PowerShell | Media | Pruebas completas |
| test-endpoints.bat | Batch | Fácil | Lanza PowerShell |

### Pruebas Manuales

| Herramienta | Costo | Recomendación |
|-------------|-------|---------------|
| CURL (terminal) | Gratis | Mejor para aprender |
| Postman | Gratis/Premium | Mejor para interfaz |
| Thunder Client | Gratis | Mejor para VS Code |
| Insomnia | Gratis | Alternativa a Postman |

---

## 🎓 FLUJO DE PRUEBAS RECOMENDADO

### 1️⃣ Primero: Verifica que todo funcione

```bash
test-endpoints-curl.bat
```

Deberías ver:
- [OK] Login exitoso
- [OK] Memoriales obtenidos: 10
- [OK] Trending obtenido

### 2️⃣ Luego: Prueba endpoints específicos con CURL

```bash
# Ver memoriales
curl http://localhost:3000/api/profiles?public=true

# Ver un memorial específico
curl http://localhost:3000/api/memorials/luna-gato

# Ver trending
curl http://localhost:3000/api/trending?type=popular
```

### 3️⃣ Finalmente: Prueba todo con Postman

Descarga: https://www.postman.com/downloads/
Importa ejemplos de: GUIA_PRUEBA_ENDPOINTS.md

---

## 📊 ENDPOINTS PRINCIPALES

### Públicos (no requieren login)

```
GET  /api/profiles?public=true           → Listar memoriales
GET  /api/memorials/[slug]               → Memorial por slug
GET  /api/tributes?profileId=[id]        → Tributos
POST /api/tributes                       → Crear tributo
GET  /api/trending?type=popular          → Memoriales trending
```

### Con autenticación (requieren login)

```
POST /api/auth/login                     → Login
GET  /api/admin/dashboard                → Dashboard admin
GET  /api/admin/users                    → Lista usuarios
GET  /api/admin/profiles                 → Memoriales (admin)
GET  /api/admin/logs                     → Logs del sistema
```

---

## ✅ CHECKLIST ANTES DE EMPEZAR

- [x] Servidor corriendo: npm run dev
- [x] Memoriales en BD: 10 
- [x] Admin user existe: admin@forever-pet-friend.local
- [x] Base de datos conectada

---

## 🆘 TROUBLESHOOTING RÁPIDO

| Problema | Solución |
|----------|----------|
| "No es posible conectar" | Abre http://localhost:3000 en navegador |
| "401 Unauthorized" | Verifica credenciales admin |
| "Comando no encontrado" | CURL debe estar en PATH |
| "PowerShell disabled" | Ejecuta como admin y corre: `Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser` |

---

## 📈 PRÓXIMOS PASOS

1. ✅ **Ejecuta el script**
2. ✅ **Verifica los resultados**
3. ✅ **Prueba endpoints específicos**
4. ✅ **Accede a admin panel**
5. ✅ **Explora la landing page**

---

## 🔗 ENLACES ÚTILES

- Landing Page: http://localhost:3000
- Mapa: http://localhost:3000/map
- Admin: http://localhost:3000/admin
- API Docs: Ver GUIA_PRUEBA_ENDPOINTS.md

---

**¿Listo?** Ejecuta ahora:

```bash
test-endpoints-curl.bat
```

---

*Creado: 27 de Noviembre de 2025*  
*Versión: 1.0*  
*Estado: ✅ READY TO GO*
