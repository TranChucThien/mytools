import { describe, expect, it } from 'vitest';
import { alternatePath, contentKey, getTool, homePath, relatedTools, TOOLS, toolPath, validateRegistry } from './registry';
import type { ToolMeta } from './types';

function fake(id: string, over: Partial<ToolMeta> = {}): ToolMeta {
  const l = (s: string) => ({ vi: `${s}-vi`, en: `${s}-en` });
  return {
    id,
    category: 'calculator',
    icon: 'tool',
    component: 'percentage',
    slug: l(id),
    title: l(id),
    description: l(id),
    h1: l(id),
    name: l(id),
    intro: l(id),
    related: [],
    ...over,
  };
}

const allContent = (tools: ToolMeta[]) => new Set(tools.flatMap((t) => [contentKey(t.id, 'vi'), contentKey(t.id, 'en')]));

describe('validateRegistry', () => {
  it('accepts the real registry with all content present', () => {
    expect(() => validateRegistry(TOOLS, allContent(TOOLS))).not.toThrow();
  });
  it('rejects duplicate ids', () => {
    const tools = [fake('a'), fake('a', { slug: { vi: 'x', en: 'y' } })];
    expect(() => validateRegistry(tools, allContent(tools))).toThrow(/duplicate id "a"/);
  });
  it('rejects duplicate slugs within a language', () => {
    const tools = [fake('a'), fake('b', { slug: { vi: 'a-vi', en: 'b-en' } })];
    expect(() => validateRegistry(tools, allContent(tools))).toThrow(/duplicate vi slug "a-vi"/);
  });
  it('rejects unknown related ids', () => {
    const tools = [fake('a', { related: ['nope'] })];
    expect(() => validateRegistry(tools, allContent(tools))).toThrow(/unknown related id "nope"/);
  });
  it('rejects missing content for a language', () => {
    const tools = [fake('a')];
    expect(() => validateRegistry(tools, new Set([contentKey('a', 'vi')]))).toThrow(/missing content a\.en/);
  });
  it('rejects slugs that are not lowercase url-safe', () => {
    const tools = [fake('a', { slug: { vi: 'Tính', en: 'a' } })];
    expect(() => validateRegistry(tools, allContent(tools))).toThrow(/invalid vi slug/);
  });
});

describe('paths', () => {
  it('builds tool paths with trailing slash and /en/ prefix', () => {
    const p = getTool('percentage')!;
    expect(toolPath(p, 'vi')).toBe('/tinh-phan-tram/');
    expect(toolPath(p, 'en')).toBe('/en/percentage-calculator/');
  });
  it('builds home paths', () => {
    expect(homePath('vi')).toBe('/');
    expect(homePath('en')).toBe('/en/');
  });
  it('maps a converter reverse page to its counterpart in the other language', () => {
    const p = getTool('lbs-to-kg')!;
    expect(alternatePath(p, 'vi')).toBe('/en/lbs-to-kg/');
    expect(alternatePath(p, 'en')).toBe('/doi-lbs-sang-kg/');
  });
});

describe('relatedTools', () => {
  const tools = [
    fake('a', { related: ['d'] }),
    fake('b'),
    fake('c', { category: 'random' }),
    fake('d', { category: 'random' }),
    fake('e', { category: 'generator' }),
  ];
  it('lists explicit related first, then same category, then others, excluding self', () => {
    expect(relatedTools(tools[0]!, tools).map((t) => t.id)).toEqual(['d', 'b', 'c', 'e']);
  });
  it('caps the list', () => {
    expect(relatedTools(tools[0]!, tools, 2)).toHaveLength(2);
  });
  it('gives every real tool at least 3 related tools', () => {
    for (const t of TOOLS) expect(relatedTools(t).length).toBeGreaterThanOrEqual(3);
  });
});
