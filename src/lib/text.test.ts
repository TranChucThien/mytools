import { describe, expect, it } from 'vitest';
import { removeDiacritics, slugify } from './text';

describe('removeDiacritics', () => {
  it('strips Vietnamese tones and marks, keeping case', () => {
    expect(removeDiacritics('Tiếng Việt có dấu')).toBe('Tieng Viet co dau');
    expect(removeDiacritics('ĐƯỜNG Đi')).toBe('DUONG Di');
  });
  it('handles decomposed (NFD) input the same as composed (NFC)', () => {
    const nfd = 'Hà Nội'.normalize('NFD');
    expect(removeDiacritics(nfd)).toBe('Ha Noi');
  });
  it('leaves other text untouched', () => {
    expect(removeDiacritics('abc 123 !?')).toBe('abc 123 !?');
  });
});

describe('slugify', () => {
  it('builds lowercase hyphenated slugs without accents', () => {
    expect(slugify('Hướng dẫn nấu phở bò Hà Nội!')).toBe('huong-dan-nau-pho-bo-ha-noi');
    expect(slugify("What Is SEO? A Beginner's Guide")).toBe('what-is-seo-a-beginner-s-guide');
  });
  it('collapses and trims separators', () => {
    expect(slugify('  --Xin   chào__thế giới--  ')).toBe('xin-chao-the-gioi');
  });
  it('supports underscore separator', () => {
    expect(slugify('Đặt tên file', '_')).toBe('dat_ten_file');
  });
  it('returns empty for symbol-only input', () => {
    expect(slugify('!!! ???')).toBe('');
  });
});

describe('slug examples published in the page content', () => {
  it.each([
    ['Crème Brûlée Recipe', 'creme-brulee-recipe'],
    ['Top 10 món ăn Đà Nẵng', 'top-10-mon-an-da-nang'],
    ['Giá vàng hôm nay (cập nhật)', 'gia-vang-hom-nay-cap-nhat'],
    ['Áo thun nam - cổ tròn', 'ao-thun-nam-co-tron'],
  ])('%s → %s', (input, slug) => expect(slugify(input)).toBe(slug));
});
