import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(name: string, animalType: string, id: string): string {
  // Convertir a minúsculas, reemplazar espacios con guiones, remover caracteres especiales
  const sanitized = `${name}-${animalType}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Remover guiones múltiples
    .slice(0, 50); // Limitar a 50 caracteres

  // Agregar ID para garantizar unicidad
  return `${sanitized}-${id.slice(-8)}`;
}

async function generateSlugs() {
  try {
    console.log('🔄 Generando slugs para perfiles...\n');

    // Obtener todos los perfiles sin slug
    const profiles = await prisma.animalProfile.findMany({
      select: {
        id: true,
        name: true,
        animalType: true,
        slug: true,
      },
    });

    let updated = 0;
    let skipped = 0;

    for (const profile of profiles) {
      if (profile.slug) {
        skipped++;
        continue;
      }

      const newSlug = generateSlug(profile.name, profile.animalType, profile.id);

      try {
        await prisma.animalProfile.update({
          where: { id: profile.id },
          data: { slug: newSlug },
        });
        updated++;
        process.stdout.write(`\r✓ Actualizados: ${updated}/${profiles.length - skipped}`);
      } catch (error: any) {
        if (error.code === 'P2002') {
          // Slug duplicado, agregar más caracteres del ID
          const uniqueSlug = `${newSlug}-${Date.now()}`;
          await prisma.animalProfile.update({
            where: { id: profile.id },
            data: { slug: uniqueSlug },
          });
          updated++;
          process.stdout.write(`\r✓ Actualizados: ${updated}/${profiles.length - skipped}`);
        } else {
          console.error(`\n❌ Error actualizando ${profile.id}:`, error);
        }
      }
    }

    console.log(`\n✅ ${updated} perfiles actualizados`);
    console.log(`⏭️  ${skipped} perfiles ya tenían slug\n`);

    // Mostrar ejemplos
    const examples = await prisma.animalProfile.findMany({
      select: {
        name: true,
        slug: true,
      },
      take: 5,
    });

    console.log('📋 Ejemplos de slugs generados:');
    examples.forEach((ex) => {
      console.log(`   ${ex.name} → /memorial/${ex.slug}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateSlugs();
