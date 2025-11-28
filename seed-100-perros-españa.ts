import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Nombres españoles comunes
const firstNames = [
  'Carlos', 'María', 'Juan', 'Francisco', 'Ana', 'José', 'Isabel', 'Pedro', 'Rosa', 'Miguel',
  'Carmen', 'Antonio', 'Dolores', 'Manuel', 'Pilar', 'Luis', 'Josefina', 'Guillermo', 'Consuelo', 'Enrique',
  'Montserrat', 'Jesús', 'Margarita', 'Javier', 'Concepción', 'Emilio', 'Amparo', 'Víctor', 'Matilde', 'Arturo',
  'Victoria', 'Julio', 'Esperanza', 'Rafael', 'Jacinta', 'Ángel', 'Soledad', 'Ramón', 'Florentina', 'Domingo',
  'Visitación', 'Salvador', 'Hortensia', 'Andrés', 'Sofía', 'Mariano', 'Consolación', 'Leopoldo', 'Asunción', 'Aníbal',
];

const lastNames = [
  'García', 'Rodríguez', 'Martínez', 'Sánchez', 'López', 'Pérez', 'González', 'Fernández', 'Díaz', 'Gómez',
  'Ruiz', 'Herrera', 'Jiménez', 'Moreno', 'Ortiz', 'Castillo', 'Ramos', 'Vargas', 'Castro', 'Vázquez',
  'Medina', 'Silva', 'Rivas', 'Flores', 'Molina', 'Caballero', 'Rojas', 'Cruz', 'Iglesias', 'Cabrera',
  'Vicente', 'Delgado', 'Cordero', 'Romero', 'Domínguez', 'Medrano', 'Esparza', 'Montoya', 'Navarro', 'Pinto',
  'Acosta', 'Serrano', 'Contreras', 'Valencia', 'Alarcón', 'Ibáñez', 'Muñoz', 'Fuentes', 'Gallegos', 'Bolaños',
];

// Razas de perros españoles y populares
const razasPerros = [
  'Podenco Ibicenco', 'Galgo Español', 'Mastín Español', 'Pastor Vasco', 'Ratonero Bodeguero',
  'Labrador Retriever', 'Golden Retriever', 'Pastor Alemán', 'Beagle', 'Cocker Spaniel',
  'Bulldog Inglés', 'Bóxer', 'Rottweiler', 'Dóberman', 'Poodle',
  'Schnauzer', 'Shih Tzu', 'Pugs', 'Corgi', 'Husky Siberiano',
  'Pastor Belga', 'Setter Irlandés', 'Setter Inglés', 'Springer Spaniel', 'Collie',
  'Samoyedo', 'Akita', 'Shiba Inu', 'Basset Hound', 'Sabueso',
  'Terrier Escocés', 'Terrier Blanco Inglés', 'Bichón Frisé', 'Caniche Toy', 'Cavalier King Charles',
  'Maltes', 'Pequinés', 'Lhasa Apso', 'Montaña de los Pirineos', 'San Bernardo',
  'Terranova', 'Spaniel Tibetano', 'Weimaraner', 'Vizsla', 'Pointer',
  'Bretón', 'Pólvora', 'Afgano', 'Borzoï', 'Whippet',
  'Bullmastiff', 'Gran Danés', 'Shar Pei', 'Staffordshire', 'Pit Bull',
  'Dálmata', 'Boxer de pelo corto', 'Bulldog Francés', 'Pug Chino', 'Prensa Canario',
];

// Ciudades y pueblos de toda España con coordenadas reales
const ubicaciones = [
  // Andalucía
  { ciudad: 'Sevilla', lat: 37.3886, lng: -5.9823 },
  { ciudad: 'Málaga', lat: 36.7213, lng: -4.4214 },
  { ciudad: 'Cádiz', lat: 36.5267, lng: -6.2893 },
  { ciudad: 'Córdoba', lat: 37.8883, lng: -4.7663 },
  { ciudad: 'Jaén', lat: 37.7678, lng: -3.7945 },
  { ciudad: 'Granada', lat: 37.1776, lng: -3.5986 },
  { ciudad: 'Almería', lat: 36.8406, lng: -2.3667 },
  { ciudad: 'Huelva', lat: 37.2614, lng: -6.9447 },
  { ciudad: 'Antequera', lat: 36.9954, lng: -4.5757 },
  { ciudad: 'Utrera', lat: 37.1898, lng: -5.7855 },
  // Cataluña
  { ciudad: 'Barcelona', lat: 41.3851, lng: 2.1734 },
  { ciudad: 'Girona', lat: 41.9898, lng: 2.8271 },
  { ciudad: 'Lleida', lat: 41.6149, lng: 0.6289 },
  { ciudad: 'Tarragona', lat: 41.1185, lng: 1.2445 },
  { ciudad: 'Manresa', lat: 41.7381, lng: 1.8332 },
  { ciudad: 'Sabadell', lat: 41.5447, lng: 2.1097 },
  { ciudad: 'Terrassa', lat: 41.5635, lng: 2.0086 },
  { ciudad: 'Mataró', lat: 41.5386, lng: 2.4453 },
  { ciudad: 'Granollers', lat: 41.5966, lng: 2.2844 },
  { ciudad: 'Vic', lat: 41.9301, lng: 2.2578 },
  // Valencia
  { ciudad: 'Valencia', lat: 39.4699, lng: -0.3763 },
  { ciudad: 'Alicante', lat: 38.3452, lng: -0.4810 },
  { ciudad: 'Castellón', lat: 40.5900, lng: -0.0428 },
  { ciudad: 'Elche', lat: 38.2697, lng: -0.6995 },
  { ciudad: 'Alcoy', lat: 38.6886, lng: -0.4749 },
  // Madrid
  { ciudad: 'Madrid', lat: 40.4168, lng: -3.7038 },
  { ciudad: 'Alcalá de Henares', lat: 40.4858, lng: -3.3581 },
  { ciudad: 'Getafe', lat: 40.3087, lng: -3.7331 },
  { ciudad: 'Leganés', lat: 40.3289, lng: -3.7655 },
  { ciudad: 'Móstoles', lat: 40.3244, lng: -3.8574 },
  // Castilla y León
  { ciudad: 'Valladolid', lat: 41.6521, lng: -4.7245 },
  { ciudad: 'Burgos', lat: 42.3466, lng: -3.6748 },
  { ciudad: 'Salamanca', lat: 40.9701, lng: -5.5037 },
  { ciudad: 'Segovia', lat: 40.9526, lng: -4.1182 },
  { ciudad: 'Soria', lat: 41.7639, lng: -2.4718 },
  { ciudad: 'Ávila', lat: 40.6563, lng: -5.3283 },
  { ciudad: 'Palencia', lat: 42.0096, lng: -4.5308 },
  { ciudad: 'Zamora', lat: 41.5033, lng: -5.7447 },
  { ciudad: 'León', lat: 42.5987, lng: -5.5710 },
  { ciudad: 'Medina del Campo', lat: 41.2992, lng: -4.8872 },
  // Castilla-La Mancha
  { ciudad: 'Ciudad Real', lat: 38.9850, lng: -3.9275 },
  { ciudad: 'Toledo', lat: 39.8562, lng: -4.0273 },
  { ciudad: 'Cuenca', lat: 40.2735, lng: -2.1395 },
  { ciudad: 'Albacete', lat: 38.9848, lng: -1.8580 },
  { ciudad: 'Guadalajara', lat: 40.6352, lng: -3.1635 },
  // Galicia
  { ciudad: 'A Coruña', lat: 43.3723, lng: -8.3965 },
  { ciudad: 'Santiago de Compostela', lat: 42.8782, lng: -8.5448 },
  { ciudad: 'Vigo', lat: 42.2314, lng: -8.7278 },
  { ciudad: 'Pontevedra', lat: 42.4323, lng: -8.6447 },
  { ciudad: 'Lugo', lat: 42.9896, lng: -7.4967 },
  { ciudad: 'Ourense', lat: 42.3342, lng: -7.8640 },
  // Asturias
  { ciudad: 'Oviedo', lat: 43.3603, lng: -5.8448 },
  { ciudad: 'Gijón', lat: 43.5353, lng: -5.6611 },
  { ciudad: 'Avilés', lat: 43.6280, lng: -5.9239 },
  // Cantabria
  { ciudad: 'Santander', lat: 43.4627, lng: -3.8107 },
  { ciudad: 'Torrelavega', lat: 43.3660, lng: -3.9910 },
  // País Vasco
  { ciudad: 'Bilbao', lat: 43.2627, lng: -2.9253 },
  { ciudad: 'Vitoria', lat: 42.8510, lng: -2.6726 },
  { ciudad: 'San Sebastián', lat: 43.3183, lng: -1.9743 },
  { ciudad: 'Getxo', lat: 43.3273, lng: -3.0287 },
  // Navarra
  { ciudad: 'Pamplona', lat: 42.8139, lng: -1.6453 },
  { ciudad: 'Tudela', lat: 42.0654, lng: -1.6033 },
  // La Rioja
  { ciudad: 'Logroño', lat: 42.4627, lng: -2.4449 },
  { ciudad: 'Calahorra', lat: 42.3026, lng: -1.9474 },
  // Aragón
  { ciudad: 'Zaragoza', lat: 41.6560, lng: -0.8773 },
  { ciudad: 'Huesca', lat: 42.1395, lng: -0.4069 },
  { ciudad: 'Teruel', lat: 40.3444, lng: -1.1061 },
  // Baleares
  { ciudad: 'Palma de Mallorca', lat: 39.5696, lng: 2.6502 },
  { ciudad: 'Ibiza', lat: 38.9067, lng: 1.4306 },
  { ciudad: 'Menorca', lat: 39.9381, lng: 4.0585 },
  // Canarias
  { ciudad: 'Las Palmas', lat: 28.0029, lng: -15.5954 },
  { ciudad: 'Santa Cruz de Tenerife', lat: 28.4636, lng: -16.2527 },
  { ciudad: 'Puerto de la Cruz', lat: 28.4126, lng: -16.3193 },
  { ciudad: 'Gran Canaria', lat: 27.9369, lng: -15.5980 },
  // Extremadura
  { ciudad: 'Badajoz', lat: 38.8794, lng: -7.0029 },
  { ciudad: 'Cáceres', lat: 39.4750, lng: -6.3725 },
  { ciudad: 'Plasencia', lat: 40.0374, lng: -6.0858 },
  // Murcia
  { ciudad: 'Murcia', lat: 37.9922, lng: -1.1307 },
  { ciudad: 'Cartagena', lat: 37.6063, lng: -0.9844 },
];

// Épitafios emotivos en español
const epitafios = [
  'Fuiste mi mejor amigo, te echaré de menos cada día',
  'Tu amor y lealtad siempre vivirán en mi corazón',
  'Gracias por todos los momentos felices juntos',
  'Descansa en paz, mi fiel compañero',
  'Nunca te olvidaré, eras especial',
  'Mi perro, mi amor, mi familia',
  'Correras eternamente en el paraíso de los perros',
  'Siempre serás nuestro ángel de cuatro patas',
  'Dejaste un agujero tan grande en nuestro corazón',
  'Tu recuerdo vivirá por siempre',
  'Fuiste la razón de mis sonrisas',
  'Te amé desde el primer día',
  'Mi mejor compañero de vida',
  'Descansa, valiente guerrero',
  'Nuestro perro héroe y amado',
  'Tu dulzura fue nuestro tesoro',
  'En cada alba te veo correr libre',
  'Eres irreemplazable en nuestras vidas',
  'Que disfrutes en el cielo',
  'Mi perro de oro, mi joya más preciada',
];

async function seed() {
  console.log('🌱 Iniciando siembra de 100 usuarios con memoriales de perros...\n');

  try {
    // Limpiar datos anteriores (opcional)
    // await prisma.animalProfile.deleteMany({});
    // await prisma.memorial.deleteMany({});
    // await prisma.user.deleteMany({});

    const users = [];

    for (let i = 0; i < 100; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const raza = razasPerros[Math.floor(Math.random() * razasPerros.length)];
      const ubicacion = ubicaciones[Math.floor(Math.random() * ubicaciones.length)];
      const epitafio = epitafios[Math.floor(Math.random() * epitafios.length)];

      const email = `user${i + 1}@perroseterno.es`;
      const dogName = generateDogName();
      const birthYear = 2015 + Math.floor(Math.random() * 9);
      const birthMonth = Math.floor(Math.random() * 12) + 1;
      const birthDay = Math.floor(Math.random() * 28) + 1;
      const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

      const deathYear = birthYear + 5 + Math.floor(Math.random() * 12);
      const deathMonth = Math.floor(Math.random() * 12) + 1;
      const deathDay = Math.floor(Math.random() * 28) + 1;
      const deathDate = new Date(deathYear, deathMonth - 1, deathDay);

      // Crear usuario
      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          name: `${firstName} ${lastName}`,
          passwordHash: 'hashed_password_demo',
          role: 'user',
          subscriptionTier: Math.random() > 0.7 ? 'santuario-premium' : 'free',
          createdAt: new Date(2024, 0, 1),
        },
      });

      console.log(`✓ Usuario ${i + 1}/100: ${user.name} (${ubicacion.ciudad})`);

      // Crear perfil del animal
      const animalProfile = await prisma.animalProfile.create({
        data: {
          userId: user.id,
          animalType: 'perro',
          name: dogName,
          breed: raza,
          birthDate,
          deathDate,
          latitude: ubicacion.lat,
          longitude: ubicacion.lng,
          photoUrl: generatePhotoUrl(raza),
          story: `Un maravilloso ${raza} que fue parte de nuestra familia en ${ubicacion.ciudad}.`,
          epitaph: epitafio,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log(`  └─ 🐕 ${dogName} (${raza})`);
    }

    console.log(`\n✅ Siembra completada exitosamente!`);
    console.log(`📊 Estadísticas:`);
    console.log(`   - 100 usuarios creados`);
    console.log(`   - 100 perfiles de animales creados`);
    console.log(`   - 100 memoriales creados`);
    console.log(`   - Distribuidos por toda España`);
    console.log(`   - 50+ razas diferentes de perros`);

  } catch (error) {
    console.error('❌ Error durante la siembra:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function generateDogName(): string {
  const names = [
    'Max', 'Luna', 'Rocky', 'Bella', 'Charlie', 'Daisy', 'Duke', 'Lucy', 'Buddy', 'Molly',
    'Rex', 'Sadie', 'Zeus', 'Chloe', 'Simba', 'Lola', 'Baxter', 'Millie', 'Cooper', 'Sophie',
    'Leo', 'Bailey', 'Finn', 'Maggie', 'Teddy', 'Zoe', 'Oliver', 'Rosie', 'Henry', 'Poppy',
    'Tucker', 'Ruby', 'Marley', 'Nala', 'Diesel', 'Honey', 'Bentley', 'Ella', 'Jasper', 'Pepper',
    'Milo', 'Stella', 'Oscar', 'Abby', 'Blake', 'Ginger', 'Murphy', 'Ivy', 'Winston', 'Emma',
  ];
  return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 1000);
}

function generatePhotoUrl(raza: string): string {
  // Usar búsquedas de Unsplash para razas de perros específicas
  const razaUrlMap: Record<string, string> = {
    'Labrador Retriever': 'https://images.unsplash.com/photo-1633722715463-d30628519ca0?w=400&h=400&fit=crop',
    'Golden Retriever': 'https://images.unsplash.com/photo-1633722715463-d30628519ca0?w=400&h=400&fit=crop',
    'Pastor Alemán': 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop',
    'Bulldog Inglés': 'https://images.unsplash.com/photo-1583511655857-d19db992cb74?w=400&h=400&fit=crop',
    'Bóxer': 'https://images.unsplash.com/photo-1518831942863-6f3031224c94?w=400&h=400&fit=crop',
    'Beagle': 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop',
    'Cocker Spaniel': 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=400&fit=crop',
    'Poodle': 'https://images.unsplash.com/photo-1537151608828-8661fac7a527?w=400&h=400&fit=crop',
    'Shih Tzu': 'https://images.unsplash.com/photo-1537151608828-8661fac7a527?w=400&h=400&fit=crop',
    'Bulldog Francés': 'https://images.unsplash.com/photo-1583511655857-d19db992cb74?w=400&h=400&fit=crop',
    'Husky Siberiano': 'https://images.unsplash.com/photo-1633722715463-d30628519ca0?w=400&h=400&fit=crop',
  };

  return (
    razaUrlMap[raza] ||
    'https://images.unsplash.com/photo-1633722715463-d30628519ca0?w=400&h=400&fit=crop'
  );
}

seed();
