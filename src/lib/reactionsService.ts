import { prisma } from '@/lib/prisma';

const ALLOWED_EMOJIS = ['❤️', '😢', '🙏', '😊', '🌹', '⭐', '🕊️', '💐'];

/**
 * Add or remove a reaction to a memorial
 */
export async function toggleReaction(
  userId: string,
  profileId: string,
  emoji: string
): Promise<{ reacted: boolean; count: number }> {
  // Validate emoji
  if (!ALLOWED_EMOJIS.includes(emoji)) {
    throw new Error('Invalid emoji');
  }

  // Check if reaction already exists
  const existingReaction = await prisma.reaction.findUnique({
    where: {
      userId_profileId_emoji: {
        userId,
        profileId,
        emoji,
      },
    },
  });

  if (existingReaction) {
    // Remove reaction
    await prisma.reaction.delete({
      where: {
        userId_profileId_emoji: {
          userId,
          profileId,
          emoji,
        },
      },
    });

    // Get new count for this emoji
    const count = await prisma.reaction.count({
      where: { profileId, emoji },
    });

    return { reacted: false, count };
  } else {
    // Add reaction
    await prisma.reaction.create({
      data: {
        userId,
        profileId,
        emoji,
      },
    });

    // Get new count for this emoji
    const count = await prisma.reaction.count({
      where: { profileId, emoji },
    });

    return { reacted: true, count };
  }
}

/**
 * Get reaction counts for a memorial
 */
export async function getReactionCounts(profileId: string) {
  const reactions = await prisma.reaction.groupBy({
    by: ['emoji'],
    where: { profileId },
    _count: true,
  });

  return reactions.map((r: any) => ({
    emoji: r.emoji,
    count: r._count,
  }));
}

/**
 * Get all reactions for a memorial
 */
export async function getReactionsForProfile(profileId: string) {
  return prisma.reaction.findMany({
    where: { profileId },
    orderBy: { createdAt: 'desc' },
    select: {
      emoji: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

/**
 * Check if user has reacted with specific emoji
 */
export async function hasUserReacted(
  userId: string,
  profileId: string,
  emoji: string
): Promise<boolean> {
  const reaction = await prisma.reaction.findUnique({
    where: {
      userId_profileId_emoji: {
        userId,
        profileId,
        emoji,
      },
    },
  });

  return !!reaction;
}

/**
 * Get user's reactions to a memorial
 */
export async function getUserReactionsOnProfile(
  userId: string,
  profileId: string
): Promise<string[]> {
  const reactions = await prisma.reaction.findMany({
    where: { userId, profileId },
    select: { emoji: true },
  });

  return reactions.map((r: any) => r.emoji);
}

export const REACTION_EMOJIS = ALLOWED_EMOJIS;
