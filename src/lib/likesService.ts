import { prisma } from '@/lib/prisma';

/**
 * Toggle like on a memorial
 * Returns true if liked, false if unliked
 */
export async function toggleLike(
  userId: string,
  profileId: string
): Promise<{ liked: boolean; count: number }> {
  // Check if like already exists
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_profileId: {
        userId,
        profileId,
      },
    },
  });

  if (existingLike) {
    // Remove like
    await prisma.like.delete({
      where: {
        userId_profileId: {
          userId,
          profileId,
        },
      },
    });

    // Get new count
    const count = await prisma.like.count({
      where: { profileId },
    });

    return { liked: false, count };
  } else {
    // Add like
    await prisma.like.create({
      data: {
        userId,
        profileId,
      },
    });

    // Get new count
    const count = await prisma.like.count({
      where: { profileId },
    });

    return { liked: true, count };
  }
}

/**
 * Get like count for a memorial
 */
export async function getLikeCount(profileId: string): Promise<number> {
  return prisma.like.count({
    where: { profileId },
  });
}

/**
 * Check if user has liked a memorial
 */
export async function hasUserLiked(
  userId: string,
  profileId: string
): Promise<boolean> {
  const like = await prisma.like.findUnique({
    where: {
      userId_profileId: {
        userId,
        profileId,
      },
    },
  });

  return !!like;
}

/**
 * Get all users who liked a memorial
 */
export async function getLikesForProfile(
  profileId: string,
  limit: number = 10
) {
  return prisma.like.findMany({
    where: { profileId },
    take: limit,
    orderBy: { createdAt: 'desc' },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          profilePicture: true,
        },
      },
    },
  });
}

/**
 * Get memorials liked by a user
 */
export async function getUserLikedProfiles(userId: string) {
  return prisma.like.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      profile: {
        select: {
          id: true,
          name: true,
          photoUrl: true,
          animalType: true,
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
