import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'qr-code',
  category: 'generator',
  component: 'qr-code',
  slug: { vi: 'tao-ma-qr', en: 'qr-code-generator' },
  title: {
    vi: 'Tạo mã QR online miễn phí – Tạo QR Code từ link, văn bản',
    en: 'QR Code Generator – Free Online QR Code Maker',
  },
  description: {
    vi: 'Tạo mã QR online miễn phí từ link, văn bản, số điện thoại. Tùy chỉnh màu, kích thước, tải PNG/SVG. Không cần đăng ký, dữ liệu không rời máy bạn.',
    en: 'Create QR codes online for free from any link or text. Customize colors and size, download PNG or SVG. No signup, and your data never leaves your device.',
  },
  h1: { vi: 'Tạo mã QR miễn phí', en: 'Free QR Code Generator' },
  name: { vi: 'Tạo mã QR', en: 'QR Code Generator' },
  intro: {
    vi: 'Nhập link hoặc văn bản, mã QR hiện ra ngay. Mã QR tạo ra là mã tĩnh, không hết hạn và quét được mãi mãi.',
    en: 'Type a link or any text and your QR code appears instantly. Codes are static: they never expire and keep working forever.',
  },
  related: ['random-number', 'percentage'],
};
