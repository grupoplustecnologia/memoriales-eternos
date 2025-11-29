'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PLANS } from '@/lib/stripe';
import { getAuthToken } from '@/lib/auth-client';

export default function UserSubscriptionPage() {
  const router = useRouter();
  const [userPlan, setUserPlan] = useState<'huella-eterna' | 'cielo-estrellas' | 'santuario-premium'>('huella-eterna');
  const [loading, setLoading] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Fetch current user data
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetch('/api/subscription-status', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data.user) {
            setUserPlan(data.data.user.planType || 'huella-eterna');
            setUser(data.data.user);
          }
        })
        .catch((err) => console.error('Error:', err));
    }
  }, []);

  const handleSelectPlan = async (planId: string) => {
    const token = getAuthToken();

    if (!token) {
      router.push(`/auth/login?redirect=/user/subscription&plan=${planId}`);
      return;
    }

    if (planId === userPlan) {
      return; // Ya tiene este plan
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
          setUserPlan('huella-eterna');
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

  const currentPlan = Object.values(PLANS).find(p => p.id === userPlan) || Object.values(PLANS)[0];
  const planArray = Object.values(PLANS);

  const planEmojis: Record<string, string> = {
    'huella-eterna': '🐾',
    'cielo-estrellas': '🕯️',
    'santuario-premium': '👑',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mi Suscripción
          </h1>
          <p className="text-gray-600">Gestiona tu plan y acceso a funciones</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Plan Info */}
          <div className="space-y-6">
            {/* Current Plan Card */}
            <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{planEmojis[currentPlan.id]}</div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentPlan.name}
                </h2>
              </div>

              <div className="text-center py-4 border-y border-sky-200 mb-4">
                {currentPlan.price > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600">Plan activo</p>
                    <p className="text-2xl font-bold text-sky-600 mt-1">
                      {currentPlan.priceDisplay}
                      <span className="text-sm text-gray-600 font-normal ml-2">Pago único</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-semibold text-green-600">Plan Gratuito</p>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="font-semibold text-sm text-gray-900">Beneficios activos:</h3>
                {currentPlan.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-sky-600 text-white hover:bg-sky-700 mb-3">
                Ver todos los beneficios
              </Button>

              <div className="space-y-2">
                {planArray.map((plan) => (
                  plan.id !== userPlan && (
                    <Button
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={loading === plan.id}
                      className="w-full bg-golden-500 text-white hover:bg-golden-600"
                    >
                      {loading === plan.id ? (
                        'Procesando...'
                      ) : (
                        `Actualizar a ${plan.name}`
                      )}
                    </Button>
                  )
                ))}
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Configuración</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
                  👤 Perfil
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
                  💳 Métodos de pago
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
                  🔔 Notificaciones
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
                  ⚙️ Privacidad
                </button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity History */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Historial</h2>
              
              <div className="space-y-3">
                {[
                  { date: 'Hoy', action: 'Creaste un nuevo memorial', time: 'Hace 2 horas' },
                  { date: '2 días', action: 'Compartiste memorial en redes', time: 'Hace 2 días' },
                  { date: '5 días', action: 'Te suscribiste a Cielo de Estrellas', time: 'Hace 5 días' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-600">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Help Section */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4">❓ Preguntas frecuentes</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">¿Cómo cancelo mi plan?</p>
                  <p className="text-gray-700">Puedes cancelar en cualquier momento desde Configuración. Tu memorial permanecerá visible.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">¿Qué incluye cada plan?</p>
                  <p className="text-gray-700">Cada plan incluye diferentes límites de memoriales y funcionalidades. Consulta nuestra página de planes.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/create">
            <Button className="bg-sky-600 text-white hover:bg-sky-700 px-8 py-3 text-lg rounded-lg">
              ➕ Crear un nuevo memorial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
