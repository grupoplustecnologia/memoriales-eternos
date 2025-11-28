'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CreateFormContent from './CreateFormContent';

export default function CreatePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-sky-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-nature-800 mb-4">
            ✨ Crear / Editar Memorial
          </h1>
          <p className="text-lg text-nature-600">
            Honra la memoria de tu compañero querido
          </p>
        </div>

        {/* Authentication Check */}
        {!isAuthenticated ? (
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center mb-4">Debes iniciar sesión para crear o editar un memorial</p>
              <Link href="/auth/login">
                <Button className="w-full bg-nature-600 hover:bg-nature-700">
                  Ir a Iniciar Sesión
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <CreateFormContent />
        )}
      </div>
    </div>
  );
}
