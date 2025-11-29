import type { SubscriptionTier } from '@/types/index';

/**
 * Sistema de permisos basado en planes de suscripción
 * Define qué puede hacer cada usuario según su plan
 */

export interface PlanPermissions {
  maxMemorials: number; // -1 = ilimitado
  maxPhotosPerMemorial: number; // -1 = ilimitado
  maxTributes: number; // -1 = ilimitado
  allowedTributeTypes: string[]; // tipos de tributos disponibles
  canCreatePublicProfiles: boolean; // puede ver sus memoriales en el grid de /map
  mapMarkerSize: 'small' | 'medium' | 'large' | 'xlarge'; // tamaño del emoji en el mapa
  mapMarkerHighlight: 'none' | 'normal' | 'red'; // destaque del marcador
  weeklyHighlights: number; // cantidad de destacados semanales
  canHighlightProfiles: boolean; // puede destacar sus memoriales
  guestTributeAllowed: boolean; // visitantes pueden dejar tributos
}

// Definición de permisos para cada plan
export const PLAN_PERMISSIONS: Record<SubscriptionTier, PlanPermissions> = {
  'huella-eterna': {
    // Plan Gratuito
    maxMemorials: 1,
    maxPhotosPerMemorial: 1, // solo foto principal
    maxTributes: 1, // puede recibir 1 tributo
    allowedTributeTypes: [
      'vela-blanca',
      'vela-dorada',
      'flor',
      'flor-celestial',
      'corona-flores',
      'corazon',
      'angel'
    ], // TODOS los tipos de tributo
    canCreatePublicProfiles: true, // SÍ aparece en el grid de /map
    mapMarkerSize: 'small', // emoji pequeño
    mapMarkerHighlight: 'none', // sin destaque
    weeklyHighlights: 0,
    canHighlightProfiles: false,
    guestTributeAllowed: true, // visitantes pueden dejar 1 tributo
  },
  'cielo-estrellas': {
    // Plan Premium
    maxMemorials: 5,
    maxPhotosPerMemorial: 2, // foto principal + 2 adicionales
    maxTributes: -1, // ilimitados
    allowedTributeTypes: [
      'vela-blanca',
      'vela-dorada',
      'flor',
      'flor-celestial',
      'corona-flores',
      'corazon',
      'angel'
    ], // TODOS los tipos de tributo
    canCreatePublicProfiles: true, // SÍ aparece en el grid de /map
    mapMarkerSize: 'medium', // emoji tamaño normal
    mapMarkerHighlight: 'normal', // sin color especial
    weeklyHighlights: 0,
    canHighlightProfiles: false,
    guestTributeAllowed: true,
  },
  'santuario-premium': {
    // Plan Premium Pro
    maxMemorials: -1, // ilimitados
    maxPhotosPerMemorial: -1, // ilimitadas
    maxTributes: -1, // ilimitados
    allowedTributeTypes: [
      'vela-blanca',
      'vela-dorada',
      'flor',
      'flor-celestial',
      'corona-flores',
      'corazon',
      'angel'
    ], // TODOS los tipos de tributo
    canCreatePublicProfiles: true, // SÍ aparece en el grid de /map
    mapMarkerSize: 'xlarge', // emoji X2 más grande
    mapMarkerHighlight: 'red', // círculo rojo de fondo para destacar
    weeklyHighlights: 5, // 5 destacados semanales
    canHighlightProfiles: true, // puede destacar sus memoriales
    guestTributeAllowed: true,
  },
};

/**
 * Servicio para verificar permisos basados en planes
 */
export class PlanPermissionsService {
  /**
   * Obtiene los permisos para un plan específico
   */
  static getPermissions(subscriptionTier: SubscriptionTier): PlanPermissions {
    return PLAN_PERMISSIONS[subscriptionTier];
  }

  /**
   * Verifica si un usuario puede crear un nuevo memorial
   */
  static canCreateMemorial(
    subscriptionTier: SubscriptionTier,
    currentMemorialCount: number
  ): boolean {
    const permissions = this.getPermissions(subscriptionTier);
    if (permissions.maxMemorials === -1) return true; // ilimitado
    return currentMemorialCount < permissions.maxMemorials;
  }

  /**
   * Verifica si un usuario puede agregar una foto a un memorial
   */
  static canAddPhoto(
    subscriptionTier: SubscriptionTier,
    currentPhotoCount: number
  ): boolean {
    const permissions = this.getPermissions(subscriptionTier);
    if (permissions.maxPhotosPerMemorial === -1) return true; // ilimitado
    return currentPhotoCount < permissions.maxPhotosPerMemorial;
  }

  /**
   * Verifica si un usuario puede crear un tributo (general)
   */
  static canCreateTribute(subscriptionTier: SubscriptionTier): boolean {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.maxTributes !== 0;
  }

  /**
   * Verifica si el dueño del memorial puede recibir más tributos
   */
  static canReceiveMoreTributes(
    subscriptionTier: SubscriptionTier,
    currentTributeCount: number
  ): boolean {
    const permissions = this.getPermissions(subscriptionTier);
    if (permissions.maxTributes === -1) return true; // ilimitado
    return currentTributeCount < permissions.maxTributes;
  }

  /**
   * Obtiene el límite máximo de tributos para un plan
   */
  static getMaxTributes(subscriptionTier: SubscriptionTier): number {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.maxTributes;
  }

  /**
   * Verifica si un tipo de tributo es permitido para un plan
   */
  static isTributeTypeAllowed(
    subscriptionTier: SubscriptionTier,
    tributeType: string
  ): boolean {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.allowedTributeTypes.includes(tributeType);
  }

  /**
   * Obtiene los tipos de tributo permitidos para un plan
   */
  static getAllowedTributeTypes(subscriptionTier: SubscriptionTier): string[] {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.allowedTributeTypes;
  }

  /**
   * Verifica si los memoriales del usuario aparecen en el grid de /map
   */
  static canAppearInGrid(subscriptionTier: SubscriptionTier): boolean {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.canCreatePublicProfiles;
  }

  /**
   * Verifica si el usuario puede destacar memoriales
   */
  static canHighlightProfiles(subscriptionTier: SubscriptionTier): boolean {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.canHighlightProfiles;
  }

  /**
   * Obtiene la cantidad de destacados semanales permitidos
   */
  static getWeeklyHighlightLimit(subscriptionTier: SubscriptionTier): number {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.weeklyHighlights;
  }

  /**
   * Obtiene el tamaño del marcador en el mapa
   */
  static getMapMarkerSize(subscriptionTier: SubscriptionTier): string {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.mapMarkerSize;
  }

  /**
   * Obtiene el tipo de destaque del marcador en el mapa
   */
  static getMapMarkerHighlight(subscriptionTier: SubscriptionTier): string {
    const permissions = this.getPermissions(subscriptionTier);
    return permissions.mapMarkerHighlight;
  }
}
