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
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        "
        onmouseover="this.style.transform='scale(1.15) translateY(-8px)'; this.style.filter='drop-shadow(0 12px 24px rgba(239, 68, 68, 0.3))'"
        onmouseout="this.style.transform='scale(1)'; this.style.filter='drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))'">
          <!-- Red background circle for Premium Pro -->
          <div style="
            position: absolute;
            width: 64px;
            height: 64px;
            background-color: #fee2e2;
            border: 2px solid #ef4444;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
            z-index: 1;
          "></div>
          <!-- Glow background -->
          <div style="
            position: absolute;
            width: 56px;
            height: 56px;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent);
            border-radius: 50%;
            z-index: 2;
          "></div>
          <!-- Foto circular premium -->
          <img src="${photoUrl}" alt="memorial" style="
            width: 52px;
            height: 52px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid white;
            box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.1);
            z-index: 3;
          "/>
          <!-- Badge premium -->
          <div style="
            position: absolute;
            top: -4px;
            right: -4px;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            border: 2px solid white;
            z-index: 4;
          ">👑</div>
        </div>
      `;
    }
    // Cielo de Estrellas: Cuadrado con borde azul y estrella
    else if (userPlan === 'cielo-estrellas') {
      el.innerHTML = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          cursor: pointer;
          filter: drop-shadow(0 4px 12px rgba(6, 182, 212, 0.3));
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        "
        onmouseover="this.style.transform='scale(1.2)'; this.style.filter='drop-shadow(0 6px 16px rgba(6, 182, 212, 0.5))'"
        onmouseout="this.style.transform='scale(1)'; this.style.filter='drop-shadow(0 4px 12px rgba(6, 182, 212, 0.3))'">
          <!-- Square background with gradient -->
          <div style="
            position: absolute;
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, ${color}, rgba(14, 165, 233, 0.3));
            border-radius: 8px;
            z-index: 1;
          "></div>
          <!-- Cyan border -->
          <div style="
            position: absolute;
            width: 56px;
            height: 56px;
            border: 3px solid #0ea5e9;
            border-radius: 8px;
            box-shadow: inset 0 0 12px rgba(14, 165, 233, 0.2);
            z-index: 2;
          "></div>
          <!-- Star icon -->
          <div style="
            font-size: 28px;
            z-index: 3;
            text-shadow: 0 2px 4px rgba(6, 182, 212, 0.3);
            animation: pulse-star 2s infinite;
          ">⭐</div>
          <style>
            @keyframes pulse-star {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          </style>
        </div>
      `;
    }
    // Gratuito: Teardrop con emoji (default)
    else {
      const darkerColor = adjustColor(color, -20);
      el.innerHTML = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          cursor: pointer;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        "
        onmouseover="this.style.transform='scale(1.15) translateY(-8px)'; this.style.filter='drop-shadow(0 12px 24px rgba(0, 0, 0, 0.25))'"
        onmouseout="this.style.transform='scale(1)'; this.style.filter='drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))'">
          <!-- Fondo degradado -->
          <div style="
            position: absolute;
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, ${color}, ${darkerColor});
            border-radius: 14px;
            z-index: 1;
          "></div>
          <!-- Brillo/shine -->
          <div style="
            position: absolute;
            width: 56px;
            height: 56px;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent);
            border-radius: 14px;
            z-index: 2;
          "></div>
          <!-- Emoji con backdrop -->
          <div style="
            font-size: 28px;
            z-index: 3;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          ">${icon}</div>
          <!-- Borde blanco suave -->
          <div style="
            position: absolute;
            width: 56px;
            height: 56px;
            border: 2px solid rgba(255, 255, 255, 0.6);
            border-radius: 14px;
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

      // Add new markers
      markers.forEach((marker) => {
        // Crear elemento personalizado para el marcador
        const el = createFlagMarker(marker.animalType, marker.userSubscriptionTier, marker.photoUrl);

        // Crear popup con tarjeta del animal
        const popupHTML = `
          <a href="/profile/${marker.id}" class="block no-underline">
            <div class="w-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div class="relative h-32 bg-gray-200">
                <img src="${marker.photoUrl}" alt="${marker.name}" class="w-full h-full object-cover" />
              </div>
              <div class="p-3">
                <h3 class="font-bold text-base text-gray-800">${marker.name}</h3>
                <p class="text-xs text-gray-600 mb-2">${marker.breed || marker.animalType}</p>
                <p class="text-xs text-gray-700 italic mb-2 line-clamp-2">"${marker.epitaph}"</p>
                <div class="mt-2 text-center text-xs font-semibold text-nature-600 hover:text-nature-800">
                  Ver Memorial →
                </div>
              </div>
            </div>
          </a>
        `;

        const popup = new mapboxgl.Popup({ offset: 0, maxWidth: 'none' }).setHTML(popupHTML);
        
        const newMarker = new mapboxgl.Marker(el)
          .setLngLat([marker.lng, marker.lat])
          .setPopup(popup)
          .addTo(map.current!);
        
        markersRef.current.push(newMarker);
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
