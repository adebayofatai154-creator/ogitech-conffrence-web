import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { speakers } from "@/lib/speakers";
import { Countdown } from "@/components/site/Countdown";
import { IconArrow } from "@/components/site/Icons";
import { HeroBackground } from "@/components/site/HeroBackground";

export function Hero() {
  return (
    <section id="top" className="s-hero" aria-labelledby="hero-title">
      <HeroBackground src="/images/hero-conference.png" />
      <div className="s-container s-hero__inner">
        <div>
          <div className="s-hero__org">
            {/* <Image src="/logo.jpeg" alt="" width={44} height={44} priority /> */}
            <span>
              {siteConfig.institution}
              <br />
              {siteConfig.school}
            </span>
          </div>

          <span className="s-hero__edition">2nd Edition</span>
          <h1 id="hero-title" className="s-hero__title">
            <span>Hybrid</span>
            <span>International</span>
            <span>Conference</span>
          </h1>

          <blockquote className="s-hero__theme">
            <p>“{siteConfig.theme}”</p>
          </blockquote>

          <div className="s-hero__cta">
            <Link
              href={siteConfig.submitHref}
              className="btn btn-accent btn-lg"
            >
              Submit Paper
            </Link>
            <Link href="/registration" className="btn btn-light btn-lg">
              Register
            </Link>
          </div>

          {/* <Link href="/#speakers" className="s-hero__people">
            <span className="s-avatars" aria-hidden="true">
              {speakers.map((s) => (
                <span key={s.name}>
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="42px"
                    style={{
                      objectFit: "cover",
                      objectPosition: s.objectPosition,
                    }}
                  />
                </span>
              ))}
            </span>
            <span className="txt">Meet the hosts &amp; speakers</span>
            <IconArrow />
          </Link> */}
        </div>

        <aside className="s-hero__panel" aria-label="Conference date and venue">
          {/* <p className="s-hero__label">Save the date</p> */}
          <p className="s-hero__date">
            <span className="s-hero__day">2–5</span>
            <span className="s-hero__month">
              November
              <br />
              2026
            </span>
          </p>
          <dl className="s-hero__facts">
            <div>
              <dt>Venue</dt>
              <dd>
                {siteConfig.venueName}
                <br />
                {siteConfig.venueLocation}
              </dd>
            </div>
            <div>
              <dt>Mode</dt>
              <dd>
                <span className="s-format">
                  <i />
                  <i />
                  Physical + Virtual
                </span>
              </dd>
            </div>
          </dl>
          <Countdown
            start={siteConfig.conferenceStartISO}
            end={siteConfig.conferenceEndISO}
          />
        </aside>
      </div>
    </section>
  );
}
