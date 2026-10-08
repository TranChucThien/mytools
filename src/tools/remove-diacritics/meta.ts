import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'remove-diacritics',
  category: 'text',
  icon: 'abc',
  component: 'remove-diacritics',
  slug: { vi: 'bo-dau-tieng-viet', en: 'remove-vietnamese-accents' },
  title: {
    vi: 'Bỏ dấu tiếng Việt online - Chuyển có dấu thành không dấu',
    en: 'Remove Vietnamese Accents - Strip Diacritics Online',
  },
  description: {
    vi: 'Bỏ dấu tiếng Việt online miễn phí: chuyển văn bản có dấu thành không dấu ngay lập tức, đổi đ thành d, giữ nguyên chữ hoa, chữ thường. Sao chép bằng một lần bấm.',
    en: 'Free tool to remove Vietnamese accents: convert text with tone marks to plain letters instantly, đ becomes d and letter case is kept. Copy with one click.',
  },
  h1: { vi: 'Bỏ dấu tiếng Việt', en: 'Remove Vietnamese Accents' },
  name: { vi: 'Bỏ dấu tiếng Việt', en: 'Remove Vietnamese Accents' },
  intro: {
    vi: 'Dán văn bản có dấu, nhận ngay bản không dấu để đặt tên file, tên đăng nhập hay nhắn tin.',
    en: 'Paste Vietnamese text and get an accent-free version for file names, usernames or plain-text messages.',
  },
  related: ['slug', 'case-converter', 'word-counter'],
};
