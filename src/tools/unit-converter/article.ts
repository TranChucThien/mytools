import { formatNumber } from '../../lib/number';
import type { FaqItem, Lang } from '../../lib/types';
import { convert, type Direction } from './logic';
import { sym, type Unit, type UnitPair } from './units';

export interface ConverterArticle {
  howTo: string;
  formula: string;
  units: string;
  examples: string[];
  about: string;
  faq: FaqItem[];
}

export function units(pair: UnitPair, direction: Direction): [Unit, Unit] {
  return direction === 'forward' ? [pair.from, pair.to] : [pair.to, pair.from];
}

/** Human-readable formula for one direction, e.g. "°F = °C × 1,8 + 32". */
export function formulaText(pair: UnitPair, direction: Direction, lang: Lang): string {
  const [ua, ub] = units(pair, direction);
  const a = { symbol: sym(ua, lang) };
  const b = { symbol: sym(ub, lang) };
  const f = (n: number) => formatNumber(n, lang, 10);
  const offset = pair.offset ?? 0;
  if (offset === 0) return `${b.symbol} = ${a.symbol} × ${f(convert(1, pair, direction))}`;
  return direction === 'forward'
    ? `${b.symbol} = ${a.symbol} × ${f(pair.factor)} + ${f(offset)}`
    : `${b.symbol} = (${a.symbol} - ${f(offset)}) ÷ ${f(pair.factor)}`;
}

/** Generated, fully computed content for converter pages without a hand-written Markdown file. */
export function converterArticle(pair: UnitPair, direction: Direction, lang: Lang): ConverterArticle {
  const [ua, ub] = units(pair, direction);
  const a = { ...ua, symbol: sym(ua, lang) };
  const b = { ...ub, symbol: sym(ub, lang) };
  const f = (n: number) => formatNumber(n, lang);
  const line = (v: number) => `${f(v)} ${a.symbol} = ${f(convert(v, pair, direction))} ${b.symbol}`;
  const formula = formulaText(pair, direction, lang);
  const common = pair.common[direction];
  const one = `1 ${a.symbol} = ${f(convert(1, pair, direction))} ${b.symbol}`;
  const back = `1 ${b.symbol} = ${f(convert(1, pair, direction === 'forward' ? 'reverse' : 'forward'))} ${a.symbol}`;
  const exampleValues = [...new Set([common, ...(pair.table?.[direction] ?? [1, 10, 100]).filter((v) => v > 0).slice(1, 3)])];
  const examples = exampleValues.map(line);

  if (lang === 'vi') {
    return {
      howTo: `Nhập số ${a.name.vi} vào ô ${a.symbol}, kết quả ${b.name.vi} hiện ngay ở ô ${b.symbol}. Bạn cũng có thể gõ vào ô ${b.symbol} để đổi ngược lại, hoặc bấm Đổi chiều để mở trang đổi ${b.symbol} sang ${a.symbol}.`,
      formula,
      units: `${one}. Ngược lại, ${back}.`,
      examples,
      about: pair.about.vi,
      faq: [
        { q: `1 ${a.symbol} bằng bao nhiêu ${b.symbol}?`, a: `${one}. Ngược lại, ${back}.` },
        { q: `${f(common)} ${a.symbol} bằng bao nhiêu ${b.symbol}?`, a: `${line(common)}.` },
        { q: `Công thức đổi ${a.symbol} sang ${b.symbol} là gì?`, a: `${formula}. Nhập số vào công cụ ở trên để có kết quả chính xác ngay.` },
        { q: `Công cụ đổi ${a.symbol} sang ${b.symbol} có miễn phí không?`, a: 'Miễn phí hoàn toàn, không cần đăng ký và chạy ngay trên trình duyệt của bạn.' },
      ],
    };
  }
  return {
    howTo: `Type a value in ${a.name.en} (${a.symbol}) and the result in ${b.name.en} appears instantly. You can also type into the ${b.symbol} box to convert the other way, or press Swap to open the ${b.short} to ${a.short} page.`,
    formula,
    units: `${one}. The other way round, ${back}.`,
    examples,
    about: pair.about.en,
    faq: [
      { q: `How many ${b.name.en} are in 1 ${a.symbol}?`, a: `${one}. The other way round, ${back}.` },
      { q: `What is ${f(common)} ${a.symbol} in ${b.symbol}?`, a: `${line(common)}.` },
      { q: `What is the formula to convert ${a.symbol} to ${b.symbol}?`, a: `${formula}. Enter a value in the converter above for an exact result.` },
      { q: `Is this ${a.short} to ${b.short} converter free?`, a: 'Yes, it is completely free, needs no signup and runs entirely in your browser.' },
    ],
  };
}
