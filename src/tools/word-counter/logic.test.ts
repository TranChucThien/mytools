import { describe, expect, it } from 'vitest';
import { countText } from './logic';

describe('countText', () => {
  it('counts Vietnamese syllables as words', () => {
    const r = countText('Hôm nay trời đẹp. Đi Đà Lạt thôi!');
    expect(r.words).toBe(8);
    expect(r.sentences).toBe(2);
    expect(r.paragraphs).toBe(1);
  });
  it('counts characters with and without spaces, by grapheme', () => {
    const r = countText('Xin chào 👋');
    expect(r.characters).toBe(10);
    expect(r.charactersNoSpaces).toBe(8);
  });
  it('treats decomposed accents as one character', () => {
    expect(countText('Việt'.normalize('NFD')).characters).toBe(4);
  });
  it('counts paragraphs as non-empty lines and ignores lone punctuation as words', () => {
    const r = countText('Dòng một.\n\nDòng hai - tiếp\n   \nDòng ba');
    expect(r.paragraphs).toBe(3);
    expect(r.words).toBe(7);
  });
  it('estimates reading time at 200 words per minute', () => {
    expect(countText(Array(400).fill('từ').join(' ')).readingMinutes).toBe(2);
  });
  it('handles empty input', () => {
    expect(countText('   ')).toEqual({ words: 0, characters: 3, charactersNoSpaces: 0, sentences: 0, paragraphs: 0, readingMinutes: 0 });
  });
});
