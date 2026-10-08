export type Lang = 'vi' | 'en';
export const LANGS: readonly Lang[] = ['vi', 'en'];
export const DEFAULT_LANG: Lang = 'vi';

export type Category = 'calculator' | 'converter' | 'text' | 'random' | 'generator';
export const CATEGORIES: readonly Category[] = ['calculator', 'converter', 'text', 'random', 'generator'];

/** Tabler icon per category (https://tabler.io/icons). */
export const CATEGORY_ICONS: Record<Category, string> = {
  calculator: 'calculator',
  converter: 'arrows-exchange',
  text: 'letter-case',
  random: 'dice-5',
  generator: 'sparkles',
};

export type Localized<T = string> = Record<Lang, T>;

export type ToolComponent =
  | 'percentage'
  | 'unit-converter'
  | 'random-number'
  | 'qr-code'
  | 'age'
  | 'discount'
  | 'bmi'
  | 'vat'
  | 'word-counter'
  | 'remove-diacritics'
  | 'case-converter'
  | 'slug'
  | 'coin-flip'
  | 'name-picker'
  | 'password'
  | 'number-to-words'
  | 'savings-interest'
  | 'loan'
  | 'date-difference'
  | 'vietqr'
  | 'wheel'
  | 'team-generator';

export interface ToolMeta {
  /** Stable internal id, e.g. 'percentage', 'kg-to-lbs'. Also the content file key. */
  id: string;
  category: Category;
  /** Tabler outline icon name shown on tiles and the page head. */
  icon: string;
  slug: Localized;
  /** Full <title>. */
  title: Localized;
  /** Meta description. */
  description: Localized;
  h1: Localized;
  /** Short name for cards and breadcrumbs. */
  name: Localized;
  /** 1–2 sentences shown under the H1. */
  intro: Localized;
  /** Related tool ids, most relevant first. */
  related: string[];
  /** Key into the page's component map. */
  component: ToolComponent;
  props?: Record<string, unknown>;
  /** Generated FAQ for tools without a hand-written content file (e.g. unit converters). */
  faq?: Localized<FaqItem[]>;
}

export interface FaqItem {
  q: string;
  a: string;
}
