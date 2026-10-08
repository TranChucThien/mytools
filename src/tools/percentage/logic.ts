/** Round away binary floating-point noise (0.1 * 3 = 0.30000000000000004). */
function clean(n: number): number {
  return Number(n.toPrecision(12));
}

/** X% of Y. */
export function percentOf(percent: number, value: number): number {
  return clean((percent * value) / 100);
}

/** X is what percent of Y. Null when Y is 0. */
export function whatPercent(part: number, whole: number): number | null {
  if (whole === 0) return null;
  return clean((part / whole) * 100);
}

/** Percent change from `from` to `to`, relative to |from|. Null when `from` is 0. */
export function percentChange(from: number, to: number): number | null {
  if (from === 0) return null;
  return clean(((to - from) / Math.abs(from)) * 100);
}
