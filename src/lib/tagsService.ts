import { prisma } from '@/lib/prisma';

/**
 * Create or get a tag
 */
export async function createOrGetTag(name: string, description?: string) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  return prisma.tag.upsert({
    where: { slug },
    update: {},
    create: {
      name,
      slug,
      description,
    },
  });
}

/**
 * Add tag to memorial
 */
export async function addTagToProfile(profileId: string, tagId: string) {
  try {
    return await prisma.profileTag.create({
      data: {
        profileId,
        tagId,
      },
    });
  } catch (error) {
    // Tag already added, just return success
    return null;
  }
}

/**
 * Remove tag from memorial
 */
export async function removeTagFromProfile(profileId: string, tagId: string) {
  return prisma.profileTag.delete({
    where: {
      profileId_tagId: {
        profileId,
        tagId,
      },
    },
  });
}

/**
 * Get tags for a memorial
 */
export async function getTagsForProfile(profileId: string) {
  return prisma.profileTag.findMany({
    where: { profileId },
    select: {
      tag: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

/**
 * Get all tags
 */
export async function getAllTags() {
  return prisma.tag.findMany({
    include: {
      _count: {
        select: { profiles: true },
      },
    },
    orderBy: { name: 'asc' },
  });
}

/**
 * Get popular tags
 */
export async function getPopularTags(limit: number = 10) {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { profiles: true },
      },
    },
    orderBy: {
      profiles: {
        _count: 'desc',
      },
    },
    take: limit,
  });

  return tags.map((tag) => ({
    ...tag,
    count: tag._count.profiles,
  }));
}

/**
 * Get memorials with a specific tag
 */
export async function getProfilesByTag(tagSlug: string, limit: number = 20) {
  return prisma.profileTag.findMany({
    where: {
      tag: { slug: tagSlug },
    },
    take: limit,
    select: {
      profile: {
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
          deathDate: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Search tags
 */
export async function searchTags(query: string, limit: number = 10) {
  return prisma.tag.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: limit,
  });
}

// Predefined tags for quick selection
export const PRESET_TAGS = [
  { name: 'Perro', description: 'Memorial de perro' },
  { name: 'Gato', description: 'Memorial de gato' },
  { name: 'Ave', description: 'Memorial de ave' },
  { name: 'Roedor', description: 'Memorial de roedor' },
  { name: 'Conejo', description: 'Memorial de conejo' },
  { name: 'Heroico', description: 'Mascota heroica o memorable' },
  { name: 'Amado', description: 'Mascota muy amada' },
  { name: 'Aventurero', description: 'Mascota aventurera' },
  { name: 'Travieso', description: 'Mascota traviesa' },
  { name: 'Guardián', description: 'Mascota protectora' },
];
