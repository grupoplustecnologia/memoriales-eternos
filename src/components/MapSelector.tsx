'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

// Custom hook for map events
function LocationMarker({ onSelect, location }: { onSelect: (lat: number, lng: number) => void; location: { lat: number; lng: number } | null }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(location);
  
  const map = useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng;
    setPosition({ lat, lng });
    onSelect(lat, lng);
  });

  useEffect(() => {
    if (location) {
      setPosition(location);
    }
  }, [location]);

  return position ? (
    <Marker
      position={[position.lat, position.lng]}
      icon={L.divIcon({
        html: `<div class="w-8 h-8 bg-nature-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-lg">📍</div>`,
        iconSize: [32, 32],
        className: 'custom-icon'
      })}
    >
      <Popup>
        <div className="text-sm">
          <p className="font-semibold">Ubicación seleccionada</p>
          <p className="text-xs">Lat: {position.lat.toFixed(6)}</p>
          <p className="text-xs">Lng: {position.lng.toFixed(6)}</p>
        </div>
      </Popup>
    </Marker>
  ) : null;
}

export default function MapSelector({ onLocationSelect, selectedLocation }: MapSelectorProps) {
  const defaultLocation: [number, number] = [40.4168, -3.7038]; // Madrid, España

  return (
    <div className="w-full h-96 rounded-lg border-2 border-nature-300 overflow-hidden shadow-md">
      <MapContainer
        center={defaultLocation}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelect={onLocationSelect} location={selectedLocation} />
      </MapContainer>
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md text-sm text-nature-700 z-10 pointer-events-none">
        <p className="font-semibold">👆 Haz clic en el mapa para seleccionar</p>
      </div>
    </div>
  );
}
