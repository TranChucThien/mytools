import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'date-difference',
  category: 'calculator',
  icon: 'calendar-stats',
  component: 'date-difference',
  slug: { vi: 'dem-ngay', en: 'days-between-dates' },
  title: {
    vi: 'Đếm ngày giữa hai ngày online - Tính số ngày, tuần, tháng',
    en: 'Days Between Dates - Count Days, Weeks and Weekdays',
  },
  description: {
    vi: 'Đếm số ngày giữa hai ngày online miễn phí: số ngày, số tuần, số tháng và số ngày làm việc từ thứ 2 đến thứ 6. Dùng để tính hạn hợp đồng, đếm ngược Tết.',
    en: 'Free days between dates calculator: count days, weeks, months and weekdays between any two dates, with an option to include the end date.',
  },
  h1: { vi: 'Đếm ngày giữa hai ngày', en: 'Days Between Dates' },
  name: { vi: 'Đếm ngày', en: 'Days Between Dates' },
  intro: {
    vi: 'Chọn hai ngày để biết cách nhau bao nhiêu ngày, tuần, tháng và bao nhiêu ngày làm việc.',
    en: 'Pick two dates to see how many days, weeks, months and weekdays lie between them.',
  },
  related: ['age', 'percentage', 'loan'],
};
