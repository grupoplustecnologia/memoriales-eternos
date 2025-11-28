const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testAdminLogin() {
  try {
    console.log('🔍 Verificando admin en la base de datos...\n');

    // Obtener el admin
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@cementerio.com' },
      select: { id: true, email: true, name: true, passwordHash: true, role: true }
    });

    if (!admin) {
      console.log('❌ Admin no encontrado');
      return;
    }

    console.log('✅ Admin encontrado:');
    console.log('   Email:', admin.email);
    console.log('   Nombre:', admin.name);
    console.log('   Role:', admin.role);
    console.log('   Hash:', admin.passwordHash.substring(0, 30) + '...\n');

    // Probar contraseña
    const passwordToTest = 'Admin@2025!Neon';
    console.log('🔐 Probando contraseña:', passwordToTest);
    
    const passwordMatch = await bcrypt.compare(passwordToTest, admin.passwordHash);
    
    if (passwordMatch) {
      console.log('✅ ¡Contraseña correcta! ✨');
      console.log('\n📋 Credenciales válidas:');
      console.log('   Email: admin@cementerio.com');
      console.log('   Contraseña: Admin@2025!Neon');
    } else {
      console.log('❌ Contraseña incorrecta');
      console.log('   Hash en BD:', admin.passwordHash);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testAdminLogin();
