import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'case-converter',
  category: 'text',
  icon: 'letter-case',
  component: 'case-converter',
  slug: { vi: 'chuyen-chu-hoa-thuong', en: 'case-converter' },
  title: {
    vi: 'Chuyển chữ hoa thành chữ thường online và ngược lại',
    en: 'Case Converter - Uppercase, Lowercase, Title Case Online',
  },
  description: {
    vi: 'Chuyển chữ hoa, chữ thường online miễn phí: CHỮ HOA, chữ thường, viết hoa đầu câu, Viết Hoa Mỗi Từ, đảo chữ. Hỗ trợ đầy đủ tiếng Việt có dấu.',
    en: 'Free online case converter: switch text to UPPERCASE, lowercase, Sentence case, Title Case or tOGGLE cASE instantly. Works with accented letters too.',
  },
  h1: { vi: 'Chuyển chữ hoa, chữ thường', en: 'Case Converter' },
  name: { vi: 'Chuyển chữ hoa thường', en: 'Case Converter' },
  intro: {
    vi: 'Sửa nhanh văn bản lỡ gõ Caps Lock, viết hoa họ tên hay tiêu đề chỉ với một lần bấm.',
    en: 'Fix text typed with Caps Lock on, or format names and headings, with a single click.',
  },
  related: ['word-counter', 'remove-diacritics', 'slug'],
};
