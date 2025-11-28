import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Digital para Mascotas - Forever Pet Friend',
  description:
    'Solución digital para honrar tus mascotas. Crea un cementerio virtual seguro, accesible desde cualquier lugar del mundo.',
  keywords: 'cementerio digital mascotas, solución digital animales, memorial virtual mascotas, cementerio online',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Digital para Mascotas',
  subtitle: 'Tecnología que preserva el amor por tus compañeros',
  description:
    'Una solución digital completa para crear, compartir y mantener vivos los memoriales de tus mascotas queridas. Accesible desde cualquier dispositivo.',
  mainImage: 'https://images.unsplash.com/photo-1606214174585-fe31582dc1d4?q=80&w=2000',
  icon: '💻',
  keywords: ['Cementerio digital mascotas', 'Solución digital animales', 'Memorial virtual', 'Cementerio online'],
  benefits: [
    {
      title: 'Acceso Global',
      description: 'Accede desde cualquier dispositivo, en cualquier momento, desde cualquier lugar.',
      emoji: '🌍',
    },
    {
      title: 'Tecnología Segura',
      description: 'Tus memoriales están protegidos en servidores seguros.',
      emoji: '🔐',
    },
    {
      title: 'Actualizable Siempre',
      description: 'Agrega fotos y recuerdos nuevos en cualquier momento.',
      emoji: '✨',
    },
  ],
  features: [
    {
      title: 'Aplicación Web',
      description: 'Accede desde tu navegador, sin necesidad de descargar.',
      emoji: '🌐',
    },
    {
      title: 'Almacenamiento en la Nube',
      description: 'Tus fotos están guardadas en servidores seguros.',
      emoji: '☁️',
    },
    {
      title: 'Sincronización',
      description: 'Tus datos sincronizados en todos tus dispositivos.',
      emoji: '🔄',
    },
    {
      title: 'Copia de Seguridad',
      description: 'Tus memoriales están respaldados automáticamente.',
      emoji: '💾',
    },
    {
      title: 'Interfaz Intuitiva',
      description: 'Fácil de usar para todas las edades.',
      emoji: '👆',
    },
    {
      title: 'Integración Social',
      description: 'Comparte en redes sociales con un clic.',
      emoji: '📱',
    },
  ],
  testimonialTitle: 'Transformaciones Digitales de Recuerdos',
  testimonials: [
    {
      name: 'Roberto Jiménez',
      text: 'La solución digital de Forever Pet Friend es perfecta. Puedo visitar el memorial de mi mascota desde mi teléfono, en cualquier lugar.',
      pet: 'Rocky - Pastor Alemán',
      location: 'Ciudad de México, México',
      emoji: '💻',
    },
    {
      name: 'Isabella Romano',
      text: 'Mi familia está esparcida por el mundo. Este cementerio digital permite que todos recordemos a Muffin juntos.',
      pet: 'Muffin - Gato Angora',
      location: 'Roma, Italia',
      emoji: '💻',
    },
    {
      name: 'Fernando Gutierrez',
      text: 'La tecnología aquí es sencilla pero poderosa. No necesitas ser tech-savvy para criar un memorial hermoso.',
      pet: 'Chester - Dálmata',
      location: 'Medellín, Colombia',
      emoji: '💻',
    },
  ],
  faqs: [
    {
      question: '¿Necesito una aplicación para acceder?',
      answer: 'No, funciona perfectamente desde cualquier navegador web en tu computadora o teléfono.',
    },
    {
      question: '¿Mis datos están seguros?',
      answer: 'Sí, utilizamos encriptación y servidores seguros para proteger todos tus memoriales.',
    },
    {
      question: '¿Puedo acceder desde el móvil?',
      answer: 'Completamente, la plataforma es responsive y funciona perfecto en móviles.',
    },
    {
      question: '¿Hay límite de almacenamiento?',
      answer: 'No, puedes subir tantas fotos y recuerdos como necesites sin límites.',
    },
  ],
};

export default function DigitalServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Digital para Mascotas',
            url: 'http://localhost:3000/services/digital',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
