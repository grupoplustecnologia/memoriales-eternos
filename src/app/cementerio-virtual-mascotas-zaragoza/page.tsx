'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CementerioVirtualMascotasZaragoza() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px] bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1587300411107-ec5ff141dd51?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">🎪 Zaragoza</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Cementerio Virtual Mascotas Zaragoza</h1>
            <p className="text-xl text-white/90 mb-8">Memorial online para tus mascotas en Zaragoza</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create"><Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8">Crear Memorial</Button></Link>
              <Link href="/map"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">Ver Mascotas</Button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Tu Cementerio Virtual en Zaragoza</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🎪</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Zaragoza Pilar</h3><p className="text-gray-600">Comunidad mascotera zaragozana.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">💫</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Virtual Eterno</h3><p className="text-gray-600">Memorial online permanente para tus mascotas.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🎨</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Personalizado</h3><p className="text-gray-600">Diseña el memorial único de tu mascota.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">📸</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Galería Fotográfica</h3><p className="text-gray-600">Sube todas las fotos de tu mascota zaragozana.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">❤️</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Homenaje Permanente</h3><p className="text-gray-600">Homenaje eterno para tu mascota.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🌟</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Recuerdos Compartidos</h3><p className="text-gray-600">Comparte momentos especiales con otros mascoteros.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">¿Cómo Funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Crea tu Memorial</h3><p className="text-gray-600">Información de tu mascota en Zaragoza.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Añade Fotos</h3><p className="text-gray-600">Galería sin límite de fotos.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Comparte</h3><p className="text-gray-600">Con tu comunidad zaragozana.</p></div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Costo del memorial?</h3><p className="text-gray-600">Memorial básico gratuito con opciones premium.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Acceso a otros memoriales?</h3><p className="text-gray-600">Sí, explora memoriales de mascotas en Zaragoza.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Datos protegidos?</h3><p className="text-gray-600">Sí, privacidad máxima garantizada.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Duración del memorial?</h3><p className="text-gray-600">Para siempre, es eterno.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Editar memorial?</h3><p className="text-gray-600">Sí, en cualquier momento.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Crea el Memorial Virtual</h2>
          <p className="text-xl text-white/90 mb-8">Tu mascota merece vivir en la memoria zaragozana para siempre.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg">Iniciar Ahora</Button></Link>
        </div>
      </div>
    </div>
  );
}
