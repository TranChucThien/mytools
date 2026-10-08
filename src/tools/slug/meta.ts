import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'slug',
  category: 'text',
  icon: 'link',
  component: 'slug',
  slug: { vi: 'tao-slug', en: 'slug-generator' },
  title: {
    vi: 'Tạo slug online - Chuyển tiêu đề tiếng Việt thành URL',
    en: 'Slug Generator - Turn Titles into SEO-Friendly URLs',
  },
  description: {
    vi: 'Tạo slug URL online miễn phí từ tiêu đề tiếng Việt: bỏ dấu, chữ thường, nối bằng dấu gạch ngang hoặc gạch dưới. Đúng chuẩn cho SEO, WordPress, blog.',
    en: 'Free slug generator: turn any title into a clean, lowercase URL slug with hyphens or underscores. Removes accents and symbols automatically.',
  },
  h1: { vi: 'Tạo slug URL', en: 'Slug Generator' },
  name: { vi: 'Tạo slug', en: 'Slug Generator' },
  intro: {
    vi: 'Gõ tiêu đề bài viết, nhận ngay đường dẫn URL gọn gàng, không dấu, chuẩn SEO.',
    en: 'Type a title and get a clean, accent-free URL slug that is ready for SEO.',
  },
  related: ['remove-diacritics', 'case-converter', 'word-counter'],
};
