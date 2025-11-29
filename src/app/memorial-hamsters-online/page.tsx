'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MemorialHamstersOnline() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1585309742884-2823bba74ce8?q=80&w=2000)',}} />
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/80 via-yellow-800/70 to-background" />
        </div>
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">🐹 Hámsters</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">💝 Memorial</Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">♾️ Online</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">Memorial de Hámsters <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">Online</span></h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">Pequeño tamaño, amor gigante. Tu hámster vivirá para siempre aquí.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map"><Button size="lg" className="bg-white text-yellow-800 hover:bg-yellow-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300">🗺️ Ver Memorials</Button></Link>
              <Link href="/create"><Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-yellow-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300">✨ Crear Memorial</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-yellow-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-4">Pequeño Tamaño, Gran Corazón</h2>
            <p className="text-xl text-gray-600">Aunque fueron pequeños, dejaron grandes recuerdos</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader><div className="text-4xl mb-2">🐹</div><CardTitle>Adorables</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Esos ojitos y carrillos llenos de comida.</CardContent>
            </Card>
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader><div className="text-4xl mb-2">💕</div><CardTitle>Compañía</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Noches acompañados por sus correrías.</CardContent>
            </Card>
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader><div className="text-4xl mb-2">🌟</div><CardTitle>Memorias</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Momentos dulces recordados eternamente.</CardContent>
            </Card>
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader><div className="text-4xl mb-2">📸</div><CardTitle>Fotos</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Captura sus poses más tiernas.</CardContent>
            </Card>
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader><div className="text-4xl mb-2">🎁</div><CardTitle>Tributos</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Recibe apoyo de la comunidad.</CardContent>
            </Card>
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader><div className="text-4xl mb-2">♾️</div><CardTitle>Eternidad</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Para siempre en internet.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-4">Crea un Memorial</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-yellow-700">1</div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">Información</h3>
              <p className="text-gray-600">Nombre, edad, color.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-yellow-700">2</div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">Fotos</h3>
              <p className="text-gray-600">Sus momentos favoritos.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-yellow-700">3</div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-2">Publica</h3>
              <p className="text-gray-600">Memorial listo para honrarlo.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/create"><Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-7 text-lg font-semibold">Crear Memorial Ahora</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-4">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">¿Es gratis?</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Sí, completamente gratis.</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">¿Cuánto dura?</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Para siempre en internet.</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">¿Puedo compartir?</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Sí, con quien quieras.</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">¿Es seguro?</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Totalmente, con encriptación.</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">¿Puedo editar?</CardTitle></CardHeader>
              <CardContent className="text-gray-600">Sí, siempre que quieras.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tu Hámster Vivirá Para Siempre</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Crea un memorial especial hoy.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-yellow-700 hover:bg-yellow-50 px-12 py-7 text-lg font-semibold shadow-lg hover:scale-105 transition-all">Crear Memorial Gratuito</Button></Link>
        </div>
      </section>
    </div>
  );
}
