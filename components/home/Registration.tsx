import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";
import { IconArrow } from "@/components/site/Icons";

type Tier = { participant: string; student: string };

function Mode({
  title,
  note,
  early,
  late,
  variant,
}: {
  title: string;
  note: string;
  early: Tier;
  late: Tier;
  variant?: "virtual";
}) {
  return (
    <article
      className={`s-mode ${variant === "virtual" ? "s-mode--virtual" : ""}`}
    >
      <header className="s-mode__head">
        <h3>{title}</h3>
        <p>{note}</p>
      </header>
      <div className="s-tiers">
        {[
          ["Early-bird", early],
          ["Late-bird", late],
        ].map(([name, t]) => (
          <div className="s-tier" key={name as string}>
            <p className="s-tier__name">{name as string}</p>
            <dl>
              <div className="s-price">
                <dt>Participant</dt>
                <dd>{(t as Tier).participant}</dd>
              </div>
              <div className="s-price">
                <dt>Student</dt>
                <dd>{(t as Tier).student}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </article>
  );
}

/** Pricing comparison — shared by the homepage section and /registration. */
export function Pricing() {
  const r = siteConfig.registration;
  return (
    <>
      <div className="s-reg">
        <Mode
          title="Physical attendance"
          note="In person at Twin Hall A, OGITECH, Igbesa"
          early={r.physical.earlyBird}
          late={r.physical.lateBird}
        />
        <Mode
          title="Virtual attendance"
          note="Join the conference online"
          early={r.virtual.earlyBird}
          late={r.virtual.lateBird}
          variant="virtual"
        />
      </div>
      <div className="s-intl">
        <div>
          <h3>International participants</h3>
          <p>Participants attending from outside Nigeria</p>
        </div>
        <span className="amt">{r.international}</span>
      </div>
    </>
  );
}

export function RegistrationSection() {
  return (
    <Section id="registration" tone="off" labelledBy="registration-title">
      <div className="s-head">
        <div>
          <Eyebrow n="08">Registration</Eyebrow>
          <h2 id="registration-title" className="s-title">
            Register to attend
          </h2>
        </div>
        <p className="s-lead">
          Choose physical or virtual attendance. Fees are in Nigerian Naira (₦)
          unless stated; early-bird rates are lower than late-bird rates.
        </p>
      </div>
      <Pricing />
      <div className="s-reg-foot">
        <p className="s-note">Payment details are on the registration page.</p>
        <Link href="/registration" className="s-link">
          Proceed to payments <IconArrow />
        </Link>
      </div>
    </Section>
  );
}
