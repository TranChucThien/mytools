import type { Lang } from '../lib/types';
import { en } from './en';
import { vi, type UiStrings } from './vi';

const STRINGS: Record<Lang, UiStrings> = { vi, en };

export function t(lang: Lang): UiStrings {
  return STRINGS[lang];
}

export type { UiStrings };
