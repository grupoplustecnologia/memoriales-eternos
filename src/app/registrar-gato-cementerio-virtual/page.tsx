'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function RegistrarGatoCementerioVirtual() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-indigo-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐱 Registrar tu Gato
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Registra tu Gato en el Cementerio Virtual
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Un registro especial para honrar a tu compañero felino adorado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8">
                  Registrar mi Gato
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Gatos Registrados
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
            Beneficios de Registrar a tu Gato
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐈</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Registro Felino</h3>
              <p className="text-gray-600">
                Un registro especial diseñado para gatos de todas las razas y personalidades.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">😺</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Personalidad Única</h3>
              <p className="text-gray-600">
                Registra los hábitos, gustos, miedos y características especiales de tu gato.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎀</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Marca y Colores</h3>
              <p className="text-gray-600">
                Documenta los patrones, colores y marcas únicas de tu gato.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">En el Mapa</h3>
              <p className="text-gray-600">
                Tu gato aparecerá en el mapa interactivo de gatos recordados.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad Felina</h3>
              <p className="text-gray-600">
                Conecta con otros amantes de gatos que han perdido sus compañeros.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Memoria Eterna</h3>
              <p className="text-gray-600">
                Tu gato vivirá en la memoria digital para siempre en nuestro cementerio.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Cómo Registrar a tu Gato
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Información del Gato</h3>
              <p className="text-gray-600">
                Nombre, raza, color, edad, y características especiales de tu gato.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Foto Especial</h3>
              <p className="text-gray-600">
                Carga tu foto favorita de tu gato para el registro oficial.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Confirmar</h3>
              <p className="text-gray-600">
                Confirma y tu gato aparecerá en el cementerio virtual para siempre.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre Registrar tu Gato
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo registrar gatos de cualquier raza?
              </h3>
              <p className="text-gray-600">
                Sí, todas las razas de gatos son bienvenidas: domésticos, persas, siameses, bengalís, y más.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Qué datos son necesarios?
              </h3>
              <p className="text-gray-600">
                Nombre, fecha de nacimiento, fecha de fallecimiento, y una foto bonita de tu gato.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo incluir historias sobre mi gato?
              </h3>
              <p className="text-gray-600">
                Sí, puedes añadir historias, anécdotas divertidas y momentos especiales con tu gato.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿La información es confidencial?
              </h3>
              <p className="text-gray-600">
                Sí, controlas quién puede ver el registro: público, privado o solo para amigos invitados.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puede alguien encontrar a mi gato en el mapa?
              </h3>
              <p className="text-gray-600">
                Sí, si lo mantienes público. Pero puedes hacerlo privado si lo prefieres.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Registra a tu Gato Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu gato adorado merece un lugar oficial en el cementerio virtual.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Registrar mi Gato
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
