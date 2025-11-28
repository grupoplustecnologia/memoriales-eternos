import { prisma } from '@/lib/prisma';

/**
 * Create a reply to a tribute
 */
export async function createTributeReply(
  tributeId: string,
  authorId: string,
  message: string,
  isApproved: boolean = true
) {
  try {
    const reply = await prisma.tributeReply.create({
      data: {
        tributeId,
        authorId,
        message,
        isApproved,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true,
          },
        },
      },
    });
    return reply;
  } catch (error) {
    console.error('Error creating tribute reply:', error);
    throw error;
  }
}

/**
 * Get replies for a tribute
 */
export async function getTributeReplies(
  tributeId: string,
  limit: number = 20
) {
  try {
    const replies = await prisma.tributeReply.findMany({
      where: {
        tributeId,
        isApproved: true,
      },
      take: limit,
      select: {
        id: true,
        message: true,
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true,
          },
        },
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
    return replies;
  } catch (error) {
    console.error('Error getting tribute replies:', error);
    return [];
  }
}

/**
 * Delete a reply
 */
export async function deleteTributeReply(
  replyId: string,
  authorId: string
) {
  try {
    // Check ownership
    const reply = await prisma.tributeReply.findUnique({
      where: { id: replyId },
    });

    if (!reply) {
      throw new Error('Reply not found');
    }

    if (reply.authorId !== authorId) {
      throw new Error('Not authorized to delete this reply');
    }

    await prisma.tributeReply.delete({
      where: { id: replyId },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting tribute reply:', error);
    throw error;
  }
}

/**
 * Update reply approval status (for moderation)
 */
export async function updateReplyApprovalStatus(
  replyId: string,
  isApproved: boolean
) {
  try {
    const reply = await prisma.tributeReply.update({
      where: { id: replyId },
      data: { isApproved },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return reply;
  } catch (error) {
    console.error('Error updating reply approval:', error);
    throw error;
  }
}

/**
 * Get pending replies for moderation
 */
export async function getPendingReplies(limit: number = 20) {
  try {
    const replies = await prisma.tributeReply.findMany({
      where: { isApproved: false },
      take: limit,
      include: {
        tribute: {
          select: {
            id: true,
            message: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
    return replies;
  } catch (error) {
    console.error('Error getting pending replies:', error);
    return [];
  }
}

/**
 * Get reply count for a tribute
 */
export async function getTributeReplyCount(tributeId: string): Promise<number> {
  try {
    const count = await prisma.tributeReply.count({
      where: {
        tributeId,
        isApproved: true,
      },
    });
    return count;
  } catch (error) {
    console.error('Error getting reply count:', error);
    return 0;
  }
}
