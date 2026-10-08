export type BmiStandard = 'who' | 'asian';
export type BmiClass = 'under' | 'normal' | 'over' | 'obese';

/** Upper bounds (exclusive) for under / normal / over; above that is obese. */
const CUTOFFS: Record<BmiStandard, [number, number, number]> = {
  who: [18.5, 25, 30],
  asian: [18.5, 23, 25],
};
/** Upper end of the "normal" band as published (used for the healthy-weight range). */
const NORMAL_MAX: Record<BmiStandard, number> = { who: 24.9, asian: 22.9 };

export function bmi(weightKg: number, heightCm: number): number | null {
  if (!(weightKg > 0) || !(heightCm > 0)) return null;
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function classify(value: number, standard: BmiStandard): BmiClass {
  const [under, normal, over] = CUTOFFS[standard];
  if (value < under) return 'under';
  if (value < normal) return 'normal';
  if (value < over) return 'over';
  return 'obese';
}

/** Healthy weight range in kg for a height, rounded to 0.1 kg. */
export function healthyRange(heightCm: number, standard: BmiStandard): [number, number] {
  const m2 = (heightCm / 100) ** 2;
  const r = (n: number) => Math.round(n * 10) / 10;
  return [r(18.5 * m2), r(NORMAL_MAX[standard] * m2)];
}
