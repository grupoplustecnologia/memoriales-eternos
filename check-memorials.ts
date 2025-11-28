import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkMemorials() {
  try {
    const allProfiles = await prisma.animalProfile.findMany({
      select: { 
        id: true, 
        name: true, 
        slug: true, 
        isPublic: true,
        animalType: true,
      },
    });

    console.log('📊 TOTAL DE MEMORIALES:', allProfiles.length);
    console.log('✅ PÚBLICOS:', allProfiles.filter(p => p.isPublic).length);
    console.log('🔒 PRIVADOS:', allProfiles.filter(p => !p.isPublic).length);
    
    console.log('\n📋 LISTA COMPLETA:');
    allProfiles.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} (${p.animalType}) - ${p.slug} - ${p.isPublic ? '✅ Público' : '🔒 Privado'}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMemorials();
