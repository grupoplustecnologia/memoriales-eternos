'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'memorial-mascotas-online';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Memorial Mascotas Online', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Memorial Mascotas Online');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Memorial Mascotas Online - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

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
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💙 Memorial Online
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🌐 Accesible Siempre
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🕯️ Recuerdo Eterno
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Memorial Mascotas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Online
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Crea un memorial digital para tu mascota. Un espacio accesible desde cualquier lugar del mundo, disponible 24/7 para honrar su memoria.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                  🗺️ Ver Memorials
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">
                  ✨ Crear Memorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-b from-background to-blue-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Ventajas de un Memorial Online
            </h2>
            <p className="text-xl text-gray-600">
              Acceso permanente, sin limitaciones de tiempo o espacio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌐</div>
                <CardTitle>Acceso Global</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Accede desde tu teléfono, computadora o tablet en cualquier momento y lugar.
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">♾️</div>
                <CardTitle>Sin Expiración</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                El memorial permanecerá en línea para siempre. Nunca expira ni desaparece.
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">👥</div>
                <CardTitle>Compartible</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Comparte el enlace con familiares y amigos para que todos recuerden juntos.
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📊</div>
                <CardTitle>Multimedia Completo</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sube fotos, videos, historias. Todo lo que necesitas para contar su historia.
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💝</div>
                <CardTitle>Interactivo</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Recibe tributos, mensajes y apoyo de una comunidad de amantes de mascotas.
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🔒</div>
                <CardTitle>Control Total</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Decide quién puede ver el memorial y qué información compartir.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Características del Memorial Online
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-3xl">📸</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Galería de Fotos Ilimitada</h3>
                  <p className="text-gray-600">Sube tus fotos favoritas. Con planes premium, galería completamente sin límites.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">📖</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Biografía Completa</h3>
                  <p className="text-gray-600">Escribe la historia de tu mascota: nacimiento, momentos especiales, su legado.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🗺️</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Ubicación en el Mapa</h3>
                  <p className="text-gray-600">Tu mascota aparece en el mapa interactivo global de memorials.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">💌</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Libro de Visitas</h3>
                  <p className="text-gray-600">Recibe mensajes de condolencia y apoyo de visitantes.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-3xl">🕯️</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Tributos Virtuales</h3>
                  <p className="text-gray-600">Otros pueden dejar flores, velas, corazones en honor a tu mascota.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🎂</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Fechas Importantes</h3>
                  <p className="text-gray-600">Marca cumpleaños, aniversarios y otras fechas especiales.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🎨</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Personalización</h3>
                  <p className="text-gray-600">Elige colores, temas y estilos que reflejen la personalidad de tu mascota.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🔐</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Privacidad Controlada</h3>
                  <p className="text-gray-600">Solo para ti, amigos, o abierto al público. Tú decides.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Create */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Cómo Crear tu Memorial Online
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-700">1</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Regístrate</h3>
              <p className="text-sm text-gray-600">Crea tu cuenta en segundos.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-700">2</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Completa el Perfil</h3>
              <p className="text-sm text-gray-600">Ingresa la información de tu mascota.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-700">3</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Sube Contenido</h3>
              <p className="text-sm text-gray-600">Fotos, videos, historias y recuerdos.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-700">4</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Comparte y Recuerda</h3>
              <p className="text-sm text-gray-600">Tu memorial está listo para siempre.</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/create">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg font-semibold">
                Crear Mi Memorial Online Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Es completamente gratis?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Sí, puedes crear un memorial básico completamente gratis. Planes premium ofrecen más fotos y tributos ilimitados.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto tiempo durará mi memorial?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Para siempre. Tu memorial nunca se eliminará y estará disponible indefinidamente.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo invitar a otros a visitarlo?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Absolutamente. Puedes compartir el enlace con familiares y amigos para que todos recuerden juntos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué pasa si necesito cambiar la información?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Puedes editar cualquier información en cualquier momento. Agregar fotos, actualizar la historia, todo.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Será visible en el mapa?</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Depende de ti. Puedes hacerlo público para que otros lo vean, o privado solo para ti.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Crea el Memorial Online de Tu Mascota Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Un espacio digital permanente donde tu mascota siempre será recordada.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">
              Crear Memorial Gratuito
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
