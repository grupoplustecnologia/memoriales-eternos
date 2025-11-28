'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [count, setCount] = useState(0);
  const [countries, setCountries] = useState(15);
  const [dailyVisits, setDailyVisits] = useState(1200);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;
  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get count from localStorage or fetch from API when ready
        const storedCount = localStorage.getItem('memorialsCount');
        if (storedCount) {
          setCount(parseInt(storedCount, 10));
        }
        
        // Try to fetch from an API endpoint if available
        // For now, using client-side data
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();

    // Check for updates every 10 seconds
    const interval = setInterval(fetchStats, 10000);

    return () => clearInterval(interval);
  }, []);

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Update carousel on slide change
  useEffect(() => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
        dot.classList.remove('bg-nature-300');
        dot.classList.add('bg-nature-600', 'w-8');
      } else {
        dot.classList.remove('active', 'w-8');
        dot.classList.add('bg-nature-300');
        dot.classList.remove('bg-nature-600');
      }
    });
  }, [currentSlide]);

  // Manual dot navigation
  useEffect(() => {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        setCurrentSlide(index);
      });
    });

    return () => {
      dots.forEach((dot) => {
        dot.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-nature-900/80 via-nature-800/70 to-background" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Trust Badge */}
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                ✨ Memorials Permanentes
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                🌍 {count}+ Memoriales Creados
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                💚 100% Gratis para Empezar
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              Un Lugar Eterno para<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-300 to-sky-300 drop-shadow-none">
                Tus Compañeros Queridos
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Honra la memoria de tu mascota en un memorial permanente visible en todo el mundo
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/map">
                <Button
                  size="lg"
                  className="bg-white text-nature-800 hover:bg-nature-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  🗺️ Explorar el Mapa
                </Button>
              </Link>
              <Link href="/create">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-nature-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  ✨ Crear Memorial Gratis
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-8 flex items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=40&h=40&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white"
                    alt="User"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1513245543132-31f507417b26?w=40&h=40&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white"
                    alt="User"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1568572933382-74d440642117?w=40&h=40&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white"
                    alt="User"
                  />
                </div>
                <span>Únete a miles de familias</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-300">★★★★★</span>
                <span className="ml-2">Calificación 5/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-nature-600 to-sky-600">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">{count}+</div>
              <div className="text-white/80">Memoriales Creados</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">{countries}</div>
              <div className="text-white/80">Países</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">{(dailyVisits / 1000).toFixed(1)}k+</div>
              <div className="text-white/80">Visitas Diarias</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">∞</div>
              <div className="text-white/80">Años de Permanencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-nature-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4">Cómo Funciona</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              Crea un Memorial en 3 Simples Pasos
            </h2>
            <p className="text-xl text-nature-600 max-w-2xl mx-auto">
              Un proceso sencillo y emotivo para honrar a tu compañero
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-nature-300 via-sky-300 to-golden-300 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 text-center group">
              <div className="inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-nature-500 to-nature-600 rounded-full flex items-center justify-center text-white text-4xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                  ✍️
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-nature-700 shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-nature-800 mb-3">Comparte su Historia</h3>
              <p className="text-nature-600 leading-relaxed">
                Escribe sobre tu compañero, sube fotos y crea un perfil único que capture su esencia y personalidad.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center group">
              <div className="inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white text-4xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                  📍
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-sky-700 shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-nature-800 mb-3">Ubica en el Mapa</h3>
              <p className="text-nature-600 leading-relaxed">
                Elige un lugar especial en el mapa mundial donde quieras que su memorial sea visible para siempre.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center group">
              <div className="inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-golden-500 to-golden-600 rounded-full flex items-center justify-center text-white text-4xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                  🌟
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-golden-700 shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-nature-800 mb-3">Comparte y Recibe Amor</h3>
              <p className="text-nature-600 leading-relaxed">
                Comparte el memorial con amigos y familia. Recibe tributos, mensajes y flores virtuales.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="bg-nature-600 hover:bg-nature-700 text-white px-10 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Comenzar Ahora - Es Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4">Características</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              Un Memorial Completo y Permanente
            </h2>
            <p className="text-xl text-nature-600 max-w-2xl mx-auto">
              Todo lo que necesitas para honrar y preservar la memoria de tu compañero
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-nature-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nature-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-nature-100 to-nature-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🗺️</span>
                </div>
                <CardTitle className="text-nature-800 text-xl">Mapa Mundial Interactivo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-nature-600 leading-relaxed">
                  Ubica el memorial de tu mascota en el lugar que más significado tenga para ti.
                  Visible para personas de todo el mundo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-sky-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📖</span>
                </div>
                <CardTitle className="text-nature-800 text-xl">Historia Completa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-nature-600 leading-relaxed">
                  Comparte fotos, historias, anécdotas y recuerdos especiales.
                  Crea un tributo único y personal.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-golden-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-golden-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-golden-100 to-golden-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🌸</span>
                </div>
                <CardTitle className="text-nature-800 text-xl">Tributos Virtuales</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-nature-600 leading-relaxed">
                  Amigos y familiares pueden dejar flores virtuales, velas y mensajes
                  de condolencia.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-nature-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nature-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-nature-100 to-nature-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🖼️</span>
                </div>
                <CardTitle className="text-nature-800 text-xl">Galería de Fotos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-nature-600 leading-relaxed">
                  Sube múltiples fotos para crear una galería completa de los mejores
                  momentos compartidos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-sky-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🔗</span>
                </div>
                <CardTitle className="text-nature-800 text-xl">Compartir Fácilmente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-nature-600 leading-relaxed">
                  Comparte el memorial en redes sociales para que otros puedan
                  conocer y honrar a tu mascota.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-golden-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-golden-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-golden-100 to-golden-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">♾️</span>
                </div>
                <CardTitle className="text-nature-800 text-xl">Permanente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-nature-600 leading-relaxed">
                  Tu memorial permanecerá accesible para siempre, preservando
                  la memoria de tu compañero.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-nature-50 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">Vista Previa</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              Explora Memoriales de Todo el Mundo
            </h2>
            <p className="text-xl text-nature-600 max-w-2xl mx-auto">
              Cada marcador representa una historia de amor único
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
              alt="Mapa del mundo"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nature-900/90 via-nature-900/30 to-transparent flex items-end justify-center pb-12">
              <Link href="/map">
                <Button size="lg" className="bg-white text-nature-800 hover:bg-nature-50 px-10 py-6 text-lg shadow-2xl hover:scale-105 transition-all duration-300">
                  Ver Mapa Completo →
                </Button>
              </Link>
            </div>

            {/* Floating Memorial Cards */}
            <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-xs transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=60&h=60&fit=crop"
                  className="w-16 h-16 rounded-lg object-cover"
                  alt="Max"
                />
                <div>
                  <h4 className="font-bold text-nature-800">Max</h4>
                  <p className="text-sm text-nature-600">Golden Retriever</p>
                  <p className="text-xs text-muted-foreground mt-1">Madrid, España 🇪🇸</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-xs transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1513245543132-31f507417b26?w=60&h=60&fit=crop"
                  className="w-16 h-16 rounded-lg object-cover"
                  alt="Luna"
                />
                <div>
                  <h4 className="font-bold text-nature-800">Luna</h4>
                  <p className="text-sm text-nature-600">Siamés</p>
                  <p className="text-xs text-muted-foreground mt-1">Barcelona, España 🇪🇸</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-nature-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <Badge className="mb-4">Testimonios</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              Historias que Nos Inspiran
            </h2>
            <p className="text-xl text-nature-600 max-w-2xl mx-auto">
              Lee cómo las familias honran a sus compañeros queridos
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div className="testimonial-carousel">
                {/* Testimonial 1 */}
                <div className="testimonial-slide active">
                  <Card className="bg-white border-nature-200 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-80 md:h-auto overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600"
                          alt="Max"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex text-yellow-500 mb-4 text-xl">
                          ★★★★★
                        </div>
                        <p className="text-nature-700 italic mb-6 leading-relaxed text-lg md:text-xl">
                          "Crear el memorial de Max me ayudó a procesar mi dolor. Ahora puedo visitar
                          su página cuando lo extraño y leer todos los mensajes bonitos que la gente
                          ha dejado. Es reconfortante saber que su memoria vive."
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-nature-100 rounded-full flex items-center justify-center text-nature-700 font-bold text-xl">
                            A
                          </div>
                          <div>
                            <p className="text-nature-800 font-bold text-lg">Ana García</p>
                            <p className="text-nature-600">Max • Golden Retriever • Madrid</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Testimonial 2 */}
                <div className="testimonial-slide">
                  <Card className="bg-white border-sky-200 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-80 md:h-auto overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600"
                          alt="Luna"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex text-yellow-500 mb-4 text-xl">
                          ★★★★★
                        </div>
                        <p className="text-nature-700 italic mb-6 leading-relaxed text-lg md:text-xl">
                          "Luna fue parte de nuestra familia durante 9 años. Este espacio nos permite
                          compartir su historia con el mundo y mantener vivos todos esos momentos
                          especiales que vivimos juntos. Gracias por este regalo."
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-bold text-xl">
                            C
                          </div>
                          <div>
                            <p className="text-nature-800 font-bold text-lg">Carlos Rodríguez</p>
                            <p className="text-nature-600">Luna • Siamés • Barcelona</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Testimonial 3 */}
                <div className="testimonial-slide">
                  <Card className="bg-white border-golden-200 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-80 md:h-auto overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1568572933382-74d440642117?w=600"
                          alt="Rocky"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex text-yellow-500 mb-4 text-xl">
                          ★★★★★
                        </div>
                        <p className="text-nature-700 italic mb-6 leading-relaxed text-lg md:text-xl">
                          "Rocky protegió nuestra familia durante 11 años. Poder compartir su valentía
                          y lealtad con el mundo me llena de orgullo. Los tributos que recibimos nos
                          ayudan a sanar."
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-golden-100 rounded-full flex items-center justify-center text-golden-700 font-bold text-xl">
                            S
                          </div>
                          <div>
                            <p className="text-nature-800 font-bold text-lg">Sarah Johnson</p>
                            <p className="text-nature-600">Rocky • Pastor Alemán • Londres</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Testimonial 4 */}
                <div className="testimonial-slide">
                  <Card className="bg-white border-nature-200 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-80 md:h-auto overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600"
                          alt="Milo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex text-yellow-500 mb-4 text-xl">
                          ★★★★★
                        </div>
                        <p className="text-nature-700 italic mb-6 leading-relaxed text-lg md:text-xl">
                          "Milo era un gigante gentil. Perdí a mi mejor amigo, pero este memorial
                          me permite sentirlo cerca. Ver su foto cada día y recordar las aventuras
                          que vivimos juntos es terapéutico."
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-nature-100 rounded-full flex items-center justify-center text-nature-700 font-bold text-xl">
                            Y
                          </div>
                          <div>
                            <p className="text-nature-800 font-bold text-lg">Yuki Tanaka</p>
                            <p className="text-nature-600">Milo • Maine Coon • Tokio</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Testimonial 5 */}
                <div className="testimonial-slide">
                  <Card className="bg-white border-sky-200 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-80 md:h-auto overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600"
                          alt="Duke"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex text-yellow-500 mb-4 text-xl">
                          ★★★★★
                        </div>
                        <p className="text-nature-700 italic mb-6 leading-relaxed text-lg md:text-xl">
                          "Duke era el alma de nuestro vecindario. Cuando falleció, todos quisieron
                          honrarlo. Este memorial permitió que amigos de todo el mundo dejaran sus
                          mensajes. Fue hermoso."
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-bold text-xl">
                            M
                          </div>
                          <div>
                            <p className="text-nature-800 font-bold text-lg">María González</p>
                            <p className="text-nature-600">Duke • Labrador • San Francisco</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Testimonial 6 */}
                <div className="testimonial-slide">
                  <Card className="bg-white border-golden-200 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-80 md:h-auto overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600"
                          alt="Bella"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex text-yellow-500 mb-4 text-xl">
                          ★★★★★
                        </div>
                        <p className="text-nature-700 italic mb-6 leading-relaxed text-lg md:text-xl">
                          "Bella me acompañó en mis momentos más difíciles. Poder crear este espacio
                          para ella y ver cómo otros también la recuerdan con cariño me reconforta
                          profundamente. Eternamente agradecida."
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-golden-100 rounded-full flex items-center justify-center text-golden-700 font-bold text-xl">
                            S
                          </div>
                          <div>
                            <p className="text-nature-800 font-bold text-lg">Sophie Martin</p>
                            <p className="text-nature-600">Bella • Persa • París</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              <button className="carousel-dot active w-3 h-3 rounded-full bg-nature-600 transition-all duration-300" data-slide="0"></button>
              <button className="carousel-dot w-3 h-3 rounded-full bg-nature-300 transition-all duration-300" data-slide="1"></button>
              <button className="carousel-dot w-3 h-3 rounded-full bg-nature-300 transition-all duration-300" data-slide="2"></button>
              <button className="carousel-dot w-3 h-3 rounded-full bg-nature-300 transition-all duration-300" data-slide="3"></button>
              <button className="carousel-dot w-3 h-3 rounded-full bg-nature-300 transition-all duration-300" data-slide="4"></button>
              <button className="carousel-dot w-3 h-3 rounded-full bg-nature-300 transition-all duration-300" data-slide="5"></button>
            </div>
          </div>
        </div>
      </section>

      {/* Wall of Love */}
      <section className="py-20 px-4 bg-gradient-to-b from-nature-50 to-background">
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
                    <p className="font-semibold text-nature-800 text-sm">Nikos A.</p>
                    <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  </div>
                </div>
                <p className="text-nature-700 text-sm leading-relaxed">
                  "Zeus era un gigante gentil. Este sitio honra su grandeza."
                </p>
                <p className="text-xs text-nature-500 mt-2">🐕 Zeus • Atenas</p>
              </CardContent>
            </Card>

            {/* Mini Testimonial 8 */}
            <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=50&h=50&fit=crop"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    alt="Daisy"
                  />
                  <div>
                    <p className="font-semibold text-nature-800 text-sm">Lisa M.</p>
                    <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  </div>
                </div>
                <p className="text-nature-700 text-sm leading-relaxed">
                  "Daisy adoraba a los niños. Ahora todos pueden leer sobre ella."
                </p>
                <p className="text-xs text-nature-500 mt-2">🐕 Daisy • Toronto</p>
              </CardContent>
            </Card>

            {/* Mini Testimonial 9 */}
            <Card className="bg-gradient-to-br from-golden-50 to-golden-100 border-golden-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=50&h=50&fit=crop"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    alt="Coco"
                  />
                  <div>
                    <p className="font-semibold text-nature-800 text-sm">Lucía F.</p>
                    <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  </div>
                </div>
                <p className="text-nature-700 text-sm leading-relaxed">
                  "Coco cantaba cada mañana. Su voz sigue aquí, en su historia."
                </p>
                <p className="text-xs text-nature-500 mt-2">🦜 Coco • Buenos Aires</p>
              </CardContent>
            </Card>

            {/* Mini Testimonial 10 */}
            <Card className="bg-gradient-to-br from-nature-50 to-nature-100 border-nature-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=50&h=50&fit=crop"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    alt="Oliver"
                  />
                  <div>
                    <p className="font-semibold text-nature-800 text-sm">Erik H.</p>
                    <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  </div>
                </div>
                <p className="text-nature-700 text-sm leading-relaxed">
                  "Oliver era un caballero. Perfecto para honrar su elegancia."
                </p>
                <p className="text-xs text-nature-500 mt-2">🐈 Oliver • Oslo</p>
              </CardContent>
            </Card>

            {/* Mini Testimonial 11 */}
            <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1612363148951-07c58e412d1d?w=50&h=50&fit=crop"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    alt="Whiskers"
                  />
                  <div>
                    <p className="font-semibold text-nature-800 text-sm">Aoife O.</p>
                    <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  </div>
                </div>
                <p className="text-nature-700 text-sm leading-relaxed">
                  "Whiskers era pequeño pero lleno de amor. Aquí vive su esencia."
                </p>
                <p className="text-xs text-nature-500 mt-2">🐹 Whiskers • Dublín</p>
              </CardContent>
            </Card>

            {/* Mini Testimonial 12 */}
            <Card className="bg-gradient-to-br from-golden-50 to-golden-100 border-golden-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1580157730183-80dc8b7a59e5?w=50&h=50&fit=crop"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    alt="Piolin"
                  />
                  <div>
                    <p className="font-semibold text-nature-800 text-sm">Rosa M.</p>
                    <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  </div>
                </div>
                <p className="text-nature-700 text-sm leading-relaxed">
                  "Piolin era puro sol. Su memorial brilla igual que él brilló."
                </p>
                <p className="text-xs text-nature-500 mt-2">🐦 Piolin • México DF</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Below Wall of Love */}
          <div className="text-center mt-12">
            <p className="text-nature-600 mb-4 text-lg">
              Sé parte de estas historias de amor 💚
            </p>
            <Link href="/create">
              <Button size="lg" className="bg-gradient-to-r from-nature-600 to-sky-600 hover:from-nature-700 hover:to-sky-700 text-white px-10 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Crear Mi Memorial Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-3">🔒</div>
              <h4 className="font-semibold text-nature-800 mb-1">100% Seguro</h4>
              <p className="text-sm text-nature-600">Datos protegidos</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-semibold text-nature-800 mb-1">Rápido</h4>
              <p className="text-sm text-nature-600">Crea en minutos</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-3">💚</div>
              <h4 className="font-semibold text-nature-800 mb-1">Con Amor</h4>
              <p className="text-sm text-nature-600">Hecho con cariño</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-3">🌍</div>
              <h4 className="font-semibold text-nature-800 mb-1">Global</h4>
              <p className="text-sm text-nature-600">Visible mundial</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge className="mb-4">Preguntas Frecuentes</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              ¿Tienes Dudas?
            </h2>
            <p className="text-xl text-nature-600">
              Aquí respondemos las preguntas más comunes
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "¿Es realmente gratis crear un memorial?",
                a: "Sí, el plan gratuito te permite crear 1 memorial completo con foto, historia, ubicación y epitafio. Sin costos ocultos ni tarjeta de crédito requerida."
              },
              {
                q: "¿El memorial será permanente?",
                a: "Absolutamente. Todos los memoriales permanecen en línea de forma indefinida. Nos comprometemos a preservar estas memorias para las generaciones futuras."
              },
              {
                q: "¿Puedo agregar más fotos después?",
                a: "Sí, con los planes Premium puedes crear una galería con múltiples fotos y actualizarla cuando quieras."
              },
              {
                q: "¿Qué pasa con la privacidad?",
                a: "Tú controlas qué información es visible. Puedes elegir hacer el memorial público o privado (solo con enlace directo)."
              }
            ].map((item, index) => (
              <Card key={index} className="border-nature-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-nature-800 flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">❓</span>
                    {item.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-nature-600 leading-relaxed pl-11">
                    {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nature-900/95 via-nature-800/90 to-sky-900/95" />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="space-y-8">
            {/* Badge */}
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-2 text-base">
              ✨ Comienza Gratis Hoy Mismo
            </Badge>

            {/* Headline */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Dale a Tu Mascota el<br />Memorial que Merece
            </h2>

            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Comienza gratis en menos de 5 minutos.<br />
              Un espacio permanente para honrar a quien tanto te dio.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-white/90 text-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Gratis para siempre</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Listo en 5 minutos</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-white text-nature-800 hover:bg-nature-50 px-12 py-8 text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  🌟 Crear Memorial Gratis
                </Button>
              </Link>
              <Link href="/map">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-nature-800 px-12 py-8 text-xl font-bold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  🗺️ Explorar Ejemplos
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-8 flex flex-col items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1568572933382-74d440642117?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=40&h=40&fit=crop'
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-12 h-12 rounded-full border-3 border-white shadow-lg"
                    alt="User"
                  />
                ))}
              </div>
              <p className="text-white/90 text-lg">
                <span className="font-bold">{count}+</span> familias ya honran a sus compañeros aquí
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Download Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-nature-50 via-sky-50 to-nature-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-4 sm:mb-6 bg-nature-600 text-white">
                📱 Próximamente
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nature-800 mb-4 sm:mb-6">
                Descarga Nuestra<br />Aplicación Móvil
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-nature-600 mb-6 sm:mb-8 leading-relaxed">
                Lleva los recuerdos de tu compañero siempre contigo. Visita su memorial, deja tributos y comparte momentos desde cualquier lugar.
              </p>

              {/* App Features */}
              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                <div className="flex items-center gap-3 text-nature-700">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-nature-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base md:text-lg font-medium">Notificaciones de nuevos tributos</span>
                </div>
                <div className="flex items-center gap-3 text-nature-700">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base md:text-lg font-medium">Galería de fotos sin límites</span>
                </div>
                <div className="flex items-center gap-3 text-nature-700">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-golden-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base md:text-lg font-medium">Acceso offline a tus memoriales</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                {/* Google Play */}
                <button className="group bg-black hover:bg-gray-900 text-white rounded-xl px-6 py-3 sm:px-8 sm:py-4 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-105 shadow-lg">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs opacity-90">Disponible en</p>
                    <p className="text-base sm:text-lg font-bold">Google Play</p>
                  </div>
                </button>

                {/* Apple Store */}
                <button className="group bg-black hover:bg-gray-900 text-white rounded-xl px-6 py-3 sm:px-8 sm:py-4 flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-105 shadow-lg">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs opacity-90">Descarga en</p>
                    <p className="text-base sm:text-lg font-bold">App Store</p>
                  </div>
                </button>
              </div>

              <p className="text-sm text-nature-500 mt-4 sm:mt-6">
                🚧 En desarrollo • Suscríbete para recibir notificaciones del lanzamiento
              </p>
            </div>

            {/* Right - Phone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 bg-nature-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-40 sm:h-40 bg-sky-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Phone Frame */}
                <div className="relative bg-gradient-to-br from-nature-800 to-nature-900 rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-2xl max-w-[280px] sm:max-w-xs mx-auto">
                  {/* Screen */}
                  <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                    {/* Notch */}
                    <div className="bg-nature-800 h-6 sm:h-7 rounded-b-3xl mx-auto w-32 sm:w-40"></div>

                    {/* Screen Content */}
                    <div className="p-4 sm:p-6 bg-gradient-to-b from-nature-50 to-white min-h-[400px] sm:min-h-[500px]">
                      <div className="text-center mb-4 sm:mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-nature-600 to-sky-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg">
                          <span className="text-2xl sm:text-3xl">🐾</span>
                        </div>
                        <h3 className="font-bold text-nature-800 text-base sm:text-lg">Max</h3>
                        <p className="text-xs sm:text-sm text-nature-600">2015 - 2023</p>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg">🌸</span>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-nature-800">Ana M.</p>
                              <p className="text-xs text-nature-600">Nuevo tributo</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg">📸</span>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-nature-800">Galería</p>
                              <p className="text-xs text-nature-600">12 fotos</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg">🗺️</span>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-nature-800">Ubicación</p>
                              <p className="text-xs text-nature-600">Madrid, España</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
