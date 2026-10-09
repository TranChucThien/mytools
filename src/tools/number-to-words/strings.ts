export const S = {
  vi: {
    input: 'Số cần đọc',
    currency: 'Thêm "đồng"',
    capitalize: 'Viết hoa chữ cái đầu',
    output: 'Bằng chữ',
    errRange: 'Số này vượt khả năng đọc của mình rồi. Chỉ nhận số nguyên, tối đa 999.999.999.999.999 nhé.',
    quipZero: 'Không đồng. Ví cuối tháng của nhiều người cũng đang đọc đúng con số này.',
    quips: [
      [1000, 'Số nhỏ xinh, đọc xong chưa kịp hết hơi.'],
      [100_000, 'Cỡ một ly trà sữa full topping. Đọc dễ, tiêu còn dễ hơn.'],
      [1_000_000, 'Vài trăm nghìn, đủ một bữa lẩu nhỏ cho hội bạn thân.'],
      [1_000_000_000, 'Hàng triệu rồi đấy. Viết bằng chữ cho chắc, kẻo ai đó thêm số 0.'],
      [1_000_000_000_000, 'Tỷ đồng! Đọc to lên thử, nghe thôi đã thấy giàu.'],
      [Infinity, 'Nghìn tỷ. Con số này nên đọc chậm, rõ ràng, và có kế toán ngồi cạnh.'],
    ] as [number, string][],
    example: '1.250.000',
  },
  en: {
    input: 'Number',
    currency: '',
    capitalize: 'Capitalize first letter',
    output: 'In words',
    errRange: 'That one is beyond my reading skills. Whole numbers only, up to 999,999,999,999,999.',
    quipZero: 'Zero. Also the exact balance of many wallets the day before payday.',
    quips: [
      [1000, 'A small, friendly number. Said before you run out of breath.'],
      [100_000, 'Thousands. Perfect for writing on a check without typos.'],
      [1_000_000, 'Hundreds of thousands. Spell it out so nobody sneaks in an extra zero.'],
      [1_000_000_000, 'Millions. Say it slowly, it sounds better that way.'],
      [1_000_000_000_000, 'Billions. Please read this one sitting down.'],
      [Infinity, 'Trillions. At this point you need an accountant, not a converter.'],
    ] as [number, string][],
    example: '1,250,000',
  },
};
export type NumberWordsStrings = (typeof S)['vi'];
