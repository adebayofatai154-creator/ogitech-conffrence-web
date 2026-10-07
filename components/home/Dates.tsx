import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";

export function Dates({ numbered = true }: { numbered?: boolean }) {
  return (
    <Section id="dates" labelledBy="dates-title">
      <div className="s-head">
        <div>
          <Eyebrow n={numbered ? "07" : undefined}>Important Dates</Eyebrow>
          <h2 id="dates-title" className="s-title">The road to November</h2>
        </div>
        <p className="s-lead">Key submission deadlines and the conference dates at a glance.</p>
      </div>
      <ol className="s-timeline">
        {siteConfig.importantDates.map((d) => (
          <li key={d.label} className={d.kind === "event" ? "is-event" : ""}>
            <time dateTime={d.iso}>
              <span className="s-date__day">{d.day}</span>
              <span className="s-date__my">{d.month} {d.year}</span>
            </time>
            <div className="s-date__label">{d.label}</div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
