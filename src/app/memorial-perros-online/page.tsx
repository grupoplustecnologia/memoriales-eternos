'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MemorialPerrosOnline() {
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
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/80 via-orange-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐕 Memorial de Perros Online
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💛 Accesible Siempre
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Para Tu Mejor Amigo
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Memorial Perros <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
                Online
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Crea un memorial digital para tu perro querido. Un espacio dedicado donde puedas visitar sus recuerdos en cualquier momento.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-orange-800 hover:bg-orange-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Perros
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Online */}
      <section className="py-20 bg-gradient-to-b from-background to-orange-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Memorial Online para Tu Perro
            </h2>
            <p className="text-xl text-gray-600">
              Acceso permanente a los recuerdos de tu compañero desde cualquier lugar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌐</div>
                <CardTitle>Accesible 24/7</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Visita los recuerdos de tu perro en cualquier momento, desde cualquier dispositivo.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Galería Infinita</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Guarda todas tus fotos favoritas: juego, paseos, momentos tiernos, descansos.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">👨‍👩‍👧</div>
                <CardTitle>Comparte con la Familia</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte el memorial con familiares y amigos que también amaron a tu perro.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📖</div>
                <CardTitle>Relata Su Historia</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Narra su vida: cómo llegó a tu hogar, sus aventuras y lo que lo hacía especial.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Recibe Apoyo</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros pueden dejar tributos y mensajes de condolencia en honor a tu perro.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">♾️</div>
                <CardTitle>Permanente</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                El memorial existe para siempre. Nunca será eliminado ni olvidado.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Include */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Qué Incluir en el Memorial de Tu Perro
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-3xl">🐕</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Datos Personales</h3>
                  <p className="text-gray-600">Nombre, fecha de nacimiento/fallecimiento, raza, color, peso.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">📅</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Cronología</h3>
                  <p className="text-gray-600">Cómo llegó a tu vida, eventos importantes, el día que te dejó.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">❤️</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Personalidad</h3>
                  <p className="text-gray-600">Su carácter, habilidades, travesuras y lo que lo hacía único.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🏅</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Logros Especiales</h3>
                  <p className="text-gray-600">Trucos aprendidos, competencias, o cualidades sobresalientes.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-3xl">📸</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Fotos Memorables</h3>
                  <p className="text-gray-600">Selfies juntos, jugando, en el parque, momentos especiales.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🎾</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Sus Pasatiempos</h3>
                  <p className="text-gray-600">Juguetes favoritos, comidas preferidas, lugares donde le encantaba ir.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">💭</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Mensajes Personales</h3>
                  <p className="text-gray-600">Tus sentimientos, lo que significaba para ti, lo que extrañas.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">📹</div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Videos</h3>
                  <p className="text-gray-600">Momentos en movimiento: jugando, corriendo, en familia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Crea el Memorial en Minutos
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">1</div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">Crea Cuenta</h3>
              <p className="text-sm text-gray-600">Rápido y fácil en segundos.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">2</div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">Datos del Perro</h3>
              <p className="text-sm text-gray-600">Ingresa información básica.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">3</div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">Sube Fotos</h3>
              <p className="text-sm text-gray-600">Comparte tus recuerdos.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">4</div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">Listo</h3>
              <p className="text-sm text-gray-600">Tu memorial está en línea.</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/create">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de Mi Perro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es gratis crear un memorial para mi perro?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, completamente gratis. Puedes crear un memorial básico sin costo alguno.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuándo debo crear el memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Puedes crearlo inmediatamente o después de tiempo. No hay prisa. Es para cuando sientas que estás listo.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo editar el memorial después?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes agregar fotos, actualizar historias y hacer cambios cuando lo desees.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Otros verán el memorial de mi perro?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Depende de ti. Puedes hacerlo privado o público. Si es público, aparecerá en el mapa.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuántas fotos puedo subir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Con el plan básico varias. Los planes premium ofrecen galería ilimitada.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Crea el Memorial Online de Tu Mejor Amigo Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Un espacio digital donde siempre podrás recordar y honrar a tu perro.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
