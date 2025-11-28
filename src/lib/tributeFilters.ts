import type { SubscriptionTier } from '@/types/index';
import { TRIBUTE_CONFIGS } from '@/types/index';
import { PlanPermissionsService } from './planPermissions';

/**
 * Filtra y retorna los tributos disponibles para un plan específico
 */
export function getTributesForPlan(subscriptionTier: SubscriptionTier) {
  const allowedTypes = PlanPermissionsService.getAllowedTributeTypes(subscriptionTier);
  return TRIBUTE_CONFIGS.filter(tribute => allowedTypes.includes(tribute.type));
}

/**
 * Obtiene el emoji y nombre para un tipo de tributo específico
 */
export function getTributeInfo(tributeType: string) {
  const tribute = TRIBUTE_CONFIGS.find(t => t.type === tributeType);
  return tribute || null;
}

/**
 * Obtiene todos los tributos con sus iconos
 */
export function getAllTributes() {
  return TRIBUTE_CONFIGS;
}

/**
 * Verifica si un tributo específico está permitido para un plan
 */
export function isTributeAllowedForPlan(
  tributeType: string,
  subscriptionTier: SubscriptionTier
): boolean {
  return PlanPermissionsService.isTributeTypeAllowed(subscriptionTier, tributeType);
}
