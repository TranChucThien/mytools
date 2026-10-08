/** Remove Vietnamese (and other Latin) diacritics, mapping đ/Đ to d/D. Works on NFC or NFD input. */
export function removeDiacritics(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFC');
}

/** URL slug: no accents, lowercase, runs of other characters become one separator. */
export function slugify(s: string, separator: '-' | '_' = '-'): string {
  return removeDiacritics(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '');
}
