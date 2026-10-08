import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'savings-interest',
  category: 'calculator',
  icon: 'pig-money',
  component: 'savings-interest',
  slug: { vi: 'tinh-lai-tiet-kiem', en: 'savings-interest-calculator' },
  title: {
    vi: 'Tính lãi tiết kiệm online - Lãi gửi ngân hàng theo kỳ hạn',
    en: 'Savings Interest Calculator - Simple and Compound',
  },
  description: {
    vi: 'Tính lãi tiết kiệm ngân hàng online miễn phí: nhập số tiền gửi, lãi suất, kỳ hạn để biết tiền lãi và tổng nhận cuối kỳ, theo lãi cuối kỳ hoặc lãi nhập gốc hàng tháng.',
    en: 'Free savings interest calculator: enter deposit, annual rate and term to see interest earned and total at maturity, with simple or monthly compound interest.',
  },
  h1: { vi: 'Tính lãi tiết kiệm', en: 'Savings Interest Calculator' },
  name: { vi: 'Tính lãi tiết kiệm', en: 'Savings Interest' },
  intro: {
    vi: 'Biết trước số tiền lãi và tổng nhận được khi gửi tiết kiệm có kỳ hạn.',
    en: 'See how much interest a fixed-term deposit earns and what you get back at the end.',
  },
  related: ['loan', 'percentage', 'number-to-words'],
};
