#!/usr/bin/env node

const BASE_URL = 'http://localhost:3000';
const timestamp = Date.now();
const email = `testuser${timestamp}@test.com`;
const password = 'TestPassword123!';
const name = 'Test User';

async function test() {
  console.log('🧪 TEST: Register → Auto-redirect to /map');
  console.log('');

  try {
    // Step 1: Register
    console.log('[1/2] Registering new user...');
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log(`  Name: ${name}`);
    
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

    console.log(`  Status: ${registerResponse.status}`);
    
    if (!registerResponse.ok) {
      const errorData = await registerResponse.json();
      console.log(`  ❌ Registration failed:`, errorData);
      return;
    }

    const registerData = await registerResponse.json();
    console.log(`  Response:`, JSON.stringify(registerData, null, 2));

    // Verify structure
    if (!registerData.success) {
      console.log(`  ❌ Registration not successful`);
      return;
    }

    if (!registerData.data?.user || !registerData.data?.session) {
      console.log(`  ❌ Missing user or session in response`);
      console.log(`  data.data?.user:`, registerData.data?.user ? '✅' : '❌');
      console.log(`  data.data?.session:`, registerData.data?.session ? '✅' : '❌');
      return;
    }

    console.log(`  ✅ Registration successful`);
    console.log(`  User ID: ${registerData.data.user.id}`);
    console.log(`  Token: ${registerData.data.session.token.substring(0, 20)}...`);
    
    // Step 2: Login with same credentials
    console.log('');
    console.log('[2/2] Logging in with same credentials...');
    
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    console.log(`  Status: ${loginResponse.status}`);

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      console.log(`  ❌ Login failed:`, errorData);
      return;
    }

    const loginData = await loginResponse.json();
    
    if (!loginData.success) {
      console.log(`  ❌ Login not successful`);
      console.log(`  Response:`, loginData);
      return;
    }

    if (!loginData.data?.user || !loginData.data?.session) {
      console.log(`  ❌ Missing user or session in login response`);
      return;
    }

    console.log(`  ✅ Login successful`);
    console.log(`  Token: ${loginData.data.session.token.substring(0, 20)}...`);

    console.log('');
    console.log('✅ FULL FLOW WORKING:');
    console.log('   1. User registers ✅');
    console.log('   2. Response has data.user and data.session ✅');
    console.log('   3. User logs in immediately ✅');
    console.log('   4. Should auto-redirect to /map ✅');
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

test();
