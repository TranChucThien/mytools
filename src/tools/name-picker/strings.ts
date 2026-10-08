export const S = {
  vi: {
    list: 'Danh sách (mỗi dòng một tên)',
    count: 'Số người được chọn',
    remove: 'Loại người đã trúng khỏi danh sách',
    pick: 'Bốc thăm',
    entries: 'mục trong danh sách',
    errEmpty: 'Danh sách đang trống. Thêm ít nhất một tên.',
    errCount: 'Số người được chọn phải từ 1 đến số tên trong danh sách.',
    example: 'Minh Anh\nGia Huy\nBảo Ngọc\nĐức Thịnh\nThu Trang\nQuốc Bảo',
  },
  en: {
    list: 'List (one name per line)',
    count: 'How many to pick',
    remove: 'Remove winners from the list',
    pick: 'Pick',
    entries: 'entries in the list',
    errEmpty: 'The list is empty. Add at least one name.',
    errCount: 'How many must be between 1 and the number of names.',
    example: 'Olivia\nLiam\nAmelia\nNoah\nSophia\nLucas',
  },
};
export type PickerStrings = (typeof S)['vi'];
