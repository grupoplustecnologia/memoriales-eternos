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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    router.push('/');
  };

  if (user) {
    // Authenticated
    return (
      <div className="flex items-center space-x-3">
        <Link href="/create">
          <Button className="bg-nature-600 hover:bg-nature-700 text-white">
            ✨ Crear Memorial
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
              <div className="w-8 h-8 rounded-full bg-nature-600 flex items-center justify-center text-white text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="hidden sm:flex flex-col items-start gap-0">
              <span className="text-sm font-medium text-nature-800 max-w-[80px] truncate">
                {user.name}
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-nature-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-nature-200 py-1 z-50">
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
              {user.role === 'admin' && (
                <>
                  <Link href="/admin">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2">
                      🛡️ Panel Admin
                    </button>
                  </Link>
                  <hr className="my-1 border-nature-100" />
                </>
              )}
              {user.role !== 'admin' && <hr className="my-1 border-nature-100" />}
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
    <div className="flex items-center space-x-3">
      <Link href="/auth/login">
        <Button variant="ghost" className="text-nature-700">
          Iniciar Sesión
        </Button>
      </Link>
      <Link href="/create">
        <Button className="bg-nature-600 hover:bg-nature-700 text-white">
          Crear Memorial
        </Button>
      </Link>
    </div>
  );
}
