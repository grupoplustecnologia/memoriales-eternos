const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const profiles = await prisma.$queryRaw`SELECT COUNT(*) as count FROM animal_profiles`;
    console.log('Memoriales en BD (raw):', profiles[0].count);
    
    const usersCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM users`;
    console.log('Usuarios en BD:', usersCount[0].count);
  } catch(e) {
    console.log('Error:', e.message);
  }
  await prisma.$disconnect();
})();
