export const S = {
  vi: {
    flip: 'Tung đồng xu',
    heads: 'Ngửa',
    tails: 'Sấp',
    total: 'Tổng số lần',
    reset: 'Đặt lại',
    ready: 'Sẵn sàng',
    quipsHeads: [
      'Ngửa! Ông trời đã phán, cãi là mất lượt.',
      'Ngửa rồi. Ai thua thì đi mua trà sữa cho cả phòng nhé.',
      'Ngửa. Đồng xu không thiên vị ai, nó chỉ thích nằm ngửa thôi.',
      'Ngửa! Quyết nhanh như chốt đơn giờ vàng.',
    ],
    quipsTails: [
      'Sấp! Kết quả đã rõ, xin mời bên thua nhận việc rửa bát.',
      'Sấp. Muốn tung lại thì được, nhưng đồng xu nhớ hết đấy.',
      'Sấp rồi. Đừng nhìn đồng xu như thế, nó chỉ làm đúng việc của nó.',
      'Sấp! Một quyết định khó, đồng xu đã gánh giúp bạn.',
    ],
    quipStreak: 'Ra {side} {n} lần liền! Đồng xu đang có phong độ, nhưng lần sau vẫn là 50/50 thôi.',
  },
  en: {
    flip: 'Flip coin',
    heads: 'Heads',
    tails: 'Tails',
    total: 'Total flips',
    reset: 'Reset',
    ready: 'Ready',
    quipsHeads: [
      'Heads! The coin has spoken. No appeals.',
      'Heads. Whoever lost is buying coffee for the team.',
      'Heads. The coin plays no favorites, it just likes facing up.',
      'Heads! Decided faster than a group chat ever could.',
    ],
    quipsTails: [
      'Tails! The loser is on dishes tonight.',
      'Tails. You can flip again, but the coin will remember.',
      'Tails. Do not glare at the coin, it is just doing its job.',
      'Tails! A tough call, and the coin took the blame for you.',
    ],
    quipStreak: '{side} {n} times in a row! The coin is on a roll, but the next flip is still 50/50.',
  },
};
export type CoinStrings = (typeof S)['vi'];
