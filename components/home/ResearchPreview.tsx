import Link from "next/link";
import { Eyebrow, Section } from "@/components/site/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { IconArrow } from "@/components/site/Icons";
import { formatDate, toDownloadUrl } from "@/lib/utils";

export type PreviewPaper = { slug: string; fullName: string; title: string | null; publishedAt: Date | null; fileUrl: string };

export function ResearchPreview({ papers }: { papers: PreviewPaper[] }) {
  return (
    <Section id="research" tone="off" labelledBy="research-title">
      <div className="s-split">
        <div>
          <Eyebrow n="10">Research Library</Eyebrow>
          <h2 id="research-title" className="s-title">Published conference research</h2>
          <p className="s-lead" style={{ margin: "20px 0 28px" }}>
            Published conference papers and research works can be viewed and downloaded from the public research library.
          </p>
          <Link href="/research" className="btn btn-primary btn-lg">Explore Research</Link>
        </div>
        <div>
          {papers.length === 0 ? (
            <EmptyState title="No published research yet" description="Published conference research will appear here once available." />
          ) : (
            <ul className="s-rlist">
              {papers.map((p) => (
                <li key={p.slug}>
                  <h3><Link href={`/research/${p.slug}`}>{p.title ?? "Untitled research submission"}</Link></h3>
                  <p className="s-meta">{p.fullName}{p.publishedAt ? ` · ${formatDate(p.publishedAt)}` : ""}</p>
                  <div className="s-rlist__links">
                    <Link href={`/research/${p.slug}`} className="s-link">View <IconArrow /></Link>
                    <a href={toDownloadUrl(p.fileUrl)} className="s-link">Download PDF</a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
