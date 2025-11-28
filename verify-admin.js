const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 Verificando usuario admin...\n');

    // Buscar usuario admin
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@forever-pet-friend.local' },
      include: {
        _count: { select: { profiles: true, sessions: true } }
      }
    });

    if (!admin) {
      console.log('❌ No se encontró usuario admin');
      process.exit(1);
    }

    console.log('✅ Usuario admin encontrado:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Tier: ${admin.subscriptionTier}`);
    console.log(`   Perfiles: ${admin._count.profiles}`);
    console.log(`   Sesiones activas: ${admin._count.sessions}`);

    // Listar perfiles disponibles
    console.log('\n📋 Perfiles disponibles:');
    const profiles = await prisma.animalProfile.findMany({
      select: { id: true, name: true, animalType: true },
      take: 5
    });

    if (profiles.length === 0) {
      console.log('   ❌ No hay perfiles');
    } else {
      profiles.forEach(p => {
        console.log(`   - ${p.name} (${p.animalType}) [${p.id.substring(0, 8)}...]`);
      });
      const total = await prisma.animalProfile.count();
      console.log(`   Total: ${total} perfiles`);
    }

    console.log('\n✅ Verificación completada');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
