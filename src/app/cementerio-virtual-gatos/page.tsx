'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';

const pageSlug = 'cementerio-virtual-gatos';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Gatos', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial para mi gato?', answer: 'Sí, honra a tu gato con fotos, historias y recuerdos especiales.' }, { question: '¿Es gratis?', answer: 'Sí, tu primer memorial es completamente gratuito.' }, { question: '¿Puedo compartir?', answer: 'Absolutamente, comparte con familia y amigos.' }];

export default function CementerioVirtualGatos() {
  const localBusinessSchema = generateLocalBusinessSchema('Cementerio Virtual para Gatos');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Cementerio Virtual para Gatos - Forever Pet Friend', 'Crea un memorial eterno para tu gato.', canonical, ogImage);
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐱 Cementerio Virtual para Gatos
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerda a Tu Compañero Felino
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💜 Memorial Eterno
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Cementerio Virtual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                para Gatos
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Un lugar especial para honrar la memoria de tu gato querido. Sus ronroneos y su amor permanecerán por siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-purple-800 hover:bg-purple-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Gatos
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

      {/* Why for Cats */}
      <section className="py-20 bg-gradient-to-b from-background to-purple-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              Honra a Tu Gato Para Siempre
            </h2>
            <p className="text-xl text-gray-600">
              Los gatos llenan nuestros hogares de calidez, independencia y amor incondicional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐾</div>
                <CardTitle>Personalidad Felina</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte los hábitos únicos, la independencia y el carisma de tu gato.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📷</div>
                <CardTitle>Fotos en Todos Sus Ángulos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura sus expresiones favoritas: acurrucado, jugando con sus juguetes, durmiendo.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Espacio de Recuerdos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Un lugar especial para recordar sus ronroneos, sus patitas y su presencia cálida.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌸</div>
                <CardTitle>Recibe Tributos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros amantes de gatos pueden dejar flores y velas virtuales en honor a tu felino.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🗺️</div>
                <CardTitle>Comunidad Global de Amantes de Gatos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Conecta con personas que aman a sus gatos tanto como tú.
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">✨</div>
                <CardTitle>Inmortalizado en la Web</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria vivirá en internet para que sea recordado siempre.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              Crea un Memorial para Tu Gato en Tres Pasos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-700">1</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Información Básica</h3>
              <p className="text-gray-600">Nombre, edad, raza, color y lo que lo hace especial.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-700">2</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Galería de Recuerdos</h3>
              <p className="text-gray-600">Sube múltiples fotos mostrando su personalidad.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-700">3</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Comparte su Legado</h3>
              <p className="text-gray-600">Su memorial estará visible globalmente.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de Mi Gato
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
                <CardTitle className="text-lg">¿Cómo capturar la esencia independiente de mi gato?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte fotos de sus momentos favoritos: en la ventana, jugando, descansando en su lugar favorito. Describe su personalidad y sus hábitos únicos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo crear múltiples memorials si tengo varios gatos?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, cada gato merece su propio memorial. Puedes crear uno para cada compañero felino.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué información es importante incluir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Nombre, edad, color/raza, fecha de llegada y fallecimiento, y una descripción de su personalidad.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿El memorial será privado o público?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tú decides. Puede ser privado solo para ti, o público para que otros amantes de gatos lo vean en el mapa.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuántas fotos puedo subir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Con el plan básico puedes subir varias fotos. Los planes premium ofrecen galerías más amplias.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Inmortaliza a Tu Gato Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial permanente para que su amor y su presencia nunca sean olvidados.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial de Mi Gato
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
