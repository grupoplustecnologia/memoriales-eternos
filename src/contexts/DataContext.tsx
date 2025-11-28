'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { AnimalProfile, Tribute } from '@/types';

interface DataContextType {
  profiles: AnimalProfile[];
  tributes: Tribute[];
  loading: boolean;
  error: string | null;
  refreshProfiles: () => Promise<void>;
  refreshTributes: (profileId: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<AnimalProfile[]>([]);
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/profiles');
      const result = await response.json();

      if (result.success) {
        setProfiles(result.data || []);
      } else {
        setError(result.error || 'Error loading profiles');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading profiles');
      console.error('Error refreshing profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshTributes = async (profileId: string) => {
    try {
      const response = await fetch(`/api/tributes?profileId=${profileId}`);
      const result = await response.json();

      if (result.success) {
        setTributes(result.data || []);
      } else {
        setError(result.error || 'Error loading tributes');
      }
    } catch (err) {
      console.error('Error refreshing tributes:', err);
    }
  };

  // Load profiles on mount
  useEffect(() => {
    refreshProfiles();
  }, []);

  return (
    <DataContext.Provider
      value={{
        profiles,
        tributes,
        loading,
        error,
        refreshProfiles,
        refreshTributes
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
