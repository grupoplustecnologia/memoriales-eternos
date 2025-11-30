'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';

const pageSlug = 'cementerio-virtual-loros';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Loros', url: canonical }];
const faqs = [{ question: '¿Memorial para loros?', answer: 'Sí, honra a tu loro amado.' }, { question: '¿Gratis?', answer: 'Sí.' }, { question: '¿Compartir?', answer: 'Sí.' }];

export default function CementerioVirtualLoros() {
  const localBusinessSchema = generateLocalBusinessSchema('Cementerio Virtual para Loros');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Cementerio Virtual para Loros - Forever Pet Friend', 'Memorial para loros.', canonical, ogImage);
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1606856110002-d0991ce78b58?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 via-red-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🦜 Cementerio Virtual para Loros
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a tu Ave Colorida
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🎨 Memorial Vibrante
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-yellow-300">
                para Loros
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar para honrar a tu loro colorido y hablador. Sus palabras, sus colores vibrantes y su inteligencia vivirán por siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-red-800 hover:bg-red-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Loros
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-red-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
              Celebra la Vida de tu Loro
            </h2>
            <p className="text-xl text-gray-600">
              Los loros son compañeros inteligentes e inteligentes con personalidades únicas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🦜</div>
                <CardTitle>Ave Inteligente</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Documenta su inteligencia: palabras que aprendió, trucos, personalidad.
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎨</div>
                <CardTitle>Colores Vibrantes</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura el colorido plumaje y belleza de tu loro.
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎤</div>
                <CardTitle>Sus Sonidos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Recuerda sus cantos, sus palabras memorables y sus expresiones sonoras.
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">❤️</div>
                <CardTitle>Compañero Leal</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Los loros pueden vivir décadas. Recuerda esos años juntos.
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Tributos Especiales</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros pueden honrar a tu loro con tributos virtuales.
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Legado Inmortal</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria vivirá en internet para siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
              Crea un Memorial para tu Loro
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-red-700">1</div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Información</h3>
              <p className="text-gray-600">Especie, nombre, edad, color, palabras especiales.</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-red-700">2</div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Fotos y Videos</h3>
              <p className="text-gray-600">Captura sus colores y su personalidad.</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-red-700">3</div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Comparte</h3>
              <p className="text-gray-600">Su memorial está disponible para el mundo.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de mi Loro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo incluir videos de mi loro?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, videos son una excelente forma de capturar su personalidad y comportamientos únicos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cómo document sus palabras?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Puedes listarlas en la descripción, o incluir audios grabados en videos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es completamente gratis?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, crear un memorial es gratis. Planes premium ofrecen más características.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo hacer el memorial privado?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, tú controlas quién puede ver el memorial de tu loro.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuántas fotos y videos puedo subir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Con el plan básico varias. Premium ofrece galerías ilimitadas.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Inmortaliza a tu Loro Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para tu compañero alado.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
