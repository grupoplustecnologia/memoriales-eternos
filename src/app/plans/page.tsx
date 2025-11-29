'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PLANS } from '@/types/index';

export default function PlansPage() {
  const [billingType, setBillingType] = useState<'one-time' | 'subscription'>('one-time');

  const plans = Object.values(PLANS);

  const getPrice = (plan: any) => {
    return billingType === 'one-time' 
      ? plan.priceOneTime 
      : `${plan.priceSubscription}€ cada 3 meses`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Header */}
      <section className="py-16 px-4 text-center border-b border-sky-200">
        <h1 className="text-5xl font-bold text-sky-900 mb-4">
          Honra a Tus Compañeros de Vida
        </h1>
        <p className="text-xl text-sky-700 max-w-2xl mx-auto mb-8">
          Elige el plan perfecto para crear un memorial eterno. Cada compra ayuda a mantener viva la memoria de tus mascotas.
        </p>

        {/* Toggle Billing */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setBillingType('one-time')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              billingType === 'one-time'
                ? 'bg-sky-600 text-white shadow-lg'
                : 'bg-white text-sky-600 border-2 border-sky-200 hover:border-sky-400'
            }`}
          >
            Pago Único (Permanente)
          </button>
          <button
            onClick={() => setBillingType('subscription')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              billingType === 'subscription'
                ? 'bg-sky-600 text-white shadow-lg'
                : 'bg-white text-sky-600 border-2 border-sky-200 hover:border-sky-400'
            }`}
          >
            Suscripción (Trimestral)
          </button>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all hover:shadow-2xl ${
                  index === 2 ? 'ring-2 ring-golden-400 md:scale-105 md:z-10' : ''
                }`}
                style={{
                  borderTop: `4px solid ${plan.color}`
                }}
              >
                {/* Featured Badge */}
                {index === 2 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-golden-400 to-yellow-400 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                    ⭐ Recomendado
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Title */}
                  <div className="mb-2">
                    <div className="text-4xl mb-2">{plan.emoji}</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.emotionalName.split(' ').slice(1).join(' ')}
                    </h2>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-gray-200">
                    {billingType === 'one-time' ? (
                      <div>
                        {plan.priceOneTime === 0 ? (
                          <div className="text-3xl font-bold text-sky-600">
                            Gratuito
                          </div>
                        ) : (
                          <>
                            <div className="text-3xl font-bold text-gray-900">
                              {plan.priceOneTime}€
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Pago único, acceso permanente
                            </p>
                          </>
                        )}
                      </div>
                    ) : (
                      <div>
                        {plan.priceSubscription === 0 ? (
                          <div className="text-3xl font-bold text-sky-600">
                            Gratuito
                          </div>
                        ) : (
                          <>
                            <div className="text-3xl font-bold text-gray-900">
                              {plan.priceSubscription}€
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Cada 3 meses
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/auth/register?plan=${plan.id}`}
                    className="w-full"
                  >
                    <Button
                      className="w-full mb-6 text-white font-semibold py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: plan.color
                      }}
                    >
                      {index === 0 ? 'Plan Gratuito' : 'Elegir Plan'}
                    </Button>
                  </Link>

                  {/* Features */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm">Incluye:</h3>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-lg mt-1">✓</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Características</th>
                    {plans.map(plan => (
                      <th key={plan.id} className="px-6 py-4 text-center font-semibold">
                        <div className="text-lg">{plan.emoji}</div>
                        <div className="text-sm mt-1">{plan.emotionalName.split(' ').slice(1).join(' ')}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold">Memoriales</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="px-6 py-3 text-center">
                        <span className="font-semibold">
                          {plan.maxMemorials === -1 ? '∞' : plan.maxMemorials}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold">Fotos por memorial</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="px-6 py-3 text-center">
                        <span className="font-semibold">
                          {plan.maxPhotosPerMemorial === -1 ? '∞' : plan.maxPhotosPerMemorial}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold">Tributos ilimitados</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="px-6 py-3 text-center">
                        {(plan.id === 'cielo-estrellas' || plan.id === 'santuario-premium') ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold">Sin anuncios</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="px-6 py-3 text-center">
                        {(plan.id === 'cielo-estrellas' || plan.id === 'santuario-premium') ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold">Videos</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="px-6 py-3 text-center">
                        {plan.id === 'santuario-premium' ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold">Soporte prioritario</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="px-6 py-3 text-center">
                        {plan.id === 'santuario-premium' ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-6">
            {[
              {
                q: '¿Puedo cambiar de plan después?',
                a: 'Sí, puedes actualizar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente.'
              },
              {
                q: '¿Cómo funcionan las Estrellas?',
                a: 'Las Estrellas son puntos que usas para tributos especiales. Ganas estrellas mensuales según tu plan, o compras paquetes adicionales.'
              },
              {
                q: '¿Qué sucede si cancelo mi suscripción?',
                a: 'Tu memorial permanece visible para siempre. Si compraste un pago único, conservas todos los beneficios. Con suscripción, pierdes acceso a funciones premium después de la cancelación.'
              },
              {
                q: '¿Hay período de prueba?',
                a: 'El plan Huella Eterna es gratuito, así que puedes probar todas las características básicas sin compromiso.'
              }
            ].map((faq, i) => (
              <div key={i} className="border-l-4 border-sky-400 pl-6 py-4">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para honrar su memoria?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Crea un memorial eterno y conecta con otros que compartieron el amor por sus mascotas.
        </p>
        <Link href="/create">
          <Button className="bg-white text-sky-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg rounded-lg">
            Crear Memorial Ahora
          </Button>
        </Link>
      </section>
    </div>
  );
}
