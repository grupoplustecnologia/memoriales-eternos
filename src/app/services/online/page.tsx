import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio de Mascotas Online - Forever Pet Friend',
  description:
    'El único cementerio de mascotas online donde puedes crear memoriales, compartir historias y conectar con otros amantes de animales.',
  keywords: 'cementerio mascotas online, memorial online, mascota fallecida, comunidad mascotas',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio de Mascotas Online',
  subtitle: 'Conecta, comparte y recuerda en comunidad',
  description:
    'Más que un cementerio, somos una comunidad global donde cada mascota es honrada y recordada. Conecta con otros, comparte historias y celebra el amor por tus animales.',
  mainImage: 'https://images.unsplash.com/photo-1577720643272-265f434bd857?q=80&w=2000',
  icon: '🌐',
  keywords: ['Cementerio mascotas online', 'Memorial online mascotas', 'Comunidad animales', 'Red mascotas'],
  benefits: [
    {
      title: 'Comunidad Global',
      description: 'Conecta con miles de personas que aman a sus mascotas en todo el mundo.',
      emoji: '🌍',
    },
    {
      title: 'Comparte Historias',
      description: 'Tus recuerdos se convierten en inspiración para otros.',
      emoji: '📢',
    },
    {
      title: 'Apoyo Emocional',
      description: 'Encuentre consuelo en la comunidad que entiende su dolor.',
      emoji: '💪',
    },
  ],
  features: [
    {
      title: 'Perfil de Mascota',
      description: 'Crea un perfil único y hermoso para tu mascota.',
      emoji: '👤',
    },
    {
      title: 'Mapa Global',
      description: 'Ve memoriales de mascotas de todo el mundo.',
      emoji: '🗺️',
    },
    {
      title: 'Tributos Virtuales',
      description: 'Intercambia flores, velas y mensajes con la comunidad.',
      emoji: '🌹',
    },
    {
      title: 'Mensajes de Condolencias',
      description: 'Ofrece apoyo a otros en duelo por sus mascotas.',
      emoji: '💌',
    },
    {
      title: 'Galerías Públicas',
      description: 'Comparte la vida de tu mascota con el mundo.',
      emoji: '🖼️',
    },
    {
      title: 'Comunidad Activa',
      description: 'Participa en una comunidad amorosa y comprensiva.',
      emoji: '🤝',
    },
  ],
  testimonialTitle: 'Historias de Comunidad Online',
  testimonials: [
    {
      name: 'Paula Riquelme',
      text: 'No me sentía sola. Ver memoriales de otros me hizo comprender que mi dolor era compartido. La comunidad fue curativa.',
      pet: 'Bella - Yorkshire Terrier',
      location: 'Viña del Mar, Chile',
      emoji: '🌐',
    },
    {
      name: 'Ahmad Hassan',
      text: 'Amigos de diferentes países se conectaron para honrar a mi Simba. Internet une a los que aman los animales.',
      pet: 'Simba - Gato Naranja',
      location: 'Estambul, Turquía',
      emoji: '🌐',
    },
    {
      name: 'Valerie Thompson',
      text: 'Este sitio me mostró que conectar con otros en duelo por mascotas es terapéutico y hermoso.',
      pet: 'Scout - Golden Retriever',
      location: 'Toronto, Canadá',
      emoji: '🌐',
    },
  ],
  faqs: [
    {
      question: '¿Es seguro compartir fotos de mi mascota?',
      answer: 'Sí, controlas completamente la privacidad. Puedes hacer el memorial público, privado o semiprivado.',
    },
    {
      question: '¿Puedo ocultar el memorial de otros?',
      answer: 'Completamente. Tú decides si es visible para la comunidad o solo para ti.',
    },
    {
      question: '¿Cómo reporto contenido inapropiado?',
      answer: 'Puedes reportar cualquier contenido directamente. Nuestro equipo revisa y actúa rápidamente.',
    },
    {
      question: '¿Hay eventos o reuniones de la comunidad?',
      answer: 'Sí, ocasionalmente organizamos eventos virtuales para recordar a nuestras mascotas.',
    },
  ],
};

export default function OnlineServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio de Mascotas Online',
            url: 'http://localhost:3000/services/online',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
