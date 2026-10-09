export const S = {
  vi: {
    input: 'Tiêu đề',
    output: 'Slug',
    separator: 'Dấu phân cách',
    example: 'Hướng dẫn nấu phở bò Hà Nội!',
    quips: [
      [20, 'Slug ngắn gọn, dễ nhớ, đọc qua điện thoại cũng không ai ghi nhầm.'],
      [60, 'Gọn gàng, không dấu, không khoảng trắng. Google nhìn chắc cũng gật gù.'],
      [100, 'Hơi dài rồi đó. Thử bớt vài từ phụ cho đường link đỡ dài như sớ.'],
      [Infinity, 'Slug này dài như hàng chờ trà sữa giờ tan tầm. Rút gọn tiêu đề nhé.'],
    ] as [number, string][],
  },
  en: {
    input: 'Title',
    output: 'Slug',
    separator: 'Separator',
    example: 'How to Make Vietnamese Phở at Home',
    quips: [
      [20, 'Short and memorable. You could read it out over the phone.'],
      [60, 'Clean, lowercase, no spaces. Search engines approve.'],
      [100, 'Getting long. Drop a few filler words and the link will thank you.'],
      [Infinity, 'This slug is longer than the coffee queue on Monday. Try a shorter title.'],
    ] as [number, string][],
  },
};
export type SlugStrings = (typeof S)['vi'];
