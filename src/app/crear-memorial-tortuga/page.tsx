'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CrearMemorialTortuga() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577720643272-265f434882b3?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-cyan-900/80 to-emerald-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐢 Crear Memorial para tu Tortuga
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Crear Memorial Digital para tu Tortuga
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Honra a tu compañero lento, sabio y perdurable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8">
                  Crear Memorial Ahora
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Memoriales de Tortugas
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
            Un Memorial Tranquilo para tu Tortuga Amada
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐢</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Tema Sereno</h3>
              <p className="text-gray-600">
                Diseño calmo y tranquilo que refleja la naturaleza pacífica de tu tortuga.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏞️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Su Hábitat</h3>
              <p className="text-gray-600">
                Carga fotos de su terrario, acuario o área donde vivía tu tortuga.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fotos Hermosas</h3>
              <p className="text-gray-600">
                Captura imágenes de tu tortuga en diferentes momentos y en detalle.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐚</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Su Caparazón</h3>
              <p className="text-gray-600">
                Documenta el patrón único y colores especiales del caparazón de tu tortuga.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Tiempo Juntos</h3>
              <p className="text-gray-600">
                Muchas tortugas viven años. Celebra el tiempo especial que compartieron.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Legado Duradero</h3>
              <p className="text-gray-600">
                Tu tortuga fue parte de tu familia. Un memorial que dura para siempre.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Crear el Memorial de tu Tortuga
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Información de la Tortuga</h3>
              <p className="text-gray-600">
                Especie, edad, origen, color de caparazón y características especiales.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Fotos y Historias</h3>
              <p className="text-gray-600">
                Sube fotos del hábitat, comportamientos y momentos especiales con tu tortuga.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Compartir Recuerdos</h3>
              <p className="text-gray-600">
                Comparte el memorial con otros que también aman a las tortugas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre Memoriales de Tortugas
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Cuál es la esperanza de vida de una tortuga?
              </h3>
              <p className="text-gray-600">
                Las tortugas pueden vivir muchos años, a veces décadas, creando vínculos muy profundos con sus cuidadores.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Qué tipos de tortugas se pueden recordar aquí?
              </h3>
              <p className="text-gray-600">
                Cualquier tipo: tortugas terrestres, acuáticas, semiacuáticas, todas son bienvenidas.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo documentar su ciclo de hibernación?
              </h3>
              <p className="text-gray-600">
                Sí, puedes incluir información sobre sus comportamientos estacionales y particularidades.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Hay fotos 360° del hábitat disponibles?
              </h3>
              <p className="text-gray-600">
                Puedes subir múltiples fotos del terrario o acuario desde diferentes ángulos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿El memorial durará para siempre?
              </h3>
              <p className="text-gray-600">
                Sí, el memorial de tu tortuga permanecerá en nuestro sitio de forma permanente y segura.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Crea un Memorial para tu Tortuga Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu tortuga fue parte de tu vida. Merece un lugar especial en nuestro cementerio virtual.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Crear Memorial de mi Tortuga
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
