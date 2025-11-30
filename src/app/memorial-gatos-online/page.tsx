'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'memorial-gatos-online';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Memorial Gatos Online', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Memorial Gatos Online');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Memorial Gatos Online - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

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
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-indigo-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🐱 Memorial de Gatos Online
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💜 Siempre Disponible
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Para Tu Felino Querido
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Memorial Gatos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                Online
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Crea un memorial digital para tu gato. Un espacio dedicado donde visitarás los recuerdos de tu compañero felino.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-indigo-800 hover:bg-indigo-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials de Gatos
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-indigo-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Memorial for Cats */}
      <section className="py-20 bg-gradient-to-b from-background to-indigo-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
              Memorial Online para Gatos
            </h2>
            <p className="text-xl text-gray-600">
              Un espacio eterno donde preservar los recuerdos de tu felino independiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">😸</div>
                <CardTitle>Captura su Esencia</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Documenta su independencia, sus ronroneos y su singular personalidad felina.
              </CardContent>
            </Card>

            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌐</div>
                <CardTitle>Acceso Eterno</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Visita los recuerdos de tu gato en cualquier momento desde cualquier dispositivo.
              </CardContent>
            </Card>

            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle>Galería de Momentos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Todas tus fotos: durmiendo en su lugar favorito, acechando, jugando, descansando.
              </CardContent>
            </Card>

            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Recibe Apoyo</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Otros amantes de gatos pueden dejar tributos y mensajes de solidaridad.
              </CardContent>
            </Card>

            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📖</div>
                <CardTitle>Comparte Su Historia</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Narra su vida: cómo llegó, sus años contigo, lo que lo hacía especial.
              </CardContent>
            </Card>

            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🕰️</div>
                <CardTitle>Recuerdos Permanentes</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Su memoria vivirá para siempre en internet, accesible cuando quieras recordar.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cat-Specific Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
              Lo Especial de tu Gato
            </h2>
            <p className="text-xl text-gray-600">
              Documenta los comportamientos únicos y endearing de tu felino
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-3xl">🐾</div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Sus Hábitos</h3>
                  <p className="text-gray-600">Dónde le gustaba descansar, sus horarios de juego, su rutina diaria.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🎾</div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Sus Juguetes Favoritos</h3>
                  <p className="text-gray-600">Qué le encantaba: plumas, pelotas, cajas, lacios, luz láser.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">😽</div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Sus Sonidos</h3>
                  <p className="text-gray-600">Los ronroneos inigualables, maullidos, sus expresiones sonoras únicas.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🪟</div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Sus Lugares Preferidos</h3>
                  <p className="text-gray-600">La ventana donde vigilaba, camas, sofás, su rincón favorito.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-3xl">🍽️</div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Sus Comidas Favoritas</h3>
                  <p className="text-gray-600">Qué sabor le encantaba, sus formas de comer, sus rechazos adorables.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">😻</div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Su Personalidad</h3>
                  <p className="text-gray-600">¿Era arisca, cariñosa, juguetona, perezosa? Su carácter único.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">📷</div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Sus Poses Favoritas</h3>
                  <p className="text-gray-600">Cómo le gustaba posar: estirado, acurrucado, en el alféizar.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">💗</div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Tu Conexión</h3>
                  <p className="text-gray-600">Cómo te hacía sentir, los momentos más especiales juntos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
              Crea un Memorial en Minutos
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-700">1</div>
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Regístrate</h3>
              <p className="text-sm text-gray-600">Crea tu cuenta gratuitamente.</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-700">2</div>
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Datos de tu Gato</h3>
              <p className="text-sm text-gray-600">Completa la información básica.</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-700">3</div>
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Comparte Fotos</h3>
              <p className="text-sm text-gray-600">Sube tus imágenes favoritas.</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-700">4</div>
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Listo para Siempre</h3>
              <p className="text-sm text-gray-600">Tu memorial está en línea.</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/create">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Memorial de Mi Gato
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es completamente gratis?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes crear un memorial completamente gratis. Plans premium ofrecen más características.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuándo debería crear el memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Cuando sientas que estás listo. No hay tiempo límite. Algunos lo crean inmediatamente, otros después.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo mantenerlo privado?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Absolutamente. Tú tienes control total sobre quién puede ver el memorial de tu gato.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo agregar más fotos después?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes seguir agregando fotos y actualizando el memorial cuando quieras.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto espacio tengo para fotos?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                El plan básico permite varias fotos. Los planes premium ofrecen galería completamente ilimitada.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Crea el Memorial Online de Tu Gato Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Un espacio digital permanente donde siempre recordarás a tu felino querido.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
