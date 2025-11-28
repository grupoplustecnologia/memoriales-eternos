import { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Servicios de Cementerio Virtual | Forever Pet Friend',
  description:
    'Conoce todos nuestros servicios para honrar a tu mascota. Soluciones digitales, gratuitas y seguras para memoriales eternos.',
  keywords:
    'servicios cementerio, memorial digital, cementerio online, servicio gratuito, memorial mascotas',
  robots: { index: true, follow: true },
};

export default function ServicesIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Nuestros Servicios</h1>
          <p className="text-xl text-slate-600">
            Diferentes formas de honrar y recordar a tu mascota querida.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {SERVICES.map((service) => {
            const serviceInfo: Record<
              string,
              { name: string; emoji: string; description: string; badge?: string }
            > = {
              generic: {
                name: 'Cementerio Virtual',
                emoji: '🏘️',
                description: 'El servicio completo. Memorials para todas las mascotas.',
                badge: 'Popular',
              },
              digital: {
                name: 'Solución Digital',
                emoji: '💻',
                description: 'Accede desde cualquier dispositivo, en cualquier momento.',
              },
              online: {
                name: 'Comunidad Online',
                emoji: '🌐',
                description: 'Conecta con otros amantes de animales alrededor del mundo.',
              },
              free: {
                name: 'Servicio Gratuito',
                emoji: '💚',
                description: '100% gratis, sin costos ocultos ni suscripciones.',
                badge: 'Gratis',
              },
              deceased: {
                name: 'Para Mascotas Fallecidas',
                emoji: '🌈',
                description: 'Un espacio seguro para procesar el duelo y recordar.',
              },
            };

            const info = serviceInfo[service.slug] || {
              name: service.slug,
              emoji: '✨',
              description: '',
            };

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-6 group-hover:from-purple-100 group-hover:to-pink-100 transition-colors">
                  {info.badge && (
                    <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 px-3 py-1 text-xs font-bold rounded-full">
                      {info.badge}
                    </span>
                  )}
                  <div className="text-4xl mb-3">{info.emoji}</div>
                  <h2 className="text-lg font-bold text-slate-900 mb-2">{info.name}</h2>
                  <p className="text-sm text-slate-600 group-hover:text-slate-700 mb-4">{info.description}</p>
                </div>
                <div className="px-6 py-3">
                  <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors font-medium text-sm">
                    Conocer más →
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Comparison Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">¿Por qué elegir Forever Pet Friend?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">100% Seguro</h3>
              <p className="text-slate-600">Tus memoriales están protegidos en servidores seguros con encriptación.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">♾️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Para Siempre</h3>
              <p className="text-slate-600">
                Tu mascota será recordada eternamente en nuestro cementerio virtual.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Global</h3>
              <p className="text-slate-600">Conecta con una comunidad de amantes de animales en todo el mundo.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Comienza a Crear un Memorial Hoy</h2>
          <p className="text-purple-100 mb-8 text-lg">
            Honra a tu mascota querida con un memorial eterno y gratuito.
          </p>
          <Link
            href="/create"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-bold text-lg"
          >
            Crear Memorial Ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
