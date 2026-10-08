import { describe, expect, it } from 'vitest';
import { parseIsoDate } from '../age/logic';
import { dateDifference } from './logic';

const d = (s: string) => parseIsoDate(s)!;

describe('dateDifference', () => {
  it('counts days to Tết 2026 (end date excluded)', () => {
    const r = dateDifference(d('2026-01-01'), d('2026-02-17'), false);
    expect(r).toMatchObject({ days: 47, weeks: 6, extraDays: 5, months: 1, monthDays: 16, weekdays: 33 });
  });
  it('can include the end date', () => {
    expect(dateDifference(d('2026-10-08'), d('2026-12-31'), true).days).toBe(85);
    expect(dateDifference(d('2026-10-08'), d('2026-12-31'), false).days).toBe(84);
  });
  it('is symmetric when the end is before the start', () => {
    expect(dateDifference(d('2026-02-17'), d('2026-01-01'), false)).toEqual(dateDifference(d('2026-01-01'), d('2026-02-17'), false));
  });
  it('counts weekdays across leap February', () => {
    // Mon 26 Feb 2024 → Mon 4 Mar 2024: 26,27,28,29 Feb + 1 Mar = 5 weekdays.
    expect(dateDifference(d('2024-02-26'), d('2024-03-04'), false)).toMatchObject({ days: 7, weekdays: 5 });
  });
  it('is zero for the same day unless the end is included', () => {
    expect(dateDifference(d('2026-05-05'), d('2026-05-05'), false).days).toBe(0);
    expect(dateDifference(d('2026-05-05'), d('2026-05-05'), true)).toMatchObject({ days: 1, weekdays: 1 });
  });
});
