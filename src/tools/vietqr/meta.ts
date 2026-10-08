import type { ToolMeta } from '../../lib/types';

export const meta: ToolMeta = {
  id: 'vietqr',
  category: 'generator',
  icon: 'scan',
  component: 'vietqr',
  slug: { vi: 'tao-qr-chuyen-khoan', en: 'vietqr-generator' },
  title: {
    vi: 'Tạo mã QR chuyển khoản ngân hàng (VietQR) miễn phí',
    en: 'VietQR Generator - Bank Transfer QR Codes for Vietnam',
  },
  description: {
    vi: 'Tạo mã QR chuyển khoản VietQR miễn phí: chọn ngân hàng, nhập số tài khoản, số tiền và nội dung. Quét bằng app ngân hàng là điền sẵn thông tin chuyển tiền.',
    en: 'Create free VietQR bank transfer codes for Vietnamese accounts: pick the bank, enter the account number, amount and message. Any Vietnamese banking app can scan it.',
  },
  h1: { vi: 'Tạo mã QR chuyển khoản', en: 'VietQR Generator' },
  name: { vi: 'QR chuyển khoản', en: 'VietQR Generator' },
  intro: {
    vi: 'Tạo mã QR nhận tiền cho cửa hàng hoặc cá nhân, khách quét là chuyển khoản ngay, không gõ nhầm số tài khoản.',
    en: 'Make a payment QR code for a Vietnamese bank account so payers can scan and transfer without typos.',
  },
  related: ['qr-code', 'number-to-words', 'vat'],
};
