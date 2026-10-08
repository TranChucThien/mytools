import { describe, expect, it } from 'vitest';
import { convertCase } from './logic';

const s = 'hôm nay TRỜI đẹp. đi đà lạt thôi! được không?';

describe('convertCase', () => {
  it('upper and lower handle Vietnamese letters', () => {
    expect(convertCase('đường ưu ái', 'upper')).toBe('ĐƯỜNG ƯU ÁI');
    expect(convertCase('ĐƯỜNG ƯU ÁI', 'lower')).toBe('đường ưu ái');
  });
  it('sentence case lowercases and capitalizes sentence starts', () => {
    expect(convertCase(s, 'sentence')).toBe('Hôm nay trời đẹp. Đi đà lạt thôi! Được không?');
    expect(convertCase('dòng một\ndòng hai', 'sentence')).toBe('Dòng một\nDòng hai');
  });
  it('title case capitalizes every word', () => {
    expect(convertCase('nguyễn văn AN and the city', 'title')).toBe('Nguyễn Văn An And The City');
  });
  it('toggle swaps each letter', () => {
    expect(convertCase('Đi Đà Lạt', 'toggle')).toBe('đI đÀ lẠT');
  });
});

describe('examples published in the page content', () => {
  it('matches the Vietnamese table', () => {
    const input = 'hôm nay trời đẹp. đi Đà Lạt thôi!';
    expect(convertCase(input, 'upper')).toBe('HÔM NAY TRỜI ĐẸP. ĐI ĐÀ LẠT THÔI!');
    expect(convertCase(input, 'sentence')).toBe('Hôm nay trời đẹp. Đi đà lạt thôi!');
    expect(convertCase(input, 'title')).toBe('Hôm Nay Trời Đẹp. Đi Đà Lạt Thôi!');
    expect(convertCase(input, 'toggle')).toBe('HÔM NAY TRỜI ĐẸP. ĐI đÀ lẠT THÔI!');
  });
  it('matches the English table', () => {
    const input = 'the quick brown fox. it jumps over Paris!';
    expect(convertCase(input, 'sentence')).toBe('The quick brown fox. It jumps over paris!');
    expect(convertCase(input, 'title')).toBe('The Quick Brown Fox. It Jumps Over Paris!');
    expect(convertCase(input, 'toggle')).toBe('THE QUICK BROWN FOX. IT JUMPS OVER pARIS!');
  });
});
