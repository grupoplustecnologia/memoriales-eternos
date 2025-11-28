import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(name: string, animalType: string): string {
  return `${name}-${animalType}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50);
}

async function seedMoreMemorials() {
  try {
    console.log('🌱 Sembrando 5 memoriales más...\n');

    const user = await prisma.user.findFirst({
      where: { email: 'demo@forever-pet-friend.local' },
    });

    if (!user) {
      console.log('❌ Usuario no encontrado');
      return;
    }

    const additionalMemorials = [
      {
        name: 'Bella',
        animalType: 'gato',
        breed: 'Persa Blanco',
        birthDate: new Date('2016-02-10'),
        deathDate: new Date('2024-01-15'),
        latitude: 43.2965,
        longitude: -8.2416,
        story:
          'Bella fue una gata elegante y refinada que reinó en nuestro hogar. Sus ojos azules eran tan profundos como el océano. Disfrutaba de las siestas al sol y los mimos sin final.',
        epitaph: 'Belleza y gracia en cada ronroneo',
        photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
      },
      {
        name: 'Rocky',
        animalType: 'perro',
        breed: 'Pastor Alemán',
        birthDate: new Date('2013-07-22'),
        deathDate: new Date('2023-03-10'),
        latitude: 42.8781,
        longitude: -8.5430,
        story:
          'Rocky fue un perro valiente y leal. Nos protegió y acompañó en cada aventura. Su inteligencia era incomparable y su amor incondicional nos enseñó qué significa verdadera lealtad.',
        epitaph: 'Nuestro héroe de cuatro patas',
        photoUrl: 'https://images.unsplash.com/photo-1608848461950-0fed8e8f6c1b?w=400&h=400&fit=crop',
      },
      {
        name: 'Pepita',
        animalType: 'ave',
        breed: 'Periquito Australiano',
        birthDate: new Date('2019-04-05'),
        deathDate: new Date('2024-06-20'),
        latitude: 39.4699,
        longitude: -0.3763,
        story:
          'Pepita fue un pequeño pajarito lleno de energía. Sus colores brillantes alegraban cada rincón de la casa. Su canto matutino era lo primero que escuchábamos cada día.',
        epitaph: 'Pequeño en tamaño, gigante en amor',
        photoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop',
      },
      {
        name: 'Muffin',
        animalType: 'roedor',
        breed: 'Hámster Sirio',
        birthDate: new Date('2021-08-12'),
        deathDate: new Date('2023-10-05'),
        latitude: 37.3891,
        longitude: -5.9844,
        story:
          'Muffin fue un pequeño hámster adorable. Le encantaba su rueda y guardar semillas en sus mejillas. Fue nuestra compañía durante dos años llenos de ternura.',
        epitaph: 'Pequeño pero inmortal en nuestros recuerdos',
        photoUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4d4b35a?w=400&h=400&fit=crop',
      },
      {
        name: 'Dragon',
        animalType: 'reptil',
        breed: 'Dragón Barbudo',
        birthDate: new Date('2018-11-20'),
        deathDate: new Date('2024-08-18'),
        latitude: 36.7213,
        longitude: -4.4216,
        story:
          'Dragon fue un reptil fascinante con personalidad única. Le encantaba tomar el sol y mover su barba. Nos enseñó que la naturaleza es increíble en todas sus formas.',
        epitaph: 'Exótico, especial, siempre recordado',
        photoUrl: 'https://images.unsplash.com/photo-1527004760902-c53a91af2774?w=400&h=400&fit=crop',
      },
    ];

    let created = 0;
    for (const memorial of additionalMemorials) {
      const slug = generateSlug(memorial.name, memorial.animalType);

      try {
        const profile = await prisma.animalProfile.create({
          data: {
            slug,
            userId: user.id,
            name: memorial.name,
            animalType: memorial.animalType,
            breed: memorial.breed,
            birthDate: memorial.birthDate,
            deathDate: memorial.deathDate,
            latitude: memorial.latitude,
            longitude: memorial.longitude,
            story: memorial.story,
            epitaph: memorial.epitaph,
            photoUrl: memorial.photoUrl,
            isPublic: true,
            viewCount: Math.floor(Math.random() * 150),
          },
        });

        created++;
        console.log(`✅ ${profile.name} → /memorial/${profile.slug}`);
      } catch (error) {
        console.error(`❌ Error creando ${memorial.name}:`, error);
      }
    }

    console.log(`\n✨ ${created} memoriales adicionales creados`);
    
    // Mostrar total
    const total = await prisma.animalProfile.count();
    console.log(`\n📊 Total de memoriales ahora: ${total}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedMoreMemorials();
