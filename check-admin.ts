import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const admins = await prisma.user.findMany({
      where: {
        role: 'admin',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscriptionTier: true,
      },
    });

    console.log('\n🔐 USUARIOS ADMIN DISPONIBLES:\n');
    if (admins.length === 0) {
      console.log('❌ No hay usuarios admin en la base de datos');
    } else {
      admins.forEach((admin: any, i: number) => {
        console.log(`${i + 1}. Email: ${admin.email}`);
        console.log(`   Nombre: ${admin.name}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Tier: ${admin.subscriptionTier}\n`);
      });
    }

    // Mostrar todos los usuarios
    const allUsers = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`\n📊 TOTAL DE USUARIOS EN BD: ${allUsers.length}\n`);
    console.log('Primeros 10 usuarios:');
    allUsers.slice(0, 10).forEach((user: any, i: number) => {
      console.log(`${i + 1}. ${user.email} (${user.role})`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
