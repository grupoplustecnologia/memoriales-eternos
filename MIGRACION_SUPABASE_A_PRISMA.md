# PLAN DE MIGRACIÓN DE SUPABASE A PRISMA + NEON POSTGRESQL

## ✅ COMPLETADO

### 1. **Schema de Prisma** ✅
- Archivo: `prisma/schema.prisma`
- Modelos creados: User, Session, AnimalProfile, Tribute, StarPurchase, MissionProgress, SpecialMoment, MemorialCollaborator, AdminLog
- **Estado**: COMPLETADO - Schema listo para ejecutar migraciones

### 2. **Archivos de Utilidades Creados** ✅
- `src/lib/prisma.ts` - Cliente singleton de Prisma
- `src/lib/profilesService.ts` - Funciones CRUD para perfiles con Prisma
- `src/lib/tributesService.ts` - Funciones CRUD para tributos con Prisma
- `src/lib/auth-prisma.ts` - Sistema de autenticación migrado a Prisma

### 3. **Variables de Entorno** ✅
- `.env` contiene `DATABASE_URL` de Neon PostgreSQL (✅ CORRECTO)
- No se necesita `NEXT_PUBLIC_SUPABASE_URL` ni `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## ⏳ PRÓXIMOS PASOS (Para ejecutar después)

### Paso 1: Ejecutar Migraciones de Prisma
```bash
# Esto creará todas las tablas en Neon PostgreSQL
npx prisma migrate dev --name init

# O si ya tienes las tablas:
npx prisma db push
```

### Paso 2: Migrar auth.ts (MANUAL)
**Archivo a cambiar**: `src/lib/auth.ts`
- Actualmente: 446 líneas con lógica en-memoria
- Cambiar por: Contenido de `src/lib/auth-prisma.ts`
- Pasos:
  1. Borrar `src/lib/auth.ts`
  2. Renombrar `src/lib/auth-prisma.ts` → `src/lib/auth.ts`
  3. Actualizar imports en todo el proyecto

### Paso 3: Migrar DataContext
**Archivo**: `src/contexts/DataContext.tsx`
- Cambiar de:
  ```tsx
  const profiles = mockProfiles;
  const tributes = mockTributes;
  ```
- A: Llamadas API que usan Prisma

### Paso 4: Crear Endpoints API para Perfiles
**Crear**: `src/app/api/profiles/route.ts`
```typescript
import { getProfiles, createProfile } from '@/lib/profilesService';

export async function GET() {
  return Response.json(await getProfiles());
}

export async function POST(req: Request) {
  const data = await req.json();
  return Response.json(await createProfile(data.userId, data));
}
```

### Paso 5: Crear Endpoints API para Tributos
**Crear**: `src/app/api/tributes/route.ts`
```typescript
import { getTributes, createTribute } from '@/lib/tributesService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const profileId = searchParams.get('profileId');
  return Response.json(await getTributes(profileId || ''));
}

export async function POST(req: Request) {
  const data = await req.json();
  return Response.json(await createTribute(data.profileId, data));
}
```

### Paso 6: Migrar Hooks
**useProfiles.ts** - Cambiar de Supabase a API Prisma
**useTributes.ts** - Cambiar de Supabase a API Prisma

### Paso 7: Eliminar Archivos Supabase
```bash
rm src/lib/supabase.ts
rm .env.local
rm supabase-*.sql
```

---

## 📋 LISTA DE ARCHIVOS MODIFICADOS

### ✅ Creados:
1. `src/lib/prisma.ts` - Cliente Prisma
2. `src/lib/profilesService.ts` - CRUD de perfiles
3. `src/lib/tributesService.ts` - CRUD de tributos
4. `src/lib/auth-prisma.ts` - Auth con Prisma
5. `prisma/schema.prisma` - Schema de DB (ACTUALIZADO)

### ⏳ Por cambiar (después de migraciones):
1. `src/lib/auth.ts` → Reemplazar por `auth-prisma.ts`
2. `src/contexts/DataContext.tsx` → Usar API endpoints
3. `src/hooks/useProfiles.ts` → Llamar endpoints API
4. `src/hooks/useTributes.ts` → Llamar endpoints API
5. `src/app/api/auth/*` → Actualizar para Prisma

### ❌ Por eliminar:
1. `src/lib/supabase.ts` - NO SE USA
2. `.env.local` - NO SE NECESITA
3. `supabase-schema.sql` - NO SE NECESITA
4. `supabase-insert-demo-data.sql` - NO SE NECESITA
5. `supabase-verify-database.sql` - NO SE NECESITA

---

## 🔑 CAMBIOS CLAVE

### Base de Datos
- **Antes**: Supabase (servidor) + localStorage (cliente)
- **Ahora**: Neon PostgreSQL (servidor) + Prisma ORM

### Autenticación
- **Antes**: En-memoria + localStorage
- **Ahora**: Prisma + Neon (persistencia real)

### Demo Users
- Se crean automáticamente al iniciar la app (cuando `initializeDemoUsers()` se ejecuta)
- Se guardan en la base de datos real

### Estrellas & Sistema de Puntos
- **Antes**: En memoria en User
- **Ahora**: En tabla `users.stars` + tabla `star_purchases`
- **Misiones**: Tabla `mission_progress`
- **Momentos Especiales**: Tabla `special_moments`

---

## 🚀 VERIFICACIÓN CHECKLIST

Después de completar los pasos:

- [ ] `npm run dev` compila sin errores
- [ ] `npx prisma migrate dev` ejecuta exitosamente
- [ ] Demo users se crean en la DB
- [ ] Login con demo@memorias-eternas.local funciona
- [ ] Perfiles se guardan en DB
- [ ] Tributos se guardan en DB
- [ ] Estrellas persisten
- [ ] Dashboard solo visible con Premium+
- [ ] Admin panel solo para demo@memorias-eternas.local
- [ ] Todos los 3 usuarios demo tienen roles correctos

---

## 📊 RESUMEN DE MIGRACIÓN

| Componente | Antes | Ahora | Estado |
|-----------|-------|-------|--------|
| DB | Supabase | Neon + Prisma | ✅ |
| Auth | En-memoria | Prisma | ⏳ |
| Perfiles | Mock data | Prisma | ⏳ |
| Tributos | Mock data | Prisma | ⏳ |
| Estrellas | En-memoria | Prisma | ✅ |
| API | No existía | Endpoints | ⏳ |
| Hooks | Supabase | API calls | ⏳ |
| Context | Mock/Supabase | API calls | ⏳ |

---

## ⚠️ NOTAS IMPORTANTES

1. **DATABASE_URL debe estar en `.env`** (no `.env.local`)
2. **initializeDemoUsers()** debe llamarse después de conectar a DB
3. **Funciones de auth ahora son async** - necesitan `await`
4. **Prisma client es singleton** - reutiliza conexión en dev
5. **Las relaciones Foreign Key se manejan automáticamente**

---

## 🔗 REFERENCIAS

- Prisma Docs: https://www.prisma.io/docs/
- Neon Docs: https://neon.tech/docs/
- Schema: `prisma/schema.prisma`
- Services: `src/lib/profilesService.ts`, `src/lib/tributesService.ts`
- Auth: `src/lib/auth-prisma.ts`

