import { describe, expect, it } from 'vitest';
import { parseNames, pickNames } from './logic';

describe('parseNames', () => {
  it('trims lines and drops blanks, keeping duplicates', () => {
    expect(parseNames(' An \n\nBình\r\nAn\n   ')).toEqual(['An', 'Bình', 'An']);
  });
});

describe('pickNames', () => {
  it('picks distinct entries using the rng', () => {
    const names = ['An', 'Bình', 'Chi', 'Dũng'];
    const r = pickNames(names, 2, (n) => n - 1);
    expect(r).toEqual({ ok: true, winners: ['Dũng', 'Chi'], rest: ['An', 'Bình'] });
  });
  it('can pick everyone', () => {
    const r = pickNames(['A', 'B', 'C'], 3);
    expect(r.ok && [...r.winners].sort()).toEqual(['A', 'B', 'C']);
  });
  it('validates input', () => {
    expect(pickNames([], 1)).toEqual({ ok: false, error: 'empty' });
    expect(pickNames(['A'], 2)).toEqual({ ok: false, error: 'count' });
    expect(pickNames(['A'], 0)).toEqual({ ok: false, error: 'count' });
  });
});
