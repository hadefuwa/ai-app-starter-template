import http from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

const root = fileURLToPath(new URL('.', import.meta.url));
const publicDir = resolve(root, 'public');
const dataDir = resolve(root, 'data');
const port = Number(process.env.PORT || 4173);
const host = '127.0.0.1';
mkdirSync(dataDir, { recursive: true });
const db = new DatabaseSync(resolve(dataDir, 'worlds.sqlite'));
db.exec(`PRAGMA journal_mode=WAL;
PRAGMA busy_timeout=5000;
CREATE TABLE IF NOT EXISTS worlds (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);`);
const listWorlds = db.prepare('SELECT id, name, updated_at AS updatedAt FROM worlds ORDER BY updated_at DESC');
const getWorld = db.prepare('SELECT id, name, state, created_at AS createdAt, updated_at AS updatedAt FROM worlds WHERE id = ?');
const insertWorld = db.prepare('INSERT INTO worlds (id, name, state, created_at, updated_at) VALUES (?, ?, NULL, ?, ?)');
const saveWorld = db.prepare('UPDATE worlds SET state = ?, updated_at = ? WHERE id = ?');
const deleteWorld = db.prepare('DELETE FROM worlds WHERE id = ?');
const allowedHosts = new Set([`${host}:${port}`, `localhost:${port}`]);
const allowedOrigins = new Set([`http://${host}:${port}`, `http://localhost:${port}`]);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };

function send(res, status, value) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(value));
}
async function readJson(req) {
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > 2_000_000) throw Object.assign(new Error('Save data is too large.'), { status: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw Object.assign(new Error('Request body must be valid JSON.'), { status: 400 }); }
}
function cleanName(value) {
  const name = String(value ?? '').trim().replace(/[\u0000-\u001f<>]/g, '').slice(0, 32);
  if (!name) throw Object.assign(new Error('Enter a world name.'), { status: 400 });
  return name;
}
function worldRecord(row) {
  return row ? { id: row.id, name: row.name, state: row.state ? JSON.parse(row.state) : null, createdAt: row.createdAt, updatedAt: row.updatedAt } : null;
}

const server = http.createServer(async (req, res) => {
  const hostHeader = req.headers.host || '';
  if (!allowedHosts.has(hostHeader)) return send(res, 403, { error: 'Use the local Wildreach address.' });
  if (req.headers.origin && !allowedOrigins.has(req.headers.origin)) return send(res, 403, { error: 'Cross-origin requests are not allowed.' });
  const url = new URL(req.url || '/', `http://${hostHeader}`);
  try {
    if (url.pathname === '/api/health' && req.method === 'GET') return send(res, 200, { ok: true, storage: 'sqlite' });
    if (url.pathname === '/api/worlds' && req.method === 'GET') return send(res, 200, { worlds: listWorlds.all() });
    if (url.pathname === '/api/worlds' && req.method === 'POST') {
      const body = await readJson(req);
      const name = cleanName(body.name);
      const id = randomUUID();
      const now = new Date().toISOString();
      insertWorld.run(id, name, now, now);
      return send(res, 201, { world: { id, name, state: null, createdAt: now, updatedAt: now } });
    }
    const match = url.pathname.match(/^\/api\/worlds\/([0-9a-f-]{36})$/i);
    if (match) {
      const id = match[1];
      if (req.method === 'GET') {
        const row = worldRecord(getWorld.get(id));
        return row ? send(res, 200, { world: row }) : send(res, 404, { error: 'World not found.' });
      }
      if (req.method === 'PUT') {
        const row = getWorld.get(id);
        if (!row) return send(res, 404, { error: 'World not found.' });
        const state = await readJson(req);
        if (!state || state.schemaVersion !== 1 || typeof state !== 'object' || Array.isArray(state)) return send(res, 400, { error: 'Unsupported world save format.' });
        const now = new Date().toISOString();
        saveWorld.run(JSON.stringify(state), now, id);
        return send(res, 200, { ok: true, updatedAt: now });
      }
      if (req.method === 'DELETE') {
        const result = deleteWorld.run(id);
        return result.changes ? send(res, 200, { ok: true }) : send(res, 404, { error: 'World not found.' });
      }
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, { error: 'Method not allowed.' });
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    const file = resolve(publicDir, `.${pathname}`);
    if (!file.startsWith(publicDir + sep) && file !== resolve(publicDir, 'index.html')) return send(res, 403, { error: 'Forbidden.' });
    let body;
    try { body = readFileSync(file); } catch { return send(res, 404, { error: 'Not found.' }); }
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': file.endsWith('.html') ? 'no-store' : 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    send(res, error.status || 500, { error: error.status ? error.message : 'The save server encountered an error.' });
    if (!error.status) console.error(error);
  }
});
server.on('error', error => { console.error(`Could not start Wildreach server: ${error.message}`); process.exitCode = 1; });
server.listen(port, host, () => console.log(`Wildreach server running at http://${host}:${port}/\nWorlds are stored in ${resolve(dataDir, 'worlds.sqlite')}\nPress Ctrl+C to stop the server.`));
process.on('SIGINT', () => { db.close(); server.close(() => process.exit(0)); });
process.on('SIGTERM', () => { db.close(); server.close(() => process.exit(0)); });