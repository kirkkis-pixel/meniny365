export function toSlug(name) {
  return name.toLowerCase()
             .replace(/á/g, 'a')
             .replace(/ä/g, 'a')
             .replace(/č/g, 'c')
             .replace(/ď/g, 'd')
             .replace(/é/g, 'e')
             .replace(/í/g, 'i')
             .replace(/ľ/g, 'l')
             .replace(/ň/g, 'n')
             .replace(/ó/g, 'o')
             .replace(/ô/g, 'o')
             .replace(/ŕ/g, 'r')
             .replace(/š/g, 's')
             .replace(/ť/g, 't')
             .replace(/ú/g, 'u')
             .replace(/ý/g, 'y')
             .replace(/ž/g, 'z')
             .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
             .replace(/\s+/g, '-') // collapse whitespace and replace by -
             .replace(/-+/g, '-'); // collapse dashes
}

export function getProgressWidth(score) {
  return `${Math.max(0, Math.min(100, score))}%`;
}
