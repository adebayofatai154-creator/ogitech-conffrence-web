"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { IconArrow, IconClose, IconMenu } from "./Icons";

// Homepage sections → which nav item they belong to (in DOM order).
const SPY: { id: string; key: string }[] = [
  { id: "conference", key: "conference" },
  { id: "about", key: "conference" },
  { id: "objectives", key: "conference" },
  { id: "sub-themes", key: "conference" },
  { id: "speakers", key: "speakers" },
  { id: "call-for-papers", key: "" },
  { id: "dates", key: "" },
  { id: "registration", key: "registration" },
  { id: "accommodation", key: "" },
  { id: "research", key: "" },
  { id: "venue", key: "" },
  { id: "contact", key: "" },
];

function routeKey(pathname: string) {
  if (pathname.startsWith("/research")) return "research-page";
  if (pathname.startsWith("/registration")) return "registration";
  if (pathname.startsWith("/speakers")) return "speakers";
  if (pathname.startsWith("/conference")) return "conference";
  if (pathname.startsWith("/submit")) return "submit";
  return "";
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [spy, setSpy] = useState("top");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Scroll-spy for the homepage (cheap: rAF-throttled passive scroll listener).
  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "top";
      for (const s of SPY) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.key;
      }
      setSpy(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Drawer: scroll lock, Escape, focus trap, focus return.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const activeKey = pathname === "/" ? spy : routeKey(pathname);

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setOpen(false);
      if (pathname !== "/") return; // let Next navigate (it scrolls to the hash after load)
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior });
        history.pushState(null, "", "/");
      } else if (href.startsWith("/#")) {
        const el = document.getElementById(href.slice(2));
        if (el) {
          e.preventDefault();
          // allow the drawer's scroll lock to release before scrolling
          setTimeout(() => el.scrollIntoView({ behavior, block: "start" }), 30);
          history.pushState(null, "", href);
        }
      }
    },
    [pathname],
  );

  return (
    <header className="s-header">
      <div className="s-container s-header__bar">
        <Link
          href="/"
          className="s-brand"
          onClick={(e) => onNavClick(e, "/")}
          aria-label={`${siteConfig.institutionShort} — ${siteConfig.school}, home`}
        >
          <Image
            className="s-brand__logo"
            src="/logo.jpeg"
            alt=""
            width={38}
            height={38}
            priority
          />
          <span className="s-brand__text">
            <span className="s-brand__name">{siteConfig.institutionShort}</span>
            <span className="s-brand__sub">{siteConfig.school}</span>
          </span>
        </Link>

        <nav className="s-nav" aria-label="Primary">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="s-nav__link"
              aria-current={activeKey === item.section ? "true" : undefined}
              onClick={(e) => onNavClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.submitHref}
            className="btn btn-primary"
            aria-current={activeKey === "submit" ? "page" : undefined}
            style={{ padding: "11px 20px" }}
          >
            Submit Paper
          </Link>
        </nav>

        <div className="s-header__actions">
          <Link
            href={siteConfig.submitHref}
            className="btn btn-primary s-header__cta"
          >
            Submit Paper
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="s-menu-btn"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        className="s-drawer"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="s-drawer__backdrop" onClick={() => setOpen(false)} />
        <div className="s-drawer__panel" ref={panelRef}>
          <div className="s-drawer__top">
            <span className="s-drawer__label">Menu</span>
            <button
              ref={closeRef}
              type="button"
              className="s-menu-btn"
              style={{ display: "inline-grid" }}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </button>
          </div>
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="s-drawer__link"
              aria-current={activeKey === item.section ? "true" : undefined}
              onClick={(e) => onNavClick(e, item.href)}
            >
              {item.label}
              <IconArrow />
            </Link>
          ))}
          <Link
            href={siteConfig.submitHref}
            className="btn btn-accent btn-lg s-drawer__cta"
            onClick={() => setOpen(false)}
          >
            Submit Paper
          </Link>
          <p className="s-drawer__foot">
            {siteConfig.dates}
            <br />
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
