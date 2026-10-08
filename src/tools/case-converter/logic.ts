export type CaseMode = 'upper' | 'lower' | 'sentence' | 'title' | 'toggle';

const up = (s: string) => s.toLocaleUpperCase('vi');
const low = (s: string) => s.toLocaleLowerCase('vi');

export function convertCase(text: string, mode: CaseMode): string {
  const t = text.normalize('NFC');
  switch (mode) {
    case 'upper':
      return up(t);
    case 'lower':
      return low(t);
    case 'sentence':
      // First letter of the text, of each line, and after . ! ? followed by whitespace.
      return low(t).replace(/(^|[.!?]\s+|\n\s*)(\p{L})/gu, (_, pre: string, ch: string) => pre + up(ch));
    case 'title':
      return low(t).replace(/(^|\s)(\p{L})/gu, (_, pre: string, ch: string) => pre + up(ch));
    case 'toggle':
      return [...t].map((ch) => (ch === up(ch) ? low(ch) : up(ch))).join('');
  }
}
