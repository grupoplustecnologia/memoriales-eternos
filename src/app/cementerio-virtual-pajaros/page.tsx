'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualPajaros() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1444464666175-1cff670a7a36?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/80 via-sky-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐦 Cementerio Virtual para Pájaros
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a tu Pajarito
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🎵 Memorial Cantarín
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-300">
                para Pájaros
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar para honrar a tu pajarito amado. Sus cantos melodiosos y su presencia alada permanecerán en nuestros corazones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-sky-800 hover:bg-sky-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Pájaros
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sky-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-sky-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
              Celebra a tu Pajarito Amado
            </h2>
            <p className="text-xl text-gray-600">
              Los pájaros cantan alegría. Que su canto viva por siempre
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-sky-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐦</div>
                <CardTitle>Cantor Melodioso</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Documenta sus cantos y los momentos donde su voz llenaba tu hogar.
              </CardContent>
            </Card>

            <Card className="border-sky-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎵</div>
                <CardTitle>Sus Canciones</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Recuerda su melodía única y cómo sus cantos iluminaban tus días.
              </CardContent>
            </Card>

            <Card className="border-sky-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Fotos Lindas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura su belleza: plumaje, movimientos, expresiones especiales.
              </CardContent>
            </Card>

            <Card className="border-sky-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">❤️</div>
                <CardTitle>Compañía Suave</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Los pájaros aportan paz y tranquilidad a nuestros hogares.
              </CardContent>
            </Card>

            <Card className="border-sky-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Tributos y Recuerdos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros amantes de pájaros pueden dejar tributos en su honor.
              </CardContent>
            </Card>

            <Card className="border-sky-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Memoria Eterna</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su presencia vivirá en internet por siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
              Crea un Memorial para tu Pajarito
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-sky-700">1</div>
              <h3 className="text-2xl font-bold text-sky-900 mb-2">Detalles</h3>
              <p className="text-gray-600">Especie, nombre, edad, color del plumaje.</p>
            </div>

            <div className="text-center">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-sky-700">2</div>
              <h3 className="text-2xl font-bold text-sky-900 mb-2">Fotos y Sonidos</h3>
              <p className="text-gray-600">Sus imágenes y grabaciones de sus cantos.</p>
            </div>

            <div className="text-center">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-sky-700">3</div>
              <h3 className="text-2xl font-bold text-sky-900 mb-2">Comparte</h3>
              <p className="text-gray-600">Su memorial está visible en el mapa.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de mi Pajarito
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-sky-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo incluir grabaciones de su canto?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, es una forma hermosa de preservar su canto especial.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuesta crear un memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                No, es completamente gratis. Planes premium ofrecen opciones adicionales.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué pájaros puedo recordar?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Canarios, loros, palomas, gorriones, periquitos - todos los pájaros son bienvenidos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo hacer el memorial privado?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, tienes control total sobre la privacidad.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuántas fotos puedo subir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Plan básico: varias. Premium: ilimitadas.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-sky-600 to-sky-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recuerda a tu Pajarito Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para que su canto nunca sea olvidado.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-sky-700 hover:bg-sky-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
