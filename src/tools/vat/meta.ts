import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'vat',
  category: 'calculator',
  icon: 'receipt-tax',
  component: 'vat',
  slug: { vi: 'tinh-vat', en: 'vat-calculator' },
  title: {
    vi: 'Tính VAT online - Cộng và tách thuế GTGT 8%, 10%',
    en: 'VAT Calculator - Add or Remove VAT Online',
  },
  description: {
    vi: 'Tính thuế VAT (GTGT) online miễn phí: cộng VAT vào giá chưa thuế hoặc tách VAT ra khỏi giá đã có thuế, với thuế suất 5%, 8%, 10% hoặc tùy chọn.',
    en: 'Free VAT calculator: add VAT to a net price or remove VAT from a gross price at any rate. Instantly see the tax amount, net and gross prices.',
  },
  h1: { vi: 'Tính VAT', en: 'VAT Calculator' },
  name: { vi: 'Tính VAT', en: 'VAT Calculator' },
  intro: {
    vi: 'Cộng thuế GTGT vào giá chưa thuế hoặc tách thuế ra khỏi giá đã có thuế, kết quả hiện ngay.',
    en: 'Add VAT to a net price or take it out of a gross price, with the tax amount shown instantly.',
  },
  related: ['discount', 'percentage'],
};
