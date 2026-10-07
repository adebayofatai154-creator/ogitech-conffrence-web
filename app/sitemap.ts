import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "conference", "speakers", "research", "registration", "submit"].map((path) => ({
    url: `${siteConfig.appUrl}/${path}`,
    lastModified: new Date(),
  }));

  let paperRoutes: MetadataRoute.Sitemap = [];
  try {
    const papers = await prisma.researchSubmission.findMany({
      where: { status: "PUBLISHED", slug: { not: null } },
      select: { slug: true, publishedAt: true },
    });
    paperRoutes = papers.map((p) => ({ url: `${siteConfig.appUrl}/research/${p.slug}`, lastModified: p.publishedAt ?? new Date() }));
  } catch (error) {
    console.error("Sitemap: failed to load published research", error);
  }
  return [...staticRoutes, ...paperRoutes];
}
