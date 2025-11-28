import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Mascotas - Forever Pet Friend',
  description:
    'Un cementerio virtual seguro y duradero para honrar a tus mascotas fallecidas. Crea memoriales hermosos sin costos.',
  keywords: 'cementerio virtual mascotas, memorial mascotas fallecidas, cementerio digital, mascotas recordadas',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Virtual para Mascotas',
  subtitle: 'Un lugar eterno para recordar a tus amigos peludos',
  description:
    'Forever Pet Friend es el cementerio virtual donde todas las mascotas son honradas con dignidad. Crea un memorial seguro, hermoso y duradero.',
  mainImage: 'https://images.unsplash.com/photo-1602491543141-69f63fe1b7f9?q=80&w=2000',
  icon: '🏘️',
  keywords: ['Cementerio virtual mascotas', 'Memorial mascotas', 'Mascotas fallecidas', 'Recordar mascotas'],
  benefits: [
    {
      title: 'Duradero y Seguro',
      description: 'Tu memorial permanecerá para siempre en un lugar seguro.',
      emoji: '🛡️',
    },
    {
      title: 'Para Todas las Mascotas',
      description: 'Perros, gatos, pájaros, roedores y más. Todos son bienvenidos.',
      emoji: '🐾',
    },
    {
      title: '100% Gratuito',
      description: 'No hay costos ocultos. Honra a tu mascota sin gastos.',
      emoji: '💚',
    },
  ],
  features: [
    {
      title: 'Galería de Fotos',
      description: 'Carga todas las fotos preciosas de tu mascota.',
      emoji: '📸',
    },
    {
      title: 'Historia Personal',
      description: 'Comparte la historia única de tu compañero.',
      emoji: '📖',
    },
    {
      title: 'Ubicación en Mapa',
      description: 'Coloca el memorial en un lugar significativo.',
      emoji: '📍',
    },
    {
      title: 'Recibe Tributos',
      description: 'Mensajes y flores virtuales de la comunidad.',
      emoji: '🌹',
    },
    {
      title: 'Comparte en Redes',
      description: 'Spread the love de tu mascota en Internet.',
      emoji: '🔗',
    },
    {
      title: 'Privacidad Total',
      description: 'Tú controlas quién ve el memorial.',
      emoji: '🔒',
    },
  ],
  testimonialTitle: 'Historias de Mascotas Recordadas',
  testimonials: [
    {
      name: 'Andrea López',
      text: 'Encontré este sitio cuando Barco falleció. No sabía qué hacer con mi dolor. Crear su memorial me ayudó a procesar y honrar su memoria.',
      pet: 'Barco - Labrador Golden',
      location: 'Santiago, Chile',
      emoji: '🐾',
    },
    {
      name: 'Miguel Santos',
      text: 'Forever Pet Friend es más que un sitio. Es una comunidad que entiende que perder una mascota es perder un familiar.',
      pet: 'Whiskers - Gato Persa',
      location: 'Santo Domingo, República Dominicana',
      emoji: '🐾',
    },
    {
      name: 'Carla Bergara',
      text: 'Seis años después, todavía visito el memorial de mis perros. Es confortante saber que viven eternamente aquí.',
      pet: 'Max y Luna - Pastores Alemanes',
      location: 'Montevideo, Uruguay',
      emoji: '🐾',
    },
  ],
  faqs: [
    {
      question: '¿Es realmente gratuito?',
      answer: 'Sí, completamente gratuito. Sin cargos, sin suscripción. Eternamente gratis.',
    },
    {
      question: '¿Cuánto tiempo dura el memorial?',
      answer: 'Para siempre. Tu mascota será recordada eternamente en Forever Pet Friend.',
    },
    {
      question: '¿Qué sucede si olvido mi contraseña?',
      answer: 'Puedes recuperarla fácilmente. Tu memorial siempre estará protegido.',
    },
    {
      question: '¿Puedo compartir el memorial con familia y amigos?',
      answer: 'Claro, puedes generar un enlace y compartir con quien desees.',
    },
  ],
};

export default function GenericServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Mascotas',
            url: 'http://localhost:3000/services/generic',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
