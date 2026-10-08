#!/usr/bin/env node
// Post-build SEO checks on dist/. Exits 1 and lists every problem found.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE = 'https://congcumienphi.id.vn';
const DIST = new URL('../dist/', import.meta.url).pathname;
const problems = [];
const fail = (page, msg) => problems.push(`${page}: ${msg}`);

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith('.html') ? [p] : [];
  });
}

/** dist/foo/index.html → /foo/ */
function urlPath(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  return '/' + rel.replace(/index\.html$/, '');
}

/** Existing page for an absolute URL on this site, or null. */
function pageExists(url) {
  if (!url.startsWith(SITE + '/')) return false;
  const path = url.slice(SITE.length);
  return existsSync(join(DIST, path, 'index.html'));
}

const all = (html, re) => [...html.matchAll(re)];
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

if (!existsSync(DIST)) {
  console.error('dist/ not found – run `npm run build` first.');
  process.exit(1);
}

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const sitemapLocs = new Set(all(sitemap, /<loc>([^<]+)<\/loc>/g).map((m) => m[1]));
for (const loc of sitemapLocs) if (!pageExists(loc)) fail('sitemap.xml', `lists missing page ${loc}`);

const pages = htmlFiles(DIST).filter((f) => !f.endsWith('404.html'));
for (const file of pages) {
  const path = urlPath(file);
  const html = readFileSync(file, 'utf8');
  const expected = SITE + path;

  const titles = all(html, /<title>([^<]*)<\/title>/g);
  if (titles.length !== 1 || !titles[0][1].trim()) fail(path, 'needs exactly one non-empty <title>');
  else if (titles[0][1].length > 70) fail(path, `title is ${titles[0][1].length} chars (> 70)`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(path, 'missing meta description');
  else if (desc.length < 50 || desc.length > 170) fail(path, `meta description is ${desc.length} chars (want 50–170)`);

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (canonical !== expected) fail(path, `canonical is ${canonical}, expected ${expected}`);

  const h1s = all(html, /<h1[\s>]/g).length;
  if (h1s !== 1) fail(path, `has ${h1s} <h1> elements`);

  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  if (!lang) fail(path, 'missing <html lang>');

  const alternates = Object.fromEntries(
    all(html, /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g).map((m) => [m[1], m[2]]),
  );
  for (const hl of ['vi', 'en', 'x-default']) {
    if (!alternates[hl]) fail(path, `missing hreflang ${hl}`);
    else if (!pageExists(alternates[hl])) fail(path, `hreflang ${hl} points to missing page ${alternates[hl]}`);
  }
  if (lang && alternates[lang] !== expected) fail(path, `hreflang ${lang} should point to itself`);

  for (const m of all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const ld = JSON.parse(m[1]);
      if (!ld['@type']) fail(path, 'JSON-LD block without @type');
    } catch {
      fail(path, 'JSON-LD block is not valid JSON');
    }
  }

  for (const m of all(html, /<a [^>]*href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (!existsSync(join(DIST, href, 'index.html')) && !existsSync(join(DIST, href))) {
      fail(path, `broken internal link ${href}`);
    }
  }

  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (!ogImage?.startsWith(SITE) || !existsSync(join(DIST, ogImage.slice(SITE.length)))) {
    fail(path, `og:image missing or not found: ${ogImage}`);
  }

  if (!sitemapLocs.has(expected)) fail(path, 'not listed in sitemap.xml');
}

for (const f of ['robots.txt', 'CNAME', 'favicon.svg', '404.html']) {
  if (!existsSync(join(DIST, f))) fail('dist', `missing ${f}`);
}

if (problems.length > 0) {
  console.error(`✗ ${problems.length} problem(s):\n` + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${pages.length} pages verified (${sitemapLocs.size} sitemap URLs)`);
