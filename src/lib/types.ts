export type Lang = 'vi' | 'en';
export const LANGS: readonly Lang[] = ['vi', 'en'];
export const DEFAULT_LANG: Lang = 'vi';

export type Category = 'calculator' | 'converter' | 'random' | 'generator';
export const CATEGORIES: readonly Category[] = ['calculator', 'converter', 'random', 'generator'];

export type Localized<T = string> = Record<Lang, T>;

export interface ToolMeta {
  /** Stable internal id, e.g. 'percentage', 'kg-to-lbs'. Also the content file key. */
  id: string;
  category: Category;
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
  component: 'percentage' | 'unit-converter' | 'random-number' | 'qr-code';
  props?: Record<string, unknown>;
}

export interface FaqItem {
  q: string;
  a: string;
}
