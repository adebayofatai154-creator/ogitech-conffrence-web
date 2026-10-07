import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";

export function SubThemes({ numbered = true }: { numbered?: boolean }) {
  return (
    <Section id="sub-themes" tone="off" labelledBy="sub-themes-title">
      <div className="s-head">
        <div>
          <Eyebrow n={numbered ? "04" : undefined}>Sub-themes</Eyebrow>
          <h2 id="sub-themes-title" className="s-title">Sixteen <span style={{ whiteSpace: "nowrap" }}>sub-themes</span> for paper submission</h2>
        </div>
        <p className="s-lead">Submissions should relate to the conference theme and one or more of the official sub-themes below.</p>
      </div>
      <ol className="s-themes">
        {siteConfig.subThemes.map((t, i) => (
          <li key={t}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="t">{t}</span>
          </li>
        ))}
      </ol>
      <div className="s-themes-end" />
    </Section>
  );
}
