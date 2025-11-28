# 🚀 PRÓXIMOS PASOS - QUÉ HACER AHORA

## 1️⃣ EJECUTAR MIGRACIONES DE PRISMA

Primero, prueba conectar a la DB:

```bash
# Ejecutar migración inicial
npx prisma migrate dev --name init

# Esto:
# ✅ Crea todas las tablas en Neon PostgreSQL
# ✅ Genera types en node_modules/@prisma/client
# ✅ Te pide nombre de la migración (escribe "init")
```

Si hay error de conexión, verificar:
- `DATABASE_URL` en `.env` es correcto
- Neon PostgreSQL está activo

## 2️⃣ INICIALIZAR DEMO USERS EN BASE DE DATOS

La función `initializeDemoUsers()` ya está lista en `src/lib/auth-prisma.ts`.

**Crear un script de inicialización** en `src/app/layout.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { initializeDemoUsers } from '@/lib/auth-prisma';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar demo users UNA SOLA VEZ
    const initDemoUsers = async () => {
      try {
        await initializeDemoUsers();
      } catch (error) {
        console.error('Error initializing demo users:', error);
      }
    };
    
    initDemoUsers();
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

**O en un endpoint API** `src/app/api/init/route.ts`:

```typescript
import { initializeDemoUsers } from '@/lib/auth-prisma';

export async function GET() {
  try {
    await initializeDemoUsers();
    return Response.json({ success: true, message: 'Demo users initialized' });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
```

Luego llamar: `http://localhost:3000/api/init` desde el navegador

## 3️⃣ REEMPLAZAR auth.ts CON VERSIÓN PRISMA

```bash
# Opción A: Eliminar viejo y renombrar nuevo
rm src/lib/auth.ts
mv src/lib/auth-prisma.ts src/lib/auth.ts

# Opción B: Manualmente en VS Code
# 1. Abre src/lib/auth.ts
# 2. Selecciona TODO (Ctrl+A)
# 3. Copia contenido de src/lib/auth-prisma.ts
# 4. Pega sobre el viejo
```

## 4️⃣ CREAR ENDPOINTS API PARA PERFILES

Crear `src/app/api/profiles/route.ts`:

```typescript
import { getProfiles, createProfile, updateProfile, deleteProfile } from '@/lib/profilesService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const result = await getProfiles();
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = await createProfile(data.userId, data);
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const result = await updateProfile(data.id, data);
  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
  
  const result = await deleteProfile(id);
  return NextResponse.json(result);
}
```

## 5️⃣ CREAR ENDPOINTS API PARA TRIBUTOS

Crear `src/app/api/tributes/route.ts`:

```typescript
import { getTributes, createTribute, deleteTribute, getTributeStats } from '@/lib/tributesService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const profileId = searchParams.get('profileId');
  
  if (!profileId) {
    return NextResponse.json({ success: false, error: 'profileId required' }, { status: 400 });
  }
  
  const result = await getTributes(profileId);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = await createTribute(data.profileId, data);
  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
  
  const result = await deleteTribute(id);
  return NextResponse.json(result);
}
```

## 6️⃣ MIGRAR useProfiles HOOK

Actualizar `src/hooks/useProfiles.ts`:

```typescript
import { useState, useEffect } from 'react';
import type { AnimalProfile } from '@/types';

export function useProfiles() {
  const [profiles, setProfiles] = useState<AnimalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      setLoading(true);
      const response = await fetch('/api/profiles');
      const result = await response.json();
      
      if (result.success) {
        setProfiles(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching profiles');
    } finally {
      setLoading(false);
    }
  }

  async function createProfile(profile: Omit<AnimalProfile, 'id' | 'createdAt'>) {
    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const result = await response.json();
      
      if (result.success) {
        await fetchProfiles();
      }
      
      return result;
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Error creating profile' };
    }
  }

  // Agregar updateProfile, deleteProfile, searchProfiles similar...

  return {
    profiles,
    loading,
    error,
    fetchProfiles,
    createProfile
  };
}
```

## 7️⃣ ACTUALIZAR DataContext

Cambiar `src/contexts/DataContext.tsx`:

```typescript
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { AnimalProfile, Tribute } from '@/types';

interface DataContextType {
  profiles: AnimalProfile[];
  tributes: Tribute[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<AnimalProfile[]>([]);
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profilesRes = await fetch('/api/profiles');
        const profilesData = await profilesRes.json();
        
        if (profilesData.success) {
          setProfiles(profilesData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ profiles, tributes, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
```

## 8️⃣ ELIMINAR ARCHIVOS SUPABASE

```bash
# Eliminar archivos que ya NO se usan
rm src/lib/supabase.ts
rm .env.local
rm supabase-schema.sql
rm supabase-insert-demo-data.sql
rm supabase-verify-database.sql
```

## ✅ VERIFICACIÓN FINAL

1. ✅ `npm run dev` - ¿Compila sin errores?
2. ✅ Login con `demo@memorias-eternas.local` - ¿Funciona?
3. ✅ Login con `huella@memorias-eternas.local` - ¿Funciona?
4. ✅ Ver `/map` - ¿Carga memoriales de DB?
5. ✅ Crear memorial nuevo - ¿Se guarda en DB?
6. ✅ Dejar tributo - ¿Se guarda en DB?
7. ✅ Ver estrellas - ¿Disminuyen?
8. ✅ `/user/subscription` - ¿Dashboard visible solo en Premium+?
9. ✅ `/admin` - ¿Acceso solo con admin?

---

## 🎉 ¡LISTO!

Una vez completado todo esto, tu app estará:
- ✅ Usando Prisma + Neon PostgreSQL
- ✅ Con persistencia real en la base de datos
- ✅ Sistema de usuarios, memoriales, tributos funcional
- ✅ Sistema de estrellas y suscripciones en DB
- ✅ Admin panel protegido
- ✅ Sin dependencias de Supabase

