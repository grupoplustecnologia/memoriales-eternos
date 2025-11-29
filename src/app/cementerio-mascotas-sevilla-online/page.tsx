'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CementerioMascotasSevillaOnline() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px] bg-gradient-to-r from-teal-600 via-green-500 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1587300411107-ec5ff141dd51?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-green-900/80 to-teal-900/80" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">✨ Sevilla</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Cementerio de Mascotas en Sevilla</h1>
            <p className="text-xl text-white/90 mb-8">Honra a tus mascotas en Sevilla</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create"><Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8">Crear Memorial</Button></Link>
              <Link href="/map"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">Ver Mascotas</Button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Cementerio Virtual para tus Mascotas en Sevilla</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">✨</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Sevilla Flamenca</h3><p className="text-gray-600">Comunidad de mascotas en la ciudad de la pasión.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">📍</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Tu Barrio</h3><p className="text-gray-600">Encuentra mascotas de tu Sevilla.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">❤️</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Apoyo Sevillano</h3><p className="text-gray-600">Comunidad sevillana cálida y comprensiva.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🌍</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Alcance Global</h3><p className="text-gray-600">Comparte recuerdos desde Sevilla con el mundo.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">💾</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Preservación</h3><p className="text-gray-600">Preserva los recuerdos de tus mascotas sevillanas.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">♾️</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Eterno</h3><p className="text-gray-600">Tu mascota vivirá en la memoria sevillana para siempre.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Crea Memorial en Sevilla</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Datos</h3><p className="text-gray-600">Nombre, tipo, edad y tu zona en Sevilla.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos</h3><p className="text-gray-600">Fotos de tu mascota sevillana.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir</h3><p className="text-gray-600">Invita a amigos y familia a celebrar.</p></div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Preguntas Frecuentes - Sevilla</h2>
          <div className="space-y-6">
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Mascotas de Sevilla?</h3><p className="text-gray-600">Sí, todas las mascotas de Sevilla bienvenidas.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Veterinarios Sevilla?</h3><p className="text-gray-600">Sí, conexión con recursos locales.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Comunidad local?</h3><p className="text-gray-600">Sí, mascoteros sevillanos activos.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿24/7?</h3><p className="text-gray-600">Sí, visita siempre desde Sevilla.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Privacidad?</h3><p className="text-gray-600">Sí, privacy garantizada para todos.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gradient-to-r from-teal-600 via-green-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Crea Memorial de tu Mascota Sevillana</h2>
          <p className="text-xl text-white/90 mb-8">Honra a tu mascota en Sevilla hoy mismo.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-6 text-lg">Crear Memorial</Button></Link>
        </div>
      </div>
    </div>
  );
}
