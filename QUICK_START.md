# ⚡ QUICK START - Comienza Aquí

## 🚀 En 5 Minutos

### **Paso 1: Inicia el servidor**
```bash
npm run dev
# Espera a ver: "✓ Ready in XXXms"
```

### **Paso 2: Abre el navegador**
```
http://localhost:3000/auth/login
```

### **Paso 3: Login con demo**
```
Email: demo@memorias-eternas.local
Password: Demo123!
```

### **Paso 4: Prueba las funciones**

#### A) Crear Memorial
```
/create → Completa 5 pasos → "¡Memorial creado!"
```

#### B) Ver Estrellas
```
En cualquier página, deberías ver un widget:
💫 999 Estrellas | 🎁 Recarga en 30 días
```

#### C) Crear Tributo (Deducción de Estrellas)
```
/map → Click en memorial → "Enviar Tributo" (cuesta 1-3⭐)
```

#### D) Panel Admin
```
/admin → Ver usuarios → Dar estrellas a otros
```

---

## 📊 Datos a Verificar

### **En el Navegador (DevTools F12)**

**Network tab**:
- POST `/api/profiles` ✓ (crear memorial)
- POST `/api/tributes` ✓ (crear tributo)
- GET `/api/user/stats` ✓ (obtener estrellas)
- POST `/api/stripe/checkout` ✓ (comprar estrellas)
- POST `/api/admin/add-stars` ✓ (admin da estrellas)

**Console tab**:
- Sin errores críticos ✓
- Logs de operaciones ✓

---

## 🗄️ Base de Datos - Verificar

Conecta a Neon PostgreSQL y corre:

```sql
-- Ver usuarios demo
SELECT email, stars, role FROM users LIMIT 4;

-- Ver memoriales creados
SELECT name, animal_type, latitude, longitude FROM animal_profiles LIMIT 5;

-- Ver tributos (si creaste alguno)
SELECT visitor_name, tribute_type, stars_spent FROM tributes;

-- Ver compras demo
SELECT user_id, amount FROM star_purchases ORDER BY created_at DESC;

-- Ver logs admin
SELECT action, entity_id FROM admin_logs;
```

---

## 🎯 Flujo Recomendado de Testing

```
1. LOGIN
   ↓
2. VER ESTRELLAS (999⭐)
   ↓
3. CREAR MEMORIAL
   ↓
4. VER EN MAPA
   ↓
5. CREAR TRIBUTO (1⭐)
   ↓
6. VERIFICAR ESTRELLAS BAJARON (998⭐)
   ↓
7. IR A ADMIN (/admin)
   ↓
8. DAR 50⭐ A OTRO USUARIO
   ↓
✅ LISTO
```

---

## 🆘 Si Algo Falla

| Problema | Solución |
|----------|----------|
| "Cannot find module" | `npm install` |
| "Database connection error" | Verifica `.env.local` con Neon URL |
| "401 Unauthorized" | Logout y login de nuevo |
| "Memorial no aparece en mapa" | F5 para recargar, verifica lat/long |
| "Admin panel dice 'Access denied'" | Usa `demo@memorias-eternas.local` |

---

## 📚 Archivos Principales

```
src/
├── app/
│   ├── create/page.tsx ........................ Crear memorial
│   ├── map/page.tsx .......................... Ver memoriales en mapa
│   ├── profile/[id]/page.tsx ................. Detalle + tributos
│   ├── admin/page.tsx ........................ Panel admin
│   └── api/
│       ├── profiles/route.ts ................. CRUD memoriales
│       ├── tributes/route.ts ................. CRUD tributos (cuesta estrellas)
│       ├── user/stats/route.ts ............... Estadísticas usuario
│       ├── stripe/checkout/route.ts ......... Compra estrellas (mock)
│       └── admin/add-stars/route.ts ......... Admin agrega estrellas
├── components/
│   ├── StarsDisplay.tsx ..................... Widget de estrellas
│   ├── StarPurchaseModal.tsx ................ Modal de compra
│   └── AdminPanel.tsx ....................... Panel admin
└── lib/
    ├── auth.ts .............................. Autenticación
    ├── profilesService.ts ................... Servicios memoriales
    └── tributesService.ts ................... Servicios tributos (+ deducción)
```

---

## 💡 Cambios Principales Hoy

| Cambio | Antes | Ahora |
|--------|-------|-------|
| **Crear memorial** | Solo log + redirect | Guarda en BD ✓ |
| **Estrellas** | No existía | Widget + sistema completo |
| **Comprar estrellas** | No existía | Modal + mock Stripe |
| **Deducción tributos** | No validaba | Valida + deduce automático |
| **Admin** | No existía | Panel completo + logs |

---

## 🎓 Entender el Flujo

### **De Formulario a Base de Datos**
```
/create (Form)
  ↓
handleSubmit() FormData
  ↓
POST /api/profiles
  ↓
Prisma.animalProfile.create()
  ↓
Neon PostgreSQL
  ↓
✓ Guardado
```

### **De Tributo a Deducción**
```
/profile/[id] (Crear tributo)
  ↓
POST /api/tributes
  ↓
tributesService.createTribute()
  ↓
Validar: user.stars >= costo
  ↓
user.stars -= costo (Prisma)
  ↓
tribute.create()
  ↓
✓ Guardado + estrellas deducidas
```

### **De Admin a Auditoría**
```
/admin (Agregar estrellas)
  ↓
POST /api/admin/add-stars
  ↓
Verificar: user.role === 'admin'
  ↓
user.stars += amount
  ↓
adminLog.create() (Auditoría)
  ↓
✓ Guardado + registrado
```

---

## ⭐ Demo Users

| Email | Password | Estrellas | Rol |
|-------|----------|-----------|-----|
| demo@memorias-eternas.local | Demo123! | 999 | **admin** |
| huella@memorias-eternas.local | Demo123! | 4 | user |
| cielo@memorias-eternas.local | Demo123! | 10 | user |
| santuario@memorias-eternas.local | Demo123! | 30 | user |

Prueba todo con estos 4 usuarios!

---

## 🔗 Links Útiles

- **Mapa**: http://localhost:3000/map
- **Crear Memorial**: http://localhost:3000/create
- **Admin Panel**: http://localhost:3000/admin
- **Login**: http://localhost:3000/auth/login
- **Registro**: http://localhost:3000/auth/register

---

## 📖 Documentación Completa

- `RESUMEN_CAMBIOS.md` - Resumen ejecutivo de todos los cambios
- `TESTING_GUIDE.md` - Guía detallada de pruebas
- `INTEGRATION_GUIDE.md` - Cómo integrar componentes

---

**¡Listo! Ahora ve a http://localhost:3000 y diviértete probando 🚀**
