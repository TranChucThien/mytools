import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'salary',
  category: 'calculator',
  icon: 'cash',
  component: 'salary',
  slug: { vi: 'tinh-luong-gross-net', en: 'vietnam-gross-to-net-salary' },
  title: {
    vi: 'Tính lương Gross sang Net 2026 - Thuế TNCN, BHXH mới nhất',
    en: 'Vietnam Gross to Net Salary Calculator 2026',
  },
  description: {
    vi: 'Tính lương Gross sang Net và Net sang Gross 2026: BHXH, BHYT, BHTN, thuế TNCN theo biểu 5 bậc mới, giảm trừ gia cảnh 15,5 triệu và 6,2 triệu mỗi người phụ thuộc.',
    en: 'Vietnam salary calculator for 2026: convert gross to net or net to gross with social insurance, health and unemployment insurance and the new 5-bracket income tax.',
  },
  h1: { vi: 'Tính lương Gross sang Net', en: 'Vietnam Gross to Net Salary' },
  name: { vi: 'Lương Gross sang Net', en: 'Gross to Net Salary' },
  intro: {
    vi: 'Quy đổi lương Gross và Net theo quy định bảo hiểm, thuế TNCN áp dụng năm 2026, kèm chi tiết từng khoản trừ.',
    en: 'Convert between gross and net pay under Vietnam’s 2026 insurance and personal income tax rules, with every deduction itemised.',
  },
  related: ['loan', 'savings-interest', 'percentage'],
};
