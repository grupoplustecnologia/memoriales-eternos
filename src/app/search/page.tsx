'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CanonicalHead } from '@/components/CanonicalHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearch } from '@/hooks/useSearch';
import { formatDate } from '@/lib/utils';
import { Search, MapPin, Calendar } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'all' | 'memorial' | 'animal' | 'location'>('all');
  const { results, loading, search } = useSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query, type);
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-nature-50 py-8">
      <CanonicalHead url="https://cementerio-virtual-mascotas.com/search" />

      <div className="container max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Buscar Memoriales</h1>
          <p className="text-gray-600 text-lg">
            Encuentra memoriales por nombre, tipo de animal o ubicación
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar por nombre, animal o ubicación..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading} className="sm:w-auto">
              Buscar
            </Button>
          </div>

          <div className="flex gap-2 flex-col sm:flex-row">
            <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tipo de búsqueda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los memoriales</SelectItem>
                <SelectItem value="memorial">Por nombre</SelectItem>
                <SelectItem value="animal">Por tipo de animal</SelectItem>
                <SelectItem value="location">Por ubicación</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>

        {/* Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6 space-y-2">
            <h3 className="font-semibold text-blue-900">💡 Consejos de búsqueda:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Busca por <strong>nombre del memorial</strong> (ej: "Max", "Luna")</li>
              <li>• Busca por <strong>tipo de animal</strong> (ej: "perro", "gato", "ave")</li>
              <li>• Busca por <strong>ubicación</strong> (ej: latitud,longitud o ciudad)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && (
          <>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="pt-6 h-48 bg-gray-200 rounded" />
                  </Card>
                ))}
              </div>
            ) : results.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500 py-12">
                  <p className="text-lg">No se encontraron memoriales para "{query}"</p>
                  <p className="text-sm mt-2">Intenta con otros términos de búsqueda</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <p className="text-gray-600">
                  Se encontraron <strong>{results.length}</strong> memorial{results.length !== 1 ? 'es' : ''}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((memorial) => (
                    <Link key={memorial.id} href={`/profile/${memorial.id}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <img
                            src={memorial.photoUrl}
                            alt={memorial.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                          <Badge className="absolute top-2 right-2 bg-blue-500">
                            {memorial.animalType}
                          </Badge>
                        </div>

                        <CardHeader>
                          <CardTitle className="text-lg line-clamp-2">
                            {memorial.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Memorial de {memorial.user.name}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Calendar size={16} />
                            <span>Partió: {formatDate(memorial.deathDate)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {!hasSearched && (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="pt-6 text-center text-gray-500 py-12">
              <p className="text-lg">Comienza tu búsqueda escribiendo arriba</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
