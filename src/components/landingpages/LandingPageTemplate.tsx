'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LandingPageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  mainImage: string;
  icon: string;
  keywords: string[];
  benefits: { title: string; description: string; emoji: string }[];
  features: { title: string; description: string; emoji: string }[];
  testimonialTitle: string;
  testimonials: { name: string; text: string; pet: string; location: string; emoji: string }[];
  faqs: { question: string; answer: string }[];
}

export function LandingPageTemplate({
  title,
  subtitle,
  description,
  mainImage,
  icon,
  keywords,
  benefits,
  features,
  testimonialTitle,
  testimonials,
  faqs,
}: LandingPageTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${mainImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-nature-900/85 via-nature-800/75 to-background" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm inline-block">
              {icon} {keywords[0]}
            </Badge>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              {subtitle}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {keywords.slice(0, 4).map((keyword, i) => (
                <Badge key={i} variant="secondary" className="bg-white/10 text-white border-white/30">
                  {keyword}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/map">
                <Button
                  size="lg"
                  className="bg-white text-nature-800 hover:bg-nature-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  🗺️ Explorar Memorials
                </Button>
              </Link>
              <Link href="/create">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-nature-800 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/10"
                >
                  ✨ Crear Memorial Gratis
                </Button>
              </Link>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed pt-4">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-nature-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              Beneficios del Memorial Digital
            </h2>
            <p className="text-xl text-nature-600">
              Un espacio permanente para honrar la memoria de tu compañero
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <Card
                key={i}
                className="border-nature-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-nature-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-nature-100 to-nature-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{benefit.emoji}</span>
                  </div>
                  <CardTitle className="text-nature-800 text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-nature-600 leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-nature-600">
              Todo lo que necesitas para crear un memorial perfecto
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="border-sky-200 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                    <div>
                      <CardTitle className="text-nature-800 text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-nature-600 mt-2">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-nature-50 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              {testimonialTitle}
            </h2>
            <p className="text-xl text-nature-600">
              Historias reales de familias que honran a sus compañeros
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="border-golden-200 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-golden-50"
              >
                <CardContent className="p-6">
                  <div className="flex text-yellow-500 mb-4">★★★★★</div>
                  <p className="text-nature-700 italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-golden-200">
                    <div className="w-12 h-12 bg-golden-100 rounded-full flex items-center justify-center font-bold text-golden-700">
                      {testimonial.emoji}
                    </div>
                    <div>
                      <p className="text-nature-800 font-bold">{testimonial.name}</p>
                      <p className="text-nature-600 text-sm">{testimonial.pet} • {testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-nature-800 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-nature-600">
              Resolvemos tus dudas sobre nuestro servicio
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-nature-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-nature-800 flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">❓</span>
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-nature-600 leading-relaxed pl-11">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 overflow-hidden">
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
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
              Crea el Memorial Perfecto Hoy
            </h2>

            <p className="text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Comienza gratis en menos de 5 minutos. Un espacio permanente para honrar a quien tanto te dio.
            </p>

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
                  className="border-2 border-white text-white hover:bg-white hover:text-nature-800 px-12 py-8 text-xl font-bold backdrop-blur-sm bg-white/10"
                >
                  🗺️ Explorar Memorials
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
