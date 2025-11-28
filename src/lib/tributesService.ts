import { prisma } from '@/lib/prisma';
import type { Tribute } from '@/types';

// ============= GET =============

export async function getTributes(profileId: string) {
  try {
    const tributes = await prisma.tribute.findMany({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
      include: {
        visitor: true
      }
    });

    return {
      success: true,
      data: tributes.map(transformTributeToClient)
    };
  } catch (error) {
    console.error('Error fetching tributes:', error);
    return {
      success: false,
      error: 'Error fetching tributes'
    };
  }
}

export async function getTribute(id: string) {
  try {
    const tribute = await prisma.tribute.findUnique({
      where: { id },
      include: {
        visitor: true
      }
    });

    if (!tribute) {
      return { success: false, error: 'Tribute not found' };
    }

    return {
      success: true,
      data: transformTributeToClient(tribute)
    };
  } catch (error) {
    console.error('Error fetching tribute:', error);
    return {
      success: false,
      error: 'Error fetching tribute'
    };
  }
}

// ============= CREATE =============

export async function createTribute(
  profileId: string,
  visitorId: string | undefined,
  data: {
    visitorName: string;
    tributeType: 'flower' | 'candle' | 'message';
    message?: string;
    durationDays?: number;
  }
) {
  try {
    console.log(`[TRIBUTE CREATE] Creating tribute - profileId: ${profileId}, visitorId: ${visitorId || 'undefined'}, type: ${data.tributeType}`);

    // Calculate expiration date (tributes last 30 days by default)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (data.durationDays || 30));

    const tribute = await prisma.tribute.create({
      data: {
        profileId,
        visitorId: visitorId || undefined,
        visitorName: data.visitorName,
        tributeType: data.tributeType,
        message: data.message,
        durationDays: data.durationDays || 30,
        expiresAt
      },
      include: {
        visitor: true
      }
    });

    return {
      success: true,
      data: transformTributeToClient(tribute)
    };
  } catch (error) {
    console.error('Error creating tribute:', error);
    return {
      success: false,
      error: 'Error creating tribute'
    };
  }
}

// ============= DELETE =============

export async function deleteTribute(id: string) {
  try {
    await prisma.tribute.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting tribute:', error);
    return {
      success: false,
      error: 'Error deleting tribute'
    };
  }
}

// ============= STATS =============

export async function getTributeStats(profileId: string) {
  try {
    const stats = await prisma.tribute.aggregate({
      where: { profileId },
      _count: true
    });

    return {
      success: true,
      data: {
        totalTributes: stats._count
      }
    };
  } catch (error) {
    console.error('Error fetching tribute stats:', error);
    return {
      success: false,
      error: 'Error fetching tribute stats'
    };
  }
}

// ============= TRANSFORMERS =============

function transformTributeToClient(tribute: any): Tribute {
  return {
    id: tribute.id,
    profileId: tribute.profileId,
    visitorName: tribute.visitorName,
    tributeType: tribute.tributeType as Tribute['tributeType'],
    message: tribute.message || undefined,
    createdAt: tribute.createdAt.toISOString()
  };
}
