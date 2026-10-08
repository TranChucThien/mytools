import { describe, expect, it } from 'vitest';
import { converterArticle, formulaText } from './article';
import { getPair } from './units';

describe('formulaText', () => {
  it('shows a multiplication for linear pairs', () => {
    expect(formulaText(getPair('cm-inch'), 'reverse', 'vi')).toBe('cm = inch × 2,54');
  });
  it('shows offset formulas for temperature both ways', () => {
    expect(formulaText(getPair('c-f'), 'forward', 'en')).toBe('°F = °C × 1.8 + 32');
    expect(formulaText(getPair('c-f'), 'reverse', 'vi')).toBe('°C = (°F - 32) ÷ 1,8');
  });
});

describe('converterArticle', () => {
  it('computes FAQ answers from the pair', () => {
    const a = converterArticle(getPair('km-mi'), 'reverse', 'en');
    expect(a.faq[1]).toEqual({ q: 'What is 26.2 mi in km?', a: '26.2 mi = 42.164813 km.' });
    expect(a.faq).toHaveLength(4);
  });
  it('uses the page locale for numbers', () => {
    const a = converterArticle(getPair('c-f'), 'forward', 'vi');
    expect(a.faq[1]!.a).toBe('37 °C = 98,6 °F.');
  });
  it('never contains en or em dashes', () => {
    for (const lang of ['vi', 'en'] as const) {
      const text = JSON.stringify(converterArticle(getPair('c-f'), 'reverse', lang));
      expect(text).not.toMatch(/[–—]/);
    }
  });
});
