import type { ToolMeta } from '../../lib/types';
import type { Direction } from './logic';
import { PAIRS, type Unit, type UnitPair } from './units';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function pageMeta(pair: UnitPair, direction: Direction): ToolMeta {
  const [a, b]: [Unit, Unit] = direction === 'forward' ? [pair.from, pair.to] : [pair.to, pair.from];
  const other: Direction = direction === 'forward' ? 'reverse' : 'forward';
  const A = a.symbol.toUpperCase();
  const B = b.symbol.toUpperCase();
  return {
    id: pair.ids[direction],
    category: 'converter',
    icon: pair.icon,
    component: 'unit-converter',
    props: { pairId: pair.id, direction },
    slug: pair.slug[direction],
    title: {
      vi: `Đổi ${a.symbol} sang ${b.symbol} (${a.name.vi} sang ${b.name.vi}) - Chuyển đổi online`,
      en: `${A} to ${B} Converter - Free Online ${cap(a.name.en)} to ${cap(b.name.en)}`,
    },
    description: {
      vi: `Đổi ${a.symbol} sang ${b.symbol} online miễn phí: nhập số ${a.name.vi} để ra ngay số ${b.name.vi}, kèm công thức và bảng quy đổi ${a.symbol} → ${b.symbol} thông dụng.`,
      en: `Convert ${a.symbol} to ${b.symbol} online for free: enter ${a.name.en} and get ${b.name.en} instantly, with the formula and a handy ${A} to ${B} conversion chart.`,
    },
    h1: { vi: `Đổi ${a.symbol} sang ${b.symbol}`, en: `${A} to ${B} Converter` },
    name: { vi: `Đổi ${a.symbol} sang ${b.symbol}`, en: `${A} to ${B}` },
    intro: {
      vi: `Nhập số ${a.name.vi} (${a.symbol}) hoặc ${b.name.vi} (${b.symbol}), kết quả được quy đổi ngay theo cả hai chiều.`,
      en: `Enter a value in ${a.name.en} (${a.symbol}) or ${b.name.en} (${b.symbol}) and it converts instantly both ways.`,
    },
    related: [pair.ids[other]],
  };
}

export const metas: ToolMeta[] = PAIRS.flatMap((pair) => [pageMeta(pair, 'forward'), pageMeta(pair, 'reverse')]);
