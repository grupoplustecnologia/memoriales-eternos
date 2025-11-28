'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { AnimalProfile } from '@/types/index';

interface VisitStats {
  totalVisits: number;
  visitsThisMonth: number;
  tributes: {
    type: string;
    count: number;
    emoji: string;
  }[];
  topDays: Array<{
    day: string;
    visits: number;
  }>;
  shares: number;
  uniqueVisitors: number;
}

interface Props {
  profile: AnimalProfile;
  isPremium?: boolean;
}

export function VisitsDashboard({ profile, isPremium = false }: Props) {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de estadísticas
    setTimeout(() => {
      setStats({
        totalVisits: Math.floor(Math.random() * 500) + 50,
        visitsThisMonth: Math.floor(Math.random() * 150) + 20,
        tributes: [
          { type: 'vela', count: Math.floor(Math.random() * 30) + 5, emoji: '🕯️' },
          { type: 'flor', count: Math.floor(Math.random() * 25) + 3, emoji: '🌹' },
          { type: 'corazon', count: Math.floor(Math.random() * 40) + 10, emoji: '❤️' },
        ],
        topDays: [
          { day: 'Lun', visits: Math.floor(Math.random() * 50) + 10 },
          { day: 'Mar', visits: Math.floor(Math.random() * 50) + 10 },
          { day: 'Mié', visits: Math.floor(Math.random() * 50) + 10 },
          { day: 'Jue', visits: Math.floor(Math.random() * 50) + 10 },
          { day: 'Vie', visits: Math.floor(Math.random() * 50) + 10 },
          { day: 'Sáb', visits: Math.floor(Math.random() * 50) + 10 },
          { day: 'Dom', visits: Math.floor(Math.random() * 50) + 10 },
        ],
        shares: Math.floor(Math.random() * 40) + 5,
        uniqueVisitors: Math.floor(Math.random() * 200) + 30,
      });
      setLoading(false);
    }, 800);
  }, [profile.id]);

  if (!isPremium) {
    return (
      <Card className="p-8 text-center border-2 border-dashed border-golden-300 bg-golden-50">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Estadísticas Disponibles en Planes de Pago
        </h3>
        <p className="text-gray-600 mb-4">
          Actualiza a Cielo de Estrellas o Santuario Premium para ver:
        </p>
        <ul className="text-left max-w-xs mx-auto space-y-2 text-gray-700 mb-6">
          <li>✓ Total de visitas a tu memorial</li>
          <li>✓ Visitas del mes</li>
          <li>✓ Tributos recibidos por tipo</li>
          <li>✓ Gráficas de tendencias</li>
          <li>✓ Visitantes únicos</li>
        </ul>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin text-3xl mb-2">⏳</div>
            <p className="text-gray-600">Cargando estadísticas...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!stats) return null;

  const totalTributes = stats.tributes.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📊 Estadísticas de tu Memorial
        </h2>
        <p className="text-gray-600">
          Mira cómo tu comunidad honra la memoria de {profile.name}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
          <div className="text-3xl mb-2">👁️</div>
          <div className="text-3xl font-bold text-sky-600">{stats.totalVisits}</div>
          <p className="text-sm text-gray-600 mt-1">Visitas totales</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-golden-50 to-yellow-50 border-golden-200">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-3xl font-bold text-golden-600">{stats.visitsThisMonth}</div>
          <p className="text-sm text-gray-600 mt-1">Este mes</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
          <div className="text-3xl mb-2">💐</div>
          <div className="text-3xl font-bold text-rose-600">{totalTributes}</div>
          <p className="text-sm text-gray-600 mt-1">Tributos recibidos</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <div className="text-3xl mb-2">📢</div>
          <div className="text-3xl font-bold text-emerald-600">{stats.shares}</div>
          <p className="text-sm text-gray-600 mt-1">Comparticiones</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Visitas por día */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Visitas esta semana</h3>
          <div className="flex items-end justify-between h-64 gap-2">
            {stats.topDays.map((day, i) => {
              const maxVisits = Math.max(...stats.topDays.map(d => d.visits));
              const height = (day.visits / maxVisits) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-sky-500 to-sky-400 rounded-t-lg hover:shadow-lg transition-shadow"
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs font-semibold text-gray-600">{day.day}</span>
                  <span className="text-xs text-gray-500">{day.visits}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Tributos por tipo */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tributos recibidos</h3>
          <div className="flex items-center justify-center gap-8">
            {/* Donut Chart */}
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {stats.tributes.map((tribute, i) => {
                  const percentage = (tribute.count / totalTributes) * 100;
                  const circumference = 2 * Math.PI * 30;
                  const offset = circumference - (percentage / 100) * circumference;
                  const colors = ['#f97316', '#ec4899', '#8b5cf6'];
                  
                  return (
                    <circle
                      key={i}
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke={colors[i]}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      style={{
                        transform: `rotate(${(stats.tributes.slice(0, i).reduce((sum, t) => sum + (t.count / totalTributes) * 100, 0) / 100) * 360}deg)`,
                        transformOrigin: '50px 50px',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900">{totalTributes}</div>
                  <div className="text-xs text-gray-600">total</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {stats.tributes.map((tribute, i) => {
                const colors = ['#f97316', '#ec4899', '#8b5cf6'];
                const percentage = ((tribute.count / totalTributes) * 100).toFixed(0);
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors[i] }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {tribute.emoji} {tribute.count}
                      </p>
                      <p className="text-xs text-gray-600">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Tributes Detail */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Desglose de tributos</h3>
        <div className="space-y-3">
          {stats.tributes.map(tribute => (
            <div key={tribute.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tribute.emoji}</span>
                <span className="font-medium text-gray-900 capitalize">{tribute.type}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-sky-500 h-2 rounded-full"
                    style={{
                      width: `${(tribute.count / Math.max(...stats.tributes.map(t => t.count))) * 100}%`
                    }}
                  />
                </div>
                <span className="font-bold text-gray-900 min-w-12 text-right">{tribute.count}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4">💡 Insights</h3>
        <div className="space-y-2 text-gray-700 text-sm">
          <p>
            ✓ Tu memorial ha recibido <span className="font-semibold">{stats.totalVisits} visitas</span> de <span className="font-semibold">{stats.uniqueVisitors} visitantes únicos</span>
          </p>
          <p>
            ✓ El tributo más frecuente es <span className="font-semibold">{stats.tributes.reduce((a, b) => a.count > b.count ? a : b).emoji}</span>
          </p>
          <p>
            ✓ Otros han compartido tu memorial <span className="font-semibold">{stats.shares} veces</span> en redes sociales
          </p>
        </div>
      </Card>

      {/* Footer Note */}
      <p className="text-xs text-gray-500 text-center">
        Las estadísticas se actualizan cada hora. Última actualización: hace 5 minutos
      </p>
    </div>
  );
}
