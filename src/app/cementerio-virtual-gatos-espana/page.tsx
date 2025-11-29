'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CementerioVirtualGatosEspana() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-red-900/80" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">🐱 Gatos de España</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Cementerio Virtual para Gatos en España</h1>
            <p className="text-xl text-white/90 mb-8">Honra a tu gato felino en la comunidad española</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create"><Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8">Crear Memorial</Button></Link>
              <Link href="/map"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">Ver Gatos</Button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Un Memorial para tu Gato Español</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🐈</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad Felina</h3><p className="text-gray-600">Miles de gatos españoles en nuestro cementerio virtual.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">😺</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Personalidad Única</h3><p className="text-gray-600">Celebra la personalidad especial de tu gato.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">📍</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Por Región</h3><p className="text-gray-600">Encuentra gatos recordados en toda España.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🎀</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Razas y Colores</h3><p className="text-gray-600">Documenta la raza, colores y marcas especiales de tu gato.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">💚</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad Amorosa</h3><p className="text-gray-600">Conecta con otros amantes de gatos en España.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">♾️</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Eterno</h3><p className="text-gray-600">Tu gato vivirá en la memoria española para siempre.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Crea el Memorial de tu Gato</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Datos del Gato</h3><p className="text-gray-600">Nombre, raza, edad, colores y tu región en España.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos Hermosas</h3><p className="text-gray-600">Carga fotos especiales de tu gato en diferentes momentos.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir</h3><p className="text-gray-600">Invita a otros a celebrar la vida de tu gato.</p></div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Qué razas de gatos?</h3><p className="text-gray-600">Todas las razas: persa, siamés, bengalí, doméstico... todos son bienvenidos.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Puedo ver gatos por región?</h3><p className="text-gray-600">Sí, filtra memoriales por tu comunidad autónoma.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Hay grupos locales?</h3><p className="text-gray-600">Sí, conecta con otros amantes de gatos en tu región.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Cuántas fotos puedo subir?</h3><p className="text-gray-600">Fotos ilimitadas en el memorial de tu gato.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Es gratuito?</h3><p className="text-gray-600">El memorial básico es gratuito. Planes premium disponibles.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Crea un Memorial para tu Gato Hoy</h2>
          <p className="text-xl text-white/90 mb-8">Tu gato fue especial y merece ser recordado en España.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">Crear Memorial</Button></Link>
        </div>
      </div>
    </div>
  );
}
