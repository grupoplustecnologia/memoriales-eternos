const { PrismaClient } = require('@prisma/client');
const { createHash } = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

async function main() {
  try {
    console.log('🔑 Creando nuevo usuario admin...\n');

    const email = 'plustecnologia2010@gmail.com';
    const password = '513548@aA';

    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      console.log('⚠️  El usuario ya existe:');
      console.log(`   Email: ${existingUser.email}`);
      console.log(`   Nombre: ${existingUser.name}`);
      console.log(`   Role: ${existingUser.role}`);
      console.log(`   ID: ${existingUser.id}`);
      
      if (existingUser.role !== 'admin') {
        console.log('\n📝 Actualizando a rol admin...');
        const updated = await prisma.user.update({
          where: { email: email },
          data: { role: 'admin' }
        });
        console.log('✅ Usuario actualizado a admin exitosamente');
      }
      return;
    }

    // Create admin user
    console.log('📝 Creando usuario admin...\n');

    const adminUser = await prisma.user.create({
      data: {
        email: email,
        name: 'Plus Tecnología Admin',
        passwordHash: hashPassword(password),
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
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
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
