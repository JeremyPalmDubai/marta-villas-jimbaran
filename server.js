import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(root, 'dist');
const app = express();
app.disable('x-powered-by');
app.get('/en', (_req, res) => res.redirect(301, '/'));
app.use('/assets', express.static(path.join(site, 'assets'), { maxAge: '1d', index: false }));
app.use(express.static(site, {
  index: 'index.html',
  dotfiles: 'ignore',
  setHeaders(res, file) {
    if (file.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
  },
}));
app.use((_req, res) => res.status(404).sendFile(path.join(site, '404.html')));
const port = Number(process.env.PORT || 3000);
const server = app.listen(port, '0.0.0.0', () => console.log(`MARTA × PALM listening on port ${port}`));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close(() => process.exit(0)));
