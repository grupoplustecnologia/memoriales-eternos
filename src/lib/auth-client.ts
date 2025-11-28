// Helper para obtener el token de autenticación del cliente

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = localStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error clearing auth token:', error);
  }
}
