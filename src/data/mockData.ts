import type { AnimalProfile, Tribute } from '@/types';

export const mockProfiles: AnimalProfile[] = [
  // Demo User 1: Huella Eterna (Free)
  {
    id: 'demo-profile-001',
    userId: 'demo-user-001',
    name: 'Lucas',
    animalType: 'perro',
    breed: 'Labrador Retriever',
    birthDate: '2015-05-20',
    deathDate: '2023-10-15',
    latitude: 40.4168,
    longitude: -3.7038,
    photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
    story: 'Lucas fue nuestro compañero de aventuras durante 8 años. Cada amanecer salíamos a correr juntos. Era el protector de la familia y siempre estaba listo para cualquier actividad.',
    epitaph: 'Corriste libre, corriste fuerte. Siempre en nuestro corazón.',
    createdAt: '2023-10-20',
    gallery: [
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'
    ]
  },
  {
    id: 'demo-profile-002',
    userId: 'demo-user-001',
    name: 'Miau',
    animalType: 'gato',
    breed: 'Gato Doméstico',
    birthDate: '2014-03-10',
    deathDate: '2024-01-08',
    latitude: 40.4200,
    longitude: -3.7000,
    photoUrl: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
    story: 'Miau llegó como un gatito perdido hace 10 años y conquistó nuestro hogar. Siempre dormía en mis pies. Un gato especial que deja un vacío difícil de llenar.',
    epitaph: 'Miau de nuestro hogar, siempre en nuestros recuerdos.',
    createdAt: '2024-01-15'
  },
  {
    id: 'demo-profile-003',
    userId: 'demo-user-001',
    name: 'Birdy',
    animalType: 'ave',
    breed: 'Canario',
    birthDate: '2018-06-12',
    deathDate: '2023-09-30',
    latitude: 40.4100,
    longitude: -3.7100,
    photoUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
    story: 'Birdy cantaba cada mañana. Su melodía nos despertaba con alegría. Era pequeño pero su presencia llenaba toda la casa.',
    epitaph: 'Tu canto sigue vivo en nuestro hogar.',
    createdAt: '2023-10-05'
  },

  // Demo User 2: Cielo de Estrellas (Premium - 3 momentos especiales)
  {
    id: 'demo-profile-004',
    userId: 'demo-user-002',
    name: 'Rey',
    animalType: 'perro',
    breed: 'Pastor Alemán',
    birthDate: '2012-09-14',
    deathDate: '2023-12-20',
    latitude: 51.5074,
    longitude: -0.1278,
    photoUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
    story: 'Rey fue mi guardaespaldas, mi amigo, mi héroe. Durante 11 años protegió a nuestra familia sin descanso. Su lealtad fue inquebrantable y su amor incondicional nos enseñó el verdadero significado de la amistad.',
    epitaph: 'Guerrero valiente que descansa en la eternidad.',
    createdAt: '2024-01-01',
    gallery: [
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
      'https://images.unsplash.com/photo-1547867881-7d1d6cda2f50?w=400',
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400'
    ]
  },
  {
    id: 'demo-profile-005',
    userId: 'demo-user-002',
    name: 'Princesa',
    animalType: 'gato',
    breed: 'Persa Blanco',
    birthDate: '2013-11-05',
    deathDate: '2024-02-14',
    latitude: 51.5100,
    longitude: -0.1200,
    photoUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400',
    story: 'Princesa era elegancia pura. Su pelaje blanco como la nieve y sus ojos azules nos cautivaban. Era mimada, claro, porque lo merecía. 11 años juntos que nunca olvidaremos.',
    epitaph: 'La reina de nuestro hogar, princesa de nuestros corazones.',
    createdAt: '2024-02-20',
    gallery: [
      'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400'
    ]
  },
  {
    id: 'demo-profile-006',
    userId: 'demo-user-002',
    name: 'Loro',
    animalType: 'ave',
    breed: 'Loro Africano Gris',
    birthDate: '2008-04-20',
    deathDate: '2023-11-10',
    latitude: 51.5050,
    longitude: -0.1300,
    photoUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
    story: 'Loro fue nuestro profesor de idiomas. Aprendía frases, bromeaba y nos hacía reír. 15 años compartiendo risas. Su inteligencia fue impresionante.',
    epitaph: 'Tu risa nos acompaña en cada momento.',
    createdAt: '2023-11-15'
  },

  // Demo User 3: Santuario Premium (6 momentos especiales + estadísticas)
  {
    id: 'demo-profile-007',
    userId: 'demo-user-003',
    name: 'Simba',
    animalType: 'perro',
    breed: 'Husky Siberiano',
    birthDate: '2010-08-22',
    deathDate: '2023-08-05',
    latitude: 37.7749,
    longitude: -122.4194,
    photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    story: 'Simba fue el rey de nuestro hogar. Con sus ojos azules hipnotizantes conquistó a todos. 13 años de alegría, aventuras y amor incondicional. Fue el corazón de la familia.',
    epitaph: 'Rey de reyes, amor eterno en nuestros corazones.',
    createdAt: '2023-08-10',
    gallery: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      'https://images.unsplash.com/photo-1546527868-ccfd7ee50d55?w=400',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'
    ]
  },
  {
    id: 'demo-profile-008',
    userId: 'demo-user-003',
    name: 'Whiskers',
    animalType: 'gato',
    breed: 'Maine Coon',
    birthDate: '2011-02-14',
    deathDate: '2024-03-01',
    latitude: 37.7800,
    longitude: -122.4150,
    photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    story: 'Whiskers fue nuestro gigante gentil. Un Maine Coon de 7 kg de amor puro. Le encantaba los abrazos y ronroneaba todo el día. 12 años de felicidad absoluta con este maravilloso gato.',
    epitaph: 'Gigante de estatura, más grande de amor.',
    createdAt: '2024-03-05',
    gallery: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      'https://images.unsplash.com/photo-1506755855726-78798ff68ff2?w=400'
    ]
  },
  {
    id: 'demo-profile-009',
    userId: 'demo-user-003',
    name: 'Kiwi',
    animalType: 'ave',
    breed: 'Guacamayo',
    birthDate: '2000-10-05',
    deathDate: '2023-07-20',
    latitude: 37.7700,
    longitude: -122.4250,
    photoUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
    story: 'Kiwi fue nuestro loro milenial. ¡23 años! Vio crecer a la familia, cambios en la tecnología y revoluciones sociales. Su sabiduría era evidente en cada interacción.',
    epitaph: 'Sabia como el tiempo, eterna en nuestros recuerdos.',
    createdAt: '2023-07-25'
  },

  // Existing profiles (mantener algunos de los anteriores)
  {
    id: '1',
    userId: 'user1',
    name: 'Max',
    animalType: 'perro',
    breed: 'Golden Retriever',
    birthDate: '2010-03-15',
    deathDate: '2023-08-22',
    latitude: 40.4168,
    longitude: -3.7038,
    photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
    story: 'Max fue mi compañero fiel durante 13 años. Siempre alegre, siempre leal. Nos acompañó en cada aventura familiar y dejó huellas imborrables en nuestros corazones.',
    epitaph: 'El mejor amigo que pudimos tener. Te extrañamos cada día.',
    createdAt: '2023-09-01',
    gallery: [
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'
    ]
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Luna',
    animalType: 'gato',
    breed: 'Siamés',
    birthDate: '2015-07-10',
    deathDate: '2024-01-15',
    latitude: 41.3851,
    longitude: 2.1734,
    photoUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400',
    story: 'Luna llegó a nuestras vidas como una pequeña bola de pelo. Su elegancia y personalidad única iluminaron nuestro hogar. Era independiente pero cariñosa, y siempre sabía cuándo necesitábamos su compañía.',
    epitaph: 'Nuestra pequeña reina, siempre en nuestros corazones.',
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Rocky',
    animalType: 'perro',
    breed: 'Pastor Alemán',
    birthDate: '2012-05-20',
    deathDate: '2023-11-30',
    latitude: 51.5074,
    longitude: -0.1278,
    photoUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
    story: 'Rocky fue nuestro protector, nuestro guardián. Valiente y leal hasta el final. Cuidó de nuestra familia con amor incondicional y nos enseñó el verdadero significado de la lealtad.',
    epitaph: 'Un guerrero noble que descansa en paz.',
    createdAt: '2023-12-05'
  },
  {
    id: '4',
    userId: 'user4',
    name: 'Coco',
    animalType: 'ave',
    breed: 'Loro Amazónico',
    birthDate: '2005-02-14',
    deathDate: '2023-10-10',
    latitude: -34.6037,
    longitude: -58.3816,
    photoUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
    story: 'Coco nos acompañó durante 18 maravillosos años. Su canto alegre llenaba la casa cada mañana. Era parlanchín, inteligente y un miembro más de la familia.',
    epitaph: 'Tu canto vivirá siempre en nuestros recuerdos.',
    createdAt: '2023-10-15'
  },
  {
    id: '5',
    userId: 'user5',
    name: 'Bella',
    animalType: 'gato',
    breed: 'Persa',
    birthDate: '2016-09-05',
    deathDate: '2024-03-20',
    latitude: 48.8566,
    longitude: 2.3522,
    photoUrl: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
    story: 'Bella era pura elegancia y dulzura. Su pelaje suave y sus ojos azules cautivaban a todos. Nos dio tanto amor y momentos de paz inolvidables.',
    epitaph: 'Descansa en paz, hermosa princesa.',
    createdAt: '2024-03-25'
  }
];

export const mockTributes: Tribute[] = [
  // Tributes for Demo User 1's profiles
  {
    id: 't-demo-001',
    profileId: 'demo-profile-001',
    visitorName: 'Cielo de Estrellas',
    tributeType: 'flower',
    message: 'Lucas fue un perro hermoso. Puedo ver el amor que le tenían. Que descanse en paz.',
    createdAt: '2023-10-22'
  },
  {
    id: 't-demo-002',
    profileId: 'demo-profile-001',
    visitorName: 'Santuario Premium',
    tributeType: 'candle',
    message: 'Los labradores como Lucas son especiales. Enviamos nuestro cariño.',
    createdAt: '2023-10-25'
  },
  {
    id: 't-demo-003',
    profileId: 'demo-profile-002',
    visitorName: 'Cielo de Estrellas',
    tributeType: 'flower',
    message: 'Miau era hermoso. Los gatos dejan un vacío especial cuando se van.',
    createdAt: '2024-01-20'
  },

  // Tributes for Demo User 2's profiles
  {
    id: 't-demo-004',
    profileId: 'demo-profile-004',
    visitorName: 'Huella Eterna',
    tributeType: 'candle',
    message: 'Rey fue un héroe. Su valor inspira.',
    createdAt: '2024-01-05'
  },
  {
    id: 't-demo-005',
    profileId: 'demo-profile-004',
    visitorName: 'Santuario Premium',
    tributeType: 'flower',
    message: 'Un perro como Rey es para toda la vida. Que descanse en gloria.',
    createdAt: '2024-01-08'
  },
  {
    id: 't-demo-006',
    profileId: 'demo-profile-005',
    visitorName: 'Santuario Premium',
    tributeType: 'flower',
    message: 'Princesa tenía una elegancia especial. Descansa en paz, reina.',
    createdAt: '2024-02-20'
  },
  {
    id: 't-demo-007',
    profileId: 'demo-profile-006',
    visitorName: 'Huella Eterna',
    tributeType: 'candle',
    message: 'Los loros inteligentes como Loro son raros. Gracias por compartir su historia.',
    createdAt: '2023-11-18'
  },

  // Tributes for Demo User 3's profiles
  {
    id: 't-demo-008',
    profileId: 'demo-profile-007',
    visitorName: 'Huella Eterna',
    tributeType: 'flower',
    message: 'Simba fue un rey de verdad. Sus ojos azules son inolvidables.',
    createdAt: '2023-08-15'
  },
  {
    id: 't-demo-009',
    profileId: 'demo-profile-007',
    visitorName: 'Cielo de Estrellas',
    tributeType: 'candle',
    message: 'Los Huskies son especiales. Simba fue un privilegio verlo.',
    createdAt: '2023-08-18'
  },
  {
    id: 't-demo-010',
    profileId: 'demo-profile-007',
    visitorName: 'Cielo de Estrellas',
    tributeType: 'flower',
    message: 'Simba es la razón por la que amamos esta plataforma. Gracias por crear un lugar para él.',
    createdAt: '2023-08-20'
  },
  {
    id: 't-demo-011',
    profileId: 'demo-profile-008',
    visitorName: 'Huella Eterna',
    tributeType: 'candle',
    message: 'Whiskers fue un Maine Coon espectacular. Qué gentil.',
    createdAt: '2024-03-10'
  },
  {
    id: 't-demo-012',
    profileId: 'demo-profile-009',
    visitorName: 'Huella Eterna',
    tributeType: 'flower',
    message: '¡23 años! Kiwi fue una leyenda. Saluda a los eternos.',
    createdAt: '2023-07-28'
  },
  {
    id: 't-demo-013',
    profileId: 'demo-profile-009',
    visitorName: 'Cielo de Estrellas',
    tributeType: 'candle',
    message: 'Un loro que vivió casi un cuarto de siglo es inspiración. Gracias, Kiwi.',
    createdAt: '2023-07-30'
  },

  // Other existing tributes
  {
    id: 't1',
    profileId: '1',
    visitorName: 'Ana García',
    tributeType: 'flower',
    message: 'Descansa en paz, Max. Fuiste un gran amigo.',
    createdAt: '2023-09-05'
  },
  {
    id: 't2',
    profileId: '1',
    visitorName: 'Carlos Rodríguez',
    tributeType: 'candle',
    message: 'Siempre te recordaremos con cariño.',
    createdAt: '2023-09-10'
  },
  {
    id: 't3',
    profileId: '2',
    visitorName: 'María López',
    tributeType: 'flower',
    message: 'Luna era especial. La extrañamos mucho.',
    createdAt: '2024-02-05'
  },
  {
    id: 't4',
    profileId: '3',
    visitorName: 'John Smith',
    tributeType: 'candle',
    message: 'Rocky was the best guard dog. We miss him.',
    createdAt: '2023-12-10'
  },
  {
    id: 't5',
    profileId: '7',
    visitorName: 'Yuki Tanaka',
    tributeType: 'flower',
    message: 'Milo was such a gentle giant. Rest in peace.',
    createdAt: '2024-02-25'
  },
  {
    id: 't6',
    profileId: '10',
    visitorName: 'Sarah Johnson',
    tributeType: 'candle',
    message: 'Duke brought so much joy to our neighborhood.',
    createdAt: '2023-07-25'
  }
];
