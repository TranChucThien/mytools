/**
 * Vietnamese payroll rules used by the salary calculator.
 * Update this file when the law changes; every value notes its legal basis.
 * Checked against published legal sources on 2026-10-08.
 */
export const SALARY_RULES = {
  asOf: '2026-10-08',
  /** Employee contribution rates. */
  rates: { bhxh: 0.08, bhyt: 0.015, bhtn: 0.01 },
  /** Lương cơ sở / mức tham chiếu from 01/7/2026 (Nghị định 161/2026/NĐ-CP). BHXH & BHYT cap = 20 ×. */
  baseSalary: 2_530_000,
  capMultiplier: 20,
  /** Lương tối thiểu vùng from 01/01/2026 (Nghị định 293/2025/NĐ-CP). BHTN cap = 20 ×. */
  regionalMinimum: { 1: 5_310_000, 2: 4_730_000, 3: 4_140_000, 4: 3_700_000 } as Record<Region, number>,
  /** Giảm trừ gia cảnh from tax period 2026 (Nghị quyết 110/2025/UBTVQH15). */
  personalDeduction: 15_500_000,
  dependentDeduction: 6_200_000,
  /**
   * Monthly progressive PIT for residents' salary, Luật Thuế TNCN số 109/2025/QH15
   * (salary provisions apply from tax period 2026). `upTo` = upper bound of each bracket.
   */
  brackets: [
    { upTo: 10_000_000, rate: 0.05 },
    { upTo: 30_000_000, rate: 0.1 },
    { upTo: 60_000_000, rate: 0.2 },
    { upTo: 100_000_000, rate: 0.3 },
    { upTo: Infinity, rate: 0.35 },
  ],
} as const;

export type Region = 1 | 2 | 3 | 4;
