import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'number-to-words',
  category: 'text',
  icon: 'numbers',
  component: 'number-to-words',
  slug: { vi: 'doc-so-thanh-chu', en: 'number-to-words' },
  title: {
    vi: 'Đọc số thành chữ online - Đổi số tiền ra chữ ghi hóa đơn',
    en: 'Number to Words Converter - Spell Out Numbers Online',
  },
  description: {
    vi: 'Đọc số thành chữ tiếng Việt online miễn phí: đổi số tiền ra chữ để ghi hóa đơn, ủy nhiệm chi, hợp đồng. Đọc đúng mốt, tư, lăm, linh, hỗ trợ tới hàng nghìn tỷ.',
    en: 'Free number to words converter: spell out any whole number in English words for checks, contracts and invoices, up to the trillions.',
  },
  h1: { vi: 'Đọc số thành chữ', en: 'Number to Words' },
  name: { vi: 'Đọc số thành chữ', en: 'Number to Words' },
  intro: {
    vi: 'Nhập số tiền, nhận ngay dòng chữ chuẩn để ghi vào hóa đơn, chứng từ.',
    en: 'Type a number and get it spelled out in words, ready to copy.',
  },
  related: ['vat', 'percentage', 'loan'],
};
