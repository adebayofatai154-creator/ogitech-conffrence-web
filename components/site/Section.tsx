import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Eyebrow({ n, children, light }: { n?: string; children: ReactNode; light?: boolean }) {
  return (
    <p className={`s-eyebrow ${light ? "s-eyebrow--light" : ""}`}>
      {n && <span>{n}</span>}
      {children}
    </p>
  );
}

/** Full-bleed section with a constrained, revealed inner container. */
export function Section({
  id, tone = "white", labelledBy, children,
}: { id?: string; tone?: "white" | "off"; labelledBy?: string; children: ReactNode }) {
  return (
    <section id={id} className={`s-section ${tone === "off" ? "s-section--off" : ""}`} aria-labelledby={labelledBy}>
      <div className="s-container">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

export function PageHeader({
  crumbs, title, intro,
}: { crumbs: { label: string; href?: string }[]; title: string; intro?: string }) {
  return (
    <div className="s-pagehead">
      <div className="s-container s-pagehead__inner">
        <nav className="s-crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          {crumbs.map((c) => (
            <span key={c.label}>
              <span aria-hidden="true">/ </span>
              {c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {intro && <p className="intro">{intro}</p>}
      </div>
    </div>
  );
}
