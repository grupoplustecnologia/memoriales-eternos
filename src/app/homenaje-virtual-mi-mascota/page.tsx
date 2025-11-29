'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export default function HomenajeMiMascota() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1611003228941-98852ba62227?q=80&w=2000)',}} />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-900/80 via-rose-800/70 to-background" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🐾 Mi Mascota</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">💕 Homenaje</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🌹 Virtual</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">Homenaje a Mi Mascota <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300">Virtual</span></h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">Fuera cual sea tu mascota, merece un homenaje especial. Aquí vivirá eternamente.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map"><Button size="lg" className="bg-white text-rose-800 hover:bg-rose-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">🗺️ Ver Homenajes</Button></Link>
              <Link href="/create"><Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-rose-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">✨ Crear Homenaje</Button></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-background to-rose-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">Tu Mascota Es Especial</h2><p className="text-xl text-gray-600">Cualquier mascota merece ser recordada con amor</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-rose-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🐾</div><CardTitle>Especial</CardTitle></CardHeader><CardContent className="text-gray-600">Cada mascota es única.</CardContent></Card>
            <Card className="border-rose-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">💝</div><CardTitle>Valor</CardTitle></CardHeader><CardContent className="text-gray-600">Vale todo tu amor.</CardContent></Card>
            <Card className="border-rose-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🌟</div><CardTitle>Memoria</CardTitle></CardHeader><CardContent className="text-gray-600">Recordada siempre.</CardContent></Card>
            <Card className="border-rose-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">👥</div><CardTitle>Comunidad</CardTitle></CardHeader><CardContent className="text-gray-600">Conecta con otros.</CardContent></Card>
            <Card className="border-rose-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">📖</div><CardTitle>Historia</CardTitle></CardHeader><CardContent className="text-gray-600">Cuéntala al mundo.</CardContent></Card>
            <Card className="border-rose-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">♾️</div><CardTitle>Eternidad</CardTitle></CardHeader><CardContent className="text-gray-600">Para siempre aquí.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">Crea un Homenaje</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-rose-700">1</div><h3 className="text-2xl font-bold text-rose-900 mb-2">Tu Mascota</h3><p className="text-gray-600">Nombre y detalles.</p></div>
            <div className="text-center"><div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-rose-700">2</div><h3 className="text-2xl font-bold text-rose-900 mb-2">Recuerdos</h3><p className="text-gray-600">Fotos y historias.</p></div>
            <div className="text-center"><div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-rose-700">3</div><h3 className="text-2xl font-bold text-rose-900 mb-2">Homenajea</h3><p className="text-gray-600">Su vida es memorable.</p></div>
          </div>
          <div className="text-center mt-12"><Link href="/create"><Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-7 text-lg font-semibold">Crear Homenaje</Button></Link></div>
        </div>
      </section>
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">Preguntas</h2></div>
          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-lg">¿Cualquier mascota?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, todas son bienvenidas.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Gratis?</CardTitle></CardHeader><CardContent className="text-gray-600">Totalmente gratis.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Compartir?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, con el mundo.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Seguro?</CardTitle></CardHeader><CardContent className="text-gray-600">Completamente protegido.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Editar?</CardTitle></CardHeader><CardContent className="text-gray-600">Siempre que desees.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-rose-600 to-rose-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tu Mascota Merece Este Homenaje</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Celebra su amor especial hoy.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-rose-700 hover:bg-rose-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">Crear Homenaje Gratuito</Button></Link>
        </div>
      </section>
    </div>
  );
}
