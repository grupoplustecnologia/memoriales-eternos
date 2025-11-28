'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MapboxMapSelectorProps {
  onLocationSelect: (lng: number, lat: number) => void;
  selectedLocation?: { lat: number; lng: number } | null;
}

export default function MapboxMapSelector({
  onLocationSelect,
  selectedLocation,
}: MapboxMapSelectorProps) {
  const [country, setCountry] = useState('España');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; place_name: string } | null>(
    selectedLocation ? { ...selectedLocation, place_name: '' } : null
  );

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Por favor ingresa una ciudad');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Construir query de búsqueda
      const query = `${address.trim()} ${city.trim()} ${country.trim()}`.trim();
      
      // Llamar al endpoint de Mapbox Geocoding
      const response = await fetch(
        `/api/geocode?q=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'No se encontró esa ubicación. Intenta con otra dirección.');
        return;
      }

      setSelectedCoords({
        lat: data.lat,
        lng: data.lng,
        place_name: data.text
      });
      onLocationSelect(data.lat, data.lng);
      setError('');
    } catch (err) {
      console.error('Error al buscar ubicación:', err);
      setError('Error al buscar la ubicación. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card className="p-5 border-nature-200">
        <div className="space-y-4">
          <div>
            <label htmlFor="country" className="text-sm font-semibold text-nature-700 block mb-2">
              País
            </label>
            <Input
              id="country"
              placeholder="España, Argentina, México..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border-nature-300"
              onKeyPress={handleKeyPress}
            />
          </div>

          <div>
            <label htmlFor="city" className="text-sm font-semibold text-nature-700 block mb-2">
              Ciudad o Pueblo *
            </label>
            <Input
              id="city"
              placeholder="Madrid, Barcelona, Sevilla..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border-nature-300"
              onKeyPress={handleKeyPress}
            />
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-semibold text-nature-700 block mb-2">
              Dirección Aproximada (Opcional)
            </label>
            <Input
              id="address"
              placeholder="Parque, calle, barrio, zona..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-nature-300"
              onKeyPress={handleKeyPress}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ej: Parque del Retiro, Calle Mayor, Paseo Marítimo, etc.
            </p>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-nature-600 hover:bg-nature-700 text-white font-semibold"
          >
            {isLoading ? '🔍 Buscando...' : '🔍 Buscar Ubicación con Mapbox'}
          </Button>
        </div>
      </Card>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-sm font-semibold text-red-800">
            ❌ {error}
          </p>
        </div>
      )}

      {/* Ubicación seleccionada */}
      {selectedCoords && (
        <div className="p-4 bg-green-50 border border-green-300 rounded-lg space-y-3">
          <div>
            <p className="text-sm font-semibold text-green-800 mb-2">
              ✅ Ubicación encontrada y sincronizada con Mapbox
            </p>
            <p className="text-xs text-green-700 font-medium">
              📍 {selectedCoords.place_name}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2 rounded border border-green-200">
            <div>
              <p className="text-green-700 font-mono">
                <strong>Latitud:</strong>
              </p>
              <p className="text-green-600 font-mono">{selectedCoords.lat.toFixed(6)}</p>
            </div>
            <div>
              <p className="text-green-700 font-mono">
                <strong>Longitud:</strong>
              </p>
              <p className="text-green-600 font-mono">{selectedCoords.lng.toFixed(6)}</p>
            </div>
          </div>

          <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
            <strong>✨ Listo:</strong> Esta ubicación aparecerá en el mapa mundial con estas coordenadas exactas.
          </div>
        </div>
      )}

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Cómo usar:</strong> Escribe el país, ciudad y opcionalmente una dirección específica (parque, calle, etc.). Mapbox encontrará las coordenadas exactas automáticamente.
        </p>
      </div>
    </div>
  );
}
