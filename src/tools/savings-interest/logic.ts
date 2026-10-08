export type SavingsMethod = 'simple' | 'monthly';
export interface SavingsResult {
  interest: number;
  total: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Interest on a deposit: simple (paid at maturity) or compounded monthly. */
export function savings(principal: number, ratePerYear: number, months: number, method: SavingsMethod): SavingsResult | null {
  if (!(principal >= 0) || !(ratePerYear >= 0) || !Number.isInteger(months) || months < 1 || months > 600) return null;
  const r = ratePerYear / 100;
  const total = method === 'simple' ? principal * (1 + (r * months) / 12) : principal * (1 + r / 12) ** months;
  return { interest: round2(total - principal), total: round2(total) };
}
