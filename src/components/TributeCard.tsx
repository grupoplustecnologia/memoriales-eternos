'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Flag, MessageSquare, Send } from 'lucide-react';

interface Tribute {
  id: string;
  visitorName: string;
  message: string;
  tributeType: string;
  createdAt: string;
  isAnonymous?: boolean;
}

interface TributeCardProps {
  tribute: Tribute;
  profileId: string;
}

const TRIBUTE_EMOJIS: Record<string, string> = {
  flower: '🌹',
  candle: '🕯️',
  heart: '❤️',
  angel: '😇',
  default: '🌹',
};

export default function TributeCard({ tribute, profileId }: TributeCardProps) {
  const { user, session } = useAuth();
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [replyCount, setReplyCount] = useState(0);
  const [replyMessage, setReplyMessage] = useState('');
  const [replies, setReplies] = useState<any[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(false);

  const emoji = TRIBUTE_EMOJIS[tribute.tributeType] || TRIBUTE_EMOJIS.default;
  const dateStr = new Date(tribute.createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Cargar likes al montar
  useEffect(() => {
    fetchLikeInfo();
    fetchReplies();
  }, []);

  async function fetchLikeInfo() {
    try {
      const params = new URLSearchParams();
      if (user?.id) params.append('userId', user.id);

      const response = await fetch(
        `/api/tributes/${tribute.id}/like?${params}`,
        { method: 'GET' }
      );
      const data = await response.json();
      setLikeCount(data.data.count);
      setHasLiked(data.data.hasLiked);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }

  async function fetchReplies() {
    try {
      const response = await fetch(
        `/api/tributes/${tribute.id}/reply?limit=10`,
        { method: 'GET' }
      );
      const data = await response.json();
      if (data.success) {
        setReplies(data.data);
        setReplyCount(data.data.length);
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  }

  async function toggleLike() {
    if (!user) {
      alert('Debes iniciar sesión para dar like');
      return;
    }

    if (!session?.token) {
      alert('Token no disponible');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/tributes/${tribute.id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      if (data.success) {
        setLikeCount(data.data.count);
        setHasLiked(data.data.liked);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  }

  async function submitReply() {
    if (!user) {
      alert('Debes iniciar sesión para responder');
      return;
    }

    if (!session?.token) {
      alert('Token no disponible');
      return;
    }

    if (!replyMessage.trim()) {
      alert('Escribe un mensaje');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/tributes/${tribute.id}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: replyMessage }),
      });

      const data = await response.json();
      if (data.success) {
        setReplyMessage('');
        await fetchReplies();
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setLoading(false);
    }
  }

  async function reportTribute() {
    const reason = prompt('¿Cuál es la razón del reporte?\n\nOpciones: inappropriate, spam, offensive, misleading, other');
    if (!reason) return;

    try {
      const response = await fetch(`/api/tributes/${tribute.id}/report`, {
        method: 'POST',
        headers: {
          'Authorization': session?.token ? `Bearer ${session.token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason,
          description: 'Reporte desde la interfaz de usuario',
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('✅ Reporte enviado. Gracias por ayudarnos a mantener la comunidad segura.');
      }
    } catch (error) {
      console.error('Error reporting tribute:', error);
      alert('Error al enviar el reporte');
    }
  }

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        {/* Encabezado */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3 flex-1">
            <div className="text-4xl">{emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold">{tribute.visitorName}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">{dateStr}</p>
            </div>
          </div>
        </div>

        {/* Mensaje */}
        <p className="text-gray-700 mb-4 leading-relaxed">{tribute.message}</p>

        {/* Acciones */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b">
          <Button
            size="sm"
            variant={hasLiked ? 'default' : 'outline'}
            onClick={toggleLike}
            disabled={loading}
            className={hasLiked ? 'bg-red-500 hover:bg-red-600' : ''}
          >
            <Heart className="w-4 h-4 mr-2" fill={hasLiked ? 'currentColor' : 'none'} />
            Me gusta ({likeCount})
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowReplies(!showReplies)}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Responder ({replyCount})
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={reportTribute}
          >
            <Flag className="w-4 h-4 mr-2" />
            Reportar
          </Button>
        </div>

        {/* Replies */}
        {showReplies && (
          <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-lg">
            {/* Mostrar respuestas existentes */}
            {replies.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-700">Respuestas ({replies.length})</p>
                {replies.map((reply) => (
                  <div key={reply.id} className="bg-white p-3 rounded border border-gray-200">
                    <p className="font-medium text-sm">{reply.author.name}</p>
                    <p className="text-sm text-gray-700 mt-1">{reply.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(reply.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Formulario para responder */}
            {user && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribe una respuesta..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !loading) {
                      submitReply();
                    }
                  }}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <Button
                  size="sm"
                  onClick={submitReply}
                  disabled={loading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}

            {!user && (
              <p className="text-sm text-gray-600">
                Debes iniciar sesión para responder
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
