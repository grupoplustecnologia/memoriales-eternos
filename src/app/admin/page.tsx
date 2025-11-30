'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AdminPanel } from '@/components/AdminPanelFull';
import { CanonicalHead } from '@/components/CanonicalHead';

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [isAuthenticated, user?.role, router]);

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <CanonicalHead url="https://cementerio-virtual-mascotas.com/admin" />

      <div className="container mx-auto px-4">
        <AdminPanel />
      </div>
    </div>
  );
}
