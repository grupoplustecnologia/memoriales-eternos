'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export default function MemorialHuronesOnline() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1575253550318-47fdaf4050c2?q=80&w=2000)',}} />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 via-amber-800/70 to-background" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🦡 Hurones</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">⚡ Traviesos</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">♾️ Online</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">Memorial de Hurones <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">Online</span></h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">Traviesos, energéticos y llenos de amor. Sus aventuras vivirán para siempre.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map"><Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">🗺️ Ver Memorials</Button></Link>
              <Link href="/create"><Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-amber-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">✨ Crear Memorial</Button></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-background to-amber-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Energía Infinita y Amor Puro</h2>
            <p className="text-xl text-gray-600">Traviesos aventureros que llenaban de diversión cada día</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">⚡</div><CardTitle>Energía</CardTitle></CardHeader><CardContent className="text-gray-600">Esa energía infinita que nos hacía reír.</CardContent></Card>
            <Card className="border-amber-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🎮</div><CardTitle>Juegos</CardTitle></CardHeader><CardContent className="text-gray-600">Sus travesuras y aventuras guardadas.</CardContent></Card>
            <Card className="border-amber-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">💕</div><CardTitle>Amor</CardTitle></CardHeader><CardContent className="text-gray-600">Su cariño travieso será recordado.</CardContent></Card>
            <Card className="border-amber-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🎬</div><CardTitle>Videos</CardTitle></CardHeader><CardContent className="text-gray-600">Captura sus momentos más divertidos.</CardContent></Card>
            <Card className="border-amber-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">📸</div><CardTitle>Fotos</CardTitle></CardHeader><CardContent className="text-gray-600">Sus poses traviesas documentadas.</CardContent></Card>
            <Card className="border-amber-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">♾️</div><CardTitle>Eternidad</CardTitle></CardHeader><CardContent className="text-gray-600">Para siempre en línea.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Crea un Memorial</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">1</div><h3 className="text-2xl font-bold text-amber-900 mb-2">Info</h3><p className="text-gray-600">Nombre y detalles.</p></div>
            <div className="text-center"><div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">2</div><h3 className="text-2xl font-bold text-amber-900 mb-2">Aventuras</h3><p className="text-gray-600">Fotos y videos divertidos.</p></div>
            <div className="text-center"><div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-amber-700">3</div><h3 className="text-2xl font-bold text-amber-900 mb-2">Publica</h3><p className="text-gray-600">Memorial listo.</p></div>
          </div>
          <div className="text-center mt-12"><Link href="/create"><Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-7 text-lg font-semibold">Crear Memorial</Button></Link></div>
        </div>
      </section>
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Preguntas</h2></div>
          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-lg">¿Incluye videos?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, todas sus travesuras.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Gratis?</CardTitle></CardHeader><CardContent className="text-gray-600">Totalmente gratis.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Seguro?</CardTitle></CardHeader><CardContent className="text-gray-600">Completamente protegido.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Compartir?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, con familiares.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Editar?</CardTitle></CardHeader><CardContent className="text-gray-600">Siempre que quieras.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tu Hurón Vivirá Para Siempre</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Crea su memorial especial hoy.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">Crear Memorial Gratuito</Button></Link>
        </div>
      </section>
    </div>
  );
}
