// dist contains the committed, pre-rendered site. Hosting needs no Python runtime.
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', ...['fr','nl','de','es','pt'].map(lang => `${lang}/index.html`)];
for (const file of [...pages, 'styles.css','app.js','robots.txt','sitemap.xml','404.html']) {
  await access(path.join(root, 'dist', file));
}
for (const page of pages) {
  const file = path.join(root, 'dist', page);
  const html = await readFile(file, 'utf8');
  for (const [,ref] of html.matchAll(/(?:src|poster|data-src|href)="([^"]+)"/g)) {
    if (/^(?:[a-z]+:|#|\/\/)/i.test(ref)) continue;
    const asset = ref.split(/[?#]/)[0];
    if (asset) await access(path.resolve(path.dirname(file), asset));
  }
}
console.log('Build ready: 6 pre-rendered languages and all local assets verified in dist/.');
