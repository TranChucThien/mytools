import type { MarkdownInstance } from 'astro';
import { contentKey, TOOLS, validateRegistry } from './registry';
import type { FaqItem, Lang } from './types';

type ToolContent = MarkdownInstance<{ faq?: FaqItem[] }>;

/** Content files are named "<tool id>.<lang>.md" anywhere under src/tools/. */
const files = import.meta.glob<ToolContent>('../tools/**/*.md', { eager: true });

const byKey = new Map<string, ToolContent>();
for (const [path, mod] of Object.entries(files)) {
  const key = path.split('/').pop()!.replace(/\.md$/, '');
  if (byKey.has(key)) throw new Error(`Duplicate content file for "${key}": ${path}`);
  byKey.set(key, mod);
}

validateRegistry(TOOLS, new Set(byKey.keys()));

/** Hand-written content for a tool, if a `<id>.<lang>.md` file exists. */
export function getContent(id: string, lang: Lang): ToolContent | undefined {
  return byKey.get(contentKey(id, lang));
}
