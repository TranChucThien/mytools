/** Join a site base ("/" or "/mytools/") with a path relative to the site root. */
export function joinBase(base: string, path: string): string {
  const b = base.endsWith('/') ? base : `${base}/`;
  return b + path.replace(/^\/+/, '');
}

/** Base path the site is served from, always with a trailing slash ("/" or "/mytools/"). */
export const BASE = joinBase(import.meta.env.BASE_URL ?? '/', '');

/** Root-relative URL for a path inside the site, e.g. withBase('favicon.svg'). */
export function withBase(path: string): string {
  return joinBase(BASE, path);
}
