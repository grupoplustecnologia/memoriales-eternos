const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updateAdminPassword() {
  try {
    const newPassword = 'Admin@2025!Neon';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar el admin existente
    const admin = await prisma.user.update({
      where: { email: 'admin@cementerio.com' },
      data: {
        passwordHash: hashedPassword
      }
    });

    console.log('✅ Contraseña del admin actualizada!\n');
    console.log('📧 Email: admin@cementerio.com');
    console.log('🔐 Nueva contraseña: ' + newPassword);
    console.log('🔑 Hash: ' + hashedPassword);
    console.log('\n✨ Ahora puedes iniciar sesión localmente con estas credenciales');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();
