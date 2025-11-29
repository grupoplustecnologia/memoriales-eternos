'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import type { AnimalProfile } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useRef, memo } from 'react';
import { PlanPermissionsService } from '@/lib/planPermissions';

// Fix for default markers in Leaflet
const createCustomIcon = (type: string, isSelected: boolean = false, userPlan?: string) => {
  const iconColors: Record<string, string> = {
    perro: '#7a8b62',
    gato: '#0ea5e9',
    ave: '#facc15',
    roedor: '#98a582',
    reptil: '#5f6e4c',
    otro: '#ca8a04'
  };

  const color = iconColors[type] || '#7a8b62';
  
  // Get size based on plan
  let baseSizeMultiplier = 1;
  let highlightColor = 'white';
  let hasRedBackground = false;
  
  if (userPlan) {
    const markerSize = PlanPermissionsService.getMapMarkerSize(userPlan as any);
    const markerHighlight = PlanPermissionsService.getMapMarkerHighlight(userPlan as any);
    
    // Size multipliers: small=0.5, medium=0.5, large=1.2, xlarge=1.6
    const sizeMap = { small: 0.5, medium: 0.5, large: 1.2, xlarge: 1.6 };
    baseSizeMultiplier = sizeMap[markerSize as keyof typeof sizeMap] || 1;
    
    // Apply red background for xlarge marked profiles
    if (markerHighlight === 'red') {
      hasRedBackground = true;
      highlightColor = '#ef4444'; // red-500
    }
  }
  
  const baseSize = isSelected ? 40 : 32;
  const size = Math.round(baseSize * baseSizeMultiplier);
  const borderWidth = isSelected ? 4 : 3;

  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${hasRedBackground ? `
          <div style="
            position: absolute;
            width: ${size + 8}px;
            height: ${size + 8}px;
            background-color: #fee2e2;
            border: 2px solid ${highlightColor};
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
          "></div>
        ` : ''}
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: ${borderWidth}px solid ${isSelected ? '#fbbf24' : 'white'};
          box-shadow: 0 ${isSelected ? 4 : 2}px ${isSelected ? 12 : 8}px rgba(0,0,0,${isSelected ? 0.4 : 0.3});
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          animation: ${isSelected ? 'bounce 0.5s ease' : 'none'};
        ">
          <span style="
            transform: rotate(45deg);
            color: white;
            font-size: ${Math.round(size * 0.5)}px;
          ">🐾</span>
        </div>
      </div>
      <style>
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(-10px) rotate(-45deg); }
        }
      </style>
    `,
    className: 'custom-marker',
    iconSize: [size + 8, size + 8],
    iconAnchor: [(size + 8) / 2, size + 8],
    popupAnchor: [0, -(size + 8)]
  });
};

// Component to handle map centering when profile is selected
function MapController({ selectedProfile, profiles }: { selectedProfile: string | null; profiles: AnimalProfile[] }) {
  const map = useMap();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (selectedProfile && map) {
      const profile = profiles.find(p => p.id === selectedProfile);
      if (profile) {
        // Use setTimeout to ensure map is ready
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          map.setView([profile.latitude, profile.longitude], 12, {
            animate: true,
            duration: 1
          });
        }, 100);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedProfile, map, profiles]);

  return null;
}

interface MapContentProps {
  profiles: AnimalProfile[];
  selectedProfile?: string | null;
  onProfileSelect?: (id: string | null) => void;
  userPlan?: string; // Plan del usuario para aplicar estilos
}

// Calculate age helper
const calculateAge = (birthDate: string, deathDate: string) => {
  const birth = new Date(birthDate);
  const death = new Date(deathDate);
  const years = death.getFullYear() - birth.getFullYear();
  const months = death.getMonth() - birth.getMonth();

  if (years > 0) {
    return `${years} año${years > 1 ? 's' : ''}`;
  }
  return `${months} mes${months > 1 ? 'es' : ''}`;
};

export function MapContent({
  profiles,
  selectedProfile,
  onProfileSelect,
  userPlan
}: MapContentProps) {
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedProfile={selectedProfile || null} profiles={profiles} />

        {profiles.map((profile) => {
          const isSelected = selectedProfile === profile.id;
          // Use 'huella-eterna' as default if userSubscriptionTier is not defined
          const userPlan = profile.userSubscriptionTier || 'huella-eterna';

          return (
            <Marker
              key={profile.id}
              position={[profile.latitude, profile.longitude]}
              icon={createCustomIcon(profile.animalType, isSelected, userPlan)}
              eventHandlers={{
                click: () => {
                  if (onProfileSelect) {
                    onProfileSelect(profile.id);
                  }
                }
              }}
            >
              <Popup maxWidth={400} className="custom-popup">
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Hero image with overlay */}
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/95 text-nature-700 font-semibold shadow-lg">
                        {profile.animalType}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-bold text-2xl text-white drop-shadow-lg">{profile.name}</h3>
                      <p className="text-sm text-white/90 drop-shadow">
                        {profile.breed || profile.animalType}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">

                    {/* Epitaph - Featured */}
                    <div className="relative mb-4">
                      <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 rounded-xl p-4 border-l-4 border-rose-400 shadow-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-2xl">✨</span>
                          <p className="text-sm text-gray-700 italic font-medium line-clamp-3">
                            "{profile.epitaph}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Story preview */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-nature-700 mb-2 uppercase tracking-wide">Historia</p>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {profile.story}
                      </p>
                    </div>

                    {/* Gallery preview */}
                    {profile.gallery && profile.gallery.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-nature-700 mb-2 uppercase tracking-wide">Galería</p>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {profile.gallery.slice(0, 4).map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`${profile.name} - ${idx + 1}`}
                              className="w-14 h-14 object-cover rounded-lg flex-shrink-0 shadow-md hover:shadow-lg transition-shadow"
                            />
                          ))}
                          {profile.gallery.length > 4 && (
                            <div className="w-14 h-14 bg-gradient-to-br from-nature-400 to-nature-600 rounded-lg flex items-center justify-center text-xs text-white font-bold flex-shrink-0 shadow-md">
                              +{profile.gallery.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-3 border-t border-gray-200">
                      <Link href={`/profile/${profile.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-nature-600 to-nature-700 hover:from-nature-700 hover:to-nature-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Ver Memorial
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-nature-300 hover:bg-nature-50 hover:border-nature-400 transition-colors"
                        title="Compartir"
                      >
                        <svg className="w-5 h-5 text-nature-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
