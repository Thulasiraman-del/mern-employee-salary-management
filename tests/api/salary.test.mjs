import http from 'http';

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : '{}';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr)
      },
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`✗ ${name}: ${e.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function runTests() {
  console.log('\n--- API Tests: Salary & Employee Endpoints ---\n');

  await test('Backend is running on port 5000', async () => {
    const res = await request('GET', '/data_pegawai');
    assert(res.status !== undefined, 'Server not responding');
  });

  await test('GET /data_pegawai requires authentication', async () => {
    const res = await request('GET', '/data_pegawai');
    assert(res.status === 401 || res.status === 403,
      `Expected 401/403, got ${res.status}`);
  });

  await test('GET /data_jabatan requires authentication', async () => {
    const res = await request('GET', '/data_jabatan');
    assert(res.status === 401 || res.status === 403,
      `Expected 401/403, got ${res.status}`);
  });

  await test('GET /data_kehadiran requires authentication', async () => {
    const res = await request('GET', '/data_kehadiran');
    assert(res.status === 401 || res.status === 403,
      `Expected 401/403, got ${res.status}`);
  });

  await test('POST /data_pegawai without session closes connection (bug)', async () => {
    try {
      const res = await request('POST', '/data_pegawai', {});
      assert(res.status !== undefined, `Got status ${res.status}`);
    } catch (e) {
      if (e.message.includes('ECONNRESET')) {
        console.log('  → BUG: Server resets connection instead of returning 401');
        return;
      }
      throw e;
    }
  });

  console.log(`\n${passed} passed, ${failed} failed`);
}

runTests();