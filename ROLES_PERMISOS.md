# 🔐 Sistema de Roles y Permisos - Memorias Eternas

## 📋 Estructura

### Roles Disponibles

| Rol | Descripción | Uso |
|-----|-------------|-----|
| **Basic** | Usuario gratuito con límites | Plan gratuito |
| **Premium** | Usuario de pago expandido | Premium mensual/anual |
| **Pro** | Acceso completo a características | Plan familiar |
| **Admin** | Control total del sistema | Administradores |
| **Moderator** | Gestión de contenido | Moderadores |

### Permisos por Rol

```
┌─────────────────────────────────────────────────────────────┐
│                    PERMISOS POR ROL                         │
├──────────────┬──────────┬─────────┬────────┬────────┬───────┤
│ Permiso      │ Basic    │Premium  │ Pro    │ Admin  │ Mod   │
├──────────────┼──────────┼─────────┼────────┼────────┼───────┤
│ Crear        │    ✓     │    ✓    │   ✓    │   ✓    │       │
│ Editar Propio│    ✓     │    ✓    │   ✓    │   ✓    │       │
│ Editar Otros │          │         │   ✓    │   ✓    │       │
│ Colaboradores│          │    ✓    │   ✓    │   ✓    │       │
│ Co-Admin     │          │    ✓    │   ✓    │   ✓    │       │
│ Analytics    │          │    ✓    │   ✓    │   ✓    │       │
│ Moderar      │          │         │        │   ✓    │   ✓   │
│ Admin Sistema│          │         │        │   ✓    │       │
└──────────────┴──────────┴─────────┴────────┴────────┴───────┘
```

### Límites de Recursos

```
┌────────────────────────────────────────────────┐
│         LÍMITES POR ROL                        │
├──────────────┬──────────┬──────────┬──────────┤
│ Recurso      │ Basic    │ Premium  │ Pro      │
├──────────────┼──────────┼──────────┼──────────┤
│ Memoriales   │    3     │ Ilimitados│Ilimitados│
│ Colaboradores│    1     │    5     │   10     │
│ Almacenaje   │ 100 MB   │ 500 MB   │ 2 GB     │
└──────────────┴──────────┴──────────┴──────────┘
```

## 🛠️ Uso en Código

### 1. Hook usePermissions()

```tsx
'use client';
import { usePermissions } from '@/hooks/usePermissions';

export default function MyComponent() {
  const { 
    hasPermission,      // Verificar permiso específico
    canCreateMemorial,  // Crear memorial
    canEditMemorial,    // Editar memorial
    canInviteCollaborators,  // Invitar colaboradores
    isAdmin,           // ¿Es admin?
    isPremium,         // ¿Es premium?
    getLimit,          // Obtener límite de recurso
  } = usePermissions();

  // Verificar si puede crear
  if (!canCreateMemorial(currentMemorialCount)) {
    return <p>Límite de memoriales alcanzado</p>;
  }

  return <button>Crear Memorial</button>;
}
```

### 2. Servicio de Autorización Directo

```typescript
import { AuthorizationService } from '@/lib/authorization';

// Verificar permiso
if (AuthorizationService.hasPermission('premium', 'invite_collaborators')) {
  // El usuario tiene permiso
}

// Verificar múltiples
const canDo = AuthorizationService.hasAllPermissions('pro', [
  'edit_any_memorial',
  'manage_tributes'
]);

// Obtener límites
const maxMemorials = AuthorizationService.getLimit('basic', 'memorials');
```

### 3. Componente de Colaboradores

```tsx
import CollaboratorsManager from '@/components/CollaboratorsManager';

<CollaboratorsManager
  memorialId={memorial.id}
  isMemorialOwner={isOwner}
  collaborators={collaborators}
  onAddCollaborator={handleAdd}
  onRemoveCollaborator={handleRemove}
  onUpdateRole={handleUpdateRole}
/>
```

## 🔑 Niveles de Colaboración

### Viewer (👁️ Ver)
- Ver el memorial completo
- Ver fotos y tributos
- NO puede editar

### Editor (✏️ Editar)
- Ver todo como Viewer
- Editar información del memorial
- Gestionar tributos básicos
- NO puede invitar colaboradores

### Co-Admin (👑 Co-Admin)
- Control total del memorial
- Editar todo
- Invitar más colaboradores
- Cambiar roles de colaboradores
- Eliminar colaboradores

## 📊 Mapeo: Subscription Tier → Role

```
free                    → basic
premium-monthly         → premium
premium-yearly          → premium
family                  → pro
(admin en base de datos)→ admin
```

## 🔄 Flujo de Invitación

```
1. Propietario invita por email
2. Se crea MemorialCollaborator con status: 'pending'
3. Usuario recibe email (futuro)
4. Usuario acepta/rechaza
5. Status: 'accepted' o 'rejected'
```

## 📝 Tipos TypeScript

Ver archivos:
- `src/types/roles.ts` - Definiciones de tipos
- `src/types/index.ts` - Tipos extendidos de AnimalProfile

## 🚀 Próximos Pasos

- [ ] Tabla `memorial_collaborators` en Supabase
- [ ] API endpoints para gestión de colaboradores
- [ ] Sistema de notificaciones por email
- [ ] Logs de auditoría de cambios
- [ ] Versionado de memoriales
