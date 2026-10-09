import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'lunar-calendar',
  category: 'calculator',
  icon: 'moon',
  component: 'lunar-calendar',
  slug: { vi: 'doi-ngay-am-duong', en: 'vietnamese-lunar-calendar' },
  title: {
    vi: 'Đổi ngày âm dương lịch online - Xem ngày âm hôm nay',
    en: 'Vietnamese Lunar Calendar Converter - Solar to Lunar',
  },
  description: {
    vi: 'Đổi ngày dương lịch sang âm lịch và ngược lại theo lịch Việt Nam (múi giờ GMT+7): ngày, tháng, năm âm, tháng nhuận và tên Can Chi. Tra ngày giỗ, rằm, mùng 1, Tết.',
    en: 'Convert solar dates to the Vietnamese lunar calendar and back, with leap months and Can Chi names. Computed for Vietnam time (UTC+7), so Tết dates match Vietnam.',
  },
  h1: { vi: 'Đổi ngày âm dương lịch', en: 'Vietnamese Lunar Calendar Converter' },
  name: { vi: 'Đổi ngày âm dương', en: 'Lunar Calendar' },
  intro: {
    vi: 'Xem một ngày dương ứng với ngày âm nào, hoặc ngày âm (giỗ, sinh nhật âm) rơi vào ngày dương nào năm nay.',
    en: 'Find the lunar date for any day, or the solar date of a lunar anniversary or festival.',
  },
  related: ['date-difference', 'age', 'percentage'],
};
