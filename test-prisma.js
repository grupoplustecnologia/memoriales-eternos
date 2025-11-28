const prisma = require('./src/lib/prisma.ts').prisma;

async function test() {
  try {
    const count = await prisma.user.count();
    console.log(`✅ OK: ${count} users`);
  } catch (e) {
    console.error('❌ Error:', e.message);
  }
  process.exit(0);
}

test();
