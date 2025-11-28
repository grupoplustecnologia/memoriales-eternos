import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Conejos - Memorial Eterno | Forever Pet Friend',
  description:
    'Crea un memorial permanente para tu conejo. Honra su memoria con fotos e historias en nuestro cementerio virtual gratuito.',
  keywords: 'cementerio virtual conejos, memorial conejos, conejo fallecido, cementerio digital conejos',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Virtual para Conejos',
  subtitle: 'Un espacio eterno para honrar la ternura de tu compañero',
  description:
    'Los conejos traen alegría y dulzura a nuestros hogares. Crea un memorial permanente para tu conejo y comparte sus momentos especiales.',
  mainImage: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=2000',
  icon: '🐰',
  keywords: ['Cementerio virtual conejos', 'Memorial conejos', 'Conejo fallecido', 'Cementerio digital'],
  benefits: [
    {
      title: 'Memorial Permanente',
      description: 'Tu conejo vivirá en la memoria digital para siempre.',
      emoji: '♾️',
    },
    {
      title: 'Comparte su Dulzura',
      description: 'Captura los momentos especiales de tu conejo en un lugar seguro.',
      emoji: '💕',
    },
    {
      title: '100% Gratuito',
      description: 'Sin cargos ni suscripciones necesarias.',
      emoji: '💚',
    },
  ],
  features: [
    {
      title: 'Galería de Fotos',
      description: 'Sube fotos de tus momentos favoritos con tu conejo.',
      emoji: '📸',
    },
    {
      title: 'Historia Personalizada',
      description: 'Comparte la personalidad única de tu mascota.',
      emoji: '📖',
    },
    {
      title: 'Ubicación en Mapa',
      description: 'Coloca el memorial en un lugar significativo.',
      emoji: '📍',
    },
    {
      title: 'Tributos Virtuales',
      description: 'Recibe flores y mensajes de apoyo.',
      emoji: '🌸',
    },
    {
      title: 'Compartir Fácilmente',
      description: 'Comparte en redes sociales y más.',
      emoji: '🔗',
    },
    {
      title: 'Privacidad Total',
      description: 'Controla completamente la visibilidad.',
      emoji: '🔒',
    },
  ],
  testimonialTitle: 'Historias de Amor con Nuestros Conejos',
  testimonials: [
    {
      name: 'Elena García',
      text: 'Toby fue mi primer conejo y mi mejor amigo durante 8 años. Su memorial aquí me ayuda a recordar su personalidad traviesa y su amor incondicional.',
      pet: 'Toby - Holandés',
      location: 'Berlín, Alemania',
      emoji: '🐰',
    },
    {
      name: 'Pedro Sánchez',
      text: 'Copo era tan suave y tranquilo. Ver su memorial rodeado de tributos de otros amantes de conejos ha sido muy significativo.',
      pet: 'Copo - Angora',
      location: 'Ámsterdam, Países Bajos',
      emoji: '🐰',
    },
    {
      name: 'Lisa Weber',
      text: 'Hutch fue mi compañero desde la adolescencia. Su memorial es mi santuario de recuerdos felices.',
      pet: 'Hutch - Enano',
      location: 'Zúrich, Suiza',
      emoji: '🐰',
    },
  ],
  faqs: [
    {
      question: '¿Puedo crear un memorial para mi conejo sin costo?',
      answer: 'Absolutamente. El servicio es completamente gratuito para todos.',
    },
    {
      question: '¿Durante cuánto tiempo estará el memorial?',
      answer: 'Tu conejo será recordado para siempre. Los memoriales son permanentes.',
    },
    {
      question: '¿Puedo editar el memorial después de crearlo?',
      answer: 'Sí, puedes actualizar fotos e información en cualquier momento.',
    },
    {
      question: '¿Quién puede ver el memorial?',
      answer: 'Tú decides: público o privado con enlace compartible.',
    },
  ],
};

export default function RabbitsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Conejos',
            url: 'http://localhost:3000/pet-types/rabbits',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
