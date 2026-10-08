export const S = {
  vi: {
    price: 'Giá gốc',
    pct: 'Giảm (%)',
    extra: 'Giảm thêm (%)',
    final: 'Giá sau giảm',
    saved: 'Tiết kiệm',
    total: 'Tổng % giảm',
    errPct: 'Phần trăm giảm phải từ 0 đến 100.',
    example: { price: '450.000', pct: '30' },
  },
  en: {
    price: 'Original price',
    pct: 'Discount (%)',
    extra: 'Extra discount (%)',
    final: 'Final price',
    saved: 'You save',
    total: 'Total discount',
    errPct: 'Discounts must be between 0 and 100.',
    example: { price: '120', pct: '30' },
  },
};
export type DiscountStrings = (typeof S)['vi'];
