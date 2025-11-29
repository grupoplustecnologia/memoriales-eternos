'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualPerros() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1633722715463-d30628519d69?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 via-amber-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐕 Cementerio Virtual para Perros
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a Tu Mejor Amigo
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💚 Memorial Permanente
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">
                para Perros
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un espacio para honrar a los perros que dejaron huellas en nuestros corazones. Tu mejor amigo merece ser recordado para siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Perros
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

      {/* Why for Dogs */}
      <section className="py-20 bg-gradient-to-b from-background to-amber-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Recuerda a Tu Perro Para Siempre
            </h2>
            <p className="text-xl text-gray-600">
              Los perros merecen un memorial especial que capture el amor y la alegría que trajeron a nuestras vidas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐕‍🦺</div>
                <CardTitle>Historias de Compañeros Leales</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte las aventuras, travesuras y momentos especiales con tu perro.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Galería de Recuerdos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sube todas tus fotos favoritas del juego, paseos y momentos de felicidad.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌍</div>
                <CardTitle>Comunidad Global</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Conecta con otras personas que amaron a sus perros y comparte el dolor y la alegría.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎾</div>
                <CardTitle>Personalización Completa</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Describe la raza, temperamento, habilidades especiales y lo que hizo único a tu perro.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Tributos de Simpatía</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros visitantes pueden dejar tributos como flores y velas en honor a tu compañero.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🕯️</div>
                <CardTitle>Memorial Eterno</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria permanecerá para siempre. Nunca será olvidado.
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
              Crea un Memorial para Tu Perro
            </h2>
            <p className="text-xl text-gray-600">
              Honra a tu compañero en tres pasos simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">1</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Datos Básicos</h3>
              <p className="text-gray-600">Nombre, fecha de nacimiento, fallecimiento, raza y personalidad.</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">2</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Tus Fotos Favoritas</h3>
              <p className="text-gray-600">Comparte los mejores momentos: jugando, corriendo, descansando.</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">3</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Comparte su Historia</h3>
              <p className="text-gray-600">Tu perro estará visible en el mapa para que el mundo lo recuerde.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de Mi Perro
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
              Preguntas Frecuentes sobre Memorials de Perros
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuándo debería crear el memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Puedes crearlo inmediatamente o años después. No hay tiempo límite. Muchas personas lo crean cuando están listos para celebrar la vida de su perro.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Otros perros de la misma raza aparecerán juntos?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Todos los memorials aparecen en el mapa global. Puedes filtrar por ubicación o tipo de mascota para explorar.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo incluir historias especiales?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes escribir la historia completa de tu perro, incluidas anécdotas, logros y lo que lo hace especial.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Podré ver a otros perros del mismo pueblo?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, el mapa muestra todos los memorials. Puedes explorar y descubrir historias de otros perros de tu zona.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuál es la mejor forma de capturar la esencia de mi perro?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sube fotos variadas (jugando, descansando, momentos especiales), incluye su raza, edad, y escribe sobre su personalidad única.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tu Perro Se Merece un Memorial Especial
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea ahora un espacio eterno donde la memoria de tu mejor amigo vivirá para siempre.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial de Mi Perro
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
