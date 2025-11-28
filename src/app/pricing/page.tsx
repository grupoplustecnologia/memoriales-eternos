'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PLANS } from '@/types/index';
import Link from 'next/link';

export default function PricingPage() {
  const plans = Object.values(PLANS);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-nature-50 to-sky-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-nature-800 mb-4">
            Honra sus Recuerdos Eternos
          </h1>
          <p className="text-xl text-nature-600 max-w-2xl mx-auto">
            Elige el plan perfecto para crear un memorial eterno.
            Cada plan es una forma de expresar tu amor.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative transition-all hover:shadow-xl ${
                index === 2
                  ? 'ring-2 ring-golden-400 md:scale-105 z-10'
                  : ''
              }`}
              style={{
                borderTop: `4px solid ${plan.color}`
              }}
            >
              {index === 2 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-golden-400 to-yellow-400 text-white px-4 py-1">
                    {plan.emoji} Recomendado
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2 pt-8">
                <div className="text-5xl mb-2">{plan.emoji}</div>
                <CardTitle className="text-2xl">{plan.emotionalName.split(' ').slice(1).join(' ')}</CardTitle>
                <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div className="py-4 border-t border-b border-gray-200">
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.priceOneTime === 0 ? 'Gratuito' : `€${plan.priceOneTime}`}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Pago único</p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href={`/auth/register?plan=${plan.id}`} className="w-full">
                  <Button
                    className="w-full text-white font-semibold"
                    style={{
                      backgroundColor: plan.color
                    }}
                  >
                    {plan.id === 'huella-eterna' ? 'Plan Gratuito' : 'Elegir Plan'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Características</th>
                  {plans.map(plan => (
                    <th key={plan.id} className="px-6 py-4 text-center font-semibold">
                      <div className="text-lg">{plan.emoji}</div>
                      <div className="text-xs mt-1">{plan.emotionalName}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-sm">Memoriales</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-3 text-center text-sm font-semibold">
                      {plan.maxMemorials === -1 ? '∞' : plan.maxMemorials}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-sm">Fotos por memorial</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-3 text-center text-sm font-semibold">
                      {plan.maxPhotosPerMemorial === -1 ? '∞' : plan.maxPhotosPerMemorial}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-sm">Tributos ilimitados</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-3 text-center">
                      {plan.id !== 'huella-eterna' ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-sm">Sin anuncios</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-3 text-center">
                      {plan.id !== 'huella-eterna' ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-sm">Momentos especiales</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-3 text-center text-sm font-semibold">
                      {plan.id === 'huella-eterna' ? '0' : (plan.id === 'cielo-estrellas' ? '3' : '6')}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold text-sm">Dashboard stats</td>
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

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-center text-nature-800 mb-8">
            ❓ Preguntas Frecuentes
          </h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo cambiar de plan en cualquier momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Sí, puedes actualizar o cambiar de plan en cualquier momento. Los cambios se aplicarán inmediatamente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cómo funcionan las Estrellas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Las Estrellas son puntos para crear tributos especiales. Ganas estrellas cada mes según tu plan, o compra paquetes adicionales en la tienda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué sucede si cancelo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Tu memorial permanece visible para siempre. Con planes pagados, conservas acceso. Con suscripciones, pierdes funciones premium.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Hay período de prueba?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Sí, el plan Huella Eterna es gratuito. Prueba todas las características básicas sin compromisos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-sky-600 to-blue-600 border-none">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                ¿Listo para crear un memorial eterno?
              </h3>
              <p className="text-white/90 mb-6">
                Honra la memoria de tu compañero y conecta con otros que comparten tu amor
              </p>
              <Link href="/create">
                <Button className="bg-white text-sky-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
                  Crear Memorial Ahora
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
