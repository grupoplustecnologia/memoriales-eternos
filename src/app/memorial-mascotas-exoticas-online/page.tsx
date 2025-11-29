'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MemorialMascotasExoticasOnline() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1552672260-636822c3c7de?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐹 Mascotas Exóticas
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💝 Memorial Online
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🌍 Especiales
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Memorial de Mascotas Exóticas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                Online
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Crea un memorial para tus reptiles, aves exóticas y mascotas especiales que compartieron tu vida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-green-800 hover:bg-green-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-green-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Mascotas Exóticas, Amor Universal
            </h2>
            <p className="text-xl text-gray-600">
              Aunque sean especiales y únicas, son tan valiosas como cualquier otro compañero
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐢</div>
                <CardTitle>Seres Únicos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Reptiles, aves, insectos - todos merecen ser recordados.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌈</div>
                <CardTitle>Diversidad Celebrada</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Cada especie tiene su propia belleza y encanto.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💞</div>
                <CardTitle>Amor Sin Límites</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                El amor por un animal no tiene que ser convencional.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📖</div>
                <CardTitle>Historia Documentada</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte su crianza, comportamiento y personalidad.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Reconocimiento</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Que el mundo sepa cuán especial fue tu mascota.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">♾️</div>
                <CardTitle>Eternidad Garantizada</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memorial vivirá para siempre en la web.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Crea un Memorial para tu Mascota Exótica
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-700">1</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Especie</h3>
              <p className="text-gray-600">Identifica qué tipo de animal fue.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-700">2</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Documentación</h3>
              <p className="text-gray-600">Sube fotos y videos especiales.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-700">3</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Publica</h3>
              <p className="text-gray-600">Su legado ahora es accesible globalmente.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Aceptan todas las especies?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, todas. Reptiles, aves, arañas, serpientes, todo es bienvenido.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Hay restricciones?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                No, mientras haya sido tu mascota amada, tiene su lugar aquí.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo contar su historia?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Claro, su crianza, comportamiento, habilidades especiales.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es gratis?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Totalmente gratis. Premium ofrece features extra.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto dura el memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Para siempre. Permanecerá en internet indefinidamente.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tu Mascota Exótica Vivirá Para Siempre
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial para tu compañero especial.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
