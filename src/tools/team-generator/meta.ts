import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'team-generator',
  category: 'random',
  icon: 'users-group',
  component: 'team-generator',
  slug: { vi: 'chia-doi-ngau-nhien', en: 'team-generator' },
  title: {
    vi: 'Chia đội ngẫu nhiên online - Chia nhóm công bằng',
    en: 'Random Team Generator - Split a List into Teams',
  },
  description: {
    vi: 'Chia đội ngẫu nhiên online miễn phí: dán danh sách, chọn số đội hoặc số người mỗi đội, công cụ chia đều và công bằng. Dùng cho đá bóng, học nhóm, team building.',
    en: 'Free random team generator: paste names and split them into a chosen number of teams or team size, evenly and fairly. Great for sports, classes and events.',
  },
  h1: { vi: 'Chia đội ngẫu nhiên', en: 'Random Team Generator' },
  name: { vi: 'Chia đội ngẫu nhiên', en: 'Team Generator' },
  intro: {
    vi: 'Dán danh sách thành viên, chọn cách chia và bấm Chia đội để có các nhóm đều nhau.',
    en: 'Paste your members, choose how to split and press Make teams for even groups.',
  },
  related: ['name-picker', 'wheel', 'random-number'],
};
