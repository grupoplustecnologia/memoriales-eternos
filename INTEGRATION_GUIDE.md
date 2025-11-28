# 🔌 INTEGRACIÓN DE NUEVOS COMPONENTES - Guía Rápida

## Componentes Nuevos Creados

Estos 3 componentes están listos pero **aún no están integrados en las páginas principales**. Aquí está cómo hacerlo:

---

## 1️⃣ **StarsDisplay Component**

**Ubicación**: `src/components/StarsDisplay.tsx`

### Dónde Integrarlo

#### Opción A: Navbar (Recomendado)
```tsx
// src/components/Navbar.tsx o similar
import { StarsDisplay } from '@/components/StarsDisplay';
import { StarPurchaseModal } from '@/components/StarPurchaseModal';
import { useState } from 'react';

export function Navbar() {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
  return (
    <nav>
      {/* ... navbar content ... */}
      <StarsDisplay onPurchaseClick={() => setShowPurchaseModal(true)} />
      <StarPurchaseModal 
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />
    </nav>
  );
}
```

#### Opción B: Página de Inicio
```tsx
// src/app/page.tsx
import { StarsDisplay } from '@/components/StarsDisplay';
import { useState } from 'react';

export default function Home() {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
  return (
    <div>
      <StarsDisplay onPurchaseClick={() => setShowPurchaseModal(true)} />
      {/* ... página ... */}
    </div>
  );
}
```

#### Opción C: Perfil del Usuario
```tsx
// src/app/profile/page.tsx
import { StarsDisplay } from '@/components/StarsDisplay';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <StarsDisplay />
      {/* ... resto del perfil ... */}
    </div>
  );
}
```

---

## 2️⃣ **StarPurchaseModal Component**

**Ubicación**: `src/components/StarPurchaseModal.tsx`

### Propiedades (Props)
```typescript
interface StarPurchaseModalProps {
  isOpen: boolean;           // Mostrar/ocultar modal
  onClose: () => void;       // Callback cuando se cierra
  onSuccess?: () => void;    // Callback después de compra exitosa
}
```

### Ejemplo de Uso Completo
```tsx
'use client';

import { useState } from 'react';
import { StarPurchaseModal } from '@/components/StarPurchaseModal';
import { StarsDisplay } from '@/components/StarsDisplay';
import { Button } from '@/components/ui/button';

export function StarsSection() {
  const [showModal, setShowModal] = useState(false);

  const handlePurchaseSuccess = () => {
    // Recargar estrellas, actualizar UI, etc
    console.log('Compra exitosa!');
  };

  return (
    <div>
      <StarsDisplay onPurchaseClick={() => setShowModal(true)} />
      <StarPurchaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handlePurchaseSuccess}
      />
    </div>
  );
}
```

---

## 3️⃣ **AdminPanel Component**

**Ubicación**: `src/components/AdminPanel.tsx`

### Dónde Integrarlo

#### Opción Recomendada: Página Admin Dedicada
```tsx
// src/app/admin/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { AdminPanel } from '@/components/AdminPanel';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <p>Debes iniciar sesión para acceder al panel admin</p>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="container py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">⛔ Solo administradores pueden acceder</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <AdminPanel />
    </div>
  );
}
```

---

## 📋 Checklist de Integración

Marca estas cuando hayas integrado cada componente:

### StarsDisplay
- [ ] Importar componente
- [ ] Crear estado para StarPurchaseModal (useState)
- [ ] Pasar `onPurchaseClick` prop
- [ ] Probar que se muestre correctamente
- [ ] Verificar que se actualicen estrellas en tiempo real

### StarPurchaseModal
- [ ] Importar componente
- [ ] Pasar `isOpen`, `onClose`, `onSuccess`
- [ ] Probar que se abra/cierre
- [ ] Probar clic en paquete
- [ ] Probar compra (debe mostrar mensaje de éxito)

### AdminPanel
- [ ] Crear página `/admin` si no existe
- [ ] Importar y mostrar AdminPanel
- [ ] Verificar que solo admin pueda acceder
- [ ] Probar listar usuarios
- [ ] Probar agregar estrellas a usuario

---

## 🧪 Pruebas de Integración

Después de integrar, verifica:

```javascript
// En la consola del navegador (F12)

// 1. Verificar StarsDisplay funciona
console.log('StarsDisplay:', document.querySelector('[class*="yellow"]'));

// 2. Verificar que modales se abren/cierren
// Click en botón "Comprar Más ⭐" → debe abrir modal

// 3. Verificar AdminPanel acceso
// Como admin: http://localhost:3000/admin → debe cargar
// Como user normal: http://localhost:3000/admin → debe mostrar error

// 4. Verificar deducción de estrellas
// Antes: 999⭐
// Crear tributo (costo 1⭐)
// Después: 998⭐
```

---

## 🎯 Flujo Completo de Integración

```
1. Integra StarsDisplay en Navbar/Home
   ✓ Usuario ve sus estrellas
   
2. Integra StarPurchaseModal
   ✓ Usuario puede comprar estrellas (demo)
   
3. Integra AdminPanel en /admin
   ✓ Admin puede gestionar usuarios
   
4. Verifica deducción en tributos
   ✓ Cuando usuario crea tributo, estrellas se restan
   
5. Prueba flujo completo:
   - Login
   - Ver estrellas (999⭐)
   - Crear tributo (1⭐)
   - Ver estrellas reducidas (998⭐)
   - Como admin, dar 50⭐ a otro usuario
```

---

## 📚 Archivos de Referencia

| Archivo | Propósito |
|---------|----------|
| `src/components/StarsDisplay.tsx` | Widget de estrellas + countdown |
| `src/components/StarPurchaseModal.tsx` | Modal de compra |
| `src/components/AdminPanel.tsx` | Panel de administrador |
| `src/app/api/user/stats/route.ts` | GET /api/user/stats |
| `src/app/api/stripe/checkout/route.ts` | POST /api/stripe/checkout |
| `src/app/api/admin/add-stars/route.ts` | POST /api/admin/add-stars |

---

## ❓ FAQ

**P: ¿Dónde pongo StarsDisplay?**
R: Idealmente en Navbar o página principal para que sea visible siempre

**P: ¿Necesito actualizar useAuth()?**
R: No, useAuth() ya funciona con los nuevos endpoints

**P: ¿Qué pasa si el usuario no está autenticado?**
R: Los componentes validan automáticamente y muestran estado vacío o redirigen

**P: ¿Cómo sé si funcionan los endpoints?**
R: Abre DevTools (F12) → Network → crea tributo → deberías ver requests a `/api/tributes`, `/api/user/stats`, etc.

**P: ¿Puedo modificar StarsDisplay?**
R: Sí, es un componente React normal, puedes editarlo en `src/components/StarsDisplay.tsx`

---

**Próximos Pasos**: Integra estos componentes donde veas mejor en tu UI y disfruta del sistema de estrellas completo ⭐
