import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Perros - Memorial Eterno Online | Forever Pet Friend',
  description:
    'Crea un memorial permanente para tu perro. Honra su memoria con fotos, historias y tributos en nuestro cementerio virtual gratuito. Visible a nivel mundial.',
  keywords:
    'cementerio virtual para perros, memorial para perros, perro fallecido, memorial perros online, cementerio digital perros',
  openGraph: {
    title: 'Cementerio Virtual para Perros - Memorial Eterno',
    description:
      'Hónra la memoria de tu perro en un memorial permanente y visible para el mundo. Gratis y eterno.',
    url: 'http://localhost:3000/pet-types/dogs',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Memorial para perros',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const pageData = {
  title: 'Cementerio Virtual para Perros',
  subtitle: 'Honra la memoria de tu mejor amigo en un memorial permanente',
  description:
    'Crea un espacio eterno para tu perro fallecido. Comparte su historia, sube fotos, y recibe tributos de una comunidad global que entiende tu dolor.',
  mainImage: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=2000',
  icon: '🐕',
  keywords: [
    'Cementerio virtual para perros',
    'Memorial para perros',
    'Perro fallecido',
    'Memorial perros online',
  ],
  benefits: [
    {
      title: 'Memorial Permanente',
      description:
        'Tu perro estará recordado para siempre en nuestro cementerio virtual. Un lugar donde su memoria vivirá eternamente.',
      emoji: '♾️',
    },
    {
      title: 'Visible Globalmente',
      description:
        'Comparte el memorial de tu perro con el mundo. Otros pueden conocer su historia y dejar tributos de cariño.',
      emoji: '🌍',
    },
    {
      title: '100% Gratuito',
      description:
        'Crear un memorial para tu perro no cuesta nada. Acceso ilimitado a su página memorial sin costos ocultos.',
      emoji: '💚',
    },
  ],
  features: [
    {
      title: 'Galería de Fotos Completa',
      description:
        'Sube múltiples fotos de tu perro para crear una galería que capture sus mejores momentos y su personalidad única.',
      emoji: '📸',
    },
    {
      title: 'Historia Detallada',
      description:
        'Comparte anécdotas, momentos especiales y el impacto que tu perro tuvo en tu vida. Crea un registro permanente.',
      emoji: '📖',
    },
    {
      title: 'Ubicación en Mapa',
      description:
        'Coloca el memorial de tu perro en el lugar que te sea más significativo. Visible en nuestro mapa mundial interactivo.',
      emoji: '📍',
    },
    {
      title: 'Tributos Virtuales',
      description:
        'Amigos y familia pueden dejar flores virtuales, velas y mensajes de condolencia para honrar a tu compañero.',
      emoji: '🌸',
    },
    {
      title: 'Compartir Fácilmente',
      description:
        'Comparte el memorial en redes sociales o mediante un enlace directo. Lleva el recuerdo de tu perro a todos lados.',
      emoji: '🔗',
    },
    {
      title: 'Privacidad Controlada',
      description:
        'Elige si tu memorial es público o privado. Tú controlas quién puede ver y interactuar con el memorial de tu perro.',
      emoji: '🔒',
    },
  ],
  testimonialTitle: 'Historias de Amor por Nuestros Perros',
  testimonials: [
    {
      name: 'Ana García',
      text: 'Max era mi mejor amigo durante 12 años. Este memorial me ayudó a procesar el dolor y ver cómo otros también lo recordaban con cariño. Es reconfortante saber que su memoria vive aquí.',
      pet: 'Max - Golden Retriever',
      location: 'Madrid, España',
      emoji: '🐕',
    },
    {
      name: 'Carlos López',
      text: 'Rocky protegió a nuestra familia durante 11 años. Poder compartir su historia y sus aventuras con el mundo ha sido terapéutico. Los tributos que recibimos nos han ayudado a sanar.',
      pet: 'Rocky - Pastor Alemán',
      location: 'Barcelona, España',
      emoji: '🐕',
    },
    {
      name: 'María Rodríguez',
      text: 'Duke era el alma del vecindario. Todos querían honrarlo. Este memorial permitió que amigos de todo el mundo dejaran sus mensajes. Fue hermoso y necesario.',
      pet: 'Duke - Labrador',
      location: 'Sevilla, España',
      emoji: '🐕',
    },
  ],
  faqs: [
    {
      question: '¿Cuánto cuesta crear un memorial para mi perro?',
      answer:
        'Es completamente gratuito. Puedes crear un memorial permanente para tu perro sin ningún costo. No hay tarjeta de crédito requerida.',
    },
    {
      question: '¿El memorial estará disponible para siempre?',
      answer:
        'Sí. Los memoriales permanecen en línea de forma indefinida. Nos comprometemos a preservar las memorias de nuestras mascotas para siempre.',
    },
    {
      question: '¿Puedo controlar quién ve el memorial de mi perro?',
      answer:
        'Completamente. Puedes elegir si el memorial es público (visible para todos) o privado (solo con enlace directo).',
    },
    {
      question: '¿Puedo editar el memorial después de crearlo?',
      answer:
        'Por supuesto. Puedes agregar fotos, actualizar la historia, y modificar cualquier información en cualquier momento.',
    },
  ],
};

export default function DogsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Perros',
            description:
              'Crea un memorial permanente para tu perro fallecido en nuestro cementerio virtual gratuito.',
            url: 'http://localhost:3000/pet-types/dogs',
            mainEntity: {
              '@type': 'Service',
              name: 'Memorial Virtual para Perros',
              description: 'Servicio de cementerio virtual para honrar la memoria de perros fallecidos',
              provider: {
                '@type': 'Organization',
                name: 'Forever Pet Friend',
              },
            },
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
