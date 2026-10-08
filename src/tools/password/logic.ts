import { secureRandomBelow } from '../random-number/logic';

export interface PasswordOptions {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
}

export type PasswordResult = { ok: true; password: string; bits: number } | { ok: false; error: 'noSets' | 'length' };
export type Strength = 'weak' | 'fair' | 'strong' | 'veryStrong';

export const MIN_LENGTH = 4;
export const MAX_LENGTH = 128;

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?/~',
} as const;
const SIMILAR = /[lI1oO0]/g;

function selectedSets(o: PasswordOptions): string[] {
  return (Object.keys(SETS) as (keyof typeof SETS)[])
    .filter((k) => o[k])
    .map((k) => (o.excludeSimilar ? SETS[k].replace(SIMILAR, '') : SETS[k]));
}

export function poolFor(o: PasswordOptions): string {
  return selectedSets(o).join('');
}

export function entropyBits(length: number, poolSize: number): number {
  return poolSize > 1 ? length * Math.log2(poolSize) : 0;
}

export function strength(bits: number): Strength {
  if (bits < 40) return 'weak';
  if (bits < 60) return 'fair';
  if (bits < 80) return 'strong';
  return 'veryStrong';
}

/** Secure random password with at least one character from each selected set. */
export function generatePassword(o: PasswordOptions, rng: (n: number) => number = secureRandomBelow): PasswordResult {
  const sets = selectedSets(o);
  if (sets.length === 0) return { ok: false, error: 'noSets' };
  if (!Number.isInteger(o.length) || o.length < Math.max(MIN_LENGTH, sets.length) || o.length > MAX_LENGTH) {
    return { ok: false, error: 'length' };
  }
  const pool = sets.join('');
  const pick = (s: string) => s[rng(s.length)]!;
  const chars = sets.map(pick);
  while (chars.length < o.length) chars.push(pick(pool));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = rng(i + 1);
    [chars[i], chars[j]] = [chars[j]!, chars[i]!];
  }
  return { ok: true, password: chars.join(''), bits: entropyBits(o.length, pool.length) };
}
