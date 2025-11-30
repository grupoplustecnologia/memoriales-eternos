'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SchemaHead } from '@/components/SchemaHead';
import { CanonicalHead } from '@/components/CanonicalHead';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/schema';
import { getCanonicalUrl, getOgImageUrl } from '@/lib/seo';

const pageSlug = 'homenaje-virtual-gatos';
const canonical = getCanonicalUrl(`/${pageSlug}`);
const ogImage = getOgImageUrl(pageSlug, 'landing');

const breadcrumbs = [{ name: 'Home', url: 'https://memorias-eternas.app' }, { name: 'Homenaje Virtual Gatos', url: canonical }];
const faqs = [{ question: '¿Puedo crear un memorial?', answer: 'Sí, completamente.' }, { question: '¿Es gratis?', answer: 'Sí.' }, { question: '¿Puedo compartir?', answer: 'Sí.' }];

export default function Page() {
  const localBusinessSchema = generateLocalBusinessSchema('Homenaje Virtual Gatos');
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(faqs);
  const webPageSchema = generateWebPageSchema('Homenaje Virtual Gatos - Forever Pet Friend', 'Memorial para mascotas.', canonical, ogImage);

  return (
    <div className="min-h-screen">
      <CanonicalHead url={canonical} />
      <SchemaHead schemas={[localBusinessSchema, breadcrumbSchema, faqSchema, webPageSchema]} />
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=2000)',}} />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-indigo-800/70 to-background" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🐱 Gatos</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">💕 Homenaje</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🌹 Virtual</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">Homenaje Virtual <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">Gatos</span></h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">Independientes, misteriosos, tiernos. Los gatos merecen un homenaje especial.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map"><Button size="lg" className="bg-white text-indigo-800 hover:bg-indigo-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">🗺️ Ver Homenajes</Button></Link>
              <Link href="/create"><Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-indigo-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">✨ Crear Homenaje</Button></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-background to-indigo-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">La Magia de los Gatos</h2><p className="text-xl text-gray-600">Independientes pero profundamente amorosos</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🐱</div><CardTitle>Independencia</CardTitle></CardHeader><CardContent className="text-gray-600">A su propio ritmo, siempre especiales.</CardContent></Card>
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">✨</div><CardTitle>Misterio</CardTitle></CardHeader><CardContent className="text-gray-600">Su enigma nos fascinaba.</CardContent></Card>
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🏠</div><CardTitle>Hogar</CardTitle></CardHeader><CardContent className="text-gray-600">Centro del hogar.</CardContent></Card>
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">😸</div><CardTitle>Personalidad</CardTitle></CardHeader><CardContent className="text-gray-600">Cada gato es único.</CardContent></Card>
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">💕</div><CardTitle>Afecto</CardTitle></CardHeader><CardContent className="text-gray-600">Su amor silencioso fue profundo.</CardContent></Card>
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">♾️</div><CardTitle>Eternidad</CardTitle></CardHeader><CardContent className="text-gray-600">Para siempre recordados.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">Crea un Homenaje</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-700">1</div><h3 className="text-2xl font-bold text-indigo-900 mb-2">Gatos</h3><p className="text-gray-600">Todas las razas.</p></div>
            <div className="text-center"><div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-700">2</div><h3 className="text-2xl font-bold text-indigo-900 mb-2">Recuerdos</h3><p className="text-gray-600">Sus momentos tiernos.</p></div>
            <div className="text-center"><div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-700">3</div><h3 className="text-2xl font-bold text-indigo-900 mb-2">Honra</h3><p className="text-gray-600">Su legado honrado.</p></div>
          </div>
          <div className="text-center mt-12"><Link href="/create"><Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-7 text-lg font-semibold">Crear Homenaje</Button></Link></div>
        </div>
      </section>
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">Preguntas</h2></div>
          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-lg">¿Para gatos?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, todos los tipos.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Gratis?</CardTitle></CardHeader><CardContent className="text-gray-600">Completamente gratis.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Compartir?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, con familia.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Seguro?</CardTitle></CardHeader><CardContent className="text-gray-600">Totalmente protegido.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Editar?</CardTitle></CardHeader><CardContent className="text-gray-600">Siempre que quieras.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tus Gatos Merecen Este Homenaje</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Celebra su independencia especial.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">Crear Homenaje Gratuito</Button></Link>
        </div>
      </section>
    </div>
  );
}
