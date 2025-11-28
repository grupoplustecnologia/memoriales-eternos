import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Hámsteres - Memorial Eterno | Forever Pet Friend',
  description:
    'Crea un memorial permanente para tu hámster. Honra la memoria de tu pequeño amigo con fotos e historias en nuestro cementerio virtual.',
  keywords: 'cementerio virtual hámsteres, memorial hámster, hámster fallecido, memorial hámster online',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Virtual para Hámsteres',
  subtitle: 'Pequeñas mascotas, grandes recuerdos eternos',
  description:
    'Aunque pequeños, los hámsteres dejaron huella grande en nuestros corazones. Crea un memorial para honrar a tu compañero diminuto.',
  mainImage: 'https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f0?q=80&w=2000',
  icon: '🐹',
  keywords: ['Cementerio virtual hámsteres', 'Memorial hámster', 'Hámster fallecido', 'Memorial pequeños mamíferos'],
  benefits: [
    {
      title: 'Recuerdos Grandes',
      description: 'Aunque pequeño, tu hámster fue especial. Mérece un memorial eterno.',
      emoji: '💝',
    },
    {
      title: 'Galería de Ternura',
      description: 'Captura todos los momentos adorables de tu pequeño amigo.',
      emoji: '🥰',
    },
    {
      title: 'Comunidad Comprensiva',
      description: 'Otros entienden que los pequeños dejan huellas enormes.',
      emoji: '🤝',
    },
  ],
  features: [
    {
      title: 'Fotos en Close-up',
      description: 'Destaca la ternura de tu hámster en cada foto.',
      emoji: '📸',
    },
    {
      title: 'Historia del Pequeño',
      description: 'Comparte anécdotas de tu diminuto compañero.',
      emoji: '📚',
    },
    {
      title: 'Ubicación en Mapa',
      description: 'Marca el lugar donde fue más feliz.',
      emoji: '📍',
    },
    {
      title: 'Flores Virtuales',
      description: 'Recibe tributos de la comunidad.',
      emoji: '🌷',
    },
    {
      title: 'Registro de Vida',
      description: 'Documenta cada etapa de su vida.',
      emoji: '📖',
    },
    {
      title: 'Conexión de Amigos',
      description: 'Conecta con otros amantes de hámsteres.',
      emoji: '💬',
    },
  ],
  testimonialTitle: 'Historias de Pequeños Gigantes',
  testimonials: [
    {
      name: 'Daniela López',
      text: 'Pompón fue mi primer hámster. Era tan pequeño pero tan amado. Gracias por este lugar donde puedo recordarlo siempre.',
      pet: 'Pompón - Hámster Sirio',
      location: 'Bogotá, Colombia',
      emoji: '🐹',
    },
    {
      name: 'Carlos Mendes',
      text: 'Mis hijos querían a su hámster Bolt como si fuera un perro. Este memorial les ayuda a procesar su pérdida.',
      pet: 'Bolt - Hámster Enano',
      location: 'São Paulo, Brasil',
      emoji: '🐹',
    },
    {
      name: 'Marta González',
      text: 'Flor fue mi hámster durante cinco años. Un memorial tan bonito para alguien tan pequeño pero tan importante.',
      pet: 'Flor - Hámster Sirio',
      location: 'Valencia, España',
      emoji: '🐹',
    },
  ],
  faqs: [
    {
      question: '¿Vale la pena crear un memorial para un hámster?',
      answer: 'Absolutamente. Cada mascota, sin importar tamaño, merece ser recordada con amor.',
    },
    {
      question: '¿Cuánto tiempo vive un hámster en el memorial?',
      answer: 'Para siempre. Tu hámster será recordado eternamente en Forever Pet Friend.',
    },
    {
      question: '¿Otros pueden dejar mensajes para mi hámster?',
      answer: 'Sí, si haces el memorial público, otros pueden enviar tributos y mensajes de cariño.',
    },
    {
      question: '¿Puedo hacer el memorial privado?',
      answer: 'Claro, puedes mantener el memorial solo para ti o compartirlo cuando desees.',
    },
  ],
};

export default function HamstersLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Hámsteres',
            url: 'http://localhost:3000/pet-types/hamsters',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
