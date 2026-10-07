import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";

export function ThemeBand() {
  return (
    <section className="s-theme" aria-labelledby="theme-title">
      <div className="s-container">
        <Reveal>
          <Eyebrow light>Conference Theme</Eyebrow>
          <span className="s-theme__mark" aria-hidden="true">“</span>
          <h2 id="theme-title" className="s-theme__text">{siteConfig.theme}</h2>
        </Reveal>
      </div>
    </section>
  );
}

export function Objectives({ numbered = true }: { numbered?: boolean }) {
  return (
    <Section id="objectives" labelledBy="objectives-title">
      <div className="s-head">
        <div>
          <Eyebrow n={numbered ? "03" : undefined}>Objectives</Eyebrow>
          <h2 id="objectives-title" className="s-title">What the conference seeks to achieve</h2>
        </div>
        <p className="s-lead">
          The theme translates into four working aims that shape the programme, the call for papers and the conversation
          between institutions and industry.
        </p>
      </div>
      <ol className="s-obj">
        {siteConfig.objectives.map((o, i) => (
          <li key={o.title}>
            <span className="s-obj__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
