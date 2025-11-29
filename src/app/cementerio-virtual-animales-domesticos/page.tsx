'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualAnimalesDomesticos() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 via-amber-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🏡 Cementerio Virtual
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐶🐱 Animales Domésticos
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🌾 Granja y Hogar
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">
                Animales Domésticos
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Dedica un espacio eterno a los animales que vivieron contigo. Desde mascotas hasta animales de granja, todos merecen ser recordados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials
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
              Todos los Animales Domésticos Importan
            </h2>
            <p className="text-xl text-gray-600">
              Ya sea mascota urbana o compañero rural, cada uno dejó un legado especial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐱</div>
                <CardTitle>Mascotas del Hogar</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Perros, gatos y otros animales que compartieron tu vida cotidiana.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐓</div>
                <CardTitle>Animales de Granja</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Gallinas, vacas, ovejas, caballos que trabajaron contigo.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💕</div>
                <CardTitle>Vínculos Especiales</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Honra las conexiones únicas que formaste con cada animal.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📖</div>
                <CardTitle>Historia Completa</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Documenta su vida, características y momentos memorables.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌱</div>
                <CardTitle>Legado Rural</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Preserva la memoria de animales que marcaron tu rural.
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🕯️</div>
                <CardTitle>Recuerdo Perenne</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memorial permanece vivo en la comunidad virtual.
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
              Crea Memorials para tus Animales Domésticos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">1</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Datos del Animal</h3>
              <p className="text-gray-600">Especie, raza, años vividos contigo.</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">2</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Sube Fotografías</h3>
              <p className="text-gray-600">Momentos especiales del trabajo juntos.</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">3</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Publica su Legado</h3>
              <p className="text-gray-600">Su memoria para siempre en línea.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial Ahora
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
                <CardTitle className="text-lg">¿Puedo crear memorials para animales de granja?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Absolutamente. Todos los animales que compartieron tu vida merecen ser recordados.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Hay diferencia en el costo?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                No, todos los animales tienen igual valor. Planes premium incluyen más features.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo documentar su historia?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, incluye su biografía, años de vida, y recuerdos especiales contigo.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Será visto por otros?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tú eliges. Puede ser privado o público para conectar con otros.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo cambiar información después?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Por supuesto. Edita, agrega fotos y actualiza en cualquier momento.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recuerda a tus Animales Domésticos
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para cada uno que marcó tu vida.
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
