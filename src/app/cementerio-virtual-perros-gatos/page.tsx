'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'cementerio-virtual-perros-gatos';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Cementerio Virtual Perros Gatos', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function CementerioVirtualPerrosGatos() {
  const localBusinessSchema = generateLocalBusinessSchema('Cementerio Virtual Perros Gatos');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Cementerio Virtual Perros Gatos - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

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
              backgroundImage: 'url(https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐕 Perros
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐈 Gatos
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💕 Mejor Amigos
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                Perros & Gatos
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Los compañeros más cercanos al corazón humano. Honra a tus perros y gatos con un memorial eterno.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-purple-800 hover:bg-purple-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-purple-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              Perros y Gatos: Los Compañeros Eternos
            </h2>
            <p className="text-xl text-gray-600">
              Perros leales y gatos independientes, ambos dejaron marcas indelibles en nuestras vidas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐕</div>
                <CardTitle>Lealtad de Perros</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Recuerda su devoción, alegría y amor incondicional.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐈</div>
                <CardTitle>Independencia de Gatos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Honra su libertad, misterio y afecto silencioso.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🏠</div>
                <CardTitle>Casa y Hogar</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Los hace vivir nuevamente en tu hogar virtual.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Galería de Memorias</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sube cientos de fotos de sus mejores momentos.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💬</div>
                <CardTitle>Historias y Anécdotas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte las historias que los hacen únicos.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Conexión Eterna</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Permanece conectado con su memoria por siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              Crea Memorials para Perros y Gatos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-700">1</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Nombre y Raza</h3>
              <p className="text-gray-600">Su nombre, raza, edad y personalidad.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-700">2</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Sube Fotos</h3>
              <p className="text-gray-600">Todos esos momentos juntos que nunca olvidarás.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-700">3</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Tributos</h3>
              <p className="text-gray-600">Recibe amor de la comunidad de animalistas.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo crear memorials para ambos, perro y gato?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes crear un memorial individual para cada uno.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es gratis crear memorials?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Totalmente gratis. Planes premium ofrecen características adicionales.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuántas fotos puedo subir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Según tu plan. El plan gratuito incluye muchas, planes premium incluyen ilimitadas.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Otros pueden ver el memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tú controlas la privacidad. Puedes hacerlo público o solo para ti.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo escribir historias?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Claro, cuéntale al mundo sobre su vida y personalidad única.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tu Perro o Gato Merece un Memorial
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un lugar especial para recordar al compañero más leal.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
