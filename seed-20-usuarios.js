const { PrismaClient } = require('@prisma/client');
const { createHash } = require('crypto');

const prisma = new PrismaClient();

// Simple hash function for seeding
function hashPassword(password) {
  return createHash('sha256').update(password + 'salt').digest('hex');
}

const SPANISH_CITIES = [
  { city: 'Barcelona', lat: 41.3851, lng: 2.1734 },
  { city: 'Madrid', lat: 40.4168, lng: -3.7038 },
  { city: 'Valencia', lat: 39.4699, lng: -0.3763 },
  { city: 'Sevilla', lat: 37.3891, lng: -5.9845 },
  { city: 'Bilbao', lat: 43.2627, lng: -2.9253 },
  { city: 'Málaga', lat: 36.7213, lng: -4.4214 },
  { city: 'Alicante', lat: 38.3452, lng: -0.4810 },
  { city: 'Córdoba', lat: 37.8882, lng: -4.7794 },
  { city: 'Murcia', lat: 37.9922, lng: -1.1307 },
  { city: 'Palma', lat: 39.5696, lng: 2.6502 },
];

const PET_TYPES = [
  { type: 'perro', names: ['Max', 'Luna', 'Rocky', 'Bella', 'Rex'] },
  { type: 'gato', names: ['Misu', 'Garfield', 'Whiskers', 'Felix', 'Nala'] },
  { type: 'ave', names: ['Tweety', 'Loro', 'Canario', 'Periquito', 'Águila'] },
  { type: 'roedor', names: ['Bugs', 'Conejito', 'Peter', 'Fluffy', 'Hoppy'] },
  { type: 'reptil', names: ['Chispas', 'Serpiente', 'Lagartija', 'Sombra', 'Ziggy'] },
];

const PET_PHOTOS = {
  perro: [
    'https://images.unsplash.com/photo-1633722715463-d30628519b5a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587300411515-430ee3e80afe?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552053831-71594a27c62d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1546527868-ccfc7ee1dab2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1537151608828-8661cf6d36c3?w=600&h=600&fit=crop',
  ],
  gato: [
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1573865526014-f3550df95088?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567546866348-7d440e4a0476?w=600&h=600&fit=crop',
  ],
  ave: [
    'https://images.unsplash.com/photo-1444464666175-1cff94c53f2b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516270893912-ab8e38ebaac0?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=600&fit=crop',
  ],
  roedor: [
    'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585110396341-8f001f5ba3cf?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585288595272-aeb786d1dd20?w=600&h=600&fit=crop',
  ],
  reptil: [
    'https://images.unsplash.com/photo-1585123666982-112651b1b4e9?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1589518271373-3db7fdf0b1d7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572411522989-37c5b8a1d902?w=600&h=600&fit=crop',
  ],
};

const TRIBUTE_MESSAGES = [
  'Siempre te recordaremos con amor y cariño. Fuiste la mejor compañía de nuestras vidas. QEPD.',
  'Te echamos de menos cada día. Dejaste un hueco enorme en nuestros corazones. Descansa en paz.',
  'Gracias por todos los momentos felices juntos. Eres irreemplazable y siempre estarás en nuestros corazones.',
  'Un amigo leal que nunca olvidaremos. Que descanses en paz, pequeño compañero.',
  'Tu amor y alegría iluminaron nuestros días. Siempre vivirás en nuestros recuerdos. QEPD.',
  'Fue un honor compartir la vida contigo. Descansa en el cielo, querido amigo.',
  'Tu partida nos deja un dolor profundo, pero tus recuerdos nos dan consuelo. Te queremos.',
  'Eras más que una mascota, eras parte de la familia. Hasta siempre, amor.',
  'Gracias por los años de felicidad y compañía. Nos veremos en el cielo.',
  'En memoria de nuestro querido amigo. Que descanses en paz, siempre te recordaremos.',
];

const TRIBUTE_TYPES = ['flower', 'candle', 'heart', 'angel'];

const USER_NAMES = [
  'María García', 'Juan López', 'Carmen Rodríguez', 'Pedro Martínez',
  'Ana Fernández', 'Carlos Sánchez', 'Isabel Pérez', 'Miguel Torres',
  'Rosa Jiménez', 'Antonio Ramírez', 'Elena Díaz', 'Francisco Ruiz',
  'Teresa Moreno', 'Luis González', 'Dolores Vargas', 'Rafael Castillo',
  'Pilar Medina', 'Diego Reyes', 'Magdalena Castro', 'Ramón Navarro',
];

async function main() {
  console.log('🌱 Iniciando seed de 20 usuarios con tributos...\n');

  try {
    for (let i = 0; i < 20; i++) {
      const userName = USER_NAMES[i];
      const userEmail = `user${i + 1}@memorias-eternas.local`;
      const passwordHash = hashPassword('Demo123!');

      console.log(`📝 Creando usuario ${i + 1}/20: ${userName} (${userEmail})`);

      // Crear o actualizar usuario
      const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
          email: userEmail,
          name: userName,
          passwordHash,
          role: 'user',
          subscriptionTier: 'huella-eterna',
        },
      });

      // Seleccionar tipo de mascota aleatorio
      const petTypeInfo = PET_TYPES[i % PET_TYPES.length];
      const petName = petTypeInfo.names[i % petTypeInfo.names.length];
      
      // Asignar foto basada en índice (sin repetir)
      const photoArray = PET_PHOTOS[petTypeInfo.type];
      const photoUrl = photoArray[i % photoArray.length];
      const city = SPANISH_CITIES[i % SPANISH_CITIES.length];

      // Calcular fechas
      const today = new Date();
      const birthDate = new Date(today);
      birthDate.setFullYear(birthDate.getFullYear() - (3 + Math.floor(Math.random() * 12))); // 3-15 años atrás

      const deathDate = new Date(today);
      deathDate.setDate(deathDate.getDate() - (Math.floor(Math.random() * 30) + 1)); // 1-30 días atrás

      // Crear memorial
      const memorial = await prisma.animalProfile.create({
        data: {
          userId: user.id,
          name: petName,
          animalType: petTypeInfo.type,
          breed: `${petTypeInfo.type} de raza mixta`,
          birthDate: birthDate.toISOString(),
          deathDate: deathDate.toISOString(),
          latitude: city.lat + (Math.random() - 0.5) * 0.1,
          longitude: city.lng + (Math.random() - 0.5) * 0.1,
          photoUrl,
          story: `${petName} fue una mascota especial que llenó nuestras vidas de alegría en ${city.city}.`,
          epitaph: `En memoria de ${petName}, nuestro querido compañero.`,
          isPublic: true,
        },
      });

      console.log(`  🐾 Memorial creado: ${petName} (${petTypeInfo.type})`);

      // Crear 3-5 tributos aleatorios
      const tributeCount = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < tributeCount; j++) {
        const tributeType = TRIBUTE_TYPES[Math.floor(Math.random() * TRIBUTE_TYPES.length)];
        const tributeMessage = TRIBUTE_MESSAGES[Math.floor(Math.random() * TRIBUTE_MESSAGES.length)];
        const visitorName = `${USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)].split(' ')[0]}`;

        // Fecha del tributo (últimos 30 días)
        const tributeDate = new Date(today);
        tributeDate.setDate(tributeDate.getDate() - Math.floor(Math.random() * 30));

        await prisma.tribute.create({
          data: {
            profileId: memorial.id,
            visitorName,
            message: tributeMessage,
            tributeType,
            createdAt: tributeDate.toISOString(),
          },
        });
      }

      console.log(`  ❤️  ${tributeCount} tributos agregados\n`);
    }

    console.log('✅ Seed completado exitosamente!');
    console.log(`✅ 20 usuarios creados con memorials y tributos`);
    console.log(`✅ Todos los usuarios pueden login con password: Demo123!`);

  } catch (error) {
    console.error('❌ Error en seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
