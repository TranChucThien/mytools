/**
 * Calendar dates and clock times as typed and shown on the site.
 * VI pages read and print dates as dd/mm/yyyy, EN pages as mm/dd/yyyy; times are 24-hour HH:mm.
 * All arithmetic uses UTC on wall-clock values (Vietnam has no daylight saving time).
 */
import type { Lang } from './types';

export interface Ymd {
  y: number;
  /** 1–12 */
  m: number;
  d: number;
}

export interface Hms {
  h: number;
  mi: number;
  s: number;
}

export const DATE_PLACEHOLDER: Record<Lang, string> = { vi: 'dd/mm/yyyy', en: 'mm/dd/yyyy' };
export const TIME_PLACEHOLDER = 'HH:mm';

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

export function isValidYmd({ y, m, d }: Ymd): boolean {
  return [y, m, d].every(Number.isInteger) && y >= 1 && y <= 9999 && m >= 1 && m <= 12 && d >= 1 && d <= daysInMonth(y, m);
}

const pad = (n: number, w = 2) => String(n).padStart(w, '0');

/** Parse "YYYY-MM-DD" (the value of a native date input). */
export function parseIsoDate(s: string): Ymd | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!match) return null;
  const date = { y: Number(match[1]), m: Number(match[2]), d: Number(match[3]) };
  return isValidYmd(date) ? date : null;
}

export function toIsoDate({ y, m, d }: Ymd): string {
  return `${pad(y, 4)}-${pad(m)}-${pad(d)}`;
}

/**
 * Parse a typed date: VI "9/10/2026", "09-10-2026", "09.10.2026" or "09102026" (day first);
 * EN the same shapes with the month first. The year must have four digits.
 */
export function parseDateText(input: string, lang: Lang): Ymd | null {
  const s = input.trim();
  const parts = /^(\d{8})$/.test(s)
    ? [s.slice(0, 2), s.slice(2, 4), s.slice(4)]
    : /^(\d{1,2})\s*[/.\-]\s*(\d{1,2})\s*[/.\-]\s*(\d{4})$/.exec(s)?.slice(1);
  if (!parts) return null;
  const [a, b, y] = parts.map(Number) as [number, number, number];
  const date = lang === 'vi' ? { y, m: b, d: a } : { y, m: a, d: b };
  return isValidYmd(date) ? date : null;
}

/** "09/10/2026" on VI pages, "10/09/2026" on EN pages. */
export function formatDate(date: Ymd, lang: Lang): string {
  const { y, m, d } = date;
  return lang === 'vi' ? `${pad(d)}/${pad(m)}/${pad(y, 4)}` : `${pad(m)}/${pad(d)}/${pad(y, 4)}`;
}

const WEEKDAYS: Record<Lang, string[]> = {
  vi: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

/** 0 = Sunday … 6 = Saturday */
export function weekday({ y, m, d }: Ymd): number {
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function weekdayName(date: Ymd, lang: Lang): string {
  return WEEKDAYS[lang][weekday(date)]!;
}

/** "Thứ sáu, 09/10/2026" or "Friday, 10/09/2026". */
export function formatDateWithWeekday(date: Ymd, lang: Lang): string {
  return `${weekdayName(date, lang)}, ${formatDate(date, lang)}`;
}

/**
 * Parse an optional 24-hour time: "7", "07:30", "7h30", "0730", "7:30:15".
 * Returns undefined for an empty field (time not given) and null for malformed input.
 */
export function parseTimeText(input: string): Hms | null | undefined {
  const s = input.trim().toLowerCase();
  if (s === '') return undefined;
  const match = /^(\d{1,2})(?:\s*[:h.]\s*(\d{1,2})?(?:\s*[:m.]\s*(\d{1,2}))?)?\s*(?:s|p|ph|phút)?$/.exec(s) ?? /^(\d{2})(\d{2})$/.exec(s);
  if (!match) return null;
  const [h, mi, sec] = [Number(match[1]), Number(match[2] ?? 0), Number(match[3] ?? 0)];
  if (h > 23 || mi > 59 || sec > 59) return null;
  return { h, mi, s: sec };
}

export function formatTime({ h, mi, s }: Hms, withSeconds = false): string {
  return withSeconds ? `${pad(h)}:${pad(mi)}:${pad(s)}` : `${pad(h)}:${pad(mi)}`;
}

/** Milliseconds for a wall-clock date and time, on a UTC timeline. */
export function wallTime(date: Ymd, time: Hms = { h: 0, mi: 0, s: 0 }): number {
  return Date.UTC(date.y, date.m - 1, date.d, time.h, time.mi, time.s);
}

/** Wall-clock date and time of a JS Date in the visitor's own time zone. */
export function localNow(now: Date = new Date()): { date: Ymd; time: Hms } {
  return {
    date: { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() },
    time: { h: now.getHours(), mi: now.getMinutes(), s: now.getSeconds() },
  };
}

export function addDays(date: Ymd, days: number): Ymd {
  const t = new Date(Date.UTC(date.y, date.m - 1, date.d + days));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

/** Split a duration in seconds into whole days, hours, minutes and seconds. */
export function splitSeconds(total: number): { days: number; hours: number; minutes: number; seconds: number } {
  const t = Math.max(0, Math.floor(total));
  return { days: Math.floor(t / 86_400), hours: Math.floor(t / 3600) % 24, minutes: Math.floor(t / 60) % 60, seconds: t % 60 };
}

/** While typing digits, add the separators: "09" → "09/", "09/10" → "09/10/". */
export function maskDateTyping(value: string): string {
  return /^\d{2}$|^\d{2}\/\d{2}$/.test(value) ? `${value}/` : value;
}

/** While typing digits, add the colon: "07" → "07:". */
export function maskTimeTyping(value: string): string {
  return /^\d{2}$/.test(value) && Number(value) <= 23 ? `${value}:` : value;
}
