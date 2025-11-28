# 📋 Ejemplo de Integración en Profile Page

## Cómo agregar los nuevos componentes al perfil de memorial

### Estructura sugerida para `/profile/[id]/page.tsx`

```typescript
'use client';

import React from 'react';
import { use } from 'react';
import { AnimalProfile } from '@/types/index';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';

// Componentes existentes
import { TributesSection } from '@/components/TributesSection';
import { ShareMemorialSection } from '@/components/ShareMemorialSection';
import { RichSnippet } from '@/components/RichSnippet';

// NUEVOS componentes
import { VisitsDashboard } from '@/components/VisitsDashboard';
import { SpecialMomentsEditor } from '@/components/SpecialMomentsEditor';

interface Params {
  id: string;
}

export default function ProfilePage(props: { params: Promise<Params> }) {
  const params = use(props.params);
  const { user } = useAuth();
  const { profiles } = useData();

  // Buscar el perfil
  const profile = profiles?.find((p: AnimalProfile) => p.id === params.id);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Memorial no encontrado</p>
      </div>
    );
  }

  // Determinar si es dueño del memorial
  const isOwner = user?.id === profile.userId;

  // Determinar si tiene plan premium
  const isPremium = user?.subscriptionTier && 
    user.subscriptionTier !== 'huella-eterna';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* SEO JSON-LD */}
        <RichSnippet profile={profile} />

        {/* ==================== SECCIÓN SUPERIOR ==================== */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Foto Principal y Básico */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {profile.name}
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  {profile.breed && `${profile.breed} • `}
                  {profile.animalType}
                </p>
                <p className="text-gray-700 mb-4">{profile.story}</p>
                <p className="italic text-gray-600 text-lg border-l-4 border-golden-400 pl-4">
                  "{profile.epitaph}"
                </p>
              </div>
            </div>
          </div>

          {/* Info Lateral */}
          <div className="space-y-4">
            {/* Plan Info si es owner */}
            {isOwner && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">👤</span>
                  <p className="font-semibold text-gray-900">Tu Memorial</p>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  {isPremium ? (
                    <>✨ Plan Premium activo</>
                  ) : (
                    <>🌱 Plan Gratuito</>
                  )}
                </p>
                <a href="/user/subscription" className="text-sky-600 hover:text-sky-700 text-sm font-semibold">
                  Ver mi suscripción →
                </a>
              </div>
            )}

            {/* Ubicación */}
            <div className="bg-white rounded-lg shadow p-4 border-t-4 border-sky-400">
              <p className="text-sm text-gray-600">Ubicación</p>
              <p className="font-semibold text-gray-900">
                {profile.latitude.toFixed(2)}°, {profile.longitude.toFixed(2)}°
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Visible en el mapa mundial
              </p>
            </div>

            {/* Fechas */}
            <div className="bg-white rounded-lg shadow p-4 border-t-4 border-rose-400">
              <p className="text-sm text-gray-600">Desde - Hasta</p>
              <p className="font-semibold text-gray-900">
                {new Date(profile.birthDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} - {new Date(profile.deathDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* CTA para actualizar */}
            {isOwner && !isPremium && (
              <div className="bg-gradient-to-br from-golden-100 to-yellow-100 rounded-lg p-4 border-2 border-golden-300">
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  ✨ Actualiza tu plan
                </p>
                <p className="text-xs text-gray-700 mb-3">
                  Acceso a momentos especiales, estadísticas y más.
                </p>
                <a href="/plans" className="block text-center bg-golden-500 text-white px-4 py-2 rounded font-semibold hover:bg-golden-600 transition-colors text-sm">
                  Ver planes →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ==================== SECCIÓN GALERÍA ==================== */}
        {profile.gallery && profile.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📸 Galería
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {profile.gallery.map((photo, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== MOMENTOS ESPECIALES (NUEVO) ==================== */}
        {isOwner && (
          <div className="mb-12">
            <SpecialMomentsEditor
              userPlan={user?.subscriptionTier || 'huella-eterna'}
              isPremium={isPremium}
              onSaveMoment={(moment) => {
                console.log('Momento guardado:', moment);
                // Aquí irá la lógica para guardar en BD
              }}
            />
          </div>
        )}

        {/* ==================== ESTADÍSTICAS (NUEVO) ==================== */}
        {isOwner && (
          <div className="mb-12">
            <VisitsDashboard
              profile={profile}
              isPremium={isPremium}
            />
          </div>
        )}

        {/* ==================== TRIBUTOS ==================== */}
        <div className="mb-12">
          <TributesSection profileId={profile.id} />
        </div>

        {/* ==================== COMPARTIR ==================== */}
        <div className="mb-12">
          <ShareMemorialSection
            profile={profile}
            isPremium={isPremium}
          />
        </div>

        {/* ==================== FOOTER CONTEXTO ==================== */}
        <div className="text-center text-gray-600 text-sm py-8 border-t border-gray-200">
          <p>
            Este memorial fue creado el {new Date(profile.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## Cambios Necesarios en Componentes Existentes

### `TributesSection.tsx` - Agregar texto informativo sobre planes

```typescript
// En TributesSection, antes de mostrar seleccione tributo:
{!isPremium && (
  <div className="bg-golden-50 border-2 border-golden-200 rounded-lg p-4 mb-4">
    <p className="text-sm">
      <span className="font-semibold">✨ Tributos Premium:</span> Actualiza tu plan para tributos especiales como velas doradas y flores celestiales.
    </p>
    <a href="/plans" className="text-sky-600 hover:text-sky-700 font-semibold text-sm">
      Ver planes →
    </a>
  </div>
)}
```

### `ShareMemorialSection.tsx` - Igual estructura

```typescript
// Agregar CTA para planes premium si aplica
{!isPremium && <PremiumFeaturePrompt />}
```

---

## Cálculo de Plan Usuario

```typescript
// Helper para determinar plan del usuario
export function getUserPlanInfo(user: any) {
  if (!user) {
    return {
      tier: 'huella-eterna',
      isPremium: false,
      monthlyStars: 4,
      maxMemorials: 1,
      maxPhotos: 5,
      features: ['Básico']
    };
  }

  const planDetails = {
    'huella-eterna': {
      isPremium: false,
      monthlyStars: 4,
      maxMemorials: 1,
      maxPhotos: 5
    },
    'cielo-estrellas': {
      isPremium: true,
      monthlyStars: 10,
      maxMemorials: 5,
      maxPhotos: 20
    },
    'santuario-premium': {
      isPremium: true,
      monthlyStars: 30,
      maxMemorials: -1,
      maxPhotos: -1
    }
  };

  return {
    tier: user.subscriptionTier,
    ...planDetails[user.subscriptionTier]
  };
}
```

---

## Flujo de Datos Propuesto

```
ProfilePage
├── user data (auth)
├── profile data (data context)
├── isPremium (computed)
│
├── SpecialMomentsEditor
│   ├── userPlan
│   ├── isPremium
│   └── onSaveMoment() → guardar en BD
│
├── VisitsDashboard
│   ├── profile
│   └── isPremium → mostrar o "upgrade"
│
├── TributesSection
│   ├── profileId
│   └── isPremium → mostrar or "upgrade"
│
└── ShareMemorialSection
    ├── profile
    └── isPremium → funciones limitadas
```

---

## Testing del Flujo

### Test 1: Usuario Gratuito
```
1. Navegar a /profile/[id] como usuario no propietario
2. ✓ No ver SpecialMomentsEditor
3. ✓ Ver VisitsDashboard con prompt de upgrade
4. ✓ Ver TributesSection con opciones limitadas
```

### Test 2: Usuario Premium
```
1. Navegar a /profile/[id] como propietario con plan Cielo+
2. ✓ Ver SpecialMomentsEditor con 3 momentos disponibles
3. ✓ Ver VisitsDashboard completo con gráficas
4. ✓ Ver TributesSection sin restricciones
```

### Test 3: Usuario Santuario
```
1. Navegar a /profile/[id] como propietario con plan Premium
2. ✓ Ver SpecialMomentsEditor con 6 momentos
3. ✓ Ver VisitsDashboard completo
4. ✓ Ver TributesSection con premium ilimitados
```

---

## URLs para Testing Locales

```
http://localhost:3000/plans
http://localhost:3000/user/subscription
http://localhost:3000/profile/[any-id]
```

---

**Notas:**
- Los datos de perfil son mock data por ahora
- Las estadísticas muestran números simulados
- Las misiones se guardan en localStorage
- Próximo paso: integración Supabase
