'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import TributeCard from './TributeCard';

interface Tribute {
  id: string;
  type: 'flower' | 'candle' | 'heart' | 'angel';
  message: string;
  author: string;
  isAnonymous: boolean;
  isPremium: boolean;
  donation: number;
  timestamp: string;
  createdAtISO: string; // ISO date string for TributeCard
  status: 'pending' | 'approved';
  replies: string[];
}

interface TributeCounts {
  flower: number;
  candle: number;
  heart: number;
  angel: number;
  total: number;
}

const TRIBUTE_TYPES = [
  { id: 'flower', label: 'Flor', emoji: '🌹', color: 'bg-pink-100 text-pink-800', animation: 'animate-bounce', backendType: 'flor' },
  { id: 'candle', label: 'Vela', emoji: '🕯️', color: 'bg-yellow-100 text-yellow-800', animation: 'animate-pulse', backendType: 'vela-blanca' },
  { id: 'heart', label: 'Corazón', emoji: '❤️', color: 'bg-red-100 text-red-800', animation: 'animate-bounce', backendType: 'corazon' },
  { id: 'angel', label: 'Ángel', emoji: '😇', color: 'bg-blue-100 text-blue-800', animation: 'animate-pulse', backendType: 'angel' },
];

export default function TributesSection({ memorialId }: { memorialId: string }) {
  const router = useRouter();
  const { isAuthenticated, user, refreshUser } = useAuth();
  const [tributes, setTributes] = useState<Tribute[]>([]);

  const [selectedTributeType, setSelectedTributeType] = useState<'flower' | 'candle' | 'heart' | 'angel'>('flower');
  const [tributeMessage, setTributeMessage] = useState('');
  const [tributeAuthor, setTributeAuthor] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [memorialOwnerPlan, setMemorialOwnerPlan] = useState<string>('huella-eterna');
  const [tributeLimitReached, setTributeLimitReached] = useState(false);

  // Cargar tributos desde la API
  const loadTributes = async () => {
    try {
      const response = await fetch(`/api/tributes?profileId=${memorialId}`);
      const result = await response.json();
      if (result.success && result.data) {
        // Transformar datos de BD a formato del componente
        const transformed = result.data.map((t: any) => ({
          id: t.id,
          type: t.tributeType as 'flower' | 'candle' | 'heart' | 'angel' | 'message',
          message: t.message || '',
          author: t.visitorName || 'Anónimo',
          isAnonymous: false,
          isPremium: false,
          donation: 0,
          timestamp: new Date(t.createdAt).toLocaleString('es-ES'),
          createdAtISO: t.createdAt, // Guardar el ISO original
          status: 'approved' as const,
          replies: []
        }));
        setTributes(transformed);
        
        // Obtener información del dueño del memorial desde el API
        try {
          const memorialResponse = await fetch(`/api/profiles/${memorialId}`);
          const memorialData = await memorialResponse.json();
          if (memorialData.success && memorialData.data?.user?.subscriptionTier) {
            setMemorialOwnerPlan(memorialData.data.user.subscriptionTier);
            // Verificar si se alcanzó el límite
            const maxTributes = memorialData.data.user.subscriptionTier === 'huella-eterna' ? 1 : -1;
            if (maxTributes === 1 && transformed.length >= 1) {
              setTributeLimitReached(true);
            }
          }
        } catch (err) {
          console.error('Error loading memorial owner info:', err);
        }
      }
    } catch (error) {
      console.error('Error loading tributes:', error);
    }
  };

  // Cargar tributos cuando el componente se monta
  useEffect(() => {
    loadTributes();
  }, [memorialId]);

  const tributeCounts: TributeCounts = {
    flower: tributes.filter(t => t.type === 'flower' && t.status === 'approved').length,
    candle: tributes.filter(t => t.type === 'candle' && t.status === 'approved').length,
    heart: tributes.filter(t => t.type === 'heart' && t.status === 'approved').length,
    angel: tributes.filter(t => t.type === 'angel' && t.status === 'approved').length,
    total: tributes.filter(t => t.status === 'approved').length,
  };

  const handleAddTribute = async () => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para dejar un tributo');
      router.push('/auth/login');
      return;
    }

    if (!tributeMessage.trim() || (!isAnonymous && !tributeAuthor.trim())) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      console.log(`[TributesSection] Sending tribute with token: ${token?.substring(0, 10)}...`);
      console.log(`[TributesSection] User authenticated: ${isAuthenticated}, User ID: ${user?.id}`);
      
      // Guardar tributo en BD
      const response = await fetch('/api/tributes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify({
          profileId: memorialId,
          visitorName: isAnonymous ? 'Anónimo' : tributeAuthor,
          tributeType: selectedTributeType === 'heart' 
            ? 'corazon'  // Mapear 'heart' a 'corazon'
            : TRIBUTE_TYPES.find(t => t.id === selectedTributeType)?.backendType || selectedTributeType,
          message: tributeMessage,
        }),
      });

      const result = await response.json();
      console.log(`[TributesSection] Response from API:`, result);
      
      if (result.success && result.data) {
        // Crear tribute para mostrar localmente
        const newTribute: Tribute = {
          id: result.data.id,
          type: result.data.tributeType as any,
          message: result.data.message || '',
          author: result.data.visitorName,
          isAnonymous,
          isPremium: false,
          donation: 0,
          timestamp: new Date(result.data.createdAt).toLocaleString('es-ES'),
          createdAtISO: result.data.createdAt, // Guardar ISO también
          status: 'approved',
          replies: [],
        };
        
        // Actualizar localmente
        setTributes([newTribute, ...tributes]);
        setTributeMessage('');
        setTributeAuthor('');
        setIsAnonymous(false);
        setIsPremium(false);
        
        // Show success message
        alert('✓ Tributo enviado correctamente');
        
        // Refresh tribute data
        console.log('[TributesSection] Refreshing tributes...');
        await loadTributes();
      } else if (result.tributeLimitReached) {
        // El memorial ya alcanzó su límite
        const maxTributes = result.maxTributes;
        const currentCount = result.currentCount;
        alert(`⚠️ Este memorial ya ha recibido su límite de ${maxTributes} tributo${maxTributes > 1 ? 's' : ''}.\n\nEl dueño del memorial necesita actualizar su plan para recibir más tributos.`);
        setTributeLimitReached(true);
      } else {
        alert('Error al guardar el tributo: ' + (result.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error saving tribute:', error);
      alert('Error al guardar el tributo');
    }
  };

  const handleReportTribute = (tributeId: string) => {
    alert(`Reporte enviado para el tributo #${tributeId}`);
    // Aquí iría la lógica real de reporte
  };

  const getTributeTypeInfo = (type: string) => {
    return TRIBUTE_TYPES.find(t => t.id === type);
  };

  return (
    <div className="space-y-8">
      {/* Contador de Tributos */}
      <div className="bg-gradient-to-r from-nature-50 to-sky-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-nature-800 mb-4">📊 Tributos Recibidos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {TRIBUTE_TYPES.map(type => (
            <div key={type.id} className="text-center">
              <div className="text-3xl mb-1">{type.emoji}</div>
              <p className="text-sm font-medium text-gray-700">{type.label}</p>
              <p className="text-2xl font-bold text-nature-600">
                {tributeCounts[type.id as keyof typeof tributeCounts]}
              </p>
            </div>
          ))}
          <div className="text-center border-l-2 border-nature-200 pl-2">
            <div className="text-3xl mb-1">🎁</div>
            <p className="text-sm font-medium text-gray-700">Total</p>
            <p className="text-2xl font-bold text-sky-600">{tributeCounts.total}</p>
          </div>
        </div>
      </div>

      {/* Formulario de Tributo */}
      <Card className="border-nature-200 bg-gradient-to-br from-white to-nature-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ✍️ Dejar un Tributo
          </CardTitle>
          <CardDescription>
            Comparte tu recuerdo y homenajea a este ser especial
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isAuthenticated && (
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
              <p className="text-blue-900 font-medium mb-2">🔐 Debes iniciar sesión</p>
              <p className="text-blue-800 text-sm mb-3">
                Para dejar un tributo, primero necesitas crear una cuenta o iniciar sesión.
              </p>
              <Button
                onClick={() => router.push('/auth/login')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Ir a Iniciar Sesión
              </Button>
            </div>
          )}

          {/* Alerta cuando se alcanza el límite de tributos */}
          {tributeLimitReached && (
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-4">
              <p className="text-orange-900 font-medium mb-2">⚠️ Límite de Tributos Alcanzado</p>
              <p className="text-orange-800 text-sm mb-3">
                Este memorial ha recibido el máximo de tributos permitido por su plan (1 tributo). 
                El dueño necesita actualizar su plan para recibir más tributos.
              </p>
              <Button
                onClick={() => router.push('/subscription')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                Ver Planes de Actualización
              </Button>
            </div>
          )}

          {/* Selección de tipo de tributo */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Tributo</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TRIBUTE_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedTributeType(type.id as any)}
                  disabled={!isAuthenticated || tributeLimitReached}
                  className={`p-3 rounded-lg transition-all border-2 ${
                    !isAuthenticated || tributeLimitReached
                      ? 'opacity-50 cursor-not-allowed'
                      : selectedTributeType === type.id
                      ? `${type.color} border-current`
                      : 'border-gray-200 bg-white hover:border-nature-200'
                  }`}
                >
                  <div className="text-2xl">{type.emoji}</div>
                  <div className="text-xs font-medium mt-1">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mensaje */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tu Mensaje</label>
            <Textarea
              placeholder="Comparte tus recuerdos y sentimientos..."
              value={tributeMessage}
              onChange={(e) => setTributeMessage(e.target.value)}
              disabled={!isAuthenticated || tributeLimitReached}
              className="min-h-24"
            />
          </div>

          {/* Nombre del autor */}
          {!isAnonymous && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Tu Nombre</label>
              <Input
                placeholder="¿Cómo te llamas?"
                value={tributeAuthor}
                onChange={(e) => setTributeAuthor(e.target.value)}
                disabled={!isAuthenticated || tributeLimitReached}
              />
            </div>
          )}

          {/* Opciones */}
          <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                disabled={!isAuthenticated || tributeLimitReached}
                className="w-4 h-4"
              />
              <span className="text-sm">🕵️ Enviar de forma anónima</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
                disabled={!isAuthenticated || tributeLimitReached}
                className="w-4 h-4"
              />
              <div className="flex-1">
                <span className="text-sm font-medium">⭐ Tributo Premium Animado</span>
                <p className="text-xs text-gray-600">€5.99 - Animación especial y corazón dorado</p>
              </div>
            </label>
          </div>

          {/* Total a pagar */}
          {isPremium && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-300">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total a pagar:</span>
                <span className="text-2xl font-bold text-purple-700">€5.99</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                El tributo se mostrará con animaciones especiales y un icono premium
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleAddTribute}
              disabled={!isAuthenticated || tributeLimitReached}
              className={`flex-1 ${
                !isAuthenticated || tributeLimitReached
                  ? 'opacity-50 cursor-not-allowed'
                  : isPremium
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  : 'bg-nature-600 hover:bg-nature-700'
              }`}
            >
              {!isAuthenticated ? '🔐 Inicia sesión para enviar' : tributeLimitReached ? '❌ Límite alcanzado' : isPremium ? '💳 Enviar Tributo Premium (€5.99)' : '✓ Enviar Tributo'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Botones de vista */}
      <div className="flex gap-2 justify-center">
        <Button
          onClick={() => setShowGallery(false)}
          variant={!showGallery ? 'default' : 'outline'}
          className={!showGallery ? 'bg-nature-600 hover:bg-nature-700' : ''}
        >
          📝 Lista de Tributos
        </Button>
        <Button
          onClick={() => setShowGallery(true)}
          variant={showGallery ? 'default' : 'outline'}
          className={showGallery ? 'bg-nature-600 hover:bg-nature-700' : ''}
        >
          🎨 Galería Visual
        </Button>
      </div>

      {/* Galería de Tributos */}
      {showGallery && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-nature-800">Galería de Tributos Visuales</h3>

          {/* Visualización de tributos como flores/velas etc */}
          <div className="bg-gradient-to-b from-sky-100 to-sky-50 rounded-lg p-8 min-h-96 flex flex-wrap items-center justify-center gap-6">
            {tributes.filter(t => t.status === 'approved').map(tribute => {
              const typeInfo = getTributeTypeInfo(tribute.type);
              return (
                <div
                  key={tribute.id}
                  className={`flex flex-col items-center ${
                    tribute.isPremium ? typeInfo?.animation : ''
                  }`}
                >
                  <div className="text-5xl cursor-pointer hover:scale-125 transition-transform">
                    {typeInfo?.emoji}
                  </div>
                  {tribute.isPremium && (
                    <Badge className="mt-1 bg-yellow-100 text-yellow-800">⭐ Premium</Badge>
                  )}
                  <p className="text-xs text-gray-600 mt-2 text-center max-w-24">
                    {tribute.author}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lista de Tributos */}
      {!showGallery && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-nature-800">Tributos Recibidos</h3>

          {tributes.filter(t => t.status === 'approved').map(tribute => (
            <TributeCard
              key={tribute.id}
              tribute={{
                id: tribute.id,
                visitorName: tribute.author,
                message: tribute.message,
                tributeType: tribute.type,
                createdAt: tribute.createdAtISO, // Usar el ISO string original
                isAnonymous: tribute.isAnonymous,
              }}
              profileId={memorialId}
            />
          ))}

          {tributes.filter(t => t.status === 'approved').length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                Aún no hay tributos. ¡Sé el primero en dejar un homenaje! 🕊️
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Indicador de tributos pendientes de moderación */}
      {tributes.filter(t => t.status === 'pending').length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <p className="text-sm text-orange-800">
              ⏳ {tributes.filter(t => t.status === 'pending').length} tributo(s) pendiente(s) de moderación
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
