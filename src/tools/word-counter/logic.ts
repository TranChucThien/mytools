export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
}

const WORDS_PER_MINUTE = 200;
const HAS_ALNUM = /[\p{L}\p{N}]/u;

function graphemes(s: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s)].map((g) => g.segment);
  }
  return [...s.normalize('NFC')];
}

export function countText(text: string): TextStats {
  const chars = graphemes(text);
  const words = text.split(/\s+/).filter((w) => HAS_ALNUM.test(w)).length;
  return {
    words,
    characters: chars.length,
    charactersNoSpaces: chars.filter((c) => !/^\s+$/.test(c)).length,
    sentences: text.split(/[.!?…]+/).filter((s) => HAS_ALNUM.test(s)).length,
    paragraphs: text.split(/\n/).filter((line) => line.trim() !== '').length,
    readingMinutes: Math.round((words / WORDS_PER_MINUTE) * 10) / 10,
  };
}
