import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'coin-flip',
  category: 'random',
  icon: 'coin',
  component: 'coin-flip',
  slug: { vi: 'tung-dong-xu', en: 'coin-flip' },
  title: {
    vi: 'Tung đồng xu online - Sấp ngửa ngẫu nhiên 50/50',
    en: 'Coin Flip - Flip a Coin Online, Heads or Tails',
  },
  description: {
    vi: 'Tung đồng xu online miễn phí: ra Sấp hoặc Ngửa ngẫu nhiên đúng 50/50, có thống kê số lần. Dùng để quyết định nhanh, chọn bên đi trước hay chơi game.',
    en: 'Flip a coin online for free: a fair 50/50 heads or tails result with a running tally. Great for quick decisions, picking who goes first or games.',
  },
  h1: { vi: 'Tung đồng xu', en: 'Coin Flip' },
  name: { vi: 'Tung đồng xu', en: 'Coin Flip' },
  intro: {
    vi: 'Bấm một lần để tung đồng xu, kết quả Sấp hoặc Ngửa hoàn toàn ngẫu nhiên.',
    en: 'Press once to flip a fair coin and get heads or tails at random.',
  },
  related: ['random-number', 'name-picker'],
};
