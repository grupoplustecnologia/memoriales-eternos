'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';

const pageSlug = 'cementerio-virtual-tortugas';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Tortugas', url: canonical }];
const faqs = [{ question: '¿Memorial para tortugas?', answer: 'Sí, para todas tus mascotas queridas.' }, { question: '¿Gratis?', answer: 'Sí.' }, { question: '¿Compartir?', answer: 'Sí.' }];

export default function CementerioVirtualTortugas() {
  const localBusinessSchema = generateLocalBusinessSchema('Cementerio Virtual para Tortugas');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Cementerio Virtual para Tortugas - Forever Pet Friend', 'Memorial para tortugas.', canonical, ogImage);
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 via-teal-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐢 Cementerio Virtual para Tortugas
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a tu Tortuga
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🏠 Memorial Tranquilo
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
                para Tortugas
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar para honrar a tu tortuga sabia. Años de paciencia y tranquilidad serán recordados por siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-teal-800 hover:bg-teal-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Tortugas
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-teal-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-teal-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
              Honra a tu Tortuga Sabia
            </h2>
            <p className="text-xl text-gray-600">
              Las tortugas enseñan paciencia y serenidad a través de los años
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐢</div>
                <CardTitle>Compañera Longeva</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Las tortugas acompañan durante décadas. Recuerda esos años juntos.
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🏠</div>
                <CardTitle>Su Hogar</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Documenta su terrario, su vida tranquila y sus hábitos especiales.
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Fotos Tranquilas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura su belleza serena y momentos en su hábitat.
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">⏳</div>
                <CardTitle>Testigo del Tiempo</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tu tortuga vio pasar los años contigo. Eso merece recordarse.
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Tributos Respetuosos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros pueden honrar a tu tortuga con tributos especiales.
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Memoria Eterna</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su vida y serenidad vivirán en internet por siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
              Crea un Memorial para tu Tortuga
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-teal-700">1</div>
              <h3 className="text-2xl font-bold text-teal-900 mb-2">Información</h3>
              <p className="text-gray-600">Especie, nombre, edad, fecha de llegada.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-teal-700">2</div>
              <h3 className="text-2xl font-bold text-teal-900 mb-2">Fotos y Historia</h3>
              <p className="text-gray-600">Su vida, hábitos especiales, momentos juntos.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-teal-700">3</div>
              <h3 className="text-2xl font-bold text-teal-900 mb-2">Comparte</h3>
              <p className="text-gray-600">Su memorial está en el mapa para siempre.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de mi Tortuga
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-teal-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuántos años vivió mi tortuga?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Eso es importante incluir. Documentar los años que pasaron juntos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es gratis crear un memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, completamente. Planes premium ofrecen opciones adicionales.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué información debo incluir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Especie, edad, años juntos, hábitos especiales, su carácter tranquilo.
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

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo hacer el memorial privado?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, tú controlas la privacidad completamente.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recuerda a tu Tortuga Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para tu sabia compañera.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
