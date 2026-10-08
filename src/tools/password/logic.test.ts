import { describe, expect, it } from 'vitest';
import { entropyBits, generatePassword, poolFor, strength, type PasswordOptions } from './logic';

const all: PasswordOptions = { length: 16, lower: true, upper: true, digits: true, symbols: true, excludeSimilar: false };

describe('generatePassword', () => {
  it('respects length and includes every selected set', () => {
    for (let i = 0; i < 50; i++) {
      const r = generatePassword({ ...all, length: 8 });
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.password).toHaveLength(8);
      expect(r.password).toMatch(/[a-z]/);
      expect(r.password).toMatch(/[A-Z]/);
      expect(r.password).toMatch(/[0-9]/);
      expect(r.password).toMatch(/[^a-zA-Z0-9]/);
    }
  });
  it('only uses selected sets and can exclude look-alikes', () => {
    for (let i = 0; i < 50; i++) {
      const r = generatePassword({ ...all, upper: false, symbols: false, excludeSimilar: true, length: 64 });
      expect(r.ok && /^[a-z0-9]+$/.test(r.password) && !/[l1Io0O]/.test(r.password)).toBe(true);
    }
  });
  it('validates options', () => {
    expect(generatePassword({ ...all, lower: false, upper: false, digits: false, symbols: false })).toEqual({ ok: false, error: 'noSets' });
    expect(generatePassword({ ...all, length: 3 })).toEqual({ ok: false, error: 'length' });
    expect(generatePassword({ ...all, length: 129 })).toEqual({ ok: false, error: 'length' });
  });
});

describe('entropy', () => {
  it('is length × log2(pool size)', () => {
    const pool = poolFor({ ...all, symbols: false });
    expect(pool.length).toBe(62);
    expect(entropyBits(16, pool.length)).toBeCloseTo(95.27, 2);
    expect(poolFor({ ...all, symbols: false, excludeSimilar: true }).length).toBe(56);
  });
  it('labels strength', () => {
    expect(strength(30)).toBe('weak');
    expect(strength(50)).toBe('fair');
    expect(strength(70)).toBe('strong');
    expect(strength(95)).toBe('veryStrong');
  });
});
