export interface DiscountResult {
  final: number;
  saved: number;
  totalPercent: number;
}

const clean = (n: number) => Number(n.toPrecision(12));
const validPct = (p: number) => p >= 0 && p <= 100;

/** Price after `percent` off, then `extraPercent` off the reduced price. Null on invalid input. */
export function applyDiscount(price: number, percent: number, extraPercent = 0): DiscountResult | null {
  if (price < 0 || !validPct(percent) || !validPct(extraPercent)) return null;
  const keep = (1 - percent / 100) * (1 - extraPercent / 100);
  const final = clean(price * keep);
  return { final, saved: clean(price - final), totalPercent: clean((1 - keep) * 100) };
}
