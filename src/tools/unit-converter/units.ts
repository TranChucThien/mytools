import type { Localized } from '../../lib/types';

export interface Unit {
  symbol: string;
  name: Localized;
}

/**
 * A pair of units related by a constant factor: 1 `from` = `factor` `to`.
 * Each pair produces two pages (forward: from→to, reverse: to→from).
 */
export interface UnitPair {
  id: string;
  factor: number;
  from: Unit;
  to: Unit;
  /** Tool ids of the generated pages; also the content file names. */
  ids: { forward: string; reverse: string };
  slug: { forward: Localized; reverse: Localized };
}

export const PAIRS: UnitPair[] = [
  {
    id: 'kg-lbs',
    // International avoirdupois pound is defined as exactly 0.45359237 kg.
    factor: 1 / 0.45359237,
    from: { symbol: 'kg', name: { vi: 'kilôgam', en: 'kilograms' } },
    to: { symbol: 'lbs', name: { vi: 'pound', en: 'pounds' } },
    ids: { forward: 'kg-to-lbs', reverse: 'lbs-to-kg' },
    slug: {
      forward: { vi: 'doi-kg-sang-lbs', en: 'kg-to-lbs' },
      reverse: { vi: 'doi-lbs-sang-kg', en: 'lbs-to-kg' },
    },
  },
];
