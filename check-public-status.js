const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const total = await prisma.animalProfile.count();
  const publicCount = await prisma.animalProfile.count({ where: { isPublic: true } });
  const first3 = await prisma.animalProfile.findMany({ 
    take: 3, 
    select: { id: true, name: true, isPublic: true } 
  });
  
  console.log('Total memoriales:', total);
  console.log('Públicos:', publicCount);
  console.log('Primeros 3:');
  first3.forEach(m => console.log('  -', m.name, '(isPublic:', m.isPublic + ')'));
  
  await prisma.$disconnect();
})();
