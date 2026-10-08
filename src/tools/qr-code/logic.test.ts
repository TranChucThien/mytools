import { describe, expect, it } from 'vitest';
import { clampSize, MAX_TEXT_LENGTH, validateQrInput } from './logic';

describe('validateQrInput', () => {
  it('accepts normal text and URLs', () => {
    expect(validateQrInput('https://congcumienphi.id.vn/')).toEqual({ ok: true });
    expect(validateQrInput('Xin chào 👋')).toEqual({ ok: true });
  });
  it('rejects empty or whitespace-only input', () => {
    expect(validateQrInput('')).toEqual({ ok: false, error: 'empty' });
    expect(validateQrInput('   \n')).toEqual({ ok: false, error: 'empty' });
  });
  it('rejects text longer than the limit', () => {
    expect(validateQrInput('a'.repeat(MAX_TEXT_LENGTH))).toEqual({ ok: true });
    expect(validateQrInput('a'.repeat(MAX_TEXT_LENGTH + 1))).toEqual({ ok: false, error: 'tooLong' });
  });
});

describe('clampSize', () => {
  it('clamps to [128, 1024] and rounds', () => {
    expect(clampSize(50)).toBe(128);
    expect(clampSize(5000)).toBe(1024);
    expect(clampSize(300.6)).toBe(301);
    expect(clampSize(Number.NaN)).toBe(256);
  });
});
