const { PrismaClient } = require('@prisma/client');
const { createHash } = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

async function main() {
  try {
    console.log('🔑 Verificando usuario admin...\n');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'demo@memorias-eternas.local' }
    });

    if (existingAdmin) {
      console.log('✅ Usuario admin ya existe:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Nombre: ${existingAdmin.name}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log(`   ID: ${existingAdmin.id}`);
      return;
    }

    // Create admin user
    console.log('📝 Creando usuario admin...\n');

    const adminUser = await prisma.user.create({
      data: {
        email: 'demo@memorias-eternas.local',
        name: 'Super Admin',
        passwordHash: hashPassword('Demo123!'),
        emailVerified: true,
        subscriptionTier: 'santuario-premium',
        role: 'admin',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      }
    });

    console.log('✅ Usuario admin creado exitosamente:');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Nombre: ${adminUser.name}`);
    console.log(`   Role: ${adminUser.role}`);
    console.log(`   ID: ${adminUser.id}`);
    console.log(`\n🔐 Credenciales:`);
    console.log(`   Email: demo@memorias-eternas.local`);
    console.log(`   Password: Demo123!`);
    console.log(`\n✨ Ya puedes iniciar sesión en http://localhost:3000/auth/login`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'P2002') {
      console.error('   → El usuario ya existe en la base de datos');
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
