import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Mascotas Fallecidas - Forever Pet Friend',
  description:
    'Honra a tu mascota fallecida con un memorial eterno. Compartir historias, fotos y recuerdos de tus animales queridos.',
  keywords: 'mascotas fallecidas, perro muerto, gato fallecido, animal fallecido, memorial mascota',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Honra a Tus Mascotas Fallecidas',
  subtitle: 'El amor por nuestras mascotas nunca muere',
  description:
    'Cuando una mascota fallece, el dolor es real. Forever Pet Friend ofrece un espacio para honrar, recordar y procesar el duelo.',
  mainImage: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?q=80&w=2000',
  icon: '🌈',
  keywords: ['Mascotas fallecidas', 'Perro muerto', 'Gato fallecido', 'Memorial mascota', 'Duelo mascota'],
  benefits: [
    {
      title: 'Procesa tu Duelo',
      description: 'Crea un espacio seguro para expresar tu dolor y amor.',
      emoji: '💔',
    },
    {
      title: 'Memoria Eterna',
      description: 'Tu mascota vivirá para siempre en el corazón y en nuestro sitio.',
      emoji: '❤️',
    },
    {
      title: 'Comunidad que Entiende',
      description: 'Otros entienden el dolor de perder una mascota querida.',
      emoji: '🤗',
    },
  ],
  features: [
    {
      title: 'Página de Duelo',
      description: 'Un espacio dedicado para honrar a tu mascota fallecida.',
      emoji: '📄',
    },
    {
      title: 'Cronología de Vida',
      description: 'Documenta desde su nacimiento hasta sus últimos días.',
      emoji: '📅',
    },
    {
      title: 'Galería de Recuerdos',
      description: 'Carga todas las fotos especiales de tu mascota.',
      emoji: '🖼️',
    },
    {
      title: 'Mensaje de Despedida',
      description: 'Escribe un último adiós a tu compañero amado.',
      emoji: '💝',
    },
    {
      title: 'Libro de Condolencias',
      description: 'Otros pueden enviar mensajes de apoyo.',
      emoji: '📖',
    },
    {
      title: 'Ritual Virtual',
      description: 'Realiza un ritual de despedida en el memorial.',
      emoji: '🕯️',
    },
  ],
  testimonialTitle: 'Historias de Duelo y Sanación',
  testimonials: [
    {
      name: 'Gabriela Morales',
      text: 'Cuando Toby falleció, no sabía cómo continuar. Este memorial me permitió expresar mi dolor. Ahora puedo visitarlo cuando lo extraño.',
      pet: 'Toby - Springer Spaniel fallecido',
      location: 'Bogotá, Colombia',
      emoji: '🌈',
    },
    {
      name: 'Javier Quispe',
      text: 'La muerte de Mittens fue devastadora. Leer mensajes de otros en su memorial me mostró que no estaba solo en mi pena.',
      pet: 'Mittens - Gata fallecida',
      location: 'Cusco, Perú',
      emoji: '🌈',
    },
    {
      name: 'Catalina Fuentes',
      text: 'Tres años después de perder a mi perro, este memorial sigue siendo mi lugar favorito para recordarlo. Es como visitarlo cada día.',
      pet: 'Charlie - Perro fallecido hace 3 años',
      location: 'Puerto Montt, Chile',
      emoji: '🌈',
    },
  ],
  faqs: [
    {
      question: '¿Cuándo debo crear el memorial?',
      answer: 'Cuando estés listo. Algunos lo hacen inmediatamente, otros después de procesar el duelo. No hay prisa.',
    },
    {
      question: '¿Puedo eliminar el memorial después?',
      answer: 'Sí, pero lo mantenemos a menos que lo solicites. La mayoría prefiere mantenerlo como un lugar para recordar.',
    },
    {
      question: '¿Puedo editar el memorial después de crearlo?',
      answer: 'Completamente. Puedes actualizar, agregar fotos, historias nuevas en cualquier momento.',
    },
    {
      question: '¿Es terapéutico crear un memorial?',
      answer: 'Muchos usuarios dicen que sí. Honrar a tu mascota puede ser parte importante del proceso de duelo.',
    },
  ],
};

export default function DeceasedServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Mascotas Fallecidas',
            url: 'http://localhost:3000/services/deceased',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
