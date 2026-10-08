import { describe, expect, it } from 'vitest';
import { conversionTable, convert, TABLE_INPUTS } from './logic';
import { PAIRS } from './units';

const KG_LBS = 1 / 0.45359237;

describe('convert', () => {
  it('converts forward and reverse', () => {
    expect(convert(1, KG_LBS, 'forward')).toBeCloseTo(2.20462, 5);
    expect(convert(10, KG_LBS, 'reverse')).toBeCloseTo(4.53592, 5);
  });
  it('matches the exact pound definition in reverse', () => {
    expect(convert(1, KG_LBS, 'reverse')).toBeCloseTo(0.45359237, 14);
    expect(convert(50, KG_LBS, 'reverse')).toBeCloseTo(22.6796185, 12);
  });
  it('round-trips', () => {
    for (const v of [0, 1, 72.5, 1234.567, -3]) {
      expect(convert(convert(v, KG_LBS, 'forward'), KG_LBS, 'reverse')).toBeCloseTo(v, 9);
    }
  });
});

describe('conversionTable', () => {
  it('uses the standard input list and matches convert()', () => {
    const rows = conversionTable(KG_LBS, 'forward');
    expect(rows.map((r) => r.input)).toEqual(TABLE_INPUTS);
    for (const r of rows) expect(r.output).toBe(convert(r.input, KG_LBS, 'forward'));
  });
  it('starts at 1 and ends at 100', () => {
    expect(TABLE_INPUTS[0]).toBe(1);
    expect(TABLE_INPUTS.at(-1)).toBe(100);
  });
});

describe('PAIRS', () => {
  it('defines kg↔lbs from the exact international pound', () => {
    const p = PAIRS.find((x) => x.id === 'kg-lbs');
    expect(p?.factor).toBe(KG_LBS);
  });
});
