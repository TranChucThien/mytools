import { describe, expect, it } from 'vitest';
import { addVat, removeVat } from './logic';

describe('VAT', () => {
  it('adds VAT to a net price', () => {
    expect(addVat(1000000, 10)).toEqual({ net: 1000000, vat: 100000, gross: 1100000 });
    expect(addVat(250000, 8)).toEqual({ net: 250000, vat: 20000, gross: 270000 });
  });
  it('removes VAT from a gross price (not gross × rate)', () => {
    expect(removeVat(1100000, 10)).toEqual({ net: 1000000, vat: 100000, gross: 1100000 });
    const r = removeVat(100, 20)!;
    expect(r.net).toBeCloseTo(83.333333, 5);
    expect(r.vat).toBeCloseTo(16.666667, 5);
  });
  it('rejects negative amounts or rates', () => {
    expect(addVat(-1, 10)).toBeNull();
    expect(removeVat(100, -5)).toBeNull();
  });
});
