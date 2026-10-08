export const S = {
  vi: {
    input: 'Số cần đọc',
    currency: 'Thêm "đồng"',
    capitalize: 'Viết hoa chữ cái đầu',
    output: 'Bằng chữ',
    errRange: 'Chỉ đọc số nguyên, tối đa 999.999.999.999.999.',
    example: '1.250.000',
  },
  en: {
    input: 'Number',
    currency: '',
    capitalize: 'Capitalize first letter',
    output: 'In words',
    errRange: 'Whole numbers only, up to 999,999,999,999,999.',
    example: '1,250,000',
  },
};
export type NumberWordsStrings = (typeof S)['vi'];
