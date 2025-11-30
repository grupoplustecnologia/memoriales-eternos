'use client';

import { useState, useEffect } from 'react';
import { CanonicalHead } from '@/components/CanonicalHead';

export default function TrendingDebug() {
  const [memorials, setMemorials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/trending?type=popular&limit=12')
      .then(r => r.json())
      .then(data => {
        console.log('API Response:', data);
        if (data.success) {
          setMemorials(data.data || []);
        } else {
          setError('API returned success: false');
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <CanonicalHead url="https://cementerio-virtual-mascotas.com/trending-debug" />

      <h1 className="text-2xl font-bold mb-4">Debug Trending</h1>
      
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      
      <p className="mb-4">
        <strong>Total memorials:</strong> {memorials.length}
      </p>

      <div className="grid grid-cols-4 gap-4">
        {memorials.map((m) => (
          <div key={m.id} className="border p-4 bg-gray-50">
            <img
              src={m.photoUrl}
              alt={m.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-bold">{m.name}</h3>
            <p className="text-sm text-gray-600">{m.user.name}</p>
            <p className="text-xs text-gray-500">Vistas: {m.viewCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
