// Browser checks against a running `npm run preview` (E2E_BASE, default http://localhost:4321).
// Usage: npm run e2e [-- <screenshot-dir>]
import { chromium } from 'playwright';
const BASE = process.env.E2E_BASE || 'http://localhost:4321';
const SHOTS = process.argv[2];
const b = await chromium.launch();
const results = [];
const errors = [];
const ok = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);

async function page(width, path, clock) {
  const ctx = await b.newContext({ viewport: { width, height: 900 }, acceptDownloads: true });
  const p = await ctx.newPage();
  if (clock) await p.clock.install({ time: clock });
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

// ---------- Wave 1 tools (desktop) ----------
{
  const W = '@1280';
  const val = (p, sel) => p.locator(sel).first().innerText();
  let p = await page(1280, '/tinh-tuoi/');
  await p.locator('[data-birth]').fill('15/08/1995');
  await p.locator('[data-ref]').fill('08/10/2026');
  ok(`age ymd ${W}`, (await val(p, '[data-age] [data-value]')) === '31 năm 1 tháng 23 ngày', await val(p, '[data-age] [data-value]'));
  ok(`age total ${W}`, (await val(p, '[data-total]')) === '11.377 ngày');
  ok(`age next birthday dd/mm/yyyy ${W}`, (await val(p, '[data-next]')) === 'Chủ nhật, 15/08/2027', await val(p, '[data-next]'));
  ok(`age quip ${W}`, await p.locator('[data-age] [data-quip]').isVisible());
  await p.locator('[data-birth-time]').fill('07:30');
  await p.locator('[data-ref-time]').fill('9h45');
  ok(`age with time ${W}`, (await val(p, '[data-age] [data-value]')) === '31 năm 1 tháng 23 ngày 2 giờ 15 phút', await val(p, '[data-age] [data-value]'));
  ok(`age ticker ${W}`, (await val(p, '[data-age] [data-tick="days"]')) === '11.377' && (await val(p, '[data-age] [data-tick="hours"]')) === '02');
  await p.locator('[data-ref-time]').fill('25:00');
  ok(`age bad time ${W}`, (await val(p, '[data-age] [data-error]')).length > 0 && !(await p.locator('[data-age] [data-ticker]').isVisible()));
  await p.locator('[data-birth]').fill('31/02/2000');
  ok(`age impossible date ${W}`, (await val(p, '[data-age] [data-error]')).includes('dd/mm/yyyy'));
  await p.locator('[data-birth]').fill('');
  await p.locator('[data-birth]').pressSequentially('15081995');
  ok(`age date mask ${W}`, (await p.locator('[data-birth]').inputValue()) === '15/08/1995');
  await p.close();

  // Live counter with a fake clock paused at 10:00:00 on 09/10/2026.
  p = await page(1280, '/tinh-tuoi/', new Date(2026, 9, 9, 9, 59, 0));
  await p.clock.pauseAt(new Date(2026, 9, 9, 10, 0, 0));
  await p.locator('[data-birth]').fill('09/10/2000');
  await p.locator('[data-birth-time]').fill('09:59');
  const before = await val(p, '[data-age] [data-tick="seconds"]');
  await p.clock.runFor(3000);
  const after = await val(p, '[data-age] [data-tick="seconds"]');
  ok(`age live ticker ${W}`, before === '00' && after === '03' && (await val(p, '[data-age] [data-value]')) === '26 năm 0 tháng 0 ngày 0 giờ 1 phút', `${before} -> ${after}`);
  await p.close();

  p = await page(1280, '/en/age-calculator/');
  await p.locator('[data-birth]').fill('08/15/1995');
  await p.locator('[data-ref]').fill('10/08/2026');
  ok(`age en mm/dd ${W}`, (await val(p, '[data-age] [data-value]')) === '31 years 1 month 23 days', await val(p, '[data-age] [data-value]'));
  await p.close();

  p = await page(1280, '/en/discount-calculator/');
  await p.locator('[data-price]').fill('1,000,000');
  await p.locator('[data-extra]').fill('20');
  ok(`discount stacked ${W}`, (await val(p, '[data-discount] [data-value]')) === '560,000' && (await val(p, '[data-discount] [data-total]')) === '44%');
  await p.close();

  p = await page(1280, '/tinh-bmi/');
  await p.locator('[data-weight]').fill('72');
  await p.locator('[data-height]').fill('170');
  ok(`bmi asian ${W}`, (await val(p, '[data-bmi] [data-value]')) === '24,9' && (await val(p, '[data-class]')) === 'Thừa cân');
  await p.locator('label:has([value="who"])').click();
  ok(`bmi who ${W}`, (await val(p, '[data-class]')) === 'Bình thường');
  await p.close();

  p = await page(1280, '/tinh-vat/');
  ok(`vat add ${W}`, (await val(p, '[data-vat] [data-value]')) === '1.100.000');
  await p.locator('label:has([value="remove"])').click();
  ok(`vat remove ${W}`, (await val(p, '[data-vat] [data-value]')) === '909.090,91', await val(p, '[data-vat] [data-value]'));
  await p.close();

  p = await page(1280, '/dem-tu/');
  await p.locator('[data-text]').fill('Hôm nay trời đẹp. Đi Đà Lạt thôi!');
  ok(`word count ${W}`, (await val(p, '[data-words-n]')) === '8' && (await val(p, '[data-sentences]')) === '2');
  await p.close();

  p = await page(1280, '/bo-dau-tieng-viet/');
  ok(`unaccent ${W}`, (await p.locator('[data-out]').inputValue()) === 'Tieng Viet co dau that dep, nhung doi khi can bo dau.');
  await p.close();

  p = await page(1280, '/en/case-converter/');
  await p.getByRole('button', { name: 'Title Case' }).click();
  ok(`title case ${W}`, (await p.locator('[data-out]').inputValue()) === 'The Quick Brown Fox. It Jumps Over Paris!');
  await p.close();

  p = await page(1280, '/tao-slug/');
  ok(`slug ${W}`, (await val(p, '[data-slug] [data-out]')) === 'huong-dan-nau-pho-bo-ha-noi');
  await p.close();

  p = await page(1280, '/tung-dong-xu/');
  for (let i = 0; i < 10; i++) await p.locator('[data-flip]').click();
  ok(`coin tally ${W}`, (await val(p, '[data-coin] [data-total]')) === '10');
  await p.close();

  p = await page(1280, '/boc-tham-ngau-nhien/');
  await p.locator('[data-count]').fill('2');
  await p.locator('[data-remove]').check();
  await p.locator('[data-pick]').click();
  ok(`picker ${W}`, (await p.locator('[data-winners] li').count()) === 2 && (await p.locator('[data-list]').inputValue()).split('\n').length === 4);
  await p.close();

  p = await page(1280, '/en/password-generator/');
  ok(`password default ${W}`, (await val(p, '[data-password] [data-out]')).length === 16);
  await p.locator('[data-length]').fill('32');
  ok(`password length ${W}`, (await val(p, '[data-password] [data-out]')).length === 32);
  for (const k of ['lower', 'upper', 'digits', 'symbols']) await p.locator(`[data-opt="${k}"]`).uncheck();
  ok(`password no sets ${W}`, (await val(p, '[data-password] [data-error]')).length > 0);
  await p.close();

  p = await page(1280, '/en/celsius-to-fahrenheit/');
  await p.locator('[data-a]').fill('37');
  ok(`c→f ${W}`, (await p.locator('[data-b]').inputValue()) === '98.6');
  await p.close();
  p = await page(1280, '/doi-do-f-sang-do-c/');
  await p.locator('[data-a]').fill('-40');
  ok(`f→c negative ${W}`, (await p.locator('[data-b]').inputValue()) === '-40');
  await p.close();
}

// ---------- Wave 2 tools (desktop) ----------
{
  const W = '@1280';
  const val = (p, sel) => p.locator(sel).first().innerText();
  let p = await page(1280, '/doc-so-thanh-chu/');
  ok(`n2w vi ${W}`, (await val(p, '[data-n2w] [data-out]')) === 'Một triệu hai trăm năm mươi nghìn đồng');
  await p.locator('[data-n2w] [data-in]').fill('1.000.005');
  ok(`n2w zero groups ${W}`, (await val(p, '[data-n2w] [data-out]')) === 'Một triệu không trăm linh năm đồng');
  await p.close();
  p = await page(1280, '/en/number-to-words/');
  ok(`n2w en ${W}`, (await val(p, '[data-n2w] [data-out]')) === 'One million two hundred fifty thousand');
  await p.close();

  p = await page(1280, '/tinh-lai-tiet-kiem/');
  ok(`savings ${W}`, (await val(p, '[data-savings] [data-value]')) === '6.000.000');
  await p.close();

  p = await page(1280, '/tinh-lai-vay/');
  ok(`loan declining ${W}`, (await val(p, '[data-loan] [data-value]')) === '45.833.333', await val(p, '[data-loan] [data-value]'));
  ok(`loan schedule rows ${W}`, (await p.locator('[data-rows] tr').count()) === 12);
  await p.close();

  p = await page(1280, '/dem-ngay/');
  await p.locator('[data-start]').fill('01/01/2026');
  await p.locator('[data-end]').fill('17/02/2026');
  ok(`date diff ${W}`, (await val(p, '[data-datediff] [data-value]')) === '47 ngày' && (await val(p, '[data-weekdays]')) === '33 ngày');
  ok(`date diff ticker ${W}`, (await p.locator('[data-datediff] [data-ticker]').isVisible()) && (await p.locator('[data-datediff] [data-quip]').isVisible()));
  await p.locator('[data-start-time]').fill('08:00');
  await p.locator('[data-end-time]').fill('17:30');
  ok(`date diff with time ${W}`, (await val(p, '[data-datediff] [data-value]')) === '47 ngày 9 giờ 30 phút' && (await p.locator('[data-include]').isDisabled()), await val(p, '[data-datediff] [data-value]'));
  await p.close();

  p = await page(1280, '/tao-qr-chuyen-khoan/');
  ok(`vietqr waits for account ${W}`, await p.locator('[data-png]').isDisabled());
  await p.locator('[data-account]').fill('0123456789');
  await p.locator('[data-message]').fill('Tiền ăn trưa');
  await p.waitForTimeout(400);
  ok(`vietqr ready ${W}`, !(await p.locator('[data-png]').isDisabled()) && (await val(p, '[data-sent]')).endsWith('Tien an trua'));
  await p.locator('[data-account]').fill('01 23');
  await p.waitForTimeout(400);
  ok(`vietqr invalid account ${W}`, (await val(p, '[data-vietqr] [data-error]')).length > 0);
  await p.close();

  p = await page(1280, '/vong-quay-may-man/');
  ok(`wheel result hidden before spin ${W}`, !(await p.locator('[data-wheel] [data-result]').isVisible()));
  await p.locator('[data-spin]').click();
  await p.waitForTimeout(4700);
  const winner = await val(p, '[data-wheel] [data-value]');
  ok(`wheel result ${W}`, ['Phở', 'Bún chả', 'Cơm tấm', 'Bánh mì', 'Bún bò', 'Mì Quảng'].includes(winner), winner);
  await p.close();

  p = await page(1280, '/chia-doi-ngau-nhien/');
  await p.locator('[data-make]').click();
  ok(`teams ${W}`, (await p.locator('[data-teams] [data-out] > div').count()) === 2);
  await p.close();
}

// ---------- Wave 3 tools (desktop) ----------
{
  const W = '@1280';
  const val = (p, sel) => p.locator(sel).first().innerText();
  let p = await page(1280, '/tinh-luong-gross-net/');
  ok(`salary g2n ${W}`, (await val(p, '[data-salary] [data-value]')) === '26.215.000');
  const row10 = await p.locator('[data-brackets] tr').nth(1).locator('td').allInnerTexts();
  ok(`salary 10% bracket portion ${W}`, row10.join('|') === '10.000.000 - 30.000.000|10%|1.350.000|135.000', row10.join('|'));
  ok(`salary total row ${W}`, (await p.locator('[data-brackets] tr').last().locator('td').allInnerTexts()).join('|') === 'Tổng cộng||11.350.000|635.000');
  ok(`salary formula ${W}`, (await val(p, '[data-taxable-formula]')).endsWith('= 11.350.000') && (await p.locator('[data-salary] [data-quip]').isVisible()));
  await p.locator('label:has([value="n2g"])').click();
  await p.locator('[data-amount]').fill('26.215.000');
  ok(`salary n2g ${W}`, (await val(p, '[data-salary] [data-value]')) === '30.000.000');
  await p.close();

  p = await page(1280, '/doi-ngay-am-duong/');
  await p.locator('[data-solar]').fill('17/02/2026');
  ok(`lunar tet 2026 ${W}`, (await val(p, '[data-lunar] [data-value]')) === 'Ngày 1 tháng 1 năm 2026' && (await val(p, '[data-cc-year]')) === 'Bính Ngọ');
  ok(`lunar solar dd/mm/yyyy ${W}`, (await val(p, '[data-lunar] [data-sub]')) === 'Thứ ba, 17/02/2026', await val(p, '[data-lunar] [data-sub]'));
  ok(`lunar good hours ${W}`, (await p.locator('[data-good-hours] li').count()) === 6 && !(await p.locator('[data-hour-stat]').isVisible()));
  await p.locator('[data-time]').fill('23:30');
  ok(`lunar hour can chi ${W}`, (await p.locator('[data-hour-stat]').isVisible()) && (await val(p, '[data-cc-hour]')).endsWith('Tý'), await val(p, '[data-cc-hour]'));
  ok(`lunar tet countdown ${W}`, (await p.locator('[data-lunar] [data-ticker]').isVisible()) && (await val(p, '[data-lunar] [data-ticker-label]')).includes('Tết'));
  await p.locator('label:has([value="l2s"])').click();
  await p.locator('[data-lday]').fill('1');
  await p.locator('[data-lmonth]').fill('1');
  await p.locator('[data-lyear]').fill('2030');
  ok(`lunar tet 2030 vn ${W}`, (await val(p, '[data-lunar] [data-value]')) === 'Thứ bảy, 02/02/2030', await val(p, '[data-lunar] [data-value]'));
  await p.locator('[data-lmonth]').fill('3');
  await p.locator('[data-lyear]').fill('2026');
  await p.locator('[data-leap]').check();
  ok(`lunar missing leap ${W}`, (await val(p, '[data-lunar] [data-error]')).length > 0);
  await p.close();

  p = await page(1280, '/en/image-compressor/');
  await p.locator('[data-files]').setInputFiles(new URL('../public/og-default.png', import.meta.url).pathname);
  await p.locator('.img-list a[download]').waitFor({ timeout: 10000 });
  ok(`image compress ${W}`, (await p.locator('.img-list a[download]').getAttribute('download')) === 'og-default-compressed.jpg');
  await p.locator('[data-width]').fill('600');
  await p.waitForTimeout(800);
  ok(`image resize ${W}`, (await val(p, '.img-list .meta span')).includes('600×315'), await val(p, '.img-list .meta span'));
  await p.close();
}

// ---------- Sweep every sitemap page on mobile ----------
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  let current = '';
  p.on('console', (m) => m.type() === 'error' && errors.push(`${current}@390: ${m.text()}`));
  p.on('pageerror', (e) => errors.push(`${current}@390: ${e.message}`));
  const xml = await (await fetch(BASE + '/sitemap.xml')).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const base = new URL(BASE).pathname.replace(/\/$/, '');
  let overflow = [];
  for (const loc of locs) {
    current = loc;
    await p.goto(new URL(BASE).origin + loc, { waitUntil: 'load' });
    if (await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) overflow.push(loc);
  }
  ok(`sweep ${locs.length} pages (base ${base || '/'})`, locs.length > 0 && overflow.length === 0, overflow.join(', '));
  await ctx.close();
}

await b.close();
console.log(results.join('\n'));
console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'No console errors');
process.exit(results.some((r) => r.startsWith('FAIL')) || errors.length ? 1 : 0);
