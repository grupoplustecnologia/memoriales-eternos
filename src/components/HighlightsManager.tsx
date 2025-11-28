'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlanPermissionsService } from '@/lib/planPermissions';
import type { AnimalProfile } from '@/types';

interface HighlightsManagerProps {
  profiles: AnimalProfile[];
  userPlan: string;
  currentHighlightIds?: string[];
  onSaveHighlights?: (profileIds: string[]) => Promise<void>;
}

export function HighlightsManager({
  profiles,
  userPlan,
  currentHighlightIds = [],
  onSaveHighlights
}: HighlightsManagerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(currentHighlightIds);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Check if feature is available
  const canHighlight = PlanPermissionsService.canHighlightProfiles(userPlan as any);
  const maxHighlights = PlanPermissionsService.getWeeklyHighlightLimit(userPlan as any);
  const remainingSlots = maxHighlights - selectedIds.length;

  if (!canHighlight || maxHighlights === 0) {
    return (
      <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="text-3xl">🔒</div>
          <div>
            <h3 className="font-bold text-amber-900">Destacados Semanales No Disponibles</h3>
            <p className="text-sm text-amber-800 mt-1">
              Este es un beneficio exclusivo del plan <strong>Santuario Premium</strong>. 
              Actualiza tu plan para destacar hasta {5} de tus memoriales cada semana y ayudarlos a ser más visibles en el mapa.
            </p>
            <Button className="mt-3 bg-amber-600 hover:bg-amber-700">
              Ver Planes
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const toggleProfileHighlight = (profileId: string) => {
    if (selectedIds.includes(profileId)) {
      // Remove if already selected
      setSelectedIds(selectedIds.filter(id => id !== profileId));
      setSaveMessage(null);
    } else if (selectedIds.length < maxHighlights) {
      // Add if within limit
      setSelectedIds([...selectedIds, profileId]);
      setSaveMessage(null);
    }
  };

  const handleSaveHighlights = async () => {
    if (!onSaveHighlights) return;

    setIsSaving(true);
    try {
      await onSaveHighlights(selectedIds);
      setSaveMessage({ 
        type: 'success', 
        text: `${selectedIds.length} memorial(es) destacado(s) para esta semana` 
      });
    } catch (error) {
      setSaveMessage({ 
        type: 'error', 
        text: 'Error al guardar los destacados. Intenta de nuevo.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with quota info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">✨ Memoriales Destacados</h2>
          <p className="text-sm text-gray-600 mt-1">
            Selecciona hasta {maxHighlights} memoriales para destacarlos en el mapa esta semana
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base px-4 py-2">
          {selectedIds.length}/{maxHighlights}
        </Badge>
      </div>

      {/* Profiles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No tienes memoriales aún. Crea uno para comenzar.</p>
          </div>
        ) : (
          profiles.map(profile => {
            const isSelected = selectedIds.includes(profile.id);
            const canSelect = !isSelected && selectedIds.length >= maxHighlights;

            return (
              <div
                key={profile.id}
                onClick={() => !canSelect && toggleProfileHighlight(profile.id)}
                className={`
                  relative p-4 rounded-lg border-2 transition-all cursor-pointer
                  ${isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : canSelect
                      ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-50'
                      : 'border-gray-300 bg-white hover:border-purple-300 hover:bg-purple-50'
                  }
                `}
              >
                {/* Image */}
                <div className="relative h-32 mb-3 overflow-hidden rounded-lg">
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
                      <div className="text-4xl animate-bounce">⭐</div>
                    </div>
                  )}
                  {canSelect && (
                    <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-semibold">Límite alcanzado</p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                  <p className="text-sm text-gray-600">{profile.breed || profile.animalType}</p>
                  
                  {/* Selection checkbox */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center
                      ${isSelected 
                        ? 'border-purple-500 bg-purple-500' 
                        : canSelect
                          ? 'border-gray-300 bg-gray-100'
                          : 'border-purple-200 bg-white'
                      }
                    `}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {isSelected ? 'Destacado esta semana' : 'Destacar'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Save section */}
      {selectedIds.length !== currentHighlightIds.length && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900 mb-3">
            Has hecho cambios en tus destacados. Guarda para aplicar los cambios.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleSaveHighlights}
              disabled={isSaving || selectedIds.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? 'Guardando...' : `Guardar Destacados (${selectedIds.length})`}
            </Button>
            <Button
              onClick={() => {
                setSelectedIds(currentHighlightIds);
                setSaveMessage(null);
              }}
              variant="outline"
              disabled={isSaving}
            >
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Status message */}
      {saveMessage && (
        <Card className={`
          p-4 border-2
          ${saveMessage.type === 'success' 
            ? 'bg-green-50 border-green-300' 
            : 'bg-red-50 border-red-300'
          }
        `}>
          <p className={`text-sm font-medium ${
            saveMessage.type === 'success' 
              ? 'text-green-800' 
              : 'text-red-800'
          }`}>
            {saveMessage.type === 'success' ? '✅' : '❌'} {saveMessage.text}
          </p>
        </Card>
      )}

      {/* Info box */}
      <Card className="p-4 bg-purple-50 border-purple-200">
        <p className="text-sm text-purple-900">
          <strong>💡 Tip:</strong> Los memoriales destacados aparecerán con un círculo rojo especial en el mapa 
          y tendrán mayor visibilidad durante la semana. Los destacados se pueden cambiar cada semana el lunes a las 12:00.
        </p>
      </Card>
    </div>
  );
}
