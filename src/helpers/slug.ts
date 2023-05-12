import slugify from "slugify";
export function generateUniqueSlug(
  txt: string,
  exists: async(txt: string) => boolean
): string {
  // Remove leading/trailing white spaces and convert to lowercase
  const slug = slugify(txt, {
    lower: true,
  });

  // Check if the generated slug already exists
  // Implement your logic here to check against existing slugs in your database or any other source
  const isSlugExists = await exists(txt);

  if (isSlugExists) {
    // If slug already exists, append a unique identifier to make it unique
    const uniqueIdentifier = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
    const uniqueSlug = `${slug}-${uniqueIdentifier}`;

    return generateUniqueSlug(uniqueSlug, exists); // Recursively generate until a unique slug is found
  }

  return slug;
}
