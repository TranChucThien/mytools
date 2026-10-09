export const S = {
  vi: {
    weight: 'Cân nặng (kg)',
    height: 'Chiều cao (cm)',
    standard: 'Chuẩn phân loại',
    asian: 'Châu Á',
    who: 'WHO quốc tế',
    classes: { under: 'Thiếu cân', normal: 'Bình thường', over: 'Thừa cân', obese: 'Béo phì' },
    range: 'Cân nặng hợp lý',
    errInput: 'Nhập cân nặng và chiều cao lớn hơn 0. Số 0 thì máy tính cũng không biết đo gì.',
    quips: {
      under: [
        'Chỉ số hơi thấp một chút. Thêm một bát cơm buổi tối, cơ thể sẽ gửi lời cảm ơn.',
        'Ăn uống đều đặn, ngủ đủ giấc là cách nâng cấp nhẹ nhàng nhất. Cố lên nhé.',
      ],
      normal: [
        'Chỉ số đẹp. Giữ phong độ và thỉnh thoảng tự thưởng một ly trà sữa ít đường.',
        'Nằm gọn trong vùng lý tưởng. Cứ đi bộ, ngủ đủ, uống nước đều là ổn áp.',
        'Chuẩn chỉnh. Cơ thể bạn đang làm việc chăm chỉ hơn cả dân văn phòng cuối năm.',
      ],
      over: [
        'Chỉ hơi vượt vạch một chút. Đổi trà sữa full topping sang size nhỏ là đã có tiến bộ.',
        'Gần vùng lý tưởng rồi. Đi bộ thêm chút sau bữa tối, vừa khỏe vừa được ngắm phố.',
      ],
      obese: [
        'BMI chỉ là con số tham khảo. Nếu muốn, bác sĩ sẽ giúp bạn có kế hoạch vừa sức.',
        'Từng bước nhỏ là đủ: bớt một ly nước ngọt, thêm vài vòng đi bộ. Bạn làm được.',
      ],
    },
    defaultStandard: 'asian',
  },
  en: {
    weight: 'Weight (kg)',
    height: 'Height (cm)',
    standard: 'Classification',
    asian: 'Asian',
    who: 'WHO international',
    classes: { under: 'Underweight', normal: 'Normal weight', over: 'Overweight', obese: 'Obese' },
    range: 'Healthy weight',
    errInput: 'Enter a weight and height greater than 0. With a 0, the calculator has nothing to measure.',
    quips: {
      under: [
        'A little on the low side. An extra serving at dinner and your body will say thanks.',
        'Regular meals and good sleep are the gentlest upgrade there is. You have got this.',
      ],
      normal: [
        'Nice numbers. Keep it up, and treat yourself to a less-sugar bubble tea now and then.',
        'Right in the healthy zone. Walk, sleep, drink water, repeat.',
        'Spot on. Your body is working harder than the office in December.',
      ],
      over: [
        'Just a little over the line. Swapping the large bubble tea for a small one counts as progress.',
        'Close to the healthy zone. A short walk after dinner is good for you and the neighborhood views.',
      ],
      obese: [
        'BMI is only a rough guide. If you like, a doctor can help you plan steps that fit your life.',
        'Small steps add up: one less soda, a few more walks. You can do this.',
      ],
    },
    defaultStandard: 'who',
  },
};
export type BmiStrings = (typeof S)['vi'];
