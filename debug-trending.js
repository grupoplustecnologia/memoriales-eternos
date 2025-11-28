#!/usr/bin/env node

const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    setTimeout(() => reject(new Error('Timeout')), 5000);
  });
}

async function test() {
  try {
    console.log('\n🔍 Testando API trending...\n');
    
    const res = await makeRequest('/api/trending?type=popular&limit=12');
    console.log(`Status: ${res.status}`);
    
    const json = JSON.parse(res.data);
    console.log(`✅ API Success: ${json.success}`);
    console.log(`✅ Total items: ${json.data?.length || 0}\n`);
    
    if (json.data && json.data.length > 0) {
      console.log('Primeros 3 memoriales:');
      json.data.slice(0, 3).forEach((m, i) => {
        console.log(`${i + 1}. ${m.name}`);
        console.log(`   - Foto: ${m.photoUrl?.substring(0, 50)}...`);
        console.log(`   - Usuario: ${m.user.name}`);
        console.log(`   - Vistas: ${m.viewCount}`);
      });
    } else {
      console.log('⚠️  No data returned!');
      console.log('Full response:', JSON.stringify(json, null, 2));
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

test();
