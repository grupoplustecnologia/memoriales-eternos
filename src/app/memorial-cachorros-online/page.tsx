'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'memorial-cachorros-online';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Memorial Cachorros Online', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Memorial Cachorros Online');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Memorial Cachorros Online - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1633722715463-d30628cbc4c1?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/80 via-orange-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐶 Cachorritos
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💝 Memorial Online
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                ♾️ Eternidad
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Memorial de Cachorritos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
                Online
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Honra la memoria de tu cachorro querido con un memorial digital que vivirá para siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-orange-800 hover:bg-orange-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials
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

      <section className="py-20 bg-gradient-to-b from-background to-orange-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Los Cachorritos Siempre en Nuestros Corazones
            </h2>
            <p className="text-xl text-gray-600">
              Aunque fueron corta su vida, fueron llenos de amor y alegría
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐶</div>
                <CardTitle>Amor Puro</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Cachorritos llenan de alegría cada momento compartido.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Fotografías Eternas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Preserva cada sonrisa y momento especial para siempre.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💕</div>
                <CardTitle>Conexión Eterna</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tu cachorro vivirá en la memoria de todos.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Comunidad de Amor</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Conecta con otros que comparten tu dolor y amor.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎁</div>
                <CardTitle>Tributos Especiales</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Recibe flores, velas y mensajes de apoyo.
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">♾️</div>
                <CardTitle>Para Siempre Online</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria permanecerá en internet eternamente.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
              Crea un Memorial para tu Cachorro
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">1</div>
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Información</h3>
              <p className="text-gray-600">Nombre, raza, fechas importantes.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">2</div>
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Sube Fotos</h3>
              <p className="text-gray-600">Todos esos momentos adorables.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">3</div>
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Comparte</h3>
              <p className="text-gray-600">Su memorial está listo para honrarlo.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
                <CardTitle className="text-lg">¿Cuánto cuesta?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Es gratis. Planes premium ofrecen opciones adicionales.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Por cuánto tiempo?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Para siempre. Tu memorial no desaparecerá nunca.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo compartir?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, con familia, amigos y la comunidad.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es seguro?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Totalmente. Protegemos tus datos con encriptación avanzada.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo editar después?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Claro, cuando quieras agregar fotos o actualizar información.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tu Cachorro Merece un Memorial
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un lugar especial para recordar su amor.
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
