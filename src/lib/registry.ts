import { meta as age } from '../tools/age/meta';
import { meta as bmi } from '../tools/bmi/meta';
import { meta as caseConverter } from '../tools/case-converter/meta';
import { meta as coinFlip } from '../tools/coin-flip/meta';
import { meta as dateDifference } from '../tools/date-difference/meta';
import { meta as discount } from '../tools/discount/meta';
import { meta as imageCompressor } from '../tools/image-compressor/meta';
import { meta as loan } from '../tools/loan/meta';
import { meta as lunarCalendar } from '../tools/lunar-calendar/meta';
import { meta as namePicker } from '../tools/name-picker/meta';
import { meta as numberToWords } from '../tools/number-to-words/meta';
import { meta as password } from '../tools/password/meta';
import { meta as percentage } from '../tools/percentage/meta';
import { meta as qrCode } from '../tools/qr-code/meta';
import { meta as randomNumber } from '../tools/random-number/meta';
import { meta as removeDiacritics } from '../tools/remove-diacritics/meta';
import { meta as salary } from '../tools/salary/meta';
import { meta as savingsInterest } from '../tools/savings-interest/meta';
import { meta as slug } from '../tools/slug/meta';
import { meta as teamGenerator } from '../tools/team-generator/meta';
import { metas as converters } from '../tools/unit-converter/meta';
import { meta as vat } from '../tools/vat/meta';
import { meta as vietqr } from '../tools/vietqr/meta';
import { meta as wheel } from '../tools/wheel/meta';
import { meta as wordCounter } from '../tools/word-counter/meta';
import { withBase } from './paths';
import { LANGS, type Lang, type ToolMeta } from './types';

/** Every tool page on the site. Add a tool by importing its meta here. */
export const TOOLS: ToolMeta[] = [
  salary,
  percentage,
  age,
  discount,
  bmi,
  vat,
  savingsInterest,
  loan,
  dateDifference,
  lunarCalendar,
  ...converters,
  wordCounter,
  removeDiacritics,
  caseConverter,
  slug,
  numberToWords,
  wheel,
  randomNumber,
  namePicker,
  teamGenerator,
  coinFlip,
  qrCode,
  vietqr,
  password,
  imageCompressor,
];

export function getTool(id: string, tools: ToolMeta[] = TOOLS): ToolMeta | undefined {
  return tools.find((t) => t.id === id);
}

export function homePath(lang: Lang): string {
  return withBase(lang === 'vi' ? '' : 'en/');
}

export function toolPath(tool: ToolMeta, lang: Lang): string {
  return `${homePath(lang)}${tool.slug[lang]}/`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'vi' ? 'en' : 'vi';
}

/** Path of the same tool in the other language. */
export function alternatePath(tool: ToolMeta, lang: Lang): string {
  return toolPath(tool, otherLang(lang));
}

export function contentKey(id: string, lang: Lang): string {
  return `${id}.${lang}`;
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Throws on any inconsistency so a bad registry fails the build instead of shipping broken pages. */
export function validateRegistry(tools: ToolMeta[], contentKeys: Set<string>): void {
  const ids = new Set<string>();
  for (const t of tools) {
    if (ids.has(t.id)) throw new Error(`Registry: duplicate id "${t.id}"`);
    ids.add(t.id);
  }
  for (const lang of LANGS) {
    const slugs = new Set<string>();
    for (const t of tools) {
      const slug = t.slug[lang];
      if (!SLUG_RE.test(slug)) throw new Error(`Registry: invalid ${lang} slug "${slug}" for "${t.id}"`);
      if (slugs.has(slug)) throw new Error(`Registry: duplicate ${lang} slug "${slug}"`);
      slugs.add(slug);
    }
  }
  for (const t of tools) {
    for (const r of t.related) {
      if (!ids.has(r)) throw new Error(`Registry: "${t.id}" has unknown related id "${r}"`);
    }
    for (const lang of LANGS) {
      const key = contentKey(t.id, lang);
      if (!contentKeys.has(key) && !t.faq) throw new Error(`Registry: missing content ${key} (expected file ${key}.md)`);
    }
  }
}

/** Explicit related ids first, then same category, then the rest; self excluded. */
export function relatedTools(tool: ToolMeta, tools: ToolMeta[] = TOOLS, max = 6): ToolMeta[] {
  const out: ToolMeta[] = [];
  const add = (t: ToolMeta | undefined) => {
    if (t && t.id !== tool.id && !out.includes(t)) out.push(t);
  };
  tool.related.forEach((id) => add(getTool(id, tools)));
  tools.filter((t) => t.category === tool.category).forEach(add);
  tools.forEach(add);
  return out.slice(0, max);
}
