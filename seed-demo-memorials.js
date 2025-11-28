const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const users = [
  { email: 'demo@example.com', name: 'Demo User', passwordHash: 'demo123' },
];

const memorials = [
  {
    name: 'Max',
    breed: 'Golden Retriever',
    animalType: 'perro',
    birthDate: new Date('2011-05-15'),
    deathDate: new Date('2023-05-15'),
    latitude: 40.4168,
    longitude: -3.7038,
    story: 'Max fue nuestro mejor amigo durante 12 años...',
    epitaph: 'En nuestros corazones por siempre',
    photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30628cda119?w=400',
    isPublic: true,
  },
  {
    name: 'Luna',
    breed: 'Siamese',
    animalType: 'gato',
    birthDate: new Date('2018-03-10'),
    deathDate: new Date('2023-08-20'),
    latitude: 41.3851,
    longitude: 2.1734,
    story: 'Luna era nuestra gata más bella...',
    epitaph: 'Su ronroneo vive en nuestras memorias',
    photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    isPublic: true,
  },
];

(async () => {
  try {
    console.log('Obteniendo usuario demo...');
    let user = await prisma.user.findUnique({
      where: { email: users[0].email },
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: users[0].email,
          name: users[0].name,
          passwordHash: users[0].passwordHash,
        },
      });
      console.log('✓ Usuario creado:', user.name);
    } else {
      console.log('✓ Usuario existente:', user.name);
    }

    console.log('Creando memoriales...');
    for (const memorial of memorials) {
      const profile = await prisma.animalProfile.create({
        data: {
          ...memorial,
          userId: user.id,
          slug: memorial.name.toLowerCase().replace(/\s+/g, '-'),
        },
      });
      console.log('✓ Memorial creado:', profile.name);
    }

    const count = await prisma.animalProfile.count();
    console.log(`\n✓ Total memoriales: ${count}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();
