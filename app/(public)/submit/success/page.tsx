import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { IconCheck } from "@/components/site/Icons";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Submission Received", robots: { index: false } };

export default function SubmissionSuccessPage({ searchParams }: { searchParams: { name?: string; date?: string; ref?: string } }) {
  const date = searchParams.date && !Number.isNaN(Date.parse(searchParams.date)) ? formatDate(searchParams.date) : null;
  return (
    <section className="s-section s-section--off">
      <div className="s-container">
        <div className="s-success">
          <div className="s-success__icon"><IconCheck size={28} /></div>
          <h1>Submission Received</h1>
          <p className="msg">
            Thank you for submitting your research work to the 2nd Hybrid International Conference organized by the {siteConfig.school}, {siteConfig.institution}.
          </p>
          <dl>
            {searchParams.name && <div><dt>Researcher</dt><dd>{searchParams.name.slice(0, 120)}</dd></div>}
            {searchParams.ref && <div><dt>Reference</dt><dd style={{ fontFamily: "ui-monospace, monospace" }}>{searchParams.ref.slice(0, 12)}</dd></div>}
            {date && <div><dt>Date submitted</dt><dd>{date}</dd></div>}
            <div><dt>Status</dt><dd><span className="badge badge-SUBMITTED"><span className="d" />Submitted — Awaiting Review</span></dd></div>
          </dl>
          <Link href="/" className="btn btn-primary btn-lg" style={{ width: "100%" }}>Return to Conference Website</Link>
        </div>
      </div>
    </section>
  );
}
