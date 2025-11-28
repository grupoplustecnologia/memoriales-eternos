import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import {
  createOrGetTag,
  addTagToProfile,
  removeTagFromProfile,
  getTagsForProfile,
  getPopularTags,
  getProfilesByTag,
  searchTags,
  PRESET_TAGS,
} from '@/lib/tagsService';

/**
 * GET /api/tags
 * - ?action=list - Get all tags
 * - ?action=popular&limit=10 - Get popular tags
 * - ?action=preset - Get preset tags
 * - ?action=search&q=query - Search tags
 * - ?profileId=xxx - Get tags for profile
 *
 * POST /api/tags - Create or add tag to profile
 * DELETE /api/tags - Remove tag from profile
 */
export async function GET(req: NextRequest) {
  try {
    const action = req.nextUrl.searchParams.get('action');
    const profileId = req.nextUrl.searchParams.get('profileId');
    const query = req.nextUrl.searchParams.get('q');
    const limitStr = req.nextUrl.searchParams.get('limit');
    const limit = limitStr ? parseInt(limitStr) : 10;

    // Get tags for a specific profile
    if (profileId) {
      const tags = await getTagsForProfile(profileId);
      return NextResponse.json({
        success: true,
        data: tags,
      });
    }

    // Get popular tags
    if (action === 'popular') {
      const tags = await getPopularTags(limit);
      return NextResponse.json({
        success: true,
        data: tags,
      });
    }

    // Get preset tags
    if (action === 'preset') {
      return NextResponse.json({
        success: true,
        data: PRESET_TAGS,
      });
    }

    // Search tags
    if (action === 'search' && query) {
      const tags = await searchTags(query, limit);
      return NextResponse.json({
        success: true,
        data: tags,
      });
    }

    // Get profiles with specific tag
    if (action === 'profiles' && query) {
      const profiles = await getProfilesByTag(query, limit);
      return NextResponse.json({
        success: true,
        data: profiles,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action or missing parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Tags GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const authResult = await verifySessionToken(token);

    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { profileId, tagName, tagId, action } = await req.json();

    if (action === 'add') {
      if (!profileId) {
        return NextResponse.json(
          { error: 'profileId is required' },
          { status: 400 }
        );
      }

      if (tagId) {
        // Add existing tag
        await addTagToProfile(profileId, tagId);
      } else if (tagName) {
        // Create new tag and add to profile
        const tag = await createOrGetTag(tagName);
        await addTagToProfile(profileId, tag.id);
      } else {
        return NextResponse.json(
          { error: 'tagId or tagName is required' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Tags POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const authResult = await verifySessionToken(token);

    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { profileId, tagId } = await req.json();

    if (!profileId || !tagId) {
      return NextResponse.json(
        { error: 'profileId and tagId are required' },
        { status: 400 }
      );
    }

    await removeTagFromProfile(profileId, tagId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Tags DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
