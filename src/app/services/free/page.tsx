import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual Gratis para Mascotas - Forever Pet Friend',
  description:
    'Crea memoriales para tus mascotas completamente gratis. Sin cargos ocultos, sin suscripciones. Honra a tu mascota sin gastos.',
  keywords: 'cementerio gratis mascotas, memorial gratuito, cementerio sin costo, homenaje mascotas gratis',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Virtual Gratis',
  subtitle: 'Honor sin costo a tus mascotas queridas',
  description:
    'Forever Pet Friend ofrece el único cementerio virtual completamente gratuito. Sin tarifas, sin suscripciones, sin sorpresas. Honra a tu mascota con dignidad.',
  mainImage: 'https://images.unsplash.com/photo-1600587350286-a2fd8b4bbfb8?q=80&w=2000',
  icon: '💚',
  keywords: ['Cementerio gratis mascotas', 'Memorial gratuito', 'Sin costo', 'Honra gratis'],
  benefits: [
    {
      title: '100% Gratis',
      description: 'Ningún costo, nunca. Tu mascota merece honor sin tarifas.',
      emoji: '💚',
    },
    {
      title: 'Sin Suscripción',
      description: 'Crea y mantén memoriales sin pagar mensualidades.',
      emoji: '❌',
    },
    {
      title: 'Completo y Permanente',
      description: 'Acceso total a todas las funciones, para siempre.',
      emoji: '✅',
    },
  ],
  features: [
    {
      title: 'Galería Ilimitada',
      description: 'Sube tantas fotos como desees sin límites.',
      emoji: '📸',
    },
    {
      title: 'Historia Completa',
      description: 'Escribe todo lo que quieras sobre tu mascota.',
      emoji: '📖',
    },
    {
      title: 'Mapa Gratuito',
      description: 'Ubicación en nuestro mapa mundial sin costo.',
      emoji: '📍',
    },
    {
      title: 'Tributos Gratis',
      description: 'Envía y recibe tributos virtuales sin pagar.',
      emoji: '🌷',
    },
    {
      title: 'Actualizaciones Libres',
      description: 'Agrega recuerdos nuevos cuando quieras.',
      emoji: '➕',
    },
    {
      title: 'Eternidad Gratuita',
      description: 'Tu memorial vivirá para siempre sin costo.',
      emoji: '♾️',
    },
  ],
  testimonialTitle: 'Memoriales Creados sin Costo',
  testimonials: [
    {
      name: 'Carlos Mendoza',
      text: 'No tenía dinero para servicios funerarios. Forever Pet Friend fue perfecto: un memorial hermoso para Luna, completamente gratis.',
      pet: 'Luna - Gata Siamesa',
      location: 'Asunción, Paraguay',
      emoji: '💚',
    },
    {
      name: 'Mariana Gómez',
      text: 'Pensé que tendría que pagar. ¡No! Crearé memoriales para todos mis animales sin gastar nada. Es increíble.',
      pet: 'Múltiples mascotas',
      location: 'Quito, Ecuador',
      emoji: '💚',
    },
    {
      name: 'David Santos',
      text: 'En época de crisis, no quería dejar de honrar a mi perro por falta de dinero. Gracias Forever Pet Friend por ser gratis.',
      pet: 'Rex - Pastor Australiano',
      location: 'Cartagena, Colombia',
      emoji: '💚',
    },
  ],
  faqs: [
    {
      question: '¿Por qué es completamente gratis?',
      answer: 'Creemos que honrar a las mascotas no debe depender del dinero. Queremos que todos tengan acceso.',
    },
    {
      question: '¿Nunca me cobrarán?',
      answer: 'Nunca. Forever Pet Friend será siempre gratuito. Sin excepciones, sin sorpresas.',
    },
    {
      question: '¿Hay publicidades en el memorial?',
      answer: 'No, tu memorial no tiene anuncios que lo interrumpan.',
    },
    {
      question: '¿Puedo donar si quiero apoyar?',
      answer: 'Aceptamos donaciones voluntarias de quienes deseen apoyar nuestra misión, pero nunca serán obligatorias.',
    },
  ],
};

export default function FreeServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual Gratis para Mascotas',
            url: 'http://localhost:3000/services/free',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
