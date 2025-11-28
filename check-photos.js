const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkPhotos() {
  try {
    console.log('\n========== CHECKING MEMORIAL PHOTOS ==========\n');

    const profiles = await prisma.animalProfile.findMany({
      where: {
        name: { in: ['Max', 'Luna', 'Tweety', 'Nibbles', 'Smaug', 'Bella', 'Whiskers', 'Rocky', 'Kiwi', 'Charlie'] }
      },
      select: { name: true, animalType: true, photoUrl: true, gallery: true }
    });

    profiles.forEach(p => {
      console.log(`\n${p.name} (${p.animalType})`);
      console.log(`  Main photo: ${p.photoUrl}`);
      console.log(`  Gallery: ${p.gallery?.join(', ') || 'N/A'}`);
    });

    console.log('\n========== END CHECK ==========\n');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPhotos();
