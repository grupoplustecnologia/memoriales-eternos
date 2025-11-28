'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTrending } from '@/hooks/useTrending';
import { formatDate } from '@/lib/utils';

export default function TrendingPage() {
  const [activeType, setActiveType] = useState<'popular' | 'recent' | 'mostCommented' | 'mostLiked'>('popular');
  const { memorials, loading } = useTrending(activeType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-nature-50 py-8">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">Memoriales Destacados</h1>
          <p className="text-gray-600 text-lg">
            Descubre los memoriales más visitados y queridos de nuestra comunidad
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeType}
          onValueChange={(v) => setActiveType(v as typeof activeType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="popular">⭐ Populares</TabsTrigger>
            <TabsTrigger value="recent">📅 Recientes</TabsTrigger>
            <TabsTrigger value="mostLiked">❤️ Más Queridos</TabsTrigger>
            <TabsTrigger value="mostCommented">💬 Comentados</TabsTrigger>
          </TabsList>

          {/* Content */}
          {(['popular', 'recent', 'mostLiked', 'mostCommented'] as const).map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(12)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-300 rounded-t" />
                      <CardContent className="pt-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : memorials.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No hay memoriales en esta categoría aún.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Grid de 4 columnas con máximo 12 tarjetas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {memorials.slice(0, 12).map((memorial) => (
                      <Link key={memorial.id} href={`/profile/${memorial.id}`}>
                        <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                          {/* Imagen */}
                          <div className="relative h-48 overflow-hidden bg-gray-200">
                            <img
                              src={memorial.photoUrl}
                              alt={memorial.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            
                            {/* Badge tipo animal */}
                            <Badge className="absolute top-3 right-3 bg-nature-600 hover:bg-nature-700">
                              {memorial.animalType}
                            </Badge>

                            {/* Contador de visitas */}
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-semibold text-nature-700">
                              👁️ {memorial.viewCount || 0}
                            </div>
                          </div>

                          {/* Contenido */}
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base line-clamp-2 group-hover:text-nature-600 transition-colors">
                              {memorial.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {memorial.user.name}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-3">
                            {/* Fecha de partida */}
                            <p className="text-xs text-gray-600">
                              <span className="text-gray-500">Partió:</span>{' '}
                              <span className="font-semibold">
                                {formatDate(memorial.deathDate)}
                              </span>
                            </p>

                            {/* Stats en 3 columnas */}
                            <div className="grid grid-cols-3 gap-1 pt-2 border-t">
                              {memorial._count && (
                                <>
                                  <div className="text-center">
                                    <div className="font-bold text-sm text-nature-600">
                                      {memorial._count.likes}
                                    </div>
                                    <div className="text-gray-500 text-xs">Me gusta</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold text-sm text-nature-600">
                                      {memorial._count.comments}
                                    </div>
                                    <div className="text-gray-500 text-xs">Comentarios</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold text-sm text-nature-600">
                                      {memorial._count.tributes}
                                    </div>
                                    <div className="text-gray-500 text-xs">Tributos</div>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Botón ver memorial */}
                            <Button className="w-full mt-2 bg-nature-600 hover:bg-nature-700 text-white text-xs h-8">
                              Ver Memorial
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  {/* Mensaje si hay más de 12 */}
                  {memorials.length > 12 && (
                    <div className="text-center pt-4">
                      <p className="text-gray-600 text-sm">
                        Mostrando 12 de {memorials.length} memoriales
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Wall of Love Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-nature-50 to-background mt-20">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-golden-100 text-golden-800">Wall of Love</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
                💚 Amor en Cada Mensaje
              </h2>
              <p className="text-xl text-nature-600 max-w-2xl mx-auto">
                Pequeñas historias que demuestran el impacto de honrar a nuestros compañeros
              </p>
            </div>

            {/* Grid of Mini Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Mini Testimonial 1 */}
              <Card className="bg-gradient-to-br from-nature-50 to-nature-100 border-nature-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1615789591457-74a63395c990?w=50&h=50&fit=crop"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      alt="Simba"
                    />
                    <div>
                      <p className="font-semibold text-nature-800 text-sm">Pedro S.</p>
                      <div className="flex text-yellow-500 text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-nature-700 text-sm leading-relaxed">
                    "Simba vivirá para siempre aquí. Hermoso tributo."
                  </p>
                  <p className="text-xs text-nature-500 mt-2">🐱 Simba • Sídney</p>
                </CardContent>
              </Card>

              {/* Mini Testimonial 2 */}
              <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=50&h=50&fit=crop"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      alt="Charlie"
                    />
                    <div>
                      <p className="font-semibold text-nature-800 text-sm">Emily R.</p>
                      <div className="flex text-yellow-500 text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-nature-700 text-sm leading-relaxed">
                    "¡Exactamente lo que necesitaba! Fácil de usar y emotivo."
                  </p>
                  <p className="text-xs text-nature-500 mt-2">🐕 Charlie • NYC</p>
                </CardContent>
              </Card>

              {/* Mini Testimonial 3 */}
              <Card className="bg-gradient-to-br from-golden-50 to-golden-100 border-golden-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=50&h=50&fit=crop"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      alt="Shadow"
                    />
                    <div>
                      <p className="font-semibold text-nature-800 text-sm">Dmitri K.</p>
                      <div className="flex text-yellow-500 text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-nature-700 text-sm leading-relaxed">
                    "Shadow ahora es eterno. Todos pueden ver su nobleza."
                  </p>
                  <p className="text-xs text-nature-500 mt-2">🐈 Shadow • Moscú</p>
                </CardContent>
              </Card>

              {/* Mini Testimonial 4 */}
              <Card className="bg-gradient-to-br from-nature-50 to-nature-100 border-nature-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=50&h=50&fit=crop"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      alt="Toby"
                    />
                    <div>
                      <p className="font-semibold text-nature-800 text-sm">Klaus M.</p>
                      <div className="flex text-yellow-500 text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-nature-700 text-sm leading-relaxed">
                    "Toby era tan especial. Este memorial lo captura perfectamente."
                  </p>
                  <p className="text-xs text-nature-500 mt-2">🐰 Toby • Berlín</p>
                </CardContent>
              </Card>

              {/* Mini Testimonial 5 */}
              <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=50&h=50&fit=crop"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      alt="Nala"
                    />
                    <div>
                      <p className="font-semibold text-nature-800 text-sm">Wei L.</p>
                      <div className="flex text-yellow-500 text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-nature-700 text-sm leading-relaxed">
                    "Nala era mi reina. Ahora el mundo puede conocerla. Gracias."
                  </p>
                  <p className="text-xs text-nature-500 mt-2">🐱 Nala • Singapur</p>
                </CardContent>
              </Card>

              {/* Mini Testimonial 6 */}
              <Card className="bg-gradient-to-br from-golden-50 to-golden-100 border-golden-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=50&h=50&fit=crop"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      alt="Bruno"
                    />
                    <div>
                      <p className="font-semibold text-nature-800 text-sm">João P.</p>
                      <div className="flex text-yellow-500 text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-nature-700 text-sm leading-relaxed">
                    "Bruno me defendió siempre. Ahora yo defiendo su memoria."
                  </p>
                  <p className="text-xs text-nature-500 mt-2">🐕 Bruno • São Paulo</p>
                </CardContent>
              </Card>

              {/* Mini Testimonial 7 */}
              <Card className="bg-gradient-to-br from-nature-50 to-nature-100 border-nature-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1560807707-8cc77767d783?w=50&h=50&fit=crop"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      alt="Zeus"
                    />
                    <div>
                      <p className="font-semibold text-nature-800 text-sm">Sofía M.</p>
                      <div className="flex text-yellow-500 text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-nature-700 text-sm leading-relaxed">
                    "Cada tributo es un adiós. Cada mensaje es un siempre."
                  </p>
                  <p className="text-xs text-nature-500 mt-2">🦅 Zeus • Madrid</p>
                </CardContent>
              </Card>

              {/* Mini Testimonial 8 */}
              <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=50&h=50&fit=crop"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      alt="Luna"
                    />
                    <div>
                      <p className="font-semibold text-nature-800 text-sm">Marco L.</p>
                      <div className="flex text-yellow-500 text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-nature-700 text-sm leading-relaxed">
                    "Luna cambió mi vida. Hoy cambio la de otros en su nombre."
                  </p>
                  <p className="text-xs text-nature-500 mt-2">🐈‍⬛ Luna • Milán</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
