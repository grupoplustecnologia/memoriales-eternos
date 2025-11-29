'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map, Marker } from 'mapbox-gl';

// Load mapbox CSS dynamically to avoid initialization errors
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css';
  document.head.appendChild(link);
}

interface MapboxMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    lng: number;
    lat: number;
    name: string;
    animalType: string;
    epitaph: string;
    photoUrl?: string;
    birthDate?: string;
    deathDate?: string;
    breed?: string;
    userSubscriptionTier?: string;
  }>;
}

export default function MapboxMap({
  center = [-3.7038, 40.4168],
  zoom = 13,
  markers = [],
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const animalColors: Record<string, string> = {
    perro: '#7a8b62',      // Verde tierra
    gato: '#0ea5e9',       // Celeste
    ave: '#f59e0b',        // Dorado
    roedor: '#ec4899',     // Rosa
    reptil: '#10b981',     // Verde esmeralda
    otro: '#6366f1',       // Índigo
  };

  const animalIcons: Record<string, string> = {
    perro: '🐕',
    gato: '🐱',
    ave: '🦅',
    roedor: '🐭',
    reptil: '🦎',
    otro: '🐾',
  };

  // Función auxiliar para ajustar color
  const adjustColor = (color: string, amount: number): string => {
    const usePound = color[0] === "#";
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return (usePound ? "#" : "") + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  };

  // Función para crear marker personalizado moderno
  // Función para agrupar marcadores cercanos
  const clusterNearbyMarkers = (markersList: typeof markers) => {
    const clustered: Array<{
      markers: Array<{ marker: typeof markers[0]; offsetPos: { lng: number; lat: number } }>;
    }> = [];
    const processed = new Set<number>();
    const PROXIMITY_THRESHOLD = 0.0005; // ~50 metros en coordenadas

    markersList.forEach((marker, idx) => {
      if (processed.has(idx)) return;

      const nearby: number[] = [idx];
      processed.add(idx);

      // Buscar marcadores cercanos
      markersList.forEach((otherMarker, otherIdx) => {
        if (idx === otherIdx || processed.has(otherIdx)) return;

        const distance = Math.sqrt(
          Math.pow(marker.lng - otherMarker.lng, 2) +
          Math.pow(marker.lat - otherMarker.lat, 2)
        );

        if (distance <= PROXIMITY_THRESHOLD) {
          nearby.push(otherIdx);
          processed.add(otherIdx);
        }
      });

      // Crear posiciones offset para los marcadores cercanos
      const clusterMarkers = nearby.map((markerIdx, position) => {
        const markerData = markersList[markerIdx];
        
        if (nearby.length === 1) {
          // Un solo marcador: posición exacta
          return {
            marker: markerData,
            offsetPos: { lng: markerData.lng, lat: markerData.lat },
          };
        } else {
          // Múltiples marcadores: distribuir en círculo
          const angle = (position / nearby.length) * Math.PI * 2;
          const radius = 0.0002; // ~20 metros
          return {
            marker: markerData,
            offsetPos: {
              lng: marker.lng + radius * Math.cos(angle),
              lat: marker.lat + radius * Math.sin(angle),
            },
          };
        }
      });

      clustered.push({ markers: clusterMarkers });
    });

    return clustered;
  };

  // Función para crear marker personalizado por plan
  const createFlagMarker = (animalType: string, userPlan?: string, photoUrl?: string) => {
    const el = document.createElement('div');
    const color = animalColors[animalType] || '#6366f1';
    const icon = animalIcons[animalType] || '🐾';
    
    // Premium Pro: Foto circular con foto
    if (userPlan === 'santuario-premium' && photoUrl) {
      el.innerHTML = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          cursor: pointer;
          filter: drop-shadow(0 4px 16px rgba(168, 85, 247, 0.4));
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        "
        onmouseover="this.style.transform='scale(1.15) translateY(-8px)'; this.style.filter='drop-shadow(0 8px 24px rgba(168, 85, 247, 0.6))'"
        onmouseout="this.style.transform='scale(1)'; this.style.filter='drop-shadow(0 4px 16px rgba(168, 85, 247, 0.4))'">
          <!-- Premium purple border -->
          <div style="
            position: absolute;
            width: 64px;
            height: 64px;
            background: radial-gradient(circle at 30% 30%, rgba(216, 180, 254, 0.4), transparent);
            border: 2px solid rgba(168, 85, 247, 0.6);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 16px rgba(168, 85, 247, 0.3), inset 0 0 12px rgba(168, 85, 247, 0.15);
            z-index: 1;
          "></div>
          <!-- Glow background -->
          <div style="
            position: absolute;
            width: 56px;
            height: 56px;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent);
            border-radius: 50%;
            z-index: 2;
          "></div>
          <!-- Foto circular premium -->
          <img src="${photoUrl}" alt="memorial" style="
            width: 52px;
            height: 52px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid rgba(168, 85, 247, 0.5);
            box-shadow: 0 0 12px rgba(168, 85, 247, 0.3), inset 0 0 12px rgba(0, 0, 0, 0.1);
            z-index: 3;
          "/>
          <!-- Badge crown -->
          <div style="
            position: absolute;
            top: -6px;
            right: -6px;
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #a855f7, #9333ea);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            border: 2px solid white;
            z-index: 4;
            box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
          ">👑</div>
        </div>
      `;
    }
    // Cielo de Estrellas: Cuadrado con borde azul y vela
    else if (userPlan === 'cielo-estrellas') {
      el.innerHTML = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          cursor: pointer;
          filter: drop-shadow(0 4px 12px rgba(6, 182, 212, 0.3));
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        "
        onmouseover="this.style.transform='scale(1.2)'; this.style.filter='drop-shadow(0 6px 16px rgba(6, 182, 212, 0.5))'"
        onmouseout="this.style.transform='scale(1)'; this.style.filter='drop-shadow(0 4px 12px rgba(6, 182, 212, 0.3))'">
          <!-- Square background with gradient -->
          <div style="
            position: absolute;
            width: 46px;
            height: 46px;
            background: linear-gradient(135deg, ${color}, rgba(14, 165, 233, 0.3));
            border-radius: 8px;
            z-index: 1;
          "></div>
          <!-- Cyan border -->
          <div style="
            position: absolute;
            width: 46px;
            height: 46px;
            border: 3px solid #0ea5e9;
            border-radius: 8px;
            box-shadow: inset 0 0 12px rgba(14, 165, 233, 0.2);
            z-index: 2;
          "></div>
          <!-- Vela icon con animación -->
          <div style="
            font-size: 24px;
            z-index: 3;
            text-shadow: 0 2px 4px rgba(6, 182, 212, 0.3);
            animation: pulse-star 2s infinite;
          ">🕯️</div>
          <style>
            @keyframes pulse-star {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          </style>
        </div>
      `;
    }
    // Premium sin foto: Circular con corona
    else if (userPlan === 'santuario-premium') {
      el.innerHTML = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          cursor: pointer;
          filter: drop-shadow(0 4px 16px rgba(168, 85, 247, 0.4));
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        "
        onmouseover="this.style.transform='scale(1.15) translateY(-8px)'; this.style.filter='drop-shadow(0 8px 24px rgba(168, 85, 247, 0.6))'"
        onmouseout="this.style.transform='scale(1)'; this.style.filter='drop-shadow(0 4px 16px rgba(168, 85, 247, 0.4))'">
          <!-- Circular background with gradient border -->
          <div style="
            position: absolute;
            width: 56px;
            height: 56px;
            background: radial-gradient(circle at 30% 30%, rgba(216, 180, 254, 0.3), transparent),
                        linear-gradient(135deg, ${color}, rgba(168, 85, 247, 0.2));
            border-radius: 50%;
            z-index: 1;
            border: 2px solid rgba(168, 85, 247, 0.5);
          "></div>
          <!-- Premium gradient background -->
          <div style="
            position: absolute;
            width: 52px;
            height: 52px;
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.1));
            border-radius: 50%;
            z-index: 2;
            border: 2px solid rgba(168, 85, 247, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          ">${icon}</div>
          <!-- Crown icon with glow -->
          <div style="
            position: absolute;
            top: -8px;
            font-size: 18px;
            z-index: 3;
            text-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
            animation: float 3s ease-in-out infinite;
          ">👑</div>
          <style>
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
          </style>
        </div>
      `;
    }
    // Gratuito: Cuadrado pequeño (36px)
    else {
      const darkerColor = adjustColor(color, -20);
      el.innerHTML = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          cursor: pointer;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        "
        onmouseover="this.style.transform='scale(1.15) translateY(-4px)'; this.style.filter='drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25))'"
        onmouseout="this.style.transform='scale(1)'; this.style.filter='drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'">
          <!-- Fondo degradado -->
          <div style="
            position: absolute;
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, ${color}, ${darkerColor});
            border-radius: 6px;
            z-index: 1;
          "></div>
          <!-- Brillo/shine -->
          <div style="
            position: absolute;
            width: 36px;
            height: 36px;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent);
            border-radius: 6px;
            z-index: 2;
          "></div>
          <!-- Emoji con backdrop -->
          <div style="
            font-size: 18px;
            z-index: 3;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          ">${icon}</div>
          <!-- Borde blanco suave -->
          <div style="
            position: absolute;
            width: 36px;
            height: 36px;
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 6px;
            z-index: 4;
          "></div>
        </div>
      `;
    }
    
    return el;
  };

  // Initialize map
  useEffect(() => {
    const token =
      typeof window !== 'undefined'
        ? (window as any).NEXT_PUBLIC_MAPBOX_TOKEN ||
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
          'pk.eyJ1IjoicGx1c3RlY25vbG9naWEyMDEwIiwiYSI6ImNtaTI5aWtwYTE3Ynoya3F6a3BqdDdvaDMifQ.yUrBHfq5XtftWfKrkIpbNA'
        : '';

    if (!token) {
      console.error('NEXT_PUBLIC_MAPBOX_TOKEN no está configurado');
      return;
    }

    // Dynamic import of mapbox-gl to avoid initialization errors
    (async () => {
      const mapboxgl = (await import('mapbox-gl')).default;
      
      mapboxgl.accessToken = token;

      if (!mapContainer.current) {
        return;
      }

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center,
        zoom,
        maxZoom: 14,
        pitch: 45,
        bearing: -60,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      map.current.on('load', () => {
        setMapLoaded(true);
      });
    })();

    return () => {
      map.current?.remove();
    };
  }, [center, zoom]);

  // Update markers when they change
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    console.log(`[MapboxMap] Adding ${markers.length} modern markers`);

    // Esperar a que el estilo esté completamente listo
    const addMarkersWhenReady = async () => {
      if (!map.current?.isStyleLoaded()) {
        setTimeout(addMarkersWhenReady, 100);
        return;
      }

      const mapboxgl = (await import('mapbox-gl')).default;

      // Agrupar marcadores cercanos
      const clusteredMarkers = clusterNearbyMarkers(markers);

      // Add new markers with clustering
      clusteredMarkers.forEach((cluster) => {
        cluster.markers.forEach(({ marker: actualMarker, offsetPos }) => {
          // Crear elemento personalizado para el marcador
          const el = createFlagMarker(
            actualMarker.animalType, 
            actualMarker.userSubscriptionTier, 
            actualMarker.photoUrl
          );

          // Crear popup con tarjeta del animal
          const popupHTML = `
            <a href="/profile/${actualMarker.id}" class="block no-underline">
              <div class="w-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
                <div class="relative h-32 bg-gray-200">
                  <img src="${actualMarker.photoUrl}" alt="${actualMarker.name}" class="w-full h-full object-cover" />
                </div>
                <div class="p-3">
                  <h3 class="font-bold text-base text-gray-800">${actualMarker.name}</h3>
                  <p class="text-xs text-gray-600 mb-2">${actualMarker.breed || actualMarker.animalType}</p>
                  <p class="text-xs text-gray-700 italic mb-2 line-clamp-2">"${actualMarker.epitaph}"</p>
                  <div class="mt-2 text-center text-xs font-semibold text-nature-600 hover:text-nature-800">
                    Ver Memorial →
                  </div>
                </div>
              </div>
            </a>
          `;

          const popup = new mapboxgl.Popup({ offset: 0, maxWidth: 'none' }).setHTML(popupHTML);
          
          const newMarker = new mapboxgl.Marker(el)
            .setLngLat([offsetPos.lng, offsetPos.lat])
            .setPopup(popup)
            .addTo(map.current!);
          
          markersRef.current.push(newMarker);
        });
      });
    };

    addMarkersWhenReady();
  }, [markers, mapLoaded]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg shadow-lg overflow-hidden"
      style={{ minHeight: '600px' }}
    />
  );
}
