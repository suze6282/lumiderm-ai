import assert from 'node:assert/strict';
import test from 'node:test';
import app from '../src/app.js';

const listen = () =>
  new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => resolve(server));
  });

const close = (server) =>
  new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });

test('GET /api/health returns the documented service envelope', async (context) => {
  const server = await listen();
  context.after(() => close(server));
  const { port } = server.address();

  const response = await fetch(`http://127.0.0.1:${port}/api/health`);
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.success, true);
  assert.equal(payload.service, 'lumiderm-ai-backend');
  assert.equal(payload.version, '1.0.0');
  assert.deepEqual(payload.data, {});
});

test('unknown API route returns the documented error envelope', async (context) => {
  const server = await listen();
  context.after(() => close(server));
  const { port } = server.address();

  const response = await fetch(`http://127.0.0.1:${port}/api/unknown`);
  const payload = await response.json();

  assert.equal(response.status, 404);
  assert.equal(payload.success, false);
  assert.equal(payload.error.code, 'ROUTE_NOT_FOUND');
});

