'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import MapboxMap from '@/components/MapboxMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { AnimalProfile } from '@/types';
import Link from 'next/link';

export default function MapPage() {
  const [profiles, setProfiles] = useState<AnimalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['todos']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Fetch profiles from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/profiles?public=true');
        const result = await response.json();
        if (result.success && result.data) {
          setProfiles(result.data);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const animalTypes: { value: string; label: string; emoji: string; color: string; gradientFrom: string; gradientTo: string }[] = [
    { value: 'todos', label: 'Todos', emoji: '🌍', color: 'bg-nature-600', gradientFrom: 'from-nature-500', gradientTo: 'to-nature-700' },
    { value: 'perro', label: 'Perros', emoji: '🐕', color: 'bg-nature-600', gradientFrom: 'from-nature-500', gradientTo: 'to-emerald-600' },
    { value: 'gato', label: 'Gatos', emoji: '🐈', color: 'bg-sky-600', gradientFrom: 'from-sky-400', gradientTo: 'to-blue-600' },
    { value: 'ave', label: 'Aves', emoji: '🦜', color: 'bg-amber-500', gradientFrom: 'from-amber-400', gradientTo: 'to-orange-500' },
    { value: 'roedor', label: 'Roedores', emoji: '🐹', color: 'bg-rose-500', gradientFrom: 'from-rose-400', gradientTo: 'to-pink-500' },
    { value: 'reptil', label: 'Reptiles', emoji: '🦎', color: 'bg-lime-600', gradientFrom: 'from-lime-500', gradientTo: 'to-green-600' },
    { value: 'otro', label: 'Otros', emoji: '🐾', color: 'bg-purple-600', gradientFrom: 'from-purple-500', gradientTo: 'to-indigo-600' },
  ];

  const toggleType = (type: string) => {
    if (type === 'todos') {
      setSelectedTypes(['todos']);
    } else {
      setSelectedTypes(prev => {
        const withoutTodos = prev.filter(t => t !== 'todos');
        if (withoutTodos.includes(type)) {
          const newTypes = withoutTodos.filter(t => t !== type);
          return newTypes.length === 0 ? ['todos'] : newTypes;
        } else {
          return [...withoutTodos, type];
        }
      });
    }
  };

  const clearFilters = () => {
    setSelectedTypes(['todos']);
    setSearchQuery('');
  };

  const filteredProfiles = useMemo(() => {
    let filtered = profiles;
    if (!selectedTypes.includes('todos')) {
      filtered = filtered.filter(p => selectedTypes.includes(p.animalType));
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.breed?.toLowerCase().includes(query) ||
        p.story.toLowerCase().includes(query) ||
        p.epitaph.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [profiles, selectedTypes, searchQuery]);

  const counts = {
    todos: profiles.length,
    perro: profiles.filter(p => p.animalType === 'perro').length,
    gato: profiles.filter(p => p.animalType === 'gato').length,
    ave: profiles.filter(p => p.animalType === 'ave').length,
    roedor: profiles.filter(p => p.animalType === 'roedor').length,
    reptil: profiles.filter(p => p.animalType === 'reptil').length,
    otro: profiles.filter(p => p.animalType === 'otro').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 flex flex-col">
      {/* Header - Moderno */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-nature-600/20 via-sky-500/20 to-nature-500/20 backdrop-blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-6 sm:py-8 md:py-12">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-nature-600 to-sky-600 bg-clip-text text-transparent mb-2">
                🗺️ Mapa de Memoriales
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Explora {profiles.length} historias de amor y recuerdos eternos alrededor del mundo
              </p>
            </div>
          </div>

          {/* Modern Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: '🕯️', label: 'Memoriales', value: profiles.length },
              { icon: '🌍', label: 'Cobertura', value: '40+ regiones' },
              { icon: '💝', label: 'Tributos', value: '1.2k+' },
              { icon: '⭐', label: 'Destacados', value: 'Premium' },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative bg-white/40 backdrop-blur-xl border border-white/20 rounded-xl p-3 sm:p-4 hover:bg-white/60 transition-all duration-300 cursor-pointer hover:scale-105 hover:border-white/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-2xl sm:text-3xl mb-1">{stat.icon}</div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Premium - Carousel Section */}
      <div className="relative py-6 sm:py-8 bg-white/30 border-y border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-xl sm:text-2xl">⭐</span>
                Destacados Premium (Últimos 10)
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Los memoriales más recientes</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCarouselIndex(prev => (prev - 1 + Math.min(filteredProfiles.length, 10)) % Math.min(filteredProfiles.length, 10))}
                className="rounded-full hover:bg-nature-50 hover:border-nature-300 transition-all"
              >
                ◀
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCarouselIndex(prev => (prev + 1) % Math.min(filteredProfiles.length, 10))}
                className="rounded-full hover:bg-nature-50 hover:border-nature-300 transition-all"
              >
                ▶
              </Button>
            </div>
          </div>

          {/* Carousel - Horizontal Scrollable */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 pb-2">
              {filteredProfiles.slice(-10).reverse().map((profile, idx) => (
                <Link
                  key={`${profile.id}-${idx}`}
                  href={`/profile/${profile.id}`}
                  className="group flex-shrink-0"
                >
                  <div className="w-32 sm:w-40 md:w-48">
                    <div className="group relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white/40 hover:border-white/80">
                      {/* Image */}
                      <img
                        src={profile.photoUrl}
                        alt={profile.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {/* Star Badge */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full p-1.5 sm:p-2 shadow-lg">
                        <span className="text-xs sm:text-sm">⭐</span>
                      </div>

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 text-white">
                        <h3 className="font-bold text-xs sm:text-sm mb-0.5 line-clamp-1 drop-shadow-lg">
                          {profile.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-white/90 line-clamp-1 drop-shadow">
                          {profile.breed || profile.animalType}
                        </p>
                        <p className="text-[9px] text-white/80 italic line-clamp-1 drop-shadow">
                          "{profile.epitaph}"
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Search & Filter Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-4 sm:py-5">
          {/* Search Input */}
          <div className="relative mb-4 sm:mb-5 group">
            <svg
              className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-nature-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              type="text"
              placeholder="Buscar por nombre, raza, historia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-13 text-sm sm:text-base bg-white/50 border-white/30 hover:border-white/50 focus:border-nature-400 focus:bg-white/80 focus:shadow-lg transition-all rounded-xl sm:rounded-2xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 items-center mb-3">
            {animalTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedTypes.includes(type.value) ? 'default' : 'outline'}
                onClick={() => toggleType(type.value)}
                size="sm"
                className={`transition-all duration-200 text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-medium ${
                  selectedTypes.includes(type.value)
                    ? `${type.color} text-white hover:opacity-90 shadow-md`
                    : 'hover:bg-white/60 hover:border-nature-300'
                }`}
              >
                <span className="mr-1.5">{type.emoji}</span>
                <span>{type.label}</span>
                <Badge variant="secondary" className="ml-2 bg-white/20 text-inherit border-0 text-xs font-semibold px-2">
                  {counts[type.value as keyof typeof counts]}
                </Badge>
              </Button>
            ))}
            {((selectedTypes.length > 0 && !selectedTypes.includes('todos')) || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs sm:text-sm rounded-full px-3 sm:px-4"
              >
                ✕ Limpiar
              </Button>
            )}
          </div>

          {/* Active Filter Chips */}
          {selectedTypes.length > 0 && !selectedTypes.includes('todos') && (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/20">
              <span className="text-xs text-muted-foreground self-center">Filtrados:</span>
              {selectedTypes.map((type) => {
                const typeInfo = animalTypes.find(t => t.value === type);
                return typeInfo ? (
                  <Badge
                    key={type}
                    className="bg-nature-100 text-nature-800 hover:bg-nature-200 cursor-pointer text-xs font-medium px-3 py-1 rounded-full"
                    onClick={() => toggleType(type)}
                  >
                    {typeInfo.emoji} {typeInfo.label}
                    <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Badge>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>

      {/* Map Container - Full Height */}
      <div className="flex-1 relative min-h-[400px] overflow-hidden rounded-t-2xl sm:rounded-t-3xl shadow-2xl">
        <MapboxMap
          center={[0, 20]}
          zoom={2}
          markers={filteredProfiles.map(p => ({
            id: p.id,
            lng: Number(p.longitude),
            lat: Number(p.latitude),
            name: p.name,
            animalType: p.animalType,
            epitaph: p.epitaph,
            photoUrl: p.photoUrl,
            birthDate: p.birthDate,
            deathDate: p.deathDate,
            breed: p.breed,
            userSubscriptionTier: p.userSubscriptionTier,
          }))}
        />
      </div>
    </div>
  );
}
