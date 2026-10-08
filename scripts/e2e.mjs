// Browser checks against a running `npm run preview` (E2E_BASE, default http://localhost:4321).
// Usage: npm run e2e [-- <screenshot-dir>]
import { chromium } from 'playwright';
const BASE = process.env.E2E_BASE || 'http://localhost:4321';
const SHOTS = process.argv[2];
const b = await chromium.launch();
const results = [];
const errors = [];
const ok = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);

async function page(width, path) {
  const ctx = await b.newContext({ viewport: { width, height: 900 }, acceptDownloads: true });
  const p = await ctx.newPage();
  p.on('console', (m) => m.type() === 'error' && errors.push(`${path}@${width}: ${m.text()}`));
  p.on('pageerror', (e) => errors.push(`${path}@${width}: ${e.message}`));
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  return p;
}
const text = (p, sel) => p.locator(sel).first().innerText();

for (const width of [390, 1280]) {
  const W = `@${width}`;
  // Percentage VI
  let p = await page(width, '/tinh-phan-tram/');
  const cards = p.locator('[data-mode]');
  ok(`pct of default ${W}`, (await cards.nth(0).locator('[data-value]').innerText()) === '30');
  await cards.nth(0).locator('[data-x]').fill('12,5');
  await cards.nth(0).locator('[data-y]').fill('1.250.000');
  ok(`pct of vi decimals ${W}`, (await cards.nth(0).locator('[data-value]').innerText()) === '156.250', await cards.nth(0).locator('[data-value]').innerText());
  await cards.nth(1).locator('[data-y]').fill('0');
  ok(`pct div zero ${W}`, (await cards.nth(1).locator('[data-error]').innerText()).includes('chia cho 0'));
  ok(`pct change default ${W}`, (await cards.nth(2).locator('[data-value]').innerText()) === 'Tăng 25%');
  await cards.nth(2).locator('[data-x]').fill('abc');
  ok(`pct invalid ${W}`, (await cards.nth(2).locator('[data-error]').innerText()).length > 0 && (await cards.nth(2).locator('[data-x]').getAttribute('aria-invalid')) === 'true');
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  ok(`no horizontal scroll pct ${W}`, !overflow);
  if (SHOTS) await p.screenshot({ path: `${SHOTS}/pct-${width}.png`, fullPage: false });
  await p.close();

  // Converter EN + reverse + lang switch
  p = await page(width, '/en/kg-to-lbs/');
  ok(`kg→lbs default ${W}`, (await p.locator('[data-b]').inputValue()) === '2.204623', await p.locator('[data-b]').inputValue());
  await p.locator('[data-b]').fill('50');
  ok(`lbs box back-converts ${W}`, (await p.locator('[data-a]').inputValue()) === '22.679619', await p.locator('[data-a]').inputValue());
  ok(`table rendered ${W}`, (await p.locator('table tbody tr').count()) === 21);
  await p.getByRole('link', { name: /Swap/ }).click();
  await p.waitForURL('**/en/lbs-to-kg/');
  ok(`swap to reverse ${W}`, p.url().endsWith('/en/lbs-to-kg/'));
  await p.locator('.lang-switch').click();
  await p.waitForURL('**/doi-lbs-sang-kg/');
  ok(`lang switch counterpart ${W}`, p.url().endsWith('/doi-lbs-sang-kg/'));
  await p.locator('[data-a]').fill('1,5');
  ok(`vi lbs→kg comma ${W}`, (await p.locator('[data-b]').inputValue()) === '0,680389', await p.locator('[data-b]').inputValue());
  if (SHOTS) await p.screenshot({ path: `${SHOTS}/conv-${width}.png` });
  await p.close();

  // Random
  p = await page(width, '/so-ngau-nhien/');
  await p.locator('[data-min]').fill('1');
  await p.locator('[data-max]').fill('10');
  await p.locator('[data-count]').fill('10');
  await p.getByRole('button', { name: /Tạo số/ }).click();
  const vals = (await text(p, '[data-value]')).split(', ').map(Number).sort((a, b) => a - b);
  ok(`random unique full range ${W}`, vals.join() === '1,2,3,4,5,6,7,8,9,10', vals.join());
  await p.locator('[data-count]').fill('11');
  await p.getByRole('button', { name: /Tạo số/ }).click();
  ok(`random tooMany ${W}`, (await text(p, '[data-error]')).includes('quá nhỏ'));
  await p.locator('[data-min]').fill('20');
  await p.locator('[data-count]').fill('1');
  await p.getByRole('button', { name: /Tạo số/ }).click();
  ok(`random min>max ${W}`, (await text(p, '[data-error]')).length > 0);
  await p.close();

  // QR
  p = await page(width, '/en/qr-code-generator/');
  await p.waitForTimeout(400);
  const drawn = await p.evaluate(() => {
    const c = document.querySelector('[data-canvas]');
    return c.width > 0 && getComputedStyle(c).visibility === 'visible';
  });
  ok(`qr rendered ${W}`, drawn);
  const [dl] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: 'Download PNG' }).click()]);
  ok(`qr png download ${W}`, dl.suggestedFilename() === 'qr-code.png');
  const [dl2] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: 'Download SVG' }).click()]);
  ok(`qr svg download ${W}`, dl2.suggestedFilename() === 'qr-code.svg');
  await p.locator('[data-text]').fill('   ');
  await p.waitForTimeout(400);
  ok(`qr empty error ${W}`, (await text(p, '[data-error]')).length > 0 && (await p.getByRole('button', { name: 'Download PNG' }).isDisabled()));
  if (SHOTS) { await p.locator('[data-text]').fill('https://congcumienphi.id.vn/'); await p.waitForTimeout(400); await p.screenshot({ path: `${SHOTS}/qr-${width}.png` }); }
  await p.close();

  // Home + 404
  p = await page(width, '/');
  const total = await p.locator('[data-tool-tile]').count();
  ok(`home lists all tools ${W}`, total >= 5, String(total));
  ok(`hero mini tool ${W}`, (await p.locator('[data-hero-pct] [data-value]').innerText()) === '360.000');
  await p.locator('[data-tool-search]').fill('phan tram');
  ok(`search folds diacritics ${W}`, (await p.locator('[data-tool-tile]:visible').count()) === 1);
  await p.locator('[data-tool-search]').fill('zzzz');
  ok(`search empty state ${W}`, await p.locator('[data-tool-empty]').isVisible());
  await p.locator('[data-tool-search]').fill('');
  ok(`no horizontal scroll home ${W}`, !(await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  if (SHOTS) await p.screenshot({ path: `${SHOTS}/home-${width}.png`, fullPage: true });
  await p.close();
}
await b.close();
console.log(results.join('\n'));
console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'No console errors');
process.exit(results.some((r) => r.startsWith('FAIL')) || errors.length ? 1 : 0);
