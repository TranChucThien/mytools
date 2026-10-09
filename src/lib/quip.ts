/** Helpers for the humorous one-liners (quips) shown under tool results. */

/** Replace {name} placeholders. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

/**
 * Pick the text of the first band whose upper limit is above `value`
 * (`[[18.5, 'thin'], [25, 'normal'], [Infinity, 'heavy']]`). Bands are in ascending order; a null limit means Infinity.
 */
export function band(value: number, bands: readonly (readonly [number | null, string])[]): string {
  // JSON turns Infinity into null when strings travel to the browser via data-config.
  for (const [limit, text] of bands) if (limit === null || value < limit) return text;
  return bands[bands.length - 1]?.[1] ?? '';
}

/** Stable choice from a list: the same seed always gives the same line (no flicker while typing). */
export function pick(list: readonly string[], seed: number): string {
  if (list.length === 0) return '';
  const i = Math.floor(Math.abs(seed)) % list.length;
  return list[i]!;
}
