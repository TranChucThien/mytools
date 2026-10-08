import { describe, expect, it } from 'vitest';
import { flipCoin } from './logic';

describe('flipCoin', () => {
  it('maps 0 to heads and 1 to tails', () => {
    expect(flipCoin(() => 0)).toBe('heads');
    expect(flipCoin(() => 1)).toBe('tails');
  });
  it('is roughly fair', () => {
    let heads = 0;
    for (let i = 0; i < 20000; i++) if (flipCoin() === 'heads') heads++;
    expect(heads).toBeGreaterThan(9500);
    expect(heads).toBeLessThan(10500);
  });
});
