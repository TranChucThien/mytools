import { describe, expect, it } from 'vitest';
import { toEnglishWords, toVietnameseWords } from './logic';

describe('toVietnameseWords', () => {
  it.each([
    [0, 'không'],
    [5, 'năm'],
    [10, 'mười'],
    [11, 'mười một'],
    [15, 'mười lăm'],
    [21, 'hai mươi mốt'],
    [24, 'hai mươi tư'],
    [25, 'hai mươi lăm'],
    [100, 'một trăm'],
    [105, 'một trăm linh năm'],
    [110, 'một trăm mười'],
    [1001, 'một nghìn không trăm linh một'],
    [1250000, 'một triệu hai trăm năm mươi nghìn'],
    [21500000, 'hai mươi mốt triệu năm trăm nghìn'],
    [1000005, 'một triệu không trăm linh năm'],
    [1000000000, 'một tỷ'],
    [2000000000000, 'hai nghìn tỷ'],
    [999999999999999, 'chín trăm chín mươi chín nghìn tỷ chín trăm chín mươi chín tỷ chín trăm chín mươi chín triệu chín trăm chín mươi chín nghìn chín trăm chín mươi chín'],
    [-45, 'âm bốn mươi lăm'],
  ])('%d → %s', (n, words) => expect(toVietnameseWords(n)).toBe(words));

  it('returns null out of range or for non-integers', () => {
    expect(toVietnameseWords(1e15)).toBeNull();
    expect(toVietnameseWords(1.5)).toBeNull();
  });
});

describe('toEnglishWords', () => {
  it.each([
    [0, 'zero'],
    [13, 'thirteen'],
    [21, 'twenty-one'],
    [105, 'one hundred five'],
    [1250000, 'one million two hundred fifty thousand'],
    [1000005, 'one million five'],
    [999999999999999, 'nine hundred ninety-nine trillion nine hundred ninety-nine billion nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine'],
    [-7, 'minus seven'],
  ])('%d → %s', (n, words) => expect(toEnglishWords(n)).toBe(words));
});
