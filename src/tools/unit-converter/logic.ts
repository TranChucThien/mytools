import type { UnitPair } from './units';

export type Direction = 'forward' | 'reverse';

export const DEFAULT_TABLE: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100];

/** Remove binary float noise (e.g. 0.1 + 0.2) without hiding real precision. */
function clean(n: number): number {
  return Number(n.toPrecision(15));
}

/** forward: to = from × factor + offset; reverse: from = (to − offset) ÷ factor. */
export function convert(value: number, pair: Pick<UnitPair, 'factor' | 'offset'>, direction: Direction): number {
  const offset = pair.offset ?? 0;
  return clean(direction === 'forward' ? value * pair.factor + offset : (value - offset) / pair.factor);
}

export function tableInputs(pair: UnitPair, direction: Direction): number[] {
  return pair.table?.[direction] ?? DEFAULT_TABLE;
}

export function conversionTable(pair: UnitPair, direction: Direction): { input: number; output: number }[] {
  return tableInputs(pair, direction).map((input) => ({ input, output: convert(input, pair, direction) }));
}
