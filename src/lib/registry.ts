import { meta as percentage } from '../tools/percentage/meta';
import { meta as qrCode } from '../tools/qr-code/meta';
import { meta as randomNumber } from '../tools/random-number/meta';
import { metas as converters } from '../tools/unit-converter/meta';
import { withBase } from './paths';
import { LANGS, type Lang, type ToolMeta } from './types';

/** Every tool page on the site. Add a tool by importing its meta here. */
export const TOOLS: ToolMeta[] = [percentage, ...converters, randomNumber, qrCode];

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
      if (!contentKeys.has(key)) throw new Error(`Registry: missing content ${key} (expected file ${key}.md)`);
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
