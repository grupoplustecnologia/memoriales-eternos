import { useState, useEffect } from 'react';

interface Memorial {
  id: string;
  name: string;
  photoUrl: string;
  animalType: string;
  deathDate: string;
  viewCount: number;
  user: {
    name: string;
  };
  _count?: {
    tributes: number;
    likes: number;
    comments: number;
  };
}

export function useTrending(type: 'popular' | 'recent' | 'mostCommented' | 'mostLiked' = 'popular', limit = 12) {
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/trending?type=${type}&limit=${limit}`
        );
        const data = await response.json();

        if (data.success) {
          setMemorials(data.data);
        }
      } catch (error) {
        console.error('Trending error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, [type, limit]);

  return { memorials, loading };
}
