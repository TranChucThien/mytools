export const MAX_COUNT = 1000;

export type RandomError = 'minMax' | 'count' | 'range' | 'tooMany';
export type RandomResult = { ok: true; values: number[] } | { ok: false; error: RandomError };

export interface RandomOptions {
  min: number;
  max: number;
  count: number;
  unique: boolean;
}

const TWO_POW_53 = 2 ** 53;

/** Uniform integer in [0, n) for 1 <= n <= MAX_SAFE_INTEGER, using rejection sampling (no modulo bias). */
export function secureRandomBelow(n: number): number {
  const limit = Math.floor(TWO_POW_53 / n) * n;
  const buf = new Uint32Array(2);
  for (;;) {
    crypto.getRandomValues(buf);
    // 21 high bits + 32 low bits = 53 random bits.
    const r = (buf[0]! >>> 11) * 2 ** 32 + buf[1]!;
    if (r < limit) return r % n;
  }
}

export function randomInts(
  { min, max, count, unique }: RandomOptions,
  rng: (n: number) => number = secureRandomBelow,
): RandomResult {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) return { ok: false, error: 'range' };
  if (min > max) return { ok: false, error: 'minMax' };
  const span = max - min + 1;
  if (!Number.isSafeInteger(span)) return { ok: false, error: 'range' };
  if (!Number.isInteger(count) || count < 1 || count > MAX_COUNT) return { ok: false, error: 'count' };

  if (!unique) {
    return { ok: true, values: Array.from({ length: count }, () => min + rng(span)) };
  }
  if (count > span) return { ok: false, error: 'tooMany' };

  if (count * 2 <= span) {
    // Sparse draw: rejection on duplicates terminates quickly since at most half the range is taken.
    const seen = new Set<number>();
    while (seen.size < count) seen.add(min + rng(span));
    return { ok: true, values: [...seen] };
  }

  // Dense draw (span <= 2 * MAX_COUNT): partial Fisher–Yates over the whole range.
  const pool = Array.from({ length: span }, (_, i) => min + i);
  for (let i = 0; i < count; i++) {
    const j = i + rng(span - i);
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  return { ok: true, values: pool.slice(0, count) };
}
