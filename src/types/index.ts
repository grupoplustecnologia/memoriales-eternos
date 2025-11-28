export type AnimalType = 'perro' | 'gato' | 'ave' | 'roedor' | 'reptil' | 'otro';

export type SubscriptionTier = 'huella-eterna' | 'cielo-estrellas' | 'santuario-premium';
export type PaymentType = 'one-time' | 'subscription';
export type SpecialMomentType = 'primer-dia' | 'ultimo-adios' | 'su-historia' | 'juguete-favorito' | 'cumpleaños' | 'aniversario' | 'custom';
export interface SpecialMoment {
  id: string;
  profileId: string;
  type: SpecialMomentType;
  title: string;
  description: string;
  date?: string;
  images?: string[];
  createdAt: string;
}

export interface TributeConfig {
  type: 'vela-blanca' | 'vela-dorada' | 'flor' | 'flor-celestial' | 'corona-flores' | 'corazon';
  name: string;
  emoji: string;
  durationDays: number;
}

// Plan de suscripción
export interface PlanConfig {
  id: SubscriptionTier;
  emotionalName: string;
  emoji: string;
  description: string;
  priceOneTime: number;
  priceSubscription: number;
  subscriptionInterval: 'monthly' | 'quarterly';
  features: string[];
  maxMemorials: number | -1; // -1 = unlimited
  maxPhotosPerMemorial: number | -1;
  monthlyStarsIncluded: number;
  specialFeatures: string[];
  color: string;
}

export interface AnimalProfile {
  id: string;
  slug?: string;
  userId: string;
  name: string;
  animalType: AnimalType;
  breed?: string;
  birthDate: string;
  deathDate: string;
  latitude: number;
  longitude: number;
  photoUrl: string;
  story: string;
  epitaph: string;
  createdAt: string;
  updatedAt?: string;
  viewCount?: number;
  gallery?: string[];
  isCollaborative?: boolean;
  collaborators?: MemorialCollaborator[];
  isPublic?: boolean;
  userSubscriptionTier?: SubscriptionTier;
  tags?: { id: string; tag: { id: string; name: string; slug: string } }[];
}

export type CollaboratorRole = 'viewer' | 'editor' | 'co-admin';

export interface MemorialCollaborator {
  userId: string;
  email: string;
  name: string;
  role: CollaboratorRole;
  addedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Tribute {
  id: string;
  profileId: string;
  visitorName: string;
  tributeType: 'flower' | 'candle' | 'message';
  message?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: 'active' | 'inactive' | 'expired';
  paymentType: PaymentType;
  subscriptionEndDate?: string;
  oneTimePaymentDate?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planType: SubscriptionTier;
  paymentType: PaymentType;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodEnd: string;
  price: number;
}

// Configuración de planes
export const PLANS: Record<SubscriptionTier, PlanConfig> = {
  'huella-eterna': {
    id: 'huella-eterna',
    emotionalName: '🌱 Huella Eterna',
    emoji: '🌱',
    description: 'Para quienes quieren mantener vivo el recuerdo de su compañero',
    priceOneTime: 0,
    priceSubscription: 0,
    subscriptionInterval: 'monthly',
    features: [
      '1 memorial',
      'Foto principal + descripción',
      '1 Tributo',
      'Ubicación en mapa mundial',
      'Visible para siempre',
      '1 vela o corazón (Tributo)'
    ],
    maxMemorials: 1,
    maxPhotosPerMemorial: 5,
    monthlyStarsIncluded: 4,
    specialFeatures: ['Sin destacado'],
    color: '#7a8b62'
  },
  'cielo-estrellas': {
    id: 'cielo-estrellas',
    emotionalName: '✨ Cielo de Estrellas',
    emoji: '✨',
    description: 'Ideal para familias que quieren un homenaje más completo',
    priceOneTime: 2.99,
    priceSubscription: 2.99,
    subscriptionInterval: 'quarterly',
    features: [
      'Hasta 5 memoriales',
      'Galería de 2 fotos por memorial',
      'Tributos ilimitados',
      'Ubicación en mapa mundial',
      'Visible para siempre',
      'Iconos especiales (corona, estrella dorada, flor celestial)',
      'Notas de homenaje de texto'
    ],
    maxMemorials: 5,
    maxPhotosPerMemorial: 2,
    monthlyStarsIncluded: 10,
    specialFeatures: ['Destacado en mapa', 'Iconos especiales'],
    color: '#fbbf24'
  },
  'santuario-premium': {
    id: 'santuario-premium',
    emotionalName: '👑 Santuario Premium',
    emoji: '👑',
    description: 'La forma más completa y emotiva de honrar a sus mascotas',
    priceOneTime: 6.99,
    priceSubscription: 6.99,
    subscriptionInterval: 'quarterly',
    features: [
      'Memoriales ilimitados',
      'Galería de fotos ilimitada',
      'Tributos ilimitados',
      'Ubicación en mapa mundial tamaño X2',
      'Visible para siempre',
      'Iconos especiales (corona, estrella dorada, flor celestial)',
      'Recordatorios anuales para honrar amigo querido',
      '5 destacados semanales',
      'Soporte prioritario'
    ],
    maxMemorials: -1,
    maxPhotosPerMemorial: -1,
    monthlyStarsIncluded: 30,
    specialFeatures: [
      'Foto en mini de animalito en mapa en lugar de emoji',
      'Recordatorios anuales',
      '5 destacados semanales',
      'Soporte prioritario',
      '50% del dinero se destina a ONG'
    ],
    color: '#d4af37'
  }
};

// Tributos disponibles
export const TRIBUTE_CONFIGS: TributeConfig[] = [
  {
    type: 'vela-blanca',
    name: 'Vela Blanca',
    emoji: '🕯️',
    durationDays: 1
  },
  {
    type: 'vela-dorada',
    name: 'Vela Dorada',
    emoji: '✨🕯️',
    durationDays: 7
  },
  {
    type: 'flor',
    name: 'Flor',
    emoji: '🌹',
    durationDays: 3
  },
  {
    type: 'flor-celestial',
    name: 'Flor Celestial',
    emoji: '🌸',
    durationDays: 14
  },
  {
    type: 'corona-flores',
    name: 'Corona de Flores',
    emoji: '👑🌹',
    durationDays: 30
  },
  {
    type: 'corazon',
    name: 'Corazón Eterno',
    emoji: '❤️',
    durationDays: 7
  }
];

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Plan Gratuito',
    price: 0,
    profiles: 1,
    features: ['1 perfil básico', 'Ubicación en mapa', 'Foto y descripción']
  },
  'premium-monthly': {
    name: 'Premium Mensual',
    price: 4.99,
    profiles: 5,
    features: ['5 perfiles', 'Galería de fotos', 'Tributos ilimitados', 'Compartir en redes']
  },
  'premium-yearly': {
    name: 'Premium Anual',
    price: 49.99,
    profiles: -1,
    features: ['Perfiles ilimitados', 'Galería de fotos', 'Tributos ilimitados', 'Compartir en redes', 'Soporte prioritario']
  },
  family: {
    name: 'Plan Familiar',
    price: 79.99,
    profiles: -1,
    features: ['10 usuarios', 'Perfiles ilimitados', 'Todas las características Premium', 'Gestión familiar']
  }
};
