/**
 * Script to synchronize demo users credentials
 * Removes old "memorias-eternas" demo users and creates new "forever-pet-friend" ones
 */

const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  try {
    console.log('🔄 Starting demo users synchronization...\n');

    // Delete old demo users
    const oldEmails = [
      'demo@memorias-eternas.local',
      'huella@memorias-eternas.local',
      'cielo@memorias-eternas.local',
      'santuario@memorias-eternas.local'
    ];

    console.log('🗑️  Removing old demo users...');
    for (const email of oldEmails) {
      const deleted = await prisma.user.deleteMany({
        where: { email }
      });
      if (deleted.count > 0) {
        console.log(`   ✓ Deleted: ${email}`);
      }
    }

    // Create new demo users
    console.log('\n✨ Creating new demo users...\n');

    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@forever-pet-friend.local',
        name: 'Admin User',
        passwordHash: hashPassword('Demo123!'),
        emailVerified: true,
        subscriptionTier: 'santuario-premium',
        role: 'admin',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      }
    });
    console.log('✅ ADMIN: admin@forever-pet-friend.local / Demo123!');

    const demoUsers = [
      {
        email: 'demo@forever-pet-friend.local',
        name: 'Demo User 1',
        subscriptionTier: 'huella-eterna',
        profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
      },
      {
        email: 'demo2@forever-pet-friend.local',
        name: 'Demo User 2',
        subscriptionTier: 'cielo-estrellas',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      },
      {
        email: 'demo3@forever-pet-friend.local',
        name: 'Demo User 3',
        subscriptionTier: 'santuario-premium',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
      }
    ];

    for (const userData of demoUsers) {
      await prisma.user.create({
        data: {
          ...userData,
          passwordHash: hashPassword('Demo123!'),
          emailVerified: true,
          role: 'user'
        }
      });
      console.log(`✅ ${userData.email} / Demo123! (${userData.subscriptionTier})`);
    }

    console.log('\n✨ Demo users synchronized successfully!\n');
    console.log('You can now login with:');
    console.log('   🛡️  admin@forever-pet-friend.local / Demo123!');
    console.log('   👤 demo@forever-pet-friend.local / Demo123!');
    console.log('   👤 demo2@forever-pet-friend.local / Demo123!');
    console.log('   👤 demo3@forever-pet-friend.local / Demo123!\n');

  } catch (error) {
    console.error('❌ Error synchronizing demo users:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
