'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualHamsters() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1585933777435-c7ac0e39a3b1?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/80 via-yellow-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐹 Cementerio Virtual para Hámsters
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a tu Hámster
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💛 Memorial Pequeño, Amor Grande
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                para Hámsters
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar para honrar a tu pequeño amigo. Aunque fueron pequeños, dejaron grandes huellas en nuestros corazones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-yellow-800 hover:bg-yellow-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Hámsters
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-yellow-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-yellow-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-4">
              Pequeño Tamaño, Gran Corazón
            </h2>
            <p className="text-xl text-gray-600">
              Los hámsters enseñan que el amor no se mide por el tamaño
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐹</div>
                <CardTitle>Pequeño Amigo</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Documentan la vida de tu pequeño compañero: su rueda, su jaula, sus hábitos.
              </CardContent>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Fotos Especiales</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura sus momentos: durmiendo en tu mano, corriendo en la rueda, comiendo.
              </CardContent>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Recuerdos Eternos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su breve pero hermosa vida será recordada para siempre.
              </CardContent>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Tributos Virtuales</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros pueden dejar tributos en honor a tu pequeño hámster.
              </CardContent>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎪</div>
                <CardTitle>Comunidad de Cuidadores</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte con otros que entendieron el amor por estos pequeños amigos.
              </CardContent>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Para Siempre Online</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su legado vivirá en internet eternamente.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-4">
              Crea un Memorial para tu Hámster
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-yellow-700">1</div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">Datos Básicos</h3>
              <p className="text-gray-600">Nombre, edad, especie, color y características especiales.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-yellow-700">2</div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">Fotos Lindas</h3>
              <p className="text-gray-600">Comparte momentos adorables de tu pequeño amigo.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-yellow-700">3</div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">Comparte y Recuerda</h3>
              <p className="text-gray-600">Su memorial estará en el mapa para siempre.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de mi Hámster
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es gratis crear un memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, completamente gratis. Tú decides cuánta información compartir.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuántas fotos puedo subir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Con el plan básico varias fotos. Premium ofrece ilimitadas.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo editar después?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes agregar fotos y actualizar información cuando quieras.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Será visible en el mapa?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Depende de ti. Puedes hacerlo público o privado.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué información debo incluir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Nombre, edad, especie, y lo que lo hacía especial. Comparte sus hábitos y personalidad.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recuerda a tu Pequeño Amigo Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para tu hámster querido.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-yellow-700 hover:bg-yellow-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
