'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'crear-memorial-conejo';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Crear Memorial Conejo', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Crear Memorial Conejo');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Crear Memorial Conejo - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f0?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-rose-900/80 to-red-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐰 Crear Memorial para tu Conejo
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial Digital para tu Conejo
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Honra la memoria de tu suave y adorable compañero de orejas largas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8">
                  Crear Memorial Ahora
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales de Conejos
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
            Un Memorial Adorable para tu Conejo Querido
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐇</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Tema para Conejos</h3>
              <p className="text-gray-600">
                Diseño especial que captura la ternura y la adorabilidad de tu conejo.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fotos Tiernas</h3>
              <p className="text-gray-600">
                Carga todas tus fotos del conejo: comiendo, saltando, descansando en su conejera.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💭</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Recuerdos Especiales</h3>
              <p className="text-gray-600">
                Documenta los momentos especiales y características únicas de tu conejo.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Decoración Encantadora</h3>
              <p className="text-gray-600">
                Personaliza con colores suaves y elementos que reflejen la dulzura del conejo.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👨‍👩‍👧</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Familia y Amigos</h3>
              <p className="text-gray-600">
                Comparte el memorial con todos los que amaron a tu conejo.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">♾️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Memoria Eterna</h3>
              <p className="text-gray-600">
                Un lugar permanente donde tu conejo vivirá en el corazón de quienes lo amaron.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Crear el Memorial de tu Conejo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Información del Conejo</h3>
              <p className="text-gray-600">
                Ingresa el nombre, raza, edad y datos especiales de tu conejo adorado.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos Hermosas</h3>
              <p className="text-gray-600">
                Carga tus mejores fotos del conejo y escribe historias sobre sus travesuras.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir Amor</h3>
              <p className="text-gray-600">
                Comparte con la comunidad y recibe mensajes de amor y apoyo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre Memoriales de Conejos
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Qué datos incluir sobre mi conejo?
              </h3>
              <p className="text-gray-600">
                Nombre, raza, color, edad, características especiales, y anécdotas divertidas sobre sus hábitos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo incluir datos sobre su dieta y cuidados?
              </h3>
              <p className="text-gray-600">
                Sí, puedes documentar información sobre sus cuidados especiales y lo que lo hacía feliz.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Hay otros que tengan conejos aquí?
              </h3>
              <p className="text-gray-600">
                Sí, tenemos una comunidad de amantes de conejos que entienden el vínculo especial.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo personalizar los colores del memorial?
              </h3>
              <p className="text-gray-600">
                Claro, elige colores que reflejen la personalidad única de tu conejo.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuánto espacio hay para fotos?
              </h3>
              <p className="text-gray-600">
                Puedes subir fotos ilimitadas en el memorial de tu conejo querido.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial para tu Conejo Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu conejo fue especial. Merece un lugar hermoso para ser recordado siempre.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial de mi Conejo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
