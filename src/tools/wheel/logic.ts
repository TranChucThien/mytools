/**
 * Slices are drawn clockwise from 12 o'clock: slice i covers [i, i+1) × 360/n degrees.
 * The pointer sits at 12 o'clock, so after rotating the wheel clockwise by R degrees
 * the pointer reads wheel angle (360 − R mod 360).
 */
export function indexAtPointer(rotation: number, n: number): number {
  const angle = (((360 - (rotation % 360)) % 360) + 360) % 360;
  return Math.floor(angle / (360 / n)) % n;
}

/** Final rotation (≥ 5 extra turns) that puts `winner` under the pointer, jittered inside the slice. */
export function spinTarget(current: number, n: number, winner: number, random: () => number = Math.random): number {
  const slice = 360 / n;
  const target = (winner + 0.5 + (random() - 0.5) * 0.7) * slice;
  const base = current - (current % 360) + 360 * 5;
  return base + ((360 - target) % 360);
}
