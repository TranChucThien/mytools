#!/usr/bin/env node
// Post-build SEO checks on dist/. Exits 1 and lists every problem found.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

// Must match the env used for `astro build` (see astro.config.mjs).
const SITE = (process.env.SITE_URL || 'https://congcumienphi.id.vn').replace(/\/+$/, '');
const BASE = ('/' + (process.env.BASE_PATH || '/').replace(/^\/+|\/+$/g, '') + '/').replace('//', '/');
const ROOT = SITE + BASE; // e.g. https://user.github.io/mytools/
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

/** dist/foo/index.html → <BASE>foo/ */
function urlPath(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  return BASE + rel.replace(/index\.html$/, '');
}

/** Root-relative URL (starting with BASE) → file path inside dist/, or null if outside the site. */
function distPath(href) {
  return href.startsWith(BASE) ? join(DIST, href.slice(BASE.length)) : null;
}

/** Existing page for an absolute URL on this site, or null. */
function pageExists(url) {
  if (!url.startsWith(ROOT)) return false;
  return existsSync(join(DIST, url.slice(ROOT.length), 'index.html'));
}

const all = (html, re) => [...html.matchAll(re)];

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

  // Every root-relative href/src (links, scripts, styles, icons) must resolve inside dist/.
  for (const m of all(html, /(?:href|src)="(\/[^"#?]*)"/g)) {
    const href = m[1];
    const file = distPath(href);
    if (!file || (!existsSync(join(file, 'index.html')) && !existsSync(file))) {
      fail(path, `broken internal reference ${href}`);
    }
  }

  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (!ogImage?.startsWith(ROOT) || !existsSync(join(DIST, ogImage.slice(ROOT.length)))) {
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
