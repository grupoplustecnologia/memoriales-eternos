/**
 * Generate SEO-friendly slug from text
 * Example: "Mi Perro Max" -> "mi-perro-max"
 */
export function generateSlug(text: string, id?: string): string {
  if (!text) {
    return id || 'memorial';
  }

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Add ID at the end for uniqueness
  if (id && slug.length > 0) {
    return `${slug}-${id.slice(0, 8)}`;
  }

  return slug || 'memorial';
}

/**
 * Extract ID from slug
 * Example: "mi-perro-max-cmiknaau" -> "cmiknaau"
 */
export function extractIdFromSlug(slug: string): string | null {
  const parts = slug.split('-');
  if (parts.length > 1) {
    const lastPart = parts[parts.length - 1];
    // Check if it looks like a Prisma ID (alphanumeric)
    if (/^[a-z0-9]{8,}$/.test(lastPart)) {
      return lastPart;
    }
  }
  return null;
}
