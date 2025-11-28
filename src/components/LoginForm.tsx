'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Verificar si hay parámetros de redirección
      const redirectUrl = searchParams.get('redirect');
      const plan = searchParams.get('plan');
      
      if (redirectUrl && plan) {
        // Redirigir a pricing con el plan seleccionado
        router.push(`${redirectUrl}?plan=${plan}`);
      } else if (redirectUrl) {
        // Redirigir a la URL proporcionada
        router.push(redirectUrl);
      } else {
        // Redirección por defecto
        router.push('/map');
      }
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-nature-200">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a la plataforma
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="border-nature-200"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-nature-600 hover:text-nature-800"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña segura"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="border-nature-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-nature-600 hover:bg-nature-700 text-white"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 pt-6 border-t border-nature-100 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            ¿No tienes cuenta?
          </p>
          <Link href="/auth/register">
            <Button
              variant="outline"
              className="w-full border-nature-300 text-nature-600 hover:bg-nature-50"
            >
              Crear una nueva cuenta
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
