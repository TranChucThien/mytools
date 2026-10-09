import { describe, expect, it } from 'vitest';
import { band, fill, pick } from './quip';

describe('quip helpers', () => {
  it('fills placeholders and leaves unknown ones', () => {
    expect(fill('{a} và {b} và {c}', { a: 1, b: 'hai' })).toBe('1 và hai và {c}');
  });
  it('picks the band below the first limit above the value', () => {
    const bands = [[18.5, 'thin'], [25, 'normal'], [Infinity, 'heavy']] as const;
    expect(band(10, bands)).toBe('thin');
    expect(band(18.5, bands)).toBe('normal');
    expect(band(99, bands)).toBe('heavy');
    const fromJson = JSON.parse(JSON.stringify([[-50, 'halved'], [0, 'down'], [Infinity, 'up']]));
    expect(band(-80, fromJson)).toBe('halved');
    expect(band(-10, fromJson)).toBe('down');
    expect(band(10, fromJson)).toBe('up');
  });
  it('picks stably from a list', () => {
    expect(pick(['a', 'b', 'c'], 4)).toBe('b');
    expect(pick(['a', 'b', 'c'], -4.7)).toBe('b');
    expect(pick([], 1)).toBe('');
  });
});
