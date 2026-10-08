export type Direction = 'forward' | 'reverse';

export const TABLE_INPUTS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100];

export function convert(value: number, factor: number, direction: Direction): number {
  return direction === 'forward' ? value * factor : value / factor;
}

export function conversionTable(factor: number, direction: Direction): { input: number; output: number }[] {
  return TABLE_INPUTS.map((input) => ({ input, output: convert(input, factor, direction) }));
}
