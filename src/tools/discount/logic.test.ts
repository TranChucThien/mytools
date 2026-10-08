import { describe, expect, it } from 'vitest';
import { applyDiscount } from './logic';

describe('applyDiscount', () => {
  it('applies a single discount', () => {
    expect(applyDiscount(450000, 30)).toEqual({ final: 315000, saved: 135000, totalPercent: 30 });
  });
  it('stacks an extra discount on the reduced price (30% + 20% = 44%)', () => {
    expect(applyDiscount(1000000, 30, 20)).toEqual({ final: 560000, saved: 440000, totalPercent: 44 });
  });
  it('handles decimals without float noise', () => {
    expect(applyDiscount(19.99, 15)).toEqual({ final: 16.9915, saved: 2.9985, totalPercent: 15 });
  });
  it('rejects invalid input', () => {
    expect(applyDiscount(-1, 10)).toBeNull();
    expect(applyDiscount(100, 101)).toBeNull();
    expect(applyDiscount(100, 10, -5)).toBeNull();
  });
});
