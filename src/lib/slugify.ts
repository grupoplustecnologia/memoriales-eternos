/**
 * Generate SEO-friendly slug from text
 * Examples:
 *   "Max de Ronda" -> "max-de-ronda"
 *   "Misa de Cuenca" -> "misa-de-cuenca"
 *   "Rocky, mi perro favorito" -> "rocky-mi-perro-favorito"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()                    // Convert to lowercase
    .trim()                           // Remove leading/trailing whitespace
    .replace(/[áàäâ]/g, 'a')         // Replace accents
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[çc]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '')          // Remove leading/trailing hyphens
    .substring(0, 100);               // Limit to 100 characters
}

/**
 * Generate unique slug with counter if needed
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  while (existingSlugs.includes(`${baseSlug}-${counter}`)) {
    counter++;
  }

  return `${baseSlug}-${counter}`;
}
