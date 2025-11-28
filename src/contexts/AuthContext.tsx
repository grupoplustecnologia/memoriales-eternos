'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Session } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, deviceName?: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  logoutAllDevices: () => Promise<void>;
  updateProfile: (updates: Partial<{ name: string; profilePicture: string }>) => Promise<{ success: boolean; message: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedSession = localStorage.getItem('auth_session');

    if (storedToken && storedSession) {
      try {
        const sessionData = JSON.parse(storedSession);
        setSession(sessionData);
        // In real app, verify token on server
        setUser(JSON.parse(localStorage.getItem('auth_user') || '{}'));
      } catch (err) {
        console.error('Error loading session:', err);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_session');
        localStorage.removeItem('auth_user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, deviceName: string = 'Web') => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, deviceName })
      });

      const data = await response.json();

      if (data.success && data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
        localStorage.setItem('auth_token', data.session.token);
        localStorage.setItem('auth_session', JSON.stringify(data.session));
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        return { success: true, message: data.message };
      }

      return { success: false, message: data.message || 'Error al iniciar sesión' };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'Error de conexión' };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (data.success && data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
        localStorage.setItem('auth_token', data.session.token);
        localStorage.setItem('auth_session', JSON.stringify(data.session));
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        return { success: true, message: data.message };
      }

      return { success: false, message: data.message || 'Error al registrarse' };
    } catch (err) {
      console.error('Register error:', err);
      return { success: false, message: 'Error de conexión' };
    }
  };

  const logout = async () => {
    try {
      if (session) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: session.token })
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setSession(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_session');
      localStorage.removeItem('auth_user');
    }
  };

  const logoutAllDevices = async () => {
    try {
      if (user) {
        await fetch('/api/auth/logout-all-devices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        });
      }
    } catch (err) {
      console.error('Logout all devices error:', err);
    } finally {
      await logout();
    }
  };

  const updateProfile = async (updates: Partial<{ name: string; profilePicture: string }>) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, updates })
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        return { success: true, message: data.message };
      }

      return { success: false, message: data.message || 'Error al actualizar perfil' };
    } catch (err) {
      console.error('Update profile error:', err);
      return { success: false, message: 'Error de conexión' };
    }
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Merge with existing user to keep other properties
        const updatedUser = {
          ...user,
          ...data.data,
          createdAt: user?.createdAt,
          completedMissions: user?.completedMissions || []
        };
        setUser(updatedUser);
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
        console.log('[AuthContext] User refreshed:', updatedUser.name);
      }
    } catch (err) {
      console.error('Refresh user error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        logoutAllDevices,
        updateProfile,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
