import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'name-picker',
  category: 'random',
  icon: 'users',
  component: 'name-picker',
  slug: { vi: 'boc-tham-ngau-nhien', en: 'random-name-picker' },
  title: {
    vi: 'Bốc thăm ngẫu nhiên online - Chọn tên ngẫu nhiên',
    en: 'Random Name Picker - Draw Names Online for Free',
  },
  description: {
    vi: 'Bốc thăm ngẫu nhiên online miễn phí: dán danh sách tên, chọn một hoặc nhiều người trúng, có thể loại người đã trúng. Công bằng, dùng cho minigame, lớp học, sự kiện.',
    en: 'Free random name picker: paste a list, draw one or more winners and optionally remove them from the list. Fair and secure, great for giveaways and classrooms.',
  },
  h1: { vi: 'Bốc thăm ngẫu nhiên', en: 'Random Name Picker' },
  name: { vi: 'Bốc thăm ngẫu nhiên', en: 'Random Name Picker' },
  intro: {
    vi: 'Dán danh sách, mỗi dòng một tên, rồi bấm Bốc thăm để chọn người may mắn một cách công bằng.',
    en: 'Paste a list with one name per line and press Pick to choose winners fairly.',
  },
  related: ['random-number', 'coin-flip'],
};
