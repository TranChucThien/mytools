import { secureRandomBelow } from '../random-number/logic';

export type PickResult = { ok: true; winners: string[]; rest: string[] } | { ok: false; error: 'empty' | 'count' };

export function parseNames(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Draw `count` entries without replacement (partial Fisher–Yates); duplicates in the list are separate entries. */
export function pickNames(names: string[], count: number, rng: (n: number) => number = secureRandomBelow): PickResult {
  if (names.length === 0) return { ok: false, error: 'empty' };
  if (!Number.isInteger(count) || count < 1 || count > names.length) return { ok: false, error: 'count' };
  const pool = [...names];
  const winners: string[] = [];
  for (let i = 0; i < count; i++) {
    const j = rng(pool.length);
    winners.push(pool.splice(j, 1)[0]!);
  }
  return { ok: true, winners, rest: pool };
}
