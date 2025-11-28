'use client';

import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthorizationService } from '@/lib/authorization';
import type { Permission, UserRole } from '@/types/roles';

/**
 * Hook para verificar permisos del usuario actual
 * Uso: const { hasPermission, canEdit } = usePermissions();
 */
export function usePermissions() {
  const { user } = useAuth();

  // Obtener rol del usuario (mapear subscriptionTier a role)
  const getUserRole = (): UserRole => {
    if (!user) return 'basic';

    // Mapeo de subscription tier a role
    const roleMap = {
      'premium-yearly': 'premium' as UserRole,
      'premium-monthly': 'premium' as UserRole,
      'family': 'pro' as UserRole,
      'free': 'basic' as UserRole,
    };

    return roleMap[user.subscriptionTier as keyof typeof roleMap] || 'basic';
  };

  const userRole = getUserRole();

  // Verificar si tiene un permiso específico
  const hasPermission = useCallback(
    (permission: Permission) => {
      if (!user) return false;
      return AuthorizationService.hasPermission(userRole, permission);
    },
    [user, userRole]
  );

  // Verificar si tiene TODOS los permisos
  const hasAllPermissions = useCallback(
    (permissions: Permission[]) => {
      if (!user) return false;
      return AuthorizationService.hasAllPermissions(userRole, permissions);
    },
    [user, userRole]
  );

  // Verificar si tiene AL MENOS UNO
  const hasAnyPermission = useCallback(
    (permissions: Permission[]) => {
      if (!user) return false;
      return AuthorizationService.hasAnyPermission(userRole, permissions);
    },
    [user, userRole]
  );

  // Verificar si puede crear memorial
  const canCreateMemorial = useCallback(
    (currentCount: number = 0) => {
      if (!user) return false;
      return AuthorizationService.canCreateMemorial(userRole, currentCount);
    },
    [user, userRole]
  );

  // Verificar si puede editar memorial
  const canEditMemorial = useCallback(
    (isOwner: boolean = false, isCollaborator: boolean = false) => {
      if (!user) return false;
      return AuthorizationService.canEditMemorial(userRole, isOwner, isCollaborator);
    },
    [user, userRole]
  );

  // Verificar si puede invitar colaboradores
  const canInviteCollaborators = useCallback(
    (currentCollaborators: number = 0) => {
      if (!user) return false;
      return AuthorizationService.canInviteCollaborators(userRole, currentCollaborators);
    },
    [user, userRole]
  );

  // Verificar si puede asignar co-admin
  const canAssignCoAdmin = useCallback(
    (isMemorialOwner: boolean = false) => {
      if (!user) return false;
      return AuthorizationService.canAssignCoAdmin(userRole, isMemorialOwner);
    },
    [user, userRole]
  );

  // Verificar si puede moderar
  const canModerate = useCallback(() => {
    if (!user) return false;
    return AuthorizationService.canModerateContent(userRole);
  }, [user, userRole]);

  // Verificar si es admin
  const isAdmin = useCallback(() => {
    if (!user) return false;
    return AuthorizationService.isAdmin(userRole);
  }, [user, userRole]);

  // Verificar si es premium
  const isPremium = useCallback(() => {
    if (!user) return false;
    return AuthorizationService.isPremium(userRole);
  }, [user, userRole]);

  // Obtener límites
  const getLimit = useCallback(
    (limitType: 'memorials' | 'collaborators_per_memorial' | 'storage_mb') => {
      return AuthorizationService.getLimit(userRole, limitType);
    },
    [userRole]
  );

  return {
    user,
    userRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    canCreateMemorial,
    canEditMemorial,
    canInviteCollaborators,
    canAssignCoAdmin,
    canModerate,
    isAdmin,
    isPremium,
    getLimit,
  };
}
