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

async function seedMemorials() {
  try {
    console.log('🌱 Sembrando memoriales con URLs amigables...\n');

    // Primero crear usuarios
    const user = await prisma.user.create({
      data: {
        email: 'demo@forever-pet-friend.local',
        name: 'Demo User',
        passwordHash: 'hashed_password_demo',
        emailVerified: true,
        subscriptionTier: 'santuario-premium',
        role: 'user',
      },
    });

    console.log(`✅ Usuario creado: ${user.email}\n`);

    // Memoriales de ejemplo
    const memorials = [
      {
        name: 'Luna',
        animalType: 'gato',
        breed: 'Gato Siamés',
        birthDate: new Date('2015-05-12'),
        deathDate: new Date('2023-11-20'),
        latitude: 40.4168,
        longitude: -3.7038,
        story:
          'Luna fue una gata maravillosa que llenó nuestras vidas de alegría durante 8 años. Le encantaba dormir en el sofá y ronronear cuando le acariciábamos. Sus ojos azules nos hablaban más que mil palabras. La extrañamos cada día.',
        epitaph: 'En nuestros corazones para siempre',
        photoUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&h=400&fit=crop',
      },
      {
        name: 'Máximo',
        animalType: 'perro',
        breed: 'Golden Retriever',
        birthDate: new Date('2014-03-18'),
        deathDate: new Date('2022-09-15'),
        latitude: 51.5074,
        longitude: -0.1278,
        story:
          'Máximo fue el mejor amigo que alguien pueda pedir. Cada mañana nos despertaba con su cola meneándose y nos acompañó en todas nuestras aventuras. Era un perro lleno de amor y energía.',
        epitaph: 'Un corazón de oro con cuatro patas',
        photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30628519bc0?w=400&h=400&fit=crop',
      },
      {
        name: 'Tweety',
        animalType: 'ave',
        breed: 'Canario',
        birthDate: new Date('2018-07-22'),
        deathDate: new Date('2023-05-10'),
        latitude: 48.8566,
        longitude: 2.3522,
        story:
          'Tweety fue un canario hermoso con un canto que alegraba nuestras mañanas. Durante cinco años nos acompañó con su melodía y su presencia alegre.',
        epitaph: 'Tu canto vive en nuestros recuerdos',
        photoUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop',
      },
      {
        name: 'Sofía',
        animalType: 'roedor',
        breed: 'Conejo',
        birthDate: new Date('2019-01-30'),
        deathDate: new Date('2023-08-12'),
        latitude: 39.4699,
        longitude: -0.3763,
        story:
          'Sofía fue un conejito suave y tierno que nos enseñó el significado de la paz. Le encantaban las zanahorias y pasar tiempo saltando en el jardín.',
        epitaph: 'Suave como una nube',
        photoUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4d4b35a?w=400&h=400&fit=crop',
      },
      {
        name: 'Iggy',
        animalType: 'reptil',
        breed: 'Iguana Verde',
        birthDate: new Date('2017-06-15'),
        deathDate: new Date('2023-12-01'),
        latitude: 37.7749,
        longitude: -122.4194,
        story:
          'Iggy fue una iguana fascinante que nos abrió los ojos a un mundo diferente. Con su piel verde brillante y su mirada penetrante, fue un compañero único.',
        epitaph: 'Exótico, especial, inolvidable',
        photoUrl: 'https://images.unsplash.com/photo-1527004760902-c53a91af2774?w=400&h=400&fit=crop',
      },
    ];

    let created = 0;
    for (const memorial of memorials) {
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
            viewCount: Math.floor(Math.random() * 100),
          },
        });

        created++;
        console.log(`✅ ${profile.name} → /memorial/${profile.slug}`);
      } catch (error) {
        console.error(`❌ Error creando ${memorial.name}:`, error);
      }
    }

    console.log(`\n✨ ${created} memoriales creados exitosamente\n`);

    // Mostrar URL de acceso
    console.log('🔗 URLs de acceso:');
    memorials.slice(0, 3).forEach((m) => {
      const slug = generateSlug(m.name, m.animalType);
      console.log(`   http://localhost:3000/memorial/${slug}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedMemorials();
