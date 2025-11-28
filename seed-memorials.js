const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ANIMAL_TYPES = ['perro', 'gato', 'ave', 'roedor', 'reptil', 'otro'];

const profiles = [
  {
    name: 'Max',
    animalType: 'perro',
    breed: 'Golden Retriever',
    story: 'Max fue mi compañero fiel durante 12 años. Cada mañana nos despertaba con su cola meneándose, listo para cualquier aventura. Sus ojos siempre reflejaban amor incondicional. Compartimos incontables paseos por el parque, risas y momentos especiales que nunca olvidaré.',
    epitaph: 'Un amigo para toda la vida'
  },
  {
    name: 'Luna',
    animalType: 'gato',
    breed: 'Gato Siamés',
    story: 'Luna era la reina del hogar. Con sus ojos azules intensos, conquistaba a todos los que la conocían. Le encantaba acurrucarse en mi regazo mientras miraba películas. Sus ronroneos eran música para mis oídos.',
    epitaph: 'Gracia y elegancia en cada paso'
  },
  {
    name: 'Tweety',
    animalType: 'ave',
    breed: 'Canario',
    story: 'Tweety llenaba nuestro hogar con sus bellos cantos cada mañana. Era un pequeño sol amarillo que traía alegría a toda la familia. Durante 8 años, fue nuestro despertador natural y nuestro mejor amigo cantarín.',
    epitaph: 'Tu canción vivirá por siempre en nuestros corazones'
  },
  {
    name: 'Nibbles',
    animalType: 'roedor',
    breed: 'Hámster',
    story: 'Nibbles era nuestro pequeño explorador. Con sus mejillas llenas y su nariz rosada, era el roedor más adorable. Nos enseñó que los seres pequeños tienen corazones enormes llenos de vida y energía.',
    epitaph: 'Pequeño en tamaño, gigante en amor'
  },
  {
    name: 'Smaug',
    animalType: 'reptil',
    breed: 'Iguana Verde',
    story: 'Smaug era nuestro dragón de escamas verdes. Aunque muchos piensan que las iguanas son frías, Smaug tenía una personalidad cálida y única. Nos enseñó a apreciar la belleza de la naturaleza en sus formas más exóticas.',
    epitaph: 'El rey de las escamas'
  },
  {
    name: 'Bella',
    animalType: 'perro',
    breed: 'Labrador Chocolate',
    story: 'Bella fue más que una mascota, fue parte de la familia. Su cola nunca dejaba de mover, su entusiasmo era contagioso. Creció con nosotros, nos apoyó en los momentos difíciles y celebró todos nuestros triunfos con nosotros.',
    epitaph: 'Tu amor nos transformó'
  },
  {
    name: 'Whiskers',
    animalType: 'gato',
    breed: 'Gato Persa',
    story: 'Whiskers era sofisticado y misterioso. Su pelaje blanco y esponjoso era hermoso, pero su carácter era aún más especial. Nos enseñó la importancia de la independencia y la dignidad, incluso en los momentos más difíciles.',
    epitaph: 'La dignidad personificada'
  },
  {
    name: 'Rocky',
    animalType: 'roedor',
    breed: 'Conejo',
    story: 'Rocky era un pequeño saltador lleno de vida. Sus orejas se movían cuando escuchaba sonidos nuevos, y su curiosidad era infinita. Los 5 años que pasó con nosotros fueron llenados de momentos tiernos y juegos compartidos.',
    epitaph: 'Pequeño pero invencible'
  },
  {
    name: 'Kiwi',
    animalType: 'ave',
    breed: 'Loro Amazonas',
    story: 'Kiwi era un loro colorido y parlanchín que llenaba nuestro hogar de risas. Aprendió a decir frases chistosas y a saludar a todos los que llegaban a casa. Sus colores vibrantes y su personalidad alegre nos dejaron recuerdos inolvidables.',
    epitaph: 'Tu alegría sigue cantando en nuestras almas'
  },
  {
    name: 'Charlie',
    animalType: 'otro',
    breed: 'Hamster Enano',
    story: 'Charlie era pequeñito pero tenía una historia grande. Como mi primer animal, me enseñó la responsabilidad y el amor incondicional. Sus ruedas de ejercicio sonaban cada noche, recordándome su presencia constante y su espíritu luchador.',
    epitaph: 'Mi primer amor de cuatro patas'
  }
];

const tributeMessages = [
  'Tu amor y lealtad nos enseñaron el verdadero significado de la amistad. Siempre te recordaremos con cariño.',
  'Cada recuerdo a tu lado es un tesoro que guardaremos por siempre en nuestros corazones.',
  'Gracias por los años de felicidad, risas y momentos inolvidables que compartimos juntos.',
  'Tu espíritu libre y alegre vivirá eternamente en nuestras memorias más preciadas.',
  'Fuiste más que una mascota, fuiste un miembro especial de nuestra familia que dejará un hueco imposible de llenar.',
  'Los momentos que compartimos contigo fueron los más preciosos de nuestras vidas.',
  'Tu ausencia duele, pero los recuerdos hermosos que nos dejaste nos dan consuelo.',
  'Siempre estarás en nuestros corazones, en cada atardecer y cada nuevo día.',
  'Descansa en paz, nuestro querido amigo. Tu legado de amor vivirá por siempre.',
  'Te echamos de menos, pero sabemos que estás en un lugar mejor, sin dolor ni sufrimiento.'
];

const tributeVisitors = [
  'María García', 'Juan López', 'Ana Rodríguez', 'Carlos Martín', 'Sofía Pérez',
  'Miguel Ángel', 'Rosa Fernández', 'Antonio Sánchez', 'Cristina Díaz', 'Fernando González'
];

// Real Unsplash photos by animal type - DIFFERENT for each animal
const animalPhotos = {
  perro: [
    ['https://images.unsplash.com/photo-1633722715463-d30628519b49?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1633627057539-0d5dbe49d8c7?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop'], // Max
    ['https://images.unsplash.com/photo-1633722715463-d30628519b49?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1633627057539-0d5dbe49d8c7?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop'] // Bella
  ],
  gato: [
    ['https://images.unsplash.com/photo-1574158622682-e40ad41fdb73?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1573865526014-f3550b1bbe60?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&h=400&fit=crop'], // Luna
    ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1513360371669-4a0eb3e4d4be?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1564169897670-e42bb2f5aaa5?w=400&h=400&fit=crop'] // Whiskers
  ],
  ave: [
    ['https://images.unsplash.com/photo-1444464666175-1642a9e41e60?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1444464666175-1642a9e41e60?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1544923408-75c313fbe2f5?w=400&h=400&fit=crop'], // Tweety
    ['https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop'] // Kiwi
  ],
  roedor: [
    ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1585849586173-0a55a7fbe2fb?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1585849586173-0a55a7fbe2fb?w=400&h=400&fit=crop'], // Nibbles
    ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1585849586173-0a55a7fbe2fb?w=400&h=400&fit=crop'] // Rocky
  ],
  reptil: [
    ['https://images.unsplash.com/photo-1500831969875-461f8fcd4d15?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1531746790731-6c087fecd165?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=400&h=400&fit=crop'] // Smaug
  ],
  otro: [
    ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1585849586173-0a55a7fbe2fb?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400&h=400&fit=crop'] // Charlie
  ]
};

// Spain coordinates spread across different regions
const spainCoordinates = [
  { lat: 40.4168, lng: -3.7038 },  // Madrid
  { lat: 41.3851, lng: 2.1734 },   // Barcelona
  { lat: 37.3891, lng: -5.9845 },  // Sevilla
  { lat: 39.4699, lng: -0.3763 },  // Valencia
  { lat: 43.2632, lng: -8.7434 },  // Vigo
  { lat: 42.3481, lng: -3.0996 },  // Valladolid
  { lat: 39.9429, lng: 4.7698 },   // Palma de Mallorca
  { lat: 36.7353, lng: -4.4214 },  // Málaga
  { lat: 37.1898, lng: -3.6386 },  // Granada
  { lat: 42.6954, lng: -8.6361 }   // Santiago de Compostela
];

async function seedDatabase() {
  try {
    console.log('\n========== INSERTING MEMORIAL DATA ==========\n');

    // Get a user to be the owner of profiles
    let user = await prisma.user.findFirst();
    if (!user) {
      console.log('Creating demo user...');
      user = await prisma.user.create({
        data: {
          name: 'Demo User',
          email: 'demo-memorials@test.com',
          passwordHash: 'hashedpassword',
          subscriptionTier: 'santuario-premium',
          role: 'user'
        }
      });
    }

    console.log(`Using user: ${user.name} (${user.id})\n`);

    // Create profiles with coordinates spread across Spain
    const createdProfiles = [];
    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i];
      // Use specific Spain coordinates for each profile
      const coords = spainCoordinates[i];
      const latitude = coords.lat + (Math.random() - 0.5) * 0.05;
      const longitude = coords.lng + (Math.random() - 0.5) * 0.05;

      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - Math.floor(Math.random() * 15 + 3));

      const deathDate = new Date(birthDate);
      deathDate.setFullYear(deathDate.getFullYear() + Math.floor(Math.random() * 12 + 3));

      // Get photos for this specific animal
      let photoUrl, gallery;
      if (profile.animalType === 'perro') {
        const dogPhotos = i === 0 ? animalPhotos.perro[0] : animalPhotos.perro[1];
        photoUrl = dogPhotos[0];
        gallery = [dogPhotos[1], dogPhotos[2]];
      } else if (profile.animalType === 'gato') {
        const catPhotos = i === 1 ? animalPhotos.gato[0] : animalPhotos.gato[1];
        photoUrl = catPhotos[0];
        gallery = [catPhotos[1], catPhotos[2]];
      } else if (profile.animalType === 'ave') {
        const birdPhotos = i === 2 ? animalPhotos.ave[0] : animalPhotos.ave[1];
        photoUrl = birdPhotos[0];
        gallery = [birdPhotos[1], birdPhotos[2]];
      } else if (profile.animalType === 'roedor') {
        const rodentPhotos = i === 3 ? animalPhotos.roedor[0] : animalPhotos.roedor[1];
        photoUrl = rodentPhotos[0];
        gallery = [rodentPhotos[1], rodentPhotos[2]];
      } else if (profile.animalType === 'reptil') {
        photoUrl = animalPhotos.reptil[0][0];
        gallery = [animalPhotos.reptil[0][1], animalPhotos.reptil[0][2]];
      } else {
        photoUrl = animalPhotos.otro[0][0];
        gallery = [animalPhotos.otro[0][1], animalPhotos.otro[0][2]];
      }

      const createdProfile = await prisma.animalProfile.create({
        data: {
          userId: user.id,
          name: profile.name,
          animalType: profile.animalType,
          breed: profile.breed,
          birthDate,
          deathDate,
          latitude,
          longitude,
          photoUrl,
          story: profile.story,
          epitaph: profile.epitaph,
          gallery
        }
      });

      createdProfiles.push(createdProfile);
      console.log(`✓ Created memorial: ${profile.name} (${profile.animalType})`);
    }

    // Create tributes for each profile
    console.log('\nCreating tributes...\n');
    for (const profile of createdProfiles) {
      // Create 2-5 random tributes for each profile
      const tributeCount = Math.floor(Math.random() * 4) + 2;

      for (let i = 0; i < tributeCount; i++) {
        const tributeType = ['flower', 'candle', 'message'][Math.floor(Math.random() * 3)];
        const visitorName = tributeVisitors[Math.floor(Math.random() * tributeVisitors.length)];
        const message = tributeMessages[Math.floor(Math.random() * tributeMessages.length)];

        const daysAgo = Math.floor(Math.random() * 30);
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - daysAgo);

        await prisma.tribute.create({
          data: {
            profileId: profile.id,
            visitorName,
            tributeType,
            message,
            durationDays: 30,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt
          }
        });

        console.log(`  • ${visitorName} left a ${tributeType} tribute on ${profile.name}`);
      }
    }

    console.log('\n========== SUMMARY ==========\n');
    const totalProfiles = await prisma.animalProfile.count();
    const totalTributes = await prisma.tribute.count();

    console.log(`Total memorials created: ${totalProfiles}`);
    console.log(`Total tributes created: ${totalTributes}`);
    console.log(`\n✅ Database seeding completed successfully!\n`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
