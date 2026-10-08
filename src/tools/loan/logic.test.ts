import { describe, expect, it } from 'vitest';
import { loanSchedule } from './logic';

describe('loanSchedule', () => {
  it('declining balance: equal principal, interest on the remaining balance', () => {
    const r = loanSchedule(120_000_000, 12, 12, 'declining')!;
    expect(r.rows[0]).toEqual({ period: 1, principal: 10_000_000, interest: 1_200_000, payment: 11_200_000, balance: 110_000_000 });
    expect(r.rows[11]!.balance).toBe(0);
    expect(r.totalInterest).toBe(7_800_000);
  });
  it('annuity: equal payments that fully repay the loan', () => {
    const r = loanSchedule(100_000_000, 12, 12, 'annuity')!;
    expect(r.rows[0]!.payment).toBeCloseTo(8_884_878.87, 2);
    expect(r.rows.every((row) => Math.abs(row.payment - r.rows[0]!.payment) < 0.02)).toBe(true);
    expect(r.rows[11]!.balance).toBe(0);
    expect(Math.abs(r.totalInterest - 6_618_546.41)).toBeLessThan(1);
  });
  it('flat: interest on the original amount every month costs more', () => {
    const flat = loanSchedule(100_000_000, 12, 12, 'flat')!;
    const declining = loanSchedule(100_000_000, 12, 12, 'declining')!;
    expect(flat.totalInterest).toBe(12_000_000);
    expect(declining.totalInterest).toBe(6_500_000);
  });
  it('handles a zero rate and rejects invalid input', () => {
    expect(loanSchedule(1200, 0, 12, 'annuity')!.rows[0]!.payment).toBe(100);
    expect(loanSchedule(0, 10, 12, 'flat')).toBeNull();
    expect(loanSchedule(1000, 10, 0, 'flat')).toBeNull();
  });
});
