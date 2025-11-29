// Helper para obtener el token de autenticación del cliente
// NOTA: Usa 'auth_token' para coincidir con AuthContext

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = localStorage.getItem('auth_token');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('auth_token', token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Error clearing auth token:', error);
  }
}
