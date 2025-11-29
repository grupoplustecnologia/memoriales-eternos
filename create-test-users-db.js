const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUsersAndMemorials() {
  try {
    console.log('🚀 Creando usuarios y memoriales de prueba en BD...\n');

    // Test users data
    const testUsers = [
      {
        name: 'Usuario Gratuito',
        email: 'gratuito@test.com',
        password: 'Test123456',
        subscriptionTier: 'huella-eterna',
        animalType: 'perro'
      },
      {
        name: 'Usuario Cielo Estrellas',
        email: 'cielo@test.com',
        password: 'Test123456',
        subscriptionTier: 'cielo-estrellas',
        animalType: 'gato'
      },
      {
        name: 'Usuario Premium Pro',
        email: 'premium@test.com',
        password: 'Test123456',
        subscriptionTier: 'santuario-premium',
        animalType: 'ave'
      }
    ];

    // Test memorials data
    const memorialsData = [
      {
        name: 'Perro Gratuito',
        breed: 'Labrador',
        latitude: 40.4168,
        longitude: -3.7038,
        birthDate: new Date('2015-03-15'),
        deathDate: new Date('2023-11-20'),
        story: 'Un perro hermoso que llenó de alegría nuestras vidas',
        epitaph: 'Para siempre en nuestros corazones',
        photoUrl: 'https://via.placeholder.com/400x300?text=Perro+Gratuito'
      },
      {
        name: 'Gato Cielo Estrellas',
        breed: 'Persa',
        latitude: 41.3851,
        longitude: 2.1734,
        birthDate: new Date('2016-06-10'),
        deathDate: new Date('2024-08-15'),
        story: 'Un gato hermoso con ojos azules que nos enseñó el significado del amor',
        epitaph: 'En el cielo de las estrellas',
        photoUrl: 'https://via.placeholder.com/400x300?text=Gato+Cielo'
      },
      {
        name: 'Loro Premium Pro',
        breed: 'Loro Africano',
        latitude: 39.4699,
        longitude: -0.3763,
        birthDate: new Date('2010-01-20'),
        deathDate: new Date('2024-10-05'),
        story: 'Un loro inteligente que hizo reír a todos con sus imitaciones',
        epitaph: 'Vuela alto en el santuario premium',
        photoUrl: 'https://via.placeholder.com/400x300?text=Loro+Premium'
      }
    ];

    for (let i = 0; i < testUsers.length; i++) {
      const userData = testUsers[i];
      const memorialData = memorialsData[i];

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        console.log(`⚠️ Usuario ${userData.email} ya existe, eliminando...`);
        
        // Delete related memorials
        await prisma.animalProfile.deleteMany({
          where: { userId: existingUser.id }
        });

        // Delete user
        await prisma.user.delete({
          where: { id: existingUser.id }
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      console.log(`📝 Creando usuario: ${userData.name} (${userData.email})`);
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          passwordHash: hashedPassword,
          subscriptionTier: userData.subscriptionTier,
          subscriptionStatus: 'active',
          emailVerified: true
        }
      });

      // Create memorial
      console.log(`🐾 Creando memorial: ${memorialData.name}`);
      const memorial = await prisma.animalProfile.create({
        data: {
          name: memorialData.name,
          animalType: userData.animalType,
          breed: memorialData.breed,
          latitude: memorialData.latitude,
          longitude: memorialData.longitude,
          birthDate: memorialData.birthDate,
          deathDate: memorialData.deathDate,
          story: memorialData.story,
          epitaph: memorialData.epitaph,
          photoUrl: memorialData.photoUrl,
          isPublic: true,
          userId: user.id
        }
      });

      console.log(`✅ Usuario y memorial creados exitosamente!\n`);
    }

    console.log('✅ ¡Todos los usuarios y memoriales creados exitosamente!');
    console.log('\n📊 Usuarios creados:');
    console.log('1. Usuario Gratuito - gratuito@test.com (Huella Eterna)');
    console.log('2. Usuario Cielo Estrellas - cielo@test.com (Cielo de Estrellas)');
    console.log('3. Usuario Premium Pro - premium@test.com (Santuario Premium)');
    console.log('\nContraseña para todos: Test123456');
    console.log('\n🗺️ Ve a /map para ver los tres marcadores con diferentes estilos');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsersAndMemorials();
