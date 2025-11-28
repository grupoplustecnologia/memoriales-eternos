import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
  try {
    console.log('🔍 Verificando sincronización de datos...\n');

    const userCount = await prisma.user.count();
    console.log(`✅ Usuarios en BD: ${userCount}`);

    const profileCount = await prisma.animalProfile.count();
    console.log(`✅ Perfiles de animales: ${profileCount}`);

    const profiles = await prisma.animalProfile.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        breed: true,
        latitude: true,
        longitude: true,
      },
    });

    console.log('\n📍 Primeros 5 perfiles para Mapbox:');
    profiles.forEach((p) => {
      console.log(`   ✓ ${p.name} (${p.breed}) [${p.latitude}, ${p.longitude}]`);
    });

    console.log('\n✅ Datos sincronizados correctamente!');
    console.log('🗺️  El mapa debería mostrar todos los perfiles...\n');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
