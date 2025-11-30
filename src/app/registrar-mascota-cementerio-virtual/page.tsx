'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'registrar-mascota-cementerio-virtual';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Registrar Mascota Cementerio Virtual', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Registrar Mascota Cementerio Virtual');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Registrar Mascota Cementerio Virtual - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587300411107-ec35026421d8?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-rose-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐾 Registrar en Cementerio Virtual
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Registra tu Mascota en el Cementerio Virtual
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Dale un lugar especial y permanente en nuestra comunidad de rememoración
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8">
                  Registrar Ahora
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Mascotas Registradas
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
            ¿Por qué Registrar tu Mascota?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🗳️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Registro Oficial</h3>
              <p className="text-gray-600">
                Tu mascota se convierte en parte del registro oficial del cementerio virtual.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mapa Interactivo</h3>
              <p className="text-gray-600">
                Aparece en nuestro mapa interactivo donde otros pueden ver y rendir homenaje.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Búsqueda Fácil</h3>
              <p className="text-gray-600">
                Las personas pueden encontrar fácilmente el memorial de tu mascota.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Registro Histórico</h3>
              <p className="text-gray-600">
                Un registro permanente con fechas y detalles importantes de tu mascota.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad Global</h3>
              <p className="text-gray-600">
                Conecta con otros que han perdido mascotas similares y comparten el dolor.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">♾️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Eternidad Digital</h3>
              <p className="text-gray-600">
                Tu mascota existirá para siempre en nuestro cementerio virtual seguro.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Registrar tu Mascota
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Completar Información</h3>
              <p className="text-gray-600">
                Proporciona los detalles básicos de tu mascota: nombre, especie, edad, fechas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Subir Foto</h3>
              <p className="text-gray-600">
                Carga una foto hermosa de tu mascota para el registro oficial.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Confirmar Registro</h3>
              <p className="text-gray-600">
                Confirma y tu mascota aparecerá en el cementerio virtual y mapa interactivo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas Frecuentes sobre el Registro
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuál es el proceso de registro?
              </h3>
              <p className="text-gray-600">
                Es rápido y simple: ingresa información básica, carga una foto, y confirma. Tu mascota estará registrada.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuánto cuesta registrar?
              </h3>
              <p className="text-gray-600">
                El registro básico es gratuito. Ofrecemos planes premium con características adicionales.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo editar la información después?
              </h3>
              <p className="text-gray-600">
                Sí, puedes actualizar y editar la información de tu mascota en cualquier momento.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Mi información está segura?
              </h3>
              <p className="text-gray-600">
                Sí, utilizamos encriptación de nivel empresarial para proteger toda tu información.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Pueden encontrar a mi mascota en el mapa?
              </h3>
              <p className="text-gray-600">
                Sí, a menos que elijas mantener el registro privado, otros podrán verla en el mapa.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Registra tu Mascota Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Dale un lugar oficial y permanente en nuestro cementerio virtual.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Registrar mi Mascota
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
