/** Browser wiring for DateField, TimeField and Ticker. */
import {
  formatDate,
  maskDateTyping,
  maskTimeTyping,
  parseDateText,
  parseIsoDate,
  splitSeconds,
  toIsoDate,
  type Ymd,
} from './date';
import type { Lang } from './types';

const isInsert = (e: Event) => (e as InputEvent).inputType?.startsWith('insert') ?? false;

/** Wire every DateField and TimeField inside `root`: typing masks and the calendar button. */
export function setupDateFields(root: ParentNode, lang: Lang): void {
  for (const box of root.querySelectorAll<HTMLElement>('[data-datefield]')) {
    const text = box.querySelector<HTMLInputElement>('[data-date-text]')!;
    const native = box.querySelector<HTMLInputElement>('[data-date-native]')!;
    text.addEventListener('input', (e) => {
      if (isInsert(e)) text.value = maskDateTyping(text.value);
    });
    native.addEventListener('change', () => {
      const date = parseIsoDate(native.value);
      if (!date) return;
      text.value = formatDate(date, lang);
      text.dispatchEvent(new Event('input', { bubbles: true }));
    });
    box.querySelector('[data-date-pick]')!.addEventListener('click', () => {
      const current = parseDateText(text.value, lang);
      native.value = current ? toIsoDate(current) : '';
      try {
        native.showPicker();
      } catch {
        text.focus();
      }
    });
  }
  for (const input of root.querySelectorAll<HTMLInputElement>('[data-time-text]')) {
    input.addEventListener('input', (e) => {
      if (isInsert(e)) input.value = maskTimeTyping(input.value);
    });
  }
}

export function readDate(input: HTMLInputElement, lang: Lang): Ymd | null {
  return parseDateText(input.value, lang);
}

export function writeDate(input: HTMLInputElement, date: Ymd, lang: Lang): void {
  input.value = formatDate(date, lang);
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Show a day/hour/minute/second counter, or hide it when `seconds` is null. */
export function renderTicker(el: HTMLElement, seconds: number | null, label = '', foot = '', lang: Lang = 'vi'): void {
  el.hidden = seconds === null;
  if (seconds === null) return;
  const parts = splitSeconds(seconds);
  el.querySelector('[data-ticker-label]')!.textContent = label;
  el.querySelector('[data-ticker-foot]')!.textContent = foot;
  for (const cell of el.querySelectorAll<HTMLElement>('[data-tick]')) {
    const key = cell.dataset.tick as keyof typeof parts;
    cell.textContent = key === 'days' ? new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(parts.days) : pad(parts[key]);
  }
}

/** Returns a switch that starts or stops calling `tick` once a second. */
export function everySecond(tick: () => void): (on: boolean) => void {
  let timer: ReturnType<typeof setInterval> | undefined;
  return (on) => {
    if (on && timer === undefined) timer = setInterval(tick, 1000);
    if (!on && timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}
