import type { ToolMeta } from '../../lib/types';
import { converterArticle, units } from './article';
import type { Direction } from './logic';
import { PAIRS, sym, type UnitPair } from './units';


function pageMeta(pair: UnitPair, direction: Direction): ToolMeta {
  const [a, b] = units(pair, direction);
  const other: Direction = direction === 'forward' ? 'reverse' : 'forward';
  const [av, bv] = [sym(a, 'vi'), sym(b, 'vi')];
  const [ae, be] = [sym(a, 'en'), sym(b, 'en')];
  return {
    id: pair.ids[direction],
    category: 'converter',
    icon: pair.icon,
    component: 'unit-converter',
    props: { pairId: pair.id, direction },
    slug: pair.slug[direction],
    title: {
      vi: `Đổi ${av} sang ${bv} (${a.name.vi} sang ${b.name.vi}) online`,
      en: `${a.short} to ${b.short} Converter - Free Online`,
    },
    description: {
      vi: `Đổi ${av} sang ${bv} online miễn phí: nhập số ${a.name.vi} để ra ngay số ${b.name.vi}, kèm công thức và bảng quy đổi ${av} sang ${bv} thông dụng.`,
      en: `Convert ${ae} to ${be} online for free: enter ${a.name.en} and get ${b.name.en} instantly, with the formula and a handy ${a.short} to ${b.short} chart.`,
    },
    h1: { vi: `Đổi ${av} sang ${bv}`, en: `${a.short} to ${b.short} Converter` },
    name: { vi: `Đổi ${av} sang ${bv}`, en: `${a.short} to ${b.short}` },
    intro: {
      vi: `Nhập số ${a.name.vi} (${av}) hoặc ${b.name.vi} (${bv}), kết quả được quy đổi ngay theo cả hai chiều.`,
      en: `Enter a value in ${a.name.en} (${ae}) or ${b.name.en} (${be}) and it converts instantly both ways.`,
    },
    related: [pair.ids[other]],
    faq: {
      vi: converterArticle(pair, direction, 'vi').faq,
      en: converterArticle(pair, direction, 'en').faq,
    },
  };
}

export const metas: ToolMeta[] = PAIRS.flatMap((pair) => [pageMeta(pair, 'forward'), pageMeta(pair, 'reverse')]);
