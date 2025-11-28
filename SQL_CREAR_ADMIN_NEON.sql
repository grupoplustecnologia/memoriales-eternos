-- ============================================================
-- CREAR USUARIO ADMIN EN NEON
-- ============================================================
-- Ejecuta esta query en el SQL Editor de Neon Console
-- https://console.neon.tech

-- Hash bcryptjs para: Admin@2025!
-- Para cambiar la contraseña, genera un nuevo hash:
-- const bcrypt = require('bcryptjs');
-- bcrypt.hash('TuPassword123!', 10).then(hash => console.log(hash));

INSERT INTO "users" (
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
  '$2b$10$nOeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
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
ON CONFLICT (email) DO NOTHING;

-- Verificar que se creó correctamente
SELECT id, email, name, role, "emailVerified", "createdAt" FROM "users" WHERE email = 'admin@cementerio.com';
