'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'crear-memorial-loro';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Crear Memorial Loro', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Crear Memorial Loro');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Crear Memorial Loro - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-yellow-900/80 to-orange-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🦜 Crear Memorial para tu Loro
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial Digital para tu Loro
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Honra la memoria de tu colorido y sabio compañero alado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8">
                  Crear Memorial Ahora
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales de Loros
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
            Un Memorial Colorido para tu Loro Inteligente
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🦜</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Vibrante y Colorido</h3>
              <p className="text-gray-600">
                Diseño que refleja los hermosos colores y la personalidad vivaz de tu loro.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Sus Palabras</h3>
              <p className="text-gray-600">
                Guarda audios de tu loro hablando y repitiendo frases especiales.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Videos Especiales</h3>
              <p className="text-gray-600">
                Carga videos de tu loro jugando, comiendo y disfrutando de la vida.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Su Inteligencia</h3>
              <p className="text-gray-600">
                Documenta los trucos, comportamientos inteligentes y características especiales.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Conexión Especial</h3>
              <p className="text-gray-600">
                Honra la relación única y especial que tenías con tu loro.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Legado Eterno</h3>
              <p className="text-gray-600">
                Tu loro vivirá para siempre en los corazones de quienes lo amaron.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Crear el Memorial de tu Loro
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Datos del Loro</h3>
              <p className="text-gray-600">
                Especie, colores, edad, características y la historia de tu loro.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Multimedia</h3>
              <p className="text-gray-600">
                Sube fotos, videos y audios de tu loro en sus momentos más especiales.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Comparte su Memoria</h3>
              <p className="text-gray-600">
                Comparte el memorial para que otros celebren la vida de tu loro.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre Memoriales de Loros
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuál es la esperanza de vida promedio de un loro?
              </h3>
              <p className="text-gray-600">
                Depende de la especie, pero muchos loros viven 40-60 años o incluso más, creando un vínculo muy especial.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo documentar sus frases favoritas?
              </h3>
              <p className="text-gray-600">
                Claro, cuéntales a otros sobre las frases que tu loro solía repetir y sus palabras especiales.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Qué especies de loros son más comunes como mascotas?
              </h3>
              <p className="text-gray-600">
                Guacamayas, amazonas, ninfas, cacatúas y periquitos son especies populares que merecen ser recordadas.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo compartir videos de los trucos de mi loro?
              </h3>
              <p className="text-gray-600">
                Definitivamente, los videos de trucos y comportamientos especiales son muy significativos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Habrá otros dueños de loros en la comunidad?
              </h3>
              <p className="text-gray-600">
                Sí, muchas personas que aman a sus loros y entienden el vínculo profundo que crean.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial para tu Loro Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu loro fue parte de tu vida. Merece un lugar especial en tu corazón y en nuestro sitio.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial de mi Loro
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
