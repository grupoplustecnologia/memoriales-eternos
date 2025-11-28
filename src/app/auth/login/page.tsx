'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/components/LoginForm';

function LoginContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-nature-800 mb-2">🐾 Forever Pet Friend</h1>
          <p className="text-muted-foreground">Inicia sesión para honrar a tus mascotas queridas</p>
        </div>

        <LoginForm />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Por seguridad, los datos se almacenan localmente en tu navegador</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-nature-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-nature-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
