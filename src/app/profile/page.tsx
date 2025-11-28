'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface UserMemorial {
  id: string;
  name: string;
  animalType: string;
  photoUrl: string;
  createdAt: string;
  tributes: number;
}

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'info' | 'memorials' | 'tributes' | 'activity' | 'settings'>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    profilePicture: user?.profilePicture || '',
    bio: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  // Mock data for memorials
  const myMemorials: UserMemorial[] = [
    {
      id: '1',
      name: 'Max',
      animalType: 'perro',
      photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30628ceb4a3?w=200&h=200&fit=crop',
      createdAt: '2024-11-01',
      tributes: 5
    },
    {
      id: '2',
      name: 'Luna',
      animalType: 'gato',
      photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop',
      createdAt: '2024-10-15',
      tributes: 8
    }
  ];

  const favoriteMemorials: UserMemorial[] = [
    {
      id: '3',
      name: 'Rocky',
      animalType: 'perro',
      photoUrl: 'https://images.unsplash.com/photo-1587300411107-ec26ebbe63b3?w=200&h=200&fit=crop',
      createdAt: '2024-09-20',
      tributes: 12
    }
  ];

  const tributes = [
    {
      id: '1',
      memorialName: 'Max',
      tributeType: 'flower',
      visitorName: 'Ana García',
      createdAt: '2024-11-10'
    },
    {
      id: '2',
      memorialName: 'Luna',
      tributeType: 'candle',
      visitorName: 'Carlos López',
      createdAt: '2024-11-08'
    },
    {
      id: '3',
      memorialName: 'Max',
      tributeType: 'message',
      visitorName: 'María Rodríguez',
      message: 'Qué hermoso recuerdo de Max',
      createdAt: '2024-11-05'
    }
  ];

  const activityLog: ActivityLog[] = [
    {
      id: '1',
      action: 'memorial_created',
      description: 'Creaste un memorial para Luna',
      timestamp: '2024-11-15'
    },
    {
      id: '2',
      action: 'tribute_received',
      description: 'Carlos López dejó una vela en Max',
      timestamp: '2024-11-10'
    },
    {
      id: '3',
      action: 'profile_updated',
      description: 'Actualizaste tu perfil',
      timestamp: '2024-11-01'
    },
    {
      id: '4',
      action: 'memorial_created',
      description: 'Creaste un memorial para Max',
      timestamp: '2024-10-25'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">Debes iniciar sesión para ver tu perfil</p>
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

  const handleSaveProfile = async () => {
    setIsSaving(true);
    const result = await updateProfile({
      name: editForm.name,
      profilePicture: editForm.profilePicture
    });
    if (result.success) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getTributeBadge = (type: string) => {
    const badges: Record<string, { emoji: string; label: string; color: string }> = {
      flower: { emoji: '🌸', label: 'Flor', color: 'bg-pink-100 text-pink-800' },
      candle: { emoji: '🕯️', label: 'Vela', color: 'bg-orange-100 text-orange-800' },
      message: { emoji: '💬', label: 'Mensaje', color: 'bg-blue-100 text-blue-800' }
    };
    return badges[type] || badges.flower;
  };

  const getActionEmoji = (action: string) => {
    const emojis: Record<string, string> = {
      memorial_created: '✨',
      tribute_received: '🎁',
      profile_updated: '👤',
      shared: '📤'
    };
    return emojis[action] || '📝';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-sky-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Profile Card */}
        <Card className="mb-8 border-nature-200 shadow-lg">
          <CardContent className="pt-8">
            <div className="flex flex-col items-center gap-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center z-10">
                      <label className="cursor-pointer text-white text-center">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setEditForm(prev => ({
                                  ...prev,
                                  profilePicture: event.target?.result as string
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="text-xs mt-1">Cambiar foto</p>
                      </label>
                    </div>
                  )}
                  {user?.profilePicture ? (
                    <img
                      src={editForm.profilePicture || user.profilePicture}
                      alt={user.name}
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-nature-600"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-nature-600 to-sky-600 flex items-center justify-center text-white text-5xl border-4 border-nature-600">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Plan Badge */}
                <Badge className="bg-gradient-to-r from-nature-600 to-sky-600 text-white px-4 py-2">
                  👑 {user?.subscriptionTier === 'santuario-premium' ? 'Premium Anual' : 'Plan Gratuito'}
                </Badge>
              </div>

              {/* User Info */}
              <div className="text-center">
                {isEditing ? (
                  <div className="space-y-4 w-full max-w-sm">
                    <div>
                      <label className="text-sm font-medium">Nombre</label>
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-nature-600 hover:bg-nature-700"
                      >
                        {isSaving ? 'Guardando...' : 'Guardar'}
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-nature-800 mb-2">{user?.name}</h1>
                    <p className="text-nature-600 mb-2">{user?.email}</p>
                    <p className="text-muted-foreground mb-6">
                      Miembro desde {new Date(user?.createdAt || '').toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </p>
                    <div className="flex gap-3 flex-wrap justify-center">
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="border-nature-300"
                      >
                        ✏️ Editar Perfil
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive/10"
                      >
                        🚪 Cerrar Sesión
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-nature-600">{myMemorials.length}</p>
                  <p className="text-xs text-muted-foreground">Memoriales</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-sky-600">{tributes.length}</p>
                  <p className="text-xs text-muted-foreground">Tributos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-golden-600">{favoriteMemorials.length}</p>
                  <p className="text-xs text-muted-foreground">Favoritos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-nature-200">
          {[
            { id: 'info', label: 'Información', icon: 'ℹ️' },
            { id: 'memorials', label: 'Mis Memoriales', icon: '🐾' },
            { id: 'tributes', label: 'Tributos', icon: '🎁' },
            { id: 'activity', label: 'Actividad', icon: '📊' },
            { id: 'settings', label: 'Configuración', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-nature-600 text-white'
                  : 'bg-white text-nature-700 border border-nature-200 hover:bg-nature-50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* Info Tab */}
          {activeTab === 'info' && (
            <Card className="border-nature-200">
              <CardHeader>
                <CardTitle>Información de Cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-nature-800 mb-4">Datos Personales</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-nature-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Nombre</p>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                    <div className="bg-nature-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div className="bg-nature-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Estado del Email</p>
                      <p className="font-medium text-green-600">✅ Verificado</p>
                    </div>
                    <div className="bg-nature-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Tipo de Plan</p>
                      <p className="font-medium">
                        {user?.subscriptionTier === 'santuario-premium' ? '👑 Premium Anual' : 'Gratuito'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Memorials Tab */}
          {activeTab === 'memorials' && (
            <div className="space-y-6">
              {/* My Memorials */}
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🐾 Mis Memoriales</span>
                    <Badge>{myMemorials.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {myMemorials.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {myMemorials.map(memorial => (
                        <Link key={memorial.id} href={`/profile/${memorial.id}`}>
                          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-nature-100">
                            <CardContent className="pt-4">
                              <img
                                src={memorial.photoUrl}
                                alt={memorial.name}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                              />
                              <h3 className="font-bold text-nature-800">{memorial.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2 capitalize">{memorial.animalType}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{new Date(memorial.createdAt).toLocaleDateString()}</span>
                                <span className="text-nature-600">🎁 {memorial.tributes} tributos</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Aún no has creado memoriales</p>
                      <Link href="/create">
                        <Button className="bg-nature-600 hover:bg-nature-700">
                          ✨ Crear el Primer Memorial
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Favorite Memorials */}
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>⭐ Memoriales Favoritos</span>
                    <Badge variant="outline">{favoriteMemorials.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {favoriteMemorials.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {favoriteMemorials.map(memorial => (
                        <Link key={memorial.id} href={`/profile/${memorial.id}`}>
                          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-sky-100 bg-sky-50">
                            <CardContent className="pt-4">
                              <img
                                src={memorial.photoUrl}
                                alt={memorial.name}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                              />
                              <h3 className="font-bold text-nature-800">{memorial.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2 capitalize">{memorial.animalType}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{new Date(memorial.createdAt).toLocaleDateString()}</span>
                                <span className="text-golden-600">🎁 {memorial.tributes} tributos</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No tienes memoriales favoritos aún</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tributes Tab */}
          {activeTab === 'tributes' && (
            <Card className="border-nature-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🎁 Tributos Recibidos</span>
                  <Badge>{tributes.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Gestos de amor y reconocimiento de visitantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tributes.length > 0 ? (
                  <div className="space-y-3">
                    {tributes.map(tribute => {
                      const badge = getTributeBadge(tribute.tributeType);
                      return (
                        <div
                          key={tribute.id}
                          className="p-4 border border-nature-100 rounded-lg hover:bg-nature-50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{badge.emoji}</span>
                              <div>
                                <p className="font-semibold text-nature-800">{tribute.visitorName}</p>
                                <p className="text-sm text-muted-foreground">
                                  dejó {badge.label.toLowerCase()} en <strong>{tribute.memorialName}</strong>
                                </p>
                              </div>
                            </div>
                            <Badge className={badge.color}>{badge.label}</Badge>
                          </div>
                          {tribute.message && (
                            <p className="text-sm text-nature-700 italic border-l-2 border-nature-300 pl-3 mt-2">
                              "{tribute.message}"
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(tribute.createdAt).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Aún no has recibido tributos</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <Card className="border-nature-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📊 Historial de Actividad</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activityLog.length > 0 ? (
                  <div className="space-y-4">
                    {activityLog.map((activity, index) => (
                      <div
                        key={activity.id}
                        className="flex gap-4 pb-4 border-b border-nature-100 last:border-b-0"
                      >
                        <div className="text-2xl flex-shrink-0">
                          {getActionEmoji(activity.action)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-nature-800">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">
                    No hay actividad registrada
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Privacy Settings */}
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🔒 Privacidad</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label className="flex items-center gap-3 p-3 bg-nature-50 rounded-lg cursor-pointer hover:bg-nature-100 transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-nature-800">Perfil público</p>
                      <p className="text-sm text-muted-foreground">Otros pueden ver tu perfil</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-nature-50 rounded-lg cursor-pointer hover:bg-nature-100 transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-nature-800">Mostrar memoriales creados</p>
                      <p className="text-sm text-muted-foreground">Permitir que otros vean tus memoriales</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-nature-50 rounded-lg cursor-pointer hover:bg-nature-100 transition-colors">
                    <input type="checkbox" className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-nature-800">Recibir tributos anónimos</p>
                      <p className="text-sm text-muted-foreground">Permitir que extraños dejen tributos en tus memoriales</p>
                    </div>
                  </label>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🔔 Notificaciones</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg cursor-pointer hover:bg-sky-100 transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-sky-900">Nuevos tributos</p>
                      <p className="text-sm text-sky-700">Notificación cuando recibas un tributo</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg cursor-pointer hover:bg-sky-100 transition-colors">
                    <input type="checkbox" className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-sky-900">Email de actualizaciones</p>
                      <p className="text-sm text-sky-700">Recibir newsletter sobre nuevas características</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg cursor-pointer hover:bg-sky-100 transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-sky-900">Recordatorios mensuales</p>
                      <p className="text-sm text-sky-700">Recordatorio aniversario de fallecimiento</p>
                    </div>
                  </label>
                </CardContent>
              </Card>

              {/* Subscription Management */}
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>👑 Gestión de Suscripción</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-nature-50 to-sky-50 rounded-lg border border-nature-200">
                    <p className="text-sm text-muted-foreground mb-2">Plan Actual</p>
                    <p className="font-bold text-lg text-nature-800 mb-4">
                      👑 {user?.subscriptionTier === 'santuario-premium' ? 'Premium Anual' : 'Plan Gratuito'}
                    </p>
                    {user?.subscriptionTier === 'santuario-premium' && (
                      <div className="space-y-2 mb-4 text-sm">
                        <p>✅ Memoriales ilimitados</p>
                        <p>✅ Galería premium con almacenamiento ilimitado</p>
                        <p>✅ Estadísticas avanzadas</p>
                        <p>✅ Soporte prioritario</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {user?.subscriptionTier !== 'santuario-premium' && (
                      <Link href="/pricing">
                        <Button className="w-full bg-nature-600 hover:bg-nature-700">
                          Mejorar a Premium
                        </Button>
                      </Link>
                    )}
                    {user?.subscriptionTier === 'santuario-premium' && (
                      <p className="text-sm text-muted-foreground text-center">
                        Tu suscripción se renovará el 15 de noviembre de 2025
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <span>⚠️ Zona de Peligro</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Estas acciones son permanentes y no se pueden deshacer
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive/10"
                  >
                    🗑️ Descargar mis datos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive/10"
                  >
                    ❌ Eliminar cuenta permanentemente
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
