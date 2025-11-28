# 🗺️ Mapa de Navegación - Sistema de Planes y Puntos

## Flujo de Usuario Completo

```
┌─────────────────────────────────────────────────────────────────────┐
│                     USUARIO NUEVO EN LA APP                         │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Inicio (/page)  │
                    └──────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌──────────────┐         ┌──────────────────┐
        │ Ver Planes   │         │ Crear Memorial   │
        │  (/plans)    │         │  (/create)       │
        │              │         │                  │
        │ • Comparar   │         │ • Fotos          │
        │ • Leer FAQ   │         │ • Descripción    │
        │ • Entender   │         │ • Historia       │
        └──────────────┘         └──────────────────┘
                │                           │
                └─────────────┬─────────────┘
                              │
                        ┌─────▼──────┐
                        │ Registrarse│
                        │ (/register)│
                        └─────┬──────┘
                              │
                ┌─────────────────────────────┐
                │  USUARIO REGISTRADO (FREE)  │
                └─────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌──────────────┐         ┌──────────────────┐
        │ Ver Memorial │         │  Mi Suscripción  │
        │ (/profile)   │         │ (/user/subscr)   │
        │              │         │                  │
        │ • Tributos   │         │ • Ver plan FREE  │
        │ • Galería    │         │ • 4⭐/mes        │
        │ • Compartir  │         │ • Misiones       │
        │ • (Limitado) │         │ • Tienda ⭐     │
        └──────────────┘         └──────────────────┘
                │                           │
                │                   ┌───────▼──────┐
                │                   │ Completar    │
                │                   │ Misión       │
                │                   │              │
                │                   │ +1 a +3 ⭐  │
                │                   └──────────────┘
                │
                │ "Quiero más funciones..."
                │
                └──────────────────────┐
                                       │
                              ┌────────▼────────┐
                              │  Ver Planes     │
                              │  (/plans)       │
                              │                 │
                              │ • Compare       │
                              │ • Lee FAQ       │
                              │ • Elige plan    │
                              └────────┬────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
                    ▼                                     ▼
        ┌──────────────────────┐         ┌──────────────────────┐
        │ Comprar Pago Único   │         │ Comprar Suscripción  │
        │                      │         │                      │
        │ Cielo: 5€ único      │         │ Cielo: 1€/3 meses   │
        │ Premium: 10€ único   │         │ Premium: 3€/3 meses │
        │                      │         │                      │
        │ Stripe Payment       │         │ Stripe Subscription  │
        └──────────────────────┘         └──────────────────────┘
                    │                            │
                    └────────────┬────────────────┘
                                 │
                    ┌────────────▼──────────────┐
                    │ USUARIO PREMIUM ACTIVO    │
                    └────────────┬──────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
        ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
        │ Mi Perfil    │  │ Memorial     │  │ Mi Suscripción
        │              │  │              │  │
        │ • Ver plan   │  │ • Momentos   │  │ • Plan Premium
        │ • Editar     │  │ • Estadísticas  │ • 10-30⭐/mes
        │ • Momentos   │  │ • Visitas    │  │ • Misiones
        │ • Ver ⭐    │  │ • Tributos   │  │ • Tienda ⭐
        │              │  │              │  │
        └──────────────┘  └──────────────┘  └──────────────┘
                │                │                │
                │    ┌───────────┴────────────┐   │
                │    │                        │   │
                │    ▼                        ▼   │
                │ ┌──────────────┐  ┌──────────────┐
                │ │ Escribir     │  │ Usar Estrellas
                │ │ Momentos     │  │              │
                │ │ Especiales   │  │ • Tributos   │
                │ │              │  │ • Marcos     │
                │ │ • Primer Día │  │ • Temas      │
                │ │ • Último Adiós
                │ │ • Su Historia│  │              │
                │ │ • Cumpleaños │  └──────────────┘
                │ │ • Aniversario
                │ └──────────────┘        │
                │        │                │
                └────────┼────────────────┘
                         │
                    "Necesito más ⭐"
                         │
                    ┌────▼────────┐
                    │ Tienda de   │
                    │ Estrellas   │
                    │             │
                    │ • 20 ⭐ 1€  │
                    │ • 60 ⭐ 2€  │
                    │ • 200 ⭐ 5€ │
                    └────┬────────┘
                         │
                    ┌────▼─────────┐
                    │ Pagar Estrellas
                    │              │
                    │ Stripe       │
                    │ Microtransac │
                    └──────────────┘
```

---

## Estructura de URLs

```
PÚBLICAS
├─ /                    (Inicio)
├─ /about               (Acerca de)
├─ /map                 (Mapa mundial)
├─ /plans               ⭐ NUEVO (Ver planes)
├─ /pricing             (Precios - alternativa)
├─ /terms               (Términos)
├─ /privacy             (Privacidad)
└─ /cookies             (Cookies)

AUTENTICADAS (Login requerido)
├─ /create              (Crear memorial)
├─ /profile/[id]        (Ver memorial)
│  └─ Con nuevos:
│     ├─ SpecialMomentsEditor
│     ├─ VisitsDashboard
│     └─ StarsShop
├─ /user/subscription   ⭐ NUEVO (Mi plan y misiones)
└─ /map/create          (Crear desde mapa)

ADMIN (Próximo)
└─ /admin/dashboard     (Panel admin)
```

---

## Componentes Relacionados

```
Layout
├─ Navbar
│  ├─ Link to /plans
│  └─ Link to /user/subscription
└─ Footer
   ├─ Link to /plans
   ├─ Link to /terms
   ├─ Link to /privacy
   └─ Link to /cookies

Pages
├─ /plans/page.tsx
│  └─ Muestra: PLANS constant
├─ /user/subscription/page.tsx
│  ├─ Integra: EmotionalMissions
│  ├─ Integra: StarsShop
│  └─ Muestra: UserStars simulado
└─ /profile/[id]/page.tsx (Pronto)
   ├─ Integra: SpecialMomentsEditor
   ├─ Integra: VisitsDashboard
   └─ Integra: StarsShop

Components
├─ StarsShop.tsx
│  ├─ Muestra: TRIBUTE_CONFIGS
│  └─ Compra: Paquetes 20/60/200
├─ VisitsDashboard.tsx
│  ├─ Solo premium
│  ├─ Mock data: visitas, tributos
│  └─ Gráficas CSS puro
├─ SpecialMomentsEditor.tsx
│  ├─ Usa: SpecialMomentType enum
│  ├─ Muestra: Por plan
│  └─ Guarda: Mock en state
└─ EmotionalMissions.tsx
   ├─ Muestra: EMOTIONAL_MISSIONS constant
   ├─ Guarda: localStorage
   └─ Retorna: starsEarned
```

---

## Flujo de Datos

```
Global State (DataContext)
└─ userSubscription
   ├─ tier: SubscriptionTier
   ├─ stars: number
   ├─ monthlyStars: number
   └─ paymentType: PaymentType

Local State (Pages/Components)
├─ /plans
│  └─ billingType: 'one-time' | 'subscription'
├─ /user/subscription
│  └─ userStars: number (simulado)
└─ EmotionalMissions
   └─ completedMissions: object (localStorage)

API Routes (Próximas)
├─ POST /api/plans/upgrade
├─ POST /api/stars/buy
├─ POST /api/missions/complete
└─ GET /api/stats/visits
```

---

## Flujo de Pago

```
PAGO ÚNICO (One-time)
┌─────────────────────────────────────────┐
│ Usuario elige plan en /plans            │
│ ▼                                       │
│ Click "Elegir Plan"                     │
│ ▼                                       │
│ Redirige a /auth/register?plan=X        │
│ ▼                                       │
│ Usuario completa registro               │
│ ▼                                       │
│ Stripe Payment Intent                   │
│ (Procesa pago de 5€ o 10€)             │
│ ▼                                       │
│ Confirmación + Plan activado            │
│ ▼                                       │
│ Acceso a features premium               │
└─────────────────────────────────────────┘

SUSCRIPCIÓN TRIMESTRAL
┌─────────────────────────────────────────┐
│ Usuario en /user/subscription           │
│ ▼                                       │
│ Click "Actualizar a [Plan]"             │
│ ▼                                       │
│ Stripe Subscription (1€ o 3€)          │
│ ▼                                       │
│ Webhooks cada trimestre                 │
│ ▼                                       │
│ Auto-renovación o cancelación           │
└─────────────────────────────────────────┘

COMPRA DE ESTRELLAS
┌─────────────────────────────────────────┐
│ Usuario en /user/subscription           │
│ ▼                                       │
│ StarsShop: Elige paquete                │
│ (20 ⭐=1€, 60 ⭐=2€, 200 ⭐=5€)        │
│ ▼                                       │
│ Stripe Charge (microtransacción)       │
│ ▼                                       │
│ +X estrellas en saldo                   │
│ ▼                                       │
│ Usa en tributos / marcos                │
└─────────────────────────────────────────┘
```

---

## Matriz de Acceso por Plan

```
                  | GRATUITO | CIELO | PREMIUM
─────────────────┼──────────┼───────┼─────────
Memoriales       | 1        | 5     | ∞
Fotos/memorial   | 5        | 20    | ∞
Tributos         | Limitado | ∞     | ∞
Momentos especiales| 0      | 3     | 6
Estrellas/mes    | 4        | 10    | 30
Dashboard stats  | NO       | SÍ    | SÍ
Sin anuncios     | NO       | SÍ    | SÍ
Videos           | NO       | NO    | SÍ
Soporte prior.   | NO       | NO    | SÍ
─────────────────┼──────────┼───────┼─────────
Precio único     | —        | 5€    | 10€
Suscripción      | —        | 1€/3m | 3€/3m
```

---

## Dependencias de Componentes

```
/plans/page.tsx
├─ Usa: PLANS (types)
├─ Usa: Button (ui)
├─ Usa: Card (ui)
└─ Independiente (no usa otros components)

/user/subscription/page.tsx
├─ Usa: EmotionalMissions (component)
├─ Usa: StarsShop (component)
├─ Usa: useAuth (context)
├─ Usa: PLANS (types)
└─ Usa: Card, Button (ui)

StarsShop.tsx
├─ Usa: Card (ui)
├─ Usa: Button (ui)
└─ Independiente

VisitsDashboard.tsx
├─ Usa: Card (ui)
├─ Usa: AnimalProfile (type)
└─ Independiente (svg puro para gráficas)

SpecialMomentsEditor.tsx
├─ Usa: Card (ui)
├─ Usa: Button (ui)
├─ Usa: SPECIAL_MOMENTS (local)
├─ Usa: SpecialMomentType (type)
└─ Independiente

EmotionalMissions.tsx
├─ Usa: Card (ui)
├─ Usa: Button (ui)
├─ Usa: EMOTIONAL_MISSIONS (types)
└─ Independiente (usa localStorage)
```

---

## Testing Path

```
FLUJO 1: Ver planes sin login
/plans
├─ ✓ Ver 3 planes
├─ ✓ Toggle pago/suscripción
├─ ✓ Ver tabla
├─ ✓ Ver FAQ
└─ Click "Registrarse"

FLUJO 2: Usuario premium
/plans
├─ Elige Cielo (5€)
├─ Click "Elegir"
├─ Redirige a registro
└─ → /user/subscription
   ├─ ✓ Plan Cielo activo
   ├─ ✓ 10 ⭐/mes
   ├─ ✓ Misiones disponibles
   └─ ✓ Tienda de ⭐

FLUJO 3: Completar misión
/user/subscription
├─ EmotionalMissions
├─ Click "Completar Misión"
├─ ✓ +1-3 ⭐
├─ ✓ Saldo actualizado
└─ ✓ Guardado en localStorage

FLUJO 4: Comprar estrellas
/user/subscription
├─ StarsShop
├─ Click "Comprar" (60 ⭐ = 2€)
├─ Stripe Payment
├─ ✓ +60 ⭐ en saldo
└─ Usar en tributos
```

---

## Monitoreo y Analytics (Próximo)

```
Eventos a trackear:
├─ view_plans          (usuario ve page /plans)
├─ select_plan         (usuario elige un plan)
├─ start_checkout      (inicia proceso pago)
├─ purchase_plan       (compra plan)
├─ purchase_stars      (compra estrellas)
├─ complete_mission    (completa misión)
├─ create_moment       (crea momento especial)
├─ place_tribute       (coloca tributo)
└─ view_statistics     (ve dashboard estadísticas)

KPIs:
├─ Conversion Free→Paid  (target: 5-10%)
├─ Avg Lifetime Value    (target: 20-50€)
├─ Star Purchase Rate    (target: 30% de usuarios premium)
├─ Mission Completion    (target: 60% completadas/semana)
├─ Retention (30d)       (target: 40%)
└─ NPS Score             (target: 50+)
```

---

**Este mapa es la guía de navegación del usuario a través del nuevo sistema de planes y puntos.**
