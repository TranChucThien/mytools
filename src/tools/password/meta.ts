import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'password',
  category: 'generator',
  icon: 'key',
  component: 'password',
  slug: { vi: 'tao-mat-khau', en: 'password-generator' },
  title: {
    vi: 'Tạo mật khẩu mạnh online - Mật khẩu ngẫu nhiên an toàn',
    en: 'Password Generator - Create Strong Random Passwords',
  },
  description: {
    vi: 'Tạo mật khẩu mạnh ngẫu nhiên online miễn phí: chọn độ dài, chữ hoa, chữ thường, số, ký tự đặc biệt. Tạo ngay trên trình duyệt, không gửi đi đâu.',
    en: 'Free strong password generator: choose length, letters, numbers and symbols. Passwords are created in your browser with secure randomness and never sent anywhere.',
  },
  h1: { vi: 'Tạo mật khẩu mạnh', en: 'Password Generator' },
  name: { vi: 'Tạo mật khẩu', en: 'Password Generator' },
  intro: {
    vi: 'Tạo mật khẩu ngẫu nhiên, khó đoán ngay trên máy của bạn, kèm đánh giá độ mạnh.',
    en: 'Create a strong random password right on your device, with a strength estimate.',
  },
  related: ['qr-code', 'random-number'],
};
