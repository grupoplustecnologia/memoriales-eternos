import { prisma } from '@/lib/prisma';

/**
 * Create a new comment on a memorial
 */
export async function createComment(
  profileId: string,
  visitorName: string,
  message: string,
  visitorId?: string,
  visitorEmail?: string
) {
  return prisma.comment.create({
    data: {
      profileId,
      visitorId,
      visitorName,
      visitorEmail,
      message,
      isApproved: true, // Auto-approve for now, can add moderation later
    },
  });
}

/**
 * Get comments for a memorial
 */
export async function getCommentsForProfile(
  profileId: string,
  limit: number = 20
) {
  return prisma.comment.findMany({
    where: {
      profileId,
      isApproved: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      visitorName: true,
      message: true,
      createdAt: true,
      visitor: {
        select: {
          id: true,
          profilePicture: true,
        },
      },
    },
  });
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: string, userId: string) {
  // Verify the comment belongs to this user or is on their memorial
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      profile: {
        select: { userId: true },
      },
    },
  });

  if (!comment) {
    throw new Error('Comment not found');
  }

  if (comment.profile.userId !== userId && comment.visitorId !== userId) {
    throw new Error('Unauthorized');
  }

  return prisma.comment.delete({
    where: { id: commentId },
  });
}

/**
 * Approve a comment (admin)
 */
export async function approveComment(commentId: string) {
  return prisma.comment.update({
    where: { id: commentId },
    data: { isApproved: true },
  });
}

/**
 * Reject a comment (admin)
 */
export async function rejectComment(commentId: string) {
  return prisma.comment.delete({
    where: { id: commentId },
  });
}

/**
 * Get pending comments (admin)
 */
export async function getPendingComments(limit: number = 50) {
  return prisma.comment.findMany({
    where: { isApproved: false },
    orderBy: { createdAt: 'asc' },
    take: limit,
    include: {
      profile: {
        select: {
          id: true,
          name: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Get comment count for a memorial
 */
export async function getCommentCount(profileId: string): Promise<number> {
  return prisma.comment.count({
    where: {
      profileId,
      isApproved: true,
    },
  });
}
