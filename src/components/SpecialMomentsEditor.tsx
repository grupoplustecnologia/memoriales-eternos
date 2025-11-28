'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpecialMomentType } from '@/types/index';

interface SpecialMomentData {
  type: SpecialMomentType;
  emoji: string;
  title: string;
  description: string;
  placeholder: string;
  requiredPlan: 'huella-eterna' | 'cielo-estrellas' | 'santuario-premium';
}

const SPECIAL_MOMENTS: SpecialMomentData[] = [
  {
    type: 'primer-dia',
    emoji: '💫',
    title: 'Primer Día Juntos',
    description: 'Cuenta la historia de cómo llegó a tu vida',
    placeholder: 'El día que lo conocí... era un hermoso...',
    requiredPlan: 'cielo-estrellas'
  },
  {
    type: 'ultimo-adios',
    emoji: '🕯️',
    title: 'Último Adiós',
    description: 'Despídete con tus palabras más sinceras',
    placeholder: 'Te fuiste dejando... gracias por...',
    requiredPlan: 'cielo-estrellas'
  },
  {
    type: 'su-historia',
    emoji: '📖',
    title: 'Su Historia',
    description: 'Narra los momentos más memorables',
    placeholder: 'Aquellos días cuando... nos divertíamos...',
    requiredPlan: 'cielo-estrellas'
  },
  {
    type: 'juguete-favorito',
    emoji: '🎾',
    title: 'Juguete Favorito',
    description: 'Habla sobre los momentos de juego',
    placeholder: 'Su juguete favorito era... siempre le encantaba...',
    requiredPlan: 'santuario-premium'
  },
  {
    type: 'cumpleaños',
    emoji: '🎂',
    title: 'Celebra su Cumpleaños',
    description: 'Marca sus cumpleaños con tributos especiales',
    placeholder: 'Hoy cumpliría... recuerdo cuando...',
    requiredPlan: 'santuario-premium'
  },
  {
    type: 'aniversario',
    emoji: '💕',
    title: 'Aniversario',
    description: 'Honra cada año de su compañía',
    placeholder: 'Hace un año... hoy recuerdo...',
    requiredPlan: 'santuario-premium'
  }
];

interface Props {
  isPremium?: boolean;
  userPlan?: 'huella-eterna' | 'cielo-estrellas' | 'santuario-premium';
  onSaveMoment?: (moment: any) => void;
}

export function SpecialMomentsEditor({ isPremium = false, userPlan = 'huella-eterna', onSaveMoment }: Props) {
  const [selectedMoment, setSelectedMoment] = useState<SpecialMomentType | null>(null);
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const canAccessMoment = (moment: SpecialMomentData) => {
    if (!isPremium && moment.requiredPlan !== 'huella-eterna') return false;
    if (userPlan === 'huella-eterna') return moment.requiredPlan === 'huella-eterna';
    if (userPlan === 'cielo-estrellas') return moment.requiredPlan !== 'santuario-premium';
    return true;
  };

  const handleSave = async () => {
    if (!selectedMoment || !content.trim()) {
      alert('Por favor completa el contenido antes de guardar');
      return;
    }

    setIsSaving(true);
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const moment = SPECIAL_MOMENTS.find(m => m.type === selectedMoment);
      console.log(`Momento guardado: ${moment?.title}`);
      
      if (onSaveMoment) {
        onSaveMoment({
          type: selectedMoment,
          content,
          createdAt: new Date().toISOString()
        });
      }

      alert('✨ Momento especial guardado con éxito');
      setSelectedMoment(null);
      setContent('');
    } finally {
      setIsSaving(false);
    }
  };

  if (selectedMoment) {
    const moment = SPECIAL_MOMENTS.find(m => m.type === selectedMoment)!;
    return (
      <Card className="p-6">
        <div className="mb-6">
          <button
            onClick={() => setSelectedMoment(null)}
            className="text-sky-600 hover:text-sky-700 font-semibold mb-4 flex items-center gap-2"
          >
            ← Volver a momentos
          </button>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{moment.emoji}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{moment.title}</h2>
              <p className="text-gray-600">{moment.description}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={moment.placeholder}
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none resize-none"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={isSaving || !content.trim()}
            className="bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {isSaving ? 'Guardando...' : '💾 Guardar Momento'}
          </Button>
          <Button
            onClick={() => setSelectedMoment(null)}
            className="bg-gray-200 text-gray-900 hover:bg-gray-300"
          >
            Cancelar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📝 Momentos Especiales
        </h2>
        <p className="text-gray-600">
          Crea secciones personalizadas para contar historias únicas de tu compañero.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SPECIAL_MOMENTS.map(moment => {
          const hasAccess = canAccessMoment(moment);
          
          return (
            <Card
              key={moment.type}
              className={`p-6 cursor-pointer transition-all ${
                hasAccess
                  ? 'hover:shadow-lg hover:border-sky-300'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="text-4xl">{moment.emoji}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{moment.title}</h3>
                  <p className="text-sm text-gray-600">{moment.description}</p>
                </div>
              </div>

              {hasAccess ? (
                <Button
                  onClick={() => setSelectedMoment(moment.type)}
                  className="w-full bg-sky-600 text-white hover:bg-sky-700"
                >
                  Crear Ahora
                </Button>
              ) : (
                <div className="bg-golden-50 border-2 border-golden-200 rounded p-3">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold">🔒 Disponible en:</span> {moment.requiredPlan === 'santuario-premium' ? 'Santuario Premium' : 'Cielo de Estrellas'}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {!isPremium && (
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl">✨</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Desbloquea más momentos</h3>
              <p className="text-sm text-gray-700 mb-4">
                Con un plan de pago, puedes crear momentos especiales para cumpleaños, aniversarios y más.
              </p>
              <a href="/plans" className="text-sky-600 hover:text-sky-700 font-semibold">
                Ver planes →
              </a>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
