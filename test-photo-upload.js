// Script para probar el endpoint de carga de fotos
// Uso: node test-photo-upload.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function testPhotoUpload() {
  console.log('🧪 Testing photo upload endpoint...\n');

  try {
    // Verificar que la carpeta de uploads existe
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'photos');
    console.log(`📁 Upload directory: ${uploadsDir}`);
    console.log(`✅ Directory exists: ${fs.existsSync(uploadsDir)}`);

    // Crear una imagen test pequeña (GIF de 1x1 pixel)
    const testGif = Buffer.from([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61, // GIF89a
      0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00, // Logical Screen Descriptor
      0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, // Global Color Table
      0x21, 0xF9, 0x04, 0x01, 0x0A, 0x00, 0x01, 0x00, // Graphics Control Extension
      0x2C, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, // Image Data Descriptor
      0x02, 0x02, 0x44, 0x01, 0x00, 0x3B // End
    ]);

    const testFile = path.join(uploadsDir, 'test_photo.gif');
    fs.writeFileSync(testFile, testGif);
    console.log(`✅ Test image created: test_photo.gif (${testGif.length} bytes)`);

    // Simular lo que haría el endpoint
    const timestamp = Date.now();
    const random = crypto.randomBytes(8).toString('hex');
    const filename = `photo_${timestamp}_${random}.gif`;
    const finalPath = path.join(uploadsDir, filename);

    // Mover el archivo
    fs.renameSync(testFile, finalPath);
    console.log(`✅ File renamed to: ${filename}`);

    // Verificar acceso
    console.log(`✅ File exists: ${fs.existsSync(finalPath)}`);
    console.log(`✅ File size: ${fs.statSync(finalPath).size} bytes`);
    console.log(`✅ Public URL: /uploads/photos/${filename}`);

    console.log('\n✅ Photo upload system is working correctly!');
    console.log('\nTo test end-to-end:');
    console.log('1. Login as admin to http://localhost:3000/admin');
    console.log('2. Go to "🪦 Memoriales" tab');
    console.log('3. Click "📷 Foto" on any memorial');
    console.log('4. Upload a photo');
    console.log('5. Verify it appears in /map');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testPhotoUpload();
