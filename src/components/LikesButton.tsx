'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface LikesButtonProps {
  profileId: string;
}

export function LikesButton({ profileId }: LikesButtonProps) {
  const { user, isAuthenticated, session } = useAuth();
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLikeStatus();
  }, [profileId, user?.id]);

  async function fetchLikeStatus() {
    try {
      const params = new URLSearchParams({
        profileId,
        ...(user?.id && { userId: user.id }),
      });

      const response = await fetch(`/api/likes?${params}`);
      const data = await response.json();

      if (data.success) {
        setLikeCount(data.data.count);
        setHasLiked(data.data.hasLiked);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }

  async function toggleLike() {
    if (!isAuthenticated || !session?.token) {
      alert('Debes iniciar sesión para dar me gusta');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId }),
      });

      const data = await response.json();

      if (data.success) {
        setHasLiked(data.data.liked);
        setLikeCount(data.data.count);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={toggleLike}
      disabled={loading}
      variant={hasLiked ? 'default' : 'outline'}
      className="gap-2"
    >
      <Heart
        size={18}
        className={hasLiked ? 'fill-red-500 text-red-500' : ''}
      />
      <span>{likeCount}</span>
    </Button>
  );
}
