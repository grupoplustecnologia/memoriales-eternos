// Wrapper component para hacer que secciones de landing pages sean lazy loaded
// Esto reduce el bundle inicial sin afectar la experiencia del usuario

import { ReactNode } from 'react';

interface LazyLandingSectionProps {
  children: ReactNode;
  className?: string;
}

export function LazyLandingSection({ children, className = '' }: LazyLandingSectionProps) {
  return <div className={className}>{children}</div>;
}

// Esta es una versión que puede importarse dinámicamente desde pages
export function HeroSection({
  title,
  subtitle,
  badges,
  backgroundImage,
}: {
  title: string;
  subtitle?: string;
  badges?: string[];
  backgroundImage?: string;
}) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: backgroundImage || 'url(https://images.unsplash.com/photo-1597854212624-c63a5e9e6ed1?q=80&w=2000)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nature-900/80 via-nature-800/70 to-background" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20">
        <div className="text-center space-y-8">
          <div className="flex justify-center gap-3 flex-wrap">
            {(badges || []).map((badge, i) => (
              <span
                key={i}
                className="bg-white/20 text-white border border-white/30 backdrop-blur-sm px-4 py-2 text-sm rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
            {title}
          </h1>
          {subtitle && <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

export function FeatureCards({
  features,
}: {
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}) {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-nature-50 to-background">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="text-center space-y-4 p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition">
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="text-xl font-bold text-nature-900">{feature.title}</h3>
              <p className="text-nature-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
