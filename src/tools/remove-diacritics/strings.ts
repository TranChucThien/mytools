export const S = {
  vi: {
    input: 'Văn bản có dấu',
    output: 'Kết quả không dấu',
    example: 'Tiếng Việt có dấu thật đẹp, nhưng đôi khi cần bỏ dấu.',
    quipNoMarks: 'Văn bản này vốn đã không dấu sẵn rồi, công cụ được nghỉ giải lao.',
    quips: [
      'Xong! Giờ đọc giống tin nhắn thời điện thoại bàn phím số.',
      'Dấu đã được gỡ sạch, nhớ đọc lại kẻo "đi chợ" thành chuyện khác.',
      'Không dấu rồi, gửi tin nhắn đỡ lỗi font, đỡ người nhận hỏi lại.',
      'Bỏ dấu thành công. Nghĩa thì giữ nguyên, phần đoán là của người đọc.',
      'Gọn gàng, sạch dấu, sẵn sàng cho tên file và mật khẩu wifi.',
    ],
  },
  en: {
    input: 'Text with accents',
    output: 'Text without accents',
    example: 'Tiếng Việt có dấu thật đẹp, nhưng đôi khi cần bỏ dấu.',
    quipNoMarks: 'No accents here to remove. The tool is taking a well-earned coffee break.',
    quips: [
      'Done. Plain ASCII, the way old flip phones liked it.',
      'Accents removed. Give it a quick read, context does the rest.',
      'Clean text, ready for file names, URLs and fussy old systems.',
      'All marks stripped. The meaning stays, the guessing is up to the reader.',
      'Accent-free and ready to travel through any email server.',
    ],
  },
};
export type DiacriticsStrings = (typeof S)['vi'];
