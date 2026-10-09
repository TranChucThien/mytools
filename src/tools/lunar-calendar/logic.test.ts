import { describe, expect, it } from 'vitest';
import { auspiciousHours, canChiDay, canChiHour, canChiYear, hourBranch, lunarMonthLength, lunarToSolar, nextTet, solarToLunar } from './logic';

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

describe('hours', () => {
  // Pick days by their stem via canChiDay, which is pinned against published dates above.
  const findDay = (prefix: string) => {
    for (let d = 1; d <= 31; d++) if (canChiDay({ y: 2026, m: 1, d }).startsWith(prefix)) return { y: 2026, m: 1, d };
    throw new Error(prefix);
  };
  it('maps clock hours to the 12 branches', () => {
    expect(hourBranch(23)).toBe(0);
    expect(hourBranch(0)).toBe(0);
    expect(hourBranch(1)).toBe(1);
    expect(hourBranch(11)).toBe(6);
    expect(hourBranch(22)).toBe(11);
  });
  it('starts the Tý hour at Giáp on Giáp and Kỷ days, Bính on Ất days', () => {
    const giap = findDay('Giáp');
    expect(canChiHour(giap, 0)).toBe('Giáp Tý');
    expect(canChiHour(giap, 12)).toBe('Canh Ngọ');
    expect(canChiHour(findDay('Kỷ'), 1)).toBe('Ất Sửu');
    // 23:00 on a Giáp day is already the Tý hour of the following Ất day.
    expect(canChiHour(giap, 23)).toBe('Bính Tý');
  });
  it('lists the six hoàng đạo hours by day branch', () => {
    const names = (prefix: string) => auspiciousHours(findDay(prefix)).map((h) => h.name);
    const byBranch = (branch: string) => {
      for (let d = 1; d <= 31; d++) {
        const date = { y: 2026, m: 3, d };
        if (canChiDay(date).endsWith(branch)) return auspiciousHours(date).map((h) => h.name);
      }
      throw new Error(branch);
    };
    expect(byBranch('Tý')).toEqual(['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu']);
    expect(byBranch('Mão')).toEqual(['Tý', 'Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu']);
    expect(byBranch('Hợi')).toEqual(['Sửu', 'Thìn', 'Ngọ', 'Mùi', 'Tuất', 'Hợi']);
    expect(names('Giáp')).toHaveLength(6);
    expect(auspiciousHours(findDay('Giáp'))[0]!.range).toMatch(/^\d\d:00 - \d\d:59$/);
  });
});

describe('nextTet', () => {
  it('finds the next lunar new year', () => {
    expect(nextTet({ y: 2026, m: 10, d: 9 })).toEqual({ y: 2027, m: 2, d: 6 });
    expect(nextTet({ y: 2026, m: 2, d: 16 })).toEqual({ y: 2026, m: 2, d: 17 });
    expect(nextTet({ y: 2026, m: 2, d: 17 })).toEqual({ y: 2027, m: 2, d: 6 });
  });
});
