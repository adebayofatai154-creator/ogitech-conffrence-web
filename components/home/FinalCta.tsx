import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/site/Reveal";

export function FinalCta() {
  return (
    <section className="s-final" aria-labelledby="final-title">
      <div className="s-container">
        <Reveal>
          <p className="s-eyebrow s-eyebrow--light" style={{ justifyContent: "center" }}>{siteConfig.dates}</p>
          <h2 id="final-title">Be part of the conversation shaping the future of engineering TVET</h2>
          <div className="s-final__cta">
            <Link href={siteConfig.submitHref} className="btn btn-accent btn-lg">Submit Paper</Link>
            <Link href="/#registration" className="btn btn-light btn-lg">Register</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
