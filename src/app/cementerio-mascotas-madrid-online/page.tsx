'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CementerioMascotasMadridOnline() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px] bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1587300411107-ec5ff141dd51?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-yellow-900/80 to-red-900/80" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">🐾 Madrid</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Cementerio de Mascotas en Madrid</h1>
            <p className="text-xl text-white/90 mb-8">Honra a tus mascotas en la capital de España</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create"><Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8">Crear Memorial</Button></Link>
              <Link href="/map"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">Ver Mascotas</Button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Cementerio Virtual para tus Mascotas en Madrid</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🇪🇸</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Madrid Capital</h3><p className="text-gray-600">Comunidad de mascotas en la capital española.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">📍</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Tu Distrito</h3><p className="text-gray-600">Encuentra mascotas de tu zona en Madrid.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">❤️</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Apoyo Local</h3><p className="text-gray-600">Comunidad madrileña comprensiva y amorosa.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">🌍</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Alcance Global</h3><p className="text-gray-600">Comparte recuerdos de Madrid con el mundo.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">💾</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Preservación</h3><p className="text-gray-600">Preserva los recuerdos de tus mascotas madrileñas.</p></Card>
            <Card className="p-6 hover:shadow-lg transition-shadow"><div className="text-4xl mb-4">♾️</div><h3 className="text-xl font-semibold mb-3 text-gray-900">Eterno</h3><p className="text-gray-600">Tu mascota vivirá en la memoria madrileña para siempre.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Crea Memorial en Madrid</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Datos</h3><p className="text-gray-600">Nombre, tipo, edad y tu distrito en Madrid.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos</h3><p className="text-gray-600">Fotos de tu mascota madrileña.</p></div>
            <div className="text-center"><div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div><h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir</h3><p className="text-gray-600">Invita a amigos y familia a celebrar.</p></div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Preguntas Frecuentes - Madrid</h2>
          <div className="space-y-6">
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Mascotas de todos los distritos?</h3><p className="text-gray-600">Sí, desde Centro a Fuencarral, Salamanca a Villaverde.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Hay veterinarios madrileños?</h3><p className="text-gray-600">Sí, conexión con recursos locales.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Grupos locales Madrid?</h3><p className="text-gray-600">Sí, comunidad activa de mascoteros madrileños.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Acceso 24/7?</h3><p className="text-gray-600">Sí, visita siempre que necesites recordar.</p></Card>
            <Card className="p-6"><h3 className="text-xl font-semibold mb-3 text-gray-900">¿Privacidad garantizada?</h3><p className="text-gray-600">Sí, controla quién ve el memorial.</p></Card>
          </div>
        </div>
      </div>
      <div className="py-16 px-4 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Crea Memorial de tu Mascota Madrileña</h2>
          <p className="text-xl text-white/90 mb-8">Honra a tu mascota en Madrid hoy mismo.</p>
          <Link href="/create"><Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg">Crear Memorial</Button></Link>
        </div>
      </div>
    </div>
  );
}
