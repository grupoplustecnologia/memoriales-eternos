'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualCobayas() {
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
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/80 via-orange-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐹 Cementerio Virtual para Cobayas
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a tu Cobayi
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💛 Memorial Familiar
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
                para Cobayas
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar para honrar a tu cobaya querida. Sus chillidos alegres y su compañía vibrante serán recordados por siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-orange-800 hover:bg-orange-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Cobayas
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

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-orange-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Celebra la Vida de tu Cobaya
            </h2>
            <p className="text-xl text-gray-600">
              Las cobayas son animales sociales que merecen ser recordados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐹</div>
                <CardTitle>Personalidad Vibrante</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Documenta sus chillidos, sus saltos de alegría y su forma única de interactuar.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Fotos Coloridas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura su variado pelaje y sus momentos especiales jugando.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">👨‍👩‍👧</div>
                <CardTitle>Compañía Familiar</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Las cobayas traen alegría a toda la familia. Recuerda esos momentos.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Tributos y Apoyo</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros pueden dejar tributos en honor a tu pequeña compañera.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌍</div>
                <CardTitle>Comunidad Global</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Conecta con otros amantes de cobayas alrededor del mundo.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Legado Eterno</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria permanecerá para siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Crea un Memorial para tu Cobaya
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">1</div>
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Información</h3>
              <p className="text-gray-600">Nombre, edad, color, características especiales.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">2</div>
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Fotos</h3>
              <p className="text-gray-600">Captura sus momentos alegres y coloridos.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">3</div>
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Publica</h3>
              <p className="text-gray-600">Su memorial está visible globalmente.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de mi Cobaya
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo incluir el sonido de sus chillidos?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes describir sus sonidos únicos e incluir videos que capturen esos momentos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto cuesta crear un memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Es completamente gratis. Los planes premium ofrecen más características.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo incluir a sus compañeras?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes crear memorials individuales para cada cobaya.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué información es importante?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Nombre, edad, color/patrón, personalidad, y sus momentos favoritos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Otros verán el memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tú controlas la privacidad. Puede ser solo para ti o compartida públicamente.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Homenajea a tu Cobaya Ahora
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para tu pequeña compañera.
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
