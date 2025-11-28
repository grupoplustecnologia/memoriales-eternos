const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const memorialsData = [
  // Más perros
  { name: 'Rocky', breed: 'Labrador', animalType: 'perro', birthDate: new Date('2015-03-20'), deathDate: new Date('2023-11-10'), latitude: 42.3601, longitude: -71.0589, story: 'Rocky fue un compañero leal durante 8 años', epitaph: 'Siempre en nuestros corazones', photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30628cda119?w=400', isPublic: true },
  { name: 'Bella', breed: 'Beagle', animalType: 'perro', birthDate: new Date('2016-07-14'), deathDate: new Date('2023-10-05'), latitude: 51.5074, longitude: -0.1278, story: 'Bella traía alegría a cada día', epitaph: 'Tu amor vivirá por siempre', photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30628cda119?w=400', isPublic: true },
  { name: 'Charlie', breed: 'Pastor Alemán', animalType: 'perro', birthDate: new Date('2014-01-10'), deathDate: new Date('2023-09-22'), latitude: 48.8566, longitude: 2.3522, story: 'Charlie fue el protector de la familia', epitaph: 'Eternamente mi guardián', photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30628cda119?w=400', isPublic: true },
  { name: 'Daisy', breed: 'Cocker Spaniel', animalType: 'perro', birthDate: new Date('2018-05-22'), deathDate: new Date('2023-08-30'), latitude: 41.3851, longitude: 2.1734, story: 'Daisy era energía y amor puro', epitaph: 'Tu espíritu nunca morirá', photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30628cda119?w=400', isPublic: true },
  { name: 'Él', breed: 'Husky', animalType: 'perro', birthDate: new Date('2013-11-03'), deathDate: new Date('2023-12-01'), latitude: 39.4699, longitude: -0.3763, story: 'Él fue nuestro mejor amigo', epitaph: 'Siempre en nuestros recuerdos', photoUrl: 'https://images.unsplash.com/photo-1633722715463-d30628cda119?w=400', isPublic: true },

  // Más gatos
  { name: 'Mimi', breed: 'Persa', animalType: 'gato', birthDate: new Date('2017-02-14'), deathDate: new Date('2023-11-20'), latitude: 43.2965, longitude: -2.9134, story: 'Mimi era la princesa de la casa', epitaph: 'Tu ronroneo vivirá en nuestros corazones', photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', isPublic: true },
  { name: 'Tigre', breed: 'Gato Bengalí', animalType: 'gato', birthDate: new Date('2015-08-19'), deathDate: new Date('2023-10-15'), latitude: 37.3826, longitude: -5.9734, story: 'Tigre era salvaje y cariñoso', epitaph: 'Tu belleza nos inspiró siempre', photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', isPublic: true },
  { name: 'Pelusa', breed: 'Angora', animalType: 'gato', birthDate: new Date('2018-04-07'), deathDate: new Date('2023-09-28'), latitude: 38.2975, longitude: -0.7309, story: 'Pelusa fue nuestro compañero fiel', epitaph: 'Tu ternura nos acompaña siempre', photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', isPublic: true },
  { name: 'Noche', breed: 'Gato Negro', animalType: 'gato', birthDate: new Date('2016-10-31'), deathDate: new Date('2023-11-05'), latitude: 41.8919, longitude: -8.2473, story: 'Noche era misterio y amor', epitaph: 'Tu magia vivirá eternamente', photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', isPublic: true },
  { name: 'Snowball', breed: 'Gato Blanco', animalType: 'gato', birthDate: new Date('2014-12-25'), deathDate: new Date('2023-08-18'), latitude: 40.2238, longitude: -3.7490, story: 'Snowball fue puro y blanco', epitaph: 'Tu pureza nos enseñó amor', photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', isPublic: true },

  // Aves
  { name: 'Tweety', breed: 'Canario', animalType: 'ave', birthDate: new Date('2019-03-15'), deathDate: new Date('2023-11-12'), latitude: 36.1699, longitude: -3.5985, story: 'Tweety cantaba las melodías más hermosas', epitaph: 'Tu canción vivirá para siempre', photoUrl: 'https://images.unsplash.com/photo-1444464666175-1cff94d85e8b?w=400', isPublic: true },
  { name: 'Loro', breed: 'Loro Gris', animalType: 'ave', birthDate: new Date('2010-06-20'), deathDate: new Date('2023-10-25'), latitude: 43.3518, longitude: -8.4115, story: 'Loro fue un compañero inteligente y divertido', epitaph: 'Tu sabiduría nos guiará siempre', photoUrl: 'https://images.unsplash.com/photo-1444464666175-1cff94d85e8b?w=400', isPublic: true },

  // Roedores
  { name: 'Pequeño', breed: 'Hamster', animalType: 'roedor', birthDate: new Date('2021-01-10'), deathDate: new Date('2023-11-18'), latitude: 42.8746, longitude: -8.5349, story: 'Pequeño fue grande en amor', epitaph: 'Tu ternura nos tocó el corazón', photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', isPublic: true },
  { name: 'Conejito', breed: 'Conejo', animalType: 'roedor', birthDate: new Date('2020-05-14'), deathDate: new Date('2023-09-03'), latitude: 39.8711, longitude: -4.7561, story: 'Conejito saltaba lleno de vida', epitaph: 'Tu alegría nos hizo felices', photoUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400', isPublic: true },

  // Reptiles
  { name: 'Dragón', breed: 'Dragón Barbudo', animalType: 'reptil', birthDate: new Date('2016-08-22'), deathDate: new Date('2023-11-10'), latitude: 41.6852, longitude: -0.8957, story: 'Dragón fue exótico y fascinante', epitaph: 'Tu misterio vivirá eternamente', photoUrl: 'https://images.unsplash.com/photo-1608848461950-0fed8fc6ff60?w=400', isPublic: true },
  { name: 'Serpiente', breed: 'Serpiente Maíz', animalType: 'reptil', birthDate: new Date('2018-03-11'), deathDate: new Date('2023-10-20'), latitude: 37.2753, longitude: -3.7496, story: 'Serpiente fue elegante y cautelosa', epitaph: 'Tu gracia nos inspiró siempre', photoUrl: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400', isPublic: true },

  // Otros
  { name: 'Conejín', breed: 'Cobaya', animalType: 'otro', birthDate: new Date('2019-07-08'), deathDate: new Date('2023-11-08'), latitude: 38.6954, longitude: -1.1300, story: 'Conejín fue tierno y amigable', epitaph: 'Tu cariño vivirá por siempre', photoUrl: 'https://images.unsplash.com/photo-1585329033456-5268d3acacf7?w=400', isPublic: true },
  { name: 'Loro Chico', breed: 'Periquito', animalType: 'otro', birthDate: new Date('2020-09-19'), deathDate: new Date('2023-10-11'), latitude: 41.0082, longitude: -77.1093, story: 'Loro Chico fue pequeño pero especial', epitaph: 'Tu memoria nos acompaña siempre', photoUrl: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400', isPublic: true },
];

(async () => {
  try {
    console.log('Obteniendo usuario demo...');
    let user = await prisma.user.findUnique({
      where: { email: 'demo@example.com' },
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'demo@example.com',
          name: 'Demo User',
          passwordHash: 'demo123',
        },
      });
      console.log('✓ Usuario creado:', user.name);
    } else {
      console.log('✓ Usuario existente:', user.name);
    }

    console.log('\nCreando memoriales...');
    let created = 0;
    for (const memorial of memorialsData) {
      try {
        const profile = await prisma.animalProfile.create({
          data: {
            ...memorial,
            userId: user.id,
            slug: memorial.name.toLowerCase().replace(/\s+/g, '-'),
          },
        });
        console.log(`✓ ${created + 1}. ${profile.name} (${profile.animalType})`);
        created++;
      } catch (e) {
        console.log(`✗ Error con ${memorial.name}:`, e.message.split('\n')[0]);
      }
    }

    const total = await prisma.animalProfile.count();
    const publicCount = await prisma.animalProfile.count({ where: { isPublic: true } });
    
    console.log(`\n✓ Memoriales creados: ${created}`);
    console.log(`✓ Total en BD: ${total}`);
    console.log(`✓ Públicos: ${publicCount}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();
