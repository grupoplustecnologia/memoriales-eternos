import { Metadata } from 'next';
import Link from 'next/link';
import { PET_TYPES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Tipos de Mascotas - Cementerios Virtuales | Forever Pet Friend',
  description:
    'Explora memoriales virtuales para todas las especies de mascotas. Perros, gatos, aves, roedores y más. Crea un memorial eterno para tu compañero.',
  keywords:
    'cementerio mascotas, tipos de mascotas, memorial perros, memorial gatos, memorial roedores',
  robots: { index: true, follow: true },
};

export default function PetTypesIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Cementerios Virtuales por Tipo de Mascota</h1>
          <p className="text-xl text-slate-600">
            Cada mascota es única. Encuentra el memorial perfecto para tu compañero.
          </p>
        </div>
      </div>

      {/* Pet Types Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PET_TYPES.map((pet) => {
            const petNames: Record<string, { name: string; emoji: string; description: string }> = {
              dogs: {
                name: 'Perros',
                emoji: '🐕',
                description: 'Memorial para tus fieles compañeros. Honra la lealtad y amor de tu perro.',
              },
              cats: {
                name: 'Gatos',
                emoji: '🐈',
                description: 'Recuerda a tu felino independiente y cariñoso en este espacio especial.',
              },
              rabbits: {
                name: 'Conejos',
                emoji: '🐰',
                description: 'Pequeños en tamaño, enormes en amor. Memorial para tus conejos queridos.',
              },
              birds: {
                name: 'Aves',
                emoji: '🦜',
                description: 'Captura el canto eterno de tu ave en este cementerio virtual.',
              },
              ferrets: {
                name: 'Hurones',
                emoji: '🦡',
                description: 'Traviesos y cariñosos. Un memorial para tus compañeros juguetones.',
              },
              hamsters: {
                name: 'Hámsteres',
                emoji: '🐹',
                description: 'Pequeños pero especiales. Recuerda cada momento con tu hámster.',
              },
              'small-mammals': {
                name: 'Pequeños Mamíferos',
                emoji: '🐭',
                description: 'Conejillos de indias, chinchillas y más. Todos merecen ser recordados.',
              },
            };

            const petInfo = petNames[pet.slug] || { name: pet.slug, emoji: '🐾', description: '' };

            return (
              <Link
                key={pet.slug}
                href={`/pet-types/${pet.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                  <div className="text-5xl mb-4">{petInfo.emoji}</div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{petInfo.name}</h2>
                  <p className="text-slate-600 group-hover:text-slate-700">{petInfo.description}</p>
                </div>
                <div className="px-6 py-4">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                    Ver Memorial →
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            ¿No encontraste tu tipo de mascota?
          </h2>
          <p className="text-slate-600 mb-6">
            En Forever Pet Friend, creemos que cada mascota merece un memorial especial. Si tu mascota no está en la lista, no duda en contactarnos.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
