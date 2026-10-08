import type { Lang } from './types';

const SEPARATORS: Record<Lang, { decimal: string; group: string }> = {
  vi: { decimal: ',', group: '.' },
  en: { decimal: '.', group: ',' },
};

const LOCALES: Record<Lang, string> = { vi: 'vi-VN', en: 'en-US' };

function count(s: string, ch: string): number {
  return s.split(ch).length - 1;
}

function escape(ch: string): string {
  return ch === '.' ? '\\.' : ch;
}

function isGrouped(intPart: string, group: string): boolean {
  return new RegExp(`^\\d{1,3}(${escape(group)}\\d{3})+$`).test(intPart);
}

/**
 * Parse a user-typed number using the page language's conventions.
 * VI: "1.234,5" / "1,5"; EN: "1,234.5" / "1.5". A single separator of the
 * "wrong" kind is accepted as a decimal point unless it looks like grouping
 * (exactly three digits after it), so "1.5" works on VI pages too.
 * Returns null for empty or malformed input.
 */
export function parseNumber(input: string, lang: Lang): number | null {
  let s = input.replace(/[\s  ]/g, '');
  if (s === '') return null;

  let sign = 1;
  if (s.startsWith('-')) {
    sign = -1;
    s = s.slice(1);
  } else if (s.startsWith('+')) {
    s = s.slice(1);
  }
  if (!/^[\d.,]+$/.test(s) || !/\d/.test(s)) return null;

  const { decimal, group } = SEPARATORS[lang];
  const decimals = count(s, decimal);
  const groups = count(s, group);
  let intPart: string;
  let fracPart = '';

  if (decimals > 1) return null;

  if (decimals === 1) {
    [intPart, fracPart] = s.split(decimal) as [string, string];
    if (groups > 0 && !isGrouped(intPart, group)) return null;
    if (!/^\d*$/.test(fracPart)) return null;
    intPart = intPart.split(group).join('');
  } else if (groups === 0) {
    intPart = s;
  } else if (groups === 1 && !isGrouped(s, group)) {
    // Single "foreign" separator that is not grouping: treat as decimal point.
    [intPart, fracPart] = s.split(group) as [string, string];
  } else if (groups === 1 && s.startsWith('0')) {
    // "0.250" is a decimal, not 0 thousand 250.
    [intPart, fracPart] = s.split(group) as [string, string];
  } else {
    if (!isGrouped(s, group)) return null;
    intPart = s.split(group).join('');
  }

  if (intPart === '' && fracPart === '') return null;
  const value = Number(`${intPart || '0'}.${fracPart || '0'}`);
  return Number.isFinite(value) ? sign * value : null;
}

export function formatNumber(n: number, lang: Lang, maxFractionDigits = 6): string {
  const out = new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: maxFractionDigits }).format(n);
  // Intl prints "-0" for tiny negatives that round to zero.
  return out.replace(/^-(0([.,]0*)?)$/, '$1');
}
