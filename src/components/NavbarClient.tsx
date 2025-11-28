'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { useState, useRef, useEffect } from 'react';

export function NavbarClient() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    if (dropdownOpen || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, mobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
  };

  const mobileLinks = [
    { href: '/map', label: '🗺️ Explorar Mapa' },
    { href: '/search', label: '🔍 Buscar' },
    { href: '/trending', label: '⭐ Destacados' },
    { href: '/pricing', label: '👑 Planes' },
    { href: '/about', label: 'ℹ️ Acerca de' },
  ];

  if (user) {
    // Authenticated
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-nature-100 transition-colors"
          title="Menú"
        >
          <svg className="w-6 h-6 text-nature-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-16 left-0 right-0 md:hidden bg-white border-b border-nature-200 shadow-lg"
          >
            <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
              {mobileLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-nature-700 hover:bg-nature-50 rounded transition-colors"
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link href="/create" className="hidden sm:inline">
          <Button className="bg-nature-600 hover:bg-nature-700 text-white text-xs sm:text-sm px-2 sm:px-4">
            ✨ Crear
          </Button>
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-nature-100 transition-colors"
          >
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-nature-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="hidden sm:flex flex-col items-start gap-0">
              <span className="text-xs sm:text-sm font-medium text-nature-800 max-w-[80px] truncate">
                {user.name}
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-nature-600 transition-transform flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-nature-200 py-1 z-50 max-h-96 overflow-y-auto">
              <Link href="/create" className="md:hidden">
                <button className="w-full text-left px-4 py-2 text-sm text-nature-700 hover:bg-nature-50 flex items-center gap-2">
                  ✨ Crear Memorial
                </button>
              </Link>
              <Link href="/profile">
                <button className="w-full text-left px-4 py-2 text-sm text-nature-700 hover:bg-nature-50 flex items-center gap-2">
                  👤 Mi Perfil
                </button>
              </Link>
              <Link href="/my-memorials">
                <button className="w-full text-left px-4 py-2 text-sm text-nature-700 hover:bg-nature-50 flex items-center gap-2">
                  🐾 Mis Memoriales
                </button>
              </Link>
              <Link href="/subscription">
                <button className="w-full text-left px-4 py-2 text-sm text-nature-700 hover:bg-nature-50 flex items-center gap-2">
                  👑 Mi Suscripción
                </button>
              </Link>
              <Link href="/settings">
                <button className="w-full text-left px-4 py-2 text-sm text-nature-700 hover:bg-nature-50 flex items-center gap-2">
                  ⚙️ Configuración
                </button>
              </Link>
              {user.role === 'ADMIN' && (
                <>
                  <Link href="/admin">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2">
                      🛡️ Panel Admin
                    </button>
                  </Link>
                  <hr className="my-1 border-nature-100" />
                </>
              )}
              {user.role !== 'ADMIN' && <hr className="my-1 border-nature-100" />}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Not authenticated
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-nature-100 transition-colors"
        title="Menú"
      >
        <svg className="w-6 h-6 text-nature-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-16 left-0 right-0 md:hidden bg-white border-b border-nature-200 shadow-lg"
        >
          <div className="px-4 py-2 space-y-1">
            {mobileLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-nature-700 hover:bg-nature-50 rounded transition-colors"
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/auth/login">
        <Button variant="ghost" className="text-nature-700 text-xs sm:text-sm px-2 sm:px-4">
          Iniciar Sesión
        </Button>
      </Link>
      <Link href="/create">
        <Button className="bg-nature-600 hover:bg-nature-700 text-white text-xs sm:text-sm px-2 sm:px-4">
          ✨ Crear
        </Button>
      </Link>
    </div>
  );
}
