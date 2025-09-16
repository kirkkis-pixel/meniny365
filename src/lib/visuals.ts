/**
 * Format rank with ordinal suffix
 */
export function formatRank(rank: number): string {
  const j = rank % 10;
  const k = rank % 100;
  
  if (j === 1 && k !== 11) {
    return rank + ".";
  }
  if (j === 2 && k !== 12) {
    return rank + ".";
  }
  if (j === 3 && k !== 13) {
    return rank + ".";
  }
  return rank + ".";
}

/**
 * Format name for URL slug
 */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}
