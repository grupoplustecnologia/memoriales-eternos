# 🎯 Guía Rápida: Panel de Admin - Gestión de Usuarios

## Acceder al Panel

1. Ve a: `https://foreverpetfriend.com/admin`
2. Si no eres admin, verás login con credenciales demo:
   - Email: `admin@forever-pet-friend.local`
   - Password: `Demo123!`

---

## Cambiar Plan de Usuario

### Paso a Paso:

1. **Abre panel de admin**
   - Ve a `/admin`
   - Haz clic en pestaña `👥 Usuarios`

2. **Localiza el usuario**
   - Verás lista con todos los usuarios registrados
   - Cada uno muestra: nombre, email, plan actual, # memoriales

3. **Selecciona nuevo plan**
   ```
   [Usuario: John Doe]
   Plan: [dropdown ▼] ← CLICK AQUÍ
   
   Opciones:
   - 🆓 Gratuito
   - ⭐ Cielo de Estrellas  
   - 👑 Santuario Premium
   ```

4. **Confirma cambio**
   - Sistema actualiza automáticamente
   - Ves mensaje verde: "✅ Plan actualizado exitosamente"
   - Usuario puede ahora crear más memoriales (si es plan premium)

---

## Eliminar Usuario

### Paso a Paso:

1. **Abre panel de admin**
   - Ve a `/admin`
   - Haz clic en pestaña `👥 Usuarios`

2. **Encuentra el usuario a eliminar**
   - Puedes ver el # de memoriales en la fila

3. **Haz clic en botón ROJO 🗑️**
   ```
   [Usuario: John Doe] ... [🗑️ Eliminar] ← CLICK
   ```

4. **Confirma en dialogo**
   ```
   ⚠️ Dialogo de confirmación:
   
   "¿Estás seguro de que quieres eliminar el usuario john@example.com?
   
   ⚠️ Esto eliminará también 3 memoriales asociados.
   
   Esta acción no se puede deshacer."
   
   [Cancelar] [Aceptar]
   ```

5. **Usuario eliminado**
   - Desaparece de la lista
   - Mensaje verde: "✅ Usuario eliminado exitosamente"
   - Sus memoriales también se eliminan automáticamente
   - Ya no aparecen en el mapa (/map)

---

## Casos Reales

### Ejemplo 1: Dar Premium a Usuario Gratuito

**Situación:** Usuario "María" tiene plan gratuito pero quiere premium.

```
1. Admin abre /admin → Users
2. Localiza: María (gratuito@example.com) - Plan: 🆓 Gratuito
3. Hace clic en dropdown
4. Selecciona: 👑 Santuario Premium
5. ✅ "Plan actualizado exitosamente"
6. María ahora puede:
   - Crear memoriales ilimitados (en vez de 1)
   - Fotos ilimitadas (en vez de 1)
   - Ver su marker en rojo en el mapa
```

### Ejemplo 2: Eliminar Usuario Inactivo

**Situación:** Usuario creó cuenta pero nunca usó la plataforma.

```
1. Admin abre /admin → Users
2. Localiza: Inactivo (nunca@usado.com) - 0 memoriales
3. Hace clic en 🗑️ Eliminar
4. Confirma en dialogo
5. ✅ "Usuario eliminado exitosamente"
6. El usuario es eliminado completamente
```

### Ejemplo 3: Downgrade de Plan

**Situación:** Usuario abusó del plan premium, cambiar a gratuito.

```
1. Admin abre /admin → Users
2. Localiza: Abusador (abuso@example.com) - Plan: 👑 Premium
3. Hace clic en dropdown
4. Selecciona: 🆓 Gratuito
5. ✅ "Plan actualizado exitosamente"
6. Usuario ahora:
   - Solo puede 1 memorial
   - Marker pequeño en mapa
```

---

## Columnas de la Tabla

| Columna | Significado | Ejemplo |
|---------|-------------|---------|
| Nombre | Nombre del usuario | Juan Pérez |
| Email | Email de registro | juan@example.com |
| Plan | Plan actual + Badge | 👑 Santuario Premium |
| Memoriales | # de memoriales del usuario | 📦 5 memoriales |
| Dropdown | Cambiar plan | [dropdown ▼] |
| 🗑️ Botón | Eliminar usuario | Rojo |

---

## Planes Explicados

### 🆓 Gratuito (huella-eterna)
- **Memoriales:** 1 máximo
- **Fotos:** 1 por memorial
- **Marker:** Pequeño (28px), teardrop, degradado
- **Costo:** Gratis

### ⭐ Cielo de Estrellas (cielo-estrellas)
- **Memoriales:** 5 máximo
- **Fotos:** 2 por memorial
- **Marker:** Medio (56px), cuadrado cyan, vela
- **Costo:** €5/mes

### 👑 Santuario Premium (santuario-premium)
- **Memoriales:** Ilimitados
- **Fotos:** Ilimitadas
- **Marker:** Grande (56px), circular con foto, vela
- **Costo:** €10/mes

---

## Mensajes del Sistema

| Icono | Mensaje | Significado |
|-------|---------|-------------|
| ✅ | "Plan actualizado exitosamente" | Cambio de plan completado |
| ✅ | "Usuario eliminado exitosamente" | Usuario borrado completamente |
| ❌ | "Error al actualizar plan" | Problema al guardar plan |
| ❌ | "Error al eliminar usuario" | Problema al borrar usuario |
| ⏳ | "Cargando..." | Sistema procesa la acción |

---

## Errores Comunes

### Error: "Unauthorized"
- **Causa:** No eres admin
- **Solución:** Usar cuenta con role 'ADMIN'

### Error: "Invalid subscription tier"
- **Causa:** Plan inválido
- **Solución:** Usar solo: huella-eterna | cielo-estrellas | santuario-premium

### Error: "User not found"
- **Causa:** Usuario no existe
- **Solución:** Actualizar página, usuario puede estar eliminado

### Botones deshabilitados (grises)
- **Causa:** Sistema cargando
- **Solución:** Esperar a que termine la acción

---

## ⚡ Tips Útiles

✅ **Los cambios son instantáneos** - No necesitas recarga de página

✅ **Mensajes desaparecen solos** - En 3 segundos se cierran

✅ **Eliminación es permanente** - Backups recomendado antes de eliminar

✅ **Cascada automática** - Eliminar usuario elimina todos sus memoriales

✅ **Sin rollback** - No hay "Deshacer", sé cuidadoso

---

## 📞 Soporte

Si tienes problemas:

1. Revisa `/admin` → 📝 Logs para ver actividad
2. Verifica que usuario exista en `/admin` → 👥 Usuarios
3. Intenta actualizar página (F5)
4. Contacta al desarrollador si persiste el error

---

**¡Listo para usar!** 🎉
