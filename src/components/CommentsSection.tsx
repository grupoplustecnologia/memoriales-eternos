'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface Comment {
  id: string;
  visitorName: string;
  message: string;
  createdAt: string;
  visitor?: {
    id: string;
    profilePicture?: string;
  };
}

interface CommentsSectionProps {
  profileId: string;
}

export function CommentsSection({ profileId }: CommentsSectionProps) {
  const { user, isAuthenticated, session } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [visitorName, setVisitorName] = useState(user?.name || '');

  useEffect(() => {
    setVisitorName(user?.name || '');
  }, [user?.name]);

  useEffect(() => {
    fetchComments();
  }, [profileId]);

  async function fetchComments() {
    try {
      const response = await fetch(`/api/comments?profileId=${profileId}`);
      const data = await response.json();

      if (data.success) {
        setComments(data.data.comments);
        setCommentCount(data.data.count);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  async function handleSubmit() {
    if (!message.trim() || !visitorName.trim()) {
      alert('Debes proporcionar un nombre y un mensaje');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isAuthenticated && session?.token && {
            'Authorization': `Bearer ${session.token}`,
          }),
        },
        body: JSON.stringify({
          profileId,
          message,
          visitorName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('');
        await fetchComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(commentId: string) {
    if (!session?.token) {
      alert('Debes iniciar sesión para eliminar comentarios');
      return;
    }

    if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      return;
    }

    try {
      const response = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.token}`,
        },
      });

      if (response.ok) {
        await fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle size={20} />
        <h3 className="text-lg font-semibold">Comentarios ({commentCount})</h3>
      </div>

      {/* Comment form */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <Input
          placeholder="Tu nombre"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          disabled={isAuthenticated}
        />
        <Textarea
          placeholder="Escribe un comentario..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full"
        >
          Publicar Comentario
        </Button>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay comentarios aún. ¡Sé el primero!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm">
                    {comment.visitorName}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {new Date(comment.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
                {(user?.id === comment.visitor?.id || user?.role === 'ADMIN') && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className="text-gray-700">{comment.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
