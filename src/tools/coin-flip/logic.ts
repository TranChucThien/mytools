import { secureRandomBelow } from '../random-number/logic';

export type CoinSide = 'heads' | 'tails';

export function flipCoin(rng: (n: number) => number = secureRandomBelow): CoinSide {
  return rng(2) === 0 ? 'heads' : 'tails';
}
