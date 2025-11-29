'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualMascotas() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1597854212624-c63a5e9e6ed1?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-nature-900/80 via-nature-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Cementerio Virtual
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐾 Para Todas las Mascotas
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💚 100% Gratuito
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-300 to-sky-300">
                para Mascotas
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar especial y permanente para honrar la memoria de tu querida mascota. Crea un memorial único que perdurará para siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-nature-800 hover:bg-nature-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Cementerio
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-nature-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-nature-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nature-900 mb-4">
              Por Qué Crear un Cementerio Virtual
            </h2>
            <p className="text-xl text-gray-600">
              Un espacio dedicado para honrar la vida de tu mascota
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-nature-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🕯️</div>
                <CardTitle>Permanente e Inmutable</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tu memorial nunca se eliminará. Crea un lugar eterno para recordar a tu compañero.
              </CardContent>
            </Card>

            <Card className="border-nature-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌍</div>
                <CardTitle>Visible Globalmente</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte la historia de tu mascota con personas de todo el mundo en nuestro mapa interactivo.
              </CardContent>
            </Card>

            <Card className="border-nature-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Tributos y Recuerdos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Recibe tributos virtuales (flores, velas) y mensajes de condolencia de otros usuarios.
              </CardContent>
            </Card>

            <Card className="border-nature-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Galería de Fotos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sube múltiples fotos para compartir los mejores momentos con tu mascota.
              </CardContent>
            </Card>

            <Card className="border-nature-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📖</div>
                <CardTitle>Relata la Historia</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte la historia completa de tu mascota: sus habilidades, personalidad y momentos especiales.
              </CardContent>
            </Card>

            <Card className="border-nature-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎯</div>
                <CardTitle>Sin Costo Inicial</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Crea un memorial básico completamente gratis. Opciones premium disponibles.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nature-900 mb-4">
              Cómo Crear un Memorial
            </h2>
            <p className="text-xl text-gray-600">
              Tres sencillos pasos para honrar a tu mascota
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-nature-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-nature-700">1</div>
              <h3 className="text-2xl font-bold text-nature-900 mb-2">Completa el Perfil</h3>
              <p className="text-gray-600">Ingresa el nombre, fecha de nacimiento y fallecimiento de tu mascota.</p>
            </div>

            <div className="text-center">
              <div className="bg-nature-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-nature-700">2</div>
              <h3 className="text-2xl font-bold text-nature-900 mb-2">Sube Fotos</h3>
              <p className="text-gray-600">Comparte tus fotos favoritas y narra la historia de tu compañero.</p>
            </div>

            <div className="text-center">
              <div className="bg-nature-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-nature-700">3</div>
              <h3 className="text-2xl font-bold text-nature-900 mb-2">Comparte y Recuerda</h3>
              <p className="text-gray-600">Tu memorial está visible en el mapa y recibe tributos de visitantes.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-nature-600 hover:bg-nature-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Mi Primer Memorial Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-nature-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nature-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es realmente gratis crear un memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes crear un memorial básico completamente gratis. Los planes premium ofrecen funciones adicionales como más fotos y tributos ilimitados.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto tiempo durará el memorial de mi mascota?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tu memorial es permanente. Nunca será eliminado y estará disponible para siempre.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo editar el memorial después de crearlo?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes editar el memorial en cualquier momento. Agrega fotos, actualiza la historia, o haz cualquier cambio que desees.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo hacer el memorial privado?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, tienes opciones de privacidad completas. Puedes hacerlo visible solo para ti o compartirlo globalmente.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué son los tributos?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Los tributos son formas virtuales en que otros usuarios pueden honrar a tu mascota: flores, velas, mensajes de condolencia, etc.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-nature-600 to-nature-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Honra la Memoria de Tu Mascota Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente y comparte la historia de tu compañero querido con el mundo.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-nature-700 hover:bg-nature-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
