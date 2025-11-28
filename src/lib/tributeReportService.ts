import { prisma } from '@/lib/prisma';

export interface CreateTributeReportInput {
  tributeId: string;
  reportedByUserId?: string;
  reason: string;
  description?: string;
}

/**
 * Create a report for a tribute
 * Reasons: 'inappropriate', 'spam', 'offensive', 'misleading', 'other'
 */
export async function createTributeReport(
  input: CreateTributeReportInput
) {
  try {
    const report = await prisma.tributeReport.create({
      data: {
        tributeId: input.tributeId,
        reportedByUserId: input.reportedByUserId,
        reason: input.reason,
        description: input.description,
        status: 'pending',
      },
      include: {
        tribute: {
          select: {
            id: true,
            visitorName: true,
            message: true,
          },
        },
        reportedByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return report;
  } catch (error) {
    console.error('Error creating tribute report:', error);
    throw error;
  }
}

/**
 * Get all reports (for admin)
 */
export async function getAllTributeReports(
  status?: string,
  limit: number = 50
) {
  try {
    const where = status ? { status } : {};
    
    const reports = await prisma.tributeReport.findMany({
      where,
      take: limit,
      include: {
        tribute: {
          select: {
            id: true,
            visitorName: true,
            message: true,
            profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        reportedByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return reports;
  } catch (error) {
    console.error('Error getting tribute reports:', error);
    return [];
  }
}

/**
 * Get reports for a specific tribute
 */
export async function getTributeReports(tributeId: string) {
  try {
    const reports = await prisma.tributeReport.findMany({
      where: { tributeId },
      include: {
        reportedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return reports;
  } catch (error) {
    console.error('Error getting tribute reports:', error);
    return [];
  }
}

/**
 * Update report status
 */
export async function updateReportStatus(
  reportId: string,
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed',
  adminNotes?: string
) {
  try {
    const report = await prisma.tributeReport.update({
      where: { id: reportId },
      data: {
        status,
        adminNotes,
      },
    });
    return report;
  } catch (error) {
    console.error('Error updating report status:', error);
    throw error;
  }
}

/**
 * Delete a tribute (if reported/flagged)
 */
export async function deleteTribute(tributeId: string) {
  try {
    // First, delete all associated data
    await prisma.tributeLike.deleteMany({
      where: { tributeId },
    });
    
    await prisma.tributeReply.deleteMany({
      where: { tributeId },
    });
    
    await prisma.tributeReport.deleteMany({
      where: { tributeId },
    });

    // Then delete the tribute itself
    const tribute = await prisma.tribute.delete({
      where: { id: tributeId },
    });
    
    return tribute;
  } catch (error) {
    console.error('Error deleting tribute:', error);
    throw error;
  }
}

/**
 * Count pending reports
 */
export async function getPendingReportCount(): Promise<number> {
  try {
    const count = await prisma.tributeReport.count({
      where: { status: 'pending' },
    });
    return count;
  } catch (error) {
    console.error('Error getting pending report count:', error);
    return 0;
  }
}
