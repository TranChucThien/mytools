import { describe, expect, it } from 'vitest';
import { canChiDay, canChiYear, lunarMonthLength, lunarToSolar, solarToLunar } from './logic';

const TET: [number, number, number][] = [
  [2020, 1, 25],
  [2021, 2, 12],
  [2022, 2, 1],
  [2023, 1, 22],
  [2024, 2, 10],
  [2025, 1, 29],
  [2026, 2, 17],
  [2027, 2, 6],
  [2028, 1, 26],
  [2029, 2, 13],
  // Vietnam (UTC+7) celebrates on 2 Feb 2030, one day before China (UTC+8): that new moon falls
  // before midnight Hanoi time but after midnight Beijing time.
  [2030, 2, 2],
];

describe('Tết (1/1 lunar) dates', () => {
  it.each(TET)('%i: %i/%i', (y, m, d) => {
    expect(solarToLunar({ y, m, d })).toEqual({ day: 1, month: 1, year: y, leap: false });
    expect(lunarToSolar({ day: 1, month: 1, year: y, leap: false })).toEqual({ y, m, d });
  });
});

describe('leap months', () => {
  it('2025 has a leap 6th month and 2023 a leap 2nd month', () => {
    const l6 = lunarToSolar({ day: 1, month: 6, year: 2025, leap: true });
    expect(l6).not.toBeNull();
    expect(solarToLunar(l6!)).toEqual({ day: 1, month: 6, year: 2025, leap: true });
    expect(lunarToSolar({ day: 1, month: 2, year: 2023, leap: true })).not.toBeNull();
  });
  it('rejects a leap month that does not exist', () => {
    expect(lunarToSolar({ day: 1, month: 3, year: 2026, leap: true })).toBeNull();
  });
});

describe('round trip', () => {
  it('every day from 2015 to 2035 converts back to itself', () => {
    for (let t = Date.UTC(2015, 0, 1); t <= Date.UTC(2035, 11, 31); t += 86_400_000) {
      const dt = new Date(t);
      const solar = { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
      expect(lunarToSolar(solarToLunar(solar))).toEqual(solar);
    }
  });
});

describe('validation and names', () => {
  it('rejects day 30 in a 29-day month', () => {
    const tet = { day: 1, month: 1, year: 2026, leap: false };
    const len = lunarMonthLength(tet)!;
    expect([29, 30]).toContain(len);
    if (len === 29) expect(lunarToSolar({ ...tet, day: 30 })).toBeNull();
  });
  it('names years and days in Can Chi', () => {
    expect(canChiYear(2026)).toBe('Bính Ngọ');
    expect(canChiYear(2025)).toBe('Ất Tỵ');
    expect(canChiYear(2024)).toBe('Giáp Thìn');
    expect(canChiYear(2027)).toBe('Đinh Mùi');
    // 1 Jan 2000 was a Mậu Ngọ day.
    expect(canChiDay({ y: 2000, m: 1, d: 1 })).toBe('Mậu Ngọ');
  });
});
