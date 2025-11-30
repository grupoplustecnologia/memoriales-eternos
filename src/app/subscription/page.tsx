'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CanonicalHead } from '@/components/CanonicalHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PLANS } from '@/lib/stripe';
import { getAuthToken } from '@/lib/auth-client';
import Link from 'next/link';

export default function SubscriptionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Obtener datos del usuario actual
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
      fetch('/api/subscription-status', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.data.user);
          }
        })
        .catch((err) => console.error('Error:', err));
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50">
      <CanonicalHead url="https://cementerio-virtual-mascotas.com/subscription" />

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

  const handleSelectPlan = async (planId: string) => {
    const token = getAuthToken();

    if (!token) {
      router.push(`/auth/login?redirect=/subscription&plan=${planId}`);
      return;
    }

    setLoading(planId);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.sessionUrl) {
          // Redirigir a Stripe Checkout
          window.location.href = data.sessionUrl;
        } else if (data.planType === 'free') {
          // Plan gratuito activado
          alert('¡Plan activado exitosamente!');
          router.refresh();
        }
      } else {
        alert('Error: ' + (data.error || 'No se pudo procesar el pago'));
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Error al procesar el pago');
    } finally {
      setLoading(null);
    }
  };

  const planArray = Object.values(PLANS);
  const currentPlanId = user?.planType || 'huella-eterna';

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
          {user && (
            <Card className="max-w-2xl mx-auto border-sky-200 bg-gradient-to-r from-sky-50 to-blue-50 mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Plan Actual</p>
                    <p className="text-2xl font-bold text-sky-900">
                      {planArray.find(p => p.id === currentPlanId)?.name || 'Huella Eterna'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {planArray.find(p => p.id === currentPlanId)?.description}
                    </p>
                  </div>
                  <div className="text-right">
                    {currentPlanId !== 'huella-eterna' && (
                      <>
                        <p className="text-sm text-muted-foreground">Plan de pago único</p>
                        <p className="text-lg font-semibold text-sky-600">
                          Acceso permanente
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Plans Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {planArray.map((plan, index) => (
            <Card
              key={plan.id}
              className={`border-2 transition-all hover:shadow-xl relative ${
                plan.id === currentPlanId
                  ? 'border-sky-600 bg-gradient-to-br from-sky-50 to-blue-50 shadow-lg'
                  : 'border-sky-200 hover:border-sky-400'
              }`}
            >
              {/* Featured Badge */}
              {index === 2 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-golden-400 to-yellow-400 text-white px-4 py-1">
                    👑 Recomendado
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
                <CardTitle className="text-2xl text-sky-900">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div className="py-4 border-t border-b border-gray-200">
                  <div className="text-3xl font-bold text-sky-700">
                    {plan.price === 0 ? 'Gratuito' : plan.priceDisplay}
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
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading === plan.id || plan.id === currentPlanId}
                  className="w-full text-white font-semibold"
                  variant={plan.id === currentPlanId ? 'outline' : 'default'}
                >
                  {loading === plan.id ? (
                    'Procesando...'
                  ) : plan.id === currentPlanId ? (
                    '✅ Plan Actual'
                  ) : plan.id === 'huella-eterna' ? (
                    'Usar Plan Gratuito'
                  ) : (
                    'Elegir Plan'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
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
              <h3 className="font-semibold text-sky-900 mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-muted-foreground">
                Sí, puedes cambiar de plan en cualquier momento. Los cambios se reflejan inmediatamente en tu cuenta.
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
            <Link href="/pricing">
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
