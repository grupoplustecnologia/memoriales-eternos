'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'cementerio-virtual-perros-madrid';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Cementerio Virtual Perros Madrid', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function CementerioVirtualPerrosMadrid() {
  const localBusinessSchema = generateLocalBusinessSchema('Cementerio Virtual Perros Madrid');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Cementerio Virtual Perros Madrid - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen bg-white">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      <div className="relative h-[500px] bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1633722715463-d30628519c57?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 via-orange-900/80 to-red-900/80" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">🐕 Madrid</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Cementerio Virtual Perros Madrid</h1>
            <p className="text-xl text-white/90 mb-8">Memorial para tus perros en la capital</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create"><Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 px-8">Crear Memorial</Button></Link>
              <Link href="/map"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">Ver Perros</Button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Honra a tu Perro en Madrid</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🐕</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Tu Compañero</h3><p className="text-gray-600">Tu perro fue especial y merece un memorial.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🎪</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Razas Españolas</h3><p className="text-gray-600">Todos los perros son bienvenidos.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">📍</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Madrid Local</h3><p className="text-gray-600">Comunidad madrileña de perros.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">💝</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Recuerdos Eternos</h3><p className="text-gray-600">Fotos y historias de tu perro.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">👥</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad</h3><p className="text-gray-600">Conecta con otros amantes de perros.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🌟</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Para Siempre</h3><p className="text-gray-600">Tu perro vivirá en la memoria eterna.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Crear Memorial de tu Perro</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Datos</h3><p className="text-gray-600">Raza, nombre, edad del perro.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos</h3><p className="text-gray-600">Momentos especiales con tu perro.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir</h3><p className="text-gray-600">Con la comunidad madrileña de perros.</p></div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Preguntas sobre tu Perro</h2>
          <div className="space-y-6">
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Todas las razas?</h3><p className="text-gray-600">Sí, cualquier perro puede tener un memorial.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Editar el memorial?</h3><p className="text-gray-600">Sí, siempre que lo necesites.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Privacidad?</h3><p className="text-gray-600">Sí, total control sobre quien ve el memorial.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Duración?</h3><p className="text-gray-600">Eterno, para siempre en Madrid.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Soporte?</h3><p className="text-gray-600">Sí, equipo listo para ayudarte.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Homenajea a tu Perro Madrileño</h2>
          <p className="text-xl text-white/90 mb-8">Tu perro merece un memorial eterno en Madrid.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-6 text-lg">Crear Ahora</Button></Link>
        </div>
      </div>
    </div>
  );
}
