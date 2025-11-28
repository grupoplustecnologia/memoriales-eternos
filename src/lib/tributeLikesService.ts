import { prisma } from '@/lib/prisma';

/**
 * Toggle like on a tribute
 * Returns: { liked: boolean, count: number }
 */
export async function toggleTributeLike(
  userId: string,
  tributeId: string
): Promise<{ liked: boolean; count: number }> {
  try {
    // Check if already liked
    const existing = await prisma.tributeLike.findUnique({
      where: {
        userId_tributeId: {
          userId,
          tributeId,
        },
      },
    });

    if (existing) {
      // Unlike
      await prisma.tributeLike.delete({
        where: { id: existing.id },
      });
    } else {
      // Like
      await prisma.tributeLike.create({
        data: {
          userId,
          tributeId,
        },
      });
    }

    // Get new count
    const count = await prisma.tributeLike.count({
      where: { tributeId },
    });

    return {
      liked: !existing,
      count,
    };
  } catch (error) {
    console.error('Error toggling tribute like:', error);
    throw error;
  }
}

/**
 * Get like count for a tribute
 */
export async function getTributeLikeCount(tributeId: string): Promise<number> {
  try {
    const count = await prisma.tributeLike.count({
      where: { tributeId },
    });
    return count;
  } catch (error) {
    console.error('Error getting tribute like count:', error);
    return 0;
  }
}

/**
 * Check if user has liked a tribute
 */
export async function hasUserLikedTribute(
  userId: string,
  tributeId: string
): Promise<boolean> {
  try {
    const like = await prisma.tributeLike.findUnique({
      where: {
        userId_tributeId: {
          userId,
          tributeId,
        },
      },
    });
    return !!like;
  } catch (error) {
    console.error('Error checking tribute like:', error);
    return false;
  }
}

/**
 * Get all likes for a tribute with user info
 */
export async function getTributeLikes(
  tributeId: string,
  limit: number = 10
) {
  try {
    const likes = await prisma.tributeLike.findMany({
      where: { tributeId },
      take: limit,
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            profilePicture: true,
          },
        },
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return likes;
  } catch (error) {
    console.error('Error getting tribute likes:', error);
    return [];
  }
}
