export type LoanMethod = 'declining' | 'annuity' | 'flat';
export interface LoanRow {
  period: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}
export interface LoanResult {
  rows: LoanRow[];
  totalInterest: number;
  totalPayment: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Monthly repayment schedule. Amounts rounded to 0.01; the last row absorbs rounding so the balance ends at 0. */
export function loanSchedule(principal: number, ratePerYear: number, months: number, method: LoanMethod): LoanResult | null {
  if (!(principal > 0) || !(ratePerYear >= 0) || !Number.isInteger(months) || months < 1 || months > 600) return null;
  const i = ratePerYear / 100 / 12;
  const annuity = i === 0 ? principal / months : (principal * i) / (1 - (1 + i) ** -months);
  const rows: LoanRow[] = [];
  let balance = principal;
  for (let k = 1; k <= months; k++) {
    let interest: number;
    let principalPart: number;
    if (method === 'declining') {
      interest = balance * i;
      principalPart = principal / months;
    } else if (method === 'annuity') {
      interest = balance * i;
      principalPart = annuity - interest;
    } else {
      interest = principal * i;
      principalPart = principal / months;
    }
    if (k === months) principalPart = balance;
    interest = round2(interest);
    principalPart = round2(principalPart);
    balance = round2(balance - principalPart);
    rows.push({ period: k, principal: principalPart, interest, payment: round2(principalPart + interest), balance: Math.max(0, balance) });
  }
  const totalInterest = round2(rows.reduce((s, r) => s + r.interest, 0));
  return { rows, totalInterest, totalPayment: round2(principal + totalInterest) };
}
