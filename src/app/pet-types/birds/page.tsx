import { Metadata } from 'next';
import { LandingPageTemplate } from '@/components/landingpages/LandingPageTemplate';

export const metadata: Metadata = {
  title: 'Cementerio Virtual para Aves - Memorial Eterno | Forever Pet Friend',
  description:
    'Crea un memorial permanente para tu ave. Honra la memoria de tu pájaro con fotos e historias en nuestro cementerio virtual.',
  keywords: 'cementerio virtual aves, memorial pájaros, pájaro fallecido, memorial aves online',
  robots: { index: true, follow: true },
};

const pageData = {
  title: 'Cementerio Virtual para Aves',
  subtitle: 'Preserva el canto eterno de tu compañero alado',
  description:
    'Las aves traen música y color a nuestras vidas. Crea un memorial permanente para tu ave querida y comparte su encanto con el mundo.',
  mainImage: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=2000',
  icon: '🦜',
  keywords: ['Cementerio virtual aves', 'Memorial pájaros', 'Pájaro fallecido', 'Memorial aves'],
  benefits: [
    {
      title: 'Memorial Eterno',
      description: 'El canto de tu ave vivirá para siempre en nuestro cementerio.',
      emoji: '🎵',
    },
    {
      title: 'Captura su Belleza',
      description: 'Documenta los colores y momentos especiales de tu pájaro.',
      emoji: '✨',
    },
    {
      title: '100% Gratuito',
      description: 'Sin costos. Tu ave merece un memorial sin tarifas.',
      emoji: '💚',
    },
  ],
  features: [
    {
      title: 'Galería de Fotos',
      description: 'Muestra la belleza y colorido de tu ave.',
      emoji: '📸',
    },
    {
      title: 'Historia Personal',
      description: 'Comparte el carácter único de tu compañero.',
      emoji: '📖',
    },
    {
      title: 'Ubicación en Mapa',
      description: 'Coloca el memorial en un lugar especial.',
      emoji: '📍',
    },
    {
      title: 'Tributos Virtuales',
      description: 'Recibe mensajes de otros amantes de aves.',
      emoji: '🌸',
    },
    {
      title: 'Compartir en Línea',
      description: 'Comparte en redes sociales fácilmente.',
      emoji: '🔗',
    },
    {
      title: 'Privacidad Controlada',
      description: 'Elige quién puede ver el memorial.',
      emoji: '🔒',
    },
  ],
  testimonialTitle: 'Historias de Aves Queridas',
  testimonials: [
    {
      name: 'Carmen Rodríguez',
      text: 'Coco cantaba cada mañana. Este memorial honra su voz y su alegría. Ver otros recordarlo ha sido muy hermoso.',
      pet: 'Coco - Loro Amazónico',
      location: 'Buenos Aires, Argentina',
      emoji: '🦜',
    },
    {
      name: 'Marco Rossi',
      text: 'Piolin fue mi compañero musical durante 15 años. Su memorial aquí es como conservar su canto.',
      pet: 'Piolin - Canario',
      location: 'Roma, Italia',
      emoji: '🦜',
    },
    {
      name: 'Sophie Martin',
      text: 'Mi loro era mi mejor amigo. Poder compartir anécdotas divertidas de él en este memorial es sanador.',
      pet: 'Rey - Cacatúa',
      location: 'París, Francia',
      emoji: '🦜',
    },
  ],
  faqs: [
    {
      question: '¿Cuál es el costo de crear un memorial para mi ave?',
      answer: 'Es totalmente gratuito. Sin cargos ni tarifas ocultas.',
    },
    {
      question: '¿El memorial será permanente?',
      answer: 'Sí, tu ave será recordada para siempre en nuestro cementerio virtual.',
    },
    {
      question: '¿Puedo subir videos de mi ave?',
      answer: 'Actualmente soportamos fotos. Los videos estarán disponibles próximamente.',
    },
    {
      question: '¿Cómo controlo la privacidad?',
      answer: 'Puedes hacer el memorial público o privado según tus preferencias.',
    },
  ],
};

export default function BirdsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cementerio Virtual para Aves',
            url: 'http://localhost:3000/pet-types/birds',
          }),
        }}
      />
      <LandingPageTemplate {...pageData} />
    </>
  );
}
