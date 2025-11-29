# Santuario Premium - Características y Funcionalidad

## Plan: Santuario Premium (€6.99)

### Características Principales

1. **Memoriales Ilimitados** ✅
   - Sin límite de memoriales para mascotas
   - Campo: `subscriptionTier: 'santuario-premium'`
   - Límite: `Infinity` memoriales

2. **Galería de Fotos Ilimitada** ✅
   - Sin límite de fotos por memorial
   - Cada memorial puede tener múltiples fotos
   - Límite: `Infinity` fotos por memorial

3. **Tributos Ilimitados** ✅
   - Otros usuarios pueden enviar tributos sin límite
   - Tipos: Velas, flores, coronas, corazones
   - Duración: Desde 1 día hasta 30 días

4. **Ubicación en Mapa Tamaño X2** ⚠️ (Pendiente de Implementación)
   - El memorial aparece más grande/destacado en el mapa mundial
   - El icono es 2x más grande que otros planes

5. **Visible para Siempre** ✅
   - El memorial nunca expira
   - No hay fecha de vencimiento

6. **Iconos Especiales** ✅
   - Corona (👑)
   - Estrella Dorada (⭐)
   - Flor Celestial (🌸)
   - Indicador de plan premium en memorial

7. **Recordatorios Anuales** ⚠️ (Pendiente de Implementación)
   - Sistema de recordatorios automáticos
   - Una vez por año en la fecha de fallecimiento
   - Opción para recibir email de notificación

8. **5 Destacados Semanales** ⚠️ (Pendiente de Implementación)
   - Mostrar memorial en sección destacada
   - Hasta 5 por semana
   - Aumenta visibilidad en la página de inicio

9. **Soporte Prioritario** ✅
   - Email/Chat de soporte prioritario
   - Respuesta en 24 horas

### Comparación con Otros Planes

| Característica | Huella Eterna (Gratuito) | Cielo de Estrellas (€2.99) | Santuario Premium (€6.99) |
|---|---|---|---|
| Memoriales | 1 | 5 | ∞ |
| Fotos por memorial | 1 | 2 | ∞ |
| Tributos | Ilimitados | Ilimitados | Ilimitados |
| Mapa Tamaño X2 | No | No | ✅ |
| Iconos especiales | No | ✅ | ✅ |
| Recordatorios anuales | No | No | ✅ |
| Destacados semanales | No | No | ✅ (5) |
| Soporte prioritario | No | No | ✅ |

### Funcionalidades Implementadas ✅

- [x] Verificación de plan en endpoints
- [x] Cálculo de límites de memoriales
- [x] Cálculo de límites de fotos
- [x] Validación al crear memorial
- [x] Actualización de plan después del pago
- [x] Recarga de datos de usuario en dashboard
- [x] Recarga de datos de usuario en profile
- [x] Recarga de datos de usuario en checkout success
- [x] Redirect de URLs de Netlify a dominio custom
- [x] Campo `subscriptionTier` en BD
- [x] API endpoint `/api/subscription-status`
- [x] Webhook de Stripe para actualizaciones

### Funcionalidades Pendientes ⏳

- [ ] Tamaño X2 de icono en mapa (UI)
- [ ] Sistema de recordatorios anuales
- [ ] Sistema de destacados semanales
- [ ] Panel de gestión de destacados
- [ ] Email de recordatorios
- [ ] Email de soporte prioritario

### Testing de Funcionalidades

Para verificar que todo funciona:

1. **Crear una nueva cuenta** 
   - Crear usuario en https://foreverpetfriend.com/auth/register

2. **Comprar plan Santuario Premium**
   - Ir a https://foreverpetfriend.com/pricing
   - Seleccionar "Santuario Premium (€6.99)"
   - Usar tarjeta de prueba: 4242 4242 4242 4242
   - Fecha: 12/25 | CVC: 123 | ZIP: 12345

3. **Verificar que el plan se actualiza**
   - Ir a https://foreverpetfriend.com/dashboard → Debe mostrar "Santuario Premium"
   - Ir a https://foreverpetfriend.com/profile → Debe mostrar "👑 Santuario Premium"
   - Ir a https://foreverpetfriend.com/pricing → Debe mostrar "Plan actual: santuario-premium"

4. **Crear múltiples memoriales**
   - Crear 3+ memoriales → Debe permitir sin error
   - Comprobación: usuario con plan Gratuito NO puede crear más de 1 memorial

5. **Verificar API**
   - GET `/api/subscription-status` → Debe retornar `subscriptionTier: 'santuario-premium'`
   - Límites: `memorialLimit: Infinity`, `photoLimitPerMemorial: Infinity`

### Base de Datos

**Tabla: users**
```sql
subscriptionTier: String = 'santuario-premium'
subscriptionStatus: String = 'active'
subscriptionEndDate: DateTime = null (no expira)
```

**Valores válidos para subscriptionTier:**
- `huella-eterna` (Gratuito)
- `cielo-estrellas` (€2.99)
- `santuario-premium` (€6.99)

