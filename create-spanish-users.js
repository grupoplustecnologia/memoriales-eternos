/**
 * Script para crear 10 usuarios reales con memoriales de mascotas en España
 * Genera datos auténticos y distribuidos geográficamente
 */

const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Datos de usuarios y mascotas por ciudades españolas
const usersWithPets = [
  {
    email: 'maria.garcia@forever.local',
    name: 'María García',
    password: 'Password123!',
    city: 'Barcelona',
    pets: [
      {
        name: 'Luna',
        animalType: 'gato',
        breed: 'Persa Blanco',
        birthDate: new Date('2015-03-15'),
        deathDate: new Date('2024-08-22'),
        latitude: 41.3851,
        longitude: 2.1734,
        story: 'Luna fue mi compañera durante 9 años. Llegó a nuestro hogar como un pequeño gatito asustado y se convirtió en la reina de la casa. Le encantaba dormir al sol en la ventana del salón y ronronear mientras la acariciaba. Sus ojos verdes brillaban de amor cada vez que llegaba a casa. La extrañamos cada día.',
        epitaph: 'Luna - Tu amor eterno vive en nuestros corazones'
      }
    ]
  },
  {
    email: 'carlos.lopez@forever.local',
    name: 'Carlos López',
    password: 'Password123!',
    city: 'Madrid',
    pets: [
      {
        name: 'Max',
        animalType: 'perro',
        breed: 'Labrador Retriever',
        birthDate: new Date('2012-07-10'),
        deathDate: new Date('2024-09-15'),
        latitude: 40.4168,
        longitude: -3.7038,
        story: 'Max fue el mejor amigo que alguien podría tener. Durante 12 años nos acompañó en cada aventura, en cada viaje, en cada momento difícil. Su entusiasmo contagioso y su lealtad inquebrantable nos enseñaron el verdadero significado del amor incondicional. Era más que una mascota, era un miembro de la familia.',
        epitaph: 'Max - Un corazón noble que nos enseñó a vivir'
      }
    ]
  },
  {
    email: 'elena.martinez@forever.local',
    name: 'Elena Martínez',
    password: 'Password123!',
    city: 'Valencia',
    pets: [
      {
        name: 'Paco',
        animalType: 'perro',
        breed: 'Cocker Spaniel',
        birthDate: new Date('2010-11-22'),
        deathDate: new Date('2024-07-03'),
        latitude: 39.4699,
        longitude: -0.3763,
        story: 'Paco era un perro especial, siempre dispuesto a agradar y lleno de energía. Pasamos innumerables tardes en la playa y en el parque, jugando y corriendo. Su presencia traía alegría a todos los que lo conocían. Fue un honor estar a su lado.',
        epitaph: 'Paco - Nuestro rayito de felicidad'
      }
    ]
  },
  {
    email: 'francisca.sanz@forever.local',
    name: 'Francisca Sanz',
    password: 'Password123!',
    city: 'Sevilla',
    pets: [
      {
        name: 'Bella',
        animalType: 'gato',
        breed: 'Siamés',
        birthDate: new Date('2013-05-08'),
        deathDate: new Date('2024-06-20'),
        latitude: 37.3891,
        longitude: -5.9845,
        story: 'Bella era una gatita elegante y sofisticada. Sus ojos azules era hipnotizantes y su personalidad única nos hacía reír todos los días. Adoraba acurrucarse en nuestro regazo por las noches mientras veíamos películas. Era nuestra pequeña princesa.',
        epitaph: 'Bella - Elegancia y amor felino'
      }
    ]
  },
  {
    email: 'juan.fernandez@forever.local',
    name: 'Juan Fernández',
    password: 'Password123!',
    city: 'Bilbao',
    pets: [
      {
        name: 'Rocky',
        animalType: 'perro',
        breed: 'Pastor Alemán',
        birthDate: new Date('2008-02-14'),
        deathDate: new Date('2024-10-05'),
        latitude: 43.2630,
        longitude: -2.9350,
        story: 'Rocky fue nuestro guardián y protector durante 16 años. Su inteligencia era asombrosa, siempre sabía cuando algo nos preocupaba. Fue el mejor compañero que pudimos tener, leal hasta el final. Su partida dejó un vacío enorme en nuestras vidas.',
        epitaph: 'Rocky - Guardián del amor verdadero'
      }
    ]
  },
  {
    email: 'sandra.torres@forever.local',
    name: 'Sandra Torres',
    password: 'Password123!',
    city: 'Malaga',
    pets: [
      {
        name: 'Coco',
        animalType: 'ave',
        breed: 'Loro Amazonas',
        birthDate: new Date('2001-08-30'),
        deathDate: new Date('2024-09-28'),
        latitude: 36.7213,
        longitude: -3.7369,
        story: 'Coco fue nuestro loro colorido y charlatán. Durante 23 años llenó nuestro hogar con sus imitaciones divertidas y sus llamadas alegres. Era un miembro de la familia que todos amaban. Su sabiduría y personalidad nos enseñaron mucho sobre la vida.',
        epitaph: 'Coco - Nuestro amigo emplumado'
      }
    ]
  },
  {
    email: 'david.rodriguez@forever.local',
    name: 'David Rodríguez',
    password: 'Password123!',
    city: 'Zaragoza',
    pets: [
      {
        name: 'Mimi',
        animalType: 'gato',
        breed: 'Gato Común',
        birthDate: new Date('2016-01-12'),
        deathDate: new Date('2024-08-14'),
        latitude: 41.6488,
        longitude: -0.8891,
        story: 'Mimi era una gata independiente pero cariñosa. Nos encantaba verla jugar con sus juguetes favoritos y acechando a los pájaros por la ventana. Era nuestro pequeño cazador casero que nos traía tanta felicidad cada día.',
        epitaph: 'Mimi - Cazadora de corazones'
      }
    ]
  },
  {
    email: 'isabel.garcia@forever.local',
    name: 'Isabel García',
    password: 'Password123!',
    city: 'Palma de Mallorca',
    pets: [
      {
        name: 'Bruno',
        animalType: 'perro',
        breed: 'Golden Retriever',
        birthDate: new Date('2014-06-20'),
        deathDate: new Date('2024-07-31'),
        latitude: 39.5696,
        longitude: 2.6502,
        story: 'Bruno fue el perro perfecto. Amable, gentil y siempre dispuesto a complacer. Pasamos años jugando en las playas de Mallorca. Su amor incondicional nos cambió la vida para mejor. Siempre lo llevaremos en nuestro corazón.',
        epitaph: 'Bruno - El perro de oro de nuestras vidas'
      }
    ]
  },
  {
    email: 'antonio.cabrera@forever.local',
    name: 'Antonio Cabrera',
    password: 'Password123!',
    city: 'Córdoba',
    pets: [
      {
        name: 'Conejo',
        animalType: 'roedor',
        breed: 'Conejo Angora',
        birthDate: new Date('2018-04-03'),
        deathDate: new Date('2024-09-10'),
        latitude: 37.8882,
        longitude: -4.7697,
        story: 'Conejo era nuestro pequeño amigo peludo. Pasaba horas comiendo verduras frescas en el jardín. Su comportamiento tierno y su pequeño tamaño lo hacía irresistible. Fue un privilegio tenerlo en nuestras vidas.',
        epitaph: 'Conejo - Pequeño, suave y amado'
      }
    ]
  },
  {
    email: 'lucia.fernandez@forever.local',
    name: 'Lucía Fernández',
    password: 'Password123!',
    city: 'Alicante',
    pets: [
      {
        name: 'Whiskers',
        animalType: 'gato',
        breed: 'Gato Atigrado',
        birthDate: new Date('2012-09-15'),
        deathDate: new Date('2024-10-12'),
        latitude: 38.3452,
        longitude: -0.4810,
        story: 'Whiskers era un gato misterioso y cautivador. Con sus bigotes largos y su mirada penetrante, nos hipnotizaba todos los días. Era un cazador nocturno increíble pero también un compañero dormilon perfecto. Lo echaremos de menos eternamente.',
        epitaph: 'Whiskers - Misterio y ternura felina'
      }
    ]
  }
];

async function main() {
  try {
    console.log('🌟 Creando 10 usuarios reales con memoriales en España...\n');

    // Primero, eliminar usuarios anteriores si existen
    console.log('🗑️  Limpiando usuarios anteriores...');
    for (const userData of usersWithPets) {
      const deleted = await prisma.user.deleteMany({
        where: { email: userData.email }
      });
    }
    console.log('✅ Limpieza completada\n');

    for (const userData of usersWithPets) {
      console.log(`📍 ${userData.city}`);

      // Crear usuario
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          passwordHash: hashPassword(userData.password),
          emailVerified: true,
          subscriptionTier: 'santuario-premium',
          role: 'user',
          profilePicture: `https://images.unsplash.com/photo-${Math.random().toString().slice(2, 11)}?w=400&h=400&fit=crop`
        }
      });

      console.log(`   ✅ Usuario: ${userData.name}`);
      console.log(`   📧 Email: ${userData.email}`);

      // Crear mascotas (memoriales)
      for (const pet of userData.pets) {
        const profile = await prisma.animalProfile.create({
          data: {
            userId: user.id,
            name: pet.name,
            animalType: pet.animalType,
            breed: pet.breed,
            birthDate: pet.birthDate,
            deathDate: pet.deathDate,
            latitude: pet.latitude,
            longitude: pet.longitude,
            photoUrl: `https://images.unsplash.com/photo-${Math.random().toString().slice(2, 11)}?w=600&h=400&fit=crop&q=80`,
            story: pet.story,
            epitaph: pet.epitaph,
            isPublic: true,
            viewCount: Math.floor(Math.random() * 50) + 10
          }
        });

        console.log(`   🪦 Memorial: ${pet.name} (${pet.animalType}) - ${pet.breed}`);
        console.log(`      📍 Ubicación: ${pet.latitude.toFixed(4)}, ${pet.longitude.toFixed(4)}`);

        // Crear algunos tributos de ejemplo
        const tributeTypes = ['flower', 'candle', 'message'];
        const tributeCount = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < tributeCount; i++) {
          await prisma.tribute.create({
            data: {
              profileId: profile.id,
              visitorName: `Visitante ${i + 1}`,
              tributeType: tributeTypes[Math.floor(Math.random() * tributeTypes.length)],
              message: i % 2 === 0 ? `Hermoso memorial para ${pet.name}. Que descanse en paz.` : undefined,
              durationDays: Math.floor(Math.random() * 20) + 7
            }
          });
        }

        console.log(`      🌹 ${tributeCount} tributos añadidos\n`);
      }
    }

    console.log('✨ ¡10 usuarios con memoriales creados exitosamente!\n');
    console.log('📊 Resumen:');
    console.log('   ✅ 10 usuarios nuevos');
    console.log('   ✅ 10 memoriales de mascotas');
    console.log('   ✅ Distribuidos por 10 ciudades españolas');
    console.log('   ✅ Tributos añadidos automáticamente\n');

    console.log('🔐 Credenciales de ejemplo:');
    console.log('   📧 maria.garcia@forever.local / Password123!');
    console.log('   📧 carlos.lopez@forever.local / Password123!');
    console.log('   📧 elena.martinez@forever.local / Password123!\n');

  } catch (error) {
    console.error('❌ Error creando usuarios:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
