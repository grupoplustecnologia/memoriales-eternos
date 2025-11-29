'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualConejos() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f4?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-900/80 via-pink-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐰 Cementerio Virtual para Conejos
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a tu Conejito
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💗 Memorial Eterno
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300">
                para Conejos
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar especial para honrar la memoria de tu conejito querido. Sus saltos, sus orejas y su amor permanecerán por siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-pink-800 hover:bg-pink-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Conejos
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pink-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why for Rabbits */}
      <section className="py-20 bg-gradient-to-b from-background to-pink-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4">
              Recuerda a tu Conejito Para Siempre
            </h2>
            <p className="text-xl text-gray-600">
              Los conejos llenan nuestros hogares con suavidad, energía y compañía tierna
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐰</div>
                <CardTitle>Personalidad Suave</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte los hábitos únicos, sus saltos, sus orejas y su forma especial de ser.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Fotos de tu Conejito</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura sus momentos adorables: saltando, comiendo, descansando en su madriguera.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Espacio de Recuerdos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Un lugar para recordar su suavidad, sus ronroneos y su presencia cálida.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌸</div>
                <CardTitle>Recibe Tributos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros amantes de conejos pueden dejar flores virtuales en honor a tu conejito.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🗺️</div>
                <CardTitle>Comunidad Global</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Conecta con personas que aman a sus conejos tanto como tú.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Inmortalizado en la Web</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria vivirá en internet para que sea recordado siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4">
              Crea un Memorial para tu Conejito en Tres Pasos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-pink-700">1</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Información Básica</h3>
              <p className="text-gray-600">Nombre, edad, raza, color y lo que lo hace especial.</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-pink-700">2</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Galería de Recuerdos</h3>
              <p className="text-gray-600">Sube múltiples fotos mostrando su personalidad.</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-pink-700">3</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Comparte su Legado</h3>
              <p className="text-gray-600">Su memorial estará visible globalmente.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de mi Conejito
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cómo capturar la esencia de mi conejito?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte fotos de sus momentos favoritos: saltando, comiendo, descansando. Describe sus hábitos y personalidad.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo crear múltiples memorials?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, cada conejito merece su propio memorial.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué información es importante incluir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Nombre, edad, raza, fecha de llegada y fallecimiento, y descripción de su personalidad.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿El memorial será privado o público?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tú decides. Puede ser privado solo para ti, o público para otros.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuántas fotos puedo subir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Con el plan básico varias. Los planes premium ofrecen galerías más amplias.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Inmortaliza a tu Conejito Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para que su amor nunca sea olvidado.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-pink-700 hover:bg-pink-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial de mi Conejito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
