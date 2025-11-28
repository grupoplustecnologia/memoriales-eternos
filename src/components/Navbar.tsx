import Link from 'next/link';
import { Button } from './ui/button';
import { NavbarClient } from './NavbarClient';

export function Navbar() {
  return (
    <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl">🐾</span>
            <span className="font-bold text-xl text-nature-800 hidden sm:inline">Forever Pet Friend</span>
            <span className="font-bold text-lg text-nature-800 sm:hidden">FPF</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/map" className="text-nature-700 hover:text-nature-900 transition-colors text-sm lg:text-base">
              Explorar Mapa
            </Link>
            <Link href="/search" className="text-nature-700 hover:text-nature-900 transition-colors text-sm lg:text-base">
              Buscar
            </Link>
            <Link href="/trending" className="text-nature-700 hover:text-nature-900 transition-colors text-sm lg:text-base">
              Destacados
            </Link>
            <Link href="/pricing" className="text-nature-700 hover:text-nature-900 transition-colors text-sm lg:text-base">
              Planes
            </Link>
            <Link href="/about" className="text-nature-700 hover:text-nature-900 transition-colors text-sm lg:text-base">
              Acerca de
            </Link>
          </div>

          <NavbarClient />
        </div>
      </div>
    </nav>
  );
}
