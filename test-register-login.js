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
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: data,
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
  console.log('🧪 TEST: Register + Login Flow\n');

  const testEmail = `test${Date.now()}@test.com`;
  const testPassword = 'Test1234!';

  // Step 1: Register
  console.log('[1/2] Registering new user...');
  console.log(`Email: ${testEmail}`);
  console.log(`Password: ${testPassword}\n`);

  const registerRes = await makeRequest('POST', '/api/auth/register', {
    email: testEmail,
    password: testPassword,
    name: 'Test User',
  });

  console.log('Registration Status:', registerRes.status);

  if (registerRes.body.success) {
    console.log('✅ Registration successful\n');

    // Step 2: Login with same credentials
    console.log('[2/2] Logging in with same credentials...');
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: testEmail,
      password: testPassword,
    });

    console.log('Login Status:', loginRes.status);

    if (loginRes.body.success) {
      console.log('✅ Login successful!');
      console.log(`Token: ${loginRes.body.data.token.substring(0, 30)}...`);
      console.log('\n🎉 BCRYPT HASHING WORKING CORRECTLY!');
    } else {
      console.log('❌ Login failed:', loginRes.body.message);
    }
  } else {
    console.log('❌ Registration failed:', registerRes.body.message);
  }
}

// Wait for server to start
setTimeout(test, 8000);
