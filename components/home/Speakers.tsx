import Image from "next/image";
import Link from "next/link";
import { speakers } from "@/lib/speakers";
import { Eyebrow, Section } from "@/components/site/Section";
import { IconArrow } from "@/components/site/Icons";

function Portrait({ i, sizes, priority }: { i: number; sizes: string; priority?: boolean }) {
  const s = speakers[i];
  return (
    <div className="s-speaker__photo">
      <Image
        src={s.image}
        alt={`Portrait of ${s.name}`}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: s.objectPosition, ...(s.zoom ? ({ "--zoom": s.zoom } as React.CSSProperties) : {}) }}
      />
    </div>
  );
}

export function SpeakersSection() {
  return (
    <Section id="speakers" labelledBy="speakers-title">
      <div className="s-head">
        <div>
          <Eyebrow n="05">Leadership &amp; Speakers</Eyebrow>
          <h2 id="speakers-title" className="s-title">Conference hosts and speakers</h2>
        </div>
        <p className="s-lead">The conference is led by the Rector and the Dean of the School of Engineering Technology, with keynote and lead addresses from senior figures in engineering education.</p>
      </div>

      <ul className="s-speakers">
        {speakers.map((s, i) => (
          <li key={s.name} className="s-speaker">
            <Portrait i={i} sizes="(min-width:1024px) 22vw, (min-width:560px) 44vw, 38vw" />
            <div className="s-speaker__body">
              <p className="s-speaker__role">{s.role}</p>
              <h3 className="s-speaker__name">{s.name}</h3>
              <p className="s-speaker__creds">{s.designations}</p>
              <p className="s-speaker__pos">{s.position}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="s-more">
        <Link href="/speakers" className="s-link">View full speaker profiles <IconArrow /></Link>
      </div>
    </Section>
  );
}

export function SpeakerProfiles() {
  return (
    <ul className="s-profiles">
      {speakers.map((s, i) => (
        <li key={s.name} className="s-profile">
          <Portrait i={i} sizes="(min-width:1024px) 340px, (min-width:768px) 280px, 90vw" priority={i === 0} />
          <div className="s-speaker__body">
            <p className="s-speaker__role">{s.role}</p>
            <h3 className="s-speaker__name">{s.name}</h3>
            <p className="s-speaker__creds">{s.designations}</p>
            <p className="s-speaker__pos">{s.position}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
