# 🚀 INICIO RÁPIDO - Cargar fotos

## En 5 pasos:

### 1️⃣ Abre el navegador
```
http://localhost:3000/admin
```

### 2️⃣ Inicia sesión como admin
```
📧 Email: admin@forever-pet-friend.local
🔐 Contraseña: Demo123!
```

### 3️⃣ Ve a "🪦 Memoriales"
Verás lista de todos los memoriales

### 4️⃣ Haz clic en "📷 Foto"
En cualquier memorial de la lista

### 5️⃣ Sube tu foto
- **Desde PC**: Arrastra una imagen al modal O haz clic para seleccionar
- **Desde móvil**: Haz clic y selecciona de la galería
- **Alternativa**: Pega una URL (sin archivo)

---

## ✅ Formatos permitidos
- JPEG
- PNG  
- WebP
- GIF

## 📏 Límite de tamaño
- Máximo 5MB

## ⏱️ Tiempo de carga
- La foto debería subirse en 1-5 segundos

---

## 🎯 Resultado esperado

Después de guardar:
1. ✅ Modal se cierra
2. ✅ Lista de memoriales se refresca
3. ✅ Puedes verificar en `/map`
4. ✅ La nueva foto aparece en el carrusel

---

## 📸 Ejemplo: Cambiar foto de "Max"

```
1. Admin → Memoriales
2. Busca "Max (perro)"
3. Clic en "📷 Foto"
4. Arrastra una foto de perro
5. Ves vista previa
6. Clic en "✅ Guardar"
7. Espera 1-5 segundos
8. ✅ Listo
9. Ve a /map → busca Max → nueva foto en carrusel
```

---

## 💡 Tips

- **Imágenes horizontales**: Se ven mejor en el carrusel
- **Tamaño recomendado**: 600x400px o similar
- **Formatos**: PNG sin fondo queda especialmente bien
- **Móvil**: Funciona exactamente igual que en PC

---

## 🔧 Si algo falla

### "Unauthorized" 
→ Cierra sesión y vuelve a iniciar

### "File too large"
→ La imagen es > 5MB, comprime

### "Invalid file type"
→ Usa JPEG, PNG, WebP o GIF

### No aparece en el mapa
→ Recarga `/map` (Ctrl+F5)

---

## 📱 Desde móvil

1. Abre en tu móvil: `http://[TU_IP_LOCAL]:3000/admin`
   - Ejemplo: `http://192.168.1.100:3000/admin`
2. Inicia sesión
3. Memoriales → 📷 Foto
4. Selecciona foto de tu galería
5. ✅ Listo

---

## 🎬 Video del proceso

(Si necesitas help visual, dame un momento para crear un tutorial con screenshots)

---

Eso es todo! 🎉

Ahora puedes subir fotos directamente desde tu PC o móvil sin depender de URLs externas.
