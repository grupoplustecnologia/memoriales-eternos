// Client-side exports
export const PLANS = {
  HUELLA_ETERNA: {
    id: 'huella-eterna',
    name: 'Huella Eterna',
    price: 0,
    priceDisplay: 'Gratuito',
    description: 'Para quienes quieren mantener vivo el recuerdo de su compañero',
    features: [
      'Hasta 1 memorial ✓',
      'Galería de 1 foto por memorial ✓',
      'Tributos ilimitados ✓',
      'Ubicación en mapa mundial ✓',
      'Visible para siempre ✓',
    ],
    memorialLimit: 1,
    photoLimitPerMemorial: 1,
    highlighted: false,
  },
  CIELO_ESTRELLAS: {
    id: 'cielo-estrellas',
    name: 'Cielo de Estrellas',
    price: 299, // En centavos: €2.99
    priceDisplay: '€2.99',
    description: 'Ideal para familias que quieren un homenaje más completo',
    features: [
      'Hasta 5 memoriales ✓',
      'Galería de 2 fotos por memorial ✓',
      'Tributos ilimitados ✓',
      'Ubicación en mapa mundial ✓',
      'Visible para siempre ✓',
      'Icono especial en el mapa (Vela) ✓',
      'Notas de homenaje de texto ✓',
    ],
    memorialLimit: 5,
    photoLimitPerMemorial: 2,
    highlighted: false,
  },
  SANTUARIO_PREMIUM: {
    id: 'santuario-premium',
    name: 'Santuario Premium',
    price: 699, // En centavos: €6.99
    priceDisplay: '€6.99',
    description: 'La forma más completa y emotiva de honrar a sus mascotas',
    features: [
      'Memoriales ilimitados ✓',
      'Galería de fotos ilimitada ✓',
      'Tributos ilimitados ✓',
      'Ubicación en mapa mundial con foto ✓',
      'Visible para siempre ✓',
      'Iconos especiales ✓',
      'Recordatorios anuales para honrar amigo querido ✓',
      'Destacado Premium ✓',
    ],
    memorialLimit: Infinity,
    photoLimitPerMemorial: Infinity,
    highlighted: true,
  },
};

export function getPlanLimits(planType: string) {
  const plan = Object.values(PLANS).find((p) => p.id === planType);
  return {
    memorialLimit: plan?.memorialLimit ?? 1,
    photoLimitPerMemorial: plan?.photoLimitPerMemorial ?? 1,
  };
}
