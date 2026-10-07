import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";
import { IconArrow } from "@/components/site/Icons";

export function Venue({ numbered = true }: { numbered?: boolean }) {
  return (
    <Section id="venue" labelledBy="venue-title">
      <div className="s-venue">
        <div>
          <Eyebrow n={numbered ? "11" : undefined}>Venue</Eyebrow>
          <h2 id="venue-title" className="s-venue__name">{siteConfig.venueName}</h2>
          <p className="s-venue__loc">{siteConfig.venueLocation}</p>
          <p className="s-lead">
            The conference takes place at OGITECH in Igbesa, with virtual attendance available for participants who cannot
            travel.
          </p>
          <a className="s-link" href={siteConfig.venueMapsUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 16 }}>
            Open in Maps <IconArrow />
          </a>
        </div>
        <div className="s-venue__seal">
          <Image src="/logo.jpeg" alt="OGITECH logo" width={72} height={72} />
          <p>
            {siteConfig.institution}
            <small>{siteConfig.school}</small>
          </p>
          <p>
            {siteConfig.dates}
            <small>Physical + Virtual</small>
          </p>
        </div>
      </div>
    </Section>
  );
}
