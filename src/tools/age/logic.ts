import { addDays, daysInMonth, type Hms, type Ymd } from '../../lib/date';

export { parseIsoDate, type Ymd } from '../../lib/date';

export interface Age {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  nextBirthday: Ymd;
  daysToBirthday: number;
}

const DAY = 86_400_000;

function toTime({ y, m, d }: Ymd): number {
  return Date.UTC(y, m - 1, d);
}

/** Add whole months, clamping the day to the target month's length (31 Jan + 1 month = 28/29 Feb). */
function addMonths(date: Ymd, months: number): Ymd {
  const index = date.y * 12 + (date.m - 1) + months;
  const y = Math.floor(index / 12);
  const m = (index % 12) + 1;
  return { y, m, d: Math.min(date.d, daysInMonth(y, m)) };
}

function birthdayIn(birth: Ymd, y: number): Ymd {
  return { y, m: birth.m, d: Math.min(birth.d, daysInMonth(y, birth.m)) };
}

export function ageBetween(birth: Ymd, ref: Ymd): Age | null {
  const tBirth = toTime(birth);
  const tRef = toTime(ref);
  if (tRef < tBirth) return null;

  let total = (ref.y - birth.y) * 12 + (ref.m - birth.m);
  if (toTime(addMonths(birth, total)) > tRef) total--;
  const anchor = addMonths(birth, total);

  let next = birthdayIn(birth, ref.y);
  if (toTime(next) < tRef) next = birthdayIn(birth, ref.y + 1);

  return {
    years: Math.floor(total / 12),
    months: total % 12,
    days: Math.round((tRef - toTime(anchor)) / DAY),
    totalDays: Math.round((tRef - tBirth) / DAY),
    weekday: new Date(tBirth).getUTCDay(),
    nextBirthday: next,
    daysToBirthday: Math.round((toTime(next) - tRef) / DAY),
  };
}

export interface Span {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

const secondsOfDay = ({ h, mi, s }: Hms) => h * 3600 + mi * 60 + s;

/** Calendar span between two wall-clock moments, down to the second; null if `end` is before `start`. */
export function spanBetween(start: Ymd, startTime: Hms, end: Ymd, endTime: Hms): Span | null {
  const totalMs = Date.UTC(end.y, end.m - 1, end.d, endTime.h, endTime.mi, endTime.s) - Date.UTC(start.y, start.m - 1, start.d, startTime.h, startTime.mi, startTime.s);
  if (totalMs < 0) return null;
  let clock = secondsOfDay(endTime) - secondsOfDay(startTime);
  let endDate = end;
  if (clock < 0) {
    clock += 86_400;
    endDate = addDays(end, -1);
  }
  const calendar = ageBetween(start, endDate)!;
  return {
    years: calendar.years,
    months: calendar.months,
    days: calendar.days,
    hours: Math.floor(clock / 3600),
    minutes: Math.floor(clock / 60) % 60,
    seconds: clock % 60,
    totalSeconds: totalMs / 1000,
  };
}
