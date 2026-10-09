import { describe, expect, it } from 'vitest';
import { fitSize, outputName, savedPercent } from './logic';

describe('fitSize', () => {
  it('keeps size when no max width or already smaller', () => {
    expect(fitSize(1200, 800)).toEqual({ width: 1200, height: 800 });
    expect(fitSize(1200, 800, 2000)).toEqual({ width: 1200, height: 800 });
  });
  it('scales down keeping aspect ratio and never upscales', () => {
    expect(fitSize(4000, 3000, 1600)).toEqual({ width: 1600, height: 1200 });
    expect(fitSize(1001, 333, 500)).toEqual({ width: 500, height: 166 });
  });
  it('ignores invalid max widths', () => {
    expect(fitSize(800, 600, 0)).toEqual({ width: 800, height: 600 });
  });
});

describe('savedPercent / outputName', () => {
  it('computes savings', () => {
    expect(savedPercent(1000, 250)).toBe(75);
    expect(savedPercent(1000, 1200)).toBe(-20);
    expect(savedPercent(0, 10)).toBe(0);
  });
  it('replaces the extension', () => {
    expect(outputName('IMG 001.final.PNG', 'webp')).toBe('IMG 001.final-compressed.webp');
    expect(outputName('photo', 'jpeg')).toBe('photo-compressed.jpg');
  });
});
