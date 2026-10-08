import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'word-counter',
  category: 'text',
  icon: 'text-size',
  component: 'word-counter',
  slug: { vi: 'dem-tu', en: 'word-counter' },
  title: {
    vi: 'Đếm từ, đếm ký tự online - Công cụ đếm chữ miễn phí',
    en: 'Word Counter - Count Words and Characters Online',
  },
  description: {
    vi: 'Đếm từ và ký tự online miễn phí: số từ (tiếng), ký tự có và không có khoảng trắng, số câu, số đoạn và thời gian đọc. Dán văn bản là ra kết quả ngay.',
    en: 'Free online word counter: count words, characters with and without spaces, sentences, paragraphs and reading time. Paste your text and see results instantly.',
  },
  h1: { vi: 'Đếm từ, đếm ký tự', en: 'Word Counter' },
  name: { vi: 'Đếm từ', en: 'Word Counter' },
  intro: {
    vi: 'Dán hoặc gõ văn bản để đếm số từ, số ký tự, số câu và ước tính thời gian đọc.',
    en: 'Paste or type your text to count words, characters and sentences and estimate reading time.',
  },
  related: ['case-converter', 'remove-diacritics', 'slug'],
};
