'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'cementerio-virtual-animales-compania';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Cementerio Virtual Animales Compania', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function CementerioVirtualAnimalesCompania() {
  const localBusinessSchema = generateLocalBusinessSchema('Cementerio Virtual Animales Compania');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Cementerio Virtual Animales Compania - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1601758228578-5a66913dae1c?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-900/80 via-rose-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🏡 Cementerio Virtual
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💕 Animales de Compañía
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Todos Son Bienvenidos
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300">
                Animales de Compañía
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar universal para honrar a todos tus animales de compañía. Perros, gatos, pájaros, reptiles - todos merecen un memorial eterno.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-rose-800 hover:bg-rose-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-rose-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-rose-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
              Todo Animal de Compañía Merece Ser Recordado
            </h2>
            <p className="text-xl text-gray-600">
              No importa su especie o tamaño, todos dejaron huellas en nuestros corazones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐾</div>
                <CardTitle>Todos Son Bienvenidos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Perros, gatos, pájaros, reptiles, roedores, insectos - ¡todos!
              </CardContent>
            </Card>

            <Card className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Espacio Personalizado</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Cada animal es único. Crea un memorial que refleje su esencia.
              </CardContent>
            </Card>

            <Card className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Galería Completa</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sube fotos y videos de todos tus animales de compañía.
              </CardContent>
            </Card>

            <Card className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌍</div>
                <CardTitle>Comunidad Global</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Conecta con otros que amaban a sus animales de compañía.
              </CardContent>
            </Card>

            <Card className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎁</div>
                <CardTitle>Tributos de Apoyo</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Recibe flores, velas y mensajes de otros visitantes.
              </CardContent>
            </Card>

            <Card className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Legado Eterno</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria permanecerá en internet para siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
              Crea Memorials para tus Animales de Compañía
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-rose-700">1</div>
              <h3 className="text-2xl font-bold text-rose-900 mb-2">Completa Información</h3>
              <p className="text-gray-600">Nombre, especie, edad, características únicas.</p>
            </div>

            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-rose-700">2</div>
              <h3 className="text-2xl font-bold text-rose-900 mb-2">Sube Fotos</h3>
              <p className="text-gray-600">Captura los mejores momentos con tu mascota.</p>
            </div>

            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-rose-700">3</div>
              <h3 className="text-2xl font-bold text-rose-900 mb-2">Publica y Comparte</h3>
              <p className="text-gray-600">Su memorial está listo para el mundo.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo crear múltiples memorials?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, cada animal de compañía merece su propio memorial especial.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuesta algo?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                No, es completamente gratis. Planes premium ofrecen más características.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué tipos de animales puedo recordar?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Cualquier animal de compañía: perros, gatos, pájaros, reptiles, roedores, y más.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿El memorial será público?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Depende de ti. Puedes elegir privado solo para ti o público.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo editar después?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes agregar fotos y actualizar información en cualquier momento.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-rose-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Honra a tus Animales de Compañía Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea memorials permanentes para todos tus compañeros queridos.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-rose-700 hover:bg-rose-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
