'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nature-50 to-sky-50">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-nature-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-sky-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-nature-800 mb-2">Mi Dashboard</h1>
          <p className="text-nature-600">Bienvenido, {user?.name}</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Plan Card */}
          <Card className="border-nature-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>👑</span>
                <span>Tu Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-nature-800 mb-2">
                {user?.subscriptionTier === 'huella-eterna'
                  ? 'Gratuito'
                  : user?.subscriptionTier === 'cielo-estrellas'
                  ? 'Cielo de Estrellas'
                  : 'Santuario Premium'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {user?.subscriptionTier === 'huella-eterna'
                  ? 'Plan básico'
                  : 'Plan premium activo'}
              </p>
              <Link href="/pricing">
                <Button variant="outline" className="w-full border-nature-300">
                  Ver Planes
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Memorials Card */}
          <Card className="border-nature-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🐾</span>
                <span>Mis Memoriales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-sky-800 mb-4">0</p>
              <Link href="/create">
                <Button className="w-full bg-nature-600 hover:bg-nature-700">
                  Crear Memorial
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile Card */}
          <Card className="border-nature-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>👤</span>
                <span>Mi Perfil</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {user?.email}
              </p>
              <Link href="/profile">
                <Button variant="outline" className="w-full border-nature-300">
                  Ver Perfil
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-nature-200">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestiona tu cuenta y contenido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/create">
                <Button className="w-full bg-gradient-to-r from-nature-600 to-sky-600 hover:from-nature-700 hover:to-sky-700 h-12">
                  ✨ Crear Nuevo Memorial
                </Button>
              </Link>
              <Link href="/map">
                <Button variant="outline" className="w-full border-nature-300 h-12">
                  🗺️ Explorar Mapa
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="w-full border-nature-300 h-12">
                  📝 Editar Perfil
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="w-full border-nature-300 h-12">
                  💎 Ver Planes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message */}
        <Card className="border-sky-200 bg-sky-50 mt-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🌟</span>
              <div>
                <h3 className="font-bold text-sky-900 mb-2">Bienvenido a Forever Pet Friend</h3>
                <p className="text-sm text-sky-800 mb-3">
                  Este es tu espacio para honrar y recordar a tus mascotas queridas. Aquí puedes:
                </p>
                <ul className="text-sm text-sky-800 space-y-1">
                  <li>✅ Crear memoriales eternos para tus mascotas</li>
                  <li>✅ Compartir fotos, historias y momentos especiales</li>
                  <li>✅ Recibir tributos de otros usuarios</li>
                  <li>✅ Explorar memoriales de otros en el mapa</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
