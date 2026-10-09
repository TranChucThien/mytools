import { SALARY_RULES as R, type Region } from './rules';

export interface SalaryInput {
  gross: number;
  dependents: number;
  region: Region;
  /** Salary used for insurance contributions; defaults to gross. */
  insuranceSalary?: number;
}

export interface BracketTax {
  from: number;
  to: number;
  rate: number;
  tax: number;
}

export interface SalaryResult {
  gross: number;
  bhxh: number;
  bhyt: number;
  bhtn: number;
  insurance: number;
  deductions: number;
  taxable: number;
  tax: number;
  byBracket: BracketTax[];
  net: number;
}

const round = (n: number) => Math.round(n);

export function progressiveTax(taxable: number): { total: number; byBracket: BracketTax[] } {
  let from = 0;
  const byBracket = R.brackets.map(({ upTo, rate }) => {
    const portion = Math.max(0, Math.min(taxable, upTo) - from);
    const row = { from, to: upTo, rate, tax: round(portion * rate) };
    from = upTo;
    return row;
  });
  return { total: byBracket.reduce((s, b) => s + b.tax, 0), byBracket };
}

export function grossToNet({ gross, dependents, region, insuranceSalary }: SalaryInput): SalaryResult {
  const base = insuranceSalary ?? gross;
  const socialBase = Math.min(base, R.baseSalary * R.capMultiplier);
  const unemploymentBase = Math.min(base, R.regionalMinimum[region] * R.capMultiplier);
  const bhxh = round(socialBase * R.rates.bhxh);
  const bhyt = round(socialBase * R.rates.bhyt);
  const bhtn = round(unemploymentBase * R.rates.bhtn);
  const insurance = bhxh + bhyt + bhtn;
  const deductions = R.personalDeduction + R.dependentDeduction * dependents;
  const taxable = Math.max(0, gross - insurance - deductions);
  const { total: tax, byBracket } = progressiveTax(taxable);
  return { gross, bhxh, bhyt, bhtn, insurance, deductions, taxable, tax, byBracket, net: gross - insurance - tax };
}

/** Smallest gross (whole đồng) whose net reaches `net`; net is non-decreasing in gross. */
export function netToGross({ net, ...rest }: Omit<SalaryInput, 'gross'> & { net: number }): SalaryResult {
  let lo = Math.max(0, Math.floor(net));
  let hi = Math.max(lo, Math.ceil(net * 2) + 1);
  while (grossToNet({ gross: hi, ...rest }).net < net) hi *= 2;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (grossToNet({ gross: mid, ...rest }).net < net) lo = mid + 1;
    else hi = mid;
  }
  return grossToNet({ gross: lo, ...rest });
}
