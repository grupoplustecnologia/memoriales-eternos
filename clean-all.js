const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanAll() {
  try {
    console.log('\n========== CLEANING ALL PROFILES & TRIBUTES ==========\n');

    // Delete all tributes first
    const deletedTributes = await prisma.tribute.deleteMany({});
    console.log(`✓ Deleted ${deletedTributes.count} tributes`);

    // Delete all profiles
    const deletedProfiles = await prisma.animalProfile.deleteMany({});
    console.log(`✓ Deleted ${deletedProfiles.count} profiles`);

    console.log('\n========== CLEANUP COMPLETE ==========\n');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanAll();
