import { describe, expect, it } from 'vitest';
import { MAX_COUNT, randomInts, secureRandomBelow } from './logic';

/** Deterministic rng: cycles through the given values (each < n is the caller's job). */
function seq(values: number[]) {
  let i = 0;
  return (n: number) => values[i++ % values.length]! % n;
}

describe('secureRandomBelow', () => {
  it('stays within [0, n)', () => {
    for (const n of [1, 2, 7, 1000, 2 ** 32 + 5, Number.MAX_SAFE_INTEGER]) {
      for (let k = 0; k < 50; k++) {
        const v = secureRandomBelow(n);
        expect(Number.isInteger(v)).toBe(true);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(n);
      }
    }
  });
  it('is roughly uniform for a small n', () => {
    const counts = [0, 0, 0];
    for (let k = 0; k < 30000; k++) counts[secureRandomBelow(3)]!++;
    for (const c of counts) expect(c).toBeGreaterThan(9000);
  });
});

describe('randomInts', () => {
  it('maps rng output into [min, max]', () => {
    const r = randomInts({ min: 10, max: 12, count: 3, unique: false }, seq([0, 1, 2]));
    expect(r).toEqual({ ok: true, values: [10, 11, 12] });
  });
  it('produces unique values when asked', () => {
    const r = randomInts({ min: 1, max: 5, count: 5, unique: true });
    expect(r.ok).toBe(true);
    if (r.ok) expect([...r.values].sort()).toEqual([1, 2, 3, 4, 5]);
  });
  it('handles unique draws from a huge range without allocating it', () => {
    const r = randomInts({ min: 1, max: 1e15, count: 1000, unique: true });
    expect(r.ok).toBe(true);
    if (r.ok) expect(new Set(r.values).size).toBe(1000);
  });
  it('supports negative ranges and min === max', () => {
    expect(randomInts({ min: -5, max: -5, count: 2, unique: false })).toEqual({ ok: true, values: [-5, -5] });
  });
  it('rejects min > max', () => {
    expect(randomInts({ min: 5, max: 1, count: 1, unique: false })).toEqual({ ok: false, error: 'minMax' });
  });
  it('rejects bad counts', () => {
    expect(randomInts({ min: 1, max: 10, count: 0, unique: false })).toEqual({ ok: false, error: 'count' });
    expect(randomInts({ min: 1, max: 10, count: MAX_COUNT + 1, unique: false })).toEqual({ ok: false, error: 'count' });
    expect(randomInts({ min: 1, max: 10, count: 1.5, unique: false })).toEqual({ ok: false, error: 'count' });
  });
  it('rejects unique draws larger than the range', () => {
    expect(randomInts({ min: 1, max: 3, count: 4, unique: true })).toEqual({ ok: false, error: 'tooMany' });
  });
  it('rejects non-integer or unsafe bounds', () => {
    expect(randomInts({ min: 1.5, max: 3, count: 1, unique: false })).toEqual({ ok: false, error: 'range' });
    expect(randomInts({ min: -(2 ** 53), max: 2 ** 53, count: 1, unique: false })).toEqual({ ok: false, error: 'range' });
  });
});
