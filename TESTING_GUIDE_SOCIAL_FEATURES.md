# 🧪 Guía de Testing - Funcionalidades Sociales

## Credenciales de Demo

```
Admin: admin@memorias-eternas.local / Demo123!
User:  demo@memorias-eternas.local / Demo123!
```

---

## ✅ Testing Checklist

### 1️⃣ PÁGINA PRINCIPAL
- [ ] Homepage carga correctamente
- [ ] Navegación visible con nuevos links: "Buscar" y "Destacados"
- [ ] Footer muestra todos los links

### 2️⃣ PÁGINA DE BÚSQUEDA (`/search`)
- [ ] Página carga sin errores
- [ ] Buscar por nombre funciona (ej: "Max")
- [ ] Buscar por tipo de animal funciona (ej: "perro")
- [ ] Búsqueda por ubicación funciona (ej: "40.4168,-3.7038" para Madrid)
- [ ] Selector de tipo de búsqueda cambia resultados
- [ ] Resultados se muestran en grid
- [ ] Hacer click en resultado abre memorial

### 3️⃣ PÁGINA DE TRENDING (`/trending`)
- [ ] Página carga sin errores
- [ ] Tabs funcionales: Populares, Recientes, Más Queridos, Comentados
- [ ] Cada tab muestra diferentes memoriales
- [ ] Se muestran estadísticas (❤️ likes, 💬 comentarios, 🕯️ tributos)
- [ ] Contador de visitantes muestra correctamente
- [ ] Hacer click abre el memorial

### 4️⃣ MEMORIA INDIVIDUAL (`/profile/[id]`)
- [ ] Memorial carga sin errores
- [ ] ViewCount incrementa cada vez que se visita
- [ ] Se muestra sección de "Interacciones"

#### ME GUSTA
- [ ] Sin login: botón deshabilitado, alerta al hacer click
- [ ] Con login: 
  - [ ] Primer click: activa (❤️ rojo), incrementa contador
  - [ ] Segundo click: desactiva (⚪ outline), decrementa contador
  - [ ] Contador actualiza correctamente

#### REACCIONES (EMOJIS)
- [ ] Sin login: botón deshabilitado
- [ ] Con login:
  - [ ] Hacer click muestra grid de emojis
  - [ ] Seleccionar emoji agrega reacción
  - [ ] Emoji elegido aparece con contador
  - [ ] Segundo click en mismo emoji lo quita
  - [ ] Se pueden agregar múltiples emojis

#### COMPARTIR
- [ ] Botón "Compartir" abre menú
- [ ] Copiar enlace: botón cambia a "Copiado!"
- [ ] WhatsApp: abre nueva ventana
- [ ] Facebook: abre nueva ventana
- [ ] Twitter: abre nueva ventana
- [ ] Email: abre cliente de email

#### ETIQUETAS
- [ ] Se muestra sección de tags
- [ ] Tags visibles con colores (azul)
- [ ] Si es propietario: campo para agregar tags
- [ ] Búsqueda de tags sugiere existentes
- [ ] Crear nuevo tag funciona
- [ ] Remover tag funciona (botón X)

#### COMENTARIOS
- [ ] Sección "Comentarios" visible
- [ ] Sin login: campo de nombre editable
- [ ] Con login: nombre del usuario autocompletado
- [ ] Campo de mensaje editable
- [ ] Botón "Publicar Comentario" crea comentario
- [ ] Comentario aparece en lista (abajo)
- [ ] Timestamp visible
- [ ] Si es propietario: botón de eliminar (🗑️) visible
- [ ] Hacer click eliminar remueve comentario

---

## 🔐 Testing de Autenticación

### Sin Login
```
❌ No puede dar me gusta
❌ No puede reaccionar
✅ Puede comentar (como visitante)
❌ No puede eliminar comentarios
✅ Puede ver búsqueda
✅ Puede ver trending
```

### Con Login
```
✅ Puede dar me gusta
✅ Puede reaccionar
✅ Puede comentar (con nombre autollenado)
✅ Puede eliminar sus comentarios
✅ Puede agregar etiquetas a sus memoriales
✅ Puede ver búsqueda
✅ Puede ver trending
```

---

## 🧪 Casos de Uso Completos

### Caso 1: Visitante Comenta Sin Login
1. Ir a `/profile/[memorial-id]`
2. Scroll a sección "Comentarios"
3. Escribir nombre (ej: "Juan")
4. Escribir mensaje (ej: "Qué hermoso memorial")
5. Hacer click "Publicar Comentario"
6. ✅ Verificar: Comentario aparece abajo

### Caso 2: Usuario da Me Gusta y Reacciona
1. Login como usuario
2. Ir a `/profile/[memorial-id]`
3. Scroll a "Interacciones"
4. Click ❤️ Me gusta
5. ✅ Verificar: Se activa (rojo), contador +1
6. Click en 😊 (emoji panel)
7. ✅ Verificar: Emoji aparece con contador 1
8. Volver a click 😊
9. ✅ Verificar: Emoji desaparece

### Caso 3: Buscar y Encontrar
1. Click "Buscar" en navbar
2. Escribir nombre de animal (ej: "Max")
3. ✅ Verificar: Resultados aparecen
4. Click en memorial
5. ✅ Verificar: Abre `/profile/[id]`

### Caso 4: Ver Trending
1. Click "Destacados" en navbar
2. ✅ Verificar: Carga página /trending
3. Click en "Más Queridos"
4. ✅ Verificar: Muestran memoriales con más likes
5. Click en "Comentados"
6. ✅ Verificar: Muestra memoriales con más comentarios

### Caso 5: Agregar y Quitar Etiqueta
1. Login como propietario del memorial
2. Ir a `/profile/[memorial-propio]`
3. Scroll a "Etiquetas"
4. Escribir "Heroico" en campo
5. ✅ Verifica: Sugerencias aparecen
6. Click en sugerencia "Heroico"
7. ✅ Verificar: Tag aparece en lista azul
8. Click X en tag
9. ✅ Verificar: Tag se elimina

---

## 📊 Testing de Datos

### Verificar en Base de Datos (Prisma Studio)

```bash
npx prisma studio
```

Tablas a revisar:
- [ ] **likes**: Debería haber registros si se dieron me gusta
- [ ] **reactions**: Debería haber registros con emojis
- [ ] **comments**: Debería haber comentarios creados
- [ ] **tags**: Debería mostrar tags usadas
- [ ] **profile_tags**: Relación de memoriales con tags

---

## 🔍 Testing de Performance

```bash
# Medir tiempo de carga de página
# Abrir DevTools (F12) → Network tab → Recargar página

# Métricas a revisar:
- ✅ Página carga < 3 segundos
- ✅ API calls responden < 500ms
- ✅ UI responde sin lag al hacer click
```

---

## 🐛 Debugging

### Errores Comunes

**Error: "Cannot add like - token error"**
- Verificar que está logueado
- Verificar que token está en localStorage

**Error: "Reaction emoji not allowed"**
- Verificar que es uno de: ❤️ 😢 🙏 😊 🌹 ⭐ 🕊️ 💐

**Error: "Comment creation failed"**
- Verificar que nombre no esté vacío
- Verificar que mensaje no esté vacío

### Console Logs

Abrir DevTools (F12) y revisar:
```javascript
// Debe haber logs de:
console.log('Like toggled successfully')
console.log('Reaction added')
console.log('Comment posted')
```

---

## ✅ Puntos Críticos a Verificar

1. **Autenticación**: Token se envía correctamente en headers
2. **Permisos**: Solo propietarios pueden eliminar/editar
3. **Validación**: No acepta entradas vacías o inválidas
4. **UI Feedback**: Usuario ve feedback visual (loading, success, error)
5. **Contadores**: Se incrementan/decrementan correctamente
6. **Persistencia**: Datos persisten después de recargar página

---

## 🎯 Estado Esperado Después de Testing

✅ Todas las funcionalidades sociales operacionales
✅ Búsqueda retorna resultados correctos
✅ Trending muestra categorías diferentes
✅ Comentarios crear/eliminar funciona
✅ Likes y reacciones se guardan
✅ Tags se pueden agregar/remover
✅ Compartir abre plataformas correctas
✅ ViewCount incrementa

---

## 📝 Reporte de Testing

Usar este template para documentar resultados:

```
### Feature: [Nombre]
**Fecha**: [dd/mm/yyyy]
**Tester**: [Nombre]
**Estado**: ✅ Pasó / ⚠️ Parcial / ❌ Falló

**Casos Pasados**:
- [x] Caso 1
- [x] Caso 2

**Casos Fallidos**:
- [ ] Caso 3 - Razón: [Descripción del error]

**Notas**:
[Observaciones generales]

**Siguiente**:
[Próximas acciones]
```

---

**¡Listo para testing! 🚀**
