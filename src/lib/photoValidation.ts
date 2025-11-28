/**
 * Photo validation utility for plan-based restrictions
 */

import { PlanPermissionsService } from '@/lib/planPermissions';

export interface PhotoValidationResult {
  valid: boolean;
  error?: string;
  warning?: string;
}

export interface PhotoUploadConfig {
  userPlan: string;
  currentPhotoCount: number;
  fileSize: number; // in bytes
  fileName: string;
}

const MAX_FILE_SIZE_MB = 5; // 5MB per file
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Valida si se puede agregar una nueva foto según el plan del usuario
 */
export function validatePhotoUpload(config: PhotoUploadConfig): PhotoValidationResult {
  const { userPlan, currentPhotoCount, fileSize, fileName } = config;

  // Check if user can add more photos
  if (!PlanPermissionsService.canAddPhoto(userPlan as any, currentPhotoCount)) {
    const max = PlanPermissionsService.getPermissions(userPlan as any).maxPhotosPerMemorial;
    return {
      valid: false,
      error: `Has alcanzado el límite de ${max} foto${max > 1 ? 's' : ''} para este memorial en tu plan. Actualiza tu plan para agregar más.`
    };
  }

  // Check file size
  if (fileSize > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return {
      valid: false,
      error: `El archivo es demasiado grande. Máximo ${MAX_FILE_SIZE_MB}MB. Tamaño actual: ${(fileSize / 1024 / 1024).toFixed(2)}MB`
    };
  }

  // Check file extension as basic validation
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (extension && !['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)) {
    return {
      valid: false,
      error: 'Formato de archivo no permitido. Usa JPEG, PNG, WebP o GIF.'
    };
  }

  // Check remaining limit
  const maxPhotos = PlanPermissionsService.getPermissions(userPlan as any).maxPhotosPerMemorial;
  const remainingSlots = maxPhotos === -1 ? -1 : maxPhotos - currentPhotoCount;

  if (remainingSlots === 1 && maxPhotos !== -1) {
    return {
      valid: true,
      warning: `Esta será tu última foto disponible en este plan. ${maxPhotos > 1 ? 'Actualiza para agregar más' : ''}`
    };
  }

  return { valid: true };
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Gets the max photos allowed for a plan
 */
export function getMaxPhotosForPlan(userPlan: string): number {
  const permissions = PlanPermissionsService.getPermissions(userPlan as any);
  return permissions.maxPhotosPerMemorial;
}

/**
 * Gets the remaining photo slots for a user
 */
export function getRemainingPhotoSlots(userPlan: string, currentPhotoCount: number): number {
  const max = getMaxPhotosForPlan(userPlan);
  if (max === -1) return -1; // unlimited
  return Math.max(0, max - currentPhotoCount);
}

/**
 * Gets a human-readable photo limit message
 */
export function getPhotoLimitMessage(userPlan: string, currentPhotoCount: number): string {
  const max = getMaxPhotosForPlan(userPlan);
  const remaining = getRemainingPhotoSlots(userPlan, currentPhotoCount);

  if (max === -1) {
    return '📷 Fotos ilimitadas en tu plan';
  }

  if (remaining === 0) {
    return `❌ Límite de ${max} foto${max > 1 ? 's' : ''} alcanzado`;
  }

  if (remaining === 1) {
    return `⚠️ Última foto disponible (${currentPhotoCount}/${max})`;
  }

  return `📷 ${remaining} foto${remaining > 1 ? 's' : ''} disponible${remaining > 1 ? 's' : ''} (${currentPhotoCount}/${max})`;
}
