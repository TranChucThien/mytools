import type { APIRoute } from 'astro';
import { homePath, TOOLS, toolPath } from '../lib/registry';
import { absoluteUrl } from '../lib/seo';
import { LANGS, type Lang } from '../lib/types';

/** Every indexable page as its per-language paths. */
const PAGES: Record<Lang, string>[] = [
  { vi: homePath('vi'), en: homePath('en') },
  ...TOOLS.map((tool) => ({ vi: toolPath(tool, 'vi'), en: toolPath(tool, 'en') })),
];

function urlEntry(page: Record<Lang, string>, lang: Lang): string {
  const links = [
    ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(page[l])}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(page.vi)}"/>`,
  ];
  return `  <url>\n    <loc>${absoluteUrl(page[lang])}</loc>\n${links.join('\n')}\n  </url>`;
}

export const GET: APIRoute = () => {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...PAGES.flatMap((page) => LANGS.map((lang) => urlEntry(page, lang))),
    '</urlset>',
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
