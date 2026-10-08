import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'bmi',
  category: 'calculator',
  icon: 'heart-rate-monitor',
  component: 'bmi',
  slug: { vi: 'tinh-bmi', en: 'bmi-calculator' },
  title: {
    vi: 'Tính BMI online - Chỉ số khối cơ thể chuẩn người Việt',
    en: 'BMI Calculator - Body Mass Index Online (WHO and Asian)',
  },
  description: {
    vi: 'Tính BMI online miễn phí từ cân nặng và chiều cao, phân loại theo chuẩn châu Á hoặc WHO, kèm khoảng cân nặng hợp lý cho chiều cao của bạn.',
    en: 'Free BMI calculator: enter weight and height to get your body mass index, the WHO or Asian category, and the healthy weight range for your height.',
  },
  h1: { vi: 'Tính chỉ số BMI', en: 'BMI Calculator' },
  name: { vi: 'Tính BMI', en: 'BMI Calculator' },
  intro: {
    vi: 'Nhập cân nặng và chiều cao để biết chỉ số BMI, bạn đang ở mức nào và cân nặng bao nhiêu là hợp lý.',
    en: 'Enter weight and height to get your BMI, its category and the weight range considered healthy for your height.',
  },
  related: ['age', 'kg-to-lbs', 'percentage'],
};
