import { UserRole, Permission, ROLE_PERMISSIONS, ROLE_LIMITS } from '@/types/roles';

/**
 * Servicio de Autorización
 * Valida permisos y control de acceso basado en roles
 */

export class AuthorizationService {
  /**
   * Verifica si un usuario tiene un permiso específico
   */
  static hasPermission(userRole: UserRole, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[userRole];
    return permissions.includes(permission);
  }

  /**
   * Verifica si un usuario tiene TODOS los permisos especificados
   */
  static hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.every((perm) => this.hasPermission(userRole, perm));
  }

  /**
   * Verifica si un usuario tiene AL MENOS UNO de los permisos especificados
   */
  static hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.some((perm) => this.hasPermission(userRole, perm));
  }

  /**
   * Obtiene el límite de recursos para un rol
   */
  static getLimit(userRole: UserRole, limitType: keyof typeof ROLE_LIMITS.basic) {
    return ROLE_LIMITS[userRole][limitType];
  }

  /**
   * Verifica si un usuario puede crear un memorial
   */
  static canCreateMemorial(userRole: UserRole, currentMemorialCount: number): boolean {
    if (!this.hasPermission(userRole, 'create_memorial')) {
      return false;
    }

    const limit = this.getLimit(userRole, 'memorials');
    return currentMemorialCount < limit;
  }

  /**
   * Verifica si un usuario puede editar un memorial
   */
  static canEditMemorial(
    userRole: UserRole,
    isOwner: boolean,
    isCollaborator: boolean
  ): boolean {
    if (isOwner && this.hasPermission(userRole, 'edit_own_memorial')) {
      return true;
    }

    if (isCollaborator && this.hasPermission(userRole, 'invite_collaborators')) {
      return true;
    }

    return this.hasPermission(userRole, 'edit_any_memorial');
  }

  /**
   * Verifica si un usuario puede invitar colaboradores
   */
  static canInviteCollaborators(userRole: UserRole, currentCollaborators: number): boolean {
    if (!this.hasPermission(userRole, 'invite_collaborators')) {
      return false;
    }

    const limit = this.getLimit(userRole, 'collaborators_per_memorial');
    return currentCollaborators < limit;
  }

  /**
   * Verifica si un usuario puede designar co-administrador
   */
  static canAssignCoAdmin(userRole: UserRole, isMemorialOwner: boolean): boolean {
    return isMemorialOwner && this.hasPermission(userRole, 'invite_collaborators');
  }

  /**
   * Verifica si un usuario puede moderar contenido
   */
  static canModerateContent(userRole: UserRole): boolean {
    return this.hasPermission(userRole, 'moderate_content');
  }

  /**
   * Verifica si un usuario puede gestionar usuarios
   */
  static canManageUsers(userRole: UserRole): boolean {
    return this.hasPermission(userRole, 'manage_users');
  }

  /**
   * Obtiene todos los permisos de un rol
   */
  static getPermissions(userRole: UserRole): Permission[] {
    return ROLE_PERMISSIONS[userRole];
  }

  /**
   * Verifica si un rol es administrativo
   */
  static isAdmin(userRole: UserRole): boolean {
    return userRole === 'admin';
  }

  /**
   * Verifica si un rol es premium o superior
   */
  static isPremium(userRole: UserRole): boolean {
    return ['premium', 'pro', 'admin'].includes(userRole);
  }
}
