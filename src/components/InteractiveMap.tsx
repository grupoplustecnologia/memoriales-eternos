'use client';

import type { AnimalProfile } from '@/types';
import { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

interface InteractiveMapProps {
  profiles: AnimalProfile[];
  selectedTypes?: string[];
  selectedProfile?: string | null;
  onProfileSelect?: (id: string | null) => void;
  userPlan?: string; // Plan del usuario para aplicar estilos
}

// Dynamically import map content to prevent SSR window errors
const MapContent = dynamic(() => import('./MapContent').then(mod => mod.MapContent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-bounce">🗺️</div>
        <p className="text-muted-foreground">Cargando mapa interactivo...</p>
      </div>
    </div>
  ),
});

export function InteractiveMap({
  profiles,
  selectedTypes,
  selectedProfile,
  onProfileSelect,
  userPlan,
}: InteractiveMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize profiles to prevent unnecessary re-renders
  const memoizedProfiles = useMemo(
    () => profiles,
    [profiles.length, profiles.map((p) => p.id).join(',')]
  );

  if (!mounted) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce">🗺️</div>
          <p className="text-muted-foreground">Cargando mapa interactivo...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContent
      profiles={memoizedProfiles}
      selectedProfile={selectedProfile}
      onProfileSelect={onProfileSelect}
      userPlan={userPlan}
    />
  );
}
