'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlanPermissionsService } from '@/lib/planPermissions';

interface TributeOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

interface TributesSelectorProps {
  userPlan: string;
  onSelectTribute: (tributeType: string) => void;
  selectedTribute?: string;
  disabled?: boolean;
}

const TRIBUTE_OPTIONS: Record<string, TributeOption> = {
  'vela-blanca': {
    id: 'vela-blanca',
    label: 'Vela Blanca',
    emoji: '🕯️',
    description: 'Encender una vela en memoria'
  },
  'corazon': {
    id: 'corazon',
    label: 'Corazón',
    emoji: '❤️',
    description: 'Dejar un corazón de cariño'
  },
  'flores': {
    id: 'flores',
    label: 'Flores',
    emoji: '🌹',
    description: 'Colocar flores en el memorial'
  },
  'mensaje': {
    id: 'mensaje',
    label: 'Mensaje',
    emoji: '💌',
    description: 'Dejar un mensaje de recuerdo'
  },
  'oracion': {
    id: 'oracion',
    label: 'Oración',
    emoji: '🙏',
    description: 'Dejar una oración'
  }
};

export function TributesSelector({
  userPlan,
  onSelectTribute,
  selectedTribute,
  disabled = false
}: TributesSelectorProps) {
  const [hoveredTribute, setHoveredTribute] = useState<string | null>(null);

  // Get allowed tribute types for user's plan
  const allowedTypes = PlanPermissionsService.getAllowedTributeTypes(userPlan as any);
  const allowedTributes = allowedTypes
    .map(type => TRIBUTE_OPTIONS[type])
    .filter(Boolean);

  const isLockedFeature = allowedTributes.length < Object.keys(TRIBUTE_OPTIONS).length;

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Tipo de Tributo
        </label>
        <p className="text-xs text-gray-600">
          {allowedTributes.length === Object.keys(TRIBUTE_OPTIONS).length
            ? 'Todos los tipos de tributo disponibles'
            : `Disponibles para tu plan: ${allowedTributes.length}/${Object.keys(TRIBUTE_OPTIONS).length}`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {Object.values(TRIBUTE_OPTIONS).map(tribute => {
          const isAllowed = allowedTributes.some(t => t.id === tribute.id);
          const isSelected = selectedTribute === tribute.id;

          return (
            <button
              key={tribute.id}
              onClick={() => isAllowed && onSelectTribute(tribute.id)}
              disabled={disabled || !isAllowed}
              onMouseEnter={() => setHoveredTribute(tribute.id)}
              onMouseLeave={() => setHoveredTribute(null)}
              className={`
                relative p-3 rounded-lg border-2 transition-all duration-200
                ${isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : isAllowed
                    ? 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'
                    : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                }
              `}
              title={isAllowed ? tribute.description : `No disponible en tu plan (${userPlan})`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-2xl">{tribute.emoji}</div>
                <div className="text-xs font-medium text-center line-clamp-2">
                  {tribute.label}
                </div>
              </div>

              {/* Lock icon for unavailable tributes */}
              {!isAllowed && (
                <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Show locked feature info */}
      {isLockedFeature && (
        <Card className="p-3 bg-amber-50 border-amber-200">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Desblocea más tributos</span>
            {' '} al actualizar tu plan a Cielo de Estrellas o Santuario Premium
          </p>
        </Card>
      )}

      {/* Show selected tribute info */}
      {selectedTribute && (
        <Card className="p-3 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Tributo seleccionado:</span>
            {' '}{TRIBUTE_OPTIONS[selectedTribute]?.label}
          </p>
        </Card>
      )}
    </div>
  );
}
