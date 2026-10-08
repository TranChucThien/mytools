export const MAX_TEXT_LENGTH = 2000;
export const MIN_SIZE = 128;
export const MAX_SIZE = 1024;
export const DEFAULT_SIZE = 256;

export type QrInputResult = { ok: true } | { ok: false; error: 'empty' | 'tooLong' };

export function validateQrInput(text: string): QrInputResult {
  if (text.trim() === '') return { ok: false, error: 'empty' };
  if (text.length > MAX_TEXT_LENGTH) return { ok: false, error: 'tooLong' };
  return { ok: true };
}

export function clampSize(n: number): number {
  if (!Number.isFinite(n)) return DEFAULT_SIZE;
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(n)));
}
