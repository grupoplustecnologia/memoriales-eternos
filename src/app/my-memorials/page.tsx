'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { AnimalProfile } from '@/types';

interface Memorial extends AnimalProfile {
  tributes: number;
  visits: number;
}

export default function MyMemorialsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'tributes' | 'name'>('newest');
  const [filterType, setFilterType] = useState<'all' | string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memorialToDelete, setMemorialToDelete] = useState<Memorial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch user's memorials
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const fetchMemorials = async () => {
      try {
        const response = await fetch('/api/profiles/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });
        const result = await response.json();
        if (result.success && result.data) {
          // Add mock tributes and visits data (from tributes table in real app)
          const memorialsWithStats = result.data.map((m: AnimalProfile) => ({
            ...m,
            tributes: Math.floor(Math.random() * 15),
            visits: Math.floor(Math.random() * 100)
          }));
          setMemorials(memorialsWithStats);
        }
      } catch (error) {
        console.error('Error fetching memorials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemorials();
  }, [isAuthenticated]);

  const handleDeleteClick = (memorial: Memorial) => {
    setMemorialToDelete(memorial);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!memorialToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/profiles?id=${memorialToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      const result = await response.json();

      if (result.success) {
        // Remove from local state
        setMemorials(memorials.filter(m => m.id !== memorialToDelete.id));
        setDeleteDialogOpen(false);
        setMemorialToDelete(null);
        alert(`✅ Memorial de ${memorialToDelete.name} ha sido eliminado`);
      } else {
        alert(result.error || 'Error al eliminar el memorial');
      }
    } catch (error) {
      console.error('Error deleting memorial:', error);
      alert('Hubo un error al eliminar el memorial. Intenta nuevamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">Debes iniciar sesión</p>
            <Link href="/auth/login">
              <Button className="w-full bg-nature-600 hover:bg-nature-700">
                Ir a Iniciar Sesión
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando tus memoriales...</p>
      </div>
    );
  }

  // Filter and sort memorials
  let filtered = memorials.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || m.animalType === filterType;
    return matchesSearch && matchesType;
  });

  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'tributes':
        return b.tributes - a.tributes;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">Debes iniciar sesión</p>
            <Link href="/auth/login">
              <Button className="w-full bg-nature-600 hover:bg-nature-700">
                Ir a Iniciar Sesión
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const animalTypes = [
    { value: 'perro', label: '🐕 Perro' },
    { value: 'gato', label: '🐈 Gato' },
    { value: 'ave', label: '🐦 Ave' },
    { value: 'roedor', label: '🐭 Roedor' },
    { value: 'reptil', label: '🐢 Reptil' },
    { value: 'otro', label: '🐾 Otro' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-sky-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-nature-800 mb-2">🐾 Mis Memoriales</h1>
            <p className="text-muted-foreground">Administra todos los memoriales que has creado</p>
          </div>
          <Link href="/create">
            <Button className="bg-nature-600 hover:bg-nature-700">
              ✨ Crear Nuevo Memorial
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 border-nature-200">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-nature-700 block mb-2">Buscar</label>
                <Input
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-nature-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-nature-700 block mb-2">Tipo de Animal</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-nature-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-600"
                >
                  <option value="all">Todos los animales</option>
                  {animalTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-nature-700 block mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-nature-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-600"
                >
                  <option value="newest">Más reciente</option>
                  <option value="oldest">Más antiguo</option>
                  <option value="tributes">Más tributos</option>
                  <option value="name">Nombre (A-Z)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memorials Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(memorial => {
              const animalType = animalTypes.find(t => t.value === memorial.animalType);
              const age = new Date().getFullYear() - new Date(memorial.birthDate).getFullYear();
              
              return (
                <Card
                  key={memorial.id}
                  className="border-nature-200 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={memorial.photoUrl}
                      alt={memorial.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge className="bg-nature-600 text-white">
                        🎁 {memorial.tributes} tributos
                      </Badge>
                      <Badge variant="outline" className="bg-white/90">
                        👁️ {memorial.visits}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="pt-4">
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-nature-800">{memorial.name}</h3>
                        <span className="text-2xl">{animalType?.label.split(' ')[0]}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{memorial.breed}</p>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="bg-nature-50 p-2 rounded">
                        <p className="text-muted-foreground">Nacido</p>
                        <p className="font-semibold">
                          {new Date(memorial.birthDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div className="bg-nature-50 p-2 rounded">
                        <p className="text-muted-foreground">Vivió {age} años</p>
                        <p className="font-semibold">
                          {new Date(memorial.deathDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>

                    {/* Story Preview */}
                    <p className="text-sm text-nature-700 mb-3 line-clamp-2 italic">
                      "{memorial.story}"
                    </p>

                    {/* Epitaph */}
                    <p className="text-center font-semibold text-golden-600 mb-4 italic">
                      — {memorial.epitaph}
                    </p>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-2">
                      <Link href={`/profile/${memorial.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs border-nature-300 hover:bg-nature-50"
                        >
                          👁️ Ver
                        </Button>
                      </Link>
                      <Link href={`/create?edit=${memorial.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs border-nature-300 hover:bg-nature-50"
                        >
                          ✏️ Editar
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(memorial)}
                        className="w-full text-xs border-destructive text-destructive hover:bg-destructive/10"
                      >
                        🗑️ Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">No hay memoriales que coincidan</p>
            <Link href="/create">
              <Button className="bg-nature-600 hover:bg-nature-700">
                ✨ Crear el Primer Memorial
              </Button>
            </Link>
          </div>
        )}

        {/* Stats */}
        {filtered.length > 0 && (
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            <Card className="border-nature-200">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-nature-600">{memorials.length}</p>
                <p className="text-sm text-muted-foreground">Total de memoriales</p>
              </CardContent>
            </Card>
            <Card className="border-nature-200">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-sky-600">
                  {memorials.reduce((sum, m) => sum + m.tributes, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Tributos totales</p>
              </CardContent>
            </Card>
            <Card className="border-nature-200">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-golden-600">
                  {memorials.reduce((sum, m) => sum + m.visits, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Visitantes totales</p>
              </CardContent>
            </Card>
            <Card className="border-nature-200">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-pink-600">
                  {(memorials.reduce((sum, m) => sum + m.tributes, 0) / memorials.length).toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">Promedio tributos</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              ¿Eliminar memorial?
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar el memorial de <strong>{memorialToDelete?.name}</strong>? 
              Esta acción no se puede deshacer y se eliminarán todos los datos asociados (fotos, tributos, recuerdos, etc.).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 my-4">
            <p className="text-sm text-red-800">
              ⚠️ <strong>Advertencia:</strong> Una vez eliminado, no podrás recuperar este memorial.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertDialogCancel className="border-nature-300">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? '⏳ Eliminando...' : '🗑️ Sí, Eliminar'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
