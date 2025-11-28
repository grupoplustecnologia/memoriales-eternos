const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('\n🔒 ========== TEST PRIVACY SETTINGS ==========\n');

    // 1. Crear usuario de prueba
    console.log('1️⃣  Creando usuario de prueba...');
    const testUser = await prisma.user.upsert({
      where: { email: 'privacy-test@example.com' },
      update: {},
      create: {
        email: 'privacy-test@example.com',
        name: 'Test Privacy User',
        passwordHash: 'hashed-password-test',
      },
    });
    console.log(`✅ Usuario creado: ${testUser.email}`);
    console.log(`   ID: ${testUser.id}`);

    // 2. Crear sesión válida para testing
    console.log('\n2️⃣  Creando sesión de prueba...');
    const testToken = 'test-privacy-token-' + Date.now();
    const session = await prisma.session.create({
      data: {
        userId: testUser.id,
        token: testToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
        deviceName: 'Test Device',
      },
    });
    console.log(`✅ Sesión creada con token`);
    console.log(`   Token: ${testToken.substring(0, 30)}...`);

    // 3. Verificar Privacy Settings en DB
    console.log('3️⃣  Verificando Privacy Settings en Base de Datos...');
    let privacySettings = await prisma.privacySettings.findUnique({
      where: { userId: testUser.id },
    });

    if (privacySettings) {
      console.log('✅ Privacy Settings encontradas en DB');
      console.log('   Valores iniciales:');
      console.log(`   - profilePublic: ${privacySettings.profilePublic}`);
      console.log(`   - memorialsVisible: ${privacySettings.memorialsVisible}`);
      console.log(`   - anonymousTributes: ${privacySettings.anonymousTributes}`);
      console.log(`   - publicStats: ${privacySettings.publicStats}`);
      console.log(`   - searchEngineIndexing: ${privacySettings.searchEngineIndexing}`);
    } else {
      console.log('⚠️  No hay Privacy Settings para este usuario (se crearán en la primera llamada)');
    }

    // 4. Actualizar directamente en DB
    console.log('\n4️⃣  Actualizando Privacy Settings en Base de Datos...');
    const newSettings = {
      profilePublic: false,
      memorialsVisible: true,
      anonymousTributes: true,
      publicStats: false,
      searchEngineIndexing: true,
    };

    const updated = await prisma.privacySettings.upsert({
      where: { userId: testUser.id },
      update: newSettings,
      create: {
        userId: testUser.id,
        ...newSettings,
      },
    });

    console.log('✅ Privacy Settings actualizadas');
    console.log('   Nuevos valores:');
    console.log(`   - profilePublic: ${updated.profilePublic}`);
    console.log(`   - memorialsVisible: ${updated.memorialsVisible}`);
    console.log(`   - anonymousTributes: ${updated.anonymousTributes}`);
    console.log(`   - publicStats: ${updated.publicStats}`);
    console.log(`   - searchEngineIndexing: ${updated.searchEngineIndexing}`);

    // 5. Verificar nuevamente
    console.log('\n5️⃣  Verificando cambios en Base de Datos...');
    const verified = await prisma.privacySettings.findUnique({
      where: { userId: testUser.id },
    });

    if (verified) {
      const allMatch = 
        verified.profilePublic === newSettings.profilePublic &&
        verified.memorialsVisible === newSettings.memorialsVisible &&
        verified.anonymousTributes === newSettings.anonymousTributes &&
        verified.publicStats === newSettings.publicStats &&
        verified.searchEngineIndexing === newSettings.searchEngineIndexing;
      
      if (allMatch) {
        console.log('✅ Todas las configuraciones se guardaron correctamente en DB');
      } else {
        console.log('❌ Algunas configuraciones no coinciden');
      }
    }

    // 6. Test de API: GET
    console.log('\n6️⃣  Probando API GET /api/privacy-settings...');
    try {
      const getResponse = await fetch('http://localhost:3002/api/privacy-settings', {
        headers: {
          'Authorization': `Bearer ${testToken}`,
        },
      });

      if (getResponse.ok) {
        const getResult = await getResponse.json();
        console.log('✅ GET exitoso');
        console.log('   Datos desde API:');
        console.log(`   - profilePublic: ${getResult.data.profilePublic}`);
        console.log(`   - memorialsVisible: ${getResult.data.memorialsVisible}`);
        console.log(`   - anonymousTributes: ${getResult.data.anonymousTributes}`);
        console.log(`   - publicStats: ${getResult.data.publicStats}`);
        console.log(`   - searchEngineIndexing: ${getResult.data.searchEngineIndexing}`);
      } else {
        console.log('❌ Error en GET:', getResponse.status);
        const error = await getResponse.json();
        console.log('   ', error.error || error.message);
      }
    } catch (error) {
      console.log('❌ Error conectando a API:', error.message);
    }

    // 7. Test de API: PUT
    console.log('\n7️⃣  Probando API PUT /api/privacy-settings...');
    const putSettings = {
      profilePublic: true,
      memorialsVisible: false,
      anonymousTributes: false,
      publicStats: true,
      searchEngineIndexing: true,
    };

    try {
      const putResponse = await fetch('http://localhost:3002/api/privacy-settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${testToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putSettings),
      });

      if (putResponse.ok) {
        const putResult = await putResponse.json();
        console.log('✅ PUT exitoso');
        console.log('   Nueva configuración desde API:');
        console.log(`   - profilePublic: ${putResult.data.profilePublic}`);
        console.log(`   - memorialsVisible: ${putResult.data.memorialsVisible}`);
        console.log(`   - anonymousTributes: ${putResult.data.anonymousTributes}`);
        console.log(`   - publicStats: ${putResult.data.publicStats}`);
        console.log(`   - searchEngineIndexing: ${putResult.data.searchEngineIndexing}`);
      } else {
        console.log('❌ Error en PUT:', putResponse.status);
        const error = await putResponse.json();
        console.log('   ', error.error || error.message);
      }
    } catch (error) {
      console.log('❌ Error conectando a API:', error.message);
    }

    console.log('\n✅ ========== TODOS LOS TESTS COMPLETADOS ==========\n');

    // Limpiar usuario de prueba
    await prisma.session.deleteMany({ where: { userId: testUser.id } });
    await prisma.user.delete({
      where: { id: testUser.id },
    });
    console.log('Limpieza: Usuario de prueba y sesión eliminados\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
