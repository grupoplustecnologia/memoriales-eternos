'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export default function HomenajeLosPerros() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=2000)',}} />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/80 via-orange-800/70 to-background" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🐕 Perros</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">💕 Homenaje</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🌹 Virtual</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">Homenaje Virtual <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Perros</span></h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">El mejor amigo del hombre merece el mejor homenaje. Celebra la lealtad infinita de los perros.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map"><Button size="lg" className="bg-white text-orange-800 hover:bg-orange-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">🗺️ Ver Homenajes</Button></Link>
              <Link href="/create"><Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">✨ Crear Homenaje</Button></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-background to-orange-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">Celebra la Lealtad de los Perros</h2><p className="text-xl text-gray-600">Compañeros eternos que nunca nos abandonaron</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🐕</div><CardTitle>Lealtad</CardTitle></CardHeader><CardContent className="text-gray-600">Amor sin condiciones.</CardContent></Card>
            <Card className="border-orange-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">😊</div><CardTitle>Alegría</CardTitle></CardHeader><CardContent className="text-gray-600">Su felicidad contagiosa.</CardContent></Card>
            <Card className="border-orange-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">🎾</div><CardTitle>Aventuras</CardTitle></CardHeader><CardContent className="text-gray-600">Todas esas caminatas.</CardContent></Card>
            <Card className="border-orange-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">📸</div><CardTitle>Momentos</CardTitle></CardHeader><CardContent className="text-gray-600">Cada instante especial.</CardContent></Card>
            <Card className="border-orange-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">❤️</div><CardTitle>Amor</CardTitle></CardHeader><CardContent className="text-gray-600">Profundo e incondicional.</CardContent></Card>
            <Card className="border-orange-200 hover:shadow-lg transition-shadow"><CardHeader><div className="text-4xl mb-2">♾️</div><CardTitle>Eternidad</CardTitle></CardHeader><CardContent className="text-gray-600">Para siempre aquí.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">Crea un Homenaje</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">1</div><h3 className="text-2xl font-bold text-orange-900 mb-2">Razas</h3><p className="text-gray-600">Todas las razas importan.</p></div>
            <div className="text-center"><div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">2</div><h3 className="text-2xl font-bold text-orange-900 mb-2">Historias</h3><p className="text-gray-600">Sus historias especiales.</p></div>
            <div className="text-center"><div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-700">3</div><h3 className="text-2xl font-bold text-orange-900 mb-2">Honra</h3><p className="text-gray-600">Su memoria honrada.</p></div>
          </div>
          <div className="text-center mt-12"><Link href="/create"><Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-7 text-lg font-semibold">Crear Homenaje</Button></Link></div>
        </div>
      </section>
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">Preguntas</h2></div>
          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-lg">¿Todas las razas?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, todas son valiosas.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Gratis?</CardTitle></CardHeader><CardContent className="text-gray-600">Completamente gratis.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Compartir?</CardTitle></CardHeader><CardContent className="text-gray-600">Sí, con todos.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Seguro?</CardTitle></CardHeader><CardContent className="text-gray-600">Totalmente protegido.</CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">¿Editar?</CardTitle></CardHeader><CardContent className="text-gray-600">Siempre que quieras.</CardContent></Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tus Perros Merecen Este Homenaje</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Celebra su lealtad eterna.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-orange-700 hover:bg-orange-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">Crear Homenaje Gratuito</Button></Link>
        </div>
      </section>
    </div>
  );
}
