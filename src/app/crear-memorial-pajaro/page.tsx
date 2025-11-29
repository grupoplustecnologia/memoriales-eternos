'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CrearMemorialPajaro() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1444464666175-1642a4d67290?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-cyan-900/80 to-blue-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐦 Crear Memorial para tu Pájaro
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial Digital para tu Pájaro
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Celebra la vida cantante de tu pequeño amigo alado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 px-8">
                  Crear Memorial Ahora
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales de Pájaros
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
            Un Memorial para tu Compañero Alado
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐦</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Tema Celestial</h3>
              <p className="text-gray-600">
                Diseño inspirado en el cielo que refleja la libertad de tu pájaro.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Su Canción</h3>
              <p className="text-gray-600">
                Carga audios o videos de las bellas canciones que tu pájaro solía cantar.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fotos en Vuelo</h3>
              <p className="text-gray-600">
                Captura las imágenes más bellas de tu pájaro en acción y en reposo.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🪶</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Características Únicas</h3>
              <p className="text-gray-600">
                Documenta el color, patrón de plumas y personalidad especial de tu pájaro.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Su Espacio</h3>
              <p className="text-gray-600">
                Comparte fotos de su jaula, pércha favorita y su ambiente especial.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💫</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Recuerdo Eterno</h3>
              <p className="text-gray-600">
                Tu pájaro vivirá en la memoria de todos los que lo amaron.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Crear el Memorial de tu Pájaro
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Información del Pájaro</h3>
              <p className="text-gray-600">
                Especie, raza, edad, colores especiales y características del pájaro.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Medios Multimedia</h3>
              <p className="text-gray-600">
                Sube fotos, videos y audios de tu pájaro cantando o volando.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Comparte su Historia</h3>
              <p className="text-gray-600">
                Invita a otros a celebrar la vida cantante de tu amigo alado.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre Memoriales de Pájaros
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo grabar el canto de mi pájaro?
              </h3>
              <p className="text-gray-600">
                Sí, los audios y videos del canto de tu pájaro son especialmente significativos para el memorial.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuáles son las especies de pájaros más comunes?
              </h3>
              <p className="text-gray-600">
                Creamos memoriales para canarios, periquitos, loros, jilgueros, pájaros cantores y más.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo personalizar la música del memorial?
              </h3>
              <p className="text-gray-600">
                Claro, elige música que refleje la energía y alegría de tu pájaro.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Hay límite de fotos o videos?
              </h3>
              <p className="text-gray-600">
                No, puedes subir todos los archivos multimedia que desees para preservar los recuerdos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo hacer el memorial privado?
              </h3>
              <p className="text-gray-600">
                Sí, tienes control total sobre quien puede ver el memorial de tu pájaro.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial para tu Pájaro Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu compañero alado fue especial. Que su canción nunca se olvide.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial de mi Pájaro
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
