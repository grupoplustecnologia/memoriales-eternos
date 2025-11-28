'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PLANS } from '@/types/index';

export default function UserSubscriptionPage() {
  // Datos simulados - en producción vendría de la BD
  const [userPlan] = useState<'huella-eterna' | 'cielo-estrellas' | 'santuario-premium'>('cielo-estrellas');

  const currentPlan = PLANS[userPlan];
  const nextPlan = userPlan === 'huella-eterna' 
    ? PLANS['cielo-estrellas']
    : userPlan === 'cielo-estrellas'
    ? PLANS['santuario-premium']
    : null;

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
                <div className="text-4xl mb-2">{currentPlan.emoji}</div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentPlan.emotionalName.split(' ').slice(1).join(' ')}
                </h2>
              </div>

              <div className="text-center py-4 border-y border-sky-200 mb-4">
                {currentPlan.priceOneTime > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600">Pagado el 15 Oct 2025</p>
                    <p className="text-2xl font-bold text-sky-600 mt-1">
                      {currentPlan.priceOneTime}€ (pago único)
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

              {nextPlan && (
                <Link href="/plans" className="block">
                  <Button className="w-full bg-golden-500 text-white hover:bg-golden-600">
                    Actualizar a {nextPlan.emotionalName.split(' ').slice(1).join(' ')}
                  </Button>
                </Link>
              )}
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
