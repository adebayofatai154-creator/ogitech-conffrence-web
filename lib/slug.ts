import { prisma } from "./prisma";

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/** Ensures the generated slug is unique by appending a short suffix if needed. */
export async function generateUniqueSlug(title: string, fallbackId: string) {
  const base = slugify(title) || slugify(fallbackId);
  let candidate = base;
  let attempt = 0;

  while (await prisma.researchSubmission.findUnique({ where: { slug: candidate } })) {
    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
  return candidate;
}
