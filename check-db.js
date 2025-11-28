const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    console.log('\n========== DATABASE CHECK ==========\n');

    // Check users
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
      orderBy: { createdAt: 'desc' }
    });

    console.log('USERS:');
    users.forEach(u => {
      console.log(`  ${u.name} (${u.email})`);
    });

    // Check recent tributes
    const tributes = await prisma.tribute.findMany({
      select: { 
        id: true, 
        visitorName: true, 
        tributeType: true, 
        visitorId: true, 
        createdAt: true 
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    console.log('\nRECENT TRIBUTES:');
    tributes.forEach(t => {
      console.log(`  ${t.visitorName} - ${t.tributeType} ${t.visitorId ? 'from user' : 'anonymous'} - ${new Date(t.createdAt).toLocaleString()}`);
    });

    console.log('\n========== END CHECK ==========\n');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();
