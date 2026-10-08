export const MAX_ABS = 999_999_999_999_999;

const VI_DIGITS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const VI_SCALES = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ'];

/** Read 0–999. `full` = not the leading group, so "không trăm" / "linh" are spoken. */
function viTriple(n: number, full: boolean): string[] {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const u = n % 10;
  const out: string[] = [];
  if (h > 0 || full) out.push(VI_DIGITS[h]!, 'trăm');
  if (t === 0) {
    if (u > 0 && (h > 0 || full)) out.push('linh');
  } else if (t === 1) {
    out.push('mười');
  } else {
    out.push(VI_DIGITS[t]!, 'mươi');
  }
  if (u > 0) {
    if (u === 1 && t > 1) out.push('mốt');
    else if (u === 4 && t > 1) out.push('tư');
    else if (u === 5 && t > 0) out.push('lăm');
    else out.push(VI_DIGITS[u]!);
  }
  return out;
}

function groups(n: number): number[] {
  const g: number[] = [];
  do {
    g.push(n % 1000);
    n = Math.floor(n / 1000);
  } while (n > 0);
  return g;
}

/** Vietnamese words for an integer with |n| ≤ 999,999,999,999,999. Null otherwise. */
export function toVietnameseWords(n: number): string | null {
  if (!Number.isInteger(n) || Math.abs(n) > MAX_ABS) return null;
  if (n === 0) return 'không';
  const g = groups(Math.abs(n));
  const words: string[] = [];
  for (let i = g.length - 1; i >= 0; i--) {
    if (g[i] === 0) continue;
    words.push(...viTriple(g[i]!, i !== g.length - 1));
    if (VI_SCALES[i]) words.push(VI_SCALES[i]!);
  }
  return (n < 0 ? 'âm ' : '') + words.join(' ');
}

const EN_ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const EN_SCALES = ['', 'thousand', 'million', 'billion', 'trillion'];

function enTriple(n: number): string[] {
  const out: string[] = [];
  const h = Math.floor(n / 100);
  const rest = n % 100;
  if (h > 0) out.push(EN_ONES[h]!, 'hundred');
  if (rest > 0) {
    if (rest < 20) out.push(EN_ONES[rest]!);
    else out.push(EN_TENS[Math.floor(rest / 10)]! + (rest % 10 ? `-${EN_ONES[rest % 10]}` : ''));
  }
  return out;
}

/** US-style English words (no "and"), same range as the Vietnamese reader. */
export function toEnglishWords(n: number): string | null {
  if (!Number.isInteger(n) || Math.abs(n) > MAX_ABS) return null;
  if (n === 0) return 'zero';
  const g = groups(Math.abs(n));
  const words: string[] = [];
  for (let i = g.length - 1; i >= 0; i--) {
    if (g[i] === 0) continue;
    words.push(...enTriple(g[i]!));
    if (EN_SCALES[i]) words.push(EN_SCALES[i]!);
  }
  return (n < 0 ? 'minus ' : '') + words.join(' ');
}
