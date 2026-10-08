import { describe, expect, it } from 'vitest';
import { formatNumber, parseNumber } from './number';

describe('parseNumber (vi)', () => {
  it('accepts comma as decimal separator', () => {
    expect(parseNumber('1,5', 'vi')).toBe(1.5);
  });
  it('accepts dot thousands with comma decimal', () => {
    expect(parseNumber('1.234,5', 'vi')).toBe(1234.5);
    expect(parseNumber('1.234.567', 'vi')).toBe(1234567);
  });
  it('treats a lone dot that cannot be grouping as decimal', () => {
    expect(parseNumber('1.5', 'vi')).toBe(1.5);
    expect(parseNumber('0.25', 'vi')).toBe(0.25);
  });
  it('treats a lone dot followed by exactly 3 digits as grouping', () => {
    expect(parseNumber('1.000', 'vi')).toBe(1000);
  });
  it('handles negatives and spaces', () => {
    expect(parseNumber(' -2,5 ', 'vi')).toBe(-2.5);
    expect(parseNumber('1 000 000', 'vi')).toBe(1000000);
  });
});

describe('parseNumber (en)', () => {
  it('accepts comma thousands with dot decimal', () => {
    expect(parseNumber('1,234.5', 'en')).toBe(1234.5);
  });
  it('accepts plain numbers', () => {
    expect(parseNumber('-3', 'en')).toBe(-3);
    expect(parseNumber('.5', 'en')).toBe(0.5);
  });
  it('treats a lone comma that cannot be grouping as decimal', () => {
    expect(parseNumber('1,5', 'en')).toBe(1.5);
  });
});

describe('parseNumber invalid', () => {
  it.each(['', '   ', 'abc', '1,2,3,4.5.6', '--1', '1e', '.', '-'])('returns null for %j', (s) => {
    expect(parseNumber(s, 'vi')).toBeNull();
    expect(parseNumber(s, 'en')).toBeNull();
  });
});

describe('formatNumber', () => {
  it('formats by locale', () => {
    expect(formatNumber(1234.5, 'vi')).toBe('1.234,5');
    expect(formatNumber(1234.5, 'en')).toBe('1,234.5');
  });
  it('caps fraction digits', () => {
    expect(formatNumber(1 / 3, 'en')).toBe('0.333333');
    expect(formatNumber(1 / 3, 'en', 2)).toBe('0.33');
  });
  it('never prints -0', () => {
    expect(formatNumber(-0.0000001, 'en')).toBe('0');
  });
});
