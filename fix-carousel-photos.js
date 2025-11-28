const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// URLs de Unsplash reales y funcionantes por tipo de animal
const animalPhotoURLs = {
  gato: [
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop&q=80', // Gato naranja
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&h=600&fit=crop&q=80', // Gato blanco
    'https://images.unsplash.com/photo-1495329325038-6e1f1b12d718?w=600&h=600&fit=crop&q=80', // Gato gris
    'https://images.unsplash.com/photo-1506755855726-216f66b6cc1f?w=600&h=600&fit=crop&q=80', // Gato negro
  ],
  perro: [
    'https://images.unsplash.com/photo-1633722715463-d30628519b06?w=600&h=600&fit=crop&q=80', // Perro labrador
    'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=600&fit=crop&q=80', // Perro dorado
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop&q=80', // Perro pequeño
    'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=600&h=600&fit=crop&q=80', // Perro corriendo
    'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=600&fit=crop&q=80', // Perro jugando
  ],
  ave: [
    'https://images.unsplash.com/photo-1516270893912-ab8e38ebaac0?w=600&h=600&fit=crop&q=80', // Loro colorido
    'https://images.unsplash.com/photo-1444464666175-1642a9f1dd12?w=600&h=600&fit=crop&q=80', // Loro rojo
  ],
  roedor: [
    'https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f6?w=600&h=600&fit=crop&q=80', // Conejillo
    'https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f6?w=600&h=600&fit=crop&q=80', // Hámster
  ],
  reptil: [
    'https://images.unsplash.com/photo-1531761155a2-f926ec84f5e4?w=600&h=600&fit=crop&q=80', // Lagarto
  ],
  otro: [
    'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=600&fit=crop&q=80', // Mascota genérica
  ]
};

async function fixCarouselPhotos() {
  try {
    console.log('🔧 Reparando fotos del carrusel...\n');

    // Obtener todos los perfiles
    const profiles = await prisma.animalProfile.findMany({
      select: {
        id: true,
        name: true,
        animalType: true,
        photoUrl: true,
      }
    });

    console.log(`📊 Total de perfiles encontrados: ${profiles.length}\n`);

    let updated = 0;
    let skipped = 0;

    for (const profile of profiles) {
      const animalType = profile.animalType || 'otro';
      const photos = animalPhotoURLs[animalType] || animalPhotoURLs.otro;
      
      // Seleccionar una foto aleatoria del tipo de animal
      const randomIndex = Math.floor(Math.random() * photos.length);
      const newPhotoUrl = photos[randomIndex];

      // Actualizar solo si es diferente
      if (profile.photoUrl !== newPhotoUrl) {
        await prisma.animalProfile.update({
          where: { id: profile.id },
          data: { photoUrl: newPhotoUrl }
        });
        
        console.log(`✅ ${profile.name} (${animalType}) - Foto actualizada`);
        console.log(`   URL: ${newPhotoUrl}`);
        updated++;
      } else {
        skipped++;
      }
    }

    console.log(`\n✨ Reparación completada:`);
    console.log(`   ✅ Fotos actualizadas: ${updated}`);
    console.log(`   ⏭️  Fotos sin cambios: ${skipped}`);
    console.log(`   📊 Total procesado: ${profiles.length}`);

  } catch (error) {
    console.error('❌ Error al reparar fotos:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixCarouselPhotos();
