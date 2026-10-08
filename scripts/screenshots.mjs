// Light/dark × 390/1280 screenshots. Usage: node scripts/screenshots.mjs <out-dir> "/,/tinh-phan-tram/"
import { chromium } from 'playwright';
const BASE = process.env.E2E_BASE || 'http://localhost:4321';
const OUT = process.argv[2];
const pages = (process.argv[3] || '/,/tinh-phan-tram/').split(',');
const b = await chromium.launch();
for (const scheme of ['light', 'dark']) {
  for (const width of [390, 1280]) {
    const ctx = await b.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    const p = await ctx.newPage();
    for (const path of pages) {
      await p.goto(BASE + path, { waitUntil: 'networkidle' });
      const name = path.replace(/\//g, '_') || 'root';
      await p.screenshot({ path: `${OUT}/${name}-${scheme}-${width}.png`, fullPage: process.env.FULL === '1' });
    }
    await ctx.close();
  }
}
await b.close();
console.log('ok');
