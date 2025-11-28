const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    
    if (admins.length === 0) {
      console.log('No hay usuarios ADMIN creados');
    } else {
      console.log('✅ Usuarios ADMIN encontrados:\n');
      admins.forEach(admin => {
        console.log(`📧 Email: ${admin.email}`);
        console.log(`👤 Nombre: ${admin.name}`);
        console.log(`🔑 Role: ${admin.role}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();
