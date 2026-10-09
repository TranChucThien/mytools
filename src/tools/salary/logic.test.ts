import { describe, expect, it } from 'vitest';
import { grossToNet, netToGross, progressiveTax } from './logic';

describe('progressiveTax', () => {
  it('applies the 5-bracket schedule', () => {
    expect(progressiveTax(0).total).toBe(0);
    expect(progressiveTax(11_350_000).total).toBe(635_000);
    expect(progressiveTax(72_493_000).total).toBe(12_247_900);
    expect(progressiveTax(150_000_000).total).toBe(0.5e6 + 2e6 + 6e6 + 12e6 + 17.5e6);
  });
  it('reports tax per bracket', () => {
    expect(progressiveTax(11_350_000).byBracket.filter((b) => b.tax > 0)).toEqual([
      { from: 0, to: 10_000_000, rate: 0.05, tax: 500_000 },
      { from: 10_000_000, to: 30_000_000, rate: 0.1, tax: 135_000 },
    ]);
  });
});

describe('grossToNet', () => {
  it('30M gross, no dependents, region I', () => {
    expect(grossToNet({ gross: 30_000_000, dependents: 0, region: 1 })).toMatchObject({
      bhxh: 2_400_000,
      bhyt: 450_000,
      bhtn: 300_000,
      insurance: 3_150_000,
      taxable: 11_350_000,
      tax: 635_000,
      net: 26_215_000,
    });
  });
  it('100M gross, 1 dependent: BHXH/BHYT capped at 50.6M', () => {
    expect(grossToNet({ gross: 100_000_000, dependents: 1, region: 1 })).toMatchObject({
      insurance: 5_807_000,
      taxable: 72_493_000,
      tax: 12_247_900,
      net: 81_945_100,
    });
  });
  it('caps BHTN by region', () => {
    expect(grossToNet({ gross: 200_000_000, dependents: 0, region: 4 }).bhtn).toBe(740_000);
  });
  it('uses a separate insurance salary when given and never taxes below zero', () => {
    const r = grossToNet({ gross: 20_000_000, dependents: 2, region: 1, insuranceSalary: 6_000_000 });
    expect(r.insurance).toBe(630_000);
    expect(r.taxable).toBe(0);
    expect(r.net).toBe(19_370_000);
  });
});

describe('netToGross', () => {
  it('inverts grossToNet to the đồng', () => {
    for (const gross of [8_000_000, 30_000_000, 55_555_555, 100_000_000, 250_000_000]) {
      const net = grossToNet({ gross, dependents: 1, region: 2 }).net;
      expect(netToGross({ net, dependents: 1, region: 2 }).gross).toBe(gross);
    }
  });
});
