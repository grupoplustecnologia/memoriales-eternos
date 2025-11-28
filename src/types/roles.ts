// Tipos de roles disponibles
export type UserRole = 'basic' | 'premium' | 'pro' | 'admin' | 'moderator';

// Tipos de permisos
export type Permission =
  | 'create_memorial'
  | 'edit_own_memorial'
  | 'edit_any_memorial'
  | 'delete_own_memorial'
  | 'delete_any_memorial'
  | 'manage_tributes'
  | 'invite_collaborators'
  | 'manage_roles'
  | 'moderate_content'
  | 'access_analytics'
  | 'manage_users'
  | 'system_settings';

// Definición de roles con sus permisos
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // Usuario Básico (Gratuito): Acceso limitado
  basic: [
    'create_memorial', // Hasta 3 memoriales
    'edit_own_memorial',
    'delete_own_memorial',
  ],

  // Usuario Premium: Acceso expandido
  premium: [
    'create_memorial', // Memoriales ilimitados
    'edit_own_memorial',
    'delete_own_memorial',
    'manage_tributes',
    'invite_collaborators', // Invitar colaboradores
    'access_analytics', // Ver estadísticas básicas
  ],

  // Usuario Pro: Acceso completo
  pro: [
    'create_memorial',
    'edit_own_memorial',
    'edit_any_memorial', // Editar memoriales de otros con permiso
    'delete_own_memorial',
    'delete_any_memorial',
    'manage_tributes',
    'invite_collaborators',
    'access_analytics',
  ],

  // Administrador: Control total del sistema
  admin: [
    'create_memorial',
    'edit_own_memorial',
    'edit_any_memorial',
    'delete_own_memorial',
    'delete_any_memorial',
    'manage_tributes',
    'invite_collaborators',
    'manage_roles',
    'moderate_content',
    'access_analytics',
    'manage_users',
    'system_settings',
  ],

  // Moderador: Gestión de contenido
  moderator: [
    'moderate_content',
    'manage_tributes',
    'access_analytics',
  ],
};

// Límites por tipo de usuario
export const ROLE_LIMITS = {
  basic: {
    memorials: 3,
    collaborators_per_memorial: 1,
    storage_mb: 100,
  },
  premium: {
    memorials: 999, // Ilimitados
    collaborators_per_memorial: 5,
    storage_mb: 500,
  },
  pro: {
    memorials: 999,
    collaborators_per_memorial: 10,
    storage_mb: 2000,
  },
  admin: {
    memorials: 999,
    collaborators_per_memorial: 999,
    storage_mb: 999999,
  },
  moderator: {
    memorials: 0, // No puede crear
    collaborators_per_memorial: 0,
    storage_mb: 0,
  },
};

// Tipos de colaboración en memoriales
export type CollaboratorRole = 'viewer' | 'editor' | 'co-admin';

export interface MemorialCollaborator {
  userId: string;
  email: string;
  name: string;
  role: CollaboratorRole;
  addedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

// Interfaz extendida de usuario con roles
export interface UserWithRoles {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscriptionTier: 'free' | 'premium-monthly' | 'premium-yearly' | 'family';
  createdAt: string;
  updatedAt: string;
}
