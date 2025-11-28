const bcrypt = require('bcryptjs');

async function generateAdminHash() {
  const password = 'Admin@2025!Neon';
  const hash = await bcrypt.hash(password, 10);
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  USUARIO ADMIN PARA NEON CONSOLE');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('📧 Email:        admin@cementerio.com');
  console.log('🔐 Contraseña:   ' + password);
  console.log('🔑 Hash bcryptjs:\n');
  console.log("'" + hash + "'\n");
  
  console.log('📋 PASOS PARA CREAR EN NEON:');
  console.log('1. Ve a: https://console.neon.tech');
  console.log('2. Selecciona tu base de datos');
  console.log('3. Abre SQL Editor');
  console.log('4. Ejecuta esta query:\n');
  
  console.log(`INSERT INTO "users" (
  id,
  email,
  name,
  "passwordHash",
  "profilePicture",
  role,
  "emailVerified",
  "subscriptionTier",
  "stripeCustomerId",
  "planType",
  "subscriptionStatus",
  "subscriptionEndDate",
  "createdAt",
  "updatedAt"
) VALUES (
  'admin_' || gen_random_uuid()::text,
  'admin@cementerio.com',
  'Administrador del Sistema',
  '${hash}',
  NULL,
  'ADMIN',
  true,
  'huella-eterna',
  NULL,
  'free',
  'inactive',
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;`);
  
  console.log('\n5. Verifica con esta query:');
  console.log('SELECT id, email, name, role, "emailVerified" FROM "users" WHERE email = \'admin@cementerio.com\';\n');
  console.log('═══════════════════════════════════════════════════════════\n');
}

generateAdminHash();
