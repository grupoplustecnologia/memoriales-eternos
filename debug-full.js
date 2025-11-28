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
    const res = await makeRequest('/api/trending?type=popular&limit=12');
    const json = JSON.parse(res.data);
    
    console.log('\n=== FULL API RESPONSE ===\n');
    console.log(JSON.stringify(json, null, 2).substring(0, 2000));
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
