'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'memorial-conejos-online';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Memorial Conejos Online', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Memorial Conejos Online');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Memorial Conejos Online - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-900/80 via-pink-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐰 Conejos
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💝 Memorial Online
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                ♾️ Eternidad
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Memorial de Conejos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300">
                Online
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Esas orejas, ese amor tierno. Tu conejo vivió en tu corazón y aquí vivirá para siempre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-pink-800 hover:bg-pink-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pink-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-pink-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4">
              Conejos de Piel Suave y Corazón Grande
            </h2>
            <p className="text-xl text-gray-600">
              Pequeñas criaturas que dejaron grandes huellas en nuestras vidas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🐰</div>
                <CardTitle>Adorables Orejas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Esas orejas tiernas que nos robaban el corazón.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💕</div>
                <CardTitle>Amor Silencioso</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su afecto tranquilo pero profundo será recordado.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌿</div>
                <CardTitle>Compañía Suave</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Momentos de calma y ternura con tu conejito.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Fotos Lindas</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Captura todas esas poses adorables para siempre.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌟</div>
                <CardTitle>Estrella Brillante</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Tu conejo seguirá siendo una estrella en el cielo.
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">♾️</div>
                <CardTitle>Para Siempre Aquí</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria permanecerá eternamente en línea.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4">
              Crea un Memorial para tu Conejo
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-pink-700">1</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Nombre</h3>
              <p className="text-gray-600">Nombre, edad, color de pelaje.</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-pink-700">2</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Fotos</h3>
              <p className="text-gray-600">Sus momentos más lindos y tiernos.</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-pink-700">3</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Publica</h3>
              <p className="text-gray-600">Su memorial está listo para el mundo.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto cuesta crear un memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Es completamente gratis. Planes premium incluyen features extra.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto tiempo permanece?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Para siempre. Tu conejo vivirá en internet eternamente.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo compartir fotos?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, tantas como quieras. Sin límite de almacenamiento.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es seguro?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Totalmente. Encriptación de nivel empresarial para proteger tus datos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo editar después?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Claro, siempre que quieras agregar o cambiar información.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tu Conejo Vivirá Para Siempre
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Crea un memorial que honre su ternura y amor.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-pink-700 hover:bg-pink-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
