export const S = {
  vi: {
    list: 'Danh sách (mỗi dòng một mục)',
    spin: 'Quay',
    remove: 'Loại mục đã trúng',
    result: 'Kết quả',
    errFew: 'Cần ít nhất 2 mục để quay.',
    example: 'Phở\nBún chả\nCơm tấm\nBánh mì\nBún bò\nMì Quảng',
  },
  en: {
    list: 'Entries (one per line)',
    spin: 'Spin',
    remove: 'Remove the winner after each spin',
    result: 'Result',
    errFew: 'Add at least 2 entries to spin.',
    example: 'Pizza\nSushi\nTacos\nBurgers\nPho\nPasta',
  },
};
export type WheelStrings = (typeof S)['vi'];
