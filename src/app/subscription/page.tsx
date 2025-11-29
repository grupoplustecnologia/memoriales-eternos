'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PLANS } from '@/types/index';

export default function SubscriptionPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">Debes iniciar sesión para ver tu suscripción</p>
            <Link href="/auth/login">
              <Button className="w-full bg-sky-600 hover:bg-sky-700">
                Ir a Iniciar Sesión
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const plans = Object.values(PLANS);
  const currentPlanId = user?.subscriptionTier || 'huella-eterna';
  const currentPlan = plans.find(p => p.id === currentPlanId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-sky-900 mb-2">🌟 Tu Plan de Suscripción</h1>
          <p className="text-muted-foreground mb-8">
            Gestiona tu plan y accede a todas las características
          </p>

          {/* Current Plan Info */}
          <Card className="max-w-2xl mx-auto border-sky-200 bg-gradient-to-r from-sky-50 to-blue-50 mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Plan Actual</p>
                  <p className="text-2xl font-bold text-sky-900">{currentPlan?.emotionalName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{currentPlan?.description}</p>
                </div>
                <div className="text-right">
                  {currentPlanId !== 'huella-eterna' && (
                    <>
                      <p className="text-sm text-muted-foreground">Próxima renovación</p>
                      <p className="text-lg font-semibold text-sky-600">
                        15 de {new Date().toLocaleDateString('es-ES', { month: 'long' })}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plans Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`border-2 transition-all hover:shadow-xl relative ${
                plan.id === currentPlanId
                  ? 'border-sky-600 bg-gradient-to-br from-sky-50 to-blue-50 shadow-lg'
                  : 'border-sky-200 hover:border-sky-400'
              }`}
              style={{
                borderTopColor: plan.color,
                borderTopWidth: '4px'
              }}
            >
              {/* Featured Badge */}
              {index === 2 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-golden-400 to-yellow-400 text-white px-4 py-1">
                    {plan.emoji} Recomendado
                  </Badge>
                </div>
              )}

              {plan.id === currentPlanId && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-4 py-1">
                    ✅ Plan Actual
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="text-4xl mb-2">{plan.emoji}</div>
                <CardTitle className="text-2xl text-sky-900">{plan.emotionalName}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div className="py-4 border-t border-b border-gray-200">
                  <div className="text-3xl font-bold text-sky-700">
                    {plan.priceOneTime === 0 ? 'Gratuito' : `€${plan.priceOneTime}`}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Pago único</p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">✓</span>
                      <span className="text-sm text-sky-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {plan.id === currentPlanId ? (
                  <Button
                    disabled
                    className="w-full bg-sky-600 text-white cursor-default opacity-75"
                  >
                    ✅ Plan Actual
                  </Button>
                ) : (
                  <Button
                    className="w-full text-white font-semibold"
                    style={{
                      backgroundColor: plan.color
                    }}
                  >
                    {plan.id === 'huella-eterna' ? 'Plan Gratuito' : 'Mejorar Ahora'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Billing Section */}
        <div className="mb-12">
          {/* This section was intentionally removed */}
        </div>

        {/* FAQ Section */}
        <Card className="border-sky-200 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>❓ Preguntas Frecuentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-sky-900 mb-2">¿Cómo funcionan las Estrellas?</h3>
              <p className="text-muted-foreground">
                Las Estrellas son puntos para crear tributos especiales. Cada plan incluye estrellas mensuales. Puedes comprar más en la tienda.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sky-900 mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-muted-foreground">
                Sí, puedes cambiar de plan en cualquier momento. Los cambios se reflejan inmediatamente en tu cuenta.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sky-900 mb-2">¿Qué son los Momentos Especiales?</h3>
              <p className="text-muted-foreground">
                Son secciones para contar historias emocionales del memorial. Planes superiores desbloquean más momentos: Primer Día, Último Adiós, Su Historia, y más.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sky-900 mb-2">¿Qué sucede si cancelo?</h3>
              <p className="text-muted-foreground">
                Tu memorial permanece visible para siempre. Con planes gratuitos, mantienen acceso básico. Con planes pagados, pierdes funciones premium.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sky-900 mb-2">¿Hay soporte disponible?</h3>
              <p className="text-muted-foreground">
                Sí, nuestro equipo está disponible para ayudarte. Planes superiores incluyen soporte prioritario.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sky-900 mb-2">¿Ofrecen reembolsos?</h3>
              <p className="text-muted-foreground">
                Sí, reembolso completo dentro de 30 días de tu compra si no estás satisfecho. Contacta a soporte.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <div className="text-center p-8 bg-white rounded-lg border border-sky-200">
          <h2 className="text-2xl font-bold text-sky-900 mb-3">¿Necesitas ayuda?</h2>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo está disponible para responder tus preguntas
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-sky-600 hover:bg-sky-700">
              💬 Contactar Soporte
            </Button>
            <Link href="/plans">
              <Button variant="outline" className="border-sky-300">
                📖 Ver Todos los Planes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
