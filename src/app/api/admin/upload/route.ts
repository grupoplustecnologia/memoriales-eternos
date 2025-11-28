import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'photos');

export async function POST(req: NextRequest) {
  try {
    console.log('📥 Upload request received');
    
    // Verify admin token
    const token = req.cookies.get('auth_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('❌ No token provided');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const authResult = await verifySessionToken(token);
    if (!authResult.valid || authResult.user?.role !== 'admin') {
      console.log('❌ Not admin:', { valid: authResult.valid, role: authResult.user?.role });
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    // Get form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    console.log('📦 File received:', { name: file?.name, size: file?.size, type: file?.type });

    if (!file) {
      console.log('❌ No file in form data');
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validMimeTypes.includes(file.type)) {
      console.log('❌ Invalid mime type:', file.type);
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' 
      }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      console.log('❌ File too large:', file.size);
      return NextResponse.json({ 
        success: false, 
        error: 'File too large. Maximum size: 5MB' 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const random = crypto.randomBytes(8).toString('hex');
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `photo_${timestamp}_${random}.${ext}`;

    // Ensure upload directory exists
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Write file
    const filepath = join(UPLOAD_DIR, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Return the URL path
    const photoUrl = `/uploads/photos/${filename}`;

    console.log(`✅ Photo uploaded: ${photoUrl}`);

    return NextResponse.json({
      success: true,
      photoUrl,
      message: 'Foto cargada exitosamente'
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Error uploading file' 
    }, { status: 500 });
  }
}
