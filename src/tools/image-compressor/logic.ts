export type ImageFormat = 'jpeg' | 'webp' | 'png';

/** Target size: scale down to `maxWidth` keeping aspect ratio; never upscale. */
export function fitSize(width: number, height: number, maxWidth?: number): { width: number; height: number } {
  if (!maxWidth || maxWidth <= 0 || width <= maxWidth) return { width, height };
  return { width: maxWidth, height: Math.max(1, Math.floor((height * maxWidth) / width)) };
}

export function savedPercent(before: number, after: number): number {
  return before > 0 ? Math.round((1 - after / before) * 100) : 0;
}

export function outputName(name: string, format: ImageFormat): string {
  const base = name.replace(/\.[^.]+$/, '');
  return `${base}-compressed.${format === 'jpeg' ? 'jpg' : format}`;
}
