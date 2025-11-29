'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        const planId = searchParams.get('plan');

        console.log('[CheckoutSuccess] Session ID:', sessionId);
        console.log('[CheckoutSuccess] Plan ID:', planId);

        if (!sessionId || !planId) {
          setError('Parámetros inválidos');
          setLoading(false);
          return;
        }

        // Verificar la sesión de Stripe en el servidor
        const response = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, planId }),
        });

        const data = await response.json();

        if (data.success) {
          setPlan(planId);
          setSuccess(true);
        } else {
          setError(data.message || 'No pudimos verificar tu pago');
        }
      } catch (err) {
        console.error('[CheckoutSuccess] Error:', err);
        setError('Error al verificar el pago');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-nature-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-nature-50 to-sky-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error en el pago</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{error || 'No pudimos verificar tu pago. Por favor, intenta nuevamente.'}</p>
            <Link href="/pricing">
              <Button className="w-full">Volver a Planes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const planNames: { [key: string]: string } = {
    'cielo-estrellas': 'Cielo de Estrellas (€2.99)',
    'santuario-premium': 'Santuario Premium (€6.99)',
    'huella-eterna': 'Huella Eterna (Gratuito)',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-nature-50 to-sky-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">✓</div>
          <CardTitle className="text-2xl text-green-600">¡Pago Completado!</CardTitle>
          <CardDescription className="mt-2">Tu suscripción ha sido activada exitosamente</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <span className="font-semibold">Plan:</span> {planNames[plan || '']}
            </p>
            <p className="text-sm text-green-800 mt-2">
              Ahora puedes disfrutar de todas las características de tu plan.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              ✓ Tu plan está activo inmediatamente
            </p>
            <p className="text-sm text-gray-700">
              ✓ Recibirás un comprobante por email
            </p>
            <p className="text-sm text-gray-700">
              ✓ Puedes cambiar de plan cuando quieras
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/create" className="flex-1">
              <Button className="w-full bg-sky-600 hover:bg-sky-700">
                Crear Memorial
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                Mi Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-background via-nature-50 to-sky-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin inline-block w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600">Cargando...</p>
          </div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
