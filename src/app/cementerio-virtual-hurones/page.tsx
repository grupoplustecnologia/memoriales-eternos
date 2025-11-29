'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualHurones() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1572331479164-2eae5f2218cc?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 via-amber-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🦡 Cementerio Virtual para Hurones
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a tu Huroncito
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🎾 Memorial Travieso
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                para Hurones
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar para honrar a tu huroncito travieso. Su energía, su curiosidad y su travesura vivirán en nuestros corazones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Hurones
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-amber-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-amber-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Celebra a tu Huroncito Aventurero
            </h2>
            <p className="text-xl text-gray-600">
              Los hurones son animales únicos llenos de energía y personalidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🦡</div>
                <CardTitle>Energía Infinita</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Documenta sus aventuras, sus travesuras y su energía sin fin.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎾</div>
                <CardTitle>Juguetones</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Recuerda cómo jugaban, saltaban y disfrutaban cada momento.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Fotos de Aventuras</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura sus momentos exploradores y juguetones.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">❤️</div>
                <CardTitle>Compañía Única</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Los hurones son compañeros únicos con personalidades especiales.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Tributos Especiales</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros amantes de hurones pueden honrar a tu pequeño aventurero.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Legado Eterno</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sus travesuras vivirán en internet por siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Crea un Memorial para tu Huroncito
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">1</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Información</h3>
              <p className="text-gray-600">Nombre, edad, color, personalidad traviesa.</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">2</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Fotos Aventureras</h3>
              <p className="text-gray-600">Sus travesuras y momentos de diversión.</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">3</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Comparte</h3>
              <p className="text-gray-600">Su memorial está disponible globalmente.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de mi Huroncito
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cómo capturar la energía de mi hurón?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte videos de sus saltos y juegos. Describe sus travesuras favoritas.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es gratis el memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, completamente gratis. Planes premium ofrecen más características.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo incluir videos?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, videos son excelentes para mostrar su energía y traviesas.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo hacer el memorial privado?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, tienes control total sobre quién lo puede ver.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué información incluir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Nombre, edad, travesuras favoritas, momentos especiales juntos.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Inmortaliza a tu Huroncito Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para tu aventurero travieso.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
