import { describe, expect, it } from 'vitest';
import { ageBetween, parseIsoDate } from './logic';

const d = (s: string) => parseIsoDate(s)!;

describe('ageBetween', () => {
  it('computes years, months, days like a calendar', () => {
    const r = ageBetween(d('1995-08-15'), d('2026-10-08'))!;
    expect([r.years, r.months, r.days]).toEqual([31, 1, 23]);
    expect(r.totalDays).toBe(11377);
    expect(r.weekday).toBe(2); // Tuesday
    expect(r.daysToBirthday).toBe(311);
  });
  it('clamps month ends instead of overflowing', () => {
    const r = ageBetween(d('2000-01-31'), d('2000-03-01'))!;
    expect([r.years, r.months, r.days]).toEqual([0, 1, 1]);
  });
  it('counts 29 February birthdays on 28 February in common years', () => {
    const r = ageBetween(d('2000-02-29'), d('2026-10-08'))!;
    expect(r.totalDays).toBe(9718);
    expect(r.nextBirthday).toEqual({ y: 2027, m: 2, d: 28 });
    expect(r.daysToBirthday).toBe(143);
    const leap = ageBetween(d('2000-02-29'), d('2001-02-28'))!;
    expect([leap.years, leap.months, leap.days]).toEqual([1, 0, 0]);
    expect(leap.daysToBirthday).toBe(0);
  });
  it('is zero on the birth date and null when the reference is earlier', () => {
    expect(ageBetween(d('2020-05-05'), d('2020-05-05'))).toMatchObject({ years: 0, months: 0, days: 0, totalDays: 0 });
    expect(ageBetween(d('2020-05-05'), d('2020-05-04'))).toBeNull();
  });
});

describe('parseIsoDate', () => {
  it('rejects impossible dates', () => {
    expect(parseIsoDate('2023-02-29')).toBeNull();
    expect(parseIsoDate('')).toBeNull();
    expect(parseIsoDate('2024-02-29')).toEqual({ y: 2024, m: 2, d: 29 });
  });
});
