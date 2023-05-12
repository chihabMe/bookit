import slugify from "slugify";

export async function generateUniqueSlug(
  txt: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  const slug = slugify(txt, {
    lower: true,
  });

  const isSlugExists = await exists(slug);

  if (isSlugExists) {
    const uniqueIdentifier = Math.random().toString(36).substr(2, 6);
    const uniqueSlug = `${slug}-${uniqueIdentifier}`;

    return generateUniqueSlug(uniqueSlug, exists);
  }

  return slug;
}
