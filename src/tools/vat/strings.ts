export const S = {
  vi: {
    mode: 'Cách tính',
    add: 'Cộng VAT',
    remove: 'Tách VAT',
    amount: 'Số tiền',
    rate: 'Thuế suất',
    custom: 'Khác',
    customRate: 'Thuế suất khác (%)',
    vat: 'Tiền thuế',
    net: 'Giá chưa VAT',
    gross: 'Giá đã có VAT',
    example: '1.000.000',
  },
  en: {
    mode: 'Mode',
    add: 'Add VAT',
    remove: 'Remove VAT',
    amount: 'Amount',
    rate: 'VAT rate',
    custom: 'Custom',
    customRate: 'Custom rate (%)',
    vat: 'VAT amount',
    net: 'Net price',
    gross: 'Gross price',
    example: '100',
  },
};
export type VatStrings = (typeof S)['vi'];
