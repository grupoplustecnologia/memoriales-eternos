const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'admin@cementerio.com';
    const password = 'Admin123!';
    const name = 'Administrador';

    // Verificar si el admin ya existe
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      console.log('❌ El usuario admin ya existe');
      return;
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario admin
    const admin = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        role: 'ADMIN',
        emailVerified: true
      }
    });

    console.log('✅ Usuario admin creado exitosamente!\n');
    console.log('📧 Email:', email);
    console.log('🔐 Password:', password);
    console.log('👤 Nombre:', name);
    console.log('🔑 Role: ADMIN');
    console.log('\n✨ Ya puedes iniciar sesión en http://localhost:3000/admin');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
