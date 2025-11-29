'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function RegistrarPerroCementerioVirtual() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1633722715463-d30628519b9d?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-orange-900/80 to-red-900/80" />
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🐕 Registrar tu Perro
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Registra tu Perro en el Cementerio Virtual
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Un registro oficial y permanente para tu mejor amigo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8">
                  Registrar mi Perro
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Perros Registrados
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
            Beneficios de Registrar a tu Perro
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🐕</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Registro para Perros</h3>
              <p className="text-gray-600">
                Un registro especial diseñado específicamente para honrar a los perros.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🦴</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Datos de Razas</h3>
              <p className="text-gray-600">
                Información específica sobre raza, tamaño, color y características del perro.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏅</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Logros Especiales</h3>
              <p className="text-gray-600">
                Registra trucos especiales, premios, o logros de tu perro.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Ubicación en Mapa</h3>
              <p className="text-gray-600">
                Aparece en nuestro mapa interactivo de perros recordados.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comunidad de Perros</h3>
              <p className="text-gray-600">
                Conecta con otros dueños que han perdido perros amados.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🕰️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Legado Eterno</h3>
              <p className="text-gray-600">
                Tu perro será recordado para siempre en nuestro cementerio virtual.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How-To Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Pasos para Registrar tu Perro
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Información del Perro</h3>
              <p className="text-gray-600">
                Nombre, raza, edad, color, y otros datos importantes sobre tu perro.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Foto Hermosa</h3>
              <p className="text-gray-600">
                Carga tu foto favorita de tu perro para el registro oficial.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Verificar</h3>
              <p className="text-gray-600">
                Confirma los detalles y tu perro aparecerá en el cementerio virtual.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas sobre Registrar tu Perro
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo registrar cualquier raza de perro?
              </h3>
              <p className="text-gray-600">
                Sí, cualquier raza de perro puede ser registrada: pura, mestiza, pequeña, grande, todos son bienvenidos.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Qué información es obligatoria?
              </h3>
              <p className="text-gray-600">
                Nombre, fecha de nacimiento, fecha de fallecimiento, y una foto del perro.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Puedo añadir más fotos después del registro?
              </h3>
              <p className="text-gray-600">
                Sí, puedes actualizar el registro con más fotos, historias y detalles después de registrarlo.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Es completamente seguro el registro?
              </h3>
              <p className="text-gray-600">
                Sí, tus datos están protegidos con seguridad de nivel empresarial y privacidad garantizada.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                ¿Mi perro aparecerá en el mapa?
              </h3>
              <p className="text-gray-600">
                Sí, a menos que elijas mantener el registro privado, tu perro aparecerá en el mapa interactivo.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Registra a tu Perro Hoy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Tu mejor amigo merece un lugar oficial en el cementerio virtual.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Registrar mi Perro
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
