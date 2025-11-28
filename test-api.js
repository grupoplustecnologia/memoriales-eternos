#!/usr/bin/env node

const http = require('http');

function getAPI(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function test() {
  try {
    console.log('\n🔍 Testing Trending API...\n');
    
    const result = await getAPI('/api/trending?type=popular&limit=12');
    
    console.log(`✅ Status: ${result.status}`);
    console.log(`✅ Content-Type: ${result.headers['content-type']}\n`);
    
    const json = JSON.parse(result.body);
    console.log(`✅ Success: ${json.success}`);
    console.log(`✅ Items returned: ${json.data.length}`);
    
    if (json.data.length > 0) {
      console.log('\n📋 First memorial:');
      const m = json.data[0];
      console.log(`   - Name: ${m.name}`);
      console.log(`   - Type: ${m.animalType}`);
      console.log(`   - Views: ${m.viewCount}`);
      console.log(`   - Photo URL: ${m.photoUrl}`);
      console.log(`   - User: ${m.user.name}`);
      console.log(`   - Stats: ${m._count.likes} likes, ${m._count.comments} comments, ${m._count.tributes} tributes`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
