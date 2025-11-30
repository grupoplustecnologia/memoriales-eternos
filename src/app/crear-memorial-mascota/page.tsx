'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'crear-memorial-mascota';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Crear Memorial Mascota', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Crear Memorial Mascota');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Crear Memorial Mascota - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587300411107-ec35026421d8?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-red-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐾 Crear Memorial
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial para tu Mascota
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Honra la memoria de tu compañero peludo con un hermoso memorial digital eterno
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8">
                  Crear Memorial Ahora
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Otros Memoriales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué Crear un Memorial Digital?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comparte Recuerdos</h3>
              <p className="text-gray-600">
                Guarda y comparte tus mejores fotos y videos de tu mascota en un lugar seguro y especial.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Eterno y Accesible</h3>
              <p className="text-gray-600">
                Un memorial que permanece para siempre, accesible desde cualquier lugar, en cualquier momento.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comparte con Otros</h3>
              <p className="text-gray-600">
                Invita a familiares y amigos a visitar y dejar mensajes en el memorial de tu mascota.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Diseño Personalizado</h3>
              <p className="text-gray-600">
                Personaliza el memorial con colores, fotos y información especial sobre tu compañero.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad Global</h3>
              <p className="text-gray-600">
                Únete a miles de personas que honran a sus mascotas en nuestra comunidad internacional.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Privacidad Garantizada</h3>
              <p className="text-gray-600">
                Controla quién puede ver el memorial de tu mascota con opciones de privacidad avanzadas.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Crear tu Memorial
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Registra a tu Mascota</h3>
              <p className="text-gray-600">
                Proporciona el nombre, especie, fecha de nacimiento y otras detalles especiales de tu compañero peludo.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Sube Fotos y Historias</h3>
              <p className="text-gray-600">
                Carga tus mejores fotos, videos y escribe historias memorables sobre los momentos especiales juntos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Comparte el Enlace</h3>
              <p className="text-gray-600">
                Comparte el enlace del memorial con familia y amigos para que visiten y dejen sus condolencias.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuánto cuesta crear un memorial?
              </h3>
              <p className="text-gray-600">
                Puedes crear un memorial básico de forma gratuita. Contamos con planes premium que ofrecen características adicionales como almacenamiento ilimitado y temas personalizados.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo editar el memorial después de crearlo?
              </h3>
              <p className="text-gray-600">
                Sí, puedes editar y actualizar el memorial en cualquier momento. Agreg fotos, historias y ajustar la configuración de privacidad según sea necesario.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Qué tipos de mascotas puedo registrar?
              </h3>
              <p className="text-gray-600">
                Puedes crear memoriales para cualquier mascota: perros, gatos, pájaros, reptiles, roedores y más. Celebramos todos los compañeros que amamos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Es segura la información de mi mascota?
              </h3>
              <p className="text-gray-600">
                Sí, utilizamos encriptación de nivel empresarial para proteger toda la información. Tienes control total sobre quién puede ver el memorial.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo hacer el memorial privado?
              </h3>
              <p className="text-gray-600">
                Claro, puedes elegir si el memorial es público, privado o compartido solo con personas específicas que invites.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Honra la Memoria de tu Mascota Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Crea un memorial digital eterno para tu compañero peludo. Nunca será olvidado.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial Gratis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
