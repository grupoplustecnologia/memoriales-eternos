import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteUsers() {
  try {
    console.log('🗑️ Iniciando eliminación de los 100 usuarios de perros...');

    // Buscar usuarios creados en el seed anterior (aproximadamente hace poco)
    // Vamos a buscar usuarios que tengan perfiles de perros
    const dogsProfiles = await prisma.animalProfile.findMany({
      where: {
        animalType: 'perro',
      },
      include: {
        user: true,
      },
    });

    console.log(`📊 Encontrados ${dogsProfiles.length} perfiles de perros`);

    // Obtener IDs únicos de usuarios que solo tienen perros
    const userIds = new Set<string>();
    for (const profile of dogsProfiles) {
      // Verificar que el usuario solo tenga perfiles de perros (para no eliminar usuarios importantes)
      const userProfiles = await prisma.animalProfile.findMany({
        where: {
          userId: profile.userId,
        },
      });

      // Si solo tiene 1 perfil de perro, es probablemente del seed
      if (userProfiles.length === 1 && userProfiles[0].animalType === 'perro') {
        userIds.add(profile.userId);
      }
    }

    console.log(`👥 Se van a eliminar ${userIds.size} usuarios (con solo 1 perfil de perro)`);

    // Eliminar usuarios
    let deleted = 0;
    for (const userId of Array.from(userIds)) {
      try {
        await prisma.user.delete({
          where: {
            id: userId,
          },
        });
        deleted++;
        process.stdout.write(`\r✓ Eliminados: ${deleted}/${userIds.size}`);
      } catch (error) {
        console.error(`Error eliminando usuario ${userId}:`, error);
      }
    }

    console.log(`\n✅ ${deleted} usuarios eliminados exitosamente`);

    // Verificar cuántos perfiles de perros quedan
    const remainingDogs = await prisma.animalProfile.count({
      where: {
        animalType: 'perro',
      },
    });

    console.log(`\n📊 Perfiles de perros restantes: ${remainingDogs}`);

    // Mostrar estadísticas finales
    const stats = await prisma.animalProfile.groupBy({
      by: ['animalType'],
      _count: true,
    });

    console.log('\n📈 Estadísticas finales:');
    stats.forEach(stat => {
      console.log(`  ${stat.animalType}: ${stat._count}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUsers();
