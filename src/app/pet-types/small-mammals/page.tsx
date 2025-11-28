import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Pequeños Mamíferos - Memorial Eterno | Forever Pet Friend',
  description:
    'Crea un memorial permanente para tu pequeño mamífero. Honra la memoria de tu roedor o pequeña mascota con fotos e historias en nuestro cementerio virtual.',
  keywords: 'cementerio virtual pequeños mamíferos, memorial roedores, mascota pequeña fallecida, memorial online',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Virtual para Pequeños Mamíferos',
  subtitle: 'Cada pequeña vida deja una huella infinita',
  description:
    'Conejillos de indias, chinchillas, ardillas... Todos merecen ser recordados. Crea un memorial para honrar a tu pequeño amigo.',
  mainImage: 'https://images.unsplash.com/photo-1535241749838-299277b6305a?q=80&w=2000',
  icon: '🐭',
  keywords: ['Cementerio pequeños mamíferos', 'Memorial roedores', 'Conejillo de indias fallecido', 'Memorial chinchillas'],
  benefits: [
    {
      title: 'Merecen Ser Recordados',
      description: 'Cada pequeña mascota es especial. Merece un memorial eterno.',
      emoji: '❤️',
    },
    {
      title: 'Capturas Su Esencia',
      description: 'Documenta la belleza y carácter de tu pequeño mamífero.',
      emoji: '📷',
    },
    {
      title: 'Comunidad Cuidadosa',
      description: 'Únete a personas que aman a sus pequeñas mascotas.',
      emoji: '🌟',
    },
  ],
  features: [
    {
      title: 'Galería Especial',
      description: 'Muestra todos los momentos tiernos de tu pequeño.',
      emoji: '📸',
    },
    {
      title: 'Perfil Personalizado',
      description: 'Comparte la personalidad de tu mascota.',
      emoji: '🎨',
    },
    {
      title: 'Ubicación en Mapa',
      description: 'Marca dónde fue más feliz tu pequeño amigo.',
      emoji: '🗺️',
    },
    {
      title: 'Mensajes de Apoyo',
      description: 'Recibe tributos de la comunidad global.',
      emoji: '💌',
    },
    {
      title: 'Cronología de Vida',
      description: 'Registra cada momento especial compartido.',
      emoji: '📅',
    },
    {
      title: 'Permanencia Garantizada',
      description: 'Tu mascota será recordada para siempre.',
      emoji: '♾️',
    },
  ],
  testimonialTitle: 'Grandes Amor por Pequeños Compañeros',
  testimonials: [
    {
      name: 'Alejandra Ríos',
      text: 'Mi conejillo de indias Nube fue mi confidente durante siete años. Este memorial lo mantiene vivo en mi corazón.',
      pet: 'Nube - Conejillo de Indias',
      location: 'Lima, Perú',
      emoji: '🐭',
    },
    {
      name: 'Javier Moreno',
      text: 'Llevaba años viendo memorial de Tigre, mi chinchilla. Saber que otros recuerdan a mi pequeño amigo es muy especial.',
      pet: 'Tigre - Chinchilla',
      location: 'Sevilla, España',
      emoji: '🐭',
    },
    {
      name: 'Patricia Silva',
      text: 'Tuve tres generaciones de conejillos. Tenerlos todos aquí, juntos, es como reunir a mi familia pequeña.',
      pet: 'Múltiples Conejillos de Indias',
      location: 'Caracas, Venezuela',
      emoji: '🐭',
    },
  ],
  faqs: [
    {
      question: '¿Acepta todas las especies de pequeños mamíferos?',
      answer: 'Sí, chinchillas, conejillos de indias, ardillas, deguús, y cualquier pequeño mamífero.',
    },
    {
      question: '¿Cuál es el proceso para crear un memorial?',
      answer: 'Es simple: crea tu cuenta, sube fotos, escribe la historia de tu mascota, y listo.',
    },
    {
      question: '¿Puedo crear múltiples memoriales?',
      answer: 'Absolutamente, para cada una de tus pequeñas mascotas fallecidas.',
    },
    {
      question: '¿Mi información personal será protegida?',
      answer: 'Sí, tu privacidad es importante. Controlas exactamente qué se comparte.',
    },
  ],
};

export default function SmallMammalsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Pequeños Mamíferos',
            url: 'http://localhost:3000/pet-types/small-mammals',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
