import { describe, expect, it } from 'vitest';
import { conversionTable, convert, DEFAULT_TABLE, tableInputs } from './logic';
import { getPair, PAIRS } from './units';

const kgLbs = getPair('kg-lbs');
const cF = getPair('c-f');

describe('convert (linear)', () => {
  it('converts forward and reverse', () => {
    expect(convert(1, kgLbs, 'forward')).toBeCloseTo(2.20462, 5);
    expect(convert(10, kgLbs, 'reverse')).toBeCloseTo(4.53592, 5);
  });
  it('matches the exact pound definition in reverse', () => {
    expect(convert(1, kgLbs, 'reverse')).toBeCloseTo(0.45359237, 14);
    expect(convert(50, kgLbs, 'reverse')).toBeCloseTo(22.6796185, 12);
  });
  it('round-trips', () => {
    for (const v of [0, 1, 72.5, 1234.567, -3]) {
      expect(convert(convert(v, kgLbs, 'forward'), kgLbs, 'reverse')).toBeCloseTo(v, 9);
    }
  });
});

describe('convert (affine: temperature)', () => {
  it('converts known points', () => {
    expect(convert(0, cF, 'forward')).toBe(32);
    expect(convert(100, cF, 'forward')).toBe(212);
    expect(convert(37, cF, 'forward')).toBeCloseTo(98.6, 10);
    expect(convert(-40, cF, 'forward')).toBe(-40);
    expect(convert(212, cF, 'reverse')).toBe(100);
    expect(convert(0, cF, 'reverse')).toBeCloseTo(-17.7778, 4);
  });
  it('round-trips negatives', () => {
    for (const v of [-273.15, -40, -1.5, 0, 36.6]) {
      expect(convert(convert(v, cF, 'forward'), cF, 'reverse')).toBeCloseTo(v, 9);
    }
  });
});

describe('exact definitions', () => {
  it.each([
    ['cm-inch', 2.54, 1],
    ['m-ft', 0.3048, 1],
    ['km-mi', 1.609344, 1],
    ['g-oz', 28.349523125, 1],
    ['l-gal', 3.785411784, 1],
    ['kmh-mph', 1.609344, 1],
    ['m2-ft2', 0.09290304, 1],
  ])('%s: %d units of "from" equal 1 unit of "to"', (id, from, to) => {
    expect(convert(from, getPair(id), 'forward')).toBeCloseTo(to, 12);
  });
  it('1 GB = 1024 MB and 1 ha = 10,000 m²', () => {
    expect(convert(1024, getPair('mb-gb'), 'forward')).toBe(1);
    expect(convert(1, getPair('ha-m2'), 'forward')).toBe(10000);
  });
});

describe('conversionTable', () => {
  it('uses the pair table or the default list and matches convert()', () => {
    const rows = conversionTable(kgLbs, 'forward');
    expect(rows.map((r) => r.input)).toEqual(DEFAULT_TABLE);
    for (const r of rows) expect(r.output).toBe(convert(r.input, kgLbs, 'forward'));
    expect(tableInputs(cF, 'forward')).toContain(-40);
  });
});

describe('PAIRS', () => {
  it('has unique ids, tool ids and slugs', () => {
    const ids = PAIRS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    const toolIds = PAIRS.flatMap((p) => [p.ids.forward, p.ids.reverse]);
    expect(new Set(toolIds).size).toBe(toolIds.length);
  });
  it('gives every pair an about text in both languages', () => {
    for (const p of PAIRS) {
      expect(p.about.vi.length).toBeGreaterThan(40);
      expect(p.about.en.length).toBeGreaterThan(40);
    }
  });
});
