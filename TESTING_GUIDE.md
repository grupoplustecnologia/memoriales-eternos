# Sistema de Memorias Eternas - Guía de Pruebas

## ✅ Sistema Completamente Implementado

### 🎯 Cambios Realizados en Esta Sesión

#### 1. **Creación de Memoriales** (AHORA FUNCIONAL)
- ✅ **Endpoint**: `POST /api/profiles` 
- ✅ **Cambio**: El formulario en `/create` ahora envía datos al API
- ✅ **Flujo**: Formulario → FormData → API → Prisma → Base de datos Neon
- ✅ **Resultado**: Los memoriales se guardan en la BD y pueden visualizarse en el mapa

#### 2. **Sistema de Estrellas** (NUEVO)
- ✅ **Componente**: `StarsDisplay.tsx` - Muestra estrellas disponibles + contador para recarga gratis
- ✅ **Endpoint**: `GET /api/user/stats` - Retorna estrellas, tier de suscripción, próxima recarga
- ✅ **Características**:
  - Muestra estrellas actuales (ej: 47/50)
  - Muestra días hasta recarga gratuita
  - Muestra horas exactas hasta recarga
  - Indica si ya está disponible la recarga

#### 3. **Compra de Estrellas** (NUEVO - DEMO)
- ✅ **Componente**: `StarPurchaseModal.tsx` - Modal con paquetes de estrellas
- ✅ **Endpoint**: `POST /api/stripe/checkout` - Mock Stripe integration
- ✅ **Paquetes Disponibles**:
  - 10⭐ por $0.99
  - 50⭐ por $3.99
  - 100⭐ por $7.99
  - 250⭐ por $15.99
- ✅ **Demo**: Simula el flujo de compra sin pedir dinero real

#### 4. **Panel de Administrador** (NUEVO)
- ✅ **Componente**: `AdminPanel.tsx` - Panel admin para gestionar usuarios
- ✅ **Endpoint**: `GET/POST /api/admin/add-stars`
- ✅ **Funciones**:
  - Lista todos los usuarios con sus estrellas
  - Permite agregar estrellas a cualquier usuario
  - Registra acciones admin en base de datos
  - Protegido: solo users con `role='admin'` pueden acceder
  - Demo admin: `demo@memorias-eternas.local` (999⭐)

#### 5. **Deducción de Estrellas en Tributos** (ACTUALIZADO)
- ✅ **Costable**: Cada tributo ahora cuesta estrellas
  - Flor 🌹 = 1⭐
  - Vela 🕯️ = 2⭐
  - Mensaje 💬 = 3⭐
- ✅ **Validación**: Si no hay suficientes estrellas, rechaza la solicitud
- ✅ **Deducción Automática**: Las estrellas se restan del usuario cuando crea tributo

---

## 🚀 Cómo Probar Todo

### **Login Primero**
Accede a `http://localhost:3000/auth/login` con demo user:
```
Email: demo@memorias-eternas.local
Password: Demo123!
```

O con otros demo users:
```
huella@memorias-eternas.local (4⭐)
cielo@memorias-eternas.local (10⭐)
santuario@memorias-eternas.local (30⭐)
```

---

## 📝 Pruebas por Feature

### **1. CREAR MEMORIAL** ✨
1. Login como `demo@memorias-eternas.local`
2. Ir a `/create`
3. Completar el formulario de 5 pasos:
   - Paso 1: Nombre + tipo animal
   - Paso 2: Fechas (nacimiento/muerte)
   - Paso 3: Historia + epitafio
   - Paso 4: Ubicación (click en mapa)
   - Paso 5: Foto + resumen
4. Click en "Crear Memorial"
5. ✅ **Verificar**: 
   - Aparece confirmación "¡Memorial creado con éxito!"
   - Se redirige a perfil del memorial
   - **Ir a `/map` y verificar que aparece el memorial en el mapa**

---

### **2. VER ESTRELLAS** ⭐
1. Login y ir a `/home` o cualquier página
2. En la navbar (si está integrado) debe aparecer:
   ```
   💫 999 Estrellas disponibles
   🎁 Recarga Gratuita en X días
   ```
3. ✅ **Verificar**: 
   - Muestra tu cantidad actual de estrellas
   - Cuenta atrás en días/horas

---

### **3. COMPRAR ESTRELLAS** 💳
1. Click en "Comprar Más ⭐" (en StarsDisplay)
2. Modal se abre mostrando 4 paquetes
3. Click en un paquete (ej: 50⭐ por $3.99)
4. Click en "Comprar"
5. ✅ **Verificar**: 
   - Aparece mensaje de éxito
   - Dice "Demo de compra iniciada"
   - Muestra cuántas estrellas compró
   - **En producción**: redireccionaría a Stripe real

---

### **4. CREAR TRIBUTO** 🌹
1. Ir a un perfil de memorial (`/profile/[id]`)
2. Buscar la sección de "Crear Tributo"
3. Seleccionar tipo: Flor (1⭐), Vela (2⭐), o Mensaje (3⭐)
4. Ingresar nombre del visitante y mensaje (si aplica)
5. Click en "Enviar Tributo"
6. ✅ **Verificar**:
   - Tributo aparece en la lista
   - Tus estrellas se restan automáticamente
   - Si tenías 999⭐ y envías flor (1⭐), ahora tienes 998⭐
   - Si no tienes suficientes, aparece error: "Insufficient stars"

---

### **5. PANEL ADMIN** 👑
1. **IMPORTANTE**: Usa la cuenta admin: `demo@memorias-eternas.local`
2. Ir a `/admin`
3. **Deberías ver**:
   - ✅ Lista completa de usuarios
   - ✅ Estrellas actuales de cada uno
   - ✅ Tier de suscripción
   - ✅ Rol (admin/user)
4. **Para dar estrellas**:
   - Click en un usuario en la tabla (queda seleccionado)
   - O dropdown de selección
   - Ingresa cantidad de estrellas (ej: 50)
   - Click "Agregar Estrellas"
5. ✅ **Verificar**:
   - Mensaje de éxito: "✓ 50 estrellas añadidas a huella@memorias-eternas.local"
   - Tabla se actualiza con nuevos números
   - Acción se registra en DB (AdminLog)

---

### **6. MAPA** 🗺️
1. Ir a `/map`
2. Debería ver todos los memoriales creados
3. ✅ **Verificar**:
   - Pins de diferentes colores por tipo animal 🐕🐈🦜
   - Click en pin = detalles del memorial
   - Coordinates match con formulario

---

## 📊 Base de Datos - Verificación

Para verificar que datos se guardaron en Neon PostgreSQL:

```bash
# Conectar a Neon (desde SQL Editor o local CLI)
psql "postgresql://neon_user:password@endpoint/database"

# Ver usuarios
SELECT id, email, name, stars, role FROM users LIMIT 10;

# Ver memoriales creados
SELECT id, name, animal_type, user_id, latitude, longitude FROM animal_profiles;

# Ver tributos
SELECT id, profile_id, visitor_name, tribute_type, stars_spent FROM tributes;

# Ver compras de estrellas
SELECT id, user_id, amount, created_at FROM star_purchases;

# Ver logs admin
SELECT id, admin_id, action, entity_id FROM admin_logs;
```

---

## 🔑 Demo Users (En BD Neon)

| Email | Password | Estrellas | Rol | Descripción |
|-------|----------|-----------|-----|------------|
| demo@memorias-eternas.local | Demo123! | 999 | admin | Super Admin - pruebas panel |
| huella@memorias-eternas.local | Demo123! | 4 | user | User regular - tier free |
| cielo@memorias-eternas.local | Demo123! | 10 | user | User premium |
| santuario@memorias-eternas.local | Demo123! | 30 | user | User premium+ |

---

## ⚙️ Endpoints API Disponibles

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/profiles` | Listar todos los memoriales | No |
| POST | `/api/profiles` | Crear nuevo memorial | Sí |
| PUT | `/api/profiles` | Actualizar memorial | Sí |
| DELETE | `/api/profiles?id=X` | Eliminar memorial | Sí |
| GET | `/api/tributes?profileId=X` | Ver tributos de un memorial | No |
| POST | `/api/tributes` | Crear tributo (cuesta estrellas) | Sí |
| DELETE | `/api/tributes?id=X` | Eliminar tributo | Sí |
| GET | `/api/user/stats` | Datos del usuario + estrellas | Sí |
| GET | `/api/stripe/checkout` | Listar paquetes estrellas | No |
| POST | `/api/stripe/checkout` | Crear sesión de compra (mock) | Sí |
| GET | `/api/admin/add-stars` | Listar usuarios (admin) | Sí (Admin) |
| POST | `/api/admin/add-stars` | Agregar estrellas a usuario | Sí (Admin) |

---

## 🎯 Flujo Completo de Prueba

```mermaid
1. Login (demo@memorias-eternas.local)
   ↓
2. Ver panel estrellas (StarsDisplay) - 999⭐
   ↓
3. Crear memorial (/create)
   ↓
4. Ver memorial en mapa (/map)
   ↓
5. Crear tributo en memorial (cuesta 1-3⭐)
   ↓
6. Verificar estrellas bajaron (998⭐)
   ↓
7. Ir a panel admin (/admin)
   ↓
8. Dar estrellas a otro usuario
   ↓
9. Verificar cambios en BD
   ↓
✅ TODO LISTO
```

---

## 🐛 Troubleshooting

### "Error 401 - Unauthorized"
- ✅ Verifica que estés logueado
- ✅ Cookies correctas en navegador

### "Insufficient stars" al crear tributo
- ✅ Normal - el usuario no tiene suficientes estrellas
- ✅ Usa admin para darle más: ir a `/admin`

### Memorial no aparece en mapa
- ✅ Verifica que se guardó en BD (SELECT * FROM animal_profiles)
- ✅ Recarga página (`F5`)
- ✅ Verifica lat/long son válidos

### Admin panel muestra "Access denied"
- ✅ Solo `demo@memorias-eternas.local` es admin
- ✅ Otros users no pueden acceder

---

## 📱 Integraciones Lista Para Producción

✅ **Completadas**:
- Prisma ORM + Neon PostgreSQL
- Autenticación local con sesiones
- CRUD operaciones para memoriales
- Sistema de estrellas
- Deducción de estrellas en tributos
- Panel admin
- Mock Stripe (listo para integración real)

⏳ **Pendiente (Optional)**:
- Stripe real (cambiar `/api/stripe/checkout`)
- Cloudinary para fotos (ahora placeholder)
- Email de confirmación
- Notificaciones push

---

**Última actualización**: 2024-11-17
**Estado**: ✅ LISTO PARA TESTING COMPLETO
