const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[çc]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

function generateUniqueSlug(baseSlug, existingSlugs) {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  while (existingSlugs.includes(`${baseSlug}-${counter}`)) {
    counter++;
  }

  return `${baseSlug}-${counter}`;
}

async function main() {
  try {
    console.log('🔄 Actualizando memoriales con slugs amigables para SEO...\n');

    // Get all profiles
    const profiles = await prisma.animalProfile.findMany({
      orderBy: { createdAt: 'asc' }
    });

    console.log(`📊 Total de memoriales a procesar: ${profiles.length}\n`);

    let updated = 0;
    const existingSlugs = [];

    for (const profile of profiles) {
      // Generate new slug from name
      const baseSlug = generateSlug(profile.name);
      const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

      // Only update if slug changed
      if (profile.slug !== uniqueSlug) {
        await prisma.animalProfile.update({
          where: { id: profile.id },
          data: { slug: uniqueSlug }
        });

        console.log(`✅ ${profile.name}`);
        console.log(`   Old: ${profile.slug}`);
        console.log(`   New: ${uniqueSlug}`);
        console.log(`   URL: /profile/${uniqueSlug}\n`);

        updated++;
      } else {
        console.log(`⏭️  ${profile.name} (ya tiene slug correcto)`);
        console.log(`   URL: /profile/${uniqueSlug}\n`);
      }

      existingSlugs.push(uniqueSlug);
    }

    console.log(`\n✅ Actualización completada`);
    console.log(`📝 Memoriales actualizados: ${updated}`);
    console.log(`📝 Total procesados: ${profiles.length}`);
    console.log(`\n🌐 Ejemplos de URLs amigables:`);
    console.log(`   /profile/max-de-ronda`);
    console.log(`   /profile/misa-de-cuenca`);
    console.log(`   /profile/luna-obi-dos`);
    console.log(`\n💡 Los memoriales también funcionan con ID antiguo:`);
    console.log(`   /profile/cmiitz11z0005myt841e0akm8`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
