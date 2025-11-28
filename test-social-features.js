// Test script for Social Features API
// Run with: node test-social-features.js

const API_BASE = 'http://localhost:3000/api';

// Demo credentials
const DEMO_TOKEN = 'test-token-demo'; // This would be obtained from login in real scenario

// Test results collector
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

async function test(name, fn) {
  try {
    await fn();
    results.passed++;
    results.tests.push({ name, status: '✅ PASS' });
    console.log(`✅ ${name}`);
  } catch (error) {
    results.failed++;
    results.tests.push({ name, status: `❌ FAIL: ${error.message}` });
    console.log(`❌ ${name}: ${error.message}`);
  }
}

async function runTests() {
  console.log('🧪 TESTING SOCIAL FEATURES API\n');

  // 1. Test Trending Endpoint
  await test('GET /api/trending?type=popular', async () => {
    const res = await fetch(`${API_BASE}/trending?type=popular&limit=5`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.data)) throw new Error('Expected array response');
  });

  await test('GET /api/trending?type=recent', async () => {
    const res = await fetch(`${API_BASE}/trending?type=recent&limit=5`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  await test('GET /api/trending?type=mostLiked', async () => {
    const res = await fetch(`${API_BASE}/trending?type=mostLiked&limit=5`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  await test('GET /api/trending?type=mostCommented', async () => {
    const res = await fetch(`${API_BASE}/trending?type=mostCommented&limit=5`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // 2. Test Search Endpoint
  await test('GET /api/search with query', async () => {
    const res = await fetch(`${API_BASE}/search?q=perro&limit=5`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.data?.memorials)) throw new Error('Expected memorials array');
  });

  await test('GET /api/search with type filter', async () => {
    const res = await fetch(`${API_BASE}/search?q=&type=perro&limit=5`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // 3. Test Tags Endpoint
  await test('GET /api/tags - list all', async () => {
    const res = await fetch(`${API_BASE}/tags`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Expected array response');
  });

  await test('GET /api/tags - popular tags', async () => {
    const res = await fetch(`${API_BASE}/tags?action=popular&limit=10`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  await test('GET /api/tags - preset tags', async () => {
    const res = await fetch(`${API_BASE}/tags?action=preset`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.presetTags) throw new Error('Expected presetTags in response');
  });

  // 4. Test Likes Endpoint (GET)
  await test('GET /api/likes - get count', async () => {
    const res = await fetch(`${API_BASE}/likes?profileId=cmi4ifytq0008myz0vy6mb9fx`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (typeof data.count !== 'number') throw new Error('Expected count in response');
  });

  // 5. Test Reactions Endpoint (GET)
  await test('GET /api/reactions - get reactions', async () => {
    const res = await fetch(`${API_BASE}/reactions?profileId=cmi4ifytq0008myz0vy6mb9fx`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.counts)) throw new Error('Expected counts array');
    if (!data.availableEmojis) throw new Error('Expected availableEmojis');
  });

  // 6. Test Comments Endpoint (GET)
  await test('GET /api/comments - get comments', async () => {
    const res = await fetch(`${API_BASE}/comments?profileId=cmi4ifytq0008myz0vy6mb9fx`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.comments)) throw new Error('Expected comments array');
  });

  // 7. Test View Counter
  await test('POST /api/profiles/[id]/view - increment counter', async () => {
    const res = await fetch(`${API_BASE}/profiles/cmi4ifytq0008myz0vy6mb9fx/view`, {
      method: 'POST'
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (typeof data.data?.viewCount !== 'number') throw new Error('Expected viewCount in response');
  });

  console.log('\n' + '='.repeat(50));
  console.log(`✅ PASSED: ${results.passed}`);
  console.log(`❌ FAILED: ${results.failed}`);
  console.log(`📊 TOTAL: ${results.passed + results.failed}`);
  console.log('='.repeat(50));

  if (results.failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED!');
  } else {
    console.log(`\n⚠️  ${results.failed} test(s) failed`);
  }
}

runTests().catch(console.error);
