import { prisma } from '@/lib/prisma';

async function testConnection() {
  try {
    const userCount = await prisma.user.count();
    console.log(`✅ Prisma connection OK. Total users: ${userCount}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Prisma connection FAILED:', error);
    process.exit(1);
  }
}

testConnection();
