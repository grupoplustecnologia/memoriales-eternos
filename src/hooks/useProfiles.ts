import { useState, useEffect } from 'react';
import type { AnimalProfile } from '@/types';

export function useProfiles() {
  const [profiles, setProfiles] = useState<AnimalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/profiles');
      const result = await response.json();

      if (result.success) {
        setProfiles(result.data || []);
      } else {
        setError(result.error || 'Error fetching profiles');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching profiles');
      console.error('Error fetching profiles:', err);
    } finally {
      setLoading(false);
    }
  }

  async function createProfile(profile: Omit<AnimalProfile, 'id' | 'createdAt'>) {
    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      const result = await response.json();

      if (result.success) {
        await fetchProfiles();
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Error creating profile:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Error creating profile' };
    }
  }

  async function updateProfile(id: string, updates: Partial<Omit<AnimalProfile, 'id' | 'userId' | 'createdAt'>>) {
    try {
      const response = await fetch('/api/profiles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });

      const result = await response.json();

      if (result.success) {
        await fetchProfiles();
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Error updating profile' };
    }
  }

  async function deleteProfile(id: string) {
    try {
      const response = await fetch(`/api/profiles?id=${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        await fetchProfiles();
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Error deleting profile:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Error deleting profile' };
    }
  }

  async function searchProfiles(query: string) {
    try {
      const results = profiles.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.story.toLowerCase().includes(query.toLowerCase()) ||
        p.epitaph.toLowerCase().includes(query.toLowerCase())
      );

      return { success: true, data: results };
    } catch (err) {
      console.error('Error searching profiles:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Error searching profiles' };
    }
  }

  return {
    profiles,
    loading,
    error,
    fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    searchProfiles
  };
}
