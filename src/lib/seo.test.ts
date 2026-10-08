import { describe, expect, it } from 'vitest';
import { getTool } from './registry';
import { absoluteUrl, breadcrumbLd, faqLd, SITE, webApplicationLd, websiteLd } from './seo';

describe('absoluteUrl', () => {
  it('joins the site origin with a path', () => {
    expect(absoluteUrl('/tinh-phan-tram/')).toBe(`${SITE}/tinh-phan-tram/`);
    expect(absoluteUrl('/')).toBe(`${SITE}/`);
  });
});

describe('JSON-LD builders', () => {
  const tool = getTool('qr-code')!;

  it('describes a free web application with an absolute url', () => {
    const ld = webApplicationLd(tool, 'en');
    expect(ld['@type']).toBe('WebApplication');
    expect(ld.url).toBe(`${SITE}/en/qr-code-generator/`);
    expect(ld.inLanguage).toBe('en');
    expect(ld.offers).toMatchObject({ '@type': 'Offer', price: '0' });
  });

  it('builds a positioned breadcrumb list', () => {
    const ld = breadcrumbLd([
      { name: 'Home', path: '/en/' },
      { name: 'QR', path: '/en/qr-code-generator/' },
    ]);
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement[1]).toMatchObject({ position: 2, item: `${SITE}/en/qr-code-generator/` });
  });

  it('builds an FAQ page', () => {
    const ld = faqLd([{ q: 'Free?', a: 'Yes.' }]);
    expect(ld.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes.' },
    });
  });

  it('builds a website entry', () => {
    expect(websiteLd('vi')).toMatchObject({ '@type': 'WebSite', url: `${SITE}/`, inLanguage: 'vi' });
  });
});
