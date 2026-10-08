import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'loan',
  category: 'calculator',
  icon: 'building-bank',
  component: 'loan',
  slug: { vi: 'tinh-lai-vay', en: 'loan-calculator' },
  title: {
    vi: 'Tính lãi vay ngân hàng online - Lịch trả nợ hàng tháng',
    en: 'Loan Calculator - Monthly Payment and Repayment Schedule',
  },
  description: {
    vi: 'Tính lãi vay online miễn phí theo dư nợ giảm dần, trả góp đều hoặc lãi phẳng: số tiền trả mỗi tháng, tổng tiền lãi và lịch trả nợ chi tiết từng kỳ.',
    en: 'Free loan calculator: monthly payment, total interest and a full repayment schedule for declining balance, fixed monthly payment or flat-rate loans.',
  },
  h1: { vi: 'Tính lãi vay', en: 'Loan Calculator' },
  name: { vi: 'Tính lãi vay', en: 'Loan Calculator' },
  intro: {
    vi: 'Xem trước mỗi tháng phải trả bao nhiêu và tổng tiền lãi trước khi ký hợp đồng vay.',
    en: 'See your monthly payment and the total interest before you sign a loan.',
  },
  related: ['savings-interest', 'percentage', 'number-to-words'],
};
