'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CrearMemorialGato() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐱 Crear Memorial para tu Gato
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial Digital para tu Gato
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Celebra la vida felina de tu compañero con un hermoso memorial eterno
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8">
                  Crear Memorial de mi Gato
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales de Gatos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Un Espacio Especial para tu Felino Amado
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐈</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Diseño Felino</h3>
              <p className="text-gray-600">
                Plantillas especiales diseñadas para capturar la elegancia y misterio de tu gato.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Galería Premium</h3>
              <p className="text-gray-600">
                Sube fotos de los momentos más tiernos: acurrucado, jugando, o en su lugar favorito.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mensajes de Amor</h3>
              <p className="text-gray-600">
                Familia y amigos pueden compartir anécdotas y momentos especiales con tu gato.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Personalización</h3>
              <p className="text-gray-600">
                Elige colores, música y otros elementos para hacer el memorial único.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Biografía Completa</h3>
              <p className="text-gray-600">
                Documenta la historia de vida de tu gato desde que llegó a tu corazón.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌈</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Legado Eterno</h3>
              <p className="text-gray-600">
                Un lugar permanente donde tu gato vivirá en la memoria de quienes lo amaron.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Crear el Memorial de tu Gato
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Datos del Gato</h3>
              <p className="text-gray-600">
                Completa el nombre, raza, edad, características especiales y personalidad de tu gato.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos Hermosas</h3>
              <p className="text-gray-600">
                Carga fotos de tus momentos más bonitos con tu gato y comparte historias especiales.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir</h3>
              <p className="text-gray-600">
                Comparte con todos los que amaron a tu gato. Juntos celebren su vida especial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas Frecuentes sobre Memoriales de Gatos
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Qué información incluir sobre mi gato?
              </h3>
              <p className="text-gray-600">
                Nombre, raza, características físicas, personalidad, hábitos especiales, y anécdotas que lo hicieron único.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo cambiar el aspecto del memorial?
              </h3>
              <p className="text-gray-600">
                Sí, puedes personalizar colores, temas, agregar música y cambiar el diseño en cualquier momento.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuántas fotos puedo subir?
              </h3>
              <p className="text-gray-600">
                Puedes subir fotos ilimitadas en el memorial. Con planes premium tienes opciones de almacenamiento expandido.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿El memorial permanece para siempre?
              </h3>
              <p className="text-gray-600">
                Sí, el memorial de tu gato permanecerá en nuestro sitio de forma permanente, a menos que decidas eliminarlo.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo compartir el memorial en redes sociales?
              </h3>
              <p className="text-gray-600">
                Claro, puedes compartir el enlace del memorial en Facebook, Twitter, Instagram o enviar por email.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial para tu Gato Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu gato fue especial. Merece un lugar hermoso para ser recordado siempre.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial de mi Gato
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
