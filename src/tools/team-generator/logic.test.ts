import { describe, expect, it } from 'vitest';
import { makeTeams } from './logic';

const people = Array.from({ length: 10 }, (_, i) => `P${i + 1}`);

describe('makeTeams', () => {
  it('splits into a number of teams with sizes differing by at most 1', () => {
    const r = makeTeams(people, 'count', 3);
    expect(r.ok && r.teams.map((t) => t.length)).toEqual([4, 3, 3]);
  });
  it('splits by team size', () => {
    const r = makeTeams(people, 'size', 4);
    expect(r.ok && r.teams.map((t) => t.length)).toEqual([4, 3, 3]);
  });
  it('keeps every member exactly once', () => {
    const r = makeTeams(people, 'count', 4);
    expect(r.ok && r.teams.flat().sort()).toEqual([...people].sort());
  });
  it('validates input', () => {
    expect(makeTeams([], 'count', 2)).toEqual({ ok: false, error: 'empty' });
    expect(makeTeams(people, 'count', 11)).toEqual({ ok: false, error: 'value' });
    expect(makeTeams(people, 'size', 0)).toEqual({ ok: false, error: 'value' });
  });
});
