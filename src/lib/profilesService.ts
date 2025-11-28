import { prisma } from '@/lib/prisma';
import { PlanPermissionsService } from '@/lib/planPermissions';
import type { AnimalProfile } from '@/types';

// ============= GET =============

export async function getProfiles(publicOnly = false) {
  try {
    const profiles = await prisma.animalProfile.findMany({
      where: publicOnly ? { isPublic: true } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { subscriptionTier: true }
        },
        tributes: true,
        collaborators: true,
        specialMoments: true
      }
    });

    return {
      success: true,
      data: profiles.map(transformProfileToClient)
    };
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return {
      success: false,
      error: 'Error fetching profiles'
    };
  }
}

export async function getProfile(id: string) {
  try {
    const profile = await prisma.animalProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: { subscriptionTier: true }
        },
        tributes: true,
        collaborators: true,
        specialMoments: true
      }
    });;

    if (!profile) {
      return { success: false, error: 'Profile not found' };
    }

    return {
      success: true,
      data: transformProfileToClient(profile)
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      success: false,
      error: 'Error fetching profile'
    };
  }
}

export async function getProfilesByUser(userId: string) {
  try {
    const profiles = await prisma.animalProfile.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { subscriptionTier: true }
        },
        tributes: true,
        collaborators: true,
        specialMoments: true
      }
    });;

    return {
      success: true,
      data: profiles.map(transformProfileToClient)
    };
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    return {
      success: false,
      error: 'Error fetching user profiles'
    };
  }
}

// ============= CREATE =============

export async function createProfile(
  userId: string,
  data: {
    name: string;
    animalType: string;
    breed?: string;
    birthDate: Date;
    deathDate: Date;
    latitude: number;
    longitude: number;
    photoUrl: string;
    story: string;
    epitaph: string;
    gallery?: string[];
  },
  userSubscriptionTier: string = 'huella-eterna'
) {
  try {
    // Import slugify at the top of the file
    const { generateSlug, generateUniqueSlug } = await import('./slugify');
    
    // Determinar si el memorial debe ser público según el plan
    const canBePublic = PlanPermissionsService.canAppearInGrid(userSubscriptionTier as any);

    // Generate SEO-friendly slug
    const baseSlug = generateSlug(data.name);
    
    // Check if slug exists and generate unique one if needed
    const existingSlugs = await prisma.animalProfile.findMany({
      where: { slug: { startsWith: baseSlug } },
      select: { slug: true }
    });
    const existingSlugsArray = existingSlugs.map((p: any) => p.slug);
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugsArray);

    const profile = await prisma.animalProfile.create({
      data: {
        userId,
        ...data,
        slug: uniqueSlug,
        gallery: data.gallery || [],
        isPublic: canBePublic
      },
      include: {
        user: {
          select: { subscriptionTier: true }
        },
        tributes: true,
        collaborators: true,
        specialMoments: true
      }
    });;

    return {
      success: true,
      data: transformProfileToClient(profile)
    };
  } catch (error) {
    console.error('Error creating profile:', error);
    return {
      success: false,
      error: 'Error creating profile'
    };
  }
}

// ============= UPDATE =============

export async function updateProfile(
  id: string,
  data: Partial<{
    name: string;
    animalType: string;
    breed: string | null;
    birthDate: Date;
    deathDate: Date;
    latitude: number;
    longitude: number;
    photoUrl: string;
    story: string;
    epitaph: string;
    gallery: string[];
  }>
) {
  try {
    const profile = await prisma.animalProfile.update({
      where: { id },
      data,
      include: {
        tributes: true,
        collaborators: true,
        specialMoments: true
      }
    });

    return {
      success: true,
      data: transformProfileToClient(profile)
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      error: 'Error updating profile'
    };
  }
}

// ============= DELETE =============

export async function deleteProfile(id: string) {
  try {
    await prisma.animalProfile.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting profile:', error);
    return {
      success: false,
      error: 'Error deleting profile'
    };
  }
}

// ============= SEARCH =============

export async function searchProfiles(query: string) {
  try {
    const profiles = await prisma.animalProfile.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { story: { contains: query, mode: 'insensitive' } },
          { epitaph: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        tributes: true,
        collaborators: true,
        specialMoments: true
      }
    });

    return {
      success: true,
      data: profiles.map(transformProfileToClient)
    };
  } catch (error) {
    console.error('Error searching profiles:', error);
    return {
      success: false,
      error: 'Error searching profiles'
    };
  }
}

// ============= TRANSFORMERS =============

function transformProfileToClient(profile: any): AnimalProfile {
  return {
    id: profile.id,
    userId: profile.userId,
    name: profile.name,
    animalType: profile.animalType as AnimalProfile['animalType'],
    breed: profile.breed || undefined,
    birthDate: profile.birthDate.toISOString(),
    deathDate: profile.deathDate.toISOString(),
    latitude: profile.latitude,
    longitude: profile.longitude,
    photoUrl: profile.photoUrl,
    story: profile.story,
    epitaph: profile.epitaph,
    createdAt: profile.createdAt.toISOString(),
    gallery: profile.gallery || undefined,
    userSubscriptionTier: profile.user?.subscriptionTier
  };
}
