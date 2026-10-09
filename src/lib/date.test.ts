import { describe, expect, it } from 'vitest';
import {
  addDays,
  formatDate,
  formatDateWithWeekday,
  formatTime,
  maskDateTyping,
  maskTimeTyping,
  parseDateText,
  parseIsoDate,
  parseTimeText,
  splitSeconds,
  toIsoDate,
} from './date';

describe('parseDateText', () => {
  it('reads day first on VI pages', () => {
    expect(parseDateText('09/10/2026', 'vi')).toEqual({ y: 2026, m: 10, d: 9 });
    expect(parseDateText('9/1/2026', 'vi')).toEqual({ y: 2026, m: 1, d: 9 });
    expect(parseDateText('09-10-2026', 'vi')).toEqual({ y: 2026, m: 10, d: 9 });
    expect(parseDateText('09.10.2026', 'vi')).toEqual({ y: 2026, m: 10, d: 9 });
    expect(parseDateText(' 09102026 ', 'vi')).toEqual({ y: 2026, m: 10, d: 9 });
  });
  it('reads month first on EN pages', () => {
    expect(parseDateText('10/09/2026', 'en')).toEqual({ y: 2026, m: 10, d: 9 });
  });
  it('rejects impossible dates and short years', () => {
    expect(parseDateText('29/02/2025', 'vi')).toBeNull();
    expect(parseDateText('29/02/2024', 'vi')).toEqual({ y: 2024, m: 2, d: 29 });
    expect(parseDateText('31/04/2026', 'vi')).toBeNull();
    expect(parseDateText('13/13/2026', 'vi')).toBeNull();
    expect(parseDateText('25/12/26', 'vi')).toBeNull();
    expect(parseDateText('2026-10-09', 'vi')).toBeNull();
    expect(parseDateText('', 'vi')).toBeNull();
  });
  it('round-trips with formatDate', () => {
    for (const lang of ['vi', 'en'] as const) {
      const d = { y: 1995, m: 8, d: 5 };
      expect(parseDateText(formatDate(d, lang), lang)).toEqual(d);
    }
  });
});

describe('formatDate', () => {
  it('pads to dd/mm/yyyy on VI and mm/dd/yyyy on EN', () => {
    expect(formatDate({ y: 2026, m: 10, d: 9 }, 'vi')).toBe('09/10/2026');
    expect(formatDate({ y: 2026, m: 10, d: 9 }, 'en')).toBe('10/09/2026');
  });
  it('adds the weekday', () => {
    expect(formatDateWithWeekday({ y: 2026, m: 10, d: 9 }, 'vi')).toBe('Thứ sáu, 09/10/2026');
    expect(formatDateWithWeekday({ y: 2026, m: 10, d: 11 }, 'vi')).toBe('Chủ nhật, 11/10/2026');
    expect(formatDateWithWeekday({ y: 2026, m: 10, d: 9 }, 'en')).toBe('Friday, 10/09/2026');
  });
});

describe('ISO helpers', () => {
  it('round-trips', () => {
    expect(toIsoDate({ y: 2026, m: 1, d: 5 })).toBe('2026-01-05');
    expect(parseIsoDate('2026-01-05')).toEqual({ y: 2026, m: 1, d: 5 });
    expect(parseIsoDate('2026-02-30')).toBeNull();
  });
});

describe('parseTimeText', () => {
  it('treats an empty field as not given', () => {
    expect(parseTimeText('')).toBeUndefined();
    expect(parseTimeText('   ')).toBeUndefined();
  });
  it('accepts common Vietnamese shapes', () => {
    expect(parseTimeText('07:30')).toEqual({ h: 7, mi: 30, s: 0 });
    expect(parseTimeText('7h30')).toEqual({ h: 7, mi: 30, s: 0 });
    expect(parseTimeText('7h')).toEqual({ h: 7, mi: 0, s: 0 });
    expect(parseTimeText('23')).toEqual({ h: 23, mi: 0, s: 0 });
    expect(parseTimeText('0730')).toEqual({ h: 7, mi: 30, s: 0 });
    expect(parseTimeText('7:30:15')).toEqual({ h: 7, mi: 30, s: 15 });
  });
  it('rejects out-of-range and junk', () => {
    expect(parseTimeText('24:00')).toBeNull();
    expect(parseTimeText('12:60')).toBeNull();
    expect(parseTimeText('abc')).toBeNull();
  });
  it('formats as 24-hour', () => {
    expect(formatTime({ h: 7, mi: 5, s: 3 })).toBe('07:05');
    expect(formatTime({ h: 17, mi: 5, s: 3 }, true)).toBe('17:05:03');
  });
});

describe('helpers', () => {
  it('adds days across month and leap boundaries', () => {
    expect(addDays({ y: 2024, m: 2, d: 28 }, 1)).toEqual({ y: 2024, m: 2, d: 29 });
    expect(addDays({ y: 2026, m: 1, d: 1 }, -1)).toEqual({ y: 2025, m: 12, d: 31 });
  });
  it('splits seconds', () => {
    expect(splitSeconds(90_061)).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 });
    expect(splitSeconds(-5)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
  it('masks typing', () => {
    expect(maskDateTyping('09')).toBe('09/');
    expect(maskDateTyping('09/10')).toBe('09/10/');
    expect(maskDateTyping('09/10/2')).toBe('09/10/2');
    expect(maskTimeTyping('07')).toBe('07:');
    expect(maskTimeTyping('75')).toBe('75');
  });
});
