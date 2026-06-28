const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./server');

test('GET /api/health returns ok status', async () => {
  const server = app.listen(0);
  const { port } = server.address();

  await new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}/api/health`, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(JSON.parse(body), { status: 'ok' });
        resolve();
      });
    }).on('error', reject);
  });

  server.close();
});
