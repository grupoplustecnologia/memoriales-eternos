const http = require('http');

// Test script to verify Stripe checkout API

async function testCheckoutAPI() {
  console.log('🔍 Testing Stripe Checkout API...\n');

  // Simulate a checkout request
  const payload = JSON.stringify({ planId: 'cielo-estrellas' });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/checkout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length,
      'Authorization': 'Bearer test-token-invalid', // This will fail, but we need to see the error
    },
  };

  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Response Headers:`, res.headers);
        console.log(`Response Body:`, data);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('Request Error:', error);
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

// Wait for server to be ready
setTimeout(testCheckoutAPI, 3000);
