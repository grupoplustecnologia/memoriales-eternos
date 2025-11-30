'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'cementerio-virtual-mascotas-espana';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Cementerio Virtual Mascotas Espana', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function CementerioVirtualMascotasEspana() {
  const localBusinessSchema = generateLocalBusinessSchema('Cementerio Virtual Mascotas Espana');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Cementerio Virtual Mascotas Espana - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen bg-white">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587300411107-ec35026421d8?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-yellow-900/80 to-red-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐾 Cementerio Virtual España
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Cementerio Virtual para Mascotas en España
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Un memorial digital eterno para honrar a todas las mascotas amadas de España
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8">
                  Crear Memorial
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales
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
            Homenajea a tu Mascota en España
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🇪🇸</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad Española</h3>
              <p className="text-gray-600">
                Únete a miles de españoles que honran a sus mascotas en nuestro cementerio virtual.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Tu Región</h3>
              <p className="text-gray-600">
                Encuentra memoriales de mascotas en tu región de España y comparte el dolor.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Apoyo Local</h3>
              <p className="text-gray-600">
                Conecta con otros dueños de mascotas de España que entienden tu pérdida.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Alcance Global</h3>
              <p className="text-gray-600">
                Aunque sea local, tu memorial será visto por personas de todo el mundo.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Preservación</h3>
              <p className="text-gray-600">
                Preserva la memoria de tu mascota para las generaciones futuras.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">♾️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Eterno</h3>
              <p className="text-gray-600">
                Un memorial que durará para siempre en el corazón de España.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Crear un Memorial
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Registra tu Mascota</h3>
              <p className="text-gray-600">
                Proporciona información sobre tu mascota y tu ubicación en España.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Sube Recuerdos</h3>
              <p className="text-gray-600">
                Comparte fotos, historias y momentos especiales con tu mascota.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Comparte</h3>
              <p className="text-gray-600">
                Comparte el memorial con familia, amigos y la comunidad española.
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
                ¿Necesito ser de España para usar esto?
              </h3>
              <p className="text-gray-600">
                No, cualquiera puede crear un memorial. Pero es especialmente para la comunidad española.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo filtrar por región?
              </h3>
              <p className="text-gray-600">
                Sí, puedes ver memoriales específicos de tu región o explorar toda España.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cómo funciona la privacidad?
              </h3>
              <p className="text-gray-600">
                Tienes control total. Puedes hacer el memorial público, privado o compartido.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Hay costos?
              </h3>
              <p className="text-gray-600">
                El memorial básico es gratuito. Ofrecemos planes premium para más funciones.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Durará para siempre?
              </h3>
              <p className="text-gray-600">
                Sí, el memorial permanecerá en nuestro cementerio virtual de forma permanente.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu mascota fue especial. Merece un lugar en nuestro cementerio virtual de España.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
