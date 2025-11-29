'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CementerioVirtualMascotasExoticas() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1580019126613-dab038e63dd5?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🦎 Mascotas Exóticas
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda lo Extraordinario
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💚 Único y Especial
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                para Mascotas Exóticas
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar especial para honrar a tus compañeros extraordinarios: reptiles, pájaros, roedores y más. Ellos también merecen ser recordados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-green-800 hover:bg-green-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials Exóticos
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

      {/* Why Exotic Pets Matter */}
      <section className="py-20 bg-gradient-to-b from-background to-green-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Las Mascotas Exóticas También Merecen Ser Recordadas
            </h2>
            <p className="text-xl text-gray-600">
              Tus compañeros reptiles, pájaros y roedores tienen historias únicas que merecen preservarse
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🦎</div>
                <CardTitle>Reptiles Fascinantes</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Geckos, serpientes, iguanas y otros reptiles que enriquecen nuestras vidas con su belleza.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🦜</div>
                <CardTitle>Pájaros Coloridos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Loros, canarios, cotorras. Sus cantos y colores permanecerán en nuestros corazones.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐹</div>
                <CardTitle>Pequeños Roedores</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Hámsteres, conejillos de indias, chinchillas. Pequeños amigos que dejan grandes huellas.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📖</div>
                <CardTitle>Historias Extraordinarias</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte cómo tu mascota exótica enriqueció tu vida y lo que la hizo única.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌍</div>
                <CardTitle>Comunidad de Cuidadores</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Conecta con otros que comprenden la dedicación de cuidar mascotas exóticas.
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Memorial Permanente</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su extraordinaria vida será recordada por siempre en nuestro cementerio virtual.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Crea un Memorial Especial
            </h2>
            <p className="text-xl text-gray-600">
              Tres pasos para preservar el recuerdo de tu mascota exótica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-700">1</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Datos Completos</h3>
              <p className="text-gray-600">Tipo de mascota, nombre, edad, rasgos especiales y cuidados que recibió.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-700">2</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Fotos Únicas</h3>
              <p className="text-gray-600">Captura sus momentos especiales: en su hábitat, interactuando, sus colores y patrones.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-700">3</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Comparte su Legado</h3>
              <p className="text-gray-600">Tu mascota exótica estará en el mapa para que otros aprendan sobre ella.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de Mi Mascota Exótica
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
                <CardTitle className="text-lg">¿Puedo incluir información sobre el hábitat de mi mascota?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Absolutamente. Cuéntanos sobre su terrario, jaula, pecera o espacio favorito. Esto ayuda a otros a entender cómo vivía.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué información técnica debería incluir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tipo de especie, edad, temperatura ideal, dieta especial, comportamientos únicos y cualquier característica distintiva.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Otros dueños de mascotas exóticas verán el memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, si lo haces público. Otros amantes de mascotas exóticas podrán descubrir la historia de tu compañero en el mapa.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo compartir consejos de cuidado?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Por supuesto. Puedes incluir tips sobre cuidado, alimentación y lo que aprendiste de la experiencia.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Se aceptan todos tipos de mascotas exóticas?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, todo tipo de reptiles, pájaros, roedores, insectos y otros animales extraordinarios son bienvenidos.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tu Mascota Exótica Se Merece un Memorial Extraordinario
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea hoy un espacio permanente donde la historia de tu compañero vivirá por siempre.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
