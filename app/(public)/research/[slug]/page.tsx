import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";
import { formatDate, toDownloadUrl } from "@/lib/utils";
import { PageHeader, Section } from "@/components/site/Section";
import { ShareButton } from "@/components/public/ShareButton";

async function getPaper(slug: string) {
  return prisma.researchSubmission.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: {
      slug: true, fullName: true, title: true, abstractText: true, category: true,
      keywords: true, fileUrl: true, fileName: true, fileSize: true, publishedAt: true,
    },
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const paper = await getPaper(params.slug);
  if (!paper) return { title: "Research Not Found" };
  const title = paper.title ?? "Published research";
  const description = paper.abstractText?.slice(0, 160) ?? `Published research by ${paper.fullName} — ${siteConfig.conferenceTitle}.`;
  return {
    title,
    description,
    alternates: { canonical: `/research/${paper.slug}` },
    openGraph: { title, description, type: "article", url: `/research/${paper.slug}` },
    twitter: { card: "summary", title, description },
  };
}

function fileSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
}

export default async function ResearchDetailPage({ params }: { params: { slug: string } }) {
  const paper = await getPaper(params.slug);
  if (!paper) notFound();

  const publicUrl = `${siteConfig.appUrl}/research/${paper.slug}`;
  const title = paper.title ?? "Untitled research submission";

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Research", href: "/research" }, { label: "Paper" }]}
        title={title}
        intro={`${paper.fullName}${paper.publishedAt ? ` · Published ${formatDate(paper.publishedAt)}` : ""}${paper.category ? ` · ${paper.category}` : ""}`}
      />

      <Section labelledBy="abstract-title">
        <div className="s-detail">
          <div>
            <section>
              <h2 id="abstract-title">Abstract</h2>
              <p className="abstract">{paper.abstractText ?? "No abstract was provided for this submission. Open the document to read the full work."}</p>
            </section>

            {paper.keywords.length > 0 && (
              <section>
                <h2>Keywords</h2>
                <ul className="s-chips">
                  {paper.keywords.map((k) => <li key={k}>{k}</li>)}
                </ul>
              </section>
            )}
          </div>

          <aside className="s-detail__aside" aria-label="Document">
            <div className="s-doc">
              <dl>
                <div><dt>Author</dt><dd>{paper.fullName}</dd></div>
                {paper.publishedAt && <div><dt>Published</dt><dd>{formatDate(paper.publishedAt)}</dd></div>}
                <div><dt>File</dt><dd>{paper.fileName}</dd></div>
                <div><dt>Size</dt><dd>{fileSize(paper.fileSize)}</dd></div>
              </dl>
              <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View PDF</a>
              <a href={toDownloadUrl(paper.fileUrl)} className="btn btn-outline" download>Download PDF</a>
              <ShareButton url={publicUrl} title={title} />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
