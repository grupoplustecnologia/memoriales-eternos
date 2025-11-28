✅ SISTEMA DE PERMISOS POR PLANES - IMPLEMENTADO

═══════════════════════════════════════════════════════════════════════

🎯 CAMBIOS REALIZADOS

═══════════════════════════════════════════════════════════════════════

## 1️⃣ NUEVO: Sistema de Permisos por Planes (src/lib/planPermissions.ts)

Archivo creado con la clase `PlanPermissionsService` que controla:

### PLAN 1: 🌱 HUELLA ETERNA (Gratuito)
- maxMemorials: 1 
- maxPhotosPerMemorial: 1 (solo foto principal)
- maxTributes: 1 (solo puede recibir 1 tributo)
- allowedTributeTypes: ['vela-blanca', 'corazon']
- canCreatePublicProfiles: false ❌ (NO aparece en grid de /map)
- mapMarkerSize: 'small' (emoji pequeño)
- mapMarkerHighlight: 'none' (sin destaque)
- weeklyHighlights: 0
- canHighlightProfiles: false

### PLAN 2: ✨ CIELO DE ESTRELLAS (€2.99 Trimestral)
- maxMemorials: 5
- maxPhotosPerMemorial: 2 (foto principal + 2 adicionales)
- maxTributes: -1 (ilimitados)
- allowedTributeTypes: ['vela-blanca', 'vela-dorada', 'flor', 'flor-celestial', 'corazon', 'angel']
- canCreatePublicProfiles: true ✅ (SÍ aparece en grid de /map)
- mapMarkerSize: 'medium' (tamaño normal)
- mapMarkerHighlight: 'normal' (sin color especial)
- weeklyHighlights: 0
- canHighlightProfiles: false

### PLAN 3: 👑 SANTUARIO PREMIUM (€6.99 Trimestral)
- maxMemorials: -1 (ilimitados)
- maxPhotosPerMemorial: -1 (ilimitadas)
- maxTributes: -1 (ilimitados)
- allowedTributeTypes: ['vela-blanca', 'vela-dorada', 'flor', 'flor-celestial', 'corona-flores', 'corazon', 'angel']
- canCreatePublicProfiles: true ✅ (SÍ aparece en grid de /map)
- mapMarkerSize: 'xlarge' (emoji X2 más grande)
- mapMarkerHighlight: 'red' (círculo rojo de fondo para destacar)
- weeklyHighlights: 5 (5 destacados semanales)
- canHighlightProfiles: true ✅ (puede destacar memoriales)

═══════════════════════════════════════════════════════════════════════

## 2️⃣ NUEVO: Utilidades de Filtrado de Tributos (src/lib/tributeFilters.ts)

Funciones:
- `getTributesForPlan(subscriptionTier)` - Obtiene tributos permitidos para un plan
- `getTributeInfo(tributeType)` - Información de un tributo específico
- `isTributeAllowedForPlan(tributeType, tier)` - Verifica si está permitido
- `getAllTributes()` - Obtiene todos los tributos

═══════════════════════════════════════════════════════════════════════

## 3️⃣ ACTUALIZADO: API Route de Tributos (src/app/api/tributes/route.ts)

✅ Agregadas validaciones:
- Importa `PlanPermissionsService`
- En POST: valida que el tipo de tributo sea permitido para el plan del visitante
- Retorna error 403 si intenta usar un tributo no permitido
- Verifica el plan del usuario autenticado

═══════════════════════════════════════════════════════════════════════

## 4️⃣ ACTUALIZADO: API Route de Perfiles (src/app/api/profiles/route.ts)

✅ Agregadas validaciones:
- Importa `PlanPermissionsService`
- En POST: valida que el usuario no haya excedido su límite de memoriales
- Cuenta memoriales existentes del usuario
- Retorna error 403 si intenta crear más de lo permitido
- Incluye mensaje claro sobre límite del plan

═══════════════════════════════════════════════════════════════════════

🚀 PRÓXIMAS IMPLEMENTACIONES NECESARIAS

═══════════════════════════════════════════════════════════════════════

## TAREA 1: Actualizar componente de crear tributo
Ubicación: src/components/ (buscar componente que renderiza tributos)
Cambios necesarios:
- Importar `getTributesForPlan()` de src/lib/tributeFilters.ts
- Filtrar tributos disponibles según el plan del usuario actual
- Esconder opciones de tributo no permitidas para el plan gratuito
- Mostrar solo: vela-blanca y corazon para huella-eterna

## TAREA 2: Actualizar InteractiveMap.tsx
Ubicaciones a cambiar:
1. Tamaño de emoji según mapMarkerSize del plan
   - small: 16-20px
   - medium: 24-28px (actual)
   - xlarge: 48-56px (X2 más grande)

2. Destacado del marcador según mapMarkerHighlight
   - none: sin cambios
   - normal: borde o sombra sutil
   - red: círculo de fondo rojo (#ef4444 o similar)

3. Grid de fotos en /map:
   - Mostrar SOLO memoriales donde canCreatePublicProfiles = true
   - Plan gratuito NO aparece en el grid
   - Plan premium y pro SÍ aparecen
   - Plan premium pro + destacado = primeros en el grid

## TAREA 3: Crear página de gestión de destacados
Ubicación: /admin o new page /profile/highlights
- Solo visible para usuarios con canHighlightProfiles = true
- Mostrar lista de memoriales del usuario
- Botón "Destacar esta semana"
- Mostrar contador: X/5 destacados usados esta semana
- Vista previa de cómo aparecerá en el mapa

## TAREA 4: Validar fotos en memorial
Ubicación: API route POST /api/profiles o componente de upload
Cambios:
- Validar maxPhotosPerMemorial según plan
- Plan gratuito: solo 1 foto
- Plan premium: máximo 2 fotos adicionales + principal
- Plan pro: ilimitadas

## TAREA 5: BD - Agregar campos para destacados
Schema (Prisma):
```prisma
model ProfileHighlight {
  id String @id @default(cuid())
  profileId String
  profile AnimalProfile @relation(fields: [profileId], references: [id])
  weekStartDate DateTime
  isActive Boolean @default(true)
  createdAt DateTime @default(now())
  @@unique([profileId, weekStartDate])
}
```

## TAREA 6: Datos en Auth
Cuando usuario se registra:
- subscriptionTier = 'huella-eterna' (gratuito por defecto)
- Aplicar todas las restricciones automáticamente

═══════════════════════════════════════════════════════════════════════

✅ LO QUE YA ESTÁ FUNCIONANDO

═══════════════════════════════════════════════════════════════════════

✅ Sistema de permisos central definido
✅ Validación de tipos de tributo en API
✅ Validación de límite de memoriales en API
✅ Filtros de tributos listos para usar en componentes
✅ Estructura escalable para futuras restricciones

═══════════════════════════════════════════════════════════════════════

📋 CÓMO USAR EN COMPONENTES

═══════════════════════════════════════════════════════════════════════

1. Filtrar tributos disponibles:
```typescript
import { getTributesForPlan } from '@/lib/tributeFilters';

const availableTributes = getTributesForPlan(user.subscriptionTier);
// Retorna solo: [vela-blanca, corazon] para plan gratuito
```

2. Verificar si un tributo está permitido:
```typescript
import { isTributeAllowedForPlan } from '@/lib/tributeFilters';

if (isTributeAllowedForPlan('flor', user.subscriptionTier)) {
  // Mostrar opción de flor
}
```

3. Obtener permisos completos del plan:
```typescript
import { PlanPermissionsService } from '@/lib/planPermissions';

const permissions = PlanPermissionsService.getPermissions(user.subscriptionTier);
console.log(permissions.maxMemorials); // 1, 5, o -1
console.log(permissions.mapMarkerSize); // 'small', 'medium', 'xlarge'
console.log(permissions.canHighlightProfiles); // true/false
```

═══════════════════════════════════════════════════════════════════════
