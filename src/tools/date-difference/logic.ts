import { ageBetween, type Ymd } from '../age/logic';

export interface DateDifference {
  days: number;
  weeks: number;
  extraDays: number;
  months: number;
  monthDays: number;
  /** Monday to Friday in the counted range (public holidays not excluded). */
  weekdays: number;
}

const DAY = 86_400_000;
const time = (d: Ymd) => Date.UTC(d.y, d.m - 1, d.d);

/** Days between two dates, order-independent. The start day counts; the end day only if `includeEnd`. */
export function dateDifference(a: Ymd, b: Ymd, includeEnd: boolean): DateDifference {
  const [start, end] = time(a) <= time(b) ? [a, b] : [b, a];
  const days = Math.round((time(end) - time(start)) / DAY) + (includeEnd ? 1 : 0);
  const span = ageBetween(start, end)!;
  let months = span.years * 12 + span.months;
  let monthDays = span.days + (includeEnd ? 1 : 0);

  let weekdays = Math.floor(days / 7) * 5;
  const startDow = new Date(time(start)).getUTCDay();
  for (let k = 0; k < days % 7; k++) {
    const dow = (startDow + k) % 7;
    if (dow !== 0 && dow !== 6) weekdays++;
  }
  if (monthDays < 0) monthDays = 0;
  months = Math.max(0, months);
  return { days, weeks: Math.floor(days / 7), extraDays: days % 7, months, monthDays, weekdays };
}
