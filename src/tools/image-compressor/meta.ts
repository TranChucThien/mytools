import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'image-compressor',
  category: 'generator',
  icon: 'photo-down',
  component: 'image-compressor',
  slug: { vi: 'nen-anh', en: 'image-compressor' },
  title: {
    vi: 'Nén ảnh online miễn phí - Giảm dung lượng ảnh JPG, PNG',
    en: 'Image Compressor - Compress and Resize Images Online',
  },
  description: {
    vi: 'Nén ảnh online miễn phí, giảm dung lượng JPG, PNG, WebP và đổi kích thước ngay trên trình duyệt. Ảnh không bị tải lên máy chủ, xử lý nhiều ảnh cùng lúc.',
    en: 'Compress and resize JPG, PNG and WebP images for free, right in your browser. Images are never uploaded, and you can process several at once.',
  },
  h1: { vi: 'Nén ảnh online', en: 'Image Compressor' },
  name: { vi: 'Nén ảnh', en: 'Image Compressor' },
  intro: {
    vi: 'Giảm dung lượng ảnh để gửi, đăng web hay nộp hồ sơ, xử lý ngay trên máy bạn.',
    en: 'Shrink photos for email, websites or upload forms, processed entirely on your device.',
  },
  related: ['qr-code', 'password', 'slug'],
};
