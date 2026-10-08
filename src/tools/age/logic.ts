export interface Ymd {
  y: number;
  /** 1–12 */
  m: number;
  d: number;
}

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

function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

function toTime({ y, m, d }: Ymd): number {
  return Date.UTC(y, m - 1, d);
}

/** Parse the value of an <input type="date"> ("YYYY-MM-DD"). */
export function parseIsoDate(s: string): Ymd | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!match) return null;
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
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
