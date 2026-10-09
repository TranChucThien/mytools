export const S = {
  vi: {
    input: 'Văn bản',
    output: 'Kết quả',
    modes: { upper: 'CHỮ HOA', lower: 'chữ thường', sentence: 'Viết hoa đầu câu', title: 'Viết Hoa Mỗi Từ', toggle: 'đẢO cHỮ' },
    example: 'hôm nay trời đẹp. đi Đà Lạt thôi!',
    quips: {
      upper: 'CHỮ HOA TOÀN BỘ, ĐỌC LÊN NGHE NHƯ ĐANG BỊ SẾP NHẮC DEADLINE.',
      lower: 'chữ thường nhẹ nhàng, khiêm tốn, như tin nhắn lúc 11 giờ đêm.',
      sentence: 'Viết hoa đầu câu chuẩn chỉnh, cô giáo dạy văn chắc sẽ hài lòng.',
      title: 'Viết Hoa Mỗi Từ, Trông Trang Trọng Như Băng Rôn Khai Trương.',
      toggle: 'cHỮ đẢO lUNG tUNG, đỌC xONG cHẮC cẦN nGHỈ mỘT lÁT.',
    },
  },
  en: {
    input: 'Text',
    output: 'Result',
    modes: { upper: 'UPPERCASE', lower: 'lowercase', sentence: 'Sentence case', title: 'Title Case', toggle: 'tOGGLE cASE' },
    example: 'the quick brown fox. it jumps over Paris!',
    quips: {
      upper: 'ALL CAPS. NOW IT READS LIKE AN URGENT EMAIL FROM THE BOSS.',
      lower: 'all lowercase, calm and humble, like a text sent at 11 p.m.',
      sentence: 'Proper sentence case. Your old English teacher would be proud.',
      title: 'Title Case For Everything, Like A Grand Opening Banner.',
      toggle: 'tOGGLED cASE: tHE fONT oF pURE cHAOS, uSE wITH cARE.',
    },
  },
};
export type CaseStrings = (typeof S)['vi'];
