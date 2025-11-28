import { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  name: string;
  photoUrl: string;
  animalType: string;
  deathDate: string;
  user: {
    name: string;
  };
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(query: string, type?: 'all' | 'memorial' | 'animal' | 'location') {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}${type ? `&type=${type}` : ''}`
      );
      const data = await response.json();

      if (data.success) {
        setResults(data.data.memorials || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }

  return { results, loading, search };
}
