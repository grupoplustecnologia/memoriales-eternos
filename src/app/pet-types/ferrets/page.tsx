import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Hurones - Memorial Eterno | Forever Pet Friend',
  description:
    'Crea un memorial permanente para tu hurón. Honra la memoria de tu hurón travieso con fotos e historias en nuestro cementerio virtual.',
  keywords: 'cementerio virtual hurones, memorial hurones, hurón fallecido, memorial hurón online',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Virtual para Hurones',
  subtitle: 'Preserva la travesura y alegría de tu hurón amado',
  description:
    'Los hurones son compañeros juguetones y cariñosos. Crea un memorial permanente para honrar la alegría que tu hurón trajo a tu vida.',
  mainImage: 'https://images.unsplash.com/photo-1567359781514-3b963e2b04d6?q=80&w=2000',
  icon: '🐾',
  keywords: ['Cementerio virtual hurones', 'Memorial hurones', 'Hurón fallecido', 'Memorial hurón'],
  benefits: [
    {
      title: 'Memorial Divertido',
      description: 'Guarda los momentos traviesos y cariñosos de tu hurón.',
      emoji: '🎭',
    },
    {
      title: 'Recuerdos en Movimiento',
      description: 'Tu hurón fue energético, ahora será recordado eternamente.',
      emoji: '⚡',
    },
    {
      title: 'Comunidad de Amantes',
      description: 'Comparte con otros que amaban sus hurones como tú.',
      emoji: '💕',
    },
  ],
  features: [
    {
      title: 'Galería de Aventuras',
      description: 'Documenta todas las travesuras de tu hurón.',
      emoji: '📸',
    },
    {
      title: 'Historia Juguetona',
      description: 'Comparte los momentos más divertidos.',
      emoji: '🎪',
    },
    {
      title: 'Mapa de Recuerdos',
      description: 'Marca el lugar donde tu hurón fue más feliz.',
      emoji: '📍',
    },
    {
      title: 'Mensajes de Cariño',
      description: 'Recibe tributos de la comunidad de hurones.',
      emoji: '💌',
    },
    {
      title: 'Perfil Personalizado',
      description: 'Refleja la personalidad única de tu hurón.',
      emoji: '⭐',
    },
    {
      title: 'Conexión Global',
      description: 'Únete a amigos de hurones alrededor del mundo.',
      emoji: '🌍',
    },
  ],
  testimonialTitle: 'Memorias de Hurones Especiales',
  testimonials: [
    {
      name: 'Diego Fernández',
      text: 'Mi hurón Bandito fue un bromista. Su memorial aquí me ayuda a recordar sus travesuras diarias. ¡Qué falta me hace su compañía!',
      pet: 'Bandito - Hurón',
      location: 'Madrid, España',
      emoji: '🐾',
    },
    {
      name: 'Lucía Campos',
      text: 'Crea un espacio tan especial para Pelusa. Aunque se fue, sentir el apoyo de otros amantes de hurones ha sido reconfortante.',
      pet: 'Pelusa - Hurona',
      location: 'Guadalajara, México',
      emoji: '🐾',
    },
    {
      name: 'Roberto Gómez',
      text: 'Mis tres hurones fueron mis mejores amigos. Tenerlos juntos en este memorial es perfecto. Gracias por este espacio.',
      pet: 'Milo, Luna, Spark - Hurones',
      location: 'Barcelona, España',
      emoji: '🐾',
    },
  ],
  faqs: [
    {
      question: '¿Puedo crear un memorial compartido para múltiples hurones?',
      answer: 'Sí, puedes crear memoriales individuales o compartidos para honrar a todos tus hurones.',
    },
    {
      question: '¿El memorial será visible para otros usuarios?',
      answer: 'Puedes elegir si es público o privado completamente.',
    },
    {
      question: '¿Hay límite de fotos?',
      answer: 'No, puedes subir tantas fotos como desees para capturar todos los recuerdos.',
    },
    {
      question: '¿Puedo cambiar el memorial después de crearlo?',
      answer: 'Claro, puedes editar y actualizar el memorial en cualquier momento.',
    },
  ],
};

export default function FarretsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Hurones',
            url: 'http://localhost:3000/pet-types/ferrets',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
