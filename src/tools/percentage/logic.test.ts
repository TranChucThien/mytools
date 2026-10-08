import { describe, expect, it } from 'vitest';
import { percentChange, percentOf, whatPercent } from './logic';

describe('percentOf', () => {
  it('computes X% of Y', () => {
    expect(percentOf(20, 150)).toBe(30);
    expect(percentOf(12.5, 80)).toBe(10);
    expect(percentOf(-10, 50)).toBe(-5);
  });
  it('avoids binary float noise', () => {
    expect(percentOf(7, 100)).toBe(7);
    expect(percentOf(0.1, 3)).toBe(0.003);
  });
});

describe('whatPercent', () => {
  it('computes X as % of Y', () => {
    expect(whatPercent(30, 150)).toBe(20);
    expect(whatPercent(1, 3)).toBeCloseTo(33.333333, 5);
  });
  it('returns null when Y is 0', () => {
    expect(whatPercent(5, 0)).toBeNull();
  });
});

describe('percentChange', () => {
  it('computes increase and decrease', () => {
    expect(percentChange(100, 125)).toBe(25);
    expect(percentChange(200, 150)).toBe(-25);
  });
  it('uses the absolute base for negative starting values', () => {
    expect(percentChange(-100, -50)).toBe(50);
  });
  it('returns null when starting value is 0', () => {
    expect(percentChange(0, 10)).toBeNull();
  });
});
