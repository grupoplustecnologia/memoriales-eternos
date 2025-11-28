/**
 * Script para verificar y reparar las fotos de los memoriales
 * Reemplaza URLs rotas por URLs válidas de imágenes
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// URLs de imágenes reales y funcionales por tipo de animal
const petImages = {
  gato: [
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515041929556-993faf1ae4fa?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506755855726-75d0a3f3e8f5?w=600&h=400&fit=crop&q=80'
  ],
  perro: [
    'https://images.unsplash.com/photo-1633722715463-d30628519b06?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1633722715463-d30628519b06?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1601003768097-0d4991fe37d1?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587300411515-150e50846dbe?w=600&h=400&fit=crop&q=80'
  ],
  ave: [
    'https://images.unsplash.com/photo-1444464666175-1642a9f1dd12?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1444464666388-a5c0a1f65f4d?w=600&h=400&fit=crop&q=80'
  ],
  roedor: [
    'https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f6?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f6?w=600&h=400&fit=crop&q=80'
  ]
};

async function fixPhotos() {
  try {
    console.log('🔧 Verificando y reparando fotos de memoriales...\n');

    const profiles = await prisma.animalProfile.findMany({
      select: {
        id: true,
        name: true,
        animalType: true,
        photoUrl: true,
        user: { select: { name: true } }
      }
    });

    console.log(`📊 Total de memoriales: ${profiles.length}\n`);

    let fixed = 0;
    let valid = 0;

    for (const profile of profiles) {
      console.log(`\n🪦 ${profile.name} (${profile.animalType})`);
      console.log(`   Usuario: ${profile.user.name}`);
      console.log(`   URL actual: ${profile.photoUrl}`);

      // Verificar si la URL es válida
      const urlCheck = await fetch(profile.photoUrl, { method: 'HEAD' })
        .then(() => true)
        .catch(() => false);

      if (!urlCheck) {
        console.log(`   ❌ Imagen rota o no accesible`);

        // Asignar imagen válida según tipo de animal
        const animalType = profile.animalType.toLowerCase();
        const images = petImages[animalType] || petImages.perro;
        const newUrl = images[Math.floor(Math.random() * images.length)];

        await prisma.animalProfile.update({
          where: { id: profile.id },
          data: { photoUrl: newUrl }
        });

        console.log(`   ✅ Reparada con: ${newUrl}`);
        fixed++;
      } else {
        console.log(`   ✅ Imagen válida`);
        valid++;
      }
    }

    console.log(`\n\n✨ Verificación completada:`);
    console.log(`   ✅ Imágenes válidas: ${valid}`);
    console.log(`   🔧 Imágenes reparadas: ${fixed}`);
    console.log(`   📊 Total procesado: ${profiles.length}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixPhotos();
