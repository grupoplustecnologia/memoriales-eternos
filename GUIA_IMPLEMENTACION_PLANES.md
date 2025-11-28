# 🔧 Guía de Implementación - Sistema de Planes y Puntos

## Acceso a Páginas

### 📄 Páginas Públicas
| URL | Propósito | Componentes |
|-----|----------|-------------|
| `/plans` | Ver y comparar planes | Plan cards, toggle billing, tabla comparativa |
| `/user/subscription` | Panel de usuario | Misiones, tienda de estrellas, historial |

---

## 🛠️ Cómo Usar los Componentes

### 1️⃣ **StarsShop** - Compra de estrellas

**Ubicación:** `/src/components/StarsShop.tsx`

**Dónde usarlo:**
- En página de suscripción del usuario
- En profile para comprar tributos premium
- En any page que necesite vender estrellas

**Uso:**
```typescript
'use client';
import { StarsShop } from '@/components/StarsShop';

export default function MiComponente() {
  return (
    <div>
      <StarsShop />
    </div>
  );
}
```

**Funcionalidad:**
- ✅ Muestra 3 paquetes (20, 60, 200 estrellas)
- ✅ Calcula descuentos automáticamente
- ✅ Badge "MEJOR OFERTA" en paquete medio
- ✅ Simula compra y muestra confirmación

---

### 2️⃣ **VisitsDashboard** - Estadísticas

**Ubicación:** `/src/components/VisitsDashboard.tsx`

**Dónde usarlo:**
- En profile/[id] page (solo si usuario tiene plan premium)
- En page de analytics
- En admin panel

**Props:**
```typescript
interface Props {
  profile: AnimalProfile;      // Perfil del memorial
  isPremium?: boolean;          // Si el usuario tiene plan premium
}
```

**Uso:**
```typescript
'use client';
import { VisitsDashboard } from '@/components/VisitsDashboard';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage({ profile }) {
  const { user } = useAuth();
  const isPremium = user?.subscriptionTier !== 'huella-eterna';

  return (
    <div>
      <VisitsDashboard 
        profile={profile} 
        isPremium={isPremium}
      />
    </div>
  );
}
```

**Funcionalidad:**
- 👁️ Muestra total de visitas y visitantes únicos
- 📊 Gráfico de barras: visitas por día de semana
- 🎨 Gráfico donut: tributos por tipo
- 📈 Desglose detallado de tributos
- 💡 Insights automáticos
- 🔒 Muestra prompt de upgrade si no es premium

---

### 3️⃣ **SpecialMomentsEditor** - Momentos especiales

**Ubicación:** `/src/components/SpecialMomentsEditor.tsx`

**Dónde usarlo:**
- En profile/[id] page (sección "Momentos Especiales")
- En create page para añadir durante creación
- En edit memorial

**Props:**
```typescript
interface Props {
  isPremium?: boolean;                    // Si tiene acceso a funciones premium
  userPlan?: 'huella-eterna' | 'cielo-estrellas' | 'santuario-premium';
  onSaveMoment?: (moment: any) => void;   // Callback cuando guarda
}
```

**Uso:**
```typescript
'use client';
import { SpecialMomentsEditor } from '@/components/SpecialMomentsEditor';

export default function ProfilePage() {
  const handleMomentSave = (moment) => {
    console.log('Momento guardado:', moment);
    // Guardar en BD
  };

  return (
    <SpecialMomentsEditor 
      userPlan="cielo-estrellas"
      isPremium={true}
      onSaveMoment={handleMomentSave}
    />
  );
}
```

**Funcionalidad:**
- 📝 6 tipos de momentos con restricciones por plan
- 🔒 Muestra qué planes desbloquean cada momento
- 💾 Editor de texto con placeholder emocional
- 📸 Guardado simulado (pronto integración con BD)
- ✅ Validación de contenido

**Tipos de momentos:**
| Momento | Plan Requerido | Emoji |
|---------|---|---|
| Primer Día Juntos | Cielo+ | 💫 |
| Último Adiós | Cielo+ | 🕯️ |
| Su Historia | Cielo+ | 📖 |
| Juguete Favorito | Premium | 🎾 |
| Cumpleaños | Premium | 🎂 |
| Aniversario | Premium | 💕 |

---

### 4️⃣ **EmotionalMissions** - Sistema de misiones

**Ubicación:** `/src/components/EmotionalMissions.tsx`

**Dónde usarlo:**
- En `/user/subscription` page (ya está integrado)
- En dashboard de usuario
- En sidebar como widget

**Props:**
```typescript
interface Props {
  onMissionComplete?: (starsEarned: number) => void;  // Callback cuando completa
}
```

**Uso:**
```typescript
'use client';
import { EmotionalMissions } from '@/components/EmotionalMissions';

export default function MisionesPage() {
  const handleMissionComplete = (starsEarned) => {
    console.log(`Ganaste ${starsEarned} estrellas`);
    // Actualizar estrellas del usuario
  };

  return (
    <EmotionalMissions onMissionComplete={handleMissionComplete} />
  );
}
```

**Funcionalidad:**
- 🎯 Muestra 6 misiones emocionales
- ✅ Marcar como completada
- ⭐ Suma estrellas ganadas
- 📊 Barra de progreso semanal
- 💾 Guarda en localStorage (pronto BD)
- 🔄 Se reinicia cada semana

**Misiones:**
| Misión | Icono | Estrellas | Descripción |
|--------|---|---|---|
| Vigilia Especial | 🕯️ | +1 | Visita 3 días seguidos |
| Comparte el Recuerdo | 📢 | +2 | Comparte en redes |
| Una Foto Vale Mil Palabras | 📸 | +1 | Sube una foto |
| Tesoro de Recuerdos | ✍️ | +1 | Escribe un recuerdo |
| Primer Tributo | 🌹 | +3 | Realiza primer tributo |
| Eco de Amor | 💬 | +1 | Comenta recuerdos |

---

## 📄 Páginas

### `/plans` - Página de planes

```typescript
// Ya está completa en src/app/plans/page.tsx
```

**Características:**
- 🔘 Toggle: Pago único vs Suscripción trimestral
- 📊 Tarjetas de planes (responsive)
- ⭐ Badge "Recomendado" en Premium
- 📋 Tabla comparativa completa
- ❓ FAQ
- 🎯 CTA final

**URL acceso:**
```
http://localhost:3000/plans
```

---

### `/user/subscription` - Dashboard de usuario

```typescript
// Ya está completo en src/app/user/subscription/page.tsx
```

**Características:**
- 🎯 Panel izquierdo con plan actual
- ⭐ Saldo de estrellas con breakdown
- 🛒 Integración de StarsShop
- 🎮 Integración de EmotionalMissions
- 📋 Historial de transacciones
- ❓ FAQ

**URL acceso:**
```
http://localhost:3000/user/subscription
```

---

## 🧬 Integración con Tipos

### Agregar a DataContext

```typescript
// En src/contexts/DataContext.tsx
interface DataContextType {
  // ... existing fields
  
  // Nuevo: Información de suscripción del usuario
  userSubscription?: {
    tier: SubscriptionTier;
    paymentType: PaymentType;
    stars: number;
    monthlyStars: number;
    subscriptionEndDate?: string;
  };
  
  // Nuevo: Métodos para manejo de suscripción
  updateUserStars?: (stars: number) => void;
  completeMission?: (missionId: string) => void;
  saveMoment?: (moment: SpecialMoment) => void;
}
```

### Ejemplo de uso en componente

```typescript
'use client';
import { useData } from '@/contexts/DataContext';
import { PLANS } from '@/types/index';

export function MiComponente() {
  const { userSubscription } = useData();
  
  const planInfo = PLANS[userSubscription?.tier || 'huella-eterna'];
  const isPremium = userSubscription?.tier !== 'huella-eterna';
  
  return (
    <div>
      <h1>{planInfo.emotionalName}</h1>
      <p>Estrellas disponibles: {userSubscription?.stars}</p>
    </div>
  );
}
```

---

## 🔗 Links Actualizados en Footer

```
Footer.tsx ahora incluye:
- /plans → "Planes y Precios"
- /user/subscription → "Mi Suscripción"
```

---

## 💻 Flujo de Usuario

### 1. Usuario Nuevo (Gratuito)
```
Inicio → Ver planes (/plans) → Crear memorial (free) 
→ Ver dashboard limitado → Ver CTA upgrade
```

### 2. Usuario Actualiza a Premium
```
Plan actual → Click "Actualizar" 
→ Página de pago (Stripe) → Confirmación 
→ Acceso a planes/misiones/momentos
```

### 3. Usuario Compra Estrellas
```
/user/subscription → StarsShop → Selecciona pack
→ Pago → Estrellas + en saldo → Usa en tributos
```

### 4. Usuario Completa Misiones
```
/user/subscription → EmotionalMissions 
→ Marca como completada → +X estrellas
→ Usa estrellas en tributos
```

---

## 🐛 Testing

### Test URLs (local)
```
http://localhost:3000/plans
http://localhost:3000/user/subscription
```

### Test Datos Simulados
- **Planes:** Hardcoded en `PLANS` en types
- **Estrellas:** Simuladas con estado local
- **Misiones:** Guardadas en localStorage
- **Estadísticas:** Números aleatorios (mock)

### Próximo: Integración BD
- Crear tablas en Supabase
- Conectar hooks a API routes
- Implementar Stripe/PayPal

---

## 📋 Checklist de Validación

✅ **Tipos completados**
- SubscriptionTier, PaymentType, SpecialMomentType, etc.
- PLANS, TRIBUTE_CONFIGS, EMOTIONAL_MISSIONS constantes

✅ **Componentes sin errores**
- StarsShop, VisitsDashboard, SpecialMomentsEditor, EmotionalMissions
- Todos validados con get_errors

✅ **Páginas funcionales**
- /plans con toggle y tabla comparativa
- /user/subscription con integración de componentes

✅ **Footer actualizado**
- Links a planes y suscripción

✅ **Documentación completa**
- SISTEMA_PLANES_Y_PUNTOS.md (descripción general)
- Guía de implementación (este archivo)

---

## 🎯 Próximos Pasos

1. **Integración con Supabase**
   - Crear tablas de suscripciones
   - Crear tablas de misiones completadas
   - Crear tabla de momentos especiales

2. **Integración con Stripe/PayPal**
   - Crear intents de pago
   - Manejar webhooks
   - Guardar transacciones

3. **Actualizar DataContext**
   - Cargar datos de suscripción del usuario
   - Sincronizar estrellas en tiempo real

4. **Agregar a Profile Page**
   - Mostrar VisitsDashboard si premium
   - Mostrar SpecialMomentsEditor
   - Integrar con TributesSection

5. **Email Automation**
   - Confirmación de pago
   - Renovación de suscripción
   - Recordatorios de misiones

---

**Estado:** ✅ **LISTO PARA PRODUCCIÓN (con BD)**

Todos los componentes están funcionales y listos para conectar con Supabase y Stripe.
