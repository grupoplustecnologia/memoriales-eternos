const { PrismaClient } = require('@prisma/client');
const { createHash } = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

const spainCities = [
  { name: 'Ronda', region: 'Andalucía' },
  { name: 'Cuenca', region: 'Castilla-La Mancha' },
  { name: 'Óbidos', region: 'Castilla y León' },
  { name: 'Alarcón', region: 'Castilla-La Mancha' },
  { name: 'Frigiliana', region: 'Andalucía' },
  { name: 'Besalú', region: 'Cataluña' },
  { name: 'Pedraza', region: 'Castilla y León' },
  { name: 'Olite', region: 'Navarra' },
  { name: 'Salares', region: 'Andalucía' },
  { name: 'Pals', region: 'Cataluña' }
];

const dogImages = [
  'https://images.unsplash.com/photo-1633722715463-d30628ae4ee7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1612536315635-c69b58a8e21d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587300411515-9f47aa2d2b9a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=crop'
];

const catImages = [
  'https://images.unsplash.com/photo-1573865526014-f3550beaae6e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop'
];

const dogNames = ['Max', 'Luna', 'Rocky', 'Bella', 'Rex'];
const catNames = ['Misa', 'Gato', 'Félix', 'Shadow', 'Nieve'];

async function main() {
  try {
    console.log('👥 Creando 10 usuarios nuevos con 10 memoriales...\n');

    let userCount = 0;
    let memorialCount = 0;

    for (let i = 0; i < 10; i++) {
      const city = spainCities[i];
      const email = `usuario${i + 1}@memorias-eternas.local`;
      const password = `Password${i + 1}!`;
      
      // Check if user exists
      let user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: email,
            name: `Usuario ${i + 1}`,
            passwordHash: hashPassword(password),
            emailVerified: true,
            subscriptionTier: 'huella-eterna',
            role: 'user',
            profilePicture: `https://images.unsplash.com/photo-160${i}03211169-0a1dd7228f2d?w=400&h=400&fit=crop`
          }
        });
        userCount++;
        console.log(`✅ Usuario ${i + 1} creado: ${email}`);
      } else {
        console.log(`⏭️  Usuario ${i + 1} ya existe: ${email}`);
      }

      // Create memorial (alternating dogs and cats)
      const isDog = i % 2 === 0;
      const animalType = isDog ? 'perro' : 'gato';
      const name = isDog ? dogNames[Math.floor(i / 2)] : catNames[Math.floor((i - 1) / 2)];
      const photoUrl = isDog ? dogImages[i % 5] : catImages[i % 5];

      // Random death date in the last 2 years
      const daysAgo = Math.floor(Math.random() * 730) + 30;
      const deathDate = new Date();
      deathDate.setDate(deathDate.getDate() - daysAgo);

      // Birth date (randomly between 5-15 years before death)
      const birthDate = new Date(deathDate);
      birthDate.setFullYear(birthDate.getFullYear() - (Math.floor(Math.random() * 10) + 5));

      // Random coordinates in Spain
      const latRange = [36.5, 43.5]; // Spain latitude range
      const lonRange = [-9.3, 3.3];  // Spain longitude range
      const latitude = latRange[0] + Math.random() * (latRange[1] - latRange[0]);
      const longitude = lonRange[0] + Math.random() * (lonRange[1] - lonRange[0]);

      const memorial = await prisma.animalProfile.create({
        data: {
          name: `${name} de ${city.name}`,
          userId: user.id,
          animalType: animalType,
          breed: isDog ? 'Mixto' : 'Doméstico',
          photoUrl: photoUrl,
          birthDate: birthDate,
          deathDate: deathDate,
          latitude: latitude,
          longitude: longitude,
          story: `Querido memorial de ${name}, quien vivió en ${city.name}, ${city.region}. Una vida llena de amor y momentos inolvidables que siempre guardaremos en nuestros corazones.`,
          epitaph: `Aquí descansa ${name}, un compañero fiel que trajo alegría a nuestras vidas.`,
          isPublic: true,
          viewCount: Math.floor(Math.random() * 200) + 10
        }
      });

      memorialCount++;
      console.log(`   📸 Memorial creado: ${name} (${animalType}) - ${city.name}`);
    }

    console.log(`\n✅ Resumen:`);
    console.log(`   - Usuarios nuevos creados: ${userCount}`);
    console.log(`   - Memoriales creados: ${memorialCount}`);
    console.log(`   - Total perros: 5`);
    console.log(`   - Total gatos: 5`);
    console.log(`\n🌍 Ubicaciones (pueblos de España):`);
    spainCities.forEach((city, idx) => {
      console.log(`   ${idx + 1}. ${city.name} (${city.region})`);
    });

    console.log(`\n📝 Credenciales de usuarios:`);
    for (let i = 0; i < 10; i++) {
      console.log(`   Usuario ${i + 1}: usuario${i + 1}@memorias-eternas.local / Password${i + 1}!`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
