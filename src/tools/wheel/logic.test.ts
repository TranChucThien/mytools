import { describe, expect, it } from 'vitest';
import { indexAtPointer, spinTarget } from './logic';

describe('wheel', () => {
  it('lands the chosen slice under the pointer', () => {
    for (const n of [2, 3, 7, 12]) {
      for (let winner = 0; winner < n; winner++) {
        const rotation = spinTarget(123.4, n, winner, () => 0.5);
        expect(rotation).toBeGreaterThan(123.4 + 360 * 4);
        expect(indexAtPointer(rotation, n)).toBe(winner);
      }
    }
  });
  it('keeps a margin from slice edges for any jitter', () => {
    for (const j of [0, 0.999]) expect(indexAtPointer(spinTarget(0, 5, 3, () => j), 5)).toBe(3);
  });
});
