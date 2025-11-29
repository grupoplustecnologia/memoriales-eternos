# Admin User Management System

**Status**: ✅ COMPLETADO  
**Fecha**: 20 de Noviembre 2025  
**Commit**: `6db23cb`

## 📋 Descripción General

Sistema completo de administración de usuarios en el panel de admin. Permite:
- ✅ Ver lista de todos los usuarios con sus planes actuales
- ✅ Cambiar plan de usuario (Gratuito → Cielo de Estrellas → Santuario Premium)
- ✅ Eliminar usuarios con eliminación en cascada de sus memoriales

---

## 🔧 Componentes Implementados

### 1. API Endpoints

#### `PUT /api/admin/users/[id]` - Actualizar Plan
```bash
URL: /api/admin/users/{userId}
Método: PUT
Headers: Authorization: Bearer {token}
Body: { "subscriptionTier": "cielo-estrellas" }

Respuesta Exitosa:
{
  "success": true,
  "message": "User email@example.com plan updated to cielo-estrellas",
  "data": {
    "id": "user-id",
    "email": "email@example.com",
    "name": "Usuario",
    "subscriptionTier": "cielo-estrellas",
    "subscriptionStatus": "active",
    "_count": { "profiles": 3 }
  }
}
```

**Validaciones:**
- ✅ Solo admin (role === 'ADMIN')
- ✅ Plan válido: 'huella-eterna' | 'cielo-estrellas' | 'santuario-premium'
- ✅ Usuario existe

---

#### `DELETE /api/admin/users/[id]` - Eliminar Usuario
```bash
URL: /api/admin/users/{userId}
Método: DELETE
Headers: Authorization: Bearer {token}

Respuesta Exitosa:
{
  "success": true,
  "message": "User email@example.com and 3 memorials deleted successfully",
  "data": {
    "id": "user-id",
    "email": "email@example.com",
    "name": "Usuario",
    "_count": { "profiles": 3 }
  }
}
```

**Características:**
- ✅ Elimina usuario de la base de datos
- ✅ Elimina automáticamente todos sus memoriales (cascada Prisma)
- ✅ Confirmación en UI con count de memoriales
- ✅ No se puede deshacer

---

### 2. Componente AdminPanelFull.tsx - Pestaña Usuarios

#### Interfaz

**Ubicación:** `/admin` → Pestaña `👥 Usuarios`

**Características:**
1. **Lista de Usuarios** - Muestra:
   - Nombre y email
   - Plan actual (🆓 Gratuito | ⭐ Cielo | 👑 Premium)
   - Número de memoriales

2. **Selector de Plan** - Dropdown para cambiar plan
   - Opciones: Gratuito, Cielo de Estrellas, Santuario Premium
   - Cambio inmediato sin recarga
   - Mensaje de éxito

3. **Botón Eliminar** - Rojo (🗑️)
   - Confirmación con detalles
   - Muestra email y count de memoriales
   - Elimina usuario y todos sus datos

#### Manejo de Errores

```typescript
// Estados de Carga
loading: true → Deshabilita botones mientras se procesa

// Mensajes
error: "Error al actualizar plan"
success: "Plan actualizado exitosamente"

// Timeouts
Los mensajes de éxito desaparecen después de 3 segundos
```

---

## 📊 Casos de Uso

### Caso 1: Conceder Plan Premium a Usuario
1. Admin va a `/admin`
2. Abre pestaña `👥 Usuarios`
3. Encuentra usuario en lista
4. Selecciona plan del dropdown: "⭐ Cielo de Estrellas"
5. Sistema actualiza y muestra "Plan actualizado exitosamente"
6. Usuario ahora puede crear 5 memoriales en vez de 1

### Caso 2: Eliminar Usuario Problemático
1. Admin va a `/admin`
2. Abre pestaña `👥 Usuarios`
3. Hace clic en botón 🗑️ del usuario
4. Confirma eliminación (con detalles de memoriales)
5. Usuario y todos sus memoriales se eliminan
6. Se actualiza la lista de usuarios

---

## 🗄️ Base de Datos

### Cambios Realizados
✅ **Ninguno nuevo** - Sistema aprovecha estructura existente

### Campos Utilizados
- `User.subscriptionTier` - Plan actual del usuario
- `User.subscriptionStatus` - Estado (active/inactive/expired)
- `AnimalProfile.userId` - Relación para cascada

### Cascada de Eliminación
```prisma
// Ya configurado en schema.prisma
model AnimalProfile {
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**Efecto:** Cuando se elimina usuario, Prisma automáticamente elimina todos sus memoriales.

---

## 🔐 Seguridad

✅ **Autenticación:**
- Token de sesión requerido en todos los endpoints
- Se valida con `verifySessionToken()`

✅ **Autorización:**
- Solo usuarios con `role === 'ADMIN'` pueden acceder
- Control en API endpoints
- Control en componente UI

✅ **Validación:**
- Tier válido requerido (enum de 3 valores)
- Usuario debe existir en BD
- Confirmaciones antes de acciones destructivas

---

## 📝 Archivos Modificados

### 1. Nuevo Archivo
```
src/app/api/admin/users/[id]/route.ts
- PUT: Actualizar plan de usuario
- DELETE: Eliminar usuario con cascada
```

### 2. Modificado
```
src/components/AdminPanelFull.tsx
- Enhanced Users tab con dropdown selector y botón delete
- Funciones: handleUpdateUserPlan() y handleDeleteUser()
- Mensajes de éxito/error y manejo de estados
```

---

## 🧪 Pruebas Recomendadas

### Test 1: Cambiar Plan
```
1. Ir a /admin → Users
2. Seleccionar usuario "gratuito@test.com"
3. Cambiar a "Cielo de Estrellas"
4. Verificar:
   - Badge cambia a ⭐ Cielo
   - Mensaje "Plan actualizado"
   - Usuarios de prueba:
     - cielo@test.com = "Cielo de Estrellas"
     - premium@test.com = "Santuario Premium"
```

### Test 2: Eliminar Usuario
```
1. Ir a /admin → Users
2. Hacer clic en 🗑️ de cualquier usuario
3. Confirmar en dialogo
4. Verificar:
   - Usuario desaparece de lista
   - Mensaje "Usuario eliminado exitosamente"
   - En /map, sus memoriales ya no aparecen
```

### Test 3: Cascada Delete
```
1. En admin, notar memorial count de usuario (ej: 3)
2. Eliminar usuario
3. En /admin → Memorials tab
4. Verificar que los 3 memoriales fueron eliminados
```

---

## 📊 Planes Disponibles

| Plan | Código | Marca | Memoriales | Fotos | Marker |
|------|--------|-------|------------|-------|--------|
| Gratuito | `huella-eterna` | 🆓 | 1 | 1 | 28px teardrop |
| Cielo de Estrellas | `cielo-estrellas` | ⭐ | 5 | 2c/u | 56px square cyan |
| Santuario Premium | `santuario-premium` | 👑 | ∞ | ∞ | 56px circle photo |

---

## 🚀 Deployment

**Commit:** `6db23cb`  
**Status:** ✅ Deployed to Netlify  
**Date:** 2025-11-20  

Cambios automáticamente en producción en: https://foreverpetfriend.com/admin

---

## 🔄 Flujo Completo de Admin

```
Admin Panel (/admin)
├── 📊 Dashboard (estadísticas)
├── 👥 Usuarios ← NUEVA FUNCIONALIDAD
│   ├── Ver lista de usuarios
│   ├── Cambiar plan (dropdown)
│   └── Eliminar usuario (botón rojo)
├── 🪦 Memoriales (editar/eliminar)
├── ⚖️ Moderación
├── 🚨 Reportes
├── 📝 Logs
└── 💰 Precios
```

---

## ✨ Próximas Mejoras (Sugeridas)

- [ ] Búsqueda/filtro de usuarios por email
- [ ] Exportar lista de usuarios (CSV)
- [ ] Historial de cambios de plan por usuario
- [ ] Estadísticas de usuarios por plan
- [ ] Reintentos de pago automáticos
- [ ] Notificaciones al usuario cuando se cambia su plan

---

**¿Preguntas o reportes?** Revisa los logs en `/admin` → 📝 Logs para diagnosticar problemas.
