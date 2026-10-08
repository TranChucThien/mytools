import { describe, expect, it } from 'vitest';
import { bmi, classify, healthyRange } from './logic';

describe('bmi', () => {
  it('computes weight / height²', () => {
    expect(bmi(72, 170)).toBeCloseTo(24.9135, 4);
    expect(bmi(0, 170)).toBeNull();
    expect(bmi(70, 0)).toBeNull();
  });
});

describe('classify', () => {
  it('uses unrounded values against WHO and Asian cut-offs', () => {
    const v = bmi(72, 170)!;
    expect(classify(v, 'who')).toBe('normal');
    expect(classify(v, 'asian')).toBe('over');
  });
  it('covers every band', () => {
    expect(classify(18.4, 'who')).toBe('under');
    expect(classify(29.9, 'who')).toBe('over');
    expect(classify(30, 'who')).toBe('obese');
    expect(classify(22.9, 'asian')).toBe('normal');
    expect(classify(25, 'asian')).toBe('obese');
  });
});

describe('healthyRange', () => {
  it('rounds to one decimal using 22.9 (Asian) or 24.9 (WHO) as the upper bound', () => {
    expect(healthyRange(165, 'asian')).toEqual([50.4, 62.3]);
    expect(healthyRange(180, 'who')).toEqual([59.9, 80.7]);
  });
});
