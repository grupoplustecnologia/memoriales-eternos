#!/usr/bin/env node

const http = require('http');

const req = http.get('http://localhost:3000/api/trending?type=popular&limit=2', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(JSON.stringify(json, null, 2));
  });
});

req.on('error', err => {
  console.error('Error:', err.message);
});

setTimeout(() => {
  console.error('Timeout waiting for response');
  process.exit(1);
}, 5000);
