import { describe, expect, it } from 'vitest';
import { savings } from './logic';

describe('savings', () => {
  it('computes simple interest paid at maturity', () => {
    expect(savings(100_000_000, 6, 12, 'simple')).toEqual({ interest: 6_000_000, total: 106_000_000 });
    expect(savings(50_000_000, 5.5, 6, 'simple')).toEqual({ interest: 1_375_000, total: 51_375_000 });
  });
  it('compounds monthly', () => {
    const r = savings(100_000_000, 6, 12, 'monthly')!;
    expect(r.total).toBeCloseTo(106_167_781.19, 2);
  });
  it('rejects invalid input', () => {
    expect(savings(-1, 6, 12, 'simple')).toBeNull();
    expect(savings(100, 6, 0, 'simple')).toBeNull();
  });
});
