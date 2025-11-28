import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeDogsPublic() {
  try {
    console.log('🔄 Haciendo públicos todos los perfiles de perros...\n');

    // Actualizar todos los perfiles de perros a isPublic: true
    const updated = await prisma.animalProfile.updateMany({
      where: { animalType: 'perro' },
      data: { isPublic: true },
    });

    console.log(`✅ ${updated.count} perfiles de perros marcados como públicos`);

    // Contar los resultados
    const publicDogs = await prisma.animalProfile.count({
      where: { animalType: 'perro', isPublic: true },
    });

    const totalDogs = await prisma.animalProfile.count({
      where: { animalType: 'perro' },
    });

    console.log(`📊 Total de perros: ${totalDogs}`);
    console.log(`👁️  Perros públicos en mapa: ${publicDogs}`);
    console.log('\n✅ ¡Todos los perros están sincronizados y visibles en el mapa!');

    // Mostrar estadísticas
    const stats = await prisma.animalProfile.groupBy({
      by: ['animalType'],
      _count: true,
    });

    console.log('\n📈 Estadísticas por tipo de animal:');
    stats.forEach((s) => {
      console.log(`   • ${s.animalType}: ${s._count}`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

makeDogsPublic();
