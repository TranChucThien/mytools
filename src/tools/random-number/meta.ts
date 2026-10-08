import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'random-number',
  category: 'random',
  component: 'random-number',
  slug: { vi: 'so-ngau-nhien', en: 'random-number-generator' },
  title: {
    vi: 'Tạo số ngẫu nhiên online – Random số miễn phí',
    en: 'Random Number Generator – Free Online Number Picker',
  },
  description: {
    vi: 'Tạo số ngẫu nhiên online miễn phí trong khoảng bất kỳ, chọn nhiều số cùng lúc, không trùng lặp. Dùng bộ sinh số ngẫu nhiên an toàn của trình duyệt.',
    en: 'Free online random number generator: pick one or many random numbers in any range, with or without duplicates. Uses your browser’s secure randomness.',
  },
  h1: { vi: 'Tạo số ngẫu nhiên', en: 'Random Number Generator' },
  name: { vi: 'Số ngẫu nhiên', en: 'Random Number Generator' },
  intro: {
    vi: 'Chọn khoảng số và số lượng, công cụ sẽ random ngay cho bạn – dùng để bốc thăm, quay số trúng thưởng, chia nhóm hay chơi game.',
    en: 'Choose a range and how many numbers you need, and get them instantly – for raffles, giveaways, games or picking at random.',
  },
  related: ['percentage', 'qr-code'],
};
