'use client';

import { useState, useCallback } from 'react';
import type { Tribute } from '@/types';

export function useTributes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTributes = useCallback(async (profileId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/tributes?profileId=${profileId}`);
      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data || [] };
      } else {
        setError(result.error || 'Error fetching tributes');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error fetching tributes';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  const getTributeStats = useCallback(async (profileId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/tributes?profileId=${profileId}&action=stats`);
      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setError(result.error || 'Error fetching stats');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error fetching stats';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  const createTribute = useCallback(async (tribute: Omit<Tribute, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/tributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tribute)
      });

      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setError(result.error || 'Error creating tribute');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error creating tribute';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTribute = useCallback(async (tributeId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/tributes?id=${tributeId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        return { success: true };
      } else {
        setError(result.error || 'Error deleting tribute');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error deleting tribute';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchTributes,
    getTributeStats,
    createTribute,
    deleteTribute
  };
}
