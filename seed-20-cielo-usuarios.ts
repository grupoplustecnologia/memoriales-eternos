import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

// Simple hash function for seeding
function hashPassword(password: string): string {
  return createHash('sha256').update(password + 'salt').digest('hex');
}

// Pueblos pequeños de España con coordenadas
const SPANISH_TOWNS = [
  { town: 'Ronda', province: 'Málaga', lat: 36.7413, lng: -5.3348 },
  { town: 'Frigiliana', province: 'Málaga', lat: 36.8209, lng: -3.8731 },
  { town: 'Óbidos', province: 'Lérida', lat: 42.3548, lng: 0.5209 },
  { town: 'Ainsa', province: 'Huesca', lat: 42.4318, lng: -0.1423 },
  { town: 'Pedraza', province: 'Segovia', lat: 41.0927, lng: -3.6915 },
  { town: 'Albarracín', province: 'Teruel', lat: 40.4069, lng: -1.4450 },
  { town: 'Monsanto', province: 'Castilla', lat: 40.2869, lng: -6.7542 },
  { town: 'Pampaneira', province: 'Granada', lat: 36.9603, lng: -3.4130 },
  { town: 'Nerja', province: 'Málaga', lat: 36.7437, lng: -3.8662 },
  { town: 'Olvera', province: 'Cádiz', lat: 36.9380, lng: -5.3261 },
  { town: 'Llanes', province: 'Asturias', lat: 43.3237, lng: -4.7556 },
  { town: 'Cudillero', province: 'Asturias', lat: 43.5854, lng: -6.1501 },
  { town: 'Santillana del Mar', province: 'Cantabria', lat: 43.3764, lng: -3.9824 },
  { town: 'Comillas', province: 'Cantabria', lat: 43.3784, lng: -4.3003 },
  { town: 'Jaca', province: 'Huesca', lat: 42.5643, lng: -0.5506 },
  { town: 'Aínsa', province: 'Huesca', lat: 42.4318, lng: -0.1423 },
  { town: 'Montblanc', province: 'Tarragona', lat: 41.3821, lng: 1.1383 },
  { town: 'Besalú', province: 'Girona', lat: 42.2065, lng: 2.6943 },
  { town: 'Banesto', province: 'Zamora', lat: 41.8169, lng: -5.7589 },
  { town: 'Covarrubias', province: 'Burgos', lat: 42.2833, lng: -3.5333 },
];

const PET_TYPES = [
  { type: 'perro', emoji: '🐕', names: ['Max', 'Luna', 'Rocky', 'Bella', 'Rex', 'Toby', 'Milo', 'Charlie'] },
  { type: 'gato', emoji: '🐱', names: ['Misu', 'Garfield', 'Whiskers', 'Felix', 'Nala', 'Tom', 'Simba', 'Tiger'] },
  { type: 'ave', emoji: '🦜', names: ['Tweety', 'Loro', 'Canario', 'Periquito', 'Pluma', 'Koko', 'Picazo', 'Azul'] },
  { type: 'roedor', emoji: '🐇', names: ['Bugs', 'Conejito', 'Peter', 'Fluffy', 'Hoppy', 'Pelo', 'Nibbles', 'Cotton'] },
  { type: 'otro', emoji: '🦎', names: ['Reptil', 'Escama', 'Dragón', 'Lagarto', 'Verde', 'Saurio', 'Gecko', 'Iguana'] },
];

const PET_PHOTOS = [
  // Perros
  'https://images.unsplash.com/photo-1633722715463-d30628519b5a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587300411515-430ee3e80afe?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546527868-ccfc7ee1dab2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1537151608828-8661cf6d36c3?w=400&h=400&fit=crop',
  // Gatos
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573865526014-f3550df95088?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1567546866348-7d440e4a0476?w=400&h=400&fit=crop',
];

const TRIBUTE_TYPES_BACKEND = ['vela-blanca', 'vela-dorada', 'flor', 'flor-celestial', 'corona-flores', 'corazon', 'angel'];

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
  'Eras el alma de nuestra casa. Nunca te olvidaremos, pequeño amigo.',
  'Tu sonrisa nos hacía felices todos los días. Que descanses tranquilo.',
  'Dejaste paw prints en nuestros corazones para siempre.',
  'Eras tan especial, tan único, tan querido. Siempre en nuestros corazones.',
  'Gracias por ser el mejor compañero. Te extrañamos enormemente.',
];

const VISITOR_NAMES = [
  'Carlos Ruiz', 'Marta Gómez', 'David López', 'Sofía Martín', 'Javier García',
  'Laura Fernández', 'Sergio Pérez', 'Elena Rodríguez', 'Andrés Sánchez', 'Beatriz Torres',
  'Miguel Díaz', 'Claudia Jiménez', 'Óscar Vargas', 'Nuria Castro', 'Pablo Moreno',
];

const USER_NAMES = [
  'María García López',
  'Juan Carlos Pérez',
  'Carmen Rodríguez Santos',
  'Pedro Martínez Ruiz',
  'Ana Fernández García',
  'Carlos Sánchez López',
  'Isabel Pérez Martín',
  'Miguel Torres Díaz',
  'Rosa Jiménez García',
  'Antonio Ramírez López',
  'Elena Díaz Pérez',
  'Francisco Ruiz García',
  'Teresa Moreno López',
  'Luis González García',
  'Dolores Vargas Pérez',
  'Rafael Castillo Ruiz',
  'Pilar Medina García',
  'Diego Reyes López',
  'Magdalena Castro García',
  'Ramón Navarro Pérez',
];

async function main() {
  console.log('🌱 Iniciando seed de 20 usuarios CIELO DE ESTRELLAS con tributos en pueblos españoles...\n');

  try {
    for (let i = 0; i < 20; i++) {
      const userName = USER_NAMES[i];
      const userEmail = `cielo${i + 1}@memorias-eternas.local`;
      const passwordHash = hashPassword('Demo123!');
      const townData = SPANISH_TOWNS[i];
      const petTypeData = PET_TYPES[Math.floor(Math.random() * PET_TYPES.length)];
      const petName = petTypeData.names[Math.floor(Math.random() * petTypeData.names.length)];
      const photoUrl = PET_PHOTOS[Math.floor(Math.random() * PET_PHOTOS.length)];

      console.log(`\n📝 Usuario ${i + 1}/20: ${userName}`);
      console.log(`   Email: ${userEmail}`);
      console.log(`   Pueblo: ${townData.town}, ${townData.province}`);
      console.log(`   Mascota: ${petName} (${petTypeData.emoji})`);

      // Crear usuario con plan CIELO DE ESTRELLAS
      const user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
          passwordHash,
          role: 'user',
          subscriptionTier: 'cielo-estrellas',
        },
      });

      console.log(`   ✅ Usuario creado: ${user.id}`);

      // Crear memorial
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - Math.floor(Math.random() * 15) - 1);

      const deathDate = new Date();
      deathDate.setDate(deathDate.getDate() - Math.floor(Math.random() * 365));

      const memorial = await prisma.animalProfile.create({
        data: {
          userId: user.id,
          name: petName,
          animalType: petTypeData.type,
          breed: `Raza ${petName}`,
          birthDate: birthDate,
          deathDate: deathDate,
          latitude: townData.lat,
          longitude: townData.lng,
          photoUrl: photoUrl,
          story: `${petName} fue nuestro compañero fiel en ${townData.town}. Lleno de amor, alegría y travesuras, dejó una huella profunda en nuestros corazones.`,
          epitaph: `Aquí descansa ${petName}, nuestro querido amigo y parte de la familia.`,
          isPublic: true,
        },
      });

      console.log(`   ✅ Memorial creado: ${memorial.id}`);

      // Crear múltiples tributos (2-5 tributos por memorial)
      const tributeCount = Math.floor(Math.random() * 4) + 2; // 2-5 tributos
      for (let j = 0; j < tributeCount; j++) {
        const tributeType = TRIBUTE_TYPES_BACKEND[Math.floor(Math.random() * TRIBUTE_TYPES_BACKEND.length)];
        const visitorName = VISITOR_NAMES[Math.floor(Math.random() * VISITOR_NAMES.length)];
        const tributeMessage = TRIBUTE_MESSAGES[Math.floor(Math.random() * TRIBUTE_MESSAGES.length)];

        // Fecha del tributo (últimos 30 días)
        const tributeDate = new Date();
        tributeDate.setDate(tributeDate.getDate() - Math.floor(Math.random() * 30));

        await prisma.tribute.create({
          data: {
            profileId: memorial.id,
            visitorName: visitorName,
            tributeType: tributeType,
            message: tributeMessage,
            durationDays: 30,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: tributeDate,
          },
        });
      }

      console.log(`   ✅ ${tributeCount} tributos creados`);
    }

    console.log('\n✨ ¡Seed completado exitosamente!');
    console.log(`✅ 20 usuarios CIELO DE ESTRELLAS creados`);
    console.log(`✅ 20 memorials en pueblos españoles creados`);
    console.log(`✅ 50-100 tributos distribuidos\n`);

    const userCount = await prisma.user.count();
    const memorialCount = await prisma.animalProfile.count();
    const tributeCount = await prisma.tribute.count();

    console.log('📊 Estadísticas finales:');
    console.log(`   👥 Total usuarios: ${userCount}`);
    console.log(`   🎵 Total memorials: ${memorialCount}`);
    console.log(`   💐 Total tributos: ${tributeCount}\n`);
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
