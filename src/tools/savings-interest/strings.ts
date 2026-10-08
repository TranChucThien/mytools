export const S = {
  vi: {
    amount: 'Số tiền gửi',
    rate: 'Lãi suất (%/năm)',
    term: 'Kỳ hạn (tháng)',
    method: 'Cách tính lãi',
    simple: 'Lãi cuối kỳ',
    monthly: 'Lãi nhập gốc hàng tháng',
    interest: 'Tiền lãi',
    total: 'Tổng nhận cuối kỳ',
    errTerm: 'Kỳ hạn phải là số tháng nguyên từ 1 đến 600.',
    example: { amount: '100.000.000', rate: '6' },
  },
  en: {
    amount: 'Deposit amount',
    rate: 'Interest rate (% per year)',
    term: 'Term (months)',
    method: 'Interest method',
    simple: 'Simple interest',
    monthly: 'Compounded monthly',
    interest: 'Interest earned',
    total: 'Total at maturity',
    errTerm: 'The term must be a whole number of months from 1 to 600.',
    example: { amount: '10,000', rate: '5' },
  },
};
export type SavingsStrings = (typeof S)['vi'];
