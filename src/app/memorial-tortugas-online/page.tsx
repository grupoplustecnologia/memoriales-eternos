'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';

const pageSlug = 'memorial-tortugas-online';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Memorial Tortugas', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, para todas tus mascotas.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function MemorialTortugasOnline() {
  const localBusinessSchema = generateLocalBusinessSchema('Memorial Tortugas Online');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Memorial Tortugas Online - Forever Pet Friend', 'Memorial para tortugas.', canonical, ogImage);
  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1544145945-f90425fb75a7?q=80&w=2000)',}} />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 via-teal-800/70 to-background" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🐢 Tortugas</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">♾️ Sabias</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">Online</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">Memorial de Tortugas <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Online</span></h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">Sabias, pacientes y eternas. Sus décadas contigo vivirán para siempre.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map"><Button size="lg" className="bg-white text-teal-800 hover:bg-teal-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">🗺️ Ver Memorials</Button></Link>
              <Link href="/create"><Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-teal-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">✨ Crear Memorial</Button></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-background to-teal-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">Sabidría y Paciencia Eternas</h2>
            <p className="text-xl text-gray-600">Décadas juntos en un viaje lleno de serenidad</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-teal-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🐢</div><CardTitle>Longevidad</CardTitle></CardHeader><CardContent className="text-gray-600">Años y décadas de compañía.</CardContent></Card>
            <Card className="border-teal-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🧘</div><CardTitle>Paciencia</CardTitle></CardHeader><CardContent className="text-gray-600">Su serenidad nos enseñó paz.</CardContent></Card>
            <Card className="border-teal-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">💚</div><CardTitle>Sabiduría</CardTitle></CardHeader><CardContent className="text-gray-600">Milenios de historia en sus ojos.</CardContent></Card>
            <Card className="border-teal-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">📅</div><CardTitle>Años</CardTitle></CardHeader><CardContent className="text-gray-600">Documenta todos los años juntos.</CardContent></Card>
            <Card className="border-teal-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">📸</div><CardTitle>Momentos</CardTitle></CardHeader><CardContent className="text-gray-600">Captura los detalles especiales.</CardContent></Card>
            <Card className="border-teal-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">♾️</div><CardTitle>Eternidad</CardTitle></CardHeader><CardContent className="text-gray-600">Para siempre en internet.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">Crea un Memorial</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-teal-700">1</div><h3 className="text-2xl font-bold text-teal-900 mb-2">Años</h3><p className="text-gray-600">Fecha de inicio y final.</p></div>
            <div className="text-center"><div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-teal-700">2</div><h3 className="text-2xl font-bold text-teal-900 mb-2">Historias</h3><p className="text-gray-600">Décadas de momentos.</p></div>
            <div className="text-center"><div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-teal-700">3</div><h3 className="text-2xl font-bold text-teal-900 mb-2">Publica</h3><p className="text-gray-600">Memorial listo.</p></div>
          </div>
          <div className="text-center mt-12"><Link href="/create"><Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-7 text-lg font-semibold">Crear Memorial</Button></Link></div>
        </div>
      </section>
      <section className="py-20 bg-teal-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">Preguntas</h2></div>
          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-lg">¿Muchos años?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, documenta todos los años.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Gratis?</CardTitle></CardHeader><CardContent className="text-gray-600">Totalmente gratis.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Seguro?</CardTitle></CardHeader><CardContent className="text-gray-600">Completamente protegido.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Compartir?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, con la familia.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Para siempre?</CardTitle></CardHeader><CardContent className="text-gray-600">Eternamente en línea.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tu Tortuga Vivirá Para Siempre</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Crea su memorial especial hoy.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">Crear Memorial Gratuito</Button></Link>
        </div>
      </section>
    </div>
  );
}
