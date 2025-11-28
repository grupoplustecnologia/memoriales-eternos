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

  // Step 1: Register a test user
  console.log('[1/4] Registering test user...');
  const email = `test${Date.now()}@test.com`;
  const registerRes = await makeRequest('POST', '/api/auth/register', {
    email,
    password: 'Test1234!',
    name: 'Test User',
  });

  console.log('Status:', registerRes.status);
  if (registerRes.body.success) {
    const token = registerRes.body.data.token;
    console.log('✅ Registration successful');
    console.log('Email:', email);
    console.log('Token:', token.substring(0, 20) + '...\n');

    // Step 2: Check subscription status
    console.log('[2/4] Checking subscription status...');
    const statusRes = await makeRequest(
      'GET',
      '/api/subscription-status',
      null,
      token
    );
    console.log('Status:', statusRes.status);
    console.log('Current plan:', statusRes.body.data?.user?.planType || 'unknown');
    console.log('Subscription status:', statusRes.body.data?.user?.subscriptionStatus || 'unknown', '\n');

    // Step 3: Create checkout session for cielo-estrellas
    console.log('[3/4] Creating checkout session for cielo-estrellas plan (€2.99)...');
    const checkoutRes = await makeRequest(
      'POST',
      '/api/checkout',
      { planId: 'cielo-estrellas' },
      token
    );
    console.log('Status:', checkoutRes.status);

    if (checkoutRes.body.success) {
      console.log('✅ Checkout session created!');
      console.log('Session ID:', checkoutRes.body.sessionId);
      console.log('Checkout URL:', checkoutRes.body.sessionUrl, '\n');

      // Step 4: Create checkout session for santuario-premium
      console.log('[4/4] Creating checkout session for santuario-premium plan (€6.99)...');
      const checkoutPremiumRes = await makeRequest(
        'POST',
        '/api/checkout',
        { planId: 'santuario-premium' },
        token
      );
      console.log('Status:', checkoutPremiumRes.status);

      if (checkoutPremiumRes.body.success) {
        console.log('✅ Premium checkout session created!');
        console.log('Session ID:', checkoutPremiumRes.body.sessionId);
        console.log('Checkout URL:', checkoutPremiumRes.body.sessionUrl);
      } else {
        console.log('❌ Error creating premium checkout:', checkoutPremiumRes.body.error);
      }
    } else {
      console.log('❌ Error creating checkout:', checkoutRes.body.error);
    }
  } else {
    console.log('❌ Registration failed:', registerRes.body);
  }
}

// Wait for server to start
setTimeout(test, 5000);
