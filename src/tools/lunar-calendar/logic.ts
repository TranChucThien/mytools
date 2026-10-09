/**
 * Vietnamese lunisolar calendar (UTC+7), after Hồ Ngọc Đức's published algorithm
 * (astronomical new moons and solar longitude, Jean Meeus). Valid roughly 1900–2100.
 */
import type { Ymd } from '../age/logic';

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  leap: boolean;
}

const TZ = 7;
const PI = Math.PI;
const SYNODIC = 29.530588853;
const EPOCH = 2415021.076998695;

export function jdFromDate({ y, m, d }: Ymd): number {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  let jd = d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  if (jd < 2299161) jd = d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - 32083;
  return jd;
}

export function jdToDate(jd: number): Ymd {
  let b: number;
  let c: number;
  if (jd > 2299160) {
    const a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    d: e - Math.floor((153 * m + 2) / 5) + 1,
    m: m + 3 - 12 * Math.floor(m / 10),
    y: b * 100 + d - 4800 + Math.floor(m / 10),
  };
}

/** Julian day of the k-th new moon after 1900-01-01. */
function newMoon(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let c1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  c1 = c1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  c1 = c1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  c1 = c1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  c1 = c1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  c1 = c1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  c1 = c1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltaT =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return jd1 + c1 - deltaT;
}

/** Sun's apparent longitude in radians at Julian day `jdn`. */
function sunLongitude(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - PI * 2 * Math.floor(L / (PI * 2));
  return L;
}

const newMoonDay = (k: number) => Math.floor(newMoon(k) + 0.5 + TZ / 24);
/** Solar-term sector 0–11 at local midnight of `dayNumber`. */
const sunSector = (dayNumber: number) => Math.floor((sunLongitude(dayNumber - 0.5 - TZ / 24) / PI) * 6);

/** Start of lunar month 11 (the month containing the winter solstice) for solar year `y`. */
function lunarMonth11(y: number): number {
  const off = jdFromDate({ y, m: 12, d: 31 }) - 2415021;
  const k = Math.floor(off / SYNODIC);
  const nm = newMoonDay(k);
  return sunSector(nm) >= 9 ? newMoonDay(k - 1) : nm;
}

/** Index (after month 11) of the first month without a major solar term: the leap month. */
function leapMonthOffset(a11: number): number {
  const k = Math.floor((a11 - EPOCH) / SYNODIC + 0.5);
  let i = 1;
  let arc = sunSector(newMoonDay(k + i));
  let last: number;
  do {
    last = arc;
    i++;
    arc = sunSector(newMoonDay(k + i));
  } while (arc !== last && i < 14);
  return i - 1;
}

export function solarToLunar(date: Ymd): LunarDate {
  const dayNumber = jdFromDate(date);
  const k = Math.floor((dayNumber - EPOCH) / SYNODIC);
  let monthStart = newMoonDay(k + 1);
  if (monthStart > dayNumber) monthStart = newMoonDay(k);
  let a11 = lunarMonth11(date.y);
  let b11 = a11;
  let year: number;
  if (a11 >= monthStart) {
    year = date.y;
    a11 = lunarMonth11(date.y - 1);
  } else {
    year = date.y + 1;
    b11 = lunarMonth11(date.y + 1);
  }
  const day = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let leap = false;
  let month = diff + 11;
  if (b11 - a11 > 365) {
    const leapDiff = leapMonthOffset(a11);
    if (diff >= leapDiff) {
      month = diff + 10;
      if (diff === leapDiff) leap = true;
    }
  }
  if (month > 12) month -= 12;
  if (month >= 11 && diff < 4) year -= 1;
  return { day, month, year, leap };
}

/** Julian day of day 1 of the given lunar month, or null if that (leap) month does not exist. */
function lunarMonthStart({ month, year, leap }: Omit<LunarDate, 'day'>): number | null {
  if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year)) return null;
  const [a11, b11] = month < 11 ? [lunarMonth11(year - 1), lunarMonth11(year)] : [lunarMonth11(year), lunarMonth11(year + 1)];
  const k = Math.floor(0.5 + (a11 - EPOCH) / SYNODIC);
  let off = month - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const leapOff = leapMonthOffset(a11);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (leap && month !== leapMonth) return null;
    if (leap || off >= leapOff) off += 1;
  } else if (leap) {
    return null;
  }
  return newMoonDay(k + off);
}

/** 29 or 30, or null if the month does not exist. */
export function lunarMonthLength(date: Omit<LunarDate, 'day'> & { day?: number }): number | null {
  const start = lunarMonthStart(date);
  if (start === null) return null;
  const k = Math.floor((start - EPOCH) / SYNODIC + 0.5);
  return newMoonDay(k + 1) - start;
}

export function lunarToSolar(date: LunarDate): Ymd | null {
  const start = lunarMonthStart(date);
  if (start === null || !Number.isInteger(date.day) || date.day < 1) return null;
  const length = lunarMonthLength(date)!;
  if (date.day > length) return null;
  return jdToDate(start + date.day - 1);
}

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export function canChiYear(lunarYear: number): string {
  return `${CAN[(lunarYear + 6) % 10]} ${CHI[(lunarYear + 8) % 12]}`;
}

export function canChiMonth(month: number, lunarYear: number): string {
  return `${CAN[(lunarYear * 12 + month + 3) % 10]} ${CHI[(month + 1) % 12]}`;
}

export function canChiDay(solar: Ymd): string {
  const jd = jdFromDate(solar);
  return `${CAN[(jd + 9) % 10]} ${CHI[(jd + 1) % 12]}`;
}
