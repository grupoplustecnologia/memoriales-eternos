# 🌟 Sistema de Planes, Puntos y Gamificación Emocional

## 📋 Resumen General

Se ha implementado un **sistema completo de monetización ética y emocional** para Memorias Eternas, basado en tres planes con nombres emotivos, un sistema de puntos (Estrellas), misiones emocionales, momentos especiales y un dashboard de estadísticas.

---

## 🎯 Planes de Suscripción

### 1️⃣ **🌱 Huella Eterna** (Gratuito)
- **Para:** Quienes quieren mantener vivo el recuerdo de su compañero
- **Pago:** Gratis
- **Memoriales:** 1
- **Fotos:** 5 por memorial
- **Tributos:** 1 vela/corazón gratuito por semana
- **Estrellas mensuales:** 4 ⭐
- **Acceso:** Mapa mundial, epitafio personalizado, notas de texto

### 2️⃣ **✨ Cielo de Estrellas** (5€ pago único O 1€ cada 3 meses)
- **Para:** Familias que quieren un homenaje más completo
- **Memoriales:** Hasta 5
- **Fotos:** 20 por memorial
- **Tributos:** Ilimitados
- **Estrellas mensuales:** 10 ⭐
- **Extras:**
  - Personalización de fondos
  - Sin anuncios
  - 1 marco decorativo exclusivo
  - Momentos especiales (Primer Día, Último Adiós, Su Historia)

### 3️⃣ **👑 Santuario Premium** (10€ pago único O 3€ cada 3 meses)
- **Para:** La forma más completa de honrar a las mascotas
- **Memoriales:** Ilimitados
- **Fotos:** Ilimitadas
- **Videos:** Permitidos (hasta 1 minuto)
- **Tributos:** Ilimitados
- **Estrellas mensuales:** 30 ⭐
- **Extras:**
  - Todos los fondos y marcos exclusivos
  - Temas personalizados
  - Iconos especiales (corona, estrella dorada, flor celestial)
  - Momentos especiales ilimitados (incluye cumpleaños y aniversarios)
  - Soporte prioritario
  - Dashboard de visitas completo

---

## ⭐ Sistema de Puntos (Estrellas)

### ¿Qué son las Estrellas?
Moneda interna que permite a los usuarios interactuar de forma emocional con los memoriales sin obligar a nuevas compras.

### Cómo ganarlas
1. **Incluidas en el plan** (mensuales):
   - Huella Eterna: 4 ⭐/mes
   - Cielo de Estrellas: 10 ⭐/mes
   - Santuario Premium: 30 ⭐/mes

2. **Completando misiones emocionales**:
   - Vigilia Especial (visitar 3 días seguidos): +1 ⭐
   - Comparte el Recuerdo (redes sociales): +2 ⭐
   - Una Foto Vale Mil Palabras (subir foto): +1 ⭐
   - Tesoro de Recuerdos (escribir recuerdo): +1 ⭐
   - Primer Tributo: +3 ⭐
   - Eco de Amor (comentar recuerdos): +1 ⭐

3. **Compra de paquetes** (microtransacciones):
   - 20 estrellas → 1€
   - 60 estrellas → 2€ (17% descuento)
   - 200 estrellas → 5€ (34% descuento)

### Dónde usarlas
- 🕯️ **Vela Blanca** (1 ⭐) - Dura 24 horas
- ✨🕯️ **Vela Dorada** (5 ⭐) - Dura 7 días
- 🌹 **Flor** (2 ⭐) - Dura 3 días
- 🌸 **Flor Celestial** (10 ⭐) - Dura 14 días
- 👑🌹 **Corona de Flores** (25 ⭐) - Dura 30 días
- ❤️ **Corazón Eterno** (3 ⭐) - Dura 7 días
- 🎨 **Marcos y fondos exclusivos**
- ✨ **Pegatinas y insignias**

---

## 🎯 Momentos Especiales (Emotionales, no técnicos)

### Disponibles en cada plan

#### Cielo de Estrellas (✨):
- 💫 **Primer Día Juntos** - Cuenta cómo llegó a tu vida
- 🕯️ **Último Adiós** - Despídete con sinceridad
- 📖 **Su Historia** - Narra los momentos memorables

#### Santuario Premium (👑):
- Todos los anteriores +
- 🎾 **Juguete Favorito** - Habla sobre momentos de juego
- 🎂 **Celebra su Cumpleaños** - Marca con tributos especiales
- 💕 **Aniversario** - Honra cada año de compañía

### Cómo funcionan
1. Usuario selecciona un momento
2. Se abre editor con prompt emocional
3. Escribe el contenido (foto, video o texto)
4. Se guarda como sección permanente en el memorial

---

## 📊 Dashboard de Estadísticas (Planes de Pago)

### Métricas disponibles solo en planes premium:
- 👁️ **Total de visitas**
- 📅 **Visitas del mes**
- 💐 **Tributos recibidos** (con desglose por tipo)
- 📢 **Comparticiones en redes**
- 👥 **Visitantes únicos**
- 📈 **Gráficas de tendencias** (visitas por día)
- 🎨 **Distribución de tributos** (gráfico donut)

### Propósito
Permite a usuarios ver el impacto de su memorial en la comunidad, incentivando mantenimiento y nuevas historias.

---

## 🎮 Misiones Emocionales (Gamificación Suave)

No son "juegos" sino rituales afectivos que:
- Incentivan interacción regular
- Crean hábitos de revisita
- Generan contenido comunitario
- Recompensan acciones significativas

### Misiones disponibles:
1. **Vigilia Especial** (🕯️) - Visita 3 días seguidos (+1 ⭐)
2. **Comparte el Recuerdo** (📢) - Comparte en redes (+2 ⭐)
3. **Una Foto Vale Mil Palabras** (📸) - Sube una foto (+1 ⭐)
4. **Tesoro de Recuerdos** (✍️) - Escribe un recuerdo (+1 ⭐)
5. **Primer Tributo** (🌹) - Realiza tu primer tributo (+3 ⭐)
6. **Eco de Amor** (💬) - Comenta en recuerdos de otros (+1 ⭐)

**Reinicio:** Las misiones se reinician cada semana

---

## 📁 Estructura de Archivos

### Nuevos Tipos
```
src/types/index.ts
├── SubscriptionTier
├── PaymentType ('one-time' | 'subscription')
├── SpecialMomentType
├── UserStars
├── StarPurchase
├── MissionProgress
├── EmotionalMissionType
├── EmotionalMission
├── SpecialMoment
├── TributeConfig
├── PlanConfig
└── Constantes: PLANS, TRIBUTE_CONFIGS, EMOTIONAL_MISSIONS
```

### Nuevas Páginas
```
src/app/
├── plans/page.tsx (Comparativa de planes con toggle pago/suscripción)
└── user/subscription/page.tsx (Dashboard de usuario con misiones, estrellas, historial)
```

### Nuevos Componentes
```
src/components/
├── StarsShop.tsx (Compra de paquetes 20/60/200 estrellas)
├── VisitsDashboard.tsx (Gráficas de visitas y tributos - solo premium)
├── SpecialMomentsEditor.tsx (Editor de momentos especiales)
├── EmotionalMissions.tsx (Panel de misiones con progreso)
└── Footer.tsx (Actualizado con links a planes y suscripción)
```

---

## 💳 Modelo de Monetización

### Ingresos primarios:
1. **Pago único por plan** (descuento para conversión inmediata)
   - Cielo de Estrellas: 5€
   - Santuario Premium: 10€

2. **Suscripción trimestral** (acceso contínuo a beneficios)
   - Cielo de Estrellas: 1€ cada 3 meses
   - Santuario Premium: 3€ cada 3 meses

3. **Microtransacciones de estrellas** (50-80% de ingresos)
   - 20 ⭐ → 1€
   - 60 ⭐ → 2€
   - 200 ⭐ → 5€

### Ventajas del modelo:
✅ **Sin obligatoriedad**: Usuarios pueden tener plan gratuito indefinido  
✅ **Monetización ética**: No pay-to-win, solo pay-to-express  
✅ **Incentivos para actualización**: Cada tier desbloquea nuevas emociones  
✅ **Sostenibilidad**: Estrellas generan ingresos recurrentes  
✅ **Comunidad activa**: Misiones crean engagement sin presión

---

## 🔧 Integración en Aplicación

### En `DataContext` o `useAuth`:
```typescript
// Agregar a User:
userStars: number;
userPlan: SubscriptionTier;
paymentType: PaymentType;
subscriptionEndDate?: string;
```

### En Componentes de Memorial:
```typescript
<VisitsDashboard 
  profile={profile} 
  isPremium={userPlan !== 'huella-eterna'}
/>

<SpecialMomentsEditor 
  userPlan={userPlan}
  isPremium={true}
  onSaveMoment={handleMomentSave}
/>
```

### En Navbar (agregar):
```typescript
<Link href="/plans">Planes</Link>
<Link href="/user/subscription">Mi Suscripción</Link>
```

---

## 🎨 Colores y Theming

```
🌱 Huella Eterna: #7a8b62 (verde naturaleza)
✨ Cielo de Estrellas: #fbbf24 (dorado)
👑 Santuario Premium: #d4af37 (dorado premium)
```

---

## 📈 Próximos Pasos

1. **Integración con Supabase**:
   - Tabla `user_subscriptions`
   - Tabla `user_stars`
   - Tabla `completed_missions`
   - Tabla `special_moments`

2. **Pasarela de pago** (Stripe):
   - Payment intents para pagos únicos
   - Subscriptions API para suscripciones

3. **Email automation** (Resend):
   - Confirmación de pago
   - Renovación de suscripción
   - Recordatorios de misiones

4. **Analytics**:
   - Rastrear conversión (free → paid)
   - Monitorear ingresos por canal
   - Analizar misiones populares

---

## ✅ Validación

Todos los archivos han sido validados **sin errores TypeScript**:
- ✅ src/types/index.ts
- ✅ src/app/plans/page.tsx
- ✅ src/components/StarsShop.tsx
- ✅ src/components/VisitsDashboard.tsx
- ✅ src/components/SpecialMomentsEditor.tsx
- ✅ src/components/EmotionalMissions.tsx
- ✅ src/app/user/subscription/page.tsx
- ✅ src/components/Footer.tsx

---

## 🎯 Objetivo Final

Crear un **sistema de monetización emocional** que:
1. Respeta la naturaleza sensible del producto
2. Genera ingresos sostenibles sin presión
3. Incentiva engagement comunitario
4. Permite expresión emocional profunda
5. Es accesible para todos (gratis o premium)

**Cada compra es un acto de amor por la memoria de sus mascotas.** 🐾💕
