export const S = {
  vi: {
    bank: 'Ngân hàng',
    account: 'Số tài khoản',
    amount: 'Số tiền (không bắt buộc)',
    message: 'Nội dung chuyển khoản (không bắt buộc)',
    download: 'Tải PNG',
    sent: 'Nội dung sẽ gửi',
    check: 'Hãy quét thử bằng app ngân hàng của bạn để kiểm tra tên chủ tài khoản trước khi in hoặc chia sẻ.',
    errAccount: 'Số tài khoản chỉ gồm chữ và số, tối đa 19 ký tự.',
    errAmount: 'Số tiền phải là số nguyên dương (đồng).',
    placeholderAccount: 'Ví dụ: 0123456789',
  },
  en: {
    bank: 'Bank',
    account: 'Account number',
    amount: 'Amount in VND (optional)',
    message: 'Transfer message (optional)',
    download: 'Download PNG',
    sent: 'Message that will be sent',
    check: 'Scan the code with your own banking app to confirm the account name before printing or sharing it.',
    errAccount: 'Account numbers use letters and digits only, up to 19 characters.',
    errAmount: 'The amount must be a whole number of dong greater than 0.',
    placeholderAccount: 'e.g. 0123456789',
  },
};
export type VietQrStrings = (typeof S)['vi'];
