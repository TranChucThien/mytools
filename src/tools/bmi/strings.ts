export const S = {
  vi: {
    weight: 'Cân nặng (kg)',
    height: 'Chiều cao (cm)',
    standard: 'Chuẩn phân loại',
    asian: 'Châu Á',
    who: 'WHO quốc tế',
    classes: { under: 'Thiếu cân', normal: 'Bình thường', over: 'Thừa cân', obese: 'Béo phì' },
    range: 'Cân nặng hợp lý',
    errInput: 'Nhập cân nặng và chiều cao lớn hơn 0.',
    defaultStandard: 'asian',
  },
  en: {
    weight: 'Weight (kg)',
    height: 'Height (cm)',
    standard: 'Classification',
    asian: 'Asian',
    who: 'WHO international',
    classes: { under: 'Underweight', normal: 'Normal weight', over: 'Overweight', obese: 'Obese' },
    range: 'Healthy weight',
    errInput: 'Enter a weight and height greater than 0.',
    defaultStandard: 'who',
  },
};
export type BmiStrings = (typeof S)['vi'];
