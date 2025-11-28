const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanOldData() {
  try {
    console.log('\n========== CLEANING OLD MEMORIAL DATA ==========\n');

    // Get the demo user
    const user = await prisma.user.findFirst({
      where: { email: 'demo-memorials@test.com' }
    });

    if (user) {
      // Delete tributes for this user's profiles
      const profiles = await prisma.animalProfile.findMany({
        where: { userId: user.id }
      });

      let tributeCount = 0;
      for (const profile of profiles) {
        const deleted = await prisma.tribute.deleteMany({
          where: { profileId: profile.id }
        });
        tributeCount += deleted.count;
      }

      // Delete profiles
      const deletedProfiles = await prisma.animalProfile.deleteMany({
        where: { userId: user.id }
      });

      // Delete the demo user
      await prisma.user.delete({
        where: { id: user.id }
      });

      console.log(`✓ Deleted ${deletedProfiles.count} profiles`);
      console.log(`✓ Deleted ${tributeCount} tributes`);
      console.log(`✓ Deleted demo user`);
    }

    console.log('\n========== CLEANUP COMPLETE ==========\n');
  } catch (error) {
    console.error('Error cleaning database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanOldData();
