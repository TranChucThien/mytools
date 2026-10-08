import { homePath, toolPath } from './registry';
import type { FaqItem, Lang, ToolMeta } from './types';

export const SITE = 'https://congcumienphi.id.vn';
export const SITE_NAME = 'Công Cụ Miễn Phí';

export function absoluteUrl(path: string): string {
  return new URL(path, SITE).href;
}

const APP_CATEGORY: Record<ToolMeta['category'], string> = {
  calculator: 'UtilitiesApplication',
  converter: 'UtilitiesApplication',
  random: 'UtilitiesApplication',
  generator: 'DesignApplication',
};

export function webApplicationLd(tool: ToolMeta, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name[lang],
    description: tool.description[lang],
    url: absoluteUrl(toolPath(tool, lang)),
    inLanguage: lang,
    applicationCategory: APP_CATEGORY[tool.category],
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqLd(faq: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function websiteLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl(homePath(lang)),
    inLanguage: lang,
  };
}
