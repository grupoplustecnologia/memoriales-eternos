'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CanonicalHead } from '@/components/CanonicalHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  const { user, isAuthenticated, session } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications' | 'security'>('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    memorialsVisible: true,
    anonymousTributes: false,
    publicStats: true,
    searchEngineIndexing: false,
  });

  // Cargar configuración de privacidad al montar
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    setToken(storedToken);
    
    // if (isAuthenticated && storedToken) {
    //   loadPrivacySettings();
    // }
  }, [isAuthenticated]);

  const loadPrivacySettings = async () => {
    try {
      const response = await fetch('/api/privacy-settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPrivacySettings(result.data);
      }
    } catch (error) {
      console.error('Error al cargar configuración:', error);
    }
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/privacy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(privacySettings),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: '✅ Configuración de privacidad guardada' });
      } else {
        setMessage({ type: 'error', text: '❌ Error al guardar configuración' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: '❌ Error al guardar configuración' });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
      <CanonicalHead url="https://cementerio-virtual-mascotas.com/settings" />

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-sky-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-nature-800 mb-2">⚙️ Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en Forever Pet Friend</p>
        </div>

        {/* Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {[
            { id: 'profile', label: '👤 Perfil', icon: '👤' },
            { id: 'privacy', label: '🔒 Privacidad', icon: '🔒' },
            { id: 'notifications', label: '🔔 Notificaciones', icon: '🔔' },
            { id: 'security', label: '🔐 Seguridad', icon: '🔐' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 rounded-lg transition-all text-sm md:text-base font-medium ${
                activeTab === tab.id
                  ? 'bg-nature-600 text-white shadow-lg'
                  : 'bg-white border border-nature-200 text-nature-700 hover:bg-nature-50'
              }`}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tu información de perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-nature-700 mb-2">
                      Nombre Completo
                    </label>
                    <Input
                      type="text"
                      defaultValue={user?.name}
                      className="border-nature-300"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Este nombre se mostrará en tus memoriales
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-nature-700 mb-2">
                      Email
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        value={user?.email}
                        disabled
                        className="border-nature-300 bg-nature-50"
                      />
                      <Badge className="bg-green-100 text-green-800 h-fit">✅ Verificado</Badge>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-nature-700 mb-2">
                      Biografía (Opcional)
                    </label>
                    <textarea
                      placeholder="Cuéntanos sobre ti..."
                      className="w-full px-3 py-2 border border-nature-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-600 resize-none"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Máximo 500 caracteres
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-nature-700 mb-2">
                      Foto de Perfil
                    </label>
                    <div className="border-2 border-dashed border-nature-300 rounded-lg p-6 text-center hover:border-nature-600 transition-colors cursor-pointer">
                      <svg className="w-8 h-8 mx-auto mb-2 text-nature-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium text-nature-700">Sube una imagen</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG hasta 5MB</p>
                      <input type="file" accept="image/*" className="hidden" />
                    </div>
                  </div>

                  <Button className="w-full bg-nature-600 hover:bg-nature-700">
                    💾 Guardar Cambios
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle>Configuración de Privacidad</CardTitle>
                  <CardDescription>Controla quién puede ver tu información</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {message && (
                    <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {message.text}
                    </div>
                  )}

                  <label className="flex items-start gap-4 p-4 bg-nature-50 rounded-lg cursor-pointer hover:bg-nature-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={privacySettings.profilePublic}
                      onChange={() => handlePrivacyChange('profilePublic')}
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div>
                      <p className="font-medium text-nature-800">Perfil Público</p>
                      <p className="text-sm text-muted-foreground">Otros usuarios pueden ver tu perfil</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 bg-nature-50 rounded-lg cursor-pointer hover:bg-nature-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={privacySettings.memorialsVisible}
                      onChange={() => handlePrivacyChange('memorialsVisible')}
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div>
                      <p className="font-medium text-nature-800">Mostrar Mis Memoriales</p>
                      <p className="text-sm text-muted-foreground">Permitir que otros vean la lista de tus memoriales</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 bg-nature-50 rounded-lg cursor-pointer hover:bg-nature-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={privacySettings.anonymousTributes}
                      onChange={() => handlePrivacyChange('anonymousTributes')}
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div>
                      <p className="font-medium text-nature-800">Recibir Tributos Anónimos</p>
                      <p className="text-sm text-muted-foreground">Permitir que extraños dejen tributos en tus memoriales</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 bg-nature-50 rounded-lg cursor-pointer hover:bg-nature-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={privacySettings.publicStats}
                      onChange={() => handlePrivacyChange('publicStats')}
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div>
                      <p className="font-medium text-nature-800">Mostrar Estadísticas Públicas</p>
                      <p className="text-sm text-muted-foreground">Mostrar número de visitas y tributos a otros usuarios</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 bg-nature-50 rounded-lg cursor-pointer hover:bg-nature-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={privacySettings.searchEngineIndexing}
                      onChange={() => handlePrivacyChange('searchEngineIndexing')}
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div>
                      <p className="font-medium text-nature-800">Permitir Indexación en Buscadores</p>
                      <p className="text-sm text-muted-foreground">Permitir que Google, Bing, etc. indexen tu perfil</p>
                    </div>
                  </label>
                </CardContent>
              </Card>

              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle>Bloquear Usuarios</CardTitle>
                  <CardDescription>Impedir que ciertos usuarios interactúen contigo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">No tienes usuarios bloqueados</p>
                    <Button variant="outline" className="border-nature-300">
                      ➕ Agregar Usuario Bloqueado
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleSavePrivacy}
                disabled={loading}
                className="w-full bg-nature-600 hover:bg-nature-700"
              >
                {loading ? '💾 Guardando...' : '💾 Guardar Configuración de Privacidad'}
              </Button>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle>Preferencias de Email</CardTitle>
                  <CardDescription>Controla qué emails deseas recibir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      id: 'tributes-email',
                      title: '🎁 Nuevos Tributos',
                      description: 'Recibe email cuando alguien deja un tributo en tus memoriales',
                      defaultChecked: true
                    },
                    {
                      id: 'visits-email',
                      title: '👁️ Visitantes Nuevos',
                      description: 'Notificación semanal de nuevas visitas a tus memoriales',
                      defaultChecked: true
                    },
                    {
                      id: 'comments-email',
                      title: '💬 Nuevos Comentarios',
                      description: 'Recibe email cuando alguien comenta en tus memoriales',
                      defaultChecked: true
                    },
                    {
                      id: 'messages-email',
                      title: '📧 Mensajes Directos',
                      description: 'Notificación de nuevos mensajes de otros usuarios',
                      defaultChecked: false
                    },
                    {
                      id: 'newsletter',
                      title: '📰 Newsletter',
                      description: 'Recibe noticias y actualizaciones de Forever Pet Friend',
                      defaultChecked: false
                    },
                    {
                      id: 'anniversary',
                      title: '🎂 Recordatorios de Aniversario',
                      description: 'Recordatorio en la fecha de muerte de tus mascotas',
                      defaultChecked: true
                    }
                  ].map(setting => (
                    <label
                      key={setting.id}
                      className="flex items-start gap-4 p-4 bg-sky-50 rounded-lg cursor-pointer hover:bg-sky-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={setting.defaultChecked}
                        className="w-5 h-5 mt-1 cursor-pointer"
                      />
                      <div>
                        <p className="font-medium text-sky-900">{setting.title}</p>
                        <p className="text-sm text-sky-700">{setting.description}</p>
                      </div>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle>Notificaciones Push (Mobile)</CardTitle>
                  <CardDescription>Notificaciones en tiempo real en tu dispositivo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <label className="flex items-start gap-4 p-4 bg-sky-50 rounded-lg cursor-pointer hover:bg-sky-100 transition-colors">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 mt-1 cursor-pointer"
                    />
                    <div>
                      <p className="font-medium text-sky-900">Activar Notificaciones Push</p>
                      <p className="text-sm text-sky-700">Recibe alertas en tiempo real</p>
                    </div>
                  </label>
                </CardContent>
              </Card>

              <Button className="w-full bg-nature-600 hover:bg-nature-700">
                💾 Guardar Preferencias de Notificación
              </Button>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                  <CardDescription>Actualiza tu contraseña regularmente por seguridad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-nature-700 mb-2">
                      Contraseña Actual
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="border-nature-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-nature-700 mb-2">
                      Nueva Contraseña
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="border-nature-300"
                    />
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="text-muted-foreground">Requisitos:</p>
                      <p>✓ Al menos 8 caracteres</p>
                      <p>✓ Una mayúscula y una minúscula</p>
                      <p>✓ Un número</p>
                      <p>✓ Un carácter especial (!@#$%^&*)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-nature-700 mb-2">
                      Confirmar Contraseña
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="border-nature-300"
                    />
                  </div>

                  <Button className="w-full bg-nature-600 hover:bg-nature-700">
                    🔄 Actualizar Contraseña
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle>Sesiones Activas</CardTitle>
                  <CardDescription>Dispositivos donde has iniciado sesión</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-green-900">💻 Windows - Chrome</p>
                        <p className="text-sm text-green-700">Sesión actual</p>
                        <p className="text-xs text-green-600 mt-1">
                          IP: 192.168.1.100 | Última actividad: hace 2 minutos
                        </p>
                      </div>
                      <Badge className="bg-green-600">Activo</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-nature-50 rounded-lg border border-nature-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-nature-800">📱 iOS - Safari</p>
                        <p className="text-sm text-muted-foreground">Última conexión: hace 3 días</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          IP: 203.0.113.45
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                        Cerrar
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground pt-2">
                    Reconoce dispositivos desconocidos y cierra sesiones sospechosas
                  </p>
                </CardContent>
              </Card>

              <Card className="border-nature-200">
                <CardHeader>
                  <CardTitle>Autenticación de Dos Factores</CardTitle>
                  <CardDescription>Agrega una capa adicional de seguridad</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    La autenticación de dos factores proporciona seguridad adicional requeriendo un código de verificación además de tu contraseña.
                  </p>
                  <Button className="w-full bg-nature-600 hover:bg-nature-700">
                    🔐 Configurar 2FA
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
