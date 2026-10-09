import { describe, expect, it } from 'vitest';
import { ageBetween, parseIsoDate, spanBetween } from './logic';

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

describe('spanBetween', () => {
  const t = (h: number, mi = 0, s = 0) => ({ h, mi, s });
  it('counts down to the second', () => {
    expect(spanBetween({ y: 1995, m: 8, d: 15 }, t(7, 30), { y: 2026, m: 10, d: 8 }, t(9, 45, 10))).toEqual({
      years: 31,
      months: 1,
      days: 23,
      hours: 2,
      minutes: 15,
      seconds: 10,
      totalSeconds: 11_377 * 86_400 + 2 * 3600 + 15 * 60 + 10,
    });
  });
  it('borrows a day when the end clock is earlier than the start clock', () => {
    expect(spanBetween({ y: 2000, m: 1, d: 31 }, t(22), { y: 2000, m: 3, d: 1 }, t(6))).toMatchObject({
      years: 0,
      months: 1,
      days: 0,
      hours: 8,
      minutes: 0,
    });
  });
  it('handles a leap-day birth and rejects reversed moments', () => {
    expect(spanBetween({ y: 2024, m: 2, d: 29 }, t(12), { y: 2025, m: 2, d: 28 }, t(12))).toMatchObject({ years: 1, months: 0, days: 0 });
    expect(spanBetween({ y: 2026, m: 1, d: 1 }, t(10), { y: 2026, m: 1, d: 1 }, t(9, 59))).toBeNull();
    expect(spanBetween({ y: 2026, m: 1, d: 1 }, t(10), { y: 2026, m: 1, d: 1 }, t(10))).toMatchObject({ totalSeconds: 0, days: 0 });
  });
});
