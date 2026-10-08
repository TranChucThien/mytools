import { secureRandomBelow } from '../random-number/logic';

export type TeamMode = 'count' | 'size';
export type TeamResult = { ok: true; teams: string[][] } | { ok: false; error: 'empty' | 'value' };

/** Shuffle members, then deal them round-robin so team sizes differ by at most one. */
export function makeTeams(members: string[], mode: TeamMode, value: number, rng: (n: number) => number = secureRandomBelow): TeamResult {
  if (members.length === 0) return { ok: false, error: 'empty' };
  if (!Number.isInteger(value) || value < 1 || value > members.length) return { ok: false, error: 'value' };
  const count = mode === 'count' ? value : Math.ceil(members.length / value);
  const pool = [...members];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = rng(i + 1);
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  const teams: string[][] = Array.from({ length: count }, () => []);
  pool.forEach((m, i) => teams[i % count]!.push(m));
  return { ok: true, teams };
}
