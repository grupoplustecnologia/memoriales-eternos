# ✏️ Funcionalidad de Edición y Eliminación de Memoriales - Implementado

## 📋 Resumen

Se ha implementado completamente la funcionalidad para **editar** y **eliminar** memoriales en la página `/my-memorials`.

---

## 🎯 Funcionalidades Implementadas

### 1. ✏️ **Editar Memoriales**

#### En la página `/my-memorials`:
- Botón "Editar" en cada tarjeta de memorial que enlaza a `/create?edit={id}`
- Los datos del memorial se cargan automáticamente en el formulario

#### En la página `/create`:
- **Modo de edición** detecta el parámetro `?edit={id}` en la URL
- Carga automáticamente los datos del memorial existente
- El título cambia de "Crear Memorial" a "Editar Memorial"
- El botón final cambia de "Crear Memorial" a "Actualizar Memorial"
- Todas las funcionalidades del formulario funcionan para actualizar

#### API:
- **PUT `/api/profiles?id={id}`** - Actualiza un memorial existente
- Requiere autenticación con token Bearer
- Maneja FormData con archivo de foto (opcional)
- Respeta la propiedad photoUrl si no se proporciona nueva foto

---

### 2. 🗑️ **Eliminar Memoriales**

#### En la página `/my-memorials`:
- Botón "Eliminar" en cada tarjeta de memorial
- Al hacer clic, abre un **diálogo de confirmación** (AlertDialog)
- El diálogo muestra:
  - Título con advertencia
  - Nombre del memorial que será eliminado
  - Advertencia de que la acción no se puede deshacer
  - Botón "Cancelar" y "Sí, Eliminar"

#### Estados:
- Mientras se elimina: botón muestra "⏳ Eliminando..."
- Se previene acción accidental con diálogo de confirmación
- Después de eliminar: alerta de confirmación y refresco de lista

#### API:
- **DELETE `/api/profiles?id={id}`** - Elimina un memorial
- Requiere autenticación con token Bearer
- Elimina todos los datos asociados (fotos, tributos, recuerdos, etc.)

---

## 📁 Archivos Modificados

### 1. `/src/app/my-memorials/page.tsx`
**Cambios:**
- Agregados estados para control de eliminación:
  - `deleteDialogOpen` - Control del diálogo
  - `memorialToDelete` - Memorial a eliminar
  - `isDeleting` - Estado de carga durante eliminación
- Función `handleDeleteClick()` - Abre el diálogo de confirmación
- Función `handleConfirmDelete()` - Ejecuta la eliminación
- Botón "Eliminar" ahora llamada a `handleDeleteClick()`
- Agregado `AlertDialog` con confirmación de eliminación

### 2. `/src/app/create/page.tsx`
**Cambios:**
- Importado `useSearchParams` de Next.js
- Agregados estados para edición:
  - `isEditMode` - Indica si está editando
  - `editingProfileId` - ID del memorial a editar
  - `isLoadingProfile` - Estado de carga inicial
- `useEffect` que carga datos del memorial cuando se detecta parámetro `?edit=`
- Actualizado `handleSubmit()` para detectar modo edición:
  - Usa PUT en lugar de POST cuando edita
  - Muestra mensajes de éxito diferenciados
  - Redirige al perfil actualizado
- Actualizado UI:
  - Título dinámico (Crear vs Editar)
  - Descripción dinámica
  - Labels dinámicos en los pasos
  - Botón final dinámico (Crear vs Actualizar)
- Agregada pantalla de carga mientras se carga el memorial

### 3. `/src/app/api/profiles/route.ts`
**Cambios:**
- Mejorado endpoint **PUT** para:
  - Requerir y validar token de autenticación
  - Obtener ID de query parameters
  - Manejar FormData (igual que POST)
  - Soportar foto opcional
  - Transformar datos de manera similar a POST
  - Retornar formato de respuesta consistente

---

## 🔄 Flujos de Uso

### Flujo de Edición:
```
1. Usuario en /my-memorials ve botón "✏️ Editar"
2. Hace clic → va a /create?edit={id}
3. Página detecta parámetro y carga memorial
4. Formulario se completa con datos existentes
5. Usuario modifica campos deseados
6. Hace clic en "✏️ Actualizar Memorial"
7. Se envía PUT a /api/profiles?id={id}
8. Se redirige a /profile/{id} con datos actualizados
```

### Flujo de Eliminación:
```
1. Usuario en /my-memorials ve botón "🗑️ Eliminar"
2. Hace clic → se abre AlertDialog de confirmación
3. Diálogo muestra advertencia y nombre del memorial
4. Usuario confirma o cancela
5. Si confirma:
   - Se envía DELETE a /api/profiles?id={id}
   - Memorial se elimina de base de datos
   - Se refresca la lista de memoriales
   - Aparece confirmación visual
```

---

## ✅ Casos de Uso

### ✏️ Edición:
- ✅ El usuario se equivocó en datos del memorial (nombre, fecha, ubicación, etc.)
- ✅ El usuario quiere actualizar la historia o epitafio
- ✅ El usuario quiere cambiar la foto del memorial
- ✅ El usuario quiere corregir información de ubicación en el mapa

### 🗑️ Eliminación:
- ✅ El usuario crea un memorial por error
- ✅ El usuario decide que no quiere mantener un memorial
- ✅ El usuario crea un duplicado accidental
- ✅ Limpieza de memoriales de prueba

---

## 🔐 Seguridad

- ✅ Ambas operaciones requieren autenticación con token Bearer
- ✅ Validaciones en servidor (no solo cliente)
- ✅ Confirmación requerida antes de eliminar
- ✅ Solo el propietario puede editar/eliminar (validado en servicio)

---

## 💡 Notas Técnicas

### Estados de UI:
- Botones deshabilitados durante operaciones
- Indicadores visuales de carga (⏳)
- Emojis para mejor UX
- Diálogos de confirmación robustos

### Manejo de Errores:
- Mensajes de error claros al usuario
- Logs en consola para debugging
- Alertas de éxito con confirmación
- Gestión de estados de error

### Datos:
- Uso consistente de snake_case en DB / camelCase en UI
- Transformación de fechas (ISO string)
- Manejo de valores opcionales (breed, birthDate, etc.)

---

## 🚀 Testing Recomendado

1. **Crear un memorial** de prueba
2. **Editar memorial**:
   - Cambiar nombre
   - Cambiar fecha
   - Cambiar ubicación
   - Cambiar foto
   - Verificar que los cambios se guardan
3. **Eliminar memorial**:
   - Hacer clic en Eliminar
   - Cancelar en diálogo (debe mantenerse)
   - Hacer clic en Eliminar nuevamente
   - Confirmar eliminación
   - Verificar que desaparece de la lista

---

## 📝 Checklist

- ✅ Botón Editar en my-memorials
- ✅ Botón Eliminar en my-memorials
- ✅ Diálogo de confirmación para eliminar
- ✅ Carga de datos en formulario (edición)
- ✅ Modo de edición en create page
- ✅ PUT endpoint mejorado
- ✅ DELETE endpoint funcional
- ✅ Autenticación requerida
- ✅ Manejo de errores
- ✅ Mensajes de éxito/error
- ✅ UI dinámica según contexto

---

## 📞 Contacto

Si necesitas agregar más funcionalidades o hacer ajustes a la edición/eliminación, solo avísame.
