'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CrearMemorialHamster() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1585213033289-d0b072899bf6?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 via-amber-900/80 to-orange-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐹 Crear Memorial para tu Hámster
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial Digital para tu Hámster
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Honra la memoria de tu pequeño y activo compañero roedor
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8">
                  Crear Memorial Ahora
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales de Hámsters
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Un Memorial para tu Pequeño Amigo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐹</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Tema Especial para Hámsters</h3>
              <p className="text-gray-600">
                Diseño que refleja la pequeñez y ternura de tu adorable hámster.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Videos de Actividad</h3>
              <p className="text-gray-600">
                Carga videos de tu hámster en su rueda, jugando o en su jaula favorita.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Ciclo de Vida</h3>
              <p className="text-gray-600">
                Documenta todas las etapas de la vida de tu pequeño compañero.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Su Hogar</h3>
              <p className="text-gray-600">
                Carga fotos de su jaula y el espacio donde vivía tu hámster.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Amor Incondicional</h3>
              <p className="text-gray-600">
                Comparte el amor especial que sentías por tu pequeño amigo roedor.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Recuerdo Brillante</h3>
              <p className="text-gray-600">
                Un memorial que captura la brillantez de tu pequeño y activo compañero.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Crear el Memorial de tu Hámster
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Información Básica</h3>
              <p className="text-gray-600">
                Nombre, raza, color, edad y características especiales de tu hámster.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos y Videos</h3>
              <p className="text-gray-600">
                Sube fotos y videos de los momentos especiales con tu hámster.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir Recuerdos</h3>
              <p className="text-gray-600">
                Comparte el memorial con amigos que también amaron a tu hámster.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre Memoriales de Hámsters
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuál es la vida promedio de un hámster?
              </h3>
              <p className="text-gray-600">
                La mayoría viven entre 2-3 años. Aunque su vida es corta, el impacto en nuestros corazones es eterno.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo documentar sus hábitos especiales?
              </h3>
              <p className="text-gray-600">
                Claro, cuéntales a otros sobre sus comportamientos, preferencias de comida, y personalidad única.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Hay otros con hámsters en la comunidad?
              </h3>
              <p className="text-gray-600">
                Sí, muchas personas aman a sus hámsters y comparten el mismo sentimiento de duelo.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo subir fotos macro de mi hámster?
              </h3>
              <p className="text-gray-600">
                Sí, sube todas las fotos que quieras. Las fotos detalladas son especialmente hermosas.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿El memorial durará para siempre?
              </h3>
              <p className="text-gray-600">
                Sí, el memorial de tu hámster permanecerá en nuestro sitio de forma permanente.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial para tu Hámster Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu pequeño amigo fue especial. Merece un memorial hermoso para ser recordado.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial de mi Hámster
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
