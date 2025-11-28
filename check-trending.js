const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkTrending() {
  try {
    console.log('🔍 Verificando memoriales públicos...\n');

    // Contar públicos
    const publicCount = await prisma.animalProfile.count({
      where: { isPublic: true }
    });

    // Contar todos
    const totalCount = await prisma.animalProfile.count();

    console.log(`✅ Total de memoriales: ${totalCount}`);
    console.log(`✅ Memoriales públicos: ${publicCount}\n`);

    // Obtener los primeros 5 memoriales públicos
    const memorials = await prisma.animalProfile.findMany({
      where: { isPublic: true },
      orderBy: { viewCount: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        photoUrl: true,
        animalType: true,
        deathDate: true,
        viewCount: true,
        isPublic: true,
        user: {
          select: { name: true }
        },
        _count: {
          select: {
            tributes: true,
            likes: true,
            comments: true
          }
        }
      }
    });

    console.log('📋 Primeros 5 memoriales públicos:');
    memorials.forEach((m, i) => {
      console.log(`\n  ${i + 1}. ${m.name}`);
      console.log(`     Dueño: ${m.user.name}`);
      console.log(`     Animal: ${m.animalType}`);
      console.log(`     Vistas: ${m.viewCount}`);
      console.log(`     Foto: ${m.photoUrl}`);
    });

    // Si hay 0 públicos, mostrar todos
    if (publicCount === 0) {
      console.log('\n⚠️  No hay memoriales públicos. Mostrando todos los memoriales:\n');
      const allMemorials = await prisma.animalProfile.findMany({
        take: 5,
        select: {
          id: true,
          name: true,
          isPublic: true,
          user: { select: { name: true } }
        }
      });

      allMemorials.forEach((m, i) => {
        console.log(`  ${i + 1}. ${m.name} (Público: ${m.isPublic}) - ${m.user.name}`);
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkTrending();
