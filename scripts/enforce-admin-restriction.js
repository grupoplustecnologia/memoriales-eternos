// Simple script to check admin users in database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function enforceAdminRestriction() {
  try {
    console.log('🔍 Checking for unauthorized admin users...\n');

    // Get all admin users
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true, email: true, name: true, role: true }
    });

    console.log(`Found ${admins.length} admin user(s):`);
    admins.forEach((admin, i) => {
      console.log(`  ${i + 1}. ${admin.email} - ${admin.name} (${admin.role})`);
    });

    // Only demo@memorias-eternas.local should be admin
    const authorizedAdminEmail = 'demo@memorias-eternas.local';
    const unauthorizedAdmins = admins.filter(a => a.email !== authorizedAdminEmail);

    if (unauthorizedAdmins.length === 0) {
      console.log('\n✅ Good! Only the authorized admin exists.\n');
      
      // Show final state
      const finalAdmins = await prisma.user.findMany({
        where: { role: 'admin' },
        select: { email: true, name: true }
      });
      
      console.log('Authorized admin user:');
      finalAdmins.forEach((admin) => {
        console.log(`  👑 ${admin.email} - ${admin.name}`);
      });
      
      return { success: true, message: 'Admin restriction is properly enforced' };
    }

    console.log(`\n⚠️  Found ${unauthorizedAdmins.length} unauthorized admin(s):`);
    unauthorizedAdmins.forEach((admin) => {
      console.log(`  - ${admin.email} (${admin.name})`);
    });

    // Downgrade unauthorized admins to user
    console.log('\n🔄 Downgrading unauthorized admins to user role...');
    for (const admin of unauthorizedAdmins) {
      await prisma.user.update({
        where: { id: admin.id },
        data: { role: 'user' }
      });
      console.log(`  ✓ ${admin.email} downgraded to user`);
    }

    console.log('\n✅ Admin restriction enforced successfully!\n');

    // Verify the fix
    const finalAdmins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { email: true, name: true }
    });

    console.log('Final admin user(s):');
    finalAdmins.forEach((admin) => {
      console.log(`  👑 ${admin.email} - ${admin.name}`);
    });

    return {
      success: true,
      message: `Downgraded ${unauthorizedAdmins.length} unauthorized admin(s) to user role`,
      remainingAdmins: finalAdmins
    };
  } catch (error) {
    console.error('❌ Error enforcing admin restriction:', error);
    return { success: false, error: String(error) };
  } finally {
    await prisma.$disconnect();
  }
}

// Run
enforceAdminRestriction().then((result) => {
  console.log('\n📊 Result:', JSON.stringify(result, null, 2));
  process.exit(result.success ? 0 : 1);
});
