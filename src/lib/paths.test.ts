import { describe, expect, it } from 'vitest';
import { joinBase } from './paths';

describe('joinBase', () => {
  it('handles a root base', () => {
    expect(joinBase('/', '')).toBe('/');
    expect(joinBase('/', 'en/')).toBe('/en/');
  });
  it('handles a project subpath with or without trailing slash', () => {
    expect(joinBase('/mytools', '')).toBe('/mytools/');
    expect(joinBase('/mytools/', '/favicon.svg')).toBe('/mytools/favicon.svg');
    expect(joinBase('/mytools/', 'tinh-phan-tram/')).toBe('/mytools/tinh-phan-tram/');
  });
});
