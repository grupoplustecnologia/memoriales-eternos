'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import TributesSection from '@/components/TributesSection';
import ShareMemorialSection from '@/components/ShareMemorialSection';
import RichSnippet from '@/components/RichSnippet';
import { LikesButton } from '@/components/LikesButton';
import { ReactionsPanel } from '@/components/ReactionsPanel';
import { CommentsSection } from '@/components/CommentsSection';
import { ShareButton } from '@/components/ShareButton';
import { TagsManager } from '@/components/TagsManager';
import { extractIdFromSlug } from '@/lib/slug';
import type { AnimalProfile } from '@/types';

export default function MemorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [profile, setProfile] = useState<AnimalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Extract ID from slug
  const getProfileId = () => {
    const extractedId = extractIdFromSlug(slug);
    return extractedId || slug;
  };

  // Fetch profile from API by slug
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileId = getProfileId();
        const response = await fetch(`/api/profiles`);
        const result = await response.json();
        if (result.success && result.data) {
          // Try to find by ID first
          let found = result.data.find((p: AnimalProfile) => p.id === profileId);
          
          // If not found by ID, try by slug
          if (!found) {
            found = result.data.find((p: AnimalProfile) => p.slug === slug);
          }
          
          if (found) {
            setProfile(found);

            // Increment view count
            fetch(`/api/profiles/${found.id}/view`, { method: 'POST' }).catch(
              (err) => console.error('Error incrementing view count:', err)
            );
          } else {
            router.push('/404');
          }
        } else {
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando memorial...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Memorial no encontrado</p>
            <Link href="/map">
              <Button>Volver al Mapa</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate age at death
  const calculateAge = (birthDate: string, deathDate: string) => {
    const birth = new Date(birthDate);
    const death = new Date(deathDate);
    const years = death.getFullYear() - birth.getFullYear();
    const months = death.getMonth() - birth.getMonth();

    if (years > 0) {
      return `${years} año${years > 1 ? 's' : ''}`;
    }
    return `${months} mes${months > 1 ? 'es' : ''}`;
  };

  const ageAtDeath = calculateAge(profile.birthDate, profile.deathDate);
  const visitsCount = profile.viewCount || 0;

  // Calculate life timeline milestones
  const birthYear = new Date(profile.birthDate).getFullYear();
  const deathYear = new Date(profile.deathDate).getFullYear();
  const lifeYears = deathYear - birthYear;

  const timelineMilestones = [
    { year: birthYear, label: 'Nació', description: 'Llegó a nuestras vidas', icon: '🌟' },
    { year: birthYear + Math.floor(lifeYears * 0.25), label: `${Math.floor(lifeYears * 0.25)} años`, description: 'Primeros pasos juntos', icon: '🐾' },
    { year: birthYear + Math.floor(lifeYears * 0.5), label: `${Math.floor(lifeYears * 0.5)} años`, description: 'En la plenitud de su vida', icon: '❤️' },
    { year: birthYear + Math.floor(lifeYears * 0.75), label: `${Math.floor(lifeYears * 0.75)} años`, description: 'Años dorados', icon: '✨' },
    { year: deathYear, label: 'Partió', description: 'Siempre en nuestros corazones', icon: '🌈' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-nature-50">
      {/* SEO Rich Snippet */}
      <RichSnippet
        type="memorial"
        data={{
          name: profile.name,
          photoUrl: profile.photoUrl,
          story: profile.story,
          birthDate: profile.birthDate,
          deathDate: profile.deathDate,
          id: profile.id
        }}
      />
      {/* Hero Emotivo Premium */}
      <div className="relative h-[450px] sm:h-[500px] md:h-[550px] overflow-hidden">
        {/* Background image with blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${profile.photoUrl})`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-nature-900/90" />

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10 text-center">
          {/* Profile photo - large circular */}
          <div className="mb-4 sm:mb-6 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-golden-400 to-golden-600 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-75" />
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 sm:border-6 md:border-8 border-white shadow-2xl object-cover"
            />
          </div>

          {/* Name and type */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-3xl sm:text-4xl md:text-5xl">
                {profile.animalType === 'perro' ? '🐕' :
                 profile.animalType === 'gato' ? '🐈' :
                 profile.animalType === 'ave' ? '🦜' :
                 profile.animalType === 'roedor' ? '🐹' :
                 profile.animalType === 'reptil' ? '🦎' : '🐾'}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl">
                {profile.name}
              </h1>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light px-4">
              {profile.breed || profile.animalType} • {ageAtDeath} de amor
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm md:text-base">
              ⭐ {profile.birthDate.split('-')[0]} - {profile.deathDate.split('-')[0]}
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm md:text-base">
              📍 Madrid, España
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm md:text-base">
              👁️ {visitsCount} visitas
            </Badge>
          </div>

          {/* Epitaph */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 italic max-w-3xl mb-4 sm:mb-6 md:mb-8 font-serif px-6">
            "{profile.epitaph}"
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center px-4">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-nature-800 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 text-sm sm:text-base md:text-lg backdrop-blur-sm bg-white/10"
            >
              <span className="hidden sm:inline">📤 Compartir Memorial</span>
              <span className="sm:hidden">📤 Compartir</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`border-2 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 text-sm sm:text-base md:text-lg backdrop-blur-sm transition-all duration-300 ${
                isSaved
                  ? 'border-golden-400 text-golden-400 bg-golden-400/20 hover:bg-golden-400/30'
                  : 'border-white text-white hover:bg-white hover:text-nature-800 bg-white/10'
              }`}
              onClick={() => setIsSaved(!isSaved)}
            >
              {isSaved ? '💛 Guardado' : '🤍 Guardar'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Timeline Visual de Vida */}
        <Card className="mb-6 sm:mb-8 border-2 border-nature-200 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-nature-50 to-sky-50">
            <div className="text-center">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl mb-2 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl md:text-4xl">📅</span>
                Su Vida en el Tiempo
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {ageAtDeath} de momentos inolvidables
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12">
            {/* Timeline */}
            <div className="relative max-w-5xl mx-auto">
              {/* Timeline line - hidden on mobile, shown on larger screens */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-nature-300 via-sky-300 to-golden-300" />

              {/* Timeline points - horizontal scroll on mobile */}
              <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
                <div className="relative flex gap-8 min-w-max">
                  {timelineMilestones.map((milestone, index) => (
                    <div key={index} className="flex flex-col items-center relative group min-w-[100px]">
                      {/* Dot */}
                      <div className="relative z-10 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-nature-500 to-sky-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                          <span className="text-lg">{milestone.icon}</span>
                        </div>
                      </div>

                      {/* Year label */}
                      <div className="text-center space-y-1 max-w-[100px]">
                        <p className="font-bold text-nature-800 text-sm">{milestone.year}</p>
                        <p className="text-xs font-semibold text-nature-600">{milestone.label}</p>
                        <p className="text-xs text-nature-500 leading-tight">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline points - normal layout on desktop */}
              <div className="hidden md:flex relative justify-between">
                {timelineMilestones.map((milestone, index) => (
                  <div key={index} className="flex flex-col items-center relative group">
                    {/* Dot */}
                    <div className="relative z-10 mb-4">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-nature-500 to-sky-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl lg:text-2xl">{milestone.icon}</span>
                      </div>
                    </div>

                    {/* Year label */}
                    <div className="text-center space-y-1 max-w-[100px] lg:max-w-[120px]">
                      <p className="font-bold text-nature-800 text-base lg:text-lg">{milestone.year}</p>
                      <p className="text-xs lg:text-sm font-semibold text-nature-600">{milestone.label}</p>
                      <p className="text-xs text-nature-500 leading-tight">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Life summary */}
            <div className="mt-8 sm:mt-10 md:mt-12 text-center max-w-2xl mx-auto px-2">
              <div className="bg-gradient-to-r from-nature-50 via-sky-50 to-golden-50 rounded-2xl p-4 sm:p-5 md:p-6 border border-nature-200">
                <p className="text-nature-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  <span className="font-bold text-nature-800">{profile.name}</span> compartió <span className="font-bold text-sky-700">{ageAtDeath}</span> de amor incondicional con su familia.
                  Desde el momento en que llegó en <span className="font-bold text-nature-700">{birthYear}</span> hasta su partida en <span className="font-bold text-golden-700">{deathYear}</span>,
                  cada día fue un regalo lleno de momentos especiales.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Centered Main Content */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Story */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">📖</span>
                Su Historia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nature-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                {profile.story}
              </p>
            </CardContent>
          </Card>

          {/* Gallery */}
          {profile.gallery && profile.gallery.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">🖼️</span>
                  Galería de Recuerdos
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {profile.gallery.length} momento{profile.gallery.length > 1 ? 's' : ''} capturado{profile.gallery.length > 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {profile.gallery.map((photo, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-xl">
                      <img
                        src={photo}
                        alt={`${profile.name} - Foto ${index + 1}`}
                        className="rounded-xl w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tributes - New Enhanced System */}
          <TributesSection memorialId={profile.id} />

          {/* Social Features Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">❤️</span>
                Interacciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Likes and Reactions */}
              <div className="flex flex-wrap gap-3">
                <LikesButton profileId={profile.id} />
                <ReactionsPanel profileId={profile.id} />
                <ShareButton profileId={profile.id} title={profile.name} />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>🏷️</span>
                Etiquetas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TagsManager profileId={profile.id} isOwner={false} />
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardContent className="pt-6">
              <CommentsSection profileId={profile.id} />
            </CardContent>
          </Card>

          {/* Social Sharing - Premium Feature */}
          <ShareMemorialSection
            memorialId={profile.id}
            memorialName={profile.name}
            story={profile.story}
            photoUrl={profile.photoUrl}
            animalType={profile.animalType}
          />
        </div>
      </div>
    </div>
  );
}
