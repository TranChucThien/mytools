import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'wheel',
  category: 'random',
  icon: 'chart-pie',
  component: 'wheel',
  slug: { vi: 'vong-quay-may-man', en: 'spin-the-wheel' },
  title: {
    vi: 'Vòng quay may mắn online - Quay ngẫu nhiên miễn phí',
    en: 'Spin the Wheel - Random Wheel Picker Online',
  },
  description: {
    vi: 'Vòng quay may mắn online miễn phí: nhập danh sách tên hoặc phần thưởng, bấm Quay để chọn ngẫu nhiên công bằng. Dùng cho minigame, lớp học, chọn món ăn.',
    en: 'Free spin the wheel picker: enter names or prizes, spin and get a fair random winner. Great for giveaways, classrooms and settling decisions.',
  },
  h1: { vi: 'Vòng quay may mắn', en: 'Spin the Wheel' },
  name: { vi: 'Vòng quay may mắn', en: 'Spin the Wheel' },
  intro: {
    vi: 'Nhập các lựa chọn, bấm Quay và để vòng quay chọn giúp bạn một cách công bằng.',
    en: 'Enter your options, press Spin and let the wheel pick one fairly.',
  },
  related: ['name-picker', 'team-generator', 'coin-flip'],
};
