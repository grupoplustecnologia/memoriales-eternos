'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';


const pageSlug = 'cementerio-virtual-perros-espana';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Cementerio Virtual Perros Espana', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function CementerioVirtualPerrosEspana() {
  const localBusinessSchema = generateLocalBusinessSchema('Cementerio Virtual Perros Espana');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Cementerio Virtual Perros Espana - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen bg-white">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      <div className="relative h-[500px] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1633722715463-d30628519b9d?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-orange-900/80 to-red-900/80" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">🐕 Perros de España</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Cementerio Virtual para Perros en España</h1>
            <p className="text-xl text-white/90 mb-8">Honra a tu perro en la comunidad española de mascotas</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create"><Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8">Crear Memorial</Button></Link>
              <Link href="/map"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">Ver Perros</Button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Un Memorial para tu Perro Español</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🐕</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad de Perros</h3><p className="text-gray-600">Miles de perros españoles recordados en nuestro cementerio.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">📍</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Por Región</h3><p className="text-gray-600">Encuentra perros recordados en tu comunidad autónoma.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">❤️</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Apoyo Español</h3><p className="text-gray-600">Conecta con otros dueños que comparten tu amor por los perros.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🎾</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Razas Españolas</h3><p className="text-gray-600">Celebra todas las razas, incluyendo las españolas como el Mastín.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">📸</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Galería Completa</h3><p className="text-gray-600">Sube fotos ilimitadas de tu perro en diferentes momentos.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">♾️</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Recuerdo Eterno</h3><p className="text-gray-600">Tu perro vivirá para siempre en la memoria española.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Pasos para Crear el Memorial</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Información del Perro</h3><p className="text-gray-600">Raza, edad, región y características especiales de tu perro.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos Especiales</h3><p className="text-gray-600">Sube tus fotos favoritas y comparte historias especiales.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Comparte</h3><p className="text-gray-600">Invita a otros a visitar y celebrar a tu perro español.</p></div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Qué razas puedo registrar?</h3><p className="text-gray-600">Todas las razas: puras, mestizas, grandes, pequeñas. Todos los perros son bienvenidos.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Puedo ver perros de mi región?</h3><p className="text-gray-600">Sí, filtra por región española para ver memoriales locales.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Cómo protejo la privacidad?</h3><p className="text-gray-600">Tienes control total sobre quién puede ver el memorial.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Hay comunidades locales?</h3><p className="text-gray-600">Sí, conecta con otros dueños de perros en tu comunidad autónoma.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Cuánto cuesta?</h3><p className="text-gray-600">El memorial básico es gratuito. Planes premium disponibles.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Crea un Memorial para tu Perro Ahora</h2>
          <p className="text-xl text-white/90 mb-8">Tu perro merece un lugar especial en España.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-6 text-lg">Crear Memorial</Button></Link>
        </div>
      </div>
    </div>
  );
}
