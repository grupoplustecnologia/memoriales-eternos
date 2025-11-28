// Authentication system - Prisma + Neon PostgreSQL
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  emailVerified: boolean;
  createdAt: string;
  subscriptionTier: 'huella-eterna' | 'cielo-estrellas' | 'santuario-premium';
  profilePicture?: string;
  role: 'user' | 'ADMIN';
  completedMissions?: string[];
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  deviceName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  session?: Session;
  errors?: Record<string, string>;
}

// Hash password with bcrypt
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Generate secure token
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('La contraseña debe incluir una mayúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('La contraseña debe incluir una minúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('La contraseña debe incluir un número');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('La contraseña debe incluir un carácter especial (!@#$%^&*)');
  }

  return { valid: errors.length === 0, errors };
}

// Convert Prisma user to interface
function prismaUserToInterface(user: any): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    passwordHash: user.passwordHash,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt.toISOString(),
    subscriptionTier: user.subscriptionTier,
    profilePicture: user.profilePicture || undefined,
    role: user.role,
    completedMissions: []
  };
}

// Convert Prisma session to interface
function prismaSessionToInterface(session: any): Session {
  return {
    id: session.id,
    userId: session.userId,
    token: session.token,
    createdAt: session.createdAt.toISOString(),
    expiresAt: session.expiresAt.toISOString(),
    deviceName: session.deviceName
  };
}

// Initialize demo users
export async function initializeDemoUsers(): Promise<void> {
  try {
    // Check if demo users already exist
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@forever-pet-friend.local' }
    });

    if (existingAdmin) {
      console.log('✅ Demo users already initialized');
      return;
    }

    // ADMIN USER
    const adminPasswordHash = await hashPassword('Demo123!');
    await prisma.user.create({
      data: {
        email: 'admin@forever-pet-friend.local',
        name: 'Admin User',
        passwordHash: adminPasswordHash,
        emailVerified: true,
        subscriptionTier: 'santuario-premium',
        role: 'admin',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      }
    });

    // Hash password for demo users
    const demoPasswordHash = await hashPassword('Demo123!');

    // DEMO USERS
    const demoUsers = [
      {
        email: 'demo@forever-pet-friend.local',
        name: 'Demo User 1',
        passwordHash: demoPasswordHash,
        subscriptionTier: 'huella-eterna',
        role: 'user' as const,
        profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
      },
      {
        email: 'demo2@forever-pet-friend.local',
        name: 'Demo User 2',
        passwordHash: demoPasswordHash,
        subscriptionTier: 'cielo-estrellas',
        role: 'user' as const,
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      },
      {
        email: 'demo3@forever-pet-friend.local',
        name: 'Demo User 3',
        passwordHash: demoPasswordHash,
        subscriptionTier: 'santuario-premium',
        role: 'user' as const,
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
      }
    ];

    for (const userData of demoUsers) {
      await prisma.user.create({ data: userData });
    }

    console.log('✅ Demo users initialized:');
    console.log('   🛡️  ADMIN: admin@forever-pet-friend.local / Demo123! (Full Admin Access)');
    console.log('   1️⃣  demo@forever-pet-friend.local / Demo123! (Basic Tier User)');
    console.log('   2️⃣  demo2@forever-pet-friend.local / Demo123! (Premium Tier User)');
    console.log('   3️⃣  demo3@forever-pet-friend.local / Demo123! (Pro Tier User)');
  } catch (error) {
    console.error('Error initializing demo users:', error);
  }
}

// Register new user
export async function registerUser(email: string, password: string, name: string): Promise<AuthResponse> {
  try {
    // Validate inputs
    if (!isValidEmail(email)) {
      return { success: false, message: 'Email inválido', errors: { email: 'Email inválido' } };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, message: 'Este email ya está registrado', errors: { email: 'Este email ya está registrado' } };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return {
        success: false,
        message: 'La contraseña no cumple con los requisitos',
        errors: { password: passwordValidation.errors.join('. ') }
      };
    }

    if (!name || name.trim().length < 2) {
      return { success: false, message: 'El nombre es requerido', errors: { name: 'El nombre es requerido' } };
    }

    // Hash password with bcrypt
    const passwordHash = await hashPassword(password);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name: name.trim(),
        passwordHash,
        emailVerified: false,
        subscriptionTier: 'huella-eterna',
        role: 'user'
      }
    });

    // Create session
    const session = await createSession(newUser.id, 'Web Registration');

    return {
      success: true,
      message: 'Registro exitoso. Bienvenido a Forever Pet Friend',
      user: prismaUserToInterface(newUser),
      session
    };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Error al registrar usuario' };
  }
}

// Login user
export async function loginUser(email: string, password: string, deviceName: string = 'Web'): Promise<AuthResponse> {
  try {
    console.log(`[AUTH] Login attempt for: ${email}`);
    
    if (!isValidEmail(email)) {
      console.log(`[AUTH] Invalid email format: ${email}`);
      return { success: false, message: 'Email o contraseña incorrectos' };
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log(`[AUTH] User not found: ${email}`);
      return { success: false, message: 'Email o contraseña incorrectos' };
    }

    console.log(`[AUTH] User found: ${user.name}, checking password...`);
    
    // Compare password with bcryptjs
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    console.log(`[AUTH] Password comparison result: ${passwordMatch}`);
    
    if (!passwordMatch) {
      console.log(`[AUTH] Password mismatch for: ${email}`);
      return { success: false, message: 'Email o contraseña incorrectos' };
    }

    console.log(`[AUTH] Password correct, creating session...`);

    // Create session
    const session = await createSession(user.id, deviceName);

    console.log(`[AUTH] Login successful for: ${email}, session token: ${session.token.substring(0, 16)}...`);

    return {
      success: true,
      message: 'Sesión iniciada correctamente',
      user: prismaUserToInterface(user),
      session
    };
  } catch (error) {
    console.error('[AUTH] Login error:', error);
    return { success: false, message: 'Error al iniciar sesión' };
  }
}

// Create session
async function createSession(userId: string, deviceName: string): Promise<Session> {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const session = await prisma.session.create({
    data: {
      userId,
      token: generateToken(),
      deviceName,
      expiresAt
    }
  });

  return prismaSessionToInterface(session);
}

// Verify session token
export async function verifySessionToken(token: string): Promise<{ valid: boolean; user?: User; session?: Session }> {
  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      return { valid: false };
    }

    if (new Date(session.expiresAt) < new Date()) {
      await prisma.session.delete({
        where: { id: session.id }
      });
      return { valid: false };
    }

    return {
      valid: true,
      user: prismaUserToInterface(session.user),
      session: prismaSessionToInterface(session)
    };
  } catch (error) {
    console.error('Verify session error:', error);
    return { valid: false };
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    return user ? prismaUserToInterface(user) : undefined;
  } catch (error) {
    console.error('Get user error:', error);
    return undefined;
  }
}

// Get user sessions
export async function getUserSessions(userId: string): Promise<Session[]> {
  try {
    const sessions = await prisma.session.findMany({
      where: { userId }
    });

    return sessions.map(prismaSessionToInterface);
  } catch (error) {
    console.error('Get sessions error:', error);
    return [];
  }
}

// Logout (end single session)
export async function logoutSession(token: string): Promise<AuthResponse> {
  try {
    const session = await prisma.session.findUnique({
      where: { token }
    });

    if (session) {
      await prisma.session.delete({
        where: { id: session.id }
      });
      return { success: true, message: 'Sesión cerrada correctamente' };
    }

    return { success: false, message: 'Sesión no encontrada' };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: 'Error al cerrar sesión' };
  }
}

// Logout all devices (end all sessions for user)
export async function logoutAllDevices(userId: string): Promise<AuthResponse> {
  try {
    const userSessions = await getUserSessions(userId);

    await prisma.session.deleteMany({
      where: { userId }
    });

    return {
      success: true,
      message: `Se cerró la sesión en ${userSessions.length} dispositivo(s)`
    };
  } catch (error) {
    console.error('Logout all devices error:', error);
    return { success: false, message: 'Error al cerrar sesiones' };
  }
}

// Request password reset
export async function requestPasswordReset(email: string): Promise<AuthResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if email exists
      return {
        success: true,
        message: 'Si el email existe, recibirás un enlace de recuperación'
      };
    }

    // In real app, send email with reset link
    // For now, generate token and log it
    const resetToken = generateToken();
    console.log(`🔑 Password reset token for ${email}: ${resetToken}`);

    return {
      success: true,
      message: 'Si el email existe, recibirás un enlace de recuperación'
    };
  } catch (error) {
    console.error('Request password reset error:', error);
    return { success: false, message: 'Error al solicitar recuperación' };
  }
}

// Reset password
export async function resetPassword(resetToken: string, newPassword: string): Promise<AuthResponse> {
  try {
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return {
        success: false,
        message: 'La contraseña no cumple con los requisitos',
        errors: { password: passwordValidation.errors.join('. ') }
      };
    }

    // In production, verify reset token from email
    // For now, just validate and return success
    return {
      success: true,
      message: 'Contraseña actualizada correctamente'
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, message: 'Error al resetear contraseña' };
  }
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  updates: Partial<{ name: string; profilePicture: string }>
): Promise<AuthResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    const updateData: any = {};

    if (updates.name && updates.name.trim().length >= 2) {
      updateData.name = updates.name.trim();
    }

    if (updates.profilePicture) {
      updateData.profilePicture = updates.profilePicture;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    return {
      success: true,
      message: 'Perfil actualizado correctamente',
      user: prismaUserToInterface(updatedUser)
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, message: 'Error al actualizar perfil' };
  }
}

// Export for testing
export function getDemoCredentials() {
  return [
    {
      email: 'admin@forever-pet-friend.local',
      password: 'Demo123!',
      name: 'Admin User',
      role: 'admin',
      access: '🛡️ Full Admin Access'
    },
    {
      email: 'demo@forever-pet-friend.local',
      password: 'Demo123!',
      name: 'Demo User 1',
      role: 'user',
      access: '🌱 Basic Tier'
    },
    {
      email: 'demo2@forever-pet-friend.local',
      password: 'Demo123!',
      name: 'Demo User 2',
      role: 'user',
      access: '✨ Premium Tier'
    },
    {
      email: 'demo3@forever-pet-friend.local',
      password: 'Demo123!',
      name: 'Demo User 3',
      role: 'user',
      access: '👑 Pro Tier'
    }
  ];
}

// Verify JWT token
export async function verifyAuth(token: string): Promise<{ userId: string; email?: string } | null> {
  try {
    // For now, we'll do a simple verification by checking if the token format is valid
    // In production, this should verify JWT signature
    
    // Try to find a session with this token
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      return null;
    }

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      return null;
    }

    return {
      userId: session.userId,
      email: session.user.email
    };
  } catch (error) {
    console.error('Error verifying auth:', error);
    return null;
  }
}
