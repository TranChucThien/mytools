import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'discount',
  category: 'calculator',
  icon: 'discount',
  component: 'discount',
  slug: { vi: 'tinh-giam-gia', en: 'discount-calculator' },
  title: {
    vi: 'Tính giảm giá online - Tính giá sau khi giảm %',
    en: 'Discount Calculator - Sale Price and Savings Online',
  },
  description: {
    vi: 'Tính giảm giá online miễn phí: nhập giá gốc và % giảm để biết giá sau giảm, số tiền tiết kiệm. Hỗ trợ giảm chồng nhiều lần như 30% rồi giảm thêm 20%.',
    en: 'Free discount calculator: enter the original price and percent off to get the sale price and how much you save. Supports stacked discounts like 30% plus an extra 20%.',
  },
  h1: { vi: 'Tính giảm giá', en: 'Discount Calculator' },
  name: { vi: 'Tính giảm giá', en: 'Discount Calculator' },
  intro: {
    vi: 'Biết ngay giá phải trả và số tiền tiết kiệm khi mua hàng giảm giá, kể cả khi được giảm thêm lần nữa.',
    en: 'See the price you pay and how much you save on any sale, including an extra discount on top.',
  },
  related: ['percentage', 'vat', 'age'],
};
