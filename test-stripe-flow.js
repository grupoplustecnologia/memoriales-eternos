const http = require('http');

async function makeRequest(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const hostname = 'localhost';
    const port = 3000;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (payload) {
      headers['Content-Length'] = payload.length;
    }

    const options = { hostname, port, path, method, headers };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: JSON.parse(data),
            headers: res.headers,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: data,
            headers: res.headers,
          });
        }
      });
    });

    req.on('error', reject);

    if (payload) {
      req.write(payload);
    }

    req.end();
  });
}

async function test() {
  console.log('🧪 TEST: Stripe Checkout Flow\n');

  // Step 1: Login
  console.log('[1/3] Attempting login...');
  const loginRes = await makeRequest('POST', '/api/auth/login', {
    email: 'admin@foreverpetfriend.com',
    password: 'admin123',
  });

  console.log('Status:', loginRes.status);
  if (loginRes.body.success) {
    const token = loginRes.body.data.token;
    console.log('✅ Login successful');
    console.log('Token:', token.substring(0, 20) + '...\n');

    // Step 2: Check subscription status
    console.log('[2/3] Checking subscription status...');
    const statusRes = await makeRequest(
      'GET',
      '/api/subscription-status',
      null,
      token
    );
    console.log('Status:', statusRes.status);
    console.log('Body:', statusRes.body, '\n');

    // Step 3: Create checkout session
    console.log('[3/3] Creating checkout session for cielo-estrellas plan...');
    const checkoutRes = await makeRequest(
      'POST',
      '/api/checkout',
      { planId: 'cielo-estrellas' },
      token
    );
    console.log('Status:', checkoutRes.status);
    console.log('Body:', JSON.stringify(checkoutRes.body, null, 2));

    if (checkoutRes.body.success) {
      console.log('\n✅ Checkout session created successfully!');
      console.log('Session URL:', checkoutRes.body.sessionUrl);
    } else {
      console.log('\n❌ Error creating checkout session');
      console.log('Error:', checkoutRes.body.error);
    }
  } else {
    console.log('❌ Login failed:', loginRes.body);
  }
}

// Wait for server to start
setTimeout(test, 5000);
