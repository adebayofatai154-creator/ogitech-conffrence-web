import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";

export function Accommodation({ numbered = true }: { numbered?: boolean }) {
  return (
    <Section id="accommodation" labelledBy="accommodation-title">
      <div className="s-split">
        <div>
          <Eyebrow n={numbered ? "09" : undefined}>Accommodation</Eyebrow>
          <h2 id="accommodation-title" className="s-title">Where to stay</h2>
          <p className="s-lead" style={{ marginTop: 20 }}>
            Accommodation is subject to availability. Participants are encouraged to reserve early.
          </p>
          <p className="s-note" style={{ marginTop: 16 }}>
            For booking enquiries, please contact the Conference Secretariat.
          </p>
        </div>
        <ul className="s-hotels">
          {siteConfig.accommodation.map((h) => (
            <li key={h.hotel}>
              <span className="s-hotel__name">{h.hotel}</span>
              <span className="s-hotel__price">{h.price}<small>per night</small></span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
