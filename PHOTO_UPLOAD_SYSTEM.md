# 📸 Sistema de Carga de Fotos Mejorado

## ✅ Implementación Completada

Se ha implementado un sistema completo de carga de fotos en el servidor, permitiendo que los administradores suban imágenes directamente desde:
- 💻 Computadora (PC/Laptop)
- 📱 Dispositivos móviles
- 🔗 URLs externas (como respaldo)

---

## 🆕 Cambios Implementados

### 1. **Endpoint de Carga** ✅
**Archivo**: `src/app/api/admin/upload/route.ts`

- **Ruta**: `POST /api/admin/upload`
- **Formato**: `multipart/form-data`
- **Autenticación**: JWT Bearer token (solo admin)
- **Tipos permitidos**: JPEG, PNG, WebP, GIF
- **Tamaño máximo**: 5MB

**Validaciones**:
- Solo administradores pueden subir fotos
- Validación de tipo MIME
- Validación de tamaño de archivo
- Nombres de archivo únicos (timestamp + random)

**Respuesta exitosa**:
```json
{
  "success": true,
  "photoUrl": "/uploads/photos/photo_1234567890_abc123def.jpg",
  "message": "Foto cargada exitosamente"
}
```

### 2. **Almacenamiento** 📁
- **Directorio**: `public/uploads/photos/`
- **URLs públicas**: `/uploads/photos/{filename}`
- **Nomenclatura**: `photo_{timestamp}_{randomHash}.{ext}`
- **Acceso**: Las fotos son accesibles vía HTTP desde cualquier lado

### 3. **Modal de Foto Mejorado** 🎨

#### Características:
- ✅ Carga de archivos con drag-and-drop
- ✅ Vista previa en tiempo real
- ✅ Opción de URL como alternativa
- ✅ Validación de tamaño/tipo
- ✅ Mensajes de error/éxito
- ✅ Estado de carga durante la subida

#### Flujo de uso:

**Opción 1: Carga de archivo (Recomendado)**
```
1. Haz clic en "📷 Foto" en un memorial
2. Arrastra una imagen al modal O haz clic para seleccionar
3. Verás la vista previa inmediatamente
4. Haz clic en "✅ Guardar"
5. El archivo se subirá al servidor
6. La foto se guardará en la base de datos
```

**Opción 2: URL externa**
```
1. Haz clic en "📷 Foto" en un memorial
2. Si no cargas un archivo, pega una URL en el campo
3. Verás la vista previa de la URL
4. Haz clic en "✅ Guardar"
```

---

## 🔄 Proceso Técnico

### Upload de Archivo:
```
Usuario selecciona archivo
    ↓
Cliente crea FormData con archivo
    ↓
POST /api/admin/upload (con auth header)
    ↓
Servidor valida token admin
    ↓
Servidor valida tipo/tamaño
    ↓
Servidor guarda archivo en public/uploads/photos/
    ↓
Servidor retorna URL pública: /uploads/photos/photo_xxx.jpg
    ↓
Cliente recibe URL y la actualiza en el perfil
    ↓
PUT /api/admin/profiles/update-photo
    ↓
Base de datos se actualiza con nueva URL
    ↓
Modal se cierra y lista se refresca
```

---

## 📊 Base de Datos

**Cambios**: NINGUNO (compatible con estructura actual)
- El campo `AnimalProfile.photoUrl` sigue siendo un string
- Ahora puede contener URLs locales (`/uploads/photos/...`) o externas (`https://...`)

---

## 🛡️ Seguridad

### Autenticación:
- ✅ Solo administradores pueden subir fotos
- ✅ Token JWT requerido en header `Authorization`
- ✅ Validación en cada petición

### Validación de Archivos:
- ✅ Tipos MIME permitidos: image/jpeg, image/png, image/webp, image/gif
- ✅ Máximo 5MB por archivo
- ✅ Nombres de archivo únicos (previene colisiones)

### Acceso:
- ✅ Archivos servidos desde `public/uploads/photos/`
- ✅ Solo lectura pública (GET)
- ✅ Subida solo para admins (POST)

---

## 📝 Uso del Admin Panel

### Para cambiar la foto de un memorial:

1. **Accede a `/admin`**
   - Credenciales: `admin@forever-pet-friend.local` / `Demo123!`

2. **Ve a la pestaña "🪦 Memoriales"**
   - Verás la lista de todos los perfiles

3. **Busca el memorial** que quieres editar

4. **Haz clic en el botón "📷 Foto"**
   - Se abrirá el modal de carga

5. **Elige una opción:**
   - **Arrastra un archivo** al área punteada
   - O **haz clic** para seleccionar desde tu dispositivo
   - O **pega una URL** si no cargas archivo

6. **Verifica la vista previa**
   - Deberías ver la foto antes de guardar

7. **Haz clic en "✅ Guardar"**
   - La foto se subirá y guardará automáticamente

8. **Verifica en `/map`**
   - Ve al mapa y busca el memorial
   - Deberías ver la nueva foto en el carrusel

---

## 🔧 Cómo funciona con el mapa

### Carrusel de "Destacados":
```
El mapa muestra:
1. Carrusel de memoriales destacados
2. Cada memorial tiene su foto: photoUrl
3. Si cambias la foto desde admin: photoUrl se actualiza
4. El carrusel muestra la nueva foto automáticamente
```

### Perfiles de memorial:
```
Cuando abres un memorial desde el mapa:
1. Se carga AnimalProfile con photoUrl
2. La foto aparece en el encabezado del perfil
3. Los tributos también tienen fotos (otro campo)
```

---

## 📱 Prueba desde Móvil

El sistema funciona perfectamente en dispositivos móviles:

1. Abre en tu móvil: `http://localhost:3000/admin`
2. O desde otra máquina: `http://[TU_IP]:3000/admin`
3. Selecciona una foto de tu galería
4. El archivo se subirá automáticamente
5. Verifica en el mapa

---

## 🐛 Troubleshooting

### "Error al subir la foto"
- Verifica que el archivo sea JPEG, PNG, WebP o GIF
- Verifica que el archivo sea menor a 5MB
- Verifica que tu conexión sea estable

### "Unauthorized" o "Admin access required"
- Cierra sesión y vuelve a iniciar como admin
- Credenciales: `admin@forever-pet-friend.local` / `Demo123!`

### La foto no aparece en el modal
- Espera a que la carga termine (verás el botón cambiar de estado)
- Recarga la página si algo sale mal

### La foto no aparece en el mapa
- Espera unos segundos a que se actualice
- Recarga `/map` en el navegador (Ctrl+F5 para limpiar caché)

---

## 📂 Estructura de carpetas

```
cementerio-virtual-animales/
├── public/
│   └── uploads/
│       └── photos/
│           ├── photo_1234567890_abc123.jpg
│           ├── photo_1234567891_def456.png
│           └── ...
├── src/
│   ├── app/
│   │   └── api/
│   │       └── admin/
│   │           ├── upload/
│   │           │   └── route.ts (NUEVO)
│   │           └── profiles/
│   │               └── update-photo/
│   │                   └── route.ts
│   └── components/
│       └── AdminPanelFull.tsx (ACTUALIZADO)
```

---

## ✨ Ventajas del nuevo sistema

- ✅ No depende de Unsplash ni APIs externas
- ✅ Control total sobre las imágenes
- ✅ Funciona en modo offline/local
- ✅ Mejor velocidad (imágenes locales)
- ✅ Fácil backup (carpeta `public/uploads/`)
- ✅ Compatible con uploads desde móvil
- ✅ Validación robusta de archivos
- ✅ Interfaz intuitiva

---

**Última actualización**: 24 de Noviembre, 2025
**Estado**: ✅ PRODUCCIÓN READY
