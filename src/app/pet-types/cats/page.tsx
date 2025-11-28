import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Gatos - Memorial Eterno Online | Forever Pet Friend',
  description:
    'Crea un memorial permanente para tu gato. Honra su memoria con fotos, historias y tributos en nuestro cementerio virtual gratuito. Visible a nivel mundial.',
  keywords:
    'cementerio virtual para gatos, memorial para gatos, gato fallecido, memorial gatos online, cementerio digital gatos',
  openGraph: {
    title: 'Cementerio Virtual para Gatos - Memorial Eterno',
    description: 'Hónra la memoria de tu gato en un memorial permanente y visible para el mundo. Gratis y eterno.',
    url: 'http://localhost:3000/pet-types/cats',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Memorial para gatos',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const pageData = {
  title: 'Cementerio Virtual para Gatos',
  subtitle: 'Un lugar eterno para recordar a tu compañero felino',
  description:
    'Crea un espacio permanente para tu gato fallecido. Comparte su historia, sube fotos, y recibe tributos de una comunidad que entiende el vínculo especial con los gatos.',
  mainImage: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=2000',
  icon: '🐱',
  keywords: [
    'Cementerio virtual para gatos',
    'Memorial para gatos',
    'Gato fallecido',
    'Memorial gatos online',
  ],
  benefits: [
    {
      title: 'Memorial Permanente',
      description:
        'Tu gato vivirá para siempre en nuestro cementerio virtual. Un espacio dedicado a honrar su independencia y cariño.',
      emoji: '♾️',
    },
    {
      title: 'Compartir su Esencia',
      description:
        'Captura la personalidad única de tu gato. Desde su lado juguetón hasta sus momentos tranquilos, todo en un lugar.',
      emoji: '✨',
    },
    {
      title: '100% Gratuito',
      description:
        'Sin costos para crear el memorial de tu felino compañero. Acceso completo sin tarifas ocultas.',
      emoji: '💚',
    },
  ],
  features: [
    {
      title: 'Galería de Fotos',
      description:
        'Sube fotos de tu gato en diferentes momentos. Crea un álbum visual que capture su belleza y personalidad.',
      emoji: '📸',
    },
    {
      title: 'Historia Personalizada',
      description:
        'Comparte anécdotas sobre su carácter, sus manierismos y los momentos especiales que compartieron juntos.',
      emoji: '📖',
    },
    {
      title: 'Ubicación Significativa',
      description:
        'Coloca el memorial en un lugar que tenga significado. Visible en el mapa mundial de Forever Pet Friend.',
      emoji: '📍',
    },
    {
      title: 'Tributos Virtuales',
      description:
        'Recibe flores virtuales, velas y mensajes de otros que también han amado profundamente a sus gatos.',
      emoji: '🌸',
    },
    {
      title: 'Compartir en Redes Sociales',
      description:
        'Comparte el memorial en Facebook, Twitter o WhatsApp. Lleva el recuerdo de tu gato a tu comunidad.',
      emoji: '🔗',
    },
    {
      title: 'Control de Privacidad',
      description:
        'Decide si el memorial es visible públicamente o solo para personas con el enlace directo.',
      emoji: '🔒',
    },
  ],
  testimonialTitle: 'Historias de Amor con Nuestros Gatos',
  testimonials: [
    {
      name: 'Sofia Torres',
      text: 'Luna era mi compañera silenciosa durante 9 años. Este memorial me permitió compartir su historia con el mundo. Ver cómo otros recordaban su belleza fue muy especial.',
      pet: 'Luna - Siamés',
      location: 'Barcelona, España',
      emoji: '🐱',
    },
    {
      name: 'Javier Martínez',
      text: 'Milo fue mi primer gato. Cuando partió, necesitaba un lugar para procesar mi dolor. Este memorial se convirtió en ese espacio y ahora otros comparten su amor por él.',
      pet: 'Milo - Maine Coon',
      location: 'Valencia, España',
      emoji: '🐱',
    },
    {
      name: 'Martina López',
      text: 'Bella era una princesa felina que merecía ser recordada así. Su memorial en Forever Pet Friend es su palacio eterno. Hermoso.',
      pet: 'Bella - Persa',
      location: 'Madrid, España',
      emoji: '🐱',
    },
  ],
  faqs: [
    {
      question: '¿Es realmente gratis crear un memorial para mi gato?',
      answer:
        'Sí, 100% gratis. No hay cargos ni suscripciones. Tu gato puede tener un memorial permanente sin costo alguno.',
    },
    {
      question: '¿Cuánto tiempo durará el memorial de mi gato?',
      answer:
        'Para siempre. Tu gato permanecerá en nuestro cementerio virtual indefinidamente. Es una verdadera eternidad digital.',
    },
    {
      question: '¿Puedo compartir fotos y videos de mi gato?',
      answer:
        'Sí, puedes cargar múltiples fotos para crear una galería. Actualmente soportamos fotos; los videos estarán disponibles pronto.',
    },
    {
      question: '¿Qué pasa si quiero privacidad total?',
      answer:
        'Puedes crear un memorial privado que solo sea accesible mediante un enlace secreto que compartirás con quienes desees.',
    },
  ],
};

export default function CatsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Gatos',
            description:
              'Crea un memorial permanente para tu gato fallecido en nuestro cementerio virtual gratuito.',
            url: 'http://localhost:3000/pet-types/cats',
            mainEntity: {
              '@type': 'Service',
              name: 'Memorial Virtual para Gatos',
              description: 'Servicio de cementerio virtual para honrar la memoria de gatos fallecidos',
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
