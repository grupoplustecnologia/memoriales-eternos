'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface AdminStats {
  totalUsers: number;
  totalProfiles: number;
  totalTributes: number;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  subscriptionTier: string;
  role: string;
  createdAt: string;
  _count: { profiles: number };
}

interface AdminProfile {
  id: string;
  name: string;
  animalType: string;
  user: { id: string; email: string; name: string };
  _count: { tributes: number };
  photoUrl?: string;
}

interface AdminLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  createdAt: string;
}

// Componente de login para admin
function AdminLoginForm() {
  const [loginEmail, setLoginEmail] = useState('admin@forever-pet-friend.local');
  const [loginPassword, setLoginPassword] = useState('Demo123!');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = async () => {
    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          deviceName: 'Admin Panel'
        })
      });

      const data = await response.json();

      if (data.success && data.user && data.session) {
        localStorage.setItem('auth_token', data.session.token);
        localStorage.setItem('auth_session', JSON.stringify(data.session));
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        window.location.reload();
      } else {
        setLoginError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setLoginError('Error de conexión');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">⛔ Acceso Denegado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-600">Solo administradores pueden acceder al panel.</p>
          
          <div className="pt-4 border-t border-red-200 space-y-3">
            <p className="text-sm font-medium text-gray-700">Credenciales de Admin Demo:</p>
            <div className="bg-white p-3 rounded text-sm space-y-1 font-mono">
              <p><span className="text-gray-500">Email:</span> admin@forever-pet-friend.local</p>
              <p><span className="text-gray-500">Pass:</span> Demo123!</p>
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
              {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
              <Button
                onClick={handleAdminLogin}
                disabled={loginLoading || !loginEmail || !loginPassword}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {loginLoading ? 'Cargando...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminPanel() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editPhotoModal, setEditPhotoModal] = useState<{ profileId: string; profileName: string } | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUpdateLoading, setPhotoUpdateLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  useEffect(() => {
    // Si no está autenticado o no es admin, no hacer nada
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      console.log('⏳ Waiting for admin authentication...', { isAuthenticated, role: user?.role });
      setLoading(false);
      return;
    }

    console.log('✅ Admin authenticated, fetching data...');

    const fetchAllData = async () => {
      setLoading(true);
      setError('');
      
      try {
        // Get token from localStorage
        const token = localStorage.getItem('auth_token');
        console.log('🔑 Token:', token ? `${token.substring(0, 16)}...` : 'NO TOKEN');
        
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        // Fetch dashboard stats
        const dashResponse = await fetch('/api/admin/dashboard', { headers });
        if (dashResponse.ok) {
          const dashData = await dashResponse.json();
          if (dashData.success) {
            setStats(dashData.data.stats);
          }
        }

        // Fetch users
        const usersResponse = await fetch('/api/admin/users', { headers });
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          if (usersData.success) {
            setUsers(usersData.data);
          }
        }

        // Fetch profiles
        const profilesResponse = await fetch('/api/admin/profiles', { headers });
        console.log('📦 Profiles response:', profilesResponse.status);
        
        if (profilesResponse.ok) {
          const profilesData = await profilesResponse.json();
          console.log('✅ Profiles received:', profilesData.data?.length);
          if (profilesData.success) {
            setProfiles(profilesData.data);
          }
        } else {
          const errorText = await profilesResponse.text();
          console.error('❌ Profiles error:', profilesResponse.status, errorText);
        }

        // Fetch logs
        const logsResponse = await fetch('/api/admin/logs', { headers });
        if (logsResponse.ok) {
          const logsData = await logsResponse.json();
          if (logsData.success) {
            setLogs(logsData.data);
          }
        }
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [isAuthenticated, user?.role]);

  // Si no está autenticado o no es admin, mostrar formulario de login
  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <AdminLoginForm />;
  }

  const handleUpdateUserPlan = async (userId: string, newTier: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ subscriptionTier: newTier })
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Error al actualizar plan');
        setLoading(false);
        return;
      }

      setSuccessMessage(result.message || 'Plan actualizado exitosamente');
      
      // Update local users list
      setUsers(users.map(u => 
        u.id === userId ? { ...u, subscriptionTier: newTier } : u
      ));

      setLoading(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating plan');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string, memorialCount: number) => {
    const confirmMessage = `¿Estás seguro de que quieres eliminar el usuario ${userEmail}?\n\n⚠️ Esto eliminará también ${memorialCount} memorial${memorialCount !== 1 ? 'es' : ''} asociado${memorialCount !== 1 ? 's' : ''}.\n\nEsta acción no se puede deshacer.`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Error al eliminar usuario');
        setLoading(false);
        return;
      }

      setSuccessMessage(result.message || 'Usuario eliminado exitosamente');
      setUsers(users.filter(u => u.id !== userId));
      setLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting user');
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este memorial?')) {
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/admin/profiles?id=${profileId}`, {
        method: 'DELETE',
        headers
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Error al eliminar memorial');
        return;
      }

      setSuccessMessage('Memorial eliminado exitosamente');
      setProfiles(profiles.filter(p => p.id !== profileId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting profile');
    }
  };

  const handleEditProfile = (profileId: string) => {
    // Redirigir al formulario de creación en modo edición
    window.location.href = `/create?edit=${profileId}`;
  };

  const handleOpenPhotoEditor = (profileId: string, profileName: string) => {
    setEditPhotoModal({ profileId, profileName });
    setPhotoUrl('');
  };

  const handleUpdatePhoto = async () => {
    if (!editPhotoModal) return;
    
    // Si no hay archivo ni URL, mostrar error
    if (!photoFile && !photoUrl) {
      setError('Por favor sube una foto o ingresa una URL');
      return;
    }

    setPhotoUpdateLoading(true);
    try {
      let finalPhotoUrl = photoUrl;

      // Si hay archivo, subirlo primero
      if (photoFile) {
        console.log('📤 Uploading file:', photoFile.name, photoFile.size, photoFile.type);
        
        const formData = new FormData();
        formData.append('file', photoFile);

        const uploadResponse = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });

        console.log('📥 Upload response status:', uploadResponse.status);
        const uploadResult = await uploadResponse.json();
        console.log('📥 Upload result:', uploadResult);

        if (!uploadResult.success) {
          setError(uploadResult.error || 'Error al subir la foto');
          setPhotoUpdateLoading(false);
          return;
        }

        finalPhotoUrl = uploadResult.photoUrl;
      }

      // Ahora actualizar el perfil con la URL de la foto
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/admin/profiles/update-photo', {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          profileId: editPhotoModal.profileId,
          photoUrl: finalPhotoUrl
        })
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Error al actualizar la foto');
        setPhotoUpdateLoading(false);
        return;
      }

      setSuccessMessage('Foto actualizada exitosamente');
      setEditPhotoModal(null);
      setPhotoUrl('');
      setPhotoFile(null);
      setPhotoPreview('');
      
      // Refresh profiles
      fetchProfiles();
      setPhotoUpdateLoading(false);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err instanceof Error ? err.message : 'Error updating photo');
      setPhotoUpdateLoading(false);
    }
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const profilesResponse = await fetch('/api/admin/profiles', { headers });
      if (profilesResponse.ok) {
        const profilesData = await profilesResponse.json();
        if (profilesData.success) {
          setProfiles(profilesData.data);
        }
      }
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nature-800">👑 Panel Administrativo</h1>
          <p className="text-sm text-muted-foreground">Gestiona Forever Pet Friend</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Admin: {user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">❌ {error}</p>
          </CardContent>
        </Card>
      )}

      {successMessage && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <p className="text-green-700">✅ {successMessage}</p>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard" onClick={() => setActiveTab('dashboard')}>📊 Dashboard</TabsTrigger>
          <TabsTrigger value="users" onClick={() => setActiveTab('users')}>👥 Usuarios</TabsTrigger>
          <TabsTrigger value="profiles" onClick={() => setActiveTab('profiles')}>🪦 Memoriales</TabsTrigger>
          <TabsTrigger value="moderation" onClick={() => setActiveTab('moderation')}>⚖️ Moderación</TabsTrigger>
          <TabsTrigger value="reports" onClick={() => setActiveTab('reports')}>🚨 Reportes</TabsTrigger>
          <TabsTrigger value="logs" onClick={() => setActiveTab('logs')}>📝 Logs</TabsTrigger>
          <TabsTrigger value="pricing" onClick={() => setActiveTab('pricing')}>💰 Precios</TabsTrigger>
        </TabsList>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" show={activeTab === 'dashboard'} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Memoriales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalProfiles || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tributos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalTributes || 0}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* USERS TAB */}
        <TabsContent value="users" show={activeTab === 'users'} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administrar usuarios del sistema y sus planes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Lista de Usuarios ({users.length})</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {users.length === 0 ? (
                    <p className="text-muted-foreground text-sm p-4 text-center">No hay usuarios registrados</p>
                  ) : (
                    users.map(u => (
                      <div key={u.id} className="flex items-center justify-between p-3 bg-nature-50 rounded-lg border border-nature-100">
                        <div className="flex-1">
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">📦 {u._count.profiles} memorial{u._count.profiles !== 1 ? 'es' : ''}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={u.subscriptionTier === 'huella-eterna' ? 'outline' : 'default'}>
                            {u.subscriptionTier === 'huella-eterna' && '🆓 Gratuito'}
                            {u.subscriptionTier === 'cielo-estrellas' && '⭐ Cielo'}
                            {u.subscriptionTier === 'santuario-premium' && '👑 Premium'}
                          </Badge>
                          <select
                            value={u.subscriptionTier}
                            onChange={(e) => handleUpdateUserPlan(u.id, e.target.value)}
                            className="text-xs px-2 py-1 border rounded bg-white hover:bg-nature-50 cursor-pointer"
                            disabled={loading}
                          >
                            <option value="huella-eterna">🆓 Gratuito</option>
                            <option value="cielo-estrellas">⭐ Cielo de Estrellas</option>
                            <option value="santuario-premium">👑 Santuario Premium</option>
                          </select>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            onClick={() => handleDeleteUser(u.id, u.email, u._count.profiles)}
                            disabled={loading}
                          >
                            🗑️ Eliminar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PROFILES TAB */}
        <TabsContent value="profiles" show={activeTab === 'profiles'} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Memoriales</CardTitle>
              <CardDescription>Edición, moderación y eliminación de memoriales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {profiles.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-nature-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{p.name} ({p.animalType})</p>
                      <p className="text-xs text-muted-foreground">{p.user.name}</p>
                      <p className="text-xs">Tributos: {p._count.tributes}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        onClick={() => handleEditProfile(p.id)}
                      >
                        ✏️ Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-purple-600 border-purple-300 hover:bg-purple-50"
                        onClick={() => handleOpenPhotoEditor(p.id, p.name)}
                      >
                        📷 Foto
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() => handleDeleteProfile(p.id)}
                      >
                        🗑️ Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MODERATION TAB */}
        <TabsContent value="moderation" show={activeTab === 'moderation'} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⚖️ Sistema de Moderación</CardTitle>
              <CardDescription>Gestionar reportes y contenido inapropiado</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sistema de moderación en desarrollo...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REPORTS TAB */}
        <TabsContent value="reports" show={activeTab === 'reports'} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🚨 Reportes</CardTitle>
              <CardDescription>Reportes del sistema y problemas reportados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sistema de reportes en desarrollo...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOGS TAB */}
        <TabsContent value="logs" show={activeTab === 'logs'} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📝 Registros de Actividad</CardTitle>
              <CardDescription>Últimas acciones administrativas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.length > 0 ? (
                  logs.map(log => (
                    <div key={log.id} className="text-xs p-2 bg-gray-50 rounded font-mono">
                      <p><strong>{new Date(log.createdAt).toLocaleString()}</strong></p>
                      <p>{log.action} - {log.entity} ({log.entityId})</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No hay registros disponibles</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PRICING TAB */}
        <TabsContent value="pricing" show={activeTab === 'pricing'} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>💰 Gestión de Precios</CardTitle>
              <CardDescription>Configurar precios de planes y estrellas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Plan Gratuito</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">⭐ 4 estrellas</p>
                      <p className="text-xs text-muted-foreground">3 memoriales máximo</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Plan Premium</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">⭐ Ilimitadas</p>
                      <p className="text-xs text-muted-foreground">€5 / mes</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Photo Editor Modal */}
      {editPhotoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>📷 Cambiar Foto</CardTitle>
              <CardDescription>Actualiza la foto de {editPhotoModal.profileName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer" onClick={() => document.getElementById('photo-input')?.click()}>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handlePhotoFileChange}
                  className="hidden"
                />
                <div className="space-y-2">
                  <p className="text-2xl">📁</p>
                  <p className="text-sm font-medium">
                    {photoFile ? photoFile.name : 'Arrastra una foto aquí'}
                  </p>
                  <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
                  <p className="text-xs text-muted-foreground">Máximo 5MB (JPEG, PNG, WebP)</p>
                </div>
              </div>

              {/* Preview */}
              {(photoPreview || photoUrl) && (
                <div className="flex justify-center">
                  <img
                    src={photoPreview || photoUrl}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Divider */}
              {photoFile && (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">O pega una URL</span>
                  </div>
                </div>
              )}

              {/* URL Input */}
              {!photoFile && (
                <div>
                  <label className="block text-sm font-medium mb-2">URL de la Foto</label>
                  <Input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}

              {/* Error/Success Messages */}
              {error && <div className="text-red-600 text-sm p-2 bg-red-50 rounded">{error}</div>}
              {successMessage && <div className="text-green-600 text-sm p-2 bg-green-50 rounded">{successMessage}</div>}

              {/* Buttons */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditPhotoModal(null);
                    setPhotoUrl('');
                    setPhotoFile(null);
                    setPhotoPreview('');
                    setError('');
                    setSuccessMessage('');
                  }}
                  disabled={photoUpdateLoading}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleUpdatePhoto}
                  disabled={(!photoUrl && !photoFile) || photoUpdateLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {photoUpdateLoading ? '⏳ Guardando...' : '✅ Guardar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
