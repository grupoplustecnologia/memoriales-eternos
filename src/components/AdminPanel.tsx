'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserForAdmin {
  id: string;
  email: string;
  name: string;
  subscriptionTier: string;
  role: string;
  createdAt: string;
  _count?: {
    profiles: number;
  };
}

export function AdminPanel() {
  const { user, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<UserForAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [starsToAdd, setStarsToAdd] = useState('');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const result = await response.json();
        if (result.success) {
          setUsers(result.data || []);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated, user?.role]);

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-700">⛔ Acceso denegado. Solo administradores pueden acceder.</p>
        </CardContent>
      </Card>
    );
  }

  const handleAddStars = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !starsToAdd) {
      setError('Por favor selecciona un usuario e ingresa las estrellas');
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/admin/add-stars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: selectedUserId,
          stars: parseInt(starsToAdd, 10)
        })
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Error al agregar estrellas');
        return;
      }

      setSuccessMessage(result.message);
      setStarsToAdd('');
      setSelectedUserId('');

      // Refresh user list
      const usersResponse = await fetch('/api/admin/add-stars');
      if (usersResponse.ok) {
        const usersResult = await usersResponse.json();
        if (usersResult.success) {
          setUsers(usersResult.data || []);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar estrellas');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            Panel de Administrador
          </CardTitle>
          <CardDescription>
            Gestiona usuarios y estrellas
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Add Stars Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Añadir Estrellas a Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddStars} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md text-sm">
                ✓ {successMessage}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Selecciona Usuario</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="">-- Selecciona --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.email} {u.role === 'ADMIN' && '(Admin)'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cantidad de Estrellas</label>
              <Input
                type="number"
                value={starsToAdd}
                onChange={(e) => setStarsToAdd(e.target.value)}
                placeholder="Ej: 50"
                min="1"
                max="1000"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            >
              ⭐ Agregar Estrellas
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Lista de Usuarios ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500">Cargando usuarios...</p>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-500">No hay usuarios</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Plan</th>
                    <th className="text-left p-2">Rol</th>
                    <th className="text-left p-2">Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedUserId(u.id)}
                    >
                      <td className="p-2">{u.email}</td>
                      <td className="p-2">{u.name}</td>
                      <td className="p-2 text-xs capitalize">
                        {u.subscriptionTier.replace('-', ' ')}
                      </td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          u.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-2 text-xs text-gray-500">
                        {new Date(u.createdAt).toLocaleDateString('es-ES')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
