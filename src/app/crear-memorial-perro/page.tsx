'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'crear-memorial-perro';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Crear Memorial Perro', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Crear Memorial Perro');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Crear Memorial Perro - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1633722715463-d30628519b9d?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-amber-900/80 to-yellow-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐕 Crear Memorial para tu Perro
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial Digital para tu Perro
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Honra a tu mejor amigo con un hermoso memorial que durará para siempre
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8">
                  Crear Memorial de mi Perro
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales de Perros
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
            Un Memorial Especial para tu Mejor Amigo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐶</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Personalizado para Perros</h3>
              <p className="text-gray-600">
                Templates diseñados especialmente para capturar la esencia y personalidad única de tu perro.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Galería de Fotos</h3>
              <p className="text-gray-600">
                Carga todas tus mejores fotos de tu perro y crea una galería hermosa para revivir los recuerdos.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mensajes de Condolencias</h3>
              <p className="text-gray-600">
                Amigos y familiares pueden dejar sus mensajes de amor y apoyo en el memorial.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Videos Memorables</h3>
              <p className="text-gray-600">
                Guarda videos especiales de tu perro jugando, corriendo o simplemente siendo él mismo.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Historia Completa</h3>
              <p className="text-gray-600">
                Documenta la vida de tu perro: desde cachorro hasta todos los momentos especiales compartidos.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">♾️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Recuerdo Eterno</h3>
              <p className="text-gray-600">
                Un espacio permanente donde tu perro será recordado y celebrado por siempre.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Pasos para Crear el Memorial
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Información del Perro</h3>
              <p className="text-gray-600">
                Completa la información de tu perro: nombre, raza, fecha de nacimiento y fecha de partida.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos y Historias</h3>
              <p className="text-gray-600">
                Sube tus fotos favoritas y escribe historias sobre los momentos más especiales con tu perro.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Comparte y Recuerda</h3>
              <p className="text-gray-600">
                Comparte el enlace con familia y amigos. Juntos honren la memoria de tu leal compañero.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre los Memoriales para Perros
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Qué información debo incluir sobre mi perro?
              </h3>
              <p className="text-gray-600">
                Puedes incluir el nombre, raza, edad, características especiales, comportamientos favoritos, y cualquier otra información que quieras que otros sepan sobre tu perro.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Hay límite de fotos que puedo subir?
              </h3>
              <p className="text-gray-600">
                Con nuestro plan básico puedes subir fotos ilimitadas. Los planes premium ofrecen almacenamiento incluso mayor y características especiales.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo mantener el memorial privado?
              </h3>
              <p className="text-gray-600">
                Sí, puedes elegir si el memorial es público o privado. Si es privado, solo quienes invites podrán verlo.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo editar el memorial después de crearlo?
              </h3>
              <p className="text-gray-600">
                Claro, puedes agregar más fotos, historias y cambiar la configuración de privacidad en cualquier momento.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cómo comparto el memorial con otros?
              </h3>
              <p className="text-gray-600">
                Una vez creado el memorial, te proporcionaremos un enlace único que puedes compartir con familia y amigos por email o redes sociales.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial para tu Perro Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu mejor amigo merece un lugar especial para ser recordado. Comienza ahora.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial de mi Perro
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
