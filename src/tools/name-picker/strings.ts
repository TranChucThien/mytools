export const S = {
  vi: {
    list: 'Danh sách (mỗi dòng một tên)',
    count: 'Số người được chọn',
    remove: 'Loại người đã trúng khỏi danh sách',
    pick: 'Bốc thăm',
    entries: 'mục trong danh sách',
    errEmpty: 'Danh sách trống trơn, bốc thăm ai bây giờ? Thêm ít nhất một tên nhé.',
    errCount: 'Số người được chọn phải từ 1 đến số tên trong danh sách. Không bốc được người vô hình đâu.',
    quipsOne: [
      'Xin chúc mừng {name}! Lá thăm đã chọn, không nhận khiếu nại.',
      '{name} trúng rồi. Nhiệm vụ đi lấy trà sữa thuộc về bạn.',
      'Chính là {name}! Có trốn cũng không kịp nữa đâu.',
      '{name} được chọn. Hôm nay chắc là ngày may mắn, hoặc không.',
      'Thăm đã bốc: {name}. Cả nhóm vỗ tay, còn {name} thì thở dài.',
    ],
    quipsMany: [
      '{n} người may mắn đã lộ diện. Ai chưa trúng thì thở phào đi.',
      'Danh sách người trúng đã có. Họp nhóm luôn cho nóng.',
      '{n} cái tên, một số phận chung. Chúc cả đội gánh việc vui vẻ.',
      'Thăm đã bốc xong, công bằng tuyệt đối. Ai buồn thì trách lá thăm.',
    ],
    example: 'Minh Anh\nGia Huy\nBảo Ngọc\nĐức Thịnh\nThu Trang\nQuốc Bảo',
  },
  en: {
    list: 'List (one name per line)',
    count: 'How many to pick',
    remove: 'Remove winners from the list',
    pick: 'Pick',
    entries: 'entries in the list',
    errEmpty: 'The list is empty, so there is nobody to pick. Add at least one name.',
    errCount: 'How many must be between 1 and the number of names. Invisible people cannot be picked.',
    quipsOne: [
      'Congratulations, {name}! The draw is final, no refunds.',
      '{name} it is. The coffee run is all yours.',
      'It is {name}! Too late to hide now.',
      '{name} was picked. Lucky day, or maybe not.',
      'And the name is {name}. Everyone claps, {name} sighs.',
    ],
    quipsMany: [
      '{n} lucky people revealed. Everyone else can breathe again.',
      'The chosen ones are in. Might as well start the meeting now.',
      '{n} names, one shared destiny. Have fun out there.',
      'Perfectly fair draw. Any complaints go to the hat.',
    ],
    example: 'Olivia\nLiam\nAmelia\nNoah\nSophia\nLucas',
  },
};
export type PickerStrings = (typeof S)['vi'];
