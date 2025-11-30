'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'crear-memorial-mascota-exotica';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Crear Memorial Mascota Exotica', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Crear Memorial Mascota Exotica');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Crear Memorial Mascota Exotica - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1608848461950-0fed8e92e9b0?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-emerald-900/80 to-green-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🦎 Crear Memorial para tu Mascota Exótica
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial Digital para tu Mascota Exótica
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Honra la memoria de tu reptil, anfibio o mascota exótica especial
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8">
                  Crear Memorial Ahora
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales Exóticos
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
            Un Memorial Único para tu Compañero Exótico
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🦎</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Para Todas las Especies</h3>
              <p className="text-gray-600">
                Crea memoriales para reptiles, anfibios, pájaros exóticos, pequeños mamíferos y cualquier mascota única.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Documenta su Belleza</h3>
              <p className="text-gray-600">
                Sube fotos de tu mascota exótica en su hábitat, mostrando sus hermosas características.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Sus Historias Especiales</h3>
              <p className="text-gray-600">
                Comparte anécdotas únicas sobre los momentos especiales con tu compañero exótico.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Educación y Conciencia</h3>
              <p className="text-gray-600">
                Educa a otros sobre la especie de tu mascota y por qué fue importante para ti.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad Comprensiva</h3>
              <p className="text-gray-600">
                Conecta con otros dueños de mascotas exóticas que entienden el vínculo especial.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Legado Duradero</h3>
              <p className="text-gray-600">
                Un monumento digital permanente a la vida única de tu mascota exótica.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Crea el Memorial de tu Mascota Exótica
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Información Específica</h3>
              <p className="text-gray-600">
                Completa detalles sobre la especie, origen, hábitat y características especiales de tu mascota.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos y Videos</h3>
              <p className="text-gray-600">
                Captura la belleza única de tu mascota con fotos y videos en su ambiente natural.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Comparte su Historia</h3>
              <p className="text-gray-600">
                Invita a otros a conocer y celebrar la vida especial de tu compañero exótico.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre Memoriales de Mascotas Exóticas
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo crear un memorial para cualquier especie exótica?
              </h3>
              <p className="text-gray-600">
                Sí, creamos memoriales para reptiles, anfibios, insectos, aracnidos y cualquier mascota exótica que amaste.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cómo documento el hábitat de mi mascota?
              </h3>
              <p className="text-gray-600">
                Puedes subir fotos del terrario, acuario o área donde vivía tu mascota exótica para preservar esos recuerdos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo educar a otros sobre la especie?
              </h3>
              <p className="text-gray-600">
                Claro, puedes incluir información sobre la especie, comportamiento, cuidados y datos interesantes.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Hay otros que tengan mascotas exóticas aquí?
              </h3>
              <p className="text-gray-600">
                Sí, somos una comunidad de amantes de mascotas exóticas donde puedes compartir y conectar con otros.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Es seguro compartir información sobre mi mascota?
              </h3>
              <p className="text-gray-600">
                Sí, tienes control total sobre la privacidad. Puedes hacer el memorial público o privado.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial para tu Mascota Exótica
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu compañero exótico fue único. Merece un memorial especial para ser recordado.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial de mi Mascota Exótica
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
