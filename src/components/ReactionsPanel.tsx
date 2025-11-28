'use client';

import { useState, useEffect } from 'react';
import { Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const REACTION_EMOJIS = ['❤️', '😢', '🙏', '😊', '🌹', '⭐', '🕊️', '💐'];

interface ReactionsPanelProps {
  profileId: string;
}

interface ReactionCount {
  emoji: string;
  count: number;
}

export function ReactionsPanel({ profileId }: ReactionsPanelProps) {
  const { user, isAuthenticated, session } = useAuth();
  const [reactions, setReactions] = useState<ReactionCount[]>([]);
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    fetchReactions();
  }, [profileId, user?.id]);

  async function fetchReactions() {
    try {
      const params = new URLSearchParams({
        profileId,
        ...(user?.id && { userId: user.id }),
      });

      const response = await fetch(`/api/reactions?${params}`);
      const data = await response.json();

      if (data.success) {
        setReactions(data.data.counts);
        setUserReactions(data.data.userReactions);
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  }

  async function toggleReaction(emoji: string) {
    if (!isAuthenticated || !session?.token) {
      alert('Debes iniciar sesión para reaccionar');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId, emoji }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchReactions();
      }
    } catch (error) {
      console.error('Error toggling reaction:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-wrap gap-2">
        {reactions.map((r) => (
          <Button
            key={r.emoji}
            onClick={() => toggleReaction(r.emoji)}
            variant={userReactions.includes(r.emoji) ? 'default' : 'outline'}
            size="sm"
            className="text-lg"
          >
            <span>{r.emoji}</span>
            <span className="ml-1 text-xs">{r.count}</span>
          </Button>
        ))}
      </div>

      <div className="relative">
        <Button
          onClick={() => setShowEmojis(!showEmojis)}
          variant="outline"
          size="sm"
          disabled={loading}
        >
          <Smile size={18} />
        </Button>
        
        {showEmojis && (
          <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg p-3 grid grid-cols-4 gap-2 z-50">
            {REACTION_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  toggleReaction(emoji);
                  setShowEmojis(false);
                }}
                className="text-2xl hover:scale-125 transition-transform"
                disabled={loading}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
