'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';

const pageSlug = 'memorial-pajaros-online';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Memorial Pajaros Online', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Memorial Pajaros Online');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Memorial Pajaros Online - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1554146297-4d58bda4c9b1?q=80&w=2000)',}} />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/80 via-sky-800/70 to-background" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🐦 Pájaros</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🎵 Cantos</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">♾️ Online</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">Memorial de Pájaros <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-300">Online</span></h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">Sus cantos melodiosos vivirán en nuestras memorias por siempre.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map"><Button size="lg" className="bg-white text-sky-800 hover:bg-sky-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">🗺️ Ver Memorials</Button></Link>
              <Link href="/create"><Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sky-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">✨ Crear Memorial</Button></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-background to-sky-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">Cantos que Llenaban el Hogar</h2>
            <p className="text-xl text-gray-600">Sus melodías vivirán eternamente en nuestros corazones</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-sky-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🐦</div><CardTitle>Cantos</CardTitle></CardHeader><CardContent className="text-gray-600">Sus melodías memorables grabadas.</CardContent></Card>
            <Card className="border-sky-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🎵</div><CardTitle>Música</CardTitle></CardHeader><CardContent className="text-gray-600">La música de la naturaleza en tu hogar.</CardContent></Card>
            <Card className="border-sky-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🌅</div><CardTitle>Mañanas</CardTitle></CardHeader><CardContent className="text-gray-600">Esos despertares llenos de alegría.</CardContent></Card>
            <Card className="border-sky-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">📷</div><CardTitle>Momentos</CardTitle></CardHeader><CardContent className="text-gray-600">Captura sus poses más lindas.</CardContent></Card>
            <Card className="border-sky-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🎙️</div><CardTitle>Audio</CardTitle></CardHeader><CardContent className="text-gray-600">Graba sus sonidos especiales.</CardContent></Card>
            <Card className="border-sky-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">♾️</div><CardTitle>Siempre</CardTitle></CardHeader><CardContent className="text-gray-600">Para siempre en internet.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">Crea un Memorial</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-sky-700">1</div><h3 className="text-2xl font-bold text-sky-900 mb-2">Info</h3><p className="text-gray-600">Especie y nombre.</p></div>
            <div className="text-center"><div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-sky-700">2</div><h3 className="text-2xl font-bold text-sky-900 mb-2">Audio</h3><p className="text-gray-600">Graba sus cantos.</p></div>
            <div className="text-center"><div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-sky-700">3</div><h3 className="text-2xl font-bold text-sky-900 mb-2">Publica</h3><p className="text-gray-600">Memorial listo.</p></div>
          </div>
          <div className="text-center mt-12"><Link href="/create"><Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-7 text-lg font-semibold">Crear Memorial</Button></Link></div>
        </div>
      </section>
      <section className="py-20 bg-sky-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">Preguntas</h2></div>
          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-lg">¿Puedo grabar audio?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, sus cantos pueden grabarse.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Especies?</CardTitle></CardHeader><CardContent className="text-gray-600">Todas las aves son bienvenidas.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Gratis?</CardTitle></CardHeader><CardContent className="text-gray-600">Completamente gratis.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Seguro?</CardTitle></CardHeader><CardContent className="text-gray-600">Totalmente protegido.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Eternidad?</CardTitle></CardHeader><CardContent className="text-gray-600">Para siempre online.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-sky-600 to-sky-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tu Pájaro Vivirá Para Siempre</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Crea su memorial especial hoy.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-sky-700 hover:bg-sky-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">Crear Memorial Gratuito</Button></Link>
        </div>
      </section>
    </div>
  );
}
