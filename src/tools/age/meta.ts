import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'age',
  category: 'calculator',
  icon: 'cake',
  component: 'age',
  slug: { vi: 'tinh-tuoi', en: 'age-calculator' },
  title: {
    vi: 'Tính tuổi online - Số năm, tháng, ngày tuổi chính xác',
    en: 'Age Calculator - Calculate Your Exact Age Online',
  },
  description: {
    vi: 'Tính tuổi online miễn phí từ ngày sinh: số năm, tháng, ngày tuổi chính xác, tổng số ngày đã sống, còn bao lâu đến sinh nhật và bạn sinh vào thứ mấy.',
    en: 'Free online age calculator: exact age in years, months and days, total days lived, days until your next birthday and the weekday you were born.',
  },
  h1: { vi: 'Tính tuổi', en: 'Age Calculator' },
  name: { vi: 'Tính tuổi', en: 'Age Calculator' },
  intro: {
    vi: 'Nhập ngày sinh để biết chính xác bạn bao nhiêu tuổi, đã sống bao nhiêu ngày và còn bao lâu nữa đến sinh nhật.',
    en: 'Enter a date of birth to see the exact age, the number of days lived and how long until the next birthday.',
  },
  related: ['bmi', 'discount', 'percentage'],
};
