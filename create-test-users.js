const API_BASE = 'http://localhost:3001/api';

// Test users data
const testUsers = [
  {
    name: 'Usuario Gratuito',
    email: 'gratuito@test.com',
    password: 'Test123456',
    plan: 'huella-eterna'
  },
  {
    name: 'Usuario Cielo Estrellas',
    email: 'cielo@test.com',
    password: 'Test123456',
    plan: 'cielo-estrellas'
  },
  {
    name: 'Usuario Premium Pro',
    email: 'premium@test.com',
    password: 'Test123456',
    plan: 'santuario-premium'
  }
];

// Test memorials data
const testMemorials = [
  {
    name: 'Perro Gratuito',
    animalType: 'perro',
    breed: 'Labrador',
    latitude: 40.4168,
    longitude: -3.7038,
    birthDate: '2015-03-15',
    deathDate: '2023-11-20',
    story: 'Un perro hermoso que llenó de alegría nuestras vidas',
    epitaph: 'Para siempre en nuestros corazones'
  },
  {
    name: 'Gato Cielo',
    animalType: 'gato',
    breed: 'Persa',
    latitude: 41.3851,
    longitude: 2.1734,
    birthDate: '2016-06-10',
    deathDate: '2024-08-15',
    story: 'Un gato hermoso con ojos azules que nos enseñó el significado del amor incondicional',
    epitaph: 'En el cielo de las estrellas'
  },
  {
    name: 'Ave Premium',
    animalType: 'ave',
    breed: 'Loro',
    latitude: 39.4699,
    longitude: -0.3763,
    birthDate: '2010-01-20',
    deathDate: '2024-10-05',
    story: 'Un loro inteligente que hizo reír a todos con sus imitaciones',
    epitaph: 'Vuela alto en el santuario premium'
  }
];

async function createUsers() {
  try {
    console.log('🚀 Creando usuarios de prueba...\n');

    for (let i = 0; i < testUsers.length; i++) {
      const user = testUsers[i];
      
      // Register user
      console.log(`📝 Registrando: ${user.name} (${user.email})`);
      const registerRes = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        })
      });

      const registerData = await registerRes.json();
      if (!registerData.success) {
        console.log('❌ Error en registro:', registerData.error);
        continue;
      }

      // Login to get token
      console.log(`🔐 Iniciando sesión...`);
      const loginRes = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      });

      const loginData = await loginRes.json();
      if (!loginData.success) {
        console.log('❌ Error en login:', loginData.error);
        continue;
      }

      const token = loginData.token;
      const userId = loginData.user.id;

      // Upgrade plan if not gratuito
      if (user.plan !== 'huella-eterna') {
        console.log(`👑 Actualizando plan a: ${user.plan}`);
        try {
          await fetch(`${API_BASE}/user/subscription`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ subscriptionTier: user.plan })
          });
        } catch (err) {
          console.log('⚠️ Plan actualizado');
        }
      }

      // Create memorial
      const memorial = testMemorials[i];
      console.log(`🐾 Creando memorial: ${memorial.name}`);

      const formData = new FormData();
      formData.append('name', memorial.name);
      formData.append('animalType', memorial.animalType);
      formData.append('breed', memorial.breed);
      formData.append('latitude', memorial.latitude.toString());
      formData.append('longitude', memorial.longitude.toString());
      formData.append('birthDate', memorial.birthDate);
      formData.append('deathDate', memorial.deathDate);
      formData.append('story', memorial.story);
      formData.append('epitaph', memorial.epitaph);
      formData.append('photoUrl', `https://via.placeholder.com/400x300?text=${memorial.name}`);

      try {
        const memorialRes = await fetch(`${API_BASE}/profiles`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        const memorialData = await memorialRes.json();
        if (memorialData.success) {
          console.log(`✅ Memorial creado: ${memorial.name}\n`);
        } else {
          console.log(`❌ Error al crear memorial: ${memorialData.error}\n`);
        }
      } catch (err) {
        console.log(`❌ Error al crear memorial:`, err.message, '\n');
      }
    }

    console.log('✅ ¡Usuarios y memoriales creados exitosamente!');
    console.log('\n📊 Resumen:');
    console.log('- Usuario Gratuito: gratuito@test.com');
    console.log('- Usuario Cielo Estrellas: cielo@test.com');
    console.log('- Usuario Premium Pro: premium@test.com');
    console.log('\nTodos con contraseña: Test123456');
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

createUsers();
