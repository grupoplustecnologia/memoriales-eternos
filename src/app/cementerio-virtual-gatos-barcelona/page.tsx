'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CementerioVirtualGatosBarcelona() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px] bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">🐱 Barcelona</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Cementerio Virtual Gatos Barcelona</h1>
            <p className="text-xl text-white/90 mb-8">Memorial para tus gatos en Barcelona</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create"><Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8">Crear Memorial</Button></Link>
              <Link href="/map"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">Ver Gatos</Button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Honra a tu Gato en Barcelona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🐱</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Tu Felino</h3><p className="text-gray-600">Tu gato fue especial y merece un memorial.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">😺</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Personalidad</h3><p className="text-gray-600">Celebra la personalidad única de tu gato.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">📍</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Barcelona</h3><p className="text-gray-600">Comunidad barcelonesa de gatos.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">💝</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Recuerdos</h3><p className="text-gray-600">Fotos y historias de tu gato.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">👥</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad</h3><p className="text-gray-600">Conecta con otros amantes de gatos.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🌟</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Eterno</h3><p className="text-gray-600">Tu gato vivirá en la memoria eterna.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Crear Memorial</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Datos</h3><p className="text-gray-600">Raza, nombre, edad del gato.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos</h3><p className="text-gray-600">Momentos especiales con tu gato.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir</h3><p className="text-gray-600">Con la comunidad de Barcelona.</p></div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Preguntas</h2>
          <div className="space-y-6">
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Todas las razas?</h3><p className="text-gray-600">Sí, cualquier gato puede tener memorial.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Editar?</h3><p className="text-gray-600">Sí, siempre que lo necesites.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Privacidad?</h3><p className="text-gray-600">Sí, control total.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Duración?</h3><p className="text-gray-600">Eterno en Barcelona.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Soporte?</h3><p className="text-gray-600">Sí, equipo disponible.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Homenajea a tu Gato</h2>
          <p className="text-xl text-white/90 mb-8">Tu gato merece un memorial eterno en Barcelona.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg">Crear Ahora</Button></Link>
        </div>
      </div>
    </div>
  );
}
