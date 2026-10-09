export const S = {
  vi: {
    list: 'Danh sách (mỗi dòng một mục)',
    spin: 'Quay',
    remove: 'Loại mục đã trúng',
    result: 'Kết quả',
    errFew: 'Một mục thì quay làm gì cho mỏi tay. Cần ít nhất 2 mục để quay.',
    quips: [
      'Vòng quay đã chọn {item}. Khỏi phải hỏi "ăn gì giờ" thêm lần nào nữa.',
      '{item}! Số phận đã an bài, ai không đồng ý thì quay lại.',
      'Chốt {item}. Đỡ được 15 phút bàn bạc vô ích.',
      'Kim chỉ vào {item}. Vòng quay không biết nói dối.',
      '{item} thắng! Cả nhóm vỗ tay, người phản đối thì vỗ nhẹ thôi.',
    ],
    example: 'Phở\nBún chả\nCơm tấm\nBánh mì\nBún bò\nMì Quảng',
  },
  en: {
    list: 'Entries (one per line)',
    spin: 'Spin',
    remove: 'Remove the winner after each spin',
    result: 'Result',
    errFew: 'Spinning for one option is just cardio. Add at least 2 entries to spin.',
    quips: [
      'The wheel picked {item}. No more "what do you want to eat" today.',
      '{item}! Fate has decided. Disagree? Spin again.',
      '{item} it is. That saved 15 minutes of debate.',
      'The pointer says {item}. The wheel does not lie.',
      '{item} wins! Applause, please. Quiet applause from the doubters.',
    ],
    example: 'Pizza\nSushi\nTacos\nBurgers\nPho\nPasta',
  },
};
export type WheelStrings = (typeof S)['vi'];
